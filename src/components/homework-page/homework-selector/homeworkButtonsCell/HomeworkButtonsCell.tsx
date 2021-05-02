import React from "react";
import { ButtonsCell } from "../../../../shared/styled-components/consts";
import HomeworkCloneButton from "./buttons/HomeworkCloneButton";
import HomeworkDeleteButton from "./buttons/HomeworkDeleteButton";
import HomeworkEditButton from "./buttons/HomeworkEditButton";

export interface HomeworkButtonsCellOptions {
    readonly attemptButton: boolean;
    readonly cancelAttemptButton: boolean;
    readonly cloneButton: boolean;
    readonly deleteButton: boolean;
    readonly editButton: boolean;
}

function HomeworkButtonsCell(props: { settings: HomeworkButtonsCellOptions }) {
    return (
        <ButtonsCell>
            {props.settings.deleteButton && <HomeworkDeleteButton />}
            {props.settings.cloneButton && <HomeworkCloneButton />}
            {props.settings.editButton && <HomeworkEditButton />}
        </ButtonsCell>
    )
}

export default HomeworkButtonsCell;