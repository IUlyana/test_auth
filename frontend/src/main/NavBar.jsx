import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../components/authSlice';
import './Main.css';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = React.useCallback(
    async (event) => {
      event.preventDefault();

      const dispatchResult = await dispatch(logout());
      if (!dispatchResult.error) navigate('/');
    },
    [dispatch, navigate]
  );

  return (
    <div className="nav">
      {user && (
        <div className="navbar">
          Привет, {user.name}.{' '}
          <a className="navlink" href="#" role="button" tabIndex={0} onClick={handleLogout}>
            Выйти
          </a>
        </div>
      )}
        {!user && 
          <div className="navbar">
            <Link className="navlink" to="/auth/login">
              Войти
            </Link>
            <Link className="navlink" to="/auth/register">
              Регистрация
            </Link>
          </div>}
    </div>
  );
}

export default NavBar;
