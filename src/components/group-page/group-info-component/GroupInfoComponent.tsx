import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getGroupToViewById } from "../../../store/group-info-component/thunk";
import BaseGroupInfoComponent from "./base-group-info-component/BaseGroupInfoComponent";
import '../../../App.css'
import './GroupInfoComponent.css'

function GroupInfoComponent() {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
  
    useEffect(() => {
      dispatch(getGroupToViewById(14))
    }, []);
  
  
    return (
      <div>
        <div className="group-header"> Nav menu component</div>
        <div className="group-body">
          <div>
            <BaseGroupInfoComponent courseName={appState.groupInfoComponent.groupToView?.course.name}
              startDate={appState.groupInfoComponent.groupToView?.startDate}
              duration={appState.groupInfoComponent.groupToView?.course.duration} />
          </div>
          <div> List component </div>
        </div>
      </div>
    )
  }
  
  export default GroupInfoComponent;