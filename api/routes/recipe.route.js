import express from 'express';
import { createRecipe, getAllRecipes, getRecipe, saveRecipe } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', createRecipe)
router.get('/get', getAllRecipes)
router.get('/get/:id', getRecipe)
router.post('/save-recipe', saveRecipe)



export default router;