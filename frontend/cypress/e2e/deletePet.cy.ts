// cypress/e2e/delete-max-fixed.cy.js

describe('Eliminar a Max', () => {
  it('Debería eliminar a Max', () => {
    // Interceptar API calls
    cy.intercept('GET', '**/api/pets').as('getPets');
    cy.intercept('DELETE', '**/api/pets/*').as('deletePet');
    
    // Visitar la página (URL CORRECTA con guión)
    cy.visit('https://zagua-grooming.vercel.app/pets');
    
    // Esperar la carga de mascotas
    cy.wait('@getPets', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 200);
    
    // Verificar que Max existe (solo el nombre)
    cy.contains('Max', { timeout: 10000 }).should('be.visible');
    
    // Verificar la raza y edad por separado (más flexible)
    cy.contains('Golden Retriever').should('be.visible');
    cy.contains('8 años').should('be.visible');
    
    // Hacer clic en el botón de ELIMINAR de Max (segundo botón eliminar)
    cy.get('button[aria-label="Eliminar"]').eq(1).click({ force: true });
    
    // Confirmar eliminación
    cy.contains('button', 'Sí, eliminar').click();
    
    // Esperar la solicitud DELETE
    cy.wait('@deletePet', { timeout: 10000 });
    
    // Verificar que Max ya no existe
    cy.contains('Max', { timeout: 5000 }).should('not.exist');
    
    // Verificar que Rex sigue presente
    cy.contains('Rex').should('be.visible');
  });
});