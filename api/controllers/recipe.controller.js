import Recipe from '../models/recipe.model.js';
import User from '../models/user.model.js'

export const createRecipe = async (req, res, next) => {

    const newRecipe = new Recipe({...req.body})
    
    try {
        let result = await newRecipe.save()
        res.status(201).json("New Recipe created successfully");
    } catch( err ){
        next(err)
    }
}

export const getAllRecipes = async (req, res, next) => {
    let maxLimit = 6;
    try{
        let data = await Recipe.find()
            .populate('author', "username")
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

export const saveRecipe = async (req, res, next) => {
    try{
        let { userId, recipeId } = req.body;
        await User.findOneAndUpdate({_id: userId}, { $push: {"saved_recipes": recipeId}})
       
        await Recipe.findOneAndUpdate({ _id: recipeId}, { $inc: {"total_collect": 1}})

        res.status(200).json({ result: "success" })

    } catch(err){
        next(err)
    }
}
