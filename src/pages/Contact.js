import React from "react";
import PageHeading from "../components/PageHeading";

const Contact = () => {
  return (
    <div className="px-4 py-8">
      <PageHeading home="Home" pagename="Contact" />
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-6 text-lg text-center text-gray-600">
          Got an issue? Want to send feedback? Need any additional details? Let us know.
        </p>
        <form action="#" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="abc@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="What issue/suggestion do you have?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="6"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Query/Suggestion..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              style={{ width: "200px", height: "50px", marginLeft: "34rem" }}
              className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

