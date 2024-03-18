import DefaultUploadImg from '../img/upload-img-icon.jpg';
import { useEffect, useState } from 'react';

const recipeStructure = {
    name: '',
    image: '',
    highlights: [],
    ingredients: [],
    instructions: [],
    prep_time: ''
}

const highlightOptions = ['low carb', 'high protein', 'vegetarian', 'under 500 calories', 'under 30min', 'budget friendly', 'meat lover']

const HighlightCheckbox = ({value}) => {
    return (
        <div className='flex gap-2 pr-3 py-2 font-montserrat'>
            <input type="checkbox" id={value} className='w-5'/>
            <span className='capitalize'>{value}</span>
        </div>
    )
}

const CreateRecipePage = (req, res, next) => {

    const [ recipe, setRecipe ] = useState(recipeStructure)
    let { name, img, highlights, ingredients, instructions, prep_time } = recipe;

    const handleImgUpload = (e) => {
        setRecipe({...recipe, img: e.target})
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


    return (
        <main className='lg:max-w-[90vw] max-w-[80vw] mx-auto font-montserrat'>
            <h1 className="font-medium text-3xl text-center my-5">Create A Recipe</h1>

            <form className="flex flex-col px-[5vw] md:px-[7vw] lg:px-[10vw] lg:flex-row lg:justify-center max-lg:gap-10 lg:gap-16 w-full min-h-[90vh] mt-10">
                <div className="flex flex-col gap-10">
                    <label htmlFor="uploadBanner" className="border-4 border-slate-300 flex justify-center items-center">
                        <img src={img ? img : DefaultUploadImg} className='max-w-[500px] opacity-30'/>
                        <input
                            id="uploadBanner"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={handleImgUpload}
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
                        <label className='font-montserrat text-xl font-medium text-blue-600'>Estimated Prep Time</label>
                        <select className='w-full h-16 rounded-md'>
                            <option>15</option>
                            <option>30</option>
                            <option>45</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>

                <div className="">
                    <div>
                        <p className='font-montserrat text-xl font-medium text-blue-600'>Recipe Highlights</p>
                        <div className='my-3 flex gap-2 flex-wrap'>
                            {
                                highlightOptions.map((value, i) => {
                                    return <HighlightCheckbox key={i} value={value} />
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
                                        <div key={i}>
                                            <div className='my-1 flex gap-2 justify-center items-center'>
                                                <input type="text" className='h-10 w-full lg:w-[650px] px-2' placeholder='New Ingredient...'/>
                                                <span className='cursor-pointer' onClick={(i) => {handleRemoveRow('ingredients', i)}}>x</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className='flex justify-center'>
                                <span className='min-w-fit border-2 border-gray-500 rounded-full px-2 py-1 my-2 text-center cursor-pointer' 
                                    onClick={() => {handleAddRow('ingredients')}}
                                >Add Ingredients</span>
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

                            <div className='flex justify-center'>
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