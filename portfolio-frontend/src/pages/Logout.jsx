import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      bg="gray.50"
      p={4}
    >
      <Box textAlign="center" p={8} boxShadow="lg" borderRadius="md" bg="white" maxW="md" width="100%">
        <Heading size="2xl" color="teal.500">
          You were successfully logged out!
        </Heading>
        <Text fontSize="lg" mt={4}>
          We&apos;re sorry to see you go. If you want to log back in, just click the button below.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          mt={6}
          onClick={() => navigate('/login')}
        >
          Go to Login Page
        </Button>
      </Box>
    </Flex>
  );
}
