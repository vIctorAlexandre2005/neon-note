describe('Testando Login com Firebase e Google OAuth', () => {
  beforeEach(() => {
    // Simular os dados do usuário autenticado
    const userData = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      uid: 'fake-user-id',
      photoURL: 'https://example.com/photo.jpg',
    };

    // Armazenar os dados do usuário no localStorage
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', JSON.stringify(userData));
        // Se sua aplicação utiliza um token JWT, adicione aqui
        win.localStorage.setItem('token', 'fake-jwt-token');
      },
    });
  });

  it('Deve exibir informações do usuário após simulação de login', () => {
    // Verificar se as informações do usuário são exibidas
    cy.get('[data-test=user-info]').should('contain', 'Continue com');
    /* cy.get('[data-test=user-info]').should('contain', 'testuser@example.com'); */
    cy.visit('/');
  });
});
