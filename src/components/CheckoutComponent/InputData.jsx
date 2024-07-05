import React from 'react';
import { Warning } from '../../utils/Icons';
import InputErrorMessage from './InputErrorMessage';

function InputData ({setters,gender,requiredField,setReferral}) {

  const {
    setFirstName,
    setLastName,
    setGender,
    setEmail,
    setPhoneNumber
  } = setters;

  function showColor (condition) {
    if (condition) return "bg-[#235FD2]"
    else return "bg-[white] border border-[#AEB3BE]"
  }
  

  return (
    <div className='w-[100%] min-h-[320px] border border-[#E8E8E8] rounded-[8px] flex flex-col px-[25px] py-[20px] mt-5 bg-content-s'>
      <div className='w-full h-[46px] bg-[#FFEFBB] mt-[1px] rounded-[6px] flex items-center pl-2'>
        <Warning color={"#D66100"} size={20}/>
        <span className='ml-2 font-semibold text-[14px]'>Selesaikan Pembayaran Sebelum Waktunya</span>
      </div>
      <div className='w-full flex items-center mt-5'>

        <div 
          onClick={e=>setGender('Laki-laki')} 
          className={`w-[20px] h-[20px] rounded-[100%] ${showColor(gender === "Laki-laki")} flex justify-center items-center cursor-pointer`}
        >
          <div className='w-[9px] h-[9px] rounded-[100%] bg-white'>

          </div>
        </div>
        <div className='ml-3'>
          Pria
        </div>
        <div 
          onClick={e=>setGender('Perempuan')} 
          className={`w-[20px] h-[20px] rounded-[100%] ${showColor(gender === "Perempuan")} flex justify-center items-center ml-[23px] cursor-pointer`}
        >
          <div className='w-[9px] h-[9px] rounded-[100%] bg-white'>

          </div>
        </div>
        <div className='ml-3'>
          Wanita
        </div>
      
      </div>
      <div className="w-full mt-[14px] flex justify-between">
        <div className='w-[48%]'>
          <span>Nama Depan</span>
          <input onChange={e=>setFirstName(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
        <InputErrorMessage requiredArr={requiredField} field={"first_name"}/>
        </div>
        <div className='w-[48%]'>
          <span>Nama Belakang</span>
          <input onChange={e=>setLastName(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
        <InputErrorMessage requiredArr={requiredField} field={"last_name"}/>
        </div>
      </div>
      <div className='w-full mt-[10px]'>
        <span>Email</span>
        <input onChange={e=>setEmail(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
        <InputErrorMessage requiredArr={requiredField} field={"email"}/>

      </div>
      <div className='w-full mt-[10px]'>
        <span>Nomor HP</span>
        <input onChange={e=>setPhoneNumber(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
        <InputErrorMessage requiredArr={requiredField} field={"phone_number"}/>
      </div>
      <div className='w-full mt-[10px]'>
        <span>Referral</span>
        <input onChange={e=>setReferral(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
        {/* <InputErrorMessage requiredArr={requiredField} field={"phone_number"}/> */}
      </div>
    </div>
  )

}

export default InputData;