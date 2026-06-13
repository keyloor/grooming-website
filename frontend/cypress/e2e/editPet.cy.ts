// cypress/e2e/edit-pet-name.cy.js

describe('Editar mascota - Cambiar nombre', () => {
  it('Debería cambiar el nombre de Firulais a otro nombre', () => {
    // Interceptar API calls
    cy.intercept('GET', '**/api/pets').as('getPets');
    cy.intercept('PUT', '**/api/pets/*').as('updatePet');
    cy.intercept('PATCH', '**/api/pets/*').as('updatePetPatch');
    
    // Visitar la página
    cy.visit('https://zagua-grooming.vercel.app/pets');
    
    // Esperar la carga de mascotas
    cy.wait('@getPets', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 200);
    
    // Verificar que Firulais está presente
    cy.contains('Firulais', { timeout: 10000 }).should('be.visible');
    
    // Hacer clic en el botón de edición de Firulais
    cy.contains('Firulais')
      .parentsUntil('div[class*="card"], div[class*="item"], li')
      .parent()
      .find('button')
      .first()
      .click({ force: true });
    
    // Esperar que aparezca el modal/formulario
    cy.get('input, dialog, [role="dialog"], form', { timeout: 5000 }).should('be.visible');
    
    // Buscar el input del nombre y cambiarlo
    // Opción 1: Input con placeholder que contenga "nombre"
    cy.get('input[placeholder*="nombre"], input[placeholder*="Nombre"], input[placeholder*="name"]')
      .first()
      .clear()
      .type('Rex');
    
    // Opción 2: El primer input del formulario (generalmente es el nombre)
    // cy.get('input').first().clear().type('Rex');
    
    // Opción 3: Input que contiene el valor "Firulais"
    // cy.get('input[value="Firulais"]').clear().type('Rex');
    
    // Guardar cambios
    cy.contains('button', /guardar|save|actualizar/i).click();
    
    // Esperar la solicitud de actualización
    cy.wait('@updatePet', { timeout: 10000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 201, 204]);
    
    // Verificar que el nombre cambió en la UI
    cy.contains('Rex', { timeout: 10000 }).should('be.visible');
    cy.contains('Firulais').should('not.exist');
  });
});