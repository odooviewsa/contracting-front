import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaTasks } from "react-icons/fa";
import { FaFileContract, FaFileLines } from "react-icons/fa6";
import { LuBookTemplate } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { TiGroup } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from "prop-types";
import { logout } from "../../utils/logout";
import { useDispatch, useSelector } from "react-redux";
import { FaRegWindowRestore } from "react-icons/fa";
import { GiExplosiveMaterials } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ImProfile } from "react-icons/im";
const iconMap = {
  HiUsers: IoPeople,
  ImProfile: ImProfile,
};
export default function Sidebar({ setOpenSidebar, openSidebar }) {
  const { pathname } = useLocation();
  // Language
  const { t } = useTranslation();
  // Open Menu
  const [openMenu, setOpenMenu] = useState();

  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogout() {
    await logout(dispatch);
    navigate("/");
  }
  return (
    <div
      className={`flex flex-col gap-2 p-2 md:p-0 relative z-40 ${
        !openSidebar && "hidden md:block"
      }`}>
      <div className="pl-3 self-end">
        <GiHamburgerMenu
          size={35}
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      <div className={`flex flex-col pl-2`}>
        <Link
          to={`/${user?.companyName}/projects`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname === "/projects" && "activeSidebar"
          }`}>
          <FaProjectDiagram size={20} />
          <h1 className={`${openSidebar ? "block" : "hidden"}`}>
            {t("Sidebar.project")}
          </h1>
        </Link>

        <Link
          to={`/${user?.companyName}/boqTemplate`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("boqTemplate") && "activeSidebar"
          }`}>
          <LuBookTemplate size={20} />
          {openSidebar && <h1>{t("Sidebar.boqTemplates")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/contracts`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("contracts") && "activeSidebar"
          }`}>
          <FaFileContract size={20} />
          {openSidebar && <h1>{t("Sidebar.contracts")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/workconfirm`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("workconfirm") && "activeSidebar"
          }`}>
          <FaCheckCircle size={20} />
          {openSidebar && <h1>{t("Sidebar.workConfirmation")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/estimation`}
          className="flex items-center gap-2 text-grayColor p-3">
          <FaRegWindowRestore size={20} />
          {openSidebar && <h1>{t("Sidebar.estimator")}</h1>}
        </Link>
        <Link to={"/"} className="flex items-center gap-2 text-grayColor p-3">
          <MdPayment size={20} />
          {openSidebar && <h1>{t("Sidebar.billing")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/partners`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("partners") && "activeSidebar"
          }`}>
          <TiGroup size={20} />
          {openSidebar && <h1>{t("Sidebar.partners")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/materials`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("materials") && "activeSidebar"
          }`}>
          <GiExplosiveMaterials size={20} />
          {openSidebar && <h1>{t("Sidebar.materialRequest")}</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/productsManagemet`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("productsManagemet") && "activeSidebar"
          }`}>
          <FaProductHunt size={20} />
          {openSidebar && <h1>{t("Sidebar.product")}</h1>}
        </Link>
        {/* Report Page */}
        <Link
          to={`/${user?.companyName}/reports`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("reports") && "activeSidebar"
          }`}>
          <FaFileLines size={20} />
          {openSidebar && <h1>{t("Sidebar.reports")}</h1>}
        </Link>
        {/* Tasks Page */}
        <Link
          to={`/${user?.companyName}/tasks`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("tasks") && "activeSidebar"
          }`}>
          <FaTasks size={20} />
          {openSidebar && <h1>{t("Sidebar.tasks")}</h1>}
        </Link>
        <p
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-2 text-grayColor p-3 cursor-pointer">
          <IoIosSettings size={20} />
          {openSidebar && <h1>{t("Sidebar.setting")}</h1>}
        </p>
        {/* Menu */}
        {openMenu &&
          t("SettingSideBar.links", {
            returnObjects: true,
            companyName: user?.companyName,
          }).map((link, key) => {
            const Icon = iconMap[link.icon];
            return (
              <Link
                to={link.to}
                className={`flex items-center gap-2 text-grayColor p-3 ${
                  openSidebar && "ltr:ml-5 rtl:mr-5"
                }`}
                key={key}>
                {Icon && <Icon size={20} />}
                {openSidebar && link.text}
              </Link>
            );
          })}
        <Link
          to={"/"}
          className="flex items-center gap-2 text-red-500 p-3"
          onClick={handleLogout}>
          <AiOutlineLogout size={20} />
          {openSidebar && <h1>{t("Sidebar.logout")}</h1>}
        </Link>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
};
