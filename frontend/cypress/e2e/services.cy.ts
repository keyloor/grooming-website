describe("Servicios", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/services", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Baño completo",
          description: "Baño con shampoo hipoalergénico",
          price: 12000,
          durationMin: 45,
        },
        {
          id: 2,
          name: "Corte de pelo",
          description: "Corte a tijera",
          price: 9000,
          durationMin: 30,
        },
      ],
    }).as("getServices");
  });

  it("lista los servicios traídos del backend", () => {
    cy.visit("/services");
    cy.contains("h1", "Servicios").should("be.visible");
    cy.wait("@getServices");
    cy.contains("Baño completo").should("be.visible");
    cy.contains("Corte de pelo").should("be.visible");
    cy.contains("a", "Reservar").first().should("have.attr", "href", "/book");
  });

  it("muestra los chips de categoría", () => {
    cy.visit("/services");
    ["Todos", "Baños", "Cortes", "Spa", "Extras"].forEach((c) => {
      cy.contains("button", c).should("be.visible");
    });
  });
});
