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
        <header className=' py-3 shadow bg-slate-700 text-white text-lg'>
            <Container >
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link>
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className='flex gap-4 ml-auto'>
                        {navItems.map((items) =>
                            items.active ? (
                                <li key={items.name}>
                                    <button onClick={() => navigate(items.slug)} className='inline-block px-3 py-2 duration-300 rounded-xl cursor-pointer  text-white'>
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
            </Container>
        </header>
    )
}

export default Header
