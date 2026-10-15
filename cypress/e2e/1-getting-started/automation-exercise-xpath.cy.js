///<reference types="cypress" />

describe('Automation Exercise', () => {
  let emailCadastrado

  // Os seletores CSS foram convertidos para XPath para exercitar o plugin
  // cypress-xpath. Atributos data-qa/id continuam sendo priorizados porque
  // identificam o elemento diretamente e são menos frágeis que posições.

  //cadastro
    it('Caso de teste 1: Cadastrar usuário', () => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
      const timestamp = new Date().getTime()
      emailCadastrado = `pga-${timestamp}@teste.com`

    cy.xpath('//*[@data-qa="signup-name"]').type('PGA Aut')
    cy.xpath('//*[@data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.xpath('//*[@data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.xpath('//*[@id="id_gender2"]').check()
    cy.xpath('//*[@data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.xpath('//*[@data-qa="days"]').select('10')
    cy.xpath('//*[@data-qa="months"]').select('May')
    cy.xpath('//*[@data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.xpath('//*[@id="newsletter"]').check()
    cy.xpath('//*[@id="optin"]').check()

    cy.xpath('//*[@data-qa="first_name"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="last_name"]').type('teste123')
    cy.xpath('//*[@data-qa="company"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="address"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="address2"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="country"]').select('Canada')
    cy.xpath('//*[@data-qa="state"]').type('teste123')
    cy.xpath('//*[@data-qa="city"]').type('teste123')
    cy.xpath('//*[@data-qa="zipcode"]').type('12345')
    cy.xpath('//*[@data-qa="mobile_number"]').type('1234567890')

    cy.xpath('//*[@data-qa="create-account"]').click()

    cy.xpath('//*[@data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.xpath('//a[@href="/logout"]', { timeout: 10000 }).should('be.visible')

      //valida se possui botão delete e clicar nele para deletar o usuário
    cy.xpath('//div[contains(@class,"shop-menu")]//a[contains(normalize-space(),"Delete Account")]').click()

    //clica para deletar o usuário
    cy.xpath('//*[@data-qa="continue-button"]').click()

    });

    it('Caso de teste 2.1: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    const timestamp = new Date().getTime()
    emailCadastrado = `pga-${timestamp}@teste.com`
    
    cy.xpath('//*[@data-qa="signup-name"]').type('PGA Aut')
    cy.xpath('//*[@data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.xpath('//*[@data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.xpath('//*[@id="id_gender2"]').check()
    cy.xpath('//*[@data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.xpath('//*[@data-qa="days"]').select('10')
    cy.xpath('//*[@data-qa="months"]').select('May')
    cy.xpath('//*[@data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.xpath('//*[@id="newsletter"]').check()
    cy.xpath('//*[@id="optin"]').check()

    cy.xpath('//*[@data-qa="first_name"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="last_name"]').type('teste123')
    cy.xpath('//*[@data-qa="company"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="address"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="address2"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="country"]').select('Canada')
    cy.xpath('//*[@data-qa="state"]').type('teste123')
    cy.xpath('//*[@data-qa="city"]').type('teste123')
    cy.xpath('//*[@data-qa="zipcode"]').type('12345')
    cy.xpath('//*[@data-qa="mobile_number"]').type('1234567890')

    cy.xpath('//*[@data-qa="create-account"]').click()

    cy.xpath('//*[@data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.xpath('//a[@href="/logout"]', { timeout: 10000 }).should('be.visible')


    })

    
it('Caso de teste 2.2: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com/')
  cy.xpath('//a[@href="/login"]').click()

  cy.xpath('//*[@data-qa="login-email"]').type(emailCadastrado)
  cy.xpath('//*[@data-qa="login-password"]').type('123456')
  cy.xpath('//*[@data-qa="login-button"]').click()
  cy.xpath('//a[@href="/logout"]', { timeout: 10000 }).should('be.visible')
    cy.xpath('//div[contains(@class,"shop-menu")]//a[contains(normalize-space(),"Delete Account")]').click()
     //clica para deletar o usuário
    cy.xpath('//*[@data-qa="continue-button"]').click()

    })

  it('Caso de teste 3: Login do usuário com e-mail e senha incorretos', () => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()

    cy.xpath('//*[@data-qa="login-email"]').type('tetet@tet.com')
    cy.xpath('//*[@data-qa="login-password"]').type('123456156544654645')
    cy.xpath('//*[@data-qa="login-button"]').click()
    cy.xpath('//*[contains(@class,"login-form")]//form/p')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!')
    
    })

    it('Caso de teste 4: Fazer logout do usuário', () => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    const timestamp = new Date().getTime()
    emailCadastrado = `pga-${timestamp}@teste.com`
    
    cy.xpath('//*[@data-qa="signup-name"]').type('PGA Aut')
    cy.xpath('//*[@data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.xpath('//*[@data-qa="signup-button"]').click()

    //check serve para marcar um checkbox, nesse caso o checkbox de gênero feminino
    cy.xpath('//*[@id="id_gender2"]').check()
    cy.xpath('//*[@data-qa="password"]').type('123456')
    //select serve para selecionar um valor de um select
    cy.xpath('//*[@data-qa="days"]').select('10')
    cy.xpath('//*[@data-qa="months"]').select('May')
    cy.xpath('//*[@data-qa="years"]').select('1990')
    //check para checkboxes serve para marcar um checkbox, nesse caso os checkboxes de newsletter e optin
    cy.xpath('//*[@id="newsletter"]').check()
    cy.xpath('//*[@id="optin"]').check()

    cy.xpath('//*[@data-qa="first_name"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="last_name"]').type('teste123')
    cy.xpath('//*[@data-qa="company"]').type('PGA teste123')
    cy.xpath('//*[@data-qa="address"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="address2"]').type('Rua teste123')
    cy.xpath('//*[@data-qa="country"]').select('Canada')
    cy.xpath('//*[@data-qa="state"]').type('teste123')
    cy.xpath('//*[@data-qa="city"]').type('teste123')
    cy.xpath('//*[@data-qa="zipcode"]').type('12345')
    cy.xpath('//*[@data-qa="mobile_number"]').type('1234567890')

    cy.xpath('//*[@data-qa="create-account"]').click()

    cy.xpath('//*[@data-qa="continue-button"]').should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/')

      //valida o usuário foi criado com sucesso e se está logado
    cy.xpath('//a[@href="/logout"]', { timeout: 10000 }).should('be.visible')

    cy.xpath('//a[@href="/logout"]').click()

    cy.xpath('//a[@href="/login"]').should('be.visible')
    })

       it('Caso de teste 5: Cadastrar usuário com e-mail existente', () => {
     cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()

    //cy.get serve para encontrar seletores, como id, class, tag, etc.
    //cy contains serve para encontrar elementos que contenham um texto específico
    
    cy.xpath('//*[@data-qa="signup-name"]').type('PGA Aut')
    cy.xpath('//*[@data-qa="signup-email"]').type(emailCadastrado)
    //cy click serve para clicar em um elemento
    cy.xpath('//*[@data-qa="signup-button"]').click()
    cy.xpath('//*[contains(@class,"signup-form")]//form/p')
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!')


    })

});

/*
Diagnóstico dos seletores XPath

Legibilidade:
- XPath com data-qa, id e href deixa explícito qual atributo identifica o elemento.
- Os seletores estruturais foram substituídos por buscas por classe, atributo ou texto,
  evitando depender de posições como :nth-child().
- XPath tende a ficar mais verboso que CSS, portanto deve ser usado quando há uma
  necessidade clara de navegar na estrutura ou combinar condições.

Velocidade de execução:
- Seletores CSS normalmente são ligeiramente mais rápidos e simples para o navegador.
- XPath pode adicionar um pequeno custo de busca, especialmente com expressões que
  percorrem muitos descendentes ou usam contains() em grandes partes do DOM.
- Neste arquivo, o impacto é pequeno porque os XPath são curtos e ancorados em
  atributos específicos. A estabilidade dos testes foi priorizada sobre esse custo.

Manutenibilidade:
- data-qa, id e href são preferíveis a posições fixas porque mudanças no layout tendem
  a não quebrá-los.
- O plugin cypress-xpath precisa continuar carregado em cypress/support/e2e.js.
*/