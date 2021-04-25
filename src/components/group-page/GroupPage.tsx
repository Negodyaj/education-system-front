import { useParams } from "react-router";
import "./GroupPage.css"


function GroupPage () {
    const { id } = useParams<{ id: string }>();

    return(
        <div>
            <h3>{`Group ${+id}`}</h3>
            <div className = "group-header"> Nav menu component</div>
            <div className="group-body">
            <div> base info component </div>
            <div> List component </div>
            </div>
        </div>
    )
}

export default GroupPage;