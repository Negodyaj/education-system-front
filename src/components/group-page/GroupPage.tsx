import "./GroupPage.css"
import TeacherGroupList from "./teacher-group-list/TeacherGroupList"


function GroupPage () {

  
    return(
        <div>
          <div className = "group-header"> Nav menu component</div>
          <div className="group-body">
          <div className='base-info'> base info component </div>
          <div> 
            <TeacherGroupList/>
             </div>
          </div>
        </div>
    )
}

export default GroupPage;