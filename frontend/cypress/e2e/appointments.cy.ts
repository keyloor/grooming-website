describe("Citas", () => {
  it("muestra las próximas citas y permite ver el historial", () => {
    cy.visit("/appointments");
    cy.contains("h1", "Mis citas").should("be.visible");
    cy.contains("button", "Próximas").should("be.visible");
    cy.contains("button", "Historial").should("be.visible");

    // Pestaña "Próximas" (placeholder)
    cy.contains("Baño + corte").should("be.visible");

    // Cambiar a "Historial"
    cy.contains("button", "Historial").click();
    cy.contains("Baño completo").should("be.visible");
    cy.contains("Corte de uñas").should("be.visible");
  });
});
