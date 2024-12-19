import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, VStack, Heading, Text, Link, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import LabelInput from '../components/LabelInput';
import NumberInput from '../components/NumberInput';

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
    navigate('/login');
  }, [reset, navigate]);

  const handleRegister = useCallback(
    async ({
      email, password, onbelegdVermogen, rijksregisterNummer, voornaam, achternaam, straat, huisNummer, stad, land,
    }) => {
      const loggedIn = await register({
        email,
        password,
        onbelegdVermogen: Number(onbelegdVermogen),
        rijksregisterNummer: Number(rijksregisterNummer),
        voornaam,
        achternaam,
        adres: { straat, huisNummer, stad, land },
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

  const validationRules = useMemo(
    () => ({
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
    }),
    [getValues],
  );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      bg="gray.50"
      p={4}
    >
      <Box maxW="md" width="100%" p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading mb={6} fontSize="2xl" textAlign="center">
          Register
        </Heading>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleRegister)}>
            {error && <Error error={error} />}

            <LabelInput
              name="email"
              type="email"
              label="Email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
              mb={4}
            />
            <LabelInput
              name="password"
              type="password"
              label="Password"
              placeholder="********"
              validationRules={validationRules.password}
              mb={4}
            />
            <LabelInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="********"
              validationRules={validationRules.confirmPassword}
              mb={4}
            />
            <NumberInput
              name="onbelegdVermogen"
              label="Onbelegd Vermogen"
              placeholder="Onbelegd Vermogen"
              validationRules={validationRules.onbelegdVermogen}
              mb={4}
            />
            <NumberInput
              name="rijksregisterNummer"
              label="Rijksregister Nummer"
              placeholder="Rijksregister Nummer"
              validationRules={validationRules.rijksregisterNummer}
              mb={4}
            />
            <LabelInput
              name="voornaam"
              type="text"
              label="Voornaam"
              placeholder="Voornaam"
              validationRules={validationRules.voornaam}
              mb={4}
            />
            <LabelInput
              name="achternaam"
              type="text"
              label="Achternaam"
              placeholder="Achternaam"
              validationRules={validationRules.achternaam}
              mb={4}
            />
            <LabelInput
              name="straat"
              type="text"
              label="Straat"
              placeholder="Straat"
              validationRules={validationRules.straat}
              mb={4}
            />
            <LabelInput
              name="huisNummer"
              type="text"
              label="Huisnummer"
              placeholder="Huisnummer"
              validationRules={validationRules.huisNummer}
              mb={4}
            />
            <LabelInput
              name="stad"
              type="text"
              label="Stad"
              placeholder="Stad"
              validationRules={validationRules.stad}
              mb={4}
            />
            <LabelInput
              name="land"
              type="text"
              label="Land"
              placeholder="Land"
              validationRules={validationRules.land}
              mb={4}
            />

            <VStack spacing={4} align="stretch">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                loadingText="Registering"
                isDisabled={loading}
                data-cy="submit_btn"
              >
                Register
              </Button>

              <Button variant="outline" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </VStack>
          </form>
        </FormProvider>

        <Text textAlign="center" mt={4}>
          Already have an account?{' '}
          <Link href="/login" color="blue.500">
            Login here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
