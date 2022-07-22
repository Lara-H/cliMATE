describe('tests whether the imprint-website is reachable from the main page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('looks for the imprint-link and clicks it, so the page changes', () => {
        cy.get('#imprint-link')
        .should('have.text', 'imprint')
        .click();
        cy.location('pathname').should('include', 'impressum')
    })
  })