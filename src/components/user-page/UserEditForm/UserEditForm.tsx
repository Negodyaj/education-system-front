
import CustomMultiSelect from '../../multi-select/CustomMultiSelect';
import '../UserPage.css';
import { User } from '../../interfaces/User';

interface UserEditFormProps{
    onCancelClick:(mode: boolean)=>void;
}

function UserEditForm(props:UserEditFormProps) {

    const onCancelClick = () => {
        props.onCancelClick(false);
    }

    return (
        <div className="user-edit-form">
            <div className="user-list-item">
                <label className="column">Имя</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Фамилия</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Дата рождения</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Логин</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Пароль</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Телефон</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Аватар</label>
                <input type="file" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Почта</label>
                <input type="text" className="column" />
            </div>
            <div className="user-list-item">
                <label className="column">Список ролей</label>
                <CustomMultiSelect selectType={"multi"} options={[]} ></CustomMultiSelect>
            </div>
            <div className="user-list-item">
                <div className="column">
                    <button className="column" onClick={onCancelClick}>отмена</button>
                </div>
            </div>
        </div>
    )
}

export default UserEditForm;