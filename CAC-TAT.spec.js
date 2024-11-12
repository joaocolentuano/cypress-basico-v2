/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        
        cy.get('#firstName')
            .should('be.visible')
            .type('João Pedro')
            .should('have.value', 'João Pedro')

        cy.get('#lastName')
            .should('be.visible')
            .type('Ferreira Sanches Siqueira Colentuano')
            .should('have.value', 'Ferreira Sanches Siqueira Colentuano')

        cy.get('#email')
            .should('be.visible')
            .type('emailcurso@gmail.com')
            .should('have.value', 'emailcurso@gmail.com')

        cy.get('#phone')
            .should('be.visible')
            .type('40028922')
            .should('have.value', '40028922')  

        cy.get('#open-text-area')
            .should('be.visible')
            .and('not.be.disabled')
            .type(longText, {delay: 0})
            .should('have.value', longText)

        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.get('.success > strong').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
        
        cy.get('#firstName').type('João Pedro')

        cy.get('#lastName').type('Ferreira Sanches Siqueira Colentuano')
        
        cy.get('#email').type('emailcursogmail.com')

        cy.get('#phone').type('40028922')  

        cy.get('#open-text-area').type('Obrigado pelo curso.')

        cy.get('button[type="submit"]').click()

        cy.get('.error > strong').should('be.visible')
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
        cy.get('#firstName').type('João Pedro')

        cy.get('#lastName').type('Ferreira Sanches Siqueira Colentuano')
        
        cy.get('#email').type('emailcursogmail.com')

        cy.get('#phone-checkbox').click()

        cy.get('#open-text-area').type('Obrigado pelo curso.')

        cy.get('button[type="submit"]').click()

        cy.get('.error > strong').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName')
            .type('João Pedro')
            .should('have.value', 'João Pedro')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Ferreira Sanches Siqueira Colentuano')
            .should('have.value', 'Ferreira Sanches Siqueira Colentuano')
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type('emailcursogmail.com')
            .should('have.value', 'emailcursogmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('40028922')
            .should('have.value', '40028922')
            .clear()
            .should('have.value', '') 
        
        cy.get('#open-text-area')
            .type('Obrigado pelo curso.')
            .should('have.value', 'Obrigado pelo curso.')
            .clear()
            .should('have.value', '')

        cy.get('button[type="submit"]').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        
        cy.get('button[type="submit"]').click()

        cy.get('.error > strong').should('be.visible')
    })

    it.only('Envia o formuário com sucesso usando um comando customizado', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success > strong').should('be.visible')
    })
})