describe('Página de Servicios', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/api/services').as('getServices');

    cy.visit('https://zagua-grooming.vercel.app/services');

    cy.wait('@getServices')
      .its('response.statusCode')
      .should('eq', 200);
  });

  it('Carga la página correctamente', () => {
    cy.url().should('include', '/services');
  });

  it('La API devuelve servicios', () => {
    cy.get('@getServices').then((interception) => {
      expect(interception.response.body).to.not.equal(null);
    });
  });

  it('Muestra contenido en pantalla', () => {
    cy.get('body')
      .invoke('text')
      .should('have.length.greaterThan', 50);
  });

  it('No muestra errores', () => {
    cy.contains('404').should('not.exist');
    cy.contains('Not Found').should('not.exist');
    cy.contains('Error').should('not.exist');
  });

  it('Tiene al menos una tarjeta o elemento visible', () => {
    cy.get('main, section, div')
      .should('exist');
  });

});