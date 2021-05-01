import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSelector } from "react-redux"
import TableBuilder from "../../../shared/components/table-builder/TableBuilder"
import { ChevronArrow } from "../../../shared/styled-components/arrow"
import { CommonButton, RoundButton } from "../../../shared/styled-components/buttonStyledComponent"
import { ButtonsCell } from "../../../shared/styled-components/consts"
import { IRootState } from "../../../store"
import { HomeworksByCourse } from "../../../store/state"
import { CourseItem, CourseItemHeader, CourseName, HomeworkItem, HomeworkProp, HomeworkSelectorContainer, HomeworkThemeName } from "../styled-components/consts"
import '../HomeworkPage.css'

export function HomeworkSelector() {
    const appState = useSelector((state: IRootState) => state)
    return (
        <HomeworkSelectorContainer> {
            Object.keys(appState.homeworkPage.homeworkListMethodist).map(courseName =>
                <CourseItem>
                    <CourseItemHeader>
                        <CourseName>{courseName}</CourseName>
                        <ChevronArrow></ChevronArrow>
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