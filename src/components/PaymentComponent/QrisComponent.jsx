import React, { useEffect , useState } from 'react';
import Cookies from 'universal-cookie';
import {  Warning } from '../../utils/Icons'

function QrisComponent () {

  const cookies = new Cookies();
  const [qrisUrl,setQrisUrl] = useState("")

  useEffect(()=>{
    let paymentData = cookies.get('payment_data')
    if (typeof paymentData === "object" && paymentData.data.paymentUrl) {
      setQrisUrl(paymentData.data.paymentUrl.desktop)
    }
  },[])


  return (
    <div className='w-full min-h-[150px] flex flex-col justify-center mt-[10px] mb-[40px]'>
      <div className='w-full h-[46px] bg-[#FFEFBB] mt-[6px] rounded-[6px] flex items-center pl-2'>
        <Warning color={"#D66100"} size={20}/>
        <span className='ml-2 font-semibold text-[14px]'>Selesaikan Pembayaran Sebelum Waktunya</span>
      </div>
      <div className='w-full flex justify-center items-center'>
        <img className='mt-5 h-[250px] w-[250px]' src={qrisUrl} alt='qris'/>

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
        1. Buka Akun Mbanking Anda
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        2. Buka Fitur Scan QRIS
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        3. Scan Qris di atas
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        4. Tunggu hingga selesai
      </div>
    </div>
  )

}

export default QrisComponent;