/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:5000/contact');
})

describe('Contact Page', () => {
    it('title says "Get in Touch"', () => {
        cy.contains('h1', 'Get in Touch')
    })

    it('links to wtmcrobotics@wccnet.edu', () => {
        cy.contains('a', 'wtmcrobotics@wccnet.edu').should('has.attr', 'href', 'mailto:wtmcrobotics@wccnet.edu')
    })

    const validInputs = {
        'Name': 'Nate Stringham',
        'Email': 'nstringham@example.com',
        'Message': 'Hi I would like to test the form on the website to make sure it works.'
    }

    function typeInField(field, value) {
        return cy.contains('label', field).next('input, textarea').focus().type(value, { timeout: 500 * value.length })
    }

    for (const field in validInputs) {

        it(`${field} is required`, () => {
            cy.contains('label', field).not('.error--text')
                .next('input, textarea').click().blur()
            cy.contains('label.error--text', field).next('input, textarea')
            cy.contains(`${field} is required`)
            typeInField(field, validInputs[field])
            cy.contains('label', field).not('.error--text').next('input, textarea')
        })

    }

    it('Email field has error when invalid', () => {
        typeInField('Email', 'not_a_valid_email@.com')
        cy.contains('label.error--text', 'Email').next('input, textarea')
        cy.contains("Email must be valid")
    })

    it('send message button is disabled when form is empty', () => {
        cy.contains('button', 'send message', { matchCase: false }).should('have.attr', 'disabled')
    })

    it('send message button is not disabled when form valid', () => {
        for (const field in validInputs) {
            typeInField(field, validInputs[field])
        }
        cy.contains('button', 'send message', { matchCase: false }).should('not.have.attr', 'disabled')
        typeInField('Email', '{backspace}{backspace}{backspace}{backspace}')
        cy.contains('button', 'send message', { matchCase: false }).should('have.attr', 'disabled')
    })
})