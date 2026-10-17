import { faker } from '@faker-js/faker'

const password = '12345'
const defaultBaseUrl = 'https://www.automationexercise.com'

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

const openHomePage = () => {
  visitApplication()
}

const openLoginPage = () => {
  openHomePage()
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

const loginUser = (email, userName = 'PGATS Aut', userPassword = password) => {
  visitApplication('/login')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(userPassword)
  cy.get('[data-qa="login-button"]').click()

  if (userPassword === password) {
    cy.contains('.navbar-nav li', userName).should('be.visible')
  }
}

const logoutUser = () => {
  cy.get('a[href*="logout"]').should('be.visible').click()
}

const verifyLogout = () => {
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible')
  cy.url().should('include', 'login')
}

const verifyLoginError = () => {
  cy.get('form[action*="login"] > p')
    .should('exist')
    .and('be.visible')
    .and('contain', 'Your email or password is incorrect!')
}

const verifyProducts = () => {
  cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
  cy.get('a[href*="products"]').first().click()
  cy.contains('All Products').should('be.visible')
  cy.get('.features_items .product-image-wrapper').should('be.visible')
  cy.get('.features_items a[href*="/product_details/"]').first().click()
  cy.url().should('include', '/product_details/')
  cy.get('.product-information h2').should('be.visible')
  cy.get('.product-information')
    .should('contain.text', 'Category:')
    .and('contain.text', 'Rs.')
    .and('contain.text', 'Availability:')
    .and('contain.text', 'Condition:')
    .and('contain.text', 'Brand:')
}

const searchProducts = () => {
  cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
  cy.get('a[href*="products"]').first().click()
  cy.contains('All Products').should('be.visible')
  cy.get('#search_product').type('top')
  cy.get('#submit_search').click()
  cy.contains('Searched Products').should('be.visible')
  cy.get('.features_items .product-image-wrapper')
    .should('have.length.greaterThan', 0)
    .each(($product) => {
      cy.wrap($product).find('.productinfo p').should('be.visible')
    })
}

const subscribe = () => {
  cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
  cy.get('footer').scrollIntoView()
  cy.contains('Subscription').should('be.visible')
  cy.get('#susbscribe_email').type(`automation-${faker.string.uuid()}@mail.com`)
  cy.get('#subscribe').click()
  cy.get('#success-subscribe')
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!')
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

export {
  addProductsAndOpenCheckout,
  createUserData,
  deleteCurrentAccount,
  loginUser,
  logoutUser,
  openHomePage,
  openLoginPage,
  placeOrder,
  registerUser,
  searchProducts,
  subscribe,
  verifyLoginError,
  verifyLogout,
  verifyProducts
}