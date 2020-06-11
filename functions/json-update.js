import editJsonFile from 'edit-json-file';

exports.handler = (event, context, callback) => {
	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	});

	/*
	let file = editJsonFile('/public/static/data.json');
	file.set('test', 20);
	file.save();*/
};
