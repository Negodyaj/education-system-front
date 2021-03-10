import { ChangeEvent, useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
    onLoginClick: (email: string, password: string) => void
}

function LoginForm(props: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginButtonOnClick = () => {
        props.onLoginClick(email, password);
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-form">
            <label className="form-field">
                <span>Email:</span>
                <input type="text" value={email} onChange={handleEmailChange}/>
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