const Linter = require('eslint').Linter;
const { parse } = require('@babel/parser');
const path = require('path');
const fs = require('fs');

const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
    ? '../../lib/utils/collectStyledComponentData.js'
    : './collectStyledComponentData');

const linter = new Linter();
linter.defineParser('babel-parser', {
    parse(code, options) {
        parse(code, options);
    }
})


function parseCodeText(codeText, styledComponents) {
    linter.defineRule('traverse', {
        create(context) {
            return {
                ...(collectStyledComponentData(styledComponents, {}, ''))
            }
        }
    });
    return linter.verify(codeText, {
        parserOptions: {
            "ecmaVersion": 2020,
            parser: 'babel-parser',
            sourceType: 'module',
        },
        rules: {
            'traverse': 'warn'
        }
    });
}

module.exports = (styledComponents, modulesToParse, context) => {
    const keyIterator = modulesToParse.keys().next();

    if (keyIterator.value) {
        console.log('key - ', keyIterator.value);
        const { source } = modulesToParse.get(keyIterator.value);
        const pathToImport = path.resolve(context.getFilename(), '..', source + '.js');
        const fileStr = fs.readFileSync(pathToImport).toString('utf-8');
        parseCodeText(fileStr, styledComponents)
    }
}

