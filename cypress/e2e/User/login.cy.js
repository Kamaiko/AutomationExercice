describe('Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('Test Case 2: Login with correct email and password', () => {
    cy.fixture('users').then(users => {
      const user = users[0] // Patrick

      // Utiliser la commande réutilisable loginUser
      cy.loginUser(user)
      

  // Vérifier que l’utilisateur est connecté
  cy.contains(`Logged in as ${user.name}`).should('be.visible')

        // 9-10 (Optionnel) Supprimer le compte pour reset les tests
        /*
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        */


    })
  })

  it('Test Case 3: Login with incorrect email', () => {
    cy.fixture('users').then(users => {
      const user = users[0] // Patrick

      // Créer un user temporaire avec email incorrect
      const wrongUser = { ...user, email: 'wrong.email@example.com' }

      // Appeler loginUser avec email incorrect
      cy.loginUser(wrongUser)

      // Vérifier le message d'erreur
      cy.contains('Your email or password is incorrect!').should('be.visible')


          // 6️⃣ (Optionnel) Supprimer le compte pour reset les tests
        /*
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        */


    })
  })

  it('Test Case 4: Logout User', () => {
  cy.fixture('users').then(users => {
    const user = users[0] // Patrick, compte déjà existant

    // 🔹 Se connecter avec loginUser
    cy.loginUser(user)

    // 🔹 Vérifier que l’utilisateur est connecté
    cy.contains(`Logged in as ${user.name}`).should('be.visible')
    // 🔹 Cliquer sur Logout
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click() // bouton logout

    // 🔹 Vérifier que l’utilisateur est redirigé vers la page login
    cy.contains('Login to your account').should('be.visible')
  })
})

})

