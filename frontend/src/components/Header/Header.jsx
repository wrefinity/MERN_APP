import React from "react";

const Header = () => {
  return (
    <div className="fixed z-50 w-screen p-6 px-16">
      {/* desktop and tab */}
      <div className="hidden md:flex w-full h-full">
        <div className="flex items-center gap-2">
          <h5 className="w-10 object-cover">LOGO</h5>
          <h3 className="text-headingColor text-xl font-bold">SAM ALEXIS</h3>
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
};
export default Header;