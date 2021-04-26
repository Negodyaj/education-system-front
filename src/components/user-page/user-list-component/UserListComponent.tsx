import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Role } from "../../../enums/role";
import { getEnToRuTranslation } from "../../../shared/converters/enumToDictionaryEntity";
import PaymentForm from "../payment-form/PaymentForm";

import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import ListHeader from "./ListHeader";
import UserListBodyWide from "./UserListBodyWide";

function UserListComponent() {

    const appState = useSelector((state: IRootState) => state);
    return (
        appState.userListPage.isDataLoading
            ?
            <div>LOADING</div>
            :
            <>
                <div className="user-list">
                    <ListHeader />
                    <UserListBodyWide></UserListBodyWide>
                </div>
            </>
    )
}

export default UserListComponent;