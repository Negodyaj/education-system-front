import { useState } from 'react';
import { Homework } from '../../../interfaces/Homework';
import './HomeworkRow.css';

interface HomeworkAttributes{
    Course:string;
    Group:string;
    Themes:string[];
    HomeworkObject:Homework;
}



function DrawHomework(attributes:HomeworkAttributes) {
    const [appointStatus, setAppointStatus] = useState("btn-danger");
    const [appointButtonText, setAppointButtonText] = useState("назначить");
    const appointOnClickHandler = () => {
        if (appointStatus===""){
        setAppointStatus("btn-danger");
        setAppointButtonText("назначить")}
        else {setAppointStatus("");
        setAppointButtonText("назначено");}
    } 
    return (<div className="row align-items-start table-row">
        <div className="col">
            {attributes.Course}
        </div>
        <div className="col">
            {attributes.Group}
        </div>
        <div className="col">
            {attributes.Themes.map(theme=>(theme+" "))}
        </div>
        <div className="col">
            <button type="button" className={"btn btn-success " + (appointStatus) +" appoint"} onClick={appointOnClickHandler}>{appointButtonText}</button>
        </div>
        <div className="col">
            <button type="button" className="btn btn-primary" id="check-answer">проверить</button>
        </div>
        <div className="col">
            теги
        </div>
        <div className="col">
            <button className="delete-button">удалить</button>
        </div></div>)
}

export default DrawHomework;