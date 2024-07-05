import React from 'react';
import { base_url } from '../../utils/const';
function SearchBar () {

  return (
    <div className='flex'>
      <a href={"/"}>
        <img className='sm:w-[350px] w-[200px] h-[40px] object-contain' alt='vip-ticket' src={`${base_url}/image/static/logo.png`}/>
        {/* <img className='sm:w-[120px] w-[100%] h-[100%] object-contain' alt='vip-ticket' src='/image/loket-size-2.png'/> */}
      </a>
    </div>
  )

}

export default SearchBar;