import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginFormError, resetLoginFormError } from './authSlice';
import NavBar from '../main/NavBar';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectLoginFormError);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.target;
      const dispatchResult = await dispatch(
        login({
          name: form.name.value,
          password: form.password.value,
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
    dispatch(resetLoginFormError());
  }, [dispatch]);

  return (
    <>
    <NavBar />
    <h2>Вход</h2>
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
      <button type="submit">
        Войти
      </button>
    </form>
    </>
  );
}

export default Login;
