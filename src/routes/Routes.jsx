import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';
import RandomPage from '../pages/RandomPage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          path=''
          element={<HomePage />}
        />
        <Route
          path='myPage'
          element={<MyPage />}
        />
        <Route
          path='ranking'
          element={<RankingPage />}
        />
        <Route
          path='storage'
          element={<StoragePage />}
        />
        <Route
          path='random'
          element={<RandomPage />}
        />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
