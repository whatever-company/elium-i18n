const fs = require('fs')
const jsxToText = require('./jsxToText')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default

const getArguments = node => {
	return node.arguments.map(arg => {
		switch (arg.type) {
			case 'StringLiteral':
				return arg.value
			case 'ObjectExpression':
				return arg.properties.reduce((acc, property) => {
					if (property.key) {
						acc[property.key.name] = property.value.value || null
					}
					return acc
				}, {})
			default:
				return null
		}
	})
}

const getCalleeName = ({ callee }) => {
	return callee.type === 'MemberExpression' ? callee.property.name : callee.name
}

const getJSXMessage = (node, file) => {
	const { attributes } = node.openingElement
	const contextAttr = attributes.find(a => a.name.name === 'context')
	const domainAttr = attributes.find(a => a.name.name === 'domain')

	const message = {
		value: jsxToText(node),
		context: contextAttr ? contextAttr.value.value : null,
		location: { file, ...node.openingElement.loc.start },
		domain: domainAttr ? domainAttr.value.value : null
	}

	return message
}

function* processCall(node, file) {
	const funcName = getCalleeName(node)
	if (funcName !== 't') return

	const args = getArguments(node)
	const params = (args.length > 1 ? args[args.length - 1] : {}) || {}
	const value = args[0]

	if (!value) {
		throw new Error(`Empty text to translate in ${file}:${node.loc.start.line}+${node.loc.start.column}`)
	}
	const message = {
		value: args[0],
		domain: params.domain,
		plural: params.plural,
		context: params.context,
		location: { file, ...node.loc.start }
	}
	yield message
}

function* processJSX(node, file) {
	const identifierName = node.openingElement.name.name
	if (identifierName === 'Translate') {
		const message = getJSXMessage(node, file)
		yield message
	} else if (identifierName === 'PluralTranslate') {
		const children = node.children.filter(n => n.type === 'JSXElement')
		const singular = getJSXMessage(children[0], file)
		const plural = getJSXMessage(children[1], file)
		singular.plural = plural.value
		yield singular
	}
}

module.exports = file => {
	const messages = []
	const addMessages = generator => {
		if (generator) {
			for (const msg of generator) {
				messages.push(msg)
			}
		}
	}
	const content = fs.readFileSync(file, 'utf-8')
	const ast = parse(content, {
		sourceType: 'module',
		plugins: [
			'jsx',
			'flow',
			'decorators-legacy',
			'classProperties',
			'exportDefaultFrom',
			'exportNamespaceFrom',
			'dynamicImport',
			'objectRestSpread',
			'asyncGenerators'
		]
	})

	try {
		traverse(ast, {
			CallExpression(path) {
				addMessages(processCall(path.node, file))
			},
			JSXElement(path) {
				addMessages(processJSX(path.node, file))
			}
		})
	} catch (err) {
		console.error(`Error in file ${file} node`)
		console.error(err)
		process.exit(1)
	}
	console.log(`Walking ${file} [${messages.length}]`)
	return messages
}
