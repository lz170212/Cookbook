import express from 'express';
import { createRecipe, getAllRecipes } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', createRecipe)
router.get('/all-recipes', getAllRecipes)


export default router;