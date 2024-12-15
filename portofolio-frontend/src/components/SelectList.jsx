import { useFormContext } from 'react-hook-form'; // 👈

export default function SelectList({
  label,
  name,
  options,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext(); // 👈

  const hasError = name in errors;

  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <select
        {...register(name, validationRules)}
        id={name}
        className='form-control'
        disabled={isSubmitting}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className='form-text text-danger' data-cy='select-input-error'>{errors[name].message}</div>
      ) : null}
    </div>
  );
}
