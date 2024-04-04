import {useState,useEffect} from 'react'
import MenuItem from './MenuItem';

export default function MenuList() {
  const [menuList,setMenuList] = useState([]);
  useEffect(()=>{
    
    fetchAllSavedDish();
},[]);

const fetchAllSavedDish= async ()=>{
  try {
    const res = await fetch('/api/recipe/saved-recipes',
    {method:'GET'});
    const {saved_recipes} = await res.json();
    const allMenuList = saved_recipes.map(recipe =>({menu: recipe}));
    setMenuList(allMenuList);
  } catch(err){
    console.log(err.message);
  }
}
  return (
    <div className='flex  mt-5 mr-10 grow flex-wrap  items-center gap-x-10'>
        {
            menuList?
        menuList.map((menu)=>(
            <MenuItem key={menu.menu._id} name={menu.menu.name} id={menu.menu._id} cellId={menu.menu._id} loc="list" menuInfo={menu}></MenuItem>
        ))
        : <span>Do not have saved menu</span>
        }
    
    </div>
  )
}