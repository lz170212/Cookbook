import React, { useState, useContext } from 'react'
// import { ShoppingListContext } from '../pages/ShoppingList';

export default function IngredientItem({ item, detail, index }) {

    // let {ingredients, setIngredients} = useContext(ShoppingListContext);
    // detail.recipes = {'kjadskljflkjaslkjdflkjasdlf': 2, 'lkdklkdjknkfjjffkjnjnxjnbdjvbn': 2, 'hhskhaskdhfkhadkjshfkjbkjsbdkjhfkhsekfbamsbdvmbsdf': 1, 'lakjdlfkjlkjasdf': 1}

    return (
        <div className={ (index% 2 === 1 ? 'bg-slate-200 ' : 'bg-slate-100 ') + 'h-14 py-2 px-1 grid grid-cols-7'}>
            <span className='col-span-1 px-1 '>{item}</span>
            <span className='col-span-1 px-1'>{detail.quantity}</span>
            <span className='col-span-3 px-1 overflow-auto'>
            {/* <span className=''>{item}</span>
            <span className=''>{detail.quantity}</span>
            <span className=''> */}
                { 
                    Object.keys(detail.recipes).map((recipe, i) => {
                        if(i === Object.keys(detail.recipes).length - 1){
                            return <span key={i} className='px-1'>{recipe}</span>
                        } else {
                        return <span key={i} className='px-1'>{recipe}, </span>
                        }
                    })
                }
            </span>
            <div className='col-span-2 px-1'>
                <input />
            </div>
        </div>
    )
}
