import { Routes as ReactRouters, Route } from "react-router-dom";
import Layout from "../layout/Layout";

//pages
import HomePage from "../pages/HomePage/HomePage";
// import Ranking from "../pages/Ranking/Ranking";
// import StoragePage from "../pages/StoragePage";
import Login from "../pages/LoginPage/LoginPage";
import NickNamePage from "../pages/NickNamePage/NickNamePage";


const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="nickname" element={<NickNamePage />} />
        {/* <Route path="ranking" element={<Ranking />} /> */}
        {/* <Route path="storage" element={<StoragePage />} /> */}
      </Route>
    </ReactRouters>
  );
};

export default Routes;