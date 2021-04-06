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
import { ErrorMessage } from '@hookform/error-message';
import { getName } from '../../../shared/converters/objectKeyToString';

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

    const { register, formState: { errors, isValid }, handleSubmit, getValues, setValue } = useForm<FormInputs>({
        mode: 'all',
        criteriaMode: 'all',
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
                            className="column" />
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
                            className="column" />
                    </div>
                )
            } else {
                return;
            }
        }
    }

    const sendUser = (newUser: FormInputs) => {
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

    const birthDateOnChange = (date: string) => {
        setValue('birthDate', date)
    }
    const roleOnChange = (options: number[]) => {
        newUser.roleIds = options;
        setNewUser(Object.assign({}, newUser))
    }
    const onSubmit = (data: FormInputs) => {
        console.log(data.birthDate)
        sendUser(data);
    }
    const setIsEditModeOn = () => {
        props.setIsEditModeOn(false);
    }
    const onSaveClick = () => {
        //setWasValidated('was-validated');
    }


    if (isFetching) {
        return (<div>loading</div>)
    } else {
        return (
            <div className={"user-edit-form needs-validation was-validated"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="user-list-item">
                        <label className="column">Имя</label>
                        <input
                            {...register('firstName', {
                                required: {
                                    value: true,
                                    message: "Введите имя"
                                },
                                pattern: {
                                    value: /[A-Za-zА-Яа-я]{3}/,
                                    message: "Допустимы только буквенные символы"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.firstName)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Фамилия</label>
                        <input
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: "Введите фамилию"
                                },
                                pattern: {
                                    value: /[A-Za-zА-Яа-я]{3}/,
                                    message: "Допустимы только буквенные символы"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.lastName)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Дата рождения</label>
                        <DatePickerComponent {...register('birthDate')} date={getValues('birthDate')} onDateChange={birthDateOnChange} />
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
                            className="column" />
                        <div className="bad-feedback">Введите номер телефона</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Аватар</label>
                        <input type="file" className="column" />
                        <input
                            {...register('userPic')}
                            type="text"
                            className="column"
                            placeholder="или вставьте ссылку" />
                        <img src={newUser.userPic} alt="аватар" />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Почта</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="column" />
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
            </div >
        )
    }
}

export default UserEditForm;
