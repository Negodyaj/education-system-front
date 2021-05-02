import './NewCourse.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { showToggleModalCreateCourseAction } from '../../store/courses-page/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../store/courses-page/thunk';
import FormElement from '../../shared/components/form-elements/FormElement';
import { InputNames } from '../../enums/inputNames';
import { IRootState } from '../../store';
import { CourseInput } from '../../interfaces/CourseInput';
import { getFormElementSettings } from '../../shared/helpers/useFormRegisterSettingByKey';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function NewCourse() {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    const { register, formState, handleSubmit, getValues, setValue, ...methods } = useForm<CourseInput>();

    const closeModalWindow = () => {
        dispatch(showToggleModalCreateCourseAction());
    }

    const createDataNewCourse = (dataNewCourse: CourseInput) => {
        dispatch(createCourse(dataNewCourse)) 
    }

    const onSubmit = (dataCourse: CourseInput) => {
        createDataNewCourse(dataCourse);
        console.log(dataCourse);
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
                <FormProvider
                    register={register}
                    formState={formState}
                    handleSubmit={handleSubmit}
                    getValues={getValues} setValue={setValue} {...methods}>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            Object.keys(appState.coursePage.createCourseInputModel).map(key => {
                                   return <FormElement key={key} formElementSettings={getFormElementSettings(key as InputNames)}></FormElement>
                            })
                        }
                        </form>
                    </div>
                </FormProvider>
                <div className="select-delete">
                    <button className="button-select" onClick={closeModalWindow}>Отменить</button>
                    <button className="button-select" onClick={handleSubmit(onSubmit)}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default NewCourse;