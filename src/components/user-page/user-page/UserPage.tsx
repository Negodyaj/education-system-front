import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import React, { useEffect, useState } from 'react';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { convertEnumToDictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { useForm } from 'react-hook-form';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItemConverter';
import { getName } from '../../../shared/converters/objectKeyToString';
import { ErrorMessage } from '@hookform/error-message';
import './UserPage.css'
import '../../../App.css';
import { User } from '../../../interfaces/User';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { quitUserPage } from '../../../store/user-page/action-creators';
import { getUserToEditById, sendUser } from '../../../store/user-page/thunk';
import { convertRoleIdsToSelectItems } from '../../../shared/converters/roleIdsToSelectItems';
import { Link } from 'react-router-dom';
import { UserInput } from '../../../interfaces/UserInput';


function UserPage() {

    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    useEffect(() => {
        dispatch(getUserToEditById(appState.userPage.userForUserPageId))
    }, [])

    useEffect(() => {
        Object.keys(appState.userPage.userForUserPage).map(key => {
            setValue(key as keyof UserInput, appState.userPage.userForUserPage[key as keyof UserInput])
        })
    }, [appState.userPage.userForUserPage])

    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<UserInput>({
        mode: 'all',
        criteriaMode: 'all'
    });

    const elementsDefinedByProps = {
        roleSelector: () => {
            if (appState.roleSelector.currentUserRoleId === Role.Admin) {
                return (
                    <div className="form-row multi">
                        <label className="form-label">Список ролей</label>
                        <CustomMultiSelect
                            selectType={"multi"}
                            selectedOptions={convertRoleIdsToSelectItems(appState.userPage.userForUserPage?.roles || []) || undefined}
                            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                            onMultiSelect={roleOnChange}></CustomMultiSelect>
                    </div>)
            } else {
                setValue('roles', [Role.Student]);
            }
        },
        passwordInput: () => {
            if (appState.userPage.userForUserPage === undefined) {
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
                            name={"password"}
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
            if (appState.userPage.userForUserPage === undefined) {
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
                            name={"login"}
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
    const birthDateOnChange = (date: string) => {
        setValue('birthDate', date)
    }
    const roleOnChange = (options: number[]) => {
        setValue('roles', options);
    }
    const onSubmit = (data: User) => {
        dispatch(sendUser(data))
    }
    const closeUserPage = () => {
        dispatch(quitUserPage())
    }

    return (
        appState.userPage.isDataLoading
            ?
            <div>Loading</div>
            :
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
                            name={"firstName"}
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
                            name={"lastName"}
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
                            name={"phone"}
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
                            name={"userPic"}
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
                            name={"email"}
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
                        <Link to="/user-list">
                            <button className="button-style" type="button" onClick={closeUserPage}>отмена</button>
                        </Link>
                        <button className="button-style" type={"submit"}>сохранить</button>
                    </div>
                </form>
            </div >
    )
}
export default UserPage;


