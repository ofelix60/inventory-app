import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDemoInfo } from '../api/auth';
import Layout from '../components/Layout';
import DemoSearchPage from './DemoSearchPage';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const protectedInfo = async () => {
    try {
      const { data } = await fetchDemoInfo();

      setProtectedData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.msg);
    }
  };
  useEffect(() => {
    protectedInfo();
  }, []);

  return (
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
