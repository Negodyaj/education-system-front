import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { getLessonsByGroup } from '../../../store/group-page/lesson/thunk';
import { LessonsTable, LessonsContainer, ColumnLessonsTable, HeaderColumnLessonsTable, ContentColumnLessonsTable, HeaderLessonsTable } from './LessonListComponentStyled';

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
                        <ColumnLessonsTable></ColumnLessonsTable>
                    </ContentColumnLessonsTable>  
                ))
                }
            </LessonsTable>
        </LessonsContainer>
    )
}

export default LessonList;
