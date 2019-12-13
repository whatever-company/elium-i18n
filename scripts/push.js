const { exec } = require('./utils')

module.exports = async ({ branch }) => {
	console.log('Pushing POT to Transifex...')
	try {
		await exec(`tx push -s --parallel ${branch ? '-b ' + branch : ''}`)
		console.log('Template pushed.')
	} catch (err) {
		console.warn(`
Be sure you have :
	1. pip install transifex-cli
	2. ~/.transifexrc
`)
		console.error(err)
	}
}
