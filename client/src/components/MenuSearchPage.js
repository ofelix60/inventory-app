import { GiOpenChest } from 'react-icons/gi';
import { CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { onLogout } from '../api/auth';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';

const MenuSearchPage = () => {
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
    <div className='fixed top-0 left-0 w-screen flex justify-end bg-[#2d2a2e] border-b-2 border-[#2d2a2e] h-20'>
      <button
        icon={<CgLogOut />}
        onClick={() => logout()}
        className='mb-2 mr-auto ml-10'
      >
        <Icon text='Logout' icon={<CgLogOut size='20' />} />
      </button>
      <Link to='/inventory' className='mr-10'>
        <Icon className='' text='Inventory' icon={<GiOpenChest size='20' />} />
      </Link>
    </div>
  );
};

const Icon = ({ icon, text = '💡 tooltip' }) => (
  <div className='sidebar-icon group flex content-center'>
    {icon}

    <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
  </div>
);

export default MenuSearchPage;
