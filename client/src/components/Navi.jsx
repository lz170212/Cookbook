import React from 'react';
import {NavLink} from 'react-router-dom' 

export default function Navi() {
    const Menus =[
        {title: "Saved Dish", url:"/saved-dish"},
        {title: "Weekly Menu",url:"/weekly-menu"},
        {title: "Shopping List",url:"/shopping-list"},
        {title: "Profile",url:"/profile"},
    ];
    ///To-do change color of the <li> background
    const changeColor=(e)=>{
    };

  return (
    <nav className='bg-gray-100 shadow-md md:min-h-screen'>
       <ul className='mt-5'>
        {
            Menus.map((menu,index)=>(
                <li key={index} className=' text-gray-700 text-sm font-semibold flex items-center
                gap-x-4 curson-pointer p-5 hover:bg-white  rounded-md' onClick={changeColor()}><NavLink to={menu.url}  ><span className='p-5 font-medium flex-1 whitespace-nowrap'>{menu.title}</span></NavLink></li>
            ))
        }
       </ul>
    </nav>
  )
}
