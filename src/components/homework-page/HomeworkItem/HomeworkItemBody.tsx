import React, { useState } from "react";
import { Homework } from "../../../interfaces/Homework";
import { HomeworkDescription, HomeworkItem, HomeworkItemHeader, HomeworkName, HomeworkProp, HomeworkThemeName } from "../styled-components/consts";
import HomeworkButtonsCell, { HomeworkButtonsCellOptions } from "./HomeworkButtonsCell";

function HomeworkItemBody(props: { hw: Homework; buttons: HomeworkButtonsCellOptions }) {
    const [descriptionVisibility, setDescriptionVisibility] = useState(false);
    const toggleDescriptionVisibility = () => {
        setDescriptionVisibility(!descriptionVisibility)
    }
    return (
        <HomeworkItem>
            <HomeworkItemHeader descriptionVisibility={descriptionVisibility} onClick={toggleDescriptionVisibility}>
                <HomeworkName>{props.hw.name}</HomeworkName>
                <HomeworkThemeName>
                    {
                        props.hw.themes.map(theme => (
                            <HomeworkProp key={theme.id}>{theme.name}</HomeworkProp>
                        ))
                    }
                </HomeworkThemeName>
                <HomeworkProp>{props.hw.isOptional ? "без проверки" : "с проверкой"}</HomeworkProp>
                <HomeworkButtonsCell settings={props.buttons} />
            </HomeworkItemHeader>
            <HomeworkDescription>
                {props.hw.description ? props.hw.description : "нет описания"}
            </HomeworkDescription>
        </HomeworkItem>
    )
}

export default HomeworkItemBody;