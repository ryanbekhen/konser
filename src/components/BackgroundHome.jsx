import React from 'react';

function BackgroundHome () {

  return (
    <div className='w-full md:h-[620px] h-[320px] relative flex flex-col items-center justify-center bg-home z-[50]' style={{background : `url('${process.env.PUBLIC_URL}/image/static/banner-utama.png')`}}>
      {/* <img src='/image/concert-bg.jpg' className='w-full h-full object-cover object-bottom absolute top-0' alt='bg'/> */}
      <h1 className='text-white font-bold md:text-[37px] text-[25px] z-[55] text-center'>Search The Best Experience</h1>
      <div className='text-white md:text-[22px] text-[17px] z-[55]'>Discover 1000+ Events</div>

      <div className='bg-white rounded-[32px] md:w-[600px] w-[300px] md:h-[54px] h-[48px] z-[56] mt-[25px] flex items-center'>
        <img src={`${process.env.PUBLIC_URL}/image/static/search-blue-2.png`} className='w-[22px] h-[22px] ml-[27px]' alt='search'/>
        <input className='md:w-[400px] w-[100px] h-full outline-none ml-[12px]' placeholder='Cari Ticket yang Anda Cari'/>
        {/* <span className='ml-[15px] text-[#999999] text-[17px]'></span> */}
      </div>

      <div className='absolute w-full h-full bg-[#235FD2] top-0 left-0 opacity-45 flex flex-col items-center justify-center '>
      </div>

    </div>
  )

}

export default BackgroundHome