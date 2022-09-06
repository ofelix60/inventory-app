import { useState } from 'react';
import Layout from '../components/Layout';
import { onLogin, jankeyUserSave } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';

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
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('user', userInfo.data.user[0].uuid);
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };
  return (
    <div className='bg-white flex flex-col container m-auto'>
      <Layout>
        <form
          className='flex flex-col bg-[#2d2a2e] px-20 py-24 h-auto mx-40 mt-10 rounded-3xl self-center'
          onSubmit={(e) => onSubmit(e)}
        >
          <h1 className='text-center p-1 text-5xl text-white mb-10'>Login</h1>

          <div className='flex flex-col'>
            <label className='ml-24 mb-5 text-white' htmlFor='email'>
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
              className='mx-20 mb-10 rounded-md p-5'
            />
          </div>

          <div className='flex flex-col '>
            <label className='ml-24 mb-5 text-white' htmlFor='password'>
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
              className='mx-20 mb-14 rounded-md p-5'
            />
          </div>
          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

          <button
            className='bg-[#dd6184] mx-20 px-5 py-3 rounded-md text-white text-5xl'
            type='submit'
          >
            Submit
          </button>
        </form>
      </Layout>
    </div>
  );
};

export default Login;
