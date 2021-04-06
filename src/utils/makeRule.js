const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');

const { inspect } = require('util');
const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
  ? '../../lib/utils/collectStyledComponentData.js'
  : './collectStyledComponentData');

const ruleNameToTypeDict = require('./ruleNameToTypeDict');

const extendStyledComponents = require('./extendStyledComponents');
// const styledComponents = {};

module.exports = (name) => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponents = {};
    const nodesArray = [];
    const parserMapping = {
      JSXOpeningElement: 'JSXOpeningElement',
      JSXElement: 'JSXElement',
      JSXAttribute: 'JSXOpeningElement'
    };
    const parsedElement = parserMapping[ruleNameToTypeDict[name]];

    // new
    const importedModules = new Map();

    return {
      ImportDeclaration(node) {
        const { source, specifiers } = node;

        if (source.value.startsWith('.')) {
          for (let spec of specifiers) {
            const importedName = spec.imported?.name;
            const localName = spec.local.name;

            importedModules.set(localName,
              {
                importedName,
                localName,
                source: source.value
              })

          }
        }
      },
      ...(collectStyledComponentData(styledComponents, context, name)),
      [parsedElement]: (node) => {
        const componentName = parsedElement === 'JSXElement' ? node.openingElement.name.name : node.name.name;

        if (!styledComponents[componentName]) {
          // console.log('not covered', componentName);
          const a = importedModules.get(componentName);
          // console.log('can be found - ', a.source)
        }

        nodesArray.push(node);
      },
      "Program:exit": () => {
        extendStyledComponents(styledComponents, importedModules, context);
        const parser = require(nodeParserPath)(context, styledComponents, rule, name);
        nodesArray.forEach((node) => parser[parsedElement](node))
      }
    };
  },
});

