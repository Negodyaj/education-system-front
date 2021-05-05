import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";
import { deleteHomeworkRequest } from "../../../../../store/homework-page/action-creators";


function HomeworkDeleteButton(props: { homeworkId: number }) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const dispatch = useDispatch();
    const deleteOnClick = () => {
        setModalVisibility(true)
    }
    const deleteHomework = () => {
        dispatch(deleteHomeworkRequest(props.homeworkId))
        setModalVisibility(false)
    }
    return (
        <React.Fragment>
            <RoundButton title="удалить" onClick={deleteOnClick}>
                <FontAwesomeIcon icon="trash" />
            </RoundButton>
            <ConfirmationDialog
                callback={deleteHomework}
                isShown={modalVisibility}
                confirmLabel="Да"
                declineLabel="Нет"
                message="Вы действительно хотите удалить домашнюю работу?"
                title="Удаление домашней работы"></ConfirmationDialog>
        </React.Fragment>
    )
}
export default HomeworkDeleteButton;