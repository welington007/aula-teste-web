const password = '12345'
const userName = 'PGATS Aut'

const openLoginPage = () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*="login"]').click()
}

export const startSignup = (email) => {
    openLoginPage()
    cy.get('[data-qa="signup-name"]').type(userName)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
}

export const registerUser = (email) => {
    startSignup(email)
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1988')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type('PGATS')
    cy.get('[data-qa="last_name"]').type('Aut')
    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('Example Address')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('999999999')
    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${userName}`).should('be.visible')
}

export const loginUser = (email, userPassword = password) => {
    openLoginPage()
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(userPassword)
    cy.get('[data-qa="login-button"]').click()
}

export const logoutUser = () => {
    cy.get('a[href*="logout"]').click()
}

export const deleteAccount = () => {
    cy.contains('Delete Account').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
}