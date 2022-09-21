/// <reference types="cypress" />

Cypress.Commands.add("getByDataTest", (selector: string) =>
  cy.get(`[data-test=${selector}]`)
);
