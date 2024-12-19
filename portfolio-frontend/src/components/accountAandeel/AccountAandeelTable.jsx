import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import AccountAandeel from './AccountAandeel';
import { useAuth } from '../../contexts/auth';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Box, Text } from '@chakra-ui/react';

function AccountAandelenTable({ accountAandelen = [], onDelete }) {
  const { isAdmin } = useAuth();
  const { theme } = useContext(ThemeContext);

  if (accountAandelen.length === 0) {
    return (
      <Box textAlign="center" py={6} data-cy="no_account_aandelen_message">
        <Text color="gray.500">There are no aandelen yet.</Text>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" colorScheme={theme}>
        <Thead>
          <Tr>
            <Th>Afkorting</Th>
            <Th>Aantal</Th>
            <Th>Aankoopprijs</Th>
            <Th>Reden</Th>
            <Th>Geschatte Duur</Th>
            {isAdmin && (
              <>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {accountAandelen.map((accountAandeel, index) => (
            <AccountAandeel
              key={index}
              onDelete={onDelete}
              {...accountAandeel}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default AccountAandelenTable;
