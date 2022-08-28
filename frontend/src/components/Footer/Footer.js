import React from "react";

const Footer = () => {
  return (
    <div className="z-50 w-screen p-6 px-16 flex flex-col justify-center items-center bg-crimsonColor">
      <i className="text-xl text-white">
        Copyright &copy; WrashTech
        <script>document.write(new Date().getFullYear());</script>
      </i>
    </div>
  );
};

export default Footer;