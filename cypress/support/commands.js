Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    console.log("Comando customizado está sendo executado");
    cy.get('#firstName').type('João Pedro');
    cy.get('#lastName').type('Ferreira Sanches Siqueira Colentuano');
    cy.get('#email').type('emailcurso@gmail.com');
    cy.get('#phone').type('40028922');
    cy.get('#open-text-area').type('Teste');
    cy.contains('button', 'Enviar').click();
}) 