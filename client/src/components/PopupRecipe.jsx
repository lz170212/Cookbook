import RecipeCard from "./RecipeCard"
import { AiFillCloseCircle } from "react-icons/ai";
import {useState} from 'react'
export default function PopupRecipe({recipe,open}) {
    const close=(e)=>{
        if(e.target.id==='container'){
            open(false)
        }
    }
    return (
    <div id='container' onClick={close} className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center ">
        <div className="bg-white w-[420px] h-[500px] flex flex-col items-center rounded-lg">
        <AiFillCloseCircle className='h-10 w-10 opacity-80 hover:opacity-20 cursor-pointer' onClick={()=>open(false)}></AiFillCloseCircle>
        <RecipeCard recipe={recipe}></RecipeCard>
        </div>
    </div>
  )
}
