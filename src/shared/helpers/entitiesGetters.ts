import { useSelector } from 'react-redux';

import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import { IRootState } from '../../store';

export type EntitiesGetter = () => DictionaryEntity[];

export const useGetGroupEntities = () =>
  useSelector((state: IRootState) => state.homeworkAppointModal.groupEntities);

export const useGroupsWithAttemptsForCurrentTeacher = () =>
  useSelector((state: IRootState) => state.homeworkAttempt.currentHomework);

export const useContractNumberForUser = () =>
  useSelector(
    (state: IRootState) => state.payment.userForPayment?.contractNumber
  );
