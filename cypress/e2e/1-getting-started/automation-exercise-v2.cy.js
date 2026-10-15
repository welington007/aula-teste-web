/// <reference types="cypress" />
import {
    deleteAccount,
    loginUser,
    logoutUser,
    registerUser,
    startSignup
} from '../../support/automation-exercise'

describe('Automation Exercise', () => {
    it('Caso de Teste 01: Registrar Usuário', () => {
        const email = `jubileu.silva${Date.now()}@mail.com`

        registerUser(email)
        deleteAccount()
    })

    it('Caso de Teste 02: Login com email e senha corretos', () => {
        const email = `jubileu.silva${Date.now()}@mail.com`

        registerUser(email)
        logoutUser()
        loginUser(email)

        cy.contains('Logged in as PGATS Aut').should('be.visible')

        deleteAccount()
    })

    it('Caso de Teste 03: Login com e-mail e senha incorretos', () => {
        loginUser(`invalid-${Date.now()}@mail.com`, 'senha-incorreta')

        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Caso de Teste 04: Deslogar Usuário', () => {
        const email = `jubileu.silva-${Date.now()}@mail.com`

        registerUser(email)
        logoutUser()

        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')

        loginUser(email)
        deleteAccount()
    })

    it('Caso de Teste 05: Cadastrar um usuário com um endereço de email que já existe', () => {
        const email = `jubileu.silva${Date.now()}@mail.com`

        registerUser(email)
        logoutUser()
        startSignup(email)

        cy.contains('Email Address already exist!').should('be.visible')

        loginUser(email)
        deleteAccount()
    })
});