const fs = require('fs');
const editJsonFile = require('edit-json-file');

exports.handler = function(event, context, callback) {
	let file = editJsonFile('https://vsmp-tab.netlify.app/static/data.json');
	file.set('test', 20);
	file.save();

	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	});
};
