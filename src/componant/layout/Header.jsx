import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ first, second }) {
  const { pathname } = useLocation();
  const user = useSelector((state) => state?.user);

  const url = pathname.includes(`workconfirm`)
    ? `/${user?.companyName}/workconfirm`
    : pathname.includes("contracts")
    ? `/${user?.companyName}/contracts`
    : -1;
  const navigate = useNavigate();
  return (
    <div className="print:hidden flex items-center gap-1 text-[0.9rem]">
      <h1
        onClick={() => navigate(url)}
        className="cursor-pointer text-gray-500"
      >
        {first}
      </h1>
      <FaChevronRight size={10} className="mt-1" />
      <h1 className="text-blue-400">{second}</h1>
    </div>
  );
}

Header.propTypes = {
  first: PropTypes.string,
  second: PropTypes.string,
};

export default Header;
