import { Homework } from '../../../interfaces/Homework';
import './HomeworkRow.css';

interface HomeworkAttributes{
    Course:string;
    Group:string;
    Themes:string[];
    HomeworkObject:Homework;
}

function DrawHomework(attributes:HomeworkAttributes) {
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
            <button type="button" className="btn btn-success btn-danger appoint">назначить</button>
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