import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './BaseGroupInfo.css';

import { Lesson } from '../../../../interfaces/Lesson';
import { IRootState } from '../../../../store';
import { getLessonsByGroup } from '../../../../store/group-page/lesson/action-creators';
import { convertStringToDate } from '../../../../shared/converters/stringToDateConverter';

export function NextLessons() {
  const dispatch = useDispatch();

  const lessonsState = useSelector((state: IRootState) => state.lessonByGroup);

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
    const newArr = lessonsState.lessonList.filter((l) =>
      isNextDate(l.lessonDate)
    );
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
    <div>
      <div className="title">Ближайшие занятия:</div>
      {getNextDate().map((l) => (
        <div className="info">{l.lessonDate}</div>
      ))}
    </div>
  );
}
export default NextLessons;
