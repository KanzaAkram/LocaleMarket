import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navbar } from "../data/Data";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <>
      <div
        className={`${isSticky ? "sticky top-0 z-50 bg-white shadow-xl" : ""}`}
      >
        <div className=" flex flex-wrap justify-between pt-3 pb-3 w-10/12 m-auto">
          <div className="logo">
            <img src="./images/logo.png" alt="logo" />
          </div>
          <ul className="flex flex-wrap text-base font-medium uppercase">
            {navbar.map((nav, index) => (
              <li className="mr-5" key={index}>
                <Link className="hover:text-red-600" to={nav.path}>
                  {nav.nav}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap text-2xl">
            <Link className="mr-4 hover:text-red-600">
              <BiSearch />
            </Link>
            <div className="relative">
              <Link className="hover:text-red-600" onClick={toggleSidebar}>
                <BiShoppingBag />
              </Link>
              <div className="items_count">
                <span className="text-white">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
