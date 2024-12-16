// src/components/transactions/AandeelForm.jsx
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import SelectList from '../SelectList';

const validationRules = {
  isin: {
    required: 'ISIN is required',
    pattern: {
      value: /^[A-Za-z0-9]{12}$/,
      message: 'ISIN must be 12 numbers or characters',
    },
  },
  type: {
    required: 'Type is required',
    validate: (value) =>
      value === 'Verspreiden' || value === 'Accumulatie' || 'Type moet Verspreiden of Accumulatie zijn',
  },
  afkorting: {
    required: 'Afkorting is required',
    pattern: {
      value: /^[A-Z]{4}$/,
      message: 'Afkorting must be 4 capital letters',
    },
  },
  uitgever: {
    required: 'Uitgever is required',
  },
  kosten: {
    required: 'Kosten is required',
    min: { value: 0, message: 'Kosten must be at least 0' },
    max: { value: 1, message: 'Kosten must be at most 1' },
  },
  rating: {
    required: 'Rating is required',
    min: { value: 0, message: 'Rating must be at least 0' },
    max: { value: 5, message: 'Rating must be at most 5' },
  },
  sustainability: {
    required: 'Sustainability is required',
    min: { value: 0, message: 'Sustainability must be at least 0' },
    max: { value: 5, message: 'Sustainability must be at most 5' },
  },
};

const EMPTY_AANDEEL = {
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
      isin: aandeel?.isin,
      afkorting: aandeel?.afkorting,
      uitgever: aandeel?.uitgever,
      kosten: Number(aandeel?.kosten),
      type: aandeel?.type,
      rating: Number(aandeel?.rating),
      sustainability: Number(aandeel?.sustainability),
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
      kosten: Number(values.kosten),
      rating: Number(values.rating),
      sustainability: Number(values.sustainability),
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
            label='ISIN'
            name='isin'
            type='text'
            validationRules={validationRules.isin}
            data-cy = 'isin_input'
          />
          <LabelInput
            label='Afkorting'
            name='afkorting'
            type='text'
            validationRules={validationRules.afkorting}
            data-cy = 'afkorting_input'
          />
          <LabelInput
            label='Uitgever'
            name='uitgever'
            type='text'
            validationRules={validationRules.uitgever}
            data-cy = 'uitgever_input'
          />
          <LabelInput
            label='Kosten'
            name='kosten'
            type='number'
            step='0.001'
            validationRules={validationRules.kosten}
            data-cy = 'kosten_input'
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
            data-cy = 'type_input'
          />
          <LabelInput
            label='Rating'
            name='rating'
            type='number'
            validationRules={validationRules.rating}
            data-cy = 'rating_input'
          />
          <LabelInput
            label='Sustainability'
            name='sustainability'
            type='number'
            validationRules={validationRules.sustainability}
            data-cy = 'sustainability_input'
          />
          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button type='submit' disabled={isSubmitting} className='btn btn-primary' data-cy = 'submit_aandeel'>
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
