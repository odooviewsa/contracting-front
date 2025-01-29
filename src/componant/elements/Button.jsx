import { Link } from "react-router-dom";

const Button = ({
  type,
  href,
  className = "",
  styleHtml,
  disabled,
  children,
}) => {
  let style = `bg-primaryColor text-white rounded-md px-6 py-2 text-sm font-medium ${className}`;
  return href ? (
    <Link style={styleHtml} to={href} className={style}>
      {children}
    </Link>
  ) : (
    <button style={styleHtml} disabled={disabled} type={type} className={style}>
      {children}
    </button>
  );
};
export default Button;
