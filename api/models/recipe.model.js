import {mongoose, Schema} from "mongoose";

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    image: {
        type: String,
    },
    highlights: {
        type: [String], 
        required: true
        
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'users',
        required: true
    },
    total_collect: {
        type: Number,
        default: 0
    },
    prep_time: {
        type: Number,
        required: true
    },

    
},{ timestamps: true}
);

const Recipe = mongoose.model('recipes', recipeSchema);

export default Recipe;