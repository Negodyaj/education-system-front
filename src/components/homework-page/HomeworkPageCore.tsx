import React from "react";
import { PageTitle } from "../../shared/styled-components/consts";
import AddButton from "./buttons/AddButton";
import { HomeworkButtonsCellOptions } from "./HomeworkItem/HomeworkButtonsCell";
import { HomeworkSelector } from "./homework-selector/HomeworkSelector";
import { HomeworkPageContainer, HomeworkPageHeader } from "./styled-components/consts";
import { Homework } from "../../interfaces/Homework";
import { IndexedObj } from "../../interfaces/IndexedObj";

export interface HomeworkPageOptions {
    readonly addButton: boolean;
    readonly homeworkButtonsCell: HomeworkButtonsCellOptions;
    homeworkList: IndexedObj<Homework>;
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