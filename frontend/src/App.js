import Layout from "./components/Layout/Layout";
import { Router, UnauthorizedRouter } from "./routes/Router";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <UnauthorizedRouter />
      ) : (
        <Layout>
          <Router />
        </Layout>
      )}
    </>
  );
}

export default App;
