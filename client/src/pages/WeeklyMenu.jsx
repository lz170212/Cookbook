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
  const [clickedCell, setClickedCell]=useState(null);
  const [menuList,setMenuList] = useState(null);
  //const {loading} = useSelector((state)=>state.user);
  const [menuCalendar, setMenuCalendar] = useState([]);
  const [removedSuccess,setRemovedSuccess] = useState(false);
  const savedRecipeList = useRef([]);
  const calendarMenu = useRef([]);
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
    try{
      const res = await fetch('/api/recipe/weekly-menu',
      {method:'GET'});
      const {weekly_menu} = await res.json();
      console.log(weekly_menu);
      calendarMenu.current = weekly_menu;
      setMenuCalendar(weekly_menu);
      weekly_menu.map((everydayMenu)=>
      { 
        const cellId = everydayMenu.day+"_"+everydayMenu.time;
        showMenuOnCalendar(cellId,everydayMenu.menu.name);
      }
      );
    }catch(err){
      console.log(err.message)
    }
  }
  ///api/recipe/saved-recipes
  const fetchAllSavedDish= async ()=>{
    try {
      const res = await fetch('/api/recipe/saved-recipes',
      {method:'GET'});
      const {saved_recipes} = await res.json();
      setMenuList(saved_recipes);
      savedRecipeList.current=saved_recipes;
    } catch(err){
      console.log(err.message);
    }
  }
  const showMenuOnCalendar= (id,menu)=>{
    const newMenuLocation = document.getElementById(id);
    newMenuLocation.innerHTML= menu;
    newMenuLocation.style.backgroundColor="rgb(226 232 240)";
    newMenuLocation.style.borderRadius = "10px";
    newMenuLocation.onclick =()=>{
      setPopupOpen(true);
      const recipe = getRecipeByItsName(menu);
      setClickedRecipe(recipe);
      setClickedCell(id);
    }

  }
  const addMenuToCalendar =(e)=>{
    const {active, over} =e;
    const menu = active.data.current; 
    showMenuOnCalendar(over.id,menu.name);
    saveMenuInDB(over.id,menu.id);
  }
  const saveMenuInDB = async (location, menuId)=>{
    const time = location.split('_');
    //time[0]-> day  time[1]->time: breakfast...
    try{
      const res= await fetch('/api/recipe/save-weekly-menu',
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          day:time[0],
          time:time[1],
          menu:menuId,
        }),
      });
    }catch(err){
      console.log(err.message);
    }
  }
  const getRecipeByItsName =(menu)=>{
    const recipe= savedRecipeList.current.find((element)=>element.name===menu);
    return recipe;
  }
  const openPopUp =(open)=>{setPopupOpen(open);}

  const handleRemoveMenu = async (recipeId,cell)=>{
    //remove it from db weekly menu
    //update the state re-render page show Removed
    const time = cell.split('_');
    try{
      const res = await fetch(`/api/recipe/remove-weekly-menu/${recipeId}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          day:time[0],
          time:time[1],
          menu:recipeId,
        }),});
       const updatedMenu = calendarMenu.current.filter(menu=>(menu.day!=time[0]&&menu.time!=time[1]&&menu.menu!=recipeId));
        setMenuCalendar(updatedMenu);
        setRemovedSuccess(true);

      
    }catch(err){
      console.log(err.message);
    }
}
  return (
    <div className='ml-10 flex flex-col items-center'>
      <h1 className='mt-10'>Weekly Menu</h1>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={addMenuToCalendar}> 
      <WeekCalendar></WeekCalendar>
      <MenuList menuList={menuList} ></MenuList>
      </DndContext>
      {
        popupOpen && <PopupRecipe open={openPopUp} recipe={clickedRecipe} cell ={clickedCell} handleRemoveMenu={handleRemoveMenu} remove={removedSuccess}></PopupRecipe>
      }
    </div>
  )
}
