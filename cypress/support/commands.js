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

Cypress.Commands.add('validarCompraComSucesso', () => { 
    cy.get('h2.text-2xl.font-bold.text-gray-800')
    .should('contain.text', 'Compra Confirmada!');
});

Cypress.Commands.add('validarCodigoReserva', () => { 
    cy.get('div.bg-blue-50 p.text-gray-700')
    .should('contain.text', 'Código da Reserva');
});

Cypress.Commands.add('validarTelaHome', () => { 
    cy.contains('h1', 'Descubra novos destinos').should('be.visible');
});


Cypress.Commands.add('validarTelaPagamento', () => { 
    cy.contains('h2', 'Forma de Pagamento').should('be.visible');
});