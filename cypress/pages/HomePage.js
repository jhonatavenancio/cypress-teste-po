class HomePage {

  preencherOrigem(origem) {
    cy.get('[data-testid="origin-input"]').type(origem);
  }

  preencherDestino(destino) {
    cy.get('[data-testid="destination-input"]').type(destino);
  }

  selecionarDestino() {
    cy.get('[data-testid="destination-card-PS"] > .h-24').click();
  }

  preencherData(data) {
    cy.get('[data-testid="departure-date-input"]').clear().type(data);
  }

  preencherDataVolta(data) {
    cy.get('[data-testid="return-date-input"]').clear().type(data);
  }

  adicionarAdulto() {
    cy.get('[data-testid="add-adult-button"]').click();
  }

  adicionarCriancaPassageira() {
    cy.get('[data-testid="add-child-button"]').click();
  }

  clicarBuscar() {
    cy.contains('button', 'Buscar Voos').click();
  }

  selecionarCardDestino(nome) {
    cy.contains('[data-testid^="destination-card-"] h3', nome).click();
  }

  clicarAlterarOrdem() {
    cy.get('[data-testid="swap-locations-button"]').click();
  }
}

export default new HomePage();
