
import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SelectItem } from '../../interfaces/SelectItem';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { OptionsType } from 'react-select';
import { convertEntitiesToSelectItems } from '../../../shared/converters/EntityToSelectItem';
import { convertEnumToDictionary, dictionary, getRussianDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';
import { validateName } from '../../../shared/validators/nameValidator';
import { validateTopLevelDomain } from '../../../shared/validators/topLevelDomainValidator';

interface UserEditFormProps {
    roleId: number;
    user: User | null;
    onCancelClick: (mode: boolean) => void;
    onSaveClick: (newUser: User) => void;
}

function UserEditForm(props: UserEditFormProps) {

    const id = useState<number | undefined>(props.user?.id)[0];
    const [name, setName] = useState<string | undefined>(props.user?.firstName);
    const [secondName, setSecondName] = useState<string | undefined>(props.user?.lastName);
    const [birthDate, setBirthDate] = useState<string | undefined>(props.user?.birthDate ?? undefined);
    const [login, setLogin] = useState<string | undefined>(props.user?.login);
    const [roleMultiselect, setRoleMultiselect] = useState(props.user?.role ?? undefined);
    const [password, setPassword] = useState<string | undefined>(props.user?.password);
    const [phone, setPhone] = useState<string | undefined>(props.user?.phone);
    const [picLink, setPicLink] = useState(props.user?.userPic)
    const [email, setEmail] = useState<string | undefined>(props.user?.email);
    const [groupName, setGroupName] = useState<string | undefined>(props.user?.groupName);

    const [wasValidated, setWasValidated] = useState('');

    const newUser: User = {
        id: id,
        firstName: name,
        lastName: secondName,
        birthDate: birthDate,
        login: login,
        role: roleMultiselect as SelectItem[],
        password: password,
        phone: phone,
        userPic: picLink,
        email: email,
        groupName: groupName
    }

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
                            userOptions={roleMultiselect as OptionsType<object>}
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

    const nameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(validateName(e));
    }
    const secondNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSecondName(validateName(e));
    }
    const birthDateOnChange = (date: Date) => {
        setBirthDate(date.toLocaleDateString());
    }
    const loginOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setLogin(e.target.value);
    }
    const roleOnChange = (options: OptionsType<object>) => {
        setRoleMultiselect(options as SelectItem[]);
    }
    const passwordOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    }
    const phoneOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPhone(e.target.value);
    }
    const userPicLinkOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPicLink(e.target.value)
    }
    const emailOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(validateTopLevelDomain(e));
    }
    const groupNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setGroupName(e.target.value);
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

    return (
        <div className={"user-edit-form needs-validation " + wasValidated}>
            <form onSubmit={onSaveButtonClick}>
                <div className="user-list-item">
                    <label className="column">Имя</label>
                    <input type="text" className="column" value={name} onChange={nameOnChange} required />
                    <div className="bad-feedback">Введите имя</div>
                </div>
                <div className="user-list-item">
                    <label className="column">Фамилия</label>
                    <input type="text" className="column" value={secondName} onChange={secondNameOnChange} required />
                    <div className="bad-feedback">Ввведите фамилию</div>
                </div>
                <div className="user-list-item">
                    <label className="column">Дата рождения</label>
                    <DatePickerComponent date={birthDate} onDateChange={birthDateOnChange} />
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
                    <input type="text" className="column" value={phone} onChange={phoneOnChange} required />
                    <div className="bad-feedback">Введите номер телефона</div>
                </div>
                <div className="user-list-item">
                    <label className="column">Аватар</label>
                    <input type="file" className="column" />
                    <input
                        type="text"
                        className="column"
                        placeholder="или вставьте ссылку"
                        value={picLink}
                        onChange={userPicLinkOnChange} />
                    <img src={picLink} alt="аватар" />
                </div>
                <div className="user-list-item">
                    <label className="column">Почта</label>
                    <input type="email" className="column" value={email} onChange={emailOnChange} required />
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
