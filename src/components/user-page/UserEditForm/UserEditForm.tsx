import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { SelectItem } from '../../interfaces/SelectItem';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { OptionsType } from 'react-select';
import { convertEnumToDictionary, dictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { validateName } from '../../../shared/validators/nameValidator';
import { validateTopLevelDomain } from '../../../shared/validators/topLevelDomainValidator';
import { getName } from '../../../shared/converters/objectKeyToString';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { type } from 'node:os';
import { UserInput } from '../../interfaces/UserInput';
import { useForm } from 'react-hook-form';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItemConverter';

interface UserEditFormProps {
    roleId: number;
    userToEdit: User | undefined;
    onCancelClick: (mode: boolean) => void;
    onSaveClick: (newUser: User) => void;
    sendNotification: (newNotification: NotificationData) => void;
    url: string;
    token: string;
}

function UserEditForm(props: UserEditFormProps) {

    const initUser = props.userToEdit || {
        firstName: "",
        lastName: "",
        birthDate: undefined,
        login: "",
        password: "",
        userPic: "",
        phone: "",
        email: "",
        role: []
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

    console.log(newUser)

    const { register, handleSubmit, getValues } = useForm<FormInputs>({
        defaultValues: (()=>{if (isFetching===false) {return Object.assign({}, newUser)}})()
      });
    
    const elementsDefinedByRole = {
        roleSelector: () => {
            if (props.roleId === Role.Admin) {
                return (
                    <div className="user-list-item">
                        <label className="column">Список ролей</label>
                        <CustomMultiSelect
                            selectType={"multi"}
                            userOptions={newUser.role as OptionsType<object>}
                            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                            onSelect={roleOnChange}></CustomMultiSelect>
                    </div>)
            } else {
                newUser.role = [{
                    value: Role.Student,
                    label: dictionary[Role[Role.Student]]
                }]
            }
        }
    }

    const getUserToUpdate = () => {
        fetch(props.url + '/' + props.userToEdit?.id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewUser(Object.assign({}, data));
                setIsFetching(false);
            })
    }

    const sendUser = () => {
        fetch(props.url + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)// {} instead newUser - to provoke error
        }
        )
            .then(response => {
                console.log(response);
                if (response.status > 200) {
                    return Promise.reject(response.json())
                }
                return response.json();
            })
            .then(data => {
                !data.Code ?
                    (() => {
                        props.onCancelClick(false);
                        props.onSaveClick(newUser)
                    })() : (() => {
                        props.sendNotification({
                            type: "error",
                            text: data.Message,
                            //text: "ошибка сохранения пользователя " + newUser.firstName + " " + newUser.lastName,
                            isDismissible: true,
                            timestamp: Date.now()
                        });
                    }
                    )();
            })
            .catch(error => {return error})
            .then(data => console.log(data))
    }

    const birthDateOnChange = (date: Date) => {
        newUser.birthDate = date.toLocaleDateString();
        setNewUser(Object.assign({}, newUser))
    }
    const roleOnChange = (options: OptionsType<object>) => {
        newUser.role = options as SelectItem[];
        setNewUser(Object.assign({}, newUser))
    }
    const onSaveButtonClick: FormEventHandler = (e) => {
        e.preventDefault();
        sendUser();
    }
    const onCancelClick = () => {
        props.onCancelClick(false);
    }
    const checkValidity = () => {
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
                <form onSubmit={onSaveButtonClick}>
                    <div className="user-list-item">
                        <label className="column">Имя</label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="column"
                            onChange={anyTextInputChangeHandler}
                            required />
                        <div className="bad-feedback">Введите имя</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Фамилия</label>
                        <input
                            type="text"
                            className="column"
                            value={newUser.lastName}
                            onChange={anyTextInputChangeHandler}
                            name={getName<User>(newUser, (o) => o.lastName)}
                            required />
                        <div className="bad-feedback">Ввведите фамилию</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Дата рождения</label>
                        <DatePickerComponent date={newUser.birthDate} onDateChange={birthDateOnChange} />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Логин</label>
                        <input
                            type="text"
                            className="column"
                            value={newUser.login}
                            onChange={anyTextInputChangeHandler}
                            name={getName<User>(newUser, (o) => o.login)} />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Пароль</label>
                        <input
                            type="text"
                            className="column"
                            value={newUser.password}
                            onChange={anyTextInputChangeHandler}
                            name={getName<User>(newUser, (o) => o.password)} />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Телефон</label>
                        <input
                            type="text"
                            className="column"
                            value={newUser.phone}
                            onChange={anyTextInputChangeHandler}
                            name={getName<User>(newUser, (o) => o.phone)}
                            required />
                        <div className="bad-feedback">Введите номер телефона</div>
                    </div>
                    <div className="user-list-item">
                        <label className="column">Аватар</label>
                        <input type="file" className="column" />
                        <input
                            type="text"
                            className="column"
                            placeholder="или вставьте ссылку"
                            value={newUser.userPic}
                            onChange={anyTextInputChangeHandler}
                            name={getName<User>(newUser, (o) => o.userPic)} />
                        <img src={newUser.userPic} alt="аватар" />
                    </div>
                    <div className="user-list-item">
                        <label className="column">Почта</label>
                        <input type="email" className="column" value={newUser.email} onChange={anyTextInputChangeHandler} name={getName<User>(newUser, (o) => o.email)} required />
                        <div className="bad-feedback">Введите e-mail</div>
                    </div>
                    {
                        elementsDefinedByRole.roleSelector()
                    }
                    <div className="user-list-item">
                        <div className="column">
                            <button className="column" onClick={onCancelClick}>отмена</button>
                        </div>
                        <div className="column save-button">
                            <button
                                className="column save-button"
                                type={"submit"}
                                disabled={isDisabled}
                                onClick={checkValidity}>сохранить</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserEditForm;
