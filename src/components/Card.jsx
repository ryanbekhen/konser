import React from "react";
import { moneyFormat } from '../utils/helpers'
import { base_url } from "../utils/const";
function Card ({value , index}) {
  
  const imgUrl = process.env.REACT_APP_URL_LARAVEL + "/img/product/"

  const date = new Date(value.event_date);
  const option = {
    year : "numeric",
    month: "long",
    day: "numeric"
  }

  return (
    <a href={`${base_url}/product/detail/${value.id}`} className="flex flex-col w-[100%] h-[280px] mt-2" key={index}>
      <div className="w-full h-[140px] rounded-t-[8px] flex justify-center items-center bg-black relative">
        <img 
          className="absolute inset-0 box-border p-0 border-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover rounded-t-[8px]"
          src={value.image_name?imgUrl+value.image_name:`${base_url}/image/static/mushroom.jpg`} 
          alt='test'
        />
      </div>
      <div className="w-inherit rounded-b-[8px] h-[160px] px-[15px] relative" style={{boxShadow : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
        <div className="text-[16px] font-light mt-[15px] text-[#151416]">
          {value.subcategory_name}
        </div>
        <div className="text-[16px] mt-2 text-[#A4A5AE] font-normal">
        { date.toLocaleDateString('id-ID', option) }
        </div>
        <div className="text-[16px] font-bold absolute bottom-[7px]">
          {moneyFormat(value.cheapest_product * 1000)}
        </div>
      </div>
    </a>
  )

}

export default Card;