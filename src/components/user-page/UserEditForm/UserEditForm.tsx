import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SelectItem } from '../../interfaces/SelectItem';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { OptionsType } from 'react-select';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItem';
import { convertEnumToDictionary, dictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { validateName } from '../../../shared/validators/nameValidator';
import { validateTopLevelDomain } from '../../../shared/validators/topLevelDomainValidator';
import { getName } from '../../../shared/converters/objectKeyToString';

interface UserEditFormProps {
    roleId: number;
    user: User | null;
    onCancelClick: (mode: boolean) => void;
    onSaveClick: (newUser: User) => void;
}

function UserEditForm(props: UserEditFormProps) {

    const [newUser, setNewUser] = useState(Object.assign({}, props.user))
    const [wasValidated, setWasValidated] = useState('');

    const isDisabled = (Object.values(newUser).reduce((isEmpty, prop) => {
        if (prop) {
            return false;
        }
        return isEmpty
    }, true))

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
        props.onSaveClick(newUser)
        props.onCancelClick(false);
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
        let propValue = e.target.value as typeof operand;
        (newUser[propKey as keyof User] as typeof operand) = propValue;
        setNewUser(Object.assign({}, newUser));
    }

    return (
        <div className={"user-edit-form needs-validation " + wasValidated}>
            <form onSubmit={onSaveButtonClick}>
                <div className="user-list-item">
                    <label className="column">Имя</label>
                    <input
                        type="text"
                        className="column"
                        value={newUser.firstName}
                        onChange={anyTextInputChangeHandler}
                        name={getName<User>(newUser, (o) => o.firstName)}
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

export default UserEditForm;
