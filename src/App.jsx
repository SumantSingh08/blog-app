import { useEffect, useState } from 'react'
import authService from './Appwrite/Auth';
import {useDispatch} from 'react-redux' 
import {login, logout} from './store/authSlice'
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import './App.css'
import { Outlet } from 'react-router-dom';
// we used loading state for improve user experience by indicating data being fached.
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    
    })
    .finally(() => setLoading(false))
  },[])

   return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-700'>
      <div className='w-full '>
        <Header/>
        <main>
          <Outlet/>
        </main>
        
        <Footer/>
 
      </div>
    </div>
   ) : null
}

export default App
