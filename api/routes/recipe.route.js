import express from 'express';
import { createRecipe, getAllRecipes, getRecipe  } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', createRecipe)
router.get('/get', getAllRecipes)
router.get('/get/:id', getRecipe)



export default router;