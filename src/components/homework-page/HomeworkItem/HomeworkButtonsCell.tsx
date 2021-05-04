import React from "react";
import { Homework } from "../../../interfaces/Homework";
import { ButtonsCell } from "../../../shared/styled-components/consts";
import HomeworkAppointButton from "./buttons/homework-appoint-button/HomeworkAppointButton";
import HomeworkDeleteButton from "./buttons/homework-delete-button/HomeworkDeleteButton";
import HomeworkAttemptButton from "./buttons/HomeworkAttemptButton";
import HomeworkBaseButton from "./buttons/HomeworkBaseButton";
import HomeworkCheckButton from "./buttons/HomeworkCheckButton";
import HomeworkCloneButton from "./buttons/HomeworkCloneButton";
import HomeworkEditButton from "./buttons/HomeworkEditButton";

export interface HomeworkButtonsCellOptions {
    readonly appointButton?: boolean;
    readonly cancelAttemptButton?: boolean;
    readonly cloneButton?: boolean;
    readonly deleteButton?: boolean;
    readonly editButton?: boolean;
    readonly checkButton?: boolean;
    attemptButton?: boolean;
}

function HomeworkButtonsCell(props: { hw:Homework; buttons: HomeworkButtonsCellOptions }) {
    return (
        <ButtonsCell>
            {props.buttons.cloneButton && <HomeworkBaseButton child={HomeworkCloneButton()} />}
            {props.buttons.editButton && <HomeworkBaseButton child={HomeworkEditButton()} />}
            {props.buttons.deleteButton && <HomeworkBaseButton child={HomeworkDeleteButton()} />}
            {props.buttons.appointButton && <HomeworkBaseButton child={HomeworkAppointButton()} />}
            {props.buttons.checkButton && <HomeworkBaseButton child={HomeworkCheckButton()} />}
            {(props.buttons.attemptButton && !props.hw.isOptional) && <HomeworkBaseButton child={HomeworkAttemptButton()} />}
        </ButtonsCell>
    )
}

export default HomeworkButtonsCell;