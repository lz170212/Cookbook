import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import {Link} from "react-router-dom";

export default function SignOut({location,closeDropDown}) {
    const {currentUser} =useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const handleSignOut = async (e) => {
    if(location==="dropdown"){
        closeDropDown();
    }
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure(data.message));
    }
  };

  return <Link to="/"><span className={location==='dropdown'?'font-medium flex-1 cursor-pointer':'text-red-700 cursor-pointer'} onClick={handleSignOut}>Sign out</span></Link>;
}
