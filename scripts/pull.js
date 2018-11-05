const { exec } = require('./utils')

function ensureArray (arr) {
	return Array.isArray(arr) ? arr : [arr]
}

module.exports = async (languages, commit = true, source) => {
	console.log('Pulling PO files...')
	const langs = languages
		? ensureArray(languages)
			.map(l => `-l ${l}`)
			.join(' ')
		: '-a '
	try {
		// We have to force the pull otherwise existing languages are skipped
		await exec(`tx pull ${langs} -f`)

		// Transifex does not download the translation file for the source language
		if (source) {
			console.log('Download translations for source language')
			await exec(`tx pull -l ${source} -f`)
		}
		console.log('Translations downloaded.')
	} catch (err) {
		console.error(err)
		console.warn('Be sure to have the transifex-client : pip install transifex-cli')
		process.exit(1)
	}

	if (commit) {
		console.log('Committing...')
		try {
			await exec('git add translations/*/*.po')
			await exec(`git commit -m"chore(i18n): Update translations"`)
			console.log('Done !')
		} catch (err) {
			console.error(err)
			process.exit(1)
		}
	}
}
