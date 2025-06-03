import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed w-full z-10 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}>
        <header className="flex justify-between items-center xl:px-0 px-[20px] max-w-[1280px] m-auto py-[20px]">
          <Link to={"/"}>
            <span className="header-logo text-[#282828] font-bold text-[16px] min-[310px]:text-[22px]">
              Inamjanov shop
            </span>
          </Link>
          <ul className="flex items-center gap-[10px]">
            <Link to={"https://t.me/Inamjanov_3D"} className="">
              <FaTelegram className="tg-icon text-[32px]" />
            </Link>
            <Link to={"/contact"} className="text-[#fff]">
              <li className="bg-black px-[12px] text-[14px] py-[8px] rounded-[10px]">
                Contact
              </li>
            </Link>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;
