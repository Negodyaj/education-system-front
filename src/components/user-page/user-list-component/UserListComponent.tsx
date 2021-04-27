import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import ListHeader from "./ListHeader";
import UserListBodyVerticalNarrow from "./UserListBodyVerticalNarrow";
import UserListBodyWide from "./UserListBodyWide";

type modeValues = "mobile" | "desktop";
function UserListComponent() {
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
                    <ListHeader />
                    <UserListBodyWide></UserListBodyWide>
                </div>
                :
                <UserListBodyVerticalNarrow />

    )
}
export default UserListComponent;