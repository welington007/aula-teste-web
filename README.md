# PGATS Automacao Web 2026

Projeto de testes end-to-end com Cypress para o site [Automation Exercise](https://www.automationexercise.com), desenvolvido durante as aulas de automacao web da POS.

## Pre-requisitos

- Node.js instalado;
- npm instalado;
- acesso a internet, pois os testes acessam o site `automationexercise.com`.

## Instalacao

Na raiz do projeto, instale as dependencias:

```bash
npm install
```

## Execucao

Abra o Cypress em modo interativo:

```bash
npx cypress open
```

Execute todos os specs em modo headless:

```bash
npx cypress run
```

Execute um spec especifico:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise.cy.js"
```

Para executar a suite modularizada:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-modules.cy.js"
```

O caminho do spec modularizado inclui a pasta `1-getting-started`. O arquivo importa o modulo de cadastro com o caminho relativo `../../modules/cadastro/index`.

## Estrutura do projeto

```text
cypress/
├── e2e/
│   └── 1-getting-started/
│       ├── automation-exercise.cy.js
│       ├── automation-exercise-modules.cy.js
│       ├── automation-exercise-v2.cy.js
│       ├── automation-exercise-v3.cy.js
│       ├── automation-exercise-xpath.cy.js
│       └── exercicio2.cy.js
├── modules/
│   ├── automation-exercise/
│   │   └── index.js
│   └── cadastro/
│       └── index.js
├── support/
│   ├── automation-exercise.js
│   ├── commands.js
│   └── e2e.js
└── fixtures/
	└── example.json
```

## Organizacao dos testes

### Specs (`cypress/e2e`)

Os arquivos `.cy.js` descrevem os cenarios e a ordem das acoes do usuario. As versoes atuais representam diferentes etapas de evolucao da automacao:

- `automation-exercise.cy.js`: cenarios com comandos escritos diretamente no spec;
- `automation-exercise-v2.cy.js`: cenarios que reutilizam funcoes do arquivo de suporte;
- `automation-exercise-v3.cy.js`: cenarios com dados de usuario gerados pelo Faker;
- `automation-exercise-modules.cy.js`: os mesmos dez cenarios do spec principal, usando modulos reutilizaveis;
- `automation-exercise-xpath.cy.js` e `exercicio2.cy.js`: exercicios complementares.

### Modulos de dominio (`cypress/modules`)

O arquivo `cypress/modules/cadastro/index.js` concentra as acoes e as verificacoes relacionadas ao cadastro:

- `iniciarCadastro(nome, email)`;
- `preencherCadastro()`;
- `verificarSeCadastroFoiEfetuadoComSucesso()`;
- `verificarSeMensagemDeCadastroExistenteFoiExibida()`.

O spec modularizado importa essas funcoes e fica responsavel apenas pelo cenario:

```js
const cadastro = require('../../modules/cadastro/index')

cadastro.iniciarCadastro(nome, email)
cadastro.preencherCadastro()
cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
```

Assim, os seletores e os detalhes do fluxo ficam no modulo, enquanto o spec permanece focado no comportamento que deve ser validado.

O arquivo `cypress/modules/automation-exercise/index.js` concentra os demais fluxos reutilizaveis:

- criacao de dados de usuario com Faker;
- registro, login, logout e exclusao de conta;
- validacao de produtos e pesquisa;
- inscricao na pagina inicial;
- adicao de produtos ao carrinho e checkout;
- preenchimento e confirmacao do pedido.

O spec modularizado importa esses fluxos e mantem nos testes somente a preparacao do cenario e a composicao das acoes:

```js
import {
	addProductsAndOpenCheckout,
	createUserData,
	placeOrder,
	registerUser
} from '../../modules/automation-exercise'

const user = createUserData()
registerUser(user)
addProductsAndOpenCheckout()
placeOrder(user)
```

### Funcoes compartilhadas (`cypress/support`)

O arquivo `cypress/support/automation-exercise.js` exporta fluxos reutilizaveis de alto nivel, como:

- `startSignup(email)`;
- `registerUser(email)`;
- `loginUser(email, senha)`;
- `logoutUser()`;
- `deleteAccount()`.

O arquivo `cypress/support/e2e.js` e carregado automaticamente pelo Cypress e registra os comandos e plugins compartilhados, incluindo `cypress-xpath` e `cypress-mochawesome-reporter`.

## Relatorios

O projeto utiliza `cypress-mochawesome-reporter`. Os arquivos de relatorio sao gerados em `cypress/reports/html` após a execucao dos testes.

## Observacoes

- O spec `automation-exercise-modules.cy.js` possui os mesmos dez cenarios do spec principal e pode ser executado diretamente pelo comando indicado acima.
- O script `npm test` ainda e apenas o placeholder criado pelo npm. Use os comandos `npx cypress ...` acima para executar os testes.
