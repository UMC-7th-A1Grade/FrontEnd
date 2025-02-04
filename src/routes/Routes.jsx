import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import { TimerProvider } from '../components/randomPage/TimerContext';
import { SimilarProvider } from '../contexts/SimilarContext';

import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import NickNamePage from '../pages/NickNamePage';
import CharacterSelectPage from '../pages/CharacterSelectPage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';
import CameraPage from '../pages/CameraPage';
import AfterShootingPage from '../pages/AfterShootingPage';
import SimilarQuestionPage from '../pages/SimilarQuestionPage';
import ExplanationPage from '../pages/ExplanationPage';
import GoogleCallbackPage from '../pages/GoogleCallbackPage';
import RandomPage from '../pages/RandomPage';
import RandomQuestionPage from '../pages/RandomQuestionPage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route
        path='/auth/google/callback'
        element={<GoogleCallbackPage />}
      />

      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          path=''
          element={<HomePage />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='nickname'
          element={<NickNamePage />}
        />
        <Route
          path='characterselect'
          element={<CharacterSelectPage />}
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
        </Route>
        <Route
          path='afterShooting'
          element={
            <SimilarProvider>
              <AfterShootingPage />
            </SimilarProvider>
          }
        />
        <Route
          path='similarQuestion'
          element={
            <SimilarProvider>
              <SimilarQuestionPage />
            </SimilarProvider>
          }
        />
        <Route
          path='explanation'
          element={
            <SimilarProvider>
              <ExplanationPage />
            </SimilarProvider>
          }
        />
        <Route
          path='random'
          element={
            <TimerProvider>
              <RandomPage />
            </TimerProvider>
          }
        />
        <Route
          path='randomQuestion/:problemId'
          element={
            <TimerProvider>
              <RandomQuestionPage />
            </TimerProvider>
          }
        />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
