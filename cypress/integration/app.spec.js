/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:5000/DNE')
})

describe('Header', () => {
    it('has a title', () => {
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
    const platforms = [{
        platform: 'mobile',
        screen: [400, 800]
    }, {
        platform: 'desktop',
        screen: [1600, 900]
    }]

    platforms.forEach(({ platform, screen }) => {
        it(`has correct nav links (${platform})`, () => {
            cy.viewport(...screen)
            if (screen[0] < 960) {
                cy.get('.v-app-bar__nav-icon').click()
            }
            paths.forEach(({ name, path }) => {
                cy.contains('a:visible', name, { matchCase: false })
                    .should('have.attr', 'href', path)
            })
        })
    })
})

describe('Footer', () => {
    it('has a copyright', () => {
        cy.get('footer').contains('©')
    })

    it('links to GitHub', () => {
        cy.get('footer').contains('GitHub').should('have.attr', 'href', 'https://github.com/WTMCRobotics/wtmcrobotics-website')
    })
})