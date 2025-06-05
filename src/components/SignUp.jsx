import React, {useState} from 'react'
import authService from '../Appwrite/Auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from './Input.jsx'
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const SignUp = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                console.log(userData)
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            console.error("Error creating account:", error)
            setError(error.message)
        }
    }

  return (
    <div className="w-full  flex items-center justify-center py-8 mt-16 px-4">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-4 md:p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="md:inline-block w-full ">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-lg md:text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-1 mb-2 md:mt-0 text-center text-sm md:text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(SignUp)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type='submit' className='w-full cursor-pointer'>
                            create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup