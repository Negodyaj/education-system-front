import { WretcherError } from 'wretch';

export const tryGetErrorFromResponse = (response: any) => {
  if (!!response.status && !!response.text)
    return { ...response } as WretcherError;

  return undefined;
};
