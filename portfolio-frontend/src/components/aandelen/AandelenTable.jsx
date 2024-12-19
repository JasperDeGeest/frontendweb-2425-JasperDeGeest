import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import AandeelMemoized from './Aandeel';
import { useAuth } from '../../contexts/auth';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Flex } from '@chakra-ui/react';

function AandelenTable({ aandelen, onDelete }) {
  const { isAdmin } = useAuth();
  const { theme } = useContext(ThemeContext);

  if (aandelen.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        bg="gray.50"
        p={6}
      >
        <Text fontSize="xl" color="gray.500" textAlign="center" data-cy='no_aandelen_message'>
          There are no aandelen yet.
        </Text>
      </Flex>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" colorScheme={theme}>
        <Thead>
          <Tr>
            <Th>ISIN</Th>
            <Th>Afkorting</Th>
            <Th>Uitgever</Th>
            <Th>Kosten</Th>
            <Th>Type</Th>
            <Th>Rating</Th>
            <Th>Sustainability</Th>
            {isAdmin && (
              <>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {aandelen.map((aandeel) => (
            <AandeelMemoized
              key={aandeel.id}
              onDelete={onDelete}
              {...aandeel}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default AandelenTable;
