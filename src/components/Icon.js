import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReusableIcon = ({ icon, ...props }) => {
  const IconComponent = icon;
  return <IconComponent {...props} />;
};

const Icon = () => {
  return (
    <div>
      <div className="flex">
        <Link className="mr-6 text-xl text-white">
          <ReusableIcon icon={FaFacebook} />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <ReusableIcon icon={FaLinkedin} />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <ReusableIcon icon={FaYoutube} />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <ReusableIcon icon={FaInstagram} />
        </Link>
      </div>
    </div>
  );
};

export default Icon;
