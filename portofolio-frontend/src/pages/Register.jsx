import {
  useCallback, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider, useForm,
} from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';

export default function Register() {
  const {
    error, loading, register,
  } = useAuth();

  const navigate = useNavigate();

  const methods = useForm();
  const {
    getValues, handleSubmit, reset,
  } = methods;

  const handleCancel = useCallback(() => {
    reset();
    navigate('/login');
  }, [reset, navigate]);

  const handleRegister = useCallback(
    async ({
      email, password, onbelegdVermogen, rijksregisterNummer, voornaam, achternaam, straat, huisNummer, stad, land,
    }) => {
      const loggedIn = await register({
        email, password, onbelegdVermogen: Number(onbelegdVermogen), rijksregisterNummer: Number(rijksregisterNummer), 
        voornaam, achternaam, adres: { straat, huisNummer: huisNummer, stad, land },
      });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = useMemo(() => ({
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
    onbelegdVermogen: { required: 'Onbelegd Vermogen is required' },
    rijksregisterNummer: { required: 'Rijksregister Nummer is required' },
    voornaam: { required: 'Voornaam is required' },
    achternaam: { required: 'Achternaam is required' },
    straat: { required: 'Straat is required' },
    huisNummer: { required: 'Huisnummer is required' },
    stad: { required: 'Stad is required' },
    land: { required: 'Land is required' },
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit(handleRegister)}
      >
        <h1>Register</h1>

        <Error error={error} />

        <LabelInput
          label='Email'
          type='text'
          name='email'
          placeholder='your@email.com'
          validationRules={validationRules.email}
        />

        <LabelInput
          label='Password'
          type='password'
          name='password'
          validationRules={validationRules.password}
        />

        <LabelInput
          label='Confirm password'
          type='password'
          name='confirmPassword'
          validationRules={validationRules.confirmPassword}
        />

        <LabelInput
          label='Onbelegd Vermogen'
          type='number'
          name='onbelegdVermogen'
          validationRules={validationRules.onbelegdVermogen}
        />

        <LabelInput
          label='Rijksregister Nummer'
          type='number'
          name='rijksregisterNummer'
          validationRules={validationRules.rijksregisterNummer}
        />

        <LabelInput
          label='Voornaam'
          type='text'
          name='voornaam'
          validationRules={validationRules.voornaam}
        />

        <LabelInput
          label='Achternaam'
          type='text'
          name='achternaam'
          validationRules={validationRules.achternaam}
        />

        <LabelInput
          label='Straat'
          type='text'
          name='straat'
          validationRules={validationRules.straat}
        />

        <LabelInput
          label='Huisnummer'
          type='text'
          name='huisNummer'
          validationRules={validationRules.huisnummer}
        />

        <LabelInput
          label='Stad'
          type='text'
          name='stad'
          validationRules={validationRules.stad}
        />

        <LabelInput
          label='Land'
          type='text'
          name='land'
          validationRules={validationRules.land}
        />

        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              Register
            </button>

            <button
              type='button'
              className='btn btn-light'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}