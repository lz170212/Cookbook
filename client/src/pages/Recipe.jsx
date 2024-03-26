import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const recipeStructure = {
    name: '',
    author: '',
    image: '',
    highlights: [],
    ingredients: [],
    instructions: [],
    prep_time: '',
    is_customized: false,
    customized_from: ''
}

const RecipePage = () => {

    let {id} = useParams();
    const [ recipe, setRecipe ] = useState(recipeStructure)
    const [ isCollectedByUser, setIsCollectedByUser ] = useState(false)

    let { name, author: {username}, image, highlights, ingredients, instructions, prep_time, is_customized, customized_from } = recipe;
        
    const fetchRecipe = async () => {
        try{
            const res = await fetch(`/api/recipe/get/${id}`, {
                method: "GET"})

            const { data } = await res.json()
            setRecipe(data)

        } catch(err){
            console.log(err.message)
        }
    }

    const handleCollectRecipe = async (e) => {

        let action = e.target.innerHTML

        try{
            const res = await fetch('/api/recipe/collect-recipe', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeId: id,
                    action
                })
            })
 
            const result = await res.json() 
            setIsCollectedByUser( result === 'unsaved' ? false : true )         


        } catch(err){
            console.log(err.message)
        }

    }

    const checkIfCollected = async () => {
        const res = await fetch('/api/recipe/is-already-collected', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeId: id,
            })
        })

        const result = await res.json() 
        setIsCollectedByUser(result)
    }

    useEffect(() => {
        checkIfCollected();
        fetchRecipe()
    }, [id])

    return (
        <div className="py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] flex max-md:flex-col min-h-[calc(100vh-100px)] gap-5">
            
            <div className=" min-h-[80%] w-[50%] flex flex-col justify-start items-center mt-[5%]">
                <img src={ image } className="max-w-[450px]" />
                    
                <button 
                    className={"font-montserrat font-medium rounded-full w-[300px] mt-5 px-12 py-2 text-xl capitalize " + 
                    (!isCollectedByUser ? "bg-black/80 text-white " : "bg-slate-200 textblack ") +
                    "hover:opacity-50 flex flex-col justify-center items-center"}
                    onClick={(e) => { handleCollectRecipe(e)}}
                >{ isCollectedByUser ? "Unsave Recipe" : "🥰 Save Recipe" }</button>
                
                {   
                    isCollectedByUser &&
                    <Link to={`/create-recipe/${id}`} >
                        <button 
                            className={"font-montserrat font-medium rounded-full w-[300px] mt-5 px-12 py-2 text-xl capitalize bg-black/80 text-white " +
                            "hover:opacity-50 flex flex-col justify-center items-center"}
                        >Customize Recipe</button>
                    </Link>
                }

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