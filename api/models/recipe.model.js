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
        // string should consists of two parts "desired amount " or " xx unit " + "ingredient name"
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    total_collect: {
        type: Number
    },
    prep_time: {
        type: Number
    },

    
},{ timestamps: true}
);

const Recipe = mongoose.model('recipes', recipeSchema);

export default Recipe;