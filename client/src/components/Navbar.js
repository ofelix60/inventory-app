import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <nav>
      <div>
        {isAuth ? (
          <></>
        ) : (
          <div className='mt-10'>
            {window.location.pathname === '/login' ? (
              <NavLink
                className='px-5 py-3 rounded-md bg-purple-300 mt-10'
                to='/register'
              >
                <span>Register</span>
              </NavLink>
            ) : (
              <NavLink
                className='px-5 py-3 rounded-md bg-purple-300 mt-10'
                to='/login'
              >
                <span>Login</span>
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

{
  /* <div>
  {isAuth ? (
    <div>
      <NavLink to='/dashboard'>
        <span>Dashboard</span>
      </NavLink>
    </div>
  ) : (
    <div>
      {window.location.pathname === '/login' ? (
        <NavLink to='/register'>
          <span>Register</span>
        </NavLink>
      ) : (
        <NavLink to='/login'>
          <span>Login</span>
        </NavLink>
      )}
    </div>
  )}
</div>; */
}
