class PagamentoPage {

  clicarFormaPagamento(tipo) {
    switch (tipo.toLowerCase()) {
      case 'cartao':
        cy.get('[data-testid="payment-method-credit"]').click();
        break;
      case 'pix':
        cy.get('[data-testid="payment-method-pix"]').click();
        break;
      case 'milhas':
        cy.get('[data-testid="payment-method-miles"]').click();
        break;
      default:
        throw new Error(`Forma de pagamento "${tipo}" não reconhecida.`);
    }
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