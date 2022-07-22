describe('tests whether the website is reachable', () => {
  it('displays the website root', () => {
      cy.visit('http://localhost:3000/')
      cy.get('#root').should('exist')
  })
})