import dayjs from 'dayjs';
import HomePage from '../pages/HomePage';
import VoosPage from '../pages/VoosPage';

const dataIda = dayjs().add(30, 'day').format('YYYY-MM-DD');
const dataVolta = dayjs().add(40, 'day').format('YYYY-MM-DD');
const dataIdaFormatada = dayjs(dataIda).format('DD/MM/YYYY');

describe('Fluxo de reserva de voos', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));

    cy.validarTelaHome();
  });

  it('Deve reservar voo de ida com assento básico', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
      VoosPage.clicarPlanoBasico();
      VoosPage.clicarContinuarPagamento();

      cy.validarTelaPagamento();
    });
  });

  it('Deve reservar voo de ida com assento premium', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
      VoosPage.clicarPlanoPremium();
      VoosPage.clicarContinuarPagamento();

      cy.validarTelaPagamento();
    });
  });

  it('Deve reservar ida com assento básico e volta com assento premium', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.preencherDataVolta(dataVolta);
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
      VoosPage.clicarPlanoBasico();
      VoosPage.clicarSelecionarVoosVolta();
      VoosPage.clicarPlanoPremium();
      VoosPage.clicarContinuarPagamento();

      cy.validarTelaPagamento();
    });
  });

  const viewports = [
    { name: 'mobile', size: 'iphone-x' },
    { name: 'tablet', size: 'ipad-2' }
  ];

  viewports.forEach(({ name, size }) => {
    it(`Deve realizar reserva de ida e volta com layout responsivo (${name})`, () => {
      cy.viewport(size);

      cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
        HomePage.preencherOrigem(origem);
        HomePage.preencherDestino(destino);
        HomePage.preencherData(dataIda);
        HomePage.preencherDataVolta(dataVolta);
        HomePage.clicarBuscar();

        cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
        VoosPage.clicarPlanoBasico();
        VoosPage.clicarSelecionarVoosVolta();
        VoosPage.clicarPlanoPremium();
        VoosPage.clicarContinuarPagamento();

        cy.validarTelaPagamento();
      });
    });
  });
});
