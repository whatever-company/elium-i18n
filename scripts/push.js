const { exec } = require('./utils')

module.exports = async ({ branch }) => {
	console.log('Pushing POT to Transifex...')
	try {
		var branchParam = ''
		if (branch) {
			branchParam = '-b ' + (typeof branch === 'boolean' ? '' : branch)
		}
		await exec(`tx push -s --parallel ${branchParam}`)
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
