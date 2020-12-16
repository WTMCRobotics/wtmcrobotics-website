/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:5000/DNE')
})

describe('404 Page', () => {
    it('title says "page not found"', () => {
        cy.contains('h1', 'page not found', { matchCase: false });
    })
})