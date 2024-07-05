import React , { useState , useEffect } from 'react';
import {  useParams } from 'react-router-dom'

import { Calendar } from '../utils/Icons';
import OrderTicketList from '../components/OrderTicketList';
import { callApiEvent } from '../services/serviceEvent';

import Slider from "react-slick";

function ProductDetail () {

  const { id } = useParams()

  const [isSwipe, setIsSwipe] = useState(false)
  const [isDot, setisDot] = useState(false)

  const imgUrl = process.env.REACT_APP_URL_LARAVEL + "/img/product/"

  const settings = {
    dots: isDot,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: isSwipe
  };


  const [showCheckout,setShowCheckout] = useState(false)
  const [dataObj,setDataObj] = useState(null)
  const [dataStock,setDataStock] = useState(null)
  const [dataSlideImgProduct,setDataSlideImgProduct] = useState([])
  const [tglEvent, setTglEvent] = useState("")

  async function callApiDetail () {
    try {
      let dataDetail = await callApiEvent({method : 'GET',urlApi : `/service_event/get/detail/${id}`})

      // console.log("dataDetail>>>>>", dataDetail);

      if(dataDetail.detailData.length > 1) {
        setIsSwipe(true)
        setisDot(true)
      }

      setDataSlideImgProduct(dataDetail.detailData)

      const data_list_id = dataDetail.productList.map((e) => e.id);
      
      let dataStock = await callApiEvent({method : 'POST',urlApi : "/service_event/get-stock" , data : {data_list_id}  })
      let dataTemp = {...dataDetail}
      dataTemp["productList"].forEach((proList,index)=>{
        dataStock.data.forEach((stockList)=>{
          if (proList.id === stockList.id_product) {
            dataTemp["productList"][index]["stock"] = stockList.stock
          }
        })
      })

      // console.log("dataTemp>>>>>", dataTemp);
      const date = new Date(dataTemp.detailSubCategory.event_date);
      const option = {
        year : "numeric",
        month: "long",
        day: "numeric"
      }

      setTglEvent(date.toLocaleDateString('id-ID', option))

      setDataObj(dataTemp)

    }catch(error) {
      console.log(error , ' <<, ERROR')
    }
  }

  useEffect(()=>{
    callApiDetail()
  },[id])

  function renderDescriptionMarkUp (detailDescription) {
    const markup = { __html: detailDescription };
    return <div dangerouslySetInnerHTML={markup} />;
  }



  return (

    <div className='container mb-5'> 

      <div className='flex flex-col sm:flex-row w-[100%] sm:mt-[50px] mt-[0] justify-between'>
        { dataSlideImgProduct && dataSlideImgProduct.length > 1 ?
          
          <div className="slider-container sm:w-[65%] w-[100%] h-[100%] slider-detail-product">
            <Slider {...settings} className="slider-container w-[100%] h-[100%]">
                {
                  dataSlideImgProduct.map((val, index) => {
                    return (
                      <img 
                        className="sm:rounded-[8px] rounded-[0] w-[100%] h-[100%] object-cover"
                        src={ imgUrl + val.img}
                        alt='test'
                      />
                    )
                  })
                }

            </Slider>
          </div>

          :

          <div className="slider-container sm:w-[65%] w-[100%] h-[100%] slider-detail-product slider-single-image">
            <Slider {...settings} className="slider-container w-[100%] h-[100%]">
                {
                  dataSlideImgProduct.map((val, index) => {
                    return (
                      <img 
                        className="sm:rounded-[8px] rounded-[0] w-[100%] h-[100%] object-cover"
                        src={ imgUrl + val.img}
                        alt='test'
                      />
                    )
                  })
                }

            </Slider>
          </div>

          
        }

        {/* <div className="sm:w-[65%] w-[100%] h-[100%]">
            <img 
                className="sm:rounded-[8px] rounded-[0] w-[100%] h-[100%] object-cover"
                src={ imgUrl + dataSlideImgProduct[0]?.img}
                alt='test'
              />     
            </div> */}


        {dataObj&&<OrderTicketList dataObj={dataObj} productList={dataObj.productList} isMobile={false} className="w-[100%] card-order-ticket-list" />}
      
      </div>
      <div className='flex flex-col sm:mt-[40px] mt-[30px] sm:pl-[0] pl-[20px]'>

        <h2 className='font-bold text-[22px]'>
          {dataObj&&dataObj.detailData[0].subcat_name}
        </h2>
        <div className='text-[12px] flex items-center font-semibold'>
          by 
          <div className='text-[#235FD2] text-[12px] ml-[3px] font-semibold'>
            Vip Voucher
          </div>
        </div>
        <div className='flex items-center mt-2'>
          <Calendar size={19} color="#ADB6C9"/>
          <span className='ml-2 font-light text-[17px]'>{ tglEvent }</span>
        </div>
        <div className='sm:w-[60%] w-[94%] mt-[10px] font-light text-[16px] font-important-detail'>
          {
            dataObj &&
            renderDescriptionMarkUp(dataObj.detailData[0].deskripsi)
          }
        </div>
      </div>
      {
        showCheckout &&
        <div className='fixed top-0 left-0 w-full h-[100vh] bg-white z-9999999 overflow-none px-[20px]'>
          { dataObj && 
            <OrderTicketList 
              setShowCheckout={setShowCheckout} 
              productList={dataObj.productList} 
              isMobile={true} 
              className="w-[100%]"
              dataObj={dataObj}
              dataStock={dataStock}
            />
          }

        </div>
      }
      {/* {
        !showCheckout &&
        <div className='fixed bottom-[0] left-[0] w-[100%] h-[70px] sm:hidden flex z-[99999] flex justify-center items-center bg-white'>
          <button onClick={e=>setShowCheckout(!showCheckout)} className='w-[80%] h-[48px] rounded-[8px] bg-[#235FD2] text-white font-bold'>
            Buy Tickets
          </button>
        </div>
      } */}
    </div>
  )


}

export default ProductDetail;