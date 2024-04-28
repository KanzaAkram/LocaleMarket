import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Icon = () => {
  return (
    <div>
      <div className="flex">
        <Link className="mr-6 text-xl text-white">
          <FaFacebook />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <FaLinkedin />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <FaYoutube />
        </Link>
        <Link className="mr-6 text-xl text-white">
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
};

export default Icon;
