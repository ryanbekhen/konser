import React from 'react';
import InputErrorMessage from './CheckoutComponent/InputErrorMessage';


function InputValidator ({requiredField,field,type,label,placeholderText,setter,isCheckout,className}) {

  function renderClassLabel () {
    if (isCheckout)return "mt-2"
    return "font-semibold  text-[20px] mt-[25px] w-[85%]"
  }

  return (
    <>
      <label className={renderClassLabel()}>
        {label}
      </label>
      <input 
        type={type?type :"text"} 
        onChange={e=>setter(e.target.value)} 
        className={`w-[85%] rounded-[6px] h-[44px] border border-[#dbdbdb] pl-[10px] mt-3 ${className} `} 
        placeholder={placeholderText}
      />
      <InputErrorMessage requiredArr={requiredField} field={field}/>
    </>
  )

}

export default InputValidator;