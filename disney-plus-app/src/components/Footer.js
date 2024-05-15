import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-400 py-11 flex flex-col justify-center items-center gap-5 text-sm">
      <img src="/image/logo.svg" alt="logo" width={80} />
      <div className="flex gap-7">
        <Link to="" className="hover:text-white">
          Subscriber Agreement
        </Link>
        <Link to="" className="hover:text-white">
          Privacy Policy
        </Link>
        <Link to="" className="hover:text-white">
          Your California Privacy Rights
        </Link>
        <Link to="" className="hover:text-white">
          Do Not Sell My Personal Information
        </Link>
        <Link to="" className="hover:text-white">
          Children's Online Privacy Policy
        </Link>
      </div>
      <div className="flex gap-7">
        <Link to="" className="hover:text-white">
          Closed Captioning
        </Link>
        <Link to="" className="hover:text-white">
          Interest-Based Ads
        </Link>
        <Link to="" className="hover:text-white">
          Supported Devices
        </Link>
        <Link to="" className="hover:text-white">
          Help
        </Link>
        <Link to="" className="hover:text-white">
          Gift Disney+
        </Link>
        <Link to="" className="hover:text-white">
          About Us
        </Link>
        <Link to="" className="hover:text-white">
          Disney+ Partner Program
        </Link>
        <Link to="" className="hover:text-white">
          The Disney Bundle
        </Link>
      </div>
      <span>© Disney. All Rights Reserved.</span>
    </footer>
  );
};

export default Footer;
