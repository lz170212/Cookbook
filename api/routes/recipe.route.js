import express from "express";
import { createRecipe } from "../controllers/recipe.controller";
import e from "express";
// import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.post('/create-recipe',  createRecipe)

export default router;
