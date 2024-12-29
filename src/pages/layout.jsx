import { Outlet } from "react-router-dom";
import Sidebar from "../componant/layout/Sidebar";
import Navbar from "../componant/layout/Navbar/Navbar";
import { useState } from "react";


export default function Layout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="">
      <div
        className={` transition-all sidebar fixed top-0 bottom-0  p-0  ${
          openSidebar ? "lg:w-[300px]" : "w-[0px] md:w-[60px] lg:w-[60px]"
        }  text-center bg-[#F1F2F7]  pt-2 md:pr-2  z-50`}
      >
        <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      </div>

      <div
        className={` transition-all  md:absolute right-0   ${
          openSidebar
            ? "md:-[calc(100vw-200px)] lg:w-[calc(100vw-300px)]"
            : "md:w-[calc(100vw-60px)]"
        }`}
      >
        <Navbar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        <div className="md:p-5 p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
