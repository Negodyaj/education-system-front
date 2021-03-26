
import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import './UserEditForm.css'
import '../UserPage.css';
import { User } from '../../interfaces/User';
import { ChangeEventHandler, useState } from 'react';
import { SelectItem } from '../../interfaces/SelectItem';
import DatePickerComponent from '../../../shared/components/date-picker/DatePickerComponent';
import { Roles } from '../../../shared/components/roles/Roles';
import { OptionsType } from 'react-select';
import { convertEntitiesToSelectItems } from '../../../shared/converters/entityToSelectItem';
import { convertEnumToDictionary, dictionary, getDictionary } from '../../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../../enums/role';

interface UserEditFormProps {
    roleId: number;
    user: User | null;
    onCancelClick: (mode: boolean) => void;
    onSaveClick: (newUser: User) => void;
}

function UserEditForm(props: UserEditFormProps) {
    const id = useState<number | undefined>(props.user?.id)[0];
    const [name, setName] = useState<string | undefined>(props.user?.name);
    const [secondName, setSecondName] = useState<string | undefined>(props.user?.secondName);
    const [birthDate, setBirthDate] = useState<Date | null>(props.user?.birthDate ?? null);
    const [login, setLogin] = useState<string | undefined>(props.user?.login);
    const [roleMultiselect, setRoleMultiselect] = useState(props.user?.role ?? undefined);
    const [password, setPassword] = useState<string | undefined>(props.user?.password);
    const [phone, setPhone] = useState<string | undefined>(props.user?.phone);
    const [email, setEmail] = useState<string | undefined>(props.user?.email);
    const [groupName, setGroupName] = useState<string | undefined>(props.user?.groupName);

    const newUser: User = {
        id: id,
        name: name,
        secondName: secondName,
        birthDate: birthDate,
        login: login,
        role: roleMultiselect as SelectItem[],
        password: password,
        phone: phone,
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
                            options={convertEntitiesToSelectItems(getDictionary(convertEnumToDictionary(Role)))}
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
        setName(e.target.value);
    }
    const secondNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSecondName(e.target.value);
    }
    const birthDateOnChange = (date: Date) => {
        setBirthDate(date);
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
    const emailOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    }
    const groupNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setGroupName(e.target.value);
    }

    const onSaveClick = () => {
        newUser.id === undefined && (newUser.id = (() => {
            return Math.round(Math.random() * 100)
        })());
        props.onSaveClick(newUser)
        props.onCancelClick(false);
    }
    const onCancelClick = () => {
        props.onCancelClick(false);
    }

    return (
        <div className="user-edit-form">
            {console.log('-------')}
            {console.log(birthDate)}
            <div className="user-list-item">
                <label className="column">Имя</label>
                <input type="text" className="column" value={name} onChange={nameOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Фамилия</label>
                <input type="text" className="column" value={secondName} onChange={secondNameOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Дата рождения</label>
                <DatePickerComponent date={props.user?.birthDate ?? null} onDateChange={birthDateOnChange} />
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
                <input type="text" className="column" value={phone} onChange={phoneOnChange} />
            </div>
            <div className="user-list-item">
                <label className="column">Аватар</label>
                <input type="file" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Почта</label>
                <input type="text" className="column" value={email} onChange={emailOnChange} />
            </div>

            {
                elementsDefinedByRole.roleSelector()
            }{
                console.log(roleMultiselect)
            }

            <div className="user-list-item">
                <div className="column">
                    <button className="column" onClick={onCancelClick}>отмена</button>
                </div>
                <div className="column">
                    <button className="column" onClick={onSaveClick} disabled={isDisabled}>сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default UserEditForm;
