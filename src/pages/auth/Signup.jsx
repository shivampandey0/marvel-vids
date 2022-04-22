import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormError, Input } from '../../component';
import { useAuth } from '../../context';
import { requests } from '../../utils';

export const Signup = () => {
  const [userInput, setUserInput] = useState({});
  const [confirmPass, setConfirmPass] = useState('');
  const { handleSubmit, error, loading } = useAuth();

  const location = useLocation();
  const path = location.state?.from?.pathname || '/';

  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(userInput, path, requests.signup);
  };

  const onInput = (e) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className='full-container flex-row'>
      <div className='form-container'>
        <form className='px-2 py-2' onSubmit={submitHandler}>
          <div className='input-row'>
            <Input
              label={'First Name'}
              required={true}
              type={'text'}
              id={'firstname'}
              value={userInput.firstname ?? ''}
              autoComplete={'given-name'}
              placeholder={'First Name'}
              changeHandler={onInput}
            />

            <Input
              label={'Last Name'}
              required={true}
              type={'text'}
              autoComplete={'family-name'}
              placeholder={'Last Name'}
              id={'lastname'}
              value={userInput.lastname ?? ''}
              changeHandler={onInput}
            />
          </div>

          <div className='input-row'>
            <Input
              type={'email'}
              label={'Email'}
              required={true}
              id={'email'}
              value={userInput.email ?? ''}
              placeholder={'Email'}
              changeHandler={onInput}
            />
          </div>

          <Input
            label={'Password'}
            required={true}
            id={'password'}
            value={userInput.password ?? ''}
            type={'password'}
            placeholder={'********'}
            changeHandler={onInput}
          />

          <Input
            label={'Confirm Password'}
            required={true}
            type={'password'}
            placeholder={'********'}
            id={'confirmPassword'}
            value={confirmPass}
            changeHandler={(e) => setConfirmPass(e.target.value)}
          />

          {error && <FormError message={'Something Went Wrong'} />}

          <button
            disabled={confirmPass !== userInput.password}
            className='btn btn-primary btn-full my-4'
            type='submit'
          >
            {loading && <i className='fas fa-circle-notch fa-spin'></i>}{' '}
            <h4 className='fw-bold'>Create Account</h4>
          </button>

          <p className='fw-bold txt-center'>
            Already have an account?
            <Link to='/login' className='primary-link'>
              {' Log in'}
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
