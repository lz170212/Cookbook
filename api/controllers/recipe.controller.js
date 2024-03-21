import Recipe from '../models/recipe.model.js';

export const getAllRecipes = async (req, res, next) => {
    let maxLimit = 5;
    
    try{
        let data = await Recipe.find()
            .populate('author', "username -_id")
            .limit(maxLimit)

        res.status(200).json({data})

    } catch(err){
        next(err)
    }
    
}

export const createRecipe = async (req, res, next) => {

    const newRecipe = new Recipe({...req.body})
    
    try {
        let result = await newRecipe.save()
        res.status(201).json("New Recipe created successfully");
    } catch( err ){
        next(err)
    }
}

