import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'

import { createRecipe, getAllRecipes, getRecipe, collectRecipe, checkIfCollected } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', verifyToken, createRecipe)
router.get('/get', getAllRecipes)
router.get('/get/:id', getRecipe)
router.post('/collect-recipe', verifyToken, collectRecipe)
router.post('/is-already-collected', verifyToken, checkIfCollected)



export default router;