/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:5000')
})

describe('Header', () => {
    it('checks header title', () => {
        cy.get('header').contains('WTMCRobotics')
            .should('have.attr', 'href', "/")
    })
})

describe('Nav', () => {
    const paths = [
        {
            name: 'home',
            path: '/'
        },
        {
            name: 'gallery',
            path: '/gallery'
        },
        {
            name: 'sponsor',
            path: '/sponsor'
        },
        {
            name: 'join',
            path: '/join'
        },
        {
            name: 'blog',
            path: '/blog'
        },
        {
            name: 'contact',
            path: '/contact'
        }
    ]
    paths.forEach(({ name, path }) => {
        it(`checks ${name} nav on desktop`, () => {
            cy.get('header').contains(name, { matchCase: false })
                .should('have.attr', 'href', path)
        })

        it(`checks ${name} nav on mobile`, () => {
            cy.viewport('iphone-xr')
            cy.get('.v-app-bar__nav-icon').click()
            cy.get('.v-navigation-drawer').contains(name, { matchCase: false })
                .should('have.attr', 'href', path)
        })
    })
})

describe('Footer', () => {
    it('checks for copyright', () => {
        cy.get('footer').contains('©')
    })

    it('checks link to GitHub', () => {
        cy.get('footer').contains('GitHub').should('have.attr', 'href', 'https://github.com/WTMCRobotics/wtmcrobotics-website')
    })
})