import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { setIsOpenModalAttendance } from "../../../store/group-page/lesson/action-creators";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper, CommonButton, ModalAttendanceBack, ModalAttendanceContainer, ModalAttendanceHeader, RoundButton, SaveUsersAttendance, UserAttendance, UserAttendanceSelect, UserDataForAttendance, UserListAttendanceByGroup } from "./ModalAttendanceStyled";

const ModalAttendance = () => {

    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.lessonByGroup);

    const closeModalAttendance = () => {
        dispatch(setIsOpenModalAttendance());
    }

    return(
        <ModalAttendanceBack>
            <ModalAttendanceContainer>
                <ModalAttendanceHeader>Посещаемость</ModalAttendanceHeader>
                <RoundButton onClick={closeModalAttendance}>
                    <FontAwesomeIcon icon='times' />
                </RoundButton>
                <UserListAttendanceByGroup>
                    <UserAttendance>
                        <UserDataForAttendance>Студент1</UserDataForAttendance>
                        <UserAttendanceSelect>Выбор</UserAttendanceSelect> 
                    </UserAttendance>
                    <UserAttendance>
                        <UserDataForAttendance>Студент2</UserDataForAttendance>
                        <UserAttendanceSelect>Выбор</UserAttendanceSelect> 
                    </UserAttendance>
                    <UserAttendance>
                        <UserDataForAttendance>Студент3</UserDataForAttendance>
                        <UserAttendanceSelect>
                            <CheckBoxWrapper>
                                <CheckBox id="checkbox" type="checkbox" />
                                <CheckBoxLabel htmlFor="checkbox" />
                            </CheckBoxWrapper>
                        </UserAttendanceSelect> 
                    </UserAttendance>
                </UserListAttendanceByGroup>
                <SaveUsersAttendance>
                    <CommonButton>
                        Сохранить
                    </CommonButton>
                </SaveUsersAttendance>
            </ModalAttendanceContainer>
            {/* <div className="modal">
                <div className="modal-header-course-delete">
                    <button className="button-close-course-delete" onClick={closeModalWindow} >
                        <FontAwesomeIcon icon='times' />
                    </button>
                </div>
                <div className="modal-content-course-delete">Вы уверены, что хотите удалить данный курс?</div>
                <div className="modal-bottom-course-delete">
                    <button className="button-no" onClick={closeModalWindow}>Отмена</button>
                    <button className="button-yes" onClick={deleteCourseById}>Да</button>
                </div>
            </div> */}
        </ModalAttendanceBack>
    )
}

export default ModalAttendance;