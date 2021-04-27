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
    const state = useSelector((state: IRootState) => state.groupInfoComponent)
  
    useEffect(() => {
      dispatch(getGroupToViewById(14))
    }, []);
  
  
    return (
      <div>
        <div className="group-header"> Nav menu component</div>
        <div className="group-body">
          <div>
            <BaseGroupInfoComponent courseName={state.groupToView.course?.name}
              startDate={state.groupToView.startDate}
              duration={state.groupToView.course?.duration} />
          </div>
          <div> 
            <GroupMembersList students= {state.groupToView.students}
            teachers={state.groupToView.teachers}
            tutors={state.groupToView.tutors} />
             </div>
        </div>
      </div>
    )
  }
  
  export default GroupInfoComponent;