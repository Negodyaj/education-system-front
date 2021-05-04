import React from "react";
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

function HomeworkButtonsCell(props: { settings: HomeworkButtonsCellOptions }) {
    return (
        <ButtonsCell>
            {props.settings.cloneButton && <HomeworkBaseButton child={HomeworkCloneButton()} />}
            {props.settings.editButton && <HomeworkBaseButton child={HomeworkEditButton()} />}
            {props.settings.deleteButton && <HomeworkBaseButton child={HomeworkDeleteButton()} />}
            {props.settings.appointButton && <HomeworkBaseButton child={HomeworkAppointButton()} />}
            {props.settings.checkButton && <HomeworkBaseButton child={HomeworkCheckButton()} />}
            {props.settings.attemptButton && <HomeworkBaseButton child={HomeworkAttemptButton()} />}
        </ButtonsCell>
    )
}

export default HomeworkButtonsCell;