import React, { forwardRef, useId } from 'react'

// forwordRef() is used to pass ref from parent component to the child component
const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            {label && <label
                className='inline-block mb-1 pl-1 '
                htmlFor={id}
            >
                {label}
            </label>
            }
            <input
            type={type}
            id={id}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 w-full border border-gray-200 ${className}`} 
            {...props}
            ref={ref}
            
            />
        </div>
    )
})

export default Input
