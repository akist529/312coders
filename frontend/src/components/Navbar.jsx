import { Link } from "react-router-dom";
// import Hamburger from "./Hamburger";
import "./Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [button, setButton] = useState(true);

  // const toggleHamburger = () => {
  //   setHamburgerOpen(!hamburgerOpen);
  // };

  const closeMobileMenu = () => setHamburgerOpen(false);

  const showButton = () => {
    if (window.innerWidth <= 768) {
      setHamburgerOpen(false);

    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <>
      <nav>

        <div className="navbar bg-dark-blue text-white pb-3">
          <div>
            <ul className="flex justify-center md:justify-end md:text-xl mx-auto px-7 items-center ">
              <li className="mr-10 mt-5">
                <Link
                  to="/"
                  className="hover:text-red-500 transition duration-500"
                  // onClick={toggleHamburger}
                >
                  Home
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/about"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/community"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  Community
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/discord"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="Hamburger" onClick={toggleHamburger}>

            <Hamburger />
          </div> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
