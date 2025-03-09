import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="RegisterPage" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;