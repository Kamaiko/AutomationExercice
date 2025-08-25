describe('Contact Page Test', () => {
  let userData;

  beforeEach(() => {
    // Charger les données utilisateur depuis le fixture
    cy.fixture('users').then((users) => {
      userData = users[0]; // Exemple: Patrick
    });

    // Aller sur le site avant chaque test
    cy.visit('https://automationexercise.com/');
  });

  it('Vérifie que la page Contact fonctionne', () => {
    // Cliquer sur le lien "Contact us"
    cy.get('a').contains('Contact us').click();


    // Vérifier que l’URL contient /contact_us
    cy.url().should('include', '/contact_us');

    
    // Vérifier que le formulaire de contact est bien visible
    cy.get('div.contact-form').should('be.visible');



    // Remplir le formulaire
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type('Test Subject');
    cy.get('[data-qa="message"]').type('Ceci est un test automatique avec Cypress.');

    

    // Upload un fichier
    cy.get('input[type="file"]').selectFile('cypress/fixtures/Helloworld.txt');

    // Soumettre le formulaire
    cy.get('[data-qa="submit-button"]').click();

    // Vérifier que le message de succès apparaît
    cy.get('.status').should('contain.text', 'Success! Your details have been submitted successfully.');

    // Cliquer sur le lien "Home" pour revenir à la page d'accueil
    cy.get('a').contains('Home').click();

    // Vérifier que l'on est bien sur la page d'accueil en testant le chemin de l'URL
    cy.location('pathname').should('eq', '/');

  });
});
