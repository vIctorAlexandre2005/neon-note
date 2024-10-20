describe('Firebase Authentication', () => {
  it('should sign in a user', () => {
    cy.login()
      .then((user) => {
        expect(user.email).to.equal('victoralexandredasilvamarins@gmail.com');
      });

    cy.visit('/');
   
  });
});