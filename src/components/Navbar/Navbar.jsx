import React from 'react';
import NavbarNavigation from './NavbarNavigation';
import SearchBar from './SearchBar';

const Navbar = ({jwtToken,dataUser}) => {
  return (
    <div className="w-[100%] flex justify-center items-center h-[40px] py-[40px] fixed top-[0] z-[99999] bg-white" style={{boxShadow : "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"}}>
      <nav className='container flex justify-between items-center h-inherit sm:px-[0] px-[20px]' style={{flexDirection : "row"}} >
        <SearchBar/>
        <NavbarNavigation dataUser={dataUser} jwtToken={jwtToken} />
      </nav>
    </div>
  )
}

export default Navbar