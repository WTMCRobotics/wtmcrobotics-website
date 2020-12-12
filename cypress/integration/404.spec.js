/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:5000/DNE')
})

describe('404', () => {
    it('checks for error message', () => {
        cy.contains('h1', 'page not found', { matchCase: false });
    })
})