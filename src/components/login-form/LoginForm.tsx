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
            <h2>Залогиньтеся</h2>
            <div className="form-control">
                <label className="form-label">Логин</label>
                <input className='form-input' type="text" value={login} onChange={handleloginChange} />
            </div>
            <div className="form-control">
                <label className="form-label">Пароль</label>
                <input className='form-input' type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button className="common-button" onClick={loginButtonOnClick}>Войти</button>
        </div>
    )
}

export default LoginForm;