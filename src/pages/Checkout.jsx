import React , { useState , useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { callApiEvent } from '../services/serviceEvent';
import { PaymentListImage , base_url } from '../utils/const';
import useCheckoutForm from '../hooks/useCheckoutForm';
import { validateFieldRequired } from '../utils/helpers';

import SmallPaymentList from '../components/CheckoutComponent/SmallPaymentList';
import AmountFeeDetail from '../components/CheckoutComponent/AmountFeeDetail';
import Modal from '../components/CheckoutComponent/VaModal'
import SummaryDetail from '../components/SummaryDetail';
import InputData from '../components/CheckoutComponent/InputData';

import { toast } from 'react-toastify';

import {  
  setPaymentList,
  setVaList,
  setFee,
  setTotal,
 } from '../features/Checkout/CheckoutSlice'


function Checkout ({dataUser,jwtToken,setListenLogin}) {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const dataDetail = JSON.parse(localStorage.getItem('datadetail'))
  const cartlist = JSON.parse(localStorage.getItem('cartlist'))

  const { getters , setters } = useCheckoutForm()
  const cookies = new Cookies();

  const {
    paymentList,
    selectedPayment,
    fee,
    total,
  } = useSelector((state)=>state.checkout)

  const [isLoading,setIsLoading] = useState(false)
  const [facts, setFacts ] = useState([]);
  const [listening, setListening ] = useState(false);
  const [requiredField,setRequiredField] = useState([]);
  const [referral,setReferral] = useState(null)
  // const [retryCount, setRetryCount] = useState(0);

  const fetchApiFee = async (payload)=>{
    let response = await callApiEvent(
      {
        method : "post",
        // urlApi : "/service/checkFeeVIP",
        urlApi : "/service_event/check_fee_fe",
        data : payload,
        // useStaging : true
      }
    )
    if (!response.error) {
      dispatch(setFee(response.Fee))
    }
    
  }

  const fetchApiPaymentList = async () => {
    let response = await callApiEvent(
      {
        method : "get",
        urlApi : "/service_event/getpayment",
      }
    )
    if (!response.error) {
      let arrTemp = [...response.paymentList]
      let va_list = arrTemp.filter(e=>e.method.split(' ')[0] === "VA")
      va_list = va_list.map(e=>{
        return {...e,isVaList : true} //FOR MARKING WHICH ONE IS VA PAYMENT
      })
      arrTemp = arrTemp.filter(e=>e.method.split(' ')[0] !== "VA")
      arrTemp.push({
        method : "VA", 
        value : "VA" , 
        id_payment : 99, 
        isVa : true
      })
      dispatch(setVaList(va_list))
      dispatch(setPaymentList(arrTemp)) 
    }
  }

  function countTotal () {
    let count = 0
    cartlist.forEach(e=>{
      count += (e.modal*1000*e.qty)
    })
    dispatch( setTotal(count))
  }

  function changeObjCart () {
    let arr = JSON.parse(localStorage.getItem('cartlist'))
    return arr.map((e=>{
      return {
        id_product : e.id,
        qty : e.qty,        
        product_name : e.product_name
      }
    }))
  }

  const sseHandleMessage = (parsedData) => {

    // const parsedData = JSON.parse(event.data);

    if (typeof parsedData === "string") return false
    if (parsedData.message === "out of stock") {

      setIsLoading(false)
      
      toast.warn("STOCK HABIS", {
        position: "top-center",
        theme: "colored",
      });

    }else if (parsedData.message === "success") {

      setIsLoading(false)
      cookies.set('payment_data',parsedData)
      console.log(parsedData , ' <<< PARSED DATA HERE')
      navigate(`${base_url}/payment`)

    }else  if (parsedData.message === "Payment Success") {

      setListenLogin(true)
      localStorage.removeItem("cartlist");

      toast.success("SELAMAT!! PEMBAYARAN BERHASIL", {
        position: "top-center",
        theme: "colored",
      });

      window.location.replace(`${base_url}/myticket`)


    }else if(parsedData.message === "Payment already expired"){

      setIsLoading(false)
      localStorage.removeItem("cartlist");

      toast.warn("Payment already expired", {
        position: "top-center",
        theme: "colored",
      });

      window.location.replace(`${base_url}`)


    }else if(parsedData.message === "Payment failed" || parsedData.message === "Payment Voided" || parsedData.message === "Unknown status" ){

      setIsLoading(false)

      localStorage.removeItem("cartlist");
      window.location.replace(`${base_url}`)

    }

    // setRetryCount(0);

    setFacts((facts) => facts.concat(parsedData));

  }

  async function checkoutAction (e) {

    e.preventDefault()

    // console.log("selectedPayment>>>>", selectedPayment);

    if(selectedPayment === "") {

      toast.warn("Please select payment method", {
        position: "top-center",
        theme: "colored",
      });

    }else{

      let retryCount = 0; // Initialize retry count

      setIsLoading(true)

      let required = validateFieldRequired({...getters})

      setRequiredField(required)

      cookies.set('formcheckout',{
        ...getters,
        payment_method : selectedPayment.toLowerCase(),
      })

      if (required.length > 0) {
        setIsLoading(false)
        return false
      }

      if (!localStorage.getItem('TOKEN_ID')||!dataUser||!jwtToken) {
        navigate(`${base_url}/login?aftercheckout=true`)
        return false
      }

      let events;

      if (!listening && dataUser) {

        let paramsUrl = `${process.env.REACT_APP_URL_SERVICE_MAIN}/service_event/notif?id=${dataUser&&dataUser.id}`
        events = new EventSource(paramsUrl);

        events.onmessage = (event) => {

        if (event.data !== "") {
          const parsedData = JSON.parse(event.data);
          sseHandleMessage(parsedData)
        }
        
      };

        events.onerror = (errorEvent) => {
          switch (errorEvent.target.readyState) {
            case EventSource.CONNECTING:
              console.error('Connecting...');
              break;
            case EventSource.CLOSED:
              handleError(); // Reconnect on closed connection
              break;
            case EventSource.CLOSED: // Handle case where the server closes the connection normally
              console.log('EventSource closed normally.');
              break;
          }
        };


        // Define error handling function for reconnection
        const handleError = () => {
          console.error('EventSource error. Reconnecting...');

          // Clear existing EventSource object and state
          events.close();
          setListening(false);

          // Exponential backoff strategy (adjust as needed)
          const reconnectDelay = Math.min(2 ** retryCount * 1000, 60000); // Max 60 seconds

          retryCount++;

          setTimeout(() => {
            events = new EventSource(paramsUrl); // Re-create EventSource
            events.onmessage = (event) => {
              // handling logic

            if (event.data !== "") {
              const parsedData = JSON.parse(event.data);
              sseHandleMessage(parsedData)
            }

            };
            setListening(true);
          }, reconnectDelay);
        };

        // Attach error handler to the EventSource object
        events.onerror = handleError;


        setListening(true);

      }

      setTimeout( async () => {

        try {
          const data = await callApiEvent({
            method: "POST",
            urlApi: "/service_event/create_order",
            data: {
              ...getters,
              referral,
              id_user: dataUser.id,
              list_product_cart: changeObjCart(),
              payment_method: selectedPayment === "Link Aja" ? "LinkAja":selectedPayment.toLowerCase(),
              payment_detail: "-",
              id_merchant: dataDetail.id_merchant,
              sub_category_name: dataDetail.subcat_name,
            }
          });
          // Handle the data if needed
        } catch (err) {
          setIsLoading(false);
        }

      }, 2000);


    }

  }

  useEffect(()=>{
    fetchApiPaymentList()
    countTotal()

    window.scrollTo(0, 0);

  },[dataUser])

  
  return (
    <div className='container mb-[30px]'>
      <Modal 
        fetchApiFee={fetchApiFee}
        dataDetail={dataDetail}
      />
      <div className='w-[inherit] mt-[30px] h-[auto] flex sm:flex-row flex-col sm:justify-between justify-start sm:px-[0] px-[20px]'>
        <div className='sm:w-[48%] w-[100%] flex-col'>
          <SummaryDetail cartlist={cartlist} dataDetail={dataDetail}/>
          <InputData setReferral={setReferral} gender={getters.gender} setters={setters} requiredField={requiredField}/>
        </div>
        <div className='sm:w-[35%] w-[100%] h-[500px] sm:mt-0 mt-[40px] flex flex-col px-[25px] py-[20px] relative' style={{boxShadow : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
          {
            paymentList && paymentList.map((e,i)=>{

              if (e.method === "VA")return null
              if (e.value === "CC")return null

              const imgSmall = PaymentListImage[e.value]
              
              return (
                <SmallPaymentList
                  objData={e}
                  image={imgSmall}
                  fetchApiFee={fetchApiFee}
                />
              )
            })
          }
          <AmountFeeDetail data={{fee , total}} />
          <div className='w-full flex justify-center items-center absolute bottom-[20px] left-[0]'> 
            
            <button
              onClick={e=>checkoutAction(e)}
              className='w-[90%] h-[42px] rounded-[8px] bg-[#235FD2] text-white flex items-center justify-center font-bold'
            >
              {
                isLoading ?
                <div className="lds-ring w-[200px] h-[200x]"><div></div><div></div><div></div><div></div></div> :
                "Checkout"
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Checkout;