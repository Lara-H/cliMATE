describe('tests whether the imprint-website is reachable from the main page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('switches to english language', () => {
      cy.get('#languageSwitchEN').click();
    })
    it('looks for the imprint-link and clicks it, so the page changes', () => {
        cy.get('#imprint-link').click();
        cy.location('pathname').should('include', 'impressum')
    })
  })