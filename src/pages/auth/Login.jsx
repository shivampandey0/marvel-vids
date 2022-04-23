import { Input, FormError } from '../../component';
import './Auth.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context';
import { requests } from '../../utils';

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const { handleSubmit, error, loading } = useAuth();

  const location = useLocation();
  const path = location.state?.from?.pathname || '/';

  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(loginInfo, path, requests.login);
  };

  const testLoginHandler = () => {
    setLoginInfo({
      email: 'shivam@marvelvids.com',
      password: 'ItBg7Uo7bP4MkS4l',
    });
  };

  return (
    <div className='form-container flex-column flex-center'>
      <form className='px-2 py-2' onSubmit={submitHandler}>
        <Input
          label={'Email'}
          required={true}
          value={loginInfo.email ?? ''}
          type={'email'}
          changeHandler={(e) =>
            setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder={'Email'}
        />

        <Input
          label={'Password'}
          required={true}
          type={'password'}
          changeHandler={(e) =>
            setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          value={loginInfo.password ?? ''}
          placeholder={'********'}
        />
        {error && <FormError message={'Invalid Email or Password'} />}

        <button className='btn btn-primary btn-full my-4' type='submit'>
          {loading && <i className='fas fa-circle-notch fa-spin'></i>}{' '}
          <h4 className='fw-bold'>Sign in</h4>
        </button>
        <button
          className='btn btn-outline btn-full my-4'
          type='button'
          onClick={testLoginHandler}
        >
          <h4 className='fw-bold'>Fill with test-credentials</h4>
        </button>
        <p className='fw-bold py-4'>
          Need an account?
          <Link to={'/signup'} className='primary-link'>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};
