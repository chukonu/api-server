var mongooseMock = require('mongoose-mock'),
	proxyquire = require('proxyquire'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Sitekey', function () {
	var Sitekey;
	beforeEach(function () {
		Sitekey = proxyquire('../../../model/Sitekey', { 'mongoose': mongooseMock });
	});
	describe('.createAndSave', function () {
		it('should save the sitekey', function (done) {
			var callback = sinon.spy();
			var sitekey = Sitekey.createAndSave({ domain: 'yeeyan.org' }, callback);
			expect(sitekey.save).calledOnce;
			done();
		});
	});
});
