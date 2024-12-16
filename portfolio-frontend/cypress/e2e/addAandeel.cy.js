describe('AandeelForm Validation Tests', () => {
  beforeEach(() => {
    cy.login('thomas.aelbrecht@hogent.be', '12345678');
    cy.visit('http://localhost:5173/aandelen/add'); // Replace with the actual route to the AandeelForm page
  });

  it('should show validation errors for ISIN', () => {
    cy.get('[data-cy="isin_input"]').clear();
    cy.get('[data-cy="isin_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'ISIN is required');

    cy.get('[data-cy="isin_input"]').type('123');
    cy.get('[data-cy="isin_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'ISIN must be 12 numbers or characters');

    cy.get('[data-cy="isin_input"]').clear();
    cy.get('[data-cy="isin_input"]').type('ABCDEFGHIJKL');
    cy.get('[data-cy="isin_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should show validation errors for Afkorting', () => {
    cy.get('[data-cy="afkorting_input"]').clear();
    cy.get('[data-cy="afkorting_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Afkorting is required');

    cy.get('[data-cy="afkorting_input"]').type('abc');
    cy.get('[data-cy="afkorting_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Afkorting must be 4 capital letters');

    cy.get('[data-cy="afkorting_input"]').clear();
    cy.get('[data-cy="afkorting_input"]').type('ABCD');
    cy.get('[data-cy="afkorting_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should show validation errors for Uitgever', () => {
    cy.get('[data-cy="uitgever_input"]').clear();
    cy.get('[data-cy="uitgever_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Uitgever is required');

    cy.get('[data-cy="uitgever_input"]').type('UitgeverNaam');
    cy.get('[data-cy="uitgever_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should show validation errors for Kosten', () => {
    cy.get('[data-cy="kosten_input"]').clear();
    cy.get('[data-cy="kosten_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Kosten is required');

    cy.get('[data-cy="kosten_input"]').type('-1');
    cy.get('[data-cy="kosten_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Kosten must be at least 0');

    cy.get('[data-cy="kosten_input"]').clear();
    cy.get('[data-cy="kosten_input"]').type('1.1');
    cy.get('[data-cy="kosten_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Kosten must be at most 1');

    cy.get('[data-cy="kosten_input"]').clear();
    cy.get('[data-cy="kosten_input"]').type('0.5');
    cy.get('[data-cy="kosten_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should show validation errors for Type', () => {
    cy.get('[data-cy="type_input"]').select('Verspreiden');
    cy.get('[data-cy="type_input"]').blur();
    cy.get('[data-cy="select-input-error"]').should('not.exist');
  });

  it('should show validation errors for Rating', () => {
    cy.get('[data-cy="rating_input"]').clear();
    cy.get('[data-cy="rating_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Rating is required');

    cy.get('[data-cy="rating_input"]').type('-1');
    cy.get('[data-cy="rating_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Rating must be at least 0');

    cy.get('[data-cy="rating_input"]').clear();
    cy.get('[data-cy="rating_input"]').type('6');
    cy.get('[data-cy="rating_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Rating must be at most 5');

    cy.get('[data-cy="rating_input"]').clear();
    cy.get('[data-cy="rating_input"]').type('4');
    cy.get('[data-cy="rating_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should show validation errors for Sustainability', () => {
    cy.get('[data-cy="sustainability_input"]').clear();
    cy.get('[data-cy="sustainability_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Sustainability is required');

    cy.get('[data-cy="sustainability_input"]').type('-1');
    cy.get('[data-cy="sustainability_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Sustainability must be at least 0');

    cy.get('[data-cy="sustainability_input"]').clear();
    cy.get('[data-cy="sustainability_input"]').type('6');
    cy.get('[data-cy="sustainability_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('contain', 'Sustainability must be at most 5');

    cy.get('[data-cy="sustainability_input"]').clear();
    cy.get('[data-cy="sustainability_input"]').type('3');
    cy.get('[data-cy="sustainability_input"]').blur();
    cy.get('[data-cy="label-input-error"]').should('not.exist');
  });

  it('should add an aandeel', () => {
    cy.get('[data-cy=isin_input]').type('LU2439733507');
    cy.get('[data-cy=afkorting_input]').type('AHYD');
    cy.get('[data-cy=uitgever_input]').type('Amundi');
    cy.get('[data-cy=kosten_input]').type('0.16');
    cy.get('[data-cy=type_input]').select('Accumulatie');
    cy.get('[data-cy=rating_input]').type('0');
    cy.get('[data-cy=sustainability_input]').type('3');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_aandeel]').click();

    cy.get('[data-cy=aandeel_isin]').eq(2).should('contain', 'LU2439733507');
    cy.get('[data-cy=aandeel_afkorting]').eq(2).should('contain', 'AHYD');
    cy.get('[data-cy=aandeel_uitgever]').eq(2).should('contain', 'Amundi');
    cy.get('[data-cy=aandeel_kosten]').eq(2).should('contain', '0.16');
    cy.get('[data-cy=aandeel_type]').eq(2).should('contain', 'Accumulatie');
    cy.get('[data-cy=aandeel_rating]').eq(2).should('contain', '0');
    cy.get('[data-cy=aandeel_sustainability]').eq(2).should('contain', '3');

    cy.get('[data-cy=aandeel]').should('have.length', 3);
  });

  it('should remove an aandeel', () => {
    cy.visit('http://localhost:5173/aandelen/');

    cy.get('[data-cy=aandeel_remove_btn]').eq(2).click();
    cy.get('[data-cy=aandeel]').should('have.length', 2);
  });
});
