import { useState } from 'react';
import './Input.css';
export const Input = ({
  label,
  id,
  type,
  placeholder,
  autoComplete,
  required,
  value,
  changeHandler,
}) => {
  const [obscure, setObscure] = useState(true);

  return (
    <div className='input-group'>
      <label className={required && 'required'} htmlFor={label}>
        {label}
      </label>
      <div className={`${type === 'password' && 'pass-toggle'}`}>
        <input
          className='input'
          type={obscure ? type : 'text'}
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          onChange={changeHandler}
        />
        {type === 'password' && (
          <i
            onClick={() => setObscure((prev) => !prev)}
            className={`fas icon ${
              obscure ? 'hide-pass fa-eye-slash' : 'show-pass fa-eye'
            }`}
          ></i>
        )}
      </div>
    </div>
  );
};
