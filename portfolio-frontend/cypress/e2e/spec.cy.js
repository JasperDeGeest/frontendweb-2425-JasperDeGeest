describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:5173/login/');
    cy.get('[data-cy=login_heading]').should('exist');
  });

  it('should login', () => {
    cy.login('pieter.vanderhelst@hogent.be', '12345678');
  });
});
