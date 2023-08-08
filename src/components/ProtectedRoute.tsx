import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

interface IProtected {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedRoute = ({ children }: IProtected) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;

  if (!user && !loading) {
    return <Navigate to='/?mode=sign-in' replace />;
  }

  return children;
};
export default ProtectedRoute;
