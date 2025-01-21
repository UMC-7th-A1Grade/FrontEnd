import { Routes as ReactRouters, Route } from "react-router-dom";
import Layout from "../layout/Layout";

//pages
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import NickNamePage from "../pages/NickNamePage/NickNamePage";


const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="nickname" element={<NickNamePage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;