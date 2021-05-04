import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import BaseGroupInfoComponent from "./base-group-info-component/BaseGroupInfoComponent";
import '../../../App.css'
import './GroupInfoComponent.css'
import GroupMembersList from "./group-members-list/GroupMembersList";
import { useEffect } from "react";

function GroupInfoComponent() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGroupToViewById(14))
    }, []);
  
  
    return (
      <div>
        <div className="group-header"> Nav menu component</div>
        <div className="group-body">
          <div>
            <BaseGroupInfoComponent />
          </div>
          <div> 
            <GroupMembersList />
             </div>
        </div>
      </div>
    )
  }
  
  export default GroupInfoComponent;