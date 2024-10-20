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
   ```
## Running the Tests with Headed Mode
1. Open the Cypress dashboard with following command:
   ```bash
   npx cypress open
   ```
2. On the Cypress dashboard, you will be greeted with options for E2E Testing and Component Testing. Since we are focusing on API automation, select E2E Testing.
3. The default browser will be Chrome. It is not necessary to choose a different browser; simply click on Start E2E Testing in Chrome.
4. A new browser window will open with the test dashboard. Locate and click on the `adjutorAPITest.cy.js` file to run the tests.
5. You can monitor the execution results by clicking on the steps listed on the left side of the dashboard to check which tests passed or failed.

## Running the Tests with Headless Mode
1. Run test with headless mode and generate Mochawesome report using the following command:

   ```bash
   npm run cypress:run
   ```
2. Open Mochawesome report using the following command:

   ```bash
   start cypress\\reports\\mochawesome.html
   ```
## Test Details
### Overview
This automation assessment focuses on validating various API operations including BVN consent initialization, credit bureau retrieval, decision models, loan products, and payment initialization.
- **Reference Types:** The directive `/// <reference types="cypress" />` at the top of the file ensures Cypress types are available for IntelliSense and type checking.
- **Describe Block:** The describe block organizes all tests related to different API functionalities into context.
- **Variables:** `apiKey`, `bvn`, `contact`, and `paymentData` are used to store API key and other necessary data for requests.

## Test Scenarios

### Adjutor API – Validation

#### Initialize BVN Consent:
- **Positive Case**: 
  - Sends a POST request to initialize BVN consent.
  - Confirms the response status is 200.
  - Validates the response message and data.
- **Negative Case**: 
  - Sends a POST request with an incorrect BVN or contact number.
  - Confirms the response status is 400.
  - Validates the error message indicating a mismatch.

#### Complete Consent and Get BVN Details:
- **Positive Case**: 
  - Sends a PUT request to complete BVN verification with the correct OTP.
  - Confirms the response status is 200.
  - Validates the response message.
- **Negative Case**: 
  - Sends a PUT request with an incorrect OTP.
  - Confirms the response status is 400.
  - Validates the error message for invalid OTP.

### Adjutor API - Credit Bureaus

#### CRC Credit Bureau:
- **Positive Case**: 
  - Sends a GET request to retrieve the CRC credit report for a valid BVN.
  - Confirms the response status is 200.
  - Validates the response message.
- **Negative Case**: 
  - Sends a GET request with an invalid BVN.
  - Confirms the response status is 400.
  - Validates the error message for invalid BVN.

#### FirstCentral Credit Bureau:
- **Positive Case**: 
  - Sends a GET request to retrieve the FirstCentral credit report for a valid BVN.
  - Confirms the response status is 200.
  - Validates the response message.
- **Negative Case**: 
  - Sends a GET request with an invalid BVN.
  - Confirms the response status is 400.
  - Validates the error message for invalid BVN.

### Adjutor API - Decision

#### Fetch All Decision Models:
- **Positive Case**: 
  - Sends a GET request to retrieve all decision models.
  - Confirms the response status is 200.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message for unauthorized access.

#### Fetch Decision Model Details:
- **Positive Case**: 
  - Sends a GET request to retrieve details for a valid decision model.
  - Confirms the response status is 200.
- **Negative Case**: 
  - Sends a GET request with an invalid decision model ID.
  - Confirms the response status is 404.
  - Validates the error message for a non-existent decision model.

### Adjutor API - Embedded Loans and Payments

#### Loan Products - Retrieve Loan Products:
- **Positive Case**: 
  - Sends a GET request to retrieve all loan products.
  - Confirms the response status is 200.
  - Validates the response message and data.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message for unauthorized access.

#### Payments - Initialize Payment:
- **Positive Case**: 
  - Sends a POST request to initialize a payment.
  - Confirms the response status is 200.
  - Validates the response message.
- **Negative Cases**: 
  - Sends a POST request with missing required fields.
  - Confirms the response status is 400.
  - Validates the error message for the missing field.

### Adjutor API - Data For Lenders

