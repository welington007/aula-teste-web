/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

const defaultBaseUrl = 'https://www.automationexercise.com'

describe('Automation Exercise', { retries: 1 }, () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  const password = '12345'

  const visitApplication = (path = '/') => {
    const baseUrl = Cypress.config('baseUrl') || defaultBaseUrl
    cy.visit(new URL(path, `${baseUrl}/`).toString())
  }

  const createUserData = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
      name: `${firstName} ${lastName}`,
      email: `automation-${faker.string.uuid()}@mail.com`,
      firstName,
      lastName,
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobileNumber: faker.string.numeric(10)
    }
  }

  const openLoginPage = () => {
    visitApplication()
    cy.get('a[href*="login"]').click()
  }

  const registerUser = (user) => {
    openLoginPage()
    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1988')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type(user.firstName)
    cy.get('[data-qa="last_name"]').type(user.lastName)
    cy.get('[data-qa="company"]').type(user.company)
    cy.get('[data-qa="address"]').type(user.address)
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type(user.state)
    cy.get('[data-qa="city"]').type(user.city)
    cy.get('[data-qa="zipcode"]').type(user.zipcode)
    cy.get('[data-qa="mobile_number"]').type(user.mobileNumber)
    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${user.name}`).should('be.visible')
  }

  const loginUser = (user) => {
    openLoginPage()
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()
    cy.contains(`Logged in as ${user.name}`).should('be.visible')
  }

  const addProductsAndOpenCheckout = () => {
    cy.get('a[href*="products"]').first().click()
    cy.contains('All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('be.visible')

    ;[1, 2].forEach((productId) => {
      cy.get(`a.add-to-cart[data-product-id="${productId}"]`)
        .first()
        .click({ force: true })
      cy.contains('Added!').should('be.visible')
      cy.contains('Continue Shopping').click()
    })

    cy.get('a[href="/view_cart"]').first().click()
    cy.contains('Shopping Cart').should('be.visible')
    cy.get('#cart_info tr[id^="product-"]').should('have.length', 2)
    cy.get('#product-1').should('be.visible')
    cy.get('#product-2').should('be.visible')
    cy.contains('Proceed To Checkout').click()
  }

  const placeOrder = (user) => {
    cy.get('#address_delivery')
      .should('contain.text', user.name)
      .and('contain.text', user.address)
      .and('contain.text', user.city)
      .and('contain.text', user.state)
      .and('contain.text', user.zipcode)
      .and('contain.text', user.mobileNumber)
    cy.get('#address_invoice')
      .should('contain.text', user.name)
      .and('contain.text', user.address)
    cy.get('#cart_info tr[id^="product-"]').should('have.length', 2)

    cy.get('textarea[name="message"]').type('Pedido de teste automatizado')
    cy.contains('Place Order').click()
    cy.get('[data-qa="name-on-card"]').type(user.name)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()
    cy.url().should('include', '/payment_done/')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  }

  const deleteCurrentAccount = () => {
    cy.contains('Delete Account').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  }

  it('Cadastrar um novo usuário com sucesso', () => {
    //cy.visit('https://www.automationexercise.com')
    visitApplication()
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

    cy.get('[data-qa="signup-button"]').click()

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

    /**
     * 1 - IA gerando asserções tradicionais
     */

    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')


  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    // ARRANGE
    /**
     * Ter uma conta para efetuar o Login
     * pgats-aut-test-1791030872114@mail.com / 12345
     */

    // acesso a página de login
    // Problema 1: Repetição do cy.visit
    //cy.visit('https://www.automationexercise.com/login')
    visitApplication('/login')
    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('12345')

    cy.get('[data-qa="login-button"]').click()
    // cy.contains('Login') 

    // ASSERT
    // cy.get('a').should('contain', 'PGATS Aut')
    // cy.get('a > b').should('contain', 'PGATS Aut')


    // 
    // cy.contains('Logged in as PGATS Auto').should('be.visible')
    cy.contains('.navbar-nav li', 'PGATS Aut')

    cy.get('.navbar-nav li')
      .contains('PGATS Aut')
      .should('be.visible')

  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    //cy.visit('https://www.automationexercise.com/login')
    visitApplication('/login')
    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('54321')

    cy.get('[data-qa="login-button"]').click()

    cy.get('form[action*="login"] > p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!')

  });

  it('Efetuar Logout', () => {
    //cy.visit('https://www.automationexercise.com/login')
    visitApplication('/login')
    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()

    // assert do login
    cy.get('a[href*="logout"]')
      .should('be.visible')
      .click()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible');
    cy.url().should('include', 'login')

    // https://www.automationexercise.com/login -> 'login'

  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    //cy.visit('https://www.automationexercise.com')
    visitApplication()
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`)

    cy.get('[data-qa="signup-button"]').click()

    cy.get('form[action*=signup] p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!')


  });

  it('Caso de Teste 08: Verificar todos os produtos e a página de detalhes do produto', () => {
        //cy.visit('https://www.automationexercise.com')
    visitApplication()
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
        cy.get('a[href*="products"]').first().click()

        cy.contains('All Products').should('be.visible')
        cy.get('.features_items .product-image-wrapper').should('be.visible')
        cy.get('.features_items a[href*="/product_details/"]').first().click()

        cy.url().should('include', '/product_details/')
        cy.get('.product-information h2').should('be.visible')
        cy.get('.product-information').should('contain.text', 'Category:')
            .and('contain.text', 'Rs.')
            .and('contain.text', 'Availability:')
            .and('contain.text', 'Condition:')
            .and('contain.text', 'Brand:')
    })

    it('Caso de Teste 09: Pesquisar produtos', () => {
        //cy.visit('https://www.automationexercise.com')
      visitApplication()
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
        cy.get('a[href*="products"]').first().click()
        cy.contains('All Products').should('be.visible')

        cy.get('#search_product').type('top')
        cy.get('#submit_search').click()

        cy.contains('Searched Products').should('be.visible')
        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0)
            .each(($product) => {
                cy.wrap($product)
                    .find('.productinfo p')
                    .should('be.visible')
            })
    })

    it('Caso de Teste 10: Verificar a inscrição na página inicial', () => {
      visitApplication()
        //cy.visit('https://www.automationexercise.com')
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
        cy.get('footer').scrollIntoView()
        cy.contains('Subscription').should('be.visible')

        cy.get('#susbscribe_email').type(`automation-${faker.string.uuid()}@mail.com`)
        cy.get('#subscribe').click()

        cy.get('#success-subscribe')
            .should('be.visible')
            .and('contain.text', 'You have been successfully subscribed!')
    })

    it('Caso de Teste 15: Fazer pedido registrando antes do checkout', () => {
        const user = createUserData()

        registerUser(user)
        addProductsAndOpenCheckout()
        placeOrder(user)
        deleteCurrentAccount()
    })

    it('Caso de Teste 16: Fazer pedido entrando na conta antes do checkout', () => {
        const user = createUserData()

        registerUser(user)
        cy.get('a[href*="logout"]').click()
        loginUser(user)
        addProductsAndOpenCheckout()
        placeOrder(user)
        deleteCurrentAccount()
    })

});