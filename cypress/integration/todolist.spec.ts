describe("The TaskList", () => {
  it("should have a title", () => {
    cy.visit("/");

    cy.get("h2").should("contain.text", "TodoList");
  });

  it("should add tasks", () => {
    cy.visit("/");

    cy.get("input").type("Käse{enter}");

    cy.get("li").should("contain", "Käse");
  });
});
