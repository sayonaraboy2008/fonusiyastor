import React from "react";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";
function Header() {
  return (
    <>
      <header className="flex justify-between items-center xl:px-0 px-[20px] max-w-[1280px] m-auto py-[20px]">
        <Link to={"/"}>
          <span className="header-logo text-[#282828] font-bold text-[16px] min-[310px]:text-[22px]">
            Inamjanov shop
          </span>
        </Link>
        <ul className="flex items-center gap-[10px]">
          {/* <li>
            <a href="">Portfolio</a>
          </li> */}
          <Link to={"https://t.me/Inamjanov_3D"} className=" ">
            {/* <span>Contact vis Telegram</span> */}
            <FaTelegram className="tg-icon text-[32px]" />
          </Link>
          <Link to={"/contact"} className=" text-[#fff]">
            <li className="bg-black px-[12px] text-[14px] py-[8px] rounded-[10px]">
              Contact
            </li>
          </Link>
        </ul>
      </header>
    </>
  );
}

export default Header;
