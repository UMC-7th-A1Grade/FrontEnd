import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import Ranking from '../pages/Ranking/Ranking';
import StoragePage from '../pages/StoragePage';

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
          element={<Ranking />}
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
