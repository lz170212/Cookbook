import {useEffect, useState, useRef} from 'react'
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
  const [popupOpen, setPopupOpen]=useState(false);
  const [clickedRecipe, setClickedRecipe]=useState(null);
  const [menuList,setMenuList] = useState(null);
  //const [menuCalendar, setMenuCalendar] = useState([]);
  const savedRecipeList = useRef([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(()=>{
    if(menuList===null){
      fetchAllSavedDish();
    }
      fetchAllMenuOnCalendar();
      
  },[]);
  const fetchAllMenuOnCalendar = async ()=>{
    const res = await fetch('/api/recipe/weekly-menu',
    {method:'GET'});
    const {weekly_menu} = await res.json();
    //setMenuCalendar(weekly_menu);
    //console.log(menuCalendar);
    weekly_menu.map((everydayMenu)=>
     { 
      const cellId = everydayMenu.day+"_"+everydayMenu.time;
      showMenuOnCalendar(cellId,everydayMenu.menu.name);
    }
    );
  }
  ///api/recipe/saved-recipes
  const fetchAllSavedDish= async ()=>{
    try {
      const res = await fetch('/api/recipe/saved-recipes',
      {method:'GET'});
      const {saved_recipes} = await res.json();
      setMenuList(saved_recipes);
      //menuList =saved_recipes;
      console.log(saved_recipes);
      savedRecipeList.current=saved_recipes;
      //console.log(savedRecipeList);
    } catch(err){
      console.log(err.message)
    }
  }
  const showMenuOnCalendar= (id,menu)=>{
    const newMenuLocation = document.getElementById(id);
    newMenuLocation.innerHTML= menu;
    console.log(menu);
    newMenuLocation.style.backgroundColor="rgb(226 232 240)";
    newMenuLocation.onclick =()=>{
      setPopupOpen(true);
      const recipe = getRecipeByItsName(menu);
      setClickedRecipe(recipe);
    }

  }
  const addMenuToCalendar =(e)=>{
    const {active, over} =e;
    const menu = active.data.current?.name; 
    showMenuOnCalendar(over.id,menu);
  }
  const getRecipeByItsName =(menu)=>{
    //console.log(savedRecipeList);
    const recipe= savedRecipeList.current.find((element)=>element.name===menu);
    return recipe;
  }
  const openPopUp =(open)=>{setPopupOpen(open);}
  return (
    <div className='ml-10 flex flex-col items-center'>
      <h1 className='mt-10'>Weekly Menu</h1>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={addMenuToCalendar}> 
      <WeekCalendar></WeekCalendar>
      {console.log(menuList)}
      <MenuList menuList={menuList} ></MenuList>
      </DndContext>
      {popupOpen && <PopupRecipe open={openPopUp} recipe={clickedRecipe}></PopupRecipe>}
      

    </div>
  )
}
