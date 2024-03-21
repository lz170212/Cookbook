import React from "react";
//import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignOut from "./SignOut";
export default function DropDownNav({closeDropDown}) {
  const Menus = [
    { title: "Saved Dish", url: "/saved-dish" },
    { title: "Weekly Menu", url: "/weekly-menu" },
    { title: "Shopping List", url: "/shopping-list" },
    { title: "Profile", url: "/profile" },
    { title: "Create New Recipe", url: "/create-recipe"}
  ];

  return (
      <div className='h-screen absolute right-0 top-18 z-10 w-48 bg-white shadow-lg rounded-md origin-top-right' >
        <ul className="mt-5">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className=" text-gray-700 text-sm font-semibold flex items-center
                gap-x-4 curson-pointer p-5 hover:bg-blue-100  rounded-md"
            >
              <Link to={menu.url} onClick={closeDropDown}>
                <span className="font-medium flex-1">{menu.title}</span>
              </Link>
            </li>
          ))}
          <li className=" text-gray-700 text-sm font-semibold flex items-center
                gap-x-4 curson-pointer p-5 hover:bg-blue-100   rounded-md"
            >
                <SignOut location={'dropdown'} closeDropDown={closeDropDown}></SignOut>
            </li>
        </ul>
      </div>
  );
}
