describe('Toggle Dark Mode', () => {
  it('should toggle dark mode', () => {
    cy.visit('http://localhost:3000');
    // Clicando no botão dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();

    // Clicando para escrever uma nota
    cy.get('[data-testid="create-note"]').click();

    // Escrevendo no título
    cy.get('[data-testid="my-input"]').type('Testando Cypress');
    cy.get('[data-testid="my-input"]').should('have.value', 'Testando Cypress');
    
    // Escrevendo ao campo de descrição
    cy.get('[data-testid="my-textarea"]').type('DESCRIÇÃOOO');
    cy.get('[data-testid="my-textarea"]').should('have.value', 'DESCRIÇÃOOO');
    
    // Clicando no botão salvar
    cy.get('[data-testid="save-note"]').click();
    
    // Clicando na nota já salva para poder editar
    cy.get('[data-testid="note-0"]').click();
    
    // Removendo o título salvo
    cy.get('[data-testid="my-input-modal-title"]').type('{backspace}'.repeat(16));
    cy.get('[data-testid="my-input-modal-title"]').should('have.value', '');
    
    // Removendo o campo de descrição salvo
    cy.get('[data-testid="my-textarea-modal-text"]').type('{backspace}'.repeat(16));
    cy.get('[data-testid="my-textarea-modal-text"]').should('have.value', '');
    
    // Tentando salvar uma nota vazia
    cy.get('[data-testid="my-button-modal-save"]').click();
    
    // Após ser negado, vou digitar um título
    cy.get('[data-testid="my-input-modal-title"]').type('Título para testar o modal de edição');
    cy.get('[data-testid="my-input-modal-title"]').should('have.value', 'Título para testar o modal de edição');
    
    // Tentando salvar com o campo de descrição vazio
    cy.get('[data-testid="my-button-modal-save"]').click();
    
    // Após ser negado, vou digitar uma descrição
    cy.get('[data-testid="my-textarea-modal-text"]').type('Descrição para testar o modal de edição');
    cy.get('[data-testid="my-textarea-modal-text"]').should('have.value', 'Descrição para testar o modal de edição');
    
    // Após preencher todos os campos, vou clicar no botão salvar
    cy.get('[data-testid="my-button-modal-save"]').click();

    // Excluindo nota que foi salva e logo após editada.
    cy.get('[data-testid="delete-note-0"]').click();
  });
});
