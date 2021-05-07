import React from "react";
import { Homework } from "../../../interfaces/Homework";
import { ButtonsCell } from "../../../shared/styled-components/consts";
import HomeworkAppointButton from "./buttons/homework-appoint-button/HomeworkAppointButton";
import HomeworkDeleteButton from "./buttons/homework-delete-button/HomeworkDeleteButton";
import HomeworkAttemptButton from "./buttons/HomeworkAttemptButton";
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

function HomeworkButtonsCell(props: { hw: Homework; buttons: HomeworkButtonsCellOptions }) {
    return (
        <ButtonsCell onClick={(e) => e.stopPropagation()}>
            {props.buttons.cloneButton && <HomeworkCloneButton />}
            {props.buttons.editButton && <HomeworkEditButton />}
            {props.buttons.deleteButton && <HomeworkDeleteButton homeworkId={props.hw.id} />}
            {props.buttons.checkButton && <HomeworkCheckButton hwId={props.hw.id} />}
            {props.buttons.appointButton && <HomeworkAppointButton />}
            {(props.buttons.attemptButton && !props.hw.isOptional) && <HomeworkAttemptButton />}
        </ButtonsCell>
    )
}

export default HomeworkButtonsCell;