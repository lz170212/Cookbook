import React from 'react';
import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl  mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Cookbook</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <button>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Sign in</a>  
        </div>
    </header>
  )
}
