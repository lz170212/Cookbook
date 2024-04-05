import React, { useEffect, useState } from 'react';
import IngredientItem from '../components/IngredientItem';

export default function ShoppingListPage() {

  const [ myStores, setMyStores ] = useState(null)
  const [ shoppingList, setShoppingList ] = useState([])

    // shoppingList: [ {item: xxx, quantity: 11, related_recipes: []}, { ... } ]

  const extractFromMenu = (weekly_menu) => {

    let list = weekly_menu.reduce((acc, {menu}) => {
      let { name: recipe, ingredients} = menu;
      for(let j=0; j < ingredients.length; j++){
        let ingredientsArr = ingredients[j].split(' ')
        let quantity = Number(ingredientsArr[0])
        let item = ingredientsArr[ingredientsArr.length-1]
        
        if(acc[item]){
          acc[item].quantity += quantity
          if(!acc[item].related_recipes.includes(recipe)){
            acc[item].related_recipes.push(recipe)
          }
        } else {
          acc[item] = {quantity, related_recipes: [recipe]}
        }
      }
      return acc
    }, {})

    setShoppingList(list)
  }

  const formListWithWeeklyMenu = async () => {
    try{
      const res = await fetch('/api/recipe/weekly-menu')
      const { weekly_menu } = await res.json()
      extractFromMenu(weekly_menu)
      
    } catch(err){
      console.log(err.message)
    }
  }

  const getMyStores = async () => {
    try {
      const res = await fetch('/api/user/my-stores')
      const {data} = await res.json()
      setMyStores(data)

    } catch(err){
      console.log(err.message)
    }

  }

  useEffect(() => {
    formListWithWeeklyMenu()
    getMyStores()
  }, [])

  console.log(shoppingList)

  return (
    <div className='w-full font-montserrat mx-10'>
      
      <h1 className='font-bold text-blue-500 text-2xl mx-auto my-6'>Groceries for the Week</h1>
      
      <div className=''>
        shopping list table
      </div>
    </div>
  )
}
