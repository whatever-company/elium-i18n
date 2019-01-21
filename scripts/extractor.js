const fs = require('fs')
const glob = require('glob')
const { po } = require('gettext-parser')
const { resolve } = require('path')
const walk = require('./walker')

/*
	returns
	{
		[domain]: {
			[id]: {
				locations: [{file, column, row}],
				value: '',
				pluralValue: '',
				context: null,
				comment: null,
			}
		}
	}
*/

const getMessageKey = message => {
	return message.context ? `${message.context}:${message.value}` : message.value
}

class Extractor {
	constructor(defaultDomain, language = 'en') {
		this.messages = {}
		this.defaultDomain = defaultDomain
		this.language = language
	}

	process(filesGlob) {
		return new Promise((resolve, reject) => {
			glob(filesGlob, (err, files) => {
				if (err) reject(err)
				for (const file of files) {
					walk(file).forEach(message => this.setMessage(message))
				}
				resolve()
			})
		})
	}

	getMessage(value, context, domain) {
		return this.messages[domain] ? this.messages[domain][getMessageKey({ value, context })] : null
	}

	setMessage({ domain, value, plural, location, context }) {
		domain = domain || this.defaultDomain
		if (!this.messages[domain]) {
			this.messages[domain] = {}
		}

		const existingTrans = this.getMessage(value, context, domain)
		if (existingTrans) {
			existingTrans.locations.push(location)
			if (existingTrans.plural && plural && existingTrans.plural !== plural) {
				throw new Error(
					`Different plurals for "${value}" at ${JSON.stringify(existingTrans.locations)} and ${JSON.stringify(
						location
					)}`
				)
			}
			if (!existingTrans.plural && plural) {
				existingTrans.plural = plural
			}
		} else {
			this.messages[domain][getMessageKey({ value, context })] = {
				value,
				locations: [location],
				context,
				plural
			}
		}
	}

	getData(domain, messages) {
		const translations = {}
		console.log(`Processing POT for domain ${domain}`)
		Object.values(messages).forEach(message => {
			const context = message.context || ''
			if (!translations[context]) {
				translations[context] = {}
			}
			translations[context][message.value] = {
				msgctxt: context,
				msgid: message.value,
				comments: {
					// TODO: Get translator comment
					reference: message.locations.map(l => `${l.file}:${l.line}`).join(' ')
				}
			}
			if (message.plural) {
				translations[context][message.value].msgid_plural = message.plural
			}
		})
		console.log('Writing translations...')
		// TODO: We have to sort the keys first.
		const data = po.compile({
			charset: 'utf-8',
			headers: {
				charset: 'utf-8',
				'Project-Id-Version': 'Elium',
				'Report-Msgid-Bugs-To': 'dev@elium.com',
				'Content-Type': 'text/plain; charset=utf-8',
				'Content-Transfer-Encoding': '8bit'
			},
			translations
		})
		return data
	}

	async toPOT(outputDir) {
		console.log(`Writing POT in ${outputDir}`)
		Object.entries(this.messages).forEach(([domain, messages]) => {
			const data = this.getData(domain, messages)
			fs.writeFileSync(resolve(outputDir, domain) + '.pot', data, 'utf-8')
		})
	}
}

module.exports = Extractor
