describe('Cadastrar entradas e saídas com bugs', () => {
  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    //cy.contains("Salvar").contains().get().click()
    cy.get('button').click()

  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    //cy.get("#description").sendKeys("Mesada")
    //cy.get("#description").sendKeys("Mesada2")
    //cy.get("#amount").sendKeys(100)
    //cy.get("#date").sendKeys("2023-02-01")
    //cy.contains("Add").click()

    cy.get("#description").type("Mesada2")
    cy.get("#amount").type(200)
    cy.get("#date").type("2023-02-01")
    
    cy.get('button').click()
    
    cy.get("tbody tr").should("have.length", 1)

  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {

    cy.visit("https://devfinance-agilizei.netlify.app")
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada3")
    cy.get("#amount").type(300)

    //cy.get("#date").type("02/01/2023")
    cy.get("#date").type("2023-02-01")

    //cy.contains("Salvar").click()

    cy.get('button').click()
    cy.get("tbody tr").should("have.length", 1)

  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
//ordem do preenchimento dos campos estavam erradas, o campo de data estava sendo preenchido antes do campo de descrição e valor, o que causava um erro na aplicação.
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada5")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")
    
    //cy.contains("Salvar").click()
    cy.get('button').click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    //cy.contains("Nueva Transación").click()
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada6")
    cy.get("#amount").type(700)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get(".alert").should("not.exist")
  });

  //it.skip('Cadastrar uma nova transação de entrada - falha 6', () => {
    //foi necessário retirar o skip do teste, pois o mesmo não estava sendo executado, e estava sendo ignorado pelo Cypress.
    //não possuia a URL para acessar a aplicação, então foi necessário adicionar a URL no comando cy.visit()
    it('Cadastrar uma nova transação de entrada - falha 6', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });
}); 