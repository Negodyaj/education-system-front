import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import ListHeaderVerticalNarrow from "./ListHeaderVerticalNarrow";
import ListHeaderWide from "./ListHeaderWide";
import UserListBodyVerticalNarrow from "./UserListBodyVerticalNarrow";
import UserListBodyWide from "./UserListBodyWide";

function UserListComponent() {
    type modeValues = "mobile" | "desktop";
    const [mode, setMode] = useState<modeValues>(window.innerWidth > 900 ? "desktop" : "mobile");
    useEffect(() => {
        window.addEventListener("resize", (e) => resizeHandler(e));
    }, [])
    const resizeHandler = (ev?: UIEvent) => {
        window.innerWidth > 900
            ?
            setMode("desktop")
            :
            setMode("mobile")
    }
    const appState = useSelector((state: IRootState) => state);
    return (
        appState.userListPage.isDataLoading
            ?
            <div>LOADING</div>
            :
            mode === "desktop"
                ?
                <div className="user-list">
                    <ListHeaderWide />
                    <UserListBodyWide></UserListBodyWide>
                </div>
                :
                <div className="narrow-user-list">
                    <ListHeaderVerticalNarrow />
                    <UserListBodyVerticalNarrow />
                </div>

    )
}
export default UserListComponent;