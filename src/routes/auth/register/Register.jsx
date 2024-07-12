import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../api';
import AppContext from '../../../context/store';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Register.scss';
import Button from '../../../utils';
import { toast } from 'react-toastify';

const Register = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [passwordErrors, setPasswordErrors] = useState({
    uppercase: true,
    lowercase: true,
    length: true,
  });

  const [usernameErrors, setUsernameErrors] = useState({
    capitalLetter: true,
    length: true,
  });

  useEffect(() => {
    setPasswordErrors({
      uppercase: !/[A-Z]/.test(password),
      lowercase: !/[a-z]/.test(password),
      length: password.length >= 8 ? false : true,
    });
  }, [password]);

  useEffect(() => {
    setUsernameErrors({
      capitalLetter: !/^[A-Z]/.test(username),
      length: username.trim().length >= 4 ? false : true,
    });
  }, [username]);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      if (
        Object.values(passwordErrors).every((check) => check === false) &&
        Object.values(usernameErrors).every((check) => check === false)
      ) {
        dispatch({ type: 'LOADING', loading: true });
        const response = await axios.post('/users/register', {
          name: username,
          email,
          password,
          phone,
          isAdmin: true,
          street,
          apartment: 20,
          zip: 100000,
          city,
          country,
        });

        console.log(response.data, response);

        dispatch({ type: 'REGISTER_USER', user: response.data });

        toast.success('User created successfully');
      } else {
        throw new Error('Validation errors. Please check your input.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };

  return (
    <div className='register'>
      <h1 className='register__title'>{t('register')}</h1>
      <form className='form-register' onSubmit={handleRegisterUser}>

        <p className='form-register__text'>{t('username')}</p>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <ul className='auth-form__errors'>
          {usernameErrors.capitalLetter && <li>{t('errorUsername')}</li>}
          {usernameErrors.length && <li>{t('errorUsername2')}</li>}
        </ul>

        <p className='form-register__text'>{t('password')}</p>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ul className='auth-form__errors'>
          {passwordErrors.uppercase && <li>{t('errorPassword')}</li>}
          {passwordErrors.lowercase && <li>{t('errorPassword2')}</li>}
          {passwordErrors.length && <li>{t('errorPassword3')}</li>}
        </ul>

        <p className='form-register__text'>{t('email')}</p>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p className='form-register__text'>{t('phone')}</p>
        <input
          type='text'
          placeholder='Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <p className='form-register__text'>{t('street')}</p>
        <input
          type='text'
          placeholder='Street'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />

        <p className='form-register__text'>{t('city')}</p>
        <input
          type='text'
          placeholder='City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <p className='form-register__text'>{t('country')}</p>
        <input
          type='text'
          placeholder='Country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <Button btnType='submit' loading={state.loading}>
          {t('register')}
        </Button>
        <div className='form-login__register'>
          <p className='form-login__text'>{t('already have an account')}</p>
          <NavLink to='/auth' className='form-login__text'>
            {t('login here')}
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
