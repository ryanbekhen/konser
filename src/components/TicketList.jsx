import React from 'react';
import Card from './Card'
import Slider from "react-slick";
import { NextArrow , PrevArrow } from './Sliders/Arrow'

function TicketList ({title,data = []}) {

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: data.length > 4? <NextArrow /> : <></>,
    prevArrow: data.length > 4?<PrevArrow /> : <></>,
    initialSlide: 0,
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 1,
        initialSlide: 1,
        nextArrow: null,
        prevArrow: null,
        // rtl : true,
        // slide : data.length >= 4 ? 'div' : 'span'
      }
    }]
  };

  return (
    <div className='px-[20px] sm:px-[0]'>
      <h2 className='p-[0] m-[0] font-bold sm:text-[24px] text-[20px] sm:mt-[50px] mt-[29px]'>
        {title}
      </h2>

      { data.length > 4 ?

        <Slider {...settings}>
        {
          Array.isArray(data) && data.map((e,index)=>{
            return <Card value={e} index={index}/>
          })
        }
        {/* {
          Array.isArray(data) && data.length < 4 && 
          [...Array(4 - data.length).keys()].map(e=>{
            return (
              <div className="flex flex-col w-[100%] h-[280px] mt-2" >

              </div>
            )
          })
          
        } */}
        {/* <div className="flex flex-col w-[100%] h-[280px] mt-2" >

        </div>
        <div className="flex flex-col w-[100%] h-[280px] mt-2" >

        </div> */}
      </Slider>

      :

      <div className='grid grid-cols-1 lg:grid-cols-4 mt-2 gap-1'>

          {
            Array.isArray(data) && data.map((e,index)=>{
              return <Card value={e} index={index}/>
            })
          }

        </div>


      }

        {/* <div className='grid grid-cols-1 lg:grid-cols-4 mt-2'>

          {
            Array.isArray(data) && data.map((e,index)=>{
              return <Card value={e} index={index}/>
            })
          }

        </div> */}
      
    </div>
  )

}

export default TicketList;