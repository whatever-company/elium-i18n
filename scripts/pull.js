const { exec } = require('child_process')

function ensureArray (arr) {
	return Array.isArray(arr) ? arr : [arr]
}

module.exports = (languages, commit = true) => {
	console.log('Pulling PO files...')
	const langs = languages
		? ensureArray(languages)
			.map(l => `-l ${l}`)
			.join(' ')
		: '-a '
	exec(`tx pull ${langs}`, (error, stdout, stderr) => {
		if (error) {
			console.error(error)
			console.warn('Be sure to have the transifex-client : pip install transifex-cli')
			process.exit(1)
		}

		console.log('Translations downloaded.')
		if (commit) {
			console.log('Committing...')
			exec('git add translations/*/*.po', () => {
				exec(`git commit -m"chore(i18n): Update translations"`, (error, stdout, stderr) => {
					if (error) {
						console.error(error)
						process.exit(1)
					}
					console.log('Done !')
				})
			})
		}
	})
}
