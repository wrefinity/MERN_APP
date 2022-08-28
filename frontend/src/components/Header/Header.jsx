import React from "react";
import { MdLogin } from "react-icons/md";
import {Link } from "react-router-dom";
// import {motion} from "framer-motion";
const Header = () => {
  const login = () =>{

  }
  return (
    <header className="fixed z-50 w-screen p-6 px-16 bg-white">
      {/* desktop and tab */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center justify-center gap-2">
          <h5 className="w-10 object-cover">LOGO</h5>
          <p className="text-headingColor text-2xl font-bold ml-2">
            SAM ALEXIS
          </p>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About-Us
            </li>
          </ul>

          <div className="relative flex item-center justify-center">
            <MdLogin className="text-crimsonColor text-2xl ml-8 cursor-pointer" onClick={login} />
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};
export default Header;
