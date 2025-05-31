// ***********************************************


Cypress.Commands.add('validarBuscaDeVoos', (origem, destino, data) => { 
    cy.get('[data-testid="departure-flight-list"]').should('contain.text', 'Voos de Ida');
    cy.get('[data-testid="departure-flight-list"] .text-gray-600')
        .should('contain.text', origem)
        .and('contain.text', destino)
        .and('contain.text', data);
})

Cypress.Commands.add('validarBuscaDeVoosVolta', (origem, destino, data) => { 
    cy.get('[data-testid="return-flight-list"]').should('contain.text', 'Voos de Volta');
    cy.get('[data-testid="return-flight-list"] .text-gray-600')
        .should('contain.text', origem)
        .and('contain.text', destino)
        .and('contain.text', data);
});



// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })