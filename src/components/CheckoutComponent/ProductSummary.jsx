import React from "react";

import InputErrorMessage from "./InputErrorMessage";
import { CalendarOutline , Location , Warning } from '../../utils/Icons';
import { moneyFormat } from "../../utils/helpers";
import SummaryDetail from "../SummaryDetail";

function ProductSummary ({dataDetail,cartlist,setters,gender,requiredField}) {

  const {
    setFirstName,
    setLastName,
    setNik,
    setGender,
    setEmail,
    setPhoneNumber
  } = setters;

  function showColor (condition) {
    if (condition) return "bg-[#235FD2]"
    else return "bg-[white] border border-[#AEB3BE]"
  }

  return (
    <div className='sm:w-[48%] w-[100%] flex-col'>
      {/* <div className='w-[100%] h-[auto] border border-[#E8E8E8] rounded-[8px] flex sm:flex-row flex-col sm:px-[20px] px-[0]'>
        <img className='sm:w-[200px] w-[90%] sm:h-[150px] h-[220px] object-cover sm:rounded-[0] rounded-[4px] mt-[15px]' src= {dataDetail.img ? imgUrl+dataDetail.img : '/image/mushroom.jpg' } alt='i'/>
        <div className='flex-col h-[auto] ml-5 w-[90%] mt-[11px] mb-5'>
          <div className='font-bold'>
            {dataDetail&&dataDetail.subcat_name}
          </div>
          <div className='mt-[10px] flex items-center'>
            <CalendarOutline size={18} color={"#A0A0A0"}/> <span className='ml-2 font-light text-[#929292] text-[14px]'>28 Mei 2024</span>
          </div>
          <div className='mt-[15px] flex items-center mb-5'>
            <Location size={18} color={"#A0A0A0"}/> <span className='ml-2 font-light text-[#929292] text-[14px]'>Jakarta Barat</span>
          </div>
          {
            Array.isArray(cartlist) && cartlist.map((e,i)=>{
            return (
              <div className='font-semibold mt-3 text-[14px] flex w-full justify-between'>
                <div>
                  {e.qty} x {e.product_name}
                </div>
                <div>
                  {moneyFormat(e.modal * 1000)}
                </div> 
              </div>
            )
            })
          }
        </div>
      </div> */}
      <SummaryDetail cartlist={cartlist} dataDetail={dataDetail}/>
      <div className='w-[100%] min-h-[320px] border border-[#E8E8E8] rounded-[8px] flex flex-col px-[25px] py-[20px] mt-5'>
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
        <div className='w-full mt-[14px]'>
          <span>NIK</span>
          <input type="number" value={"1234567891234567"} onChange={e=>setNik(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
          <InputErrorMessage requiredArr={requiredField} field={"nik"}/>
        </div>
        <div className='w-full mt-[10px]'>
          <span>Email</span>
          <input onChange={e=>setEmail(e.target.value)} value={"sultanrayhanhabib@gmail.com"} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
          <InputErrorMessage requiredArr={requiredField} field={"email"}/>

        </div>
        <div className='w-full mt-[10px]'>
          <span>Nomor HP</span>
          <input onChange={e=>setPhoneNumber(e.target.value)} className='border border-[#E8E8E8] rounded-[6px] w-[100%] h-[45px] mt-2 pl-2'/>
          <InputErrorMessage requiredArr={requiredField} field={"phone_number"}/>
        </div>
      </div>
    </div>
  )

}

export default ProductSummary