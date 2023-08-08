import { Route, Routes } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import Layout from './components/Layout';
import SignIn from './components/Auth/SignIn';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Layout>
  );
}

export default App;
