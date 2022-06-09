import { FunctionComponent, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import SearchAndSortProducts from "./components/SearchAndSortProducts";
import { useAuth } from "./context/Auth";
import "./App.css";
import Spinner from "./components/Spinner";

const App: FunctionComponent = () => {
  const { token, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!token) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/search" element={<SearchAndSortProducts />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
