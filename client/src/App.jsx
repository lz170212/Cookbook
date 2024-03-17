import {BrowserRouter,Routes, Route }from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import RecipePage from './pages/Recipe';
import PrivateRoute from './components/PrivateRoute'
import SavedDish from './pages/SavedDish';
import WeeklyMenu from './pages/WeeklyMenu';
import Profile from './pages/Profile';
import ShoppingList from './pages/ShoppingList';
import CreateRecipe from './pages/CreateRecipe';

export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe/:id' element={<RecipePage />} />
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/saved-dish' element={<SavedDish/>}/>
          <Route path='/weekly-menu' element={<WeeklyMenu/>}/>
          <Route path='/shopping-list' element={<ShoppingList/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/create-recipe' element={<CreateRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}
