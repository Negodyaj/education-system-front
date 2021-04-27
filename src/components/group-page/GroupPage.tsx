import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import GroupInfoComponent from "./group-info-component/GroupInfoComponent";
import "./GroupPage.css"
import  GroupMembersList  from "./group-members-list/GroupMembersList"
import React from "react";


function GroupPage() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state)

  useEffect(() => {
    //dispatch(getGroupToViewById(15))
  }, []);


  return (
    <div>
{
  <GroupInfoComponent />
}
    </div>
  )
}

export default GroupPage;