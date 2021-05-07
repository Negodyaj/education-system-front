import './BaseGroupInfo.css';
import '../../../../App.css';

interface BaseGroupInfoProps {
  courseName?: string;
  startDate?: string;
  duration?: number;
}

export function BaseGroupInfoComponent(props: BaseGroupInfoProps) {
  return (
    <div className="base-info">
      <div className="title">Курс:</div>
      <div className="info">{props.courseName}</div>
      <div className="title">Дата начала: </div>
      <div className="info">{props.startDate}</div>
      <div className="title">Длительность: </div>
      <div className="info">{props.duration}</div>
      <div className="title"> Расписание:</div>
    </div>
  );
}

export default BaseGroupInfoComponent;
