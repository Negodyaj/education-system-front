import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RoundButton } from "../../../../shared/styled-components/buttonStyledComponent";

function HomeworkEditButton() {
    return (
        <RoundButton title="редактировать">
            <FontAwesomeIcon icon="edit" />
        </RoundButton>
    )
}
export default HomeworkEditButton;