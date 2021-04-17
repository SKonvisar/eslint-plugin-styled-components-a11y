const path = require('path');
const fs = require('fs');

const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
  ? '../../lib/utils/collectStyledComponentData.js'
  : './collectStyledComponentData');

const StyledComponentsMap = require('./styledComponentsMap');

const Linter = require('eslint').Linter;
const { parse } = require('@babel/parser');

const linter = new Linter();
linter.defineParser('babel-parser', {
  parse(code, options) {
    parse(code, options);
  },
});

function parseCodeText(codeText, styledComponents) {
  linter.defineRule('traverse', {
    create() {
      return {
        ...collectStyledComponentData(styledComponents, {}, ''),
      };
    },
  });
  return linter.verify(codeText, {
    parserOptions: {
      ecmaVersion: 2020,
      parser: 'babel-parser',
      sourceType: 'module',
    },
    rules: {
      traverse: 'warn',
    },
  });
}

function getImportedFilePath(source, context) {
  const currentFilePath = context.getFilename();
  const sourcePath = path.resolve(currentFilePath, '..', source);

  if (path.extname(sourcePath)) {
    return sourcePath;
  }

  const { dir, base } = path.parse(sourcePath);

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const parts = files.find((filename) => filename.startsWith(base))?.split('.');

    return parts && `${sourcePath}.${parts[parts.length - 1]}`;
  }

  return null;
}

function getFilePathsToParse(modulesToParse) {
  const sourcesSet = new Set();

  for (let component in modulesToParse) {
    const { source } = modulesToParse[component];
    sourcesSet.add(source);
  }

  return Array.from(sourcesSet);
}

module.exports = (styledComponents, modulesToParse, context) => {
  const pathsToParse = getFilePathsToParse(modulesToParse);

  for (let source of pathsToParse) {
    const filePath = getImportedFilePath(source, context);

    if (filePath) {
      const fileStr = fs.readFileSync(filePath).toString('utf-8');

      styledComponents.setKeyMapper((componentName) => {
        const exportedAsName = Object.keys(modulesToParse).find((key) => {
          return modulesToParse[key].importedName === componentName;
        });

        return exportedAsName || componentName;
      });

      parseCodeText(fileStr, styledComponents);

      styledComponents.resetKeyMapper();
    }
  }
};
