import  { useEffect , useState } from "react";
import { callApiEvent } from '../services/serviceEvent';


function useAuthenticateUser () {
  const [dataUser,setDataUser] = useState(null)
  const [jwtToken,setJwtToken] = useState(null)
  const [listenLogin,setListenLogin] = useState(false)

  useEffect(()=>{
    if (localStorage.getItem("TOKEN_ID")) {
      callApiEvent({
        method : "POST",
        urlApi : "/service_event/authenticate_user",
        data : {
          token_id : localStorage.getItem('TOKEN_ID')
        }
      }).then((data) =>{
        setDataUser(data.dataUser)
        setJwtToken(data.jwttoken)
      }).catch(err=>{
        localStorage.removeItem('TOKEN_ID')
      })
    }
  },[listenLogin])

  return { dataUser , jwtToken , setListenLogin };
  

}

export default useAuthenticateUser;