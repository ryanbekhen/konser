import React from "react";

import { Copy , Warning } from '../../utils/Icons'

function VaComponent ({ textCopy , va , setTextCopy , showTool , setShowTool , copyClipboard}) {

  return (
    <>
      <div className='font-bold text-[25px] w-full flex justify-between items-center'>
        <span>
          Petunjuk Pembayaran
        </span>
        <img className="w-[60px] object-cover" src="/image/static/bca.png" alt="bca"/>
      </div>
      <div className='font-semibold mt-[20px] text-[14px]'> 
        Nomor Virtual Account
      </div>
      <div className='font-semibold w-full h-[40px] border-b border-[#646464] flex items-center relative'>
        {va}
        {
          showTool &&
        <div className='bg-black text-white w-auto px-2 h-auto absolute right-[-12px] top-[-14px]'>
          {textCopy}
        </div>
        }
        <div 
          onMouseOver={e=>setShowTool(true)} 
          onMouseOut={e=>[setShowTool(false),setTextCopy('Copy')]}  
          onClick={() => copyClipboard() } 
          className='w-auto h-auto absolute right-[8px] cursor-pointer'
        >
          <Copy size={15} />
        </div>
        
      </div>
      <div className='font-semibold mt-[20px] text-[14px]'> 
        Total Pembayaran
      </div>
      <div className='font-semibold w-full h-[40px] border-b border-[#646464] flex items-center relative'>
        Rp. 100.000
      </div>
    
      <div className='mt-[25px]'>
        Langkah Pembayaran
      </div>
      <div className='mt-5 w-full text-[#9C9C9C]'>
        1. Masukkan Kartu BCA anda
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        2. Masukkan PIN anda
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        3. Pilih menu transaksi lainnya
      </div>
      <div className='mt-2 w-full text-[#9C9C9C]'>
        4. Pilih Transfer
      </div>
      <div className='w-full h-[46px] bg-[#FFEFBB] mt-[19px] rounded-[6px] flex items-center pl-2'>
        <Warning color={"#D66100"} size={20}/>
        <span className='ml-2 font-semibold text-[14px]'>Selesaikan Pembayaran Sebelum Waktunya</span>
      </div>

    </>
  )

}

export default VaComponent;