/*
From https://github.com/i18next/i18next-scanner/blob/master/src/nodes-to-string.js

Adatpted following https://github.com/i18next/react-i18next/blob/master/src/Trans.js

The MIT License (MIT)

Copyright (c) 2015-2017 Cheton Wu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const _get = require('lodash/get')

const isJSXText = node => {
	if (!node) {
		return false
	}

	return node.type === 'JSXText'
}

const isNumericLiteral = node => {
	if (!node) {
		return false
	}

	return node.type === 'NumericLiteral' && typeof node.value === 'number'
}

const isStringLiteral = node => {
	if (!node) {
		return false
	}

	return node.type === 'StringLiteral' && typeof node.value === 'string'
}

const isObjectExpression = node => {
	if (!node) {
		return false
	}

	return node.type === 'ObjectExpression'
}

const nodesToString = nodes => {
	let memo = ''
	let nodeIndex = 0
	nodes.forEach((node, i) => {
		if (isJSXText(node) || isStringLiteral(node)) {
			const value = node.value
				.replace(/^[\r\n]+\s*/g, '') // remove leading spaces containing a leading newline character
				.replace(/[\r\n]+\s*$/g, '') // remove trailing spaces containing a leading newline character
				.replace(/[\r\n]+\s*/g, ' ') // replace spaces containing a leading newline character with a single space character

			if (!value) {
				return
			}
			memo += value
		} else if (node.children) {
			/* Support with lists */
			if (
				node.type === 'JSXElement' &&
				node.openingElement.attributes &&
				node.openingElement.attributes.some(
					attribute => attribute.name.type === 'JSXIdentifier' && attribute.name.name === 'i18nIsDynamicList'
				)
			) {
				memo += `<${nodeIndex}></${nodeIndex}>`
			} else {
				memo += `<${nodeIndex}>${nodesToString(node.children)}</${nodeIndex}>`
			}
		} else if (node.type === 'JSXExpressionContainer') {
			const { expression = {} } = node

			if (isNumericLiteral(expression)) {
				// Numeric literal is ignored in react-i18next
				memo += ''
			}
			if (isStringLiteral(expression)) {
				memo += expression.value
			} else if (isObjectExpression(expression) && _get(expression, 'properties[0].type') === 'ObjectProperty') {
				memo += `{{${expression.properties[0].key.name}}}`
			} else {
				console.error(
					`Unsupported JSX expression. Only static values or {{interpolation}} blocks are supported. Got ${
						expression.type
					}:`
				)
				console.error(node.expression)
			}
		}

		++nodeIndex
	})

	return memo
}

module.exports = nodesToString
