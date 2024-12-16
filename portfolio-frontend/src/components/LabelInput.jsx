import { useFormContext } from 'react-hook-form'; // 👈

export default function LabelInput({
  label,
  name,
  type,
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
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        className='form-control'
        {...rest}
      />
      {hasError ? (
        <div className='form-text text-danger' data-cy='label-input-error'>{errors[name].message}</div>
      ) : null}
    </div>
  );
}
