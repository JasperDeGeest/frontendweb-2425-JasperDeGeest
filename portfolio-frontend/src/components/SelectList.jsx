import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';

export default function SelectList({
  mb,
  label,
  name,
  options,
  validationRules,
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
      <Select
        {...register(name, validationRules)}
        id={name}
        disabled={isSubmitting}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {hasError ? (
        <FormErrorMessage data-cy='select-input-error'>{errors[name].message}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}
