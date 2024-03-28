import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard'

export default function SavedDish() {

  const fetchCollectedRecipes = async () => {
    try{
      const res = await fetch('/api/recipe/saved-recipes')
      const { saved_recipes } = await res.json()
      console.log(saved_recipes);
      setRecipes(saved_recipes)

    } catch(err){
      console.log(err.message)
    }
  }

  const [ recipes, setRecipes ] = useState([])

  useEffect(() => {
    fetchCollectedRecipes()
  }, [])

  return (
    <div className='w-full px-10 my-10 flex gap-10 justify-start flex-wrap'>
      {
        recipes.length ? 
          recipes.map((recipe, i) => {
            return <RecipeCard key={i} recipe={recipe} />
          })
          : 
          <p className='font-gelasio font-medium'>You haven't collected any recipes yet ...</p>
      }
    </div>
  )
}
