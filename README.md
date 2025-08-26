# 🚀 AutomationExercise.com - E2E Testing Framework

[![E2E Cypress](https://github.com/Kamaiko/AutomationExercice/actions/workflows/cypress.yml/badge.svg)](https://github.com/Kamaiko/AutomationExercice/actions/workflows/cypress.yml)
[![Cypress](https://img.shields.io/badge/Cypress-14.5.4-00C58E?logo=cypress&logoColor=white)](https://cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-✓-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)

> **Professional E2E Testing Framework** for [AutomationExercise.com](https://automationexercise.com/) - A comprehensive testing solution demonstrating modern DevOps practices, CI/CD pipelines, and enterprise-grade automation testing.

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture & Best Practices](#️-architecture--best-practices)
- [🚀 Getting Started](#-getting-started)
- [🧪 Test Structure](#-test-structure)
- [⚙️ Configuration](#️-configuration)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [📊 Reporting & Artifacts](#-reporting--artifacts)
- [🔧 Development Workflow](#-development-workflow)
- [📚 Learning Objectives](#-learning-objectives)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

This project serves as a **comprehensive learning platform** for modern software development practices, focusing on:

- **🔍 E2E Testing Automation** with Cypress
- **🔄 CI/CD Pipeline Implementation** using GitHub Actions
- **📊 Professional Test Reporting** with Mochawesome
- **🏗️ Enterprise Development Practices** and best practices
- **🚀 DevOps Workflow** automation and optimization

### 🎓 **Learning Goals**
- Master **Cypress E2E Testing** framework
- Implement **CI/CD pipelines** with GitHub Actions
- Practice **DevOps methodologies** and automation
- Develop **enterprise-grade testing strategies**
- Gain hands-on experience with **modern development workflows**

## 🛠️ Tech Stack

### **Core Testing Framework**
- **[Cypress 14.5.4](https://cypress.io/)** - Modern E2E testing framework
- **[Mocha](https://mochajs.org/)** - JavaScript test runner
- **[Mochawesome](https://github.com/adamgruber/mochawesome)** - Professional HTML test reporter

### **Development & Build Tools**
- **[Node.js 20.x](https://nodejs.org/)** - JavaScript runtime
- **[npm](https://www.npmjs.com/)** - Package manager
- **[Git](https://git-scm.com/)** - Version control

### **CI/CD & DevOps**
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **[Ubuntu Latest](https://ubuntu.com/)** - CI/CD runner environment
- **Artifact Management** - Test reports and screenshots storage

## 🏗️ Architecture & Best Practices

### **Project Structure**
```
cypress/
├── e2e/                    # Test specifications
│   ├── User/              # User authentication tests
│   ├── Shop/              # E-commerce functionality tests
│   ├── Checkout/          # Payment and checkout tests
│   ├── Contact/           # Contact form tests
│   └── UI_misc/           # General UI component tests
├── fixtures/               # Test data and mock files
├── support/                # Custom commands and utilities
│   ├── commands.js         # Custom Cypress commands
│   ├── e2e.js             # Global configuration
│   └── utils/              # Helper functions
├── screenshots/            # Test failure screenshots
└── reports/                # Test execution reports
```

### **Design Patterns**
- **Page Object Model** - Organized test structure
- **Custom Commands** - Reusable testing utilities
- **Data-Driven Testing** - Externalized test data
- **Modular Architecture** - Scalable test organization

## 🚀 Getting Started

### **Prerequisites**
- Node.js 20.x or higher
- npm 9.x or higher
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kamaiko/AutomationExercice.git
   cd AutomationExercice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify Cypress installation**
   ```bash
   npx cypress verify
   ```

### **Running Tests**

#### **Local Development**
```bash
# Open Cypress Test Runner (Interactive Mode)
npm run cypress:open

# Run tests in headless mode
npm run cypress:run

# Run specific test suite
npx cypress run --spec "cypress/e2e/User/login.cy.js"
```

#### **CI/CD Pipeline**
Tests automatically run on:
- **Push to main branch**
- **Pull request creation**
- **Manual workflow dispatch**

## 🧪 Test Structure

### **Test Categories**

| Category | Description | Test Files |
|----------|-------------|------------|
| **User Management** | Authentication, registration, profile management | `User/login.cy.js`, `User/signup.cy.js` |
| **E-commerce** | Product browsing, cart management | `Shop/shop.cy.js` |
| **Checkout Process** | Payment flow, order completion | `Checkout/checkout.cy.js` |
| **Contact & Support** | Contact forms, customer service | `Contact/contact.cy.js` |
| **UI Components** | General UI elements, responsive design | `UI_misc/ui.cy.js` |

### **Custom Commands**
```javascript
// User authentication
cy.signupUser(userData)
cy.loginUser(userData)

// Utility functions
cy.getByDataQa(attribute)  // Data attribute selector
cy.waitForPageLoad()        // Page load synchronization
```

## ⚙️ Configuration

### **Cypress Configuration**
```javascript
// cypress.config.js
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    charts: true,
    reportPageTitle: 'AutomationExercise E2E Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
```

### **Environment Variables**
```bash
# .env.local (create if needed)
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com
```

## 🔄 CI/CD Pipeline

### **GitHub Actions Workflow**

Our CI/CD pipeline demonstrates **enterprise-grade automation**:

#### **Pipeline Stages**
1. **Dependencies Job**
   - Repository checkout
   - Node.js setup (v20)
   - Cypress binary caching
   - Dependency installation
   - Cypress verification

2. **E2E Testing Job**
   - Multi-browser testing (Chrome)
   - Parallel test execution
   - Artifact collection
   - Failure handling

#### **Key Features**
- **Concurrency Control** - Prevents overlapping runs
- **Smart Caching** - Optimizes build times
- **Artifact Management** - Stores test reports and screenshots
- **Failure Recovery** - Comprehensive error handling

### **Pipeline Triggers**
```yaml
on:
  push:
    branches: [main]           # Auto-test on main branch pushes
  pull_request:
    branches: [main]           # Test PRs before merge
```

## 📊 Reporting & Artifacts

### **Test Reports**
- **Mochawesome HTML Reports** - Professional test documentation
- **Embedded Screenshots** - Visual test evidence
- **Interactive Charts** - Test execution analytics
- **Retention Policy** - 7-day artifact storage

### **Artifact Collection**
- **Test Reports** - Comprehensive HTML reports
- **Screenshots** - Failure documentation
- **Performance Metrics** - Execution timing data

## 🔧 Development Workflow

### **Daily Development Process**
```bash
# 1. Check project status
git status

# 2. Make code changes
# ... edit files ...

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "feat: add new user authentication test"

# 5. Push to trigger CI/CD
git push origin main
```

### **Best Practices**
- **Descriptive Commit Messages** - Clear change documentation
- **Test-First Development** - Write tests before implementation
- **Regular Commits** - Small, focused changes
- **Branch Protection** - Main branch stability

## 📚 Learning Objectives

### **🎯 Primary Goals**
1. **Master Cypress Framework**
   - Custom commands and utilities
   - Page Object Model implementation
   - Advanced testing strategies

2. **CI/CD Pipeline Mastery**
   - GitHub Actions configuration
   - Workflow optimization
   - Artifact management

3. **DevOps Practices**
   - Automated testing integration
   - Continuous deployment strategies
   - Quality assurance automation

4. **Enterprise Development**
   - Professional code organization
   - Testing best practices
   - Scalable architecture design

### **🚀 Advanced Topics**
- **API Testing Integration** - REST/GraphQL testing
- **Performance Testing** - Load and stress testing
- **Security Testing** - Vulnerability assessment
- **Mobile Testing** - Responsive design validation

## 🤝 Contributing

### **Development Guidelines**
1. **Fork the repository**
2. **Create a feature branch**
3. **Write comprehensive tests**
4. **Ensure CI/CD pipeline passes**
5. **Submit a pull request**

### **Code Standards**
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **Conventional Commits** for commit messages
- **Test coverage** requirements

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 **Why This Project?**

This repository serves as a **comprehensive learning platform** for modern software development practices. By working through this project, you'll gain:

- **Real-world experience** with enterprise testing frameworks
- **Hands-on DevOps skills** through CI/CD implementation
- **Professional development practices** used in top tech companies
- **Portfolio-worthy projects** to showcase your skills

**Ready to level up your development skills?** 🚀

---

<div align="center">

**Built with ❤️ for learning and growth**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Kamaiko)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

</div>
