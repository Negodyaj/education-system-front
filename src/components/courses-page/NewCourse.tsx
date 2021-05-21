import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { showToggleModalCreateCourseAction } from '../../store/courses-page/action-creators';
import { createCourse } from '../../store/courses-page/thunk';
import { IRootState } from '../../store';
import { CourseInput } from '../../interfaces/CourseInput';
import { getCourseFormElementSettings } from '../../shared/helpers/courseFormRegisterSettingByKey';
import ModalWindowCreateForm from '../../shared/components/modal-window/ModalWindowCreateForm';

function NewCourse() {
  const dispatch = useDispatch();
  const appState = useSelector(
    (state: IRootState) => state.coursePage.createCourseInputModel
  );
  const formCourse = useForm<CourseInput>();

  const closeModalWindow = () => {
    dispatch(showToggleModalCreateCourseAction());
  };

  const createDataNewCourse = (dataNewCourse: CourseInput) => {
    dispatch(createCourse(dataNewCourse));
  };

  const onSubmit = (dataCourse: CourseInput) => {
    createDataNewCourse(dataCourse);
  };

  return (
    <ModalWindowCreateForm
      form={formCourse}
      closeHandler={closeModalWindow}
      onSubmit={onSubmit}
      headerName="Создать курс"
      objectKeysOnForm={appState}
      createFormElementOnType={getCourseFormElementSettings}
    />
  );
}

export default NewCourse;
