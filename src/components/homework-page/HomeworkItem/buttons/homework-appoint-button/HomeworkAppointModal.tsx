import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputNames } from '../../../../../enums/inputNames';
import { AppointInput } from '../../../../../interfaces/AppointInput';
import FormElement from '../../../../../shared/components/form-elements/FormElement';
import { getAppointFormElementSettings } from '../../../../../shared/helpers/appointFormRegisterSettingsByKey';
import {
  CommonButton,
  RoundButton,
} from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import { getGroupsByTeacherId } from '../../../../../store/homework-page/homework-appoint-modal/thunk';
import {
  AppointModalWindow,
  AppointModalWindowFooter,
  AppointModalWindowHeader,
  AppointModalWindowMain,
  ModalBg,
} from '../../../styled-components/consts';

function HomeworkAppointModal(props: {
  visibility: boolean;
  setVisibility: (value: boolean) => void;
}) {
  const { visibility, setVisibility } = props;
  const { currentUserRoleId } = useSelector(
    (state: IRootState) => state.roleSelector
  );
  const { appointFormDefaults } = useSelector(
    (state: IRootState) => state.homeworkAppointModal
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupsByTeacherId(currentUserRoleId));
  }, []);
  const onSubmit = (data: AppointInput) => {
    // dispatch(postAppointment(data))
  };
  const { ...methods } = useForm<AppointInput>();

  return (
    <FormProvider {...methods}>
      <ModalBg elementVisibility={visibility}>
        <AppointModalWindow elementVisibility={visibility}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AppointModalWindowHeader>
              <RoundButton onClick={() => setVisibility(!visibility)}>
                <FontAwesomeIcon icon="times" />
              </RoundButton>
            </AppointModalWindowHeader>
            <AppointModalWindowMain>
              {Object.keys(appointFormDefaults).map((key) => (
                <FormElement
                  formElementSettings={getAppointFormElementSettings(
                    key as InputNames
                  )}
                  key={key}
                />
              ))}
            </AppointModalWindowMain>
            <AppointModalWindowFooter>
              <CommonButton
                as="button"
                type="submit"
                onClick={() => setVisibility(!visibility)}>
                Назначить
              </CommonButton>
              <CommonButton onClick={() => setVisibility(!visibility)}>
                Отмена
              </CommonButton>
            </AppointModalWindowFooter>
          </form>
        </AppointModalWindow>
      </ModalBg>
    </FormProvider>
  );
}
export default HomeworkAppointModal;
