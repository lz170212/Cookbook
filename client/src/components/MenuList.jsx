import React from 'react'
import MenuItem from './MenuItem';

export default function MenuList({menuList}) {
  console.log(menuList);
  return (
    <div className='flex  mt-10 mr-10 grow flex-wrap  items-center gap-10'>
        {
            menuList?
        menuList.map((menu)=>(
            <MenuItem key={menu._id} name={menu.name} id={menu._id}></MenuItem>
        ))
        : <span>Do not have saved menu</span>
        }
    
    </div>
  )
}