import { FaSearch } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { onLogout } from '../api/auth';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';

const MenuInventory = () => {
  const dispatch = useDispatch();
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
  return (
    <div className='fixed top-0 left-0 w-screen flex justify-end bg-[#2d2a2e] border-b-2 border-[#2d2a2e] h-20 '>
      {/* <Icon
        onClick={() => logout()}
        text='Logout'
        icon={<CgLogOut size='20' />}
      /> */}
      {/* <div className='content-center sidebar-icon mr-14'>
        
      </div> */}
      <button
        icon={<CgLogOut />}
        onClick={() => logout()}
        className='mb-2 mr-auto ml-9'
      >
        <Icon
          // onClick={() => logout()}
          text='Logout'
          icon={<CgLogOut size='20' />}
        />
      </button>
      <Link to='/dashboard' className='mr-9'>
        <Icon className='mr-96' text='Search' icon={<FaSearch size='20' />} />
      </Link>
    </div>
  );
};

const Icon = ({ icon, text = '💡 tooltip' }) => {
  // const dispatch = useDispatch();

  return (
    <div className='flex flex-row'>
      <div className='sidebar-icon group flex content-center '>
        <div>
          {icon}
          <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuInventory;
