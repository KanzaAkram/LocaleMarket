import React from "react";
import Banner from "../components/Banner";
import { Feature } from "../components/Feature";
import { Review } from "../components/Review";
import { BestSeller } from "../components/BestSeller";
import { Blog } from "../components/Blog";
import Sidebar from "../components/Sidebar";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <Review />
      {/* <BestSeller /> */}
      <AboutSection />
      {/* <Blog /> */}
      <Sidebar />
    </>
  );
};

export default Home;
