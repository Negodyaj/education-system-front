import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { getGroupToViewById } from "../../store/group-page/thunk";
import BaseGroupInfoComponent from "./group-info-component/base-group-info-component/BaseGroupInfoComponent";
import "./GroupPage.css"


function GroupPage() {
  const dispatch = useDispatch();
  const groupPageState = useSelector((state: IRootState) => state.groupPage)

  useEffect(() => {
    dispatch(getGroupToViewById(15))
  }, []);
const isModeOn: boolean= false

  return (
    <div>
{
  isModeOn ?
  <div></div>:
  <GroupInfoComponent />
}
    </div>
  )
}

export default GroupPage;