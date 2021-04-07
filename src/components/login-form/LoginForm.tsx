import { ChangeEvent, useState } from 'react';
import { authenticate } from '../../services/auth.service';
import './LoginForm.css';

interface LoginFormProps {
    onLoginClick: (login: string, password: string) => void
}

function LoginForm(props: LoginFormProps) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginButtonOnClick = () => {
        //authenticate(login, password);
        props.onLoginClick(login, password);
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
                <input type="text" value={login} onChange={handleloginChange}/>
            </label>
            <label className="form-field">
                <span>Password</span>
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </label>
            <button className="login-btn" onClick={loginButtonOnClick}>Log in</button>
        </div>
    )
}

export default LoginForm;