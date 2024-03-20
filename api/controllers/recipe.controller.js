import Recipe from '../models/recipe.model.js'

export const createRecipe = async (req, res, next) => {

    const newRecipe = new Recipe({...req.body})
    try {
        let result = await newRecipe.save()
        res.status(201).json("New Recipe created successfully");
    } catch( err ){
        next(err)
    }
}