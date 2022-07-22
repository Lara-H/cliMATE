describe('tests whether the HouseholdForm works as expected.', () => {
    it('displays the website root', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#navbarNav > ul > li').eq(2).find('a').first().click()
    })
    it('switches to english language', () => {
        cy.get('#languageSwitchEN').click();
      })
    it('shows the householdForm' ,() => {
        cy.get('#householdFormDiv').should('be.visible')
    })
    // POWER CONSUMPTION
    it('can evaluate Power Consumption', () => {
        cy.get('#consumption').clear().type("50")
        cy.get('#power-consumption-response').should('contain', '53.00')
    })
    // WASTE PRODUCTION
    it('can evaluate Waste Production', () => {
        cy.get('#waste').clear().type("100")
        cy.get('#waste-response').should('contain', '2.13')
    })
    // CLOTHES BOUGHT
    it('can evaluate Clothes Bought', () => {
        cy.get('#clothing').clear().type("20")
        cy.get('#clothes-bought-response').should('contain', '44.40')
    })
    // EVALUATION
    it('evaluates the legs correctly', () => {
        cy.get('#evaluateHouseholdButton').click()
        cy.get('#ResultAreaDiv').should('be.visible')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(0).should('contain', '99.5')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(1).should('contain', '8.0')
    })
})