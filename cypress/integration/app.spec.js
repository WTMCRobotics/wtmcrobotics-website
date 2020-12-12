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
    const platforms = [{
        platform: 'mobile',
        screen: [400, 800]
    }, {
        platform: 'desktop',
        screen: [1600, 900]
    }]

    paths.forEach(({ name, path }) => {
        platforms.forEach(({ platform, screen }) => {
            it(`checks ${name} nav link on ${platform}`, () => {
                cy.viewport(...screen)
                if (screen[0] < 960) {
                    cy.get('.v-app-bar__nav-icon').click()
                }
                cy.contains('a:visible', name, { matchCase: false })
                    .should('have.attr', 'href', path)
            })
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