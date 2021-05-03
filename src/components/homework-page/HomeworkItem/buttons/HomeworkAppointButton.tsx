import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RoundButton } from "../../../../shared/styled-components/buttonStyledComponent";

function HomeworkAppointButton() {
    return (
        <RoundButton title="назначить">
            <FontAwesomeIcon icon="calendar-check" />
        </RoundButton>
    )
}
export default HomeworkAppointButton;