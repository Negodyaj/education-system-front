import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import BaseGroupInfoComponent from "./base-group-info-component/BaseGroupInfoComponent";

function GroupInfoComponent() {
    const dispatch = useDispatch();
    const groupInfoComponentState = useSelector((state: IRootState) => state.groupInfoComponent)
  
    useEffect(() => {
      dispatch(getGroupToViewById(15))
    }, []);
  
  
    return (
      <div>
        <div className="group-header"> Nav menu component</div>
        <div className="group-body">
          <div>
            <BaseGroupInfoComponent courseName={groupInfoComponentState.groupToView?.course.name}
              startDate={groupInfoComponentState.groupToView?.startDate}
              duration={groupInfoComponentState.groupToView?.course.duration} />
          </div>
          <div> List component </div>
        </div>
      </div>
    )
  }
  
  export default GroupInfoComponent;