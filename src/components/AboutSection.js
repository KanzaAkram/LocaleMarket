// import React from "react";

// export const NewDesignCover = () => {
//   return (
//     <div className="bg-design-cover">
//       <div className="w-10/12 m-auto">
//         <p className="">We make it easy to experience creativity</p>
//         <h1 className="text-6xl uppercase font-semibold">Stylish New Design</h1>
//         <p className="">
//           Welcome to the home of Local Businesess Items and Accessories
//         </p>

//         <button type="button" className="mt-4 btn pt-3 pb-3 pr-6 pl-6">
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// };


import React from "react";

const AboutSection = () => {
  return (
    <div className="bg-design-cover">
      <div className="w-10/12 m-auto flex flex-col md:flex-row items-center py-12">
        <div className="md:w-6/12 w-full text-left">
          <p className="text-lg text-gray-700">
            <h3 style={{color: '#f05a66'}}>Discover the essence of creativity and local craftsmanship.</h3>
          </p>
          <h1 className="text-5xl uppercase font-semibold text-gray-900">
            About <br/> Locale Market
          </h1>
          <p className="mt-4 text-x text-gray-800">
            At Locale Market, we bring the charm and uniqueness of local home-based businesses to a global audience. Our platform is dedicated to showcasing the best in locally made food items, handicrafts, clothing, and cosmetics. We believe in empowering entrepreneurs by providing them with a space to display their talents and products, fostering growth and community connections.
          </p>
          <p className="mt-4 text-x text-gray-800">
            Whether you're a seller looking to expand your reach or a customer seeking unique, high-quality products, Locale Market is your go-to destination. Join us in celebrating the spirit of local businesses and the incredible stories behind each product.
          </p>
        </div>
        <div className="md:w-4/12 w-full mt-8 md:mt-0">
          <img src="../images/about.jpg" alt="About Locale Market" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;