#### Retrieve Data Options:
- **Positive Case**: 
  - Sends a GET request to retrieve data options.
  - Confirms the response status is 200.
  - Validates the response has a `success` property set to `true` and `data` is an array.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message indicating unauthorized access.

#### Retrieve Users:
- **Positive Case**: 
  - Sends a GET request to retrieve user details.
  - Confirms the response status is 200.
  - Validates the response has a `success` property set to `true` and `data` is an array.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message indicating unauthorized access.

### Adjutor API – Operational Services

#### Get Adjutor Services Pricing:
- **Positive Case**: 
  - Sends a GET request to retrieve Adjutor services pricing.
  - Confirms the response status is 200.
  - Validates the response has a `status` property set to `success`, a `message` of `Successful`, and `data` is an array.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message indicating unauthorized access.

#### Get Wallet:
- **Positive Case**: 
  - Sends a GET request to retrieve wallet information.
  - Confirms the response status is 200.
  - Validates the response has a `status` property set to `success`, a `message` of `Successful`, and checks the wallet balance.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 403.
  - Validates the error message indicating unauthorized access.

### Adjutor API - Direct Debit

#### Get All Transactions:
- **Positive Case**: 
  - Sends a GET request to retrieve all transactions.
  - Confirms the response status is 200.
  - Validates the response has a `status` property set to `success`, a `message` of `success`, and `data` is an object containing an array of transactions.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 401.
  - Validates the error message indicating unauthorized access.

#### Get Transactions Statistics:
- **Positive Case**: 
  - Sends a GET request to retrieve transaction statistics.
  - Confirms the response status is 200.
  - Validates the response has a `status` property set to `success`, a `message` of `success`, and `data` includes an array of transactions.
- **Negative Case**: 
  - Sends a GET request with an invalid API key.
  - Confirms the response status is 401.
  - Validates the error message indicating unauthorized access.

---
## Summary of Test Results

### Adjutor API – Validation

#### Initialize BVN Consent:
**Positive Case**: FAILED
**Negative Case**: FAILED

#### Complete Consent and Get BVN Details:
**Positive Case**: FAILED
**Negative Case**: FAILED

### Adjutor API - Credit Bureaus

#### CRC Credit Bureau:
**Positive Case**: FAILED
**Negative Case**: FAILED

#### FirstCentral Credit Bureau:
**Positive Case**: FAILED
**Negative Case**: FAILED

### Adjutor API - Decision

#### Fetch All Decision Models:
**Positive Case**: PASSED
**Negative Case**: PASSED

#### Fetch Decision Model Details:
**Positive Case**: PASSED
**Negative Case**: PASSED

### Adjutor API - Embedded Loans and Payments

#### Loan Products - Retrieve Loan Products:
**Positive Case**: FAILED
**Negative Case**: PASSED

#### Payments - Initialize Payment:
**Positive Case**: PASSED
**Negative Case**: PASSED

### Adjutor API - Data For Lenders

#### Retrieve Data Options:
**Positive Case**: PASSED
**Negative Case**: PASSED

#### Retrieve Users:
**Positive Case**: PASSED
**Negative Case**: PASSED

### Adjutor API – Operational Services

#### Get Adjutor Services Pricing:
**Positive Case**: PASSED
**Negative Case**: PASSED

#### Get Wallet:
**Positive Case**: PASSED
**Negative Case**: PASSED

### Adjutor API - Direct Debit

#### Get All Transactions:
**Positive Case**: FAILED
**Negative Case**: FAILED

#### Get Transactions Statistics:
**Positive Case**: FAILED
**Negative Case**: FAILED

## Best Practices
- **Separation of Concerns:** Ensures that each test case focuses on a specific operation, enhancing readability and maintainability.
- **Response Validation:** Ensures that each API response is verified for correct status codes and data consistency.
- **Data Management:** Separate test data from scripts by creating a base-URL global variable in the `Cypress.config.js` file for reusability.
- **Validate Positive and Negative Path:** Testing valid, invalid, and unexpected conditions.
- **Generation of Test Report after Execution:** Integrated Mochawesome report to generate a report after test run, displaying test outcomes in detail.

