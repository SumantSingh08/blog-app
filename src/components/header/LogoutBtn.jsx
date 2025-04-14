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
        <button onClick={logoutHander} className='inline-bock px-2 py-2 duration-200 bg-red-500 font-normal rounded-lg cursor-pointer'>
            Logout
        </button>
    )
}

export default LogoutBtn
