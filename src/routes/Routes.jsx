import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';
import AfterShootingPage from '../pages/AfterShootingPage';
import SimilarQuestionPage from '../pages/SimilarQuestionPage';
import ExplanationPage from '../pages/ExplanationPage';

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
          path='afterShooting'
          element={<AfterShootingPage />}
        />
        <Route
          path='similarQuestion'
          element={<SimilarQuestionPage />}
        />
        <Route
          path='explanation'
          element={<ExplanationPage />}
        />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
