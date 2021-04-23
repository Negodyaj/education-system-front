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
const isRoleManagerModeOn: boolean= false

  return (
    <div>
{
  isRoleManagerModeOn?
  <div>GroupListComponent for Admin and Manager</div>
  :
  <GroupInfoComponent />
}
    </div>
  )
}

export default GroupPage;