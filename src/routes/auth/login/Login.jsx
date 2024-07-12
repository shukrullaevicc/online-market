import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../context/store';
import axios from '../../../api';
import './Login.scss';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, dispatch] = useContext(AppContext);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const validateForm = () => {
    const newErrors = {
      email: userData.email.trim() === '',
      password: userData.password.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/users/login', {
        email: userData.email,
        password: userData.password,
      });

      console.log('API response:', response);

      if (response.status === 201) {
        dispatch({ type: 'LOGIN_USER', tokens: response.data });
        toast.success('Login successful!');
      } else {
        toast.error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error response:', error.response);
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Invalid email or password.');
        } else {
          toast.error(error.response.data.message || 'Login failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Login</h1>
      <p className='login__text'>Enter your credentials to access your account.</p>

      <form className='form-login' onSubmit={handleUserLogin}>
        <div className='form-login__field'>
          <p className='form-login__text'>Email address</p>
          <input
            type='email'
            placeholder='Email'
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className='form-login__error'>Email is required</p>}
        </div>

        <div className='form-login__field'>
          <p className='form-login__text'>Password</p>
          <input
            type='password'
            placeholder='Password'
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className='form-login__error'>Password is required</p>}
        </div>

        <button className='form-login__btn' type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className='form-login__register'>
          <p className='form-login__text'>Don't have an account?</p>
          <NavLink to='/auth/register' className='form-login__text'>
            Register here
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;