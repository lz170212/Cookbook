import Cell from "./Cell";
import {useEffect, useState,useRef} from 'react';
import PopupRecipe from './PopupRecipe';

const daysOfWeek = [
  { id: 0, day: "Sun" },
  { id: 1, day: "Mon" },
  { id: 2, day: "Tue" },
  { id: 3, day: "Wed" },
  { id: 4, day: "Thu" },
  { id: 5, day: "Fri" },
  { id: 6, day: "Sat" },
];
export default function WeekCalendar({setAllMenuCalendar,allMenuCalendar,handleRemoveMenu,removedSuccess,setRemovedSuccess}) {
  const [popupOpen, setPopupOpen]=useState(false);
  const [clickedMenu, setClickedMenu]=useState({});
  useEffect(() => {
    fetchAllMenuOnCalendar();
  }, []);

  const fetchAllMenuOnCalendar = async () => {
    try {
      const res = await fetch("/api/recipe/weekly-menu", { method: "GET" });
      const { weekly_menu } = await res.json();
      setAllMenuCalendar(weekly_menu);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
    <div className="grid grid-cols-9 gap-0   h-64 mr-10 bg-slate-50 mt-5 rounded-md border-2">
      <div className="col-span-2 grid auto-rows-fr grid-flow-row  sticky">
        <Cell></Cell>
        <Cell>Breakfast</Cell>
        <Cell>Lunch</Cell>
        <Cell>Snack</Cell>
        <Cell>Dinner</Cell>
      </div>
      <div className="col-span-7 grid auto-cols-[10rem] grid-flow-col overflow-x-auto">
        {daysOfWeek.map((dayOfWeek) => (
          <div
            className="grid grid-rows-5 auto-rows-fr"
            key={dayOfWeek.id}
            id={dayOfWeek.id}
          >
            <Cell>{dayOfWeek.day}</Cell>
            <Cell meal="breakfast" id={dayOfWeek.id + "_breakfast"} allMenu={allMenuCalendar} openPopUp={()=>{setPopupOpen(true);}} setClickedMenu={setClickedMenu} handleRemoveMenu={handleRemoveMenu} >
            </Cell>
            <Cell meal="lunch" id={dayOfWeek.id + "_lunch"} allMenu={allMenuCalendar} openPopUp={()=>setPopupOpen(true)} setClickedMenu={setClickedMenu} handleRemoveMenu={handleRemoveMenu}></Cell>
            <Cell meal="snack" id={dayOfWeek.id + "_snack"} allMenu={allMenuCalendar} openPopUp={()=>setPopupOpen(true)} setClickedMenu={setClickedMenu} handleRemoveMenu={handleRemoveMenu}></Cell>
            <Cell meal="dinner" id={dayOfWeek.id + "_dinner"} allMenu={allMenuCalendar} openPopUp={()=>setPopupOpen(true)} setClickedMenu={setClickedMenu} handleRemoveMenu={handleRemoveMenu}></Cell>
          </div>
        ))}
      </div>
    </div>
    {
        popupOpen && <PopupRecipe close={()=>setPopupOpen(false)} menuInfo={clickedMenu} handleRemoveMenu={handleRemoveMenu} remove={removedSuccess} setRemove={setRemovedSuccess}></PopupRecipe>
      }
      </>
  );
  
}
