import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    type="text",
    placeholder="placeholder",
    width = "[70%]",
    ...props
}, ref){
    const id = useId()
    return (
        <input type={type}
        placeholder={placeholder}
        className={`bg-gray-700 px-10 py-3 mb-4 text-gray-100 rounded-md ${width}`}
        {...props}
        ref={ref}
        id={id}
         />
    )
})

export default Input;