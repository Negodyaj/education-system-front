import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { getGroupToViewById } from "../../store/group-page/thunk";
import BaseGroupInfoComponent from "./base-group-info-component/BaseGroupInfoComponent";
import "./GroupPage.css"


function GroupPage() {
  const dispatch = useDispatch();
  const groupPageState = useSelector((state: IRootState) => state.groupPage)

  useEffect(() => {
    dispatch(getGroupToViewById(15))
  }, []);


  return (
    <div>
      <div className="group-header"> Nav menu component</div>
      <div className="group-body">
        <div>
          <BaseGroupInfoComponent courseName={groupPageState.groupToView?.course.name}
            startDate={groupPageState.groupToView?.startDate}
            duration={groupPageState.groupToView?.course.duration} />
        </div>
        <div> List component </div>
      </div>
    </div>
  )
}

export default GroupPage;