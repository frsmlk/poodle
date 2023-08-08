import { Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route
          path='/breed'
          element={
            <ProtectedRoute>
              <h1>Redirected</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
