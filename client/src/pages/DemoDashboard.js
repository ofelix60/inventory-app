import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDemoInfo, fetchProtectedInfo, onLogout } from '../api/auth';
import Layout from '../components/Layout';
import { unauthenticateUser } from '../redux/slices/authSlice';
import DemoSearchPage from './DemoSearchPage';
import { NavLink } from 'react-router-dom';

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
      const { data } = await fetchDemoInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };
  console.log(protectedData);
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
        <div className='flex place-content-end'>
          <NavLink className='self-center pt-10' to='/register'>
            <span className=' text-[#4c8bf5] font-semibold ml- '>
              Create account
            </span>
          </NavLink>
          <NavLink className='self-center pt-10' to='/login'>
            <span className='ml-5 mr-32 text-[#4c8bf5] font-semibold '>
              Login
            </span>
          </NavLink>
        </div>
        <DemoSearchPage />
      </Layout>
    </div>
  );
};

export default Dashboard;

// old Dashboard
