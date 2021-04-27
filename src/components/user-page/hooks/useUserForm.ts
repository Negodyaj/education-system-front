import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { UserInput } from '../../../interfaces/UserInput';
 
export function useUserForm() {
  const methods = useForm<UserInput>();
 
  const onSubmit = useCallback((formValues: UserInput) => {
    console.log(formValues);
  }, []);
 
  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit)
  }
}