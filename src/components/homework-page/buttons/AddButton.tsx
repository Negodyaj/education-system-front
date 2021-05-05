import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CommonButton } from "../../../shared/styled-components/buttonStyledComponent";

function AddButton(props: { isTurnedOn: boolean }) {
    return (
        props.isTurnedOn
            ?
            <CommonButton>
                <FontAwesomeIcon icon="plus" />
                <span> Добавить</span>
            </CommonButton>
            :
            null
    )
}

export default AddButton;