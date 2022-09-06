import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onLogout } from '../api/auth';
import Layout from '../components/Layout';
import { unauthenticateUser } from '../redux/slices/authSlice';
import SearchPage from './SearchPage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

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
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
        <h1>Dashboard</h1>
        {/* <h2>{protectedData}</h2> */}

        <SearchPage />
      </Layout>
    </div>
  );
};

export default Dashboard;

// old Dashboard
