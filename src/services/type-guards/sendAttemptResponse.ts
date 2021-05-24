import { SendAttemptResponse } from '../../interfaces/SendAttemptResponse';

export const isSendAttemptResponse = (
  data: any
): data is SendAttemptResponse => {
  if (data)
    return (
      !Array.isArray(data) &&
      !!data.id &&
      !!data.homeworkAttemptStatus &&
      !!data.author
    );

  return false;
};
