// cypress/e2e/spec.cy.js
describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('exist');
  });

  // 👇 1
  it('should login', () => {
    cy.login('pieter.vanderhelst@hogent.be', '12345678'); // 👈 2
  });
});
