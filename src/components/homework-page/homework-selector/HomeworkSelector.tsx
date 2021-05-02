import { HomeworkSelectorContainer } from "../styled-components/consts"
import '../HomeworkPage.css'
import { HomeworkPageOptions } from "../HomeworkPageCore"
import { Role } from "../../../enums/role"
import HomeworkSelectorMethodist from "./HomeworkSelectorMethodist"

export function HomeworkSelector(props: {
    settings: HomeworkPageOptions
}) {

    return (
        <HomeworkSelectorContainer>
            {
                props.settings.homeworkSelector === Role.Methodist && <HomeworkSelectorMethodist buttons={props.settings.homeworkButtonsCell} />
            }
        </HomeworkSelectorContainer>
    )
}