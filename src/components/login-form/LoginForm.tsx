import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { authenticate } from '../../store/login-form/action-creators';
import './LoginForm.css';
import '../../App.css';

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginButtonOnClick = () => {
    dispatch(authenticate(login, password));
  };

  const handleloginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleKeyPress:
    | React.KeyboardEventHandler<HTMLInputElement>
    | undefined = (event) => {
    const { key } = event;

    if (key === 'Enter') {
      // Клавиша Enter
      loginButtonOnClick();
    }
  };

  const eyeButton = document.getElementById('eye');
  const showHidePassword = () => {
    const passwordSH = document.getElementById('password-id');

    if (passwordSH !== null && passwordSH.getAttribute('type') === 'password') {
      passwordSH.setAttribute('type', 'text');
    } else {
      passwordSH?.setAttribute('type', 'password');
    }
  };

  eyeButton?.addEventListener('onClick', showHidePassword);

  return (
    <div className="login-form">
      <h2>Залогиньтеся</h2>
      <div className="form-control">
        <label htmlFor="login-id" className="form-label">
          Логин
          <input
            id="login-id"
            className="form-input"
            type="text"
            value={login}
            onChange={handleloginChange}
            onKeyPress={(event) => {
              handleKeyPress(event);
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="password-id" className="form-label">
          Пароль
          <input
            id="password-id"
            className="form-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={(event) => {
              handleKeyPress(event);
            }}
          />
          <button
            className="round-button"
            type="button"
            onClick={showHidePassword}
            id="eye">
            <FontAwesomeIcon icon="eye" />
          </button>
        </label>
      </div>
      <button className="common-button" onClick={loginButtonOnClick}>
        Войти
      </button>
    </div>
  );
}

export default LoginForm;
