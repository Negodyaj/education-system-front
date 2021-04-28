import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { userRegisterFormUrl } from "../../../../shared/consts";

function ListHeaderVerticalNarrow() {
    const history = useHistory();
    const onRegisterClick = () => {
        history.push(`/${userRegisterFormUrl}`);
    }
    return (
        <>
            <div className="column-head">
                <h4>Пользователи</h4>
            </div>
        </>
    )
}
export default ListHeaderVerticalNarrow;