import React , { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

// import VaComponent from '../components/PaymentComponent/VaComponent';
import QrisComponent from '../components/PaymentComponent/QrisComponent';
import SummaryDetail from '../components/SummaryDetail';
import CountdownTimer from '../components/PaymentComponent/CountDownTimer';
import { base_url } from '../utils/const';

import { toast } from 'react-toastify';
import LinkAjaComponent from '../components/PaymentComponent/LinkAjaComponent';

function Payment({dataUser}) {

  const navigate = useNavigate()

  const cookies = new Cookies();

  const dataDetail = JSON.parse(localStorage.getItem('datadetail'))
  const cartlist = JSON.parse(localStorage.getItem('cartlist'))

  // console.log("dataDetail>>>>", dataDetail);
  // console.log("cartlist>>>>", cartlist);

  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  const [va,setVa] = useState("112 4028 3029 0292");
  const [showTool,setShowTool] = useState(false)
  const [textCopy,setTextCopy] = useState("Copy")

  const [expiredAt,setExpiredAt] = useState(null)

  const [paymentData, setpaymentData] = useState({})

  function copyClipboard () {
    navigator.clipboard.writeText(va)
    setTextCopy('Copied')
  }

  useEffect(()=>{
    let paymentDataCookies = cookies.get('payment_data')


    setpaymentData(paymentDataCookies)

    if (typeof paymentDataCookies === "object" ) {
      setExpiredAt(paymentDataCookies.expiredAt)
    }

    window.scrollTo(0, 0);

  },[])

  const sseHandleMessage = (parsedData) => {

    if (typeof parsedData === "string") return false

        if (parsedData.message === "Payment Success") {
          localStorage.removeItem("cartlist");
         
          toast.success("SELAMAT!! PEMBAYARAN BERHASIL", {
            position: "top-center",
            theme: "colored",
          });
          window.location.replace(`${base_url}/myticket`)

        }else if (parsedData.message === "Payment failed" || parsedData.message === "Payment Voided" || parsedData.message === "Unknown status" ){
          localStorage.removeItem("cartlist");  

          toast.warn(parsedData.message, {
            position: "top-center",
            theme: "colored",
          });
          window.location.replace(`${base_url}`)

        }else if(parsedData.message === "Payment already expired"){
          localStorage.removeItem("cartlist");
    
          toast.warn("Payment already expired", {
            position: "top-center",
            theme: "colored",
          });
    
          window.location.replace(`${base_url}`)
    
        }
        else {
          // console.log('ENTER HERE ELSE CONDIION')
        }
        setFacts((facts) => facts.concat(parsedData));
  }

  useEffect( () => {

    let retryCount = 0; // Initialize retry count

    if (!listening && dataUser) {

      let paramsUrl = `${process.env.REACT_APP_URL_SERVICE_MAIN}/service_event/notif?id=${dataUser&&dataUser.id}`
      let events = new EventSource(paramsUrl);

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

            const parsedData = JSON.parse(event.data);
            sseHandleMessage(parsedData)

          };
          setListening(true);
        }, reconnectDelay);
      };

      // Attach error handler to the EventSource object
      events.onerror = handleError;

      setListening(true);
    }
  }, [listening, facts , dataUser]);

  return (
    <div className='container'>
      <div className='flex sm:flex-row flex-col w-[100%] justify-between mt-[30px] sm:items-start items-center'>
        <div className='flex-col sm:w-[54%] w-[94%]'>
          <div className='w-full h-[40px] bg-content-s rounded-[6px] flex justify-between items-center px-5 '>
            <div className='font-semibold text-[14px]'>
              Selesaikan Pembayaran Dalam
            </div>
            {
              expiredAt && 
              <CountdownTimer targetTime={expiredAt}/>
            }
          </div>
          <div className='w-full sm-mt-5 min-h-[400px] bg-content-p mt-[30px] rounded-[8px] py-[15px] px-[16px]'>
            {/* <VaComponent showTool={showTool} va={va} textCopy={textCopy} copyClipboard={copyClipboard} setShowTool={setShowTool} setTextCopy={setTextCopy} /> */}
            
            { paymentData.payment_method === "qris" ? <QrisComponent />:<LinkAjaComponent />  }

            
              
          </div>
        </div>
        {/* <div className='sm:w-[30%] w-[94%] h-[180px] bg-content-s rounded-[6px] sm-mt-[0] mt-[28px]'>

        </div> */}
        <SummaryDetail cartlist={cartlist} dataDetail={dataDetail} className="sm:w-[30%] w-[94%] !flex-col !items-center bg-content-s sm:mt-0 mt-[27px]" imgClassName="!w-[90%] !rounded-[8px]"/>
      </div>
    </div>
  )

}

export default Payment;