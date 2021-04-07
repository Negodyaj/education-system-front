import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import React, { useState } from 'react';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { convertEnumToDictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { UserInput } from '../../interfaces/UserInput';
import { useForm } from 'react-hook-form';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItemConverter';
import { ErrorMessage } from '@hookform/error-message';
import { getName } from '../../../shared/converters/objectKeyToString';
import { PreviousMethod } from '../UserPage';
import { sendPutRequest } from '../../../services/http.service';
import { UserUpdate } from '../../interfaces/UserUpdate';

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

    const initUser = Object.assign({}, props.userToEdit || {
        firstName: "",
        lastName: "",
        birthDate: undefined,
        userPic: "",
        phone: "",
        email: ""
    })

    const [newUser, setNewUser] = useState<User>(initUser);
    const [wasValidated, setWasValidated] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const isDisabled = (Object.values(newUser).reduce((isEmpty, prop) => {
        if (prop) {
            return false;
        }
        return isEmpty
    }, true))

    type FormInputs = UserUpdate|UserInput;

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<FormInputs>({
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
                            userOptionsIds={getValues('roleIds') || undefined}
                            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                            onSelect={roleOnChange}></CustomMultiSelect>
                    </div>)
            } else {
                //setValue('roleIds', [Role.Student]);
            }
        },
        passwordInput: () => {
            if (props.userToEdit === undefined) {
                return (
                    <div className="user-list-item">
                        <label className="column">Пароль</label>
                        <input
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: "Введите пароль"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.password)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
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
                            {...register('login', {
                                required: {
                                    value: true,
                                    message: "Введите логин"
                                },
                                pattern: {
                                    value: /[a-z0-9]/,
                                    message: "Допустимы только строчные буквы и цифры"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.login)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                )
            } else {
                return;
            }
        }
    }

    const sendUser = async (newUser: FormInputs) => {
        props.reviseSending(await sendPutRequest(props.url + (props.userToEdit ? '/' + props.userToEdit.id : ''), 
        {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            email: newUser.email,
            userPic: newUser.userPic,
            birthDate: newUser.birthDate
        }))
    }

    const birthDateOnChange = (date: string) => {
        setValue('birthDate', date)
    }
    const roleOnChange = (options: number[]) => {
        //setValue('roleIds', options);
    }
    const onSubmit = (data: FormInputs) => {
        console.log(initUser as UserUpdate)
        sendUser(data);
    }
    const setIsEditModeOn = () => {
        props.setIsEditModeOn(false);
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

                                    value: /[A-Za-zА-Яа-я]/,
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
                                    value: /[A-Za-zА-Яа-я]/,
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
                        <DatePickerComponent
                            {...register('birthDate')}
                            date={getValues('birthDate')}
                            onDateChange={birthDateOnChange} />
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
                            {...register('phone', {
                                required: {
                                    value: true,
                                    message: "Введите номер телефона"
                                },
                                pattern: {
                                    value: /[0-9]/,
                                    message: "Допустимы только цифры"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.phone)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Аватар</label>
                        <input type="file" className="column" />
                        <input
                            {...register('userPic', {
                                required: {
                                    value: true,
                                    message: "Добавьте ссылку на изображение  или загрузите файл"
                                },
                                pattern: {
                                    value: /\S/,
                                    message: "Недопустимый формат ссылки"
                                }
                            })}
                            type="text"
                            className="column"
                            placeholder="или вставьте ссылку" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.userPic)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                        <img src={getValues('userPic')} alt="аватар" />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Почта</label>
                        <input
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: "Введите email"
                                }
                            })}
                            type="text"
                            className="column" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.email)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
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
                                disabled={isDisabled}>сохранить</button>
                        </div>
                    </div>
                </form>
            </div >
        )
    }
}

export default UserEditForm;
