import { useState } from 'react';
import Layout from '../components/Layout';
import { onRegistration } from '../api/auth';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError('');
      setSuccess(data.message);
      console.log(success);
      setValues({ username: '', email: '', password: '' });
    } catch (error) {
      // console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      console.log(error);
      setSuccess('');
    }
  };
  return (
    <div className='bg-white flex flex-col container m-auto'>
      <Layout>
        <form
          className='flex flex-col bg-[#2d2a2e] px-20 py-16 h-3/4 mx-40 mt-0 rounded-3xl self-center'
          onSubmit={(e) => onSubmit(e)}
        >
          <h1 className='text-center p-1 text-5xl text-white mb-10'>
            Register
          </h1>

          <div className='flex flex-col'>
            <label className='ml-24 mb-5 text-white' htmlFor='user'>
              Username:
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='username'
              id='username'
              name='username'
              value={values.username}
              // placeholder='Username'
              autoComplete='off'
              required
              className='mx-20 mb-10 rounded-md p-5'
            />
          </div>

          <div className='flex flex-col '>
            <label className='ml-24 mb-5 text-white' htmlFor='email'>
              Email Address:
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='email'
              id='email'
              name='email'
              value={values.email}
              // placeholder='Email'
              autoComplete='off'
              required
              className='mx-20 mb-14 rounded-md p-5'
            />
          </div>

          <div className='flex flex-col '>
            <label className='ml-24 mb-5 text-white' htmlFor='password'>
              Password:
            </label>
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              id='password'
              name='password'
              placeholder='Password'
              required
              className='mx-20 mb-14 rounded-md p-5'
            />
          </div>
          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
          <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

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

export default Register;
