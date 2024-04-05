import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import Filter from '../components/Filter'
import { useLocation, useParams } from 'react-router-dom';

export default function Home() {

  console.log("enter home page"+ window.location.search);
  const [ recipes, setRecipes ] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    highlights: [],
    cookingTime: '',
    sort: 'createdAt',
  });

  const location = useLocation();
  useEffect(()=>{
    console.log(location.search);
    //user change url directly
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get('searchTerm');
    const urlHighlight = urlParams.get('highlight');
    const urlCookingTime = urlParams.get('cookingTime');
    const urlSort = urlParams.get('sort');
    if(urlSearchTerm || urlHighlight || urlCookingTime || urlSort){ // at least one of them not null
      //1. set filter UI
      setFilterOptions({
        highlights:urlHighlight,
        cookingTime: urlCookingTime,
        sort: urlSort,
      })
      //2. fetch result from database
      const fetchSearchedRecipes = async ()=>{
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/recipe/search-recipe?${searchQuery}`);
        const recipes = await res.json();
        console.log(recipes);
        setRecipes(recipes);
      }
      
      fetchSearchedRecipes();
    }
  },[location.search])
  
  const fetchRecipes = async () => {
    try {
      const res = await fetch('/api/recipe/get', {
          method: 'GET'})

      const { data } = await res.json();

      setRecipes(data)

    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    if(recipes === null){
        fetchRecipes({})
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row'>
    <Filter filter={filterOptions} setFilter ={setFilterOptions}></Filter>
    <div className='py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] gap-5 flex flex-wrap'>
      {console.log(recipes)}
      {
        
        recipes ? 
        recipes.map((recipe, i) => {
          return <RecipeCard  key={i} recipe={recipe}/>
        })
        : ""
      }
    </div>
    </div>
  )
}
 