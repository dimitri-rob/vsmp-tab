const editJsonFile = require('edit-json-file');

exports.handler = function(event, context, callback) {
	let file = editJsonFile(require.resolve('data.json'));
	file.set('test', 20);
	file.save();

	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	});
};
