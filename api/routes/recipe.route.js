import express from 'express';
import { createRecipe } from '../controllers/recipe.controller.js'

const router = express.Router();

router.post('/create-recipe', createRecipe)


export default router;