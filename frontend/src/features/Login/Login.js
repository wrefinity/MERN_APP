import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // after login navigate to the requested

  // to navigate to where you came from
  const backward = () => navigate(-1);

  navigate(from, { replace: true });
  return <div> Login</div>;
};

export default Login;
