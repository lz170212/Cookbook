import React, { useEffect, useState } from 'react';
import ShoppingListItem from '../components/ShoppingListItem';

export default function ShoppingListPage() {

  const [ myStores, setMyStores ] = useState({})
  const [ shoppingList, setShoppingList ] = useState({})

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
      const {my_stores} = await res.json()
      setMyStores(my_stores)

    } catch(err){
      console.log(err.message)
    }

  }

  useEffect(() => {
    formListWithWeeklyMenu()
    getMyStores()
  }, [])

  // console.log(Object.keys(shoppingList))

  return (
    <div className='w-full font-montserrat mx-10'>
      
      <h1 className='font-bold text-blue-500 text-2xl mx-auto my-6'>Groceries for the Week</h1>
      
      <div className=''>
        {
          Object.keys(shoppingList).length ?
            Object.keys(shoppingList).map((ingredient, i) => {
              console.log(shoppingList[ingredient])
              let { quantity, related_recipes} = shoppingList[ingredient]
              let store = myStores[ingredient] !== undefined ? myStores[ingredient] : ''
              return <ShoppingListItem key={i} ingredient={ingredient} quantity={quantity} related_recipes={related_recipes} store={store} index={i}/>

            })
            :
            "You need to create weekly menu first"
        }
      </div>
    </div>
  )
}
