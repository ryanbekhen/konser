import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Ticket , Cart } from '../../utils/Icons'
import UseauthenticateUser from '../../hooks/useAuthenticateUser';
import { base_url } from '../../utils/const';
const NavbarNavigation = ({jwtToken,dataUser}) => {
  
  const navigate = useNavigate();

  const toMyTicket = () => {

    if (!localStorage.getItem('TOKEN_ID')||!dataUser||!jwtToken) {
      navigate(`${base_url}/login?aftercheckout=true`)
      return false
    }else{
      navigate(`${base_url}/myticket`)
    }

  }

  return (
    // <ul className='grid grid-cols-2 gap-[20px] items-center' style={{gridTemplateColumns: "auto 1fr auto 1fr auto"}}>
    <ul className='flex justify-center items-center' style={{gridTemplateColumns: "auto 1fr auto 1fr auto"}}>
      {
        jwtToken &&
        <li>
          <button onClick={toMyTicket}className='py-[8px] px-[16px] text-[15px] border-none font-semibold flex items-center justify-center hover:bg-black hover:text-white'> 
            <Ticket size={24.5}/> 
            <span className='ml-2 text-[13.5px]'>
              Ticket
            </span>
          </button>
        </li> 
      }
      {
        jwtToken && localStorage.getItem('cartlist') &&
        <li>
          <button 
            onClick={e=>navigate(`${base_url}/checkout`)}
            className='relative py-[8px] px-[16px] text-[15px] border-none font-semibold flex items-center justify-center hover:bg-black hover:text-white'
            > 
            <Cart size={24.5}/> 
            <div className='rounded-[2px] left-[28px] right-0 top-[3px]  text-center w-[16px] h-[16px] absolute flex justify-center items-center bg-[#235FD2] text-white text-[13px]'>
              {JSON.parse(localStorage.getItem('cartlist')).length}
            </div>
          </button>
        </li> 
      }
      {
        !jwtToken &&
        <li>
          <button onClick={e=>navigate(`${base_url}/login`)}className='py-[8px] px-[16px] text-[15px] border-none rounded-[8px] bg-[#235FD2] text-white font-semibold'>Sign In</button>
        </li>
      }
    </ul>
  )
}

export default NavbarNavigation