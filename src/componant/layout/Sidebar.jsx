import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { MdOutlineAppRegistration } from "react-icons/md";
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
export default function Sidebar({ setOpenSidebar, openSidebar }) {
  const { pathname } = useLocation();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogout() {
    await logout(dispatch);
    navigate("/");
  }
  return (
    <div
      className={`flex flex-col gap-2 p-2 md:p-0   ${
        !openSidebar && "hidden md:block"
      }`}
    >
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
          }`}
        >
          <FaProjectDiagram size={20} />
          <h1 className={`${openSidebar ? "block" : "hidden"}`}>Project</h1>
        </Link>
        <Link to={"/"} className="flex items-center gap-2 text-grayColor p-3">
          <MdOutlineAppRegistration size={20} />
          {openSidebar && <h1>Estimator</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/boqTemplate`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("boqTemplate") && "activeSidebar"
          }`}
        >
          <LuBookTemplate size={20} />
          {openSidebar && <h1>BOQ Templates</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/contracts`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("contracts") && "activeSidebar"
          }`}
        >
          <FaFileContract size={20} />
          {openSidebar && <h1>Contracts</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/workconfirm`}
          className="flex items-center gap-2 text-grayColor p-3"
        >
          <FaCheckCircle size={20} />
          {openSidebar && <h1>Work Confirmation</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/estimation`}
          className="flex items-center gap-2 text-grayColor p-3"
        >
          <FaRegWindowRestore size={20} />
          {openSidebar && <h1>Estimator</h1>}
        </Link>
        <Link to={"/"} className="flex items-center gap-2 text-grayColor p-3">
          <MdPayment size={20} />
          {openSidebar && <h1>Billing</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/partners`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("partners") && "activeSidebar"
          }`}
        >
          <TiGroup size={20} />
          {openSidebar && <h1>Partenrs</h1>}
        </Link>
        {/* // */}
        <Link
          to={`/${user?.companyName}/materials`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("materials") && "activeSidebar"
          }`}
        >
          <GiExplosiveMaterials size={20} />
          {openSidebar && <h1>Material Request</h1>}
        </Link>
        {/* // */}
        <Link
          to={`/${user?.companyName}/productsManagemet`}
          className={`flex items-center gap-2 text-grayColor p-3 ${
            pathname.includes("productsManagemet") && "activeSidebar"
          }`}
        >
          <FaProductHunt size={20} />
          {openSidebar && <h1>Product</h1>}
        </Link>
        <Link
          to={`/${user?.companyName}/setting`}
          className="flex items-center gap-2 text-grayColor p-3"
        >
          <IoIosSettings size={20} />
          {openSidebar && <h1>Setting</h1>}
        </Link>

        <Link
          to={"/"}
          className="flex items-center gap-2 text-red-500 p-3"
          onClick={handleLogout}
        >
          <AiOutlineLogout size={20} />
          {openSidebar && <h1>Logout</h1>}
        </Link>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
};
