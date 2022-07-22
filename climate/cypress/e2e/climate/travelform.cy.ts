describe('tests whether the TravelForm works as expected.', () => {
    it('displays the website root', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#navbarNav > ul > li').eq(0).find('a').first().click()
    })
    it('shows the travelForm' ,() => {
        cy.get('#travelFormDiv').should('be.visible')
    })
    // CAR LEG
    it('can enter a car-leg', () => {
        cy.get('#kind').select('passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na')
        cy.get('#distance').clear().type('100')
        cy.get('#vehicles').clear().type('2')
        cy.get('#addTravelLegButton').click()
    })
    it('asserts the car-leg is there', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(0).find('>td').eq(0).should('contain', 'car')
        cy.get('#travelFormLegTable > tbody > tr').eq(0).find('>td').eq(1).should('contain', '100')
        cy.get('#travelFormLegTable > tbody > tr').eq(0).find('>td').eq(2).should('contain', '2')
    })
    it('can change the values of the car leg', () => {
        cy.get('#travelFormLegTable > tbody > tr > td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('150')
        cy.get('#vehicles-edit').clear().type('3')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#travelFormLegTable > tbody > tr > td').eq(0).should('contain', 'car')
        cy.get('#travelFormLegTable > tbody > tr > td').eq(1).should('contain', '150')
        cy.get('#travelFormLegTable > tbody > tr > td').eq(2).should('contain', '3')
    })
    // TRAIN LEG
    it('can enter a train-leg', () => {
        cy.get('#kind').select('passenger_train-route_type_commuter_rail-fuel_source_na')
        cy.get('#distance').clear().type('50')
        cy.get('#people').clear().type('2')
        cy.get('#addTravelLegButton').click()
    })
    it('asserts the train-leg is there', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(0).should('contain', 'train')
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(1).should('contain', '50')
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(2).should('contain', '2')
    })
    it('can change the values of the train leg', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('75')
        cy.get('#people-edit').clear().type('3')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(0).should('contain', 'train')
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(1).should('contain', '75')
        cy.get('#travelFormLegTable > tbody > tr').eq(1).find('>td').eq(2).should('contain', '3')
    })
    // AIRPLANE LEG
    it('can enter an airplane-leg', () => {
        cy.get('#kind').select('passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included')
        cy.get('#departureAirport').clear().type('FRA')
        cy.get('#arrivalAirport').clear().type('PIM')
        cy.get('#people').clear().type('2')
        cy.get('#addTravelLegButton').click()
    })
    it('asserts the airplane-leg is there', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(0).should('contain', 'flight')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', 'FRA')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', 'PIM')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(2).should('contain', '2')
    })
    it('can change the values of the airplane leg', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#departureAirport-edit').clear().type('BER')
        cy.get('#arrivalAirport-edit').clear().type('JFK')
        cy.get('#people-edit').clear().type('3')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(0).should('contain', 'flight')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', 'BER')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(1).should('contain', 'JFK')
        cy.get('#travelFormLegTable > tbody > tr').eq(2).find('>td').eq(2).should('contain', '3')
    })
    // SHIP LEG
    it('can enter an ship-leg', () => {
        cy.get('#kind').select('passenger_ferry-route_type_car_passenger-fuel_source_na')
        cy.get('#distance').clear().type('25')
        cy.get('#people').clear().type('2')
        cy.get('#addTravelLegButton').click()
    })
    it('asserts the ship-leg is there', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(0).should('contain', 'ship')
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(1).should('contain', '25')
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(2).should('contain', '2')
    })
    it('can change the values of the ship leg', () => {
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(3).find('>a').first().click();
        cy.get('.modal-dialog').should('be.visible')
        cy.get('#distance-edit').clear().type('50')
        cy.get('#people-edit').clear().type('3')
        cy.get('.modal-footer').find('.btn-primary').click()
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(0).should('contain', 'ship')
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(1).should('contain', '50')
        cy.get('#travelFormLegTable > tbody > tr').eq(3).find('>td').eq(2).should('contain', '3')
    })
    // EVALUATION
    it('evaluates the legs correctly', () => {
        cy.get('#evaluateTravelButton').click()
        cy.get('#ResultAreaDiv').should('be.visible')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(0).should('contain', '2090.8')
        cy.get('#ResultAreaDiv > .container > .row > .col-12 > .row > .col-12').eq(1).should('contain', '167.3')
    })
    // Reset Button works
    it('resets the form correctly', () => {
        cy.get('#travelFormResetButton').click({force: true})
        cy.get('#ResultAreaDiv').should('not.be.visible')
        cy.get('#travelFormLegTable > tbody > tr').should('have.length', 0)
    })
})