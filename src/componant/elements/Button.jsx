import { Link } from "react-router-dom";

const Button = ({ type, href, className = "", children }) => {
  let style = `bg-primaryColor text-white rounded-md px-6 py-2 ${className}`;
  return href ? (
    <Link to={href} className={style}>
      {children}
    </Link>
  ) : (
    <button type={type} className={style}>
      {children}
    </button>
  );
};
export default Button;
