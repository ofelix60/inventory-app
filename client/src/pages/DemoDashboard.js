import { useEffect } from 'react';
import { fetchDemoInfo } from '../api/auth';
import Layout from '../components/Layout';
import DemoSearchPage from './DemoSearchPage';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const protectedInfo = async () => {
    try {
      await fetchDemoInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    protectedInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
