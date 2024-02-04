import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Router, UnauthorizedRouter } from "./routes/Router";
import { useSelector } from "react-redux";

function App() {
  const handleCheckAuth = () => {
    console.log("Checking auth");
  };

  useEffect(() => {
    
    handleCheckAuth();
  }, []);

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <Router />
        </Layout>
      ) : (
        <UnauthorizedRouter />
      )}
    </>
  );
}

export default App;
