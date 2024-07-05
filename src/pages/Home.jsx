import React , { useEffect , useState } from 'react';

import BackgroundHome from '../components/BackgroundHome';
import Banner from '../components/Banner';
import TicketList from '../components/TicketList'


import { callApiEvent } from '../services/serviceEvent'

function Home () {

  const [dataEvent,setDataEvent] = useState([])

  useEffect(()=>{

    
    callApiEvent({method : "get",urlApi : "/service_event/get"})
    .then(data=>{

      setDataEvent(data)

    })
    .catch(err=>console.log(err))

  },[])

  return (
    <>
      <BackgroundHome/>
      <div className='container mb-5'>
        <Banner/>
        <TicketList title={"Event Favorit"} data={dataEvent}/>
        <Banner img={true}/>
        {/* <TicketList title={"Event Favorit"} data={dataEvent}/> */}
        {/* <TicketList title={"Ticket Pilihan"}/>
        <TicketList title={"Rekomendasi Event"}/> */}
      </div>
    </>
  )

}

export default Home;