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
        <button onClick={logoutHander} className='inline-bock px-3 py-2 duration-200 font-bold bg-red-500 text-white  rounded-full cursor-pointer'>
            Logout
        </button>
    )
}

export default LogoutBtn
