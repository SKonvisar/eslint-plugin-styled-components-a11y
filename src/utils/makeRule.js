const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');

const { inspect } = require('util');
const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
  ? '../../lib/utils/collectStyledComponentData.js'
  : './collectStyledComponentData');

const ruleNameToTypeDict = require('./ruleNameToTypeDict');

const extendStyledComponents = require('./extendStyledComponents');
const StyledComponentsMap = require('./styledComponentsMap');

module.exports = (name, cache) => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponents = new StyledComponentsMap();
    const nodesArray = [];
    const parserMapping = {
      JSXOpeningElement: 'JSXOpeningElement',
      JSXElement: 'JSXElement',
      JSXAttribute: 'JSXOpeningElement',
    };
    const parsedElement = parserMapping[ruleNameToTypeDict[name]];

    const importedModules = {};
    const modulesToParse = {};

    const filename = context.getFilename();

    return {
      ImportDeclaration(node) {
        const { source, specifiers } = node;

        if (source.value.startsWith('.')) {
          for (let spec of specifiers) {
            const importedName = spec.imported?.name;
            const localName = spec.local.name;

            importedModules[localName] = { importedName, localName, source: source.value };
          }
        }
      },
      ...collectStyledComponentData(styledComponents, context, name),
      [parsedElement]: (node) => {
        const componentName = node.openingElement ? node.openingElement.name?.name : node.name?.name;

        if (importedModules[componentName]) {
          modulesToParse[componentName] = importedModules[componentName];
        }
        nodesArray.push(node);
      },
      'Program:exit': () => {
        if (!cache.isPathCached(filename)) {
          console.log(context.getAncestors(), 'not cached');
          extendStyledComponents(styledComponents, modulesToParse, context);
          cache.setForPath(filename, styledComponents);
        }
        // console.log(cache.getForPath(filename), 'cache.getForPath(filename)');
        const parser = require(nodeParserPath)(context, cache.getForPath(filename), rule, name);
        nodesArray.forEach((node) => parser[parsedElement](node));
      },
    };
  },
});
