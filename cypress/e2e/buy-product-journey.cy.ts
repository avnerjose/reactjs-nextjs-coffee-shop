describe("Buy a product journey test", () => {
  it("should be able to selected and by a product", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Catalog").click();

    cy.wait(1000);
    cy.location("pathname").should("eq", "/catalog");
    cy.getByDataTest("product-item").eq(0).find("button").click();
    cy.getByDataTest("cart-link").should("contain", "1");

    cy.getByDataTest("cart-link").click();
    cy.location("pathname").should("eq", "/cart");

    cy.getByDataTest("checkout-button").click();
    cy.location("pathname").should("eq", "/checkout");
    cy.get("li").should("have.length", 4);
    cy.contains("Contacts").should("exist");
    cy.wait(1000);
    cy.getByDataTest("first-name-input").type("John");
    cy.getByDataTest("last-name-input").type("Doe");
    cy.getByDataTest("phone-number-input").type("9999999999999");
    cy.getByDataTest("email-input").type("john.doe@email.com");
    cy.contains("Next").click();

    cy.contains("Delivery Address").should("exist");
    cy.contains("Delivery Method").should("exist");
    cy.getByDataTest("street-input").type("Wayne Alley");
    cy.getByDataTest("zip-code-input").type("999999999");
    cy.getByDataTest("number-input").type("100");
    cy.getByDataTest("city-input").type("Gotham City");
    cy.getByDataTest("neighborhood-input").type("Batman City");
    cy.get("input[type='radio']").last().click();
    cy.contains("Next").click();

    cy.contains("Payment method").should("exist");
    cy.get("input[type='radio']").last().click();
    cy.contains("Confirm Order").click();

    cy.contains("Your contact information").should("exist");
    cy.contains("Delivery information").should("exist");
    cy.contains("Payment method").should("exist");
    cy.contains("John Doe").should("exist");
    cy.contains("+99 (99) 99999-9999").should("exist");
    cy.contains("john.doe@email.com").should("exist");
    cy.contains("99999-999").should("exist");
    cy.contains("100").should("exist");
    cy.contains("Gotham City").should("exist");
    cy.contains("Batman City").should("exist");
    cy.contains("Finish Order").click();

    cy.contains("Your purchase was successful!").should("exist");
    cy.contains("Keep Shopping").click();

    cy.location("pathname").should("eq", "/");
    cy.getByDataTest("cart-link").should("not.contain", "1");
  });
});
