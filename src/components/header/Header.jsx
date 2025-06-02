import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// navigate same as a <Link/>
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },

        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },

        {
            name: 'Add Posts',
            slug: '/add-post',
            active: authStatus
        }
    ]
    return (
        <header className='w-full md:max-w-3xl lg:max-w-5xl text-md shadow-lg  md:rounded-full md:my-4 mx-auto   md:px-10  text-gray-700  bg-white text-lg'> 
                <nav className='w-full md:flex py-2  px-1 items-center md:justify-between md:gap-1'>
                    <div className='hidden  md:block  md:w-[30%] md:pr-6 font-bold my-auto'>
                        <Link>
                            <Logo  />
                        </Link>
                    </div>
                    <ul className='flex gap-0.5 justify-evenly md:w-[70%]  md:gap-4 text-center items-center '>
                        {navItems.map((items) =>
                            items.active ? (
                                <li key={items.name}>
                                    <button onClick={() => navigate(items.slug)} className='w-full h-auto px-2 py-1  text-sm md:text-lg inline-block  duration-300 rounded-md cursor-pointer outline-hidden  text-black font-bold font-sans hover:bg-gray-300 '>
                                        {items.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}  {/* if condition true then exicute () */}
                    </ul>
                </nav>
        </header>
    )
}

export default Header
