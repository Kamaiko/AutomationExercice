describe('Signup Tests', () => {

  beforeEach(() => {
    // 1️⃣ Launch browser et naviguer sur la page d’accueil
    cy.visit('https://automationexercise.com')

  })

  it('Test Case 1: Register User', () => {

    // 2️⃣ Charger un utilisateur depuis fixture
    cy.fixture('users').then(users => {
      const user = users[1] // Utiliser le user #2 de la fixture (Julie)

      // 3️⃣ Signup du user avec notre fonction 
      cy.signupUser(user).then((signedUpUser) => {

        // 4️⃣ Vérifier que 'Logged in as username' est visible
        cy.contains(`Logged in as ${signedUpUser.name}`).should('be.visible')

        // 5️⃣ Vérifier que le lien Logout est visible
        cy.get(':nth-child(10) > a').should('be.visible')

        // 6️⃣ (Optionnel) Supprimer le compte pour reset les tests
        
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        
      })
    })
  })

it('Test Case 5: Register User with existing email', () => {
  cy.fixture('users').then(users => {
    const julie = users[1]  // User #2 : Julie
    const existingEmailUser = { ...julie, email: users[0].email } // Remplacer l’email par celui de Patrick

    // Essayer de s’inscrire avec l’email existant
    cy.signupUser(existingEmailUser)

    // Vérifier que le message d’erreur est visible
    cy.contains('Email Address already exist!').should('be.visible')
  })
})

})
