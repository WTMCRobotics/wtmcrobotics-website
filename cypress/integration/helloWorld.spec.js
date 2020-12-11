/// <reference types="cypress" />

describe('Hello World', () => {
    it('test if cypress is working', () => {
        expect(0).to.equal(0)
    })

    it('makes sure the page exists', () => {
        cy.visit('http://localhost:5000')
    })
})