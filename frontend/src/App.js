import { useEffect } from "react";
import { Router } from "./routes/Router";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./features/authSlice";


const App = () => {
  const dispatch = useDispatch();
  const { accessToken} = useSelector((state) => state.auth);
  const handleCheckAuth = () => {
    if (accessToken) {
      dispatch(setIsAuthenticated());
    }
  };

  useEffect(() => {
    handleCheckAuth(accessToken);
  }, []);

  return (
    <>
        <Router />
    </>
  );
};

export default App;
