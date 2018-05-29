let path = require('path');
let assert = require('assert');

class Emitter {
  constructor(emitter_name) {
    this.name = emitter_name;
    this._events = [
        {
            key: 'error',
            module: 'generator_emitter',
            match: 'error',
            callback: (...args) => {throw new Error('Uncaught error in EventEmitter', ...args)}
        }
    ];
    this._eventMap = {};
    this._defaultHandler = null;
  }

  emit(event, ...args) {
    for (let e of this._events) {
        let re = new RegExp(`^${e.match}$`);
        if(re.test(event)) {
            return e.callback(...args);
        }
    };
    if(this._defaultHandler) {
        return this._defaultHandler.callback(...args);
    }
    throw new Error(`${this.name}: Failed to match event '${event}' in keys: '${JSON.stringify(this._eventMap)}'`);
  }

  register(eventMeta) {
    assert(eventMeta.key)
    assert(eventMeta.module)
    assert(eventMeta.match)
    assert(eventMeta.callback)

    if(this._eventMap.hasOwnProperty(eventMeta.key)) {
      throw new Error(`${this.name}: event.key '${eventMeta.key}' is already registered`);
    }

    this._events.push(eventMeta);
    this._eventMap[eventMeta.key] = eventMeta;
  }

  registerDefault(eventMeta) {
    assert(eventMeta.module)
    assert(eventMeta.callback)

    if(this._defaultHandler) {
      throw new Error(`${this.name}: default handler is already registered`);
    }

    this._defaultHandler = eventMeta;
  }
}

module.exports = {
  generator_emitter: new Emitter('generator_emitter'),
  headers_emitter: new Emitter('headers_emitter')
}