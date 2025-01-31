// import { Routes as ReactRouters, Route } from 'react-router-dom';
// import Layout from '../layout/Layout';

// import HomePage from '../pages/HomePage';
// import Login from '../pages/LoginPage';
// import NickNamePage from '../pages/NickNamePage';
// import CharacterSelectPage from '../pages/CharacterSelectPage';
// import MyPage from '../pages/MyPage';
// import StoragePage from '../pages/StoragePage';
// import RankingPage from '../pages/RankingPage';
// import CameraPage from '../pages/CameraPage';
// import EditPage from '../pages/EditPage';
// import AfterShootingPage from '../pages/AfterShootingPage';
// import SimilarQuestionPage from '../pages/SimilarQuestionPage';
// import ExplanationPage from '../pages/ExplanationPage';
// import AuthCallback from '../components/LoginPage/GoogleCallback';
// import RandomPage from '../pages/RandomPage';

// const Routes = () => {
//  return (
//    <ReactRouters>
//      <Route
//        path='/'
//        element={<Layout />}
//      >
//       <Route
//          path=''
//          element={<HomePage />}
//        />
//        <Route
//          path='login'
//          element={<Login />}
//        />
//        <Route
//          path='nickname'
//          element={<NickNamePage/>}
//        />
//        <Route
//          path='characterselect'
//          element={<CharacterSelectPage />}
//        />

//        <Route
//          path='myPage'
//          element={<MyPage />}
//        />
//        <Route
//          path='ranking'
//          element={<RankingPage />}
//        />
//        <Route
//          path='storage'
//          element={<StoragePage />}
//        />
//        <Route path='camera'>
//          <Route
//            index
//            element={<CameraPage />}
//          />
//          <Route
//            path='edit'
//            element={<EditPage />}
//          />
//        </Route>
//        <Route
//          path='afterShooting'
//          element={<AfterShootingPage />}
//        />
//        <Route 
//          path='auth/google/callback' 
//          element={<AuthCallback />} 
//        />
//         <Route
//           path='similarQuestion'
//           element={<SimilarQuestionPage />}
//         />
//         <Route
//           path='explanation'
//           element={<ExplanationPage />}
//         />
//         <Route
//           path='random'
//           element={<RandomPage />}
//         />
//       </Route>
//    </ReactRouters>
//  );
// };

// export default Routes;



import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import NickNamePage from '../pages/NickNamePage';
import CharacterSelectPage from '../pages/CharacterSelectPage';
import MyPage from '../pages/MyPage';
import StoragePage from '../pages/StoragePage';
import RankingPage from '../pages/RankingPage';
import CameraPage from '../pages/CameraPage';
import EditPage from '../pages/EditPage';
import AfterShootingPage from '../pages/AfterShootingPage';
import SimilarQuestionPage from '../pages/SimilarQuestionPage';
import ExplanationPage from '../pages/ExplanationPage';
import GoogleCallbackPage from '../pages/GoogleCallbackPage';
import RandomPage from '../pages/RandomPage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path='nickname' element={<NickNamePage/>} />
        <Route path='characterselect' element={<CharacterSelectPage />} />
        <Route path='myPage' element={<MyPage />} />
        <Route path='ranking' element={<RankingPage />} />
        <Route path='storage' element={<StoragePage />} />
        <Route path='camera'>
          <Route index element={<CameraPage />} />
          <Route path='edit' element={<EditPage />} />
        </Route>
        <Route path='afterShooting' element={<AfterShootingPage />} />
        <Route path='auth/google/callback' element={<GoogleCallbackPage />} />
        <Route path='similarQuestion' element={<SimilarQuestionPage />} />
        <Route path='explanation' element={<ExplanationPage />} />
        <Route path='random' element={<RandomPage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;