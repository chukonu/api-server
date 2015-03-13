var app = module.exports = require('koa')();

app.use(function* (next) {
	if (this.path !== '/') return yield next;
	this.cookies.set('sitekey', 'YA-1234567890');
	this.body = 'a server that uses cookies';
});

app.use(function* (next) {
	if (this.path !== '/apis/sitekeys') return yield next;
	
	if (queryIsValid(this.query) === false) {
		this.status = 401;
		return yield next;
	};

	this.type = 'application/json';

	var obj = { key: 'YA-1234567890' };

	this.body = JSON.stringify(obj);

	function queryIsValid(query) {
		if (typeof query === 'object' && query.domain)
			return true;
		return false;
	};
});

if (!module.parent) app.listen(3000);
