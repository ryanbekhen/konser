import React, { useState } from 'react'
import InputErrorMessage from './CheckoutComponent/InputErrorMessage';
import { EyeSlash } from '../utils/Icons';

const InputValidatorPassword = ({requiredField,field,type,label,placeholderText,setter,isCheckout,className}) => {
    
    function renderClassLabel () {
        if (isCheckout)return "mt-2"
        return "font-semibold  text-[20px] mt-[25px] w-[85%]"
    }

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <>
            <label className={renderClassLabel()}>
            {label}
            </label>

            <div className="relative w-[85%]">

            <input 
                type={showPassword ? 'text' : 'password'}
                onChange={e=>setter(e.target.value)} 
                className={`block w-full w-[100%] rounded-[6px] h-[44px] border border-[#dbdbdb] pl-[10px] mt-3 ${className} `} 
                placeholder={placeholderText}
            />
            
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center mt-3 px-3 text-gray-600"
                >

                {showPassword ? (

                    <EyeSlash size="18" />
                ) : (
    
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                )}

                </button>

            </div>
            

            <InputErrorMessage requiredArr={requiredField} field={field}/>
        </>
    )
}

export default InputValidatorPassword