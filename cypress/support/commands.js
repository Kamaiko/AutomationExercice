// -------------------- SIGNUP --------------------
/**
 * Cypress custom command: signupUser(user)
 * - Navigates to Signup/Login
 * - Attempts signup with provided user
 * - If email already exists, exits early and returns cy.wrap(user)
 * - Otherwise completes full registration and verifies logged-in state
 *
 * @param {Object} user
 * @property {string} user.name
 * @property {string} user.email
 * @property {'male'|'female'} user.gender
 * @property {string} user.password
 * @property {string|number} user.day
 * @property {string} user.month
 * @property {string|number} user.year
 * @property {boolean} user.newsletter
 * @property {boolean} user.optin
 * @property {string} user.firstName
 * @property {string} user.lastName
 * @property {string} user.company
 * @property {string} user.address
 * @property {string} user.address2
 * @property {string} user.country
 * @property {string} user.state
 * @property {string} user.city
 * @property {string|number} user.zipcode
 * @property {string|number} user.mobile
 */
Cypress.Commands.add('signupUser', (user) => {
  const qa = (attr) => `[data-qa="${attr}"]`;

  const {
    name,
    email,
    gender,
    password,
    day,
    month,
    year,
    newsletter,
    optin,
    firstName,
    lastName,
    company,
    address,
    address2,
    country,
    state,
    city,
    zipcode,
    mobile,
  } = user;

  cy.contains('Signup / Login').click();
  cy.contains('New User Signup!').should('be.visible');

  cy.get(qa('signup-name')).type(name);
  cy.get(qa('signup-email')).type(email);
  cy.get(qa('signup-button')).click();

  // Vérifier si l'email existe déjà
  cy.get('body').then(($body) => {
    if ($body.text().includes('Email Address already exist!')) {
      cy.log('Email déjà existant, arrêt de la commande signupUser');
      cy.log('Email already exists, stopping signupUser early');
      return cy.wrap(user); // Arrêt ici, test succeed
    }

    // Si l'email n'existe pas, continuer le remplissage du formulaire
    cy.contains('Enter Account Information').should('be.visible');

    const genderSelector = gender === 'male' ? '#id_gender1' : '#id_gender2';
    cy.get(genderSelector).click();

    cy.get(qa('password')).type(password);
    cy.get(qa('days')).select(day);
    cy.get(qa('months')).select(month);
    cy.get(qa('years')).select(year);

    if (newsletter) cy.get('#newsletter').check();
    if (optin) cy.get('#optin').check();

    cy.get(qa('first_name')).type(firstName);
    cy.get(qa('last_name')).type(lastName);
    cy.get(qa('company')).type(company);
    cy.get(qa('address')).type(address);
    cy.get(qa('address2')).type(address2);
    cy.get(qa('country')).select(country);
    cy.get(qa('state')).type(state);
    cy.get(qa('city')).type(city);
    cy.get(qa('zipcode')).type(zipcode);
    cy.get(qa('mobile_number')).type(mobile);

    cy.get(qa('create-account')).click();
    cy.contains('Account Created!').should('be.visible');
    cy.get(qa('continue-button')).click();
    cy.contains(`Logged in as ${name}`).should('be.visible');

    return cy.wrap(user);
  });
});



// -------------------- LOGIN --------------------
// Test comment for Git workflow verification
Cypress.Commands.add('loginUser', (user) => {
  // Vérifier home page
  cy.get('body').should('be.visible')

  // Cliquer sur Signup / Login
  cy.contains('Signup / Login').click()

  // Remplir login
  cy.get('[data-qa="login-email"]').type(user.email)
  cy.get('[data-qa="login-password"]').type(user.password)
  cy.get('[data-qa="login-button"]').click()


})