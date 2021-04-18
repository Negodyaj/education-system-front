import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../services/auth.service';
import { openRoleSelector } from '../../store/role-selector/action-creator';
import './LoginForm.css';

function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const loginButtonOnClick = () => {
        authenticate(login, password, dispatch)
    }

    const handleloginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-form">
            <label className="form-field">
                <span>Login:</span>
                <input type="text" value={login} onChange={handleloginChange} />
            </label>
            <label className="form-field">
                <span>Password</span>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button className="login-btn" onClick={loginButtonOnClick}>Log in</button>
        </div>
    )
}

export default LoginForm;