function iniciarCadastro(nome, email) {

  // cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
  // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)

  cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
  // radio buttons -> check
  cy.get('#id_gender2').check()

  cy.get('[data-qa="password"]').type('12345')

  // Selects e Comboboxes -> select
  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('September')
  cy.get('[data-qa="years"]').select('1990')

  // checkboxes -> check
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
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')

}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  /**
   * verificarSeMensagemDeCadastroExistenteFoiExibida
   */
  cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
  /**
   * verificarSeMensagemDeCadastroExistenteFoiExibida
   */
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida
}