import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Lesson } from '../../../../interfaces/Lesson';
import { IRootState } from '../../../../store';
import { getLessonsByGroup } from '../../../../store/group-page/lesson/action-creators';
import { convertStringToDate } from '../../../../shared/converters/stringToDateConverter';
import { Content, Title } from '../GroupInfoComponentStyled';

interface NextLessonsProps {
  id: number;
}

export function NextLessons(props: NextLessonsProps) {
  const { id } = props;
  const dispatch = useDispatch();

  const lessonsState = useSelector((state: IRootState) => state.lessonByGroup);
  const lessons = lessonsState.lessonList;

  useEffect(() => {
    dispatch(getLessonsByGroup());
  }, []);
  const isNextDate = (lessonDate: string): boolean => {
    const now = new Date();
    const date = convertStringToDate(lessonDate);

    if (now > date) return false;

    return true;
  };

  const getNextDate = (): Lesson[] => {
    const newArr = lessons.filter((l) => isNextDate(l.lessonDate));
    newArr.sort((a, b) => {
      if (convertStringToDate(b.lessonDate) > convertStringToDate(a.lessonDate))
        return -1;

      if (convertStringToDate(b.lessonDate) < convertStringToDate(a.lessonDate))
        return 1;

      return 0;
    });

    return newArr.slice(0, 3);
  };

  return (
    <>
      <Title>Ближайшие занятия:</Title>
      {getNextDate().map((l) => (
        <Content>{l.lessonDate}</Content>
      ))}
    </>
  );
}
export default NextLessons;
