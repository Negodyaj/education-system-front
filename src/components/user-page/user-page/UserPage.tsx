import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import React, { useEffect, useState } from 'react';
import { convertEnumToDictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { FormProvider } from 'react-hook-form';
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
import { Link, useParams } from 'react-router-dom';
import { UserInput } from '../../../interfaces/UserInput';
import { useUserForm } from '../hooks/useUserForm';
import FormElement, { } from '../form-elements/FormElement';
import { getFormElementSettings } from '../../../shared/helpers/useFormRegisterSettingByKey';
import { InputNames } from '../../../enums/inputNames';


function UserPage() {

    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    const { id } = useParams<{ id?: string; }>();
    useEffect(() => {
        dispatch(getUserToEditById(id))
    }, [])

    useEffect(() => {
        Object.keys(appState.userPage.userForUserPage).map(key => {
            setValue(key as keyof UserInput, appState.userPage.userForUserPage[key as keyof UserInput])
        })
    }, [appState.userPage.userForUserPage])

    const { register, formState, handleSubmit, getValues, setValue, ...methods } = useUserForm();

    const elementsDefinedByProps = {
        roleSelector: () => {
            if (appState.roleSelector.currentUserRoleId === Role.Admin) {
                // return (
                //     <div className="form-row multi">
                //         <label className="form-label">Список ролей</label>
                //         <CustomMultiSelect
                //             selectType={"multi"}
                //             selectedOptions={convertRoleIdsToSelectItems(appState.userPage.userForUserPage?.roles || []) || undefined}
                //             options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                //             onMultiSelect={roleOnChange}></CustomMultiSelect>
                //     </div>)
            } else {
                //setValue('roles', [Role.Student]);
            }
        },
        passwordInput: () => {
            if (appState.userPage.userForUserPage === undefined) {

            } else {
                return;
            }
        },
        loginInput: () => {
            if (appState.userPage.userForUserPage === undefined) {

            } else {
                return;
            }
        }
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
            <FormProvider
                register={register}
                formState={formState}
                handleSubmit={handleSubmit}
                getValues={getValues} setValue={setValue} {...methods}>
                <div className={"user-edit-form needs-validation was-validated"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            Object.keys(appState.userPage.userForUserPage).map(key => {
                                return <FormElement formElementSettings={getFormElementSettings(key as InputNames)}></FormElement>
                            })
                        }
                        {
                        /*
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
                                errors={formState.errors}
                                name={"userPic"}
                                className="bad-feedback"
                                as="div">
                            </ErrorMessage>
                            <img src={appState.userPage.userForUserPage.userPic} alt="аватар" />
                        </div>
                        
                        <div className="form-row">
                            {
                                elementsDefinedByProps.roleSelector()
                            }
                        </div> */}
                        <div className="form-row form-row-button">
                            <Link to="/user-list">
                                <button className="common-button" type="button" onClick={closeUserPage}>отмена</button>
                            </Link>
                            <button className="common-button" type={"submit"}>сохранить</button>
                        </div>
                    </form>
                </div >
            </FormProvider>
    )
}
export default UserPage;


