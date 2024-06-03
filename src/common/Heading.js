import React from "react";

export const Heading = ({ heading, subheading, description }) => {
  return (
    <div>
      <div className="text-center mt-8">
        <h4 className="text-xl uppercase mb-2">{heading}</h4>
        <h1 className="text-4xl uppercase font-semibold mb-2">{subheading}</h1>
        <p className="mb-2">{description}</p>
      </div>
    </div>
  );
};
