import { Route, Routes } from 'react-router-dom';
import Authorization from './pages/Authorization';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Breed from './pages/Breed';
import Feed from './pages/Feed';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route
          path='/breed'
          element={
            <ProtectedRoute>
              <Breed />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
