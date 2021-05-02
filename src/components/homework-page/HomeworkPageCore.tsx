import React from "react";
import { useSelector } from "react-redux";
import { Role } from "../../enums/role";
import { PageTitle } from "../../shared/styled-components/consts";
import { IRootState } from "../../store";
import AddButton from "./buttons/AddButton";
import { HomeworkButtonsCellOptions } from "./homework-selector/homeworkButtonsCell/HomeworkButtonsCell";
import { HomeworkSelector } from "./homework-selector/HomeworkSelector";
import { HomeworkPageContainer, HomeworkPageHeader } from "./styled-components/consts";

export type homeworkSelectorMode = Role.Methodist | Role.Student | Role.Teacher | Role.Tutor;

export interface HomeworkPageOptions {
    readonly addButton: boolean;
    readonly homeworkSelector: homeworkSelectorMode;
    readonly homeworkButtonsCell: HomeworkButtonsCellOptions;
}

function HomeworkPageCore(props: { settings: HomeworkPageOptions }) {
    return (
        <HomeworkPageContainer>
            <HomeworkPageHeader>
                <PageTitle>Домашние задания</PageTitle>
                <AddButton isTurnedOn={props.settings.addButton} />
            </HomeworkPageHeader>
            <HomeworkSelector settings={props.settings} />
        </HomeworkPageContainer>
    )
}

export default HomeworkPageCore;