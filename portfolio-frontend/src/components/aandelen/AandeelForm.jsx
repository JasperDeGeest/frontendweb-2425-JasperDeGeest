import {
  Box,
  Button,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import NumberInput from '../NumberInput';
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
      value === 'Verspreiden' || value === 'Accumulatie' || 'Type must be Verspreiden or Accumulatie',
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
    validate: (value) => Number.isFinite(Number(value)) || 'Kosten must be a number',
  },
  rating: {
    required: 'Rating is required',
    min: { value: 0, message: 'Rating must be at least 0' },
    max: { value: 5, message: 'Rating must be at most 5' },
    validate: (value) => Number.isInteger(Number(value)) || 'Rating must be an integer',
  },
  sustainability: {
    required: 'Sustainability is required',
    min: { value: 0, message: 'Sustainability must be at least 0' },
    max: { value: 5, message: 'Sustainability must be at most 5' },
    validate: (value) => Number.isInteger(Number(value)) || 'Sustainability must be an integer',
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

    await saveAandeel(
      {
        id: aandeel?.id,
        ...values,
        kosten: Number(values.kosten),
        rating: Number(values.rating),
        sustainability: Number(values.sustainability),
      },
      {
        throwOnError: false,
        onSuccess: () => navigate('/aandelen'),
      },
    );
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      p={6}
      bg="gray.50"
    >
      <Box
        maxW="md"
        width="100%"
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <Heading mb={6} fontSize="xl" textAlign="center">
          {aandeel?.id ? 'Edit Aandeel' : 'Add Aandeel'}
        </Heading>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelInput
              mb={4}
              label="ISIN"
              name="isin"
              type="text"
              validationRules={validationRules.isin}
              data-cy="isin_input"
            />

            <LabelInput
              mb={4}
              label="Afkorting"
              name="afkorting"
              type="text"
              validationRules={validationRules.afkorting}
              data-cy="afkorting_input"
            />

            <LabelInput
              mb={4}
              label="Uitgever"
              name="uitgever"
              type="text"
              validationRules={validationRules.uitgever}
              data-cy="uitgever_input"
            />

            <NumberInput
              mb={4}
              label="Kosten"
              name="kosten"
              validationRules={validationRules.kosten}
              min={0}
              max={1}
              step={0.001}
              data-cy="kosten_input"
            />

            <SelectList
              mb={4}
              label="Type"
              name="type"
              options={[
                { value: 'Verspreiden', label: 'Verspreiden' },
                { value: 'Accumulatie', label: 'Accumulatie' },
              ]}
              validationRules={validationRules.type}
              data-cy="type_input"
            />

            <NumberInput
              mb={4}
              label="Rating"
              name="rating"
              validationRules={validationRules.rating}
              min={0}
              max={5}
              step={1}
              data-cy="rating_input"
            />

            <NumberInput
              mb={6}
              label="Sustainability"
              name="sustainability"
              validationRules={validationRules.sustainability}
              min={0}
              max={5}
              step={1}
              data-cy="sustainability_input"
            />

            <Flex justify="space-between">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                data-cy="submit_aandeel"
              >
                {aandeel?.id ? 'Save Aandeel' : 'Add Aandeel'}
              </Button>
              <Spacer />
              <Button as={Link} to="/aandelen" variant="outline">
                Cancel
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
}
