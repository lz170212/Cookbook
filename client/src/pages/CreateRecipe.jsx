import DefaultUploadImg from '../img/upload-img-icon.jpg';
import { useState } from 'react';
import { FaMinusSquare } from 'react-icons/fa'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const recipeStructure = {
    name: '',
    image: '',
    highlights: [],
    ingredients: ['', '', ''],
    instructions: ['', '', ''],
    prep_time: ''
}
const highlightOptions = ['low carb', 'high protein', 'vegetarian', 'under 500 calories', 'under 30min', 'budget friendly', 'meat lover']


const CreateRecipePage = (req, res, next) => {

    const [ recipe, setRecipe ] = useState(recipeStructure)

    let { name, image, highlights, ingredients, instructions, prep_time } = recipe;

    const handleImgUpload = (e) => {
        let file = e.target.files[0]
        if(!file){
            return
        }
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setRecipe({ ...recipe, image: url})
                    })
                    .catch(err => console.log(48, err.message))
            })

        console.log(recipe.image)
    }

    const handleAddRow = (key) => {
        let list = recipe[key]
        setRecipe({ ...recipe, [key]: [ ...list , '' ]})
    }

    const handleRemoveRow = (key, i) => {
        let list = recipe[key]
        list.splice(i, 1)
        setRecipe({...recipe, [key]: list})
    }

    const handleHighlightsChange = (item) => {
        let i = highlights.indexOf(item)
        if( i !== -1){
            highlights.splice(i, 1)
        } else {
            highlights.push(item)
        }
        
        setRecipe({...recipe, highlights: highlights})
    }

    const handleIngredientChange = (e, i) => {
        console.log(e.target.value, i)
    }


    return (
        <main className='font-montserrat max-w-[95vw] flex flex-col mx-auto  py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]'>
            <h1 className="font-medium text-3xl text-center my-6">Create A Recipe</h1>

            <form className="flex gap-16 lg:gap-28 mt-10 border-2 justify-center items-center">
                <div className="flex flex-col gap-10">
                    <label htmlFor="uploadBanner" className="border-4 border-slate-300 rounded-md flex justify-center items-center">
                        <img src={image ? image : DefaultUploadImg} className='min-w-[400px] aspect-square'/>
                        <input
                            id="uploadBanner"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={(e)=>{handleImgUpload(e)}}
                        />
                    </label>

                    <textarea
                        defaultValue={name}
                        onChange={(e) => {setRecipe({...recipe, name: e.target.value})}}
                        placeholder='Recipe Name...'
                        className='resize-none placeholder:opacity-40 w-full h-14 rounded-md font-montserrat text-2xl py-3 px-5'
                    >
                    </textarea>

                    <div>
                        <label className='text-xl font-medium text-blue-600'>Estimated Prep Time</label>
                        <select className='w-full h-14 rounded-md mt-2' onChange={(e) => {setRecipe({ ...recipe, prep_time: e.target.value})}}>
                            <option value={15}>15 min</option>
                            <option value={30}>30 min</option>
                            <option value={45}>45 min</option>
                            <option value={60}>60 min</option>
                        </select>
                    </div>
                </div>

                <div className="min-w-[50%] flex flex-col gap-10">
                    <div>
                        <p className='text-xl font-medium text-blue-600'>Recipe Highlights</p>
                        <div className='mt-3'>
                            {
                                highlightOptions.map((item, i) => {
                                    return (
                                        <div key={i} className='flex gap-2'>
                                            <input type="checkbox" id={item} className='w-5' onChange={() => handleHighlightsChange(item)}/>
                                            <span className='capitalize'>{item}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div>
                        <p className='text-xl font-medium text-blue-600'>Key Ingredients</p>
                        
                        <div className='my-3'>

                            {
                                ingredients.map((item, i) => {
                                    return (
                                        <div key={i} className='flex items-center gap-3 my-1'>
                                            <input 
                                                type="text" 
                                                className='h-10 rounded-md px-2' 
                                                // value={item}
                                                onChange={(e, i) => {handleIngredientChange(e, i)}}
                                            />
                                            <FaMinusSquare  className='cursor-pointer rounded-md text-2xl hover:text-red-500'/>
                                        </div>
                                    )
                                })
                            }
                            
                            <div className='flex justify-start'>
                                <span className='min-w-fit border-2 border-gray-500 rounded-full px-2 py-1 my-2 text-center cursor-pointer' 
                                    onClick={() => {handleAddRow('ingredients')}}
                                >Add More</span>
                            </div>                            
                        </div>
                    
                    </div>

                    <div className='my-3'>
                        <p className='text-xl font-medium text-blue-600'>Add Instructions</p>

                        {
                            instructions.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div className='my-1 flex gap-2 justify-center items-center'>
                                            <input type="text" className='h-10 w-full lg:w-[650px] px-2' placeholder='Next step...'/>
                                            <span className='cursor-pointer' onClick={() => {handleRemoveRow('instructions', i)}}>x</span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className='flex justify-start'>
                            <span className='min-w-fit border-2 border-gray-500 rounded-full px-2 py-1 my-2 text-center cursor-pointer' 
                                onClick={() => {handleAddRow('instructions')}}
                            >Add Step</span>
                        </div>
                    </div>
                </div>
            </form>

        </main>
    )
}

export default CreateRecipePage;