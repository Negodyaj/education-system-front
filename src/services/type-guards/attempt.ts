import { Attempt } from '../../interfaces/Attempt';

export const isAttempt = (data: any): data is Attempt => {
  if (data)
    return (
      !!data[0].id &&
      !!data[0].comment &&
      !!data[0].author &&
      !!data[0].homeworkAttemptStatus
    );

  return false;
};
