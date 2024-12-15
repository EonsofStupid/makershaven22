import { atom } from 'jotai';

export interface FormState {
  errors: Record<string, string>;
  isDirty: boolean;
  isSubmitting: boolean;
}

export const formStateAtom = atom<FormState>({
  errors: {},
  isDirty: false,
  isSubmitting: false
});

export const useFormState = () => {
  const [formState, setFormState] = atom(formStateAtom);

  return {
    ...formState,
    setErrors: (errors: Record<string, string>) => 
      setFormState(prev => ({ ...prev, errors })),
    setDirty: (isDirty: boolean) => 
      setFormState(prev => ({ ...prev, isDirty })),
    setSubmitting: (isSubmitting: boolean) => 
      setFormState(prev => ({ ...prev, isSubmitting })),
    reset: () => setFormState({
      errors: {},
      isDirty: false,
      isSubmitting: false
    })
  };
};