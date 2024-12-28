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

    it('Campo telefone continua vazio quanto preenchido com valor não númerico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('João Pedro')
        cy.get('#lastName').type('Ferreira Sanches Siqueira Colentuano')
        cy.get('#email').type('emailcursogmail.com')
        cy.get('#phone-checkbox').check()
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

    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it('Envia o formulário utilizando o cy.contains() para encontrar o botão', function(){
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]') //pega todos os elementos 'radio'
            .should('have.length', 3) //verifica se os três elementos são exibidos
            .each(function($radio) { //passa por cada um dos elementos 'radio'
                cy.wrap($radio).check() //checa todos os elementos 'radio'
                cy.wrap($radio).should('be.checked') //verifica se todos os elementos 'radio' estão checados
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]') //pega todos os elementos 'checkbox'
            .should('have.length', 2) //verifica se os dois elementos são exibidos
            .each(function($checkbox) { //repete a funcção para todos os elementos 'checkbox'
                cy.wrap($checkbox).check() //checa todos os elementos 'checkbox'
                cy.wrap($checkbox).should('be.checked') //verifica se todos os elementos 'checkbox' estão marcados
            })

        cy.get('input[type="checkbox"]') //novamente estou chamando os elementos 'checkbox'
            .last() //estou definindo que quero o último elemento
            .uncheck() //estou desmarcando o último elemento
            .should('not.be.checked') //estou conferindo que o último elemento está desmarcado
    })

    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json') //está pegando o arquivo da pasta 'fixtures'
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //neste caso estamos puxando o arquivo direto da pasta, ao invés de selecionar pelo 'input' 
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile') //foi dado um 'alias' para o arquivo, recebendo o nome de 'sampleFile'
        cy.get('input[type="file"]')
            .selectFile('@sampleFile') //utilizamos o '@' para chamar o 'alias' 
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })  

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank') //verifica que dentro do 'cy.get' existe o atributo: target="_blank"
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') //remove o atributo: target="_blank"
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })

})