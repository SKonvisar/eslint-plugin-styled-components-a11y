const makeRule = require('./utils/makeRule');

class FileCache {
  constructor() {
    this.map = {};
  }

  setForPath(path, scm) {
    this.map = {
      [path]: scm,
    };
  }

  isPathCached(path) {
    return !!this.map[path];
  }

  getForPath(path) {
    return this.map[path];
  }
}

const fileCacheMap = new FileCache();

module.exports = {
  rules: {
    'accessible-emoji': makeRule('accessible-emoji', fileCacheMap),
    'alt-text': makeRule('alt-text', fileCacheMap),
    'anchor-has-content': makeRule('anchor-has-content', fileCacheMap),
    'anchor-is-valid': makeRule('anchor-is-valid', fileCacheMap),
    'aria-activedescendant-has-tabindex': makeRule('aria-activedescendant-has-tabindex', fileCacheMap),
    'aria-props': makeRule('aria-props', fileCacheMap),
    'aria-proptypes': makeRule('aria-proptypes', fileCacheMap),
    'aria-role': makeRule('aria-role', fileCacheMap),
    'aria-unsupported-elements': makeRule('aria-unsupported-elements', fileCacheMap),
    'autocomplete-valid': makeRule('autocomplete-valid', fileCacheMap),
    'click-events-have-key-events': makeRule('click-events-have-key-events', fileCacheMap),
    'control-has-associated-label': makeRule('control-has-associated-label', fileCacheMap),
    'heading-has-content': makeRule('heading-has-content', fileCacheMap),
    'html-has-lang': makeRule('html-has-lang', fileCacheMap),
    'iframe-has-title': makeRule('iframe-has-title', fileCacheMap),
    'img-redundant-alt': makeRule('img-redundant-alt', fileCacheMap),
    'interactive-supports-focus': makeRule('interactive-supports-focus', fileCacheMap),
    'label-has-associated-control': makeRule('label-has-associated-control', fileCacheMap),
    'label-has-for': makeRule('label-has-for', fileCacheMap),
    'media-has-caption': makeRule('media-has-caption', fileCacheMap),
    'mouse-events-have-key-events': makeRule('mouse-events-have-key-events', fileCacheMap),
    'no-access-key': makeRule('no-access-key', fileCacheMap),
    'no-autofocus': makeRule('no-autofocus', fileCacheMap),
    'no-distracting-elements': makeRule('no-distracting-elements', fileCacheMap),
    'no-interactive-element-to-noninteractive-role': makeRule(
      'no-interactive-element-to-noninteractive-role',
      fileCacheMap,
    ),
    'no-noninteractive-element-interactions': makeRule('no-noninteractive-element-interactions', fileCacheMap),
    'no-noninteractive-element-to-interactive-role': makeRule(
      'no-noninteractive-element-to-interactive-role',
      fileCacheMap,
    ),
    'no-noninteractive-tabindex': makeRule('no-noninteractive-tabindex', fileCacheMap),
    'no-onchange': makeRule('no-onchange', fileCacheMap),
    'no-redundant-roles': makeRule('no-redundant-roles', fileCacheMap),
    'no-static-element-interactions': makeRule('no-static-element-interactions', fileCacheMap),
    'role-has-required-aria-props': makeRule('role-has-required-aria-props', fileCacheMap),
    'role-supports-aria-props': makeRule('role-supports-aria-props', fileCacheMap),
    scope: makeRule('scope', fileCacheMap),
    'tabindex-no-positive': makeRule('tabindex-no-positive', fileCacheMap),
  },
  configs: {
    recommended: {
      plugins: ['styled-components-a11y'],
      extends: ['eslint-config-airbnb/rules/react-a11y'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'styled-components-a11y/accessible-emoji': 'error',
        'styled-components-a11y/alt-text': 'error',
        'styled-components-a11y/anchor-has-content': 'error',
        'styled-components-a11y/anchor-is-valid': 'error',
        'styled-components-a11y/aria-activedescendant-has-tabindex': 'error',
        'styled-components-a11y/aria-props': 'error',
        'styled-components-a11y/aria-proptypes': 'error',
        'styled-components-a11y/aria-role': 'error',
        'styled-components-a11y/aria-unsupported-elements': 'error',
        'styled-components-a11y/autocomplete-valid': 'error',
        'styled-components-a11y/click-events-have-key-events': 'error',
        'styled-components-a11y/control-has-associated-label': [
          'off',
          {
            ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
            ignoreRoles: [
              'grid',
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'row',
              'tablist',
              'toolbar',
              'tree',
              'treegrid',
            ],
            includeRoles: ['alert', 'dialog'],
          },
        ],
        'styled-components-a11y/heading-has-content': 'error',
        'styled-components-a11y/html-has-lang': 'error',
        'styled-components-a11y/iframe-has-title': 'error',
        'styled-components-a11y/img-redundant-alt': 'error',
        'styled-components-a11y/interactive-supports-focus': [
          'error',
          {
            tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
          },
        ],
        'styled-components-a11y/label-has-associated-control': 'error',
        'styled-components-a11y/label-has-for': 'off',
        'styled-components-a11y/media-has-caption': 'error',
        'styled-components-a11y/mouse-events-have-key-events': 'error',
        // 'styled-components-a11y/no-access-key': 'error',
        'styled-components-a11y/no-autofocus': 'error',
        'styled-components-a11y/no-distracting-elements': 'error',
        'styled-components-a11y/no-interactive-element-to-noninteractive-role': [
          'error',
          {
            tr: ['none', 'presentation'],
          },
        ],
        'styled-components-a11y/no-noninteractive-element-interactions': [
          'error',
          {
            handlers: [
              'onClick',
              'onError',
              'onLoad',
              'onMouseDown',
              'onMouseUp',
              'onKeyPress',
              'onKeyDown',
              'onKeyUp',
            ],
            alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
            body: ['onError', 'onLoad'],
            dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
            iframe: ['onError', 'onLoad'],
            img: ['onError', 'onLoad'],
          },
        ],
        'styled-components-a11y/no-noninteractive-element-to-interactive-role': [
          'error',
          {
            ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
            ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
            li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
            table: ['grid'],
            td: ['gridcell'],
          },
        ],
        'styled-components-a11y/no-noninteractive-tabindex': [
          'error',
          {
            tags: [],
            roles: ['tabpanel'],
            allowExpressionValues: true,
          },
        ],
        'styled-components-a11y/no-onchange': 'error',
        'styled-components-a11y/no-redundant-roles': 'error',
        'styled-components-a11y/no-static-element-interactions': [
          'error',
          {
            allowExpressionValues: true,
            handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
          },
        ],
        'styled-components-a11y/role-has-required-aria-props': 'error',
        'styled-components-a11y/role-supports-aria-props': 'error',
        'styled-components-a11y/scope': 'error',
        'styled-components-a11y/tabindex-no-positive': 'error',
      },
    },
    strict: {
      plugins: ['styled-components-a11y'],
      extends: ['eslint-config-airbnb/rules/react-a11y'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'styled-components-a11y/accessible-emoji': 'error',
        'styled-components-a11y/alt-text': 'error',
        'styled-components-a11y/anchor-has-content': 'error',
        'styled-components-a11y/anchor-is-valid': 'error',
        'styled-components-a11y/aria-activedescendant-has-tabindex': 'error',
        'styled-components-a11y/aria-props': 'error',
        'styled-components-a11y/aria-proptypes': 'error',
        'styled-components-a11y/aria-role': 'error',
        'styled-components-a11y/aria-unsupported-elements': 'error',
        'styled-components-a11y/autocomplete-valid': 'error',
        'styled-components-a11y/click-events-have-key-events': 'error',
        'styled-components-a11y/control-has-associated-label': [
          'off',
          {
            ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
            ignoreRoles: [
              'grid',
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'row',
              'tablist',
              'toolbar',
              'tree',
              'treegrid',
            ],
            includeRoles: ['alert', 'dialog'],
          },
        ],
        'styled-components-a11y/heading-has-content': 'error',
        'styled-components-a11y/html-has-lang': 'error',
        'styled-components-a11y/iframe-has-title': 'error',
        'styled-components-a11y/img-redundant-alt': 'error',
        'styled-components-a11y/interactive-supports-focus': [
          'error',
          {
            tabbable: [
              'button',
              'checkbox',
              'link',
              'progressbar',
              'searchbox',
              'slider',
              'spinbutton',
              'switch',
              'textbox',
            ],
          },
        ],
        'styled-components-a11y/label-has-for': 'error',
        'styled-components-a11y/label-has-associated-control': 'error',
        'styled-components-a11y/media-has-caption': 'error',
        'styled-components-a11y/mouse-events-have-key-events': 'error',
        'styled-components-a11y/no-access-key': 'error',
        'styled-components-a11y/no-autofocus': 'error',
        'styled-components-a11y/no-distracting-elements': 'error',
        'styled-components-a11y/no-interactive-element-to-noninteractive-role': 'error',
        'styled-components-a11y/no-noninteractive-element-interactions': [
          'error',
          {
            body: ['onError', 'onLoad'],
            iframe: ['onError', 'onLoad'],
            img: ['onError', 'onLoad'],
          },
        ],
        'styled-components-a11y/no-noninteractive-element-to-interactive-role': 'error',
        'styled-components-a11y/no-noninteractive-tabindex': 'error',
        'styled-components-a11y/no-onchange': 'error',
        'styled-components-a11y/no-redundant-roles': 'error',
        'styled-components-a11y/no-static-element-interactions': 'error',
        'styled-components-a11y/role-has-required-aria-props': 'error',
        'styled-components-a11y/role-supports-aria-props': 'error',
        'styled-components-a11y/scope': 'error',
        'styled-components-a11y/tabindex-no-positive': 'error',
      },
    },
  },
};
