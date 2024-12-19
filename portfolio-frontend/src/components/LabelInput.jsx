import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage } 
  from '@chakra-ui/react';

export default function LabelInput({
  mb,
  label,
  name,
  type,
  validationRules,
  placeholder,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <FormControl isInvalid={hasError} mb={mb}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={isSubmitting}
        {...rest}
        {...register(name, validationRules)}
      />
      {hasError ? (
        <FormErrorMessage data-cy='label-input-error'>{errors[name].message}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
