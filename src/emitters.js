const debug = require('debug');

class Emitter {
  constructor(emitter_name) {
    this._name = emitter_name;
    this._events = [];
    this._eventMap = {
      'error': (...args) => {throw new Error(`Uncaught error in ${this._name}`, ...args)}
    };
    this._defaultHandler = null;
  }

  emit(event, ...args) {
    // Try to match string events
    if(this._eventMap.hasOwnProperty(event)) {
      debug(`emitters:${this._name}`)(`matched '${event}' as string`);
      return this._eventMap[event](...args);
    }

    // Try to match regex events
    for(let e of this._events) {
        let re = new RegExp(`^${e.name}$`);
        if(re.test(event)) {
            debug(`emitters:${this._name}`)(`matched '${event}' with '${e.name}'`);
            return e.callback(...args);
        } else {
          // debug(`emitters:${this._name}`)(`failed to match '${event}' with '${e.name}`);
        }
    };

    // Try the default handler
    if(this._defaultHandler) {
        debug(`emitters:${this._name}`)(`matched '${event}' with default handler`);
        return this._defaultHandler(...args);
    }

    throw new Error(`${this._name}: Failed to match event '${event}' in keys: '${JSON.stringify(this._eventMap)}'`);
  }

  /**
   * Register an event handler using a RegExp matcher
   *    Strings will match before RegExp strings
   *    RegExp strings will match in the order of registration
   *
   *    Duplicate registrations are not allowed
   *
   * @param {string} A RegExp string to match against events
   * @param {function} callback handler
   */
  register(name, callback) {
    if(this._eventMap.hasOwnProperty(name)) {
      throw new Error(`${this._name}: event '${name}' is already registered`);
    }

    this._eventMap[name] = callback;
    if(!/^[\w:-]+$/.test(name)) {
      this._events.push({ name, callback });
    }
  }

  /**
   * Register a default event handler
   *    The default handler will be triggered if no other handlers match
   *
   * @param {function} callback handler
   */
  registerDefault(callback) {
    if(this._defaultHandler) {
      throw new Error(`${this._name}: default handler is already registered`);
    }

    this._defaultHandler = callback;
  }
}

module.exports = {
  impl_emitter: new Emitter('impl_emitter'),
  header_emitter: new Emitter('header_emitter'),
  wrapper_emitter: new Emitter('wrapper_emitter'),
  export_emitter: new Emitter('export_emitter'),
}