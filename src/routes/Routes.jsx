import { Routes as ReactRouters, Route } from "react-router-dom";
import Layout from "../layout/Layout";

//pages
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage/LoginPage";
import NicknamePage from "../pages/NicknamePage/NicknamePage";
import Ranking from "../pages/Ranking/Ranking";
import StoragePage from "../pages/StoragePage";

const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="nickname" element={<NicknamePage />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="storage" element={<StoragePage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;