import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { pushNotification } from '../notifications/action-creators';

export function constructSuccessNotification(message: string) {
  return pushNotification(makeNotification('success', message));
}
