import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";

function HomeworkAppointButton() {
    const appointOnClick = () => {
        
    }
    return (
        <RoundButton title="назначить" onClick={appointOnClick}>
            <FontAwesomeIcon icon="calendar-check" />
        </RoundButton>
    )
}
export default HomeworkAppointButton;