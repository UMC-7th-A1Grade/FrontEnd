import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';
import CameraPage from '../pages/CameraPage';
import EditPage from '../pages/EditPage';
import AfterShootingPage from '../pages/AfterShootingPage';

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
        <Route path='camera'>
          <Route
            index
            element={<CameraPage />}
          />
          <Route
            path='edit'
            element={<EditPage />}
          />
        </Route>
        <Route
          path='afterShooting'
          element={<AfterShootingPage />}
        />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
