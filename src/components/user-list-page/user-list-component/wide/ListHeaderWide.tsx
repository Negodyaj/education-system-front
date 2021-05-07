import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { userRegisterFormUrl } from '../../../../shared/consts';

function ListHeaderWide() {
  const history = useHistory();
  const onRegisterClick = () => {
    history.push(`/${userRegisterFormUrl}`);
  };
  return (
    <>
      <div className="column-head">
        <h4>Пользователи</h4>
        <button className="common-button" onClick={onRegisterClick}>
          <FontAwesomeIcon icon="plus" />
          <span> Добавить</span>
        </button>
      </div>
      <div className="list + user-list-head">
        <div className="column"> </div>
        <div className="column"><span title="А-Я">фамилия</span></div>
        <div className="column"><span title="А-Я">имя</span></div>
        <div className="column"><span title="А-Я">логин</span></div>
        <div className="column"><span title="А-Я">роль</span></div>
      </div>
    </>
  );
}
export default ListHeaderWide;
