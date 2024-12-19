import { useState, useMemo, useCallback } from 'react';
import AandelenTable from '../../components/aandelen/AandelenTable';
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
    data: aandelen = [],
    isLoading,
    error,
  } = useSWR('aandelen', getAll);

  const filteredAandelen = useMemo(
    () =>
      aandelen.filter((t) => {
        return t.afkorting.toLowerCase().includes(search.toLowerCase());
      }),
    [search, aandelen],
  );

  const { trigger: deleteAandeel, error: deleteError } = useSWRMutation(
    'aandelen',
    deleteById,
  );

  const handleDeleteAandeel = useCallback(
    async (id) => {
      await deleteAandeel(id);
      alert('Aandeel deleted');
    },
    [deleteAandeel],
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
      <Box mb={6}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Beschikbare Aandelen
        </Text>
      </Box>

      <Stack direction="row" spacing={4} mb={6} align="center">
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search by Afkorting"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setSearch(text)}
              data-cy="aandelen_search_input"
            />
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={() => setSearch(text)}
          data-cy="aandelen_search_btn"
        >
          Search
        </Button>

        {isAdmin && (
          <Link to="/aandelen/add">
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
            <AandelenTable
              aandelen={filteredAandelen}
              onDelete={handleDeleteAandeel}
            />
          )}
          {error && <Text color="red.500" textAlign="center">Error: {error.message}</Text>}
        </AsyncData>
      </Box>
    </Flex>
  );
}
