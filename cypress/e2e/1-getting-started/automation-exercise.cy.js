///<reference types="cypress" />

describe('Automation Exercise', () => {
  let emailCadastrado

  //cadastro
  it('Caso de teste 1: Cadastrar usuário', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
      const timestamp = new Date().getTime()
      emailCadastrado = `pga-${timestamp}@teste.com`

    cy.get('[data-qa="signup-name"]').type('PGA Aut')
    cy.get('[data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.get('[data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.get('[data-qa="days"]').select('10')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('PGA teste123')
    cy.get('[data-qa="last_name"]').type('teste123')
    cy.get('[data-qa="company"]').type('PGA teste123')
    cy.get('[data-qa="address"]').type('Rua teste123')
    cy.get('[data-qa="address2"]').type('Rua teste123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('teste123')
    cy.get('[data-qa="city"]').type('teste123')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('1234567890')

    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')

      //valida se possui botão delete e clicar nele para deletar o usuário
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

    //clica para deletar o usuário
    cy.get('[data-qa="continue-button"]').click()

    });

  it('Caso de teste 2.1: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    const timestamp = new Date().getTime()
    emailCadastrado = `pga-${timestamp}@teste.com`
    
    cy.get('[data-qa="signup-name"]').type('PGA Aut')
    cy.get('[data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.get('[data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.get('[data-qa="days"]').select('10')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('PGA teste123')
    cy.get('[data-qa="last_name"]').type('teste123')
    cy.get('[data-qa="company"]').type('PGA teste123')
    cy.get('[data-qa="address"]').type('Rua teste123')
    cy.get('[data-qa="address2"]').type('Rua teste123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('teste123')
    cy.get('[data-qa="city"]').type('teste123')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('1234567890')

    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')
    cy.contains('Logged in as PGA Aut').should('be.visible')



  })

    
  it('Caso de teste 2.2: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="login-email"]').type(emailCadastrado)
    cy.get('[data-qa="login-password"]').type('123456')
    cy.get('[data-qa="login-button"]').click()
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
     //clica para deletar o usuário
    cy.get('[data-qa="continue-button"]').click()

  })

  it('Caso de teste 3: Login do usuário com e-mail e senha incorretos', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="login-email"]').type('tetet@tet.com')
    cy.get('[data-qa="login-password"]').type('123456156544654645')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form > form > p')
      .should('exist')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!')
    
  })

  it('Caso de teste 4: Fazer logout do usuário', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    const timestamp = new Date().getTime()
    emailCadastrado = `pga-${timestamp}@teste.com`
    
    cy.get('[data-qa="signup-name"]').type('PGA Aut')
    cy.get('[data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.get('[data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.get('[data-qa="days"]').select('10')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('PGA teste123')
    cy.get('[data-qa="last_name"]').type('teste123')
    cy.get('[data-qa="company"]').type('PGA teste123')
    cy.get('[data-qa="address"]').type('Rua teste123')
    cy.get('[data-qa="address2"]').type('Rua teste123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('teste123')
    cy.get('[data-qa="city"]').type('teste123')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('1234567890')

    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')

    cy.get('a[href="/logout"]').click()

    cy.get('a[href="/login"]').should('be.visible')
  })

  it('Caso de teste 5: Cadastrar usuário com e-mail existente', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    cy.get('[data-qa="signup-name"]').type('PGA Aut')
    cy.get('[data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.get('[data-qa="signup-button"]').click()
    cy.get('.signup-form > form > p')
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!')


  })

});