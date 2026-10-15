/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    const password = '12345'

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
        cy.visit('https://www.automationexercise.com')
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

    const deleteCurrentAccount = () => {
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
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

    it('Caso de Teste 01: Registrar Usuário', () => {
        const user = createUserData()

        registerUser(user)
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Caso de Teste 02: Login com email e senha corretos', () => {
        const user = createUserData()

        registerUser(user)
        cy.get('a[href*="logout"]').click()
        openLoginPage()
        cy.get('[data-qa="login-email"]').type(user.email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()

        cy.contains(`Logged in as ${user.name}`).should('be.visible')

        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Caso de Teste 03: Login com e-mail e senha incorretos', () => {
        openLoginPage()
        cy.get('[data-qa="login-email"]').type(`invalid-${faker.string.uuid()}@mail.com`)
        cy.get('[data-qa="login-password"]').type('senha-incorreta')
        cy.get('[data-qa="login-button"]').click()

        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Caso de Teste 04: Deslogar Usuário', () => {
        const user = createUserData()

        registerUser(user)
        cy.get('a[href*="logout"]').click()

        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')

        openLoginPage()
        cy.get('[data-qa="login-email"]').type(user.email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Caso de Teste 05: Cadastrar um usuário com um endereço de email que já existe', () => {
        const user = createUserData()

        registerUser(user)
        cy.get('a[href*="logout"]').click()
        openLoginPage()
        cy.get('[data-qa="signup-name"]').type(user.name)
        cy.get('[data-qa="signup-email"]').type(user.email)
        cy.get('[data-qa="signup-button"]').click()

        cy.contains('Email Address already exist!').should('be.visible')

        openLoginPage()
        cy.get('[data-qa="login-email"]').type(user.email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Caso de Teste 08: Verificar todos os produtos e a página de detalhes do produto', () => {
        cy.visit('https://www.automationexercise.com')
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
        cy.visit('https://www.automationexercise.com')
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
        cy.visit('https://www.automationexercise.com')
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
})