import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';
import { LessonsTable, ColumnHeaderLessonsTable, LessonsContainer } from './LessonListComponentStyled';

function LessonList() {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.lessonByGroup);


    useEffect(() => {
        dispatch(getLessonsByGroup());
        console.log(pageState.lessonList);
    }, []);

    return (
        <LessonsContainer>
            <LessonsTable>
                <ColumnHeaderLessonsTable>Дата</ColumnHeaderLessonsTable>
                <ColumnHeaderLessonsTable>Описание</ColumnHeaderLessonsTable>
                <ColumnHeaderLessonsTable>Список тем</ColumnHeaderLessonsTable>
                <ColumnHeaderLessonsTable>Ссылка на запись</ColumnHeaderLessonsTable>
                <ColumnHeaderLessonsTable>Действия</ColumnHeaderLessonsTable>
            </LessonsTable>
        </LessonsContainer>
    )
}

export default LessonList;
