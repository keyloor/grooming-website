describe("Home", () => {
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
  });

  it("muestra el saludo genérico cuando no hay cliente guardado", () => {
    cy.visit("/");
    cy.contains("¡Bienvenido/a a Zagua!").should("be.visible");
    cy.contains("h1", "Cariño e higiene para tu mejor amigo").should("be.visible");
  });

  it("muestra el nombre del cliente cuando hay sesión guardada", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "zagua_owner",
          JSON.stringify({ id: 1, name: "Oscar Gómez", email: "o@x.com", phone: "88888888" })
        );
      },
    });
    cy.contains("¡Hola, Oscar!").should("be.visible");
  });

  it("muestra los accesos rápidos a las secciones principales", () => {
    cy.visit("/");
    cy.contains("Accesos rápidos").should("be.visible");
    cy.contains("Ver el catálogo").should("be.visible"); // Servicios
    cy.contains("Tus peludos").should("be.visible"); // Mascotas
    cy.contains("Próximas y pasadas").should("be.visible"); // Mis citas
  });
});
