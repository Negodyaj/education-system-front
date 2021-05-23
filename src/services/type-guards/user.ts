import { User } from '../../interfaces/User';

export const isUser = (data: any): data is User =>
  !Array.isArray(data) && !!data.email && !!data.phone;
