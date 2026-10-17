/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/index')
import {
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
} from '../../modules/automation-exercise'

describe('Automation Exercise', { retries: 1 }, () => {
  it('Cadastrar um novo usuário com sucesso', () => {
    openHomePage()
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)
    cadastro.preencherCadastro()
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
  })

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    loginUser('pgats-aut-test-1791030872114@mail.com')
  })

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    openLoginPage()

    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('54321')
    cy.get('[data-qa="login-button"]').click()
    verifyLoginError()
  })

  it('Efetuar Logout', () => {
    loginUser('pgats-aut-test-1791030872114@mail.com')

    logoutUser()
    verifyLogout()
  })

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    openHomePage()
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1791030872114@mail.com`)
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  })

  it('Caso de Teste 08: Verificar todos os produtos e a página de detalhes do produto', () => {
    openHomePage()
    verifyProducts()
  })

  it('Caso de Teste 09: Pesquisar produtos', () => {
    openHomePage()
    searchProducts()
  })

  it('Caso de Teste 10: Verificar a inscrição na página inicial', () => {
    openHomePage()
    subscribe()
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
    logoutUser()
    loginUser(user.email, user.name)
    addProductsAndOpenCheckout()
    placeOrder(user)
    deleteCurrentAccount()
  })
})

