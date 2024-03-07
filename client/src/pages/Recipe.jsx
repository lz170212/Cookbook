import { useParams } from "react-router-dom";
import sampleImg from "../img/sample1.jpeg"

let recipe = {
    name: 'Crispy Salt and Pepper Potatoes',
    ingredients: ['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley'],
    instructions: [
      'Preheat oven to 400°F and line a rimmed baking sheet with parchment.', 
      'In a large bowl, whisk the egg whites until foamy (there shouldn\'t be any liquid whites in the bowl).', 
      'Add the potatoes and toss until they are well coated with the egg whites, then transfer to a strainer or colander and let the excess whites drain.', 
      'Season the potatoes with the salt, pepper, and herbs.', 
      'Scatter the potatoes on the baking sheet (make sure they/’re not touching) and roast until the potatoes are very crispy and tender when poked with a knife, 15 to 20 minutes (depending on the size of the potatoes).', 
      'Transfer to a bowl and serve.'
    ],
    image: 'crispy-salt-and-pepper-potatoes-dan-kluger',
    author: 'Andrew Huberman',
    cookTime: 40,
    tags: ['low carb', 'lunch', 'egg', 'potato']
}

const RecipePage = () => {

    let { id } = useParams;
    let { name, ingredients, instructions, author, tags } = recipe;

    return (
        <div className="py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] flex max-md:flex-col min-h-[calc(100vh-100px)] gap-5">
            
            <div className=" min-h-[80%] w-[50%] flex items-center">
                <img src={sampleImg} />
            </div>

            <div className="w-[50%] px-3 max-md:mt-6">
                <div>
                    <h1 className="font-montserrat text-2xl text-blue-700 font-bold line-clamp-2">{name}</h1>
                    <p className="w-full flex flex-wrap gap-3 mt-2">
                        {
                            tags.map((tag, i) => {
                                return <p key={i} className="capitalize rounded-full bg-slate-200 px-3 py-1">{tag}</p>
                            })
                        }
                    </p>
                    <p className="mt-3"><span className="font-caveat px-2">by</span>{author}</p>
                </div>

                <hr className="border-grey my-2" />

                <div>
                    
                    <p className="font-bold my-2">Ingredients</p>
                    <ul>
                        {
                            ingredients.map((ingredient, i) => {
                                return <li key={i} className="pl-3">{ingredient}</li>
                            })
                        }
                    </ul>

                    <p className="font-bold my-2">Step by Step Instructions:</p>
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