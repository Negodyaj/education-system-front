import './BaseGroupInfo.css';
import '../../../../App.css';

interface BaseGroupInfoProps {
  courseName?: string;
  startDate?: string;
  duration?: number;
}

function BaseGroupInfoComponent(props: BaseGroupInfoProps) {
  const { courseName, startDate, duration } = props;

  return (
    <div className="base-info">
      <div className="title">Курс:</div>
      <div className="info">{courseName}</div>
      <div className="title">Дата начала: </div>
      <div className="info">{startDate}</div>
      <div className="title">Длительность: </div>
      <div className="info">{duration}</div>
      <div className="title"> Расписание:</div>
    </div>
  );
}

export default BaseGroupInfoComponent;
