import ServiceError from '../core/serviceError';

const handleDBError = (error: any) => {

  const { code = '', message } = error;
  console.log('message', message);
  console.log('code', code);
  if (code === 'P2002') {
    switch (true) {
      case message.includes('idx_account_email_unique'):
        throw ServiceError.validationFailed(
          'An account with this email address already exists',
        );
      case message.includes('idx_aandeel_isin_unique'):
        throw ServiceError.validationFailed(
          'An aandeel with this ISIN already exists',
        );
      case message.includes('idx_aandeel_afkorting_unique'):
        throw ServiceError.validationFailed(
          'An aandeel with this abbreviation already exists',
        );
      default:
        throw ServiceError.validationFailed('This item already exists');
    }
  }

  if (code === 'P2025') {
    switch (true) {
      case message.includes('fk_accountAandeel_account'):
        throw ServiceError.notFound('This account does not exist');
      case message.includes('fk_accountAandeel_aandeel'):
        throw ServiceError.notFound('This aandeel does not exist');
      case message.includes('aandeel'):
        throw ServiceError.notFound('No aandeel with this id exists');
      case message.includes('account'):
        throw ServiceError.notFound('No account with this id exists');
      case message.includes('accountAandeel'):
        throw ServiceError.notFound('No accountAandeel with this id exists');
    }
  }

  if (code === 'P2003') {
    switch (true) {
      case message.includes('aandeelId'):
        throw ServiceError.conflict(
          'This aandeel does not exist or is still linked to accountAandeel',
        );
      case message.includes('accountId'):
        throw ServiceError.conflict(
          'This account does not exist or is still linked to accountAandeel',
        );
    }
  }

  throw error;
};

export default handleDBError;
