import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, NumberInput, FormErrorMessage, NumberInputField } 
  from '@chakra-ui/react';

export default function LabelInput({
  mb,
  label,
  name,
  validationRules,
  placeholder,
  min,
  max,
  step,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <FormControl isInvalid={hasError} mb={mb}>
      <FormLabel>{label}</FormLabel>
      <NumberInput min={min} max={max} step={step}>
        <NumberInputField
          {...register(name, validationRules)}
          disabled={isSubmitting}
          placeholder={placeholder}
          {...rest}
        />
      </NumberInput>
      {hasError ? (
        <FormErrorMessage data-cy='label-input-error'>   
          {errors[name].message}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
