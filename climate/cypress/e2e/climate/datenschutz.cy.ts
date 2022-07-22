describe('tests whether the datenschutz-website is reachable from the main page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('switches to english language', () => {
      cy.get('#languageSwitchEN').click();
    })
    it('looks for the imprint-link and clicks it, so the page changes', () => {
        cy.get('#datenschutz-link')
        .should('have.text', 'privacy')
        .click();
        cy.location('pathname').should('include', 'datenschutz')
    })
  })