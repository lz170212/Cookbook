import RecipeCard from "./RecipeCard"
import { AiFillCloseCircle } from "react-icons/ai";

export default function PopupRecipe({close,handleRemoveMenu,menuInfo,remove,setRemove}) {
    const closePopup=(e)=>{
        if(e.target.id==='container'|| e.currentTarget.id==='button'){
            close();
            setRemove(false);
        }
    }
    const handleClick =()=>{
        handleRemoveMenu(menuInfo);
        setRemove(true);
        
    }
    return (
    <div id='container' onClick={closePopup} className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center ">
        <div className="bg-white w-[420px] h-[500px] flex flex-col items-center rounded-lg">
        <button id='button' onClick={closePopup}><AiFillCloseCircle className='h-10 w-10 opacity-80 hover:opacity-20 cursor-pointer' ></AiFillCloseCircle></button>
        <RecipeCard recipe={menuInfo.menu}></RecipeCard>
        { remove? (<button className="mt-10 bg-slate-200 p-1 rounded-md font-serif font-bold text-slate-600 disabled"> 
            Removed
        </button>) :
        (<button className="mt-10 bg-slate-200 p-1 rounded-md font-serif font-bold text-red-700 cursor-pointer hover:bg-slate-400" onClick={handleClick}> 
            Remove Menu From Calendar
        </button>)
}
        </div>
    </div>
  )
}
