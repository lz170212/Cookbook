import {mongoose, Schema} from "mongoose";

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
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
        ref: 'User',
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
    is_customized: {
        type: Boolean,
        default: false
    },
    customized_from: {
        type: Schema.ObjectId,
        ref: 'Recipe'
    },
    customized_by: {
        type: Schema.ObjectId,
        ref: 'User'
    }

    
},{ timestamps: true}
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;