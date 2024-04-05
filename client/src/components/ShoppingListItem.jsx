import React, { useState } from 'react'

export default function ShoppingListItem ({ ingredient, quantity, related_recipes, store, index }) {

    const [ storeName, setStoreName ] = useState(store)

    const handleStoreChange = (e) => {
        setStoreName(e.target.value)
    }

    const handleStoreSave = async (e) => {
        if(e.keyCode === 13){
            try {
                const res = await fetch('/api/user/save-store', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ingredient, storeName})
                })
                
            } catch (err){
                console.log(err.message)
            }
        }
    }

    return (
        <div className={ (index% 2 === 1 ? 'bg-slate-200 ' : 'bg-slate-100 ') + 'h-14 py-2 px-1 grid grid-cols-7'}>
            <span className='col-span-1 px-1'>{ingredient}</span>
            <span className='col-span-1 px-1'>{quantity}</span>
            <span className='col-span-3 px-1 overflow-auto'>
                { 
                    related_recipes.map((recipe, i) => {
                        if(i === related_recipes.length - 1){
                            return <span key={i} className='px-1'>{recipe}</span>
                        } else {
                        return <span key={i} className='px-1'>{recipe}, </span>
                        }
                    })
                }
            </span>
            <div className='col-span-2 px-1'>
                <input  className='h-8 rounded-md px-1' 
                        value={ storeName } 
                        placeholder='Enter Store Name...'
                        onChange={handleStoreChange} 
                        onKeyDown={handleStoreSave}
                />
            </div>
        </div>
    )
}
