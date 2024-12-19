import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading, VStack, Text, Link, Flex } from '@chakra-ui/react';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import LabelInput from '../components/LabelInput';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { search } = useLocation();
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    },
  });
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="100vh"
      bg="gray.50"
    >
      <Box maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading mb={6} fontSize="2xl" textAlign="center" data-cy="login_heading">
          Sign in
        </Heading>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleLogin)}>
            {error && <Error error={error} />}

            <LabelInput
              mb={4}
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
              data-cy="email_input"
            />

            <LabelInput
              mb={6}
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              validationRules={validationRules.password}
              data-cy="password_input"
            />

            <VStack spacing={4} align="stretch">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                loadingText="Signing in"
                isDisabled={loading}
                data-cy="submit_btn"
              >
                Sign in
              </Button>

              <Button variant="outline" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </VStack>
          </form>
        </FormProvider>

        <Text textAlign="center" mt={4}>
          Don&apos;t have an account?{' '}
          <Link href="/register" color="blue.500">
            Register here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
