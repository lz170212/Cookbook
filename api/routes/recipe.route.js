import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'

import { createRecipe, getAllRecipes, getRecipe, collectRecipe, checkIfCollected, getSavedRecipes,getWeeklyMenuRecipes,saveWeeklyMenuRecipes } from '../controllers/recipe.controller.js'

const router = express.Router();

router.get('/get', getAllRecipes)
router.get('/get/:id', getRecipe)
router.get('/saved-recipes', verifyToken, getSavedRecipes)
router.get('/weekly-menu',verifyToken, getWeeklyMenuRecipes);

router.post('/create-recipe', verifyToken, createRecipe)
router.post('/collect-recipe', verifyToken, collectRecipe)
router.post('/is-already-collected', verifyToken, checkIfCollected)
router.post('/save-weekly-menu',verifyToken, saveWeeklyMenuRecipes);



export default router;