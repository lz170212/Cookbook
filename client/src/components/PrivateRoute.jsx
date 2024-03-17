import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navi from './Navi';

export default function PrivateRoute(){
    const {currentUser} = useSelector((state)=> state.user);
    return currentUser? (<div className="flex"><Navi/> <Outlet/></div>) : <Navigate to='/sign-in'/>;
}