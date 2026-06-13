describe("Reservar cita", () => {
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
      ],
    }).as("getServices");
    cy.intercept("GET", "**/api/pets", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Luna",
          species: "Perro",
          size: "Mediano",
          age: 3,
          notes: "",
          breedName: "Zaguate",
          ownerId: 1,
        },
      ],
    }).as("getPets");
  });

  it("avanza del paso de servicio al de mascota", () => {
    cy.visit("/book");
    cy.contains("¿Qué servicio?").should("be.visible");
    cy.wait("@getServices");

    cy.contains("button", "Baño completo").click();

    cy.contains("¿Para quién?").should("be.visible");
    cy.contains("Luna").should("be.visible");
  });
});
