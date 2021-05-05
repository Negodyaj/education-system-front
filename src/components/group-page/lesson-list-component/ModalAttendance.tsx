import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { setIsOpenModalAttendance } from "../../../store/group-page/lesson/action-creators";
import { getUsers } from "../../../store/user-list-page/thunk";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper, CommonButton, ModalAttendanceBack, ModalAttendanceContainer, ModalAttendanceHeader, RoundButton, SaveUsersAttendance, UserAttendance, UserAttendanceSelect, UserDataForAttendance, UserListAttendanceByGroup, UserNameForAttendance, UserPicForAttendance } from "./ModalAttendanceStyled";

const ModalAttendance = () => {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.userListPage);

    const closeModalAttendance = () => {
        dispatch(setIsOpenModalAttendance());
    }

    useEffect(() => {
        dispatch(getUsers());
        console.log(pageState.userList);
    }, [])

    return(
        <ModalAttendanceBack>
            <ModalAttendanceContainer>
                <ModalAttendanceHeader>Посещаемость</ModalAttendanceHeader>
                <RoundButton onClick={closeModalAttendance}>
                    <FontAwesomeIcon icon='times' />
                </RoundButton>
                <UserListAttendanceByGroup>
                    {
                        pageState.userList.map(user => (
                            <UserAttendance key={user.id}>
                                <UserDataForAttendance>
                                    <UserPicForAttendance src={user.userPic}></UserPicForAttendance>
                                    <UserNameForAttendance>{user.lastName} {user.firstName}</UserNameForAttendance>
                                </UserDataForAttendance>
                                <UserAttendanceSelect>
                                    <CheckBoxWrapper>
                                        <CheckBox id={String(user.id)} type="checkbox" />
                                        <CheckBoxLabel htmlFor={String(user.id)} />
                                    </CheckBoxWrapper>
                                </UserAttendanceSelect> 
                            </UserAttendance>
                        ))
                    }
                </UserListAttendanceByGroup>
                <SaveUsersAttendance>
                    <CommonButton>
                        Сохранить
                    </CommonButton>
                </SaveUsersAttendance>
            </ModalAttendanceContainer>
        </ModalAttendanceBack>
    )
}

export default ModalAttendance;