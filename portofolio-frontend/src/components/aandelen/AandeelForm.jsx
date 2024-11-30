// src/components/transactions/AandeelForm.jsx
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import SelectList from '../SelectList';

const validationRules = {
  id: {
    required: 'id is required',
    min: { value: 1, message: 'min 1' },
  },
  isin: {
    pattern: {
      value: /^[A-Za-z0-9]{12}$/,
      message: 'ISIN must be 12 numbers or characters',
    },
  },
  type: {
    validate: (value) =>
      value === 'Verspreiden' || value === 'Accumulatie' || 'Type moet Verspreiden of Accumulatie zijn',
  },
  afkorting: {
    pattern: {
      value: /^[A-Z]{4}$/,
      message: 'Afkorting must be 4 characters',
    },
  },
  kosten: {
    min: { value: 0, message: 'Kosten must be at least 0' },
    max: { value: 1, message: 'Kosten must be at most 1' },
  },
  rating: {
    min: { value: 0, message: 'Rating must be at least 0' },
    max: { value: 5, message: 'Rating must be at most 5' },
  },
  sustainability: {
    min: { value: 0, message: 'Sustainability must be at least 0' },
    max: { value: 5, message: 'Sustainability must be at most 5' },
  },
};

const EMPTY_AANDEEL = {
  id: undefined,
  isin: '',
  afkorting: '',
  uitgever: '',
  kosten: undefined,
  type: '',
  rating: undefined,
  sustainability: undefined,
};

export default function AandeelForm({ aandeel = EMPTY_AANDEEL, saveAandeel }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      id: aandeel?.id,
      isin: aandeel?.isin,
      afkorting: aandeel?.afkorting,
      uitgever: aandeel?.uitgever,
      kosten: aandeel?.kosten,
      type: aandeel?.type,
      rating: aandeel?.rating,
      sustainability: aandeel?.sustainability,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    
    await saveAandeel({
      id: aandeel?.id,
      ...values,
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
            label='ID'
            name='id'
            type='number'
            validationRules={validationRules.id}
          />
          <LabelInput
            label='ISIN'
            name='isin'
            type='text'
            validationRules={validationRules.isin}
          />
          <LabelInput
            label='Afkorting'
            name='afkorting'
            type='text'
            validationRules={validationRules.afkorting}
          />
          <LabelInput
            label='Uitgever'
            name='uitgever'
            type='text'
          />
          <LabelInput
            label='Kosten'
            name='kosten'
            type='number'
            step='0.001'
            validationRules={validationRules.kosten}
          />
          <SelectList
            label='Type'
            name='type'
            type='text'
            options={[
              { value: 'Verspreiden', label: 'Verspreiden' },
              { value: 'Accumulatie', label: 'Accumulatie' },
            ]}
            validationRules={validationRules.type}
          />
          <LabelInput
            label='Rating'
            name='rating'
            type='number'
            validationRules={validationRules.rating}
          />
          <LabelInput
            label='Sustainability'
            name='sustainability'
            type='number'
            validationRules={validationRules.sustainability}
          />
          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                {aandeel?.id ? 'Save aandeel' : 'Add aandeel'}
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
