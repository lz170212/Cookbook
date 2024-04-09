import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownNav from "./DropDownNav";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); // for drop down nav
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("enter handlesearch");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(()=>{  // use for user change url param directly to search
    const urlParams = new URLSearchParams(loc.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    if(urlSearchTerm) setSearchTerm(urlSearchTerm);
  },[loc.search]);

  return (
    <header className="sticky -top-0 bg-slate-200 shadow-md z-10">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Cookbook</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        {currentUser ? (
          <ul className="flex gap-4">
            <Link to="/">
              <li className=" hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              <div>
                <img
                  className="rounded-full h-7 w-7 object-cover cursor-pointer"
                  src={currentUser.avatar}
                  alt="personal_page"
                  onClick={toggle}
                />
                {isOpen && <DropDownNav closeDropDown={close}></DropDownNav>}
              </div>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-4">
            <Link to="/sign-in">
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
            <Link to="/sign-up">
              <li className="text-slate-700 hover:underline"> Sign up</li>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}
