import { Routes as ReactRouters, Route } from "react-router-dom";
import Layout from "../layout/Layout";

//pages
import HomePage from "../pages/HomePage";
import RankingPage from "../pages/RankingPage";
import StoragePage from "../pages/StoragePage";

const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="storage" element={<StoragePage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
