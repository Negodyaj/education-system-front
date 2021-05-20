import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  setDataToCreateAttendances,
  setIsOpenModalAttendance,
  setSelectedLesson,
} from '../../../store/group-page/lesson/action-creators';
import { createAttendance } from '../../../store/group-page/lesson/thunk';
import { getUsers } from '../../../store/user-list-page/thunk';

import { CurrentLesson } from './LessonsTableByGroup';
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  CommonButton,
  ErrorLessonSelection,
  ModalAttendanceBack,
  ModalAttendanceContainer,
  ModalAttendanceHeader,
  RoundButton,
  SaveUsersAttendance,
  UserAttendance,
  UserAttendanceSelect,
  UserDataForAttendance,
  UserListAttendanceByGroup,
  UserNameForAttendance,
  UserPicForAttendance,
} from './ModalAttendanceStyled';

export interface IUserAttendance {
  userId: number;
  isAbsent: boolean;
}

const ModalAttendance = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state);
  let presenceOfUserOnLesson: IUserAttendance[] = [];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    collectDataToCreateAttendances();
  }, [pageState.userListPage.userList]);

  const closeModalAttendance = () => {
    dispatch(setIsOpenModalAttendance());
    dispatch(setSelectedLesson({} as CurrentLesson));
  };

  const collectDataToCreateAttendances = () => {
    pageState.userListPage.userList.map((user) =>
      presenceOfUserOnLesson.push({
        userId: user.id,
        isAbsent: false,
      })
    );
    dispatch(setDataToCreateAttendances(presenceOfUserOnLesson));
  };

  const changeDataToCreateAttendances = (idUser: number) => {
    presenceOfUserOnLesson = pageState.lessonByGroup.arrDataToCreateAttendances;
    presenceOfUserOnLesson.map((dataAttendance) => {
      if (dataAttendance.userId === idUser) {
        dataAttendance.isAbsent = !dataAttendance.isAbsent;
      }

      return presenceOfUserOnLesson;
    });
    dispatch(setDataToCreateAttendances(presenceOfUserOnLesson));
  };

  const saveAttendances = () => {
    dispatch(setIsOpenModalAttendance());
    dispatch(
      createAttendance(
        pageState.lessonByGroup.currentLesson.lessonId,
        pageState.lessonByGroup.arrDataToCreateAttendances
      )
    );
  };

  return (
    <ModalAttendanceBack>
      <ModalAttendanceContainer>
        <ModalAttendanceHeader>
          Посещаемость {pageState.lessonByGroup.currentLesson.lessonDate}
        </ModalAttendanceHeader>
        <RoundButton onClick={closeModalAttendance}>
          <FontAwesomeIcon icon="times" />
        </RoundButton>
        {pageState.lessonByGroup.currentLesson.lessonId ? (
          <>
            <UserListAttendanceByGroup>
              {pageState.userListPage.userList.map((user) => (
                <UserAttendance key={user.id}>
                  <UserDataForAttendance>
                    <UserPicForAttendance src={user.userPic} />
                    <UserNameForAttendance>
                      {user.lastName} {user.firstName}
                    </UserNameForAttendance>
                  </UserDataForAttendance>
                  <UserAttendanceSelect>
                    <CheckBoxWrapper>
                      <CheckBox
                        id={String(user.id)}
                        type="checkbox"
                        onClick={() => changeDataToCreateAttendances(user.id)}
                      />
                      <CheckBoxLabel htmlFor={String(user.id)} />
                    </CheckBoxWrapper>
                  </UserAttendanceSelect>
                </UserAttendance>
              ))}
            </UserListAttendanceByGroup>
            <SaveUsersAttendance>
              <CommonButton onClick={saveAttendances}>Сохранить</CommonButton>
            </SaveUsersAttendance>
          </>
        ) : (
          <ErrorLessonSelection>Занятие не выбрано</ErrorLessonSelection>
        )}
      </ModalAttendanceContainer>
    </ModalAttendanceBack>
  );
};

export default ModalAttendance;
