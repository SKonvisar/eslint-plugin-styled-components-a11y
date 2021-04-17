class StyledComponentsMap {
  constructor() {
    this.map = {};
    this.options = {
      keyMapper: (key) => key,
    };
  }

  set(componentName, value) {
    const componentKey = this.options.keyMapper(componentName);
    this.map[componentKey] = value;
  }

  get(componentName) {
    return this.map[componentName];
  }

  keys() {
    return Object.keys(this.map);
  }

  setKeyMapper(mapperFn) {
    this.options.keyMapper = mapperFn;
  }

  resetKeyMapper() {
    this.options.keyMapper = (name) => name;
  }
}

module.exports = StyledComponentsMap;
