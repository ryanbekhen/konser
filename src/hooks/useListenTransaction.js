import React , { useEffect , useState }  from 'react'
import { base_url } from '../utils/const';
import { toast } from 'react-toastify';
function useListenTransaction (dataUser) {

  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);
  const [ payloadEvent,setPayloadEvent] = useState(null)

  useEffect( () => {
    if (!listening && dataUser) {
      let paramsUrl = `${process.env.REACT_APP_URL_SERVICE_MAIN}/service_event/notif?id=${dataUser&&dataUser.id}`
      const events = new EventSource(paramsUrl);

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (event.data.message === "out of stock") {
          // alert("STOCK HABIS")
          toast.warn("STOCK HABIS", {
            position: "top-center",
            theme: "colored",
          });
        }
        setPayloadEvent(parsedData)
        cookies.set('payment_data',parsedData)
        navigate(`${base_url}/payment`)
        setFacts((facts) => facts.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, facts , dataUser]);




}

export default useListenTransaction;