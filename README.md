# ✈️ Projeto de Testes Automatizados Cypress – Reserva de Passagens Aéreas

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-00b8a9.svg)
![Mochawesome](https://img.shields.io/badge/report-Mochawesome-blueviolet)

Este projeto foi desenvolvido com foco em **testes automatizados end-to-end (E2E)** utilizando [Cypress](https://www.cypress.io/), utilizando [Page Object](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions) no projeto, geração de relatórios com **Mochawesome**, e envio de **notificações para Discord** via Webhook para acompanhamento dos testes.

---

## 🚀 Tecnologias utilizadas

- [Cypress](https://docs.cypress.io/)
- [Mochawesome](https://github.com/adamgruber/mochawesome)
- [Faker.js](https://fakerjs.dev/)
- Node.js (recomendado: LTS 18+)
- Discord Webhook (para notificações)

---

## 🧪 Estrutura dos Testes

- Baseados em **componentes com `data-testid`**
- Divididos em `Home`, `Voos`, `Pagamento`
- Testes para desktop, tablet e mobile
- Casos positivos, negativos e de responsividade
- Fixtures para dados dinâmicos
- Testes de ponta a ponta: da busca ao pagamento

---

## 📊 Relatórios

- Gerados automaticamente após execução com **Mochawesome**
- Salvos na pasta: `cypress/reports/html`
- Visualização amigável para análise dos testes

```bash
npx cypress run --reporter mochawesome
````
![image](https://github.com/user-attachments/assets/f49818d9-b1b3-4943-aaf2-d96ac6d56a85)

![image](https://github.com/user-attachments/assets/f0f273c6-9a99-4261-bbf9-2b3fc69628b5)




---

## 📣 Notificações via Discord

Ao final da execução dos testes, em caso de **falha**, uma notificação com o resumo do teste é enviada para um canal do Discord via Webhook.

> ⚙️ Configure seu Webhook em `.env`:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK
```
![image](https://github.com/user-attachments/assets/e8a36cea-46d2-4882-8d65-d8b7c237fe84)


---

## 🧰 Como rodar o projeto

```bash
# 1. Instale as dependências
npm install

# 2. Execute os testes em modo headless com relatório
npm run test

# 3. Visualize o relatório
npx mochawesome-merge cypress/reports/*.json > cypress/reports/output.json
npx mochawesome-report-generator cypress/reports/output.json
```

> Ou use: `npm run test:report`

---

## 📁 Estrutura

```bash
cypress/
│
├── e2e/                         # Testes de interface
│   ├── home.cy.js
│   ├── pagamento.cy.js
│   └── voos.cy.js
│
├── fixtures/                    # Dados simulados (mocks)
│   └── destinos_viagens.json
│
├── pages/                       # Page Objects (Padrão de Projeto)
│   ├── HomePage.js              # Elementos e ações da Home
│   ├── PagamentoPage.js         # Elementos e ações da tela de Pagamento
│   └── VoosPage.js              # Elementos e ações da busca de Voos
│
├── reports/
│   └── html/                    # Relatórios gerados com Mochawesome
│
├── support/                     # Custom commands e setup
│   ├── commands.js
│   └── e2e.js

scripts/                         # Scripts para notificações Discord
```

---

## 🤖 Sistema gerado por IA

O sistema de Reserva de Passagens Aéreas (SkyBlue) foi gerado por IA para rwalizar testes automatizados utilizando Cypress, simulando um ambiente real.

![image](https://github.com/user-attachments/assets/a91a63c3-2e99-4734-adf3-05ac9b6b29b3)
