// src/components/transactions/AandeelForm.jsx
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';

export default function AandeelForm({ account , saveAccount }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: account?.email,
      rijksregisterNummer: Number(account?.rijksregisterNummer),
      voornaam: account?.voornaam,
      achternaam: account?.achternaam,
      adres: {
        straat: account?.adres.straat,
        huisNummer: account?.adres.huisNummer,
        stad: account?.adres.stad,
        land: account?.adres.land,
      },
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) {
      return;
    }
  
    await saveAccount({
      id: account?.id,  // Pass the account id if editing, or omit it for a new account
      ...values,
      rijksregisterNummer: Number(values.rijksregisterNummer),
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/aandelen'),
    });
  };
  
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
            label='Email'
            name='email'
            type='text'
          />
          <LabelInput
            label='Rijksregister nummer'
            name='rijksregisterNummer'
            type='number'
          />
          <LabelInput
            label='Voornaam'
            name='voornaam'
            type='text'
          />
          <LabelInput
            label='Achternaam'
            name='achternaam'
            type='text'
          />
          <LabelInput
            label='Straat'
            name='adres.straat'
            type='text'
          />
          <LabelInput
            label='Huisnummer'
            name='adres.huisNummer'
            type='text'
          />
          <LabelInput
            label='Stad'
            name='adres.stad'
            type='text'
          />
          <LabelInput
            label='Land'
            name='adres.land'
            type='text'
          />
          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                Save changes
              </button>
              <Link
                disabled={isSubmitting}
                className='btn btn-light'
                to='/aandelen'
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
