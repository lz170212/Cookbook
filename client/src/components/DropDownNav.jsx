import React from "react";
//import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function DropDownNav() {
  const Menus = [
    { title: "Saved Dish", url: "/saved-dish" },
    { title: "Weekly Menu", url: "/weekly-menu" },
    { title: "Shopping List", url: "/shopping-list" },
    { title: "Profile", url: "/profile" },
    { title: "Create New Recipe", url: "/create-recipe"}
  ];
  const [isClosed, setIsClose] = useState(true);
  const toggling = () => setIsClose(false);
  return (
    isClosed && (
      <div className='h-screen absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md origin-top-right' >
        <ul className="mt-5">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className=" text-gray-700 text-sm font-semibold flex items-center
                gap-x-4 curson-pointer p-5 hover:bg-white  rounded-md"
            >
              <Link to={menu.url} onClick={toggling}>
                <span className="font-medium flex-1">{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
