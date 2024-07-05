import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { callApiEvent } from '../services/serviceEvent';
import { validateFieldRequired } from '../utils/helpers';
import { base_url } from '../utils/const';

import InputValidator from '../components/InputValidator';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import InputValidatorPassword from '../components/InputValidatorPassword';
import { toast } from 'react-toastify';

function Register () {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passConfirmation,setPassConfirmation] = useState('');
  const [requiredField,setRequiredField] = useState([]);

  const [user, setUser ] = useState({});
  const [profile, setProfile ] = useState([]);

  const navigate = useNavigate()

  function registerPost (e) {

    e.preventDefault()
    let required = validateFieldRequired({email , password , name , passConfirmation})
    setRequiredField(required)
    if (required.length > 0) {
      return false
    }
    callApiEvent({
      method : "post" , 
      urlApi : "/service_event/register",
      data : {email , password , name , confirm_password : passConfirmation}
    })
    .then(({data})=>{

      if (data && data.errors) {

        const errorMessages = [];
        const errors = data.errors;
    
        Object.keys(errors).forEach((field) => {
          Object.keys(errors[field]).forEach((subField) => {
            errors[field][subField].forEach((message) => {
              // errorMessages.push(message);
              toast.warn(message, {
                position: "top-center",
                theme: "colored",
                autoClose: false,
              });

            });
          });
        });

      }else{

        // alert("Registrasi berhasil, silahkan check email untuk verifikasi")
        toast.success("Registrasi berhasil, silahkan check email untuk verifikasi", {
          position: "top-center",
          theme: "colored",
          autoClose: false,
        });
        navigate("/")

      }

    }).catch(err=>{
      // alert("ERROR")
      toast.error("ERROR", {
        position: "top-center",
        theme: "colored",
      });
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
    <div className='w-[100%] h-[100vh] flex justify-center items-center pb-[70px] mt-[50px]'>
      <div className='w-[480px] h-[auto] rounded-[8px] flex flex-col items-center pb-[20px]' style={{boxShadow : "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",}}> 

        <InputValidator
          field={"name"}
          label={"Username"}
          placeholderText={"Masukkan Username Anda"}
          setter={setName}
          requiredField={requiredField}
          isLabelBold={true}
        />
        
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
        

        <InputValidatorPassword
          field={"passConfirmation"}
          label={"Password Confirmation"}
          placeholderText={"Masukkan Password Anda"}
          setter={setPassConfirmation}
          requiredField={requiredField}
          isLabelBold={true}
          type={"password"}
        />

        <button onClick={e=>registerPost(e)} className='w-[85%] h-[43px] rounded-[8px] bg-[#235FD2] text-white font-bold mt-[30px]'>
          Register
        </button>

        {/* <div className="d-flex mt-[10px]">
            <label className="mx-auto">Or Use</label>
        </div>

        <button onClick={login} className='inline-flex items-center justify-center w-[85%] h-[43px] rounded-[8px] bg-[#FFFFFF] border-2 border-grey text-black font-bold mt-[10px]'>
          <img className="me-2" src="/image/static/google.png" alt="" width={25} height={25} />
          Register With Google
        </button> */}

        <div className='w-[70%] text-center mt-[25px] font-light text-[13px]'>
          Dengan mendaftar anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi vipvoucher.
        </div>
        <div className='w-full text-[14px] flex items-center justify-center mt-[11px]'>
          <div className='font-normal text-[#B9B9B9]'>Sudah punya akun?</div>
          <div onClick={e=>navigate(`${base_url}/login`)} className='ml-1 text-[#235FD2] font-bold cursor-pointer'>Masuk di sini</div>
        </div>
      </div>
    </div>
  )

}

export default Register;