import { IRootState } from '../..';

export const getHomeworkForAppointmentSelector = (state: IRootState) =>
  state.homeworkAppointModal.homeworkForAppointment;
