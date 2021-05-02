import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import TableBuilder from "../../../shared/components/table-builder/TableBuilder"
import { CommonButton, RoundButton } from "../../../shared/styled-components/buttonStyledComponent"
import { ACTIVE, ButtonsCell, NOT_ACTIVE } from "../../../shared/styled-components/consts"
import { IRootState } from "../../../store"
import { HomeworksByCourse } from "../../../store/state"
import { CourseItem, CourseItemHeader, CourseName, HomeworkItem, HomeworkProp, HomeworkSelectorContainer, HomeworkThemeName } from "../styled-components/consts"
import '../HomeworkPage.css'
import { ChevronArrow } from "../../../shared/styled-components/ChevronArrow"
import { openHomeworkListMethodistItem } from "../../../store/homework-page/action-creators"

export function HomeworkSelector() {
    const appState = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    const arrowOnClick = (courseName: string) => {
        dispatch(openHomeworkListMethodistItem(courseName))
    }
    return (
        <HomeworkSelectorContainer> {
            Object.keys(appState.homeworkPage.homeworkListMethodist).map(courseName =>
                <CourseItem className={appState.homeworkPage.openedCourseName.includes(courseName) ? ACTIVE : NOT_ACTIVE}>
                    <CourseItemHeader>
                        <CourseName>{courseName}</CourseName>
                        <ChevronArrow
                            onClick={() => arrowOnClick(courseName)}
                            className={appState.homeworkPage.openedCourseName.includes(courseName) ? ACTIVE : NOT_ACTIVE} />
                    </CourseItemHeader>
                    {
                        appState.homeworkPage.homeworkListMethodist[courseName as keyof HomeworksByCourse].map(hw => (
                            <HomeworkItem>
                                <HomeworkProp>{hw.description}</HomeworkProp>
                                <HomeworkThemeName>{
                                    hw.themes.map(theme => (
                                        <HomeworkProp key={theme.id}>{theme.name}</HomeworkProp>
                                    ))
                                }</HomeworkThemeName>
                                <HomeworkProp>{hw.isOptional ? "без проверки" : "с проверкой"}</HomeworkProp>
                                <ButtonsCell>
                                    <RoundButton title="клонировать">
                                        <FontAwesomeIcon icon="clone" />
                                    </RoundButton>
                                    <RoundButton title="удалить">
                                        <FontAwesomeIcon icon="trash" />
                                    </RoundButton>
                                </ButtonsCell>
                            </HomeworkItem>
                        )
                        )
                        //<TableBuilder list={appState.homeworkPage.homeworkListMethodist[courseName as keyof HomeworksByCourse]}></TableBuilder>
                    }
                </CourseItem>
            )
        }
        </HomeworkSelectorContainer>
    )
}