describe("Eliminar mascota", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/pets", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Max",
          species: "Perro",
          breedName: "Golden Retriever",
          age: 8,
          size: "Grande",
          notes: "",
          ownerId: 1,
        },
        {
          id: 2,
          name: "Rex",
          species: "Perro",
          breedName: "Pastor Alemán",
          age: 3,
          size: "Grande",
          notes: "",
          ownerId: 1,
        },
      ],
    }).as("getPets");

    cy.intercept("GET", "**/api/owners", {
      statusCode: 200,
      body: [{ id: 1, name: "Oscar Gómez", phone: "88888888" }],
    }).as("getOwners");

    cy.intercept("DELETE", "**/api/pets/*", {
      statusCode: 204,
      body: {},
    }).as("deletePet");
  });

  it("elimina a Max y mantiene a Rex", () => {
    cy.visit("/pets");
    cy.wait("@getPets");

    cy.contains("Max").should("be.visible");
    cy.contains("Golden Retriever").should("be.visible");
    cy.contains("Rex").should("be.visible");

    // Botón eliminar de la primera mascota (Max)
    cy.get('button[aria-label="Eliminar"]').first().click();
    cy.contains("button", "Sí, eliminar").click();

    cy.wait("@deletePet");

    cy.contains("¡Mascota eliminada!").should("be.visible");
    cy.contains("Max").should("not.exist");
    cy.contains("Rex").should("be.visible");
  });
});
