import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../../Avatar";
import InputSearch from "./InputSearch";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import PropTypes from "prop-types";

export default function Navbar({ setOpenSidebar }) {
  return (
<div className="bg-primaryColor w-full py-3 px-3 flex justify-between md:justify-end items-center z-20 sticky top-0">
    <div className="md:hidden">
        <GiHamburgerMenu size={30} onClick={() => setOpenSidebar(prev => !prev)} className="cursor-pointer text-white" />
    </div>
    {/* <InputSearch /> */}
    <div className="flex gap-3 items-center">
        <IoMdNotifications color="white" size={25} />
        <IoIosChatboxes color="white" size={25} />
        <Avatar name={"Ahmed Rashad"} width={35} fontSize={13} />
    </div>
</div>


  );
}

Navbar.propTypes = {
  setOpenSidebar: PropTypes.func,
};
