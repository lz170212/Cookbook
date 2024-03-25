import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'

import { createRecipe, getAllRecipes, getRecipe, saveRecipe } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', verifyToken, createRecipe)
router.get('/get', getAllRecipes)
router.get('/get/:id', getRecipe)
router.post('/save-recipe', verifyToken, saveRecipe)



export default router;