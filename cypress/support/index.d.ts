declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByDataTest(selector: string): Chainable<any>;
  }
}
