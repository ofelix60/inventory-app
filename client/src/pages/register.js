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
    <Layout>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Register</h1>

        <div>
          <label htmlFor='user'>Username: </label>
          <input
            onChange={(e) => onChange(e)}
            type='username'
            id='username'
            name='username'
            value={values.username}
            placeholder='Username'
            required
          />
        </div>

        <div>
          <label htmlFor='email'>Email Address: </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            id='email'
            name='email'
            value={values.email}
            placeholder='Email'
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            id='password'
            name='password'
            placeholder='Password'
            required
          />
        </div>
        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit'>Submit</button>
      </form>
    </Layout>
  );
};

export default Register;
