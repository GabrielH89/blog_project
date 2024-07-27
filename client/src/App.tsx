import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/user/SignIn';
import Home from './components/Post/Home';
import User_info from './components/user/User_info';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/posts' element={<Home/>}></Route>
        <Route path='/user-info' element={<User_info/>}></Route>
      </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
