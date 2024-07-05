import React , { useState , useEffect } from 'react';
import useAuthenticateUser from '../hooks/useAuthenticateUser';
import { callApiEvent } from '../services/serviceEvent'
import CardHistory from '../components/HistoryComponent/CardHistory';
import { base_url } from '../utils/const';
function HistoryTicket () {

  const { dataUser  } = useAuthenticateUser()

  const [selectedType,setSelectedType] = useState(0)
  const [dataTransaction,setDataTransaction] = useState(null)

  function handleShowType (type) {
    if (selectedType === type) return "w-[auto] h-full border-b-4 border-[#235FD2] text-[#235FD2] font-bold mr-[40px] cursor-pointer"
    return "w-[auto] h-full text-[#72747D] font-bold cursor-pointer mr-[40px]"
  }

  function conditionFiltered (status) {
    if (selectedType === 0) return status === "SUCCESS" || status === "PAID" || status == "Payment Success" || status == "COMPLETED"  || status == "SUCCESS_COMPLETED"  || status == "PAID"  || status == "settlement"  || status == "SUCCEEDED"  || status == "capture"
    else return status == "FAILED"  || status == "expire"  || status == "EXPIRED" || status == "Payment already expired" 
  }

  function renderHistory () {
    let dataFiltered = dataTransaction.filter(e=>conditionFiltered(e.status))
    if (dataFiltered.length <=0) {
      return (
        <div className='w-[100%] h-[500px] flex flex-col justify-center items-center'>
          <div className='text-[40px] text-center text-[#E5E5E5] '>
            404 NOT FOUND
          </div>
          <div className='w-full text-center text-[15px] mt-4 font-light'>
            Anda Belum memiliki tiket dengan tipe status pembayaran ini
          </div>
          <a href='/' className='mt-2 text-[#235FD2] text-[14px] font-bold cursor pointer'>
            Cari Ticket Di sini
          </a>
        </div>
      )
    } 
    return dataFiltered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((el,index)=>{
      return (
        <CardHistory
          data={el}
        />
      )
    })
  }

  useEffect(()=>{
    if (dataUser) {
      callApiEvent({method : 'GET',urlApi : `/service_event/get-transaction?id_user=${ dataUser ? dataUser.id : -1}`})
      .then((data)=>{
        setDataTransaction(data.data)
      })
      .catch(err=>{
        console.log(err , '--- ERROR MESSAGE ---')
      })

    }
  },[dataUser])

  useEffect(()=>{
    if (localStorage.getItem("TOKEN_ID")) {
      callApiEvent({
        method : "POST",
        urlApi : "/service_event/authenticate_user",
        data : {
          token_id : localStorage.getItem('TOKEN_ID')
        }
      }).then((data) =>{
        
      }).catch(err=>{
        window.location.replace(`${base_url}/login`)
      })
    }
  },[])

  return (
    <div className='container sm:px-[0] px-[20px] flex'>
      <div className='w-full mb-[35px]'>
        <h2 className='mt-[35px] text-[20px] font-bold'>My Ticket</h2>
        <div className='border-b border-[#D8DCE8] w-full h-[40px] mt-[30px] flex items-center'>
          <div onClick={e=>setSelectedType(0)} className={handleShowType(0)}>
            Success Payment
          </div>
          <div onClick={e=>setSelectedType(1)} className={handleShowType(1)}>
            Failed payment
          </div>
        </div>
        {dataTransaction && Array.isArray(dataTransaction) && renderHistory()}
      </div>
    </div>
  )

}

export default HistoryTicket;