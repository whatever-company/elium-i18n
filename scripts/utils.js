const { exec: _exec } = require('node:child_process')
function exec(command) {
	return new Promise((resolve, reject) => {
		_exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error)
			}
			resolve(stdout)
		})
	})
}

module.exports = {
	exec
}
