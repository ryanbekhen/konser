import React from "react";
import { Twitter, XTwitter, Instagram, Whatsapp, Email } from "../../utils/Icons";
// import { FaInstagram } from "react-icons/fa";

function Footer () {

  return (
    <footer className="relative bg-[#e2e8f0] pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl fonat-semibold text-blueGray-700">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <a
                  target="_blank"
                  href={process.env.REACT_APP_CONTACT_INSTAGRAM}
                  className="inline-flex bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Instagram/> 
                </a>
                <a
                  target="_blank"
                  href={`https://wa.me/${process.env.REACT_APP_CONTACT_WHATSAPP}?text=`}
                  className="inline-flex bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Whatsapp size={23} color={"#075E54"}/> 
                </a>
                <a
                  href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
                  className="inline-flex bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Email size={23}/> 
                </a>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Page Navigation
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Contact Us
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] inline-flex items-center font-semibold block pb-2 text-sm"
                        target="_blank"
                        href={`https://wa.me/${process.env.REACT_APP_CONTACT_WHATSAPP}?text=`}
                      >
                        <Whatsapp size={20}/> <span className="ml-2" >{ process.env.REACT_APP_CONTACT_WHATSAPP }</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#475569] hover:text-[#1e293b] inline-flex items-center font-semibold block pb-2 text-sm"
                        href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
                      >
                         <Email size={20}/> <span className="ml-2" >{ process.env.REACT_APP_CONTACT_EMAIL }</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-[#cbd5e1]" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  {" "}
                  VIP Voucher By
                </a>
                <a
                  href="https://www.creative-tim.com?ref=njs-profile"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  Intama Team
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
  )

}

export default Footer;