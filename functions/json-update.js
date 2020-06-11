//import editJsonFile from 'edit-json-file';

/*
	let file = editJsonFile('/public/static/data.json');
	file.set('test', 20);
	file.save();*/

exports.handler = function(event, context, callback) {
	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	});
};
