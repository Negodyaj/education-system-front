import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { showToggleModalCreateCourseAction } from '../../store/courses-page/action-creators';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../store/courses-page/thunk';
import { useForm } from 'react-hook-form';

export interface DataNewCourse { 
    name: string; 
    description: string;
    duration: number
}

function NewCourse() {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit} = useForm<DataNewCourse>({
        defaultValues:
        {
            name: undefined,
            description: undefined,
            duration: 1
        }
    });

    const closeModalWindow = () => {
        dispatch(showToggleModalCreateCourseAction());
    }

    const showDataNewCourse = (dataNewCourse: DataNewCourse) => {
        dispatch(createCourse(dataNewCourse)) 
    }

    const onSubmit = (dataCourse: DataNewCourse) => {
        showDataNewCourse(dataCourse);
    }

    return(
        <div className="modal-back">
            <div className="modal-add-course">
                <div className="modal-header-add-course">
                    <div className="head-modal"><h4>Создать новый курс</h4></div>
                    <button className="button-close" onClick={closeModalWindow}>
                        <FontAwesomeIcon icon='times'/>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="create-course">
                        <div className='new-course-header'>Название курса</div>
                        <div className="course-data">
                            <input
                                {...register('name', {
                                    required: true,
                                    minLength: 2
                                })}
                                type="text"
                                className="course-name"
                                placeholder='Введите название курса'
                            />
                        </div>
                        { errors.name ? <div className="error-no-name">Заполните данное поле</div> : <div></div> }
                        <div className='new-course-header'>Описание курса</div>
                        <div className="course-data">
                            <textarea
                                {...register('description', {
                                    required: true,
                                    minLength: 2
                                })}
                                className="course-description"
                                placeholder="Введите описание курса"
                            />
                        </div>
                        { errors.description ? <div className="error-no-description">Заполните данное поле</div> : <div></div>} 
                        <div className='new-course-header'>Продолжительность курса</div>
                        <div className="course-data">
                            <input
                                {...register('duration', {
                                    required: true,
                                })}
                                type="number"
                                className="course-duration"
                            />
                            <div className="duration-course-text">месяца(ов)</div>
                        </div>
                    </div>
                </form>
                <div className="select-delete">
                    <button className="button-select" onClick={closeModalWindow}>Отменить</button>
                    <button className="button-select" onClick={handleSubmit(onSubmit)}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default NewCourse;