import Recipe from '../models/recipe.model.js';
import User from '../models/user.model.js'

export const createRecipe = async (req, res, next) => {

    const recipeObj = {...req.body}
    
    if (!recipeObj.is_customized){ // new recipe, just create a new doc
        try {
                const newRecipe = new Recipe({...req.body, author: req.user.id })
                await newRecipe.save()
                res.status(201).json("New Recipe created!");
            } catch( err ){
                next(err)
            }
    } else { // 分两种情况
        if(!recipeObj.customized_from){ // 1. customized from original recipe, should create new doc
            // console.log('reached line 17')
            let { is_customized, _id: customized_from, name, image, highlights, ingredients, instructions, author, prep_time } = recipeObj;
            author = author._id
            
            try{
                const newRecipe = new Recipe({ is_customized, customized_from, name, image, highlights, ingredients, instructions, author, prep_time, customized_by: req.user.id})                
                await newRecipe.save()
                await User.findOneAndUpdate({ _id: req.user.id }, { $addToSet: { "saved_recipes": newRecipe._id }})
                await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { "saved_recipes": customized_from}} )
                    
                res.status(201).json("Customized Recipe saved!");
            
            } catch(err){
                next(err)
            }

        } else { // 2. customized from customized copy, just update 
            let { _id, name, image, highlights, ingredients, instructions, prep_time } = recipeObj;

            await Recipe.findOneAndUpdate({ _id }, { name, image, highlights, ingredients, instructions, prep_time })

            res.status(201).json("Customized Recipe Updated!");
        }

    }

}

export const getAllRecipes = async (req, res, next) => {
    let maxLimit = 10;
    try{
        let data = await Recipe.find({ $or: [ {is_customized: false}, { is_customized: { $exists: false} }] })
            .populate('author', "username")
            .sort("name")
            .limit(maxLimit)
        res.status(200).json({data})
    } catch(err){
        next(err)
    }
}

export const getRecipe = async (req, res, next) => {
    try{
        let data = await Recipe.findById(req.params.id )
            .populate('author', "username")
        res.status(200).json({data})
    } catch(err){
        next(err)
    }
}

export const collectRecipe = async (req, res, next) => {

    try{
        let { recipeId, action } = req.body;
        if(action !== 'Unsave Recipe'){
            await User.findOneAndUpdate({_id: req.user.id}, { $addToSet: {"saved_recipes": recipeId}})
            await Recipe.findOneAndUpdate({ _id: recipeId}, { $inc: {"total_collect": 1}})
        } else {
            await User.findOneAndUpdate({_id: req.user.id}, { $pull: {"saved_recipes": recipeId}})
            await Recipe.findOneAndUpdate({ _id: recipeId}, { $inc: {"total_collect": -1}})
        }
        
        res.status(200).json( action === 'Unsave Recipe' ? 'unsaved': 'saved' )

    } catch(err){
        next(err)
    }
}

export const checkIfCollected = async (req, res, next) => {
    let {recipeId} = req.body

    try {
        let user = await User.findOne({_id: req.user.id})
        let result = user.saved_recipes.includes(recipeId)
        res.status(200).json(result)

    } catch(err){
        next(err)
    }

}

export const getSavedRecipes = async (req, res, next) => {
    try{
        const data = await User.findOne({_id: req.user.id})
        .populate("saved_recipes", "name image highlights ingredients instructions prep_time")
        //.select("saved_recipes")
        res.status(200).json(data)

    } catch(err){
        next(err)
    }
    
}

export const getWeeklyMenuRecipes =async (req, res, next)=>{
    try{
        const data = await User.findOne({_id: req.user.id})
        .populate({path:"weekly_menu", populate:{path:"menu",model:"Recipe"}});
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}

export const saveWeeklyMenuRecipes= async (req,res,next) =>{
    try{
        const {day,time,menu} = req.body;
        const weeklyMenu ={day: day, time: time, menu: menu};
        await User.findOneAndUpdate({_id:req.user.id},
            {$push:{weekly_menu: weeklyMenu}})
        res.status(200).json("Weekly Menu Saved");

    }catch(err){
        next(err);
    }
}

export const removeMenuFromCalendar= async (req,res,next) =>{
    try{
        const {menu,day,time}=req.body;
        await User.findOneAndUpdate({_id:req.user.id},
            {$pull:{weekly_menu:{menu:menu, time:time, day:day}}})
        res.status(200).json("Menu Removed");

    }catch(err){
        next(err);
    }
}

export const getSearchedRecipe = async (req,res,next) =>{
    try{
        const searchTerm = req.query.searchTerm || "";
        const limit = parseInt(req.query.limit) || 10;
        
        const startIndex = parseInt(req.query.startIndex) || 0;
        const highlightParam = req.query.highlight;
        let highlight;
        if(!highlightParam) {
            highlight = [/(.*?)/];
        }else{
            highlight= highlightParam?.split(',');
        }
        let cookingTime = req.query.cookingTime || 60;
        const sortBy = req.query.sort || "createdAt";
        const order = req.query.order || "desc";
        console.log(sortBy);
        console.log(order);
        /*const sortBy = req.query.sort || "createdAt";
        const order = req.query.order || "desc";*/
        const recipes = await Recipe.find({
            "$or" :[{name: { $regex: searchTerm, $options: 'i' }},
            {highlights: { $regex: searchTerm, $options: 'i' }},
            {ingredients: { $regex: searchTerm, $options: 'i' }},
            {instructions: { $regex: searchTerm, $options: 'i' }}
            ],
            highlights:{ $all: highlight},
            prep_time:{ $lte : cookingTime}

        }).sort({[sortBy]:order}).limit(limit).skip(startIndex);

        return res.status(200).json(recipes);

    }catch(err){
        next(err);
    }
}
