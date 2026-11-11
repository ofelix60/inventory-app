import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onLogout } from '../api/auth';
import Layout from '../components/Layout';
import { unauthenticateUser } from '../redux/slices/authSlice';
import SearchPage from './SearchPage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      await fetchProtectedInfo();
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div className=''>
      <Layout>
        <button onClick={() => logout()} className='btn btn-primary mr-10'>
          Logout
        </button>
        <h1>Dashboard</h1>
        <SearchPage />
      </Layout>
    </div>
  );
};

export default Dashboard;
