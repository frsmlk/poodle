import { Route, Routes } from 'react-router-dom';
import Authorization from './pages/Authorization';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Breed from './pages/Breed';

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
      </Routes>
    </Layout>
  );
}

export default App;
