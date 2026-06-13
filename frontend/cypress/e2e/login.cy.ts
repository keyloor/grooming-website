describe("Login", () => {
  it("muestra el formulario de inicio de sesión por defecto", () => {
    cy.visit("/login");
    cy.contains("Bienvenido de vuelta").should("be.visible");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
  });

  it("cambia a la pestaña de crear cuenta y muestra los campos extra", () => {
    cy.visit("/login");
    cy.contains("button", "Crear cuenta").click();

    cy.contains("Crea tu cuenta").should("be.visible");
    cy.get('input[placeholder="Tu nombre"]').should("be.visible");
    cy.get('input[placeholder="Teléfono (para WhatsApp)"]').should("be.visible");
  });
});
