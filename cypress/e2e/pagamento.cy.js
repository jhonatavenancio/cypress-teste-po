import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import HomePage from '../pages/HomePage';
import VoosPage from '../pages/VoosPage';
import PagamentoPage from '../pages/PagamentoPage';

const dataIda = dayjs().add(30, 'day').format('YYYY-MM-DD');
const dataVolta = dayjs().add(40, 'day').format('YYYY-MM-DD');
const dataIdaFormatada = dayjs(dataIda).format('DD/MM/YYYY');

describe('Fluxo completo de reserva e pagamento de voos', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
    cy.validarTelaHome();
  });

  const preencherFluxoReserva = (origem, destino) => {
    HomePage.preencherOrigem(origem);
    HomePage.preencherDestino(destino);
    HomePage.preencherData(dataIda);
    HomePage.clicarBuscar();

    cy.validarBuscaDeVoos(origem, destino, dataIdaFormatada);
    VoosPage.clicarPlanoBasico();
    VoosPage.clicarContinuarPagamento();
    cy.validarTelaPagamento();
  };

  it('Reserva com pagamento via Cartão de Crédito', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      const nomeTitular = faker.person.fullName();
      const numeroCartao = '4111111111111111';
      const validade = `${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}/26`;
      const cvv = faker.finance.creditCardCVV();

      preencherFluxoReserva(origem, destino);

      PagamentoPage.clicarFormaPagamento('cartao');
      PagamentoPage.preencherDadosCartao(nomeTitular, numeroCartao, validade, cvv);
      PagamentoPage.clicarFinalizarCompra();

      cy.validarCompraComSucesso();
      cy.validarCodigoReserva();
    });
  });

  it('Reserva com pagamento via Pix', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      preencherFluxoReserva(origem, destino);

      PagamentoPage.clicarFormaPagamento('pix');
      cy.contains('Escaneie o código QR').should('be.visible');
      PagamentoPage.clicarFinalizarCompra();

      cy.validarCompraComSucesso();
      cy.validarCodigoReserva();
    });
  });

  it('Reserva com pagamento por Milhas', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      const numeroMilhas = '98765432100';
      const senha = faker.internet.password({ length: 8 });

      preencherFluxoReserva(origem, destino);

      PagamentoPage.clicarFormaPagamento('milhas');
      PagamentoPage.preencherDadosMilhas(numeroMilhas, senha);
      PagamentoPage.clicarFinalizarCompra();

      cy.validarCompraComSucesso();
      cy.validarCodigoReserva();
    });
  });

  it('Reserva com pagamento por Milhas com CPF inválido', () => {
    cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
      const numeroMilhas = '12345678912';
      const senha = faker.internet.password({ length: 8 });

      preencherFluxoReserva(origem, destino);

      PagamentoPage.clicarFormaPagamento('milhas');
      PagamentoPage.preencherDadosMilhas(numeroMilhas, senha);
      PagamentoPage.clicarFinalizarCompra();

      cy.get('p.mt-1.text-red-500.text-sm').should('contain.text', 'CPF inválido');
    });
  });

  const viewports = [
    { name: 'mobile', size: 'iphone-x' },
    { name: 'tablet', size: 'ipad-2' },
  ];

  viewports.forEach(({ name, size }) => {
    it(`Reserva responsiva (${name})`, () => {
      cy.viewport(size);
      cy.fixture('destinos_viagens').then(({ 0: { origem, destino } }) => {
        preencherFluxoReserva(origem, destino);

        PagamentoPage.clicarFormaPagamento('pix');
        cy.contains('Escaneie o código QR').should('be.visible');
        PagamentoPage.clicarFinalizarCompra();

        cy.validarCompraComSucesso();
        cy.validarCodigoReserva();
      });
    });
  });
});
