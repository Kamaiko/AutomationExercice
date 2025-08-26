# 🚀 Development Guide - AutomationExercise.com

> **Comprehensive development guide** for the AutomationExercise.com E2E testing framework

## 📋 Table of Contents

- [🛠️ Development Setup](#️-development-setup)
- [🧪 Testing Guidelines](#-testing-guidelines)
- [📝 Code Standards](#-code-standards)
- [🔄 Git Workflow](#-git-workflow)
- [🚀 CI/CD Best Practices](#-cicd-best-practices)
- [🔧 Troubleshooting](#-troubleshooting)

## 🛠️ Development Setup

### **Prerequisites**
- Node.js 20.x or higher
- npm 9.x or higher
- Git
- VS Code (recommended)

### **Initial Setup**
```bash
# Clone repository
git clone https://github.com/Kamaiko/AutomationExercice.git
cd AutomationExercice

# Install dependencies
npm install

# Verify Cypress installation
npm run cypress:verify

# Open Cypress Test Runner
npm run cypress:open
```

### **VS Code Extensions (Recommended)**
- **Cypress Snippets** - Cypress code snippets
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **GitLens** - Git integration
- **Thunder Client** - API testing

## 🧪 Testing Guidelines

### **Test Structure Best Practices**

#### **1. File Naming Convention**
```
cypress/e2e/
├── User/
│   ├── login.cy.js          # Specific functionality
│   ├── signup.cy.js         # Clear, descriptive names
│   └── profile.cy.js        # Use camelCase
├── Shop/
│   ├── product-listing.cy.js
│   ├── cart-management.cy.js
│   └── search-functionality.cy.js
```

#### **2. Test Organization**
```javascript
describe('User Authentication', () => {
  beforeEach(() => {
    // Setup: Visit page, clear cookies, etc.
    cy.visit('/login');
  });

  it('should login with valid credentials', () => {
    // Arrange: Prepare test data
    const user = { email: 'test@example.com', password: 'password123' };
    
    // Act: Perform actions
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();
    
    // Assert: Verify results
    cy.contains(`Logged in as ${user.email}`).should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    // Test negative scenarios
  });
});
```

#### **3. Custom Commands Best Practices**
```javascript
// cypress/support/commands.js

// Use descriptive names and JSDoc comments
/**
 * Custom command to login user with retry mechanism
 * @param {Object} user - User credentials
 * @param {string} user.email - User email
 * @param {string} user.password - User password
 * @param {number} maxRetries - Maximum retry attempts (default: 3)
 */
Cypress.Commands.add('loginWithRetry', (user, maxRetries = 3) => {
  const attemptLogin = (attempts = 0) => {
    cy.get('[data-qa="login-email"]').clear().type(user.email);
    cy.get('[data-qa="login-password"]').clear().type(user.password);
    cy.get('[data-qa="login-button"]').click();
    
    // Check if login was successful
    cy.get('body').then(($body) => {
      if ($body.text().includes('Invalid credentials') && attempts < maxRetries) {
        cy.log(`Login attempt ${attempts + 1} failed, retrying...`);
        attemptLogin(attempts + 1);
      }
    });
  };
  
  attemptLogin();
});

// Add to cypress/support/e2e.js
declare global {
  namespace Cypress {
    interface Chainable {
      loginWithRetry(user: any, maxRetries?: number): Chainable<any>;
    }
  }
}
```

### **4. Data Management**
```javascript
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  },
  "adminUser": {
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }
}

// In test file
beforeEach(() => {
  cy.fixture('users').then((users) => {
    this.userData = users;
  });
});

it('should login with fixture data', () => {
  cy.loginUser(this.userData.validUser);
});
```

## 📝 Code Standards

### **JavaScript/ES6+ Standards**
```javascript
// Use const/let instead of var
const user = { email: 'test@example.com' };
let retryCount = 0;

// Use arrow functions for callbacks
cy.get('[data-qa="items"]').each(($item) => {
  cy.wrap($item).should('be.visible');
});

// Use template literals
cy.log(`Attempting login for user: ${user.email}`);

// Use destructuring
const { email, password } = user;
```

### **Cypress Best Practices**
```javascript
// ✅ Good: Use data attributes for selectors
cy.get('[data-qa="login-button"]').click();

// ❌ Bad: Use text content or CSS classes
cy.contains('Login').click();
cy.get('.btn-primary').click();

// ✅ Good: Use custom commands for common actions
cy.loginUser(userData);

// ❌ Bad: Repeat code in every test
cy.get('[data-qa="login-email"]').type(user.email);
cy.get('[data-qa="login-password"]').type(user.password);
cy.get('[data-qa="login-button"]').click();
```

### **Error Handling**
```javascript
// Handle flaky elements
cy.get('[data-qa="dynamic-content"]', { timeout: 10000 })
  .should('be.visible');

// Handle conditional elements
cy.get('body').then(($body) => {
  if ($body.find('[data-qa="welcome-message"]').length > 0) {
    cy.get('[data-qa="welcome-message"]').should('contain', 'Welcome');
  }
});

// Retry mechanism for flaky operations
const retryOperation = (operation, maxRetries = 3) => {
  let attempts = 0;
  
  const attempt = () => {
    attempts++;
    try {
      operation();
    } catch (error) {
      if (attempts < maxRetries) {
        cy.log(`Attempt ${attempts} failed, retrying...`);
        cy.wait(1000);
        attempt();
      } else {
        throw error;
      }
    }
  };
  
  attempt();
};
```

## 🔄 Git Workflow

### **Branch Strategy**
```bash
# Main branch (production-ready code)
main

# Feature branches (new functionality)
feature/user-authentication
feature/shop-functionality
feature/api-integration

# Bug fix branches
fix/login-error
fix/cart-bug

# Hotfix branches (urgent production fixes)
hotfix/security-patch
```

### **Commit Message Convention**
```bash
# Format: type(scope): description

# Features
feat(auth): add user login functionality
feat(shop): implement shopping cart

# Bug fixes
fix(login): resolve authentication timeout
fix(ui): fix responsive design issues

# Documentation
docs(readme): update installation instructions
docs(api): add API endpoint documentation

# Refactoring
refactor(commands): optimize custom commands
refactor(tests): restructure test organization

# Testing
test(auth): add login test coverage
test(api): add API endpoint tests

# Chores
chore(deps): update Cypress to v14.5.4
chore(ci): optimize GitHub Actions workflow
```

### **Pull Request Process**
1. **Create feature branch** from main
2. **Implement changes** with tests
3. **Run tests locally** to ensure they pass
4. **Push branch** and create Pull Request
5. **Code review** and address feedback
6. **Merge** after approval and CI/CD success

## 🚀 CI/CD Best Practices

### **GitHub Actions Optimization**
```yaml
# .github/workflows/cypress.yml

# Use concurrency to prevent overlapping runs
concurrency:
  group: cypress-${{ github.ref }}
  cancel-in-progress: true

# Cache dependencies for faster builds
- name: Cache Cypress binary
  uses: actions/cache@v4
  with:
    path: ~/.cache/Cypress
    key: cypress-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

# Parallel test execution
strategy:
  fail-fast: false
  matrix:
    browser: [chrome, firefox, edge]
```

### **Test Execution Strategy**
```bash
# Smoke tests (critical functionality)
npm run test:smoke

# Regression tests (full test suite)
npm run test:regression

# Specific test categories
npm run test:user
npm run test:shop
npm run test:checkout
```

### **Artifact Management**
```yaml
# Upload test reports
- name: Upload Mochawesome report
  uses: actions/upload-artifact@v4
  with:
    name: mochawesome-report
    path: cypress/reports/html
    retention-days: 7

# Upload screenshots on failure
- name: Upload Cypress screenshots
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: cypress-screenshots
    path: cypress/screenshots
```

## 🔧 Troubleshooting

### **Common Issues & Solutions**

#### **1. Cypress Installation Issues**
```bash
# Clear Cypress cache
npx cypress cache clear

# Reinstall Cypress
npm uninstall cypress
npm install cypress

# Verify installation
npx cypress verify
```

#### **2. Test Flakiness**
```javascript
// Increase timeout for slow operations
cy.get('[data-qa="slow-element"]', { timeout: 15000 })
  .should('be.visible');

// Wait for network requests to complete
cy.intercept('GET', '/api/users').as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Use retry mechanism for flaky operations
cy.get('[data-qa="dynamic-content"]').should('exist');
```

#### **3. CI/CD Pipeline Issues**
```bash
# Check workflow logs
# Go to GitHub → Actions → Select workflow → View logs

# Common solutions:
# - Clear cache: Delete and recreate cache keys
# - Update Node.js version: Ensure compatibility
# - Check permissions: Verify repository permissions
```

### **Performance Optimization**
```javascript
// Use efficient selectors
cy.get('[data-qa="user-list"]').within(() => {
  cy.get('[data-qa="user-item"]').should('have.length', 10);
});

// Minimize DOM queries
const userList = cy.get('[data-qa="user-list"]');
userList.should('be.visible');
userList.find('[data-qa="user-item"]').should('have.length', 10);

// Use custom commands for repeated operations
cy.loginUser(userData);
cy.navigateToShop();
cy.addItemToCart(productId);
```

---

## 🎯 **Next Steps**

1. **Implement API Testing** - Add REST/GraphQL test coverage
2. **Performance Testing** - Add load and stress testing
3. **Security Testing** - Implement vulnerability scanning
4. **Mobile Testing** - Add responsive design validation
5. **Accessibility Testing** - Ensure WCAG compliance

**Happy Testing! 🚀**
