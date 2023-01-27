import { useState } from 'react';
import Layout from '../components/Layout';
import { onLogin, jankeyUserSave } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());
      const userInfo = await jankeyUserSave(values.email);
      console.log('user', userInfo);
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('user', userInfo.data.user[0].uuid);
      window.location.reload();
    } catch (error) {
      console.log(error);
      console.log('HERE:HERE:HERE', process.env.BASEURL);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <div className='bg-[#f8f8f8] flex flex-col container m-auto'>
      <Layout>
        <form
          className='flex flex-col bg-[#f8f8f8] px-20 py-12 h-auto mx-40 mt-10 rounded-3xl self-center'
          onSubmit={(e) => onSubmit(e)}
        >
          <h1 className='text-center p-1 text-5xl text-slate-700 mb-10'>
            Login
          </h1>

          <div className='flex flex-col'>
            <label className='ml-24 mb-5 text-slate-700' htmlFor='email'>
              Email Address
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='email'
              id='email'
              name='email'
              value={values.email}
              // placeholder='test@gmail.com'
              autoComplete='off'
              required
              className='mx-20 mb-10 rounded-md p-5 outline-8  border-2 border-black'
            />
          </div>

          <div className='flex flex-col '>
            <label className='ml-24 mb-5 text-slate-700' htmlFor='password'>
              Password
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              id='password'
              name='password'
              // placeholder='Password'
              required
              className='mx-20 mb-14 rounded-md p-5 outline-8  border-2 border-black'
            />
          </div>
          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

          <button
            className='bg-[#2d2a2e] mx-20 px-5 py-3 rounded-md text-white text-5xl'
            type='submit'
          >
            Submit
          </button>

          <NavLink className='self-center pt-10' to='/demo-dashboard'>
            <span className='text-[#4c8bf5] font-semibold '>Check it out</span>
          </NavLink>
          <NavLink className='self-center pt-10' to='/register'>
            <span className='text-[#4c8bf5] font-semibold '>
              Create account
            </span>
          </NavLink>
        </form>
      </Layout>
    </div>
  );
};

export default Login;

// px-5 py-3 rounded-md bg-purple-300 mt-10
