import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { homeworkUrl } from "../../../../shared/consts";
import { RoundButton } from "../../../../shared/styled-components/buttonStyledComponent";
import { getAttemptListToCheck } from "../../../../store/homework-attempt/thunk";

function HomeworkCheckButton(props: {
    hwId: number;
}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const checkOnClick = () => {
        history.push(`${homeworkUrl}/${props.hwId}/attempts`)
    }
    return (
        <RoundButton title="проверить" onClick={checkOnClick}>
            <FontAwesomeIcon icon="spell-check" />
        </RoundButton>
    )
}
export default HomeworkCheckButton;