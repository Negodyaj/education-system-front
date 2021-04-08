import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { convertEnumToDictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { UserInput } from '../../interfaces/UserInput';
import { useForm } from 'react-hook-form';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItemConverter';
import '../../../App.css'

interface UserEditFormProps {
    roleId: number;
    userToEdit: User | undefined;
    setIsEditModeOn: (mode: boolean) => void;
    reviseSending: (newUser: User) => void;
    sendNotification: (data: { type: "error" | "success", message: string }) => void;
    url: string;
    token: string;
    headers: HeadersInit | undefined;
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
        roleIds: []
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

    const { register, handleSubmit, getValues } = useForm<FormInputs>({
        defaultValues: (() => { if (isFetching === false) { return Object.assign({}, newUser) } })()
    });

    const elementsDefinedByProps = {
        roleSelector: () => {
            if (props.roleId === Role.Admin) {
                return (
                    <div className="form-row multi">
                        <label className="form-label">Список ролей</label>
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
                    <div className="form-row">
                        <label className="form-label">Пароль</label>
                        <input
                            {...register('password')}
                            type="text"
                            className="form-input"
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
                    <div className="form-row">
                        <label className="form-label">Логин</label>
                        <input
                            {...register('login')}
                            type="text"
                            className="form-input"
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
            body: JSON.stringify(newUser)
        }
        )
            .then(response => {
                console.log(newUser)
                if (response.status > 200) {
                    throw response.json().then(value => {
                        props.sendNotification({ type: 'error', message: `${value.Code} ${value.Message}` })
                    });
                }
                return response.json();
            })
            .then(addedOrUpdatedUser => {
                props.setIsEditModeOn(false);
                props.reviseSending(addedOrUpdatedUser);
            })
    }

    const birthDateOnChange = (date: Date) => {
        newUser.birthDate = date.toLocaleDateString();
        setNewUser(Object.assign({}, newUser))
    }
    const roleOnChange = (options: number[]) => {
        newUser.roleIds = options;
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
        //setWasValidated('was-validated');
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
            <div className={"user-edit-form needs-validation " + "was-validated"}>
                <form  onSubmit={onSubmit}>
                    <div className="form-row">
                        <label className="form-label">Имя</label>
                        <input
                            {...register('firstName')}
                            value={newUser.firstName}
                            type="text"
                            className="form-input"
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите имя</div>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Фамилия</label>
                        <input
                            {...register('lastName')}
                            type="text"
                            className="form-input"
                            value={newUser.lastName}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Ввведите фамилию</div>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Дата рождения</label>
                        <DatePickerComponent date={newUser.birthDate} onDateChange={birthDateOnChange} />
                    </div>
                    {
                        elementsDefinedByProps.loginInput()
                    }
                    {
                        elementsDefinedByProps.passwordInput()
                    }
                    <div className="form-row">
                        <label className="form-label">Телефон</label>
                        <input
                            {...register('phone')}
                            type="text"
                            className="form-input"
                            value={newUser.phone}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите номер телефона</div>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Аватар</label>
                        <input type="file" className="form-input" />
                        <input
                            {...register('userPic')}
                            type="text"
                            className="form-input"
                            placeholder="или вставьте ссылку"
                            value={newUser.userPic}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <img src={newUser.userPic} alt="аватар" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Почта</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="form-input"
                            value={newUser.email}
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите e-mail</div>
                    </div>
                    <div className="form-row">
                    {
                        elementsDefinedByProps.roleSelector()
                    }
                    </div>
                    <div className="form-row form-row-button">
                        <div className="">
                            <button className="" onClick={setIsEditModeOn}>отмена</button>
                        </div>
                        <div className="save-button">
                            <button
                                className="save-button"
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
