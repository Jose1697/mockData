'use strict';

// [START import]
const express = require('express'); // See https://expressjs.com/en/guide/routing.html for reference
const app = express();
// [END import]


// [START middleware]
const cors = require('cors')({origin: true});
app.use(cors);
app.use((req, res, next) => {
  setTimeout(() => next(), 700)
});
// [END middleware]


//
// Loads mock data in local variable for easy access
// -----------------------------------------------------
const mockBenefit = require('./responses/benefit');
const mockValidateCancellation = require('./responses/validate-cancellation');
const mockSimulateCancellation = require('./responses/simulate-cancellation');
const mockReasonList = require('./responses/reasons-list');
const mockCryptodocument = require('./responses/crypto-document');
const mockPolicyDetail = require('./responses/policy-detail');
const mockInuranceList = require('./responses/insurance-list');
const mockContactDetail = require('./responses/contact-detail');
const mockSeguros = require('./responses/seguros');
const mockPosts = require('./responses/posts');
const mockStories = require('./responses/stories.json');
const mockProfile = require('./responses/profile.json');
const mockSuggestion = require('./responses/suggestions.json');

/**
 * Simple request with pre-populated mock response from `mock-responses/photos.json`
 * --------------------------------------------------------------------------------------
 * Try: https://mock-apis-server.firebaseapp.com/photos
 */
app.get('/insurances-contracts/v0/insurances-contracts', (req, res) => {
  return res.status(200).json(mockInuranceList);
});

app.get('/seguros/v0/seguros', (req, res) => {
  return res.status(200).json(mockSeguros);
});

app.get('/api/v0/stories', (req, res) => {
  return res.status(200).json(mockStories);
});

app.get('/api/v0/posts', (req, res) => {
  return res.status(200).json(mockPosts);
});

app.get('/api/v0/profile', (req, res) => {
  return res.status(200).json(mockProfile);
});

app.get('/api/v0/suggestions', (req, res) => {
  return res.status(200).json(mockSuggestion);
});

app.get('/customers/v0/customers/:cutomerid/contact-details', (req, res) => {
  return res.status(200).json(mockContactDetail);
});


app.get('/insurance/vehicle/benefit', (req, res) => {
  return res.status(200).json(mockBenefit);
});

app.get('/catalogs/v0/catalogs/:catalogid/records', (req, res) => {
  return res.status(200).json(mockReasonList);
})

app.post('/vehicle-insurances/v0/vehicle-insurances/:insuranceId/cancellations/validate', (req, res) => {
  const {isCancellable, ...rest} =  mockValidateCancellation;
  if(req.params.insuranceId === "0001") {
    return res.status(200).json({isCancellable: false, ...rest});
  }
  return res.status(200).json(mockValidateCancellation);
});

app.post('/vehicle-insurances/v0/vehicle-insurances/:insuranceId/cancellations/simulate', (req, res) => {
  return res.status(200).json(mockSimulateCancellation);
});

app.post('/business-cryptography/v0/crypto-documents', (req, res) => {
  return res.status(200).json(mockCryptodocument);
});

app.post('/create/v0/seguros', (req, res) => { //
  return res.status(200).json(mockSeguros);
});

app.get('/vehicle-insurances/v1/vehicle-insurances/:insuranceId', (req, res) => {
  return res.status(200).json(mockPolicyDetail);
});



/**
 * Simple function that mocks register response using preloaded mock data. See [mockUser] above.
 *
 * Here is an example request with data:
 * ```
 * curl -X POST \
 *   https://mock-apis-server.firebaseapp.com/register \
 *   -H 'Content-Type: application/json' \
 *   -d '{"userId": "myusername", "email":"my@email.com", "name": "New User"}'
 * ```
 *
 * Another example where request can fail if username already exists:
 * ```
 * curl -X POST \
 *   https://mock-apis-server.firebaseapp.com/register \
 *   -H 'Content-Type: application/json' \
 *   -d '{"userId": "taken", "email":"existing@email.com", "name": "Existing User"}'
 * ```
 */
app.post('/register', (req, res) => {
  console.log('Request Body Params: ', req.body);

   // Simulates username taken, if username is `taken`
   if(req.body.hasOwnProperty('userId') && req.body.userId === "taken") { //
     return res.status(400)
            .json(mockUser.registerFailedUsernameExists);
   }

  // Attach the request data to response
  var response = mockUser.registerSuccess
  response.requestData = req.body

  // Success - falls though for any other request data
  return res.status(200)
            .json(response);
});
/* [END `/register` ] */

app.listen(3000, () => {
  console.log('RUN PORT 3000:  http://localhost:3000');
})
