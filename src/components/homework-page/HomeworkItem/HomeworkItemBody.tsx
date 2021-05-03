import React from "react";
import { Homework } from "../../../interfaces/Homework";
import HomeworkButtonsCell, { HomeworkButtonsCellOptions } from "./HomeworkButtonsCell";
import { HomeworkItem, HomeworkProp, HomeworkThemeName } from "../styled-components/consts";

function HomeworkItemBody(props :{ hw: Homework; buttons: HomeworkButtonsCellOptions}) {
    return (
        <HomeworkItem>
            <HomeworkProp>{props.hw.description}</HomeworkProp>
            <HomeworkThemeName>{
                props.hw.themes.map(theme => (
                    <HomeworkProp key={theme.id}>{theme.name}</HomeworkProp>
                ))
            }</HomeworkThemeName>
            <HomeworkProp>{props.hw.isOptional ? "без проверки" : "с проверкой"}</HomeworkProp>
            <HomeworkButtonsCell settings={props.buttons} />
        </HomeworkItem>
    )
}

export default HomeworkItemBody;