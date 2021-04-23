import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import GroupInfoComponent from "./group-info-component/GroupInfoComponent";
import "./GroupPage.css"


function GroupPage() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state)

  useEffect(() => {
    //dispatch(getGroupToViewById(15))
  }, []);


  return (
    <div>
{ (appState.roleSelector.currentUserRoleId === 1 || appState.roleSelector.currentUserRoleId === 2)
  ?
  <div>GroupListComponent for Admin and Manager</div>
  :
  <GroupInfoComponent />
}
    </div>
  )
}

export default GroupPage;