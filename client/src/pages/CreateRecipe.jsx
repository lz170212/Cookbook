import DefaultUploadImg from '../img/upload-img-icon.jpg';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { useState } from 'react';

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

const CreateRecipe = (req, res, next) => {

    const [ recipe, setRecipe ] = useState(recipeStructure)
    let { name, img, highlights, ingredients, instructions, prep_time } = recipe;

    const handleImgUpload = (e) => {
        setRecipe({...recipe, img: e.target})
    }

    const handleAddRow = () => {
        setRecipe({ ...recipe, ingredients: [ ...ingredients, '']})
    }

    const handleRemoveRow = (i) => {
        let list = [ ...ingredients ]
        list.splice(i, 1)
        setRecipe({...recipe, ingredients: list})
    }


    return (
        <main className='lg:max-w-[90vw] max-w-[80vw] mx-auto font-montserrat'>
            <h1 className="font-medium text-3xl text-center my-5">Create A Recipe</h1>

            <form className="flex flex-col px-[5vw] md:px-[7vw] lg:px-[10vw] lg:flex-row max-lg:gap-10 lg:gap-16 w-full min-h-[90vh] mt-10">
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

                    {/* <div>  
                        <FormControl fullWidth>
                            <InputLabel id="estimated-prep-time">Est. Prep Time</InputLabel>
                            <Select
                                labelId="estimated-prep-time"
                                id="estimated-prep-time"
                                value={prep_time}
                                label="Est. Prep Time"
                                className='bg-white rounded-md h-14'
                                onChange={(e) => {setRecipe({...recipe, prep_time: e.target.value})}}
                            >
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={45}>45</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                            </Select>
                        </FormControl>
                    </div> */}
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
                                                <input type="text" className='h-10 w-full px-2' placeholder='New Ingredient...'/>
                                                <span className='cursor-pointer'>x</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className='w-1/2 border-2 border-gray-500 rounded-full px-2 py-1 my-2 text-center cursor-pointer' onClick={handleAddRow}>Add Ingredient</div>
                            
                        </div>
                    
                    </div>

                    <div className='my-3'>
                        <p className='text-xl font-medium text-blue-600'>Add Instructions</p>

                        {
                                instructions.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <div className='my-1 flex gap-2 justify-center items-center'>
                                                <input type="text" className='h-10 w-full px-2' placeholder='Next step...'/>
                                                <span className='cursor-pointer'>x</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className='w-1/2 border-2 border-gray-500 rounded-full px-2 py-1 my-2 text-center cursor-pointer' onClick={handleAddRow}>Add Step</div>
                    </div>
                </div>

            </form>


        </main>
    )
}

export default CreateRecipe;