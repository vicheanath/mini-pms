import Layout from "./components/Layout/Layout";
import { Router, UnauthorizedRouter } from "./routes/Router";
import { useSelector } from "react-redux";

function App() {
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
