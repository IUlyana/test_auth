import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, selectRegisterFormError, resetRegisterFormError } from './authSlice';
import './Auth.css';
import NavBar from '../main/NavBar';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();

      const form = event.target;
      const dispatchResult = await dispatch(
        register({
          name: form.name.value,
          password: form.password.value,
          passwordRepeat: form.passwordRepeat.value,
        })
      );

      if (!dispatchResult.error) {
        form.reset();
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetRegisterFormError());
  }, [dispatch]);

  return (
    <>      
    <NavBar />
    <h2>Регистрация</h2>
    <form className="authform" onSubmit={handleSubmit}>
      {error && (
        <div className="regfield" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <div className="regfield">
        <label htmlFor="name-input">
          Имя
        </label>
        <input
          type="text"
          id="name-input"
          name="name"
          onChange={resetErrorOnChange}
        />
      </div>
      <div className="regfield">
        <label htmlFor="password-input">
          Пароль
        </label>
        <input
          type="password"
          id="password-input"
          name="password"
          onChange={resetErrorOnChange}
        />
      </div>
      <div className="regfield">
        <label htmlFor="password-repeat-input">
          Повторите пароль
        </label>
        <input
          type="password"
          id="password-repeat-input"
          name="passwordRepeat"
          onChange={resetErrorOnChange}
        />
      </div>
      <button type="submit">
        Зарегистрироваться
      </button>
    </form>
    </>
  );
}

export default Register;
