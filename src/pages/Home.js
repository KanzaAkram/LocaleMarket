import React from "react";
import Banner from "../components/Banner";
import { Feature } from "../components/Feature";
import { Review } from "../components/Review";
import { NewDesignCover } from "../components/NewDesignCover";
import { Blog } from "../components/Blog";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <Review />
      <NewDesignCover />
      <Blog />
      <Sidebar />
    </>
  );
};

export default Home;
