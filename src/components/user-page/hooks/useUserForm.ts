import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { UserInput } from '../../../interfaces/UserInput';
import { INIT_USER_TO_REGISTER } from '../../../store/user-page/reducers';
 
export function useUserForm() {
  const methods = useForm<UserInput>({defaultValues:INIT_USER_TO_REGISTER});
 
  const onSubmit = useCallback((formValues: UserInput) => {
    console.log(formValues);
  }, []);
 
  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit)
  }
}