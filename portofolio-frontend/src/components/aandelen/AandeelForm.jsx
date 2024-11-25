// src/components/transactions/AandeelForm.jsx
import { useForm } from 'react-hook-form';

const validationRules = {
  id: {
    required: 'User is required',
    min: { value: 1, message: 'min 1' },
  },
  isin: {
    pattern: {
      value: /^\d{12}$/,
      message: 'ISIN must be 12 digits',
    },
  },
  type: {
    validate: (value) =>
      value === 'Verspreiden' || value === 'Accumulatie' || 'Type moet Verspreiden of Accumulatie zijn',
  },
  afkorting: {
    pattern: {
      value: /^\d{4}$/,
      message: 'Afkorting must be 4 digits',
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
  id: '',
  isin: '',
  afkorting: '',
  uitgever: '',
  kosten: '',
  type: '',
  rating: '',
  sustainability: '',
};

export default function AandeelForm(saveAandeel) {
  const aandeel = EMPTY_AANDEEL;
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
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

  const onSubmit = async (values) => {
    if (!isValid) return;
    
    await saveAandeel(values, {
      throwOnError: false,
      onSuccess: () => reset(),
    });
    reset();
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        <div className='mb-3'>
          <label htmlFor='id' className='form-label'>
            id
          </label>
          <input
            {...register('id', validationRules.id)}
            id='id'
            name='id'
            type='number'
            className='form-control'
            placeholder='id'
            required
          />
          {errors.id && <p className="form-text text-danger">{errors.id.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='isin' className='form-label'>
            ISIN
          </label>
          <input
            {...register('isin', validationRules.isin)}
            id='isin'
            name='isin'
            type='text'
            className='form-control'
            placeholder='ISIN'
          />
          {errors.isin && <p className="form-text text-danger">{errors.isin.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='afkorting' className='form-label'>
            afkorting
          </label>
          <input
            {...register('afkorting', validationRules.afkorting)}
            id='afkorting'
            name='afkorting'
            type='text'
            className='form-control'
            placeholder='afkorting'
          />
          {errors.afkorting && <p className="form-text text-danger">{errors.afkorting.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='uitgever' className='form-label'>
            uitgever
          </label>
          <input
            {...register('uitgever')}
            id='uitgever'
            name='uitgever'
            type='text'
            className='form-control'
            placeholder='uitgever'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='kosten' className='form-label'>
            kosten
          </label>
          <input
            {...register('kosten', validationRules.kosten)}
            id='kosten'
            name='kosten'
            type='number'
            className='form-control'
            placeholder='kosten'
          />
          {errors.kosten && <p className="form-text text-danger">{errors.kosten.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='type' className='form-label'>
            type
          </label>
          <input
            {...register('type', validationRules.type)}
            id='type'
            name='type'
            type='text'
            className='form-control'
            placeholder='type'
          />
          {errors.type && <p className="form-text text-danger">{errors.type.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='rating' className='form-label'>
            rating
          </label>
          <input
            {...register('rating', validationRules.rating)}
            id='rating'
            name='rating'
            type='number'
            className='form-control'
            placeholder='rating'
          />
          {errors.rating && <p className="form-text text-danger">{errors.rating.message}</p> }
        </div>
        <div className='mb-3'>
          <label htmlFor='sustainability' className='form-label'>
            sustainability
          </label>
          <input
            {...register('sustainability', validationRules.sustainability)}
            id='sustainability'
            name='sustainability'
            type='number'
            className='form-control'
            placeholder='sustainability'
          />
          {errors.sustainability && <p className="form-text text-danger">{errors.sustainability.message}</p> }
        </div>
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button type='submit' className='btn btn-primary'>
              Add transaction
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
