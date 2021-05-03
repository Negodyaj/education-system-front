import React from "react";
import { ButtonsCell } from "../../../shared/styled-components/consts";
import HomeworkAppointButton from "./buttons/HomeworkAppointButton";
import HomeworkAttemptButton from "./buttons/HomeworkAttemptButton";
import HomeworkCheckButton from "./buttons/HomeworkCheckButton";
import HomeworkCloneButton from "./buttons/HomeworkCloneButton";
import HomeworkDeleteButton from "./buttons/HomeworkDeleteButton";
import HomeworkEditButton from "./buttons/HomeworkEditButton";

export interface HomeworkButtonsCellOptions {
    readonly appointButton?: boolean;
    readonly cancelAttemptButton?: boolean;
    readonly cloneButton?: boolean;
    readonly deleteButton?: boolean;
    readonly editButton?: boolean;
    readonly checkButton?: boolean;
    readonly attemptButton?: boolean;
}

function HomeworkButtonsCell(props: { settings: HomeworkButtonsCellOptions }) {
    return (
        <ButtonsCell>
            {props.settings.deleteButton && <HomeworkDeleteButton />}
            {props.settings.cloneButton && <HomeworkCloneButton />}
            {props.settings.editButton && <HomeworkEditButton />}
            {props.settings.appointButton && <HomeworkAppointButton />}
            {props.settings.checkButton && <HomeworkCheckButton />}
            {props.settings.attemptButton && <HomeworkAttemptButton />}
        </ButtonsCell>
    )
}

export default HomeworkButtonsCell;