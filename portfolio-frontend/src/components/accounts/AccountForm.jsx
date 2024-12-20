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

const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  rijksregisterNummer: {
    required: 'Rijksregister nummer is required',
    pattern: {
      value: /^[0-9]{11}$/,
      message: 'Rijksregister nummer must be 11 digits',
    },
  },
  voornaam: {
    required: 'Voornaam is required',
  },
  achternaam: {
    required: 'Achternaam is required',
  },
  adres: {
    straat: {
      required: 'Straat is required',
    },
    huisNummer: {
      required: 'Huisnummer is required',
      validate: {
        positive: (value) => parseInt(value, 10) > 0 || 'Huisnummer must be greater than 0',
        integer: (value) => Number.isInteger(parseFloat(value)) || 'Huisnummer must be an integer',
      },
    },
    stad: {
      required: 'Stad is required',
    },
    land: {
      required: 'Land is required',
    },
  },
};

export default function AandeelForm({ account, saveAccount }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: account?.email,
      rijksregisterNummer: account?.rijksregisterNummer,
      voornaam: account?.voornaam,
      achternaam: account?.achternaam,
      adres: {
        straat: account?.adres?.straat,
        huisNummer: account?.adres?.huisNummer,
        stad: account?.adres?.stad,
        land: account?.adres?.land,
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

    const updatedValues = {
      ...values,
      rijksregisterNummer: String(values.rijksregisterNummer),
    };

    await saveAccount(
      {
        id: account?.id,
        ...updatedValues,
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
      justify="center"
      align="center"
      height="100vh"
      bg="gray.50"
    >
      <Box maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading mb={6} fontSize="xl" textAlign="center">
          {account?.id ? 'Edit Account' : 'Add Account'}
        </Heading>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelInput
              mb={4}
              label="Email"
              name="email"
              type="text"
              validationRules={validationRules.email}
              placeholder="Enter email"
              data-cy="email_input"
            />

            <NumberInput
              mb={4}
              label="Rijksregister Nummer"
              name="rijksregisterNummer"
              validationRules={validationRules.rijksregisterNummer}
              placeholder="Enter Rijksregister Nummer"
              min={0}
              data-cy="rijksregisterNummer_input"
            />

            <LabelInput
              mb={4}
              label="Voornaam"
              name="voornaam"
              type="text"
              validationRules={validationRules.voornaam}
              placeholder="Enter Voornaam"
              data-cy="voornaam_input"
            />

            <LabelInput
              mb={4}
              label="Achternaam"
              name="achternaam"
              type="text"
              validationRules={validationRules.achternaam}
              placeholder="Enter Achternaam"
              data-cy="achternaam_input"
            />

            <LabelInput
              mb={4}
              label="Straat"
              name="adres.straat"
              type="text"
              validationRules={validationRules.adres.straat}
              placeholder="Enter Straat"
              data-cy="adres_straat_input"
            />

            <NumberInput
              mb={4}
              label="Huisnummer"
              name="adres.huisNummer"
              validationRules={validationRules.adres.huisNummer}
              placeholder="Enter Huisnummer"
              min={1}
              data-cy="adres_huisNummer_input"
            />

            <LabelInput
              mb={4}
              label="Stad"
              name="adres.stad"
              type="text"
              validationRules={validationRules.adres.stad}
              placeholder="Enter Stad"
              data-cy="adres_stad_input"
            />

            <LabelInput
              mb={4}
              label="Land"
              name="adres.land"
              type="text"
              validationRules={validationRules.adres.land}
              placeholder="Enter Land"
              data-cy="adres_land_input"
            />

            <Flex>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                data-cy="submit_account"
              >
                {account?.id ? 'Save Account' : 'Add Account'}
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
