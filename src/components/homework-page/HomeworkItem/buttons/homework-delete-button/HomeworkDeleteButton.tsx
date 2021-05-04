import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";
import HomeworkDeleteModal from "../homework-appoint-button/HomeworkAppointModal";


function HomeworkDeleteButton() {
    
    return (
            <RoundButton title="удалить">
                <FontAwesomeIcon icon="trash" />
            </RoundButton>
    )
}
export default HomeworkDeleteButton;