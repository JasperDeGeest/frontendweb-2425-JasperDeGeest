import { useState, useMemo, useCallback } from 'react';
import AccountAandelenTable from '../../components/accountAandeel/AccountAandeelTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import {
  Box,
  Button,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function AandeelList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const { isAdmin } = useAuth();

  const {
    data: accountAandelen = [],
    isLoading,
    error,
  } = useSWR('accounts/me/aandelen', getAll);

  const filteredAccountAandelen = useMemo(
    () =>
      accountAandelen.filter((t) => {
        return t.reden.toLowerCase().includes(search.toLowerCase());
      }),
    [search, accountAandelen],
  );

  const { trigger: deleteAccountAandeel, error: deleteError } = useSWRMutation(
    'accounts/me/aandelen',
    deleteById,
  );

  const handleDeleteAccountAandeel = useCallback(
    async (id) => {
      await deleteAccountAandeel(id);
      alert('Account aandeel deleted');
    },
    [deleteAccountAandeel],
  );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      p={6}
      bg="gray.50"
    >
      <Box mb={6} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Eigen Aandelen
        </Text>
      </Box>

      <Stack direction="row" spacing={4} mb={6} align="center" justify="center">
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search by Reden"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setSearch(text)}
            />
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={() => setSearch(text)}
        >
          Search
        </Button>

        {isAdmin && (
          <Link to="/accounts/me/aandelen/add">
            <Button colorScheme="green">+</Button>
          </Link>
        )}
      </Stack>

      <Box mt={4} width="100%" maxWidth="1200px">
        <AsyncData loading={isLoading} error={error || deleteError}>
          {isLoading ? (
            <Flex justify="center">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <AccountAandelenTable
              accountAandelen={filteredAccountAandelen}
              onDelete={handleDeleteAccountAandeel}
            />
          )}
          {error && <Text color="red.500" textAlign="center">Error: {error.message}</Text>}
        </AsyncData>
      </Box>
    </Flex>
  );
}
