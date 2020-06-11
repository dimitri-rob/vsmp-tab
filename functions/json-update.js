import editJsonFile from 'edit-json-file';

exports.handler = (event, context, callback) => {
	let file = editJsonFile('/public/static/data.json');
	file.set('test', 20);
	file.save();
};
