import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    alert();
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Header openSidebar={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Layout;
