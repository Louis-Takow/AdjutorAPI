describe('Adjutor API – Validation', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key

  context('Initialize BVN Consent', () => {
    const bvn = '22222222222'; // Example BVN number for initialization
    const contact = '08012345678'; // Example contact number

    // Positive Test: Initialize BVN Consent
    it('Should successfully initialize BVN consent and return OTP status', () => {
      cy.request({
        method: 'POST',
        url: `/verification/bvn/${bvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          contact: contact
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response message
        expect(response.body.status).to.eq('otp');
        expect(response.body.message).to.eq('Please provide OTP sent to contact');
        expect(response.body.data).to.eq('08012345678');

      });
    });

    // Negative Test: Incorrect BVN or Contact Number
    it('Should return an error when incorrect BVN or contact number is provided', () => {
      const incorrectBvn = '01111111111';
      const incorrectContact = '07000000000';

      cy.request({
        method: 'POST',
        url: `/verification/bvn/${incorrectBvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          contact: incorrectContact
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 400 (for invalid data)
        expect(response.status).to.eq(400);

        // Validate the error message
        expect(response.body.message).to.contain('does not match the customer phone on record');
      });
    });
  });

  context('Complete Consent and Get BVN Details', () => {
    const bvn = '22123456789'; // Example BVN number for verification
    const correctOtp = '623553'; // Correct OTP for positive case
    const incorrectOtp = '000000'; // Incorrect OTP for negative case

    // Positive Test: Successful BVN Details Retrieval
    it('Should successfully complete BVN verification and return BVN details', () => {
      cy.request({
        method: 'PUT',
        url: `/verification/bvn/${bvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          otp: correctOtp,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response message
        expect(response.body.status).to.eq('success');
        expect(response.body.message).to.eq('Successful');

      });
    });

    // Negative Test: Incorrect OTP
    it('Should return an error for incorrect OTP', () => {
      cy.request({
        method: 'PUT',
        url: `/verification/bvn/${bvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          otp: incorrectOtp,
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 400 (or applicable status code for OTP errors)
        expect(response.status).to.eq(400);

        // Validate the error message
        expect(response.body.message).to.contain('Invalid OTP');
      });
    });
  });
});

describe('Adjutor API - Credit Bureaus', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const validBvn = '22293381111'; // Example valid BVN number
  const invalidBvn = '01111111111'; // Example invalid BVN number

  context('CRC Credit Bureau', () => {
    
    // Positive Test: Successful retrieval of CRC credit report
    it('Should successfully retrieve CRC credit report for valid BVN', () => {
      cy.request({
        method: 'GET',
        url: `/creditbureaus/crc/${validBvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response message
        expect(response.body.status).to.eq('success');
        expect(response.body.message).to.eq('Successful');

      });
    });

    // Negative Test: Invalid BVN for CRC credit report
    it('Should return an error for invalid BVN when retrieving CRC credit report', () => {
      cy.request({
        method: 'GET',
        url: `/crc/${invalidBvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 400 or other applicable error code
        expect(response.status).to.eq(400);

        // Validate the error message for invalid BVN
        expect(response.body.message).to.contain('Invalid BVN');
      });
    });
  });

  context('FirstCentral Credit Bureau', () => {

    // Positive Test: Successful retrieval of FirstCentral credit report
    it('Should successfully retrieve FirstCentral credit report for valid BVN', () => {
      cy.request({
        method: 'GET',
        url: `/firstcentral/${validBvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response message
        expect(response.body.status).to.eq('success');
        expect(response.body.message).to.eq('Successful');
      });
    });

    // Negative Test: Invalid BVN for FirstCentral credit report
    it('Should return an error for invalid BVN when retrieving FirstCentral credit report', () => {
      cy.request({
        method: 'GET',
        url: `/firstcentral/${invalidBvn}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 400 or other applicable error code
        expect(response.status).to.eq(400);

        // Validate the error message for invalid BVN
        expect(response.body.message).to.contain('Invalid BVN');
      });
    });
  });
});


describe('Adjutor API - Decision', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const validModelId = '11448'; // Example valid Decision Model ID
  const invalidModelId = '2355'; // Example invalid Decision Model ID

  context('Fetch All Decision Models', () => {

    // Positive Test: Successfully retrieve all decision models
    it('Should successfully retrieve all decision models', () => {
      cy.request({
        method: 'GET',
        url: '/decisioning/models/',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);
      });
    });

    // Negative Test: Invalid authorization for fetching decision models
    it('Should return an error for unauthorized access when retrieving decision models', () => {
      cy.request({
        method: 'GET',
        url: '/decisioning/models/',
        headers: {
          Authorization: `Bearer invalid API key`, // Example invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });

  context('Fetch Decision Model Details', () => {

    // Positive Test: Successfully retrieve details of a decision model
    it('Should successfully retrieve details for a valid decision model', () => {
      cy.request({
        method: 'GET',
        url: `/decisioning/models/${validModelId}/settings`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

      });
    });

    // Negative Test: Invalid decision model ID
    it('Should return an error for invalid decision model ID', () => {
      cy.request({
        method: 'GET',
        url: `/decisioning/models/${invalidModelId}/settings`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 404 or other applicable error code
        expect(response.status).to.eq(404);

        // Validate the error message for an invalid decision model ID
        expect(response.body.message).to.contain('Decision model not found');
      });
    });
  });
});

describe('Adjutor API - Embedded Loans and Payments', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const invalidApiKey = 'invalid_api_key'; // Example of an invalid API key

  context('Loan Products - Retrieve Loan Products', () => {

    // Positive Test: Successfully retrieve all loan products
    it('Should successfully retrieve all loan products', () => {
      cy.request({
        method: 'GET',
        url: `/loans/products`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'Successful');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
      });
    });

    // Negative Test: Invalid authorization for retrieving loan products
    it('Should return an error for unauthorized access when retrieving loan products', () => {
      cy.request({
        method: 'GET',
        url: `/loans/products`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403 for Forbiden access
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });

  context('Payments - Initialize Payment', () => {
    const paymentData = {
      amount: 5000,
      description: "Payment for beans, yam and egg",
      organization_id: "37a749d808e46495a8da1e5352d03cae",
      callback_url: "https://lendsqr.com"
    };

    // Positive Test: Successfully initialize a payment
    it('Should successfully initialize a payment', () => {
      cy.request({
        method: 'POST',
        url: `/payments/initialize`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: paymentData
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'Successful');
        expect(response.body).to.have.property('data');
      });
    });

    // Negative Test: Missing required payment data (e.g., amount)
    it('Should return an error for missing required fields when initializing payment', () => {
      cy.request({
        method: 'POST',
        url: `/payments/initialize`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          // Deliberately leaving out 'amount' to simulate a missing field
          description: "Payment for beans and egg",
          organization_id: "37a749d808e46495a8da1e5352d03cae",
          callback_url: "https://lendsqr.com"
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 400 for bad request
        expect(response.status).to.eq(400);

        // Validate the error message for missing required fields
        expect(response.body.message).to.contain('amount is required');
      });
    });

    // Negative Test: Invalid authorization for initializing payment
    it('Should return an error for unauthorized access when initializing payment', () => {
      cy.request({
        method: 'POST',
        url: `/payments/initialize`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
          'Content-Type': 'application/json'
        },
        body: paymentData,
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 401 for Forbiden
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });
});

describe('Adjutor API - Data For Lenders', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const invalidApiKey = 'invalid API key'; // Example of an invalid API key

  context('Options - Retrieve Data Options', () => {

    // Positive Test: Successfully retrieve data options
    it('Should successfully retrieve data options', () => {
      cy.request({
        method: 'GET',
        url: `/data/options`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('success', true);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
      });
    });

    // Negative Test: Invalid authorization for retrieving data options
    it('Should return an error for unauthorized access when retrieving data options', () => {
      cy.request({
        method: 'GET',
        url: `/data/options`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403 for Forbiden
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });

  context('Users - Retrieve Users', () => {

    // Positive Test: Successfully retrieve user details
    it('Should successfully retrieve users', () => {
      cy.request({
        method: 'GET',
        url: `/data/users`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('success', true);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');

      });
    });

    // Negative Test: Invalid authorization for retrieving users
    it('Should return an error for unauthorized access when retrieving users', () => {
      cy.request({
        method: 'GET',
        url: `/data/users`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403 for Forbiden
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });
});

describe('Adjutor API – Operational Services', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const invalidApiKey = 'invalid_api_key'; // Example of an invalid API key

  context('Get Adjutor Services Pricing', () => {

    // Positive Test: Successfully retrieve Adjutor services pricing
    it('Should successfully retrieve Adjutor services pricing', () => {
      cy.request({
        method: 'GET',
        url: `/profile/pricing`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'Successful');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
      });
    });

    // Negative Test: Invalid authorization for retrieving pricing
    it('Should return an error for unauthorized access when retrieving pricing', () => {
      cy.request({
        method: 'GET',
        url: `/profile/pricing`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403 for Forbiden
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });

  context('Get wallet', () => {

    // Positive Test: Successfully retrieve the list of banks
    it('Should successfully retrieve wallet', () => {
      cy.request({
        method: 'GET',
        url: `/profile/wallet`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'Successful');
        expect(response.body).to.have.property('data');
        expect(response.body.data.balance).to.eq(10);
      });
    });

    // Negative Test: Invalid authorization for retrieving banks
    it('Should return an error for unauthorized access when retrieving wallet', () => {
      cy.request({
        method: 'GET',
        url: `/profile/wallet`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 403 for Forbiden
        expect(response.status).to.eq(403);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain(`We couldn't verify your access`);
      });
    });
  });
});

describe('Adjutor API - Direct Debit', () => {
  const apiKey = 'sk_live_fLiOPuLHh0aVKd6Cueut04vswmjmWcoDCPzBHXre'; // API Key
  const invalidApiKey = 'invalid_api_key'; // Example of an invalid API key

  context('Get All Transactions', () => {

    // Positive Test: Successfully retrieve all transactions
    it('Should successfully retrieve all transactions', () => {
      cy.request({
        method: 'GET',
        url: `/direct-debit/transactions?limit=10&page=1`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        }
      }).then((response) => {
        // Validate the HTTP status code is 200
        expect(response.status).to.eq(200);

        // Validate the response body structure
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'success');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data.data).to.be.an('array');
      });
    });

    // Negative Test: Invalid authorization for retrieving transactions
    it('Should return an error for unauthorized access when retrieving transactions', () => {
      cy.request({
        method: 'GET',
        url: `/direct-debit/transactions?limit=10&page=1`,
        headers: {
          Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
        },
        failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
      }).then((response) => {
        // Validate the HTTP status code is 401 for unauthorized access
        expect(response.status).to.eq(401);

        // Validate the error message for unauthorized access
        expect(response.body.message).to.contain('Unauthorized');
      });
    });
  });

    context('Get Transactions Statistics', () => {

      // Positive Test: Successfully retrieve transaction statistics
      it('Should successfully retrieve transaction statistics', () => {
        cy.request({
          method: 'GET',
          url: `/direct-debit/transactions/stats`,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          }
        }).then((response) => {
          // Validate the HTTP status code is 200
          expect(response.status).to.eq(200);
  
          // Validate the response body structure
          expect(response.body).to.have.property('status', 'success');
          expect(response.body).to.have.property('message', 'success');
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('transactions');
          expect(response.body.data.transactions).to.be.an('array');

        });
      });
  
      // Negative Test: Unauthorized access due to invalid API key
      it('Should return an error for unauthorized access with an invalid API key', () => {
        cy.request({
          method: 'GET',
          url: `/direct-debit/transactions/stats`,
          headers: {
            Authorization: `Bearer ${invalidApiKey}`, // Invalid API key
          },
          failOnStatusCode: false // Allow Cypress to handle non-2xx status codes
        }).then((response) => {
          // Validate the HTTP status code is 401 for unauthorized access
          expect(response.status).to.eq(401);
  
          // Validate the error message for unauthorized access
          expect(response.body.message).to.contain('Unauthorized');
        });
      });
    });
  });

