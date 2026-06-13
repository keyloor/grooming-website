describe("Editar mascota", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/pets", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Firulais",
          species: "Perro",
          breedName: "Zaguate",
          age: 4,
          size: "Mediano",
          notes: "",
          ownerId: 1,
        },
      ],
    }).as("getPets");

    cy.intercept("GET", "**/api/owners", {
      statusCode: 200,
      body: [{ id: 1, name: "Oscar Gómez", phone: "88888888" }],
    }).as("getOwners");

    cy.intercept("PUT", "**/api/pets/*", {
      statusCode: 200,
      body: {
        id: 1,
        name: "Rex",
        species: "Perro",
        breedName: "Zaguate",
        age: 4,
        size: "Mediano",
        notes: "",
        ownerId: 1,
      },
    }).as("updatePet");
  });

  it("cambia el nombre de Firulais a Rex", () => {
    cy.visit("/pets");
    cy.wait("@getPets");

    cy.contains("Firulais").should("be.visible");

    // Abrir el formulario de edición de la mascota
    cy.get('button[aria-label="Editar"]').first().click();

    cy.get('input[placeholder="Nombre"]').clear().type("Rex");
    cy.contains("button", "Guardar").click();

    cy.wait("@updatePet");

    cy.contains("¡Mascota actualizada!").should("be.visible");
    cy.contains("Rex").should("be.visible");
    cy.contains("Firulais").should("not.exist");
  });
});
