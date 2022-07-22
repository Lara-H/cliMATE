describe('tests whether the FreightForm works as expected.', () => {
    it('displays the website root', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#navbarNav > ul > li').eq(1).find('a').first().click()
    })
    it('shows the freightForm' ,() => {
        cy.get('#freightFormDiv').should('be.visible')
    })
    // TRUCK LEG
    it('can enter a truck-leg', () => {
        cy.get('#kind').select('freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100')
        cy.get('#distance').clear().type('100')
        cy.get('#weight').clear().type('20')
        cy.get('#addFreightLegButton').click()
    })
    it('asserts the truck-leg is there', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(0).find('>td').eq(0).should('contain', 'truck')
        cy.get('#freightFormLegTable > tbody > tr').eq(0).find('>td').eq(1).should('contain', '100')
        cy.get('#freightFormLegTable > tbody > tr').eq(0).find('>td').eq(2).should('contain', '20')
    })
    it('can change the values of the truck leg', () => {
        cy.get('#freightFormLegTable > tbody > tr > td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('150')
        cy.get('#weight-edit').clear().type('25')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#freightFormLegTable > tbody > tr > td').eq(0).should('contain', 'truck')
        cy.get('#freightFormLegTable > tbody > tr > td').eq(1).should('contain', '150')
        cy.get('#freightFormLegTable > tbody > tr > td').eq(2).should('contain', '25')
    })
    // TRAIN LEG
    it('can enter a train-leg', () => {
        cy.get('#kind').select('freight_train-route_type_domestic-fuel_type_diesel')
        cy.get('#distance').clear().type('50')
        cy.get('#weight').clear().type('20')
        cy.get('#addFreightLegButton').click()
    })
    it('asserts the train-leg is there', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(0).should('contain', 'freight train')
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(1).should('contain', '50')
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(2).should('contain', '20')
    })
    it('can change the values of the train leg', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('75')
        cy.get('#weight-edit').clear().type('25')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(0).should('contain', 'freight train')
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(1).should('contain', '75')
        cy.get('#freightFormLegTable > tbody > tr').eq(1).find('>td').eq(2).should('contain', '25')
    })
    // AIRPLANE LEG
    it('can enter an airplane-leg', () => {
        cy.get('#kind').select('freight_flight-route_type_domestic-distance_gt_1000km_lt_3500km-weight_gt_100t-rf_included')
        cy.get('#distance').clear().type('200')
        cy.get('#weight').clear().type('20')
        cy.get('#addFreightLegButton').click()
    })
    it('asserts the airplane-leg is there', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(0).should('contain', 'air freight')
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', '200')
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(2).should('contain', '20')
    })
    it('can change the values of the airplane leg', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('250')
        cy.get('#weight-edit').clear().type('25')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(0).should('contain', 'air freight')
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', '250')
        cy.get('#freightFormLegTable > tbody > tr').eq(2).find('>td').eq(2).should('contain', '25')
    })
    // SHIP LEG
    it('can enter an ship-leg', () => {
        cy.get('#kind').select('sea_freight-vessel_type_bulk_carrier-route_type_na-vessel_length_na-tonnage_gt_100000dwt_lt_199999dwt-fuel_source_na')
        cy.get('#distance').clear().type('50')
        cy.get('#weight').clear().type('20')
        cy.get('#addFreightLegButton').click()
    })
    it('asserts the ship-leg is there', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(0).should('contain', 'container Ship')
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(1).should('contain', '50')
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(2).should('contain', '20')
    })
    it('can change the values of the ship leg', () => {
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('60')
        cy.get('#weight-edit').clear().type('25')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(0).should('contain', 'container Ship')
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(1).should('contain', '60')
        cy.get('#freightFormLegTable > tbody > tr').eq(3).find('>td').eq(2).should('contain', '25')
    })
    // EVALUATION
    it('evaluates the legs correctly', () => {
        cy.get('#evaluateFreightButton').click()
        cy.get('#ResultAreaDiv').should('be.visible')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(0).should('contain', '11267.3')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(1).should('contain', '901.4')
    })
    // Reset Button works
    it('resets the form correctly', () => {
        cy.get('#freightFormResetButton').click({force: true})
        cy.get('#ResultAreaDiv').should('not.be.visible')
        cy.get('#freightFormLegTable > tbody > tr').should('have.length', 0)
    })
})