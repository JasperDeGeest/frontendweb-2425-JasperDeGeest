// src/components/transactions/AandeelForm.jsx
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import SelectList from '../SelectList';

//const validationRules = {
//};

const EMPTY_ACCOUNTAANDEEL = {
  aandeelId: undefined,
  aantal: undefined,
  aankoopPrijs: undefined,
  reden: '',
  geschatteDuur: '',
};

export default function AandeelForm({ aandelen = [], accountAandeel = EMPTY_ACCOUNTAANDEEL, saveAccountAandeel }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      aandeelId: accountAandeel?.aandeel?.id,
      aantal: accountAandeel?.aantal,
      aankoopPrijs: accountAandeel?.aankoopPrijs,
      reden: accountAandeel?.reden,
      geschatteDuur: accountAandeel?.geschatteDuur,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    await saveAccountAandeel({
      id: accountAandeel?.aandeelId,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/accounts/me/aandelen'),
    });
  };
  
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectList
            label='Aandeel'
            name='aandeelId'
            options={aandelen.map((aandeelId) => ({
              value: aandeelId.id,
              label: aandeelId.afkorting,
            }))}
            disabled={accountAandeel?.aandeel?.id}
          ></SelectList>
          <LabelInput
            label='Aantal'
            name='aantal'
            type='number'
          />
          <LabelInput
            label='Aankoopprijs'
            name='aankoopPrijs'
            type='number'
          />
          <LabelInput
            label='Reden'
            name='reden'
            type='text'
          />
          <LabelInput
            label='geschatte duur'
            name='geschatteDuur'
            type='text'
          />
          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                {accountAandeel?.aandeel?.id ? 'Save AccountAandeel' : 'Add AccountAandeel'}
              </button>
              <Link
                disabled={isSubmitting}
                className='btn btn-light'
                to='/accounts/me/aandelen'
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
