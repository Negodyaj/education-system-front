// interface HomeworkRowProps {
//     RoleId: number;
//     Course: string;
//     Group?: string;
//     Themes?: string[];
//     HomeworkObject: Homework;
//     onDeleteClick: () => void;
// }

function DrawHomework(/* props: HomeworkRowProps */) {
  // let blueButtonText: string = "редактировать";

  // if (props.RoleId === 6) {
  //     blueButtonText = "проверить";
  // }

  // const onDeleteClick = () => {
  //     props.onDeleteClick();
  // }
  // const [appointStatus, setAppointStatus] = useState("btn-danger");
  // const [appointButtonText, setAppointButtonText] = useState("назначить");
  // const appointOnClickHandler = () => {
  //     if (appointStatus === "") {
  //         setAppointStatus("btn-danger");
  //         setAppointButtonText("назначить")
  //     }
  //     else {
  //         setAppointStatus("");
  //         setAppointButtonText("назначено");
  //     }
  // }
  return (
    // <div className="row align-items-start table-row">
    //     <div className="col">{props.Course}</div>
    //     {
    //         props.RoleId == 6 && <div className="col">{props.Group}</div>
    //     }
    //     <div className="col">
    //     {
    //         props.Themes?.map(theme => (theme + " "))
    //     }
    //     </div>
    //     {
    //         props.RoleId == 6 &&
    //             <div className="col">
    //                 <button
    //                     type="button"
    //                     className={"btn btn-success " + (appointStatus) + " appoint"}
    //                     onClick={appointOnClickHandler}>
    //                         {appointButtonText}
    //                 </button>
    //             </div>
    //     }
    //     <div className="col">
    //         <button type="button" className="btn btn-primary" id="check-answer">{blueButtonText}</button>
    //     </div>
    //     <div className="col">теги</div>
    //     <div className="col">
    //         <button className="delete-button" onClick={onDeleteClick}>удалить</button>
    //     </div>
    // </div>
    <></>
  );
}

export default DrawHomework;
