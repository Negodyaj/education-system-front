import "./GroupPage.css"
import  GroupMembersList  from "./group-members-list/GroupMembersList"
import React from "react";


function GroupPage () {

  
    return(
        <div>
          <div className = "group-header"> Nav menu component</div>
          <div className="group-body">
          <div className='base-info'> base info component </div>
          <div> 
            <GroupMembersList/>
             </div>
          </div>
        </div>
    )
}

export default GroupPage;