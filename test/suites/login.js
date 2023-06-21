const {
  request,
  expect,
  colors,
} = require('../helpers/libs');

let response = '';
const suiteName = `${colors.bgGreen('login endpoint')}`;

describe(suiteName, function () {
// POST Requests
  describe('POST', function () {
    context('Valid Tests', function () {
      before(async function () {
        response = await request.post('/api/login').send({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
      });
      it('Status Code is 200', function () {
        expect(response.status).to.eql(200);
      });
      it('Response Body has property token', function () {
        expect(response.body).to.have.own.property('token');
      });
    });
    context('Invalid Tests', function () {
      before(async function () {
        response = await request.post('/api/login').send({ email: 'peter@klaven' });
      });
      it('Status Code is 400', function () {
        expect(response.status).to.eql(400);
      });
      it('Response Body has property error', function () {
        expect(response.body).to.have.own.property('error');
      });
    });
  });
});
