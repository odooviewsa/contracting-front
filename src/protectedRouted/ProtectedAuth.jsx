import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, requireAuth }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    if (requireAuth && !user?._id) {
      navigate("/");
    }
    if (!requireAuth && user?._id) {
      navigate(`/${user.companyName}/projects`);
    }
  }, [ navigate, user, requireAuth]);

  if (requireAuth && user?._id) return children;
  if (!requireAuth && !user?._id) return children;
  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  requireAuth: PropTypes.bool.isRequired,
};
