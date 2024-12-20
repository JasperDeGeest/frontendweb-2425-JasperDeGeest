import {
  Box,
  Button,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../LabelInput';
import NumberInput from '../NumberInput';
import SelectList from '../SelectList';

const EMPTY_ACCOUNTAANDEEL = {
  aandeelId: undefined,
  aantal: undefined,
  aankoopPrijs: undefined,
  reden: '',
  geschatteDuur: '',
};

const validationRules = {
  aandeelId: {
    required: 'Aandeel is required',
  },
  aantal: {
    required: 'Aantal is required',
    min: {
      value: 1,
      message: 'Aantal must be at least 1',
    },
    validate: {
      isInteger: (value) => Number.isInteger(Number(value)) || 'Aantal must be an integer',
    },
  },
  aankoopPrijs: {
    required: 'Aankoopprijs is required',
    min: {
      value: 0.01,
      message: 'Aankoopprijs must be at least 0.01',
    },
  },
  reden: {
    required: 'Reden is required',
    maxLength: {
      value: 255,
      message: 'Reden cannot exceed 255 characters',
    },
  },
  geschatteDuur: {
    required: 'Geschatte duur is required',
    maxLength: {
      value: 255,
      message: 'Geschatte duur cannot exceed 255 characters',
    },
  },
};

export default function AandeelForm({ aandelen = [], accountAandeel = EMPTY_ACCOUNTAANDEEL, saveAccountAandeel }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      aandeelId: Number(accountAandeel?.aandeel?.id),
      aantal: Number(accountAandeel?.aantal),
      aankoopPrijs: Number(accountAandeel?.aankoopPrijs),
      reden: accountAandeel?.reden,
      geschatteDuur: accountAandeel?.geschatteDuur,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    await saveAccountAandeel(
      {
        id: accountAandeel?.aandeelId,
        ...values,
        aantal: Number(values.aantal),
        aankoopPrijs: Number(values.aankoopPrijs),
      },
      {
        throwOnError: false,
        onSuccess: () => navigate('/accounts/me/aandelen'),
      },
    );
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="100vh"
      bg="gray.50"
    >
      <Box maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading mb={6} fontSize="xl" textAlign="center">
          {accountAandeel?.aandeel?.id ? 'Edit Account Aandeel' : 'Add Account Aandeel'}
        </Heading>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectList
              mb={4}
              label="Aandeel"
              name="aandeelId"
              options={aandelen.map((aandeel) => ({
                value: aandeel.id,
                label: aandeel.afkorting,
              }))}
              validationRules={validationRules.aandeelId}
              isDisabled={accountAandeel?.aandeel?.id ? true : false}
            />
            <NumberInput
              mb={4}
              label="Aantal"
              name="aantal"
              validationRules={validationRules.aantal}
              min={1}
              step={1}
            />
            <NumberInput
              mb={4}
              label="Aankoopprijs"
              name="aankoopPrijs"
              validationRules={validationRules.aankoopPrijs}
              min={0.01}
              step={0.01}
            />
            <LabelInput
              mb={4}
              label="Reden"
              name="reden"
              type="text"
              validationRules={validationRules.reden}
            />
            <LabelInput
              mb={6}
              label="Geschatte Duur"
              name="geschatteDuur"
              type="text"
              validationRules={validationRules.geschatteDuur}
            />
            <Flex justify="space-between">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                {accountAandeel?.aandeel?.id ? 'Save Account Aandeel' : 'Add Account Aandeel'}
              </Button>
              <Spacer />
              <Button as={Link} to="/accounts/me/aandelen" variant="outline" isDisabled={isSubmitting}>
                Cancel
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
}
