import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";

function HomeworkEditButton() {
    return (
        <RoundButton title="удалить">
            <FontAwesomeIcon icon="trash" />
        </RoundButton>
    )
}
export default HomeworkEditButton;