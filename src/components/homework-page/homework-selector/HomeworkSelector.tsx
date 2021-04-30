import React from "react"
import { useSelector } from "react-redux"
import { IRootState } from "../../../store"
import { HomeworksByCourse } from "../../../store/state"
import { CourseItem, CourseName, HomeworkItem, HomeworkSelectorContainer } from "../styled-components/consts"

export function HomeworkSelector() {
    const appState = useSelector((state: IRootState) => state)
    return (
        <HomeworkSelectorContainer>
            {
                Object.keys(appState.homeworkPage.homeworkListMethodist).map(courseName =>
                    <CourseItem>
                        <CourseName>{courseName}</CourseName>
                        {
                            appState.homeworkPage.homeworkListMethodist[courseName as keyof HomeworksByCourse].map(hw => {
                                return (
                                    <HomeworkItem>
                                            <div>{hw.description}</div>
                                            <div>{hw.isOptional ? "без проверки" : "с проверкой"}</div>
                                    </HomeworkItem>
                                )
                            })
                        }
                    </CourseItem>
                )
            }
        </HomeworkSelectorContainer>
    )
}