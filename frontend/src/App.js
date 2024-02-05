import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Router, UnauthorizedRouter } from "./routes/Router";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated,accessToken} = useSelector((state) => state.auth);
  const handleCheckAuth = () => {
    if (accessToken) {
      dispatch(setIsAuthenticated());
    }
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <>
        <Router />
    </>
  );
};

export default App;
