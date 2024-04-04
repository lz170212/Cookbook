import React, { useEffect, useState, createContext } from 'react';
import IngredientItem from '../components/IngredientItem';

// export const ShoppingListContext = createContext({})

export default function ShoppingList() {

  const [ ingredients, setIngredients ] = useState(null)

  const extractIngredients = ( weekly_menu ) => {
    // { name: { quantity: xxx, recipes: {} } }
    
    let result = { } 
    for (let i = 0; i < weekly_menu.length; i++){
      let { name: recipe, ingredients } = weekly_menu[i].menu
      for (let j = 0 ; j < ingredients.length; j ++){
        let array = ingredients[j].split(' ')
        let ingredient = array[array.length - 1]
        let quantity = isNaN(Number(ingredients[j].split(' ')[0])) ? 0.1 : Number(ingredients[j].split(' ')[0])

        if (ingredient in result){
          
          result[ingredient].quantity += quantity
          if (!recipe in result[ingredient].recipes){
            result[ingredient].recipes[recipe] = 1
          } else {
            result[ingredient].recipes[recipe] += 1
          }
          
        } else {
          result[ingredient] = { quantity, recipes: {[recipe]: 1} }
        }
      }
      
      setIngredients(result)
    }



  }

  const fetchWeeklyMenu = async () => {
    try{
      const res = await fetch('/api/recipe/weekly-menu')
      const { weekly_menu } = await res.json()
      extractIngredients(weekly_menu)

    } catch(err){
      console.log(err.message)
    }
 
  }

  useEffect(() => {
    fetchWeeklyMenu()
  }, [])

  return (
    // <ShoppingListContext.Provider value={{ ingredients, setIngredients }}>
    <div className='w-full font-montserrat mx-10'>
      
      <h1 className='font-bold text-blue-500 text-2xl mx-auto my-6'>Groceries for the Week</h1>
      
      <div className=''>
        {
          ingredients ? 
          Object.keys(ingredients).map((key, i) => {
            return <IngredientItem key={i} item={key} detail={ingredients[key]} index={i} />
          })
          : ""
        }

      </div>
    </div>
    // </ShoppingListContext.Provider>
  )
}
