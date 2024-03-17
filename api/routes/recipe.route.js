import express from "express";
import { createRecipe } from "../controllers/recipe.controller";
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.post('/create-recipe', verifyToken, createRecipe)

export default router;
