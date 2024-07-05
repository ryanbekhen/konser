import React, { useEffect , useState } from 'react';
import Cookies from 'universal-cookie';
import {  Warning } from '../../utils/Icons'

function LinkAjaComponent () {

  const cookies = new Cookies();
  const [linkAjaUrl,setlinkAjaUrl] = useState("")

  useEffect(()=>{
    let paymentData = cookies.get('payment_data')
    if (typeof paymentData === "object" && paymentData.data.paymentUrl) {
      setlinkAjaUrl(paymentData.data.paymentUrl.desktop)
    }
  },[])


  return (
    <div className='w-full min-h-[150px] flex flex-col justify-center mt-[10px] mb-[40px]'>
      <div className='w-full h-[46px] bg-[#FFEFBB] mt-[6px] rounded-[6px] flex items-center pl-2'>
        <Warning color={"#D66100"} size={20}/>
        <span className='ml-2 font-semibold text-[14px]'>Selesaikan Pembayaran Sebelum Waktunya</span>
      </div>
      <div className='w-full flex justify-center items-center'>
        
        <a href={linkAjaUrl} target='_blank' className='w-[110px] h-[42px] rounded-[8px] bg-[#235FD2] text-white flex items-center justify-center font-bold' >Bayar</a>

      </div>
      {/* <div className='font-semibold mt-[20px] text-[14px]'> 
        Total Pembayaran
      </div>
      <div className='font-semibold w-full h-[40px] border-b border-[#646464] flex items-center relative'>
        Rp. 100.000
      </div> */}
      <div className='mt-[25px]'>
        Langkah Pembayaran
      </div>
      <div className='mt-5 w-full text-[#9C9C9C]'>
        1. Klik button di atas.
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        2. Bayar menggunakan akun Link Aja yang terdaftar
      </div>
    </div>
  )

}

export default LinkAjaComponent;