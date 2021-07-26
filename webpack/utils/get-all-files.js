const fs = require('fs');
const path = require('path');

const getAllFiles = (dir, onlyFileNames = false) => {
	return fs.readdirSync(dir).reduce((files, file) => {
		const name = path.join(dir, file);
		const resultName = onlyFileNames ? file : name;
		const isDirectory = fs.statSync(name).isDirectory();
		return isDirectory ? [...files, ...getAllFiles(name)] : [...files, resultName];
	}, []);
};

module.exports = { getAllFiles };
