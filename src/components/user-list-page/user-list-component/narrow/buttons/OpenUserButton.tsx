import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronArrow } from "../../../../../shared/styled-components/ChevronArrow";
import { ACTIVE, NOT_ACTIVE } from "../../../../../shared/styled-components/consts";
import { IRootState } from "../../../../../store";
import { openListItem } from "../../../../../store/user-list-page/action-creators";

function OpenUserButton(props: { userId: number }) {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state);
    const arrowOnClick = (id: number) => {
        dispatch(openListItem(appState.userListPage.openedItemId === id ? 0 : id))
    }
    return (
        <ChevronArrow
            onClick={() => arrowOnClick(props.userId)}
            className={appState.userListPage.openedItemId === props.userId ? ACTIVE : NOT_ACTIVE} />
    )
}
export default OpenUserButton;