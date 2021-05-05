import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IRootState } from "../../../store";
import { ButtonCloseModalAddLesson, FormWrapper, HeadModalLesson, InputStyle, ModalAddLesson, ModalBackLesson, ModalHeaderAddLesson, SelectAddLessonOrCancel } from "./NewLessonStyled";
import FormElement from "../../../shared/components/form-elements/FormElement";
import { getFormElementSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { InputNames } from "../../../enums/inputNames";
import { setIsOpenModalAddLesson } from "../../../store/group-page/lesson/action-creators";
import { LessonInput } from "../../../interfaces/LessonInput";
import { createLesson } from "../../../store/group-page/lesson/thunk";


const NewLesson = () => {

    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState) => state)
    const { register, formState, handleSubmit, getValues, setValue, ...methods } = useForm<LessonInput>();

    const closeModalAddLesson = () => {
        dispatch(setIsOpenModalAddLesson());
    }

    const createDataNewLesson = (dataNewLesson: LessonInput) => {
        dispatch(createLesson(dataNewLesson)) 
    }

    const onSubmit = (dataLesson: LessonInput) => {
        createDataNewLesson(dataLesson);
        console.log(dataLesson);
    }

    const getThemesForAddLesson = () : string[] => {
        let nameThemes = appState.courseEditionPage.themes.map(theme => (theme.name));
        return nameThemes;
    }

    return(
        <ModalBackLesson>
            <ModalAddLesson>
                <ModalHeaderAddLesson>
                    <HeadModalLesson><h4>Запланировать занятие</h4></HeadModalLesson>
                    <ButtonCloseModalAddLesson onClick={closeModalAddLesson}>
                        <FontAwesomeIcon icon='times'/>
                    </ButtonCloseModalAddLesson>
                </ModalHeaderAddLesson>
                <FormProvider
                    register={register}
                    formState={formState}
                    handleSubmit={handleSubmit}
                    getValues={getValues}
                    setValue={setValue}
                    {...methods}>
                    
                    <FormWrapper>
                        <InputStyle onSubmit={handleSubmit(onSubmit)}>
                        {
                            Object.keys(appState.lessonByGroup.createLessonInputModel).map(key => {
                                   return <FormElement key={key} formElementSettings={getFormElementSettings(key as InputNames)}></FormElement>
                            })
                        }
                        </InputStyle>
                    </FormWrapper>
                </FormProvider>
                <SelectAddLessonOrCancel>
                    <button className="common-button" onClick={closeModalAddLesson}>Отменить</button>
                    <button className="common-button" onClick={handleSubmit(onSubmit)}>Добавить</button>
                </SelectAddLessonOrCancel>
            </ModalAddLesson>
        </ModalBackLesson>
    )
}

export default NewLesson;

