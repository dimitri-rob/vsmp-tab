import editJsonFile from 'edit-json-file';

exports.handler = (event, context, callback) => {
	return {
		statusCode: 200,

		body: 'hello',
	};

	/*
	let file = editJsonFile('/public/static/data.json');
	file.set('test', 20);
	file.save();*/
};
