import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { User } from "../../../interfaces/User";
import { userEditUrl } from "../../../shared/consts";

function EditButton(props: { user: User }) {
    const history = useHistory();
    const onEditClick = (userToEditId: number) => {
        history.push(`/${userEditUrl}/${userToEditId}/edit`)
    }
    return (
        <button className="round-button" onClick={() => onEditClick(props.user.id)}>
            <FontAwesomeIcon icon="edit" />
        </button>
    )
}

export default EditButton;