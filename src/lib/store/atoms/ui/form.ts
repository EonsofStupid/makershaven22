import { atom } from 'jotai';
import { formErrorsAtom, formDirtyAtom, formSubmittingAtom } from './index';

export const useFormState = () => {
  const [errors, setErrors] = atom(formErrorsAtom);
  const [isDirty, setIsDirty] = atom(formDirtyAtom);
  const [isSubmitting, setIsSubmitting] = atom(formSubmittingAtom);

  return {
    errors,
    setErrors,
    isDirty,
    setIsDirty,
    isSubmitting,
    setIsSubmitting,
    resetForm: () => {
      setErrors({});
      setIsDirty(false);
      setIsSubmitting(false);
    }
  };
};