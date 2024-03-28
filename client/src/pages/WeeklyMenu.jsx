import {useEffect, useState} from 'react'
import WeekCalendar from '../components/WeekCalendar'
import MenuList from '../components/MenuList'
import PopupRecipe from '../components/PopupRecipe'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function WeeklyMenu() {
  const [menuList, setMenuList] = useState([]);
  const [popupOpen, setPopupOpen]=useState(false);
  const [clickedRecipe, setClickedRecipe]=useState(null);
  const [newMenuOnCalendar, setNewMenuOnCalendar] = useState(null);
  const [cellId, setCellId] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(()=>{
      fetchAllSavedDish();
  },[]);
  ///api/recipe/saved-recipes
  const fetchAllSavedDish= async ()=>{
    try {
      const res = await fetch('/api/recipe/saved-recipes',
      {method:'GET'});
      const {saved_recipes} = await res.json();
      setMenuList(saved_recipes);


    } catch(err){
      console.log(err.message)
    }
  }
  const addMenuToCalendar =(e)=>{
    const {active, over} =e;
    const menu = active.data.current?.name; 
    const newMenuLocation = document.getElementById(over.id);
    console.log(newMenuLocation.innerHTML);
    newMenuLocation.innerHTML= menu;
    newMenuLocation.style.backgroundColor="rgb(226 232 240)";
    newMenuLocation.onclick =()=>{
      setPopupOpen(true);
      const recipe = getRecipeByItsName(menu);
      setClickedRecipe(recipe);
    }

  }
  const getRecipeByItsName =(menu)=>{
    const recipe= menuList.find((element)=>element.name===menu);
    return recipe;
  }
  const openPopUp =(open)=>{setPopupOpen(open);}
  return (
    <div className='ml-10 flex flex-col items-center'>
      <h1 className='mt-10'>Weekly Menu</h1>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={addMenuToCalendar}> 
      <WeekCalendar addedMenu={newMenuOnCalendar} cell={cellId}></WeekCalendar>
      <MenuList menuList={menuList} ></MenuList>
      </DndContext>
      {popupOpen && <PopupRecipe open={openPopUp} recipe={clickedRecipe}></PopupRecipe>}
      

    </div>
  )
}
