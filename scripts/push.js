const { exec } = require('child_process')

module.exports = () => {
	console.log('Pushing POT to Transifex...')
	exec(`tx push -s`, (error, stdout, stderr) => {
		if (error) {
			console.warn(`
	Be sure you have :
		1. pip install transifex-cli
		2. ~/.transifexrc
	`)
			console.error(error)
			return
		}
		console.log('Template pushed.')
	})
}
