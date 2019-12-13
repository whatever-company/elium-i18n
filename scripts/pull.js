const { exec } = require('./utils')

function ensureArray(arr) {
	return Array.isArray(arr) ? arr : [arr]
}

module.exports = async ({ languages, source, branch }) => {
	console.log('Pulling PO files...')
	const langs = languages
		? ensureArray(languages)
				.map(l => `-l ${l}`)
				.join(' ')
		: '-a '

	const branchParam = branch ? `-b ${typeof branch !== 'boolean' ? branch : ''}` : ''
	try {
		// We have to force the pull otherwise existing languages are skipped
		await exec(`tx pull ${langs} --parallel -f ${branchParam}`)

		// Transifex does not download the translation file for the source language
		if (source) {
			console.log('Download translations for source language')
			await exec(`tx pull -l ${source} --parallel -f ${branchParam}`)
		}
		console.log('Translations downloaded.')
	} catch (err) {
		console.error(err)
		console.warn('Be sure to have the transifex-client : pip install transifex-cli')
		process.exit(1)
	}
}
