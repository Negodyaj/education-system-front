import { WretcherError } from 'wretch';

import { WRONG_DATA_STATUS } from '../../services/http.service';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { pushNotification } from '../notifications/action-creators';

const ERROR_MESSAGE = JSON.stringify({ message: 'Ошибка' });

export function constructNotificationError(error: WretcherError) {
  return pushNotification(
    makeNotification(
      'error',
      error.status === WRONG_DATA_STATUS
        ? 'неверные данные'
        : `${error.status} ${JSON.parse(error.text || ERROR_MESSAGE).Message}`
    )
  );
}
