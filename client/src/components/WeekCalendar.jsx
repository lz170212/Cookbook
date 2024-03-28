import React from 'react';
import Cell from './Cell';

//className="col-span-7   grid grid-rows-5 auto-cols-[10rem] grid-flow-col overflow-x-auto">
const daysOfWeek = [{id: 0,day:"Sun"},{id: 1,day:"Mon"},{id: 2,day:"Tue"},{id: 3,day:"Wed"},{id: 4,day:"Thu"},{id: 5,day:"Fri"},{id: 6,day:"Sat"}];
export default function WeekCalendar({newMenu, cell}) {
  return (
    <div className='grid grid-cols-8 gap-0   h-64 mr-10 bg-slate-50 mt-5 rounded-md border-2'>
        <div className='col-span-1 grid auto-rows-fr grid-flow-row  w-[100px] sticky'>
            <Cell></Cell>
            <Cell>Breakfast</Cell>
            <Cell>Lunch</Cell>
            <Cell>Snack</Cell>
            <Cell>Dinner</Cell>
        </div>
        <div className="ml-0 col-span-7 grid auto-cols-[10rem] grid-flow-col overflow-x-auto">  
            {daysOfWeek.map((dayOfWeek)=>(
               <div className='grid grid-rows-5 auto-rows-fr'  key={dayOfWeek.id} id={dayOfWeek.id}>
            <Cell >{dayOfWeek.day}</Cell> 
            <Cell meal='breakfast' id={dayOfWeek.id+'_breakfast'}> </Cell>
            <Cell meal ='lunch' id={dayOfWeek.id+'_lunch'}></Cell>
            <Cell meal ='snack' id={dayOfWeek.id+'_snack'}></Cell>
            <Cell meal ='dinner' id={dayOfWeek.id+'_dinner'}></Cell>
            </div>
            ))}
       
        </div>
        
    </div>
  )
}
