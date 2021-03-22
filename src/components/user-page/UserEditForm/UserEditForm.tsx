
import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import { ChangeEventHandler, EventHandler, useState } from 'react';
import { idText, isDoStatement } from 'typescript';
import { Role } from '../../interfaces/Role';
import { exists } from 'node:fs';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';

interface UserEditFormProps {
    user: User | null;
    ids: (number | undefined)[];
    onCancelClick: (mode: boolean) => void;
    onSaveClick: (newUser: User) => void;
}

function UserEditForm(props: UserEditFormProps) {
    const [id, setId] = useState<number|undefined>(props.user?.id);
    const [name, setName] = useState<string | undefined>(props.user?.name);
    const [secondName, setSecondName] = useState<string | undefined>(props.user?.secondName);
    const [birthDate, setBirthDate] = useState<Date | null>(props.user?.birthDate ?? null);
    const [login, setLogin] = useState<string | undefined>(props.user?.login);
    // const [role, setRole] = useState<Role[]|undefined>(props.user?.role);
    const [password, setPassword] = useState<string | undefined>(props.user?.password);
    const [phone, setPhone] = useState<string | undefined>(props.user?.phone);
    const [email, setEmail] = useState<string | undefined>(props.user?.email);
    const [groupName, setGroupName] = useState<string | undefined>(props.user?.groupName);

    const newUser: User = {
        id: id,
        name: name,
        secondName: secondName,
        birthDate: birthDate,
        login: login,
        // role: role,
        password: password,
        phone: phone,
        email: email,
        groupName: groupName
    }

    const nameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    }

    const secondNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSecondName(e.target.value);
    }

    const birthDateOnChange = (date:Date) => {
        setBirthDate(date);
    }

    const loginOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setLogin(e.target.value);
    }

    // const roleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     setRole(e.target.value);
    // }

    const passwordOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    }

    const phoneOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPhone(e.target.value);
    }

    const emailOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    }

    const groupNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setGroupName(e.target.value);
    }

    const onSaveClick = () => {

        newUser.id === null && (() => {
            return Math.round(Math.random() * 100)
        })();

        props.onSaveClick(newUser)
        props.onCancelClick(false);
    }

    const onCancelClick = () => {
        props.onCancelClick(false);
    }

    return (
        <div className="user-edit-form">
            <div className="user-list-item">
                <label className="column">Имя</label>
                <input type="text" className="column" value={name} onChange={nameOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Фамилия</label>
                <input type="text" className="column" value={secondName} onChange={secondNameOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Дата рождения</label>
                <DatePickerComponent date={props.user?.birthDate ?? null} onDateChange={birthDateOnChange} />
                </div>
            <div className="user-list-item">
                <label className="column">Логин</label>
                <input type="text" className="column" value={login} onChange={loginOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Пароль</label>
                <input type="text" className="column" value={password} onChange={passwordOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Телефон</label>
                <input type="text" className="column" value={phone} onChange={phoneOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Аватар</label>
                <input type="file" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Почта</label>
                <input type="text" className="column" value={email} onChange={emailOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Список ролей</label>
                <CustomMultiSelect selectType={"multi"} options={props.user?.role as Object[]} ></CustomMultiSelect>
            </div>
            <div className="user-list-item">
                <div className="column">
                    <button className="column" onClick={onCancelClick}>отмена</button>
                </div>
                <div className="column">
                    <button className="column" onClick={onSaveClick}>сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default UserEditForm;