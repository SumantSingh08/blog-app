import React, { useState } from 'react'
import authService from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '..//store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Button } from './index'
import { useForm } from 'react-hook-form'
import Input from './Input'


// register used to input validation and managing the input state
function Login() {
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const login = async (data) => {
        setError('');
        try {

            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log("userData", userData)
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }
           
           
        } catch (error) {
            setError(error.message)

        }

    }
    return (
        <div className='flex w-full  justify-center items-center py-8 mt-16 px-4'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-3 md:p-10 border border-black/10`}>
                <div className='flex justify-center mb-2'>
                    <span className='inline-block  w-full '>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-lg md:text-2xl font-bold'>Sign in to your account</h2>
                <p className='text-center text-black/60 text-sm md:text-base '>
                    Don&apos;t{/* ' */} have an account?&nbsp;{/* non braking space */}
                    <Link to="/Signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline text-blue-500'
                    >
                        Sign up
                    </Link>
                </p>
                {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            text='Email'
                            type='email'
                            placeholder='Enter your email'
                            {...register('email',
                                {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => { /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Invalid email address' }/*pattern using Regexp */
                                    }
                                }
                            )}
                        />
                        <Input
                            text='Password'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', { required: true })}
                        />
                        <Button
                            className='w-full cursor-pointer'
                            type='submit'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
