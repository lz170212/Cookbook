import DefaultUploadImg from '../img/upload-img-icon.jpg';

const recipeStructure = {

}

const CreateRecipe = (req, res, next) => {

    const handleImgUpload = (e) => {
        console.log(e.target.files[0])
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
    }

    return (
        <main className='max-w-[1000px] mx-auto'>
            <h1 className="font-montserrat font-medium text-3xl text-center ">Create A Recipe</h1>

            <form className="flex flex-col px-[5vw] md:px-[7vw] lg:px-[10vw] lg:flex-row lg:gap-10">
                <div className="flex flex-col gap-10 justify-center items-center">
                    <label htmlFor="uploadBanner" className="border-slate-500">
                        <img src={DefaultUploadImg} className='max-w-[500px]'/>
                        <input
                            id="uploadBanner"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={handleImgUpload}
                        />
                    </label>

                    <textarea
                        // defaultValue={name}
                        onChange={handleNameChange}
                        placeholder='Recipe Name...'
                        className='resize-none placeholder:opacity-40 w-full h-20 font-montserrat text-2xl'
                    >
                    </textarea>
                        
                </div>

                <div>
                    pr2 tags ingredients instructions
                </div>


            </form>


        </main>
    )
}

export default CreateRecipe;