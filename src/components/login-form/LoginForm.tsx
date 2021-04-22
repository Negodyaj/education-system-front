import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/login-form/thunk';
import './LoginForm.css';
import '../../App.css'

function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const loginButtonOnClick = () => {
        dispatch(authenticate(login, password))
    }

    const handleloginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-form">
            <span>Sing In</span>
            <label className="form-label">
                Login
            </label>
            <input className='form-input' type="text" value={login} onChange={handleloginChange} />
            <label className="form-label">
                Password              
            </label>
            <input className='form-input' type="password" value={password} onChange={handlePasswordChange} />
            <button className="button-style" onClick={loginButtonOnClick}>Log in</button>
        </div>
    )
}

export default LoginForm;