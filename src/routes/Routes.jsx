import { Routes as ReactRouters, Route } from "react-router-dom";
import Layout from "../layout/Layout";

//pages
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import NicknamePage from "../pages/NicknamePage/NicknamePage";


const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="nickname" element={<NicknamePage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;