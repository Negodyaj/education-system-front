import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { setIdLessonForDelete, setIsOpenModalDeleteLesson } from "../../../store/group-page/lesson/action-creators";
import { getLessonsByGroup } from "../../../store/group-page/lesson/thunk";
import ModalLessonDelete from "./ModalLessonDelete";
import { ButtonActions, ColumnLessonsTable, ContentColumnLessonsTable, HeaderColumnLessonsTable, HeaderLessonsTable, LessonsTable, RoundButton } from "./LessonsTableByGroupStyled";

function LessonsTableByGroup() {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.lessonByGroup);

    useEffect(() => {
        dispatch(getLessonsByGroup());
        console.log(pageState.lessonList);
    }, []);

    const openModalDeleteLesson = (lessonId: number) => {
        dispatch(setIsOpenModalDeleteLesson());
        dispatch(setIdLessonForDelete(lessonId));
    }
    
    return(
        <LessonsTable>
            <HeaderLessonsTable>
                <HeaderColumnLessonsTable>Дата</HeaderColumnLessonsTable> 
                <HeaderColumnLessonsTable>Описание</HeaderColumnLessonsTable> 
                <HeaderColumnLessonsTable>Список тем</HeaderColumnLessonsTable>
                <HeaderColumnLessonsTable>Ссылка на запись</HeaderColumnLessonsTable>  
                <HeaderColumnLessonsTable>Действия</HeaderColumnLessonsTable> 
            </HeaderLessonsTable>
            {pageState.lessonList.map(lesson => (
                <ContentColumnLessonsTable>
                    <ColumnLessonsTable>{lesson.lessonDate}</ColumnLessonsTable>
                    <ColumnLessonsTable>{lesson.description}</ColumnLessonsTable>
                    <ColumnLessonsTable>{lesson.themes}</ColumnLessonsTable>
                    <ColumnLessonsTable>{lesson.recordLink}</ColumnLessonsTable>
                    <ColumnLessonsTable>
                        <ButtonActions>
                            <RoundButton onClick={() => { openModalDeleteLesson(lesson.id) }}>
                                <FontAwesomeIcon icon="trash" />
                            </RoundButton>
                            <RoundButton>
                                <FontAwesomeIcon icon="edit" />
                            </RoundButton>
                        </ButtonActions>
                    </ColumnLessonsTable>
                </ContentColumnLessonsTable>  
            ))
            }
            {pageState.isOpenModalDeleteLesson && <ModalLessonDelete />}
        </LessonsTable>
    )
}

export default LessonsTableByGroup;