import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
    updateUserStart,
    updateUserFailure, 
    updateUserSuccess
} from '../redux/user/userSlice'
import { useDispatch } from "react-redux";

const recipeStructure = {
    name: '',
    author: '',
    image: '',
    highlights: [],
    ingredients: [],
    instructions: [],
    prep_time: ''
}

const RecipePage = () => {

    let {id} = useParams();
    const [ recipe, setRecipe ] = useState(recipeStructure)
    const { currentUser } = useSelector((state) => state.user);
    const [ isSavedByUser, setIsSavedByUser ] = useState(currentUser.saved_recipes ? currentUser.saved_recipes.includes(id) : false)

    const dispatch = useDispatch()

    console.log(currentUser)
    let { name, author: {username}, image, highlights, ingredients, instructions, prep_time } = recipe
        
    const fetchRecipe = async () => {
        try{
            const res = await fetch(`/api/recipe/get/${id}`, {
                method: "GET"})

            const {data} = await res.json()
            setRecipe(data)

        } catch(err){
            console.log(err.message)
        }
    }

    const handleSaveRecipe = async () => {
        
        try{
            dispatch(updateUserStart())
            const res = await fetch('/api/recipe/save-recipe', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeId: id,
                    userId: currentUser._id
                })
            })

            const data = await res.json()

            if(data.success){
                // update currentUser Info

            }

        } catch(err){
            console.log(err.message)
        }

    }

    useEffect(() => {
        if(recipe.name === ''){
            fetchRecipe();
        }
    }, [])

    return (
        <div className="py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] flex max-md:flex-col min-h-[calc(100vh-100px)] gap-5">
            
            <div className=" min-h-[80%] w-[50%] flex flex-col justify-start items-center mt-[5%]">
                <img src={ image } className="max-w-[450px]" />
                    
                {/* <i class="fi fi-sr-star"></i> */}
                {/* <i className="fi fi-rr-star text-xl"></i> */}
                <button 
                    className={"font-montserrat font-medium rounded-full mt-5 px-12 py-1 text-xl capitalize " + 
                    (!isSavedByUser ? "bg-black/80 text-white " : "bg-slate-200 textblack ") +
                    "hover:opacity-50 flex flex-col justify-center items-center"}
                    onClick={handleSaveRecipe}
                >{ isSavedByUser? "Unsave Recipe" : "🥰 Save Recipe" }</button>
            </div>

            <div className="w-[50%] px-3 max-md:mt-6">
                <div>
                    <h1 className="font-montserrat text-3xl text-blue-700 font-bold my-5 line-clamp-2">{name}</h1>
                    <p className="w-full flex flex-wrap gap-3 mt-2">
                        {
                            highlights.map((item, i) => {
                                return <span key={i} className="capitalize rounded-full bg-slate-200 px-3 py-1">{item}</span>
                            })
                        }
                    </p>
                    <p className="mt-3"><span className="font-caveat px-2">by</span>{username}</p>
                </div>

                <hr className="border-grey my-2" />

                <div>
                    
                    <p className="font-bold my-2">🥕 Ingredients</p>
                    <ul>
                        {
                            ingredients.map((ingredient, i) => {
                                return <li key={i} className="pl-3"><span className="font-bold text-purple-500">{i+1}. </span> {ingredient}</li>
                            })
                        }
                    </ul>

                    <p className="font-bold my-2">🥘 Step by Step Instructions:</p>
                    <ol>
                        {
                            instructions.map((step, i) => {
                                return <li key={i} className="pl-3"><span className="font-bold text-blue-500">{i+1}.</span> {step}</li>
                            })
                        }
                    </ol>

                </div>

            </div>
        </div>
    )
};

export default RecipePage;