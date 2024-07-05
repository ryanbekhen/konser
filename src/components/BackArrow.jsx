import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../utils/Icons'


function BackArrow ({name,route,isCustomClick,onClick,style}) {

  let navigate = useNavigate();

  return (
    <div onClick={e=>isCustomClick? onClick() :navigate(route)} className='flex items-center cursor-pointer' style={{...style}}>
      <ArrowLeft size={25}/>
      <span className='ml-[14px] font-semibold text-[18px]'>{name}</span>
    </div>
  )

} 

export default BackArrow;