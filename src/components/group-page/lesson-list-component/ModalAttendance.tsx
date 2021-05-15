import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import { setIsOpenModalAttendance } from '../../../store/group-page/lesson/action-creators';
import { createAttendance } from '../../../store/group-page/lesson/thunk';
import { getUsers } from '../../../store/user-list-page/thunk';

import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  CommonButton,
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
  isPresence: boolean;
}

const ModalAttendance = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.userListPage);
  const presenceOfUserOnLesson: IUserAttendance[] = [];

  const closeModalAttendance = () => {
    dispatch(setIsOpenModalAttendance());
  };

  useEffect(() => {
    dispatch(getUsers());
    indicateAttendance();
  }, []);

  const indicateAttendance = () => {
    pageState.userList.map((user) =>
      presenceOfUserOnLesson.push({
        userId: user.id,
        isPresence: false,
      })
    );
    dispatch(createAttendance(28, presenceOfUserOnLesson));
    console.log(presenceOfUserOnLesson);
  };

  return (
    <ModalAttendanceBack>
      <ModalAttendanceContainer>
        <ModalAttendanceHeader>Посещаемость</ModalAttendanceHeader>
        <RoundButton onClick={closeModalAttendance}>
          <FontAwesomeIcon icon="times" />
        </RoundButton>
        <UserListAttendanceByGroup>
          {pageState.userList.map((user) => (
            <UserAttendance key={user.id}>
              <UserDataForAttendance>
                <UserPicForAttendance src={user.userPic} />
                <UserNameForAttendance>
                  {user.lastName} {user.firstName}
                </UserNameForAttendance>
              </UserDataForAttendance>
              <UserAttendanceSelect>
                <CheckBoxWrapper>
                  <CheckBox id={String(user.id)} type="checkbox" />
                  <CheckBoxLabel htmlFor={String(user.id)} />
                </CheckBoxWrapper>
              </UserAttendanceSelect>
            </UserAttendance>
          ))}
        </UserListAttendanceByGroup>
        <SaveUsersAttendance>
          <CommonButton>Сохранить</CommonButton>
        </SaveUsersAttendance>
      </ModalAttendanceContainer>
    </ModalAttendanceBack>
  );
};

export default ModalAttendance;
