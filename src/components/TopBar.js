import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const TopBar = () => {
  return (
    <div className="bg-red-600 p-2">
      <ul className="flex place-content-between">
        {/* <li>
          <Link className="mr-2 text-white uppercase border-l-2 pr-4 pl-4 border-r-2">
            ENGLISH
          </Link>
          <Link className="mr-2 text-white uppercase border-r-2 pl-2 pr-4">
            PKR
          </Link>
          <Link className="mr-2 text-white uppercase pl-2 ">
            Free shipping for all orders of Rs. 5000 or more
          </Link>
        </li> */}
        <li className="flex place-items-center">
          <Icon />
          <Link to="/Contact" className="mr-5 text-white uppercase pl-4 border-l-2 border-r-2 pr-4">
            Contact Us
          </Link>
          <Link to="/AddProducts" className="mr-5 text-white uppercase border-r-2 pr-4">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
