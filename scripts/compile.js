const path = require('node:path')
const { join, basename } = path
const { readFileSync, writeFileSync, lstatSync, readdirSync } = require('node:fs')
const { gettextToI18next } = require('i18next-conv')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
	readdirSync(source)
		.map(name => join(source, name))
		.filter(isDirectory)

function compile(lang, poDir, filename, jsonDir) {
	gettextToI18next(lang, readFileSync(`${poDir}/${lang}/${filename}`)).then(
		resources => writeFileSync(`${jsonDir}/${lang}.json`, resources),
		err => console.error(err)
	)
}

module.exports = async ({ source, sourceFilename, target }) => {
	console.log('Compiling PO to JSON')
	const directories = getDirectories(source, target)

	directories.forEach(item => {
		const locale = basename(item)
		console.log(`Compiling ${locale}`)
		compile(locale, source, sourceFilename, target)
	})
	console.log('Finished')
}
