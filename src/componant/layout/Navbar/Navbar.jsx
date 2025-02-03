import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../../Avatar";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Navbar({ setOpenSidebar }) {
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // State for language menu visibility

  // Function to handle language change
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageMenuOpen(false); // Close the menu after language change
  };

  // Function to toggle language menu visibility
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  return (
    <div className="print:hidden bg-primaryColor w-full py-3 px-3 flex justify-between md:justify-end items-center z-20 sticky top-0">
      <div className="md:hidden">
        <GiHamburgerMenu
          size={30}
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="cursor-pointer text-white"
        />
      </div>
      <div className="flex gap-3 items-center text-white">
        {/* Language Switcher Menu */}
        <div className="relative">
          <p
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleLanguageMenu}
          >
            <IoChevronDownOutline size={14} />
            {i18n.language === "en" ? "English" : "عربي"}
          </p>

          {/* Language options menu */}
          {isLanguageMenuOpen && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-32">
              <li>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 text-primaryColor"
                >
                  English
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 text-primaryColor"
                >
                  عربي
                </button>
              </li>
            </ul>
          )}
        </div>

        <IoMdNotifications size={25} />
        <IoIosChatboxes size={25} />
        <Avatar name={"Ahmed Rashad"} width={35} fontSize={13} />
      </div>
    </div>
  );
}

Navbar.propTypes = {
  setOpenSidebar: PropTypes.func,
};
