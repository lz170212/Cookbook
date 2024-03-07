import {BrowserRouter,Routes, Route }from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import RecipePage from './pages/Recipe';

export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe/:id' element={<RecipePage />} />
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}
