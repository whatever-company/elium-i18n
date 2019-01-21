const path = require('path')
const { join, basename } = path
const { readFileSync, writeFileSync, lstatSync, readdirSync } = require('fs')
const { gettextToI18next } = require('i18next-conv')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
	readdirSync(source)
		.map(name => join(source, name))
		.filter(isDirectory)

function compile(lang, poDir, jsonDir) {
	gettextToI18next(lang, readFileSync(`${poDir}/${lang}/elium.po`)).then(
		resources => writeFileSync(`${jsonDir}/${lang}.json`, resources),
		err => console.error(err)
	)
}

module.exports = async (sourceDir, destinationDir) => {
	console.log('Compiling PO to JSON')
	const directories = getDirectories(sourceDir, destinationDir)

	directories.forEach(item => {
		const locale = basename(item)
		console.log(`Compiling ${locale}`)
		compile(locale, sourceDir, destinationDir)
	})
	console.log('Finished')
}
