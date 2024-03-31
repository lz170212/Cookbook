import RecipeCard from "./RecipeCard"
import { AiFillCloseCircle } from "react-icons/ai";
import {useState} from 'react'
export default function PopupRecipe({recipe,open,handleRemoveMenu,cell,remove,setRemove}) {
    const close=(e)=>{
        if(e.target.id==='container'){
            open(false)
            setRemove(false);
        }
    }
    console.log(recipe);
    return (
    <div id='container' onClick={close} className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center ">
        <div className="bg-white w-[420px] h-[500px] flex flex-col items-center rounded-lg">
        <AiFillCloseCircle className='h-10 w-10 opacity-80 hover:opacity-20 cursor-pointer' onClick={()=>{open(false);setRemove(false);}}></AiFillCloseCircle>
        <RecipeCard recipe={recipe}></RecipeCard>
        { remove? (<button className="mt-10 bg-slate-200 p-1 rounded-md font-serif font-bold text-slate-600 disabled" onClick={()=>handleRemoveMenu(recipe._id,cell)}> 
            Removed
        </button>) :
        (<button className="mt-10 bg-slate-200 p-1 rounded-md font-serif font-bold text-red-700 cursor-pointer hover:bg-slate-400" onClick={()=>handleRemoveMenu(recipe._id,cell)}> 
            Remove Menu From Calendar
        </button>)
}
        </div>
    </div>
  )
}
