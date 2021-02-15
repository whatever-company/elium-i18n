# Extraction

Sentences to translate are extracted using our AST Parser that parses JS/JSX
files and match the following structures.

```javascript
import i18n from 'libs/i18n'
const text = i18n.t('My string to translate') || t('My string to translate when using the HOC translate()')
const interpolation = t('{{ number }} is my number', { number: 42 })
const plural = t('one object', { plural: '{{ count }} objects', count })
const context = t('string with context', { context: 'ctx' })
const comp = (
	<Translate>
		<span>
			This <b>will be</b> <i>extracted</i>
		</span>
	</Translate>
)
```
