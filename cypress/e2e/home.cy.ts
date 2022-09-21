describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("home page content", () => {
    it("hero section should have correct values", () => {
      cy.getByDataTest("hero-heading").should("contain", "Coffee Shop");
      cy.getByDataTest("hero-description").should(
        "contain",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti " +
          "modi corrupti, adipisci rem temporibus asperiores nobis porro illo"
      );
    });

    it("about us section should have correct values", () => {
      cy.contains("About Us").click();
      cy.getByDataTest("about-heading")
        .should("be.visible")
        .should("contain", "About Us");
      cy.getByDataTest("about-description").contains(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, " +
          "beatae? Cupiditate, eligendi. Molestiae maiores repudiandae, nostrum " +
          "natus veritatis quibusdam vel inventore sapiente! Omnis voluptatibus " +
          "illo laboriosam laborum reiciendis similique labore!"
      );
    });

    it("popular products section should have correct values", () => {
      cy.contains("Popular").click();
      cy.getByDataTest("popular-heading")
        .should("be.visible")
        .should("contain", "Popular Products");
    });

    it("stats section should have correct values", () => {
      cy.scrollTo("center");

      cy.get("li").eq(0).contains("120").should("be.visible");
      cy.get("li").eq(0).contains("Coffee Varieties");
      cy.get("li").eq(1).contains("50").should("be.visible");
      cy.get("li").eq(1).contains("Tested Hours");
      cy.get("li").eq(2).contains("200").should("be.visible");
      cy.get("li").eq(2).contains("Coffee Brands");
      cy.get("li").eq(3).contains("265").should("be.visible");
      cy.get("li").eq(3).contains("Coffee Markets");
    });

    it("footer should have correct values", () => {
      cy.scrollTo("bottom");

      cy.contains("Avner José").should("be.visible");
      cy.contains(`${new Date().getFullYear()}`).should("be.visible");
    });
  });

  context("Home nav header navigation", () => {
    it("should be able to navigate to catalog page", () => {
      cy.get('[href="/catalog"]').click();
      cy.location("pathname").should("eq", "/catalog");
    });

    it("should be able to navigate to cart page", () => {
      cy.getByDataTest("cart-link").click();
      cy.location("pathname").should("eq", "/cart");
    });
  });
});

//Use .only to run specific tests
