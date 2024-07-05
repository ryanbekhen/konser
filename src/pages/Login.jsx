import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { callApiEvent } from '../services/serviceEvent';
import { validateFieldRequired } from '../utils/helpers';
import InputValidator from '../components/InputValidator';
import { base_url } from '../utils/const';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import InputValidatorPassword from '../components/InputValidatorPassword';

function Login ({setListenLogin}) {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [requiredField,setRequiredField] = useState([]);

  const [user, setUser ] = useState({});
  const [profile, setProfile ] = useState([]);

  const navigate = useNavigate();

  function loginPost (e) {
    e.preventDefault()
    let required = validateFieldRequired({email , password ,})
    setRequiredField(required)
    if (required.length > 0) {
      return false
    }
    setIsLoading(true)
    callApiEvent({
      method : "post" , 
      urlApi : "/service_event/loginv2",
      data : {email , password}
    })
    .then(({data})=>{

      // return false
      localStorage.setItem('TOKEN_ID',data)
      // window.location.replace("/")
      setListenLogin(true)
      navigate("/")
      setIsLoading(false)
      // setTimeout(()=>{
      //   navigate('/')
      // },1000)
      // const token = data.jwttoken
      // cookies.set('token',token)
    }).catch(err=>{
      let errorMessage = err.response.data

      setIsLoading(false)
    })
  }

  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => {
  //     setUser(tokenResponse)
  //   },
  //   onError: (error) => {
  //     console.log("error error", error)
  //   },
  // });

  // useEffect(() => {

  //   if (Object.keys(user).length !== 0) {
  //       axios
  //           .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //               headers: {
  //                   Authorization: `Bearer ${user.access_token}`,
  //                   Accept: 'application/json'
  //               }
  //           })
  //           .then((res) => {

  //               setProfile(res.data);
  //           })
  //           .catch((err) => console.log(err));
  //   }

  // },[user]);
  
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center pb-[70px]'>
      <div className='w-[420px] min-h-[420px] rounded-[8px] flex flex-col items-center pb-1' style={{boxShadow : "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",}}> 
        {/* <div className='font-semibold text-[20px] mt-[25px] w-[85%]'>
          Email
        </div>
        <input onChange={e=>setEmail(e.target.value)} className='w-[85%] rounded-[6px] h-[44px] border border-[#dbdbdb] pl-[10px] mt-3' placeholder='Masukkan Email Anda'/> */}
        <InputValidator
          field={"email"}
          label={"Email"}
          placeholderText={"Masukkan Email Anda"}
          setter={setEmail}
          requiredField={requiredField}
          isLabelBold={true}
        />
        <InputValidatorPassword
          field={"password"}
          label={"Password"}
          placeholderText={"Masukkan Password Anda"}
          setter={setPassword}
          requiredField={requiredField}
          isLabelBold={true}
          type={"password"}
        />

        {/* <div className='font-semibold text-[20px] mt-[15px] w-[85%]'>
          Password
        </div>
        <input onChange={e=>setPassword(e.target.value)} className='w-[85%] rounded-[6px] h-[44px] border border-[#dbdbdb] pl-[10px] mt-[18px]' type='password' placeholder='Masukkan Password Anda'/> */}
        <button onClick={e=>loginPost(e)} className='w-[85%] h-[43px] rounded-[8px] bg-[#235FD2] text-white font-bold mt-[25px] flex justify-center items-center'>
          {
            isLoading ?
            <div class="lds-ring w-[200px] h-[200x]"><div></div><div></div><div></div><div></div></div> :
            "Log In"
          }
        </button>

        {/* <div className="d-flex mt-[10px]">
            <label className="mx-auto">Or Use</label>
        </div>

        <button onClick={login} className='inline-flex items-center justify-center w-[85%] h-[43px] rounded-[8px] bg-[#FFFFFF] border-2 border-grey text-black font-bold mt-[10px]'>
          <img className="me-2" src="/image/static/google.png" alt="" width={25} height={25} />
          Login With Google
        </button> */}

        <div className='w-[70%] text-center mt-[25px] font-light text-[13px]'>
          Dengan login anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi vipvoucher.
        </div>
        <div className='w-full text-[14px] flex items-center justify-center mt-[11px]'>
          <div className='font-normal text-[#B9B9B9]'>Belum punya akun?</div>
          <div onClick={e=>navigate('/register')} className='ml-1 text-[#235FD2] font-bold cursor-pointer'>Daftar di sini</div>
        </div>
      </div>
    </div>
  )

}

export default Login;