import { HomeworkSelectorContainer } from "../styled-components/consts"
import '../HomeworkPage.css'
import { HomeworkPageOptions } from "../HomeworkPageCore"
import { Role } from "../../../enums/role"
import HomeworkSelectorMethodist from "./HomeworkSelectorMethodist"
import HomeworkSelectorTeacher from "./HomeworkSelectorTeacher"

export function HomeworkSelector(props: {
    settings: HomeworkPageOptions
}) {

    return (
        <HomeworkSelectorContainer>
            {props.settings.homeworkSelector === Role.Methodist && <HomeworkSelectorMethodist buttons={props.settings.homeworkButtonsCell} />}
            {props.settings.homeworkSelector === Role.Teacher && <HomeworkSelectorTeacher buttons={props.settings.homeworkButtonsCell} />}
        </HomeworkSelectorContainer>
    )
}