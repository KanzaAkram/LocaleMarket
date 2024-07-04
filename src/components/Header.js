import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { navbar } from "../data/Data";
import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { totalItems } = useSelector((state) => state.cart);


  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <>
      <div
        // className={`${isSticky ? "sticky top-0 z-50 bg-white shadow-xl" : ""}`}
        className={`${
          isSticky ? "sticky top-0 z-50 bg-white shadow-xl" : ""
        } transition-colors duration-300 ease-in-out ${!isSticky ? "bg-red" : ""}`}
      >
        <div className=" flex flex-wrap justify-between pt-3 pb-3 w-10/12 m-auto">
          <div className="logo">
            <img src="./images/logo_w.png" alt="logo" />
          </div>
          <ul className="flex flex-wrap text-xl font-medium uppercase">
            {navbar.map((nav, index) => (
              <li className="mr-5" key={index}>
                <Link className="hover:text-white" to={nav.path}>
                  {nav.nav}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap text-2xxl" >
            <Link to="/loginsignup" className="text-2xxl hover:text-white text-2xll" >
                <BiUser />
              </Link>
            <div className="relative">
              <Link className="text-2xxl hover:text-white" onClick={toggleSidebar}>
                <BiShoppingBag />
              </Link>
              <div className="items_count">
                <span className="text-white">{totalItems}</span>
              </div>
            </div>
              <button
              onClick={handleLogout}
              className="rounded-md hover:text-white "
              style={{height: '30px', width: '80px', fontSize: '1.25rem', lineHeight: '1rem', marginLeft: '50px'}}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
