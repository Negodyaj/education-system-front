import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { convertEnumToDictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { UserInput } from '../../interfaces/UserInput';
import { useForm } from 'react-hook-form';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItemConverter';

interface UserEditFormProps {
    roleId: number;
    userToEdit: User | undefined;
    setIsEditModeOn: (mode: boolean) => void;
    sendUserPropsForSuccessNotification: (newUser: User) => void;
    sendNotification: (newNotification: NotificationData) => void;
    url: string;
    token: string;
    headers: HeadersInit|undefined;
    method: string;
}

function UserEditForm(props: UserEditFormProps) {

    const initUser = Object.assign({}, props.userToEdit) || {
        firstName: "",
        lastName: "",
        birthDate: undefined,
        login: "",
        password: "",
        userPic: "",
        phone: "",
        email: "",
        roles: []
    }
    const [newUser, setNewUser] = useState<User>(initUser);
    const [wasValidated, setWasValidated] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const isDisabled = (Object.values(newUser).reduce((isEmpty, prop) => {
        if (prop) {
            return false;
        }
        return isEmpty
    }, true))

    type FormInputs = UserInput;

    console.log(props.userToEdit)

    const { register, handleSubmit, getValues } = useForm<FormInputs>({
        defaultValues: (() => { if (isFetching === false) { return Object.assign({}, newUser) } })()
    });

    const elementsDefinedByProps = {
        roleSelector: () => {
            if (props.roleId === Role.Admin) {
                return (
                    <div className="user-list-item">
                        <label className="column">Список ролей</label>
                        <CustomMultiSelect
                            selectType={"multi"}
                            userOptionsIds={newUser.roles || undefined}
                            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                            onSelect={roleOnChange}></CustomMultiSelect>
                    </div>)
            } else {
                newUser.roles = [Role.Student]
            }
        },
        passwordInput: () => {
            if (props.userToEdit === undefined) {
                return (
                    <div className="user-list-item">
                        <label className="column">Пароль</label>
                        <input
                            {...register('password')}
                            type="text"
                            className="column"
                            value={newUser.password}
                            onChange={anyTextInputChangeHandler}
                            required />
                    </div>
                )
            } else {
                return;
            }
        },
        loginInput: () => {
            if (props.userToEdit === undefined) {
                return (
                    <div className="user-list-item">
                        <label className="column">Логин</label>
                        <input
                            {...register('login')}
                            type="text"
                            className="column"
                            value={newUser.login}
                            onChange={anyTextInputChangeHandler} />
                    </div>
                )
            } else {
                return;
            }
        }
    }

    const sendUser = () => {
        fetch(props.url + '/' + (props.userToEdit ? props.userToEdit.id : 'register'), {
            method: props.method,
            headers: props.headers,
            body: JSON.stringify(newUser)// {} instead newUser - to provoke error
        }
        )
            .then(response => {
                if (response.status > 200) {
                    return Promise.reject(response.json())
                }
                return response.json();
            })
            .then(addedOrUpdatedUser => {
                props.setIsEditModeOn(false);
                props.sendUserPropsForSuccessNotification(addedOrUpdatedUser);
            })
            .catch(error => { return error })
            .then(data => {
                data && props.sendNotification({
                    type: "error",
                    text: data.Message,
                    isDismissible: true,
                    timestamp: Date.now()
                })
            })
    }

    const birthDateOnChange = (date: Date) => {
        newUser.birthDate = date.toLocaleDateString();
        setNewUser(Object.assign({}, newUser))
    }
    const roleOnChange = (options: number[]) => {
        newUser.roles = options;
        setNewUser(Object.assign({}, newUser))
    }
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        sendUser();
    }
    const setIsEditModeOn = () => {
        props.setIsEditModeOn(false);
    }
    const onSaveClick = () => {
        setWasValidated('was-validated');
    }

    const anyTextInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        let propKey: string = e.target.name;
        let operand = newUser[propKey as keyof User];
        (newUser[propKey as keyof User] as typeof operand) = e.target.value as typeof operand;
        setNewUser(Object.assign({}, newUser));
    }

    if (isFetching) {
        return (<div>loading</div>)
    } else {
        return (
            <div className={"user-edit-form needs-validation " + wasValidated}>
                <form onSubmit={onSubmit}>
                    <div className="user-list-item">
                        <label className="column">Имя</label>
                        <input
                            {...register('firstName')}
                            value={newUser.firstName}
                            type="text"
                            className="column"
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите имя</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Фамилия</label>
                        <input
                            {...register('lastName')}
                            type="text"
                            className="column"
                            value={newUser.lastName}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Ввведите фамилию</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Дата рождения</label>
                        <DatePickerComponent date={newUser.birthDate} onDateChange={birthDateOnChange} />
                    </div>
                    {
                        elementsDefinedByProps.loginInput()
                    }
                    {
                        elementsDefinedByProps.passwordInput()
                    }
                    <div className="user-list-item">
                        <label className="column">Телефон</label>
                        <input
                            {...register('phone')}
                            type="text"
                            className="column"
                            value={newUser.phone}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите номер телефона</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Аватар</label>
                        <input type="file" className="column" />
                        <input
                            {...register('userPic')}
                            type="text"
                            className="column"
                            placeholder="или вставьте ссылку"
                            value={newUser.userPic}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <img src={newUser.userPic} alt="аватар" />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Почта</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="column"
                            value={newUser.email}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите e-mail</div>
                    </div>
                    {
                        elementsDefinedByProps.roleSelector()
                    }
                    <div className="user-list-item">
                        <div className="column">
                            <button className="column" onClick={setIsEditModeOn}>отмена</button>
                        </div>
                        <div className="column save-button">
                            <button
                                className="column save-button"
                                type={"submit"}
                                disabled={isDisabled}
                                onClick={onSaveClick}>сохранить</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserEditForm;
