// cypress/e2e/aandelen.cy.js
describe('Aandelen list', () => {
  beforeEach(() => {
    cy.login('pieter.vanderhelst@hogent.be', '12345678');
  });
  it('should show the aandelen', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/aandelen',
      { fixture: 'aandelen.json' },
    );

    cy.visit('http://localhost:5173');
    cy.get('[data-cy=aandeel]').should('have.length', 3);

    cy.get('[data-cy=aandeel_isin]').eq(0).should('contain', 'IE00B5BMR087');
    cy.get('[data-cy=aandeel_afkorting]').eq(0).should('contain', 'CSPX');
    cy.get('[data-cy=aandeel_uitgever]').eq(0).should('contain', 'iShares');
    cy.get('[data-cy=aandeel_kosten]').eq(0).should('contain', '0.07');
    cy.get('[data-cy=aandeel_type]').eq(0).should('contain', 'Accumulatie');
    cy.get('[data-cy=aandeel_rating]').eq(0).should('contain', '5');
    cy.get('[data-cy=aandeel_sustainability]').eq(0).should('contain', '3');
  });

  it('should show a loading indicator for a very slow response', () => {
    cy.intercept(
      'http://localhost:9000/api/aandelen', // 👈 1
      // 👇 2
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse'); // 👈 5
    cy.visit('http://localhost:5173'); // 👈 3
    cy.get('[data-cy=loader]').should('be.visible'); // 👈 4
    cy.wait('@slowResponse'); // 👈 6
    cy.get('[data-cy=loader]').should('not.exist'); // 👈 7
  });

  it('should show CSPX aandeel', () => {
    cy.visit('http://localhost:5173');
    cy.intercept(
      'GET',
      'http://localhost:9000/api/aandelen',
      { fixture: 'aandelen.json' }, // 👈
    );
    cy.get('[data-cy=aandelen_search_input]').type('CS');
    cy.get('[data-cy=aandelen_search_btn]').click();
  
    cy.get('[data-cy=aandeel]').should('have.length', 1);
    cy.get('[data-cy=aandeel_afkorting]')
      .eq(0)
      .contains(/CSPX/);
  });
  
  it('should show a message when no aandelen are found', () => {
    cy.visit('http://localhost:5173');
  
    cy.get('[data-cy=aandelen_search_input]').type('xyz');
    cy.get('[data-cy=aandelen_search_btn]').click();
  
    cy.get('[data-cy=no_aandelen_message]').should('exist');
  });
  
  it('should show an error if the API call fails', () => {
    cy.intercept('GET', 'http://localhost:9000/api/aandelen', {
      statusCode: 500,
      body: {
        error: 'Internal server error',
      },
    });
    cy.visit('http://localhost:5173');
  
    cy.get('[data-cy=axios_error_message').should('exist');
  });
  
});
