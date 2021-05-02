import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronArrow } from "../../../shared/styled-components/ChevronArrow";
import { ACTIVE, NOT_ACTIVE } from "../../../shared/styled-components/consts";
import { IRootState } from "../../../store";
import { openHomeworkListMethodistItem, openHomeworkListTeacherItem } from "../../../store/homework-page/action-creators";
import { HomeworksByCourse, HomeworksByGroup } from "../../../store/state";
import { CourseItem, CourseItemHeader, CourseName, GroupItem, HomeworkItem, HomeworkProp, HomeworkThemeName } from "../styled-components/consts";
import HomeworkButtonsCell, { HomeworkButtonsCellOptions } from "./homeworkButtonsCell/HomeworkButtonsCell";

function HomeworkSelectorTeacher(props: { buttons: HomeworkButtonsCellOptions }) {
    const appState = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    const arrowOnClick = (groupId: number) => {
        dispatch(openHomeworkListTeacherItem(groupId))
    }
    return (
        <>
            {
                Object.keys(appState.homeworkPage.homeworkListTeacher).map(groupId =>
                    <GroupItem className={appState.homeworkPage.openedGroupId.includes(Number.parseInt(groupId)) ? ACTIVE : NOT_ACTIVE}>
                        <CourseItemHeader>
                            <CourseName>{groupId}</CourseName>
                            <ChevronArrow
                                onClick={() => arrowOnClick(Number.parseInt(groupId))}
                                className={appState.homeworkPage.openedGroupId.includes(Number.parseInt(groupId)) ? ACTIVE : NOT_ACTIVE} />
                        </CourseItemHeader>
                        {
                            appState.homeworkPage.homeworkListTeacher[Number.parseInt(groupId) as keyof HomeworksByGroup].map(hw => (
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
                    </GroupItem>
                )
            }</>)
}

export default HomeworkSelectorTeacher;