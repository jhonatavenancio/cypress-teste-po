class VoosPage {

  clicarPlanoPremium() {
    cy.contains('[data-testid^="select-premium-flight-"]', 'Premium').click();
  }

  clicarPlanoBasico() {
    cy.contains('[data-testid^="select-basic-flight-"]', 'Básico').click();
  }

  clicarContinuarPagamento() {
    cy.contains('button', 'Continuar para Pagamento').click();
  }

  clicarSelecionarVoosVolta() {
    cy.contains('button', 'Continuar para Voos de Volta').click();
  }
}

export default new VoosPage();
