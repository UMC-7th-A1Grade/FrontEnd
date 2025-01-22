import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/LoginPage/LoginPage';
import NickNamePage from '../pages/NickNamePage/NickNamePage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          path=''
          element={<Login />}
        />
        <Route
          path='home'
          element={<HomePage />}
        />

        <Route
          path='nickname'
          element={<NickNamePage />}
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
      </Route>
    </ReactRouters>
  );
};

export default Routes;