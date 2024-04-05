import {mongoose, Schema} from "mongoose";

const weeklyMenuSchema = new mongoose.Schema({
    day:{
        type:String,
        required:true,
        unique:true,
        enum:[0,1,2,3,4,5,6],
    },
    time:{
        type:String,
        required:true,
        enum:['breakfast','lunch','snack','dinner'],
    },
    menu:{
        type:Schema.ObjectId,
        ref: "Recipe"
    },
},{_id:false});
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    saved_recipes: {
        type: [Schema.ObjectId],
        ref: "Recipe"
    },
    weekly_menu: [weeklyMenuSchema],
    my_stores: {}
},{ timestamps: true},{strict:false},
);
const User = mongoose.model('User',userSchema);
export default User;