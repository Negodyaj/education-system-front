import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronArrow } from "../../../shared/styled-components/ChevronArrow";
import { ACTIVE, NOT_ACTIVE } from "../../../shared/styled-components/consts";
import { IRootState } from "../../../store";
import { openHomeworkListMethodistItem } from "../../../store/homework-page/action-creators";
import { HomeworksByCourse } from "../../../store/state";
import { CourseItem, CourseItemHeader, CourseName, HomeworkItem, HomeworkProp, HomeworkThemeName } from "../styled-components/consts";
import HomeworkButtonsCell, { HomeworkButtonsCellOptions } from "./homeworkButtonsCell/HomeworkButtonsCell";

function HomeworkSelectorMethodist(props: { buttons: HomeworkButtonsCellOptions }) {
    const appState = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    const arrowOnClick = (courseName: string) => {
        dispatch(openHomeworkListMethodistItem(courseName))
    }
    return (
        <>
            {
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
                                    <HomeworkButtonsCell settings={props.buttons} />
                                </HomeworkItem>
                            )
                            )
                            //<TableBuilder list={appState.homeworkPage.homeworkListMethodist[courseName as keyof HomeworksByCourse]}></TableBuilder>
                        }
                    </CourseItem>
                )
            }</>)
}

export default HomeworkSelectorMethodist;