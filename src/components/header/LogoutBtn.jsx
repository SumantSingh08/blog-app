import React from 'react'
import authService from '../../Appwrite/Auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHander = () =>{
        authService.logout()
        .then(() =>{dispatch(logout())})
        navigate('/')
        .catch((error) => console.log('Logout Error', error))
    }
    return (
        <button onClick={logoutHander} className='text-sm md:text-lg inline-bock px-2 py-2 md:py-1 duration-200 font-bold text-white bg-red-500  hover:bg-red-400 rounded-lg font-sans cursor-pointer'>
            Logout
        </button>
    )
}

export default LogoutBtn
