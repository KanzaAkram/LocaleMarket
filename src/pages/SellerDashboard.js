import React from "react";
import PageHeading from "../components/PageHeading";

const SellerDashboard = () => {
    return (
        <div className="px-4 py-8">
            <PageHeading home="Home" pagename="SellerDashboard" />
            <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
                    Seller Dashboard
                </h2>

            </div>
        </div>
    );
};

export default SellerDashboard;

