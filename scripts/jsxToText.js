const htmlclean = require('htmlclean')

function walk (children) {
	let text = ''
	let idx = 0
	children.forEach(child => {
		switch (child.type) {
		case 'JSXText':
			if (child.value.replace(/[\t\n]*/gm, '').length > 0) {
				idx += 1
			}
			text += child.value
			break
		case 'JSXExpressionContainer':
			text += `<${idx}>${child.expression.name}</${idx}>`
			idx += 1
			break
		case 'JSXElement':
			text += `<${idx}>${walk(child.children)}</${idx}>`
			idx += 1
			break
		}
	})
	return htmlclean(text)
}

module.exports = node => walk([node])
