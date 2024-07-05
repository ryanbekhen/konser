import React from 'react';

import { ArrowRight , Warning } from '../../utils/Icons';
import { moneyFormat , dateFormatUS } from '../../utils/helpers';
import { base_url } from '../../utils/const';

function CardHistory (props) {

  const {
    created_at,
    total_amount,
    sub_category_name,
    status,
    id_order
  } = props.data

  return (
    <div className='sm:w-[100%] w-[100%] m-h-[220px] mt-[35px] rounded-[16px] bg-content-s flex justify-between py-[30px] px-[25px] cursor-pointer'>
      <div className='flex flex-col'>
        {
          status == "FAILED"  || status == "expire"  || status == "EXPIRED" || status == "Payment already expired"   ?
          <div className='w-full h-[46px] bg-[#FFEFBB] mt-[6px] rounded-[6px] flex items-center pl-2'>
            <Warning color={"#D66100"} size={22}/>
            <span className='ml-2 font-semibold text-[14px]'>{status}</span>
          </div>:
          <div className='w-full bg-[#50A151] h-[46px] rounded-[6px] flex items-center pl-2'>
            <Warning color={"white"} size={22}/>
            <span className='ml-2 font-semibold text-[14px] text-white'>Transaksi Anda Telah Berhasil!</span>
          </div>

        }
        <div className='w-full flex sm:items-center items-start mt-5 sm:flex-row flex-col'>
          <img className='w-[150px] h-[70px] object-cover' src={`${base_url}/image/static/mushroom.jpg`} />
          <div className='font-bold sm:ml-3 ml-0'>
            {sub_category_name?sub_category_name : "No Data"}
          </div>
          <div className='mx-3 w-[10px] h-[10px] rounded-[100%] bg-[#AEB2BE] sm:block hidden'>
            
          </div>
          <span className='text-[#AEB2BE] font-normal'>
            {status === "Payment already expired" || status === "Waiting for payment" || status == "FAILED"  || status == "expire"  || status == "EXPIRED" ? "Payment Failed" :"Payment Success"}
          </span>
        </div>
        <div className='text-[#93949B] mt-3 font-normal'>
          Pembayaran dibuat pada {dateFormatUS(created_at)}
        </div>
        <div className='mt-3 font-medium'>
          {moneyFormat(total_amount)}
        </div>

        { status == "FAILED"  || status == "expire"  || status == "EXPIRED" || status == "Payment already expired"  ? 

         ""

        :
        

        <a href={`${process.env.REACT_APP_URL_SERVICE_MAIN}/service_event/generate-ticket?id_order=${id_order}`} target='_blank' className='w-[170px] h-[40px] mt-3 bg-[#235FD2] rounded-[6px] text-white font-bold flex items-center justify-center'>
          Ticket Online
        </a>
        
        }

        

      </div>
      <div className='sm:block hidden'>
        <ArrowRight size={30}/>
      </div>
    </div>
  )

}

export default CardHistory;