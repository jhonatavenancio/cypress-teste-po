class PagamentoPage {

  clicarFormaPagamento(tipo) {
  const formas = {
    cartao: '[data-testid="payment-method-credit"]',
    pix: '[data-testid="payment-method-pix"]',
    milhas: '[data-testid="payment-method-miles"]'
  };
  const seletor = formas[tipo.toLowerCase()];
  if (!seletor) throw new Error(`Forma de pagamento "${tipo}" não reconhecida.`);
  cy.get(seletor).click();
  }

  preencherDadosCartao(nome, numeroCartao, validade, cvv) {
    cy.get('[data-testid="card-name-input"]').type(nome);
    cy.get('[data-testid="card-number-input"]').type(numeroCartao);
    cy.get('[data-testid="card-expiry-input"]').type(validade);
    cy.get('[data-testid="card-cvv-input"]').type(cvv);
  }

  preencherDadosMilhas(cpf, senha) {
    cy.get('[data-testid="miles-cpf-input"]').type(cpf);
    cy.get('[data-testid="miles-password-input"]').type(senha);
  }

  clicarFinalizarCompra() {
  cy.contains('button', 'Finalizar Compra').click();
  }

}

export default new PagamentoPage();