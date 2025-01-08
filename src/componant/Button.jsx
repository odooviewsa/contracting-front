import { Link } from "react-router-dom";

const Button = ({ href, onClick, className = "", state, children }) => {
  let style = `py-2 px-5 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit ${className}`;
  return href ? (
    <Link to={href} state={state} className={style}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};
export default Button;
