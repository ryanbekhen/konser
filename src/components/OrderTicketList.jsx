import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { moneyFormat } from '../utils/helpers';
import { Add , Min } from '../utils/Icons'
import BackArrow from '../components/BackArrow';
import { base_url } from '../utils/const';
import { toast } from 'react-toastify';

function OrderTicketList (props) {

  const {className,style,isMobile,productList,setShowCheckout,dataObj} = props

  const navigate = useNavigate();
  
  const [subTotal,setSubTotal] = useState(0)
  const [cartList,setCartList] = useState([])

  function enterToCart (val) {
    if (val.stock === 0) {
      // alert('Stock Habis')
      toast.warn("Stock Habis!", {
        position: "top-center",
        theme: "colored",
      });
    }
    let tempArr = [...cartList]
    tempArr.push({...val,qty : 1})
    setSubTotal(state=>state+(val.modal*1000))
    setCartList(tempArr)
  }

  function addQty (val) {
    let tempArr = [...cartList]
    tempArr.forEach((el,index)=>{
      if (el.id===val.id&&el.qty < 10) {
        let qty = tempArr[index]['qty']
        tempArr[index]['qty'] = qty + 1
        return
      }
    })
    setSubTotal(state=>state+(val.modal*1000))
    setCartList(tempArr)
  }

  function minQty (val) {
    let tempArr = [...cartList]
    let isOne = false
    tempArr.forEach((el,index)=>{
      if (el.id===val.id) {
        let qty = tempArr[index]['qty']
        if (qty === 1) {
          isOne = true
        }else {
          tempArr[index]['qty'] = qty - 1
        }
        return
      }
    })
    setSubTotal(state=>state-(val.modal*1000))
    if (isOne) {
      tempArr = tempArr.filter(e=>e.id!==val.id)
    }
    setCartList(tempArr)
  }

  function showNumberQty (id) {
    return cartList.filter(e=>e.id===id)[0].qty
  }

  function showButtonQty (val) {
    if (!cartList.find(e=>e.id===val.id)) {
      return (
        <button 
          className={`w-[110px] h-[42px] rounded-[8px] bg-[#E5E5E5] text-[#235FD2] opacity-${val.stock === 0 ? 0 : 1}`}
          onClick={e=>enterToCart(val)}
          disabled={val.stock === 0 ? true : false}
        >
            Add
        </button>
      )
    }else {
      return (
        <div className='flex justify-between items-center w-[110px]'>
          <button 
            onClick={e=>minQty(val)}
            className='w-[30px] h-[30px] rounded-[100%] border border-[#CACDD5] flex justify-center items-center cursor-pointer'
          >
            <Min color={"#CACDD5"}/>
          </button>
          <div className='font-bold text-[16px] mx-[10px]'>
            {showNumberQty(val.id)}
          </div>
          <div 
            onClick={e=>addQty(val)}
            className='w-[30px] h-[30px] rounded-[100%] border border-[#235FD2] flex justify-center items-center cursor-pointer'
          >
            <Add color={"#235FD2"}/>
          </div>
        </div>
      )
    }
  }

  function checkoutRedirect (e) {
    e.preventDefault()
    if (cartList.length === 0) return false
    localStorage.setItem('cartlist',JSON.stringify(cartList))
    localStorage.setItem('datadetail',JSON.stringify(dataObj.detailData[0]))
    navigate(`${base_url}/checkout`)
  }

  function renderButtonCheckout () {
    return (
      <button
        className={`w-[110px] h-[42px] rounded-[8px] bg-[#235FD2] text-white flex items-center justify-center font-bold ${cartList.length===0&&"opacity-50"}`}
        onClick={e=>checkoutRedirect(e)}
      >
        Checkout
      </button>
    )
  }

  return (
    <div 
      className={`${className} h-[auto] rounded-[16px] flex flex-col relative mt-[30px] lg:mt-0`} 
      style={{...style}}
    >
      <div className={`flex flex-col w-[100%] px-[25px] pb-[10px] ${!isMobile ? "overflow-auto h-[300px]" : "h-[auto]"}`}>
        {
          isMobile&&<BackArrow name={dataObj&&dataObj.detailData[0].subcat_name} style={{marginTop : 100}} isCustomClick={true} onClick={e=>setShowCheckout(false)}/>}
        {
          productList && productList.map((val,index)=>{
            return(
              <div className='flex justify-between w-[100%] sm:mt-[20px] mt-[40px]'>
                <div className='flex flex-col'>
                  <span className='text-[#939393]'>{val.product_name}</span>
                  <span className='font-bold'>{moneyFormat(val.modal * 1000)}</span>
                  {
                    val.stock &&
                    <span className='text-[11px] font-light'>
                      Stock : {val.stock }
                    </span>
                  }
                </div>
                {
                  showButtonQty(val)
                }

              </div>
            )
          })
        }
      </div>
      {
        !isMobile ?
        <div className='w-[100%] h-[65px] left-[0] border-t-2 border-[#E5E5E5] bottom-[10px] z-9000 px-[25px] py-[10px] flex justify-between'>
          <div className='flex flex-col'>
            <span>SubTotal</span>
            <span className='text-[#C33C38] font-bold'>{moneyFormat(subTotal)}</span>
          </div>
          {renderButtonCheckout()}
        </div> :
        <div className='fixed bottom-[0] w-[100%] h-[65px] left-[0] border-t-2 border-[#E5E5E5] bottom-[10px] z-9000 px-[25px] py-[10px] flex justify-between'>
          <div className='flex flex-col'>
            <span>SubTotal</span>
            <span className='text-[#C33C38] font-bold'>{moneyFormat(subTotal)}</span>
          </div>
          {renderButtonCheckout()}
        </div>
      }
    </div>
  )

}

export default OrderTicketList;