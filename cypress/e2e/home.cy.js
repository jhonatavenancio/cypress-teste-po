import dayjs from 'dayjs';

import HomePage from '../pages/HomePage';
import VoosPage from '../pages/VoosPage';

const dataIda = dayjs().add(30, 'day').format('YYYY-MM-DD');
const dataVolta = dayjs().add(40, 'day').format('YYYY-MM-DD');
const dataIdaFormatada = dayjs(dataIda).format('DD/MM/YYYY');
const dataVoltaFormatada = dayjs(dataVolta).format('DD/MM/YYYY');

describe('Testes de busca de voos na Home', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
    cy.validarTelaHome();
  });

  it('Deve buscar voos com dados obrigatórios preenchidos', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
    });
  });

  it('Deve buscar voos de ida e volta', () => {
    cy.fixture('destinos_viagens').then(({ 1: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.preencherDataVolta(dataVolta);
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);

      VoosPage.clicarPlanoPremium();
      VoosPage.clicarSelecionarVoosVolta();

      cy.validarBuscaDeVoosVolta(destino, origem, dataVoltaFormatada);
    });
  });

  it('Deve buscar voos com mais de um adulto', () => {
    cy.fixture('destinos_viagens').then(({ 2: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.adicionarAdulto();
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
    });
  });

  it('Deve buscar voos com adultos e crianças', () => {
    cy.fixture('destinos_viagens').then(({ 3: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.adicionarAdulto();
      HomePage.adicionarCriancaPassageira();
      HomePage.clicarBuscar();

      cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
    });
  });

  it('Deve exibir erro ao ultrapassar limite de crianças por adulto', () => {
    cy.fixture('destinos_viagens').then(({ 4: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData(dataIda);
      HomePage.adicionarCriancaPassageira();
      HomePage.adicionarCriancaPassageira();

      cy.get('[data-testid="passengers-container"] > .text-red-500')
        .should('be.visible')
        .and('contain.text', 'Máximo de 2 crianças por adulto');
    });
  });

  it('Deve exibir erro ao preencher data de ida inválida', () => {
    cy.fixture('destinos_viagens').then(({ 4: { origem, destino } }) => {
      HomePage.preencherOrigem(origem);
      HomePage.preencherDestino(destino);
      HomePage.preencherData('2000-10-14');
      HomePage.preencherDataVolta('2025-10-20');
      HomePage.clicarBuscar();

      cy.get('[data-testid="departure-date-input"]')
        .then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
        expect($input[0].validationMessage).to.include('O valor deve ser');
      });
    });
  });

  it('Deve buscar voo usando cards e alterar destino', () => {
    HomePage.selecionarCardDestino('Porto Seguro');
    HomePage.clicarAlterarOrdem();
    HomePage.selecionarCardDestino('Belo Horizonte');
    HomePage.preencherData(dataIda);
    HomePage.clicarBuscar();

    cy.validarBuscaDeVoos('Porto Seguro', 'Belo Horizonte', dataIdaFormatada);
  });

  const viewports = [
    { name: 'mobile', size: 'iphone-x' },
    { name: 'tablet', size: 'ipad-2' }
  ];

  viewports.forEach(({ name, size }) => {
    it(`Deve buscar voos na versão ${name}`, () => {
      cy.viewport(size);
      cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
        HomePage.preencherOrigem(origem);
        HomePage.preencherDestino(destino);
        HomePage.preencherData(dataIda);
        HomePage.clicarBuscar();

        cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
      });
    });
  });

});
