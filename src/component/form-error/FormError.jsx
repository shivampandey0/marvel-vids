import './FormError.css';

export const FormError = ({ message }) => {
  return (
    <div className='form-error alert-danger my-2'>
      <span className='alert-icon'>
        <i className='fas fa-exclamation-circle icon'></i> {message}
      </span>
    </div>
  );
};
