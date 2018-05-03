## How to install CLI

In order to be able to push the POT (template file containing all the sentences
to translate), you need to install the Transifex client. Please follow the
instructions below to install it on macOS / Linux. If you need to install it on
another platform, please follow their [installation guide](https://docs.transifex.com/client/installing-the-client).

    sudo easy_install pip
    sudo pip install transifex-client

These commands will install the executable `tx` that we are goin to use to push
and pull translations from Transifex.

## Configuration

The Transifex client (`tx`) must be configured in two ways.

### Global Configuration

The credentials used for the remote project are stored in `.transifexrc` in your
`$HOME`.

    [https://www.transifex.com]
    hostname = https://www.transifex.com
    password = $ASK_AROUND_YOU$
    token = $ASK_AROUND_YOU$
    username = api

### Project Configuration

Transifex needs to be configured by project as well.

    cat .tx/config
    [main]
    host = https://www.transifex.com

    [$PROJECT$]
    file_filter = translations/<lang>/$NAME$.po
    source_file = translations/$NAME$.pot
    source_lang = en
    type = PO

## Normal Procedure

The normal procedure can be described as follows:

1.  Extract strings from source files and generate a POT (template file
    containing all the sentences)
2.  Push this template to Transifex using the cli. This will warn the
    administrators that new translation work is necessary.
3.  Pull the translations for all languages supported by the platform.

### Extraction

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
