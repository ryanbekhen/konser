import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {  
  setSelectedPayment,
  setIsOpen,
  setIsSelectVa,
  setSelectedVa } from '../../features/Checkout/CheckoutSlice';

function SmallPaymentList ({objData,image,fetchApiFee}) {

  const dispatch = useDispatch();

  const selectedPayment = useSelector((state) => state.checkout.selectedPayment);
  const total = useSelector((state) => state.checkout.total);
  const selectedVa = useSelector((state) => state.checkout.selectedVa);


  function checkPaymentIsVa () {
    if (selectedPayment === objData.method || (objData.isVa && selectedPayment.split(' ')[0] === 'VA')) return true
    return false
  }

  function handleIsSelected () {
    if (checkPaymentIsVa()) return "w-[25px] h-[25px] rounded-[100%] border border-[white] bg-[#235FD2] flex justify-center items-center"
    return "w-[25px] h-[25px] rounded-[100%] border border-[#E8E8E8]"
  }

  function changePaymentMethod (e) {
    if (objData.isVa) {
      // HANDLE LOGIC VIRTUAL ACCOUNT
      dispatch(setIsOpen(true))
      return false 
    }
    dispatch( setSelectedPayment(objData.method))
    fetchApiFee({
      paymentMethod : objData.value,
      amount : total,
      paymentDetail : "-"
    })
  }

  function changePaymentMethodVa () {
    dispatch(setSelectedPayment(objData.method))
    fetchApiFee({
      paymentMethod : "VA",
      paymentDetail : objData.value,
      amount : total
    })
    // console.log()
    dispatch(setSelectedVa(objData.value))
    dispatch(setIsOpen(false))
    dispatch(setIsSelectVa(true))
  }

  return (
    <div 
      className='flex p-[15px] rounded-[8px] border border-[#F5F5F5] w-full h-[50px] mt-5 items-center justify-between cursor-pointer'
      onClick={e=> !objData.isVaList ?  changePaymentMethod(e) :  changePaymentMethodVa(e)}
    >
      <div className='flex items-center'>
        <img src={image} className='w-[17px] h-[17px]' alt='pay-l'/>
        <span className='ml-2 font-light text-[#737E86] text-[14px]'>{objData.method}{ objData.method === "VA" && " " + selectedVa}</span>
      </div>
      <div className={handleIsSelected()}>
        {
          checkPaymentIsVa()  &&
          <div className='rounded-[100%] border-2 border-[white] w-[18px] h-[18px]'>
            
          </div>
        }
      </div>
    </div>
  )

}

export default SmallPaymentList;