Here’s a README.md file that combines both scripts you provided, following the format you requested:

```markdown
# API Automation Adjutor

This project focuses on developing automated API tests using Cypress.io. For additional details about Cypress, visit [Cypress.io](https://www.cypress.io).

## Prerequisites

- **Node.js:** Ensure you have the latest version installed. You can download it from [Node.js](https://nodejs.org/).
- **IDE:** It is recommended to use Visual Studio Code as your Integrated Development Environment (IDE) for this project.

## Setup Instructions

1. **Clone this repository** using your preferred command line tool.
2. Navigate to the project directory after cloning by executing `cd AdjutorAPI` in your terminal or PowerShell.

   ```bash
   git clone <repository-url>
   cd AdjutorAPI
   ```

3. Install all necessary dependencies and Cypress by running the following commands:

   ```bash
   npm install
   npx cypress install
   npx cypress open
   ```

4. Run test with headless mode and generate Mochawesome report using the following command:

   ```bash
   npm run cypress:run
   ```
5. Open Mochawesome report using the following command:

  ```bash
  start cypress\\reports\\mochawesome.html
  ```

## Running the Tests with Headed Mode
1. On the Cypress dashboard, you will be greeted with options for E2E Testing and Component Testing. Since we are focusing on API automation, select E2E Testing.
2. The default browser will be Chrome. It is not necessary to choose a different browser; simply click on Start E2E Testing in Chrome.
3. A new browser window will open with the test dashboard. Locate and click on the `adjutorAPITest.cy.js` file to run the tests.
4. You can monitor the execution results by clicking on the steps listed on the left side of the dashboard to check which tests passed or failed.

## Test Details
### Overview
This automation assessment focuses on validating various API operations including BVN consent initialization, credit bureau retrieval, decision models, loan products, and payment initialization.
- **Reference Types:** The directive `/// <reference types="cypress" />` at the top of the file ensures Cypress types are available for IntelliSense and type checking.
- **Describe Block:** The describe block organizes all tests related to different API functionalities into context.
- **Variables:** `apiKey`, `bvn`, `contact`, and `paymentData` are used to store API key and other necessary data for requests.

## Test Scenarios

### Adjutor API – Validation

#### Initialize BVN Consent:
- Sends a POST request to initialize BVN consent.
- Confirms that the response status is 200.
- Logs the response message and validates the returned data.

#### Complete Consent and Get BVN Details:
- Sends a PUT request to complete BVN verification with the correct OTP.
- Confirms that the response status is 200.
- Validates the response message.

### Adjutor API - Credit Bureaus

#### CRC Credit Bureau:
- Sends a GET request to retrieve the CRC credit report for a valid BVN.
- Confirms that the response status is 200.

#### FirstCentral Credit Bureau:
- Sends a GET request to retrieve the FirstCentral credit report for a valid BVN.
- Confirms that the response status is 200.

### Adjutor API - Decision

#### Fetch All Decision Models:
- Sends a GET request to retrieve all decision models.
- Confirms that the response status is 200.

#### Fetch Decision Model Details:
- Sends a GET request to retrieve details of a valid decision model.
- Confirms that the response status is 200.

### Adjutor API - Embedded Loans and Payments

#### Loan Products - Retrieve Loan Products:
- Sends a GET request to retrieve all loan products.
- Confirms that the response status is 200.

#### Payments - Initialize Payment:
- Sends a POST request to initialize a payment.
- Confirms that the response status is 200.

## Best Practices
- **Separation of Concerns:** Ensures that each test case focuses on a specific operation, enhancing readability and maintainability.
- **Response Validation:** Ensures that each API response is verified for correct status codes and data consistency.
- **Data Management:** Separate test data from scripts by creating a base-URL global variable in the `Cypress.config.js` file for reusability.
- **Validate Positive and Negative Path:** Testing valid, invalid, and unexpected conditions.
- **Generation of Test Report after Execution:** Integrated Mochawesome report to generate a report after test run, displaying test outcomes in detail.

