import './BaseGroupInfo.css'
import '../../../../App.css'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store'



export function BaseGroupInfoComponent(){
    const groupState = useSelector((state: IRootState) => state.groupInfoComponent)
    return(
        <div className='base-info'>
        <div className='title'>Курс:</div>
        <div className='info'>{groupState.groupToView.course?.name}</div>
        <div className='title'>Дата начала: </div>
        <div className='info'>{groupState.groupToView.startDate}</div>
        <div className='title'>Длительность: </div>
        <div className='info'>{groupState.groupToView.course?.duration}</div>
        <div className='title'> Расписание:</div>
        </div>
    )
}

export default BaseGroupInfoComponent