import React , { useEffect } from 'react';
import { callApiEvent } from '../services/serviceEvent';
import { base_url } from '../utils/const';
import { useParams , useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function VerifyEmail ({setListenLogin}) {

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    callApiEvent({
      method : "POST",
      urlApi : "/service_event/verify_email",
      data : {
        id_verify : id
      },
    })
    .then(({data})=>{

      localStorage.setItem('TOKEN_ID',data)
      setListenLogin(true)
      navigate(base_url)
    })
    .catch(err=>{

      // alert('GAGAL VERIFIKASI EMAIL')
      toast.warn("GAGAL VERIFIKASI EMAIL", {
        position: "top-center",
        theme: "colored",
      });
    })
  },[])

  return (
    <div className='w-full h=[100vh] z-[900000000] bg-white overflow-hidden absolute flex justify-center items-center'>

    </div>
  )

}

export default VerifyEmail;