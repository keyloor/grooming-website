describe("Mascotas", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/pets", { statusCode: 200, body: [] }).as("getPets");
    cy.intercept("GET", "**/api/owners", {
      statusCode: 200,
      body: [{ id: 1, name: "Oscar", email: "o@x.com", phone: "88888888" }],
    }).as("getOwners");
  });

  it("muestra el listado vacío y el botón para agregar", () => {
    cy.visit("/pets");
    cy.contains("h1", "Mis mascotas").should("be.visible");
    cy.wait("@getPets");
    cy.contains("Todavía no tenés mascotas registradas.").should("be.visible");
    cy.contains("button", "Agregar mascota").should("be.visible");
  });

  it("no deja guardar sin nombre y registra una mascota correctamente", () => {
    cy.intercept("POST", "**/api/pets", {
      statusCode: 201,
      body: {
        id: 99,
        name: "Luna",
        species: "Perro",
        size: "Mediano",
        age: 3,
        notes: "",
        breedName: "Zaguate",
        ownerId: 1,
      },
    }).as("createPet");

    cy.visit("/pets");
    cy.wait("@getPets");
    cy.contains("button", "Agregar mascota").click();

    cy.contains("Nueva mascota").should("be.visible");
    // Criterio: no se puede enviar sin nombre.
    cy.contains("button", "Guardar").should("be.disabled");

    cy.get('input[placeholder="Nombre *"]').type("Luna");
    cy.get('input[placeholder="Raza (ej. Zaguate)"]').type("Zaguate");
    cy.contains("button", "Guardar").should("not.be.disabled").click();

    cy.wait("@createPet");
    // Criterio: mensaje de confirmación al guardar.
    cy.contains("¡Mascota registrada!").should("be.visible");
    cy.contains("Luna").should("be.visible");
  });
});
