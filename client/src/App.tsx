import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/user/SignIn';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
      </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
