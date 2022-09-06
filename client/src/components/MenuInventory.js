import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { onLogout } from '../api/auth';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';

const MenuInventory = () => {
  return (
    <div className='fixed top-0 left-0 w-screen flex justify-end bg-[#2d2a2e] border-b-2 border-[#2d2a2e] h-20'>
      <Link to='/dashboard'>
        <Icon className='' text='Search' icon={<FaSearch size='20' />} />
      </Link>
    </div>
  );
};

const Icon = ({ icon, text = '💡 tooltip' }) => {
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
    <div className='sidebar-icon group flex content-center'>
      <div>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
      </div>
      <button onClick={() => logout()} className='btn btn-primary'>
        Logout
      </button>
    </div>
  );
};

export default MenuInventory;
