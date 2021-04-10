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
import { getName } from '../../../shared/converters/objectKeyToString';
import { sendPostRequest, sendPutRequest } from '../../../services/http.service';
import { UserUpdate } from '../../interfaces/UserUpdate';
import { ErrorMessage } from '@hookform/error-message';
import '../../../App.css'
import NotificationData from '../../../shared/interfaces/NotificationData';
import { responseHandlers } from '../../../services/response-handler/responseHandler';
import { UserEnd, UserUserIdEnd } from '../../../shared/endpointConsts';
import { convertUserToUserUpdate } from '../../../shared/converters/userToUserUpdate';

interface UserEditFormProps {
    roleId: number;
    userToEdit: User | undefined;
    setIsEditModeOn: (mode: boolean) => void;
    reviseSending: (newUser: UserUpdate | undefined) => void;
    sendNotification: (n: NotificationData | undefined) => void;
    url: string;
}

function UserEditForm(props: UserEditFormProps) {

    const initUser = Object.assign({}, props.userToEdit || {
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        birthDate: undefined,
        userPic: "",
        phone: "",
        email: "",
        roleIds: []
    })

    const [newUser, setNewUser] = useState<User>(initUser);
    const [wasValidated, setWasValidated] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    type FormInputs = UserInput;

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<FormInputs>({
        mode: 'all',
        criteriaMode: 'all',
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
                            userOptionsIds={getValues('roleIds') || undefined}
                            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                            onSelect={roleOnChange}></CustomMultiSelect>
                    </div>)
            } else {
                setValue('roleIds', [Role.Student]);
            }
        },
        passwordInput: () => {
            if (props.userToEdit === undefined) {
                return (
                    <div className="form-row">
                        <label className="form-label">Пароль</label>
                        <input
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: "Введите пароль"
                                }
                            })}
                            type="text"
                            className="form-input" />
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
                    <div className="form-row">
                        <label className="form-label">Логин</label>
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
                            className="form-input" />
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
    const reviseSending = (updatedUser: UserUpdate | undefined) => {
        if (updatedUser) {
            props.reviseSending(updatedUser)
        } else {
            return;
        }
    }
    const sendUser = async (newOrUpdatedUser: FormInputs) => {
        if (props.userToEdit) {
            reviseSending(await sendPutRequest<UserUpdate>(
                props.url + ('/' + props.userToEdit.id),
                convertUserToUserUpdate(newOrUpdatedUser)
                , props.sendNotification, responseHandlers[UserUserIdEnd]))
        } else {
            //props.reviseSending(await sendPostRequest<User>(props.url + '/' + 'register', newUser));
        }
    }

    const birthDateOnChange = (date: string) => {
        setValue('birthDate', date)
    }
    const roleOnChange = (options: number[]) => {
        setValue('roleIds', options);
    }
    const onSubmit = (data: FormInputs) => {
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
                    <div className="form-row">
                        <label className="form-label">Имя</label>
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
                            className="form-input" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.firstName)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Фамилия</label>
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
                            className="form-input" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.lastName)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Дата рождения</label>
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
                    <div className="form-row">
                        <label className="form-label">Телефон</label>
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
                            className="form-input" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.phone)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="form-row upl-file">
                        <label className="form-label">Аватар</label>
                        <div className="file-upload">
                            <label><input id="file-input" type="file" name="file" />Выберите файл</label>
                            <div id="no-file">Файл не выбран</div>
                        </div>
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
                            className="form-input"
                            placeholder="или вставьте ссылку" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.userPic)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                        <img src={getValues('userPic')} alt="аватар" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Почта</label>
                        <input
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: "Введите email"
                                }
                            })}
                            type="text"
                            className="form-input" />
                        <ErrorMessage
                            errors={errors}
                            name={getName<User>(newUser, o => o.email)}
                            className="bad-feedback"
                            as="div">
                        </ErrorMessage>
                    </div>
                    <div className="form-row">
                        {
                            elementsDefinedByProps.roleSelector()
                        }
                    </div>
                    <div className="form-row form-row-button">
                        <div className="">
                            <button className="button-style" onClick={setIsEditModeOn}>отмена</button>
                        </div>
                        <div className="button-style">
                            <button
                                className="button-style"
                                type={"submit"}>сохранить</button>
                        </div>
                    </div>
                </form>
            </div >
        )
    }
}
export default UserEditForm;


