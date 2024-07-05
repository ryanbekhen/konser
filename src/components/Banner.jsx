import React from 'react';
import { base_url } from '../utils/const';
function Banner ({img}) {

  return (
    <div className=' flex justify-center items-center'>
      <div className="md:w-full w-[90%] md:h-[260px] h-[140px] sm:mt-[30px] mt-[25px]">
        <img className="sm:rounded-[16px] rounded-[8px] w-[100%] h-[100%] object-cover" src={ img ? `${base_url}/image/static/banner-atas.png` : `${base_url}/image/static/banner-atas.png`} alt='test'/>
      </div>
    </div>
  )

}

export default Banner; 