import React, { useEffect, useState } from 'react';
import { CalendarOutline , Location  } from '../utils/Icons';
import { moneyFormat } from "../utils/helpers";
import { base_url } from '../utils/const';
import { callApiEvent } from '../services/serviceEvent';

function SummaryDetail ({cartlist,dataDetail,className,imgClassName}) {

  const imgUrl = process.env.REACT_APP_URL_LARAVEL + "/img/product/"
  
  const [tglEvent, setTglEvent] = useState("")
  const [lokasiEvent, setLokasiEvent] = useState("")
 

  async function callApiDetail () {
    try {  
        
      let detailEvent = await callApiEvent({method : 'GET',urlApi : `/service_event/get/detail/${dataDetail.id}`})

      const date = new Date(detailEvent.detailSubCategory.event_date);
      const option = {
        year : "numeric",
        month: "long",
        day: "numeric"
      }

      setTglEvent(date.toLocaleDateString('id-ID', option))
      setLokasiEvent(detailEvent.detailSubCategory.location)

    }catch(error) {
      console.log(error , ' <<, ERROR')
    }
  }

  useEffect(()=>{

    callApiDetail()

  },[])

  return (
    <div className={`w-[100%] h-[auto] border border-[#E8E8E8] rounded-[8px] flex sm:flex-row flex-col sm:px-[20px] px-[0] ${className}`}>
      <img 
        className={`sm:w-[200px] w-[90%] sm:h-[150px] h-[220px] object-cover sm:rounded-[0] rounded-[4px] mt-[15px] ${imgClassName}`} 
        src= {dataDetail.img ? imgUrl+dataDetail.img : `${base_url}/image/static/mushroom.jpg` } 
        alt='i'
      />
      <div className='flex-col h-[auto] ml-5 w-[90%] mt-[11px] mb-5'>
        <div className='font-bold'>
          {dataDetail&&dataDetail.subcat_name}
        </div>
        <div className='mt-[10px] flex items-center'>
          <CalendarOutline size={18} color={"#A0A0A0"}/> <span className='ml-2 font-light text-[#929292] text-[14px]'>{ tglEvent }</span>
        </div>
        <div className='mt-[15px] flex items-center mb-5'>
          <Location size={18} color={"#A0A0A0"}/> <span className='ml-2 font-light text-[#929292] text-[14px]'>{ lokasiEvent }</span>
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
    </div>
  )

}

export default SummaryDetail;