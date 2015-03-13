var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('The server', function (done) {

	// test-case 1

	describe('Cookies with sitekey', function () {
		it('should set a cookie with a sitekey for `yeeyan.org`', function (done) {
			request
			.get('/')
			.expect(200)
			.expect('Set-Cookie', new RegExp('sitekey=YA-1234567890'), done)
		});
	});

	// test-case 2
	
	describe('JSON APIs', function () {

		// test-case 2-1
		
		it('should respond to invalid request with 401', function (done) {
			request
			.get('/apis/sitekeys')
			.query('whatever')
			.set('Accept', 'application/json')
			.expect(401, done);
		});

		// test-case 2-2

		it('should respond to valid request with valid JSON', function (done) {
			request
			.get('/apis/sitekeys')
			.query({ domain: 'yeeyan.org' })
			.set('Accept', 'application/json')
			.expect(200)
			.end(verify);
			
			function verify (err, res) {
				res.body.should.have.property('key', 'YA-1234567890');
				done();
			};
		});
	});
});
