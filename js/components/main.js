/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("main", [], factory);
	else if(typeof exports === 'object')
		exports["main"] = factory();
	else
		root["main"] = factory();
})(this, function() {
return dojoWebpackJsonpcheckout_form(["main"],{

/***/ "./node_modules/@dojo/core/Destroyable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var lang_1 = __webpack_require__("./node_modules/@dojo/core/lang.js");
var Promise_1 = __webpack_require__("./node_modules/@dojo/shim/Promise.js");
/**
 * No operation function to replace own once instance is destoryed
 */
function noop() {
    return Promise_1.default.resolve(false);
}
/**
 * No op function used to replace own, once instance has been destoryed
 */
function destroyed() {
    throw new Error('Call made to destroyed method');
}
var Destroyable = /** @class */ (function () {
    /**
     * @constructor
     */
    function Destroyable() {
        this.handles = [];
    }
    /**
     * Register handles for the instance that will be destroyed when `this.destroy` is called
     *
     * @param {Handle} handle The handle to add for the instance
     * @returns {Handle} a handle for the handle, removes the handle for the instance and calls destroy
     */
    Destroyable.prototype.own = function (handles) {
        var handle = Array.isArray(handles) ? lang_1.createCompositeHandle.apply(void 0, tslib_1.__spread(handles)) : handles;
        var _handles = this.handles;
        _handles.push(handle);
        return {
            destroy: function () {
                _handles.splice(_handles.indexOf(handle));
                handle.destroy();
            }
        };
    };
    /**
     * Destrpys all handers registered for the instance
     *
     * @returns {Promise<any} a promise that resolves once all handles have been destroyed
     */
    Destroyable.prototype.destroy = function () {
        var _this = this;
        return new Promise_1.default(function (resolve) {
            _this.handles.forEach(function (handle) {
                handle && handle.destroy && handle.destroy();
            });
            _this.destroy = noop;
            _this.own = destroyed;
            resolve(true);
        });
    };
    return Destroyable;
}());
exports.Destroyable = Destroyable;
exports.default = Destroyable;

/***/ }),

/***/ "./node_modules/@dojo/core/Evented.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Destroyable_1 = __webpack_require__("./node_modules/@dojo/core/Destroyable.js");
/**
 * Map of computed regular expressions, keyed by string
 */
var regexMap = new Map_1.default();
/**
 * Determines is the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        var regex = void 0;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp("^" + globString.replace(/\*/g, '.*') + "$");
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
exports.isGlobMatch = isGlobMatch;
/**
 * Event Class
 */
var Evented = /** @class */ (function (_super) {
    tslib_1.__extends(Evented, _super);
    function Evented() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * map of listeners keyed by event type
         */
        _this.listenersMap = new Map_1.default();
        return _this;
    }
    Evented.prototype.emit = function (event) {
        var _this = this;
        this.listenersMap.forEach(function (methods, type) {
            if (isGlobMatch(type, event.type)) {
                methods.forEach(function (method) {
                    method.call(_this, event);
                });
            }
        });
    };
    Evented.prototype.on = function (type, listener) {
        var _this = this;
        if (Array.isArray(listener)) {
            var handles_1 = listener.map(function (listener) { return _this._addListener(type, listener); });
            return {
                destroy: function () {
                    handles_1.forEach(function (handle) { return handle.destroy(); });
                }
            };
        }
        return this._addListener(type, listener);
    };
    Evented.prototype._addListener = function (type, listener) {
        var _this = this;
        var listeners = this.listenersMap.get(type) || [];
        listeners.push(listener);
        this.listenersMap.set(type, listeners);
        return {
            destroy: function () {
                var listeners = _this.listenersMap.get(type) || [];
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    };
    return Evented;
}(Destroyable_1.Destroyable));
exports.Evented = Evented;
exports.default = Evented;

/***/ }),

/***/ "./node_modules/@dojo/core/has.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
tslib_1.__exportStar(__webpack_require__("./node_modules/@dojo/shim/support/has.js"), exports);
exports.default = has_1.default;
has_1.add('object-assign', typeof global_1.default.Object.assign === 'function', true);
has_1.add('arraybuffer', typeof global_1.default.ArrayBuffer !== 'undefined', true);
has_1.add('formdata', typeof global_1.default.FormData !== 'undefined', true);
has_1.add('filereader', typeof global_1.default.FileReader !== 'undefined', true);
has_1.add('xhr', typeof global_1.default.XMLHttpRequest !== 'undefined', true);
has_1.add('xhr2', has_1.default('xhr') && 'responseType' in global_1.default.XMLHttpRequest.prototype, true);
has_1.add('blob', function () {
    if (!has_1.default('xhr2')) {
        return false;
    }
    var request = new global_1.default.XMLHttpRequest();
    request.open('GET', global_1.default.location.protocol + '//www.google.com', true);
    request.responseType = 'blob';
    request.abort();
    return request.responseType === 'blob';
}, true);
has_1.add('node-buffer', 'Buffer' in global_1.default && typeof global_1.default.Buffer === 'function', true);
has_1.add('fetch', 'fetch' in global_1.default && typeof global_1.default.fetch === 'function', true);
has_1.add('web-worker-xhr-upload', new Promise(function (resolve) {
    try {
        if (global_1.default.Worker !== undefined && global_1.default.URL && global_1.default.URL.createObjectURL) {
            var blob = new Blob([
                "(function () {\nself.addEventListener('message', function () {\n\tvar xhr = new XMLHttpRequest();\n\ttry {\n\t\txhr.upload;\n\t\tpostMessage('true');\n\t} catch (e) {\n\t\tpostMessage('false');\n\t}\n});\n\t\t})()"
            ], { type: 'application/javascript' });
            var worker = new Worker(URL.createObjectURL(blob));
            worker.addEventListener('message', function (_a) {
                var result = _a.data;
                resolve(result === 'true');
            });
            worker.postMessage({});
        }
        else {
            resolve(false);
        }
    }
    catch (e) {
        // IE11 on Winodws 8.1 encounters a security error.
        resolve(false);
    }
}), true);

/***/ }),

/***/ "./node_modules/@dojo/core/lang.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var object_1 = __webpack_require__("./node_modules/@dojo/shim/object.js");
var object_2 = __webpack_require__("./node_modules/@dojo/shim/object.js");
exports.assign = object_2.assign;
var slice = Array.prototype.slice;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Type guard that ensures that the value can be coerced to Object
 * to weed out host objects that do not derive from Object.
 * This function is used to check if we want to deep copy an object or not.
 * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
 * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
 * so it is not handled here.
 * @param  value The value to check
 * @return       If the value is coercible into an Object
 */
function shouldDeepCopyObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function copyArray(array, inherited) {
    return array.map(function (item) {
        if (Array.isArray(item)) {
            return copyArray(item, inherited);
        }
        return !shouldDeepCopyObject(item)
            ? item
            : _mixin({
                deep: true,
                inherited: inherited,
                sources: [item],
                target: {}
            });
    });
}
function _mixin(kwArgs) {
    var deep = kwArgs.deep;
    var inherited = kwArgs.inherited;
    var target = kwArgs.target;
    var copied = kwArgs.copied || [];
    var copiedClone = tslib_1.__spread(copied);
    for (var i = 0; i < kwArgs.sources.length; i++) {
        var source = kwArgs.sources[i];
        if (source === null || source === undefined) {
            continue;
        }
        for (var key in source) {
            if (inherited || hasOwnProperty.call(source, key)) {
                var value = source[key];
                if (copiedClone.indexOf(value) !== -1) {
                    continue;
                }
                if (deep) {
                    if (Array.isArray(value)) {
                        value = copyArray(value, inherited);
                    }
                    else if (shouldDeepCopyObject(value)) {
                        var targetValue = target[key] || {};
                        copied.push(source);
                        value = _mixin({
                            deep: true,
                            inherited: inherited,
                            sources: [value],
                            target: targetValue,
                            copied: copied
                        });
                    }
                }
                target[key] = value;
            }
        }
    }
    return target;
}
function create(prototype) {
    var mixins = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        mixins[_i - 1] = arguments[_i];
    }
    if (!mixins.length) {
        throw new RangeError('lang.create requires at least one mixin object.');
    }
    var args = mixins.slice();
    args.unshift(Object.create(prototype));
    return object_1.assign.apply(null, args);
}
exports.create = create;
function deepAssign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
exports.deepAssign = deepAssign;
function deepMixin(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: true,
        inherited: true,
        sources: sources,
        target: target
    });
}
exports.deepMixin = deepMixin;
/**
 * Creates a new object using the provided source's prototype as the prototype for the new object, and then
 * deep copies the provided source's values into the new target.
 *
 * @param source The object to duplicate
 * @return The new object
 */
function duplicate(source) {
    var target = Object.create(Object.getPrototypeOf(source));
    return deepMixin(target, source);
}
exports.duplicate = duplicate;
/**
 * Determines whether two values are the same value.
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @return true if the values are the same; false otherwise
 */
function isIdentical(a, b) {
    return (a === b ||
        /* both values are NaN */
        (a !== a && b !== b));
}
exports.isIdentical = isIdentical;
/**
 * Returns a function that binds a method to the specified object at runtime. This is similar to
 * `Function.prototype.bind`, but instead of a function it takes the name of a method on an object.
 * As a result, the function returned by `lateBind` will always call the function currently assigned to
 * the specified property on the object as of the moment the function it returns is called.
 *
 * @param instance The context object
 * @param method The name of the method on the context object to bind to itself
 * @param suppliedArgs An optional array of values to prepend to the `instance[method]` arguments list
 * @return The bound function
 */
function lateBind(instance, method) {
    var suppliedArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        suppliedArgs[_i - 2] = arguments[_i];
    }
    return suppliedArgs.length
        ? function () {
            var args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
            // TS7017
            return instance[method].apply(instance, args);
        }
        : function () {
            // TS7017
            return instance[method].apply(instance, arguments);
        };
}
exports.lateBind = lateBind;
function mixin(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: false,
        inherited: true,
        sources: sources,
        target: target
    });
}
exports.mixin = mixin;
/**
 * Returns a function which invokes the given function with the given arguments prepended to its argument list.
 * Like `Function.prototype.bind`, but does not alter execution context.
 *
 * @param targetFunction The function that needs to be bound
 * @param suppliedArgs An optional array of arguments to prepend to the `targetFunction` arguments list
 * @return The bound function
 */
function partial(targetFunction) {
    var suppliedArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        suppliedArgs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
        return targetFunction.apply(this, args);
    };
}
exports.partial = partial;
/**
 * Returns an object with a destroy method that, when called, calls the passed-in destructor.
 * This is intended to provide a unified interface for creating "remove" / "destroy" handlers for
 * event listeners, timers, etc.
 *
 * @param destructor A function that will be called when the handle's `destroy` method is invoked
 * @return The handle object
 */
function createHandle(destructor) {
    var called = false;
    return {
        destroy: function () {
            if (!called) {
                called = true;
                destructor();
            }
        }
    };
}
exports.createHandle = createHandle;
/**
 * Returns a single handle that can be used to destroy multiple handles simultaneously.
 *
 * @param handles An array of handles with `destroy` methods
 * @return The handle object
 */
function createCompositeHandle() {
    var handles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handles[_i] = arguments[_i];
    }
    return createHandle(function () {
        for (var i = 0; i < handles.length; i++) {
            handles[i].destroy();
        }
    });
}
exports.createCompositeHandle = createCompositeHandle;

/***/ }),

/***/ "./node_modules/@dojo/core/uuid.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a v4 compliant UUID.
 *
 * @returns {string}
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.default = uuid;

/***/ }),

/***/ "./node_modules/@dojo/has/has.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {
Object.defineProperty(exports, "__esModule", { value: true });
function isFeatureTestThenable(value) {
    return value && value.then;
}
/**
 * A cache of results of feature tests
 */
exports.testCache = {};
/**
 * A cache of the un-resolved feature tests
 */
exports.testFunctions = {};
/**
 * A cache of unresolved thenables (probably promises)
 * @type {{}}
 */
var testThenables = {};
/**
 * A reference to the global scope (`window` in a browser, `global` in NodeJS)
 */
var globalScope = (function () {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
        // Browsers
        return window;
    }
    else if (typeof global !== 'undefined') {
        // Node
        return global;
    }
    else if (typeof self !== 'undefined') {
        // Web workers
        return self;
    }
    /* istanbul ignore next */
    return {};
})();
/* Grab the staticFeatures if there are available */
var staticFeatures = (globalScope.DojoHasEnvironment || {}).staticFeatures;
/* Cleaning up the DojoHasEnviornment */
if ('DojoHasEnvironment' in globalScope) {
    delete globalScope.DojoHasEnvironment;
}
/**
 * Custom type guard to narrow the `staticFeatures` to either a map or a function that
 * returns a map.
 *
 * @param value The value to guard for
 */
function isStaticFeatureFunction(value) {
    return typeof value === 'function';
}
/**
 * The cache of asserted features that were available in the global scope when the
 * module loaded
 */
var staticCache = staticFeatures
    ? isStaticFeatureFunction(staticFeatures) ? staticFeatures.apply(globalScope) : staticFeatures
    : {};/* Providing an empty cache, if none was in the environment

/**
* AMD plugin function.
*
* Conditional loads modules based on a has feature test value.
*
* @param resourceId Gives the resolved module id to load.
* @param require The loader require function with respect to the module that contained the plugin resource in its
*                dependency list.
* @param load Callback to loader that consumes result of plugin demand.
*/
function load(resourceId, require, load, config) {
    resourceId ? require([resourceId], load) : load();
}
exports.load = load;
/**
 * AMD plugin function.
 *
 * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
 * value(s).
 *
 * @param resourceId The id of the module
 * @param normalize Resolves a relative module id into an absolute module id
 */
function normalize(resourceId, normalize) {
    var tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
    var i = 0;
    function get(skip) {
        var term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to null
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    var id = get();
    return id && normalize(id);
}
exports.normalize = normalize;
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
function exists(feature) {
    var normalizedFeature = feature.toLowerCase();
    return Boolean(normalizedFeature in staticCache || normalizedFeature in exports.testCache || exports.testFunctions[normalizedFeature]);
}
exports.exists = exists;
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
function add(feature, value, overwrite) {
    if (overwrite === void 0) { overwrite = false; }
    var normalizedFeature = feature.toLowerCase();
    if (exists(normalizedFeature) && !overwrite && !(normalizedFeature in staticCache)) {
        throw new TypeError("Feature \"" + feature + "\" exists and overwrite not true.");
    }
    if (typeof value === 'function') {
        exports.testFunctions[normalizedFeature] = value;
    }
    else if (isFeatureTestThenable(value)) {
        testThenables[feature] = value.then(function (resolvedValue) {
            exports.testCache[feature] = resolvedValue;
            delete testThenables[feature];
        }, function () {
            delete testThenables[feature];
        });
    }
    else {
        exports.testCache[normalizedFeature] = value;
        delete exports.testFunctions[normalizedFeature];
    }
}
exports.add = add;
/**
 * Return the current value of a named feature.
 *
 * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
 */
function has(feature) {
    var result;
    var normalizedFeature = feature.toLowerCase();
    if (normalizedFeature in staticCache) {
        result = staticCache[normalizedFeature];
    }
    else if (exports.testFunctions[normalizedFeature]) {
        result = exports.testCache[normalizedFeature] = exports.testFunctions[normalizedFeature].call(null);
        delete exports.testFunctions[normalizedFeature];
    }
    else if (normalizedFeature in exports.testCache) {
        result = exports.testCache[normalizedFeature];
    }
    else if (feature in testThenables) {
        return false;
    }
    else {
        throw new TypeError("Attempt to detect unregistered has feature \"" + feature + "\"");
    }
    return result;
}
exports.default = has;
/*
 * Out of the box feature tests
 */
/* Environments */
/* Used as a value to provide a debug only code path */
add('debug', true);
/* Detects if the environment is "browser like" */
add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
/* Detects if the environment appears to be NodeJS */
add('host-node', function () {
    if (typeof process === 'object' && process.versions && process.versions.node) {
        return process.versions.node;
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@dojo/shim/Map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var object_1 = __webpack_require__("./node_modules/@dojo/shim/object.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
exports.Map = global_1.default.Map;
if (!has_1.default('es6-map')) {
    exports.Map = (_a = /** @class */ (function () {
            function Map(iterable) {
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    if (iterator_1.isArrayLike(iterable)) {
                        for (var i = 0; i < iterable.length; i++) {
                            var value = iterable[i];
                            this.set(value[0], value[1]);
                        }
                    }
                    else {
                        try {
                            for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                                var value = iterable_1_1.value;
                                this.set(value[0], value[1]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                var e_1, _a;
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            Map.prototype._indexOfKey = function (keys, key) {
                for (var i = 0, length_1 = keys.length; i < length_1; i++) {
                    if (object_1.is(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            };
            Object.defineProperty(Map.prototype, "size", {
                get: function () {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            Map.prototype.clear = function () {
                this._keys.length = this._values.length = 0;
            };
            Map.prototype.delete = function (key) {
                var index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            };
            Map.prototype.entries = function () {
                var _this = this;
                var values = this._keys.map(function (key, i) {
                    return [key, _this._values[i]];
                });
                return new iterator_1.ShimIterator(values);
            };
            Map.prototype.forEach = function (callback, context) {
                var keys = this._keys;
                var values = this._values;
                for (var i = 0, length_2 = keys.length; i < length_2; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            };
            Map.prototype.get = function (key) {
                var index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            };
            Map.prototype.has = function (key) {
                return this._indexOfKey(this._keys, key) > -1;
            };
            Map.prototype.keys = function () {
                return new iterator_1.ShimIterator(this._keys);
            };
            Map.prototype.set = function (key, value) {
                var index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            };
            Map.prototype.values = function () {
                return new iterator_1.ShimIterator(this._values);
            };
            Map.prototype[Symbol.iterator] = function () {
                return this.entries();
            };
            return Map;
        }()),
        _a[Symbol.species] = _a,
        _a);
}
exports.default = exports.Map;
var _a;

/***/ }),

/***/ "./node_modules/@dojo/shim/Promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var queue_1 = __webpack_require__("./node_modules/@dojo/shim/support/queue.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
exports.ShimPromise = global_1.default.Promise;
exports.isThenable = function isThenable(value) {
    return value && typeof value.then === 'function';
};
if (!has_1.default('es6-promise')) {
    global_1.default.Promise = exports.ShimPromise = (_a = /** @class */ (function () {
            /**
             * Creates a new Promise.
             *
             * @constructor
             *
             * @param executor
             * The executor function is called immediately when the Promise is instantiated. It is responsible for
             * starting the asynchronous operation when it is invoked.
             *
             * The executor must call either the passed `resolve` function when the asynchronous operation has completed
             * successfully, or the `reject` function when the operation fails.
             */
            function Promise(executor) {
                var _this = this;
                /**
                 * The current state of this promise.
                 */
                this.state = 1 /* Pending */;
                this[Symbol.toStringTag] = 'Promise';
                /**
                 * If true, the resolution of this promise is chained ("locked in") to another promise.
                 */
                var isChained = false;
                /**
                 * Whether or not this promise is in a resolved state.
                 */
                var isResolved = function () {
                    return _this.state !== 1 /* Pending */ || isChained;
                };
                /**
                 * Callbacks that should be invoked once the asynchronous operation has completed.
                 */
                var callbacks = [];
                /**
                 * Initially pushes callbacks onto a queue for execution once this promise settles. After the promise settles,
                 * enqueues callbacks for execution on the next event loop turn.
                 */
                var whenFinished = function (callback) {
                    if (callbacks) {
                        callbacks.push(callback);
                    }
                };
                /**
                 * Settles this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                var settle = function (newState, value) {
                    // A promise can only be settled once.
                    if (_this.state !== 1 /* Pending */) {
                        return;
                    }
                    _this.state = newState;
                    _this.resolvedValue = value;
                    whenFinished = queue_1.queueMicroTask;
                    // Only enqueue a callback runner if there are callbacks so that initially fulfilled Promises don't have to
                    // wait an extra turn.
                    if (callbacks && callbacks.length > 0) {
                        queue_1.queueMicroTask(function () {
                            if (callbacks) {
                                var count = callbacks.length;
                                for (var i = 0; i < count; ++i) {
                                    callbacks[i].call(null);
                                }
                                callbacks = null;
                            }
                        });
                    }
                };
                /**
                 * Resolves this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                var resolve = function (newState, value) {
                    if (isResolved()) {
                        return;
                    }
                    if (exports.isThenable(value)) {
                        value.then(settle.bind(null, 0 /* Fulfilled */), settle.bind(null, 2 /* Rejected */));
                        isChained = true;
                    }
                    else {
                        settle(newState, value);
                    }
                };
                this.then = function (onFulfilled, onRejected) {
                    return new Promise(function (resolve, reject) {
                        // whenFinished initially queues up callbacks for execution after the promise has settled. Once the
                        // promise has settled, whenFinished will schedule callbacks for execution on the next turn through the
                        // event loop.
                        whenFinished(function () {
                            var callback = _this.state === 2 /* Rejected */ ? onRejected : onFulfilled;
                            if (typeof callback === 'function') {
                                try {
                                    resolve(callback(_this.resolvedValue));
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else if (_this.state === 2 /* Rejected */) {
                                reject(_this.resolvedValue);
                            }
                            else {
                                resolve(_this.resolvedValue);
                            }
                        });
                    });
                };
                try {
                    executor(resolve.bind(null, 0 /* Fulfilled */), resolve.bind(null, 2 /* Rejected */));
                }
                catch (error) {
                    settle(2 /* Rejected */, error);
                }
            }
            Promise.all = function (iterable) {
                return new this(function (resolve, reject) {
                    var values = [];
                    var complete = 0;
                    var total = 0;
                    var populating = true;
                    function fulfill(index, value) {
                        values[index] = value;
                        ++complete;
                        finish();
                    }
                    function finish() {
                        if (populating || complete < total) {
                            return;
                        }
                        resolve(values);
                    }
                    function processItem(index, item) {
                        ++total;
                        if (exports.isThenable(item)) {
                            // If an item Promise rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(fulfill.bind(null, index), reject);
                        }
                        else {
                            Promise.resolve(item).then(fulfill.bind(null, index));
                        }
                    }
                    var i = 0;
                    try {
                        for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                            var value = iterable_1_1.value;
                            processItem(i, value);
                            i++;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    populating = false;
                    finish();
                    var e_1, _a;
                });
            };
            Promise.race = function (iterable) {
                return new this(function (resolve, reject) {
                    try {
                        for (var iterable_2 = tslib_1.__values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                            var item = iterable_2_1.value;
                            if (item instanceof Promise) {
                                // If a Promise item rejects, this Promise is immediately rejected with the item
                                // Promise's rejection error.
                                item.then(resolve, reject);
                            }
                            else {
                                Promise.resolve(item).then(resolve);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return)) _a.call(iterable_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var e_2, _a;
                });
            };
            Promise.reject = function (reason) {
                return new this(function (resolve, reject) {
                    reject(reason);
                });
            };
            Promise.resolve = function (value) {
                return new this(function (resolve) {
                    resolve(value);
                });
            };
            Promise.prototype.catch = function (onRejected) {
                return this.then(undefined, onRejected);
            };
            return Promise;
        }()),
        _a[Symbol.species] = exports.ShimPromise,
        _a);
}
exports.default = exports.ShimPromise;
var _a;

/***/ }),

/***/ "./node_modules/@dojo/shim/Set.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
exports.Set = global_1.default.Set;
if (!has_1.default('es6-set')) {
    exports.Set = (_a = /** @class */ (function () {
            function Set(iterable) {
                this._setData = [];
                this[Symbol.toStringTag] = 'Set';
                if (iterable) {
                    if (iterator_1.isArrayLike(iterable)) {
                        for (var i = 0; i < iterable.length; i++) {
                            this.add(iterable[i]);
                        }
                    }
                    else {
                        try {
                            for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                                var value = iterable_1_1.value;
                                this.add(value);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                var e_1, _a;
            }
            Set.prototype.add = function (value) {
                if (this.has(value)) {
                    return this;
                }
                this._setData.push(value);
                return this;
            };
            Set.prototype.clear = function () {
                this._setData.length = 0;
            };
            Set.prototype.delete = function (value) {
                var idx = this._setData.indexOf(value);
                if (idx === -1) {
                    return false;
                }
                this._setData.splice(idx, 1);
                return true;
            };
            Set.prototype.entries = function () {
                return new iterator_1.ShimIterator(this._setData.map(function (value) { return [value, value]; }));
            };
            Set.prototype.forEach = function (callbackfn, thisArg) {
                var iterator = this.values();
                var result = iterator.next();
                while (!result.done) {
                    callbackfn.call(thisArg, result.value, result.value, this);
                    result = iterator.next();
                }
            };
            Set.prototype.has = function (value) {
                return this._setData.indexOf(value) > -1;
            };
            Set.prototype.keys = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            Object.defineProperty(Set.prototype, "size", {
                get: function () {
                    return this._setData.length;
                },
                enumerable: true,
                configurable: true
            });
            Set.prototype.values = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            Set.prototype[Symbol.iterator] = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            return Set;
        }()),
        _a[Symbol.species] = _a,
        _a);
}
exports.default = exports.Set;
var _a;

/***/ }),

/***/ "./node_modules/@dojo/shim/Symbol.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
exports.Symbol = global_1.default.Symbol;
if (!has_1.default('es6-symbol')) {
    /**
     * Throws if the value is not a symbol, used internally within the Shim
     * @param  {any}    value The value to check
     * @return {symbol}       Returns the symbol or throws
     */
    var validateSymbol_1 = function validateSymbol(value) {
        if (!isSymbol(value)) {
            throw new TypeError(value + ' is not a symbol');
        }
        return value;
    };
    var defineProperties_1 = Object.defineProperties;
    var defineProperty_1 = Object.defineProperty;
    var create_1 = Object.create;
    var objPrototype_1 = Object.prototype;
    var globalSymbols_1 = {};
    var getSymbolName_1 = (function () {
        var created = create_1(null);
        return function (desc) {
            var postfix = 0;
            var name;
            while (created[String(desc) + (postfix || '')]) {
                ++postfix;
            }
            desc += String(postfix || '');
            created[desc] = true;
            name = '@@' + desc;
            // FIXME: Temporary guard until the duplicate execution when testing can be
            // pinned down.
            if (!Object.getOwnPropertyDescriptor(objPrototype_1, name)) {
                defineProperty_1(objPrototype_1, name, {
                    set: function (value) {
                        defineProperty_1(this, name, util_1.getValueDescriptor(value));
                    }
                });
            }
            return name;
        };
    })();
    var InternalSymbol_1 = function Symbol(description) {
        if (this instanceof InternalSymbol_1) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        return Symbol(description);
    };
    exports.Symbol = global_1.default.Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        var sym = Object.create(InternalSymbol_1.prototype);
        description = description === undefined ? '' : String(description);
        return defineProperties_1(sym, {
            __description__: util_1.getValueDescriptor(description),
            __name__: util_1.getValueDescriptor(getSymbolName_1(description))
        });
    };
    /* Decorate the Symbol function with the appropriate properties */
    defineProperty_1(exports.Symbol, 'for', util_1.getValueDescriptor(function (key) {
        if (globalSymbols_1[key]) {
            return globalSymbols_1[key];
        }
        return (globalSymbols_1[key] = exports.Symbol(String(key)));
    }));
    defineProperties_1(exports.Symbol, {
        keyFor: util_1.getValueDescriptor(function (sym) {
            var key;
            validateSymbol_1(sym);
            for (key in globalSymbols_1) {
                if (globalSymbols_1[key] === sym) {
                    return key;
                }
            }
        }),
        hasInstance: util_1.getValueDescriptor(exports.Symbol.for('hasInstance'), false, false),
        isConcatSpreadable: util_1.getValueDescriptor(exports.Symbol.for('isConcatSpreadable'), false, false),
        iterator: util_1.getValueDescriptor(exports.Symbol.for('iterator'), false, false),
        match: util_1.getValueDescriptor(exports.Symbol.for('match'), false, false),
        observable: util_1.getValueDescriptor(exports.Symbol.for('observable'), false, false),
        replace: util_1.getValueDescriptor(exports.Symbol.for('replace'), false, false),
        search: util_1.getValueDescriptor(exports.Symbol.for('search'), false, false),
        species: util_1.getValueDescriptor(exports.Symbol.for('species'), false, false),
        split: util_1.getValueDescriptor(exports.Symbol.for('split'), false, false),
        toPrimitive: util_1.getValueDescriptor(exports.Symbol.for('toPrimitive'), false, false),
        toStringTag: util_1.getValueDescriptor(exports.Symbol.for('toStringTag'), false, false),
        unscopables: util_1.getValueDescriptor(exports.Symbol.for('unscopables'), false, false)
    });
    /* Decorate the InternalSymbol object */
    defineProperties_1(InternalSymbol_1.prototype, {
        constructor: util_1.getValueDescriptor(exports.Symbol),
        toString: util_1.getValueDescriptor(function () {
            return this.__name__;
        }, false, false)
    });
    /* Decorate the Symbol.prototype */
    defineProperties_1(exports.Symbol.prototype, {
        toString: util_1.getValueDescriptor(function () {
            return 'Symbol (' + validateSymbol_1(this).__description__ + ')';
        }),
        valueOf: util_1.getValueDescriptor(function () {
            return validateSymbol_1(this);
        })
    });
    defineProperty_1(exports.Symbol.prototype, exports.Symbol.toPrimitive, util_1.getValueDescriptor(function () {
        return validateSymbol_1(this);
    }));
    defineProperty_1(exports.Symbol.prototype, exports.Symbol.toStringTag, util_1.getValueDescriptor('Symbol', false, false, true));
    defineProperty_1(InternalSymbol_1.prototype, exports.Symbol.toPrimitive, util_1.getValueDescriptor(exports.Symbol.prototype[exports.Symbol.toPrimitive], false, false, true));
    defineProperty_1(InternalSymbol_1.prototype, exports.Symbol.toStringTag, util_1.getValueDescriptor(exports.Symbol.prototype[exports.Symbol.toStringTag], false, false, true));
}
/**
 * A custom guard function that determines if an object is a symbol or not
 * @param  {any}       value The value to check to see if it is a symbol or not
 * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
 */
function isSymbol(value) {
    return (value && (typeof value === 'symbol' || value['@@toStringTag'] === 'Symbol')) || false;
}
exports.isSymbol = isSymbol;
/**
 * Fill any missing well known symbols if the native Symbol is missing them
 */
[
    'hasInstance',
    'isConcatSpreadable',
    'iterator',
    'species',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
    'unscopables',
    'observable'
].forEach(function (wellKnown) {
    if (!exports.Symbol[wellKnown]) {
        Object.defineProperty(exports.Symbol, wellKnown, util_1.getValueDescriptor(exports.Symbol.for(wellKnown), false, false));
    }
});
exports.default = exports.Symbol;

/***/ }),

/***/ "./node_modules/@dojo/shim/WeakMap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
exports.WeakMap = global_1.default.WeakMap;
if (!has_1.default('es6-weakmap')) {
    var DELETED_1 = {};
    var getUID_1 = function getUID() {
        return Math.floor(Math.random() * 100000000);
    };
    var generateName_1 = (function () {
        var startId = Math.floor(Date.now() % 100000000);
        return function generateName() {
            return '__wm' + getUID_1() + (startId++ + '__');
        };
    })();
    exports.WeakMap = /** @class */ (function () {
        function WeakMap(iterable) {
            this[Symbol.toStringTag] = 'WeakMap';
            this._name = generateName_1();
            this._frozenEntries = [];
            if (iterable) {
                if (iterator_1.isArrayLike(iterable)) {
                    for (var i = 0; i < iterable.length; i++) {
                        var item = iterable[i];
                        this.set(item[0], item[1]);
                    }
                }
                else {
                    try {
                        for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                            var _a = tslib_1.__read(iterable_1_1.value, 2), key = _a[0], value = _a[1];
                            this.set(key, value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_b = iterable_1.return)) _b.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            var e_1, _b;
        }
        WeakMap.prototype._getFrozenEntryIndex = function (key) {
            for (var i = 0; i < this._frozenEntries.length; i++) {
                if (this._frozenEntries[i].key === key) {
                    return i;
                }
            }
            return -1;
        };
        WeakMap.prototype.delete = function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            var entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED_1) {
                entry.value = DELETED_1;
                return true;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                this._frozenEntries.splice(frozenIndex, 1);
                return true;
            }
            return false;
        };
        WeakMap.prototype.get = function (key) {
            if (key === undefined || key === null) {
                return undefined;
            }
            var entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED_1) {
                return entry.value;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return this._frozenEntries[frozenIndex].value;
            }
        };
        WeakMap.prototype.has = function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            var entry = key[this._name];
            if (Boolean(entry && entry.key === key && entry.value !== DELETED_1)) {
                return true;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return true;
            }
            return false;
        };
        WeakMap.prototype.set = function (key, value) {
            if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                throw new TypeError('Invalid value used as weak map key');
            }
            var entry = key[this._name];
            if (!entry || entry.key !== key) {
                entry = Object.create(null, {
                    key: { value: key }
                });
                if (Object.isFrozen(key)) {
                    this._frozenEntries.push(entry);
                }
                else {
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
            }
            entry.value = value;
            return this;
        };
        return WeakMap;
    }());
}
exports.default = exports.WeakMap;

/***/ }),

/***/ "./node_modules/@dojo/shim/array.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var number_1 = __webpack_require__("./node_modules/@dojo/shim/number.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
if (has_1.default('es6-array') && has_1.default('es6-array-fill')) {
    exports.from = global_1.default.Array.from;
    exports.of = global_1.default.Array.of;
    exports.copyWithin = util_1.wrapNative(global_1.default.Array.prototype.copyWithin);
    exports.fill = util_1.wrapNative(global_1.default.Array.prototype.fill);
    exports.find = util_1.wrapNative(global_1.default.Array.prototype.find);
    exports.findIndex = util_1.wrapNative(global_1.default.Array.prototype.findIndex);
}
else {
    // It is only older versions of Safari/iOS that have a bad fill implementation and so aren't in the wild
    // To make things easier, if there is a bad fill implementation, the whole set of functions will be filled
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    var toLength_1 = function toLength(length) {
        if (isNaN(length)) {
            return 0;
        }
        length = Number(length);
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), number_1.MAX_SAFE_INTEGER);
    };
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    var toInteger_1 = function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    };
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    var normalizeOffset_1 = function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    };
    exports.from = function from(arrayLike, mapFunction, thisArg) {
        if (arrayLike == null) {
            throw new TypeError('from: requires an array-like object');
        }
        if (mapFunction && thisArg) {
            mapFunction = mapFunction.bind(thisArg);
        }
        /* tslint:disable-next-line:variable-name */
        var Constructor = this;
        var length = toLength_1(arrayLike.length);
        // Support extension
        var array = typeof Constructor === 'function' ? Object(new Constructor(length)) : new Array(length);
        if (!iterator_1.isArrayLike(arrayLike) && !iterator_1.isIterable(arrayLike)) {
            return array;
        }
        // if this is an array and the normalized length is 0, just return an empty array. this prevents a problem
        // with the iteration on IE when using a NaN array length.
        if (iterator_1.isArrayLike(arrayLike)) {
            if (length === 0) {
                return [];
            }
            for (var i = 0; i < arrayLike.length; i++) {
                array[i] = mapFunction ? mapFunction(arrayLike[i], i) : arrayLike[i];
            }
        }
        else {
            var i = 0;
            try {
                for (var arrayLike_1 = tslib_1.__values(arrayLike), arrayLike_1_1 = arrayLike_1.next(); !arrayLike_1_1.done; arrayLike_1_1 = arrayLike_1.next()) {
                    var value = arrayLike_1_1.value;
                    array[i] = mapFunction ? mapFunction(value, i) : value;
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (arrayLike_1_1 && !arrayLike_1_1.done && (_a = arrayLike_1.return)) _a.call(arrayLike_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (arrayLike.length !== undefined) {
            array.length = length;
        }
        return array;
        var e_1, _a;
    };
    exports.of = function of() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Array.prototype.slice.call(items);
    };
    exports.copyWithin = function copyWithin(target, offset, start, end) {
        if (target == null) {
            throw new TypeError('copyWithin: target must be an array-like object');
        }
        var length = toLength_1(target.length);
        offset = normalizeOffset_1(toInteger_1(offset), length);
        start = normalizeOffset_1(toInteger_1(start), length);
        end = normalizeOffset_1(end === undefined ? length : toInteger_1(end), length);
        var count = Math.min(end - start, length - offset);
        var direction = 1;
        if (offset > start && offset < start + count) {
            direction = -1;
            start += count - 1;
            offset += count - 1;
        }
        while (count > 0) {
            if (start in target) {
                target[offset] = target[start];
            }
            else {
                delete target[offset];
            }
            offset += direction;
            start += direction;
            count--;
        }
        return target;
    };
    exports.fill = function fill(target, value, start, end) {
        var length = toLength_1(target.length);
        var i = normalizeOffset_1(toInteger_1(start), length);
        end = normalizeOffset_1(end === undefined ? length : toInteger_1(end), length);
        while (i < end) {
            target[i++] = value;
        }
        return target;
    };
    exports.find = function find(target, callback, thisArg) {
        var index = exports.findIndex(target, callback, thisArg);
        return index !== -1 ? target[index] : undefined;
    };
    exports.findIndex = function findIndex(target, callback, thisArg) {
        var length = toLength_1(target.length);
        if (!callback) {
            throw new TypeError('find: second argument must be a function');
        }
        if (thisArg) {
            callback = callback.bind(thisArg);
        }
        for (var i = 0; i < length; i++) {
            if (callback(target[i], i, target)) {
                return i;
            }
        }
        return -1;
    };
}
if (has_1.default('es7-array')) {
    exports.includes = util_1.wrapNative(global_1.default.Array.prototype.includes);
}
else {
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    var toLength_2 = function toLength(length) {
        length = Number(length);
        if (isNaN(length)) {
            return 0;
        }
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), number_1.MAX_SAFE_INTEGER);
    };
    exports.includes = function includes(target, searchElement, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var len = toLength_2(target.length);
        for (var i = fromIndex; i < len; ++i) {
            var currentElement = target[i];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
        }
        return false;
    };
}

/***/ }),

/***/ "./node_modules/@dojo/shim/global.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var globalObject = (function () {
    if (typeof global !== 'undefined') {
        // global spec defines a reference to the global object called 'global'
        // https://github.com/tc39/proposal-global
        // `global` is also defined in NodeJS
        return global;
    }
    else if (typeof window !== 'undefined') {
        // window is defined in browsers
        return window;
    }
    else if (typeof self !== 'undefined') {
        // self is defined in WebWorkers
        return self;
    }
})();
exports.default = globalObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dojo/shim/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var string_1 = __webpack_require__("./node_modules/@dojo/shim/string.js");
var staticDone = { done: true, value: undefined };
/**
 * A class that _shims_ an iterator interface on array like objects.
 */
var ShimIterator = /** @class */ (function () {
    function ShimIterator(list) {
        this._nextIndex = -1;
        if (isIterable(list)) {
            this._nativeIterator = list[Symbol.iterator]();
        }
        else {
            this._list = list;
        }
    }
    /**
     * Return the next iteration result for the Iterator
     */
    ShimIterator.prototype.next = function () {
        if (this._nativeIterator) {
            return this._nativeIterator.next();
        }
        if (!this._list) {
            return staticDone;
        }
        if (++this._nextIndex < this._list.length) {
            return {
                done: false,
                value: this._list[this._nextIndex]
            };
        }
        return staticDone;
    };
    ShimIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return ShimIterator;
}());
exports.ShimIterator = ShimIterator;
/**
 * A type guard for checking if something has an Iterable interface
 *
 * @param value The value to type guard against
 */
function isIterable(value) {
    return value && typeof value[Symbol.iterator] === 'function';
}
exports.isIterable = isIterable;
/**
 * A type guard for checking if something is ArrayLike
 *
 * @param value The value to type guard against
 */
function isArrayLike(value) {
    return value && typeof value.length === 'number';
}
exports.isArrayLike = isArrayLike;
/**
 * Returns the iterator for an object
 *
 * @param iterable The iterable object to return the iterator for
 */
function get(iterable) {
    if (isIterable(iterable)) {
        return iterable[Symbol.iterator]();
    }
    else if (isArrayLike(iterable)) {
        return new ShimIterator(iterable);
    }
}
exports.get = get;
/**
 * Shims the functionality of `for ... of` blocks
 *
 * @param iterable The object the provides an interator interface
 * @param callback The callback which will be called for each item of the iterable
 * @param thisArg Optional scope to pass the callback
 */
function forOf(iterable, callback, thisArg) {
    var broken = false;
    function doBreak() {
        broken = true;
    }
    /* We need to handle iteration of double byte strings properly */
    if (isArrayLike(iterable) && typeof iterable === 'string') {
        var l = iterable.length;
        for (var i = 0; i < l; ++i) {
            var char = iterable[i];
            if (i + 1 < l) {
                var code = char.charCodeAt(0);
                if (code >= string_1.HIGH_SURROGATE_MIN && code <= string_1.HIGH_SURROGATE_MAX) {
                    char += iterable[++i];
                }
            }
            callback.call(thisArg, char, iterable, doBreak);
            if (broken) {
                return;
            }
        }
    }
    else {
        var iterator = get(iterable);
        if (iterator) {
            var result = iterator.next();
            while (!result.done) {
                callback.call(thisArg, result.value, iterable, doBreak);
                if (broken) {
                    return;
                }
                result = iterator.next();
            }
        }
    }
}
exports.forOf = forOf;

/***/ }),

/***/ "./node_modules/@dojo/shim/number.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
/**
 * The smallest interval between two representable numbers.
 */
exports.EPSILON = 1;
/**
 * The maximum safe integer in JavaScript
 */
exports.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
/**
 * The minimum safe integer in JavaScript
 */
exports.MIN_SAFE_INTEGER = -exports.MAX_SAFE_INTEGER;
/**
 * Determines whether the passed value is NaN without coersion.
 *
 * @param value The value to test
 * @return true if the value is NaN, false if it is not
 */
function isNaN(value) {
    return typeof value === 'number' && global_1.default.isNaN(value);
}
exports.isNaN = isNaN;
/**
 * Determines whether the passed value is a finite number without coersion.
 *
 * @param value The value to test
 * @return true if the value is finite, false if it is not
 */
function isFinite(value) {
    return typeof value === 'number' && global_1.default.isFinite(value);
}
exports.isFinite = isFinite;
/**
 * Determines whether the passed value is an integer.
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
/**
 * Determines whether the passed value is an integer that is 'safe,' meaning:
 *   1. it can be expressed as an IEEE-754 double precision number
 *   2. it has a one-to-one mapping to a mathematical integer, meaning its
 *      IEEE-754 representation cannot be the result of rounding any other
 *      integer to fit the IEEE-754 representation
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isSafeInteger(value) {
    return isInteger(value) && Math.abs(value) <= exports.MAX_SAFE_INTEGER;
}
exports.isSafeInteger = isSafeInteger;

/***/ }),

/***/ "./node_modules/@dojo/shim/object.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
if (has_1.default('es6-object')) {
    var globalObject = global_1.default.Object;
    exports.assign = globalObject.assign;
    exports.getOwnPropertyDescriptor = globalObject.getOwnPropertyDescriptor;
    exports.getOwnPropertyNames = globalObject.getOwnPropertyNames;
    exports.getOwnPropertySymbols = globalObject.getOwnPropertySymbols;
    exports.is = globalObject.is;
    exports.keys = globalObject.keys;
}
else {
    exports.keys = function symbolAwareKeys(o) {
        return Object.keys(o).filter(function (key) { return !Boolean(key.match(/^@@.+/)); });
    };
    exports.assign = function assign(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        sources.forEach(function (nextSource) {
            if (nextSource) {
                // Skip over if undefined or null
                exports.keys(nextSource).forEach(function (nextKey) {
                    to[nextKey] = nextSource[nextKey];
                });
            }
        });
        return to;
    };
    exports.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(o, prop) {
        if (Symbol_1.isSymbol(prop)) {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
        else {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
    };
    exports.getOwnPropertyNames = function getOwnPropertyNames(o) {
        return Object.getOwnPropertyNames(o).filter(function (key) { return !Boolean(key.match(/^@@.+/)); });
    };
    exports.getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return Object.getOwnPropertyNames(o)
            .filter(function (key) { return Boolean(key.match(/^@@.+/)); })
            .map(function (key) { return Symbol.for(key.substring(2)); });
    };
    exports.is = function is(value1, value2) {
        if (value1 === value2) {
            return value1 !== 0 || 1 / value1 === 1 / value2; // -0
        }
        return value1 !== value1 && value2 !== value2; // NaN
    };
}
if (has_1.default('es2017-object')) {
    var globalObject = global_1.default.Object;
    exports.getOwnPropertyDescriptors = globalObject.getOwnPropertyDescriptors;
    exports.entries = globalObject.entries;
    exports.values = globalObject.values;
}
else {
    exports.getOwnPropertyDescriptors = function getOwnPropertyDescriptors(o) {
        return exports.getOwnPropertyNames(o).reduce(function (previous, key) {
            previous[key] = exports.getOwnPropertyDescriptor(o, key);
            return previous;
        }, {});
    };
    exports.entries = function entries(o) {
        return exports.keys(o).map(function (key) { return [key, o[key]]; });
    };
    exports.values = function values(o) {
        return exports.keys(o).map(function (key) { return o[key]; });
    };
}

/***/ }),

/***/ "./node_modules/@dojo/shim/string.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
/**
 * The minimum location of high surrogates
 */
exports.HIGH_SURROGATE_MIN = 0xd800;
/**
 * The maximum location of high surrogates
 */
exports.HIGH_SURROGATE_MAX = 0xdbff;
/**
 * The minimum location of low surrogates
 */
exports.LOW_SURROGATE_MIN = 0xdc00;
/**
 * The maximum location of low surrogates
 */
exports.LOW_SURROGATE_MAX = 0xdfff;
if (has_1.default('es6-string') && has_1.default('es6-string-raw')) {
    exports.fromCodePoint = global_1.default.String.fromCodePoint;
    exports.raw = global_1.default.String.raw;
    exports.codePointAt = util_1.wrapNative(global_1.default.String.prototype.codePointAt);
    exports.endsWith = util_1.wrapNative(global_1.default.String.prototype.endsWith);
    exports.includes = util_1.wrapNative(global_1.default.String.prototype.includes);
    exports.normalize = util_1.wrapNative(global_1.default.String.prototype.normalize);
    exports.repeat = util_1.wrapNative(global_1.default.String.prototype.repeat);
    exports.startsWith = util_1.wrapNative(global_1.default.String.prototype.startsWith);
}
else {
    /**
     * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
     * Used by startsWith, includes, and endsWith.
     *
     * @return Normalized position.
     */
    var normalizeSubstringArgs_1 = function (name, text, search, position, isEnd) {
        if (isEnd === void 0) { isEnd = false; }
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string to search against.');
        }
        var length = text.length;
        position = position !== position ? (isEnd ? length : 0) : position;
        return [text, String(search), Math.min(Math.max(position, 0), length)];
    };
    exports.fromCodePoint = function fromCodePoint() {
        var codePoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
        }
        // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
        var length = arguments.length;
        if (!length) {
            return '';
        }
        var fromCharCode = String.fromCharCode;
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var index = -1;
        var result = '';
        while (++index < length) {
            var codePoint = Number(arguments[index]);
            // Code points must be finite integers within the valid range
            var isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint && codePoint >= 0 && codePoint <= 0x10ffff;
            if (!isValid) {
                throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                var highSurrogate = (codePoint >> 10) + exports.HIGH_SURROGATE_MIN;
                var lowSurrogate = codePoint % 0x400 + exports.LOW_SURROGATE_MIN;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += fromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    exports.raw = function raw(callSite) {
        var substitutions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            substitutions[_i - 1] = arguments[_i];
        }
        var rawStrings = callSite.raw;
        var result = '';
        var numSubstitutions = substitutions.length;
        if (callSite == null || callSite.raw == null) {
            throw new TypeError('string.raw requires a valid callSite object with a raw value');
        }
        for (var i = 0, length_1 = rawStrings.length; i < length_1; i++) {
            result += rawStrings[i] + (i < numSubstitutions && i < length_1 - 1 ? substitutions[i] : '');
        }
        return result;
    };
    exports.codePointAt = function codePointAt(text, position) {
        if (position === void 0) { position = 0; }
        // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
        if (text == null) {
            throw new TypeError('string.codePointAt requries a valid string.');
        }
        var length = text.length;
        if (position !== position) {
            position = 0;
        }
        if (position < 0 || position >= length) {
            return undefined;
        }
        // Get the first code unit
        var first = text.charCodeAt(position);
        if (first >= exports.HIGH_SURROGATE_MIN && first <= exports.HIGH_SURROGATE_MAX && length > position + 1) {
            // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            var second = text.charCodeAt(position + 1);
            if (second >= exports.LOW_SURROGATE_MIN && second <= exports.LOW_SURROGATE_MAX) {
                return (first - exports.HIGH_SURROGATE_MIN) * 0x400 + second - exports.LOW_SURROGATE_MIN + 0x10000;
            }
        }
        return first;
    };
    exports.endsWith = function endsWith(text, search, endPosition) {
        if (endPosition == null) {
            endPosition = text.length;
        }
        _a = tslib_1.__read(normalizeSubstringArgs_1('endsWith', text, search, endPosition, true), 3), text = _a[0], search = _a[1], endPosition = _a[2];
        var start = endPosition - search.length;
        if (start < 0) {
            return false;
        }
        return text.slice(start, endPosition) === search;
        var _a;
    };
    exports.includes = function includes(text, search, position) {
        if (position === void 0) { position = 0; }
        _a = tslib_1.__read(normalizeSubstringArgs_1('includes', text, search, position), 3), text = _a[0], search = _a[1], position = _a[2];
        return text.indexOf(search, position) !== -1;
        var _a;
    };
    exports.repeat = function repeat(text, count) {
        if (count === void 0) { count = 0; }
        // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
        if (text == null) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (count !== count) {
            count = 0;
        }
        if (count < 0 || count === Infinity) {
            throw new RangeError('string.repeat requires a non-negative finite count.');
        }
        var result = '';
        while (count) {
            if (count % 2) {
                result += text;
            }
            if (count > 1) {
                text += text;
            }
            count >>= 1;
        }
        return result;
    };
    exports.startsWith = function startsWith(text, search, position) {
        if (position === void 0) { position = 0; }
        search = String(search);
        _a = tslib_1.__read(normalizeSubstringArgs_1('startsWith', text, search, position), 3), text = _a[0], search = _a[1], position = _a[2];
        var end = position + search.length;
        if (end > text.length) {
            return false;
        }
        return text.slice(position, end) === search;
        var _a;
    };
}
if (has_1.default('es2017-string')) {
    exports.padEnd = util_1.wrapNative(global_1.default.String.prototype.padEnd);
    exports.padStart = util_1.wrapNative(global_1.default.String.prototype.padStart);
}
else {
    exports.padEnd = function padEnd(text, maxLength, fillString) {
        if (fillString === void 0) { fillString = ' '; }
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padEnd requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        var strText = String(text);
        var padding = maxLength - strText.length;
        if (padding > 0) {
            strText +=
                exports.repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length);
        }
        return strText;
    };
    exports.padStart = function padStart(text, maxLength, fillString) {
        if (fillString === void 0) { fillString = ' '; }
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padStart requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        var strText = String(text);
        var padding = maxLength - strText.length;
        if (padding > 0) {
            strText =
                exports.repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length) +
                    strText;
        }
        return strText;
    };
}

/***/ }),

/***/ "./node_modules/@dojo/shim/support/has.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var has_1 = __webpack_require__("./node_modules/@dojo/has/has.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
exports.default = has_1.default;
tslib_1.__exportStar(__webpack_require__("./node_modules/@dojo/has/has.js"), exports);
/* ECMAScript 6 and 7 Features */
/* Array */
has_1.add('es6-array', function () {
    return (['from', 'of'].every(function (key) { return key in global_1.default.Array; }) &&
        ['findIndex', 'find', 'copyWithin'].every(function (key) { return key in global_1.default.Array.prototype; }));
}, true);
has_1.add('es6-array-fill', function () {
    if ('fill' in global_1.default.Array.prototype) {
        /* Some versions of Safari do not properly implement this */
        return [1].fill(9, Number.POSITIVE_INFINITY)[0] === 1;
    }
    return false;
}, true);
has_1.add('es7-array', function () { return 'includes' in global_1.default.Array.prototype; }, true);
/* Map */
has_1.add('es6-map', function () {
    if (typeof global_1.default.Map === 'function') {
        /*
    IE11 and older versions of Safari are missing critical ES6 Map functionality
    We wrap this in a try/catch because sometimes the Map constructor exists, but does not
    take arguments (iOS 8.4)
     */
        try {
            var map = new global_1.default.Map([[0, 1]]);
            return (map.has(0) &&
                typeof map.keys === 'function' &&
                has_1.default('es6-symbol') &&
                typeof map.values === 'function' &&
                typeof map.entries === 'function');
        }
        catch (e) {
            /* istanbul ignore next: not testing on iOS at the moment */
            return false;
        }
    }
    return false;
}, true);
/* Math */
has_1.add('es6-math', function () {
    return [
        'clz32',
        'sign',
        'log10',
        'log2',
        'log1p',
        'expm1',
        'cosh',
        'sinh',
        'tanh',
        'acosh',
        'asinh',
        'atanh',
        'trunc',
        'fround',
        'cbrt',
        'hypot'
    ].every(function (name) { return typeof global_1.default.Math[name] === 'function'; });
}, true);
has_1.add('es6-math-imul', function () {
    if ('imul' in global_1.default.Math) {
        /* Some versions of Safari on ios do not properly implement this */
        return Math.imul(0xffffffff, 5) === -5;
    }
    return false;
}, true);
/* Object */
has_1.add('es6-object', function () {
    return (has_1.default('es6-symbol') &&
        ['assign', 'is', 'getOwnPropertySymbols', 'setPrototypeOf'].every(function (name) { return typeof global_1.default.Object[name] === 'function'; }));
}, true);
has_1.add('es2017-object', function () {
    return ['values', 'entries', 'getOwnPropertyDescriptors'].every(function (name) { return typeof global_1.default.Object[name] === 'function'; });
}, true);
/* Observable */
has_1.add('es-observable', function () { return typeof global_1.default.Observable !== 'undefined'; }, true);
/* Promise */
has_1.add('es6-promise', function () { return typeof global_1.default.Promise !== 'undefined' && has_1.default('es6-symbol'); }, true);
/* Set */
has_1.add('es6-set', function () {
    if (typeof global_1.default.Set === 'function') {
        /* IE11 and older versions of Safari are missing critical ES6 Set functionality */
        var set = new global_1.default.Set([1]);
        return set.has(1) && 'keys' in set && typeof set.keys === 'function' && has_1.default('es6-symbol');
    }
    return false;
}, true);
/* String */
has_1.add('es6-string', function () {
    return ([
        /* static methods */
        'fromCodePoint'
    ].every(function (key) { return typeof global_1.default.String[key] === 'function'; }) &&
        [
            /* instance methods */
            'codePointAt',
            'normalize',
            'repeat',
            'startsWith',
            'endsWith',
            'includes'
        ].every(function (key) { return typeof global_1.default.String.prototype[key] === 'function'; }));
}, true);
has_1.add('es6-string-raw', function () {
    function getCallSite(callSite) {
        var substitutions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            substitutions[_i - 1] = arguments[_i];
        }
        var result = tslib_1.__spread(callSite);
        result.raw = callSite.raw;
        return result;
    }
    if ('raw' in global_1.default.String) {
        var b = 1;
        var callSite = getCallSite(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["a\n", ""], ["a\\n", ""])), b);
        callSite.raw = ['a\\n'];
        var supportsTrunc = global_1.default.String.raw(callSite, 42) === 'a:\\n';
        return supportsTrunc;
    }
    return false;
}, true);
has_1.add('es2017-string', function () {
    return ['padStart', 'padEnd'].every(function (key) { return typeof global_1.default.String.prototype[key] === 'function'; });
}, true);
/* Symbol */
has_1.add('es6-symbol', function () { return typeof global_1.default.Symbol !== 'undefined' && typeof Symbol() === 'symbol'; }, true);
/* WeakMap */
has_1.add('es6-weakmap', function () {
    if (typeof global_1.default.WeakMap !== 'undefined') {
        /* IE11 and older versions of Safari are missing critical ES6 Map functionality */
        var key1 = {};
        var key2 = {};
        var map = new global_1.default.WeakMap([[key1, 1]]);
        Object.freeze(key1);
        return map.get(key1) === 1 && map.set(key2, 2) === map && has_1.default('es6-symbol');
    }
    return false;
}, true);
/* Miscellaneous features */
has_1.add('microtasks', function () { return has_1.default('es6-promise') || has_1.default('host-node') || has_1.default('dom-mutationobserver'); }, true);
has_1.add('postmessage', function () {
    // If window is undefined, and we have postMessage, it probably means we're in a web worker. Web workers have
    // post message but it doesn't work how we expect it to, so it's best just to pretend it doesn't exist.
    return typeof global_1.default.window !== 'undefined' && typeof global_1.default.postMessage === 'function';
}, true);
has_1.add('raf', function () { return typeof global_1.default.requestAnimationFrame === 'function'; }, true);
has_1.add('setimmediate', function () { return typeof global_1.default.setImmediate !== 'undefined'; }, true);
/* DOM Features */
has_1.add('dom-mutationobserver', function () {
    if (has_1.default('host-browser') && Boolean(global_1.default.MutationObserver || global_1.default.WebKitMutationObserver)) {
        // IE11 has an unreliable MutationObserver implementation where setProperty() does not
        // generate a mutation event, observers can crash, and the queue does not drain
        // reliably. The following feature test was adapted from
        // https://gist.github.com/t10ko/4aceb8c71681fdb275e33efe5e576b14
        var example = document.createElement('div');
        /* tslint:disable-next-line:variable-name */
        var HostMutationObserver = global_1.default.MutationObserver || global_1.default.WebKitMutationObserver;
        var observer = new HostMutationObserver(function () { });
        observer.observe(example, { attributes: true });
        example.style.setProperty('display', 'block');
        return Boolean(observer.takeRecords().length);
    }
    return false;
}, true);
has_1.add('dom-webanimation', function () { return has_1.default('host-browser') && global_1.default.Animation !== undefined && global_1.default.KeyframeEffect !== undefined; }, true);
var templateObject_1;

/***/ }),

/***/ "./node_modules/@dojo/shim/support/queue.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
function executeTask(item) {
    if (item && item.isActive && item.callback) {
        item.callback();
    }
}
function getQueueHandle(item, destructor) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
            if (destructor) {
                destructor();
            }
        }
    };
}
var checkMicroTaskQueue;
var microTasks;
/**
 * Schedules a callback to the macrotask queue.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueTask = (function () {
    var destructor;
    var enqueue;
    // Since the IE implementation of `setImmediate` is not flawless, we will test for `postMessage` first.
    if (has_1.default('postmessage')) {
        var queue_1 = [];
        global_1.default.addEventListener('message', function (event) {
            // Confirm that the event was triggered by the current window and by this particular implementation.
            if (event.source === global_1.default && event.data === 'dojo-queue-message') {
                event.stopPropagation();
                if (queue_1.length) {
                    executeTask(queue_1.shift());
                }
            }
        });
        enqueue = function (item) {
            queue_1.push(item);
            global_1.default.postMessage('dojo-queue-message', '*');
        };
    }
    else if (has_1.default('setimmediate')) {
        destructor = global_1.default.clearImmediate;
        enqueue = function (item) {
            return setImmediate(executeTask.bind(null, item));
        };
    }
    else {
        destructor = global_1.default.clearTimeout;
        enqueue = function (item) {
            return setTimeout(executeTask.bind(null, item), 0);
        };
    }
    function queueTask(callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        var id = enqueue(item);
        return getQueueHandle(item, destructor &&
            function () {
                destructor(id);
            });
    }
    // TODO: Use aspect.before when it is available.
    return has_1.default('microtasks')
        ? queueTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueTask(callback);
        };
})();
// When no mechanism for registering microtasks is exposed by the environment, microtasks will
// be queued and then executed in a single macrotask before the other macrotasks are executed.
if (!has_1.default('microtasks')) {
    var isMicroTaskQueued_1 = false;
    microTasks = [];
    checkMicroTaskQueue = function () {
        if (!isMicroTaskQueued_1) {
            isMicroTaskQueued_1 = true;
            exports.queueTask(function () {
                isMicroTaskQueued_1 = false;
                if (microTasks.length) {
                    var item = void 0;
                    while ((item = microTasks.shift())) {
                        executeTask(item);
                    }
                }
            });
        }
    };
}
/**
 * Schedules an animation task with `window.requestAnimationFrame` if it exists, or with `queueTask` otherwise.
 *
 * Since requestAnimationFrame's behavior does not match that expected from `queueTask`, it is not used there.
 * However, at times it makes more sense to delegate to requestAnimationFrame; hence the following method.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueAnimationTask = (function () {
    if (!has_1.default('raf')) {
        return exports.queueTask;
    }
    function queueAnimationTask(callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        var rafId = requestAnimationFrame(executeTask.bind(null, item));
        return getQueueHandle(item, function () {
            cancelAnimationFrame(rafId);
        });
    }
    // TODO: Use aspect.before when it is available.
    return has_1.default('microtasks')
        ? queueAnimationTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueAnimationTask(callback);
        };
})();
/**
 * Schedules a callback to the microtask queue.
 *
 * Any callbacks registered with `queueMicroTask` will be executed before the next macrotask. If no native
 * mechanism for scheduling macrotasks is exposed, then any callbacks will be fired before any macrotask
 * registered with `queueTask` or `queueAnimationTask`.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueMicroTask = (function () {
    var enqueue;
    if (has_1.default('host-node')) {
        enqueue = function (item) {
            global_1.default.process.nextTick(executeTask.bind(null, item));
        };
    }
    else if (has_1.default('es6-promise')) {
        enqueue = function (item) {
            global_1.default.Promise.resolve(item).then(executeTask);
        };
    }
    else if (has_1.default('dom-mutationobserver')) {
        /* tslint:disable-next-line:variable-name */
        var HostMutationObserver = global_1.default.MutationObserver || global_1.default.WebKitMutationObserver;
        var node_1 = document.createElement('div');
        var queue_2 = [];
        var observer = new HostMutationObserver(function () {
            while (queue_2.length > 0) {
                var item = queue_2.shift();
                if (item && item.isActive && item.callback) {
                    item.callback();
                }
            }
        });
        observer.observe(node_1, { attributes: true });
        enqueue = function (item) {
            queue_2.push(item);
            node_1.setAttribute('queueStatus', '1');
        };
    }
    else {
        enqueue = function (item) {
            checkMicroTaskQueue();
            microTasks.push(item);
        };
    }
    return function (callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        enqueue(item);
        return getQueueHandle(item);
    };
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/@dojo/shim/support/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper function to generate a value property descriptor
 *
 * @param value        The value the property descriptor should be set to
 * @param enumerable   If the property should be enumberable, defaults to false
 * @param writable     If the property should be writable, defaults to true
 * @param configurable If the property should be configurable, defaults to true
 * @return             The property descriptor object
 */
function getValueDescriptor(value, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    return {
        value: value,
        enumerable: enumerable,
        writable: writable,
        configurable: configurable
    };
}
exports.getValueDescriptor = getValueDescriptor;
function wrapNative(nativeFunction) {
    return function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return nativeFunction.apply(target, args);
    };
}
exports.wrapNative = wrapNative;

/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable-next-line
var has = __webpack_require__("./node_modules/@dojo/core/has.js");
if (!has.exists('build-time-render')) {
    has.add('build-time-render', false, false);
}
//# sourceMappingURL=hasBuildTimeRender.js.map

/***/ }),

/***/ "./node_modules/@dojo/widget-core/Injector.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
var Injector = /** @class */ (function (_super) {
    tslib_1.__extends(Injector, _super);
    function Injector(payload) {
        var _this = _super.call(this) || this;
        _this._payload = payload;
        return _this;
    }
    Injector.prototype.setInvalidator = function (invalidator) {
        this._invalidator = invalidator;
    };
    Injector.prototype.get = function () {
        return this._payload;
    };
    Injector.prototype.set = function (payload) {
        this._payload = payload;
        if (this._invalidator) {
            this._invalidator();
        }
    };
    return Injector;
}(Evented_1.Evented));
exports.Injector = Injector;
exports.default = Injector;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/NodeHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
/**
 * Enum to identify the type of event.
 * Listening to 'Projector' will notify when projector is created or updated
 * Listening to 'Widget' will notify when widget root is created or updated
 */
var NodeEventType;
(function (NodeEventType) {
    NodeEventType["Projector"] = "Projector";
    NodeEventType["Widget"] = "Widget";
})(NodeEventType = exports.NodeEventType || (exports.NodeEventType = {}));
var NodeHandler = /** @class */ (function (_super) {
    tslib_1.__extends(NodeHandler, _super);
    function NodeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nodeMap = new Map_1.default();
        return _this;
    }
    NodeHandler.prototype.get = function (key) {
        return this._nodeMap.get(key);
    };
    NodeHandler.prototype.has = function (key) {
        return this._nodeMap.has(key);
    };
    NodeHandler.prototype.add = function (element, key) {
        this._nodeMap.set(key, element);
        this.emit({ type: key });
    };
    NodeHandler.prototype.addRoot = function () {
        this.emit({ type: NodeEventType.Widget });
    };
    NodeHandler.prototype.addProjector = function () {
        this.emit({ type: NodeEventType.Projector });
    };
    NodeHandler.prototype.clear = function () {
        this._nodeMap.clear();
    };
    return NodeHandler;
}(Evented_1.Evented));
exports.NodeHandler = NodeHandler;
exports.default = NodeHandler;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/Registry.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Promise_1 = __webpack_require__("./node_modules/@dojo/shim/Promise.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
/**
 * Widget base symbol type
 */
exports.WIDGET_BASE_TYPE = Symbol_1.default('Widget Base');
/**
 * Checks is the item is a subclass of WidgetBase (or a WidgetBase)
 *
 * @param item the item to check
 * @returns true/false indicating if the item is a WidgetBaseConstructor
 */
function isWidgetBaseConstructor(item) {
    return Boolean(item && item._type === exports.WIDGET_BASE_TYPE);
}
exports.isWidgetBaseConstructor = isWidgetBaseConstructor;
function isWidgetConstructorDefaultExport(item) {
    return Boolean(item &&
        item.hasOwnProperty('__esModule') &&
        item.hasOwnProperty('default') &&
        isWidgetBaseConstructor(item.default));
}
exports.isWidgetConstructorDefaultExport = isWidgetConstructorDefaultExport;
/**
 * The Registry implementation
 */
var Registry = /** @class */ (function (_super) {
    tslib_1.__extends(Registry, _super);
    function Registry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Emit loaded event for registry label
     */
    Registry.prototype.emitLoadedEvent = function (widgetLabel, item) {
        this.emit({
            type: widgetLabel,
            action: 'loaded',
            item: item
        });
    };
    Registry.prototype.define = function (label, item) {
        var _this = this;
        if (this._widgetRegistry === undefined) {
            this._widgetRegistry = new Map_1.default();
        }
        if (this._widgetRegistry.has(label)) {
            throw new Error("widget has already been registered for '" + label.toString() + "'");
        }
        this._widgetRegistry.set(label, item);
        if (item instanceof Promise_1.default) {
            item.then(function (widgetCtor) {
                _this._widgetRegistry.set(label, widgetCtor);
                _this.emitLoadedEvent(label, widgetCtor);
                return widgetCtor;
            }, function (error) {
                throw error;
            });
        }
        else if (isWidgetBaseConstructor(item)) {
            this.emitLoadedEvent(label, item);
        }
    };
    Registry.prototype.defineInjector = function (label, injectorFactory) {
        if (this._injectorRegistry === undefined) {
            this._injectorRegistry = new Map_1.default();
        }
        if (this._injectorRegistry.has(label)) {
            throw new Error("injector has already been registered for '" + label.toString() + "'");
        }
        var invalidator = new Evented_1.Evented();
        var injectorItem = {
            injector: injectorFactory(function () { return invalidator.emit({ type: 'invalidate' }); }),
            invalidator: invalidator
        };
        this._injectorRegistry.set(label, injectorItem);
        this.emitLoadedEvent(label, injectorItem);
    };
    Registry.prototype.get = function (label) {
        var _this = this;
        if (!this._widgetRegistry || !this.has(label)) {
            return null;
        }
        var item = this._widgetRegistry.get(label);
        if (isWidgetBaseConstructor(item)) {
            return item;
        }
        if (item instanceof Promise_1.default) {
            return null;
        }
        var promise = item();
        this._widgetRegistry.set(label, promise);
        promise.then(function (widgetCtor) {
            if (isWidgetConstructorDefaultExport(widgetCtor)) {
                widgetCtor = widgetCtor.default;
            }
            _this._widgetRegistry.set(label, widgetCtor);
            _this.emitLoadedEvent(label, widgetCtor);
            return widgetCtor;
        }, function (error) {
            throw error;
        });
        return null;
    };
    Registry.prototype.getInjector = function (label) {
        if (!this._injectorRegistry || !this.hasInjector(label)) {
            return null;
        }
        return this._injectorRegistry.get(label);
    };
    Registry.prototype.has = function (label) {
        return Boolean(this._widgetRegistry && this._widgetRegistry.has(label));
    };
    Registry.prototype.hasInjector = function (label) {
        return Boolean(this._injectorRegistry && this._injectorRegistry.has(label));
    };
    return Registry;
}(Evented_1.Evented));
exports.Registry = Registry;
exports.default = Registry;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/RegistryHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var RegistryHandler = /** @class */ (function (_super) {
    tslib_1.__extends(RegistryHandler, _super);
    function RegistryHandler() {
        var _this = _super.call(this) || this;
        _this._registry = new Registry_1.Registry();
        _this._registryWidgetLabelMap = new Map_1.Map();
        _this._registryInjectorLabelMap = new Map_1.Map();
        _this.own(_this._registry);
        var destroy = function () {
            if (_this.baseRegistry) {
                _this._registryWidgetLabelMap.delete(_this.baseRegistry);
                _this._registryInjectorLabelMap.delete(_this.baseRegistry);
                _this.baseRegistry = undefined;
            }
        };
        _this.own({ destroy: destroy });
        return _this;
    }
    Object.defineProperty(RegistryHandler.prototype, "base", {
        set: function (baseRegistry) {
            if (this.baseRegistry) {
                this._registryWidgetLabelMap.delete(this.baseRegistry);
                this._registryInjectorLabelMap.delete(this.baseRegistry);
            }
            this.baseRegistry = baseRegistry;
        },
        enumerable: true,
        configurable: true
    });
    RegistryHandler.prototype.define = function (label, widget) {
        this._registry.define(label, widget);
    };
    RegistryHandler.prototype.defineInjector = function (label, injector) {
        this._registry.defineInjector(label, injector);
    };
    RegistryHandler.prototype.has = function (label) {
        return this._registry.has(label) || Boolean(this.baseRegistry && this.baseRegistry.has(label));
    };
    RegistryHandler.prototype.hasInjector = function (label) {
        return this._registry.hasInjector(label) || Boolean(this.baseRegistry && this.baseRegistry.hasInjector(label));
    };
    RegistryHandler.prototype.get = function (label, globalPrecedence) {
        if (globalPrecedence === void 0) { globalPrecedence = false; }
        return this._get(label, globalPrecedence, 'get', this._registryWidgetLabelMap);
    };
    RegistryHandler.prototype.getInjector = function (label, globalPrecedence) {
        if (globalPrecedence === void 0) { globalPrecedence = false; }
        return this._get(label, globalPrecedence, 'getInjector', this._registryInjectorLabelMap);
    };
    RegistryHandler.prototype._get = function (label, globalPrecedence, getFunctionName, labelMap) {
        var _this = this;
        var registries = globalPrecedence ? [this.baseRegistry, this._registry] : [this._registry, this.baseRegistry];
        for (var i = 0; i < registries.length; i++) {
            var registry = registries[i];
            if (!registry) {
                continue;
            }
            var item = registry[getFunctionName](label);
            var registeredLabels = labelMap.get(registry) || [];
            if (item) {
                return item;
            }
            else if (registeredLabels.indexOf(label) === -1) {
                var handle = registry.on(label, function (event) {
                    if (event.action === 'loaded' &&
                        _this[getFunctionName](label, globalPrecedence) === event.item) {
                        _this.emit({ type: 'invalidate' });
                    }
                });
                this.own(handle);
                labelMap.set(registry, tslib_1.__spread(registeredLabels, [label]));
            }
        }
        return null;
    };
    return RegistryHandler;
}(Evented_1.Evented));
exports.RegistryHandler = RegistryHandler;
exports.default = RegistryHandler;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/WidgetBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var WeakMap_1 = __webpack_require__("./node_modules/@dojo/shim/WeakMap.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var diff_1 = __webpack_require__("./node_modules/@dojo/widget-core/diff.js");
var RegistryHandler_1 = __webpack_require__("./node_modules/@dojo/widget-core/RegistryHandler.js");
var NodeHandler_1 = __webpack_require__("./node_modules/@dojo/widget-core/NodeHandler.js");
var vdom_1 = __webpack_require__("./node_modules/@dojo/widget-core/vdom.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var decoratorMap = new Map_1.default();
var boundAuto = diff_1.auto.bind(null);
exports.noBind = Symbol_1.default.for('dojoNoBind');
/**
 * Main widget base for all widgets to extend
 */
var WidgetBase = /** @class */ (function () {
    /**
     * @constructor
     */
    function WidgetBase() {
        var _this = this;
        /**
         * Indicates if it is the initial set properties cycle
         */
        this._initialProperties = true;
        /**
         * Array of property keys considered changed from the previous set properties
         */
        this._changedPropertyKeys = [];
        this._nodeHandler = new NodeHandler_1.default();
        this._handles = [];
        this._children = [];
        this._decoratorCache = new Map_1.default();
        this._properties = {};
        this._boundRenderFunc = this.render.bind(this);
        this._boundInvalidate = this.invalidate.bind(this);
        vdom_1.widgetInstanceMap.set(this, {
            dirty: true,
            onAttach: function () {
                _this.onAttach();
            },
            onDetach: function () {
                _this.onDetach();
                _this.destroy();
            },
            nodeHandler: this._nodeHandler,
            registry: function () {
                return _this.registry;
            },
            coreProperties: {},
            rendering: false,
            inputProperties: {}
        });
        this._runAfterConstructors();
    }
    WidgetBase.prototype.meta = function (MetaType) {
        if (this._metaMap === undefined) {
            this._metaMap = new Map_1.default();
        }
        var cached = this._metaMap.get(MetaType);
        if (!cached) {
            cached = new MetaType({
                invalidate: this._boundInvalidate,
                nodeHandler: this._nodeHandler,
                bind: this
            });
            this.own(cached);
            this._metaMap.set(MetaType, cached);
        }
        return cached;
    };
    WidgetBase.prototype.onAttach = function () {
        // Do nothing by default.
    };
    WidgetBase.prototype.onDetach = function () {
        // Do nothing by default.
    };
    Object.defineProperty(WidgetBase.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetBase.prototype, "changedPropertyKeys", {
        get: function () {
            return tslib_1.__spread(this._changedPropertyKeys);
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype.__setCoreProperties__ = function (coreProperties) {
        var baseRegistry = coreProperties.baseRegistry;
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        if (instanceData.coreProperties.baseRegistry !== baseRegistry) {
            if (this._registry === undefined) {
                this._registry = new RegistryHandler_1.default();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            this._registry.base = baseRegistry;
            this.invalidate();
        }
        instanceData.coreProperties = coreProperties;
    };
    WidgetBase.prototype.__setProperties__ = function (originalProperties) {
        var _this = this;
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        instanceData.inputProperties = originalProperties;
        var properties = this._runBeforeProperties(originalProperties);
        var registeredDiffPropertyNames = this.getDecorator('registeredDiffProperty');
        var changedPropertyKeys = [];
        var propertyNames = Object.keys(properties);
        if (this._initialProperties === false || registeredDiffPropertyNames.length !== 0) {
            var allProperties = tslib_1.__spread(propertyNames, Object.keys(this._properties));
            var checkedProperties = [];
            var diffPropertyResults_1 = {};
            var runReactions = false;
            for (var i = 0; i < allProperties.length; i++) {
                var propertyName = allProperties[i];
                if (checkedProperties.indexOf(propertyName) !== -1) {
                    continue;
                }
                checkedProperties.push(propertyName);
                var previousProperty = this._properties[propertyName];
                var newProperty = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                if (registeredDiffPropertyNames.indexOf(propertyName) !== -1) {
                    runReactions = true;
                    var diffFunctions = this.getDecorator("diffProperty:" + propertyName);
                    for (var i_1 = 0; i_1 < diffFunctions.length; i_1++) {
                        var result = diffFunctions[i_1](previousProperty, newProperty);
                        if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                            changedPropertyKeys.push(propertyName);
                        }
                        if (propertyName in properties) {
                            diffPropertyResults_1[propertyName] = result.value;
                        }
                    }
                }
                else {
                    var result = boundAuto(previousProperty, newProperty);
                    if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                        changedPropertyKeys.push(propertyName);
                    }
                    if (propertyName in properties) {
                        diffPropertyResults_1[propertyName] = result.value;
                    }
                }
            }
            if (runReactions) {
                var reactionFunctions = this.getDecorator('diffReaction');
                var executedReactions_1 = [];
                reactionFunctions.forEach(function (_a) {
                    var reaction = _a.reaction, propertyName = _a.propertyName;
                    var propertyChanged = changedPropertyKeys.indexOf(propertyName) !== -1;
                    var reactionRun = executedReactions_1.indexOf(reaction) !== -1;
                    if (propertyChanged && !reactionRun) {
                        reaction.call(_this, _this._properties, diffPropertyResults_1);
                        executedReactions_1.push(reaction);
                    }
                });
            }
            this._properties = diffPropertyResults_1;
            this._changedPropertyKeys = changedPropertyKeys;
        }
        else {
            this._initialProperties = false;
            for (var i = 0; i < propertyNames.length; i++) {
                var propertyName = propertyNames[i];
                if (typeof properties[propertyName] === 'function') {
                    properties[propertyName] = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                }
                else {
                    changedPropertyKeys.push(propertyName);
                }
            }
            this._changedPropertyKeys = changedPropertyKeys;
            this._properties = tslib_1.__assign({}, properties);
        }
        if (this._changedPropertyKeys.length > 0) {
            this.invalidate();
        }
    };
    Object.defineProperty(WidgetBase.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype.__setChildren__ = function (children) {
        if (this._children.length > 0 || children.length > 0) {
            this._children = children;
            this.invalidate();
        }
    };
    WidgetBase.prototype.__render__ = function () {
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        instanceData.dirty = false;
        var render = this._runBeforeRenders();
        var dNode = render();
        dNode = this.runAfterRenders(dNode);
        this._nodeHandler.clear();
        return dNode;
    };
    WidgetBase.prototype.invalidate = function () {
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        if (instanceData.invalidate) {
            instanceData.invalidate();
        }
    };
    WidgetBase.prototype.render = function () {
        return d_1.v('div', {}, this.children);
    };
    /**
     * Function to add decorators to WidgetBase
     *
     * @param decoratorKey The key of the decorator
     * @param value The value of the decorator
     */
    WidgetBase.prototype.addDecorator = function (decoratorKey, value) {
        value = Array.isArray(value) ? value : [value];
        if (this.hasOwnProperty('constructor')) {
            var decoratorList = decoratorMap.get(this.constructor);
            if (!decoratorList) {
                decoratorList = new Map_1.default();
                decoratorMap.set(this.constructor, decoratorList);
            }
            var specificDecoratorList = decoratorList.get(decoratorKey);
            if (!specificDecoratorList) {
                specificDecoratorList = [];
                decoratorList.set(decoratorKey, specificDecoratorList);
            }
            specificDecoratorList.push.apply(specificDecoratorList, tslib_1.__spread(value));
        }
        else {
            var decorators = this.getDecorator(decoratorKey);
            this._decoratorCache.set(decoratorKey, tslib_1.__spread(decorators, value));
        }
    };
    /**
     * Function to build the list of decorators from the global decorator map.
     *
     * @param decoratorKey  The key of the decorator
     * @return An array of decorator values
     * @private
     */
    WidgetBase.prototype._buildDecoratorList = function (decoratorKey) {
        var allDecorators = [];
        var constructor = this.constructor;
        while (constructor) {
            var instanceMap = decoratorMap.get(constructor);
            if (instanceMap) {
                var decorators = instanceMap.get(decoratorKey);
                if (decorators) {
                    allDecorators.unshift.apply(allDecorators, tslib_1.__spread(decorators));
                }
            }
            constructor = Object.getPrototypeOf(constructor);
        }
        return allDecorators;
    };
    /**
     * Function to retrieve decorator values
     *
     * @param decoratorKey The key of the decorator
     * @returns An array of decorator values
     */
    WidgetBase.prototype.getDecorator = function (decoratorKey) {
        var allDecorators = this._decoratorCache.get(decoratorKey);
        if (allDecorators !== undefined) {
            return allDecorators;
        }
        allDecorators = this._buildDecoratorList(decoratorKey);
        this._decoratorCache.set(decoratorKey, allDecorators);
        return allDecorators;
    };
    /**
     * Binds unbound property functions to the specified `bind` property
     *
     * @param properties properties to check for functions
     */
    WidgetBase.prototype._bindFunctionProperty = function (property, bind) {
        if (typeof property === 'function' && !property[exports.noBind] && Registry_1.isWidgetBaseConstructor(property) === false) {
            if (this._bindFunctionPropertyMap === undefined) {
                this._bindFunctionPropertyMap = new WeakMap_1.default();
            }
            var bindInfo = this._bindFunctionPropertyMap.get(property) || {};
            var boundFunc = bindInfo.boundFunc, scope = bindInfo.scope;
            if (boundFunc === undefined || scope !== bind) {
                boundFunc = property.bind(bind);
                this._bindFunctionPropertyMap.set(property, { boundFunc: boundFunc, scope: bind });
            }
            return boundFunc;
        }
        return property;
    };
    Object.defineProperty(WidgetBase.prototype, "registry", {
        get: function () {
            if (this._registry === undefined) {
                this._registry = new RegistryHandler_1.default();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            return this._registry;
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype._runBeforeProperties = function (properties) {
        var _this = this;
        var beforeProperties = this.getDecorator('beforeProperties');
        if (beforeProperties.length > 0) {
            return beforeProperties.reduce(function (properties, beforePropertiesFunction) {
                return tslib_1.__assign({}, properties, beforePropertiesFunction.call(_this, properties));
            }, tslib_1.__assign({}, properties));
        }
        return properties;
    };
    /**
     * Run all registered before renders and return the updated render method
     */
    WidgetBase.prototype._runBeforeRenders = function () {
        var _this = this;
        var beforeRenders = this.getDecorator('beforeRender');
        if (beforeRenders.length > 0) {
            return beforeRenders.reduce(function (render, beforeRenderFunction) {
                var updatedRender = beforeRenderFunction.call(_this, render, _this._properties, _this._children);
                if (!updatedRender) {
                    console.warn('Render function not returned from beforeRender, using previous render');
                    return render;
                }
                return updatedRender;
            }, this._boundRenderFunc);
        }
        return this._boundRenderFunc;
    };
    /**
     * Run all registered after renders and return the decorated DNodes
     *
     * @param dNode The DNodes to run through the after renders
     */
    WidgetBase.prototype.runAfterRenders = function (dNode) {
        var _this = this;
        var afterRenders = this.getDecorator('afterRender');
        if (afterRenders.length > 0) {
            dNode = afterRenders.reduce(function (dNode, afterRenderFunction) {
                return afterRenderFunction.call(_this, dNode);
            }, dNode);
        }
        if (this._metaMap !== undefined) {
            this._metaMap.forEach(function (meta) {
                meta.afterRender();
            });
        }
        return dNode;
    };
    WidgetBase.prototype._runAfterConstructors = function () {
        var _this = this;
        var afterConstructors = this.getDecorator('afterConstructor');
        if (afterConstructors.length > 0) {
            afterConstructors.forEach(function (afterConstructor) { return afterConstructor.call(_this); });
        }
    };
    WidgetBase.prototype.own = function (handle) {
        this._handles.push(handle);
    };
    WidgetBase.prototype.destroy = function () {
        while (this._handles.length > 0) {
            var handle = this._handles.pop();
            if (handle) {
                handle.destroy();
            }
        }
    };
    /**
     * static identifier
     */
    WidgetBase._type = Registry_1.WIDGET_BASE_TYPE;
    return WidgetBase;
}());
exports.WidgetBase = WidgetBase;
exports.default = WidgetBase;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/animations/cssTransitions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browserSpecificTransitionEndEventName = '';
var browserSpecificAnimationEndEventName = '';
function determineBrowserStyleNames(element) {
    if ('WebkitTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
        browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
    }
    else if ('transition' in element.style || 'MozTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'transitionend';
        browserSpecificAnimationEndEventName = 'animationend';
    }
    else {
        throw new Error('Your browser is not supported');
    }
}
function initialize(element) {
    if (browserSpecificAnimationEndEventName === '') {
        determineBrowserStyleNames(element);
    }
}
function runAndCleanUp(element, startAnimation, finishAnimation) {
    initialize(element);
    var finished = false;
    var transitionEnd = function () {
        if (!finished) {
            finished = true;
            element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            finishAnimation();
        }
    };
    startAnimation();
    element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
    element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
}
function exit(node, properties, exitAnimation, removeNode) {
    var activeClass = properties.exitAnimationActive || exitAnimation + "-active";
    runAndCleanUp(node, function () {
        node.classList.add(exitAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, function () {
        removeNode();
    });
}
function enter(node, properties, enterAnimation) {
    var activeClass = properties.enterAnimationActive || enterAnimation + "-active";
    runAndCleanUp(node, function () {
        node.classList.add(enterAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, function () {
        node.classList.remove(enterAnimation);
        node.classList.remove(activeClass);
    });
}
exports.default = {
    enter: enter,
    exit: exit
};

/***/ }),

/***/ "./node_modules/@dojo/widget-core/d.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
/**
 * The symbol identifier for a WNode type
 */
exports.WNODE = Symbol_1.default('Identifier for a WNode.');
/**
 * The symbol identifier for a VNode type
 */
exports.VNODE = Symbol_1.default('Identifier for a VNode.');
/**
 * The symbol identifier for a VNode type created using dom()
 */
exports.DOMVNODE = Symbol_1.default('Identifier for a VNode created using existing dom.');
/**
 * Helper function that returns true if the `DNode` is a `WNode` using the `type` property
 */
function isWNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === exports.WNODE);
}
exports.isWNode = isWNode;
/**
 * Helper function that returns true if the `DNode` is a `VNode` using the `type` property
 */
function isVNode(child) {
    return Boolean(child && typeof child !== 'string' && (child.type === exports.VNODE || child.type === exports.DOMVNODE));
}
exports.isVNode = isVNode;
/**
 * Helper function that returns true if the `DNode` is a `VNode` created with `dom()` using the `type` property
 */
function isDomVNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === exports.DOMVNODE);
}
exports.isDomVNode = isDomVNode;
function isElementNode(value) {
    return !!value.tagName;
}
exports.isElementNode = isElementNode;
function decorate(dNodes, optionsOrModifier, predicate) {
    var shallow = false;
    var modifier;
    if (typeof optionsOrModifier === 'function') {
        modifier = optionsOrModifier;
    }
    else {
        modifier = optionsOrModifier.modifier;
        predicate = optionsOrModifier.predicate;
        shallow = optionsOrModifier.shallow || false;
    }
    var nodes = Array.isArray(dNodes) ? tslib_1.__spread(dNodes) : [dNodes];
    function breaker() {
        nodes = [];
    }
    while (nodes.length) {
        var node = nodes.shift();
        if (node) {
            if (!shallow && (isWNode(node) || isVNode(node)) && node.children) {
                nodes = tslib_1.__spread(nodes, node.children);
            }
            if (!predicate || predicate(node)) {
                modifier(node, breaker);
            }
        }
    }
    return dNodes;
}
exports.decorate = decorate;
/**
 * Wrapper function for calls to create a widget.
 */
function w(widgetConstructor, properties, children) {
    if (children === void 0) { children = []; }
    return {
        children: children,
        widgetConstructor: widgetConstructor,
        properties: properties,
        type: exports.WNODE
    };
}
exports.w = w;
function v(tag, propertiesOrChildren, children) {
    if (propertiesOrChildren === void 0) { propertiesOrChildren = {}; }
    if (children === void 0) { children = undefined; }
    var properties = propertiesOrChildren;
    var deferredPropertiesCallback;
    if (Array.isArray(propertiesOrChildren)) {
        children = propertiesOrChildren;
        properties = {};
    }
    if (typeof properties === 'function') {
        deferredPropertiesCallback = properties;
        properties = {};
    }
    return {
        tag: tag,
        deferredPropertiesCallback: deferredPropertiesCallback,
        children: children,
        properties: properties,
        type: exports.VNODE
    };
}
exports.v = v;
/**
 * Create a VNode for an existing DOM Node.
 */
function dom(_a, children) {
    var node = _a.node, _b = _a.attrs, attrs = _b === void 0 ? {} : _b, _c = _a.props, props = _c === void 0 ? {} : _c, _d = _a.on, on = _d === void 0 ? {} : _d, _e = _a.diffType, diffType = _e === void 0 ? 'none' : _e;
    return {
        tag: isElementNode(node) ? node.tagName.toLowerCase() : '',
        properties: props,
        attributes: attrs,
        events: on,
        children: children,
        type: exports.DOMVNODE,
        domNode: node,
        text: isElementNode(node) ? undefined : node.data,
        diffType: diffType
    };
}
exports.dom = dom;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/afterRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
function afterRender(method) {
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        target.addDecorator('afterRender', propertyKey ? target[propertyKey] : method);
    });
}
exports.afterRender = afterRender;
exports.default = afterRender;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/alwaysRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
var beforeProperties_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/beforeProperties.js");
function alwaysRender() {
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        beforeProperties_1.beforeProperties(function () {
            this.invalidate();
        })(target);
    });
}
exports.alwaysRender = alwaysRender;
exports.default = alwaysRender;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/beforeProperties.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
function beforeProperties(method) {
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        target.addDecorator('beforeProperties', propertyKey ? target[propertyKey] : method);
    });
}
exports.beforeProperties = beforeProperties;
exports.default = beforeProperties;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/customElement.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
/**
 * This Decorator is provided properties that define the behavior of a custom element, and
 * registers that custom element.
 */
function customElement(_a) {
    var tag = _a.tag, _b = _a.properties, properties = _b === void 0 ? [] : _b, _c = _a.attributes, attributes = _c === void 0 ? [] : _c, _d = _a.events, events = _d === void 0 ? [] : _d, _e = _a.childType, childType = _e === void 0 ? registerCustomElement_1.CustomElementChildType.DOJO : _e, _f = _a.registryFactory, registryFactory = _f === void 0 ? function () { return new Registry_1.default(); } : _f;
    return function (target) {
        target.prototype.__customElementDescriptor = {
            tagName: tag,
            attributes: attributes,
            properties: properties,
            events: events,
            childType: childType,
            registryFactory: registryFactory
        };
    };
}
exports.customElement = customElement;
exports.default = customElement;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/diffProperty.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
/**
 * Decorator that can be used to register a function as a specific property diff
 *
 * @param propertyName  The name of the property of which the diff function is applied
 * @param diffType      The diff type, default is DiffType.AUTO.
 * @param diffFunction  A diff function to run if diffType if DiffType.CUSTOM
 */
function diffProperty(propertyName, diffFunction, reactionFunction) {
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        target.addDecorator("diffProperty:" + propertyName, diffFunction.bind(null));
        target.addDecorator('registeredDiffProperty', propertyName);
        if (reactionFunction || propertyKey) {
            target.addDecorator('diffReaction', {
                propertyName: propertyName,
                reaction: propertyKey ? target[propertyKey] : reactionFunction
            });
        }
    });
}
exports.diffProperty = diffProperty;
exports.default = diffProperty;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/handleDecorator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic decorator handler to take care of whether or not the decorator was called at the class level
 * or the method level.
 *
 * @param handler
 */
function handleDecorator(handler) {
    return function (target, propertyKey, descriptor) {
        if (typeof target === 'function') {
            handler(target.prototype, undefined);
        }
        else {
            handler(target, propertyKey);
        }
    };
}
exports.handleDecorator = handleDecorator;
exports.default = handleDecorator;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/inject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WeakMap_1 = __webpack_require__("./node_modules/@dojo/shim/WeakMap.js");
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
var beforeProperties_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/beforeProperties.js");
/**
 * Map of instances against registered injectors.
 */
var registeredInjectorsMap = new WeakMap_1.default();
/**
 * Decorator retrieves an injector from an available registry using the name and
 * calls the `getProperties` function with the payload from the injector
 * and current properties with the the injected properties returned.
 *
 * @param InjectConfig the inject configuration
 */
function inject(_a) {
    var name = _a.name, getProperties = _a.getProperties;
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        beforeProperties_1.beforeProperties(function (properties) {
            var _this = this;
            var injectorItem = this.registry.getInjector(name);
            if (injectorItem) {
                var injector = injectorItem.injector, invalidator = injectorItem.invalidator;
                var registeredInjectors = registeredInjectorsMap.get(this) || [];
                if (registeredInjectors.length === 0) {
                    registeredInjectorsMap.set(this, registeredInjectors);
                }
                if (registeredInjectors.indexOf(injectorItem) === -1) {
                    this.own(invalidator.on('invalidate', function () {
                        _this.invalidate();
                    }));
                    registeredInjectors.push(injectorItem);
                }
                return getProperties(injector(), properties);
            }
        })(target);
    });
}
exports.inject = inject;
exports.default = inject;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/diff.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}
function always(previousProperty, newProperty) {
    return {
        changed: true,
        value: newProperty
    };
}
exports.always = always;
function ignore(previousProperty, newProperty) {
    return {
        changed: false,
        value: newProperty
    };
}
exports.ignore = ignore;
function reference(previousProperty, newProperty) {
    return {
        changed: previousProperty !== newProperty,
        value: newProperty
    };
}
exports.reference = reference;
function shallow(previousProperty, newProperty) {
    var changed = false;
    var validOldProperty = previousProperty && isObjectOrArray(previousProperty);
    var validNewProperty = newProperty && isObjectOrArray(newProperty);
    if (!validOldProperty || !validNewProperty) {
        return {
            changed: true,
            value: newProperty
        };
    }
    var previousKeys = Object.keys(previousProperty);
    var newKeys = Object.keys(newProperty);
    if (previousKeys.length !== newKeys.length) {
        changed = true;
    }
    else {
        changed = newKeys.some(function (key) {
            return newProperty[key] !== previousProperty[key];
        });
    }
    return {
        changed: changed,
        value: newProperty
    };
}
exports.shallow = shallow;
function auto(previousProperty, newProperty) {
    var result;
    if (typeof newProperty === 'function') {
        if (newProperty._type === Registry_1.WIDGET_BASE_TYPE) {
            result = reference(previousProperty, newProperty);
        }
        else {
            result = ignore(previousProperty, newProperty);
        }
    }
    else if (isObjectOrArray(newProperty)) {
        result = shallow(previousProperty, newProperty);
    }
    else {
        result = reference(previousProperty, newProperty);
    }
    return result;
}
exports.auto = auto;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/meta/Base.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Destroyable_1 = __webpack_require__("./node_modules/@dojo/core/Destroyable.js");
var Set_1 = __webpack_require__("./node_modules/@dojo/shim/Set.js");
var Base = /** @class */ (function (_super) {
    tslib_1.__extends(Base, _super);
    function Base(properties) {
        var _this = _super.call(this) || this;
        _this._requestedNodeKeys = new Set_1.default();
        _this._invalidate = properties.invalidate;
        _this.nodeHandler = properties.nodeHandler;
        if (properties.bind) {
            _this._bind = properties.bind;
        }
        return _this;
    }
    Base.prototype.has = function (key) {
        return this.nodeHandler.has(key);
    };
    Base.prototype.getNode = function (key) {
        var _this = this;
        var stringKey = "" + key;
        var node = this.nodeHandler.get(stringKey);
        if (!node && !this._requestedNodeKeys.has(stringKey)) {
            var handle_1 = this.nodeHandler.on(stringKey, function () {
                handle_1.destroy();
                _this._requestedNodeKeys.delete(stringKey);
                _this.invalidate();
            });
            this.own(handle_1);
            this._requestedNodeKeys.add(stringKey);
        }
        return node;
    };
    Base.prototype.invalidate = function () {
        this._invalidate();
    };
    Base.prototype.afterRender = function () {
        // Do nothing by default.
    };
    return Base;
}(Destroyable_1.Destroyable));
exports.Base = Base;
exports.default = Base;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/meta/Focus.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Base_1 = __webpack_require__("./node_modules/@dojo/widget-core/meta/Base.js");
var lang_1 = __webpack_require__("./node_modules/@dojo/core/lang.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var defaultResults = {
    active: false,
    containsFocus: false
};
var Focus = /** @class */ (function (_super) {
    tslib_1.__extends(Focus, _super);
    function Focus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onFocusChange = function () {
            _this._activeElement = global_1.default.document.activeElement;
            _this.invalidate();
        };
        return _this;
    }
    Focus.prototype.get = function (key) {
        var node = this.getNode(key);
        if (!node) {
            return tslib_1.__assign({}, defaultResults);
        }
        if (!this._activeElement) {
            this._activeElement = global_1.default.document.activeElement;
            this._createListener();
        }
        return {
            active: node === this._activeElement,
            containsFocus: !!this._activeElement && node.contains(this._activeElement)
        };
    };
    Focus.prototype.set = function (key) {
        var node = this.getNode(key);
        node && node.focus();
    };
    Focus.prototype._createListener = function () {
        global_1.default.document.addEventListener('focusin', this._onFocusChange);
        global_1.default.document.addEventListener('focusout', this._onFocusChange);
        this.own(lang_1.createHandle(this._removeListener.bind(this)));
    };
    Focus.prototype._removeListener = function () {
        global_1.default.document.removeEventListener('focusin', this._onFocusChange);
        global_1.default.document.removeEventListener('focusout', this._onFocusChange);
    };
    return Focus;
}(Base_1.Base));
exports.Focus = Focus;
exports.default = Focus;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/mixins/Projector.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var lang_1 = __webpack_require__("./node_modules/@dojo/core/lang.js");
var cssTransitions_1 = __webpack_require__("./node_modules/@dojo/widget-core/animations/cssTransitions.js");
var afterRender_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/afterRender.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var vdom_1 = __webpack_require__("./node_modules/@dojo/widget-core/vdom.js");
/**
 * Represents the attach state of the projector
 */
var ProjectorAttachState;
(function (ProjectorAttachState) {
    ProjectorAttachState[ProjectorAttachState["Attached"] = 1] = "Attached";
    ProjectorAttachState[ProjectorAttachState["Detached"] = 2] = "Detached";
})(ProjectorAttachState = exports.ProjectorAttachState || (exports.ProjectorAttachState = {}));
/**
 * Attach type for the projector
 */
var AttachType;
(function (AttachType) {
    AttachType[AttachType["Append"] = 1] = "Append";
    AttachType[AttachType["Merge"] = 2] = "Merge";
})(AttachType = exports.AttachType || (exports.AttachType = {}));
function ProjectorMixin(Base) {
    var Projector = /** @class */ (function (_super) {
        tslib_1.__extends(Projector, _super);
        function Projector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread(args)) || this;
            _this._root = document.body;
            _this._async = true;
            _this._projectorProperties = {};
            _this._projectionOptions = {
                transitions: cssTransitions_1.default
            };
            _this.root = document.body;
            _this.projectorState = ProjectorAttachState.Detached;
            return _this;
        }
        Projector.prototype.append = function (root) {
            var options = {
                type: AttachType.Append,
                root: root
            };
            return this._attach(options);
        };
        Projector.prototype.merge = function (root) {
            var options = {
                type: AttachType.Merge,
                root: root
            };
            return this._attach(options);
        };
        Object.defineProperty(Projector.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (root) {
                if (this.projectorState === ProjectorAttachState.Attached) {
                    throw new Error('Projector already attached, cannot change root element');
                }
                this._root = root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Projector.prototype, "async", {
            get: function () {
                return this._async;
            },
            set: function (async) {
                if (this.projectorState === ProjectorAttachState.Attached) {
                    throw new Error('Projector already attached, cannot change async mode');
                }
                this._async = async;
            },
            enumerable: true,
            configurable: true
        });
        Projector.prototype.sandbox = function (doc) {
            var _this = this;
            if (doc === void 0) { doc = document; }
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot create sandbox');
            }
            this._async = false;
            var previousRoot = this.root;
            /* free up the document fragment for GC */
            this.own({
                destroy: function () {
                    _this._root = previousRoot;
                }
            });
            this._attach({
                /* DocumentFragment is not assignable to Element, but provides everything needed to work */
                root: doc.createDocumentFragment(),
                type: AttachType.Append
            });
        };
        Projector.prototype.setChildren = function (children) {
            this.__setChildren__(children);
        };
        Projector.prototype.setProperties = function (properties) {
            this.__setProperties__(properties);
        };
        Projector.prototype.__setProperties__ = function (properties) {
            if (this._projectorProperties && this._projectorProperties.registry !== properties.registry) {
                if (this._projectorProperties.registry) {
                    this._projectorProperties.registry.destroy();
                }
            }
            this._projectorProperties = lang_1.assign({}, properties);
            _super.prototype.__setCoreProperties__.call(this, { bind: this, baseRegistry: properties.registry });
            _super.prototype.__setProperties__.call(this, properties);
        };
        Projector.prototype.toHtml = function () {
            if (this.projectorState !== ProjectorAttachState.Attached || !this._projection) {
                throw new Error('Projector is not attached, cannot return an HTML string of projection.');
            }
            return this._projection.domNode.childNodes[0].outerHTML;
        };
        Projector.prototype.afterRender = function (result) {
            var node = result;
            if (typeof result === 'string' || result === null || result === undefined) {
                node = d_1.v('span', {}, [result]);
            }
            return node;
        };
        Projector.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        Projector.prototype._attach = function (_a) {
            var _this = this;
            var type = _a.type, root = _a.root;
            if (root) {
                this.root = root;
            }
            if (this._attachHandle) {
                return this._attachHandle;
            }
            this.projectorState = ProjectorAttachState.Attached;
            var handle = {
                destroy: function () {
                    if (_this.projectorState === ProjectorAttachState.Attached) {
                        _this._projection = undefined;
                        _this.projectorState = ProjectorAttachState.Detached;
                    }
                }
            };
            this.own(handle);
            this._attachHandle = handle;
            this._projectionOptions = tslib_1.__assign({}, this._projectionOptions, { sync: !this._async });
            switch (type) {
                case AttachType.Append:
                    this._projection = vdom_1.dom.append(this.root, this, this._projectionOptions);
                    break;
                case AttachType.Merge:
                    this._projection = vdom_1.dom.merge(this.root, this, this._projectionOptions);
                    break;
            }
            return this._attachHandle;
        };
        tslib_1.__decorate([
            afterRender_1.afterRender(),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], Projector.prototype, "afterRender", null);
        return Projector;
    }(Base));
    return Projector;
}
exports.ProjectorMixin = ProjectorMixin;
exports.default = ProjectorMixin;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/mixins/Themed.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Injector_1 = __webpack_require__("./node_modules/@dojo/widget-core/Injector.js");
var inject_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/inject.js");
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
var diffProperty_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/diffProperty.js");
var diff_1 = __webpack_require__("./node_modules/@dojo/widget-core/diff.js");
var THEME_KEY = ' _key';
exports.INJECTED_THEME_KEY = Symbol('theme');
/**
 * Decorator for base css classes
 */
function theme(theme) {
    return handleDecorator_1.handleDecorator(function (target) {
        target.addDecorator('baseThemeClasses', theme);
    });
}
exports.theme = theme;
/**
 * Creates a reverse lookup for the classes passed in via the `theme` function.
 *
 * @param classes The baseClasses object
 * @requires
 */
function createThemeClassesLookup(classes) {
    return classes.reduce(function (currentClassNames, baseClass) {
        Object.keys(baseClass).forEach(function (key) {
            currentClassNames[baseClass[key]] = key;
        });
        return currentClassNames;
    }, {});
}
/**
 * Convenience function that is given a theme and an optional registry, the theme
 * injector is defined against the registry, returning the theme.
 *
 * @param theme the theme to set
 * @param themeRegistry registry to define the theme injector against. Defaults
 * to the global registry
 *
 * @returns the theme injector used to set the theme
 */
function registerThemeInjector(theme, themeRegistry) {
    var themeInjector = new Injector_1.Injector(theme);
    themeRegistry.defineInjector(exports.INJECTED_THEME_KEY, function (invalidator) {
        themeInjector.setInvalidator(invalidator);
        return function () { return themeInjector.get(); };
    });
    return themeInjector;
}
exports.registerThemeInjector = registerThemeInjector;
/**
 * Function that returns a class decorated with with Themed functionality
 */
function ThemedMixin(Base) {
    var Themed = /** @class */ (function (_super) {
        tslib_1.__extends(Themed, _super);
        function Themed() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Registered base theme keys
             */
            _this._registeredBaseThemeKeys = [];
            /**
             * Indicates if classes meta data need to be calculated.
             */
            _this._recalculateClasses = true;
            /**
             * Loaded theme
             */
            _this._theme = {};
            return _this;
        }
        Themed.prototype.theme = function (classes) {
            var _this = this;
            if (this._recalculateClasses) {
                this._recalculateThemeClasses();
            }
            if (Array.isArray(classes)) {
                return classes.map(function (className) { return _this._getThemeClass(className); });
            }
            return this._getThemeClass(classes);
        };
        /**
         * Function fired when `theme` or `extraClasses` are changed.
         */
        Themed.prototype.onPropertiesChanged = function () {
            this._recalculateClasses = true;
        };
        Themed.prototype._getThemeClass = function (className) {
            if (className === undefined || className === null) {
                return className;
            }
            var extraClasses = this.properties.extraClasses || {};
            var themeClassName = this._baseThemeClassesReverseLookup[className];
            var resultClassNames = [];
            if (!themeClassName) {
                console.warn("Class name: '" + className + "' not found in theme");
                return null;
            }
            if (extraClasses[themeClassName]) {
                resultClassNames.push(extraClasses[themeClassName]);
            }
            if (this._theme[themeClassName]) {
                resultClassNames.push(this._theme[themeClassName]);
            }
            else {
                resultClassNames.push(this._registeredBaseTheme[themeClassName]);
            }
            return resultClassNames.join(' ');
        };
        Themed.prototype._recalculateThemeClasses = function () {
            var _this = this;
            var _a = this.properties.theme, theme = _a === void 0 ? {} : _a;
            var baseThemes = this.getDecorator('baseThemeClasses');
            if (!this._registeredBaseTheme) {
                this._registeredBaseTheme = baseThemes.reduce(function (finalBaseTheme, baseTheme) {
                    var _a = THEME_KEY, key = baseTheme[_a], classes = tslib_1.__rest(baseTheme, [typeof _a === "symbol" ? _a : _a + ""]);
                    _this._registeredBaseThemeKeys.push(key);
                    return tslib_1.__assign({}, finalBaseTheme, classes);
                }, {});
                this._baseThemeClassesReverseLookup = createThemeClassesLookup(baseThemes);
            }
            this._theme = this._registeredBaseThemeKeys.reduce(function (baseTheme, themeKey) {
                return tslib_1.__assign({}, baseTheme, theme[themeKey]);
            }, {});
            this._recalculateClasses = false;
        };
        tslib_1.__decorate([
            diffProperty_1.diffProperty('theme', diff_1.shallow),
            diffProperty_1.diffProperty('extraClasses', diff_1.shallow),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], Themed.prototype, "onPropertiesChanged", null);
        Themed = tslib_1.__decorate([
            inject_1.inject({
                name: exports.INJECTED_THEME_KEY,
                getProperties: function (theme, properties) {
                    if (!properties.theme) {
                        return { theme: theme };
                    }
                    return {};
                }
            })
        ], Themed);
        return Themed;
    }(Base));
    return Themed;
}
exports.ThemedMixin = ThemedMixin;
exports.default = ThemedMixin;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/registerCustomElement.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var Projector_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Projector.js");
var array_1 = __webpack_require__("./node_modules/@dojo/shim/array.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var alwaysRender_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/alwaysRender.js");
var CustomElementChildType;
(function (CustomElementChildType) {
    CustomElementChildType["DOJO"] = "DOJO";
    CustomElementChildType["NODE"] = "NODE";
    CustomElementChildType["TEXT"] = "TEXT";
})(CustomElementChildType = exports.CustomElementChildType || (exports.CustomElementChildType = {}));
function DomToWidgetWrapper(domNode) {
    var DomToWidgetWrapper = /** @class */ (function (_super) {
        tslib_1.__extends(DomToWidgetWrapper, _super);
        function DomToWidgetWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DomToWidgetWrapper.prototype.render = function () {
            var _this = this;
            var properties = Object.keys(this.properties).reduce(function (props, key) {
                var value = _this.properties[key];
                if (key.indexOf('on') === 0) {
                    key = "__" + key;
                }
                props[key] = value;
                return props;
            }, {});
            return d_1.dom({ node: domNode, props: properties, diffType: 'dom' });
        };
        Object.defineProperty(DomToWidgetWrapper, "domNode", {
            get: function () {
                return domNode;
            },
            enumerable: true,
            configurable: true
        });
        DomToWidgetWrapper = tslib_1.__decorate([
            alwaysRender_1.alwaysRender()
        ], DomToWidgetWrapper);
        return DomToWidgetWrapper;
    }(WidgetBase_1.WidgetBase));
    return DomToWidgetWrapper;
}
exports.DomToWidgetWrapper = DomToWidgetWrapper;
function create(descriptor, WidgetConstructor) {
    var attributes = descriptor.attributes, childType = descriptor.childType, registryFactory = descriptor.registryFactory;
    var attributeMap = {};
    attributes.forEach(function (propertyName) {
        var attributeName = propertyName.toLowerCase();
        attributeMap[attributeName] = propertyName;
    });
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._properties = {};
            _this._children = [];
            _this._eventProperties = {};
            _this._initialised = false;
            return _this;
        }
        class_1.prototype.connectedCallback = function () {
            var _this = this;
            if (this._initialised) {
                return;
            }
            var domProperties = {};
            var attributes = descriptor.attributes, properties = descriptor.properties, events = descriptor.events;
            this._properties = tslib_1.__assign({}, this._properties, this._attributesToProperties(attributes));
            tslib_1.__spread(attributes, properties).forEach(function (propertyName) {
                var value = _this[propertyName];
                var filteredPropertyName = propertyName.replace(/^on/, '__');
                if (value !== undefined) {
                    _this._properties[propertyName] = value;
                }
                if (filteredPropertyName !== propertyName) {
                    domProperties[filteredPropertyName] = {
                        get: function () { return _this._getProperty(propertyName); },
                        set: function (value) { return _this._setProperty(propertyName, value); }
                    };
                }
                domProperties[propertyName] = {
                    get: function () { return _this._getProperty(propertyName); },
                    set: function (value) { return _this._setProperty(propertyName, value); }
                };
            });
            events.forEach(function (propertyName) {
                var eventName = propertyName.replace(/^on/, '').toLowerCase();
                var filteredPropertyName = propertyName.replace(/^on/, '__on');
                domProperties[filteredPropertyName] = {
                    get: function () { return _this._getEventProperty(propertyName); },
                    set: function (value) { return _this._setEventProperty(propertyName, value); }
                };
                _this._eventProperties[propertyName] = undefined;
                _this._properties[propertyName] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var eventCallback = _this._getEventProperty(propertyName);
                    if (typeof eventCallback === 'function') {
                        eventCallback.apply(void 0, tslib_1.__spread(args));
                    }
                    _this.dispatchEvent(new CustomEvent(eventName, {
                        bubbles: false,
                        detail: args
                    }));
                };
            });
            Object.defineProperties(this, domProperties);
            var children = childType === CustomElementChildType.TEXT ? this.childNodes : this.children;
            array_1.from(children).forEach(function (childNode) {
                if (childType === CustomElementChildType.DOJO) {
                    childNode.addEventListener('dojo-ce-render', function () { return _this._render(); });
                    childNode.addEventListener('dojo-ce-connected', function () { return _this._render(); });
                    _this._children.push(DomToWidgetWrapper(childNode));
                }
                else {
                    _this._children.push(d_1.dom({ node: childNode, diffType: 'dom' }));
                }
            });
            this.addEventListener('dojo-ce-connected', function (e) { return _this._childConnected(e); });
            var widgetProperties = this._properties;
            var renderChildren = function () { return _this.__children__(); };
            var Wrapper = /** @class */ (function (_super) {
                tslib_1.__extends(class_2, _super);
                function class_2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_2.prototype.render = function () {
                    return d_1.w(WidgetConstructor, widgetProperties, renderChildren());
                };
                return class_2;
            }(WidgetBase_1.WidgetBase));
            var registry = registryFactory();
            var themeContext = Themed_1.registerThemeInjector(this._getTheme(), registry);
            global_1.default.addEventListener('dojo-theme-set', function () { return themeContext.set(_this._getTheme()); });
            var Projector = Projector_1.ProjectorMixin(Wrapper);
            this._projector = new Projector();
            this._projector.setProperties({ registry: registry });
            this._projector.append(this);
            this._initialised = true;
            this.dispatchEvent(new CustomEvent('dojo-ce-connected', {
                bubbles: true,
                detail: this
            }));
        };
        class_1.prototype._getTheme = function () {
            if (global_1.default && global_1.default.dojoce && global_1.default.dojoce.theme) {
                return global_1.default.dojoce.themes[global_1.default.dojoce.theme];
            }
        };
        class_1.prototype._childConnected = function (e) {
            var _this = this;
            var node = e.detail;
            if (node.parentNode === this) {
                var exists = this._children.some(function (child) { return child.domNode === node; });
                if (!exists) {
                    node.addEventListener('dojo-ce-render', function () { return _this._render(); });
                    this._children.push(DomToWidgetWrapper(node));
                    this._render();
                }
            }
        };
        class_1.prototype._render = function () {
            if (this._projector) {
                this._projector.invalidate();
                this.dispatchEvent(new CustomEvent('dojo-ce-render', {
                    bubbles: false,
                    detail: this
                }));
            }
        };
        class_1.prototype.__properties__ = function () {
            return tslib_1.__assign({}, this._properties, this._eventProperties);
        };
        class_1.prototype.__children__ = function () {
            if (childType === CustomElementChildType.DOJO) {
                return this._children.filter(function (Child) { return Child.domNode.isWidget; }).map(function (Child) {
                    var domNode = Child.domNode;
                    return d_1.w(Child, tslib_1.__assign({}, domNode.__properties__()), tslib_1.__spread(domNode.__children__()));
                });
            }
            else {
                return this._children;
            }
        };
        class_1.prototype.attributeChangedCallback = function (name, oldValue, value) {
            var propertyName = attributeMap[name];
            this._setProperty(propertyName, value);
        };
        class_1.prototype._setEventProperty = function (propertyName, value) {
            this._eventProperties[propertyName] = value;
        };
        class_1.prototype._getEventProperty = function (propertyName) {
            return this._eventProperties[propertyName];
        };
        class_1.prototype._setProperty = function (propertyName, value) {
            if (typeof value === 'function') {
                value[WidgetBase_1.noBind] = true;
            }
            this._properties[propertyName] = value;
            this._render();
        };
        class_1.prototype._getProperty = function (propertyName) {
            return this._properties[propertyName];
        };
        class_1.prototype._attributesToProperties = function (attributes) {
            var _this = this;
            return attributes.reduce(function (properties, propertyName) {
                var attributeName = propertyName.toLowerCase();
                var value = _this.getAttribute(attributeName);
                if (value !== null) {
                    properties[propertyName] = value;
                }
                return properties;
            }, {});
        };
        Object.defineProperty(class_1, "observedAttributes", {
            get: function () {
                return Object.keys(attributeMap);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "isWidget", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(HTMLElement));
}
exports.create = create;
function register(WidgetConstructor) {
    var descriptor = WidgetConstructor.prototype && WidgetConstructor.prototype.__customElementDescriptor;
    if (!descriptor) {
        throw new Error('Cannot get descriptor for Custom Element, have you added the @customElement decorator to your Widget?');
    }
    global_1.default.customElements.define(descriptor.tagName, create(descriptor, WidgetConstructor));
}
exports.register = register;
exports.default = register;

/***/ }),

/***/ "./node_modules/@dojo/widget-core/vdom.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var array_1 = __webpack_require__("./node_modules/@dojo/shim/array.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var WeakMap_1 = __webpack_require__("./node_modules/@dojo/shim/WeakMap.js");
var NAMESPACE_W3 = 'http://www.w3.org/';
var NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
var NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
var emptyArray = [];
var nodeOperations = ['focus', 'blur', 'scrollIntoView', 'click'];
exports.widgetInstanceMap = new WeakMap_1.default();
var instanceMap = new WeakMap_1.default();
var nextSiblingMap = new WeakMap_1.default();
var projectorStateMap = new WeakMap_1.default();
function same(dnode1, dnode2) {
    if (d_1.isVNode(dnode1) && d_1.isVNode(dnode2)) {
        if (d_1.isDomVNode(dnode1) || d_1.isDomVNode(dnode2)) {
            if (dnode1.domNode !== dnode2.domNode) {
                return false;
            }
        }
        if (dnode1.tag !== dnode2.tag) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    else if (d_1.isWNode(dnode1) && d_1.isWNode(dnode2)) {
        if (dnode1.instance === undefined && typeof dnode2.widgetConstructor === 'string') {
            return false;
        }
        if (dnode1.widgetConstructor !== dnode2.widgetConstructor) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    return false;
}
var missingTransition = function () {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
};
function getProjectionOptions(projectorOptions, projectorInstance) {
    var defaults = {
        namespace: undefined,
        styleApplyer: function (domNode, styleName, value) {
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        },
        depth: 0,
        merge: false,
        sync: false,
        projectorInstance: projectorInstance
    };
    return tslib_1.__assign({}, defaults, projectorOptions);
}
function checkStyleValue(styleValue) {
    if (typeof styleValue !== 'string') {
        throw new Error('Style values must be strings');
    }
}
function updateEvent(domNode, eventName, currentValue, projectionOptions, bind, previousValue) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    var eventMap = projectorState.nodeMap.get(domNode) || new WeakMap_1.default();
    if (previousValue) {
        var previousEvent = eventMap.get(previousValue);
        domNode.removeEventListener(eventName, previousEvent);
    }
    var callback = currentValue.bind(bind);
    if (eventName === 'input') {
        callback = function (evt) {
            currentValue.call(this, evt);
            evt.target['oninput-value'] = evt.target.value;
        }.bind(bind);
    }
    domNode.addEventListener(eventName, callback);
    eventMap.set(currentValue, callback);
    projectorState.nodeMap.set(domNode, eventMap);
}
function addClasses(domNode, classes) {
    if (classes) {
        var classNames = classes.split(' ');
        for (var i = 0; i < classNames.length; i++) {
            domNode.classList.add(classNames[i]);
        }
    }
}
function removeClasses(domNode, classes) {
    if (classes) {
        var classNames = classes.split(' ');
        for (var i = 0; i < classNames.length; i++) {
            domNode.classList.remove(classNames[i]);
        }
    }
}
function buildPreviousProperties(domNode, previous, current) {
    var diffType = current.diffType, properties = current.properties, attributes = current.attributes;
    if (!diffType || diffType === 'vdom') {
        return { properties: previous.properties, attributes: previous.attributes, events: previous.events };
    }
    else if (diffType === 'none') {
        return { properties: {}, attributes: previous.attributes ? {} : undefined, events: previous.events };
    }
    var newProperties = {
        properties: {}
    };
    if (attributes) {
        newProperties.attributes = {};
        newProperties.events = previous.events;
        Object.keys(properties).forEach(function (propName) {
            newProperties.properties[propName] = domNode[propName];
        });
        Object.keys(attributes).forEach(function (attrName) {
            newProperties.attributes[attrName] = domNode.getAttribute(attrName);
        });
        return newProperties;
    }
    newProperties.properties = Object.keys(properties).reduce(function (props, property) {
        props[property] = domNode.getAttribute(property) || domNode[property];
        return props;
    }, {});
    return newProperties;
}
function nodeOperation(propName, propValue, previousValue, domNode, projectionOptions) {
    var result;
    if (typeof propValue === 'function') {
        result = propValue();
    }
    else {
        result = propValue && !previousValue;
    }
    if (result === true) {
        var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
        projectorState.deferredRenderCallbacks.push(function () {
            domNode[propName]();
        });
    }
}
function removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions, onlyEvents) {
    if (onlyEvents === void 0) { onlyEvents = false; }
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    var eventMap = projectorState.nodeMap.get(domNode);
    if (eventMap) {
        Object.keys(previousProperties).forEach(function (propName) {
            var isEvent = propName.substr(0, 2) === 'on' || onlyEvents;
            var eventName = onlyEvents ? propName : propName.substr(2);
            if (isEvent && !properties[propName]) {
                var eventCallback = eventMap.get(previousProperties[propName]);
                if (eventCallback) {
                    domNode.removeEventListener(eventName, eventCallback);
                }
            }
        });
    }
}
function updateAttribute(domNode, attrName, attrValue, projectionOptions) {
    if (projectionOptions.namespace === NAMESPACE_SVG && attrName === 'href') {
        domNode.setAttributeNS(NAMESPACE_XLINK, attrName, attrValue);
    }
    else if ((attrName === 'role' && attrValue === '') || attrValue === undefined) {
        domNode.removeAttribute(attrName);
    }
    else {
        domNode.setAttribute(attrName, attrValue);
    }
}
function updateAttributes(domNode, previousAttributes, attributes, projectionOptions) {
    var attrNames = Object.keys(attributes);
    var attrCount = attrNames.length;
    for (var i = 0; i < attrCount; i++) {
        var attrName = attrNames[i];
        var attrValue = attributes[attrName];
        var previousAttrValue = previousAttributes[attrName];
        if (attrValue !== previousAttrValue) {
            updateAttribute(domNode, attrName, attrValue, projectionOptions);
        }
    }
}
function updateProperties(domNode, previousProperties, properties, projectionOptions, includesEventsAndAttributes) {
    if (includesEventsAndAttributes === void 0) { includesEventsAndAttributes = true; }
    var propertiesUpdated = false;
    var propNames = Object.keys(properties);
    var propCount = propNames.length;
    if (propNames.indexOf('classes') === -1 && previousProperties.classes) {
        if (Array.isArray(previousProperties.classes)) {
            for (var i = 0; i < previousProperties.classes.length; i++) {
                removeClasses(domNode, previousProperties.classes[i]);
            }
        }
        else {
            removeClasses(domNode, previousProperties.classes);
        }
    }
    includesEventsAndAttributes && removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions);
    for (var i = 0; i < propCount; i++) {
        var propName = propNames[i];
        var propValue = properties[propName];
        var previousValue = previousProperties[propName];
        if (propName === 'classes') {
            var previousClasses = Array.isArray(previousValue) ? previousValue : [previousValue];
            var currentClasses = Array.isArray(propValue) ? propValue : [propValue];
            if (previousClasses && previousClasses.length > 0) {
                if (!propValue || propValue.length === 0) {
                    for (var i_1 = 0; i_1 < previousClasses.length; i_1++) {
                        removeClasses(domNode, previousClasses[i_1]);
                    }
                }
                else {
                    var newClasses = tslib_1.__spread(currentClasses);
                    for (var i_2 = 0; i_2 < previousClasses.length; i_2++) {
                        var previousClassName = previousClasses[i_2];
                        if (previousClassName) {
                            var classIndex = newClasses.indexOf(previousClassName);
                            if (classIndex === -1) {
                                removeClasses(domNode, previousClassName);
                            }
                            else {
                                newClasses.splice(classIndex, 1);
                            }
                        }
                    }
                    for (var i_3 = 0; i_3 < newClasses.length; i_3++) {
                        addClasses(domNode, newClasses[i_3]);
                    }
                }
            }
            else {
                for (var i_4 = 0; i_4 < currentClasses.length; i_4++) {
                    addClasses(domNode, currentClasses[i_4]);
                }
            }
        }
        else if (nodeOperations.indexOf(propName) !== -1) {
            nodeOperation(propName, propValue, previousValue, domNode, projectionOptions);
        }
        else if (propName === 'styles') {
            var styleNames = Object.keys(propValue);
            var styleCount = styleNames.length;
            for (var j = 0; j < styleCount; j++) {
                var styleName = styleNames[j];
                var newStyleValue = propValue[styleName];
                var oldStyleValue = previousValue && previousValue[styleName];
                if (newStyleValue === oldStyleValue) {
                    continue;
                }
                propertiesUpdated = true;
                if (newStyleValue) {
                    checkStyleValue(newStyleValue);
                    projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                }
                else {
                    projectionOptions.styleApplyer(domNode, styleName, '');
                }
            }
        }
        else {
            if (!propValue && typeof previousValue === 'string') {
                propValue = '';
            }
            if (propName === 'value') {
                var domValue = domNode[propName];
                if (domValue !== propValue &&
                    (domNode['oninput-value']
                        ? domValue === domNode['oninput-value']
                        : propValue !== previousValue)) {
                    domNode[propName] = propValue;
                    domNode['oninput-value'] = undefined;
                }
                if (propValue !== previousValue) {
                    propertiesUpdated = true;
                }
            }
            else if (propName !== 'key' && propValue !== previousValue) {
                var type = typeof propValue;
                if (type === 'function' && propName.lastIndexOf('on', 0) === 0 && includesEventsAndAttributes) {
                    updateEvent(domNode, propName.substr(2), propValue, projectionOptions, properties.bind, previousValue);
                }
                else if (type === 'string' && propName !== 'innerHTML' && includesEventsAndAttributes) {
                    updateAttribute(domNode, propName, propValue, projectionOptions);
                }
                else if (propName === 'scrollLeft' || propName === 'scrollTop') {
                    if (domNode[propName] !== propValue) {
                        domNode[propName] = propValue;
                    }
                }
                else {
                    domNode[propName] = propValue;
                }
                propertiesUpdated = true;
            }
        }
    }
    return propertiesUpdated;
}
function findIndexOfChild(children, sameAs, start) {
    for (var i = start; i < children.length; i++) {
        if (same(children[i], sameAs)) {
            return i;
        }
    }
    return -1;
}
function toParentVNode(domNode) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        domNode: domNode,
        type: d_1.VNODE
    };
}
exports.toParentVNode = toParentVNode;
function toTextVNode(data) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        text: "" + data,
        domNode: undefined,
        type: d_1.VNODE
    };
}
exports.toTextVNode = toTextVNode;
function toInternalWNode(instance, instanceData) {
    return {
        instance: instance,
        rendered: [],
        coreProperties: instanceData.coreProperties,
        children: instance.children,
        widgetConstructor: instance.constructor,
        properties: instanceData.inputProperties,
        type: d_1.WNODE
    };
}
function filterAndDecorateChildren(children, instance) {
    if (children === undefined) {
        return emptyArray;
    }
    children = Array.isArray(children) ? children : [children];
    for (var i = 0; i < children.length;) {
        var child = children[i];
        if (child === undefined || child === null) {
            children.splice(i, 1);
            continue;
        }
        else if (typeof child === 'string') {
            children[i] = toTextVNode(child);
        }
        else {
            if (d_1.isVNode(child)) {
                if (child.properties.bind === undefined) {
                    child.properties.bind = instance;
                    if (child.children && child.children.length > 0) {
                        filterAndDecorateChildren(child.children, instance);
                    }
                }
            }
            else {
                if (!child.coreProperties) {
                    var instanceData = exports.widgetInstanceMap.get(instance);
                    child.coreProperties = {
                        bind: instance,
                        baseRegistry: instanceData.coreProperties.baseRegistry
                    };
                }
                if (child.children && child.children.length > 0) {
                    filterAndDecorateChildren(child.children, instance);
                }
            }
        }
        i++;
    }
    return children;
}
exports.filterAndDecorateChildren = filterAndDecorateChildren;
function nodeAdded(dnode, transitions) {
    if (d_1.isVNode(dnode) && dnode.properties) {
        var enterAnimation = dnode.properties.enterAnimation;
        if (enterAnimation) {
            if (typeof enterAnimation === 'function') {
                enterAnimation(dnode.domNode, dnode.properties);
            }
            else {
                transitions.enter(dnode.domNode, dnode.properties, enterAnimation);
            }
        }
    }
}
function nodeToRemove(dnode, transitions, projectionOptions) {
    if (d_1.isWNode(dnode)) {
        var item = instanceMap.get(dnode.instance);
        var rendered = (item ? item.dnode.rendered : dnode.rendered) || emptyArray;
        if (dnode.instance) {
            var instanceData = exports.widgetInstanceMap.get(dnode.instance);
            instanceData.onDetach();
            instanceMap.delete(dnode.instance);
        }
        for (var i = 0; i < rendered.length; i++) {
            nodeToRemove(rendered[i], transitions, projectionOptions);
        }
    }
    else {
        var domNode_1 = dnode.domNode;
        var properties = dnode.properties;
        if (dnode.children && dnode.children.length > 0) {
            for (var i = 0; i < dnode.children.length; i++) {
                nodeToRemove(dnode.children[i], transitions, projectionOptions);
            }
        }
        var exitAnimation = properties.exitAnimation;
        if (properties && exitAnimation) {
            domNode_1.style.pointerEvents = 'none';
            var removeDomNode = function () {
                domNode_1 && domNode_1.parentNode && domNode_1.parentNode.removeChild(domNode_1);
                dnode.domNode = undefined;
            };
            if (typeof exitAnimation === 'function') {
                exitAnimation(domNode_1, removeDomNode, properties);
                return;
            }
            else {
                transitions.exit(dnode.domNode, properties, exitAnimation, removeDomNode);
                return;
            }
        }
        domNode_1 && domNode_1.parentNode && domNode_1.parentNode.removeChild(domNode_1);
        dnode.domNode = undefined;
    }
}
function checkDistinguishable(childNodes, indexToCheck, parentInstance) {
    var childNode = childNodes[indexToCheck];
    if (d_1.isVNode(childNode) && !childNode.tag) {
        return; // Text nodes need not be distinguishable
    }
    var key = childNode.properties.key;
    if (key === undefined || key === null) {
        for (var i = 0; i < childNodes.length; i++) {
            if (i !== indexToCheck) {
                var node = childNodes[i];
                if (same(node, childNode)) {
                    var nodeIdentifier = void 0;
                    var parentName = parentInstance.constructor.name || 'unknown';
                    if (d_1.isWNode(childNode)) {
                        nodeIdentifier = childNode.widgetConstructor.name || 'unknown';
                    }
                    else {
                        nodeIdentifier = childNode.tag;
                    }
                    console.warn("A widget (" + parentName + ") has had a child addded or removed, but they were not able to uniquely identified. It is recommended to provide a unique 'key' property when using the same widget or element (" + nodeIdentifier + ") multiple times as siblings");
                    break;
                }
            }
        }
    }
}
function updateChildren(parentVNode, siblings, oldChildren, newChildren, parentInstance, projectionOptions) {
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren;
    var oldChildrenLength = oldChildren.length;
    var newChildrenLength = newChildren.length;
    var transitions = projectionOptions.transitions;
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectionOptions = tslib_1.__assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    var oldIndex = 0;
    var newIndex = 0;
    var i;
    var textUpdated = false;
    var _loop_1 = function () {
        var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
        var newChild = newChildren[newIndex];
        if (d_1.isVNode(newChild) && typeof newChild.deferredPropertiesCallback === 'function') {
            newChild.inserted = d_1.isVNode(oldChild) && oldChild.inserted;
            addDeferredProperties(newChild, projectionOptions);
        }
        if (oldChild !== undefined && same(oldChild, newChild)) {
            oldIndex++;
            newIndex++;
            textUpdated =
                updateDom(oldChild, newChild, projectionOptions, parentVNode, parentInstance, oldChildren.slice(oldIndex), newChildren.slice(newIndex)) || textUpdated;
            return "continue";
        }
        var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        var addChild = function () {
            var insertBeforeDomNode = undefined;
            var childrenArray = oldChildren;
            var nextIndex = oldIndex + 1;
            var child = oldChildren[oldIndex];
            if (!child) {
                child = siblings[0];
                nextIndex = 1;
                childrenArray = siblings;
            }
            if (child) {
                var insertBeforeChildren = [child];
                while (insertBeforeChildren.length) {
                    var insertBefore = insertBeforeChildren.shift();
                    if (d_1.isWNode(insertBefore)) {
                        var item = instanceMap.get(insertBefore.instance);
                        if (item && item.dnode.rendered) {
                            insertBeforeChildren.push.apply(insertBeforeChildren, tslib_1.__spread(item.dnode.rendered));
                        }
                    }
                    else {
                        if (insertBefore.domNode) {
                            if (insertBefore.domNode.parentElement !== parentVNode.domNode) {
                                break;
                            }
                            insertBeforeDomNode = insertBefore.domNode;
                            break;
                        }
                    }
                    if (insertBeforeChildren.length === 0 && childrenArray[nextIndex]) {
                        insertBeforeChildren.push(childrenArray[nextIndex]);
                        nextIndex++;
                    }
                }
            }
            createDom(newChild, parentVNode, newChildren.slice(newIndex + 1), insertBeforeDomNode, projectionOptions, parentInstance);
            nodeAdded(newChild, transitions);
            var indexToCheck = newIndex;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(newChildren, indexToCheck, parentInstance);
            });
        };
        if (!oldChild || findOldIndex === -1) {
            addChild();
            newIndex++;
            return "continue";
        }
        var removeChild = function () {
            var indexToCheck = oldIndex;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            if (d_1.isWNode(oldChild)) {
                var item = instanceMap.get(oldChild.instance);
                if (item) {
                    oldChild = item.dnode;
                }
            }
            nodeToRemove(oldChild, transitions, projectionOptions);
        };
        var findNewIndex = findIndexOfChild(newChildren, oldChild, newIndex + 1);
        if (findNewIndex === -1) {
            removeChild();
            oldIndex++;
            return "continue";
        }
        addChild();
        removeChild();
        oldIndex++;
        newIndex++;
    };
    while (newIndex < newChildrenLength) {
        _loop_1();
    }
    if (oldChildrenLength > oldIndex) {
        var _loop_2 = function () {
            var indexToCheck = i;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            var childToRemove = oldChildren[i];
            if (d_1.isWNode(childToRemove)) {
                var item = instanceMap.get(childToRemove.instance);
                if (item) {
                    childToRemove = item.dnode;
                }
            }
            nodeToRemove(childToRemove, transitions, projectionOptions);
        };
        // Remove child fragments
        for (i = oldIndex; i < oldChildrenLength; i++) {
            _loop_2();
        }
    }
    return textUpdated;
}
function addChildren(parentVNode, children, projectionOptions, parentInstance, insertBefore, childNodes) {
    if (insertBefore === void 0) { insertBefore = undefined; }
    if (children === undefined) {
        return;
    }
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.merge && childNodes === undefined) {
        childNodes = array_1.from(parentVNode.domNode.childNodes);
    }
    var transitions = projectionOptions.transitions;
    projectionOptions = tslib_1.__assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var nextSiblings = children.slice(i + 1);
        if (d_1.isVNode(child)) {
            if (projectorState.merge && childNodes) {
                var domElement = undefined;
                while (child.domNode === undefined && childNodes.length > 0) {
                    domElement = childNodes.shift();
                    if (domElement && domElement.tagName === (child.tag.toUpperCase() || undefined)) {
                        child.domNode = domElement;
                    }
                }
            }
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance);
        }
        else {
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes);
        }
        nodeAdded(child, transitions);
    }
}
function initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions) {
    addChildren(dnode, dnode.children, projectionOptions, parentInstance, undefined);
    if (typeof dnode.deferredPropertiesCallback === 'function' && dnode.inserted === undefined) {
        addDeferredProperties(dnode, projectionOptions);
    }
    if (dnode.attributes && dnode.events) {
        updateAttributes(domNode, {}, dnode.attributes, projectionOptions);
        updateProperties(domNode, {}, dnode.properties, projectionOptions, false);
        removeOrphanedEvents(domNode, {}, dnode.events, projectionOptions, true);
        var events_1 = dnode.events;
        Object.keys(events_1).forEach(function (event) {
            updateEvent(domNode, event, events_1[event], projectionOptions, dnode.properties.bind);
        });
    }
    else {
        updateProperties(domNode, {}, dnode.properties, projectionOptions);
    }
    if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
        var instanceData = exports.widgetInstanceMap.get(parentInstance);
        instanceData.nodeHandler.add(domNode, "" + dnode.properties.key);
    }
    dnode.inserted = true;
}
function createDom(dnode, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes) {
    var domNode;
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (d_1.isWNode(dnode)) {
        var widgetConstructor = dnode.widgetConstructor;
        var parentInstanceData = exports.widgetInstanceMap.get(parentInstance);
        if (!Registry_1.isWidgetBaseConstructor(widgetConstructor)) {
            var item = parentInstanceData.registry().get(widgetConstructor);
            if (item === null) {
                return;
            }
            widgetConstructor = item;
        }
        var instance_1 = new widgetConstructor();
        dnode.instance = instance_1;
        nextSiblingMap.set(instance_1, nextSiblings);
        var instanceData_1 = exports.widgetInstanceMap.get(instance_1);
        instanceData_1.invalidate = function () {
            instanceData_1.dirty = true;
            if (instanceData_1.rendering === false) {
                projectorState.renderQueue.push({ instance: instance_1, depth: projectionOptions.depth });
                scheduleRender(projectionOptions);
            }
        };
        instanceData_1.rendering = true;
        instance_1.__setCoreProperties__(dnode.coreProperties);
        instance_1.__setChildren__(dnode.children);
        instance_1.__setProperties__(dnode.properties);
        var rendered = instance_1.__render__();
        instanceData_1.rendering = false;
        if (rendered) {
            var filteredRendered = filterAndDecorateChildren(rendered, instance_1);
            dnode.rendered = filteredRendered;
            addChildren(parentVNode, filteredRendered, projectionOptions, instance_1, insertBefore, childNodes);
        }
        instanceMap.set(instance_1, { dnode: dnode, parentVNode: parentVNode });
        instanceData_1.nodeHandler.addRoot();
        projectorState.afterRenderCallbacks.push(function () {
            instanceData_1.onAttach();
        });
    }
    else {
        if (projectorState.merge && projectorState.mergeElement !== undefined) {
            domNode = dnode.domNode = projectionOptions.mergeElement;
            projectorState.mergeElement = undefined;
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            return;
        }
        var doc = parentVNode.domNode.ownerDocument;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.domNode !== undefined && parentVNode.domNode) {
                var newDomNode = dnode.domNode.ownerDocument.createTextNode(dnode.text);
                if (parentVNode.domNode === dnode.domNode.parentNode) {
                    parentVNode.domNode.replaceChild(newDomNode, dnode.domNode);
                }
                else {
                    parentVNode.domNode.appendChild(newDomNode);
                    dnode.domNode.parentNode && dnode.domNode.parentNode.removeChild(dnode.domNode);
                }
                dnode.domNode = newDomNode;
            }
            else {
                domNode = dnode.domNode = doc.createTextNode(dnode.text);
                if (insertBefore !== undefined) {
                    parentVNode.domNode.insertBefore(domNode, insertBefore);
                }
                else {
                    parentVNode.domNode.appendChild(domNode);
                }
            }
        }
        else {
            if (dnode.domNode === undefined) {
                if (dnode.tag === 'svg') {
                    projectionOptions = tslib_1.__assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
                }
                if (projectionOptions.namespace !== undefined) {
                    domNode = dnode.domNode = doc.createElementNS(projectionOptions.namespace, dnode.tag);
                }
                else {
                    domNode = dnode.domNode = dnode.domNode || doc.createElement(dnode.tag);
                }
            }
            else {
                domNode = dnode.domNode;
            }
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            if (insertBefore !== undefined) {
                parentVNode.domNode.insertBefore(domNode, insertBefore);
            }
            else if (domNode.parentNode !== parentVNode.domNode) {
                parentVNode.domNode.appendChild(domNode);
            }
        }
    }
}
function updateDom(previous, dnode, projectionOptions, parentVNode, parentInstance, oldNextSiblings, nextSiblings) {
    if (d_1.isWNode(dnode)) {
        var instance = previous.instance;
        var _a = instanceMap.get(instance), parentVNode_1 = _a.parentVNode, node = _a.dnode;
        var previousRendered = node ? node.rendered : previous.rendered;
        var instanceData = exports.widgetInstanceMap.get(instance);
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        nextSiblingMap.set(instance, nextSiblings);
        dnode.instance = instance;
        if (instanceData.dirty === true) {
            var rendered = instance.__render__();
            instanceData.rendering = false;
            dnode.rendered = filterAndDecorateChildren(rendered, instance);
            updateChildren(parentVNode_1, oldNextSiblings, previousRendered, dnode.rendered, instance, projectionOptions);
        }
        else {
            instanceData.rendering = false;
            dnode.rendered = previousRendered;
        }
        instanceMap.set(instance, { dnode: dnode, parentVNode: parentVNode_1 });
        instanceData.nodeHandler.addRoot();
    }
    else {
        if (previous === dnode) {
            return false;
        }
        var domNode_2 = (dnode.domNode = previous.domNode);
        var textUpdated = false;
        var updated = false;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.text !== previous.text) {
                var newDomNode = domNode_2.ownerDocument.createTextNode(dnode.text);
                domNode_2.parentNode.replaceChild(newDomNode, domNode_2);
                dnode.domNode = newDomNode;
                textUpdated = true;
                return textUpdated;
            }
        }
        else {
            if (dnode.tag && dnode.tag.lastIndexOf('svg', 0) === 0) {
                projectionOptions = tslib_1.__assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.children !== dnode.children) {
                var children = filterAndDecorateChildren(dnode.children, parentInstance);
                dnode.children = children;
                updated =
                    updateChildren(dnode, oldNextSiblings, previous.children, children, parentInstance, projectionOptions) || updated;
            }
            var previousProperties_1 = buildPreviousProperties(domNode_2, previous, dnode);
            if (dnode.attributes && dnode.events) {
                updateAttributes(domNode_2, previousProperties_1.attributes, dnode.attributes, projectionOptions);
                updated =
                    updateProperties(domNode_2, previousProperties_1.properties, dnode.properties, projectionOptions, false) || updated;
                removeOrphanedEvents(domNode_2, previousProperties_1.events, dnode.events, projectionOptions, true);
                var events_2 = dnode.events;
                Object.keys(events_2).forEach(function (event) {
                    updateEvent(domNode_2, event, events_2[event], projectionOptions, dnode.properties.bind, previousProperties_1.events[event]);
                });
            }
            else {
                updated =
                    updateProperties(domNode_2, previousProperties_1.properties, dnode.properties, projectionOptions) ||
                        updated;
            }
            if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
                var instanceData = exports.widgetInstanceMap.get(parentInstance);
                instanceData.nodeHandler.add(domNode_2, "" + dnode.properties.key);
            }
        }
        if (updated && dnode.properties && dnode.properties.updateAnimation) {
            dnode.properties.updateAnimation(domNode_2, dnode.properties, previous.properties);
        }
    }
}
function addDeferredProperties(vnode, projectionOptions) {
    // transfer any properties that have been passed - as these must be decorated properties
    vnode.decoratedDeferredProperties = vnode.properties;
    var properties = vnode.deferredPropertiesCallback(!!vnode.inserted);
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    vnode.properties = tslib_1.__assign({}, properties, vnode.decoratedDeferredProperties);
    projectorState.deferredRenderCallbacks.push(function () {
        var properties = tslib_1.__assign({}, vnode.deferredPropertiesCallback(!!vnode.inserted), vnode.decoratedDeferredProperties);
        updateProperties(vnode.domNode, vnode.properties, properties, projectionOptions);
        vnode.properties = properties;
    });
}
function runDeferredRenderCallbacks(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.deferredRenderCallbacks.length) {
        if (projectionOptions.sync) {
            while (projectorState.deferredRenderCallbacks.length) {
                var callback = projectorState.deferredRenderCallbacks.shift();
                callback && callback();
            }
        }
        else {
            global_1.default.requestAnimationFrame(function () {
                while (projectorState.deferredRenderCallbacks.length) {
                    var callback = projectorState.deferredRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function runAfterRenderCallbacks(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        while (projectorState.afterRenderCallbacks.length) {
            var callback = projectorState.afterRenderCallbacks.shift();
            callback && callback();
        }
    }
    else {
        if (global_1.default.requestIdleCallback) {
            global_1.default.requestIdleCallback(function () {
                while (projectorState.afterRenderCallbacks.length) {
                    var callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
        else {
            setTimeout(function () {
                while (projectorState.afterRenderCallbacks.length) {
                    var callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function scheduleRender(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        render(projectionOptions);
    }
    else if (projectorState.renderScheduled === undefined) {
        projectorState.renderScheduled = global_1.default.requestAnimationFrame(function () {
            render(projectionOptions);
        });
    }
}
function render(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectorState.renderScheduled = undefined;
    var renderQueue = projectorState.renderQueue;
    var renders = tslib_1.__spread(renderQueue);
    projectorState.renderQueue = [];
    renders.sort(function (a, b) { return a.depth - b.depth; });
    var previouslyRendered = [];
    while (renders.length) {
        var instance = renders.shift().instance;
        if (instanceMap.has(instance) && previouslyRendered.indexOf(instance) === -1) {
            previouslyRendered.push(instance);
            var _a = instanceMap.get(instance), parentVNode = _a.parentVNode, dnode = _a.dnode;
            var instanceData = exports.widgetInstanceMap.get(instance);
            var nextSiblings = nextSiblingMap.get(instance);
            updateDom(dnode, toInternalWNode(instance, instanceData), projectionOptions, parentVNode, instance, nextSiblings, nextSiblings);
        }
    }
    runAfterRenderCallbacks(projectionOptions);
    runDeferredRenderCallbacks(projectionOptions);
}
exports.dom = {
    append: function (parentNode, instance, projectionOptions) {
        if (projectionOptions === void 0) { projectionOptions = {}; }
        var instanceData = exports.widgetInstanceMap.get(instance);
        var finalProjectorOptions = getProjectionOptions(projectionOptions, instance);
        var projectorState = {
            afterRenderCallbacks: [],
            deferredRenderCallbacks: [],
            nodeMap: new WeakMap_1.default(),
            renderScheduled: undefined,
            renderQueue: [],
            merge: projectionOptions.merge || false,
            mergeElement: projectionOptions.mergeElement
        };
        projectorStateMap.set(instance, projectorState);
        finalProjectorOptions.rootNode = parentNode;
        var parentVNode = toParentVNode(finalProjectorOptions.rootNode);
        var node = toInternalWNode(instance, instanceData);
        instanceMap.set(instance, { dnode: node, parentVNode: parentVNode });
        instanceData.invalidate = function () {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance: instance, depth: finalProjectorOptions.depth });
                scheduleRender(finalProjectorOptions);
            }
        };
        updateDom(node, node, finalProjectorOptions, parentVNode, instance, [], []);
        projectorState.afterRenderCallbacks.push(function () {
            instanceData.onAttach();
        });
        runDeferredRenderCallbacks(finalProjectorOptions);
        runAfterRenderCallbacks(finalProjectorOptions);
        return {
            domNode: finalProjectorOptions.rootNode
        };
    },
    create: function (instance, projectionOptions) {
        return this.append(document.createElement('div'), instance, projectionOptions);
    },
    merge: function (element, instance, projectionOptions) {
        if (projectionOptions === void 0) { projectionOptions = {}; }
        projectionOptions.merge = true;
        projectionOptions.mergeElement = element;
        var projection = this.append(element.parentNode, instance, projectionOptions);
        var projectorState = projectorStateMap.get(instance);
        projectorState.merge = false;
        return projection;
    }
};

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/widgets-web/addon/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var array_1 = __webpack_require__("./node_modules/@dojo/shim/array.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/addon/styles/addon.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var AddonBase = /** @class */ (function (_super) {
    tslib_1.__extends(AddonBase, _super);
    function AddonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddonBase.prototype.getKey = function () {
        return 'addon';
    };
    AddonBase.prototype.isCheckboxOrRadio = function (node) {
        var childKey = node.properties.key;
        if (childKey === 'checkbox' || childKey === 'radio') {
            return true;
        }
        else {
            return false;
        }
    };
    AddonBase.prototype.render = function () {
        var _this = this;
        var _a = this.properties, widgetId = _a.widgetId, value = _a.value, position = _a.position;
        var cssClass = ['input-group-prepend'];
        if (position && position === 'append') {
            cssClass = ['input-group-append'];
        }
        var children = [];
        if (value) {
            children.push(d_1.v('span', {
                classes: tslib_1.__spread(['input-group-text'], util_1.getColorsClasses(this.properties))
            }, [value]));
        }
        else {
            var checkboxOrRadioNode = array_1.find(this.children, function (child) {
                if (child) {
                    return _this.isCheckboxOrRadio(child);
                }
                return false;
            });
            if (checkboxOrRadioNode) {
                children.push(d_1.v('div', { classes: tslib_1.__spread(['input-group-text'], util_1.getColorsClasses(this.properties)) }, this.children));
            }
            else {
                cssClass = cssClass.concat(util_1.getColorsClasses(this.properties));
                children = this.children;
            }
        }
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([this.theme(css.root)], cssClass)
        }, children);
    };
    AddonBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-addon',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: ['widgetId', 'value', 'position', 'textColor', 'backgroundColor'],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], AddonBase);
    return AddonBase;
}(exports.ThemedBase));
exports.AddonBase = AddonBase;
var Addon = /** @class */ (function (_super) {
    tslib_1.__extends(Addon, _super);
    function Addon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Addon;
}(AddonBase));
exports.default = Addon;

/***/ }),

/***/ "./node_modules/widgets-web/addon/styles/addon.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/addon/styles/addon.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/addon/styles/addon.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"JI4UgCcn"," _key":"widgets-web/addon"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/badge/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/badge/styles/badge.m.css.js");
var button_1 = __webpack_require__("./node_modules/widgets-web/button/index.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var BadgeBase = /** @class */ (function (_super) {
    tslib_1.__extends(BadgeBase, _super);
    function BadgeBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadgeBase.prototype.getKey = function () {
        return 'badge';
    };
    BadgeBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, value = _a.value, valuePosition = _a.valuePosition, appearance = _a.appearance, pill = _a.pill, href = _a.href, target = _a.target;
        var tag = 'span';
        var cssClasses = [];
        if (href) {
            tag = 'a';
        }
        if (target) {
            target = button_1.targetMap[target] || target;
        }
        if (appearance && appearance !== 'default') {
            cssClasses.push("badge-" + appearance);
        }
        if (pill === true || pill === 'true') {
            cssClasses.push('badge-pill');
        }
        var children;
        if (value && valuePosition && valuePosition === 'left') {
            children = tslib_1.__spread([value], this.children);
        }
        else {
            children = tslib_1.__spread(this.children, [value]);
        }
        return d_1.v(tag, {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([this.theme(css.root), 'badge'], cssClasses, util_1.getSpacingClasses(this.properties)),
            href: href,
            target: target
        }, children);
    };
    BadgeBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-badge',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'value',
                'valuePosition',
                'appearance',
                'pill',
                'href',
                'target',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], BadgeBase);
    return BadgeBase;
}(exports.ThemedBase));
exports.BadgeBase = BadgeBase;
var Badge = /** @class */ (function (_super) {
    tslib_1.__extends(Badge, _super);
    function Badge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Badge;
}(BadgeBase));
exports.default = Badge;

/***/ }),

/***/ "./node_modules/widgets-web/badge/styles/badge.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/badge/styles/badge.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/badge/styles/badge.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3kqiCM0p"," _key":"widgets-web/badge"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/button/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var css = __webpack_require__("./node_modules/widgets-web/button/styles/button.m.css.js");
exports.sizeMap = {
    large: 'btn-lg',
    small: 'btn-sm',
    default: ''
};
exports.targetMap = {
    self: '_self',
    blank: '_blank'
};
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ButtonBase = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonBase, _super);
    function ButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBase.prototype.getKey = function () {
        return 'button';
    };
    ButtonBase.prototype._onClick = function (event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick();
    };
    ButtonBase.prototype.renderChildren = function () {
        var _a = this.properties, value = _a.value, valuePosition = _a.valuePosition;
        if (!value || value === '') {
            return this.children;
        }
        if (!valuePosition || valuePosition === '') {
            return tslib_1.__spread(this.children, [value]);
        }
        if (valuePosition === 'left') {
            return tslib_1.__spread([value], this.children);
        }
        if (valuePosition === 'top') {
            return tslib_1.__spread([
                d_1.v('span', {
                    classes: ['d-block']
                }, [value])
            ], this.children);
        }
        if (valuePosition === 'bottom') {
            return tslib_1.__spread(this.children, [
                d_1.v('span', {
                    classes: ['d-block']
                }, [value])
            ]);
        }
        return tslib_1.__spread(this.children, [value]);
    };
    ButtonBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, appearance = _a.appearance, size = _a.size, disabled = _a.disabled, type = _a.type, fluid = _a.fluid, active = _a.active, href = _a.href, target = _a.target, _b = _a.isListItem, isListItem = _b === void 0 ? false : _b;
        var sizeClass = exports.sizeMap[size];
        if (target) {
            target = exports.targetMap[target] || target;
        }
        var children = this.renderChildren();
        if (href) {
            // 使用a标签
            return d_1.v('a', {
                id: widgetId,
                key: this.getKey(),
                href: "" + href,
                target: target,
                classes: isListItem
                    ? [
                        this.theme(css.root),
                        'list-group-item',
                        'list-group-item-action',
                        appearance && appearance !== 'default' ? "list-group-item-" + appearance : undefined,
                        active === true || active === 'true' ? 'active' : undefined
                    ]
                    : [
                        this.theme(css.root),
                        'btn',
                        appearance && appearance !== 'default' ? "btn-" + appearance : undefined,
                        sizeClass !== '' ? sizeClass : undefined,
                        fluid === true || fluid === 'true' ? 'btn-block' : undefined,
                        active === true || active === 'true' ? 'active' : undefined
                    ],
                role: 'button'
            }, children);
        }
        else {
            return d_1.v('button', {
                id: widgetId,
                key: this.getKey(),
                classes: isListItem
                    ? [
                        this.theme(css.root),
                        'list-group-item',
                        'list-group-item-action',
                        appearance && appearance !== 'default' ? "list-group-item-" + appearance : undefined,
                        active === true || active === 'true' ? 'active' : undefined
                    ]
                    : [
                        this.theme(css.root),
                        'btn',
                        appearance && appearance !== 'default' ? "btn-" + appearance : undefined,
                        sizeClass !== '' ? sizeClass : undefined,
                        fluid === true || fluid === 'true' ? 'btn-block' : undefined,
                        active === true || active === 'true' ? 'active' : undefined
                    ],
                disabled: disabled === true || disabled === 'true',
                type: type,
                onclick: this._onClick
            }, children);
        }
    };
    ButtonBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-button',
            attributes: [
                'widgetId',
                'value',
                'valuePosition',
                'appearance',
                'size',
                'disabled',
                'type',
                'fluid',
                'active',
                'href',
                'target',
                'isListItem'
            ],
            properties: [],
            events: ['onClick']
        }),
        Themed_1.theme(css)
    ], ButtonBase);
    return ButtonBase;
}(exports.ThemedBase));
exports.ButtonBase = ButtonBase;
var Button = /** @class */ (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(ButtonBase));
exports.default = Button;

/***/ }),

/***/ "./node_modules/widgets-web/button/styles/button.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/button/styles/button.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/button/styles/button.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1PiFQWJr"," _key":"widgets-web/button"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/card/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var string_1 = __webpack_require__("./node_modules/@dojo/shim/string.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/card/styles/card.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var CardBase = /** @class */ (function (_super) {
    tslib_1.__extends(CardBase, _super);
    function CardBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardBase.prototype.getKey = function () {
        return 'card';
    };
    CardBase.prototype._getStyles = function () {
        var _a = this.properties, width = _a.width, height = _a.height;
        var cssStyles = {};
        if (width) {
            if (typeof width === 'number') {
                cssStyles.width = width + "px";
            }
            else if (string_1.endsWith(width, '%') || width === 'auto') {
                cssStyles.width = width;
            }
            else {
                cssStyles.width = width + "px";
            }
        }
        if (height) {
            if (typeof height === 'number') {
                cssStyles.height = height + "px";
            }
            else if (string_1.endsWith(height, '%') || height === 'auto') {
                cssStyles.height = height;
            }
            else {
                cssStyles.height = height + "px";
            }
        }
        return cssStyles;
    };
    CardBase.prototype.render = function () {
        var widgetId = this.properties.widgetId;
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'card'
            ], util_1.getSpacingClasses(this.properties), util_1.getTextClasses(this.properties), util_1.getTextDecorationClass(this.properties), util_1.getColorsClasses(this.properties), util_1.getBorderClasses(this.properties)),
            styles: tslib_1.__assign({}, util_1.getTextStyles(this.properties), this._getStyles())
        }, this.children);
    };
    CardBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-card',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'width',
                'height',
                'borderLeft',
                'borderTop',
                'borderRight',
                'borderBottom',
                'borderColor',
                'borderRound',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'textColor',
                'backgroundColor'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], CardBase);
    return CardBase;
}(exports.ThemedBase));
exports.CardBase = CardBase;
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Card;
}(CardBase));
exports.default = Card;

/***/ }),

/***/ "./node_modules/widgets-web/card/styles/card.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/card/styles/card.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/card/styles/card.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1Xj13t8H"," _key":"widgets-web/card"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/checkbox/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var uuid_1 = __webpack_require__("./node_modules/@dojo/core/uuid.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/checkbox/styles/checkbox.m.css.js");
var label_1 = __webpack_require__("./node_modules/widgets-web/label/index.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var CheckboxBase = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxBase, _super);
    function CheckboxBase() {
        var _this = _super.call(this) || this;
        _this._uuid = uuid_1.default();
        return _this;
    }
    CheckboxBase.prototype.getKey = function () {
        return 'checkbox';
    };
    CheckboxBase.prototype.renderCheckbox = function () {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, name = _a.name, value = _a.value, checked = _a.checked, disabled = _a.disabled, required = _a.required, readOnly = _a.readOnly;
        var cssClasses = [];
        if (disabled === true || disabled === 'true') {
            cssClasses.push('disabled');
        }
        return d_1.v('input', {
            type: 'checkbox',
            id: widgetId,
            name: name,
            value: value,
            checked: checked === true || checked === 'true',
            disabled: disabled === true || disabled === 'true',
            required: required === true || required === 'true',
            readOnly: readOnly === true || readOnly === 'true',
            classes: ['form-check-input']
        });
    };
    CheckboxBase.prototype.render = function () {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, label = _a.label, size = _a.size, labelAfter = _a.labelAfter, fluid = _a.fluid, display = _a.display, value = _a.value, checked = _a.checked, disabled = _a.disabled, required = _a.required, readOnly = _a.readOnly, _c = _a.isInAddon, isInAddon = _c === void 0 ? false : _c;
        if (isInAddon) {
            return d_1.v('input', {
                id: widgetId,
                key: this.getKey(),
                type: 'checkbox',
                name: name,
                value: value,
                checked: checked === true || checked === 'true',
                disabled: disabled === true || disabled === 'true',
                required: required === true || required === 'true',
                readOnly: readOnly === true || readOnly === 'true',
                classes: tslib_1.__spread([
                    size ? util_1.formSizeMap[size] : undefined
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
            });
        }
        var children = [
            this.renderCheckbox(),
            label ? d_1.w(label_1.default, { value: label, forId: widgetId, classes: 'form-check-label' }) : null
        ];
        if (labelAfter === false || labelAfter === 'false') {
            children = children.reverse();
        }
        children.push(util_1.renderMessageNode(this.properties));
        return d_1.v('div', {
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'form-check',
                size ? util_1.formSizeMap[size] : undefined,
                fluid === true || fluid === 'true' ? undefined : 'form-check-inline'
            ], util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
        }, children);
    };
    CheckboxBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-checkbox',
            attributes: [
                'widgetId',
                'name',
                'value',
                'checked',
                'label',
                'labelAfter',
                'required',
                'disabled',
                'readOnly',
                'fluid',
                'size',
                'invalidMessage',
                'validMessage',
                'isInAddon',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'alignSelf',
                'order',
                'display',
                'float'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], CheckboxBase);
    return CheckboxBase;
}(exports.ThemedBase));
exports.CheckboxBase = CheckboxBase;
var Checkbox = /** @class */ (function (_super) {
    tslib_1.__extends(Checkbox, _super);
    function Checkbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Checkbox;
}(CheckboxBase));
exports.default = Checkbox;

/***/ }),

/***/ "./node_modules/widgets-web/checkbox/styles/checkbox.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/checkbox/styles/checkbox.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/checkbox/styles/checkbox.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_2I7L7Hl6"," _key":"widgets-web/checkbox"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/common/base.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/common/base.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/common/base.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"textDecorationUnderline":"_1DUrXgmX","textDecorationLineThrough":"Un_y8JmT","textDecorationOverline":"_2A1tlA6Y"," _key":"widgets-web/base"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/common/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var css = __webpack_require__("./node_modules/widgets-web/common/base.m.css.js");
function getSpacingClasses(properties) {
    var marginTop = properties.marginTop, marginBottom = properties.marginBottom, marginLeft = properties.marginLeft, marginRight = properties.marginRight, paddingTop = properties.paddingTop, paddingBottom = properties.paddingBottom, paddingLeft = properties.paddingLeft, paddingRight = properties.paddingRight;
    var spacingClasses = [];
    if (marginTop &&
        marginTop != 'default' &&
        marginTop === marginBottom &&
        marginTop === marginLeft &&
        marginTop === marginRight) {
        spacingClasses.push("m-" + marginTop);
    }
    else {
        if (marginTop && marginTop != 'default' && marginTop === marginBottom) {
            spacingClasses.push("my-" + marginTop);
        }
        else {
            if (marginTop && marginTop != 'default') {
                spacingClasses.push("mt-" + marginTop);
            }
            if (marginBottom && marginBottom != 'default') {
                spacingClasses.push("mb-" + marginBottom);
            }
        }
        if (marginLeft && marginLeft != 'default' && marginLeft === marginRight) {
            spacingClasses.push("mx-" + marginLeft);
        }
        else {
            if (marginLeft && marginLeft != 'default') {
                spacingClasses.push("ml-" + marginLeft);
            }
            if (marginRight && marginRight != 'default') {
                spacingClasses.push("mr-" + marginRight);
            }
        }
    }
    if (paddingTop &&
        paddingTop != 'default' &&
        paddingTop === paddingBottom &&
        paddingTop === paddingLeft &&
        paddingTop === paddingRight) {
        spacingClasses.push("p-" + paddingTop);
    }
    else {
        if (paddingTop && paddingTop != 'default' && paddingTop === paddingBottom) {
            spacingClasses.push("py-" + paddingTop);
        }
        else {
            if (paddingTop && paddingTop != 'default') {
                spacingClasses.push("pt-" + paddingTop);
            }
            if (paddingBottom && paddingBottom != 'default') {
                spacingClasses.push("pb-" + paddingBottom);
            }
        }
        if (paddingLeft && paddingLeft != 'default' && paddingLeft === paddingRight) {
            spacingClasses.push("px-" + paddingLeft);
        }
        else {
            if (paddingLeft && paddingLeft != 'default') {
                spacingClasses.push("pl-" + paddingLeft);
            }
            if (paddingRight && paddingRight != 'default') {
                spacingClasses.push("pr-" + paddingRight);
            }
        }
    }
    return spacingClasses;
}
exports.getSpacingClasses = getSpacingClasses;
function getFlexContainerClasses(properties) {
    var flexDirection = properties.flexDirection, reverse = properties.reverse, justifyItems = properties.justifyItems, alignItems = properties.alignItems, flexWrap = properties.flexWrap, alignContent = properties.alignContent;
    var flexContainerClasses = [];
    if (flexDirection && flexDirection != 'default') {
        if (reverse === true || reverse === 'true') {
            flexContainerClasses.push("flex-" + flexDirection + "-reverse");
        }
        else {
            flexContainerClasses.push("flex-" + flexDirection);
        }
    }
    if (justifyItems && justifyItems != 'default') {
        flexContainerClasses.push("justify-content-" + justifyItems);
    }
    if (alignItems && alignItems != 'default') {
        flexContainerClasses.push("align-items-" + alignItems);
    }
    if (flexWrap && flexWrap != 'default') {
        if (flexWrap == 'reverseWrap') {
            flexContainerClasses.push('flex-wrap-reverse');
        }
        else {
            flexContainerClasses.push("flex-" + flexWrap);
        }
    }
    if (alignContent && alignContent != 'default') {
        flexContainerClasses.push("align-content-" + alignContent);
    }
    return flexContainerClasses;
}
exports.getFlexContainerClasses = getFlexContainerClasses;
function getFlexItemClasses(properties) {
    var alignSelf = properties.alignSelf, order = properties.order;
    var flexItemClasses = [];
    if (alignSelf && alignSelf != 'default') {
        flexItemClasses.push("align-self-" + alignSelf);
    }
    if ((order && order != 'default') || order === 0) {
        flexItemClasses.push("order-" + order);
    }
    return flexItemClasses;
}
exports.getFlexItemClasses = getFlexItemClasses;
function getBorderClasses(properties) {
    var borderLeft = properties.borderLeft, borderTop = properties.borderTop, borderRight = properties.borderRight, borderBottom = properties.borderBottom, borderColor = properties.borderColor, borderRound = properties.borderRound;
    var borderClasses = [];
    if (borderLeft === true || borderLeft === 'true') {
        borderClasses.push('border-left');
    }
    if (borderTop === true || borderTop === 'true') {
        borderClasses.push('border-top');
    }
    if (borderRight === true || borderRight === 'true') {
        borderClasses.push('border-right');
    }
    if (borderBottom === true || borderBottom === 'true') {
        borderClasses.push('border-bottom');
    }
    if (borderClasses.length === 4) {
        borderClasses = ['border'];
    }
    if (borderColor && borderColor != 'default') {
        borderClasses.push("border-" + borderColor);
    }
    if (borderRound) {
        if (borderRound === 'default') {
            borderClasses.push('rounded-0');
        }
        else if (borderRound === 'all') {
            borderClasses.push('rounded');
        }
        else {
            borderClasses.push("rounded-" + borderRound);
        }
    }
    return borderClasses;
}
exports.getBorderClasses = getBorderClasses;
function getTextClasses(properties) {
    var fontWeight = properties.fontWeight, fontItalic = properties.fontItalic, alignment = properties.alignment, transform = properties.transform, truncate = properties.truncate, wrap = properties.wrap;
    var textClasses = [];
    if (fontWeight && fontWeight != 'default') {
        textClasses.push("font-weight-" + fontWeight);
    }
    if (fontItalic === true || fontItalic === 'true') {
        textClasses.push('font-italic');
    }
    if (alignment && alignment != 'default') {
        textClasses.push("text-" + alignment);
    }
    if (transform && transform != 'default') {
        textClasses.push("text-" + transform);
    }
    if (truncate && truncate != 'default') {
        textClasses.push('text-truncate');
    }
    if (wrap) {
        textClasses.push('text-nowrap');
    }
    return textClasses;
}
exports.getTextClasses = getTextClasses;
function getTextStyles(properties) {
    var truncate = properties.truncate, wrap = properties.wrap;
    var textStyles = {};
    if (truncate && truncate != 'default') {
        if (typeof truncate == 'number') {
            textStyles.maxWidth = truncate + "px";
        }
        else {
            textStyles.maxWidth = "" + truncate;
        }
    }
    if (wrap) {
        textStyles.width = wrap + "rem";
    }
    return textStyles;
}
exports.getTextStyles = getTextStyles;
exports.textDecorationMap = {
    underline: 'textDecorationUnderline',
    overline: 'textDecorationOverline',
    lineThrough: 'textDecorationLineThrough',
    default: ''
};
function getTextDecorationClass(properties) {
    var textDecoration = properties.textDecoration;
    var textClasses = [];
    if (textDecoration && textDecoration !== 'default') {
        var textDecorationClass = exports.textDecorationMap[textDecoration];
        textClasses.push(css[textDecorationClass]);
    }
    return textClasses;
}
exports.getTextDecorationClass = getTextDecorationClass;
function getColorsClasses(properties) {
    var textColor = properties.textColor, backgroundColor = properties.backgroundColor;
    var colorsClasses = [];
    if (textColor && textColor !== 'default') {
        colorsClasses.push("text-" + textColor);
    }
    if (backgroundColor && backgroundColor !== 'default') {
        colorsClasses.push("bg-" + backgroundColor);
    }
    return colorsClasses;
}
exports.getColorsClasses = getColorsClasses;
function getFloatClass(properties) {
    var float = properties.float;
    var floatClasses = [];
    if (float && float !== 'default') {
        floatClasses.push("float-" + float);
    }
    return floatClasses;
}
exports.getFloatClass = getFloatClass;
function renderMessageNode(properties) {
    var invalidMessage = properties.invalidMessage, validMessage = properties.validMessage;
    if (!invalidMessage && !validMessage) {
        return null;
    }
    return d_1.v('div', {
        classes: [invalidMessage ? 'invalid-tooltip' : validMessage ? 'valid-tooltip' : '']
    }, [invalidMessage ? invalidMessage : validMessage ? validMessage : '']);
}
exports.renderMessageNode = renderMessageNode;
exports.formSizeMap = {
    small: 'form-control-sm',
    large: 'form-control-lg',
    default: ''
};
exports.displayMap = {
    none: 'd-none',
    inline: 'd-inline',
    inlineBlock: 'd-inline-block',
    block: 'd-block',
    table: 'd-table',
    tableCell: 'd-table-cell',
    tableRow: 'd-table-row',
    flex: 'd-flex',
    inlineFlex: 'd-inline-flex',
    default: ''
};
function getDisplayClass(properties) {
    var display = properties.display;
    return exports.displayMap[display] || undefined;
}
exports.getDisplayClass = getDisplayClass;

/***/ }),

/***/ "./node_modules/widgets-web/container/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var css = __webpack_require__("./node_modules/widgets-web/container/styles/container.m.css.js");
var string_1 = __webpack_require__("./node_modules/@dojo/shim/string.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ContainerBase = /** @class */ (function (_super) {
    tslib_1.__extends(ContainerBase, _super);
    function ContainerBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerBase.prototype.getKey = function () {
        return 'container';
    };
    ContainerBase.prototype._getMaxWidthStyles = function () {
        var maxWidth = this.properties.maxWidth;
        var maxWidthStyles = {};
        if (maxWidth) {
            if (typeof maxWidth == 'number') {
                maxWidthStyles.maxWidth = maxWidth + "px";
            }
            else if (string_1.endsWith(maxWidth, '%')) {
                maxWidthStyles.maxWidth = maxWidth;
            }
            else {
                maxWidthStyles.maxWidth = maxWidth + "px";
            }
        }
        else {
            maxWidthStyles.maxWidth = undefined;
        }
        return maxWidthStyles;
    };
    ContainerBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, fluid = _a.fluid;
        var cssClass = fluid === true || fluid === 'true' ? 'container-fluid' : 'container';
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: [this.theme(css.root), cssClass],
            styles: this._getMaxWidthStyles()
        }, this.children);
    };
    ContainerBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-container',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: ['widgetId', 'fluid', 'maxWidth'],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], ContainerBase);
    return ContainerBase;
}(exports.ThemedBase));
exports.ContainerBase = ContainerBase;
var Container = /** @class */ (function (_super) {
    tslib_1.__extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Container;
}(ContainerBase));
exports.default = Container;

/***/ }),

/***/ "./node_modules/widgets-web/container/styles/container.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/container/styles/container.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/container/styles/container.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"xwrIAYca"," _key":"widgets-web/container"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/footer/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/footer/styles/footer.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var FooterBase = /** @class */ (function (_super) {
    tslib_1.__extends(FooterBase, _super);
    function FooterBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FooterBase.prototype.getKey = function () {
        return 'footer';
    };
    FooterBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, display = _a.display;
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root)
            ], util_1.getSpacingClasses(this.properties), util_1.getTextClasses(this.properties), util_1.getTextDecorationClass(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses),
            styles: util_1.getTextStyles(this.properties)
        }, this.children);
    };
    FooterBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-footer',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], FooterBase);
    return FooterBase;
}(exports.ThemedBase));
exports.FooterBase = FooterBase;
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Footer;
}(FooterBase));
exports.default = Footer;

/***/ }),

/***/ "./node_modules/widgets-web/footer/styles/footer.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/footer/styles/footer.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/footer/styles/footer.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1A5o47U1"," _key":"widgets-web/footer"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/grid-column/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var css = __webpack_require__("./node_modules/widgets-web/grid-column/styles/grid-column.m.css.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var GridColumnBase = /** @class */ (function (_super) {
    tslib_1.__extends(GridColumnBase, _super);
    function GridColumnBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridColumnBase.prototype.getKey = function () {
        return 'grid-column';
    };
    GridColumnBase.prototype._getClasses = function () {
        var _a = this.properties, offset = _a.offset, colspan = _a.colspan;
        var cssClasses = [];
        if (colspan && colspan !== 'default' && colspan !== 1) {
            cssClasses.push("col-" + colspan);
        }
        else {
            cssClasses.push('col');
        }
        if ((offset && offset !== 'default') || offset === 0) {
            cssClasses.push("offset-" + offset);
        }
        return cssClasses;
    };
    GridColumnBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, display = _a.display;
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root)
            ], this._getClasses(), util_1.getBorderClasses(this.properties), util_1.getSpacingClasses(this.properties), util_1.getTextClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses, util_1.getFlexItemClasses(this.properties), util_1.getTextDecorationClass(this.properties)),
            styles: tslib_1.__assign({}, util_1.getTextStyles(this.properties))
        }, this.children);
    };
    GridColumnBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-grid-column',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'offset',
                'colspan',
                'borderLeft',
                'borderTop',
                'borderRight',
                'borderBottom',
                'borderColor',
                'borderRound',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent',
                'alignSelf',
                'order'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], GridColumnBase);
    return GridColumnBase;
}(exports.ThemedBase));
exports.GridColumnBase = GridColumnBase;
var GridColumn = /** @class */ (function (_super) {
    tslib_1.__extends(GridColumn, _super);
    function GridColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GridColumn;
}(GridColumnBase));
exports.default = GridColumn;

/***/ }),

/***/ "./node_modules/widgets-web/grid-column/styles/grid-column.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/grid-column/styles/grid-column.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/grid-column/styles/grid-column.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_17dE_yAD"," _key":"widgets-web/grid-column"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/grid-row/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var css = __webpack_require__("./node_modules/widgets-web/grid-row/styles/grid-row.m.css.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var GridRowBase = /** @class */ (function (_super) {
    tslib_1.__extends(GridRowBase, _super);
    function GridRowBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRowBase.prototype.getKey = function () {
        return 'grid-row';
    };
    GridRowBase.prototype._getGuttersClasses = function () {
        var gutters = this.properties.gutters;
        var guttersClasses = [];
        if (gutters === false || gutters === 'false') {
            guttersClasses.push('no-gutters');
        }
        return guttersClasses;
    };
    GridRowBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, display = _a.display;
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'row'
            ], this._getGuttersClasses(), util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses, util_1.getFlexItemClasses(this.properties))
        }, this.children);
    };
    GridRowBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-grid-row',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'gutters',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent',
                'alignSelf',
                'order'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], GridRowBase);
    return GridRowBase;
}(exports.ThemedBase));
exports.GridRowBase = GridRowBase;
var GridRow = /** @class */ (function (_super) {
    tslib_1.__extends(GridRow, _super);
    function GridRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GridRow;
}(GridRowBase));
exports.default = GridRow;

/***/ }),

/***/ "./node_modules/widgets-web/grid-row/styles/grid-row.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/grid-row/styles/grid-row.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/grid-row/styles/grid-row.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3-ttBCFp"," _key":"widgets-web/grid-row"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/image/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/image/styles/image.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ImageBase = /** @class */ (function (_super) {
    tslib_1.__extends(ImageBase, _super);
    function ImageBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageBase.prototype.getKey = function () {
        return 'image';
    };
    ImageBase.prototype.getImgClasses = function () {
        var _a = this.properties, fluid = _a.fluid, thumbnail = _a.thumbnail, alignment = _a.alignment;
        var cssClasses = [];
        if (fluid === true || fluid === 'true') {
            cssClasses.push('img-fluid');
        }
        if (thumbnail === true || thumbnail === 'true') {
            cssClasses.push('img-thumbnail');
        }
        if (alignment && alignment !== 'default') {
            if (alignment === 'center') {
                cssClasses.push('mx-auto');
                cssClasses.push('d-block');
            }
            else {
                cssClasses.push("float-" + alignment);
            }
        }
        return cssClasses;
    };
    ImageBase.prototype.getImgStyles = function () {
        var _a = this.properties, width = _a.width, height = _a.height;
        var cssStyles = {};
        if (width && width !== 'auto') {
            if (typeof width === 'number' || width.indexOf('%') === -1) {
                cssStyles.width = width + "px";
            }
            else {
                cssStyles.width = "" + width;
            }
        }
        if (height && height !== 'auto') {
            if (typeof height === 'number' || height.indexOf('%') === -1) {
                cssStyles.height = height + "px";
            }
            else {
                cssStyles.height = "" + height;
            }
        }
        return cssStyles;
    };
    ImageBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, src = _a.src, alt = _a.alt;
        return d_1.v('img', {
            id: widgetId,
            key: this.getKey(),
            src: src,
            alt: alt,
            classes: tslib_1.__spread([
                this.theme(css.root)
            ], this.getImgClasses(), util_1.getBorderClasses(this.properties), util_1.getSpacingClasses(this.properties)),
            styles: tslib_1.__assign({}, this.getImgStyles())
        }, this.children);
    };
    ImageBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-img',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'fluid',
                'thumbnail',
                'src',
                'alt',
                'width',
                'height',
                'alignment',
                'borderRound',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], ImageBase);
    return ImageBase;
}(exports.ThemedBase));
exports.ImageBase = ImageBase;
var Image = /** @class */ (function (_super) {
    tslib_1.__extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Image;
}(ImageBase));
exports.default = Image;

/***/ }),

/***/ "./node_modules/widgets-web/image/styles/image.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/image/styles/image.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/image/styles/image.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3CrD_BLz"," _key":"widgets-web/image"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/input-group/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var index_1 = __webpack_require__("./node_modules/widgets-web/label/index.js");
var css = __webpack_require__("./node_modules/widgets-web/input-group/styles/input-group.m.css.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
exports.sizeMap = {
    small: 'sm',
    large: 'lg'
};
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var InputGroupBase = /** @class */ (function (_super) {
    tslib_1.__extends(InputGroupBase, _super);
    function InputGroupBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputGroupBase.prototype.getKey = function () {
        return 'input-group';
    };
    InputGroupBase.prototype.renderInputGroup = function (key) {
        var _a = this.properties, widgetId = _a.widgetId, size = _a.size, label = _a.label, display = _a.display, labelPosition = _a.labelPosition;
        var sizeClass = '';
        if (size && size !== 'default') {
            sizeClass = "input-group-" + exports.sizeMap[size];
        }
        var classes = key === undefined
            ? ['input-group', sizeClass]
            : tslib_1.__spread([
                'input-group',
                sizeClass
            ], util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties));
        if (!(label && labelPosition && labelPosition === 'left')) {
            classes.push(this.theme(css.root));
        }
        return [
            label
                ? d_1.w(index_1.default, {
                    value: label,
                    classes: ['col-form-label', 'mr-3']
                })
                : null,
            d_1.v('div', {
                id: widgetId,
                key: key,
                classes: classes
            }, this.reOrderChildren())
        ];
    };
    InputGroupBase.prototype.reOrderChildren = function () {
        // 属性 position 需要结合子部件的位置来实现效果，故在此由程序根据 position 的值来自动调整子部件的位置
        var prependChildren = [];
        var inputChildren = [];
        var appendChildren = [];
        this.children.forEach(function (child, index) {
            if (child) {
                var childNode = child;
                var childKey = childNode.properties.key;
                var position = childNode.properties.position;
                if (childKey === 'addon') {
                    if (position && position === 'append') {
                        appendChildren.push(childNode);
                    }
                    else {
                        prependChildren.push(childNode);
                    }
                }
                else {
                    inputChildren.push(childNode);
                }
            }
        });
        return tslib_1.__spread(prependChildren, inputChildren, appendChildren);
    };
    InputGroupBase.prototype.render = function () {
        var _a = this.properties, label = _a.label, labelPosition = _a.labelPosition, display = _a.display;
        /**
         * bootstrap 中有三种 inline 实现：
         * 1. inline forms, 在 form 表单外放一个 inline form 布局管理器实现的,相当于 android 的水平 linearlayout；
         * 2. checkbox inline，直接处理每个 form 表单和 label；
         * 3. Form Grid 中的 Horizontal form，使用 Grid 布局，但是 Label 的宽度无法动态调整为任意值。
         *
         * 现在使用 第二种实现，当有更好的实现时，再完善此处代码。
         */
        if (label && labelPosition && labelPosition === 'left') {
            return d_1.v('div', {
                key: this.getKey(),
                classes: tslib_1.__spread([
                    this.theme(css.root),
                    'form-group',
                    'form-check-inline',
                    'w-100'
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
            }, this.renderInputGroup(undefined));
        }
        return this.renderInputGroup(this.getKey());
    };
    InputGroupBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-input-group',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'size',
                'label',
                'labelPosition',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'display',
                'alignSelf',
                'order',
                'float'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], InputGroupBase);
    return InputGroupBase;
}(exports.ThemedBase));
exports.InputGroupBase = InputGroupBase;
var InputGroup = /** @class */ (function (_super) {
    tslib_1.__extends(InputGroup, _super);
    function InputGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InputGroup;
}(InputGroupBase));
exports.default = InputGroup;

/***/ }),

/***/ "./node_modules/widgets-web/input-group/styles/input-group.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/input-group/styles/input-group.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/input-group/styles/input-group.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3YL9chYX"," _key":"widgets-web/input-group"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/label/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var css = __webpack_require__("./node_modules/widgets-web/label/styles/label.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var LabelBase = /** @class */ (function (_super) {
    tslib_1.__extends(LabelBase, _super);
    function LabelBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabelBase.prototype.getKey = function () {
        return 'label';
    };
    LabelBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, value = _a.value, forId = _a.forId, classes = _a.classes;
        if (classes && typeof classes === 'string') {
            classes = [classes];
        }
        return d_1.v('label', {
            id: widgetId,
            key: this.getKey(),
            for: forId,
            classes: classes
                ? tslib_1.__spread([this.theme(css.root), css.fontDirection], classes) : [this.theme(css.root), css.fontDirection]
        }, tslib_1.__spread([value], this.children));
    };
    LabelBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-label',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: ['widgetId', 'value', 'forId'],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], LabelBase);
    return LabelBase;
}(exports.ThemedBase));
exports.LabelBase = LabelBase;
var Label = /** @class */ (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Label;
}(LabelBase));
exports.default = Label;

/***/ }),

/***/ "./node_modules/widgets-web/label/styles/label.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/label/styles/label.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/label/styles/label.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3ircP3sd","fontDirection":"p9kPAxTF"," _key":"widgets-web/label"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/link/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/link/styles/link.m.css.js");
var button_1 = __webpack_require__("./node_modules/widgets-web/button/index.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var LinkBase = /** @class */ (function (_super) {
    tslib_1.__extends(LinkBase, _super);
    function LinkBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkBase.prototype.getKey = function () {
        return 'link';
    };
    LinkBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, _b = _a.href, href = _b === void 0 ? '#' : _b, target = _a.target, value = _a.value, valuePosition = _a.valuePosition, _c = _a.isListItem, isListItem = _c === void 0 ? false : _c, appearance = _a.appearance, display = _a.display;
        if (target) {
            target = button_1.targetMap[target] || target;
        }
        var children;
        if (value && valuePosition && valuePosition === 'left') {
            children = tslib_1.__spread([value], this.children);
        }
        else {
            children = tslib_1.__spread(this.children, [value]);
        }
        return d_1.v('a', {
            id: widgetId,
            key: this.getKey(),
            href: href,
            target: target,
            classes: isListItem
                ? tslib_1.__spread([
                    this.theme(css.root),
                    'list-group-item',
                    'list-group-item-action'
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getTextClasses(this.properties), [
                    appearance && appearance !== 'default' ? "list-group-item-" + appearance : undefined
                ], util_1.getTextDecorationClass(this.properties)) : tslib_1.__spread([
                this.theme(css.root)
            ], util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getTextClasses(this.properties), util_1.getColorsClasses(this.properties), util_1.getTextDecorationClass(this.properties)),
            styles: util_1.getTextStyles(this.properties)
        }, children);
    };
    LinkBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-link',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'href',
                'target',
                'value',
                'valuePosition',
                'isListItem',
                'appearance',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'display',
                'alignSelf',
                'order',
                'textColor',
                'backgroundColor'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], LinkBase);
    return LinkBase;
}(exports.ThemedBase));
exports.LinkBase = LinkBase;
var Link = /** @class */ (function (_super) {
    tslib_1.__extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Link;
}(LinkBase));
exports.default = Link;

/***/ }),

/***/ "./node_modules/widgets-web/link/styles/link.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/link/styles/link.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/link/styles/link.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1MNWs85D"," _key":"widgets-web/link"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/list-group/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/list-group/styles/list-group.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ListGroupBase = /** @class */ (function (_super) {
    tslib_1.__extends(ListGroupBase, _super);
    function ListGroupBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListGroupBase.prototype.getKey = function () {
        return 'list-group';
    };
    ListGroupBase.prototype.getTagNameByChildNode = function () {
        var tag = 'ul';
        var existListItem = false;
        var existButtonOrLink = false;
        this.children.forEach(function (child, index) {
            if (child) {
                var childKey = child.properties.key;
                if (childKey === 'link' || childKey === 'button') {
                    tag = 'div';
                    existButtonOrLink = true;
                }
                if (childKey === 'list-item') {
                    existListItem = true;
                }
            }
        });
        if (existButtonOrLink && existListItem) {
            console.error('ListItem and Button/Link can not be allowed at the same time in the ListGroup widget');
        }
        return tag;
    };
    ListGroupBase.prototype.renderChildren = function () {
        return this.children;
    };
    ListGroupBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, flush = _a.flush, orientation = _a.orientation;
        if (orientation === 'horizontal') {
            return d_1.v('ul', {
                id: widgetId,
                key: this.getKey(),
                classes: tslib_1.__spread([this.theme(css.root), 'list-inline'], util_1.getSpacingClasses(this.properties))
            }, this.renderChildren());
        }
        var tag = this.getTagNameByChildNode();
        return d_1.v(tag, {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'list-group',
                flush === true || flush === 'true' ? 'list-group-flush' : undefined
            ], util_1.getSpacingClasses(this.properties))
        }, this.children);
    };
    ListGroupBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-list-group',
            childType: registerCustomElement_1.CustomElementChildType.NODE,
            attributes: [
                'widgetId',
                'flush',
                'orientation',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], ListGroupBase);
    return ListGroupBase;
}(exports.ThemedBase));
exports.ListGroupBase = ListGroupBase;
var ListGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ListGroup, _super);
    function ListGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ListGroup;
}(ListGroupBase));
exports.default = ListGroup;

/***/ }),

/***/ "./node_modules/widgets-web/list-group/styles/list-group.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/list-group/styles/list-group.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/list-group/styles/list-group.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_20zwsX_M"," _key":"widgets-web/list-group"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/list-item/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/list-item/styles/list-item.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ListItemBase = /** @class */ (function (_super) {
    tslib_1.__extends(ListItemBase, _super);
    function ListItemBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListItemBase.prototype.getKey = function () {
        return 'list-item';
    };
    ListItemBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, active = _a.active, disabled = _a.disabled, appearance = _a.appearance, display = _a.display, _b = _a.orientation, orientation = _b === void 0 ? 'vertical' : _b;
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        if (orientation === 'horizontal') {
            return d_1.v('li', {
                id: widgetId,
                key: this.getKey(),
                disabled: disabled === true || disabled === 'true',
                classes: tslib_1.__spread([
                    this.theme(css.root),
                    'list-inline-item',
                    appearance && appearance !== 'default' ? "list-group-item-" + appearance : undefined,
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], flexContainerClasses, util_1.getTextClasses(this.properties), util_1.getTextDecorationClass(this.properties), util_1.getColorsClasses(this.properties)),
                styles: util_1.getTextStyles(this.properties)
            }, this.children);
        }
        return d_1.v('li', {
            id: widgetId,
            key: this.getKey(),
            disabled: disabled === true || disabled === 'true',
            classes: tslib_1.__spread([
                this.theme(css.root),
                'list-group-item',
                appearance && appearance !== 'default' ? "list-group-item-" + appearance : undefined,
                disabled === true || disabled === 'true' ? 'disabled' : undefined,
                active === true || active === 'true' ? 'active' : undefined,
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses, util_1.getTextClasses(this.properties), util_1.getTextDecorationClass(this.properties), util_1.getColorsClasses(this.properties)),
            styles: util_1.getTextStyles(this.properties)
        }, this.children);
    };
    ListItemBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-list-item',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'active',
                'disabled',
                'appearance',
                'orientation',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'textColor',
                'backgroundColor'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], ListItemBase);
    return ListItemBase;
}(exports.ThemedBase));
exports.ListItemBase = ListItemBase;
var ListItem = /** @class */ (function (_super) {
    tslib_1.__extends(ListItem, _super);
    function ListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ListItem;
}(ListItemBase));
exports.default = ListItem;

/***/ }),

/***/ "./node_modules/widgets-web/list-item/styles/list-item.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/list-item/styles/list-item.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/list-item/styles/list-item.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_1AOrCLcP"," _key":"widgets-web/list-item"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/radio/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var uuid_1 = __webpack_require__("./node_modules/@dojo/core/uuid.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/radio/styles/radio.m.css.js");
var label_1 = __webpack_require__("./node_modules/widgets-web/label/index.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var RadioBase = /** @class */ (function (_super) {
    tslib_1.__extends(RadioBase, _super);
    function RadioBase() {
        var _this = _super.call(this) || this;
        _this._uuid = uuid_1.default();
        return _this;
    }
    RadioBase.prototype.getKey = function () {
        return 'radio';
    };
    RadioBase.prototype.renderRadio = function () {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, name = _a.name, value = _a.value, checked = _a.checked, disabled = _a.disabled, readOnly = _a.readOnly;
        var cssClasses = [];
        if (disabled === true || disabled === 'true') {
            cssClasses.push('disabled');
        }
        return d_1.v('input', {
            type: 'radio',
            id: widgetId,
            name: name,
            value: value,
            checked: checked === true || checked === 'true',
            disabled: disabled === true || disabled === 'true',
            readOnly: readOnly === true || readOnly === 'true',
            classes: ['form-check-input']
        });
    };
    RadioBase.prototype.render = function () {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, label = _a.label, size = _a.size, labelAfter = _a.labelAfter, fluid = _a.fluid, display = _a.display, value = _a.value, checked = _a.checked, disabled = _a.disabled, readOnly = _a.readOnly, _c = _a.isInAddon, isInAddon = _c === void 0 ? false : _c;
        if (isInAddon) {
            return d_1.v('input', {
                id: widgetId,
                key: this.getKey(),
                type: 'radio',
                name: name,
                value: value,
                checked: checked === true || checked === 'true',
                disabled: disabled === true || disabled === 'true',
                readOnly: readOnly === true || readOnly === 'true',
                classes: tslib_1.__spread([
                    size ? util_1.formSizeMap[size] : undefined
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
            });
        }
        var children = [
            this.renderRadio(),
            label ? d_1.w(label_1.default, { value: label, forId: widgetId, classes: 'form-check-label' }) : null
        ];
        if (labelAfter === false || labelAfter === 'false') {
            children = children.reverse();
        }
        children.push(util_1.renderMessageNode(this.properties));
        return d_1.v('div', {
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'form-check',
                size ? util_1.formSizeMap[size] : undefined,
                fluid === true || fluid === 'true' ? undefined : 'form-check-inline'
            ], util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
        }, children);
    };
    RadioBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-radio',
            attributes: [
                'widgetId',
                'name',
                'value',
                'checked',
                'label',
                'labelAfter',
                'disabled',
                'readOnly',
                'fluid',
                'size',
                'invalidMessage',
                'validMessage',
                'isInAddon',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'display',
                'alignSelf',
                'order',
                'float'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], RadioBase);
    return RadioBase;
}(exports.ThemedBase));
exports.RadioBase = RadioBase;
var Radio = /** @class */ (function (_super) {
    tslib_1.__extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Radio;
}(RadioBase));
exports.default = Radio;

/***/ }),

/***/ "./node_modules/widgets-web/radio/styles/radio.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/radio/styles/radio.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/radio/styles/radio.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_126PTjRX"," _key":"widgets-web/radio"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/select/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var uuid_1 = __webpack_require__("./node_modules/@dojo/core/uuid.js");
var label_1 = __webpack_require__("./node_modules/widgets-web/label/index.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/select/styles/select.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var SelectBase = /** @class */ (function (_super) {
    tslib_1.__extends(SelectBase, _super);
    function SelectBase() {
        var _this = _super.call(this) || this;
        _this._uuid = uuid_1.default();
        return _this;
    }
    SelectBase.prototype.getKey = function () {
        return 'select';
    };
    SelectBase.prototype.renderSelect = function (key) {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, name = _a.name, value = _a.value, disabled = _a.disabled, required = _a.required, readOnly = _a.readOnly, options = _a.options, labelField = _a.labelField, valueField = _a.valueField, dataPath = _a.dataPath, size = _a.size, display = _a.display, label = _a.label, labelPosition = _a.labelPosition;
        var cssClasses = [];
        if (disabled === true || disabled === 'true') {
            cssClasses.push('disabled');
        }
        if (size) {
            cssClasses.push(util_1.formSizeMap[size]);
        }
        cssClasses.push('form-control');
        var children = [];
        if (options) {
            // 不使用 JSON.parse() 将 json 转为数组的原因是 JSON.parse() 不支持单引号,且不支持转义符
            var optionJson = eval(options);
            children = optionJson.map(function (option, index) {
                return d_1.v('option', {
                    key: index + uuid_1.default(),
                    value: option[valueField],
                    selected: option[valueField] === value
                }, [option[labelField]]);
            });
        }
        if (dataPath) {
            //TODO: 发送请求，获取数据，暂时不处理
        }
        var classes = key === undefined
            ? cssClasses
            : tslib_1.__spread(cssClasses, util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties));
        if (!(label && labelPosition && labelPosition === 'left')) {
            classes.push(this.theme(css.root));
        }
        return d_1.v('select', {
            id: widgetId,
            key: key,
            name: name,
            disabled: disabled === true || disabled === 'true',
            required: required === true || required === 'true',
            readOnly: readOnly === true || readOnly === 'true',
            classes: classes
        }, children);
    };
    SelectBase.prototype.renderSelectWrapper = function (key) {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, label = _a.label;
        return [
            label
                ? d_1.w(label_1.default, {
                    value: label,
                    forId: widgetId,
                    classes: ['col-form-label', 'mr-3']
                }, [])
                : null,
            this.renderSelect(key),
            util_1.renderMessageNode(this.properties)
        ];
    };
    SelectBase.prototype.render = function () {
        var _a = this.properties, label = _a.label, labelPosition = _a.labelPosition, display = _a.display;
        /**
         * bootstrap 中有三种 inline 实现：
         * 1. inline forms, 在 form 表单外放一个 inline form 布局管理器实现的,相当于 android 的水平 linearlayout；
         * 2. checkbox inline，直接处理每个 form 表单和 label；
         * 3. Form Grid 中的 Horizontal form，使用 Grid 布局，但是 Label 的宽度无法动态调整为任意值。
         *
         * 现在使用 第二种实现，当有更好的实现时，再完善此处代码。
         */
        if (label && labelPosition && labelPosition === 'left') {
            return d_1.v('div', {
                key: this.getKey(),
                classes: tslib_1.__spread([
                    this.theme(css.root),
                    'form-group',
                    'form-check-inline',
                    'w-100'
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
            }, this.renderSelectWrapper(undefined));
        }
        return this.renderSelectWrapper(this.getKey());
    };
    SelectBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-select',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'name',
                'value',
                'label',
                'labelPosition',
                'disabled',
                'required',
                'readOnly',
                'options',
                'labelField',
                'valueField',
                'dataPath',
                'size',
                'invalidMessage',
                'validMessage',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'display',
                'alignSelf',
                'order',
                'float'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], SelectBase);
    return SelectBase;
}(exports.ThemedBase));
exports.SelectBase = SelectBase;
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Select;
}(SelectBase));
exports.default = Select;

/***/ }),

/***/ "./node_modules/widgets-web/select/styles/select.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/select/styles/select.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/select/styles/select.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3MY29Exy"," _key":"widgets-web/select"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/text-input/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var uuid_1 = __webpack_require__("./node_modules/@dojo/core/uuid.js");
var Focus_1 = __webpack_require__("./node_modules/@dojo/widget-core/meta/Focus.js");
var label_1 = __webpack_require__("./node_modules/widgets-web/label/index.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/text-input/styles/text-input.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var TextInputBase = /** @class */ (function (_super) {
    tslib_1.__extends(TextInputBase, _super);
    function TextInputBase() {
        var _this = _super.call(this) || this;
        _this._focusableInputKey = 'focusableInput';
        _this._uuid = uuid_1.default();
        return _this;
    }
    TextInputBase.prototype.getKey = function () {
        return 'text-input';
    };
    TextInputBase.prototype._onInput = function (event) {
        event.stopPropagation();
        this.properties.onInput && this.properties.onInput(event.target.value);
    };
    TextInputBase.prototype._onChange = function (event) {
        event.stopPropagation();
        this.properties.onChange && this.properties.onChange(event.target.value);
    };
    TextInputBase.prototype.renderInput = function (key) {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, name = _a.name, type = _a.type, value = _a.value, password = _a.password, placeholder = _a.placeholder, disabled = _a.disabled, required = _a.required, readOnly = _a.readOnly, maxLength = _a.maxLength, minLength = _a.minLength, size = _a.size, shouldFocus = _a.shouldFocus, plainText = _a.plainText, display = _a.display, label = _a.label, labelPosition = _a.labelPosition;
        var cssClasses = [];
        if (shouldFocus === true || shouldFocus === 'true') {
            this.meta(Focus_1.default).set(key);
        }
        if (password === true || password === 'true') {
            type = 'password';
        }
        if (disabled === true || disabled === 'true') {
            cssClasses.push('disabled');
        }
        if (size) {
            cssClasses.push(util_1.formSizeMap[size]);
        }
        if (plainText === true || plainText === 'true') {
            cssClasses.push('form-control-plaintext');
        }
        else {
            cssClasses.push('form-control');
        }
        var classes = key === this._focusableInputKey
            ? cssClasses
            : tslib_1.__spread(cssClasses, util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties));
        if (!(label && labelPosition && labelPosition === 'left')) {
            classes.push(this.theme(css.root));
        }
        return d_1.v('input', {
            id: widgetId,
            key: key,
            name: name,
            type: type && type !== 'default' ? type : '',
            value: value,
            placeholder: placeholder,
            disabled: disabled === true || disabled === 'true',
            required: required === true || required === 'true',
            readOnly: readOnly === true || readOnly === 'true',
            maxlength: maxLength ? "" + maxLength : null,
            minlength: minLength ? "" + minLength : null,
            classes: classes,
            oninput: this._onInput,
            onchange: this._onChange
        }, []);
    };
    TextInputBase.prototype.renderTextInput = function (key) {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, label = _a.label;
        return [
            label
                ? d_1.w(label_1.default, {
                    value: label,
                    forId: widgetId,
                    classes: ['col-form-label', 'mr-3']
                }, [])
                : null,
            this.renderInput(key),
            util_1.renderMessageNode(this.properties)
        ];
    };
    TextInputBase.prototype.renderFileInput = function () {
        var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, label = _a.label, disabled = _a.disabled, name = _a.name, display = _a.display;
        return d_1.v('div', {
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root),
                'custom-file'
            ], util_1.getSpacingClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
        }, [
            d_1.v('input', {
                id: widgetId,
                name: name,
                type: 'file',
                disabled: disabled === true || disabled === 'true',
                classes: ['custom-file-input'],
                onchange: this._onChange
            }),
            label
                ? d_1.w(label_1.default, {
                    value: label,
                    forId: widgetId,
                    classes: 'custom-file-label'
                })
                : null,
            util_1.renderMessageNode(this.properties)
        ]);
    };
    TextInputBase.prototype.render = function () {
        var _a = this.properties, type = _a.type, label = _a.label, labelPosition = _a.labelPosition, display = _a.display;
        if (type && type === 'file') {
            return this.renderFileInput();
        }
        /**
         * bootstrap 中有三种 inline 实现：
         * 1. inline forms, 在 form 表单外放一个 inline form 布局管理器实现的,相当于 android 的水平 linearlayout；
         * 2. checkbox inline，直接处理每个 form 表单和 label；
         * 3. Form Grid 中的 Horizontal form，使用 Grid 布局，但是 Label 的宽度无法动态调整为任意值。
         *
         * 现在使用 第二种实现，当有更好的实现时，再完善此处代码。
         */
        if (label && labelPosition && labelPosition === 'left') {
            return d_1.v('div', {
                key: this.getKey(),
                classes: tslib_1.__spread([
                    this.theme(css.root),
                    'form-group',
                    'form-check-inline',
                    'w-100'
                ], util_1.getSpacingClasses(this.properties), [
                    display ? util_1.getDisplayClass(this.properties) : undefined
                ], util_1.getFlexItemClasses(this.properties), util_1.getFloatClass(this.properties))
            }, this.renderTextInput(this._focusableInputKey));
        }
        return this.renderTextInput(this.getKey());
    };
    TextInputBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-text-input',
            attributes: [
                'widgetId',
                'name',
                'type',
                'password',
                'value',
                'label',
                'labelPosition',
                'placeholder',
                'placeholderAppearance',
                'required',
                'disabled',
                'readOnly',
                'size',
                'shouldFocus',
                'plainText',
                'maxLength',
                'minLength',
                'invalidMessage',
                'validMessage',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'display',
                'alignSelf',
                'order',
                'float'
            ],
            properties: [],
            events: ['onInput', 'onChange']
        }),
        Themed_1.theme(css)
    ], TextInputBase);
    return TextInputBase;
}(exports.ThemedBase));
exports.TextInputBase = TextInputBase;
var TextInput = /** @class */ (function (_super) {
    tslib_1.__extends(TextInput, _super);
    function TextInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextInput;
}(TextInputBase));
exports.default = TextInput;

/***/ }),

/***/ "./node_modules/widgets-web/text-input/styles/text-input.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/text-input/styles/text-input.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/text-input/styles/text-input.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_2B6HRRXh"," _key":"widgets-web/text-input"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/text/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/text/styles/text.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var TextBase = /** @class */ (function (_super) {
    tslib_1.__extends(TextBase, _super);
    function TextBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBase.prototype.getKey = function () {
        return 'text';
    };
    TextBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, value = _a.value, valuePosition = _a.valuePosition, type = _a.type, display = _a.display;
        var tag;
        var cssClasses = [];
        if (!type) {
            tag = 'span';
        }
        else if (type === 'text') {
            tag = 'span';
        }
        else if (type === 'lead') {
            tag = 'p';
            cssClasses.push('lead');
        }
        else {
            tag = type;
        }
        var children;
        if (value && valuePosition && valuePosition === 'left') {
            children = tslib_1.__spread([value], this.children);
        }
        else {
            children = tslib_1.__spread(this.children, [value]);
        }
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        return d_1.v(tag, {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root)
            ], cssClasses, util_1.getSpacingClasses(this.properties), util_1.getTextClasses(this.properties), util_1.getTextDecorationClass(this.properties), util_1.getColorsClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses, util_1.getFlexItemClasses(this.properties)),
            styles: tslib_1.__assign({}, util_1.getTextStyles(this.properties))
        }, children);
    };
    TextBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-text',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'value',
                'valuePosition',
                'type',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'textColor',
                'backgroundColor',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent',
                'alignSelf',
                'order'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], TextBase);
    return TextBase;
}(exports.ThemedBase));
exports.TextBase = TextBase;
var Text = /** @class */ (function (_super) {
    tslib_1.__extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Text;
}(TextBase));
exports.default = Text;

/***/ }),

/***/ "./node_modules/widgets-web/text/styles/text.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/text/styles/text.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/text/styles/text.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"_3E25PZ1J"," _key":"widgets-web/text"};
}));;

/***/ }),

/***/ "./node_modules/widgets-web/view/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var string_1 = __webpack_require__("./node_modules/@dojo/shim/string.js");
var Themed_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Themed.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var customElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/customElement.js");
var registerCustomElement_1 = __webpack_require__("./node_modules/@dojo/widget-core/registerCustomElement.js");
var util_1 = __webpack_require__("./node_modules/widgets-web/common/util.js");
var css = __webpack_require__("./node_modules/widgets-web/view/styles/view.m.css.js");
exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
var ViewBase = /** @class */ (function (_super) {
    tslib_1.__extends(ViewBase, _super);
    function ViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewBase.prototype.getKey = function () {
        return 'view';
    };
    ViewBase.prototype._getMaxWidthStyles = function () {
        var maxWidth = this.properties.maxWidth;
        var maxWidthStyles = {};
        if (maxWidth) {
            if (typeof maxWidth == 'number') {
                maxWidthStyles.maxWidth = maxWidth + "px";
            }
            else if (string_1.endsWith(maxWidth, '%')) {
                maxWidthStyles.maxWidth = maxWidth;
            }
            else {
                maxWidthStyles.maxWidth = maxWidth + "px";
            }
        }
        return maxWidthStyles;
    };
    ViewBase.prototype.render = function () {
        var _a = this.properties, widgetId = _a.widgetId, display = _a.display;
        var flexContainerClasses = [];
        if (display && (display === 'flex' || display === 'inlineFlex')) {
            flexContainerClasses = util_1.getFlexContainerClasses(this.properties);
        }
        return d_1.v('div', {
            id: widgetId,
            key: this.getKey(),
            classes: tslib_1.__spread([
                this.theme(css.root)
            ], util_1.getBorderClasses(this.properties), util_1.getSpacingClasses(this.properties), util_1.getTextClasses(this.properties), [
                display ? util_1.getDisplayClass(this.properties) : undefined
            ], flexContainerClasses, util_1.getFlexItemClasses(this.properties), util_1.getColorsClasses(this.properties), util_1.getFloatClass(this.properties)),
            styles: tslib_1.__assign({}, util_1.getTextStyles(this.properties), this._getMaxWidthStyles())
        }, this.children);
    };
    ViewBase = tslib_1.__decorate([
        customElement_1.customElement({
            tag: 'db-view',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            attributes: [
                'widgetId',
                'maxWidth',
                'borderLeft',
                'borderTop',
                'borderRight',
                'borderBottom',
                'borderColor',
                'borderRound',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
                'paddingTop',
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'fontWeight',
                'fontItalic',
                'textDecoration',
                'alignment',
                'transform',
                'truncate',
                'wrap',
                'display',
                'flexDirection',
                'reverse',
                'justifyItems',
                'alignItems',
                'flexWrap',
                'alignContent',
                'alignSelf',
                'order',
                'textColor',
                'backgroundColor',
                'float'
            ],
            properties: [],
            events: []
        }),
        Themed_1.theme(css)
    ], ViewBase);
    return ViewBase;
}(exports.ThemedBase));
exports.ViewBase = ViewBase;
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return View;
}(ViewBase));
exports.default = View;

/***/ }),

/***/ "./node_modules/widgets-web/view/styles/view.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/widgets-web/view/styles/view.m.css.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__("./node_modules/widgets-web/view/styles/view.m.css");
(function (root, factory) {
if (true) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return (factory()); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
}
}(this, function () {
	return {"root":"pd8rk0FO"," _key":"widgets-web/view"};
}));;

/***/ }),

/***/ "./src/main.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Projector_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Projector.js");
var CheckoutForm_1 = __webpack_require__("./src/widgets/CheckoutForm.ts");
// Create a projector to convert the virtual DOM produced by the application into the rendered page.
// For more information on starting up a Dojo 2 application, take a look at
// https://dojo.io/tutorials/002_creating_an_application/
var root = document.querySelector('checkout-app');
if (root) {
    var Projector = Projector_1.ProjectorMixin(CheckoutForm_1.default);
    var projector = new Projector();
    // By default, append() will attach the rendered content to document.body.  To insert this application
    // into existing HTML content, pass the desired root node to append().
    projector.append(root);
}


/***/ }),

/***/ "./src/widgets/CheckoutForm.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var index_1 = __webpack_require__("./node_modules/widgets-web/container/index.js");
var index_2 = __webpack_require__("./node_modules/widgets-web/view/index.js");
var index_3 = __webpack_require__("./node_modules/widgets-web/image/index.js");
var index_4 = __webpack_require__("./node_modules/widgets-web/text/index.js");
var index_5 = __webpack_require__("./node_modules/widgets-web/grid-row/index.js");
var index_6 = __webpack_require__("./node_modules/widgets-web/grid-column/index.js");
var index_7 = __webpack_require__("./node_modules/widgets-web/text-input/index.js");
var index_8 = __webpack_require__("./node_modules/widgets-web/input-group/index.js");
var index_9 = __webpack_require__("./node_modules/widgets-web/addon/index.js");
var index_10 = __webpack_require__("./node_modules/widgets-web/select/index.js");
var index_11 = __webpack_require__("./node_modules/widgets-web/checkbox/index.js");
var index_12 = __webpack_require__("./node_modules/widgets-web/radio/index.js");
var index_13 = __webpack_require__("./node_modules/widgets-web/button/index.js");
var index_14 = __webpack_require__("./node_modules/widgets-web/badge/index.js");
var index_15 = __webpack_require__("./node_modules/widgets-web/list-group/index.js");
var index_16 = __webpack_require__("./node_modules/widgets-web/list-item/index.js");
var index_17 = __webpack_require__("./node_modules/widgets-web/card/index.js");
var index_18 = __webpack_require__("./node_modules/widgets-web/footer/index.js");
var index_19 = __webpack_require__("./node_modules/widgets-web/link/index.js");
var CheckoutFormBase = /** @class */ (function (_super) {
    tslib_1.__extends(CheckoutFormBase, _super);
    function CheckoutFormBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckoutFormBase.prototype.render = function () {
        return d_1.w(index_1.default, { maxWidth: 960 }, [
            d_1.w(index_2.default, { alignment: 'center', paddingTop: '5', paddingBottom: '5' }, [
                d_1.w(index_3.default, {
                    width: 72,
                    height: 72,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '4',
                    src: 'https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg'
                }),
                d_1.w(index_4.default, { type: 'h2', value: 'Checkout form' }),
                d_1.w(index_4.default, {
                    type: 'lead',
                    value: "Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it."
                })
            ]),
            d_1.w(index_5.default, {}, [
                d_1.w(index_6.default, { colspan: 8 }, [
                    d_1.w(index_4.default, { type: 'h4', marginBottom: '3', value: 'Billing address' }),
                    d_1.w(index_2.default, {}, [
                        d_1.w(index_5.default, {}, [
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [d_1.w(index_7.default, { label: 'First Name' })]),
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [d_1.w(index_7.default, { label: 'Last Name' })])
                        ]),
                        d_1.w(index_2.default, { marginBottom: '3' }, [
                            d_1.w(index_8.default, { label: 'UserName' }, [
                                d_1.w(index_9.default, { value: '@' }),
                                d_1.w(index_7.default, { placeholder: 'UserName' })
                            ])
                        ]),
                        d_1.w(index_2.default, { marginBottom: '3' }, [
                            d_1.w(index_7.default, { label: 'Email(Optional)', placeholder: 'you@example.com' })
                        ]),
                        d_1.w(index_2.default, { marginBottom: '3' }, [
                            d_1.w(index_7.default, { label: 'Address', placeholder: '1234 Main St' })
                        ]),
                        d_1.w(index_2.default, { marginBottom: '3' }, [
                            d_1.w(index_7.default, { label: 'Address 2(Optional)', placeholder: 'Apartment or suite' })
                        ]),
                        d_1.w(index_5.default, {}, [
                            d_1.w(index_6.default, { colspan: 5, marginBottom: '3' }, [
                                d_1.w(index_10.default, {
                                    label: 'Country',
                                    options: '[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "United States"}]',
                                    valueField: 'value',
                                    labelField: 'label'
                                })
                            ]),
                            d_1.w(index_6.default, { colspan: 4, marginBottom: '3' }, [
                                d_1.w(index_10.default, {
                                    label: 'State',
                                    options: '[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "California"}]',
                                    valueField: 'value',
                                    labelField: 'label'
                                })
                            ]),
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [d_1.w(index_7.default, { label: 'Zip' })])
                        ]),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4' }),
                        d_1.w(index_11.default, { label: 'Shipping address is the same as my billing address' }),
                        d_1.w(index_11.default, { label: 'Save this information for next time' }),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4', marginTop: '4' }),
                        d_1.w(index_4.default, { type: 'h4', marginBottom: '3', value: 'Payment' }),
                        d_1.w(index_2.default, { display: 'block', marginTop: '3', marginBottom: '3' }, [
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'credit', label: 'Credit card', fluid: true }),
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'debit', label: 'Debit card', fluid: true }),
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'paypal', label: 'PayPal', fluid: true })
                        ]),
                        d_1.w(index_5.default, {}, [
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'Name on card' }),
                                d_1.w(index_4.default, { type: 'small', value: 'Full name as displayed on card' })
                            ]),
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'Credit card number' })
                            ])
                        ]),
                        d_1.w(index_5.default, {}, [
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [d_1.w(index_7.default, { label: 'Expiration' })]),
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [d_1.w(index_7.default, { label: 'CVV' })])
                        ]),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4' }),
                        d_1.w(index_13.default, { appearance: 'primary', fluid: true, size: 'large', value: 'Continue to checkout' })
                    ])
                ]),
                d_1.w(index_6.default, { colspan: '4', marginBottom: '4' }, [
                    d_1.w(index_4.default, {
                        type: 'h4',
                        display: 'flex',
                        alignment: 'center',
                        justifyItems: 'between',
                        marginBottom: '3'
                    }, [
                        d_1.w(index_4.default, { textColor: 'secondary', value: 'Your cart' }),
                        d_1.w(index_14.default, { pill: true, value: '3', appearance: 'secondary' })
                    ]),
                    d_1.w(index_15.default, { marginBottom: '3' }, [
                        d_1.w(index_16.default, { display: 'flex', justifyItems: 'between' }, [
                            d_1.w(index_2.default, {}, [
                                d_1.w(index_4.default, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Product name' }),
                                d_1.w(index_4.default, { textColor: 'secondary', type: 'small', value: 'Brief description' })
                            ]),
                            d_1.w(index_4.default, { textColor: 'secondary', value: '$12' })
                        ]),
                        d_1.w(index_16.default, { display: 'flex', justifyItems: 'between' }, [
                            d_1.w(index_2.default, {}, [
                                d_1.w(index_4.default, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Second product' }),
                                d_1.w(index_4.default, { textColor: 'secondary', type: 'small', value: 'Brief description' })
                            ]),
                            d_1.w(index_4.default, { textColor: 'secondary', value: '$8' })
                        ]),
                        d_1.w(index_16.default, { display: 'flex', justifyItems: 'between' }, [
                            d_1.w(index_2.default, {}, [
                                d_1.w(index_4.default, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Third item' }),
                                d_1.w(index_4.default, { textColor: 'secondary', type: 'small', value: 'Brief description' })
                            ]),
                            d_1.w(index_4.default, { textColor: 'secondary', value: '$5' })
                        ]),
                        d_1.w(index_16.default, { display: 'flex', justifyItems: 'between' }, [
                            d_1.w(index_2.default, { textColor: 'success' }, [
                                d_1.w(index_4.default, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Promo code' }),
                                d_1.w(index_4.default, { type: 'small', value: 'EXAMPLECODE' })
                            ]),
                            d_1.w(index_4.default, { textColor: 'success', value: '-$5' })
                        ]),
                        d_1.w(index_16.default, { display: 'flex', justifyItems: 'between' }, [
                            d_1.w(index_4.default, { value: 'Total (USD)' }),
                            d_1.w(index_4.default, { fontWeight: 'bold', value: '$20' })
                        ])
                    ]),
                    d_1.w(index_17.default, { paddingLeft: '2', paddingRight: '2', paddingTop: '2', paddingBottom: '2' }, [
                        d_1.w(index_8.default, {}, [
                            d_1.w(index_7.default, { placeholder: 'Promo code' }),
                            d_1.w(index_9.default, {}, [d_1.w(index_13.default, { appearance: 'secondary', value: 'Redeem' })])
                        ])
                    ])
                ])
            ]),
            d_1.w(index_18.default, { marginTop: '5', marginBottom: '5', paddingTop: '5', alignment: 'center' }, [
                d_1.w(index_4.default, { type: 'p', marginBottom: '1', value: '© 2017-2018 Company Name', textColor: 'secondary' }),
                d_1.w(index_15.default, { orientation: 'horizontal' }, [
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [d_1.w(index_19.default, { value: 'Privacy' })]),
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [d_1.w(index_19.default, { value: 'Terms' })]),
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [d_1.w(index_19.default, { value: 'Support' })])
                ])
            ])
        ]);
    };
    return CheckoutFormBase;
}(WidgetBase_1.WidgetBase));
exports.CheckoutFormBase = CheckoutFormBase;
var CheckoutForm = /** @class */ (function (_super) {
    tslib_1.__extends(CheckoutForm, _super);
    function CheckoutForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CheckoutForm;
}(CheckoutFormBase));
exports.default = CheckoutForm;


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js");
__webpack_require__("./src/main.css");
module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0Rlc3Ryb3lhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0V2ZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvaGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2xhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vaGFzL2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9TZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvaGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvYnVpbGQtdGltZS1yZW5kZXIvaGFzQnVpbGRUaW1lUmVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9JbmplY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvTm9kZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1JlZ2lzdHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9SZWdpc3RyeUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2FuaW1hdGlvbnMvY3NzVHJhbnNpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWx3YXlzUmVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2JlZm9yZVByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9kaWZmUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvaGFuZGxlRGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2luamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGlmZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvbWV0YS9CYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0ZvY3VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3Zkb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3M/N2Q0YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vc3R5bGVzL2FkZG9uLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzPzk3ZTMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcz8zYWMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzcz84YjA4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL3N0eWxlcy9jYXJkLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzPzBiNTYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3M/ZDRiZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbW1vbi91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb250YWluZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzP2VjMGIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9mb290ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzP2Q1MjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzPzIzNTgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzcz84MmY4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9zdHlsZXMvZ3JpZC1yb3cubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3M/Yjg1NyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2Uvc3R5bGVzL2ltYWdlLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvc3R5bGVzL2lucHV0LWdyb3VwLm0uY3NzP2MyZmIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL3N0eWxlcy9sYWJlbC5tLmNzcz9jZDYwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9zdHlsZXMvbGFiZWwubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3M/Mjc1YiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9zdHlsZXMvbGluay5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9zdHlsZXMvbGlzdC1ncm91cC5tLmNzcz83NmMyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzP2VlODQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vc3R5bGVzL3JhZGlvLm0uY3NzP2Y0MTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvc2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcz8zZDNhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9zdHlsZXMvdGV4dC1pbnB1dC5tLmNzcz83NjI2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzPzI3NDgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvc3R5bGVzL3RleHQubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3M/MGQyOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5jc3M/ODQyMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9DaGVja291dEZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7O0FDVkE7QUFDQSw4Q0FBOEMsY0FB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QUFDTDtBQUNBLHVCOzs7Ozs7Ozt1RENiQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbUJBQW1CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7O0FDMU1EO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFCQUFxQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBK0csb0JBQW9CO0FBQ25JO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVEsZ0JBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBCQUEwQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPOzs7Ozs7OztBQ2xIQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLG9CQUFvQjtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVEsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDBCQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyxvQkFBb0I7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRLGdCQUFnQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywwQkFBMEI7QUFDM0Q7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTzs7Ozs7Ozs7QUNoT0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQkFBcUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtHQUErRyxvQkFBb0I7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUSxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsMEJBQTBCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1Rix1QkFBdUIsRUFBRTtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87Ozs7Ozs7O0FDM0ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSTtBQUNwQixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxJQUFJO0FBQ2hCLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsb0NBQW9DO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUscUNBQXFDLEVBQUU7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsNkI7Ozs7Ozs7O0FDallBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQy9EQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixlQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywyQkFBMkI7QUFDckUsOEJBQThCLHNCQUFzQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGdEQUFnRCwwQ0FBMEM7QUFDM0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0I7Ozs7Ozs7O0FDMUhBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDhCOzs7Ozs7OztBQ1RBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0I7Ozs7Ozs7O0FDWkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZXQUE2VyxpQ0FBaUMsRUFBRTtBQUNoWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7QUN0QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0I7Ozs7Ozs7O0FDdkJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7OztBQ25CQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSx5Qjs7Ozs7Ozs7QUN4Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9COzs7Ozs7OztBQ3ZFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx1Qjs7Ozs7Ozs7QUM1Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCOzs7Ozs7OztBQ3pQQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGdCQUFnQixlQUFlLHNDQUFzQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0JBQW9CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxvQ0FBb0M7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1Q0FBdUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUJBQXlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsNkJBQTZCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0IscUNBQXFDO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFB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QUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOURB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QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7O0FDVEQseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7OztBQ25RQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsNEI7Ozs7Ozs7QUNwRUEseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QseUI7Ozs7Ozs7QUNoRkEseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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L0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx3Qjs7Ozs7OztBQ25EQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1Qjs7Ozs7OztBQzdHQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUUsRUFBRSxDQUFDLEtBQUMsQ0FBQyxnQkFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVMsQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0UsS0FBQyxDQUFDLGdCQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsYUFBWSxDQUFFLEVBQUUsQ0FBQyxLQUFDLENBQUMsZ0JBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLEtBQUMsQ0FBQyxnQkFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLGFBQVksQ0FBRSxFQUFFLENBQUMsS0FBQyxDQUFDLGdCQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBUyxDQUFFLENBQUMsQ0FBQztpQkFDMUU7YUFDRDtTQUNELENBQUM7SUFDSCxDQUFDO0lBQ0YsdUJBQUM7QUFBRCxDQTdKQSxDQUFzQyx1QkFBVTtBQUFuQztBQStKYjtJQUEwQztJQUExQzs7SUFBNEQ7SUFBQSxtQkFBQztBQUFELENBQTVELENBQTBDLGdCQUFnQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJtYWluXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm1haW5cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibWFpblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGxhbmdfMSA9IHJlcXVpcmUoXCIuL2xhbmdcIik7XHJcbnZhciBQcm9taXNlXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9Qcm9taXNlXCIpO1xyXG4vKipcclxuICogTm8gb3BlcmF0aW9uIGZ1bmN0aW9uIHRvIHJlcGxhY2Ugb3duIG9uY2UgaW5zdGFuY2UgaXMgZGVzdG9yeWVkXHJcbiAqL1xyXG5mdW5jdGlvbiBub29wKCkge1xyXG4gICAgcmV0dXJuIFByb21pc2VfMS5kZWZhdWx0LnJlc29sdmUoZmFsc2UpO1xyXG59XHJcbi8qKlxyXG4gKiBObyBvcCBmdW5jdGlvbiB1c2VkIHRvIHJlcGxhY2Ugb3duLCBvbmNlIGluc3RhbmNlIGhhcyBiZWVuIGRlc3RvcnllZFxyXG4gKi9cclxuZnVuY3Rpb24gZGVzdHJveWVkKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsIG1hZGUgdG8gZGVzdHJveWVkIG1ldGhvZCcpO1xyXG59XHJcbnZhciBEZXN0cm95YWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERlc3Ryb3lhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBoYW5kbGVzIGZvciB0aGUgaW5zdGFuY2UgdGhhdCB3aWxsIGJlIGRlc3Ryb3llZCB3aGVuIGB0aGlzLmRlc3Ryb3lgIGlzIGNhbGxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SGFuZGxlfSBoYW5kbGUgVGhlIGhhbmRsZSB0byBhZGQgZm9yIHRoZSBpbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMge0hhbmRsZX0gYSBoYW5kbGUgZm9yIHRoZSBoYW5kbGUsIHJlbW92ZXMgdGhlIGhhbmRsZSBmb3IgdGhlIGluc3RhbmNlIGFuZCBjYWxscyBkZXN0cm95XHJcbiAgICAgKi9cclxuICAgIERlc3Ryb3lhYmxlLnByb3RvdHlwZS5vd24gPSBmdW5jdGlvbiAoaGFuZGxlcykge1xyXG4gICAgICAgIHZhciBoYW5kbGUgPSBBcnJheS5pc0FycmF5KGhhbmRsZXMpID8gbGFuZ18xLmNyZWF0ZUNvbXBvc2l0ZUhhbmRsZS5hcHBseSh2b2lkIDAsIHRzbGliXzEuX19zcHJlYWQoaGFuZGxlcykpIDogaGFuZGxlcztcclxuICAgICAgICB2YXIgX2hhbmRsZXMgPSB0aGlzLmhhbmRsZXM7XHJcbiAgICAgICAgX2hhbmRsZXMucHVzaChoYW5kbGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9oYW5kbGVzLnNwbGljZShfaGFuZGxlcy5pbmRleE9mKGhhbmRsZSkpO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cnB5cyBhbGwgaGFuZGVycyByZWdpc3RlcmVkIGZvciB0aGUgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnl9IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYWxsIGhhbmRsZXMgaGF2ZSBiZWVuIGRlc3Ryb3llZFxyXG4gICAgICovXHJcbiAgICBEZXN0cm95YWJsZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZV8xLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgX3RoaXMuaGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZSAmJiBoYW5kbGUuZGVzdHJveSAmJiBoYW5kbGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgX3RoaXMuZGVzdHJveSA9IG5vb3A7XHJcbiAgICAgICAgICAgIF90aGlzLm93biA9IGRlc3Ryb3llZDtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGVzdHJveWFibGU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRGVzdHJveWFibGUgPSBEZXN0cm95YWJsZTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gRGVzdHJveWFibGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9EZXN0cm95YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9EZXN0cm95YWJsZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIE1hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vTWFwXCIpO1xyXG52YXIgRGVzdHJveWFibGVfMSA9IHJlcXVpcmUoXCIuL0Rlc3Ryb3lhYmxlXCIpO1xyXG4vKipcclxuICogTWFwIG9mIGNvbXB1dGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGtleWVkIGJ5IHN0cmluZ1xyXG4gKi9cclxudmFyIHJlZ2V4TWFwID0gbmV3IE1hcF8xLmRlZmF1bHQoKTtcclxuLyoqXHJcbiAqIERldGVybWluZXMgaXMgdGhlIGV2ZW50IHR5cGUgZ2xvYiBoYXMgYmVlbiBtYXRjaGVkXHJcbiAqXHJcbiAqIEByZXR1cm5zIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlIGdsb2IgaXMgbWF0Y2hlZFxyXG4gKi9cclxuZnVuY3Rpb24gaXNHbG9iTWF0Y2goZ2xvYlN0cmluZywgdGFyZ2V0U3RyaW5nKSB7XHJcbiAgICBpZiAodHlwZW9mIHRhcmdldFN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGdsb2JTdHJpbmcgPT09ICdzdHJpbmcnICYmIGdsb2JTdHJpbmcuaW5kZXhPZignKicpICE9PSAtMSkge1xyXG4gICAgICAgIHZhciByZWdleCA9IHZvaWQgMDtcclxuICAgICAgICBpZiAocmVnZXhNYXAuaGFzKGdsb2JTdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHJlZ2V4ID0gcmVnZXhNYXAuZ2V0KGdsb2JTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlwiICsgZ2xvYlN0cmluZy5yZXBsYWNlKC9cXCovZywgJy4qJykgKyBcIiRcIik7XHJcbiAgICAgICAgICAgIHJlZ2V4TWFwLnNldChnbG9iU3RyaW5nLCByZWdleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KHRhcmdldFN0cmluZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZ2xvYlN0cmluZyA9PT0gdGFyZ2V0U3RyaW5nO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuaXNHbG9iTWF0Y2ggPSBpc0dsb2JNYXRjaDtcclxuLyoqXHJcbiAqIEV2ZW50IENsYXNzXHJcbiAqL1xyXG52YXIgRXZlbnRlZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEV2ZW50ZWQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBFdmVudGVkKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG1hcCBvZiBsaXN0ZW5lcnMga2V5ZWQgYnkgZXZlbnQgdHlwZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF90aGlzLmxpc3RlbmVyc01hcCA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgRXZlbnRlZC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNNYXAuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kcywgdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoaXNHbG9iTWF0Y2godHlwZSwgZXZlbnQudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoX3RoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgRXZlbnRlZC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlc18xID0gbGlzdGVuZXIubWFwKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gX3RoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlc18xLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkgeyByZXR1cm4gaGFuZGxlLmRlc3Ryb3koKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcbiAgICB9O1xyXG4gICAgRXZlbnRlZC5wcm90b3R5cGUuX2FkZExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNNYXAuZ2V0KHR5cGUpIHx8IFtdO1xyXG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc01hcC5zZXQodHlwZSwgbGlzdGVuZXJzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gX3RoaXMubGlzdGVuZXJzTWFwLmdldCh0eXBlKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEV2ZW50ZWQ7XHJcbn0oRGVzdHJveWFibGVfMS5EZXN0cm95YWJsZSkpO1xyXG5leHBvcnRzLkV2ZW50ZWQgPSBFdmVudGVkO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudGVkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvRXZlbnRlZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9FdmVudGVkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9nbG9iYWxcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL3N1cHBvcnQvaGFzXCIpO1xyXG50c2xpYl8xLl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiQGRvam8vc2hpbS9zdXBwb3J0L2hhc1wiKSwgZXhwb3J0cyk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGhhc18xLmRlZmF1bHQ7XHJcbmhhc18xLmFkZCgnb2JqZWN0LWFzc2lnbicsIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0Lk9iamVjdC5hc3NpZ24gPT09ICdmdW5jdGlvbicsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2FycmF5YnVmZmVyJywgdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcclxuaGFzXzEuYWRkKCdmb3JtZGF0YScsIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LkZvcm1EYXRhICE9PSAndW5kZWZpbmVkJywgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZmlsZXJlYWRlcicsIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LkZpbGVSZWFkZXIgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcclxuaGFzXzEuYWRkKCd4aHInLCB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5YTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ3hocjInLCBoYXNfMS5kZWZhdWx0KCd4aHInKSAmJiAncmVzcG9uc2VUeXBlJyBpbiBnbG9iYWxfMS5kZWZhdWx0LlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnYmxvYicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaGFzXzEuZGVmYXVsdCgneGhyMicpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgZ2xvYmFsXzEuZGVmYXVsdC5YTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBnbG9iYWxfMS5kZWZhdWx0LmxvY2F0aW9uLnByb3RvY29sICsgJy8vd3d3Lmdvb2dsZS5jb20nLCB0cnVlKTtcclxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xyXG4gICAgcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUeXBlID09PSAnYmxvYic7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ25vZGUtYnVmZmVyJywgJ0J1ZmZlcicgaW4gZ2xvYmFsXzEuZGVmYXVsdCAmJiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5CdWZmZXIgPT09ICdmdW5jdGlvbicsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2ZldGNoJywgJ2ZldGNoJyBpbiBnbG9iYWxfMS5kZWZhdWx0ICYmIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LmZldGNoID09PSAnZnVuY3Rpb24nLCB0cnVlKTtcclxuaGFzXzEuYWRkKCd3ZWItd29ya2VyLXhoci11cGxvYWQnLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ2xvYmFsXzEuZGVmYXVsdC5Xb3JrZXIgIT09IHVuZGVmaW5lZCAmJiBnbG9iYWxfMS5kZWZhdWx0LlVSTCAmJiBnbG9iYWxfMS5kZWZhdWx0LlVSTC5jcmVhdGVPYmplY3RVUkwpIHtcclxuICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbXHJcbiAgICAgICAgICAgICAgICBcIihmdW5jdGlvbiAoKSB7XFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKCkge1xcblxcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcXG5cXHR0cnkge1xcblxcdFxcdHhoci51cGxvYWQ7XFxuXFx0XFx0cG9zdE1lc3NhZ2UoJ3RydWUnKTtcXG5cXHR9IGNhdGNoIChlKSB7XFxuXFx0XFx0cG9zdE1lc3NhZ2UoJ2ZhbHNlJyk7XFxuXFx0fVxcbn0pO1xcblxcdFxcdH0pKClcIlxyXG4gICAgICAgICAgICBdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9KTtcclxuICAgICAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcbiAgICAgICAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX2EuZGF0YTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0ID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gSUUxMSBvbiBXaW5vZHdzIDguMSBlbmNvdW50ZXJzIGEgc2VjdXJpdHkgZXJyb3IuXHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICB9XHJcbn0pLCB0cnVlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9oYXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBvYmplY3RfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL29iamVjdFwiKTtcclxudmFyIG9iamVjdF8yID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vb2JqZWN0XCIpO1xyXG5leHBvcnRzLmFzc2lnbiA9IG9iamVjdF8yLmFzc2lnbjtcclxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4vKipcclxuICogVHlwZSBndWFyZCB0aGF0IGVuc3VyZXMgdGhhdCB0aGUgdmFsdWUgY2FuIGJlIGNvZXJjZWQgdG8gT2JqZWN0XHJcbiAqIHRvIHdlZWQgb3V0IGhvc3Qgb2JqZWN0cyB0aGF0IGRvIG5vdCBkZXJpdmUgZnJvbSBPYmplY3QuXHJcbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjaGVjayBpZiB3ZSB3YW50IHRvIGRlZXAgY29weSBhbiBvYmplY3Qgb3Igbm90LlxyXG4gKiBOb3RlOiBJbiBFUzYgaXQgaXMgcG9zc2libGUgdG8gbW9kaWZ5IGFuIG9iamVjdCdzIFN5bWJvbC50b1N0cmluZ1RhZyBwcm9wZXJ0eSwgd2hpY2ggd2lsbFxyXG4gKiBjaGFuZ2UgdGhlIHZhbHVlIHJldHVybmVkIGJ5IGB0b1N0cmluZ2AuIFRoaXMgaXMgYSByYXJlIGVkZ2UgY2FzZSB0aGF0IGlzIGRpZmZpY3VsdCB0byBoYW5kbGUsXHJcbiAqIHNvIGl0IGlzIG5vdCBoYW5kbGVkIGhlcmUuXHJcbiAqIEBwYXJhbSAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrXHJcbiAqIEByZXR1cm4gICAgICAgSWYgdGhlIHZhbHVlIGlzIGNvZXJjaWJsZSBpbnRvIGFuIE9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gc2hvdWxkRGVlcENvcHlPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcclxufVxyXG5mdW5jdGlvbiBjb3B5QXJyYXkoYXJyYXksIGluaGVyaXRlZCkge1xyXG4gICAgcmV0dXJuIGFycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3B5QXJyYXkoaXRlbSwgaW5oZXJpdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICFzaG91bGREZWVwQ29weU9iamVjdChpdGVtKVxyXG4gICAgICAgICAgICA/IGl0ZW1cclxuICAgICAgICAgICAgOiBfbWl4aW4oe1xyXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGluaGVyaXRlZDogaW5oZXJpdGVkLFxyXG4gICAgICAgICAgICAgICAgc291cmNlczogW2l0ZW1dLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7fVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIF9taXhpbihrd0FyZ3MpIHtcclxuICAgIHZhciBkZWVwID0ga3dBcmdzLmRlZXA7XHJcbiAgICB2YXIgaW5oZXJpdGVkID0ga3dBcmdzLmluaGVyaXRlZDtcclxuICAgIHZhciB0YXJnZXQgPSBrd0FyZ3MudGFyZ2V0O1xyXG4gICAgdmFyIGNvcGllZCA9IGt3QXJncy5jb3BpZWQgfHwgW107XHJcbiAgICB2YXIgY29waWVkQ2xvbmUgPSB0c2xpYl8xLl9fc3ByZWFkKGNvcGllZCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGt3QXJncy5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IGt3QXJncy5zb3VyY2VzW2ldO1xyXG4gICAgICAgIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29waWVkQ2xvbmUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvcHlBcnJheSh2YWx1ZSwgaW5oZXJpdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2hvdWxkRGVlcENvcHlPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3BpZWQucHVzaChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF9taXhpbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJpdGVkOiBpbmhlcml0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBbdmFsdWVdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcGllZDogY29waWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZShwcm90b3R5cGUpIHtcclxuICAgIHZhciBtaXhpbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgbWl4aW5zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgaWYgKCFtaXhpbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xhbmcuY3JlYXRlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBtaXhpbiBvYmplY3QuJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgYXJncyA9IG1peGlucy5zbGljZSgpO1xyXG4gICAgYXJncy51bnNoaWZ0KE9iamVjdC5jcmVhdGUocHJvdG90eXBlKSk7XHJcbiAgICByZXR1cm4gb2JqZWN0XzEuYXNzaWduLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xyXG5mdW5jdGlvbiBkZWVwQXNzaWduKHRhcmdldCkge1xyXG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgc291cmNlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBfbWl4aW4oe1xyXG4gICAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgICAgaW5oZXJpdGVkOiBmYWxzZSxcclxuICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLFxyXG4gICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZXBBc3NpZ24gPSBkZWVwQXNzaWduO1xyXG5mdW5jdGlvbiBkZWVwTWl4aW4odGFyZ2V0KSB7XHJcbiAgICB2YXIgc291cmNlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9taXhpbih7XHJcbiAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICBpbmhlcml0ZWQ6IHRydWUsXHJcbiAgICAgICAgc291cmNlczogc291cmNlcyxcclxuICAgICAgICB0YXJnZXQ6IHRhcmdldFxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5kZWVwTWl4aW4gPSBkZWVwTWl4aW47XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgc291cmNlJ3MgcHJvdG90eXBlIGFzIHRoZSBwcm90b3R5cGUgZm9yIHRoZSBuZXcgb2JqZWN0LCBhbmQgdGhlblxyXG4gKiBkZWVwIGNvcGllcyB0aGUgcHJvdmlkZWQgc291cmNlJ3MgdmFsdWVzIGludG8gdGhlIG5ldyB0YXJnZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBzb3VyY2UgVGhlIG9iamVjdCB0byBkdXBsaWNhdGVcclxuICogQHJldHVybiBUaGUgbmV3IG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gZHVwbGljYXRlKHNvdXJjZSkge1xyXG4gICAgdmFyIHRhcmdldCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkpO1xyXG4gICAgcmV0dXJuIGRlZXBNaXhpbih0YXJnZXQsIHNvdXJjZSk7XHJcbn1cclxuZXhwb3J0cy5kdXBsaWNhdGUgPSBkdXBsaWNhdGU7XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhIEZpcnN0IHZhbHVlIHRvIGNvbXBhcmVcclxuICogQHBhcmFtIGIgU2Vjb25kIHZhbHVlIHRvIGNvbXBhcmVcclxuICogQHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZXMgYXJlIHRoZSBzYW1lOyBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzSWRlbnRpY2FsKGEsIGIpIHtcclxuICAgIHJldHVybiAoYSA9PT0gYiB8fFxyXG4gICAgICAgIC8qIGJvdGggdmFsdWVzIGFyZSBOYU4gKi9cclxuICAgICAgICAoYSAhPT0gYSAmJiBiICE9PSBiKSk7XHJcbn1cclxuZXhwb3J0cy5pc0lkZW50aWNhbCA9IGlzSWRlbnRpY2FsO1xyXG4vKipcclxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYmluZHMgYSBtZXRob2QgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QgYXQgcnVudGltZS4gVGhpcyBpcyBzaW1pbGFyIHRvXHJcbiAqIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAsIGJ1dCBpbnN0ZWFkIG9mIGEgZnVuY3Rpb24gaXQgdGFrZXMgdGhlIG5hbWUgb2YgYSBtZXRob2Qgb24gYW4gb2JqZWN0LlxyXG4gKiBBcyBhIHJlc3VsdCwgdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5IGBsYXRlQmluZGAgd2lsbCBhbHdheXMgY2FsbCB0aGUgZnVuY3Rpb24gY3VycmVudGx5IGFzc2lnbmVkIHRvXHJcbiAqIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIG9iamVjdCBhcyBvZiB0aGUgbW9tZW50IHRoZSBmdW5jdGlvbiBpdCByZXR1cm5zIGlzIGNhbGxlZC5cclxuICpcclxuICogQHBhcmFtIGluc3RhbmNlIFRoZSBjb250ZXh0IG9iamVjdFxyXG4gKiBAcGFyYW0gbWV0aG9kIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgb24gdGhlIGNvbnRleHQgb2JqZWN0IHRvIGJpbmQgdG8gaXRzZWxmXHJcbiAqIEBwYXJhbSBzdXBwbGllZEFyZ3MgQW4gb3B0aW9uYWwgYXJyYXkgb2YgdmFsdWVzIHRvIHByZXBlbmQgdG8gdGhlIGBpbnN0YW5jZVttZXRob2RdYCBhcmd1bWVudHMgbGlzdFxyXG4gKiBAcmV0dXJuIFRoZSBib3VuZCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gbGF0ZUJpbmQoaW5zdGFuY2UsIG1ldGhvZCkge1xyXG4gICAgdmFyIHN1cHBsaWVkQXJncyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBzdXBwbGllZEFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwcGxpZWRBcmdzLmxlbmd0aFxyXG4gICAgICAgID8gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPyBzdXBwbGllZEFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBzdXBwbGllZEFyZ3M7XHJcbiAgICAgICAgICAgIC8vIFRTNzAxN1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VbbWV0aG9kXS5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBUUzcwMTdcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlW21ldGhvZF0uYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxufVxyXG5leHBvcnRzLmxhdGVCaW5kID0gbGF0ZUJpbmQ7XHJcbmZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xyXG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgc291cmNlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBfbWl4aW4oe1xyXG4gICAgICAgIGRlZXA6IGZhbHNlLFxyXG4gICAgICAgIGluaGVyaXRlZDogdHJ1ZSxcclxuICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLFxyXG4gICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm1peGluID0gbWl4aW47XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzIHByZXBlbmRlZCB0byBpdHMgYXJndW1lbnQgbGlzdC5cclxuICogTGlrZSBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgLCBidXQgZG9lcyBub3QgYWx0ZXIgZXhlY3V0aW9uIGNvbnRleHQuXHJcbiAqXHJcbiAqIEBwYXJhbSB0YXJnZXRGdW5jdGlvbiBUaGUgZnVuY3Rpb24gdGhhdCBuZWVkcyB0byBiZSBib3VuZFxyXG4gKiBAcGFyYW0gc3VwcGxpZWRBcmdzIEFuIG9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwcmVwZW5kIHRvIHRoZSBgdGFyZ2V0RnVuY3Rpb25gIGFyZ3VtZW50cyBsaXN0XHJcbiAqIEByZXR1cm4gVGhlIGJvdW5kIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJ0aWFsKHRhcmdldEZ1bmN0aW9uKSB7XHJcbiAgICB2YXIgc3VwcGxpZWRBcmdzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHN1cHBsaWVkQXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID8gc3VwcGxpZWRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogc3VwcGxpZWRBcmdzO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5wYXJ0aWFsID0gcGFydGlhbDtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggYSBkZXN0cm95IG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgY2FsbHMgdGhlIHBhc3NlZC1pbiBkZXN0cnVjdG9yLlxyXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSB1bmlmaWVkIGludGVyZmFjZSBmb3IgY3JlYXRpbmcgXCJyZW1vdmVcIiAvIFwiZGVzdHJveVwiIGhhbmRsZXJzIGZvclxyXG4gKiBldmVudCBsaXN0ZW5lcnMsIHRpbWVycywgZXRjLlxyXG4gKlxyXG4gKiBAcGFyYW0gZGVzdHJ1Y3RvciBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgaGFuZGxlJ3MgYGRlc3Ryb3lgIG1ldGhvZCBpcyBpbnZva2VkXHJcbiAqIEByZXR1cm4gVGhlIGhhbmRsZSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUhhbmRsZShkZXN0cnVjdG9yKSB7XHJcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlSGFuZGxlID0gY3JlYXRlSGFuZGxlO1xyXG4vKipcclxuICogUmV0dXJucyBhIHNpbmdsZSBoYW5kbGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkZXN0cm95IG11bHRpcGxlIGhhbmRsZXMgc2ltdWx0YW5lb3VzbHkuXHJcbiAqXHJcbiAqIEBwYXJhbSBoYW5kbGVzIEFuIGFycmF5IG9mIGhhbmRsZXMgd2l0aCBgZGVzdHJveWAgbWV0aG9kc1xyXG4gKiBAcmV0dXJuIFRoZSBoYW5kbGUgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVDb21wb3NpdGVIYW5kbGUoKSB7XHJcbiAgICB2YXIgaGFuZGxlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBoYW5kbGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlSGFuZGxlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaGFuZGxlc1tpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVDb21wb3NpdGVIYW5kbGUgPSBjcmVhdGVDb21wb3NpdGVIYW5kbGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9sYW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2xhbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLyoqXHJcbiAqIFJldHVybnMgYSB2NCBjb21wbGlhbnQgVVVJRC5cclxuICpcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHV1aWQoKSB7XHJcbiAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgIHZhciByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSB1dWlkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvdXVpZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS91dWlkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIGlzRmVhdHVyZVRlc3RUaGVuYWJsZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLnRoZW47XHJcbn1cclxuLyoqXHJcbiAqIEEgY2FjaGUgb2YgcmVzdWx0cyBvZiBmZWF0dXJlIHRlc3RzXHJcbiAqL1xyXG5leHBvcnRzLnRlc3RDYWNoZSA9IHt9O1xyXG4vKipcclxuICogQSBjYWNoZSBvZiB0aGUgdW4tcmVzb2x2ZWQgZmVhdHVyZSB0ZXN0c1xyXG4gKi9cclxuZXhwb3J0cy50ZXN0RnVuY3Rpb25zID0ge307XHJcbi8qKlxyXG4gKiBBIGNhY2hlIG9mIHVucmVzb2x2ZWQgdGhlbmFibGVzIChwcm9iYWJseSBwcm9taXNlcylcclxuICogQHR5cGUge3t9fVxyXG4gKi9cclxudmFyIHRlc3RUaGVuYWJsZXMgPSB7fTtcclxuLyoqXHJcbiAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgc2NvcGUgKGB3aW5kb3dgIGluIGEgYnJvd3NlciwgYGdsb2JhbGAgaW4gTm9kZUpTKVxyXG4gKi9cclxudmFyIGdsb2JhbFNjb3BlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBCcm93c2Vyc1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIE5vZGVcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLy8gV2ViIHdvcmtlcnNcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICByZXR1cm4ge307XHJcbn0pKCk7XHJcbi8qIEdyYWIgdGhlIHN0YXRpY0ZlYXR1cmVzIGlmIHRoZXJlIGFyZSBhdmFpbGFibGUgKi9cclxudmFyIHN0YXRpY0ZlYXR1cmVzID0gKGdsb2JhbFNjb3BlLkRvam9IYXNFbnZpcm9ubWVudCB8fCB7fSkuc3RhdGljRmVhdHVyZXM7XHJcbi8qIENsZWFuaW5nIHVwIHRoZSBEb2pvSGFzRW52aW9ybm1lbnQgKi9cclxuaWYgKCdEb2pvSGFzRW52aXJvbm1lbnQnIGluIGdsb2JhbFNjb3BlKSB7XHJcbiAgICBkZWxldGUgZ2xvYmFsU2NvcGUuRG9qb0hhc0Vudmlyb25tZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDdXN0b20gdHlwZSBndWFyZCB0byBuYXJyb3cgdGhlIGBzdGF0aWNGZWF0dXJlc2AgdG8gZWl0aGVyIGEgbWFwIG9yIGEgZnVuY3Rpb24gdGhhdFxyXG4gKiByZXR1cm5zIGEgbWFwLlxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGd1YXJkIGZvclxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdGF0aWNGZWF0dXJlRnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuLyoqXHJcbiAqIFRoZSBjYWNoZSBvZiBhc3NlcnRlZCBmZWF0dXJlcyB0aGF0IHdlcmUgYXZhaWxhYmxlIGluIHRoZSBnbG9iYWwgc2NvcGUgd2hlbiB0aGVcclxuICogbW9kdWxlIGxvYWRlZFxyXG4gKi9cclxudmFyIHN0YXRpY0NhY2hlID0gc3RhdGljRmVhdHVyZXNcclxuICAgID8gaXNTdGF0aWNGZWF0dXJlRnVuY3Rpb24oc3RhdGljRmVhdHVyZXMpID8gc3RhdGljRmVhdHVyZXMuYXBwbHkoZ2xvYmFsU2NvcGUpIDogc3RhdGljRmVhdHVyZXNcclxuICAgIDoge307LyogUHJvdmlkaW5nIGFuIGVtcHR5IGNhY2hlLCBpZiBub25lIHdhcyBpbiB0aGUgZW52aXJvbm1lbnRcclxuXHJcbi8qKlxyXG4qIEFNRCBwbHVnaW4gZnVuY3Rpb24uXHJcbipcclxuKiBDb25kaXRpb25hbCBsb2FkcyBtb2R1bGVzIGJhc2VkIG9uIGEgaGFzIGZlYXR1cmUgdGVzdCB2YWx1ZS5cclxuKlxyXG4qIEBwYXJhbSByZXNvdXJjZUlkIEdpdmVzIHRoZSByZXNvbHZlZCBtb2R1bGUgaWQgdG8gbG9hZC5cclxuKiBAcGFyYW0gcmVxdWlyZSBUaGUgbG9hZGVyIHJlcXVpcmUgZnVuY3Rpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2R1bGUgdGhhdCBjb250YWluZWQgdGhlIHBsdWdpbiByZXNvdXJjZSBpbiBpdHNcclxuKiAgICAgICAgICAgICAgICBkZXBlbmRlbmN5IGxpc3QuXHJcbiogQHBhcmFtIGxvYWQgQ2FsbGJhY2sgdG8gbG9hZGVyIHRoYXQgY29uc3VtZXMgcmVzdWx0IG9mIHBsdWdpbiBkZW1hbmQuXHJcbiovXHJcbmZ1bmN0aW9uIGxvYWQocmVzb3VyY2VJZCwgcmVxdWlyZSwgbG9hZCwgY29uZmlnKSB7XHJcbiAgICByZXNvdXJjZUlkID8gcmVxdWlyZShbcmVzb3VyY2VJZF0sIGxvYWQpIDogbG9hZCgpO1xyXG59XHJcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XHJcbi8qKlxyXG4gKiBBTUQgcGx1Z2luIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBSZXNvbHZlcyByZXNvdXJjZUlkIGludG8gYSBtb2R1bGUgaWQgYmFzZWQgb24gcG9zc2libHktbmVzdGVkIHRlbmFyeSBleHByZXNzaW9uIHRoYXQgYnJhbmNoZXMgb24gaGFzIGZlYXR1cmUgdGVzdFxyXG4gKiB2YWx1ZShzKS5cclxuICpcclxuICogQHBhcmFtIHJlc291cmNlSWQgVGhlIGlkIG9mIHRoZSBtb2R1bGVcclxuICogQHBhcmFtIG5vcm1hbGl6ZSBSZXNvbHZlcyBhIHJlbGF0aXZlIG1vZHVsZSBpZCBpbnRvIGFuIGFic29sdXRlIG1vZHVsZSBpZFxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplKHJlc291cmNlSWQsIG5vcm1hbGl6ZSkge1xyXG4gICAgdmFyIHRva2VucyA9IHJlc291cmNlSWQubWF0Y2goL1tcXD86XXxbXjpcXD9dKi9nKSB8fCBbXTtcclxuICAgIHZhciBpID0gMDtcclxuICAgIGZ1bmN0aW9uIGdldChza2lwKSB7XHJcbiAgICAgICAgdmFyIHRlcm0gPSB0b2tlbnNbaSsrXTtcclxuICAgICAgICBpZiAodGVybSA9PT0gJzonKSB7XHJcbiAgICAgICAgICAgIC8vIGVtcHR5IHN0cmluZyBtb2R1bGUgbmFtZSwgcmVzb2x2ZXMgdG8gbnVsbFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBvc3RmaXhlZCB3aXRoIGEgPyBtZWFucyBpdCBpcyBhIGZlYXR1cmUgdG8gYnJhbmNoIG9uLCB0aGUgdGVybSBpcyB0aGUgbmFtZSBvZiB0aGUgZmVhdHVyZVxyXG4gICAgICAgICAgICBpZiAodG9rZW5zW2krK10gPT09ICc/Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFza2lwICYmIGhhcyh0ZXJtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoZWQgdGhlIGZlYXR1cmUsIGdldCB0aGUgZmlyc3QgdmFsdWUgZnJvbSB0aGUgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCBub3QgbWF0Y2gsIGdldCB0aGUgc2Vjb25kIHZhbHVlLCBwYXNzaW5nIG92ZXIgdGhlIGZpcnN0XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoc2tpcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYSBtb2R1bGVcclxuICAgICAgICAgICAgcmV0dXJuIHRlcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGlkID0gZ2V0KCk7XHJcbiAgICByZXR1cm4gaWQgJiYgbm9ybWFsaXplKGlkKTtcclxufVxyXG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgZmVhdHVyZSBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRcclxuICpcclxuICogQHBhcmFtIGZlYXR1cmUgdGhlIG5hbWUgb2YgdGhlIGZlYXR1cmVcclxuICovXHJcbmZ1bmN0aW9uIGV4aXN0cyhmZWF0dXJlKSB7XHJcbiAgICB2YXIgbm9ybWFsaXplZEZlYXR1cmUgPSBmZWF0dXJlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gQm9vbGVhbihub3JtYWxpemVkRmVhdHVyZSBpbiBzdGF0aWNDYWNoZSB8fCBub3JtYWxpemVkRmVhdHVyZSBpbiBleHBvcnRzLnRlc3RDYWNoZSB8fCBleHBvcnRzLnRlc3RGdW5jdGlvbnNbbm9ybWFsaXplZEZlYXR1cmVdKTtcclxufVxyXG5leHBvcnRzLmV4aXN0cyA9IGV4aXN0cztcclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgbmV3IHRlc3QgZm9yIGEgbmFtZWQgZmVhdHVyZS5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogaGFzLmFkZCgnZG9tLWFkZGV2ZW50bGlzdGVuZXInLCAhIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpO1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBoYXMuYWRkKCd0b3VjaC1ldmVudHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAqICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudFxyXG4gKiB9KTtcclxuICpcclxuICogQHBhcmFtIGZlYXR1cmUgdGhlIG5hbWUgb2YgdGhlIGZlYXR1cmVcclxuICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSByZXBvcnRlZCBvZiB0aGUgZmVhdHVyZSwgb3IgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgb25jZSBvbiBmaXJzdCB0ZXN0XHJcbiAqIEBwYXJhbSBvdmVyd3JpdGUgaWYgYW4gZXhpc3RpbmcgdmFsdWUgc2hvdWxkIGJlIG92ZXJ3cml0dGVuLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGFkZChmZWF0dXJlLCB2YWx1ZSwgb3ZlcndyaXRlKSB7XHJcbiAgICBpZiAob3ZlcndyaXRlID09PSB2b2lkIDApIHsgb3ZlcndyaXRlID0gZmFsc2U7IH1cclxuICAgIHZhciBub3JtYWxpemVkRmVhdHVyZSA9IGZlYXR1cmUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChleGlzdHMobm9ybWFsaXplZEZlYXR1cmUpICYmICFvdmVyd3JpdGUgJiYgIShub3JtYWxpemVkRmVhdHVyZSBpbiBzdGF0aWNDYWNoZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmVhdHVyZSBcXFwiXCIgKyBmZWF0dXJlICsgXCJcXFwiIGV4aXN0cyBhbmQgb3ZlcndyaXRlIG5vdCB0cnVlLlwiKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBleHBvcnRzLnRlc3RGdW5jdGlvbnNbbm9ybWFsaXplZEZlYXR1cmVdID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0ZlYXR1cmVUZXN0VGhlbmFibGUodmFsdWUpKSB7XHJcbiAgICAgICAgdGVzdFRoZW5hYmxlc1tmZWF0dXJlXSA9IHZhbHVlLnRoZW4oZnVuY3Rpb24gKHJlc29sdmVkVmFsdWUpIHtcclxuICAgICAgICAgICAgZXhwb3J0cy50ZXN0Q2FjaGVbZmVhdHVyZV0gPSByZXNvbHZlZFZhbHVlO1xyXG4gICAgICAgICAgICBkZWxldGUgdGVzdFRoZW5hYmxlc1tmZWF0dXJlXTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0ZXN0VGhlbmFibGVzW2ZlYXR1cmVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZXhwb3J0cy50ZXN0Q2FjaGVbbm9ybWFsaXplZEZlYXR1cmVdID0gdmFsdWU7XHJcbiAgICAgICAgZGVsZXRlIGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hZGQgPSBhZGQ7XHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIGN1cnJlbnQgdmFsdWUgb2YgYSBuYW1lZCBmZWF0dXJlLlxyXG4gKlxyXG4gKiBAcGFyYW0gZmVhdHVyZSBUaGUgbmFtZSAoaWYgYSBzdHJpbmcpIG9yIGlkZW50aWZpZXIgKGlmIGFuIGludGVnZXIpIG9mIHRoZSBmZWF0dXJlIHRvIHRlc3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXMoZmVhdHVyZSkge1xyXG4gICAgdmFyIHJlc3VsdDtcclxuICAgIHZhciBub3JtYWxpemVkRmVhdHVyZSA9IGZlYXR1cmUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChub3JtYWxpemVkRmVhdHVyZSBpbiBzdGF0aWNDYWNoZSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHN0YXRpY0NhY2hlW25vcm1hbGl6ZWRGZWF0dXJlXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV0pIHtcclxuICAgICAgICByZXN1bHQgPSBleHBvcnRzLnRlc3RDYWNoZVtub3JtYWxpemVkRmVhdHVyZV0gPSBleHBvcnRzLnRlc3RGdW5jdGlvbnNbbm9ybWFsaXplZEZlYXR1cmVdLmNhbGwobnVsbCk7XHJcbiAgICAgICAgZGVsZXRlIGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChub3JtYWxpemVkRmVhdHVyZSBpbiBleHBvcnRzLnRlc3RDYWNoZSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGV4cG9ydHMudGVzdENhY2hlW25vcm1hbGl6ZWRGZWF0dXJlXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZlYXR1cmUgaW4gdGVzdFRoZW5hYmxlcykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBdHRlbXB0IHRvIGRldGVjdCB1bnJlZ2lzdGVyZWQgaGFzIGZlYXR1cmUgXFxcIlwiICsgZmVhdHVyZSArIFwiXFxcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gaGFzO1xyXG4vKlxyXG4gKiBPdXQgb2YgdGhlIGJveCBmZWF0dXJlIHRlc3RzXHJcbiAqL1xyXG4vKiBFbnZpcm9ubWVudHMgKi9cclxuLyogVXNlZCBhcyBhIHZhbHVlIHRvIHByb3ZpZGUgYSBkZWJ1ZyBvbmx5IGNvZGUgcGF0aCAqL1xyXG5hZGQoJ2RlYnVnJywgdHJ1ZSk7XHJcbi8qIERldGVjdHMgaWYgdGhlIGVudmlyb25tZW50IGlzIFwiYnJvd3NlciBsaWtlXCIgKi9cclxuYWRkKCdob3N0LWJyb3dzZXInLCB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpO1xyXG4vKiBEZXRlY3RzIGlmIHRoZSBlbnZpcm9ubWVudCBhcHBlYXJzIHRvIGJlIE5vZGVKUyAqL1xyXG5hZGQoJ2hvc3Qtbm9kZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpIHtcclxuICAgICAgICByZXR1cm4gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlO1xyXG4gICAgfVxyXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9oYXMvaGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9oYXMvaGFzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciBvYmplY3RfMSA9IHJlcXVpcmUoXCIuL29iamVjdFwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9oYXNcIik7XHJcbnJlcXVpcmUoXCIuL1N5bWJvbFwiKTtcclxuZXhwb3J0cy5NYXAgPSBnbG9iYWxfMS5kZWZhdWx0Lk1hcDtcclxuaWYgKCFoYXNfMS5kZWZhdWx0KCdlczYtbWFwJykpIHtcclxuICAgIGV4cG9ydHMuTWFwID0gKF9hID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBNYXAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tTeW1ib2wudG9TdHJpbmdUYWddID0gJ01hcCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3JfMS5pc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCh2YWx1ZVswXSwgdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IHRzbGliXzEuX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhYmxlXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCh2YWx1ZVswXSwgdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQW4gYWx0ZXJuYXRpdmUgdG8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgdXNpbmcgT2JqZWN0LmlzXHJcbiAgICAgICAgICAgICAqIHRvIGNoZWNrIGZvciBlcXVhbGl0eS4gU2VlIGh0dHA6Ly9temwubGEvMXp1S08yVlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5faW5kZXhPZktleSA9IGZ1bmN0aW9uIChrZXlzLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGhfMSA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoXzE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RfMS5pcyhrZXlzW2ldLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fa2V5cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoID0gdGhpcy5fdmFsdWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gdGhpcy5fa2V5cy5tYXAoZnVuY3Rpb24gKGtleSwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCBfdGhpcy5fdmFsdWVzW2ldXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih2YWx1ZXMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gdGhpcy5fa2V5cztcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoXzIgPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aF8yOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHZhbHVlc1tpXSwga2V5c1tpXSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IHRoaXMuX3ZhbHVlc1tpbmRleF07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KSA+IC0xO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGl0ZXJhdG9yXzEuU2hpbUl0ZXJhdG9yKHRoaXMuX2tleXMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4IDwgMCA/IHRoaXMuX2tleXMubGVuZ3RoIDogaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzW2luZGV4XSA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaXRlcmF0b3JfMS5TaGltSXRlcmF0b3IodGhpcy5fdmFsdWVzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgICAgIH0oKSksXHJcbiAgICAgICAgX2FbU3ltYm9sLnNwZWNpZXNdID0gX2EsXHJcbiAgICAgICAgX2EpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuTWFwO1xyXG52YXIgX2E7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9NYXAuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vTWFwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciBxdWV1ZV8xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9xdWV1ZVwiKTtcclxucmVxdWlyZShcIi4vU3ltYm9sXCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxuZXhwb3J0cy5TaGltUHJvbWlzZSA9IGdsb2JhbF8xLmRlZmF1bHQuUHJvbWlzZTtcclxuZXhwb3J0cy5pc1RoZW5hYmxlID0gZnVuY3Rpb24gaXNUaGVuYWJsZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xyXG59O1xyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ2VzNi1wcm9taXNlJykpIHtcclxuICAgIGdsb2JhbF8xLmRlZmF1bHQuUHJvbWlzZSA9IGV4cG9ydHMuU2hpbVByb21pc2UgPSAoX2EgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IFByb21pc2UuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZXhlY3V0b3JcclxuICAgICAgICAgICAgICogVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbW1lZGlhdGVseSB3aGVuIHRoZSBQcm9taXNlIGlzIGluc3RhbnRpYXRlZC4gSXQgaXMgcmVzcG9uc2libGUgZm9yXHJcbiAgICAgICAgICAgICAqIHN0YXJ0aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoZW4gaXQgaXMgaW52b2tlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogVGhlIGV4ZWN1dG9yIG11c3QgY2FsbCBlaXRoZXIgdGhlIHBhc3NlZCBgcmVzb2x2ZWAgZnVuY3Rpb24gd2hlbiB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkXHJcbiAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxseSwgb3IgdGhlIGByZWplY3RgIGZ1bmN0aW9uIHdoZW4gdGhlIG9wZXJhdGlvbiBmYWlscy5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDEgLyogUGVuZGluZyAqLztcclxuICAgICAgICAgICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9ICdQcm9taXNlJztcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogSWYgdHJ1ZSwgdGhlIHJlc29sdXRpb24gb2YgdGhpcyBwcm9taXNlIGlzIGNoYWluZWQgKFwibG9ja2VkIGluXCIpIHRvIGFub3RoZXIgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzQ2hhaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHByb21pc2UgaXMgaW4gYSByZXNvbHZlZCBzdGF0ZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnN0YXRlICE9PSAxIC8qIFBlbmRpbmcgKi8gfHwgaXNDaGFpbmVkO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQ2FsbGJhY2tzIHRoYXQgc2hvdWxkIGJlIGludm9rZWQgb25jZSB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEluaXRpYWxseSBwdXNoZXMgY2FsbGJhY2tzIG9udG8gYSBxdWV1ZSBmb3IgZXhlY3V0aW9uIG9uY2UgdGhpcyBwcm9taXNlIHNldHRsZXMuIEFmdGVyIHRoZSBwcm9taXNlIHNldHRsZXMsXHJcbiAgICAgICAgICAgICAgICAgKiBlbnF1ZXVlcyBjYWxsYmFja3MgZm9yIGV4ZWN1dGlvbiBvbiB0aGUgbmV4dCBldmVudCBsb29wIHR1cm4uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciB3aGVuRmluaXNoZWQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBTZXR0bGVzIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHNldHRsZSA9IGZ1bmN0aW9uIChuZXdTdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBIHByb21pc2UgY2FuIG9ubHkgYmUgc2V0dGxlZCBvbmNlLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zdGF0ZSAhPT0gMSAvKiBQZW5kaW5nICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNvbHZlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlbkZpbmlzaGVkID0gcXVldWVfMS5xdWV1ZU1pY3JvVGFzaztcclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGVucXVldWUgYSBjYWxsYmFjayBydW5uZXIgaWYgdGhlcmUgYXJlIGNhbGxiYWNrcyBzbyB0aGF0IGluaXRpYWxseSBmdWxmaWxsZWQgUHJvbWlzZXMgZG9uJ3QgaGF2ZSB0b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdhaXQgYW4gZXh0cmEgdHVybi5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzICYmIGNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlXzEucXVldWVNaWNyb1Rhc2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IGNhbGxiYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5jYWxsKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBSZXNvbHZlcyB0aGlzIHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIG5ld1N0YXRlIFRoZSByZXNvbHZlZCBzdGF0ZSBmb3IgdGhpcyBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtUfGFueX0gdmFsdWUgVGhlIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKG5ld1N0YXRlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1Jlc29sdmVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb3J0cy5pc1RoZW5hYmxlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50aGVuKHNldHRsZS5iaW5kKG51bGwsIDAgLyogRnVsZmlsbGVkICovKSwgc2V0dGxlLmJpbmQobnVsbCwgMiAvKiBSZWplY3RlZCAqLykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NoYWluZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGxlKG5ld1N0YXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbiA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW5GaW5pc2hlZCBpbml0aWFsbHkgcXVldWVzIHVwIGNhbGxiYWNrcyBmb3IgZXhlY3V0aW9uIGFmdGVyIHRoZSBwcm9taXNlIGhhcyBzZXR0bGVkLiBPbmNlIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9taXNlIGhhcyBzZXR0bGVkLCB3aGVuRmluaXNoZWQgd2lsbCBzY2hlZHVsZSBjYWxsYmFja3MgZm9yIGV4ZWN1dGlvbiBvbiB0aGUgbmV4dCB0dXJuIHRocm91Z2ggdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50IGxvb3AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZW5GaW5pc2hlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBfdGhpcy5zdGF0ZSA9PT0gMiAvKiBSZWplY3RlZCAqLyA/IG9uUmVqZWN0ZWQgOiBvbkZ1bGZpbGxlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhbGxiYWNrKF90aGlzLnJlc29sdmVkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuc3RhdGUgPT09IDIgLyogUmVqZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoX3RoaXMucmVzb2x2ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLnJlc29sdmVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dG9yKHJlc29sdmUuYmluZChudWxsLCAwIC8qIEZ1bGZpbGxlZCAqLyksIHJlc29sdmUuYmluZChudWxsLCAyIC8qIFJlamVjdGVkICovKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0bGUoMiAvKiBSZWplY3RlZCAqLywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsID0gZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVsYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGwoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytjb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcHVsYXRpbmcgfHwgY29tcGxldGUgPCB0b3RhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc0l0ZW0oaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyt0b3RhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cG9ydHMuaXNUaGVuYWJsZShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgYW4gaXRlbSBQcm9taXNlIHJlamVjdHMsIHRoaXMgUHJvbWlzZSBpcyBpbW1lZGlhdGVseSByZWplY3RlZCB3aXRoIHRoZSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9taXNlJ3MgcmVqZWN0aW9uIGVycm9yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aGVuKGZ1bGZpbGwuYmluZChudWxsLCBpbmRleCksIHJlamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoaXRlbSkudGhlbihmdWxmaWxsLmJpbmQobnVsbCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IHRzbGliXzEuX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0oaSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVfMSwgX2E7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzIgPSB0c2xpYl8xLl9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMl8xID0gaXRlcmFibGVfMi5uZXh0KCk7ICFpdGVyYWJsZV8yXzEuZG9uZTsgaXRlcmFibGVfMl8xID0gaXRlcmFibGVfMi5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlcmFibGVfMl8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSBQcm9taXNlIGl0ZW0gcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9taXNlJ3MgcmVqZWN0aW9uIGVycm9yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGhlbihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4ocmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8yXzEgJiYgIWl0ZXJhYmxlXzJfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzIucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlXzIsIF9hO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2U7XHJcbiAgICAgICAgfSgpKSxcclxuICAgICAgICBfYVtTeW1ib2wuc3BlY2llc10gPSBleHBvcnRzLlNoaW1Qcm9taXNlLFxyXG4gICAgICAgIF9hKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLlNoaW1Qcm9taXNlO1xyXG52YXIgX2E7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9Qcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1Byb21pc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbFwiKTtcclxudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKFwiLi9pdGVyYXRvclwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9oYXNcIik7XHJcbnJlcXVpcmUoXCIuL1N5bWJvbFwiKTtcclxuZXhwb3J0cy5TZXQgPSBnbG9iYWxfMS5kZWZhdWx0LlNldDtcclxuaWYgKCFoYXNfMS5kZWZhdWx0KCdlczYtc2V0JykpIHtcclxuICAgIGV4cG9ydHMuU2V0ID0gKF9hID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBTZXQoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9ICdTZXQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yXzEuaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZXJhYmxlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzEgPSB0c2xpYl8xLl9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCk7ICFpdGVyYWJsZV8xXzEuZG9uZTsgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZV8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YS5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMuX3NldERhdGEuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGEuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih0aGlzLl9zZXREYXRhLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIFt2YWx1ZSwgdmFsdWVdOyB9KSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFja2ZuLCB0aGlzQXJnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICghcmVzdWx0LmRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja2ZuLmNhbGwodGhpc0FyZywgcmVzdWx0LnZhbHVlLCByZXN1bHQudmFsdWUsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXREYXRhLmluZGV4T2YodmFsdWUpID4gLTE7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaXRlcmF0b3JfMS5TaGltSXRlcmF0b3IodGhpcy5fc2V0RGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldERhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih0aGlzLl9zZXREYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih0aGlzLl9zZXREYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIFNldDtcclxuICAgICAgICB9KCkpLFxyXG4gICAgICAgIF9hW1N5bWJvbC5zcGVjaWVzXSA9IF9hLFxyXG4gICAgICAgIF9hKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLlNldDtcclxudmFyIF9hO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vU2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1NldC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vc3VwcG9ydC91dGlsXCIpO1xyXG5leHBvcnRzLlN5bWJvbCA9IGdsb2JhbF8xLmRlZmF1bHQuU3ltYm9sO1xyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ2VzNi1zeW1ib2wnKSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaHJvd3MgaWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN5bWJvbCwgdXNlZCBpbnRlcm5hbGx5IHdpdGhpbiB0aGUgU2hpbVxyXG4gICAgICogQHBhcmFtICB7YW55fSAgICB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm4ge3N5bWJvbH0gICAgICAgUmV0dXJucyB0aGUgc3ltYm9sIG9yIHRocm93c1xyXG4gICAgICovXHJcbiAgICB2YXIgdmFsaWRhdGVTeW1ib2xfMSA9IGZ1bmN0aW9uIHZhbGlkYXRlU3ltYm9sKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih2YWx1ZSArICcgaXMgbm90IGEgc3ltYm9sJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICB2YXIgZGVmaW5lUHJvcGVydGllc18xID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XHJcbiAgICB2YXIgZGVmaW5lUHJvcGVydHlfMSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcclxuICAgIHZhciBjcmVhdGVfMSA9IE9iamVjdC5jcmVhdGU7XHJcbiAgICB2YXIgb2JqUHJvdG90eXBlXzEgPSBPYmplY3QucHJvdG90eXBlO1xyXG4gICAgdmFyIGdsb2JhbFN5bWJvbHNfMSA9IHt9O1xyXG4gICAgdmFyIGdldFN5bWJvbE5hbWVfMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNyZWF0ZWQgPSBjcmVhdGVfMShudWxsKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRlc2MpIHtcclxuICAgICAgICAgICAgdmFyIHBvc3RmaXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTtcclxuICAgICAgICAgICAgd2hpbGUgKGNyZWF0ZWRbU3RyaW5nKGRlc2MpICsgKHBvc3RmaXggfHwgJycpXSkge1xyXG4gICAgICAgICAgICAgICAgKytwb3N0Zml4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlc2MgKz0gU3RyaW5nKHBvc3RmaXggfHwgJycpO1xyXG4gICAgICAgICAgICBjcmVhdGVkW2Rlc2NdID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmFtZSA9ICdAQCcgKyBkZXNjO1xyXG4gICAgICAgICAgICAvLyBGSVhNRTogVGVtcG9yYXJ5IGd1YXJkIHVudGlsIHRoZSBkdXBsaWNhdGUgZXhlY3V0aW9uIHdoZW4gdGVzdGluZyBjYW4gYmVcclxuICAgICAgICAgICAgLy8gcGlubmVkIGRvd24uXHJcbiAgICAgICAgICAgIGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmpQcm90b3R5cGVfMSwgbmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5XzEob2JqUHJvdG90eXBlXzEsIG5hbWUsIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eV8xKHRoaXMsIG5hbWUsIHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuICAgIHZhciBJbnRlcm5hbFN5bWJvbF8xID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBJbnRlcm5hbFN5bWJvbF8xKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTeW1ib2woZGVzY3JpcHRpb24pO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuU3ltYm9sID0gZ2xvYmFsXzEuZGVmYXVsdC5TeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcclxuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlRXJyb3I6IFN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3ltID0gT2JqZWN0LmNyZWF0ZShJbnRlcm5hbFN5bWJvbF8xLnByb3RvdHlwZSk7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkID8gJycgOiBTdHJpbmcoZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0aWVzXzEoc3ltLCB7XHJcbiAgICAgICAgICAgIF9fZGVzY3JpcHRpb25fXzogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihkZXNjcmlwdGlvbiksXHJcbiAgICAgICAgICAgIF9fbmFtZV9fOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGdldFN5bWJvbE5hbWVfMShkZXNjcmlwdGlvbikpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyogRGVjb3JhdGUgdGhlIFN5bWJvbCBmdW5jdGlvbiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBwcm9wZXJ0aWVzICovXHJcbiAgICBkZWZpbmVQcm9wZXJ0eV8xKGV4cG9ydHMuU3ltYm9sLCAnZm9yJywgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbFN5bWJvbHNfMVtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxTeW1ib2xzXzFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChnbG9iYWxTeW1ib2xzXzFba2V5XSA9IGV4cG9ydHMuU3ltYm9sKFN0cmluZyhrZXkpKSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZWZpbmVQcm9wZXJ0aWVzXzEoZXhwb3J0cy5TeW1ib2wsIHtcclxuICAgICAgICBrZXlGb3I6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZnVuY3Rpb24gKHN5bSkge1xyXG4gICAgICAgICAgICB2YXIga2V5O1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVN5bWJvbF8xKHN5bSk7XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGdsb2JhbFN5bWJvbHNfMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFN5bWJvbHNfMVtrZXldID09PSBzeW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaGFzSW5zdGFuY2U6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCdoYXNJbnN0YW5jZScpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIGlzQ29uY2F0U3ByZWFkYWJsZTogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ2lzQ29uY2F0U3ByZWFkYWJsZScpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIGl0ZXJhdG9yOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcignaXRlcmF0b3InKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICBtYXRjaDogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ21hdGNoJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgb2JzZXJ2YWJsZTogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ29ic2VydmFibGUnKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICByZXBsYWNlOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcigncmVwbGFjZScpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIHNlYXJjaDogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ3NlYXJjaCcpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIHNwZWNpZXM6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCdzcGVjaWVzJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgc3BsaXQ6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCdzcGxpdCcpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIHRvUHJpbWl0aXZlOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcigndG9QcmltaXRpdmUnKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICB0b1N0cmluZ1RhZzogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ3RvU3RyaW5nVGFnJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgdW5zY29wYWJsZXM6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCd1bnNjb3BhYmxlcycpLCBmYWxzZSwgZmFsc2UpXHJcbiAgICB9KTtcclxuICAgIC8qIERlY29yYXRlIHRoZSBJbnRlcm5hbFN5bWJvbCBvYmplY3QgKi9cclxuICAgIGRlZmluZVByb3BlcnRpZXNfMShJbnRlcm5hbFN5bWJvbF8xLnByb3RvdHlwZSwge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sKSxcclxuICAgICAgICB0b1N0cmluZzogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbmFtZV9fO1xyXG4gICAgICAgIH0sIGZhbHNlLCBmYWxzZSlcclxuICAgIH0pO1xyXG4gICAgLyogRGVjb3JhdGUgdGhlIFN5bWJvbC5wcm90b3R5cGUgKi9cclxuICAgIGRlZmluZVByb3BlcnRpZXNfMShleHBvcnRzLlN5bWJvbC5wcm90b3R5cGUsIHtcclxuICAgICAgICB0b1N0cmluZzogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnU3ltYm9sICgnICsgdmFsaWRhdGVTeW1ib2xfMSh0aGlzKS5fX2Rlc2NyaXB0aW9uX18gKyAnKSc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdmFsdWVPZjogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZVN5bWJvbF8xKHRoaXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIGRlZmluZVByb3BlcnR5XzEoZXhwb3J0cy5TeW1ib2wucHJvdG90eXBlLCBleHBvcnRzLlN5bWJvbC50b1ByaW1pdGl2ZSwgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlU3ltYm9sXzEodGhpcyk7XHJcbiAgICB9KSk7XHJcbiAgICBkZWZpbmVQcm9wZXJ0eV8xKGV4cG9ydHMuU3ltYm9sLnByb3RvdHlwZSwgZXhwb3J0cy5TeW1ib2wudG9TdHJpbmdUYWcsIHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoJ1N5bWJvbCcsIGZhbHNlLCBmYWxzZSwgdHJ1ZSkpO1xyXG4gICAgZGVmaW5lUHJvcGVydHlfMShJbnRlcm5hbFN5bWJvbF8xLnByb3RvdHlwZSwgZXhwb3J0cy5TeW1ib2wudG9QcmltaXRpdmUsIHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wucHJvdG90eXBlW2V4cG9ydHMuU3ltYm9sLnRvUHJpbWl0aXZlXSwgZmFsc2UsIGZhbHNlLCB0cnVlKSk7XHJcbiAgICBkZWZpbmVQcm9wZXJ0eV8xKEludGVybmFsU3ltYm9sXzEucHJvdG90eXBlLCBleHBvcnRzLlN5bWJvbC50b1N0cmluZ1RhZywgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5wcm90b3R5cGVbZXhwb3J0cy5TeW1ib2wudG9TdHJpbmdUYWddLCBmYWxzZSwgZmFsc2UsIHRydWUpKTtcclxufVxyXG4vKipcclxuICogQSBjdXN0b20gZ3VhcmQgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIGlmIGFuIG9iamVjdCBpcyBhIHN5bWJvbCBvciBub3RcclxuICogQHBhcmFtICB7YW55fSAgICAgICB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2sgdG8gc2VlIGlmIGl0IGlzIGEgc3ltYm9sIG9yIG5vdFxyXG4gKiBAcmV0dXJuIHtpcyBzeW1ib2x9ICAgICAgIFJldHVybnMgdHJ1ZSBpZiBhIHN5bWJvbCBvciBub3QgKGFuZCBuYXJyb3dzIHRoZSB0eXBlIGd1YXJkKVxyXG4gKi9cclxuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCcgfHwgdmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpKSB8fCBmYWxzZTtcclxufVxyXG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XHJcbi8qKlxyXG4gKiBGaWxsIGFueSBtaXNzaW5nIHdlbGwga25vd24gc3ltYm9scyBpZiB0aGUgbmF0aXZlIFN5bWJvbCBpcyBtaXNzaW5nIHRoZW1cclxuICovXHJcbltcclxuICAgICdoYXNJbnN0YW5jZScsXHJcbiAgICAnaXNDb25jYXRTcHJlYWRhYmxlJyxcclxuICAgICdpdGVyYXRvcicsXHJcbiAgICAnc3BlY2llcycsXHJcbiAgICAncmVwbGFjZScsXHJcbiAgICAnc2VhcmNoJyxcclxuICAgICdzcGxpdCcsXHJcbiAgICAnbWF0Y2gnLFxyXG4gICAgJ3RvUHJpbWl0aXZlJyxcclxuICAgICd0b1N0cmluZ1RhZycsXHJcbiAgICAndW5zY29wYWJsZXMnLFxyXG4gICAgJ29ic2VydmFibGUnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAod2VsbEtub3duKSB7XHJcbiAgICBpZiAoIWV4cG9ydHMuU3ltYm9sW3dlbGxLbm93bl0pIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cy5TeW1ib2wsIHdlbGxLbm93biwgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3Iod2VsbEtub3duKSwgZmFsc2UsIGZhbHNlKSk7XHJcbiAgICB9XHJcbn0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLlN5bWJvbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbFwiKTtcclxudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKFwiLi9pdGVyYXRvclwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9oYXNcIik7XHJcbnJlcXVpcmUoXCIuL1N5bWJvbFwiKTtcclxuZXhwb3J0cy5XZWFrTWFwID0gZ2xvYmFsXzEuZGVmYXVsdC5XZWFrTWFwO1xyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ2VzNi13ZWFrbWFwJykpIHtcclxuICAgIHZhciBERUxFVEVEXzEgPSB7fTtcclxuICAgIHZhciBnZXRVSURfMSA9IGZ1bmN0aW9uIGdldFVJRCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKTtcclxuICAgIH07XHJcbiAgICB2YXIgZ2VuZXJhdGVOYW1lXzEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdGFydElkID0gTWF0aC5mbG9vcihEYXRlLm5vdygpICUgMTAwMDAwMDAwKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdGVOYW1lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ19fd20nICsgZ2V0VUlEXzEoKSArIChzdGFydElkKysgKyAnX18nKTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuICAgIGV4cG9ydHMuV2Vha01hcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBXZWFrTWFwKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9ICdXZWFrTWFwJztcclxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IGdlbmVyYXRlTmFtZV8xKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb3plbkVudHJpZXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3JfMS5pc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlcmFibGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGl0ZW1bMF0sIGl0ZW1bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzEgPSB0c2xpYl8xLl9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCk7ICFpdGVyYWJsZV8xXzEuZG9uZTsgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHRzbGliXzEuX19yZWFkKGl0ZXJhYmxlXzFfMS52YWx1ZSwgMiksIGtleSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYiA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2IuY2FsbChpdGVyYWJsZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlXzEsIF9iO1xyXG4gICAgICAgIH1cclxuICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5fZ2V0RnJvemVuRW50cnlJbmRleCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9mcm96ZW5FbnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnJvemVuRW50cmllc1tpXS5rZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IGtleVt0aGlzLl9uYW1lXTtcclxuICAgICAgICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5LmtleSA9PT0ga2V5ICYmIGVudHJ5LnZhbHVlICE9PSBERUxFVEVEXzEpIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnZhbHVlID0gREVMRVRFRF8xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGZyb3plbkluZGV4ID0gdGhpcy5fZ2V0RnJvemVuRW50cnlJbmRleChrZXkpO1xyXG4gICAgICAgICAgICBpZiAoZnJvemVuSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvemVuRW50cmllcy5zcGxpY2UoZnJvemVuSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IGtleVt0aGlzLl9uYW1lXTtcclxuICAgICAgICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5LmtleSA9PT0ga2V5ICYmIGVudHJ5LnZhbHVlICE9PSBERUxFVEVEXzEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChmcm96ZW5JbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZnJvemVuRW50cmllc1tmcm96ZW5JbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IGtleVt0aGlzLl9uYW1lXTtcclxuICAgICAgICAgICAgaWYgKEJvb2xlYW4oZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURURfMSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmcm96ZW5JbmRleCA9IHRoaXMuX2dldEZyb3plbkVudHJ5SW5kZXgoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGZyb3plbkluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICgha2V5IHx8ICh0eXBlb2Yga2V5ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Yga2V5ICE9PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB2YWx1ZSB1c2VkIGFzIHdlYWsgbWFwIGtleScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IGtleVt0aGlzLl9uYW1lXTtcclxuICAgICAgICAgICAgaWYgKCFlbnRyeSB8fCBlbnRyeS5rZXkgIT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHsgdmFsdWU6IGtleSB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaXNGcm96ZW4oa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zyb3plbkVudHJpZXMucHVzaChlbnRyeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5LCB0aGlzLl9uYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbnRyeVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVudHJ5LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFdlYWtNYXA7XHJcbiAgICB9KCkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuV2Vha01hcDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1dlYWtNYXAuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vV2Vha01hcC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xyXG52YXIgbnVtYmVyXzEgPSByZXF1aXJlKFwiLi9udW1iZXJcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvaGFzXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vc3VwcG9ydC91dGlsXCIpO1xyXG5pZiAoaGFzXzEuZGVmYXVsdCgnZXM2LWFycmF5JykgJiYgaGFzXzEuZGVmYXVsdCgnZXM2LWFycmF5LWZpbGwnKSkge1xyXG4gICAgZXhwb3J0cy5mcm9tID0gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5mcm9tO1xyXG4gICAgZXhwb3J0cy5vZiA9IGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkub2Y7XHJcbiAgICBleHBvcnRzLmNvcHlXaXRoaW4gPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LkFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKTtcclxuICAgIGV4cG9ydHMuZmlsbCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkucHJvdG90eXBlLmZpbGwpO1xyXG4gICAgZXhwb3J0cy5maW5kID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGUuZmluZCk7XHJcbiAgICBleHBvcnRzLmZpbmRJbmRleCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICAvLyBJdCBpcyBvbmx5IG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaS9pT1MgdGhhdCBoYXZlIGEgYmFkIGZpbGwgaW1wbGVtZW50YXRpb24gYW5kIHNvIGFyZW4ndCBpbiB0aGUgd2lsZFxyXG4gICAgLy8gVG8gbWFrZSB0aGluZ3MgZWFzaWVyLCBpZiB0aGVyZSBpcyBhIGJhZCBmaWxsIGltcGxlbWVudGF0aW9uLCB0aGUgd2hvbGUgc2V0IG9mIGZ1bmN0aW9ucyB3aWxsIGJlIGZpbGxlZFxyXG4gICAgLyoqXHJcbiAgICAgKiBFbnN1cmVzIGEgbm9uLW5lZ2F0aXZlLCBub24taW5maW5pdGUsIHNhZmUgaW50ZWdlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIFRoZSBudW1iZXIgdG8gdmFsaWRhdGVcclxuICAgICAqIEByZXR1cm4gQSBwcm9wZXIgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHZhciB0b0xlbmd0aF8xID0gZnVuY3Rpb24gdG9MZW5ndGgobGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKGxlbmd0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xyXG4gICAgICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IE1hdGguZmxvb3IobGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRW5zdXJlIGEgbm9uLW5lZ2F0aXZlLCByZWFsLCBzYWZlIGludGVnZXJcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuZ3RoLCAwKSwgbnVtYmVyXzEuTUFYX1NBRkVfSU5URUdFUik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGcm9tIEVTNiA3LjEuNCBUb0ludGVnZXIoKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBBIHZhbHVlIHRvIGNvbnZlcnRcclxuICAgICAqIEByZXR1cm4gQW4gaW50ZWdlclxyXG4gICAgICovXHJcbiAgICB2YXIgdG9JbnRlZ2VyXzEgPSBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcclxuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHZhbHVlID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHZhbHVlKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBOb3JtYWxpemVzIGFuIG9mZnNldCBhZ2FpbnN0IGEgZ2l2ZW4gbGVuZ3RoLCB3cmFwcGluZyBpdCBpZiBuZWdhdGl2ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG9yaWdpbmFsIG9mZnNldFxyXG4gICAgICogQHBhcmFtIGxlbmd0aCBUaGUgdG90YWwgbGVuZ3RoIHRvIG5vcm1hbGl6ZSBhZ2FpbnN0XHJcbiAgICAgKiBAcmV0dXJuIElmIG5lZ2F0aXZlLCBwcm92aWRlIGEgZGlzdGFuY2UgZnJvbSB0aGUgZW5kIChsZW5ndGgpOyBvdGhlcndpc2UgcHJvdmlkZSBhIGRpc3RhbmNlIGZyb20gMFxyXG4gICAgICovXHJcbiAgICB2YXIgbm9ybWFsaXplT2Zmc2V0XzEgPSBmdW5jdGlvbiBub3JtYWxpemVPZmZzZXQodmFsdWUsIGxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA8IDAgPyBNYXRoLm1heChsZW5ndGggKyB2YWx1ZSwgMCkgOiBNYXRoLm1pbih2YWx1ZSwgbGVuZ3RoKTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSwgbWFwRnVuY3Rpb24sIHRoaXNBcmcpIHtcclxuICAgICAgICBpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZnJvbTogcmVxdWlyZXMgYW4gYXJyYXktbGlrZSBvYmplY3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hcEZ1bmN0aW9uICYmIHRoaXNBcmcpIHtcclxuICAgICAgICAgICAgbWFwRnVuY3Rpb24gPSBtYXBGdW5jdGlvbi5iaW5kKHRoaXNBcmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xyXG4gICAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoXzEoYXJyYXlMaWtlLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBleHRlbnNpb25cclxuICAgICAgICB2YXIgYXJyYXkgPSB0eXBlb2YgQ29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgPyBPYmplY3QobmV3IENvbnN0cnVjdG9yKGxlbmd0aCkpIDogbmV3IEFycmF5KGxlbmd0aCk7XHJcbiAgICAgICAgaWYgKCFpdGVyYXRvcl8xLmlzQXJyYXlMaWtlKGFycmF5TGlrZSkgJiYgIWl0ZXJhdG9yXzEuaXNJdGVyYWJsZShhcnJheUxpa2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBhcnJheSBhbmQgdGhlIG5vcm1hbGl6ZWQgbGVuZ3RoIGlzIDAsIGp1c3QgcmV0dXJuIGFuIGVtcHR5IGFycmF5LiB0aGlzIHByZXZlbnRzIGEgcHJvYmxlbVxyXG4gICAgICAgIC8vIHdpdGggdGhlIGl0ZXJhdGlvbiBvbiBJRSB3aGVuIHVzaW5nIGEgTmFOIGFycmF5IGxlbmd0aC5cclxuICAgICAgICBpZiAoaXRlcmF0b3JfMS5pc0FycmF5TGlrZShhcnJheUxpa2UpKSB7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5TGlrZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBtYXBGdW5jdGlvbiA/IG1hcEZ1bmN0aW9uKGFycmF5TGlrZVtpXSwgaSkgOiBhcnJheUxpa2VbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGFycmF5TGlrZV8xID0gdHNsaWJfMS5fX3ZhbHVlcyhhcnJheUxpa2UpLCBhcnJheUxpa2VfMV8xID0gYXJyYXlMaWtlXzEubmV4dCgpOyAhYXJyYXlMaWtlXzFfMS5kb25lOyBhcnJheUxpa2VfMV8xID0gYXJyYXlMaWtlXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXJyYXlMaWtlXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheVtpXSA9IG1hcEZ1bmN0aW9uID8gbWFwRnVuY3Rpb24odmFsdWUsIGkpIDogdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlMaWtlXzFfMSAmJiAhYXJyYXlMaWtlXzFfMS5kb25lICYmIChfYSA9IGFycmF5TGlrZV8xLnJldHVybikpIF9hLmNhbGwoYXJyYXlMaWtlXzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcnJheUxpa2UubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgdmFyIGVfMSwgX2E7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5vZiA9IGZ1bmN0aW9uIG9mKCkge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdGVtcyk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5jb3B5V2l0aGluID0gZnVuY3Rpb24gY29weVdpdGhpbih0YXJnZXQsIG9mZnNldCwgc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb3B5V2l0aGluOiB0YXJnZXQgbXVzdCBiZSBhbiBhcnJheS1saWtlIG9iamVjdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGhfMSh0YXJnZXQubGVuZ3RoKTtcclxuICAgICAgICBvZmZzZXQgPSBub3JtYWxpemVPZmZzZXRfMSh0b0ludGVnZXJfMShvZmZzZXQpLCBsZW5ndGgpO1xyXG4gICAgICAgIHN0YXJ0ID0gbm9ybWFsaXplT2Zmc2V0XzEodG9JbnRlZ2VyXzEoc3RhcnQpLCBsZW5ndGgpO1xyXG4gICAgICAgIGVuZCA9IG5vcm1hbGl6ZU9mZnNldF8xKGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbnRlZ2VyXzEoZW5kKSwgbGVuZ3RoKTtcclxuICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbihlbmQgLSBzdGFydCwgbGVuZ3RoIC0gb2Zmc2V0KTtcclxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gMTtcclxuICAgICAgICBpZiAob2Zmc2V0ID4gc3RhcnQgJiYgb2Zmc2V0IDwgc3RhcnQgKyBjb3VudCkge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcclxuICAgICAgICAgICAgc3RhcnQgKz0gY291bnQgLSAxO1xyXG4gICAgICAgICAgICBvZmZzZXQgKz0gY291bnQgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGFydCBpbiB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtvZmZzZXRdID0gdGFyZ2V0W3N0YXJ0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRbb2Zmc2V0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvZmZzZXQgKz0gZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICBzdGFydCArPSBkaXJlY3Rpb247XHJcbiAgICAgICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5maWxsID0gZnVuY3Rpb24gZmlsbCh0YXJnZXQsIHZhbHVlLCBzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoXzEodGFyZ2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGkgPSBub3JtYWxpemVPZmZzZXRfMSh0b0ludGVnZXJfMShzdGFydCksIGxlbmd0aCk7XHJcbiAgICAgICAgZW5kID0gbm9ybWFsaXplT2Zmc2V0XzEoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0ludGVnZXJfMShlbmQpLCBsZW5ndGgpO1xyXG4gICAgICAgIHdoaWxlIChpIDwgZW5kKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtpKytdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5maW5kID0gZnVuY3Rpb24gZmluZCh0YXJnZXQsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gZXhwb3J0cy5maW5kSW5kZXgodGFyZ2V0LCBjYWxsYmFjaywgdGhpc0FyZyk7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ICE9PSAtMSA/IHRhcmdldFtpbmRleF0gOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5maW5kSW5kZXggPSBmdW5jdGlvbiBmaW5kSW5kZXgodGFyZ2V0LCBjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aF8xKHRhcmdldC5sZW5ndGgpO1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZmluZDogc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpc0FyZykge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrLmJpbmQodGhpc0FyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHRhcmdldFtpXSwgaSwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfTtcclxufVxyXG5pZiAoaGFzXzEuZGVmYXVsdCgnZXM3LWFycmF5JykpIHtcclxuICAgIGV4cG9ydHMuaW5jbHVkZXMgPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LkFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICAvKipcclxuICAgICAqIEVuc3VyZXMgYSBub24tbmVnYXRpdmUsIG5vbi1pbmZpbml0ZSwgc2FmZSBpbnRlZ2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsZW5ndGggVGhlIG51bWJlciB0byB2YWxpZGF0ZVxyXG4gICAgICogQHJldHVybiBBIHByb3BlciBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgdmFyIHRvTGVuZ3RoXzIgPSBmdW5jdGlvbiB0b0xlbmd0aChsZW5ndGgpIHtcclxuICAgICAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcclxuICAgICAgICBpZiAoaXNOYU4obGVuZ3RoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5mbG9vcihsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbnN1cmUgYSBub24tbmVnYXRpdmUsIHJlYWwsIHNhZmUgaW50ZWdlclxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW5ndGgsIDApLCBudW1iZXJfMS5NQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXModGFyZ2V0LCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHtcclxuICAgICAgICBpZiAoZnJvbUluZGV4ID09PSB2b2lkIDApIHsgZnJvbUluZGV4ID0gMDsgfVxyXG4gICAgICAgIHZhciBsZW4gPSB0b0xlbmd0aF8yKHRhcmdldC5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBmcm9tSW5kZXg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSB0YXJnZXRbaV07XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50ID09PSBjdXJyZW50RWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgKHNlYXJjaEVsZW1lbnQgIT09IHNlYXJjaEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IGN1cnJlbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vYXJyYXkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGdsb2JhbE9iamVjdCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBnbG9iYWwgc3BlYyBkZWZpbmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IGNhbGxlZCAnZ2xvYmFsJ1xyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWdsb2JhbFxyXG4gICAgICAgIC8vIGBnbG9iYWxgIGlzIGFsc28gZGVmaW5lZCBpbiBOb2RlSlNcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyB3aW5kb3cgaXMgZGVmaW5lZCBpbiBicm93c2Vyc1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBzZWxmIGlzIGRlZmluZWQgaW4gV2ViV29ya2Vyc1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG59KSgpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnbG9iYWxPYmplY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnJlcXVpcmUoXCIuL1N5bWJvbFwiKTtcclxudmFyIHN0cmluZ18xID0gcmVxdWlyZShcIi4vc3RyaW5nXCIpO1xyXG52YXIgc3RhdGljRG9uZSA9IHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xyXG4vKipcclxuICogQSBjbGFzcyB0aGF0IF9zaGltc18gYW4gaXRlcmF0b3IgaW50ZXJmYWNlIG9uIGFycmF5IGxpa2Ugb2JqZWN0cy5cclxuICovXHJcbnZhciBTaGltSXRlcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTaGltSXRlcmF0b3IobGlzdCkge1xyXG4gICAgICAgIHRoaXMuX25leHRJbmRleCA9IC0xO1xyXG4gICAgICAgIGlmIChpc0l0ZXJhYmxlKGxpc3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUl0ZXJhdG9yID0gbGlzdFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ID0gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbmV4dCBpdGVyYXRpb24gcmVzdWx0IGZvciB0aGUgSXRlcmF0b3JcclxuICAgICAqL1xyXG4gICAgU2hpbUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVJdGVyYXRvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlSXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRpY0RvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgrK3RoaXMuX25leHRJbmRleCA8IHRoaXMuX2xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkb25lOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9saXN0W3RoaXMuX25leHRJbmRleF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRpY0RvbmU7XHJcbiAgICB9O1xyXG4gICAgU2hpbUl0ZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTaGltSXRlcmF0b3I7XHJcbn0oKSk7XHJcbmV4cG9ydHMuU2hpbUl0ZXJhdG9yID0gU2hpbUl0ZXJhdG9yO1xyXG4vKipcclxuICogQSB0eXBlIGd1YXJkIGZvciBjaGVja2luZyBpZiBzb21ldGhpbmcgaGFzIGFuIEl0ZXJhYmxlIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHR5cGUgZ3VhcmQgYWdhaW5zdFxyXG4gKi9cclxuZnVuY3Rpb24gaXNJdGVyYWJsZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNJdGVyYWJsZSA9IGlzSXRlcmFibGU7XHJcbi8qKlxyXG4gKiBBIHR5cGUgZ3VhcmQgZm9yIGNoZWNraW5nIGlmIHNvbWV0aGluZyBpcyBBcnJheUxpa2VcclxuICpcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0eXBlIGd1YXJkIGFnYWluc3RcclxuICovXHJcbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcic7XHJcbn1cclxuZXhwb3J0cy5pc0FycmF5TGlrZSA9IGlzQXJyYXlMaWtlO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgZm9yIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0gaXRlcmFibGUgVGhlIGl0ZXJhYmxlIG9iamVjdCB0byByZXR1cm4gdGhlIGl0ZXJhdG9yIGZvclxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0KGl0ZXJhYmxlKSB7XHJcbiAgICBpZiAoaXNJdGVyYWJsZShpdGVyYWJsZSkpIHtcclxuICAgICAgICByZXR1cm4gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaGltSXRlcmF0b3IoaXRlcmFibGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0ID0gZ2V0O1xyXG4vKipcclxuICogU2hpbXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgYGZvciAuLi4gb2ZgIGJsb2Nrc1xyXG4gKlxyXG4gKiBAcGFyYW0gaXRlcmFibGUgVGhlIG9iamVjdCB0aGUgcHJvdmlkZXMgYW4gaW50ZXJhdG9yIGludGVyZmFjZVxyXG4gKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGl0ZW0gb2YgdGhlIGl0ZXJhYmxlXHJcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIHNjb3BlIHRvIHBhc3MgdGhlIGNhbGxiYWNrXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JPZihpdGVyYWJsZSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcclxuICAgIHZhciBicm9rZW4gPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIGRvQnJlYWsoKSB7XHJcbiAgICAgICAgYnJva2VuID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qIFdlIG5lZWQgdG8gaGFuZGxlIGl0ZXJhdGlvbiBvZiBkb3VibGUgYnl0ZSBzdHJpbmdzIHByb3Blcmx5ICovXHJcbiAgICBpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpICYmIHR5cGVvZiBpdGVyYWJsZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICB2YXIgbCA9IGl0ZXJhYmxlLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgY2hhciA9IGl0ZXJhYmxlW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSArIDEgPCBsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID49IHN0cmluZ18xLkhJR0hfU1VSUk9HQVRFX01JTiAmJiBjb2RlIDw9IHN0cmluZ18xLkhJR0hfU1VSUk9HQVRFX01BWCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXIgKz0gaXRlcmFibGVbKytpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGNoYXIsIGl0ZXJhYmxlLCBkb0JyZWFrKTtcclxuICAgICAgICAgICAgaWYgKGJyb2tlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gZ2V0KGl0ZXJhYmxlKTtcclxuICAgICAgICBpZiAoaXRlcmF0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgd2hpbGUgKCFyZXN1bHQuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCByZXN1bHQudmFsdWUsIGl0ZXJhYmxlLCBkb0JyZWFrKTtcclxuICAgICAgICAgICAgICAgIGlmIChicm9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5mb3JPZiA9IGZvck9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG4vKipcclxuICogVGhlIHNtYWxsZXN0IGludGVydmFsIGJldHdlZW4gdHdvIHJlcHJlc2VudGFibGUgbnVtYmVycy5cclxuICovXHJcbmV4cG9ydHMuRVBTSUxPTiA9IDE7XHJcbi8qKlxyXG4gKiBUaGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdFxyXG4gKi9cclxuZXhwb3J0cy5NQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuLyoqXHJcbiAqIFRoZSBtaW5pbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0XHJcbiAqL1xyXG5leHBvcnRzLk1JTl9TQUZFX0lOVEVHRVIgPSAtZXhwb3J0cy5NQVhfU0FGRV9JTlRFR0VSO1xyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgTmFOIHdpdGhvdXQgY29lcnNpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIE5hTiwgZmFsc2UgaWYgaXQgaXMgbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc05hTih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsXzEuZGVmYXVsdC5pc05hTih2YWx1ZSk7XHJcbn1cclxuZXhwb3J0cy5pc05hTiA9IGlzTmFOO1xyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBmaW5pdGUgbnVtYmVyIHdpdGhvdXQgY29lcnNpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGZpbml0ZSwgZmFsc2UgaWYgaXQgaXMgbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Zpbml0ZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsXzEuZGVmYXVsdC5pc0Zpbml0ZSh2YWx1ZSk7XHJcbn1cclxuZXhwb3J0cy5pc0Zpbml0ZSA9IGlzRmluaXRlO1xyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cclxuICpcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlciwgZmFsc2UgaWYgaXQgaXMgbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcclxuICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xyXG59XHJcbmV4cG9ydHMuaXNJbnRlZ2VyID0gaXNJbnRlZ2VyO1xyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gaW50ZWdlciB0aGF0IGlzICdzYWZlLCcgbWVhbmluZzpcclxuICogICAxLiBpdCBjYW4gYmUgZXhwcmVzc2VkIGFzIGFuIElFRUUtNzU0IGRvdWJsZSBwcmVjaXNpb24gbnVtYmVyXHJcbiAqICAgMi4gaXQgaGFzIGEgb25lLXRvLW9uZSBtYXBwaW5nIHRvIGEgbWF0aGVtYXRpY2FsIGludGVnZXIsIG1lYW5pbmcgaXRzXHJcbiAqICAgICAgSUVFRS03NTQgcmVwcmVzZW50YXRpb24gY2Fubm90IGJlIHRoZSByZXN1bHQgb2Ygcm91bmRpbmcgYW55IG90aGVyXHJcbiAqICAgICAgaW50ZWdlciB0byBmaXQgdGhlIElFRUUtNzU0IHJlcHJlc2VudGF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIsIGZhbHNlIGlmIGl0IGlzIG5vdFxyXG4gKi9cclxuZnVuY3Rpb24gaXNTYWZlSW50ZWdlcih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSkgJiYgTWF0aC5hYnModmFsdWUpIDw9IGV4cG9ydHMuTUFYX1NBRkVfSU5URUdFUjtcclxufVxyXG5leHBvcnRzLmlzU2FmZUludGVnZXIgPSBpc1NhZmVJbnRlZ2VyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vbnVtYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL251bWJlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvaGFzXCIpO1xyXG52YXIgU3ltYm9sXzEgPSByZXF1aXJlKFwiLi9TeW1ib2xcIik7XHJcbmlmIChoYXNfMS5kZWZhdWx0KCdlczYtb2JqZWN0JykpIHtcclxuICAgIHZhciBnbG9iYWxPYmplY3QgPSBnbG9iYWxfMS5kZWZhdWx0Lk9iamVjdDtcclxuICAgIGV4cG9ydHMuYXNzaWduID0gZ2xvYmFsT2JqZWN0LmFzc2lnbjtcclxuICAgIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcclxuICAgIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlOYW1lcyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xyXG4gICAgZXhwb3J0cy5pcyA9IGdsb2JhbE9iamVjdC5pcztcclxuICAgIGV4cG9ydHMua2V5cyA9IGdsb2JhbE9iamVjdC5rZXlzO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gc3ltYm9sQXdhcmVLZXlzKG8pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICFCb29sZWFuKGtleS5tYXRjaCgvXkBALisvKSk7IH0pO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuYXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBzb3VyY2VzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgc291cmNlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChuZXh0U291cmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcclxuICAgICAgICAgICAgICAgIGV4cG9ydHMua2V5cyhuZXh0U291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChuZXh0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdG87XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobywgcHJvcCkge1xyXG4gICAgICAgIGlmIChTeW1ib2xfMS5pc1N5bWJvbChwcm9wKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBwcm9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIHByb3ApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBleHBvcnRzLmdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG8pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICFCb29sZWFuKGtleS5tYXRjaCgvXkBALisvKSk7IH0pO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG8pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobylcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBCb29sZWFuKGtleS5tYXRjaCgvXkBALisvKSk7IH0pXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gU3ltYm9sLmZvcihrZXkuc3Vic3RyaW5nKDIpKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5pcyA9IGZ1bmN0aW9uIGlzKHZhbHVlMSwgdmFsdWUyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEgIT09IDAgfHwgMSAvIHZhbHVlMSA9PT0gMSAvIHZhbHVlMjsgLy8gLTBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlMSAhPT0gdmFsdWUxICYmIHZhbHVlMiAhPT0gdmFsdWUyOyAvLyBOYU5cclxuICAgIH07XHJcbn1cclxuaWYgKGhhc18xLmRlZmF1bHQoJ2VzMjAxNy1vYmplY3QnKSkge1xyXG4gICAgdmFyIGdsb2JhbE9iamVjdCA9IGdsb2JhbF8xLmRlZmF1bHQuT2JqZWN0O1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7XHJcbiAgICBleHBvcnRzLmVudHJpZXMgPSBnbG9iYWxPYmplY3QuZW50cmllcztcclxuICAgIGV4cG9ydHMudmFsdWVzID0gZ2xvYmFsT2JqZWN0LnZhbHVlcztcclxufVxyXG5lbHNlIHtcclxuICAgIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobykge1xyXG4gICAgICAgIHJldHVybiBleHBvcnRzLmdldE93blByb3BlcnR5TmFtZXMobykucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywga2V5KSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzW2tleV0gPSBleHBvcnRzLmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMobykge1xyXG4gICAgICAgIHJldHVybiBleHBvcnRzLmtleXMobykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFtrZXksIG9ba2V5XV07IH0pO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMudmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKG8pIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5rZXlzKG8pLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBvW2tleV07IH0pO1xyXG4gICAgfTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL29iamVjdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvdXRpbFwiKTtcclxuLyoqXHJcbiAqIFRoZSBtaW5pbXVtIGxvY2F0aW9uIG9mIGhpZ2ggc3Vycm9nYXRlc1xyXG4gKi9cclxuZXhwb3J0cy5ISUdIX1NVUlJPR0FURV9NSU4gPSAweGQ4MDA7XHJcbi8qKlxyXG4gKiBUaGUgbWF4aW11bSBsb2NhdGlvbiBvZiBoaWdoIHN1cnJvZ2F0ZXNcclxuICovXHJcbmV4cG9ydHMuSElHSF9TVVJST0dBVEVfTUFYID0gMHhkYmZmO1xyXG4vKipcclxuICogVGhlIG1pbmltdW0gbG9jYXRpb24gb2YgbG93IHN1cnJvZ2F0ZXNcclxuICovXHJcbmV4cG9ydHMuTE9XX1NVUlJPR0FURV9NSU4gPSAweGRjMDA7XHJcbi8qKlxyXG4gKiBUaGUgbWF4aW11bSBsb2NhdGlvbiBvZiBsb3cgc3Vycm9nYXRlc1xyXG4gKi9cclxuZXhwb3J0cy5MT1dfU1VSUk9HQVRFX01BWCA9IDB4ZGZmZjtcclxuaWYgKGhhc18xLmRlZmF1bHQoJ2VzNi1zdHJpbmcnKSAmJiBoYXNfMS5kZWZhdWx0KCdlczYtc3RyaW5nLXJhdycpKSB7XHJcbiAgICBleHBvcnRzLmZyb21Db2RlUG9pbnQgPSBnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5mcm9tQ29kZVBvaW50O1xyXG4gICAgZXhwb3J0cy5yYXcgPSBnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5yYXc7XHJcbiAgICBleHBvcnRzLmNvZGVQb2ludEF0ID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KTtcclxuICAgIGV4cG9ydHMuZW5kc1dpdGggPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpO1xyXG4gICAgZXhwb3J0cy5pbmNsdWRlcyA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyk7XHJcbiAgICBleHBvcnRzLm5vcm1hbGl6ZSA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5ub3JtYWxpemUpO1xyXG4gICAgZXhwb3J0cy5yZXBlYXQgPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5wcm90b3R5cGUucmVwZWF0KTtcclxuICAgIGV4cG9ydHMuc3RhcnRzV2l0aCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKTtcclxufVxyXG5lbHNlIHtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGVzIHRoYXQgdGV4dCBpcyBkZWZpbmVkLCBhbmQgbm9ybWFsaXplcyBwb3NpdGlvbiAoYmFzZWQgb24gdGhlIGdpdmVuIGRlZmF1bHQgaWYgdGhlIGlucHV0IGlzIE5hTikuXHJcbiAgICAgKiBVc2VkIGJ5IHN0YXJ0c1dpdGgsIGluY2x1ZGVzLCBhbmQgZW5kc1dpdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBOb3JtYWxpemVkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICB2YXIgbm9ybWFsaXplU3Vic3RyaW5nQXJnc18xID0gZnVuY3Rpb24gKG5hbWUsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24sIGlzRW5kKSB7XHJcbiAgICAgICAgaWYgKGlzRW5kID09PSB2b2lkIDApIHsgaXNFbmQgPSBmYWxzZTsgfVxyXG4gICAgICAgIGlmICh0ZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLicgKyBuYW1lICsgJyByZXF1aXJlcyBhIHZhbGlkIHN0cmluZyB0byBzZWFyY2ggYWdhaW5zdC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRleHQubGVuZ3RoO1xyXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gIT09IHBvc2l0aW9uID8gKGlzRW5kID8gbGVuZ3RoIDogMCkgOiBwb3NpdGlvbjtcclxuICAgICAgICByZXR1cm4gW3RleHQsIFN0cmluZyhzZWFyY2gpLCBNYXRoLm1pbihNYXRoLm1heChwb3NpdGlvbiwgMCksIGxlbmd0aCldO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZnJvbUNvZGVQb2ludCA9IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoKSB7XHJcbiAgICAgICAgdmFyIGNvZGVQb2ludHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBjb2RlUG9pbnRzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcuZnJvbUNvZGVQb2ludFxyXG4gICAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XHJcbiAgICAgICAgdmFyIE1BWF9TSVpFID0gMHg0MDAwO1xyXG4gICAgICAgIHZhciBjb2RlVW5pdHMgPSBbXTtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IE51bWJlcihhcmd1bWVudHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgLy8gQ29kZSBwb2ludHMgbXVzdCBiZSBmaW5pdGUgaW50ZWdlcnMgd2l0aGluIHRoZSB2YWxpZCByYW5nZVxyXG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGlzRmluaXRlKGNvZGVQb2ludCkgJiYgTWF0aC5mbG9vcihjb2RlUG9pbnQpID09PSBjb2RlUG9pbnQgJiYgY29kZVBvaW50ID49IDAgJiYgY29kZVBvaW50IDw9IDB4MTBmZmZmO1xyXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ3N0cmluZy5mcm9tQ29kZVBvaW50OiBJbnZhbGlkIGNvZGUgcG9pbnQgJyArIGNvZGVQb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSAweGZmZmYpIHtcclxuICAgICAgICAgICAgICAgIC8vIEJNUCBjb2RlIHBvaW50XHJcbiAgICAgICAgICAgICAgICBjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQXN0cmFsIGNvZGUgcG9pbnQ7IHNwbGl0IGluIHN1cnJvZ2F0ZSBoYWx2ZXNcclxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxyXG4gICAgICAgICAgICAgICAgY29kZVBvaW50IC09IDB4MTAwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgZXhwb3J0cy5ISUdIX1NVUlJPR0FURV9NSU47XHJcbiAgICAgICAgICAgICAgICB2YXIgbG93U3Vycm9nYXRlID0gY29kZVBvaW50ICUgMHg0MDAgKyBleHBvcnRzLkxPV19TVVJST0dBVEVfTUlOO1xyXG4gICAgICAgICAgICAgICAgY29kZVVuaXRzLnB1c2goaGlnaFN1cnJvZ2F0ZSwgbG93U3Vycm9nYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxID09PSBsZW5ndGggfHwgY29kZVVuaXRzLmxlbmd0aCA+IE1BWF9TSVpFKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVVbml0cyk7XHJcbiAgICAgICAgICAgICAgICBjb2RlVW5pdHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMucmF3ID0gZnVuY3Rpb24gcmF3KGNhbGxTaXRlKSB7XHJcbiAgICAgICAgdmFyIHN1YnN0aXR1dGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzdWJzdGl0dXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmF3U3RyaW5ncyA9IGNhbGxTaXRlLnJhdztcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgdmFyIG51bVN1YnN0aXR1dGlvbnMgPSBzdWJzdGl0dXRpb25zLmxlbmd0aDtcclxuICAgICAgICBpZiAoY2FsbFNpdGUgPT0gbnVsbCB8fCBjYWxsU2l0ZS5yYXcgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcucmF3IHJlcXVpcmVzIGEgdmFsaWQgY2FsbFNpdGUgb2JqZWN0IHdpdGggYSByYXcgdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aF8xID0gcmF3U3RyaW5ncy5sZW5ndGg7IGkgPCBsZW5ndGhfMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSByYXdTdHJpbmdzW2ldICsgKGkgPCBudW1TdWJzdGl0dXRpb25zICYmIGkgPCBsZW5ndGhfMSAtIDEgPyBzdWJzdGl0dXRpb25zW2ldIDogJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuY29kZVBvaW50QXQgPSBmdW5jdGlvbiBjb2RlUG9pbnRBdCh0ZXh0LCBwb3NpdGlvbikge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7IHBvc2l0aW9uID0gMDsgfVxyXG4gICAgICAgIC8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0XHJcbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcuY29kZVBvaW50QXQgcmVxdXJpZXMgYSB2YWxpZCBzdHJpbmcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcclxuICAgICAgICBpZiAocG9zaXRpb24gIT09IHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBjb2RlIHVuaXRcclxuICAgICAgICB2YXIgZmlyc3QgPSB0ZXh0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xyXG4gICAgICAgIGlmIChmaXJzdCA+PSBleHBvcnRzLkhJR0hfU1VSUk9HQVRFX01JTiAmJiBmaXJzdCA8PSBleHBvcnRzLkhJR0hfU1VSUk9HQVRFX01BWCAmJiBsZW5ndGggPiBwb3NpdGlvbiArIDEpIHtcclxuICAgICAgICAgICAgLy8gU3RhcnQgb2YgYSBzdXJyb2dhdGUgcGFpciAoaGlnaCBzdXJyb2dhdGUgYW5kIHRoZXJlIGlzIGEgbmV4dCBjb2RlIHVuaXQpOyBjaGVjayBmb3IgbG93IHN1cnJvZ2F0ZVxyXG4gICAgICAgICAgICAvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcclxuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpO1xyXG4gICAgICAgICAgICBpZiAoc2Vjb25kID49IGV4cG9ydHMuTE9XX1NVUlJPR0FURV9NSU4gJiYgc2Vjb25kIDw9IGV4cG9ydHMuTE9XX1NVUlJPR0FURV9NQVgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmlyc3QgLSBleHBvcnRzLkhJR0hfU1VSUk9HQVRFX01JTikgKiAweDQwMCArIHNlY29uZCAtIGV4cG9ydHMuTE9XX1NVUlJPR0FURV9NSU4gKyAweDEwMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmVuZHNXaXRoID0gZnVuY3Rpb24gZW5kc1dpdGgodGV4dCwgc2VhcmNoLCBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIGlmIChlbmRQb3NpdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGVuZFBvc2l0aW9uID0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9hID0gdHNsaWJfMS5fX3JlYWQobm9ybWFsaXplU3Vic3RyaW5nQXJnc18xKCdlbmRzV2l0aCcsIHRleHQsIHNlYXJjaCwgZW5kUG9zaXRpb24sIHRydWUpLCAzKSwgdGV4dCA9IF9hWzBdLCBzZWFyY2ggPSBfYVsxXSwgZW5kUG9zaXRpb24gPSBfYVsyXTtcclxuICAgICAgICB2YXIgc3RhcnQgPSBlbmRQb3NpdGlvbiAtIHNlYXJjaC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKHN0YXJ0LCBlbmRQb3NpdGlvbikgPT09IHNlYXJjaDtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzKHRleHQsIHNlYXJjaCwgcG9zaXRpb24pIHtcclxuICAgICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCkgeyBwb3NpdGlvbiA9IDA7IH1cclxuICAgICAgICBfYSA9IHRzbGliXzEuX19yZWFkKG5vcm1hbGl6ZVN1YnN0cmluZ0FyZ3NfMSgnaW5jbHVkZXMnLCB0ZXh0LCBzZWFyY2gsIHBvc2l0aW9uKSwgMyksIHRleHQgPSBfYVswXSwgc2VhcmNoID0gX2FbMV0sIHBvc2l0aW9uID0gX2FbMl07XHJcbiAgICAgICAgcmV0dXJuIHRleHQuaW5kZXhPZihzZWFyY2gsIHBvc2l0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMucmVwZWF0ID0gZnVuY3Rpb24gcmVwZWF0KHRleHQsIGNvdW50KSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSB2b2lkIDApIHsgY291bnQgPSAwOyB9XHJcbiAgICAgICAgLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUucmVwZWF0XHJcbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcucmVwZWF0IHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgIT09IGNvdW50KSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50IDwgMCB8fCBjb3VudCA9PT0gSW5maW5pdHkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgd2hpbGUgKGNvdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCA+Pj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLnN0YXJ0c1dpdGggPSBmdW5jdGlvbiBzdGFydHNXaXRoKHRleHQsIHNlYXJjaCwgcG9zaXRpb24pIHtcclxuICAgICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCkgeyBwb3NpdGlvbiA9IDA7IH1cclxuICAgICAgICBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoKTtcclxuICAgICAgICBfYSA9IHRzbGliXzEuX19yZWFkKG5vcm1hbGl6ZVN1YnN0cmluZ0FyZ3NfMSgnc3RhcnRzV2l0aCcsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24pLCAzKSwgdGV4dCA9IF9hWzBdLCBzZWFyY2ggPSBfYVsxXSwgcG9zaXRpb24gPSBfYVsyXTtcclxuICAgICAgICB2YXIgZW5kID0gcG9zaXRpb24gKyBzZWFyY2gubGVuZ3RoO1xyXG4gICAgICAgIGlmIChlbmQgPiB0ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKHBvc2l0aW9uLCBlbmQpID09PSBzZWFyY2g7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgfTtcclxufVxyXG5pZiAoaGFzXzEuZGVmYXVsdCgnZXMyMDE3LXN0cmluZycpKSB7XHJcbiAgICBleHBvcnRzLnBhZEVuZCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5wYWRFbmQpO1xyXG4gICAgZXhwb3J0cy5wYWRTdGFydCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydCk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBleHBvcnRzLnBhZEVuZCA9IGZ1bmN0aW9uIHBhZEVuZCh0ZXh0LCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcpIHtcclxuICAgICAgICBpZiAoZmlsbFN0cmluZyA9PT0gdm9pZCAwKSB7IGZpbGxTdHJpbmcgPSAnICc7IH1cclxuICAgICAgICBpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5wYWRFbmQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF4TGVuZ3RoID09PSBudWxsIHx8IG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG1heExlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgbWF4TGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0clRleHQgPSBTdHJpbmcodGV4dCk7XHJcbiAgICAgICAgdmFyIHBhZGRpbmcgPSBtYXhMZW5ndGggLSBzdHJUZXh0Lmxlbmd0aDtcclxuICAgICAgICBpZiAocGFkZGluZyA+IDApIHtcclxuICAgICAgICAgICAgc3RyVGV4dCArPVxyXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5yZXBlYXQoZmlsbFN0cmluZywgTWF0aC5mbG9vcihwYWRkaW5nIC8gZmlsbFN0cmluZy5sZW5ndGgpKSArXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbFN0cmluZy5zbGljZSgwLCBwYWRkaW5nICUgZmlsbFN0cmluZy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyVGV4dDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLnBhZFN0YXJ0ID0gZnVuY3Rpb24gcGFkU3RhcnQodGV4dCwgbWF4TGVuZ3RoLCBmaWxsU3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGZpbGxTdHJpbmcgPT09IHZvaWQgMCkgeyBmaWxsU3RyaW5nID0gJyAnOyB9XHJcbiAgICAgICAgaWYgKHRleHQgPT09IG51bGwgfHwgdGV4dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhMZW5ndGggPT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdzdHJpbmcucGFkU3RhcnQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF4TGVuZ3RoID09PSBudWxsIHx8IG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG1heExlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgbWF4TGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0clRleHQgPSBTdHJpbmcodGV4dCk7XHJcbiAgICAgICAgdmFyIHBhZGRpbmcgPSBtYXhMZW5ndGggLSBzdHJUZXh0Lmxlbmd0aDtcclxuICAgICAgICBpZiAocGFkZGluZyA+IDApIHtcclxuICAgICAgICAgICAgc3RyVGV4dCA9XHJcbiAgICAgICAgICAgICAgICBleHBvcnRzLnJlcGVhdChmaWxsU3RyaW5nLCBNYXRoLmZsb29yKHBhZGRpbmcgLyBmaWxsU3RyaW5nLmxlbmd0aCkpICtcclxuICAgICAgICAgICAgICAgICAgICBmaWxsU3RyaW5nLnNsaWNlKDAsIHBhZGRpbmcgJSBmaWxsU3RyaW5nLmxlbmd0aCkgK1xyXG4gICAgICAgICAgICAgICAgICAgIHN0clRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJUZXh0O1xyXG4gICAgfTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N0cmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIkBkb2pvL2hhcy9oYXNcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuLi9nbG9iYWxcIik7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGhhc18xLmRlZmF1bHQ7XHJcbnRzbGliXzEuX19leHBvcnRTdGFyKHJlcXVpcmUoXCJAZG9qby9oYXMvaGFzXCIpLCBleHBvcnRzKTtcclxuLyogRUNNQVNjcmlwdCA2IGFuZCA3IEZlYXR1cmVzICovXHJcbi8qIEFycmF5ICovXHJcbmhhc18xLmFkZCgnZXM2LWFycmF5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChbJ2Zyb20nLCAnb2YnXS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgaW4gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheTsgfSkgJiZcclxuICAgICAgICBbJ2ZpbmRJbmRleCcsICdmaW5kJywgJ2NvcHlXaXRoaW4nXS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgaW4gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGU7IH0pKTtcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZXM2LWFycmF5LWZpbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJ2ZpbGwnIGluIGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkucHJvdG90eXBlKSB7XHJcbiAgICAgICAgLyogU29tZSB2ZXJzaW9ucyBvZiBTYWZhcmkgZG8gbm90IHByb3Blcmx5IGltcGxlbWVudCB0aGlzICovXHJcbiAgICAgICAgcmV0dXJuIFsxXS5maWxsKDksIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlbMF0gPT09IDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2VzNy1hcnJheScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICdpbmNsdWRlcycgaW4gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGU7IH0sIHRydWUpO1xyXG4vKiBNYXAgKi9cclxuaGFzXzEuYWRkKCdlczYtbWFwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0Lk1hcCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8qXHJcbiAgICBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IE1hcCBmdW5jdGlvbmFsaXR5XHJcbiAgICBXZSB3cmFwIHRoaXMgaW4gYSB0cnkvY2F0Y2ggYmVjYXVzZSBzb21ldGltZXMgdGhlIE1hcCBjb25zdHJ1Y3RvciBleGlzdHMsIGJ1dCBkb2VzIG5vdFxyXG4gICAgdGFrZSBhcmd1bWVudHMgKGlPUyA4LjQpXHJcbiAgICAgKi9cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgbWFwID0gbmV3IGdsb2JhbF8xLmRlZmF1bHQuTWFwKFtbMCwgMV1dKTtcclxuICAgICAgICAgICAgcmV0dXJuIChtYXAuaGFzKDApICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgbWFwLmtleXMgPT09ICdmdW5jdGlvbicgJiZcclxuICAgICAgICAgICAgICAgIGhhc18xLmRlZmF1bHQoJ2VzNi1zeW1ib2wnKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIG1hcC52YWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBtYXAuZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgdGVzdGluZyBvbiBpT1MgYXQgdGhlIG1vbWVudCAqL1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59LCB0cnVlKTtcclxuLyogTWF0aCAqL1xyXG5oYXNfMS5hZGQoJ2VzNi1tYXRoJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICAnY2x6MzInLFxyXG4gICAgICAgICdzaWduJyxcclxuICAgICAgICAnbG9nMTAnLFxyXG4gICAgICAgICdsb2cyJyxcclxuICAgICAgICAnbG9nMXAnLFxyXG4gICAgICAgICdleHBtMScsXHJcbiAgICAgICAgJ2Nvc2gnLFxyXG4gICAgICAgICdzaW5oJyxcclxuICAgICAgICAndGFuaCcsXHJcbiAgICAgICAgJ2Fjb3NoJyxcclxuICAgICAgICAnYXNpbmgnLFxyXG4gICAgICAgICdhdGFuaCcsXHJcbiAgICAgICAgJ3RydW5jJyxcclxuICAgICAgICAnZnJvdW5kJyxcclxuICAgICAgICAnY2JydCcsXHJcbiAgICAgICAgJ2h5cG90J1xyXG4gICAgXS5ldmVyeShmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuTWF0aFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJzsgfSk7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2VzNi1tYXRoLWltdWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJ2ltdWwnIGluIGdsb2JhbF8xLmRlZmF1bHQuTWF0aCkge1xyXG4gICAgICAgIC8qIFNvbWUgdmVyc2lvbnMgb2YgU2FmYXJpIG9uIGlvcyBkbyBub3QgcHJvcGVybHkgaW1wbGVtZW50IHRoaXMgKi9cclxuICAgICAgICByZXR1cm4gTWF0aC5pbXVsKDB4ZmZmZmZmZmYsIDUpID09PSAtNTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufSwgdHJ1ZSk7XHJcbi8qIE9iamVjdCAqL1xyXG5oYXNfMS5hZGQoJ2VzNi1vYmplY3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKGhhc18xLmRlZmF1bHQoJ2VzNi1zeW1ib2wnKSAmJlxyXG4gICAgICAgIFsnYXNzaWduJywgJ2lzJywgJ2dldE93blByb3BlcnR5U3ltYm9scycsICdzZXRQcm90b3R5cGVPZiddLmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5PYmplY3RbbmFtZV0gPT09ICdmdW5jdGlvbic7IH0pKTtcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZXMyMDE3LW9iamVjdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBbJ3ZhbHVlcycsICdlbnRyaWVzJywgJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMnXS5ldmVyeShmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuT2JqZWN0W25hbWVdID09PSAnZnVuY3Rpb24nOyB9KTtcclxufSwgdHJ1ZSk7XHJcbi8qIE9ic2VydmFibGUgKi9cclxuaGFzXzEuYWRkKCdlcy1vYnNlcnZhYmxlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuT2JzZXJ2YWJsZSAhPT0gJ3VuZGVmaW5lZCc7IH0sIHRydWUpO1xyXG4vKiBQcm9taXNlICovXHJcbmhhc18xLmFkZCgnZXM2LXByb21pc2UnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5Qcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiBoYXNfMS5kZWZhdWx0KCdlczYtc3ltYm9sJyk7IH0sIHRydWUpO1xyXG4vKiBTZXQgKi9cclxuaGFzXzEuYWRkKCdlczYtc2V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LlNldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8qIElFMTEgYW5kIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBhcmUgbWlzc2luZyBjcml0aWNhbCBFUzYgU2V0IGZ1bmN0aW9uYWxpdHkgKi9cclxuICAgICAgICB2YXIgc2V0ID0gbmV3IGdsb2JhbF8xLmRlZmF1bHQuU2V0KFsxXSk7XHJcbiAgICAgICAgcmV0dXJuIHNldC5oYXMoMSkgJiYgJ2tleXMnIGluIHNldCAmJiB0eXBlb2Ygc2V0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgaGFzXzEuZGVmYXVsdCgnZXM2LXN5bWJvbCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59LCB0cnVlKTtcclxuLyogU3RyaW5nICovXHJcbmhhc18xLmFkZCgnZXM2LXN0cmluZycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoW1xyXG4gICAgICAgIC8qIHN0YXRpYyBtZXRob2RzICovXHJcbiAgICAgICAgJ2Zyb21Db2RlUG9pbnQnXHJcbiAgICBdLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LlN0cmluZ1trZXldID09PSAnZnVuY3Rpb24nOyB9KSAmJlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgLyogaW5zdGFuY2UgbWV0aG9kcyAqL1xyXG4gICAgICAgICAgICAnY29kZVBvaW50QXQnLFxyXG4gICAgICAgICAgICAnbm9ybWFsaXplJyxcclxuICAgICAgICAgICAgJ3JlcGVhdCcsXHJcbiAgICAgICAgICAgICdzdGFydHNXaXRoJyxcclxuICAgICAgICAgICAgJ2VuZHNXaXRoJyxcclxuICAgICAgICAgICAgJ2luY2x1ZGVzJ1xyXG4gICAgICAgIF0uZXZlcnkoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nOyB9KSk7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2VzNi1zdHJpbmctcmF3JywgZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gZ2V0Q2FsbFNpdGUoY2FsbFNpdGUpIHtcclxuICAgICAgICB2YXIgc3Vic3RpdHV0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHN1YnN0aXR1dGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSB0c2xpYl8xLl9fc3ByZWFkKGNhbGxTaXRlKTtcclxuICAgICAgICByZXN1bHQucmF3ID0gY2FsbFNpdGUucmF3O1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoJ3JhdycgaW4gZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcpIHtcclxuICAgICAgICB2YXIgYiA9IDE7XHJcbiAgICAgICAgdmFyIGNhbGxTaXRlID0gZ2V0Q2FsbFNpdGUodGVtcGxhdGVPYmplY3RfMSB8fCAodGVtcGxhdGVPYmplY3RfMSA9IHRzbGliXzEuX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiYVxcblwiLCBcIlwiXSwgW1wiYVxcXFxuXCIsIFwiXCJdKSksIGIpO1xyXG4gICAgICAgIGNhbGxTaXRlLnJhdyA9IFsnYVxcXFxuJ107XHJcbiAgICAgICAgdmFyIHN1cHBvcnRzVHJ1bmMgPSBnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5yYXcoY2FsbFNpdGUsIDQyKSA9PT0gJ2E6XFxcXG4nO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0c1RydW5jO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdlczIwMTctc3RyaW5nJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFsncGFkU3RhcnQnLCAncGFkRW5kJ10uZXZlcnkoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nOyB9KTtcclxufSwgdHJ1ZSk7XHJcbi8qIFN5bWJvbCAqL1xyXG5oYXNfMS5hZGQoJ2VzNi1zeW1ib2wnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5TeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBTeW1ib2woKSA9PT0gJ3N5bWJvbCc7IH0sIHRydWUpO1xyXG4vKiBXZWFrTWFwICovXHJcbmhhc18xLmFkZCgnZXM2LXdlYWttYXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKiBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IE1hcCBmdW5jdGlvbmFsaXR5ICovXHJcbiAgICAgICAgdmFyIGtleTEgPSB7fTtcclxuICAgICAgICB2YXIga2V5MiA9IHt9O1xyXG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ2xvYmFsXzEuZGVmYXVsdC5XZWFrTWFwKFtba2V5MSwgMV1dKTtcclxuICAgICAgICBPYmplY3QuZnJlZXplKGtleTEpO1xyXG4gICAgICAgIHJldHVybiBtYXAuZ2V0KGtleTEpID09PSAxICYmIG1hcC5zZXQoa2V5MiwgMikgPT09IG1hcCAmJiBoYXNfMS5kZWZhdWx0KCdlczYtc3ltYm9sJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG4vKiBNaXNjZWxsYW5lb3VzIGZlYXR1cmVzICovXHJcbmhhc18xLmFkZCgnbWljcm90YXNrcycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhhc18xLmRlZmF1bHQoJ2VzNi1wcm9taXNlJykgfHwgaGFzXzEuZGVmYXVsdCgnaG9zdC1ub2RlJykgfHwgaGFzXzEuZGVmYXVsdCgnZG9tLW11dGF0aW9ub2JzZXJ2ZXInKTsgfSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgncG9zdG1lc3NhZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBJZiB3aW5kb3cgaXMgdW5kZWZpbmVkLCBhbmQgd2UgaGF2ZSBwb3N0TWVzc2FnZSwgaXQgcHJvYmFibHkgbWVhbnMgd2UncmUgaW4gYSB3ZWIgd29ya2VyLiBXZWIgd29ya2VycyBoYXZlXHJcbiAgICAvLyBwb3N0IG1lc3NhZ2UgYnV0IGl0IGRvZXNuJ3Qgd29yayBob3cgd2UgZXhwZWN0IGl0IHRvLCBzbyBpdCdzIGJlc3QganVzdCB0byBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXHJcbiAgICByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQud2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5wb3N0TWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJztcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgncmFmJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQucmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nOyB9LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdzZXRpbW1lZGlhdGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5zZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnOyB9LCB0cnVlKTtcclxuLyogRE9NIEZlYXR1cmVzICovXHJcbmhhc18xLmFkZCgnZG9tLW11dGF0aW9ub2JzZXJ2ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoaGFzXzEuZGVmYXVsdCgnaG9zdC1icm93c2VyJykgJiYgQm9vbGVhbihnbG9iYWxfMS5kZWZhdWx0Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsXzEuZGVmYXVsdC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyKSkge1xyXG4gICAgICAgIC8vIElFMTEgaGFzIGFuIHVucmVsaWFibGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiB3aGVyZSBzZXRQcm9wZXJ0eSgpIGRvZXMgbm90XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBtdXRhdGlvbiBldmVudCwgb2JzZXJ2ZXJzIGNhbiBjcmFzaCwgYW5kIHRoZSBxdWV1ZSBkb2VzIG5vdCBkcmFpblxyXG4gICAgICAgIC8vIHJlbGlhYmx5LiBUaGUgZm9sbG93aW5nIGZlYXR1cmUgdGVzdCB3YXMgYWRhcHRlZCBmcm9tXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vdDEwa28vNGFjZWI4YzcxNjgxZmRiMjc1ZTMzZWZlNWU1NzZiMTRcclxuICAgICAgICB2YXIgZXhhbXBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXHJcbiAgICAgICAgdmFyIEhvc3RNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsXzEuZGVmYXVsdC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbF8xLmRlZmF1bHQuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgSG9zdE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGV4YW1wbGUsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcclxuICAgICAgICBleGFtcGxlLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ob2JzZXJ2ZXIudGFrZVJlY29yZHMoKS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdkb20td2ViYW5pbWF0aW9uJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gaGFzXzEuZGVmYXVsdCgnaG9zdC1icm93c2VyJykgJiYgZ2xvYmFsXzEuZGVmYXVsdC5BbmltYXRpb24gIT09IHVuZGVmaW5lZCAmJiBnbG9iYWxfMS5kZWZhdWx0LktleWZyYW1lRWZmZWN0ICE9PSB1bmRlZmluZWQ7IH0sIHRydWUpO1xyXG52YXIgdGVtcGxhdGVPYmplY3RfMTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvaGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvaGFzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuLi9nbG9iYWxcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL2hhc1wiKTtcclxuZnVuY3Rpb24gZXhlY3V0ZVRhc2soaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pc0FjdGl2ZSAmJiBpdGVtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgaXRlbS5jYWxsYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFF1ZXVlSGFuZGxlKGl0ZW0sIGRlc3RydWN0b3IpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbS5jYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChkZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbnZhciBjaGVja01pY3JvVGFza1F1ZXVlO1xyXG52YXIgbWljcm9UYXNrcztcclxuLyoqXHJcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtYWNyb3Rhc2sgcXVldWUuXHJcbiAqXHJcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gYmUgcXVldWVkIGFuZCBsYXRlciBleGVjdXRlZC5cclxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYSBgZGVzdHJveWAgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBwcmV2ZW50cyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFjayBmcm9tIGV4ZWN1dGluZy5cclxuICovXHJcbmV4cG9ydHMucXVldWVUYXNrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZXN0cnVjdG9yO1xyXG4gICAgdmFyIGVucXVldWU7XHJcbiAgICAvLyBTaW5jZSB0aGUgSUUgaW1wbGVtZW50YXRpb24gb2YgYHNldEltbWVkaWF0ZWAgaXMgbm90IGZsYXdsZXNzLCB3ZSB3aWxsIHRlc3QgZm9yIGBwb3N0TWVzc2FnZWAgZmlyc3QuXHJcbiAgICBpZiAoaGFzXzEuZGVmYXVsdCgncG9zdG1lc3NhZ2UnKSkge1xyXG4gICAgICAgIHZhciBxdWV1ZV8xID0gW107XHJcbiAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIENvbmZpcm0gdGhhdCB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSB0aGUgY3VycmVudCB3aW5kb3cgYW5kIGJ5IHRoaXMgcGFydGljdWxhciBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsXzEuZGVmYXVsdCAmJiBldmVudC5kYXRhID09PSAnZG9qby1xdWV1ZS1tZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVldWVfMS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBleGVjdXRlVGFzayhxdWV1ZV8xLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZW5xdWV1ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlXzEucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5wb3N0TWVzc2FnZSgnZG9qby1xdWV1ZS1tZXNzYWdlJywgJyonKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFzXzEuZGVmYXVsdCgnc2V0aW1tZWRpYXRlJykpIHtcclxuICAgICAgICBkZXN0cnVjdG9yID0gZ2xvYmFsXzEuZGVmYXVsdC5jbGVhckltbWVkaWF0ZTtcclxuICAgICAgICBlbnF1ZXVlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZShleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGVzdHJ1Y3RvciA9IGdsb2JhbF8xLmRlZmF1bHQuY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIGVucXVldWUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pLCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcXVldWVUYXNrKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBpZCA9IGVucXVldWUoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0sIGRlc3RydWN0b3IgJiZcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGVzdHJ1Y3RvcihpZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogVXNlIGFzcGVjdC5iZWZvcmUgd2hlbiBpdCBpcyBhdmFpbGFibGUuXHJcbiAgICByZXR1cm4gaGFzXzEuZGVmYXVsdCgnbWljcm90YXNrcycpXHJcbiAgICAgICAgPyBxdWV1ZVRhc2tcclxuICAgICAgICA6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBjaGVja01pY3JvVGFza1F1ZXVlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZVRhc2soY2FsbGJhY2spO1xyXG4gICAgICAgIH07XHJcbn0pKCk7XHJcbi8vIFdoZW4gbm8gbWVjaGFuaXNtIGZvciByZWdpc3RlcmluZyBtaWNyb3Rhc2tzIGlzIGV4cG9zZWQgYnkgdGhlIGVudmlyb25tZW50LCBtaWNyb3Rhc2tzIHdpbGxcclxuLy8gYmUgcXVldWVkIGFuZCB0aGVuIGV4ZWN1dGVkIGluIGEgc2luZ2xlIG1hY3JvdGFzayBiZWZvcmUgdGhlIG90aGVyIG1hY3JvdGFza3MgYXJlIGV4ZWN1dGVkLlxyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ21pY3JvdGFza3MnKSkge1xyXG4gICAgdmFyIGlzTWljcm9UYXNrUXVldWVkXzEgPSBmYWxzZTtcclxuICAgIG1pY3JvVGFza3MgPSBbXTtcclxuICAgIGNoZWNrTWljcm9UYXNrUXVldWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFpc01pY3JvVGFza1F1ZXVlZF8xKSB7XHJcbiAgICAgICAgICAgIGlzTWljcm9UYXNrUXVldWVkXzEgPSB0cnVlO1xyXG4gICAgICAgICAgICBleHBvcnRzLnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpc01pY3JvVGFza1F1ZXVlZF8xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAobWljcm9UYXNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGl0ZW0gPSBtaWNyb1Rhc2tzLnNoaWZ0KCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVUYXNrKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICogU2NoZWR1bGVzIGFuIGFuaW1hdGlvbiB0YXNrIHdpdGggYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGlmIGl0IGV4aXN0cywgb3Igd2l0aCBgcXVldWVUYXNrYCBvdGhlcndpc2UuXHJcbiAqXHJcbiAqIFNpbmNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSdzIGJlaGF2aW9yIGRvZXMgbm90IG1hdGNoIHRoYXQgZXhwZWN0ZWQgZnJvbSBgcXVldWVUYXNrYCwgaXQgaXMgbm90IHVzZWQgdGhlcmUuXHJcbiAqIEhvd2V2ZXIsIGF0IHRpbWVzIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gZGVsZWdhdGUgdG8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lOyBoZW5jZSB0aGUgZm9sbG93aW5nIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxyXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxyXG4gKi9cclxuZXhwb3J0cy5xdWV1ZUFuaW1hdGlvblRhc2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFoYXNfMS5kZWZhdWx0KCdyYWYnKSkge1xyXG4gICAgICAgIHJldHVybiBleHBvcnRzLnF1ZXVlVGFzaztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHF1ZXVlQW5pbWF0aW9uVGFzayhjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBpdGVtID0ge1xyXG4gICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSk7XHJcbiAgICAgICAgcmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogVXNlIGFzcGVjdC5iZWZvcmUgd2hlbiBpdCBpcyBhdmFpbGFibGUuXHJcbiAgICByZXR1cm4gaGFzXzEuZGVmYXVsdCgnbWljcm90YXNrcycpXHJcbiAgICAgICAgPyBxdWV1ZUFuaW1hdGlvblRhc2tcclxuICAgICAgICA6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBjaGVja01pY3JvVGFza1F1ZXVlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZUFuaW1hdGlvblRhc2soY2FsbGJhY2spO1xyXG4gICAgICAgIH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBTY2hlZHVsZXMgYSBjYWxsYmFjayB0byB0aGUgbWljcm90YXNrIHF1ZXVlLlxyXG4gKlxyXG4gKiBBbnkgY2FsbGJhY2tzIHJlZ2lzdGVyZWQgd2l0aCBgcXVldWVNaWNyb1Rhc2tgIHdpbGwgYmUgZXhlY3V0ZWQgYmVmb3JlIHRoZSBuZXh0IG1hY3JvdGFzay4gSWYgbm8gbmF0aXZlXHJcbiAqIG1lY2hhbmlzbSBmb3Igc2NoZWR1bGluZyBtYWNyb3Rhc2tzIGlzIGV4cG9zZWQsIHRoZW4gYW55IGNhbGxiYWNrcyB3aWxsIGJlIGZpcmVkIGJlZm9yZSBhbnkgbWFjcm90YXNrXHJcbiAqIHJlZ2lzdGVyZWQgd2l0aCBgcXVldWVUYXNrYCBvciBgcXVldWVBbmltYXRpb25UYXNrYC5cclxuICpcclxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxyXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxyXG4gKi9cclxuZXhwb3J0cy5xdWV1ZU1pY3JvVGFzayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZW5xdWV1ZTtcclxuICAgIGlmIChoYXNfMS5kZWZhdWx0KCdob3N0LW5vZGUnKSkge1xyXG4gICAgICAgIGVucXVldWUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBnbG9iYWxfMS5kZWZhdWx0LnByb2Nlc3MubmV4dFRpY2soZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhc18xLmRlZmF1bHQoJ2VzNi1wcm9taXNlJykpIHtcclxuICAgICAgICBlbnF1ZXVlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5Qcm9taXNlLnJlc29sdmUoaXRlbSkudGhlbihleGVjdXRlVGFzayk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhc18xLmRlZmF1bHQoJ2RvbS1tdXRhdGlvbm9ic2VydmVyJykpIHtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xyXG4gICAgICAgIHZhciBIb3N0TXV0YXRpb25PYnNlcnZlciA9IGdsb2JhbF8xLmRlZmF1bHQuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWxfMS5kZWZhdWx0LldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XHJcbiAgICAgICAgdmFyIG5vZGVfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciBxdWV1ZV8yID0gW107XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IEhvc3RNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHF1ZXVlXzIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZV8yLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmlzQWN0aXZlICYmIGl0ZW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGVfMSwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xyXG4gICAgICAgIGVucXVldWUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBxdWV1ZV8yLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIG5vZGVfMS5zZXRBdHRyaWJ1dGUoJ3F1ZXVlU3RhdHVzJywgJzEnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZW5xdWV1ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTWljcm9UYXNrUXVldWUoKTtcclxuICAgICAgICAgICAgbWljcm9UYXNrcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVucXVldWUoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0pO1xyXG4gICAgfTtcclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvcXVldWUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC9xdWV1ZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgdmFsdWUgcHJvcGVydHkgZGVzY3JpcHRvclxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWUgICAgICAgIFRoZSB2YWx1ZSB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBzaG91bGQgYmUgc2V0IHRvXHJcbiAqIEBwYXJhbSBlbnVtZXJhYmxlICAgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBlbnVtYmVyYWJsZSwgZGVmYXVsdHMgdG8gZmFsc2VcclxuICogQHBhcmFtIHdyaXRhYmxlICAgICBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIHdyaXRhYmxlLCBkZWZhdWx0cyB0byB0cnVlXHJcbiAqIEBwYXJhbSBjb25maWd1cmFibGUgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBjb25maWd1cmFibGUsIGRlZmF1bHRzIHRvIHRydWVcclxuICogQHJldHVybiAgICAgICAgICAgICBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIGdldFZhbHVlRGVzY3JpcHRvcih2YWx1ZSwgZW51bWVyYWJsZSwgd3JpdGFibGUsIGNvbmZpZ3VyYWJsZSkge1xyXG4gICAgaWYgKGVudW1lcmFibGUgPT09IHZvaWQgMCkgeyBlbnVtZXJhYmxlID0gZmFsc2U7IH1cclxuICAgIGlmICh3cml0YWJsZSA9PT0gdm9pZCAwKSB7IHdyaXRhYmxlID0gdHJ1ZTsgfVxyXG4gICAgaWYgKGNvbmZpZ3VyYWJsZSA9PT0gdm9pZCAwKSB7IGNvbmZpZ3VyYWJsZSA9IHRydWU7IH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IGVudW1lcmFibGUsXHJcbiAgICAgICAgd3JpdGFibGU6IHdyaXRhYmxlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogY29uZmlndXJhYmxlXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWVEZXNjcmlwdG9yID0gZ2V0VmFsdWVEZXNjcmlwdG9yO1xyXG5mdW5jdGlvbiB3cmFwTmF0aXZlKG5hdGl2ZUZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUZ1bmN0aW9uLmFwcGx5KHRhcmdldCwgYXJncyk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMud3JhcE5hdGl2ZSA9IHdyYXBOYXRpdmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9zdXBwb3J0L3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC91dGlsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG52YXIgaGFzID0gcmVxdWlyZSgnQGRvam8vY29yZS9oYXMnKTtcbmlmICghaGFzLmV4aXN0cygnYnVpbGQtdGltZS1yZW5kZXInKSkge1xuICAgIGhhcy5hZGQoJ2J1aWxkLXRpbWUtcmVuZGVyJywgZmFsc2UsIGZhbHNlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhhc0J1aWxkVGltZVJlbmRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvYnVpbGQtdGltZS1yZW5kZXIvaGFzQnVpbGRUaW1lUmVuZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvYnVpbGQtdGltZS1yZW5kZXIvaGFzQnVpbGRUaW1lUmVuZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgRXZlbnRlZF8xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvRXZlbnRlZFwiKTtcclxudmFyIEluamVjdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoSW5qZWN0b3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBJbmplY3RvcihwYXlsb2FkKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgSW5qZWN0b3IucHJvdG90eXBlLnNldEludmFsaWRhdG9yID0gZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5faW52YWxpZGF0b3IgPSBpbnZhbGlkYXRvcjtcclxuICAgIH07XHJcbiAgICBJbmplY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXlsb2FkO1xyXG4gICAgfTtcclxuICAgIEluamVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAocGF5bG9hZCkge1xyXG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSBwYXlsb2FkO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnZhbGlkYXRvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gSW5qZWN0b3I7XHJcbn0oRXZlbnRlZF8xLkV2ZW50ZWQpKTtcclxuZXhwb3J0cy5JbmplY3RvciA9IEluamVjdG9yO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBJbmplY3RvcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9JbmplY3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvSW5qZWN0b3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBFdmVudGVkXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9FdmVudGVkXCIpO1xyXG52YXIgTWFwXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9NYXBcIik7XHJcbi8qKlxyXG4gKiBFbnVtIHRvIGlkZW50aWZ5IHRoZSB0eXBlIG9mIGV2ZW50LlxyXG4gKiBMaXN0ZW5pbmcgdG8gJ1Byb2plY3Rvcicgd2lsbCBub3RpZnkgd2hlbiBwcm9qZWN0b3IgaXMgY3JlYXRlZCBvciB1cGRhdGVkXHJcbiAqIExpc3RlbmluZyB0byAnV2lkZ2V0JyB3aWxsIG5vdGlmeSB3aGVuIHdpZGdldCByb290IGlzIGNyZWF0ZWQgb3IgdXBkYXRlZFxyXG4gKi9cclxudmFyIE5vZGVFdmVudFR5cGU7XHJcbihmdW5jdGlvbiAoTm9kZUV2ZW50VHlwZSkge1xyXG4gICAgTm9kZUV2ZW50VHlwZVtcIlByb2plY3RvclwiXSA9IFwiUHJvamVjdG9yXCI7XHJcbiAgICBOb2RlRXZlbnRUeXBlW1wiV2lkZ2V0XCJdID0gXCJXaWRnZXRcIjtcclxufSkoTm9kZUV2ZW50VHlwZSA9IGV4cG9ydHMuTm9kZUV2ZW50VHlwZSB8fCAoZXhwb3J0cy5Ob2RlRXZlbnRUeXBlID0ge30pKTtcclxudmFyIE5vZGVIYW5kbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTm9kZUhhbmRsZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBOb2RlSGFuZGxlcigpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fbm9kZU1hcCA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgTm9kZUhhbmRsZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZU1hcC5nZXQoa2V5KTtcclxuICAgIH07XHJcbiAgICBOb2RlSGFuZGxlci5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlTWFwLmhhcyhrZXkpO1xyXG4gICAgfTtcclxuICAgIE5vZGVIYW5kbGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZU1hcC5zZXQoa2V5LCBlbGVtZW50KTtcclxuICAgICAgICB0aGlzLmVtaXQoeyB0eXBlOiBrZXkgfSk7XHJcbiAgICB9O1xyXG4gICAgTm9kZUhhbmRsZXIucHJvdG90eXBlLmFkZFJvb3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KHsgdHlwZTogTm9kZUV2ZW50VHlwZS5XaWRnZXQgfSk7XHJcbiAgICB9O1xyXG4gICAgTm9kZUhhbmRsZXIucHJvdG90eXBlLmFkZFByb2plY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmVtaXQoeyB0eXBlOiBOb2RlRXZlbnRUeXBlLlByb2plY3RvciB9KTtcclxuICAgIH07XHJcbiAgICBOb2RlSGFuZGxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZU1hcC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBOb2RlSGFuZGxlcjtcclxufShFdmVudGVkXzEuRXZlbnRlZCkpO1xyXG5leHBvcnRzLk5vZGVIYW5kbGVyID0gTm9kZUhhbmRsZXI7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE5vZGVIYW5kbGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL05vZGVIYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9Ob2RlSGFuZGxlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIFByb21pc2VfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL1Byb21pc2VcIik7XHJcbnZhciBNYXBfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL01hcFwiKTtcclxudmFyIFN5bWJvbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vU3ltYm9sXCIpO1xyXG52YXIgRXZlbnRlZF8xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvRXZlbnRlZFwiKTtcclxuLyoqXHJcbiAqIFdpZGdldCBiYXNlIHN5bWJvbCB0eXBlXHJcbiAqL1xyXG5leHBvcnRzLldJREdFVF9CQVNFX1RZUEUgPSBTeW1ib2xfMS5kZWZhdWx0KCdXaWRnZXQgQmFzZScpO1xyXG4vKipcclxuICogQ2hlY2tzIGlzIHRoZSBpdGVtIGlzIGEgc3ViY2xhc3Mgb2YgV2lkZ2V0QmFzZSAob3IgYSBXaWRnZXRCYXNlKVxyXG4gKlxyXG4gKiBAcGFyYW0gaXRlbSB0aGUgaXRlbSB0byBjaGVja1xyXG4gKiBAcmV0dXJucyB0cnVlL2ZhbHNlIGluZGljYXRpbmcgaWYgdGhlIGl0ZW0gaXMgYSBXaWRnZXRCYXNlQ29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKGl0ZW0pIHtcclxuICAgIHJldHVybiBCb29sZWFuKGl0ZW0gJiYgaXRlbS5fdHlwZSA9PT0gZXhwb3J0cy5XSURHRVRfQkFTRV9UWVBFKTtcclxufVxyXG5leHBvcnRzLmlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yID0gaXNXaWRnZXRCYXNlQ29uc3RydWN0b3I7XHJcbmZ1bmN0aW9uIGlzV2lkZ2V0Q29uc3RydWN0b3JEZWZhdWx0RXhwb3J0KGl0ZW0pIHtcclxuICAgIHJldHVybiBCb29sZWFuKGl0ZW0gJiZcclxuICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdfX2VzTW9kdWxlJykgJiZcclxuICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgJiZcclxuICAgICAgICBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtLmRlZmF1bHQpKTtcclxufVxyXG5leHBvcnRzLmlzV2lkZ2V0Q29uc3RydWN0b3JEZWZhdWx0RXhwb3J0ID0gaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQ7XHJcbi8qKlxyXG4gKiBUaGUgUmVnaXN0cnkgaW1wbGVtZW50YXRpb25cclxuICovXHJcbnZhciBSZWdpc3RyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFJlZ2lzdHJ5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmVnaXN0cnkoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0IGxvYWRlZCBldmVudCBmb3IgcmVnaXN0cnkgbGFiZWxcclxuICAgICAqL1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmVtaXRMb2FkZWRFdmVudCA9IGZ1bmN0aW9uICh3aWRnZXRMYWJlbCwgaXRlbSkge1xyXG4gICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6IHdpZGdldExhYmVsLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdsb2FkZWQnLFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uIChsYWJlbCwgaXRlbSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dpZGdldFJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0UmVnaXN0cnkgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fd2lkZ2V0UmVnaXN0cnkuaGFzKGxhYmVsKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3aWRnZXQgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGZvciAnXCIgKyBsYWJlbC50b1N0cmluZygpICsgXCInXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aWRnZXRSZWdpc3RyeS5zZXQobGFiZWwsIGl0ZW0pO1xyXG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZV8xLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgaXRlbS50aGVuKGZ1bmN0aW9uICh3aWRnZXRDdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCB3aWRnZXRDdG9yKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVtaXRMb2FkZWRFdmVudChsYWJlbCwgd2lkZ2V0Q3Rvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0Q3RvcjtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmRlZmluZUluamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsLCBpbmplY3RvckZhY3RvcnkpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5qZWN0b3JSZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luamVjdG9yUmVnaXN0cnkgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW5qZWN0b3JSZWdpc3RyeS5oYXMobGFiZWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImluamVjdG9yIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBmb3IgJ1wiICsgbGFiZWwudG9TdHJpbmcoKSArIFwiJ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGludmFsaWRhdG9yID0gbmV3IEV2ZW50ZWRfMS5FdmVudGVkKCk7XHJcbiAgICAgICAgdmFyIGluamVjdG9ySXRlbSA9IHtcclxuICAgICAgICAgICAgaW5qZWN0b3I6IGluamVjdG9yRmFjdG9yeShmdW5jdGlvbiAoKSB7IHJldHVybiBpbnZhbGlkYXRvci5lbWl0KHsgdHlwZTogJ2ludmFsaWRhdGUnIH0pOyB9KSxcclxuICAgICAgICAgICAgaW52YWxpZGF0b3I6IGludmFsaWRhdG9yXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LnNldChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcclxuICAgICAgICB0aGlzLmVtaXRMb2FkZWRFdmVudChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoaXMuX3dpZGdldFJlZ2lzdHJ5IHx8ICF0aGlzLmhhcyhsYWJlbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5fd2lkZ2V0UmVnaXN0cnkuZ2V0KGxhYmVsKTtcclxuICAgICAgICBpZiAoaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZV8xLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcm9taXNlID0gaXRlbSgpO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldFJlZ2lzdHJ5LnNldChsYWJlbCwgcHJvbWlzZSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh3aWRnZXRDdG9yKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1dpZGdldENvbnN0cnVjdG9yRGVmYXVsdEV4cG9ydCh3aWRnZXRDdG9yKSkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0Q3RvciA9IHdpZGdldEN0b3IuZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCB3aWRnZXRDdG9yKTtcclxuICAgICAgICAgICAgX3RoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdpZGdldEN0b3I7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5LnByb3RvdHlwZS5nZXRJbmplY3RvciA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5qZWN0b3JSZWdpc3RyeSB8fCAhdGhpcy5oYXNJbmplY3RvcihsYWJlbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmdldChsYWJlbCk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX3dpZGdldFJlZ2lzdHJ5ICYmIHRoaXMuX3dpZGdldFJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5LnByb3RvdHlwZS5oYXNJbmplY3RvciA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2luamVjdG9yUmVnaXN0cnkgJiYgdGhpcy5faW5qZWN0b3JSZWdpc3RyeS5oYXMobGFiZWwpKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVnaXN0cnk7XHJcbn0oRXZlbnRlZF8xLkV2ZW50ZWQpKTtcclxuZXhwb3J0cy5SZWdpc3RyeSA9IFJlZ2lzdHJ5O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBSZWdpc3RyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9SZWdpc3RyeS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvUmVnaXN0cnkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBNYXBfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL01hcFwiKTtcclxudmFyIEV2ZW50ZWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL0V2ZW50ZWRcIik7XHJcbnZhciBSZWdpc3RyeV8xID0gcmVxdWlyZShcIi4vUmVnaXN0cnlcIik7XHJcbnZhciBSZWdpc3RyeUhhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhSZWdpc3RyeUhhbmRsZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSZWdpc3RyeUhhbmRsZXIoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnlfMS5SZWdpc3RyeSgpO1xyXG4gICAgICAgIF90aGlzLl9yZWdpc3RyeVdpZGdldExhYmVsTWFwID0gbmV3IE1hcF8xLk1hcCgpO1xyXG4gICAgICAgIF90aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXAgPSBuZXcgTWFwXzEuTWFwKCk7XHJcbiAgICAgICAgX3RoaXMub3duKF90aGlzLl9yZWdpc3RyeSk7XHJcbiAgICAgICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5iYXNlUmVnaXN0cnkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9yZWdpc3RyeVdpZGdldExhYmVsTWFwLmRlbGV0ZShfdGhpcy5iYXNlUmVnaXN0cnkpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcC5kZWxldGUoX3RoaXMuYmFzZVJlZ2lzdHJ5KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmJhc2VSZWdpc3RyeSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMub3duKHsgZGVzdHJveTogZGVzdHJveSB9KTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZSwgXCJiYXNlXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChiYXNlUmVnaXN0cnkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFzZVJlZ2lzdHJ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RyeVdpZGdldExhYmVsTWFwLmRlbGV0ZSh0aGlzLmJhc2VSZWdpc3RyeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJhc2VSZWdpc3RyeSA9IGJhc2VSZWdpc3RyeTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFJlZ2lzdHJ5SGFuZGxlci5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24gKGxhYmVsLCB3aWRnZXQpIHtcclxuICAgICAgICB0aGlzLl9yZWdpc3RyeS5kZWZpbmUobGFiZWwsIHdpZGdldCk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZS5kZWZpbmVJbmplY3RvciA9IGZ1bmN0aW9uIChsYWJlbCwgaW5qZWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9yZWdpc3RyeS5kZWZpbmVJbmplY3RvcihsYWJlbCwgaW5qZWN0b3IpO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5SGFuZGxlci5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmhhcyhsYWJlbCkgfHwgQm9vbGVhbih0aGlzLmJhc2VSZWdpc3RyeSAmJiB0aGlzLmJhc2VSZWdpc3RyeS5oYXMobGFiZWwpKTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeUhhbmRsZXIucHJvdG90eXBlLmhhc0luamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobGFiZWwsIGdsb2JhbFByZWNlZGVuY2UpIHtcclxuICAgICAgICBpZiAoZ2xvYmFsUHJlY2VkZW5jZSA9PT0gdm9pZCAwKSB7IGdsb2JhbFByZWNlZGVuY2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQobGFiZWwsIGdsb2JhbFByZWNlZGVuY2UsICdnZXQnLCB0aGlzLl9yZWdpc3RyeVdpZGdldExhYmVsTWFwKTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeUhhbmRsZXIucHJvdG90eXBlLmdldEluamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlKSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbFByZWNlZGVuY2UgPT09IHZvaWQgMCkgeyBnbG9iYWxQcmVjZWRlbmNlID0gZmFsc2U7IH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlLCAnZ2V0SW5qZWN0b3InLCB0aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXApO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5SGFuZGxlci5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uIChsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSwgZ2V0RnVuY3Rpb25OYW1lLCBsYWJlbE1hcCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHJlZ2lzdHJpZXMgPSBnbG9iYWxQcmVjZWRlbmNlID8gW3RoaXMuYmFzZVJlZ2lzdHJ5LCB0aGlzLl9yZWdpc3RyeV0gOiBbdGhpcy5fcmVnaXN0cnksIHRoaXMuYmFzZVJlZ2lzdHJ5XTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHJlZ2lzdHJ5ID0gcmVnaXN0cmllc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFyZWdpc3RyeSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSByZWdpc3RyeVtnZXRGdW5jdGlvbk5hbWVdKGxhYmVsKTtcclxuICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWRMYWJlbHMgPSBsYWJlbE1hcC5nZXQocmVnaXN0cnkpIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocmVnaXN0ZXJlZExhYmVscy5pbmRleE9mKGxhYmVsKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUgPSByZWdpc3RyeS5vbihsYWJlbCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PT0gJ2xvYWRlZCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNbZ2V0RnVuY3Rpb25OYW1lXShsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSkgPT09IGV2ZW50Lml0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZW1pdCh7IHR5cGU6ICdpbnZhbGlkYXRlJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3duKGhhbmRsZSk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE1hcC5zZXQocmVnaXN0cnksIHRzbGliXzEuX19zcHJlYWQocmVnaXN0ZXJlZExhYmVscywgW2xhYmVsXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZWdpc3RyeUhhbmRsZXI7XHJcbn0oRXZlbnRlZF8xLkV2ZW50ZWQpKTtcclxuZXhwb3J0cy5SZWdpc3RyeUhhbmRsZXIgPSBSZWdpc3RyeUhhbmRsZXI7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFJlZ2lzdHJ5SGFuZGxlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9SZWdpc3RyeUhhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1JlZ2lzdHJ5SGFuZGxlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIE1hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vTWFwXCIpO1xyXG52YXIgV2Vha01hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vV2Vha01hcFwiKTtcclxudmFyIFN5bWJvbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vU3ltYm9sXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIi4vZFwiKTtcclxudmFyIGRpZmZfMSA9IHJlcXVpcmUoXCIuL2RpZmZcIik7XHJcbnZhciBSZWdpc3RyeUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL1JlZ2lzdHJ5SGFuZGxlclwiKTtcclxudmFyIE5vZGVIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9Ob2RlSGFuZGxlclwiKTtcclxudmFyIHZkb21fMSA9IHJlcXVpcmUoXCIuL3Zkb21cIik7XHJcbnZhciBSZWdpc3RyeV8xID0gcmVxdWlyZShcIi4vUmVnaXN0cnlcIik7XHJcbnZhciBkZWNvcmF0b3JNYXAgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG52YXIgYm91bmRBdXRvID0gZGlmZl8xLmF1dG8uYmluZChudWxsKTtcclxuZXhwb3J0cy5ub0JpbmQgPSBTeW1ib2xfMS5kZWZhdWx0LmZvcignZG9qb05vQmluZCcpO1xyXG4vKipcclxuICogTWFpbiB3aWRnZXQgYmFzZSBmb3IgYWxsIHdpZGdldHMgdG8gZXh0ZW5kXHJcbiAqL1xyXG52YXIgV2lkZ2V0QmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFdpZGdldEJhc2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgaXQgaXMgdGhlIGluaXRpYWwgc2V0IHByb3BlcnRpZXMgY3ljbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9IHRydWU7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXJyYXkgb2YgcHJvcGVydHkga2V5cyBjb25zaWRlcmVkIGNoYW5nZWQgZnJvbSB0aGUgcHJldmlvdXMgc2V0IHByb3BlcnRpZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzID0gW107XHJcbiAgICAgICAgdGhpcy5fbm9kZUhhbmRsZXIgPSBuZXcgTm9kZUhhbmRsZXJfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5fZGVjb3JhdG9yQ2FjaGUgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9ib3VuZFJlbmRlckZ1bmMgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kSW52YWxpZGF0ZSA9IHRoaXMuaW52YWxpZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHZkb21fMS53aWRnZXRJbnN0YW5jZU1hcC5zZXQodGhpcywge1xyXG4gICAgICAgICAgICBkaXJ0eTogdHJ1ZSxcclxuICAgICAgICAgICAgb25BdHRhY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQXR0YWNoKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRGV0YWNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkRldGFjaCgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVnaXN0cnk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvcmVQcm9wZXJ0aWVzOiB7fSxcclxuICAgICAgICAgICAgcmVuZGVyaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQcm9wZXJ0aWVzOiB7fVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3J1bkFmdGVyQ29uc3RydWN0b3JzKCk7XHJcbiAgICB9XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5tZXRhID0gZnVuY3Rpb24gKE1ldGFUeXBlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGFNYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRhTWFwID0gbmV3IE1hcF8xLmRlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNhY2hlZCA9IHRoaXMuX21ldGFNYXAuZ2V0KE1ldGFUeXBlKTtcclxuICAgICAgICBpZiAoIWNhY2hlZCkge1xyXG4gICAgICAgICAgICBjYWNoZWQgPSBuZXcgTWV0YVR5cGUoe1xyXG4gICAgICAgICAgICAgICAgaW52YWxpZGF0ZTogdGhpcy5fYm91bmRJbnZhbGlkYXRlLFxyXG4gICAgICAgICAgICAgICAgbm9kZUhhbmRsZXI6IHRoaXMuX25vZGVIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgYmluZDogdGhpc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5vd24oY2FjaGVkKTtcclxuICAgICAgICAgICAgdGhpcy5fbWV0YU1hcC5zZXQoTWV0YVR5cGUsIGNhY2hlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZWQ7XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUub25BdHRhY2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxyXG4gICAgfTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLm9uRGV0YWNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgYnkgZGVmYXVsdC5cclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2lkZ2V0QmFzZS5wcm90b3R5cGUsIFwicHJvcGVydGllc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdpZGdldEJhc2UucHJvdG90eXBlLCBcImNoYW5nZWRQcm9wZXJ0eUtleXNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyA9IGZ1bmN0aW9uIChjb3JlUHJvcGVydGllcykge1xyXG4gICAgICAgIHZhciBiYXNlUmVnaXN0cnkgPSBjb3JlUHJvcGVydGllcy5iYXNlUmVnaXN0cnk7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IHZkb21fMS53aWRnZXRJbnN0YW5jZU1hcC5nZXQodGhpcyk7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iYXNlUmVnaXN0cnkgIT09IGJhc2VSZWdpc3RyeSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnlIYW5kbGVyXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vd24odGhpcy5fcmVnaXN0cnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vd24odGhpcy5fcmVnaXN0cnkub24oJ2ludmFsaWRhdGUnLCB0aGlzLl9ib3VuZEludmFsaWRhdGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RyeS5iYXNlID0gYmFzZVJlZ2lzdHJ5O1xyXG4gICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzID0gY29yZVByb3BlcnRpZXM7XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX19zZXRQcm9wZXJ0aWVzX18gPSBmdW5jdGlvbiAob3JpZ2luYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdmRvbV8xLndpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKTtcclxuICAgICAgICBpbnN0YW5jZURhdGEuaW5wdXRQcm9wZXJ0aWVzID0gb3JpZ2luYWxQcm9wZXJ0aWVzO1xyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5fcnVuQmVmb3JlUHJvcGVydGllcyhvcmlnaW5hbFByb3BlcnRpZXMpO1xyXG4gICAgICAgIHZhciByZWdpc3RlcmVkRGlmZlByb3BlcnR5TmFtZXMgPSB0aGlzLmdldERlY29yYXRvcigncmVnaXN0ZXJlZERpZmZQcm9wZXJ0eScpO1xyXG4gICAgICAgIHZhciBjaGFuZ2VkUHJvcGVydHlLZXlzID0gW107XHJcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcclxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbFByb3BlcnRpZXMgPT09IGZhbHNlIHx8IHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgdmFyIGFsbFByb3BlcnRpZXMgPSB0c2xpYl8xLl9fc3ByZWFkKHByb3BlcnR5TmFtZXMsIE9iamVjdC5rZXlzKHRoaXMuX3Byb3BlcnRpZXMpKTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrZWRQcm9wZXJ0aWVzID0gW107XHJcbiAgICAgICAgICAgIHZhciBkaWZmUHJvcGVydHlSZXN1bHRzXzEgPSB7fTtcclxuICAgICAgICAgICAgdmFyIHJ1blJlYWN0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBhbGxQcm9wZXJ0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydHlOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRQcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1Byb3BlcnR5ID0gdGhpcy5fcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1Byb3BlcnR5ID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHkocHJvcGVydGllc1twcm9wZXJ0eU5hbWVdLCBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmluZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzLmluZGV4T2YocHJvcGVydHlOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBydW5SZWFjdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmRnVuY3Rpb25zID0gdGhpcy5nZXREZWNvcmF0b3IoXCJkaWZmUHJvcGVydHk6XCIgKyBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGRpZmZGdW5jdGlvbnMubGVuZ3RoOyBpXzErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZGlmZkZ1bmN0aW9uc1tpXzFdKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmUHJvcGVydHlSZXN1bHRzXzFbcHJvcGVydHlOYW1lXSA9IHJlc3VsdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBib3VuZEF1dG8ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY2hhbmdlZCAmJiBjaGFuZ2VkUHJvcGVydHlLZXlzLmluZGV4T2YocHJvcGVydHlOYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmUHJvcGVydHlSZXN1bHRzXzFbcHJvcGVydHlOYW1lXSA9IHJlc3VsdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJ1blJlYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWN0aW9uRnVuY3Rpb25zID0gdGhpcy5nZXREZWNvcmF0b3IoJ2RpZmZSZWFjdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4ZWN1dGVkUmVhY3Rpb25zXzEgPSBbXTtcclxuICAgICAgICAgICAgICAgIHJlYWN0aW9uRnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWN0aW9uID0gX2EucmVhY3Rpb24sIHByb3BlcnR5TmFtZSA9IF9hLnByb3BlcnR5TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlDaGFuZ2VkID0gY2hhbmdlZFByb3BlcnR5S2V5cy5pbmRleE9mKHByb3BlcnR5TmFtZSkgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFjdGlvblJ1biA9IGV4ZWN1dGVkUmVhY3Rpb25zXzEuaW5kZXhPZihyZWFjdGlvbikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUNoYW5nZWQgJiYgIXJlYWN0aW9uUnVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0aW9uLmNhbGwoX3RoaXMsIF90aGlzLl9wcm9wZXJ0aWVzLCBkaWZmUHJvcGVydHlSZXN1bHRzXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRlZFJlYWN0aW9uc18xLnB1c2gocmVhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBkaWZmUHJvcGVydHlSZXN1bHRzXzE7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMgPSBjaGFuZ2VkUHJvcGVydHlLZXlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbFByb3BlcnRpZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHkocHJvcGVydGllc1twcm9wZXJ0eU5hbWVdLCBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmluZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzID0gY2hhbmdlZFByb3BlcnR5S2V5cztcclxuICAgICAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2lkZ2V0QmFzZS5wcm90b3R5cGUsIFwiY2hpbGRyZW5cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5fX3NldENoaWxkcmVuX18gPSBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID4gMCB8fCBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5fX3JlbmRlcl9fID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB2ZG9tXzEud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpO1xyXG4gICAgICAgIGluc3RhbmNlRGF0YS5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZW5kZXIgPSB0aGlzLl9ydW5CZWZvcmVSZW5kZXJzKCk7XHJcbiAgICAgICAgdmFyIGROb2RlID0gcmVuZGVyKCk7XHJcbiAgICAgICAgZE5vZGUgPSB0aGlzLnJ1bkFmdGVyUmVuZGVycyhkTm9kZSk7XHJcbiAgICAgICAgdGhpcy5fbm9kZUhhbmRsZXIuY2xlYXIoKTtcclxuICAgICAgICByZXR1cm4gZE5vZGU7XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdmRvbV8xLndpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKTtcclxuICAgICAgICBpZiAoaW5zdGFuY2VEYXRhLmludmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2VEYXRhLmludmFsaWRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge30sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gYWRkIGRlY29yYXRvcnMgdG8gV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWNvcmF0b3JLZXkgVGhlIGtleSBvZiB0aGUgZGVjb3JhdG9yXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBkZWNvcmF0b3JcclxuICAgICAqL1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuYWRkRGVjb3JhdG9yID0gZnVuY3Rpb24gKGRlY29yYXRvcktleSwgdmFsdWUpIHtcclxuICAgICAgICB2YWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWNvcmF0b3JMaXN0ID0gZGVjb3JhdG9yTWFwLmdldCh0aGlzLmNvbnN0cnVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKCFkZWNvcmF0b3JMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3JMaXN0ID0gbmV3IE1hcF8xLmRlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGRlY29yYXRvck1hcC5zZXQodGhpcy5jb25zdHJ1Y3RvciwgZGVjb3JhdG9yTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNwZWNpZmljRGVjb3JhdG9yTGlzdCA9IGRlY29yYXRvckxpc3QuZ2V0KGRlY29yYXRvcktleSk7XHJcbiAgICAgICAgICAgIGlmICghc3BlY2lmaWNEZWNvcmF0b3JMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWZpY0RlY29yYXRvckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGRlY29yYXRvckxpc3Quc2V0KGRlY29yYXRvcktleSwgc3BlY2lmaWNEZWNvcmF0b3JMaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjaWZpY0RlY29yYXRvckxpc3QucHVzaC5hcHBseShzcGVjaWZpY0RlY29yYXRvckxpc3QsIHRzbGliXzEuX19zcHJlYWQodmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkZWNvcmF0b3JzID0gdGhpcy5nZXREZWNvcmF0b3IoZGVjb3JhdG9yS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5fZGVjb3JhdG9yQ2FjaGUuc2V0KGRlY29yYXRvcktleSwgdHNsaWJfMS5fX3NwcmVhZChkZWNvcmF0b3JzLCB2YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBsaXN0IG9mIGRlY29yYXRvcnMgZnJvbSB0aGUgZ2xvYmFsIGRlY29yYXRvciBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlY29yYXRvcktleSAgVGhlIGtleSBvZiB0aGUgZGVjb3JhdG9yXHJcbiAgICAgKiBAcmV0dXJuIEFuIGFycmF5IG9mIGRlY29yYXRvciB2YWx1ZXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9idWlsZERlY29yYXRvckxpc3QgPSBmdW5jdGlvbiAoZGVjb3JhdG9yS2V5KSB7XHJcbiAgICAgICAgdmFyIGFsbERlY29yYXRvcnMgPSBbXTtcclxuICAgICAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIHdoaWxlIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VNYXAgPSBkZWNvcmF0b3JNYXAuZ2V0KGNvbnN0cnVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlTWFwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9ycyA9IGluc3RhbmNlTWFwLmdldChkZWNvcmF0b3JLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlY29yYXRvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxEZWNvcmF0b3JzLnVuc2hpZnQuYXBwbHkoYWxsRGVjb3JhdG9ycywgdHNsaWJfMS5fX3NwcmVhZChkZWNvcmF0b3JzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsRGVjb3JhdG9ycztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIHJldHJpZXZlIGRlY29yYXRvciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVjb3JhdG9yS2V5IFRoZSBrZXkgb2YgdGhlIGRlY29yYXRvclxyXG4gICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgZGVjb3JhdG9yIHZhbHVlc1xyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5nZXREZWNvcmF0b3IgPSBmdW5jdGlvbiAoZGVjb3JhdG9yS2V5KSB7XHJcbiAgICAgICAgdmFyIGFsbERlY29yYXRvcnMgPSB0aGlzLl9kZWNvcmF0b3JDYWNoZS5nZXQoZGVjb3JhdG9yS2V5KTtcclxuICAgICAgICBpZiAoYWxsRGVjb3JhdG9ycyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEZWNvcmF0b3JzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbGxEZWNvcmF0b3JzID0gdGhpcy5fYnVpbGREZWNvcmF0b3JMaXN0KGRlY29yYXRvcktleSk7XHJcbiAgICAgICAgdGhpcy5fZGVjb3JhdG9yQ2FjaGUuc2V0KGRlY29yYXRvcktleSwgYWxsRGVjb3JhdG9ycyk7XHJcbiAgICAgICAgcmV0dXJuIGFsbERlY29yYXRvcnM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyB1bmJvdW5kIHByb3BlcnR5IGZ1bmN0aW9ucyB0byB0aGUgc3BlY2lmaWVkIGBiaW5kYCBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGZ1bmN0aW9uc1xyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5fYmluZEZ1bmN0aW9uUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHksIGJpbmQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmICFwcm9wZXJ0eVtleHBvcnRzLm5vQmluZF0gJiYgUmVnaXN0cnlfMS5pc1dpZGdldEJhc2VDb25zdHJ1Y3Rvcihwcm9wZXJ0eSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcCA9IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBiaW5kSW5mbyA9IHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwLmdldChwcm9wZXJ0eSkgfHwge307XHJcbiAgICAgICAgICAgIHZhciBib3VuZEZ1bmMgPSBiaW5kSW5mby5ib3VuZEZ1bmMsIHNjb3BlID0gYmluZEluZm8uc2NvcGU7XHJcbiAgICAgICAgICAgIGlmIChib3VuZEZ1bmMgPT09IHVuZGVmaW5lZCB8fCBzY29wZSAhPT0gYmluZCkge1xyXG4gICAgICAgICAgICAgICAgYm91bmRGdW5jID0gcHJvcGVydHkuYmluZChiaW5kKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwLnNldChwcm9wZXJ0eSwgeyBib3VuZEZ1bmM6IGJvdW5kRnVuYywgc2NvcGU6IGJpbmQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJvdW5kRnVuYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXaWRnZXRCYXNlLnByb3RvdHlwZSwgXCJyZWdpc3RyeVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBSZWdpc3RyeUhhbmRsZXJfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bih0aGlzLl9yZWdpc3RyeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bih0aGlzLl9yZWdpc3RyeS5vbignaW52YWxpZGF0ZScsIHRoaXMuX2JvdW5kSW52YWxpZGF0ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9ydW5CZWZvcmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBiZWZvcmVQcm9wZXJ0aWVzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2JlZm9yZVByb3BlcnRpZXMnKTtcclxuICAgICAgICBpZiAoYmVmb3JlUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAocHJvcGVydGllcywgYmVmb3JlUHJvcGVydGllc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvcGVydGllcywgYmVmb3JlUHJvcGVydGllc0Z1bmN0aW9uLmNhbGwoX3RoaXMsIHByb3BlcnRpZXMpKTtcclxuICAgICAgICAgICAgfSwgdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvcGVydGllcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJ1biBhbGwgcmVnaXN0ZXJlZCBiZWZvcmUgcmVuZGVycyBhbmQgcmV0dXJuIHRoZSB1cGRhdGVkIHJlbmRlciBtZXRob2RcclxuICAgICAqL1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX3J1bkJlZm9yZVJlbmRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYmVmb3JlUmVuZGVycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdiZWZvcmVSZW5kZXInKTtcclxuICAgICAgICBpZiAoYmVmb3JlUmVuZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmVSZW5kZXJzLnJlZHVjZShmdW5jdGlvbiAocmVuZGVyLCBiZWZvcmVSZW5kZXJGdW5jdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWRSZW5kZXIgPSBiZWZvcmVSZW5kZXJGdW5jdGlvbi5jYWxsKF90aGlzLCByZW5kZXIsIF90aGlzLl9wcm9wZXJ0aWVzLCBfdGhpcy5fY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF1cGRhdGVkUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdSZW5kZXIgZnVuY3Rpb24gbm90IHJldHVybmVkIGZyb20gYmVmb3JlUmVuZGVyLCB1c2luZyBwcmV2aW91cyByZW5kZXInKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRSZW5kZXI7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2JvdW5kUmVuZGVyRnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZFJlbmRlckZ1bmM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSdW4gYWxsIHJlZ2lzdGVyZWQgYWZ0ZXIgcmVuZGVycyBhbmQgcmV0dXJuIHRoZSBkZWNvcmF0ZWQgRE5vZGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGROb2RlIFRoZSBETm9kZXMgdG8gcnVuIHRocm91Z2ggdGhlIGFmdGVyIHJlbmRlcnNcclxuICAgICAqL1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUucnVuQWZ0ZXJSZW5kZXJzID0gZnVuY3Rpb24gKGROb2RlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYWZ0ZXJSZW5kZXJzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2FmdGVyUmVuZGVyJyk7XHJcbiAgICAgICAgaWYgKGFmdGVyUmVuZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGROb2RlID0gYWZ0ZXJSZW5kZXJzLnJlZHVjZShmdW5jdGlvbiAoZE5vZGUsIGFmdGVyUmVuZGVyRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhZnRlclJlbmRlckZ1bmN0aW9uLmNhbGwoX3RoaXMsIGROb2RlKTtcclxuICAgICAgICAgICAgfSwgZE5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWV0YU1hcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGFNYXAuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgICAgICAgICAgbWV0YS5hZnRlclJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGROb2RlO1xyXG4gICAgfTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9ydW5BZnRlckNvbnN0cnVjdG9ycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhZnRlckNvbnN0cnVjdG9ycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdhZnRlckNvbnN0cnVjdG9yJyk7XHJcbiAgICAgICAgaWYgKGFmdGVyQ29uc3RydWN0b3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYWZ0ZXJDb25zdHJ1Y3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoYWZ0ZXJDb25zdHJ1Y3RvcikgeyByZXR1cm4gYWZ0ZXJDb25zdHJ1Y3Rvci5jYWxsKF90aGlzKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLm93biA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVzLnB1c2goaGFuZGxlKTtcclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9oYW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IHRoaXMuX2hhbmRsZXMucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBzdGF0aWMgaWRlbnRpZmllclxyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLl90eXBlID0gUmVnaXN0cnlfMS5XSURHRVRfQkFTRV9UWVBFO1xyXG4gICAgcmV0dXJuIFdpZGdldEJhc2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuV2lkZ2V0QmFzZSA9IFdpZGdldEJhc2U7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFdpZGdldEJhc2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICcnO1xyXG52YXIgYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID0gJyc7XHJcbmZ1bmN0aW9uIGRldGVybWluZUJyb3dzZXJTdHlsZU5hbWVzKGVsZW1lbnQpIHtcclxuICAgIGlmICgnV2Via2l0VHJhbnNpdGlvbicgaW4gZWxlbWVudC5zdHlsZSkge1xyXG4gICAgICAgIGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUgPSAnd2Via2l0VHJhbnNpdGlvbkVuZCc7XHJcbiAgICAgICAgYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID0gJ3dlYmtpdEFuaW1hdGlvbkVuZCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgndHJhbnNpdGlvbicgaW4gZWxlbWVudC5zdHlsZSB8fCAnTW96VHJhbnNpdGlvbicgaW4gZWxlbWVudC5zdHlsZSkge1xyXG4gICAgICAgIGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUgPSAndHJhbnNpdGlvbmVuZCc7XHJcbiAgICAgICAgYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID0gJ2FuaW1hdGlvbmVuZCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZShlbGVtZW50KSB7XHJcbiAgICBpZiAoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID09PSAnJykge1xyXG4gICAgICAgIGRldGVybWluZUJyb3dzZXJTdHlsZU5hbWVzKGVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJ1bkFuZENsZWFuVXAoZWxlbWVudCwgc3RhcnRBbmltYXRpb24sIGZpbmlzaEFuaW1hdGlvbikge1xyXG4gICAgaW5pdGlhbGl6ZShlbGVtZW50KTtcclxuICAgIHZhciBmaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgdmFyIHRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSwgdHJhbnNpdGlvbkVuZCk7XHJcbiAgICAgICAgICAgIGZpbmlzaEFuaW1hdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBzdGFydEFuaW1hdGlvbigpO1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSwgdHJhbnNpdGlvbkVuZCk7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSwgdHJhbnNpdGlvbkVuZCk7XHJcbn1cclxuZnVuY3Rpb24gZXhpdChub2RlLCBwcm9wZXJ0aWVzLCBleGl0QW5pbWF0aW9uLCByZW1vdmVOb2RlKSB7XHJcbiAgICB2YXIgYWN0aXZlQ2xhc3MgPSBwcm9wZXJ0aWVzLmV4aXRBbmltYXRpb25BY3RpdmUgfHwgZXhpdEFuaW1hdGlvbiArIFwiLWFjdGl2ZVwiO1xyXG4gICAgcnVuQW5kQ2xlYW5VcChub2RlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGV4aXRBbmltYXRpb24pO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVtb3ZlTm9kZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZW50ZXIobm9kZSwgcHJvcGVydGllcywgZW50ZXJBbmltYXRpb24pIHtcclxuICAgIHZhciBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZW50ZXJBbmltYXRpb25BY3RpdmUgfHwgZW50ZXJBbmltYXRpb24gKyBcIi1hY3RpdmVcIjtcclxuICAgIHJ1bkFuZENsZWFuVXAobm9kZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChlbnRlckFuaW1hdGlvbik7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoZW50ZXJBbmltYXRpb24pO1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSB7XHJcbiAgICBlbnRlcjogZW50ZXIsXHJcbiAgICBleGl0OiBleGl0XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvYW5pbWF0aW9ucy9jc3NUcmFuc2l0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvYW5pbWF0aW9ucy9jc3NUcmFuc2l0aW9ucy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIFN5bWJvbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vU3ltYm9sXCIpO1xyXG4vKipcclxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFdOb2RlIHR5cGVcclxuICovXHJcbmV4cG9ydHMuV05PREUgPSBTeW1ib2xfMS5kZWZhdWx0KCdJZGVudGlmaWVyIGZvciBhIFdOb2RlLicpO1xyXG4vKipcclxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFZOb2RlIHR5cGVcclxuICovXHJcbmV4cG9ydHMuVk5PREUgPSBTeW1ib2xfMS5kZWZhdWx0KCdJZGVudGlmaWVyIGZvciBhIFZOb2RlLicpO1xyXG4vKipcclxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFZOb2RlIHR5cGUgY3JlYXRlZCB1c2luZyBkb20oKVxyXG4gKi9cclxuZXhwb3J0cy5ET01WTk9ERSA9IFN5bWJvbF8xLmRlZmF1bHQoJ0lkZW50aWZpZXIgZm9yIGEgVk5vZGUgY3JlYXRlZCB1c2luZyBleGlzdGluZyBkb20uJyk7XHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRydWUgaWYgdGhlIGBETm9kZWAgaXMgYSBgV05vZGVgIHVzaW5nIHRoZSBgdHlwZWAgcHJvcGVydHlcclxuICovXHJcbmZ1bmN0aW9uIGlzV05vZGUoY2hpbGQpIHtcclxuICAgIHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgY2hpbGQudHlwZSA9PT0gZXhwb3J0cy5XTk9ERSk7XHJcbn1cclxuZXhwb3J0cy5pc1dOb2RlID0gaXNXTm9kZTtcclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBWTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxyXG4gKi9cclxuZnVuY3Rpb24gaXNWTm9kZShjaGlsZCkge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oY2hpbGQgJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiAoY2hpbGQudHlwZSA9PT0gZXhwb3J0cy5WTk9ERSB8fCBjaGlsZC50eXBlID09PSBleHBvcnRzLkRPTVZOT0RFKSk7XHJcbn1cclxuZXhwb3J0cy5pc1ZOb2RlID0gaXNWTm9kZTtcclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBWTm9kZWAgY3JlYXRlZCB3aXRoIGBkb20oKWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb21WTm9kZShjaGlsZCkge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oY2hpbGQgJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiBjaGlsZC50eXBlID09PSBleHBvcnRzLkRPTVZOT0RFKTtcclxufVxyXG5leHBvcnRzLmlzRG9tVk5vZGUgPSBpc0RvbVZOb2RlO1xyXG5mdW5jdGlvbiBpc0VsZW1lbnROb2RlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gISF2YWx1ZS50YWdOYW1lO1xyXG59XHJcbmV4cG9ydHMuaXNFbGVtZW50Tm9kZSA9IGlzRWxlbWVudE5vZGU7XHJcbmZ1bmN0aW9uIGRlY29yYXRlKGROb2Rlcywgb3B0aW9uc09yTW9kaWZpZXIsIHByZWRpY2F0ZSkge1xyXG4gICAgdmFyIHNoYWxsb3cgPSBmYWxzZTtcclxuICAgIHZhciBtb2RpZmllcjtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9uc09yTW9kaWZpZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBtb2RpZmllciA9IG9wdGlvbnNPck1vZGlmaWVyO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW9kaWZpZXIgPSBvcHRpb25zT3JNb2RpZmllci5tb2RpZmllcjtcclxuICAgICAgICBwcmVkaWNhdGUgPSBvcHRpb25zT3JNb2RpZmllci5wcmVkaWNhdGU7XHJcbiAgICAgICAgc2hhbGxvdyA9IG9wdGlvbnNPck1vZGlmaWVyLnNoYWxsb3cgfHwgZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgbm9kZXMgPSBBcnJheS5pc0FycmF5KGROb2RlcykgPyB0c2xpYl8xLl9fc3ByZWFkKGROb2RlcykgOiBbZE5vZGVzXTtcclxuICAgIGZ1bmN0aW9uIGJyZWFrZXIoKSB7XHJcbiAgICAgICAgbm9kZXMgPSBbXTtcclxuICAgIH1cclxuICAgIHdoaWxlIChub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKCFzaGFsbG93ICYmIChpc1dOb2RlKG5vZGUpIHx8IGlzVk5vZGUobm9kZSkpICYmIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVzID0gdHNsaWJfMS5fX3NwcmVhZChub2Rlcywgbm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllcihub2RlLCBicmVha2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkTm9kZXM7XHJcbn1cclxuZXhwb3J0cy5kZWNvcmF0ZSA9IGRlY29yYXRlO1xyXG4vKipcclxuICogV3JhcHBlciBmdW5jdGlvbiBmb3IgY2FsbHMgdG8gY3JlYXRlIGEgd2lkZ2V0LlxyXG4gKi9cclxuZnVuY3Rpb24gdyh3aWRnZXRDb25zdHJ1Y3RvciwgcHJvcGVydGllcywgY2hpbGRyZW4pIHtcclxuICAgIGlmIChjaGlsZHJlbiA9PT0gdm9pZCAwKSB7IGNoaWxkcmVuID0gW107IH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxyXG4gICAgICAgIHdpZGdldENvbnN0cnVjdG9yOiB3aWRnZXRDb25zdHJ1Y3RvcixcclxuICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIHR5cGU6IGV4cG9ydHMuV05PREVcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy53ID0gdztcclxuZnVuY3Rpb24gdih0YWcsIHByb3BlcnRpZXNPckNoaWxkcmVuLCBjaGlsZHJlbikge1xyXG4gICAgaWYgKHByb3BlcnRpZXNPckNoaWxkcmVuID09PSB2b2lkIDApIHsgcHJvcGVydGllc09yQ2hpbGRyZW4gPSB7fTsgfVxyXG4gICAgaWYgKGNoaWxkcmVuID09PSB2b2lkIDApIHsgY2hpbGRyZW4gPSB1bmRlZmluZWQ7IH1cclxuICAgIHZhciBwcm9wZXJ0aWVzID0gcHJvcGVydGllc09yQ2hpbGRyZW47XHJcbiAgICB2YXIgZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2s7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wZXJ0aWVzT3JDaGlsZHJlbikpIHtcclxuICAgICAgICBjaGlsZHJlbiA9IHByb3BlcnRpZXNPckNoaWxkcmVuO1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrID0gcHJvcGVydGllcztcclxuICAgICAgICBwcm9wZXJ0aWVzID0ge307XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogdGFnLFxyXG4gICAgICAgIGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrOiBkZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayxcclxuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXHJcbiAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcyxcclxuICAgICAgICB0eXBlOiBleHBvcnRzLlZOT0RFXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMudiA9IHY7XHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBWTm9kZSBmb3IgYW4gZXhpc3RpbmcgRE9NIE5vZGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBkb20oX2EsIGNoaWxkcmVuKSB7XHJcbiAgICB2YXIgbm9kZSA9IF9hLm5vZGUsIF9iID0gX2EuYXR0cnMsIGF0dHJzID0gX2IgPT09IHZvaWQgMCA/IHt9IDogX2IsIF9jID0gX2EucHJvcHMsIHByb3BzID0gX2MgPT09IHZvaWQgMCA/IHt9IDogX2MsIF9kID0gX2Eub24sIG9uID0gX2QgPT09IHZvaWQgMCA/IHt9IDogX2QsIF9lID0gX2EuZGlmZlR5cGUsIGRpZmZUeXBlID0gX2UgPT09IHZvaWQgMCA/ICdub25lJyA6IF9lO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6IGlzRWxlbWVudE5vZGUobm9kZSkgPyBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA6ICcnLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHByb3BzLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJzLFxyXG4gICAgICAgIGV2ZW50czogb24sXHJcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxyXG4gICAgICAgIHR5cGU6IGV4cG9ydHMuRE9NVk5PREUsXHJcbiAgICAgICAgZG9tTm9kZTogbm9kZSxcclxuICAgICAgICB0ZXh0OiBpc0VsZW1lbnROb2RlKG5vZGUpID8gdW5kZWZpbmVkIDogbm9kZS5kYXRhLFxyXG4gICAgICAgIGRpZmZUeXBlOiBkaWZmVHlwZVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmRvbSA9IGRvbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBoYW5kbGVEZWNvcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2hhbmRsZURlY29yYXRvclwiKTtcclxuZnVuY3Rpb24gYWZ0ZXJSZW5kZXIobWV0aG9kKSB7XHJcbiAgICByZXR1cm4gaGFuZGxlRGVjb3JhdG9yXzEuaGFuZGxlRGVjb3JhdG9yKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgdGFyZ2V0LmFkZERlY29yYXRvcignYWZ0ZXJSZW5kZXInLCBwcm9wZXJ0eUtleSA/IHRhcmdldFtwcm9wZXJ0eUtleV0gOiBtZXRob2QpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5hZnRlclJlbmRlciA9IGFmdGVyUmVuZGVyO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBhZnRlclJlbmRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2FmdGVyUmVuZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2FmdGVyUmVuZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBoYW5kbGVEZWNvcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2hhbmRsZURlY29yYXRvclwiKTtcclxudmFyIGJlZm9yZVByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2JlZm9yZVByb3BlcnRpZXNcIik7XHJcbmZ1bmN0aW9uIGFsd2F5c1JlbmRlcigpIHtcclxuICAgIHJldHVybiBoYW5kbGVEZWNvcmF0b3JfMS5oYW5kbGVEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICBiZWZvcmVQcm9wZXJ0aWVzXzEuYmVmb3JlUHJvcGVydGllcyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH0pKHRhcmdldCk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmFsd2F5c1JlbmRlciA9IGFsd2F5c1JlbmRlcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gYWx3YXlzUmVuZGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWx3YXlzUmVuZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2Fsd2F5c1JlbmRlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaGFuZGxlRGVjb3JhdG9yXzEgPSByZXF1aXJlKFwiLi9oYW5kbGVEZWNvcmF0b3JcIik7XHJcbmZ1bmN0aW9uIGJlZm9yZVByb3BlcnRpZXMobWV0aG9kKSB7XHJcbiAgICByZXR1cm4gaGFuZGxlRGVjb3JhdG9yXzEuaGFuZGxlRGVjb3JhdG9yKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgdGFyZ2V0LmFkZERlY29yYXRvcignYmVmb3JlUHJvcGVydGllcycsIHByb3BlcnR5S2V5ID8gdGFyZ2V0W3Byb3BlcnR5S2V5XSA6IG1ldGhvZCk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmJlZm9yZVByb3BlcnRpZXMgPSBiZWZvcmVQcm9wZXJ0aWVzO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBiZWZvcmVQcm9wZXJ0aWVzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYmVmb3JlUHJvcGVydGllcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9iZWZvcmVQcm9wZXJ0aWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciBSZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL1JlZ2lzdHJ5XCIpO1xyXG4vKipcclxuICogVGhpcyBEZWNvcmF0b3IgaXMgcHJvdmlkZWQgcHJvcGVydGllcyB0aGF0IGRlZmluZSB0aGUgYmVoYXZpb3Igb2YgYSBjdXN0b20gZWxlbWVudCwgYW5kXHJcbiAqIHJlZ2lzdGVycyB0aGF0IGN1c3RvbSBlbGVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gY3VzdG9tRWxlbWVudChfYSkge1xyXG4gICAgdmFyIHRhZyA9IF9hLnRhZywgX2IgPSBfYS5wcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzID0gX2IgPT09IHZvaWQgMCA/IFtdIDogX2IsIF9jID0gX2EuYXR0cmlidXRlcywgYXR0cmlidXRlcyA9IF9jID09PSB2b2lkIDAgPyBbXSA6IF9jLCBfZCA9IF9hLmV2ZW50cywgZXZlbnRzID0gX2QgPT09IHZvaWQgMCA/IFtdIDogX2QsIF9lID0gX2EuY2hpbGRUeXBlLCBjaGlsZFR5cGUgPSBfZSA9PT0gdm9pZCAwID8gcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5ET0pPIDogX2UsIF9mID0gX2EucmVnaXN0cnlGYWN0b3J5LCByZWdpc3RyeUZhY3RvcnkgPSBfZiA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFJlZ2lzdHJ5XzEuZGVmYXVsdCgpOyB9IDogX2Y7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuX19jdXN0b21FbGVtZW50RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgdGFnTmFtZTogdGFnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgICBldmVudHM6IGV2ZW50cyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiBjaGlsZFR5cGUsXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5RmFjdG9yeTogcmVnaXN0cnlGYWN0b3J5XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jdXN0b21FbGVtZW50ID0gY3VzdG9tRWxlbWVudDtcclxuZXhwb3J0cy5kZWZhdWx0ID0gY3VzdG9tRWxlbWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaGFuZGxlRGVjb3JhdG9yXzEgPSByZXF1aXJlKFwiLi9oYW5kbGVEZWNvcmF0b3JcIik7XHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBhIGZ1bmN0aW9uIGFzIGEgc3BlY2lmaWMgcHJvcGVydHkgZGlmZlxyXG4gKlxyXG4gKiBAcGFyYW0gcHJvcGVydHlOYW1lICBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgb2Ygd2hpY2ggdGhlIGRpZmYgZnVuY3Rpb24gaXMgYXBwbGllZFxyXG4gKiBAcGFyYW0gZGlmZlR5cGUgICAgICBUaGUgZGlmZiB0eXBlLCBkZWZhdWx0IGlzIERpZmZUeXBlLkFVVE8uXHJcbiAqIEBwYXJhbSBkaWZmRnVuY3Rpb24gIEEgZGlmZiBmdW5jdGlvbiB0byBydW4gaWYgZGlmZlR5cGUgaWYgRGlmZlR5cGUuQ1VTVE9NXHJcbiAqL1xyXG5mdW5jdGlvbiBkaWZmUHJvcGVydHkocHJvcGVydHlOYW1lLCBkaWZmRnVuY3Rpb24sIHJlYWN0aW9uRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiBoYW5kbGVEZWNvcmF0b3JfMS5oYW5kbGVEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKFwiZGlmZlByb3BlcnR5OlwiICsgcHJvcGVydHlOYW1lLCBkaWZmRnVuY3Rpb24uYmluZChudWxsKSk7XHJcbiAgICAgICAgdGFyZ2V0LmFkZERlY29yYXRvcigncmVnaXN0ZXJlZERpZmZQcm9wZXJ0eScsIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgaWYgKHJlYWN0aW9uRnVuY3Rpb24gfHwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmFkZERlY29yYXRvcignZGlmZlJlYWN0aW9uJywge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgICAgICByZWFjdGlvbjogcHJvcGVydHlLZXkgPyB0YXJnZXRbcHJvcGVydHlLZXldIDogcmVhY3Rpb25GdW5jdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRpZmZQcm9wZXJ0eSA9IGRpZmZQcm9wZXJ0eTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZGlmZlByb3BlcnR5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvZGlmZlByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2RpZmZQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKipcclxuICogR2VuZXJpYyBkZWNvcmF0b3IgaGFuZGxlciB0byB0YWtlIGNhcmUgb2Ygd2hldGhlciBvciBub3QgdGhlIGRlY29yYXRvciB3YXMgY2FsbGVkIGF0IHRoZSBjbGFzcyBsZXZlbFxyXG4gKiBvciB0aGUgbWV0aG9kIGxldmVsLlxyXG4gKlxyXG4gKiBAcGFyYW0gaGFuZGxlclxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlRGVjb3JhdG9yKGhhbmRsZXIpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIodGFyZ2V0LnByb3RvdHlwZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIodGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmhhbmRsZURlY29yYXRvciA9IGhhbmRsZURlY29yYXRvcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gaGFuZGxlRGVjb3JhdG9yO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvaGFuZGxlRGVjb3JhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2hhbmRsZURlY29yYXRvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgV2Vha01hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vV2Vha01hcFwiKTtcclxudmFyIGhhbmRsZURlY29yYXRvcl8xID0gcmVxdWlyZShcIi4vaGFuZGxlRGVjb3JhdG9yXCIpO1xyXG52YXIgYmVmb3JlUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYmVmb3JlUHJvcGVydGllc1wiKTtcclxuLyoqXHJcbiAqIE1hcCBvZiBpbnN0YW5jZXMgYWdhaW5zdCByZWdpc3RlcmVkIGluamVjdG9ycy5cclxuICovXHJcbnZhciByZWdpc3RlcmVkSW5qZWN0b3JzTWFwID0gbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgcmV0cmlldmVzIGFuIGluamVjdG9yIGZyb20gYW4gYXZhaWxhYmxlIHJlZ2lzdHJ5IHVzaW5nIHRoZSBuYW1lIGFuZFxyXG4gKiBjYWxscyB0aGUgYGdldFByb3BlcnRpZXNgIGZ1bmN0aW9uIHdpdGggdGhlIHBheWxvYWQgZnJvbSB0aGUgaW5qZWN0b3JcclxuICogYW5kIGN1cnJlbnQgcHJvcGVydGllcyB3aXRoIHRoZSB0aGUgaW5qZWN0ZWQgcHJvcGVydGllcyByZXR1cm5lZC5cclxuICpcclxuICogQHBhcmFtIEluamVjdENvbmZpZyB0aGUgaW5qZWN0IGNvbmZpZ3VyYXRpb25cclxuICovXHJcbmZ1bmN0aW9uIGluamVjdChfYSkge1xyXG4gICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBnZXRQcm9wZXJ0aWVzID0gX2EuZ2V0UHJvcGVydGllcztcclxuICAgIHJldHVybiBoYW5kbGVEZWNvcmF0b3JfMS5oYW5kbGVEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICBiZWZvcmVQcm9wZXJ0aWVzXzEuYmVmb3JlUHJvcGVydGllcyhmdW5jdGlvbiAocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaW5qZWN0b3JJdGVtID0gdGhpcy5yZWdpc3RyeS5nZXRJbmplY3RvcihuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGluamVjdG9ySXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluamVjdG9yID0gaW5qZWN0b3JJdGVtLmluamVjdG9yLCBpbnZhbGlkYXRvciA9IGluamVjdG9ySXRlbS5pbnZhbGlkYXRvcjtcclxuICAgICAgICAgICAgICAgIHZhciByZWdpc3RlcmVkSW5qZWN0b3JzID0gcmVnaXN0ZXJlZEluamVjdG9yc01hcC5nZXQodGhpcykgfHwgW107XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZEluamVjdG9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlcmVkSW5qZWN0b3JzTWFwLnNldCh0aGlzLCByZWdpc3RlcmVkSW5qZWN0b3JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RlcmVkSW5qZWN0b3JzLmluZGV4T2YoaW5qZWN0b3JJdGVtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bihpbnZhbGlkYXRvci5vbignaW52YWxpZGF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlcmVkSW5qZWN0b3JzLnB1c2goaW5qZWN0b3JJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRQcm9wZXJ0aWVzKGluamVjdG9yKCksIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkodGFyZ2V0KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuaW5qZWN0ID0gaW5qZWN0O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBpbmplY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9pbmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvaW5qZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWdpc3RyeV8xID0gcmVxdWlyZShcIi4vUmVnaXN0cnlcIik7XHJcbmZ1bmN0aW9uIGlzT2JqZWN0T3JBcnJheSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIGFsd2F5cyhwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFuZ2VkOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBuZXdQcm9wZXJ0eVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmFsd2F5cyA9IGFsd2F5cztcclxuZnVuY3Rpb24gaWdub3JlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZWQ6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiBuZXdQcm9wZXJ0eVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmlnbm9yZSA9IGlnbm9yZTtcclxuZnVuY3Rpb24gcmVmZXJlbmNlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZWQ6IHByZXZpb3VzUHJvcGVydHkgIT09IG5ld1Byb3BlcnR5LFxyXG4gICAgICAgIHZhbHVlOiBuZXdQcm9wZXJ0eVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcclxuZnVuY3Rpb24gc2hhbGxvdyhwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSkge1xyXG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHZhciB2YWxpZE9sZFByb3BlcnR5ID0gcHJldmlvdXNQcm9wZXJ0eSAmJiBpc09iamVjdE9yQXJyYXkocHJldmlvdXNQcm9wZXJ0eSk7XHJcbiAgICB2YXIgdmFsaWROZXdQcm9wZXJ0eSA9IG5ld1Byb3BlcnR5ICYmIGlzT2JqZWN0T3JBcnJheShuZXdQcm9wZXJ0eSk7XHJcbiAgICBpZiAoIXZhbGlkT2xkUHJvcGVydHkgfHwgIXZhbGlkTmV3UHJvcGVydHkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjaGFuZ2VkOiB0cnVlLFxyXG4gICAgICAgICAgICB2YWx1ZTogbmV3UHJvcGVydHlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFyIHByZXZpb3VzS2V5cyA9IE9iamVjdC5rZXlzKHByZXZpb3VzUHJvcGVydHkpO1xyXG4gICAgdmFyIG5ld0tleXMgPSBPYmplY3Qua2V5cyhuZXdQcm9wZXJ0eSk7XHJcbiAgICBpZiAocHJldmlvdXNLZXlzLmxlbmd0aCAhPT0gbmV3S2V5cy5sZW5ndGgpIHtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNoYW5nZWQgPSBuZXdLZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3UHJvcGVydHlba2V5XSAhPT0gcHJldmlvdXNQcm9wZXJ0eVtrZXldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFuZ2VkOiBjaGFuZ2VkLFxyXG4gICAgICAgIHZhbHVlOiBuZXdQcm9wZXJ0eVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnNoYWxsb3cgPSBzaGFsbG93O1xyXG5mdW5jdGlvbiBhdXRvKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KSB7XHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgaWYgKHR5cGVvZiBuZXdQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGlmIChuZXdQcm9wZXJ0eS5fdHlwZSA9PT0gUmVnaXN0cnlfMS5XSURHRVRfQkFTRV9UWVBFKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBpZ25vcmUocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzT2JqZWN0T3JBcnJheShuZXdQcm9wZXJ0eSkpIHtcclxuICAgICAgICByZXN1bHQgPSBzaGFsbG93KHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmV4cG9ydHMuYXV0byA9IGF1dG87XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGlmZi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGlmZi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIERlc3Ryb3lhYmxlXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9EZXN0cm95YWJsZVwiKTtcclxudmFyIFNldF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vU2V0XCIpO1xyXG52YXIgQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYXNlKHByb3BlcnRpZXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9yZXF1ZXN0ZWROb2RlS2V5cyA9IG5ldyBTZXRfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgX3RoaXMuX2ludmFsaWRhdGUgPSBwcm9wZXJ0aWVzLmludmFsaWRhdGU7XHJcbiAgICAgICAgX3RoaXMubm9kZUhhbmRsZXIgPSBwcm9wZXJ0aWVzLm5vZGVIYW5kbGVyO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmJpbmQpIHtcclxuICAgICAgICAgICAgX3RoaXMuX2JpbmQgPSBwcm9wZXJ0aWVzLmJpbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEJhc2UucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlSGFuZGxlci5oYXMoa2V5KTtcclxuICAgIH07XHJcbiAgICBCYXNlLnByb3RvdHlwZS5nZXROb2RlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHN0cmluZ0tleSA9IFwiXCIgKyBrZXk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVIYW5kbGVyLmdldChzdHJpbmdLZXkpO1xyXG4gICAgICAgIGlmICghbm9kZSAmJiAhdGhpcy5fcmVxdWVzdGVkTm9kZUtleXMuaGFzKHN0cmluZ0tleSkpIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZV8xID0gdGhpcy5ub2RlSGFuZGxlci5vbihzdHJpbmdLZXksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZV8xLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9yZXF1ZXN0ZWROb2RlS2V5cy5kZWxldGUoc3RyaW5nS2V5KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMub3duKGhhbmRsZV8xKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkTm9kZUtleXMuYWRkKHN0cmluZ0tleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfTtcclxuICAgIEJhc2UucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIEJhc2UucHJvdG90eXBlLmFmdGVyUmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgYnkgZGVmYXVsdC5cclxuICAgIH07XHJcbiAgICByZXR1cm4gQmFzZTtcclxufShEZXN0cm95YWJsZV8xLkRlc3Ryb3lhYmxlKSk7XHJcbmV4cG9ydHMuQmFzZSA9IEJhc2U7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEJhc2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvbWV0YS9CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0Jhc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBCYXNlXzEgPSByZXF1aXJlKFwiLi9CYXNlXCIpO1xyXG52YXIgbGFuZ18xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvbGFuZ1wiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vZ2xvYmFsXCIpO1xyXG52YXIgZGVmYXVsdFJlc3VsdHMgPSB7XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgY29udGFpbnNGb2N1czogZmFsc2VcclxufTtcclxudmFyIEZvY3VzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoRm9jdXMsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGb2N1cygpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fb25Gb2N1c0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuX2FjdGl2ZUVsZW1lbnQgPSBnbG9iYWxfMS5kZWZhdWx0LmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIF90aGlzLmludmFsaWRhdGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEZvY3VzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdldE5vZGUoa2V5KTtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19hc3NpZ24oe30sIGRlZmF1bHRSZXN1bHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBnbG9iYWxfMS5kZWZhdWx0LmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogbm9kZSA9PT0gdGhpcy5fYWN0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgY29udGFpbnNGb2N1czogISF0aGlzLl9hY3RpdmVFbGVtZW50ICYmIG5vZGUuY29udGFpbnModGhpcy5fYWN0aXZlRWxlbWVudClcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEZvY3VzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdldE5vZGUoa2V5KTtcclxuICAgICAgICBub2RlICYmIG5vZGUuZm9jdXMoKTtcclxuICAgIH07XHJcbiAgICBGb2N1cy5wcm90b3R5cGUuX2NyZWF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuX29uRm9jdXNDaGFuZ2UpO1xyXG4gICAgICAgIGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLl9vbkZvY3VzQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLm93bihsYW5nXzEuY3JlYXRlSGFuZGxlKHRoaXMuX3JlbW92ZUxpc3RlbmVyLmJpbmQodGhpcykpKTtcclxuICAgIH07XHJcbiAgICBGb2N1cy5wcm90b3R5cGUuX3JlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuX29uRm9jdXNDaGFuZ2UpO1xyXG4gICAgICAgIGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLl9vbkZvY3VzQ2hhbmdlKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRm9jdXM7XHJcbn0oQmFzZV8xLkJhc2UpKTtcclxuZXhwb3J0cy5Gb2N1cyA9IEZvY3VzO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBGb2N1cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0ZvY3VzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0ZvY3VzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgbGFuZ18xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvbGFuZ1wiKTtcclxudmFyIGNzc1RyYW5zaXRpb25zXzEgPSByZXF1aXJlKFwiLi4vYW5pbWF0aW9ucy9jc3NUcmFuc2l0aW9uc1wiKTtcclxudmFyIGFmdGVyUmVuZGVyXzEgPSByZXF1aXJlKFwiLi8uLi9kZWNvcmF0b3JzL2FmdGVyUmVuZGVyXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIi4vLi4vZFwiKTtcclxudmFyIHZkb21fMSA9IHJlcXVpcmUoXCIuLy4uL3Zkb21cIik7XHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBhdHRhY2ggc3RhdGUgb2YgdGhlIHByb2plY3RvclxyXG4gKi9cclxudmFyIFByb2plY3RvckF0dGFjaFN0YXRlO1xyXG4oZnVuY3Rpb24gKFByb2plY3RvckF0dGFjaFN0YXRlKSB7XHJcbiAgICBQcm9qZWN0b3JBdHRhY2hTdGF0ZVtQcm9qZWN0b3JBdHRhY2hTdGF0ZVtcIkF0dGFjaGVkXCJdID0gMV0gPSBcIkF0dGFjaGVkXCI7XHJcbiAgICBQcm9qZWN0b3JBdHRhY2hTdGF0ZVtQcm9qZWN0b3JBdHRhY2hTdGF0ZVtcIkRldGFjaGVkXCJdID0gMl0gPSBcIkRldGFjaGVkXCI7XHJcbn0pKFByb2plY3RvckF0dGFjaFN0YXRlID0gZXhwb3J0cy5Qcm9qZWN0b3JBdHRhY2hTdGF0ZSB8fCAoZXhwb3J0cy5Qcm9qZWN0b3JBdHRhY2hTdGF0ZSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBdHRhY2ggdHlwZSBmb3IgdGhlIHByb2plY3RvclxyXG4gKi9cclxudmFyIEF0dGFjaFR5cGU7XHJcbihmdW5jdGlvbiAoQXR0YWNoVHlwZSkge1xyXG4gICAgQXR0YWNoVHlwZVtBdHRhY2hUeXBlW1wiQXBwZW5kXCJdID0gMV0gPSBcIkFwcGVuZFwiO1xyXG4gICAgQXR0YWNoVHlwZVtBdHRhY2hUeXBlW1wiTWVyZ2VcIl0gPSAyXSA9IFwiTWVyZ2VcIjtcclxufSkoQXR0YWNoVHlwZSA9IGV4cG9ydHMuQXR0YWNoVHlwZSB8fCAoZXhwb3J0cy5BdHRhY2hUeXBlID0ge30pKTtcclxuZnVuY3Rpb24gUHJvamVjdG9yTWl4aW4oQmFzZSkge1xyXG4gICAgdmFyIFByb2plY3RvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICB0c2xpYl8xLl9fZXh0ZW5kcyhQcm9qZWN0b3IsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gUHJvamVjdG9yKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5hcHBseSh0aGlzLCB0c2xpYl8xLl9fc3ByZWFkKGFyZ3MpKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5fcm9vdCA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgIF90aGlzLl9hc3luYyA9IHRydWU7XHJcbiAgICAgICAgICAgIF90aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgICAgIF90aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25zOiBjc3NUcmFuc2l0aW9uc18xLmRlZmF1bHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgX3RoaXMucm9vdCA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgIF90aGlzLnByb2plY3RvclN0YXRlID0gUHJvamVjdG9yQXR0YWNoU3RhdGUuRGV0YWNoZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAocm9vdCkge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IEF0dGFjaFR5cGUuQXBwZW5kLFxyXG4gICAgICAgICAgICAgICAgcm9vdDogcm9vdFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXR0YWNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChyb290KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogQXR0YWNoVHlwZS5NZXJnZSxcclxuICAgICAgICAgICAgICAgIHJvb3Q6IHJvb3RcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaChvcHRpb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm9qZWN0b3IucHJvdG90eXBlLCBcInJvb3RcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChyb290KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY2hhbmdlIHJvb3QgZWxlbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdCA9IHJvb3Q7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm9qZWN0b3IucHJvdG90eXBlLCBcImFzeW5jXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXN5bmM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGFzeW5jKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY2hhbmdlIGFzeW5jIG1vZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2FzeW5jID0gYXN5bmM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuc2FuZGJveCA9IGZ1bmN0aW9uIChkb2MpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGRvYyA9PT0gdm9pZCAwKSB7IGRvYyA9IGRvY3VtZW50OyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0b3IgYWxyZWFkeSBhdHRhY2hlZCwgY2Fubm90IGNyZWF0ZSBzYW5kYm94Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzUm9vdCA9IHRoaXMucm9vdDtcclxuICAgICAgICAgICAgLyogZnJlZSB1cCB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgZm9yIEdDICovXHJcbiAgICAgICAgICAgIHRoaXMub3duKHtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcm9vdCA9IHByZXZpb3VzUm9vdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaCh7XHJcbiAgICAgICAgICAgICAgICAvKiBEb2N1bWVudEZyYWdtZW50IGlzIG5vdCBhc3NpZ25hYmxlIHRvIEVsZW1lbnQsIGJ1dCBwcm92aWRlcyBldmVyeXRoaW5nIG5lZWRlZCB0byB3b3JrICovXHJcbiAgICAgICAgICAgICAgICByb290OiBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogQXR0YWNoVHlwZS5BcHBlbmRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLnNldENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19zZXRDaGlsZHJlbl9fKGNoaWxkcmVuKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLl9fc2V0UHJvcGVydGllc19fID0gZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgJiYgdGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeSAhPT0gcHJvcGVydGllcy5yZWdpc3RyeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMucmVnaXN0cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzID0gbGFuZ18xLmFzc2lnbih7fSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuX19zZXRDb3JlUHJvcGVydGllc19fLmNhbGwodGhpcywgeyBiaW5kOiB0aGlzLCBiYXNlUmVnaXN0cnk6IHByb3BlcnRpZXMucmVnaXN0cnkgfSk7XHJcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuX19zZXRQcm9wZXJ0aWVzX18uY2FsbCh0aGlzLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUudG9IdG1sID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSAhPT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQgfHwgIXRoaXMuX3Byb2plY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGlzIG5vdCBhdHRhY2hlZCwgY2Fubm90IHJldHVybiBhbiBIVE1MIHN0cmluZyBvZiBwcm9qZWN0aW9uLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0aW9uLmRvbU5vZGUuY2hpbGROb2Rlc1swXS5vdXRlckhUTUw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLmFmdGVyUmVuZGVyID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnIHx8IHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IGRfMS52KCdzcGFuJywge30sIFtyZXN1bHRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLl9hdHRhY2ggPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBfYS50eXBlLCByb290ID0gX2Eucm9vdDtcclxuICAgICAgICAgICAgaWYgKHJvb3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGFjaEhhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaEhhbmRsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3RvclN0YXRlID0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQ7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcHJvamVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJvamVjdG9yU3RhdGUgPSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5EZXRhY2hlZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMub3duKGhhbmRsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaEhhbmRsZSA9IGhhbmRsZTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdGlvbk9wdGlvbnMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucywgeyBzeW5jOiAhdGhpcy5fYXN5bmMgfSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBBdHRhY2hUeXBlLkFwcGVuZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9qZWN0aW9uID0gdmRvbV8xLmRvbS5hcHBlbmQodGhpcy5yb290LCB0aGlzLCB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEF0dGFjaFR5cGUuTWVyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvamVjdGlvbiA9IHZkb21fMS5kb20ubWVyZ2UodGhpcy5yb290LCB0aGlzLCB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaEhhbmRsZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgICAgIGFmdGVyUmVuZGVyXzEuYWZ0ZXJSZW5kZXIoKSxcclxuICAgICAgICAgICAgdHNsaWJfMS5fX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgRnVuY3Rpb24pLFxyXG4gICAgICAgICAgICB0c2xpYl8xLl9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbT2JqZWN0XSksXHJcbiAgICAgICAgICAgIHRzbGliXzEuX19tZXRhZGF0YShcImRlc2lnbjpyZXR1cm50eXBlXCIsIHZvaWQgMClcclxuICAgICAgICBdLCBQcm9qZWN0b3IucHJvdG90eXBlLCBcImFmdGVyUmVuZGVyXCIsIG51bGwpO1xyXG4gICAgICAgIHJldHVybiBQcm9qZWN0b3I7XHJcbiAgICB9KEJhc2UpKTtcclxuICAgIHJldHVybiBQcm9qZWN0b3I7XHJcbn1cclxuZXhwb3J0cy5Qcm9qZWN0b3JNaXhpbiA9IFByb2plY3Rvck1peGluO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0b3JNaXhpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgSW5qZWN0b3JfMSA9IHJlcXVpcmUoXCIuLy4uL0luamVjdG9yXCIpO1xyXG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi8uLi9kZWNvcmF0b3JzL2luamVjdFwiKTtcclxudmFyIGhhbmRsZURlY29yYXRvcl8xID0gcmVxdWlyZShcIi4vLi4vZGVjb3JhdG9ycy9oYW5kbGVEZWNvcmF0b3JcIik7XHJcbnZhciBkaWZmUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLy4uL2RlY29yYXRvcnMvZGlmZlByb3BlcnR5XCIpO1xyXG52YXIgZGlmZl8xID0gcmVxdWlyZShcIi4vLi4vZGlmZlwiKTtcclxudmFyIFRIRU1FX0tFWSA9ICcgX2tleSc7XHJcbmV4cG9ydHMuSU5KRUNURURfVEhFTUVfS0VZID0gU3ltYm9sKCd0aGVtZScpO1xyXG4vKipcclxuICogRGVjb3JhdG9yIGZvciBiYXNlIGNzcyBjbGFzc2VzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aGVtZSh0aGVtZSkge1xyXG4gICAgcmV0dXJuIGhhbmRsZURlY29yYXRvcl8xLmhhbmRsZURlY29yYXRvcihmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdGFyZ2V0LmFkZERlY29yYXRvcignYmFzZVRoZW1lQ2xhc3NlcycsIHRoZW1lKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMudGhlbWUgPSB0aGVtZTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSByZXZlcnNlIGxvb2t1cCBmb3IgdGhlIGNsYXNzZXMgcGFzc2VkIGluIHZpYSB0aGUgYHRoZW1lYCBmdW5jdGlvbi5cclxuICpcclxuICogQHBhcmFtIGNsYXNzZXMgVGhlIGJhc2VDbGFzc2VzIG9iamVjdFxyXG4gKiBAcmVxdWlyZXNcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVRoZW1lQ2xhc3Nlc0xvb2t1cChjbGFzc2VzKSB7XHJcbiAgICByZXR1cm4gY2xhc3Nlcy5yZWR1Y2UoZnVuY3Rpb24gKGN1cnJlbnRDbGFzc05hbWVzLCBiYXNlQ2xhc3MpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhiYXNlQ2xhc3MpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBjdXJyZW50Q2xhc3NOYW1lc1tiYXNlQ2xhc3Nba2V5XV0gPSBrZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDbGFzc05hbWVzO1xyXG4gICAgfSwge30pO1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiB0aGF0IGlzIGdpdmVuIGEgdGhlbWUgYW5kIGFuIG9wdGlvbmFsIHJlZ2lzdHJ5LCB0aGUgdGhlbWVcclxuICogaW5qZWN0b3IgaXMgZGVmaW5lZCBhZ2FpbnN0IHRoZSByZWdpc3RyeSwgcmV0dXJuaW5nIHRoZSB0aGVtZS5cclxuICpcclxuICogQHBhcmFtIHRoZW1lIHRoZSB0aGVtZSB0byBzZXRcclxuICogQHBhcmFtIHRoZW1lUmVnaXN0cnkgcmVnaXN0cnkgdG8gZGVmaW5lIHRoZSB0aGVtZSBpbmplY3RvciBhZ2FpbnN0LiBEZWZhdWx0c1xyXG4gKiB0byB0aGUgZ2xvYmFsIHJlZ2lzdHJ5XHJcbiAqXHJcbiAqIEByZXR1cm5zIHRoZSB0aGVtZSBpbmplY3RvciB1c2VkIHRvIHNldCB0aGUgdGhlbWVcclxuICovXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyVGhlbWVJbmplY3Rvcih0aGVtZSwgdGhlbWVSZWdpc3RyeSkge1xyXG4gICAgdmFyIHRoZW1lSW5qZWN0b3IgPSBuZXcgSW5qZWN0b3JfMS5JbmplY3Rvcih0aGVtZSk7XHJcbiAgICB0aGVtZVJlZ2lzdHJ5LmRlZmluZUluamVjdG9yKGV4cG9ydHMuSU5KRUNURURfVEhFTUVfS0VZLCBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcclxuICAgICAgICB0aGVtZUluamVjdG9yLnNldEludmFsaWRhdG9yKGludmFsaWRhdG9yKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhlbWVJbmplY3Rvci5nZXQoKTsgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoZW1lSW5qZWN0b3I7XHJcbn1cclxuZXhwb3J0cy5yZWdpc3RlclRoZW1lSW5qZWN0b3IgPSByZWdpc3RlclRoZW1lSW5qZWN0b3I7XHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBjbGFzcyBkZWNvcmF0ZWQgd2l0aCB3aXRoIFRoZW1lZCBmdW5jdGlvbmFsaXR5XHJcbiAqL1xyXG5mdW5jdGlvbiBUaGVtZWRNaXhpbihCYXNlKSB7XHJcbiAgICB2YXIgVGhlbWVkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIHRzbGliXzEuX19leHRlbmRzKFRoZW1lZCwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBUaGVtZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmVnaXN0ZXJlZCBiYXNlIHRoZW1lIGtleXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF90aGlzLl9yZWdpc3RlcmVkQmFzZVRoZW1lS2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSW5kaWNhdGVzIGlmIGNsYXNzZXMgbWV0YSBkYXRhIG5lZWQgdG8gYmUgY2FsY3VsYXRlZC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF90aGlzLl9yZWNhbGN1bGF0ZUNsYXNzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogTG9hZGVkIHRoZW1lXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBfdGhpcy5fdGhlbWUgPSB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUaGVtZWQucHJvdG90eXBlLnRoZW1lID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY2FsY3VsYXRlQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVUaGVtZUNsYXNzZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXMubWFwKGZ1bmN0aW9uIChjbGFzc05hbWUpIHsgcmV0dXJuIF90aGlzLl9nZXRUaGVtZUNsYXNzKGNsYXNzTmFtZSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRUaGVtZUNsYXNzKGNsYXNzZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVuY3Rpb24gZmlyZWQgd2hlbiBgdGhlbWVgIG9yIGBleHRyYUNsYXNzZXNgIGFyZSBjaGFuZ2VkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRoZW1lZC5wcm90b3R5cGUub25Qcm9wZXJ0aWVzQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVDbGFzc2VzID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRoZW1lZC5wcm90b3R5cGUuX2dldFRoZW1lQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT09IHVuZGVmaW5lZCB8fCBjbGFzc05hbWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGV4dHJhQ2xhc3NlcyA9IHRoaXMucHJvcGVydGllcy5leHRyYUNsYXNzZXMgfHwge307XHJcbiAgICAgICAgICAgIHZhciB0aGVtZUNsYXNzTmFtZSA9IHRoaXMuX2Jhc2VUaGVtZUNsYXNzZXNSZXZlcnNlTG9va3VwW2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRDbGFzc05hbWVzID0gW107XHJcbiAgICAgICAgICAgIGlmICghdGhlbWVDbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNsYXNzIG5hbWU6ICdcIiArIGNsYXNzTmFtZSArIFwiJyBub3QgZm91bmQgaW4gdGhlbWVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXh0cmFDbGFzc2VzW3RoZW1lQ2xhc3NOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Q2xhc3NOYW1lcy5wdXNoKGV4dHJhQ2xhc3Nlc1t0aGVtZUNsYXNzTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aGVtZVt0aGVtZUNsYXNzTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdENsYXNzTmFtZXMucHVzaCh0aGlzLl90aGVtZVt0aGVtZUNsYXNzTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Q2xhc3NOYW1lcy5wdXNoKHRoaXMuX3JlZ2lzdGVyZWRCYXNlVGhlbWVbdGhlbWVDbGFzc05hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Q2xhc3NOYW1lcy5qb2luKCcgJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaGVtZWQucHJvdG90eXBlLl9yZWNhbGN1bGF0ZVRoZW1lQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLnRoZW1lLCB0aGVtZSA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hO1xyXG4gICAgICAgICAgICB2YXIgYmFzZVRoZW1lcyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdiYXNlVGhlbWVDbGFzc2VzJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVnaXN0ZXJlZEJhc2VUaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZEJhc2VUaGVtZSA9IGJhc2VUaGVtZXMucmVkdWNlKGZ1bmN0aW9uIChmaW5hbEJhc2VUaGVtZSwgYmFzZVRoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gVEhFTUVfS0VZLCBrZXkgPSBiYXNlVGhlbWVbX2FdLCBjbGFzc2VzID0gdHNsaWJfMS5fX3Jlc3QoYmFzZVRoZW1lLCBbdHlwZW9mIF9hID09PSBcInN5bWJvbFwiID8gX2EgOiBfYSArIFwiXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcmVnaXN0ZXJlZEJhc2VUaGVtZUtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fYXNzaWduKHt9LCBmaW5hbEJhc2VUaGVtZSwgY2xhc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXNlVGhlbWVDbGFzc2VzUmV2ZXJzZUxvb2t1cCA9IGNyZWF0ZVRoZW1lQ2xhc3Nlc0xvb2t1cChiYXNlVGhlbWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl90aGVtZSA9IHRoaXMuX3JlZ2lzdGVyZWRCYXNlVGhlbWVLZXlzLnJlZHVjZShmdW5jdGlvbiAoYmFzZVRoZW1lLCB0aGVtZUtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19hc3NpZ24oe30sIGJhc2VUaGVtZSwgdGhlbWVbdGhlbWVLZXldKTtcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZUNsYXNzZXMgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgICAgIGRpZmZQcm9wZXJ0eV8xLmRpZmZQcm9wZXJ0eSgndGhlbWUnLCBkaWZmXzEuc2hhbGxvdyksXHJcbiAgICAgICAgICAgIGRpZmZQcm9wZXJ0eV8xLmRpZmZQcm9wZXJ0eSgnZXh0cmFDbGFzc2VzJywgZGlmZl8xLnNoYWxsb3cpLFxyXG4gICAgICAgICAgICB0c2xpYl8xLl9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBGdW5jdGlvbiksXHJcbiAgICAgICAgICAgIHRzbGliXzEuX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKSxcclxuICAgICAgICAgICAgdHNsaWJfMS5fX21ldGFkYXRhKFwiZGVzaWduOnJldHVybnR5cGVcIiwgdm9pZCAwKVxyXG4gICAgICAgIF0sIFRoZW1lZC5wcm90b3R5cGUsIFwib25Qcm9wZXJ0aWVzQ2hhbmdlZFwiLCBudWxsKTtcclxuICAgICAgICBUaGVtZWQgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgICAgICBpbmplY3RfMS5pbmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogZXhwb3J0cy5JTkpFQ1RFRF9USEVNRV9LRVksXHJcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzOiBmdW5jdGlvbiAodGhlbWUsIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnRpZXMudGhlbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdGhlbWU6IHRoZW1lIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdLCBUaGVtZWQpO1xyXG4gICAgICAgIHJldHVybiBUaGVtZWQ7XHJcbiAgICB9KEJhc2UpKTtcclxuICAgIHJldHVybiBUaGVtZWQ7XHJcbn1cclxuZXhwb3J0cy5UaGVtZWRNaXhpbiA9IFRoZW1lZE1peGluO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBUaGVtZWRNaXhpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIi4vV2lkZ2V0QmFzZVwiKTtcclxudmFyIFByb2plY3Rvcl8xID0gcmVxdWlyZShcIi4vbWl4aW5zL1Byb2plY3RvclwiKTtcclxudmFyIGFycmF5XzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9hcnJheVwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCIuL2RcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL2dsb2JhbFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIi4vbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIGFsd2F5c1JlbmRlcl8xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9ycy9hbHdheXNSZW5kZXJcIik7XHJcbnZhciBDdXN0b21FbGVtZW50Q2hpbGRUeXBlO1xyXG4oZnVuY3Rpb24gKEN1c3RvbUVsZW1lbnRDaGlsZFR5cGUpIHtcclxuICAgIEN1c3RvbUVsZW1lbnRDaGlsZFR5cGVbXCJET0pPXCJdID0gXCJET0pPXCI7XHJcbiAgICBDdXN0b21FbGVtZW50Q2hpbGRUeXBlW1wiTk9ERVwiXSA9IFwiTk9ERVwiO1xyXG4gICAgQ3VzdG9tRWxlbWVudENoaWxkVHlwZVtcIlRFWFRcIl0gPSBcIlRFWFRcIjtcclxufSkoQ3VzdG9tRWxlbWVudENoaWxkVHlwZSA9IGV4cG9ydHMuQ3VzdG9tRWxlbWVudENoaWxkVHlwZSB8fCAoZXhwb3J0cy5DdXN0b21FbGVtZW50Q2hpbGRUeXBlID0ge30pKTtcclxuZnVuY3Rpb24gRG9tVG9XaWRnZXRXcmFwcGVyKGRvbU5vZGUpIHtcclxuICAgIHZhciBEb21Ub1dpZGdldFdyYXBwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgdHNsaWJfMS5fX2V4dGVuZHMoRG9tVG9XaWRnZXRXcmFwcGVyLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIERvbVRvV2lkZ2V0V3JhcHBlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEb21Ub1dpZGdldFdyYXBwZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMpLnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gX3RoaXMucHJvcGVydGllc1trZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdvbicpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJfX1wiICsga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvcHNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEuZG9tKHsgbm9kZTogZG9tTm9kZSwgcHJvcHM6IHByb3BlcnRpZXMsIGRpZmZUeXBlOiAnZG9tJyB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb21Ub1dpZGdldFdyYXBwZXIsIFwiZG9tTm9kZVwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIERvbVRvV2lkZ2V0V3JhcHBlciA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgICAgIGFsd2F5c1JlbmRlcl8xLmFsd2F5c1JlbmRlcigpXHJcbiAgICAgICAgXSwgRG9tVG9XaWRnZXRXcmFwcGVyKTtcclxuICAgICAgICByZXR1cm4gRG9tVG9XaWRnZXRXcmFwcGVyO1xyXG4gICAgfShXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSkpO1xyXG4gICAgcmV0dXJuIERvbVRvV2lkZ2V0V3JhcHBlcjtcclxufVxyXG5leHBvcnRzLkRvbVRvV2lkZ2V0V3JhcHBlciA9IERvbVRvV2lkZ2V0V3JhcHBlcjtcclxuZnVuY3Rpb24gY3JlYXRlKGRlc2NyaXB0b3IsIFdpZGdldENvbnN0cnVjdG9yKSB7XHJcbiAgICB2YXIgYXR0cmlidXRlcyA9IGRlc2NyaXB0b3IuYXR0cmlidXRlcywgY2hpbGRUeXBlID0gZGVzY3JpcHRvci5jaGlsZFR5cGUsIHJlZ2lzdHJ5RmFjdG9yeSA9IGRlc2NyaXB0b3IucmVnaXN0cnlGYWN0b3J5O1xyXG4gICAgdmFyIGF0dHJpYnV0ZU1hcCA9IHt9O1xyXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGF0dHJpYnV0ZU1hcFthdHRyaWJ1dGVOYW1lXSA9IHByb3BlcnR5TmFtZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICB0c2xpYl8xLl9fZXh0ZW5kcyhjbGFzc18xLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5fcHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgICAgICBfdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgX3RoaXMuX2V2ZW50UHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgICAgICBfdGhpcy5faW5pdGlhbGlzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jb25uZWN0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpc2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRvbVByb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBkZXNjcmlwdG9yLmF0dHJpYnV0ZXMsIHByb3BlcnRpZXMgPSBkZXNjcmlwdG9yLnByb3BlcnRpZXMsIGV2ZW50cyA9IGRlc2NyaXB0b3IuZXZlbnRzO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgdGhpcy5fcHJvcGVydGllcywgdGhpcy5fYXR0cmlidXRlc1RvUHJvcGVydGllcyhhdHRyaWJ1dGVzKSk7XHJcbiAgICAgICAgICAgIHRzbGliXzEuX19zcHJlYWQoYXR0cmlidXRlcywgcHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfdGhpc1twcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkUHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoL15vbi8sICdfXycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRQcm9wZXJ0eU5hbWUgIT09IHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbVByb3BlcnRpZXNbZmlsdGVyZWRQcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9nZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuX3NldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvbVByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9nZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5fc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoL15vbi8sICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkUHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lLnJlcGxhY2UoL15vbi8sICdfX29uJyk7XHJcbiAgICAgICAgICAgICAgICBkb21Qcm9wZXJ0aWVzW2ZpbHRlcmVkUHJvcGVydHlOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9nZXRFdmVudFByb3BlcnR5KHByb3BlcnR5TmFtZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLl9zZXRFdmVudFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX2V2ZW50UHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50Q2FsbGJhY2sgPSBfdGhpcy5fZ2V0RXZlbnRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudENhbGxiYWNrLmFwcGx5KHZvaWQgMCwgdHNsaWJfMS5fX3NwcmVhZChhcmdzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiBhcmdzXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIGRvbVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBjaGlsZFR5cGUgPT09IEN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCA/IHRoaXMuY2hpbGROb2RlcyA6IHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGFycmF5XzEuZnJvbShjaGlsZHJlbikuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRUeXBlID09PSBDdXN0b21FbGVtZW50Q2hpbGRUeXBlLkRPSk8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZG9qby1jZS1yZW5kZXInLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fcmVuZGVyKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5hZGRFdmVudExpc3RlbmVyKCdkb2pvLWNlLWNvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9yZW5kZXIoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2NoaWxkcmVuLnB1c2goRG9tVG9XaWRnZXRXcmFwcGVyKGNoaWxkTm9kZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2NoaWxkcmVuLnB1c2goZF8xLmRvbSh7IG5vZGU6IGNoaWxkTm9kZSwgZGlmZlR5cGU6ICdkb20nIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZG9qby1jZS1jb25uZWN0ZWQnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX2NoaWxkQ29ubmVjdGVkKGUpOyB9KTtcclxuICAgICAgICAgICAgdmFyIHdpZGdldFByb3BlcnRpZXMgPSB0aGlzLl9wcm9wZXJ0aWVzO1xyXG4gICAgICAgICAgICB2YXIgcmVuZGVyQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fX2NoaWxkcmVuX18oKTsgfTtcclxuICAgICAgICAgICAgdmFyIFdyYXBwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0c2xpYl8xLl9fZXh0ZW5kcyhjbGFzc18yLCBfc3VwZXIpO1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2xhc3NfMigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbGFzc18yLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRfMS53KFdpZGdldENvbnN0cnVjdG9yLCB3aWRnZXRQcm9wZXJ0aWVzLCByZW5kZXJDaGlsZHJlbigpKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NfMjtcclxuICAgICAgICAgICAgfShXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSkpO1xyXG4gICAgICAgICAgICB2YXIgcmVnaXN0cnkgPSByZWdpc3RyeUZhY3RvcnkoKTtcclxuICAgICAgICAgICAgdmFyIHRoZW1lQ29udGV4dCA9IFRoZW1lZF8xLnJlZ2lzdGVyVGhlbWVJbmplY3Rvcih0aGlzLl9nZXRUaGVtZSgpLCByZWdpc3RyeSk7XHJcbiAgICAgICAgICAgIGdsb2JhbF8xLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcignZG9qby10aGVtZS1zZXQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGVtZUNvbnRleHQuc2V0KF90aGlzLl9nZXRUaGVtZSgpKTsgfSk7XHJcbiAgICAgICAgICAgIHZhciBQcm9qZWN0b3IgPSBQcm9qZWN0b3JfMS5Qcm9qZWN0b3JNaXhpbihXcmFwcGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdG9yID0gbmV3IFByb2plY3RvcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3Iuc2V0UHJvcGVydGllcyh7IHJlZ2lzdHJ5OiByZWdpc3RyeSB9KTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdG9yLmFwcGVuZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGlzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdkb2pvLWNlLWNvbm5lY3RlZCcsIHtcclxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHRoaXNcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX2dldFRoZW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsXzEuZGVmYXVsdCAmJiBnbG9iYWxfMS5kZWZhdWx0LmRvam9jZSAmJiBnbG9iYWxfMS5kZWZhdWx0LmRvam9jZS50aGVtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbF8xLmRlZmF1bHQuZG9qb2NlLnRoZW1lc1tnbG9iYWxfMS5kZWZhdWx0LmRvam9jZS50aGVtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9jaGlsZENvbm5lY3RlZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gZS5kZXRhaWw7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudE5vZGUgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleGlzdHMgPSB0aGlzLl9jaGlsZHJlbi5zb21lKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gY2hpbGQuZG9tTm9kZSA9PT0gbm9kZTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZG9qby1jZS1yZW5kZXInLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fcmVuZGVyKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goRG9tVG9XaWRnZXRXcmFwcGVyKG5vZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2plY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvamVjdG9yLmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Rvam8tY2UtcmVuZGVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogdGhpc1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fX3Byb3BlcnRpZXNfXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19hc3NpZ24oe30sIHRoaXMuX3Byb3BlcnRpZXMsIHRoaXMuX2V2ZW50UHJvcGVydGllcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fX2NoaWxkcmVuX18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZFR5cGUgPT09IEN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuRE9KTykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoQ2hpbGQpIHsgcmV0dXJuIENoaWxkLmRvbU5vZGUuaXNXaWRnZXQ7IH0pLm1hcChmdW5jdGlvbiAoQ2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9tTm9kZSA9IENoaWxkLmRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRfMS53KENoaWxkLCB0c2xpYl8xLl9fYXNzaWduKHt9LCBkb21Ob2RlLl9fcHJvcGVydGllc19fKCkpLCB0c2xpYl8xLl9fc3ByZWFkKGRvbU5vZGUuX19jaGlsZHJlbl9fKCkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgb2xkVmFsdWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVNYXBbbmFtZV07XHJcbiAgICAgICAgICAgIHRoaXMuX3NldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX3NldEV2ZW50UHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudFByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX2dldEV2ZW50UHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudFByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9zZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlW1dpZGdldEJhc2VfMS5ub0JpbmRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fZ2V0UHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fYXR0cmlidXRlc1RvUHJvcGVydGllcyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzLnJlZHVjZShmdW5jdGlvbiAocHJvcGVydGllcywgcHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IHByb3BlcnR5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gX3RoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEsIFwib2JzZXJ2ZWRBdHRyaWJ1dGVzXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYXR0cmlidXRlTWFwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcImlzV2lkZ2V0XCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KEhUTUxFbGVtZW50KSk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyKFdpZGdldENvbnN0cnVjdG9yKSB7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IFdpZGdldENvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBXaWRnZXRDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19jdXN0b21FbGVtZW50RGVzY3JpcHRvcjtcclxuICAgIGlmICghZGVzY3JpcHRvcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGdldCBkZXNjcmlwdG9yIGZvciBDdXN0b20gRWxlbWVudCwgaGF2ZSB5b3UgYWRkZWQgdGhlIEBjdXN0b21FbGVtZW50IGRlY29yYXRvciB0byB5b3VyIFdpZGdldD8nKTtcclxuICAgIH1cclxuICAgIGdsb2JhbF8xLmRlZmF1bHQuY3VzdG9tRWxlbWVudHMuZGVmaW5lKGRlc2NyaXB0b3IudGFnTmFtZSwgY3JlYXRlKGRlc2NyaXB0b3IsIFdpZGdldENvbnN0cnVjdG9yKSk7XHJcbn1cclxuZXhwb3J0cy5yZWdpc3RlciA9IHJlZ2lzdGVyO1xyXG5leHBvcnRzLmRlZmF1bHQgPSByZWdpc3RlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vZ2xvYmFsXCIpO1xyXG52YXIgYXJyYXlfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL2FycmF5XCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIi4vZFwiKTtcclxudmFyIFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxudmFyIFdlYWtNYXBfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL1dlYWtNYXBcIik7XHJcbnZhciBOQU1FU1BBQ0VfVzMgPSAnaHR0cDovL3d3dy53My5vcmcvJztcclxudmFyIE5BTUVTUEFDRV9TVkcgPSBOQU1FU1BBQ0VfVzMgKyAnMjAwMC9zdmcnO1xyXG52YXIgTkFNRVNQQUNFX1hMSU5LID0gTkFNRVNQQUNFX1czICsgJzE5OTkveGxpbmsnO1xyXG52YXIgZW1wdHlBcnJheSA9IFtdO1xyXG52YXIgbm9kZU9wZXJhdGlvbnMgPSBbJ2ZvY3VzJywgJ2JsdXInLCAnc2Nyb2xsSW50b1ZpZXcnLCAnY2xpY2snXTtcclxuZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcCA9IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpO1xyXG52YXIgaW5zdGFuY2VNYXAgPSBuZXcgV2Vha01hcF8xLmRlZmF1bHQoKTtcclxudmFyIG5leHRTaWJsaW5nTWFwID0gbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbnZhciBwcm9qZWN0b3JTdGF0ZU1hcCA9IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpO1xyXG5mdW5jdGlvbiBzYW1lKGRub2RlMSwgZG5vZGUyKSB7XHJcbiAgICBpZiAoZF8xLmlzVk5vZGUoZG5vZGUxKSAmJiBkXzEuaXNWTm9kZShkbm9kZTIpKSB7XHJcbiAgICAgICAgaWYgKGRfMS5pc0RvbVZOb2RlKGRub2RlMSkgfHwgZF8xLmlzRG9tVk5vZGUoZG5vZGUyKSkge1xyXG4gICAgICAgICAgICBpZiAoZG5vZGUxLmRvbU5vZGUgIT09IGRub2RlMi5kb21Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRub2RlMS50YWcgIT09IGRub2RlMi50YWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG5vZGUxLnByb3BlcnRpZXMua2V5ICE9PSBkbm9kZTIucHJvcGVydGllcy5rZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRfMS5pc1dOb2RlKGRub2RlMSkgJiYgZF8xLmlzV05vZGUoZG5vZGUyKSkge1xyXG4gICAgICAgIGlmIChkbm9kZTEuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZG5vZGUyLndpZGdldENvbnN0cnVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkbm9kZTEud2lkZ2V0Q29uc3RydWN0b3IgIT09IGRub2RlMi53aWRnZXRDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkbm9kZTEucHJvcGVydGllcy5rZXkgIT09IGRub2RlMi5wcm9wZXJ0aWVzLmtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbnZhciBtaXNzaW5nVHJhbnNpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZSBhIHRyYW5zaXRpb25zIG9iamVjdCB0byB0aGUgcHJvamVjdGlvbk9wdGlvbnMgdG8gZG8gYW5pbWF0aW9ucycpO1xyXG59O1xyXG5mdW5jdGlvbiBnZXRQcm9qZWN0aW9uT3B0aW9ucyhwcm9qZWN0b3JPcHRpb25zLCBwcm9qZWN0b3JJbnN0YW5jZSkge1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICAgIG5hbWVzcGFjZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIHN0eWxlQXBwbHllcjogZnVuY3Rpb24gKGRvbU5vZGUsIHN0eWxlTmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgZG9tTm9kZS5zdHlsZVtzdHlsZU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmFuc2l0aW9uczoge1xyXG4gICAgICAgICAgICBlbnRlcjogbWlzc2luZ1RyYW5zaXRpb24sXHJcbiAgICAgICAgICAgIGV4aXQ6IG1pc3NpbmdUcmFuc2l0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXB0aDogMCxcclxuICAgICAgICBtZXJnZTogZmFsc2UsXHJcbiAgICAgICAgc3luYzogZmFsc2UsXHJcbiAgICAgICAgcHJvamVjdG9ySW5zdGFuY2U6IHByb2plY3Rvckluc3RhbmNlXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRzbGliXzEuX19hc3NpZ24oe30sIGRlZmF1bHRzLCBwcm9qZWN0b3JPcHRpb25zKTtcclxufVxyXG5mdW5jdGlvbiBjaGVja1N0eWxlVmFsdWUoc3R5bGVWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBzdHlsZVZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3R5bGUgdmFsdWVzIG11c3QgYmUgc3RyaW5ncycpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50KGRvbU5vZGUsIGV2ZW50TmFtZSwgY3VycmVudFZhbHVlLCBwcm9qZWN0aW9uT3B0aW9ucywgYmluZCwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIHZhciBldmVudE1hcCA9IHByb2plY3RvclN0YXRlLm5vZGVNYXAuZ2V0KGRvbU5vZGUpIHx8IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICB2YXIgcHJldmlvdXNFdmVudCA9IGV2ZW50TWFwLmdldChwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICBkb21Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcmV2aW91c0V2ZW50KTtcclxuICAgIH1cclxuICAgIHZhciBjYWxsYmFjayA9IGN1cnJlbnRWYWx1ZS5iaW5kKGJpbmQpO1xyXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gJ2lucHV0Jykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUuY2FsbCh0aGlzLCBldnQpO1xyXG4gICAgICAgICAgICBldnQudGFyZ2V0WydvbmlucHV0LXZhbHVlJ10gPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH0uYmluZChiaW5kKTtcclxuICAgIH1cclxuICAgIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcclxuICAgIGV2ZW50TWFwLnNldChjdXJyZW50VmFsdWUsIGNhbGxiYWNrKTtcclxuICAgIHByb2plY3RvclN0YXRlLm5vZGVNYXAuc2V0KGRvbU5vZGUsIGV2ZW50TWFwKTtcclxufVxyXG5mdW5jdGlvbiBhZGRDbGFzc2VzKGRvbU5vZGUsIGNsYXNzZXMpIHtcclxuICAgIGlmIChjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZXMgPSBjbGFzc2VzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRvbU5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBjbGFzc2VzKSB7XHJcbiAgICBpZiAoY2xhc3Nlcykge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWVzID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkb21Ob2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGJ1aWxkUHJldmlvdXNQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgZGlmZlR5cGUgPSBjdXJyZW50LmRpZmZUeXBlLCBwcm9wZXJ0aWVzID0gY3VycmVudC5wcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzID0gY3VycmVudC5hdHRyaWJ1dGVzO1xyXG4gICAgaWYgKCFkaWZmVHlwZSB8fCBkaWZmVHlwZSA9PT0gJ3Zkb20nKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgcHJvcGVydGllczogcHJldmlvdXMucHJvcGVydGllcywgYXR0cmlidXRlczogcHJldmlvdXMuYXR0cmlidXRlcywgZXZlbnRzOiBwcmV2aW91cy5ldmVudHMgfTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRpZmZUeXBlID09PSAnbm9uZScpIHtcclxuICAgICAgICByZXR1cm4geyBwcm9wZXJ0aWVzOiB7fSwgYXR0cmlidXRlczogcHJldmlvdXMuYXR0cmlidXRlcyA/IHt9IDogdW5kZWZpbmVkLCBldmVudHM6IHByZXZpb3VzLmV2ZW50cyB9O1xyXG4gICAgfVxyXG4gICAgdmFyIG5ld1Byb3BlcnRpZXMgPSB7XHJcbiAgICAgICAgcHJvcGVydGllczoge31cclxuICAgIH07XHJcbiAgICBpZiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgIG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlcyA9IHt9O1xyXG4gICAgICAgIG5ld1Byb3BlcnRpZXMuZXZlbnRzID0gcHJldmlvdXMuZXZlbnRzO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7XHJcbiAgICAgICAgICAgIG5ld1Byb3BlcnRpZXMucHJvcGVydGllc1twcm9wTmFtZV0gPSBkb21Ob2RlW3Byb3BOYW1lXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyTmFtZSkge1xyXG4gICAgICAgICAgICBuZXdQcm9wZXJ0aWVzLmF0dHJpYnV0ZXNbYXR0ck5hbWVdID0gZG9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdQcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG4gICAgbmV3UHJvcGVydGllcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcykucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcGVydHkpIHtcclxuICAgICAgICBwcm9wc1twcm9wZXJ0eV0gPSBkb21Ob2RlLmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgZG9tTm9kZVtwcm9wZXJ0eV07XHJcbiAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfSwge30pO1xyXG4gICAgcmV0dXJuIG5ld1Byb3BlcnRpZXM7XHJcbn1cclxuZnVuY3Rpb24gbm9kZU9wZXJhdGlvbihwcm9wTmFtZSwgcHJvcFZhbHVlLCBwcmV2aW91c1ZhbHVlLCBkb21Ob2RlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIHJlc3VsdDtcclxuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gcHJvcFZhbHVlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSBwcm9wVmFsdWUgJiYgIXByZXZpb3VzVmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgICAgICBwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9tTm9kZVtwcm9wTmFtZV0oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMsIHByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zLCBvbmx5RXZlbnRzKSB7XHJcbiAgICBpZiAob25seUV2ZW50cyA9PT0gdm9pZCAwKSB7IG9ubHlFdmVudHMgPSBmYWxzZTsgfVxyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIHZhciBldmVudE1hcCA9IHByb2plY3RvclN0YXRlLm5vZGVNYXAuZ2V0KGRvbU5vZGUpO1xyXG4gICAgaWYgKGV2ZW50TWFwKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMocHJldmlvdXNQcm9wZXJ0aWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgaXNFdmVudCA9IHByb3BOYW1lLnN1YnN0cigwLCAyKSA9PT0gJ29uJyB8fCBvbmx5RXZlbnRzO1xyXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gb25seUV2ZW50cyA/IHByb3BOYW1lIDogcHJvcE5hbWUuc3Vic3RyKDIpO1xyXG4gICAgICAgICAgICBpZiAoaXNFdmVudCAmJiAhcHJvcGVydGllc1twcm9wTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudENhbGxiYWNrID0gZXZlbnRNYXAuZ2V0KHByZXZpb3VzUHJvcGVydGllc1twcm9wTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudENhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZShkb21Ob2RlLCBhdHRyTmFtZSwgYXR0clZhbHVlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgaWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSA9PT0gTkFNRVNQQUNFX1NWRyAmJiBhdHRyTmFtZSA9PT0gJ2hyZWYnKSB7XHJcbiAgICAgICAgZG9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhOQU1FU1BBQ0VfWExJTkssIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKGF0dHJOYW1lID09PSAncm9sZScgJiYgYXR0clZhbHVlID09PSAnJykgfHwgYXR0clZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBkb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGUsIHByZXZpb3VzQXR0cmlidXRlcywgYXR0cmlidXRlcywgcHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIHZhciBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcclxuICAgIHZhciBhdHRyQ291bnQgPSBhdHRyTmFtZXMubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyQ291bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHJOYW1lc1tpXTtcclxuICAgICAgICB2YXIgYXR0clZhbHVlID0gYXR0cmlidXRlc1thdHRyTmFtZV07XHJcbiAgICAgICAgdmFyIHByZXZpb3VzQXR0clZhbHVlID0gcHJldmlvdXNBdHRyaWJ1dGVzW2F0dHJOYW1lXTtcclxuICAgICAgICBpZiAoYXR0clZhbHVlICE9PSBwcmV2aW91c0F0dHJWYWx1ZSkge1xyXG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcykge1xyXG4gICAgaWYgKGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyA9PT0gdm9pZCAwKSB7IGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyA9IHRydWU7IH1cclxuICAgIHZhciBwcm9wZXJ0aWVzVXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xyXG4gICAgdmFyIHByb3BDb3VudCA9IHByb3BOYW1lcy5sZW5ndGg7XHJcbiAgICBpZiAocHJvcE5hbWVzLmluZGV4T2YoJ2NsYXNzZXMnKSA9PT0gLTEgJiYgcHJldmlvdXNQcm9wZXJ0aWVzLmNsYXNzZXMpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3NlcykpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZG9tTm9kZSwgcHJldmlvdXNQcm9wZXJ0aWVzLmNsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyAmJiByZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMsIHByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcENvdW50OyBpKyspIHtcclxuICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wTmFtZXNbaV07XHJcbiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xyXG4gICAgICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNQcm9wZXJ0aWVzW3Byb3BOYW1lXTtcclxuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdjbGFzc2VzJykge1xyXG4gICAgICAgICAgICB2YXIgcHJldmlvdXNDbGFzc2VzID0gQXJyYXkuaXNBcnJheShwcmV2aW91c1ZhbHVlKSA/IHByZXZpb3VzVmFsdWUgOiBbcHJldmlvdXNWYWx1ZV07XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2xhc3NlcyA9IEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSA/IHByb3BWYWx1ZSA6IFtwcm9wVmFsdWVdO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNDbGFzc2VzICYmIHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BWYWx1ZSB8fCBwcm9wVmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgcHJldmlvdXNDbGFzc2VzLmxlbmd0aDsgaV8xKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c0NsYXNzZXNbaV8xXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NsYXNzZXMgPSB0c2xpYl8xLl9fc3ByZWFkKGN1cnJlbnRDbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzIgPSAwOyBpXzIgPCBwcmV2aW91c0NsYXNzZXMubGVuZ3RoOyBpXzIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNDbGFzc05hbWUgPSBwcmV2aW91c0NsYXNzZXNbaV8yXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NJbmRleCA9IG5ld0NsYXNzZXMuaW5kZXhPZihwcmV2aW91c0NsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzZXMuc3BsaWNlKGNsYXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMyA9IDA7IGlfMyA8IG5ld0NsYXNzZXMubGVuZ3RoOyBpXzMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKGRvbU5vZGUsIG5ld0NsYXNzZXNbaV8zXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaV80ID0gMDsgaV80IDwgY3VycmVudENsYXNzZXMubGVuZ3RoOyBpXzQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoZG9tTm9kZSwgY3VycmVudENsYXNzZXNbaV80XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobm9kZU9wZXJhdGlvbnMuaW5kZXhPZihwcm9wTmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5vZGVPcGVyYXRpb24ocHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXNWYWx1ZSwgZG9tTm9kZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ3N0eWxlcycpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlTmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wVmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgc3R5bGVDb3VudCA9IHN0eWxlTmFtZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0eWxlQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlTmFtZSA9IHN0eWxlTmFtZXNbal07XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3R5bGVWYWx1ZSA9IHByb3BWYWx1ZVtzdHlsZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZFN0eWxlVmFsdWUgPSBwcmV2aW91c1ZhbHVlICYmIHByZXZpb3VzVmFsdWVbc3R5bGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdTdHlsZVZhbHVlID09PSBvbGRTdHlsZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3U3R5bGVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU3R5bGVWYWx1ZShuZXdTdHlsZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uT3B0aW9ucy5zdHlsZUFwcGx5ZXIoZG9tTm9kZSwgc3R5bGVOYW1lLCBuZXdTdHlsZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb25PcHRpb25zLnN0eWxlQXBwbHllcihkb21Ob2RlLCBzdHlsZU5hbWUsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFwcm9wVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcE5hbWUgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb21WYWx1ZSA9IGRvbU5vZGVbcHJvcE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbVZhbHVlICE9PSBwcm9wVmFsdWUgJiZcclxuICAgICAgICAgICAgICAgICAgICAoZG9tTm9kZVsnb25pbnB1dC12YWx1ZSddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZG9tVmFsdWUgPT09IGRvbU5vZGVbJ29uaW5wdXQtdmFsdWUnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlWydvbmlucHV0LXZhbHVlJ10gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BOYW1lICE9PSAna2V5JyAmJiBwcm9wVmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nICYmIHByb3BOYW1lLmxhc3RJbmRleE9mKCdvbicsIDApID09PSAwICYmIGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUV2ZW50KGRvbU5vZGUsIHByb3BOYW1lLnN1YnN0cigyKSwgcHJvcFZhbHVlLCBwcm9qZWN0aW9uT3B0aW9ucywgcHJvcGVydGllcy5iaW5kLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHByb3BOYW1lICE9PSAnaW5uZXJIVE1MJyAmJiBpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvcE5hbWUgPT09ICdzY3JvbGxMZWZ0JyB8fCBwcm9wTmFtZSA9PT0gJ3Njcm9sbFRvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tTm9kZVtwcm9wTmFtZV0gIT09IHByb3BWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzVXBkYXRlZDtcclxufVxyXG5mdW5jdGlvbiBmaW5kSW5kZXhPZkNoaWxkKGNoaWxkcmVuLCBzYW1lQXMsIHN0YXJ0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzYW1lKGNoaWxkcmVuW2ldLCBzYW1lQXMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5mdW5jdGlvbiB0b1BhcmVudFZOb2RlKGRvbU5vZGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnJyxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7fSxcclxuICAgICAgICBjaGlsZHJlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgIGRvbU5vZGU6IGRvbU5vZGUsXHJcbiAgICAgICAgdHlwZTogZF8xLlZOT0RFXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMudG9QYXJlbnRWTm9kZSA9IHRvUGFyZW50Vk5vZGU7XHJcbmZ1bmN0aW9uIHRvVGV4dFZOb2RlKGRhdGEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnJyxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7fSxcclxuICAgICAgICBjaGlsZHJlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgIHRleHQ6IFwiXCIgKyBkYXRhLFxyXG4gICAgICAgIGRvbU5vZGU6IHVuZGVmaW5lZCxcclxuICAgICAgICB0eXBlOiBkXzEuVk5PREVcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy50b1RleHRWTm9kZSA9IHRvVGV4dFZOb2RlO1xyXG5mdW5jdGlvbiB0b0ludGVybmFsV05vZGUoaW5zdGFuY2UsIGluc3RhbmNlRGF0YSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXHJcbiAgICAgICAgcmVuZGVyZWQ6IFtdLFxyXG4gICAgICAgIGNvcmVQcm9wZXJ0aWVzOiBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMsXHJcbiAgICAgICAgY2hpbGRyZW46IGluc3RhbmNlLmNoaWxkcmVuLFxyXG4gICAgICAgIHdpZGdldENvbnN0cnVjdG9yOiBpbnN0YW5jZS5jb25zdHJ1Y3RvcixcclxuICAgICAgICBwcm9wZXJ0aWVzOiBpbnN0YW5jZURhdGEuaW5wdXRQcm9wZXJ0aWVzLFxyXG4gICAgICAgIHR5cGU6IGRfMS5XTk9ERVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkcmVuLCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlBcnJheTtcclxuICAgIH1cclxuICAgIGNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbiA6IFtjaGlsZHJlbl07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCB8fCBjaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdG9UZXh0Vk5vZGUoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRfMS5pc1ZOb2RlKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnByb3BlcnRpZXMuYmluZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucHJvcGVydGllcy5iaW5kID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihjaGlsZC5jaGlsZHJlbiwgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2hpbGQuY29yZVByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmNvcmVQcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kOiBpbnN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVJlZ2lzdHJ5OiBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmFzZVJlZ2lzdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihjaGlsZC5jaGlsZHJlbiwgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxufVxyXG5leHBvcnRzLmZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4gPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuO1xyXG5mdW5jdGlvbiBub2RlQWRkZWQoZG5vZGUsIHRyYW5zaXRpb25zKSB7XHJcbiAgICBpZiAoZF8xLmlzVk5vZGUoZG5vZGUpICYmIGRub2RlLnByb3BlcnRpZXMpIHtcclxuICAgICAgICB2YXIgZW50ZXJBbmltYXRpb24gPSBkbm9kZS5wcm9wZXJ0aWVzLmVudGVyQW5pbWF0aW9uO1xyXG4gICAgICAgIGlmIChlbnRlckFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVudGVyQW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRlckFuaW1hdGlvbihkbm9kZS5kb21Ob2RlLCBkbm9kZS5wcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25zLmVudGVyKGRub2RlLmRvbU5vZGUsIGRub2RlLnByb3BlcnRpZXMsIGVudGVyQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBub2RlVG9SZW1vdmUoZG5vZGUsIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgaWYgKGRfMS5pc1dOb2RlKGRub2RlKSkge1xyXG4gICAgICAgIHZhciBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KGRub2RlLmluc3RhbmNlKTtcclxuICAgICAgICB2YXIgcmVuZGVyZWQgPSAoaXRlbSA/IGl0ZW0uZG5vZGUucmVuZGVyZWQgOiBkbm9kZS5yZW5kZXJlZCkgfHwgZW1wdHlBcnJheTtcclxuICAgICAgICBpZiAoZG5vZGUuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IGV4cG9ydHMud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGRub2RlLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2VEYXRhLm9uRGV0YWNoKCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlTWFwLmRlbGV0ZShkbm9kZS5pbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZVRvUmVtb3ZlKHJlbmRlcmVkW2ldLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkb21Ob2RlXzEgPSBkbm9kZS5kb21Ob2RlO1xyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gZG5vZGUucHJvcGVydGllcztcclxuICAgICAgICBpZiAoZG5vZGUuY2hpbGRyZW4gJiYgZG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlVG9SZW1vdmUoZG5vZGUuY2hpbGRyZW5baV0sIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGV4aXRBbmltYXRpb24gPSBwcm9wZXJ0aWVzLmV4aXRBbmltYXRpb247XHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMgJiYgZXhpdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBkb21Ob2RlXzEuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgICAgICAgICAgdmFyIHJlbW92ZURvbU5vZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb21Ob2RlXzEgJiYgZG9tTm9kZV8xLnBhcmVudE5vZGUgJiYgZG9tTm9kZV8xLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tTm9kZV8xKTtcclxuICAgICAgICAgICAgICAgIGRub2RlLmRvbU5vZGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhpdEFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgZXhpdEFuaW1hdGlvbihkb21Ob2RlXzEsIHJlbW92ZURvbU5vZGUsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbnMuZXhpdChkbm9kZS5kb21Ob2RlLCBwcm9wZXJ0aWVzLCBleGl0QW5pbWF0aW9uLCByZW1vdmVEb21Ob2RlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb21Ob2RlXzEgJiYgZG9tTm9kZV8xLnBhcmVudE5vZGUgJiYgZG9tTm9kZV8xLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tTm9kZV8xKTtcclxuICAgICAgICBkbm9kZS5kb21Ob2RlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrRGlzdGluZ3Vpc2hhYmxlKGNoaWxkTm9kZXMsIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpIHtcclxuICAgIHZhciBjaGlsZE5vZGUgPSBjaGlsZE5vZGVzW2luZGV4VG9DaGVja107XHJcbiAgICBpZiAoZF8xLmlzVk5vZGUoY2hpbGROb2RlKSAmJiAhY2hpbGROb2RlLnRhZykge1xyXG4gICAgICAgIHJldHVybjsgLy8gVGV4dCBub2RlcyBuZWVkIG5vdCBiZSBkaXN0aW5ndWlzaGFibGVcclxuICAgIH1cclxuICAgIHZhciBrZXkgPSBjaGlsZE5vZGUucHJvcGVydGllcy5rZXk7XHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpICE9PSBpbmRleFRvQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2hpbGROb2Rlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChzYW1lKG5vZGUsIGNoaWxkTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZUlkZW50aWZpZXIgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE5hbWUgPSBwYXJlbnRJbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lIHx8ICd1bmtub3duJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZF8xLmlzV05vZGUoY2hpbGROb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlSWRlbnRpZmllciA9IGNoaWxkTm9kZS53aWRnZXRDb25zdHJ1Y3Rvci5uYW1lIHx8ICd1bmtub3duJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJZGVudGlmaWVyID0gY2hpbGROb2RlLnRhZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQSB3aWRnZXQgKFwiICsgcGFyZW50TmFtZSArIFwiKSBoYXMgaGFkIGEgY2hpbGQgYWRkZGVkIG9yIHJlbW92ZWQsIGJ1dCB0aGV5IHdlcmUgbm90IGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZmllZC4gSXQgaXMgcmVjb21tZW5kZWQgdG8gcHJvdmlkZSBhIHVuaXF1ZSAna2V5JyBwcm9wZXJ0eSB3aGVuIHVzaW5nIHRoZSBzYW1lIHdpZGdldCBvciBlbGVtZW50IChcIiArIG5vZGVJZGVudGlmaWVyICsgXCIpIG11bHRpcGxlIHRpbWVzIGFzIHNpYmxpbmdzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudFZOb2RlLCBzaWJsaW5ncywgb2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIG9sZENoaWxkcmVuID0gb2xkQ2hpbGRyZW4gfHwgZW1wdHlBcnJheTtcclxuICAgIG5ld0NoaWxkcmVuID0gbmV3Q2hpbGRyZW47XHJcbiAgICB2YXIgb2xkQ2hpbGRyZW5MZW5ndGggPSBvbGRDaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB2YXIgbmV3Q2hpbGRyZW5MZW5ndGggPSBuZXdDaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBwcm9qZWN0aW9uT3B0aW9ucy50cmFuc2l0aW9ucztcclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICBwcm9qZWN0aW9uT3B0aW9ucyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb2plY3Rpb25PcHRpb25zLCB7IGRlcHRoOiBwcm9qZWN0aW9uT3B0aW9ucy5kZXB0aCArIDEgfSk7XHJcbiAgICB2YXIgb2xkSW5kZXggPSAwO1xyXG4gICAgdmFyIG5ld0luZGV4ID0gMDtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIHRleHRVcGRhdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgb2xkQ2hpbGQgPSBvbGRJbmRleCA8IG9sZENoaWxkcmVuTGVuZ3RoID8gb2xkQ2hpbGRyZW5bb2xkSW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW25ld0luZGV4XTtcclxuICAgICAgICBpZiAoZF8xLmlzVk5vZGUobmV3Q2hpbGQpICYmIHR5cGVvZiBuZXdDaGlsZC5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBuZXdDaGlsZC5pbnNlcnRlZCA9IGRfMS5pc1ZOb2RlKG9sZENoaWxkKSAmJiBvbGRDaGlsZC5pbnNlcnRlZDtcclxuICAgICAgICAgICAgYWRkRGVmZXJyZWRQcm9wZXJ0aWVzKG5ld0NoaWxkLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbGRDaGlsZCAhPT0gdW5kZWZpbmVkICYmIHNhbWUob2xkQ2hpbGQsIG5ld0NoaWxkKSkge1xyXG4gICAgICAgICAgICBvbGRJbmRleCsrO1xyXG4gICAgICAgICAgICBuZXdJbmRleCsrO1xyXG4gICAgICAgICAgICB0ZXh0VXBkYXRlZCA9XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVEb20ob2xkQ2hpbGQsIG5ld0NoaWxkLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50Vk5vZGUsIHBhcmVudEluc3RhbmNlLCBvbGRDaGlsZHJlbi5zbGljZShvbGRJbmRleCksIG5ld0NoaWxkcmVuLnNsaWNlKG5ld0luZGV4KSkgfHwgdGV4dFVwZGF0ZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmaW5kT2xkSW5kZXggPSBmaW5kSW5kZXhPZkNoaWxkKG9sZENoaWxkcmVuLCBuZXdDaGlsZCwgb2xkSW5kZXggKyAxKTtcclxuICAgICAgICB2YXIgYWRkQ2hpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnNlcnRCZWZvcmVEb21Ob2RlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5BcnJheSA9IG9sZENoaWxkcmVuO1xyXG4gICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gb2xkSW5kZXggKyAxO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBvbGRDaGlsZHJlbltvbGRJbmRleF07XHJcbiAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkID0gc2libGluZ3NbMF07XHJcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5BcnJheSA9IHNpYmxpbmdzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc2VydEJlZm9yZUNoaWxkcmVuID0gW2NoaWxkXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpbnNlcnRCZWZvcmVDaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0QmVmb3JlID0gaW5zZXJ0QmVmb3JlQ2hpbGRyZW4uc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZF8xLmlzV05vZGUoaW5zZXJ0QmVmb3JlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGluc3RhbmNlTWFwLmdldChpbnNlcnRCZWZvcmUuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmRub2RlLnJlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCZWZvcmVDaGlsZHJlbi5wdXNoLmFwcGx5KGluc2VydEJlZm9yZUNoaWxkcmVuLCB0c2xpYl8xLl9fc3ByZWFkKGl0ZW0uZG5vZGUucmVuZGVyZWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc2VydEJlZm9yZS5kb21Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0QmVmb3JlLmRvbU5vZGUucGFyZW50RWxlbWVudCAhPT0gcGFyZW50Vk5vZGUuZG9tTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0QmVmb3JlRG9tTm9kZSA9IGluc2VydEJlZm9yZS5kb21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiBjaGlsZHJlbkFycmF5W25leHRJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0QmVmb3JlQ2hpbGRyZW4ucHVzaChjaGlsZHJlbkFycmF5W25leHRJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3JlYXRlRG9tKG5ld0NoaWxkLCBwYXJlbnRWTm9kZSwgbmV3Q2hpbGRyZW4uc2xpY2UobmV3SW5kZXggKyAxKSwgaW5zZXJ0QmVmb3JlRG9tTm9kZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICAgICAgbm9kZUFkZGVkKG5ld0NoaWxkLCB0cmFuc2l0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleFRvQ2hlY2sgPSBuZXdJbmRleDtcclxuICAgICAgICAgICAgcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Rpc3Rpbmd1aXNoYWJsZShuZXdDaGlsZHJlbiwgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFvbGRDaGlsZCB8fCBmaW5kT2xkSW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGFkZENoaWxkKCk7XHJcbiAgICAgICAgICAgIG5ld0luZGV4Kys7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW1vdmVDaGlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4VG9DaGVjayA9IG9sZEluZGV4O1xyXG4gICAgICAgICAgICBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlzdGluZ3Vpc2hhYmxlKG9sZENoaWxkcmVuLCBpbmRleFRvQ2hlY2ssIHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChkXzEuaXNXTm9kZShvbGRDaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KG9sZENoaWxkLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkQ2hpbGQgPSBpdGVtLmRub2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGVUb1JlbW92ZShvbGRDaGlsZCwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBmaW5kTmV3SW5kZXggPSBmaW5kSW5kZXhPZkNoaWxkKG5ld0NoaWxkcmVuLCBvbGRDaGlsZCwgbmV3SW5kZXggKyAxKTtcclxuICAgICAgICBpZiAoZmluZE5ld0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZW1vdmVDaGlsZCgpO1xyXG4gICAgICAgICAgICBvbGRJbmRleCsrO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRDaGlsZCgpO1xyXG4gICAgICAgIHJlbW92ZUNoaWxkKCk7XHJcbiAgICAgICAgb2xkSW5kZXgrKztcclxuICAgICAgICBuZXdJbmRleCsrO1xyXG4gICAgfTtcclxuICAgIHdoaWxlIChuZXdJbmRleCA8IG5ld0NoaWxkcmVuTGVuZ3RoKSB7XHJcbiAgICAgICAgX2xvb3BfMSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9sZENoaWxkcmVuTGVuZ3RoID4gb2xkSW5kZXgpIHtcclxuICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4VG9DaGVjayA9IGk7XHJcbiAgICAgICAgICAgIHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaXN0aW5ndWlzaGFibGUob2xkQ2hpbGRyZW4sIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNoaWxkVG9SZW1vdmUgPSBvbGRDaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGRfMS5pc1dOb2RlKGNoaWxkVG9SZW1vdmUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGluc3RhbmNlTWFwLmdldChjaGlsZFRvUmVtb3ZlLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRUb1JlbW92ZSA9IGl0ZW0uZG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZVRvUmVtb3ZlKGNoaWxkVG9SZW1vdmUsIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSZW1vdmUgY2hpbGQgZnJhZ21lbnRzXHJcbiAgICAgICAgZm9yIChpID0gb2xkSW5kZXg7IGkgPCBvbGRDaGlsZHJlbkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIF9sb29wXzIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dFVwZGF0ZWQ7XHJcbn1cclxuZnVuY3Rpb24gYWRkQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIGNoaWxkcmVuLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UsIGluc2VydEJlZm9yZSwgY2hpbGROb2Rlcykge1xyXG4gICAgaWYgKGluc2VydEJlZm9yZSA9PT0gdm9pZCAwKSB7IGluc2VydEJlZm9yZSA9IHVuZGVmaW5lZDsgfVxyXG4gICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgaWYgKHByb2plY3RvclN0YXRlLm1lcmdlICYmIGNoaWxkTm9kZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNoaWxkTm9kZXMgPSBhcnJheV8xLmZyb20ocGFyZW50Vk5vZGUuZG9tTm9kZS5jaGlsZE5vZGVzKTtcclxuICAgIH1cclxuICAgIHZhciB0cmFuc2l0aW9ucyA9IHByb2plY3Rpb25PcHRpb25zLnRyYW5zaXRpb25zO1xyXG4gICAgcHJvamVjdGlvbk9wdGlvbnMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCBwcm9qZWN0aW9uT3B0aW9ucywgeyBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggKyAxIH0pO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgIHZhciBuZXh0U2libGluZ3MgPSBjaGlsZHJlbi5zbGljZShpICsgMSk7XHJcbiAgICAgICAgaWYgKGRfMS5pc1ZOb2RlKGNoaWxkKSkge1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdG9yU3RhdGUubWVyZ2UgJiYgY2hpbGROb2Rlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY2hpbGQuZG9tTm9kZSA9PT0gdW5kZWZpbmVkICYmIGNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBjaGlsZE5vZGVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbUVsZW1lbnQgJiYgZG9tRWxlbWVudC50YWdOYW1lID09PSAoY2hpbGQudGFnLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5kb21Ob2RlID0gZG9tRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3JlYXRlRG9tKGNoaWxkLCBwYXJlbnRWTm9kZSwgbmV4dFNpYmxpbmdzLCBpbnNlcnRCZWZvcmUsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjcmVhdGVEb20oY2hpbGQsIHBhcmVudFZOb2RlLCBuZXh0U2libGluZ3MsIGluc2VydEJlZm9yZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlLCBjaGlsZE5vZGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZUFkZGVkKGNoaWxkLCB0cmFuc2l0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5pdFByb3BlcnRpZXNBbmRDaGlsZHJlbihkb21Ob2RlLCBkbm9kZSwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICBhZGRDaGlsZHJlbihkbm9kZSwgZG5vZGUuY2hpbGRyZW4sIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgdW5kZWZpbmVkKTtcclxuICAgIGlmICh0eXBlb2YgZG5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgZG5vZGUuaW5zZXJ0ZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFkZERlZmVycmVkUHJvcGVydGllcyhkbm9kZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRub2RlLmF0dHJpYnV0ZXMgJiYgZG5vZGUuZXZlbnRzKSB7XHJcbiAgICAgICAgdXBkYXRlQXR0cmlidXRlcyhkb21Ob2RlLCB7fSwgZG5vZGUuYXR0cmlidXRlcywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZSwge30sIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zLCBmYWxzZSk7XHJcbiAgICAgICAgcmVtb3ZlT3JwaGFuZWRFdmVudHMoZG9tTm9kZSwge30sIGRub2RlLmV2ZW50cywgcHJvamVjdGlvbk9wdGlvbnMsIHRydWUpO1xyXG4gICAgICAgIHZhciBldmVudHNfMSA9IGRub2RlLmV2ZW50cztcclxuICAgICAgICBPYmplY3Qua2V5cyhldmVudHNfMSkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdXBkYXRlRXZlbnQoZG9tTm9kZSwgZXZlbnQsIGV2ZW50c18xW2V2ZW50XSwgcHJvamVjdGlvbk9wdGlvbnMsIGRub2RlLnByb3BlcnRpZXMuYmluZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHt9LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG5vZGUucHJvcGVydGllcy5rZXkgIT09IG51bGwgJiYgZG5vZGUucHJvcGVydGllcy5rZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZChkb21Ob2RlLCBcIlwiICsgZG5vZGUucHJvcGVydGllcy5rZXkpO1xyXG4gICAgfVxyXG4gICAgZG5vZGUuaW5zZXJ0ZWQgPSB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZURvbShkbm9kZSwgcGFyZW50Vk5vZGUsIG5leHRTaWJsaW5ncywgaW5zZXJ0QmVmb3JlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UsIGNoaWxkTm9kZXMpIHtcclxuICAgIHZhciBkb21Ob2RlO1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIGlmIChkXzEuaXNXTm9kZShkbm9kZSkpIHtcclxuICAgICAgICB2YXIgd2lkZ2V0Q29uc3RydWN0b3IgPSBkbm9kZS53aWRnZXRDb25zdHJ1Y3RvcjtcclxuICAgICAgICB2YXIgcGFyZW50SW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgIGlmICghUmVnaXN0cnlfMS5pc1dpZGdldEJhc2VDb25zdHJ1Y3Rvcih3aWRnZXRDb25zdHJ1Y3RvcikpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBwYXJlbnRJbnN0YW5jZURhdGEucmVnaXN0cnkoKS5nZXQod2lkZ2V0Q29uc3RydWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZGdldENvbnN0cnVjdG9yID0gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGluc3RhbmNlXzEgPSBuZXcgd2lkZ2V0Q29uc3RydWN0b3IoKTtcclxuICAgICAgICBkbm9kZS5pbnN0YW5jZSA9IGluc3RhbmNlXzE7XHJcbiAgICAgICAgbmV4dFNpYmxpbmdNYXAuc2V0KGluc3RhbmNlXzEsIG5leHRTaWJsaW5ncyk7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YV8xID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2VfMSk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhXzEuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2VEYXRhXzEuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2VEYXRhXzEucmVuZGVyaW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUucHVzaCh7IGluc3RhbmNlOiBpbnN0YW5jZV8xLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggfSk7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVJlbmRlcihwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGluc3RhbmNlRGF0YV8xLnJlbmRlcmluZyA9IHRydWU7XHJcbiAgICAgICAgaW5zdGFuY2VfMS5fX3NldENvcmVQcm9wZXJ0aWVzX18oZG5vZGUuY29yZVByb3BlcnRpZXMpO1xyXG4gICAgICAgIGluc3RhbmNlXzEuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICBpbnN0YW5jZV8xLl9fc2V0UHJvcGVydGllc19fKGRub2RlLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIHZhciByZW5kZXJlZCA9IGluc3RhbmNlXzEuX19yZW5kZXJfXygpO1xyXG4gICAgICAgIGluc3RhbmNlRGF0YV8xLnJlbmRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChyZW5kZXJlZCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRSZW5kZXJlZCA9IGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4ocmVuZGVyZWQsIGluc3RhbmNlXzEpO1xyXG4gICAgICAgICAgICBkbm9kZS5yZW5kZXJlZCA9IGZpbHRlcmVkUmVuZGVyZWQ7XHJcbiAgICAgICAgICAgIGFkZENoaWxkcmVuKHBhcmVudFZOb2RlLCBmaWx0ZXJlZFJlbmRlcmVkLCBwcm9qZWN0aW9uT3B0aW9ucywgaW5zdGFuY2VfMSwgaW5zZXJ0QmVmb3JlLCBjaGlsZE5vZGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlXzEsIHsgZG5vZGU6IGRub2RlLCBwYXJlbnRWTm9kZTogcGFyZW50Vk5vZGUgfSk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhXzEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGFfMS5vbkF0dGFjaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKHByb2plY3RvclN0YXRlLm1lcmdlICYmIHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlID0gcHJvamVjdGlvbk9wdGlvbnMubWVyZ2VFbGVtZW50O1xyXG4gICAgICAgICAgICBwcm9qZWN0b3JTdGF0ZS5tZXJnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGluaXRQcm9wZXJ0aWVzQW5kQ2hpbGRyZW4oZG9tTm9kZSwgZG5vZGUsIHBhcmVudEluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRvYyA9IHBhcmVudFZOb2RlLmRvbU5vZGUub3duZXJEb2N1bWVudDtcclxuICAgICAgICBpZiAoIWRub2RlLnRhZyAmJiB0eXBlb2YgZG5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKGRub2RlLmRvbU5vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRWTm9kZS5kb21Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RG9tTm9kZSA9IGRub2RlLmRvbU5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkbm9kZS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRWTm9kZS5kb21Ob2RlID09PSBkbm9kZS5kb21Ob2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWTm9kZS5kb21Ob2RlLnJlcGxhY2VDaGlsZChuZXdEb21Ob2RlLCBkbm9kZS5kb21Ob2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZOb2RlLmRvbU5vZGUuYXBwZW5kQ2hpbGQobmV3RG9tTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlICYmIGRub2RlLmRvbU5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkbm9kZS5kb21Ob2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRub2RlLmRvbU5vZGUgPSBuZXdEb21Ob2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0QmVmb3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWTm9kZS5kb21Ob2RlLmluc2VydEJlZm9yZShkb21Ob2RlLCBpbnNlcnRCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Vk5vZGUuZG9tTm9kZS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRub2RlLmRvbU5vZGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRub2RlLnRhZyA9PT0gJ3N2ZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uT3B0aW9ucyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb2plY3Rpb25PcHRpb25zLCB7IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0aW9uT3B0aW9ucy5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhwcm9qZWN0aW9uT3B0aW9ucy5uYW1lc3BhY2UsIGRub2RlLnRhZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoZG5vZGUudGFnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluaXRQcm9wZXJ0aWVzQW5kQ2hpbGRyZW4oZG9tTm9kZSwgZG5vZGUsIHBhcmVudEluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpbnNlcnRCZWZvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Vk5vZGUuZG9tTm9kZS5pbnNlcnRCZWZvcmUoZG9tTm9kZSwgaW5zZXJ0QmVmb3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb21Ob2RlLnBhcmVudE5vZGUgIT09IHBhcmVudFZOb2RlLmRvbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudFZOb2RlLmRvbU5vZGUuYXBwZW5kQ2hpbGQoZG9tTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlRG9tKHByZXZpb3VzLCBkbm9kZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudFZOb2RlLCBwYXJlbnRJbnN0YW5jZSwgb2xkTmV4dFNpYmxpbmdzLCBuZXh0U2libGluZ3MpIHtcclxuICAgIGlmIChkXzEuaXNXTm9kZShkbm9kZSkpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSBwcmV2aW91cy5pbnN0YW5jZTtcclxuICAgICAgICB2YXIgX2EgPSBpbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpLCBwYXJlbnRWTm9kZV8xID0gX2EucGFyZW50Vk5vZGUsIG5vZGUgPSBfYS5kbm9kZTtcclxuICAgICAgICB2YXIgcHJldmlvdXNSZW5kZXJlZCA9IG5vZGUgPyBub2RlLnJlbmRlcmVkIDogcHJldmlvdXMucmVuZGVyZWQ7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IGV4cG9ydHMud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKTtcclxuICAgICAgICBpbnN0YW5jZURhdGEucmVuZGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICBpbnN0YW5jZS5fX3NldENvcmVQcm9wZXJ0aWVzX18oZG5vZGUuY29yZVByb3BlcnRpZXMpO1xyXG4gICAgICAgIGluc3RhbmNlLl9fc2V0Q2hpbGRyZW5fXyhkbm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgaW5zdGFuY2UuX19zZXRQcm9wZXJ0aWVzX18oZG5vZGUucHJvcGVydGllcyk7XHJcbiAgICAgICAgbmV4dFNpYmxpbmdNYXAuc2V0KGluc3RhbmNlLCBuZXh0U2libGluZ3MpO1xyXG4gICAgICAgIGRub2RlLmluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlRGF0YS5kaXJ0eSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVuZGVyZWQgPSBpbnN0YW5jZS5fX3JlbmRlcl9fKCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG5vZGUucmVuZGVyZWQgPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKHJlbmRlcmVkLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKHBhcmVudFZOb2RlXzEsIG9sZE5leHRTaWJsaW5ncywgcHJldmlvdXNSZW5kZXJlZCwgZG5vZGUucmVuZGVyZWQsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGEucmVuZGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRub2RlLnJlbmRlcmVkID0gcHJldmlvdXNSZW5kZXJlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlOiBkbm9kZSwgcGFyZW50Vk5vZGU6IHBhcmVudFZOb2RlXzEgfSk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZFJvb3QoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChwcmV2aW91cyA9PT0gZG5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZG9tTm9kZV8yID0gKGRub2RlLmRvbU5vZGUgPSBwcmV2aW91cy5kb21Ob2RlKTtcclxuICAgICAgICB2YXIgdGV4dFVwZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgdXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghZG5vZGUudGFnICYmIHR5cGVvZiBkbm9kZS50ZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoZG5vZGUudGV4dCAhPT0gcHJldmlvdXMudGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0RvbU5vZGUgPSBkb21Ob2RlXzIub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkbm9kZS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGRvbU5vZGVfMi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdEb21Ob2RlLCBkb21Ob2RlXzIpO1xyXG4gICAgICAgICAgICAgICAgZG5vZGUuZG9tTm9kZSA9IG5ld0RvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICB0ZXh0VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dFVwZGF0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkbm9kZS50YWcgJiYgZG5vZGUudGFnLmxhc3RJbmRleE9mKCdzdmcnLCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdGlvbk9wdGlvbnMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCBwcm9qZWN0aW9uT3B0aW9ucywgeyBuYW1lc3BhY2U6IE5BTUVTUEFDRV9TVkcgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzLmNoaWxkcmVuICE9PSBkbm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihkbm9kZS5jaGlsZHJlbiwgcGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgZG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGRub2RlLCBvbGROZXh0U2libGluZ3MsIHByZXZpb3VzLmNoaWxkcmVuLCBjaGlsZHJlbiwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKSB8fCB1cGRhdGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91c1Byb3BlcnRpZXNfMSA9IGJ1aWxkUHJldmlvdXNQcm9wZXJ0aWVzKGRvbU5vZGVfMiwgcHJldmlvdXMsIGRub2RlKTtcclxuICAgICAgICAgICAgaWYgKGRub2RlLmF0dHJpYnV0ZXMgJiYgZG5vZGUuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGVfMiwgcHJldmlvdXNQcm9wZXJ0aWVzXzEuYXR0cmlidXRlcywgZG5vZGUuYXR0cmlidXRlcywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUHJvcGVydGllcyhkb21Ob2RlXzIsIHByZXZpb3VzUHJvcGVydGllc18xLnByb3BlcnRpZXMsIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zLCBmYWxzZSkgfHwgdXBkYXRlZDtcclxuICAgICAgICAgICAgICAgIHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGVfMiwgcHJldmlvdXNQcm9wZXJ0aWVzXzEuZXZlbnRzLCBkbm9kZS5ldmVudHMsIHByb2plY3Rpb25PcHRpb25zLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudHNfMiA9IGRub2RlLmV2ZW50cztcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGV2ZW50c18yKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUV2ZW50KGRvbU5vZGVfMiwgZXZlbnQsIGV2ZW50c18yW2V2ZW50XSwgcHJvamVjdGlvbk9wdGlvbnMsIGRub2RlLnByb3BlcnRpZXMuYmluZCwgcHJldmlvdXNQcm9wZXJ0aWVzXzEuZXZlbnRzW2V2ZW50XSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZV8yLCBwcmV2aW91c1Byb3BlcnRpZXNfMS5wcm9wZXJ0aWVzLCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZG5vZGUucHJvcGVydGllcy5rZXkgIT09IG51bGwgJiYgZG5vZGUucHJvcGVydGllcy5rZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IGV4cG9ydHMud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlRGF0YS5ub2RlSGFuZGxlci5hZGQoZG9tTm9kZV8yLCBcIlwiICsgZG5vZGUucHJvcGVydGllcy5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cGRhdGVkICYmIGRub2RlLnByb3BlcnRpZXMgJiYgZG5vZGUucHJvcGVydGllcy51cGRhdGVBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgZG5vZGUucHJvcGVydGllcy51cGRhdGVBbmltYXRpb24oZG9tTm9kZV8yLCBkbm9kZS5wcm9wZXJ0aWVzLCBwcmV2aW91cy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYWRkRGVmZXJyZWRQcm9wZXJ0aWVzKHZub2RlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgLy8gdHJhbnNmZXIgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGJlZW4gcGFzc2VkIC0gYXMgdGhlc2UgbXVzdCBiZSBkZWNvcmF0ZWQgcHJvcGVydGllc1xyXG4gICAgdm5vZGUuZGVjb3JhdGVkRGVmZXJyZWRQcm9wZXJ0aWVzID0gdm5vZGUucHJvcGVydGllcztcclxuICAgIHZhciBwcm9wZXJ0aWVzID0gdm5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2soISF2bm9kZS5pbnNlcnRlZCk7XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgdm5vZGUucHJvcGVydGllcyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb3BlcnRpZXMsIHZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllcyk7XHJcbiAgICBwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHZub2RlLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrKCEhdm5vZGUuaW5zZXJ0ZWQpLCB2bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMpO1xyXG4gICAgICAgIHVwZGF0ZVByb3BlcnRpZXModm5vZGUuZG9tTm9kZSwgdm5vZGUucHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIHZub2RlLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gcnVuRGVmZXJyZWRSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICBpZiAocHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHByb2plY3Rpb25PcHRpb25zLnN5bmMpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdsb2JhbF8xLmRlZmF1bHQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBydW5BZnRlclJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XHJcbiAgICAgICAgd2hpbGUgKHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChnbG9iYWxfMS5kZWZhdWx0LnJlcXVlc3RJZGxlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2NoZWR1bGVSZW5kZXIocHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICBpZiAocHJvamVjdGlvbk9wdGlvbnMuc3luYykge1xyXG4gICAgICAgIHJlbmRlcihwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwcm9qZWN0b3JTdGF0ZS5yZW5kZXJTY2hlZHVsZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IGdsb2JhbF8xLmRlZmF1bHQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZW5kZXIocHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJTY2hlZHVsZWQgPSB1bmRlZmluZWQ7XHJcbiAgICB2YXIgcmVuZGVyUXVldWUgPSBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZTtcclxuICAgIHZhciByZW5kZXJzID0gdHNsaWJfMS5fX3NwcmVhZChyZW5kZXJRdWV1ZSk7XHJcbiAgICBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZSA9IFtdO1xyXG4gICAgcmVuZGVycy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmRlcHRoIC0gYi5kZXB0aDsgfSk7XHJcbiAgICB2YXIgcHJldmlvdXNseVJlbmRlcmVkID0gW107XHJcbiAgICB3aGlsZSAocmVuZGVycy5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSByZW5kZXJzLnNoaWZ0KCkuaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlTWFwLmhhcyhpbnN0YW5jZSkgJiYgcHJldmlvdXNseVJlbmRlcmVkLmluZGV4T2YoaW5zdGFuY2UpID09PSAtMSkge1xyXG4gICAgICAgICAgICBwcmV2aW91c2x5UmVuZGVyZWQucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IGluc3RhbmNlTWFwLmdldChpbnN0YW5jZSksIHBhcmVudFZOb2RlID0gX2EucGFyZW50Vk5vZGUsIGRub2RlID0gX2EuZG5vZGU7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U2libGluZ3MgPSBuZXh0U2libGluZ01hcC5nZXQoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB1cGRhdGVEb20oZG5vZGUsIHRvSW50ZXJuYWxXTm9kZShpbnN0YW5jZSwgaW5zdGFuY2VEYXRhKSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudFZOb2RlLCBpbnN0YW5jZSwgbmV4dFNpYmxpbmdzLCBuZXh0U2libGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgIHJ1bkRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zKTtcclxufVxyXG5leHBvcnRzLmRvbSA9IHtcclxuICAgIGFwcGVuZDogZnVuY3Rpb24gKHBhcmVudE5vZGUsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChwcm9qZWN0aW9uT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHByb2plY3Rpb25PcHRpb25zID0ge307IH1cclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpO1xyXG4gICAgICAgIHZhciBmaW5hbFByb2plY3Rvck9wdGlvbnMgPSBnZXRQcm9qZWN0aW9uT3B0aW9ucyhwcm9qZWN0aW9uT3B0aW9ucywgaW5zdGFuY2UpO1xyXG4gICAgICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHtcclxuICAgICAgICAgICAgYWZ0ZXJSZW5kZXJDYWxsYmFja3M6IFtdLFxyXG4gICAgICAgICAgICBkZWZlcnJlZFJlbmRlckNhbGxiYWNrczogW10sXHJcbiAgICAgICAgICAgIG5vZGVNYXA6IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpLFxyXG4gICAgICAgICAgICByZW5kZXJTY2hlZHVsZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcmVuZGVyUXVldWU6IFtdLFxyXG4gICAgICAgICAgICBtZXJnZTogcHJvamVjdGlvbk9wdGlvbnMubWVyZ2UgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIG1lcmdlRWxlbWVudDogcHJvamVjdGlvbk9wdGlvbnMubWVyZ2VFbGVtZW50XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm9qZWN0b3JTdGF0ZU1hcC5zZXQoaW5zdGFuY2UsIHByb2plY3RvclN0YXRlKTtcclxuICAgICAgICBmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIHZhciBwYXJlbnRWTm9kZSA9IHRvUGFyZW50Vk5vZGUoZmluYWxQcm9qZWN0b3JPcHRpb25zLnJvb3ROb2RlKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRvSW50ZXJuYWxXTm9kZShpbnN0YW5jZSwgaW5zdGFuY2VEYXRhKTtcclxuICAgICAgICBpbnN0YW5jZU1hcC5zZXQoaW5zdGFuY2UsIHsgZG5vZGU6IG5vZGUsIHBhcmVudFZOb2RlOiBwYXJlbnRWTm9kZSB9KTtcclxuICAgICAgICBpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2VEYXRhLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZS5wdXNoKHsgaW5zdGFuY2U6IGluc3RhbmNlLCBkZXB0aDogZmluYWxQcm9qZWN0b3JPcHRpb25zLmRlcHRoIH0pO1xyXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVSZW5kZXIoZmluYWxQcm9qZWN0b3JPcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdXBkYXRlRG9tKG5vZGUsIG5vZGUsIGZpbmFsUHJvamVjdG9yT3B0aW9ucywgcGFyZW50Vk5vZGUsIGluc3RhbmNlLCBbXSwgW10pO1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGEub25BdHRhY2goKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xyXG4gICAgICAgIHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKGZpbmFsUHJvamVjdG9yT3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZG9tTm9kZTogZmluYWxQcm9qZWN0b3JPcHRpb25zLnJvb3ROb2RlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChpbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICB9LFxyXG4gICAgbWVyZ2U6IGZ1bmN0aW9uIChlbGVtZW50LCBpbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICBpZiAocHJvamVjdGlvbk9wdGlvbnMgPT09IHZvaWQgMCkgeyBwcm9qZWN0aW9uT3B0aW9ucyA9IHt9OyB9XHJcbiAgICAgICAgcHJvamVjdGlvbk9wdGlvbnMubWVyZ2UgPSB0cnVlO1xyXG4gICAgICAgIHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmFwcGVuZChlbGVtZW50LnBhcmVudE5vZGUsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KGluc3RhbmNlKTtcclxuICAgICAgICBwcm9qZWN0b3JTdGF0ZS5tZXJnZSA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBwcm9qZWN0aW9uO1xyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3Zkb20uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3Zkb20uanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIGFycmF5XzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9hcnJheVwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvYWRkb24ubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIEFkZG9uQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEFkZG9uQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEFkZG9uQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBBZGRvbkJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2FkZG9uJztcclxuICAgIH07XHJcbiAgICBBZGRvbkJhc2UucHJvdG90eXBlLmlzQ2hlY2tib3hPclJhZGlvID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgY2hpbGRLZXkgPSBub2RlLnByb3BlcnRpZXMua2V5O1xyXG4gICAgICAgIGlmIChjaGlsZEtleSA9PT0gJ2NoZWNrYm94JyB8fCBjaGlsZEtleSA9PT0gJ3JhZGlvJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQWRkb25CYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIHZhbHVlID0gX2EudmFsdWUsIHBvc2l0aW9uID0gX2EucG9zaXRpb247XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzID0gWydpbnB1dC1ncm91cC1wcmVwZW5kJ107XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIHBvc2l0aW9uID09PSAnYXBwZW5kJykge1xyXG4gICAgICAgICAgICBjc3NDbGFzcyA9IFsnaW5wdXQtZ3JvdXAtYXBwZW5kJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGRfMS52KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbJ2lucHV0LWdyb3VwLXRleHQnXSwgdXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICAgICAgfSwgW3ZhbHVlXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNoZWNrYm94T3JSYWRpb05vZGUgPSBhcnJheV8xLmZpbmQodGhpcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuaXNDaGVja2JveE9yUmFkaW8oY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94T3JSYWRpb05vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goZF8xLnYoJ2RpdicsIHsgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbJ2lucHV0LWdyb3VwLXRleHQnXSwgdXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSkgfSwgdGhpcy5jaGlsZHJlbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3MgPSBjc3NDbGFzcy5jb25jYXQodXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFt0aGlzLnRoZW1lKGNzcy5yb290KV0sIGNzc0NsYXNzKVxyXG4gICAgICAgIH0sIGNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBBZGRvbkJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItYWRkb24nLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogWyd3aWRnZXRJZCcsICd2YWx1ZScsICdwb3NpdGlvbicsICd0ZXh0Q29sb3InLCAnYmFja2dyb3VuZENvbG9yJ10sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgQWRkb25CYXNlKTtcclxuICAgIHJldHVybiBBZGRvbkJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuQWRkb25CYXNlID0gQWRkb25CYXNlO1xyXG52YXIgQWRkb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhBZGRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEFkZG9uKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBBZGRvbjtcclxufShBZGRvbkJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQWRkb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vc3R5bGVzL2FkZG9uLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIkpJNFVnQ2NuXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvYWRkb25cIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL3N0eWxlcy9hZGRvbi5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vc3R5bGVzL2FkZG9uLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2JhZGdlLm0uY3NzXCIpO1xyXG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi4vYnV0dG9uXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBCYWRnZUJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhCYWRnZUJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYWRnZUJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgQmFkZ2VCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdiYWRnZSc7XHJcbiAgICB9O1xyXG4gICAgQmFkZ2VCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCB2YWx1ZSA9IF9hLnZhbHVlLCB2YWx1ZVBvc2l0aW9uID0gX2EudmFsdWVQb3NpdGlvbiwgYXBwZWFyYW5jZSA9IF9hLmFwcGVhcmFuY2UsIHBpbGwgPSBfYS5waWxsLCBocmVmID0gX2EuaHJlZiwgdGFyZ2V0ID0gX2EudGFyZ2V0O1xyXG4gICAgICAgIHZhciB0YWcgPSAnc3Bhbic7XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoaHJlZikge1xyXG4gICAgICAgICAgICB0YWcgPSAnYSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYnV0dG9uXzEudGFyZ2V0TWFwW3RhcmdldF0gfHwgdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKFwiYmFkZ2UtXCIgKyBhcHBlYXJhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBpbGwgPT09IHRydWUgfHwgcGlsbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnYmFkZ2UtcGlsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRyZW47XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlUG9zaXRpb24gJiYgdmFsdWVQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZChbdmFsdWVdLCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLmNoaWxkcmVuLCBbdmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KHRhZywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbdGhpcy50aGVtZShjc3Mucm9vdCksICdiYWRnZSddLCBjc3NDbGFzc2VzLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSksXHJcbiAgICAgICAgICAgIGhyZWY6IGhyZWYsXHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIEJhZGdlQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1iYWRnZScsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZVBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhcHBlYXJhbmNlJyxcclxuICAgICAgICAgICAgICAgICdwaWxsJyxcclxuICAgICAgICAgICAgICAgICdocmVmJyxcclxuICAgICAgICAgICAgICAgICd0YXJnZXQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBCYWRnZUJhc2UpO1xyXG4gICAgcmV0dXJuIEJhZGdlQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5CYWRnZUJhc2UgPSBCYWRnZUJhc2U7XHJcbnZhciBCYWRnZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEJhZGdlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQmFkZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJhZGdlO1xyXG59KEJhZGdlQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCYWRnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2UvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9zdHlsZXMvYmFkZ2UubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzNrcWlDTTBwXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvYmFkZ2VcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2J1dHRvbi5tLmNzc1wiKTtcclxuZXhwb3J0cy5zaXplTWFwID0ge1xyXG4gICAgbGFyZ2U6ICdidG4tbGcnLFxyXG4gICAgc21hbGw6ICdidG4tc20nLFxyXG4gICAgZGVmYXVsdDogJydcclxufTtcclxuZXhwb3J0cy50YXJnZXRNYXAgPSB7XHJcbiAgICBzZWxmOiAnX3NlbGYnLFxyXG4gICAgYmxhbms6ICdfYmxhbmsnXHJcbn07XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIEJ1dHRvbkJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhCdXR0b25CYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQnV0dG9uQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBCdXR0b25CYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdidXR0b24nO1xyXG4gICAgfTtcclxuICAgIEJ1dHRvbkJhc2UucHJvdG90eXBlLl9vbkNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLm9uQ2xpY2sgJiYgdGhpcy5wcm9wZXJ0aWVzLm9uQ2xpY2soKTtcclxuICAgIH07XHJcbiAgICBCdXR0b25CYXNlLnByb3RvdHlwZS5yZW5kZXJDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlUG9zaXRpb24gPSBfYS52YWx1ZVBvc2l0aW9uO1xyXG4gICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXZhbHVlUG9zaXRpb24gfHwgdmFsdWVQb3NpdGlvbiA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19zcHJlYWQodGhpcy5jaGlsZHJlbiwgW3ZhbHVlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZVBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19zcHJlYWQoW3ZhbHVlXSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZVBvc2l0aW9uID09PSAndG9wJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICBkXzEudignc3BhbicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2QtYmxvY2snXVxyXG4gICAgICAgICAgICAgICAgfSwgW3ZhbHVlXSlcclxuICAgICAgICAgICAgXSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZVBvc2l0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLmNoaWxkcmVuLCBbXHJcbiAgICAgICAgICAgICAgICBkXzEudignc3BhbicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2QtYmxvY2snXVxyXG4gICAgICAgICAgICAgICAgfSwgW3ZhbHVlXSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0c2xpYl8xLl9fc3ByZWFkKHRoaXMuY2hpbGRyZW4sIFt2YWx1ZV0pO1xyXG4gICAgfTtcclxuICAgIEJ1dHRvbkJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIGFwcGVhcmFuY2UgPSBfYS5hcHBlYXJhbmNlLCBzaXplID0gX2Euc2l6ZSwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgdHlwZSA9IF9hLnR5cGUsIGZsdWlkID0gX2EuZmx1aWQsIGFjdGl2ZSA9IF9hLmFjdGl2ZSwgaHJlZiA9IF9hLmhyZWYsIHRhcmdldCA9IF9hLnRhcmdldCwgX2IgPSBfYS5pc0xpc3RJdGVtLCBpc0xpc3RJdGVtID0gX2IgPT09IHZvaWQgMCA/IGZhbHNlIDogX2I7XHJcbiAgICAgICAgdmFyIHNpemVDbGFzcyA9IGV4cG9ydHMuc2l6ZU1hcFtzaXplXTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGV4cG9ydHMudGFyZ2V0TWFwW3RhcmdldF0gfHwgdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnJlbmRlckNoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYgKGhyZWYpIHtcclxuICAgICAgICAgICAgLy8g5L2/55SoYeagh+etvlxyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBocmVmOiBcIlwiICsgaHJlZixcclxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogaXNMaXN0SXRlbVxyXG4gICAgICAgICAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImxpc3QtZ3JvdXAtaXRlbS1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9PT0gdHJ1ZSB8fCBhY3RpdmUgPT09ICd0cnVlJyA/ICdhY3RpdmUnIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2J0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgJiYgYXBwZWFyYW5jZSAhPT0gJ2RlZmF1bHQnID8gXCJidG4tXCIgKyBhcHBlYXJhbmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplQ2xhc3MgIT09ICcnID8gc2l6ZUNsYXNzIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnID8gJ2J0bi1ibG9jaycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9PT0gdHJ1ZSB8fCBhY3RpdmUgPT09ICd0cnVlJyA/ICdhY3RpdmUnIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHJvbGU6ICdidXR0b24nXHJcbiAgICAgICAgICAgIH0sIGNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignYnV0dG9uJywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogaXNMaXN0SXRlbVxyXG4gICAgICAgICAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImxpc3QtZ3JvdXAtaXRlbS1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9PT0gdHJ1ZSB8fCBhY3RpdmUgPT09ICd0cnVlJyA/ICdhY3RpdmUnIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2J0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgJiYgYXBwZWFyYW5jZSAhPT0gJ2RlZmF1bHQnID8gXCJidG4tXCIgKyBhcHBlYXJhbmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplQ2xhc3MgIT09ICcnID8gc2l6ZUNsYXNzIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnID8gJ2J0bi1ibG9jaycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9PT0gdHJ1ZSB8fCBhY3RpdmUgPT09ICd0cnVlJyA/ICdhY3RpdmUnIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIG9uY2xpY2s6IHRoaXMuX29uQ2xpY2tcclxuICAgICAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBCdXR0b25CYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWJ1dHRvbicsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGVhcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgJ3NpemUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdmbHVpZCcsXHJcbiAgICAgICAgICAgICAgICAnYWN0aXZlJyxcclxuICAgICAgICAgICAgICAgICdocmVmJyxcclxuICAgICAgICAgICAgICAgICd0YXJnZXQnLFxyXG4gICAgICAgICAgICAgICAgJ2lzTGlzdEl0ZW0nXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFsnb25DbGljayddXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgQnV0dG9uQmFzZSk7XHJcbiAgICByZXR1cm4gQnV0dG9uQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5CdXR0b25CYXNlID0gQnV0dG9uQmFzZTtcclxudmFyIEJ1dHRvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQnV0dG9uO1xyXG59KEJ1dHRvbkJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2J1dHRvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL3N0eWxlcy9idXR0b24ubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2J1dHRvbi9zdHlsZXMvYnV0dG9uLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL3N0eWxlcy9idXR0b24ubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xUGlGUVdKclwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2J1dHRvblwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL3N0eWxlcy9idXR0b24ubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2J1dHRvbi9zdHlsZXMvYnV0dG9uLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgc3RyaW5nXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9zdHJpbmdcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvY2FyZC5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgQ2FyZEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDYXJkQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENhcmRCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIENhcmRCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjYXJkJztcclxuICAgIH07XHJcbiAgICBDYXJkQmFzZS5wcm90b3R5cGUuX2dldFN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgICAgICB2YXIgY3NzU3R5bGVzID0ge307XHJcbiAgICAgICAgaWYgKHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJpbmdfMS5lbmRzV2l0aCh3aWR0aCwgJyUnKSB8fCB3aWR0aCA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZWlnaHQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmluZ18xLmVuZHNXaXRoKGhlaWdodCwgJyUnKSB8fCBoZWlnaHQgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNzc1N0eWxlcztcclxuICAgIH07XHJcbiAgICBDYXJkQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3aWRnZXRJZCA9IHRoaXMucHJvcGVydGllcy53aWRnZXRJZDtcclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAnY2FyZCdcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Qm9yZGVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0c2xpYl8xLl9fYXNzaWduKHt9LCB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpLCB0aGlzLl9nZXRTdHlsZXMoKSlcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBDYXJkQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1jYXJkJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyVG9wJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyUm91bmQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udFdlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udEl0YWxpYycsXHJcbiAgICAgICAgICAgICAgICAndGV4dERlY29yYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cnVuY2F0ZScsXHJcbiAgICAgICAgICAgICAgICAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAndGV4dENvbG9yJyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgQ2FyZEJhc2UpO1xyXG4gICAgcmV0dXJuIENhcmRCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkNhcmRCYXNlID0gQ2FyZEJhc2U7XHJcbnZhciBDYXJkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ2FyZCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENhcmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENhcmQ7XHJcbn0oQ2FyZEJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ2FyZDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NhcmQvc3R5bGVzL2NhcmQubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xWGoxM3Q4SFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2NhcmRcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NhcmQvc3R5bGVzL2NhcmQubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NhcmQvc3R5bGVzL2NhcmQubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dWlkXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS91dWlkXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2NoZWNrYm94Lm0uY3NzXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuLi9sYWJlbFwiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgQ2hlY2tib3hCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ2hlY2tib3hCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ2hlY2tib3hCYXNlKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX3V1aWQgPSB1dWlkXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENoZWNrYm94QmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnY2hlY2tib3gnO1xyXG4gICAgfTtcclxuICAgIENoZWNrYm94QmFzZS5wcm90b3R5cGUucmVuZGVyQ2hlY2tib3ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlLCBjaGVja2VkID0gX2EuY2hlY2tlZCwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgcmVhZE9ubHkgPSBfYS5yZWFkT25seTtcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWQgPT09IHRydWUgfHwgY2hlY2tlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHJlcXVpcmVkID09PSB0cnVlIHx8IHJlcXVpcmVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSA9PT0gdHJ1ZSB8fCByZWFkT25seSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ2Zvcm0tY2hlY2staW5wdXQnXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIENoZWNrYm94QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBsYWJlbCA9IF9hLmxhYmVsLCBzaXplID0gX2Euc2l6ZSwgbGFiZWxBZnRlciA9IF9hLmxhYmVsQWZ0ZXIsIGZsdWlkID0gX2EuZmx1aWQsIGRpc3BsYXkgPSBfYS5kaXNwbGF5LCB2YWx1ZSA9IF9hLnZhbHVlLCBjaGVja2VkID0gX2EuY2hlY2tlZCwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgcmVhZE9ubHkgPSBfYS5yZWFkT25seSwgX2MgPSBfYS5pc0luQWRkb24sIGlzSW5BZGRvbiA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jO1xyXG4gICAgICAgIGlmIChpc0luQWRkb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS52KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCA9PT0gdHJ1ZSB8fCBjaGVja2VkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiByZXF1aXJlZCA9PT0gdHJ1ZSB8fCByZXF1aXJlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHJlYWRPbmx5ID09PSB0cnVlIHx8IHJlYWRPbmx5ID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgICAgICBzaXplID8gdXRpbF8xLmZvcm1TaXplTWFwW3NpemVdIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveCgpLFxyXG4gICAgICAgICAgICBsYWJlbCA/IGRfMS53KGxhYmVsXzEuZGVmYXVsdCwgeyB2YWx1ZTogbGFiZWwsIGZvcklkOiB3aWRnZXRJZCwgY2xhc3NlczogJ2Zvcm0tY2hlY2stbGFiZWwnIH0pIDogbnVsbFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGxhYmVsQWZ0ZXIgPT09IGZhbHNlIHx8IGxhYmVsQWZ0ZXIgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5yZXZlcnNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoaWxkcmVuLnB1c2godXRpbF8xLnJlbmRlck1lc3NhZ2VOb2RlKHRoaXMucHJvcGVydGllcykpO1xyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAnZm9ybS1jaGVjaycsXHJcbiAgICAgICAgICAgICAgICBzaXplID8gdXRpbF8xLmZvcm1TaXplTWFwW3NpemVdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgZmx1aWQgPT09IHRydWUgfHwgZmx1aWQgPT09ICd0cnVlJyA/IHVuZGVmaW5lZCA6ICdmb3JtLWNoZWNrLWlubGluZSdcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgIH0sIGNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBDaGVja2JveEJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItY2hlY2tib3gnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICdjaGVja2VkJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAnbGFiZWxBZnRlcicsXHJcbiAgICAgICAgICAgICAgICAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICdyZWFkT25seScsXHJcbiAgICAgICAgICAgICAgICAnZmx1aWQnLFxyXG4gICAgICAgICAgICAgICAgJ3NpemUnLFxyXG4gICAgICAgICAgICAgICAgJ2ludmFsaWRNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICd2YWxpZE1lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2lzSW5BZGRvbicsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdmbG9hdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBDaGVja2JveEJhc2UpO1xyXG4gICAgcmV0dXJuIENoZWNrYm94QmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5DaGVja2JveEJhc2UgPSBDaGVja2JveEJhc2U7XHJcbnZhciBDaGVja2JveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKENoZWNrYm94LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ2hlY2tib3goKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENoZWNrYm94O1xyXG59KENoZWNrYm94QmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBDaGVja2JveDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9zdHlsZXMvY2hlY2tib3gubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzJJN0w3SGw2XCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvY2hlY2tib3hcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbW1vbi9iYXNlLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInRleHREZWNvcmF0aW9uVW5kZXJsaW5lXCI6XCJfMURVclhnbVhcIixcInRleHREZWNvcmF0aW9uTGluZVRocm91Z2hcIjpcIlVuX3k4Sm1UXCIsXCJ0ZXh0RGVjb3JhdGlvbk92ZXJsaW5lXCI6XCJfMkExdGxBNllcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9iYXNlXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vYmFzZS5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vYmFzZS5tLmNzc1wiKTtcclxuZnVuY3Rpb24gZ2V0U3BhY2luZ0NsYXNzZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIG1hcmdpblRvcCA9IHByb3BlcnRpZXMubWFyZ2luVG9wLCBtYXJnaW5Cb3R0b20gPSBwcm9wZXJ0aWVzLm1hcmdpbkJvdHRvbSwgbWFyZ2luTGVmdCA9IHByb3BlcnRpZXMubWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgPSBwcm9wZXJ0aWVzLm1hcmdpblJpZ2h0LCBwYWRkaW5nVG9wID0gcHJvcGVydGllcy5wYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tID0gcHJvcGVydGllcy5wYWRkaW5nQm90dG9tLCBwYWRkaW5nTGVmdCA9IHByb3BlcnRpZXMucGFkZGluZ0xlZnQsIHBhZGRpbmdSaWdodCA9IHByb3BlcnRpZXMucGFkZGluZ1JpZ2h0O1xyXG4gICAgdmFyIHNwYWNpbmdDbGFzc2VzID0gW107XHJcbiAgICBpZiAobWFyZ2luVG9wICYmXHJcbiAgICAgICAgbWFyZ2luVG9wICE9ICdkZWZhdWx0JyAmJlxyXG4gICAgICAgIG1hcmdpblRvcCA9PT0gbWFyZ2luQm90dG9tICYmXHJcbiAgICAgICAgbWFyZ2luVG9wID09PSBtYXJnaW5MZWZ0ICYmXHJcbiAgICAgICAgbWFyZ2luVG9wID09PSBtYXJnaW5SaWdodCkge1xyXG4gICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJtLVwiICsgbWFyZ2luVG9wKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChtYXJnaW5Ub3AgJiYgbWFyZ2luVG9wICE9ICdkZWZhdWx0JyAmJiBtYXJnaW5Ub3AgPT09IG1hcmdpbkJvdHRvbSkge1xyXG4gICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibXktXCIgKyBtYXJnaW5Ub3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG1hcmdpblRvcCAmJiBtYXJnaW5Ub3AgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibXQtXCIgKyBtYXJnaW5Ub3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXJnaW5Cb3R0b20gJiYgbWFyZ2luQm90dG9tICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcIm1iLVwiICsgbWFyZ2luQm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFyZ2luTGVmdCAmJiBtYXJnaW5MZWZ0ICE9ICdkZWZhdWx0JyAmJiBtYXJnaW5MZWZ0ID09PSBtYXJnaW5SaWdodCkge1xyXG4gICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibXgtXCIgKyBtYXJnaW5MZWZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChtYXJnaW5MZWZ0ICYmIG1hcmdpbkxlZnQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibWwtXCIgKyBtYXJnaW5MZWZ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFyZ2luUmlnaHQgJiYgbWFyZ2luUmlnaHQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibXItXCIgKyBtYXJnaW5SaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGFkZGluZ1RvcCAmJlxyXG4gICAgICAgIHBhZGRpbmdUb3AgIT0gJ2RlZmF1bHQnICYmXHJcbiAgICAgICAgcGFkZGluZ1RvcCA9PT0gcGFkZGluZ0JvdHRvbSAmJlxyXG4gICAgICAgIHBhZGRpbmdUb3AgPT09IHBhZGRpbmdMZWZ0ICYmXHJcbiAgICAgICAgcGFkZGluZ1RvcCA9PT0gcGFkZGluZ1JpZ2h0KSB7XHJcbiAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcInAtXCIgKyBwYWRkaW5nVG9wKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChwYWRkaW5nVG9wICYmIHBhZGRpbmdUb3AgIT0gJ2RlZmF1bHQnICYmIHBhZGRpbmdUb3AgPT09IHBhZGRpbmdCb3R0b20pIHtcclxuICAgICAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcInB5LVwiICsgcGFkZGluZ1RvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocGFkZGluZ1RvcCAmJiBwYWRkaW5nVG9wICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcInB0LVwiICsgcGFkZGluZ1RvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhZGRpbmdCb3R0b20gJiYgcGFkZGluZ0JvdHRvbSAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJwYi1cIiArIHBhZGRpbmdCb3R0b20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWRkaW5nTGVmdCAmJiBwYWRkaW5nTGVmdCAhPSAnZGVmYXVsdCcgJiYgcGFkZGluZ0xlZnQgPT09IHBhZGRpbmdSaWdodCkge1xyXG4gICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicHgtXCIgKyBwYWRkaW5nTGVmdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocGFkZGluZ0xlZnQgJiYgcGFkZGluZ0xlZnQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicGwtXCIgKyBwYWRkaW5nTGVmdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhZGRpbmdSaWdodCAmJiBwYWRkaW5nUmlnaHQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicHItXCIgKyBwYWRkaW5nUmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNwYWNpbmdDbGFzc2VzO1xyXG59XHJcbmV4cG9ydHMuZ2V0U3BhY2luZ0NsYXNzZXMgPSBnZXRTcGFjaW5nQ2xhc3NlcztcclxuZnVuY3Rpb24gZ2V0RmxleENvbnRhaW5lckNsYXNzZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIGZsZXhEaXJlY3Rpb24gPSBwcm9wZXJ0aWVzLmZsZXhEaXJlY3Rpb24sIHJldmVyc2UgPSBwcm9wZXJ0aWVzLnJldmVyc2UsIGp1c3RpZnlJdGVtcyA9IHByb3BlcnRpZXMuanVzdGlmeUl0ZW1zLCBhbGlnbkl0ZW1zID0gcHJvcGVydGllcy5hbGlnbkl0ZW1zLCBmbGV4V3JhcCA9IHByb3BlcnRpZXMuZmxleFdyYXAsIGFsaWduQ29udGVudCA9IHByb3BlcnRpZXMuYWxpZ25Db250ZW50O1xyXG4gICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICBpZiAoZmxleERpcmVjdGlvbiAmJiBmbGV4RGlyZWN0aW9uICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGlmIChyZXZlcnNlID09PSB0cnVlIHx8IHJldmVyc2UgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3Nlcy5wdXNoKFwiZmxleC1cIiArIGZsZXhEaXJlY3Rpb24gKyBcIi1yZXZlcnNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMucHVzaChcImZsZXgtXCIgKyBmbGV4RGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoanVzdGlmeUl0ZW1zICYmIGp1c3RpZnlJdGVtcyAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3Nlcy5wdXNoKFwianVzdGlmeS1jb250ZW50LVwiICsganVzdGlmeUl0ZW1zKTtcclxuICAgIH1cclxuICAgIGlmIChhbGlnbkl0ZW1zICYmIGFsaWduSXRlbXMgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMucHVzaChcImFsaWduLWl0ZW1zLVwiICsgYWxpZ25JdGVtcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmxleFdyYXAgJiYgZmxleFdyYXAgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgaWYgKGZsZXhXcmFwID09ICdyZXZlcnNlV3JhcCcpIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMucHVzaCgnZmxleC13cmFwLXJldmVyc2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzLnB1c2goXCJmbGV4LVwiICsgZmxleFdyYXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChhbGlnbkNvbnRlbnQgJiYgYWxpZ25Db250ZW50ICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzLnB1c2goXCJhbGlnbi1jb250ZW50LVwiICsgYWxpZ25Db250ZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmbGV4Q29udGFpbmVyQ2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldEZsZXhDb250YWluZXJDbGFzc2VzID0gZ2V0RmxleENvbnRhaW5lckNsYXNzZXM7XHJcbmZ1bmN0aW9uIGdldEZsZXhJdGVtQ2xhc3Nlcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgYWxpZ25TZWxmID0gcHJvcGVydGllcy5hbGlnblNlbGYsIG9yZGVyID0gcHJvcGVydGllcy5vcmRlcjtcclxuICAgIHZhciBmbGV4SXRlbUNsYXNzZXMgPSBbXTtcclxuICAgIGlmIChhbGlnblNlbGYgJiYgYWxpZ25TZWxmICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGZsZXhJdGVtQ2xhc3Nlcy5wdXNoKFwiYWxpZ24tc2VsZi1cIiArIGFsaWduU2VsZik7XHJcbiAgICB9XHJcbiAgICBpZiAoKG9yZGVyICYmIG9yZGVyICE9ICdkZWZhdWx0JykgfHwgb3JkZXIgPT09IDApIHtcclxuICAgICAgICBmbGV4SXRlbUNsYXNzZXMucHVzaChcIm9yZGVyLVwiICsgb3JkZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZsZXhJdGVtQ2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldEZsZXhJdGVtQ2xhc3NlcyA9IGdldEZsZXhJdGVtQ2xhc3NlcztcclxuZnVuY3Rpb24gZ2V0Qm9yZGVyQ2xhc3Nlcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgYm9yZGVyTGVmdCA9IHByb3BlcnRpZXMuYm9yZGVyTGVmdCwgYm9yZGVyVG9wID0gcHJvcGVydGllcy5ib3JkZXJUb3AsIGJvcmRlclJpZ2h0ID0gcHJvcGVydGllcy5ib3JkZXJSaWdodCwgYm9yZGVyQm90dG9tID0gcHJvcGVydGllcy5ib3JkZXJCb3R0b20sIGJvcmRlckNvbG9yID0gcHJvcGVydGllcy5ib3JkZXJDb2xvciwgYm9yZGVyUm91bmQgPSBwcm9wZXJ0aWVzLmJvcmRlclJvdW5kO1xyXG4gICAgdmFyIGJvcmRlckNsYXNzZXMgPSBbXTtcclxuICAgIGlmIChib3JkZXJMZWZ0ID09PSB0cnVlIHx8IGJvcmRlckxlZnQgPT09ICd0cnVlJykge1xyXG4gICAgICAgIGJvcmRlckNsYXNzZXMucHVzaCgnYm9yZGVyLWxlZnQnKTtcclxuICAgIH1cclxuICAgIGlmIChib3JkZXJUb3AgPT09IHRydWUgfHwgYm9yZGVyVG9wID09PSAndHJ1ZScpIHtcclxuICAgICAgICBib3JkZXJDbGFzc2VzLnB1c2goJ2JvcmRlci10b3AnKTtcclxuICAgIH1cclxuICAgIGlmIChib3JkZXJSaWdodCA9PT0gdHJ1ZSB8fCBib3JkZXJSaWdodCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgYm9yZGVyQ2xhc3Nlcy5wdXNoKCdib3JkZXItcmlnaHQnKTtcclxuICAgIH1cclxuICAgIGlmIChib3JkZXJCb3R0b20gPT09IHRydWUgfHwgYm9yZGVyQm90dG9tID09PSAndHJ1ZScpIHtcclxuICAgICAgICBib3JkZXJDbGFzc2VzLnB1c2goJ2JvcmRlci1ib3R0b20nKTtcclxuICAgIH1cclxuICAgIGlmIChib3JkZXJDbGFzc2VzLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgIGJvcmRlckNsYXNzZXMgPSBbJ2JvcmRlciddO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlckNvbG9yICYmIGJvcmRlckNvbG9yICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGJvcmRlckNsYXNzZXMucHVzaChcImJvcmRlci1cIiArIGJvcmRlckNvbG9yKTtcclxuICAgIH1cclxuICAgIGlmIChib3JkZXJSb3VuZCkge1xyXG4gICAgICAgIGlmIChib3JkZXJSb3VuZCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIGJvcmRlckNsYXNzZXMucHVzaCgncm91bmRlZC0wJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGJvcmRlclJvdW5kID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICBib3JkZXJDbGFzc2VzLnB1c2goJ3JvdW5kZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJvcmRlckNsYXNzZXMucHVzaChcInJvdW5kZWQtXCIgKyBib3JkZXJSb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvcmRlckNsYXNzZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRCb3JkZXJDbGFzc2VzID0gZ2V0Qm9yZGVyQ2xhc3NlcztcclxuZnVuY3Rpb24gZ2V0VGV4dENsYXNzZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIGZvbnRXZWlnaHQgPSBwcm9wZXJ0aWVzLmZvbnRXZWlnaHQsIGZvbnRJdGFsaWMgPSBwcm9wZXJ0aWVzLmZvbnRJdGFsaWMsIGFsaWdubWVudCA9IHByb3BlcnRpZXMuYWxpZ25tZW50LCB0cmFuc2Zvcm0gPSBwcm9wZXJ0aWVzLnRyYW5zZm9ybSwgdHJ1bmNhdGUgPSBwcm9wZXJ0aWVzLnRydW5jYXRlLCB3cmFwID0gcHJvcGVydGllcy53cmFwO1xyXG4gICAgdmFyIHRleHRDbGFzc2VzID0gW107XHJcbiAgICBpZiAoZm9udFdlaWdodCAmJiBmb250V2VpZ2h0ICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goXCJmb250LXdlaWdodC1cIiArIGZvbnRXZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZvbnRJdGFsaWMgPT09IHRydWUgfHwgZm9udEl0YWxpYyA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaCgnZm9udC1pdGFsaWMnKTtcclxuICAgIH1cclxuICAgIGlmIChhbGlnbm1lbnQgJiYgYWxpZ25tZW50ICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goXCJ0ZXh0LVwiICsgYWxpZ25tZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goXCJ0ZXh0LVwiICsgdHJhbnNmb3JtKTtcclxuICAgIH1cclxuICAgIGlmICh0cnVuY2F0ZSAmJiB0cnVuY2F0ZSAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICB0ZXh0Q2xhc3Nlcy5wdXNoKCd0ZXh0LXRydW5jYXRlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAod3JhcCkge1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goJ3RleHQtbm93cmFwJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dENsYXNzZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRUZXh0Q2xhc3NlcyA9IGdldFRleHRDbGFzc2VzO1xyXG5mdW5jdGlvbiBnZXRUZXh0U3R5bGVzKHByb3BlcnRpZXMpIHtcclxuICAgIHZhciB0cnVuY2F0ZSA9IHByb3BlcnRpZXMudHJ1bmNhdGUsIHdyYXAgPSBwcm9wZXJ0aWVzLndyYXA7XHJcbiAgICB2YXIgdGV4dFN0eWxlcyA9IHt9O1xyXG4gICAgaWYgKHRydW5jYXRlICYmIHRydW5jYXRlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdHJ1bmNhdGUgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgdGV4dFN0eWxlcy5tYXhXaWR0aCA9IHRydW5jYXRlICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dFN0eWxlcy5tYXhXaWR0aCA9IFwiXCIgKyB0cnVuY2F0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAod3JhcCkge1xyXG4gICAgICAgIHRleHRTdHlsZXMud2lkdGggPSB3cmFwICsgXCJyZW1cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0U3R5bGVzO1xyXG59XHJcbmV4cG9ydHMuZ2V0VGV4dFN0eWxlcyA9IGdldFRleHRTdHlsZXM7XHJcbmV4cG9ydHMudGV4dERlY29yYXRpb25NYXAgPSB7XHJcbiAgICB1bmRlcmxpbmU6ICd0ZXh0RGVjb3JhdGlvblVuZGVybGluZScsXHJcbiAgICBvdmVybGluZTogJ3RleHREZWNvcmF0aW9uT3ZlcmxpbmUnLFxyXG4gICAgbGluZVRocm91Z2g6ICd0ZXh0RGVjb3JhdGlvbkxpbmVUaHJvdWdoJyxcclxuICAgIGRlZmF1bHQ6ICcnXHJcbn07XHJcbmZ1bmN0aW9uIGdldFRleHREZWNvcmF0aW9uQ2xhc3MocHJvcGVydGllcykge1xyXG4gICAgdmFyIHRleHREZWNvcmF0aW9uID0gcHJvcGVydGllcy50ZXh0RGVjb3JhdGlvbjtcclxuICAgIHZhciB0ZXh0Q2xhc3NlcyA9IFtdO1xyXG4gICAgaWYgKHRleHREZWNvcmF0aW9uICYmIHRleHREZWNvcmF0aW9uICE9PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICB2YXIgdGV4dERlY29yYXRpb25DbGFzcyA9IGV4cG9ydHMudGV4dERlY29yYXRpb25NYXBbdGV4dERlY29yYXRpb25dO1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goY3NzW3RleHREZWNvcmF0aW9uQ2xhc3NdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0Q2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldFRleHREZWNvcmF0aW9uQ2xhc3MgPSBnZXRUZXh0RGVjb3JhdGlvbkNsYXNzO1xyXG5mdW5jdGlvbiBnZXRDb2xvcnNDbGFzc2VzKHByb3BlcnRpZXMpIHtcclxuICAgIHZhciB0ZXh0Q29sb3IgPSBwcm9wZXJ0aWVzLnRleHRDb2xvciwgYmFja2dyb3VuZENvbG9yID0gcHJvcGVydGllcy5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB2YXIgY29sb3JzQ2xhc3NlcyA9IFtdO1xyXG4gICAgaWYgKHRleHRDb2xvciAmJiB0ZXh0Q29sb3IgIT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGNvbG9yc0NsYXNzZXMucHVzaChcInRleHQtXCIgKyB0ZXh0Q29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJhY2tncm91bmRDb2xvciAmJiBiYWNrZ3JvdW5kQ29sb3IgIT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGNvbG9yc0NsYXNzZXMucHVzaChcImJnLVwiICsgYmFja2dyb3VuZENvbG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2xvcnNDbGFzc2VzO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q29sb3JzQ2xhc3NlcyA9IGdldENvbG9yc0NsYXNzZXM7XHJcbmZ1bmN0aW9uIGdldEZsb2F0Q2xhc3MocHJvcGVydGllcykge1xyXG4gICAgdmFyIGZsb2F0ID0gcHJvcGVydGllcy5mbG9hdDtcclxuICAgIHZhciBmbG9hdENsYXNzZXMgPSBbXTtcclxuICAgIGlmIChmbG9hdCAmJiBmbG9hdCAhPT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgZmxvYXRDbGFzc2VzLnB1c2goXCJmbG9hdC1cIiArIGZsb2F0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmbG9hdENsYXNzZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRGbG9hdENsYXNzID0gZ2V0RmxvYXRDbGFzcztcclxuZnVuY3Rpb24gcmVuZGVyTWVzc2FnZU5vZGUocHJvcGVydGllcykge1xyXG4gICAgdmFyIGludmFsaWRNZXNzYWdlID0gcHJvcGVydGllcy5pbnZhbGlkTWVzc2FnZSwgdmFsaWRNZXNzYWdlID0gcHJvcGVydGllcy52YWxpZE1lc3NhZ2U7XHJcbiAgICBpZiAoIWludmFsaWRNZXNzYWdlICYmICF2YWxpZE1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgIGNsYXNzZXM6IFtpbnZhbGlkTWVzc2FnZSA/ICdpbnZhbGlkLXRvb2x0aXAnIDogdmFsaWRNZXNzYWdlID8gJ3ZhbGlkLXRvb2x0aXAnIDogJyddXHJcbiAgICB9LCBbaW52YWxpZE1lc3NhZ2UgPyBpbnZhbGlkTWVzc2FnZSA6IHZhbGlkTWVzc2FnZSA/IHZhbGlkTWVzc2FnZSA6ICcnXSk7XHJcbn1cclxuZXhwb3J0cy5yZW5kZXJNZXNzYWdlTm9kZSA9IHJlbmRlck1lc3NhZ2VOb2RlO1xyXG5leHBvcnRzLmZvcm1TaXplTWFwID0ge1xyXG4gICAgc21hbGw6ICdmb3JtLWNvbnRyb2wtc20nLFxyXG4gICAgbGFyZ2U6ICdmb3JtLWNvbnRyb2wtbGcnLFxyXG4gICAgZGVmYXVsdDogJydcclxufTtcclxuZXhwb3J0cy5kaXNwbGF5TWFwID0ge1xyXG4gICAgbm9uZTogJ2Qtbm9uZScsXHJcbiAgICBpbmxpbmU6ICdkLWlubGluZScsXHJcbiAgICBpbmxpbmVCbG9jazogJ2QtaW5saW5lLWJsb2NrJyxcclxuICAgIGJsb2NrOiAnZC1ibG9jaycsXHJcbiAgICB0YWJsZTogJ2QtdGFibGUnLFxyXG4gICAgdGFibGVDZWxsOiAnZC10YWJsZS1jZWxsJyxcclxuICAgIHRhYmxlUm93OiAnZC10YWJsZS1yb3cnLFxyXG4gICAgZmxleDogJ2QtZmxleCcsXHJcbiAgICBpbmxpbmVGbGV4OiAnZC1pbmxpbmUtZmxleCcsXHJcbiAgICBkZWZhdWx0OiAnJ1xyXG59O1xyXG5mdW5jdGlvbiBnZXREaXNwbGF5Q2xhc3MocHJvcGVydGllcykge1xyXG4gICAgdmFyIGRpc3BsYXkgPSBwcm9wZXJ0aWVzLmRpc3BsYXk7XHJcbiAgICByZXR1cm4gZXhwb3J0cy5kaXNwbGF5TWFwW2Rpc3BsYXldIHx8IHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnRzLmdldERpc3BsYXlDbGFzcyA9IGdldERpc3BsYXlDbGFzcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL3V0aWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvY29udGFpbmVyLm0uY3NzXCIpO1xyXG52YXIgc3RyaW5nXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9zdHJpbmdcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIENvbnRhaW5lckJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDb250YWluZXJCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ29udGFpbmVyQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBDb250YWluZXJCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjb250YWluZXInO1xyXG4gICAgfTtcclxuICAgIENvbnRhaW5lckJhc2UucHJvdG90eXBlLl9nZXRNYXhXaWR0aFN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWF4V2lkdGggPSB0aGlzLnByb3BlcnRpZXMubWF4V2lkdGg7XHJcbiAgICAgICAgdmFyIG1heFdpZHRoU3R5bGVzID0ge307XHJcbiAgICAgICAgaWYgKG1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWF4V2lkdGggPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyaW5nXzEuZW5kc1dpdGgobWF4V2lkdGgsICclJykpIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aFN0eWxlcy5tYXhXaWR0aCA9IG1heFdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXhXaWR0aFN0eWxlcy5tYXhXaWR0aCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFdpZHRoU3R5bGVzO1xyXG4gICAgfTtcclxuICAgIENvbnRhaW5lckJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIGZsdWlkID0gX2EuZmx1aWQ7XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzID0gZmx1aWQgPT09IHRydWUgfHwgZmx1aWQgPT09ICd0cnVlJyA/ICdjb250YWluZXItZmx1aWQnIDogJ2NvbnRhaW5lcic7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbdGhpcy50aGVtZShjc3Mucm9vdCksIGNzc0NsYXNzXSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0aGlzLl9nZXRNYXhXaWR0aFN0eWxlcygpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgQ29udGFpbmVyQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1jb250YWluZXInLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogWyd3aWRnZXRJZCcsICdmbHVpZCcsICdtYXhXaWR0aCddLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIENvbnRhaW5lckJhc2UpO1xyXG4gICAgcmV0dXJuIENvbnRhaW5lckJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuQ29udGFpbmVyQmFzZSA9IENvbnRhaW5lckJhc2U7XHJcbnZhciBDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENvbnRhaW5lcjtcclxufShDb250YWluZXJCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IENvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb250YWluZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb250YWluZXIvc3R5bGVzL2NvbnRhaW5lci5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJ4d3JJQVljYVwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2NvbnRhaW5lclwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29udGFpbmVyL3N0eWxlcy9jb250YWluZXIubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2Zvb3Rlci5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgRm9vdGVyQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEZvb3RlckJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGb290ZXJCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEZvb3RlckJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvb3Rlcic7XHJcbiAgICB9O1xyXG4gICAgRm9vdGVyQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KVxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgZmxleENvbnRhaW5lckNsYXNzZXMpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHV0aWxfMS5nZXRUZXh0U3R5bGVzKHRoaXMucHJvcGVydGllcylcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBGb290ZXJCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWZvb3RlcicsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udFdlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udEl0YWxpYycsXHJcbiAgICAgICAgICAgICAgICAndGV4dERlY29yYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cnVuY2F0ZScsXHJcbiAgICAgICAgICAgICAgICAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnZmxleERpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAncmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAnanVzdGlmeUl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdmbGV4V3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25Db250ZW50J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIEZvb3RlckJhc2UpO1xyXG4gICAgcmV0dXJuIEZvb3RlckJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuRm9vdGVyQmFzZSA9IEZvb3RlckJhc2U7XHJcbnZhciBGb290ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEZvb3RlcjtcclxufShGb290ZXJCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEZvb3RlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9mb290ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9mb290ZXIvc3R5bGVzL2Zvb3Rlci5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMUE1bzQ3VTFcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9mb290ZXJcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9mb290ZXIvc3R5bGVzL2Zvb3Rlci5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzc1wiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgR3JpZENvbHVtbkJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhHcmlkQ29sdW1uQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEdyaWRDb2x1bW5CYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEdyaWRDb2x1bW5CYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdncmlkLWNvbHVtbic7XHJcbiAgICB9O1xyXG4gICAgR3JpZENvbHVtbkJhc2UucHJvdG90eXBlLl9nZXRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgb2Zmc2V0ID0gX2Eub2Zmc2V0LCBjb2xzcGFuID0gX2EuY29sc3BhbjtcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChjb2xzcGFuICYmIGNvbHNwYW4gIT09ICdkZWZhdWx0JyAmJiBjb2xzcGFuICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaChcImNvbC1cIiArIGNvbHNwYW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdjb2wnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChvZmZzZXQgJiYgb2Zmc2V0ICE9PSAnZGVmYXVsdCcpIHx8IG9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goXCJvZmZzZXQtXCIgKyBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcclxuICAgIH07XHJcbiAgICBHcmlkQ29sdW1uQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KVxyXG4gICAgICAgICAgICBdLCB0aGlzLl9nZXRDbGFzc2VzKCksIHV0aWxfMS5nZXRCb3JkZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dENsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcywgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0c2xpYl8xLl9fYXNzaWduKHt9LCB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIEdyaWRDb2x1bW5CYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWdyaWQtY29sdW1uJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnb2Zmc2V0JyxcclxuICAgICAgICAgICAgICAgICdjb2xzcGFuJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckNvbG9yJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJSb3VuZCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250V2VpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250SXRhbGljJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25tZW50JyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ3RydW5jYXRlJyxcclxuICAgICAgICAgICAgICAgICd3cmFwJyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdmbGV4RGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICdyZXZlcnNlJyxcclxuICAgICAgICAgICAgICAgICdqdXN0aWZ5SXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduSXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhXcmFwJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkNvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgR3JpZENvbHVtbkJhc2UpO1xyXG4gICAgcmV0dXJuIEdyaWRDb2x1bW5CYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkdyaWRDb2x1bW5CYXNlID0gR3JpZENvbHVtbkJhc2U7XHJcbnZhciBHcmlkQ29sdW1uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JpZENvbHVtbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEdyaWRDb2x1bW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEdyaWRDb2x1bW47XHJcbn0oR3JpZENvbHVtbkJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gR3JpZENvbHVtbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9zdHlsZXMvZ3JpZC1jb2x1bW4ubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzE3ZEVfeUFEXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW5cIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2dyaWQtcm93Lm0uY3NzXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBHcmlkUm93QmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEdyaWRSb3dCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR3JpZFJvd0Jhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgR3JpZFJvd0Jhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2dyaWQtcm93JztcclxuICAgIH07XHJcbiAgICBHcmlkUm93QmFzZS5wcm90b3R5cGUuX2dldEd1dHRlcnNDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBndXR0ZXJzID0gdGhpcy5wcm9wZXJ0aWVzLmd1dHRlcnM7XHJcbiAgICAgICAgdmFyIGd1dHRlcnNDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGd1dHRlcnMgPT09IGZhbHNlIHx8IGd1dHRlcnMgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgZ3V0dGVyc0NsYXNzZXMucHVzaCgnbm8tZ3V0dGVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3V0dGVyc0NsYXNzZXM7XHJcbiAgICB9O1xyXG4gICAgR3JpZFJvd0Jhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIGRpc3BsYXkgPSBfYS5kaXNwbGF5O1xyXG4gICAgICAgIHZhciBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXNwbGF5ICYmIChkaXNwbGF5ID09PSAnZmxleCcgfHwgZGlzcGxheSA9PT0gJ2lubGluZUZsZXgnKSkge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IHV0aWxfMS5nZXRGbGV4Q29udGFpbmVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAncm93J1xyXG4gICAgICAgICAgICBdLCB0aGlzLl9nZXRHdXR0ZXJzQ2xhc3NlcygpLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcywgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIEdyaWRSb3dCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWdyaWQtcm93JyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnZ3V0dGVycycsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdmbGV4RGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICdyZXZlcnNlJyxcclxuICAgICAgICAgICAgICAgICdqdXN0aWZ5SXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduSXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhXcmFwJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkNvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgR3JpZFJvd0Jhc2UpO1xyXG4gICAgcmV0dXJuIEdyaWRSb3dCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkdyaWRSb3dCYXNlID0gR3JpZFJvd0Jhc2U7XHJcbnZhciBHcmlkUm93ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JpZFJvdywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEdyaWRSb3coKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEdyaWRSb3c7XHJcbn0oR3JpZFJvd0Jhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gR3JpZFJvdztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9zdHlsZXMvZ3JpZC1yb3cubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzMtdHRCQ0ZwXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvZ3JpZC1yb3dcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvc3R5bGVzL2dyaWQtcm93Lm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2ltYWdlLm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBJbWFnZUJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhJbWFnZUJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBJbWFnZUJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgSW1hZ2VCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpbWFnZSc7XHJcbiAgICB9O1xyXG4gICAgSW1hZ2VCYXNlLnByb3RvdHlwZS5nZXRJbWdDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgZmx1aWQgPSBfYS5mbHVpZCwgdGh1bWJuYWlsID0gX2EudGh1bWJuYWlsLCBhbGlnbm1lbnQgPSBfYS5hbGlnbm1lbnQ7XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZmx1aWQgPT09IHRydWUgfHwgZmx1aWQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ2ltZy1mbHVpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGh1bWJuYWlsID09PSB0cnVlIHx8IHRodW1ibmFpbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnaW1nLXRodW1ibmFpbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxpZ25tZW50ICYmIGFsaWdubWVudCAhPT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIGlmIChhbGlnbm1lbnQgPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ214LWF1dG8nKTtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZC1ibG9jaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKFwiZmxvYXQtXCIgKyBhbGlnbm1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xyXG4gICAgfTtcclxuICAgIEltYWdlQmFzZS5wcm90b3R5cGUuZ2V0SW1nU3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBjc3NTdHlsZXMgPSB7fTtcclxuICAgICAgICBpZiAod2lkdGggJiYgd2lkdGggIT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpZHRoID09PSAnbnVtYmVyJyB8fCB3aWR0aC5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy53aWR0aCA9IFwiXCIgKyB3aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGVpZ2h0ICYmIGhlaWdodCAhPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGVpZ2h0ID09PSAnbnVtYmVyJyB8fCBoZWlnaHQuaW5kZXhPZignJScpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy5oZWlnaHQgPSBcIlwiICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjc3NTdHlsZXM7XHJcbiAgICB9O1xyXG4gICAgSW1hZ2VCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBzcmMgPSBfYS5zcmMsIGFsdCA9IF9hLmFsdDtcclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2ltZycsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgICAgICBhbHQ6IGFsdCxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KVxyXG4gICAgICAgICAgICBdLCB0aGlzLmdldEltZ0NsYXNzZXMoKSwgdXRpbF8xLmdldEJvcmRlckNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRzbGliXzEuX19hc3NpZ24oe30sIHRoaXMuZ2V0SW1nU3R5bGVzKCkpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgSW1hZ2VCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWltZycsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsdWlkJyxcclxuICAgICAgICAgICAgICAgICd0aHVtYm5haWwnLFxyXG4gICAgICAgICAgICAgICAgJ3NyYycsXHJcbiAgICAgICAgICAgICAgICAnYWx0JyxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdhbGlnbm1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclJvdW5kJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgSW1hZ2VCYXNlKTtcclxuICAgIHJldHVybiBJbWFnZUJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuSW1hZ2VCYXNlID0gSW1hZ2VCYXNlO1xyXG52YXIgSW1hZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhJbWFnZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEltYWdlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBJbWFnZTtcclxufShJbWFnZUJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gSW1hZ2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2Uvc3R5bGVzL2ltYWdlLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8zQ3JEX0JMelwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2ltYWdlXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL3N0eWxlcy9pbWFnZS5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIGluZGV4XzEgPSByZXF1aXJlKFwiLi4vbGFiZWwvaW5kZXhcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvaW5wdXQtZ3JvdXAubS5jc3NcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbmV4cG9ydHMuc2l6ZU1hcCA9IHtcclxuICAgIHNtYWxsOiAnc20nLFxyXG4gICAgbGFyZ2U6ICdsZydcclxufTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgSW5wdXRHcm91cEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhJbnB1dEdyb3VwQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIElucHV0R3JvdXBCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIElucHV0R3JvdXBCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdpbnB1dC1ncm91cCc7XHJcbiAgICB9O1xyXG4gICAgSW5wdXRHcm91cEJhc2UucHJvdG90eXBlLnJlbmRlcklucHV0R3JvdXAgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBzaXplID0gX2Euc2l6ZSwgbGFiZWwgPSBfYS5sYWJlbCwgZGlzcGxheSA9IF9hLmRpc3BsYXksIGxhYmVsUG9zaXRpb24gPSBfYS5sYWJlbFBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBzaXplQ2xhc3MgPSAnJztcclxuICAgICAgICBpZiAoc2l6ZSAmJiBzaXplICE9PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgc2l6ZUNsYXNzID0gXCJpbnB1dC1ncm91cC1cIiArIGV4cG9ydHMuc2l6ZU1hcFtzaXplXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBrZXkgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IFsnaW5wdXQtZ3JvdXAnLCBzaXplQ2xhc3NdXHJcbiAgICAgICAgICAgIDogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICAnaW5wdXQtZ3JvdXAnLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUNsYXNzXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgaWYgKCEobGFiZWwgJiYgbGFiZWxQb3NpdGlvbiAmJiBsYWJlbFBvc2l0aW9uID09PSAnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLnRoZW1lKGNzcy5yb290KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGxhYmVsXHJcbiAgICAgICAgICAgICAgICA/IGRfMS53KGluZGV4XzEuZGVmYXVsdCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2NvbC1mb3JtLWxhYmVsJywgJ21yLTMnXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3Nlc1xyXG4gICAgICAgICAgICB9LCB0aGlzLnJlT3JkZXJDaGlsZHJlbigpKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgSW5wdXRHcm91cEJhc2UucHJvdG90eXBlLnJlT3JkZXJDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDlsZ7mgKcgcG9zaXRpb24g6ZyA6KaB57uT5ZCI5a2Q6YOo5Lu255qE5L2N572u5p2l5a6e546w5pWI5p6c77yM5pWF5Zyo5q2k55Sx56iL5bqP5qC55o2uIHBvc2l0aW9uIOeahOWAvOadpeiHquWKqOiwg+aVtOWtkOmDqOS7tueahOS9jee9rlxyXG4gICAgICAgIHZhciBwcmVwZW5kQ2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB2YXIgaW5wdXRDaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHZhciBhcHBlbmRDaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkS2V5ID0gY2hpbGROb2RlLnByb3BlcnRpZXMua2V5O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hpbGROb2RlLnByb3BlcnRpZXMucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRLZXkgPT09ICdhZGRvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gJiYgcG9zaXRpb24gPT09ICdhcHBlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXBlbmRDaGlsZHJlbi5wdXNoKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRDaGlsZHJlbi5wdXNoKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZChwcmVwZW5kQ2hpbGRyZW4sIGlucHV0Q2hpbGRyZW4sIGFwcGVuZENoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBJbnB1dEdyb3VwQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgbGFiZWwgPSBfYS5sYWJlbCwgbGFiZWxQb3NpdGlvbiA9IF9hLmxhYmVsUG9zaXRpb24sIGRpc3BsYXkgPSBfYS5kaXNwbGF5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGJvb3RzdHJhcCDkuK3mnInkuInnp40gaW5saW5lIOWunueOsO+8mlxyXG4gICAgICAgICAqIDEuIGlubGluZSBmb3Jtcywg5ZyoIGZvcm0g6KGo5Y2V5aSW5pS+5LiA5LiqIGlubGluZSBmb3JtIOW4g+WxgOeuoeeQhuWZqOWunueOsOeahCznm7jlvZPkuo4gYW5kcm9pZCDnmoTmsLTlubMgbGluZWFybGF5b3V077ybXHJcbiAgICAgICAgICogMi4gY2hlY2tib3ggaW5saW5l77yM55u05o6l5aSE55CG5q+P5LiqIGZvcm0g6KGo5Y2V5ZKMIGxhYmVs77ybXHJcbiAgICAgICAgICogMy4gRm9ybSBHcmlkIOS4reeahCBIb3Jpem9udGFsIGZvcm3vvIzkvb/nlKggR3JpZCDluIPlsYDvvIzkvYbmmK8gTGFiZWwg55qE5a695bqm5peg5rOV5Yqo5oCB6LCD5pW05Li65Lu75oSP5YC844CCXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiDnjrDlnKjkvb/nlKgg56ys5LqM56eN5a6e546w77yM5b2T5pyJ5pu05aW955qE5a6e546w5pe277yM5YaN5a6M5ZaE5q2k5aSE5Luj56CB44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGxhYmVsICYmIGxhYmVsUG9zaXRpb24gJiYgbGFiZWxQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm0tZ3JvdXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ctMTAwJ1xyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgICAgIH0sIHRoaXMucmVuZGVySW5wdXRHcm91cCh1bmRlZmluZWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVySW5wdXRHcm91cCh0aGlzLmdldEtleSgpKTtcclxuICAgIH07XHJcbiAgICBJbnB1dEdyb3VwQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1pbnB1dC1ncm91cCcsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ3NpemUnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbFBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInLFxyXG4gICAgICAgICAgICAgICAgJ2Zsb2F0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIElucHV0R3JvdXBCYXNlKTtcclxuICAgIHJldHVybiBJbnB1dEdyb3VwQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5JbnB1dEdyb3VwQmFzZSA9IElucHV0R3JvdXBCYXNlO1xyXG52YXIgSW5wdXRHcm91cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKElucHV0R3JvdXAsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBJbnB1dEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBJbnB1dEdyb3VwO1xyXG59KElucHV0R3JvdXBCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IElucHV0R3JvdXA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvc3R5bGVzL2lucHV0LWdyb3VwLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9zdHlsZXMvaW5wdXQtZ3JvdXAubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9zdHlsZXMvaW5wdXQtZ3JvdXAubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8zWUw5Y2hZWFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2lucHV0LWdyb3VwXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9zdHlsZXMvaW5wdXQtZ3JvdXAubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9sYWJlbC5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgTGFiZWxCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGFiZWxCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGFiZWxCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIExhYmVsQmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnbGFiZWwnO1xyXG4gICAgfTtcclxuICAgIExhYmVsQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgdmFsdWUgPSBfYS52YWx1ZSwgZm9ySWQgPSBfYS5mb3JJZCwgY2xhc3NlcyA9IF9hLmNsYXNzZXM7XHJcbiAgICAgICAgaWYgKGNsYXNzZXMgJiYgdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBbY2xhc3Nlc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignbGFiZWwnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBmb3I6IGZvcklkLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgICA/IHRzbGliXzEuX19zcHJlYWQoW3RoaXMudGhlbWUoY3NzLnJvb3QpLCBjc3MuZm9udERpcmVjdGlvbl0sIGNsYXNzZXMpIDogW3RoaXMudGhlbWUoY3NzLnJvb3QpLCBjc3MuZm9udERpcmVjdGlvbl1cclxuICAgICAgICB9LCB0c2xpYl8xLl9fc3ByZWFkKFt2YWx1ZV0sIHRoaXMuY2hpbGRyZW4pKTtcclxuICAgIH07XHJcbiAgICBMYWJlbEJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItbGFiZWwnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogWyd3aWRnZXRJZCcsICd2YWx1ZScsICdmb3JJZCddLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIExhYmVsQmFzZSk7XHJcbiAgICByZXR1cm4gTGFiZWxCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkxhYmVsQmFzZSA9IExhYmVsQmFzZTtcclxudmFyIExhYmVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMYWJlbCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTGFiZWw7XHJcbn0oTGFiZWxCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL3N0eWxlcy9sYWJlbC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvc3R5bGVzL2xhYmVsLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvc3R5bGVzL2xhYmVsLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfM2lyY1Azc2RcIixcImZvbnREaXJlY3Rpb25cIjpcInA5a1BBeFRGXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvbGFiZWxcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL3N0eWxlcy9sYWJlbC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvc3R5bGVzL2xhYmVsLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2xpbmsubS5jc3NcIik7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuLi9idXR0b25cIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIExpbmtCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGlua0Jhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMaW5rQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBMaW5rQmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnbGluayc7XHJcbiAgICB9O1xyXG4gICAgTGlua0Jhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIF9iID0gX2EuaHJlZiwgaHJlZiA9IF9iID09PSB2b2lkIDAgPyAnIycgOiBfYiwgdGFyZ2V0ID0gX2EudGFyZ2V0LCB2YWx1ZSA9IF9hLnZhbHVlLCB2YWx1ZVBvc2l0aW9uID0gX2EudmFsdWVQb3NpdGlvbiwgX2MgPSBfYS5pc0xpc3RJdGVtLCBpc0xpc3RJdGVtID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2MsIGFwcGVhcmFuY2UgPSBfYS5hcHBlYXJhbmNlLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGJ1dHRvbl8xLnRhcmdldE1hcFt0YXJnZXRdIHx8IHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuO1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZVBvc2l0aW9uICYmIHZhbHVlUG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRzbGliXzEuX19zcHJlYWQoW3ZhbHVlXSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRzbGliXzEuX19zcHJlYWQodGhpcy5jaGlsZHJlbiwgW3ZhbHVlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignYScsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGhyZWY6IGhyZWYsXHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBpc0xpc3RJdGVtXHJcbiAgICAgICAgICAgICAgICA/IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LWdyb3VwLWl0ZW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImxpc3QtZ3JvdXAtaXRlbS1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcykpIDogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KVxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIExpbmtCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWxpbmsnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdocmVmJyxcclxuICAgICAgICAgICAgICAgICd0YXJnZXQnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZVBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICdpc0xpc3RJdGVtJyxcclxuICAgICAgICAgICAgICAgICdhcHBlYXJhbmNlJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRXZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRJdGFsaWMnLFxyXG4gICAgICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbm1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJ1bmNhdGUnLFxyXG4gICAgICAgICAgICAgICAgJ3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInLFxyXG4gICAgICAgICAgICAgICAgJ3RleHRDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZENvbG9yJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIExpbmtCYXNlKTtcclxuICAgIHJldHVybiBMaW5rQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5MaW5rQmFzZSA9IExpbmtCYXNlO1xyXG52YXIgTGluayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKExpbmssIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMaW5rKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBMaW5rO1xyXG59KExpbmtCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpbms7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saW5rL3N0eWxlcy9saW5rLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMU1OV3M4NURcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9saW5rXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saW5rL3N0eWxlcy9saW5rLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saW5rL3N0eWxlcy9saW5rLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2xpc3QtZ3JvdXAubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIExpc3RHcm91cEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhMaXN0R3JvdXBCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGlzdEdyb3VwQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBMaXN0R3JvdXBCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdsaXN0LWdyb3VwJztcclxuICAgIH07XHJcbiAgICBMaXN0R3JvdXBCYXNlLnByb3RvdHlwZS5nZXRUYWdOYW1lQnlDaGlsZE5vZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhZyA9ICd1bCc7XHJcbiAgICAgICAgdmFyIGV4aXN0TGlzdEl0ZW0gPSBmYWxzZTtcclxuICAgICAgICB2YXIgZXhpc3RCdXR0b25PckxpbmsgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZEtleSA9IGNoaWxkLnByb3BlcnRpZXMua2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkS2V5ID09PSAnbGluaycgfHwgY2hpbGRLZXkgPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnID0gJ2Rpdic7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RCdXR0b25PckxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkS2V5ID09PSAnbGlzdC1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0TGlzdEl0ZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGV4aXN0QnV0dG9uT3JMaW5rICYmIGV4aXN0TGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGlzdEl0ZW0gYW5kIEJ1dHRvbi9MaW5rIGNhbiBub3QgYmUgYWxsb3dlZCBhdCB0aGUgc2FtZSB0aW1lIGluIHRoZSBMaXN0R3JvdXAgd2lkZ2V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWc7XHJcbiAgICB9O1xyXG4gICAgTGlzdEdyb3VwQmFzZS5wcm90b3R5cGUucmVuZGVyQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgICB9O1xyXG4gICAgTGlzdEdyb3VwQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZmx1c2ggPSBfYS5mbHVzaCwgb3JpZW50YXRpb24gPSBfYS5vcmllbnRhdGlvbjtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ3VsJywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbdGhpcy50aGVtZShjc3Mucm9vdCksICdsaXN0LWlubGluZSddLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICAgICAgfSwgdGhpcy5yZW5kZXJDaGlsZHJlbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhZyA9IHRoaXMuZ2V0VGFnTmFtZUJ5Q2hpbGROb2RlKCk7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KHRhZywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdsaXN0LWdyb3VwJyxcclxuICAgICAgICAgICAgICAgIGZsdXNoID09PSB0cnVlIHx8IGZsdXNoID09PSAndHJ1ZScgPyAnbGlzdC1ncm91cC1mbHVzaCcgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgTGlzdEdyb3VwQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1saXN0LWdyb3VwJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLk5PREUsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnZmx1c2gnLFxyXG4gICAgICAgICAgICAgICAgJ29yaWVudGF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgTGlzdEdyb3VwQmFzZSk7XHJcbiAgICByZXR1cm4gTGlzdEdyb3VwQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5MaXN0R3JvdXBCYXNlID0gTGlzdEdyb3VwQmFzZTtcclxudmFyIExpc3RHcm91cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKExpc3RHcm91cCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExpc3RHcm91cCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTGlzdEdyb3VwO1xyXG59KExpc3RHcm91cEJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGlzdEdyb3VwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9zdHlsZXMvbGlzdC1ncm91cC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzIwendzWF9NXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvbGlzdC1ncm91cFwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9zdHlsZXMvbGlzdC1ncm91cC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9zdHlsZXMvbGlzdC1ncm91cC5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9saXN0LWl0ZW0ubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIExpc3RJdGVtQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKExpc3RJdGVtQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExpc3RJdGVtQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBMaXN0SXRlbUJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2xpc3QtaXRlbSc7XHJcbiAgICB9O1xyXG4gICAgTGlzdEl0ZW1CYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBhY3RpdmUgPSBfYS5hY3RpdmUsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIGFwcGVhcmFuY2UgPSBfYS5hcHBlYXJhbmNlLCBkaXNwbGF5ID0gX2EuZGlzcGxheSwgX2IgPSBfYS5vcmllbnRhdGlvbiwgb3JpZW50YXRpb24gPSBfYiA9PT0gdm9pZCAwID8gJ3ZlcnRpY2FsJyA6IF9iO1xyXG4gICAgICAgIHZhciBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXNwbGF5ICYmIChkaXNwbGF5ID09PSAnZmxleCcgfHwgZGlzcGxheSA9PT0gJ2lubGluZUZsZXgnKSkge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IHV0aWxfMS5nZXRGbGV4Q29udGFpbmVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ2xpJywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAnbGlzdC1pbmxpbmUtaXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImxpc3QtZ3JvdXAtaXRlbS1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgZmxleENvbnRhaW5lckNsYXNzZXMsIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogdXRpbF8xLmdldFRleHRTdHlsZXModGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdsaScsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbScsXHJcbiAgICAgICAgICAgICAgICBhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0JyA/IFwibGlzdC1ncm91cC1pdGVtLVwiICsgYXBwZWFyYW5jZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScgPyAnZGlzYWJsZWQnIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlID09PSB0cnVlIHx8IGFjdGl2ZSA9PT0gJ3RydWUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIGZsZXhDb250YWluZXJDbGFzc2VzLCB1dGlsXzEuZ2V0VGV4dENsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHREZWNvcmF0aW9uQ2xhc3ModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSksXHJcbiAgICAgICAgICAgIHN0eWxlczogdXRpbF8xLmdldFRleHRTdHlsZXModGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIExpc3RJdGVtQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1saXN0LWl0ZW0nLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdhY3RpdmUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICdhcHBlYXJhbmNlJyxcclxuICAgICAgICAgICAgICAgICdvcmllbnRhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnZmxleERpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAncmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAnanVzdGlmeUl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdmbGV4V3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25Db250ZW50JyxcclxuICAgICAgICAgICAgICAgICdmb250V2VpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250SXRhbGljJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25tZW50JyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ3RydW5jYXRlJyxcclxuICAgICAgICAgICAgICAgICd3cmFwJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBMaXN0SXRlbUJhc2UpO1xyXG4gICAgcmV0dXJuIExpc3RJdGVtQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5MaXN0SXRlbUJhc2UgPSBMaXN0SXRlbUJhc2U7XHJcbnZhciBMaXN0SXRlbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKExpc3RJdGVtLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGlzdEl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIExpc3RJdGVtO1xyXG59KExpc3RJdGVtQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBMaXN0SXRlbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWl0ZW0vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWl0ZW0vc3R5bGVzL2xpc3QtaXRlbS5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMUFPckNMY1BcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9saXN0LWl0ZW1cIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWl0ZW0vc3R5bGVzL2xpc3QtaXRlbS5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV1aWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL3V1aWRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvcmFkaW8ubS5jc3NcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4uL2xhYmVsXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBSYWRpb0Jhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhSYWRpb0Jhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSYWRpb0Jhc2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fdXVpZCA9IHV1aWRfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUmFkaW9CYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdyYWRpbyc7XHJcbiAgICB9O1xyXG4gICAgUmFkaW9CYXNlLnByb3RvdHlwZS5yZW5kZXJSYWRpbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWUsIGNoZWNrZWQgPSBfYS5jaGVja2VkLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCByZWFkT25seSA9IF9hLnJlYWRPbmx5O1xyXG4gICAgICAgIHZhciBjc3NDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCA9PT0gdHJ1ZSB8fCBjaGVja2VkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICByZWFkT25seTogcmVhZE9ubHkgPT09IHRydWUgfHwgcmVhZE9ubHkgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgY2xhc3NlczogWydmb3JtLWNoZWNrLWlucHV0J11cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBSYWRpb0Jhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbGFiZWwgPSBfYS5sYWJlbCwgc2l6ZSA9IF9hLnNpemUsIGxhYmVsQWZ0ZXIgPSBfYS5sYWJlbEFmdGVyLCBmbHVpZCA9IF9hLmZsdWlkLCBkaXNwbGF5ID0gX2EuZGlzcGxheSwgdmFsdWUgPSBfYS52YWx1ZSwgY2hlY2tlZCA9IF9hLmNoZWNrZWQsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIHJlYWRPbmx5ID0gX2EucmVhZE9ubHksIF9jID0gX2EuaXNJbkFkZG9uLCBpc0luQWRkb24gPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYztcclxuICAgICAgICBpZiAoaXNJbkFkZG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignaW5wdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWQgPT09IHRydWUgfHwgY2hlY2tlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogcmVhZE9ubHkgPT09IHRydWUgfHwgcmVhZE9ubHkgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPyB1dGlsXzEuZm9ybVNpemVNYXBbc2l6ZV0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJhZGlvKCksXHJcbiAgICAgICAgICAgIGxhYmVsID8gZF8xLncobGFiZWxfMS5kZWZhdWx0LCB7IHZhbHVlOiBsYWJlbCwgZm9ySWQ6IHdpZGdldElkLCBjbGFzc2VzOiAnZm9ybS1jaGVjay1sYWJlbCcgfSkgOiBudWxsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAobGFiZWxBZnRlciA9PT0gZmFsc2UgfHwgbGFiZWxBZnRlciA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh1dGlsXzEucmVuZGVyTWVzc2FnZU5vZGUodGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdmb3JtLWNoZWNrJyxcclxuICAgICAgICAgICAgICAgIHNpemUgPyB1dGlsXzEuZm9ybVNpemVNYXBbc2l6ZV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnID8gdW5kZWZpbmVkIDogJ2Zvcm0tY2hlY2staW5saW5lJ1xyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIFJhZGlvQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1yYWRpbycsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ2NoZWNrZWQnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbEFmdGVyJyxcclxuICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICAncmVhZE9ubHknLFxyXG4gICAgICAgICAgICAgICAgJ2ZsdWlkJyxcclxuICAgICAgICAgICAgICAgICdzaXplJyxcclxuICAgICAgICAgICAgICAgICdpbnZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAndmFsaWRNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICdpc0luQWRkb24nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcicsXHJcbiAgICAgICAgICAgICAgICAnZmxvYXQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgUmFkaW9CYXNlKTtcclxuICAgIHJldHVybiBSYWRpb0Jhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuUmFkaW9CYXNlID0gUmFkaW9CYXNlO1xyXG52YXIgUmFkaW8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhSYWRpbywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJhZGlvKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBSYWRpbztcclxufShSYWRpb0Jhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUmFkaW87XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vc3R5bGVzL3JhZGlvLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9zdHlsZXMvcmFkaW8ubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9zdHlsZXMvcmFkaW8ubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xMjZQVGpSWFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL3JhZGlvXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9zdHlsZXMvcmFkaW8ubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV1aWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL3V1aWRcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4uL2xhYmVsXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL3NlbGVjdC5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgU2VsZWN0QmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFNlbGVjdEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3RCYXNlKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX3V1aWQgPSB1dWlkXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFNlbGVjdEJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ3NlbGVjdCc7XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0QmFzZS5wcm90b3R5cGUucmVuZGVyU2VsZWN0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBuYW1lID0gX2EubmFtZSwgdmFsdWUgPSBfYS52YWx1ZSwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgcmVhZE9ubHkgPSBfYS5yZWFkT25seSwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGxhYmVsRmllbGQgPSBfYS5sYWJlbEZpZWxkLCB2YWx1ZUZpZWxkID0gX2EudmFsdWVGaWVsZCwgZGF0YVBhdGggPSBfYS5kYXRhUGF0aCwgc2l6ZSA9IF9hLnNpemUsIGRpc3BsYXkgPSBfYS5kaXNwbGF5LCBsYWJlbCA9IF9hLmxhYmVsLCBsYWJlbFBvc2l0aW9uID0gX2EubGFiZWxQb3NpdGlvbjtcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKHV0aWxfMS5mb3JtU2l6ZU1hcFtzaXplXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZm9ybS1jb250cm9sJyk7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XHJcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8g5LiN5L2/55SoIEpTT04ucGFyc2UoKSDlsIYganNvbiDovazkuLrmlbDnu4TnmoTljp/lm6DmmK8gSlNPTi5wYXJzZSgpIOS4jeaUr+aMgeWNleW8leWPtyzkuJTkuI3mlK/mjIHovazkuYnnrKZcclxuICAgICAgICAgICAgdmFyIG9wdGlvbkpzb24gPSBldmFsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IG9wdGlvbkpzb24ubWFwKGZ1bmN0aW9uIChvcHRpb24sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZF8xLnYoJ29wdGlvbicsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4ICsgdXVpZF8xLmRlZmF1bHQoKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uW3ZhbHVlRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb25bdmFsdWVGaWVsZF0gPT09IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9LCBbb3B0aW9uW2xhYmVsRmllbGRdXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YVBhdGgpIHtcclxuICAgICAgICAgICAgLy9UT0RPOiDlj5HpgIHor7fmsYLvvIzojrflj5bmlbDmja7vvIzmmoLml7bkuI3lpITnkIZcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBrZXkgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IGNzc0NsYXNzZXNcclxuICAgICAgICAgICAgOiB0c2xpYl8xLl9fc3ByZWFkKGNzc0NsYXNzZXMsIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgaWYgKCEobGFiZWwgJiYgbGFiZWxQb3NpdGlvbiAmJiBsYWJlbFBvc2l0aW9uID09PSAnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLnRoZW1lKGNzcy5yb290KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignc2VsZWN0Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHJlcXVpcmVkID09PSB0cnVlIHx8IHJlcXVpcmVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSA9PT0gdHJ1ZSB8fCByZWFkT25seSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIFNlbGVjdEJhc2UucHJvdG90eXBlLnJlbmRlclNlbGVjdFdyYXBwZXIgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIGxhYmVsID0gX2EubGFiZWw7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgICAgID8gZF8xLncobGFiZWxfMS5kZWZhdWx0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcklkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2NvbC1mb3JtLWxhYmVsJywgJ21yLTMnXVxyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2VsZWN0KGtleSksXHJcbiAgICAgICAgICAgIHV0aWxfMS5yZW5kZXJNZXNzYWdlTm9kZSh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgICAgXTtcclxuICAgIH07XHJcbiAgICBTZWxlY3RCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBsYWJlbCA9IF9hLmxhYmVsLCBsYWJlbFBvc2l0aW9uID0gX2EubGFiZWxQb3NpdGlvbiwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYm9vdHN0cmFwIOS4reacieS4ieenjSBpbmxpbmUg5a6e546w77yaXHJcbiAgICAgICAgICogMS4gaW5saW5lIGZvcm1zLCDlnKggZm9ybSDooajljZXlpJbmlL7kuIDkuKogaW5saW5lIGZvcm0g5biD5bGA566h55CG5Zmo5a6e546w55qELOebuOW9k+S6jiBhbmRyb2lkIOeahOawtOW5syBsaW5lYXJsYXlvdXTvvJtcclxuICAgICAgICAgKiAyLiBjaGVja2JveCBpbmxpbmXvvIznm7TmjqXlpITnkIbmr4/kuKogZm9ybSDooajljZXlkowgbGFiZWzvvJtcclxuICAgICAgICAgKiAzLiBGb3JtIEdyaWQg5Lit55qEIEhvcml6b250YWwgZm9ybe+8jOS9v+eUqCBHcmlkIOW4g+WxgO+8jOS9huaYryBMYWJlbCDnmoTlrr3luqbml6Dms5XliqjmgIHosIPmlbTkuLrku7vmhI/lgLzjgIJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIOeOsOWcqOS9v+eUqCDnrKzkuoznp43lrp7njrDvvIzlvZPmnInmm7Tlpb3nmoTlrp7njrDml7bvvIzlho3lrozlloTmraTlpITku6PnoIHjgIJcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAobGFiZWwgJiYgbGFiZWxQb3NpdGlvbiAmJiBsYWJlbFBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAnZm9ybS1ncm91cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm0tY2hlY2staW5saW5lJyxcclxuICAgICAgICAgICAgICAgICAgICAndy0xMDAnXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICAgICAgfSwgdGhpcy5yZW5kZXJTZWxlY3RXcmFwcGVyKHVuZGVmaW5lZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJTZWxlY3RXcmFwcGVyKHRoaXMuZ2V0S2V5KCkpO1xyXG4gICAgfTtcclxuICAgIFNlbGVjdEJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItc2VsZWN0JyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbFBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgJ3JlYWRPbmx5JyxcclxuICAgICAgICAgICAgICAgICdvcHRpb25zJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbEZpZWxkJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZUZpZWxkJyxcclxuICAgICAgICAgICAgICAgICdkYXRhUGF0aCcsXHJcbiAgICAgICAgICAgICAgICAnc2l6ZScsXHJcbiAgICAgICAgICAgICAgICAnaW52YWxpZE1lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJyxcclxuICAgICAgICAgICAgICAgICdmbG9hdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBTZWxlY3RCYXNlKTtcclxuICAgIHJldHVybiBTZWxlY3RCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLlNlbGVjdEJhc2UgPSBTZWxlY3RCYXNlO1xyXG52YXIgU2VsZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoU2VsZWN0LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU2VsZWN0KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBTZWxlY3Q7XHJcbn0oU2VsZWN0QmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBTZWxlY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvc2VsZWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3QvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvc2VsZWN0L3N0eWxlcy9zZWxlY3QubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzNNWTI5RXh5XCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvc2VsZWN0XCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvc2VsZWN0L3N0eWxlcy9zZWxlY3QubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dWlkXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS91dWlkXCIpO1xyXG52YXIgRm9jdXNfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9tZXRhL0ZvY3VzXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuLi9sYWJlbFwiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBUZXh0SW5wdXRCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoVGV4dElucHV0QmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRleHRJbnB1dEJhc2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fZm9jdXNhYmxlSW5wdXRLZXkgPSAnZm9jdXNhYmxlSW5wdXQnO1xyXG4gICAgICAgIF90aGlzLl91dWlkID0gdXVpZF8xLmRlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBUZXh0SW5wdXRCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LWlucHV0JztcclxuICAgIH07XHJcbiAgICBUZXh0SW5wdXRCYXNlLnByb3RvdHlwZS5fb25JbnB1dCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5vbklucHV0ICYmIHRoaXMucHJvcGVydGllcy5vbklucHV0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dElucHV0QmFzZS5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLm9uQ2hhbmdlICYmIHRoaXMucHJvcGVydGllcy5vbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfTtcclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLnJlbmRlcklucHV0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBuYW1lID0gX2EubmFtZSwgdHlwZSA9IF9hLnR5cGUsIHZhbHVlID0gX2EudmFsdWUsIHBhc3N3b3JkID0gX2EucGFzc3dvcmQsIHBsYWNlaG9sZGVyID0gX2EucGxhY2Vob2xkZXIsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIHJlcXVpcmVkID0gX2EucmVxdWlyZWQsIHJlYWRPbmx5ID0gX2EucmVhZE9ubHksIG1heExlbmd0aCA9IF9hLm1heExlbmd0aCwgbWluTGVuZ3RoID0gX2EubWluTGVuZ3RoLCBzaXplID0gX2Euc2l6ZSwgc2hvdWxkRm9jdXMgPSBfYS5zaG91bGRGb2N1cywgcGxhaW5UZXh0ID0gX2EucGxhaW5UZXh0LCBkaXNwbGF5ID0gX2EuZGlzcGxheSwgbGFiZWwgPSBfYS5sYWJlbCwgbGFiZWxQb3NpdGlvbiA9IF9hLmxhYmVsUG9zaXRpb247XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoc2hvdWxkRm9jdXMgPT09IHRydWUgfHwgc2hvdWxkRm9jdXMgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICB0aGlzLm1ldGEoRm9jdXNfMS5kZWZhdWx0KS5zZXQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhc3N3b3JkID09PSB0cnVlIHx8IHBhc3N3b3JkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgdHlwZSA9ICdwYXNzd29yZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKHV0aWxfMS5mb3JtU2l6ZU1hcFtzaXplXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwbGFpblRleHQgPT09IHRydWUgfHwgcGxhaW5UZXh0ID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdmb3JtLWNvbnRyb2wtcGxhaW50ZXh0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ2Zvcm0tY29udHJvbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2xhc3NlcyA9IGtleSA9PT0gdGhpcy5fZm9jdXNhYmxlSW5wdXRLZXlcclxuICAgICAgICAgICAgPyBjc3NDbGFzc2VzXHJcbiAgICAgICAgICAgIDogdHNsaWJfMS5fX3NwcmVhZChjc3NDbGFzc2VzLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpO1xyXG4gICAgICAgIGlmICghKGxhYmVsICYmIGxhYmVsUG9zaXRpb24gJiYgbGFiZWxQb3NpdGlvbiA9PT0gJ2xlZnQnKSkge1xyXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy50aGVtZShjc3Mucm9vdCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlICYmIHR5cGUgIT09ICdkZWZhdWx0JyA/IHR5cGUgOiAnJyxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogcmVxdWlyZWQgPT09IHRydWUgfHwgcmVxdWlyZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHJlYWRPbmx5ID09PSB0cnVlIHx8IHJlYWRPbmx5ID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogbWF4TGVuZ3RoID8gXCJcIiArIG1heExlbmd0aCA6IG51bGwsXHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogbWluTGVuZ3RoID8gXCJcIiArIG1pbkxlbmd0aCA6IG51bGwsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXHJcbiAgICAgICAgICAgIG9uaW5wdXQ6IHRoaXMuX29uSW5wdXQsXHJcbiAgICAgICAgICAgIG9uY2hhbmdlOiB0aGlzLl9vbkNoYW5nZVxyXG4gICAgICAgIH0sIFtdKTtcclxuICAgIH07XHJcbiAgICBUZXh0SW5wdXRCYXNlLnByb3RvdHlwZS5yZW5kZXJUZXh0SW5wdXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIGxhYmVsID0gX2EubGFiZWw7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgICAgID8gZF8xLncobGFiZWxfMS5kZWZhdWx0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcklkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2NvbC1mb3JtLWxhYmVsJywgJ21yLTMnXVxyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySW5wdXQoa2V5KSxcclxuICAgICAgICAgICAgdXRpbF8xLnJlbmRlck1lc3NhZ2VOb2RlKHRoaXMucHJvcGVydGllcylcclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLnJlbmRlckZpbGVJbnB1dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbGFiZWwgPSBfYS5sYWJlbCwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgbmFtZSA9IF9hLm5hbWUsIGRpc3BsYXkgPSBfYS5kaXNwbGF5O1xyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAnY3VzdG9tLWZpbGUnXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICB9LCBbXHJcbiAgICAgICAgICAgIGRfMS52KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnY3VzdG9tLWZpbGUtaW5wdXQnXSxcclxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiB0aGlzLl9vbkNoYW5nZVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgICAgID8gZF8xLncobGFiZWxfMS5kZWZhdWx0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcklkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnY3VzdG9tLWZpbGUtbGFiZWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgICB1dGlsXzEucmVuZGVyTWVzc2FnZU5vZGUodGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfTtcclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHR5cGUgPSBfYS50eXBlLCBsYWJlbCA9IF9hLmxhYmVsLCBsYWJlbFBvc2l0aW9uID0gX2EubGFiZWxQb3NpdGlvbiwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZSA9PT0gJ2ZpbGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZpbGVJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBib290c3RyYXAg5Lit5pyJ5LiJ56eNIGlubGluZSDlrp7njrDvvJpcclxuICAgICAgICAgKiAxLiBpbmxpbmUgZm9ybXMsIOWcqCBmb3JtIOihqOWNleWkluaUvuS4gOS4qiBpbmxpbmUgZm9ybSDluIPlsYDnrqHnkIblmajlrp7njrDnmoQs55u45b2T5LqOIGFuZHJvaWQg55qE5rC05bmzIGxpbmVhcmxheW91dO+8m1xyXG4gICAgICAgICAqIDIuIGNoZWNrYm94IGlubGluZe+8jOebtOaOpeWkhOeQhuavj+S4qiBmb3JtIOihqOWNleWSjCBsYWJlbO+8m1xyXG4gICAgICAgICAqIDMuIEZvcm0gR3JpZCDkuK3nmoQgSG9yaXpvbnRhbCBmb3Jt77yM5L2/55SoIEdyaWQg5biD5bGA77yM5L2G5pivIExhYmVsIOeahOWuveW6puaXoOazleWKqOaAgeiwg+aVtOS4uuS7u+aEj+WAvOOAglxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICog546w5Zyo5L2/55SoIOesrOS6jOenjeWunueOsO+8jOW9k+acieabtOWlveeahOWunueOsOaXtu+8jOWGjeWujOWWhOatpOWkhOS7o+eggeOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChsYWJlbCAmJiBsYWJlbFBvc2l0aW9uICYmIGxhYmVsUG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICdmb3JtLWdyb3VwJyxcclxuICAgICAgICAgICAgICAgICAgICAnZm9ybS1jaGVjay1pbmxpbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICd3LTEwMCdcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9LCB0aGlzLnJlbmRlclRleHRJbnB1dCh0aGlzLl9mb2N1c2FibGVJbnB1dEtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJUZXh0SW5wdXQodGhpcy5nZXRLZXkoKSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dElucHV0QmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi10ZXh0LWlucHV0JyxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICduYW1lJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdwYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbFBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgICAgICAncGxhY2Vob2xkZXJBcHBlYXJhbmNlJyxcclxuICAgICAgICAgICAgICAgICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgJ3JlYWRPbmx5JyxcclxuICAgICAgICAgICAgICAgICdzaXplJyxcclxuICAgICAgICAgICAgICAgICdzaG91bGRGb2N1cycsXHJcbiAgICAgICAgICAgICAgICAncGxhaW5UZXh0JyxcclxuICAgICAgICAgICAgICAgICdtYXhMZW5ndGgnLFxyXG4gICAgICAgICAgICAgICAgJ21pbkxlbmd0aCcsXHJcbiAgICAgICAgICAgICAgICAnaW52YWxpZE1lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJyxcclxuICAgICAgICAgICAgICAgICdmbG9hdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogWydvbklucHV0JywgJ29uQ2hhbmdlJ11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBUZXh0SW5wdXRCYXNlKTtcclxuICAgIHJldHVybiBUZXh0SW5wdXRCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLlRleHRJbnB1dEJhc2UgPSBUZXh0SW5wdXRCYXNlO1xyXG52YXIgVGV4dElucHV0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoVGV4dElucHV0LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVGV4dElucHV0KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBUZXh0SW5wdXQ7XHJcbn0oVGV4dElucHV0QmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBUZXh0SW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQtaW5wdXQvc3R5bGVzL3RleHQtaW5wdXQubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQtaW5wdXQvc3R5bGVzL3RleHQtaW5wdXQubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMkI2SFJSWGhcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi90ZXh0LWlucHV0XCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL3RleHQubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIFRleHRCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoVGV4dEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUZXh0QmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBUZXh0QmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAndGV4dCc7XHJcbiAgICB9O1xyXG4gICAgVGV4dEJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlUG9zaXRpb24gPSBfYS52YWx1ZVBvc2l0aW9uLCB0eXBlID0gX2EudHlwZSwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgdmFyIHRhZztcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmICghdHlwZSkge1xyXG4gICAgICAgICAgICB0YWcgPSAnc3Bhbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICB0YWcgPSAnc3Bhbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdsZWFkJykge1xyXG4gICAgICAgICAgICB0YWcgPSAncCc7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnbGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGFnID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuO1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZVBvc2l0aW9uICYmIHZhbHVlUG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRzbGliXzEuX19zcHJlYWQoW3ZhbHVlXSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRzbGliXzEuX19zcHJlYWQodGhpcy5jaGlsZHJlbiwgW3ZhbHVlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXNwbGF5ICYmIChkaXNwbGF5ID09PSAnZmxleCcgfHwgZGlzcGxheSA9PT0gJ2lubGluZUZsZXgnKSkge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3NlcyA9IHV0aWxfMS5nZXRGbGV4Q29udGFpbmVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYodGFnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIGNzc0NsYXNzZXMsIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dENsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHREZWNvcmF0aW9uQ2xhc3ModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcywgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0c2xpYl8xLl9fYXNzaWduKHt9LCB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgIH0sIGNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBUZXh0QmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi10ZXh0JyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udFdlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udEl0YWxpYycsXHJcbiAgICAgICAgICAgICAgICAndGV4dERlY29yYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cnVuY2F0ZScsXHJcbiAgICAgICAgICAgICAgICAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAndGV4dENvbG9yJyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhEaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3JldmVyc2UnLFxyXG4gICAgICAgICAgICAgICAgJ2p1c3RpZnlJdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25JdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnZmxleFdyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduQ29udGVudCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBUZXh0QmFzZSk7XHJcbiAgICByZXR1cm4gVGV4dEJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuVGV4dEJhc2UgPSBUZXh0QmFzZTtcclxudmFyIFRleHQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhUZXh0LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVGV4dCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVGV4dDtcclxufShUZXh0QmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBUZXh0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC9zdHlsZXMvdGV4dC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzNFMjVQWjFKXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvdGV4dFwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC9zdHlsZXMvdGV4dC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC9zdHlsZXMvdGV4dC5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgc3RyaW5nXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9zdHJpbmdcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL3ZpZXcubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIFZpZXdCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoVmlld0Jhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWaWV3QmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBWaWV3QmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAndmlldyc7XHJcbiAgICB9O1xyXG4gICAgVmlld0Jhc2UucHJvdG90eXBlLl9nZXRNYXhXaWR0aFN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbWF4V2lkdGggPSB0aGlzLnByb3BlcnRpZXMubWF4V2lkdGg7XHJcbiAgICAgICAgdmFyIG1heFdpZHRoU3R5bGVzID0ge307XHJcbiAgICAgICAgaWYgKG1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWF4V2lkdGggPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyaW5nXzEuZW5kc1dpdGgobWF4V2lkdGgsICclJykpIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhXaWR0aFN0eWxlcy5tYXhXaWR0aCA9IG1heFdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhXaWR0aFN0eWxlcztcclxuICAgIH07XHJcbiAgICBWaWV3QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KVxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0Qm9yZGVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgZmxleENvbnRhaW5lckNsYXNzZXMsIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldENvbG9yc0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSksXHJcbiAgICAgICAgICAgIHN0eWxlczogdHNsaWJfMS5fX2Fzc2lnbih7fSwgdXRpbF8xLmdldFRleHRTdHlsZXModGhpcy5wcm9wZXJ0aWVzKSwgdGhpcy5fZ2V0TWF4V2lkdGhTdHlsZXMoKSlcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBWaWV3QmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi12aWV3JyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnbWF4V2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclRvcCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclJvdW5kJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRXZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRJdGFsaWMnLFxyXG4gICAgICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbm1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJ1bmNhdGUnLFxyXG4gICAgICAgICAgICAgICAgJ3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhEaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3JldmVyc2UnLFxyXG4gICAgICAgICAgICAgICAgJ2p1c3RpZnlJdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25JdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnZmxleFdyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduQ29udGVudCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcicsXHJcbiAgICAgICAgICAgICAgICAndGV4dENvbG9yJyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2Zsb2F0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIFZpZXdCYXNlKTtcclxuICAgIHJldHVybiBWaWV3QmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5WaWV3QmFzZSA9IFZpZXdCYXNlO1xyXG52YXIgVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFZpZXcsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWaWV3KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBWaWV3O1xyXG59KFZpZXdCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi92aWV3L3N0eWxlcy92aWV3Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJwZDhyazBGT1wiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL3ZpZXdcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbWFpbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiaW1wb3J0IHsgUHJvamVjdG9yTWl4aW4gfSBmcm9tICdAZG9qby93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yJztcbmltcG9ydCBDaGVja291dEZvcm0gZnJvbSAnLi93aWRnZXRzL0NoZWNrb3V0Rm9ybSc7XG5cbi8vIENyZWF0ZSBhIHByb2plY3RvciB0byBjb252ZXJ0IHRoZSB2aXJ0dWFsIERPTSBwcm9kdWNlZCBieSB0aGUgYXBwbGljYXRpb24gaW50byB0aGUgcmVuZGVyZWQgcGFnZS5cbi8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHN0YXJ0aW5nIHVwIGEgRG9qbyAyIGFwcGxpY2F0aW9uLCB0YWtlIGEgbG9vayBhdFxuLy8gaHR0cHM6Ly9kb2pvLmlvL3R1dG9yaWFscy8wMDJfY3JlYXRpbmdfYW5fYXBwbGljYXRpb24vXG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2hlY2tvdXQtYXBwJyk7XG5pZiAocm9vdCkge1xuXHRjb25zdCBQcm9qZWN0b3IgPSBQcm9qZWN0b3JNaXhpbihDaGVja291dEZvcm0pO1xuXHRjb25zdCBwcm9qZWN0b3IgPSBuZXcgUHJvamVjdG9yKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYXBwZW5kKCkgd2lsbCBhdHRhY2ggdGhlIHJlbmRlcmVkIGNvbnRlbnQgdG8gZG9jdW1lbnQuYm9keS4gIFRvIGluc2VydCB0aGlzIGFwcGxpY2F0aW9uXG5cdC8vIGludG8gZXhpc3RpbmcgSFRNTCBjb250ZW50LCBwYXNzIHRoZSBkZXNpcmVkIHJvb3Qgbm9kZSB0byBhcHBlbmQoKS5cblx0cHJvamVjdG9yLmFwcGVuZChyb290IGFzIEVsZW1lbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9jc3MtbW9kdWxlLWR0cy1sb2FkZXI/dHlwZT10cyZpbnN0YW5jZU5hbWU9MF9kb2pvIS4vc3JjL21haW4udHMiLCJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSAnQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZSc7XHJcbmltcG9ydCB7IFdpZGdldFByb3BlcnRpZXMgfSBmcm9tICdAZG9qby93aWRnZXQtY29yZS9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgdyB9IGZyb20gJ0Bkb2pvL3dpZGdldC1jb3JlL2QnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ3dpZGdldHMtd2ViL2NvbnRhaW5lci9pbmRleCc7XHJcbmltcG9ydCBWaWV3IGZyb20gJ3dpZGdldHMtd2ViL3ZpZXcvaW5kZXgnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnd2lkZ2V0cy13ZWIvaW1hZ2UvaW5kZXgnO1xyXG5pbXBvcnQgVGV4dCBmcm9tICd3aWRnZXRzLXdlYi90ZXh0L2luZGV4JztcclxuaW1wb3J0IEdyaWRSb3cgZnJvbSAnd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvaW5kZXgnO1xyXG5pbXBvcnQgR3JpZENvbHVtbiBmcm9tICd3aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9pbmRleCc7XHJcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9pbmRleCc7XHJcbmltcG9ydCBJbnB1dEdyb3VwIGZyb20gJ3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL2luZGV4JztcclxuaW1wb3J0IEFkZG9uIGZyb20gJ3dpZGdldHMtd2ViL2FkZG9uL2luZGV4JztcclxuaW1wb3J0IFNlbGVjdCBmcm9tICd3aWRnZXRzLXdlYi9zZWxlY3QvaW5kZXgnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnd2lkZ2V0cy13ZWIvY2hlY2tib3gvaW5kZXgnO1xyXG5pbXBvcnQgUmFkaW8gZnJvbSAnd2lkZ2V0cy13ZWIvcmFkaW8vaW5kZXgnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJ3dpZGdldHMtd2ViL2J1dHRvbi9pbmRleCc7XHJcbmltcG9ydCBCYWRnZSBmcm9tICd3aWRnZXRzLXdlYi9iYWRnZS9pbmRleCc7XHJcbmltcG9ydCBMaXN0R3JvdXAgZnJvbSAnd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9pbmRleCc7XHJcbmltcG9ydCBMaXN0SXRlbSBmcm9tICd3aWRnZXRzLXdlYi9saXN0LWl0ZW0vaW5kZXgnO1xyXG5pbXBvcnQgQ2FyZCBmcm9tICd3aWRnZXRzLXdlYi9jYXJkL2luZGV4JztcclxuaW1wb3J0IEZvb3RlciBmcm9tICd3aWRnZXRzLXdlYi9mb290ZXIvaW5kZXgnO1xyXG5pbXBvcnQgTGluayBmcm9tICd3aWRnZXRzLXdlYi9saW5rL2luZGV4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja291dEZvcm1CYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZTxXaWRnZXRQcm9wZXJ0aWVzPiB7XHJcblx0cHJvdGVjdGVkIHJlbmRlcigpIHtcclxuXHRcdHJldHVybiB3KENvbnRhaW5lciwgeyBtYXhXaWR0aDogOTYwIH0sIFtcclxuXHRcdFx0dyhWaWV3LCB7IGFsaWdubWVudDogJ2NlbnRlcicsIHBhZGRpbmdUb3A6ICc1JywgcGFkZGluZ0JvdHRvbTogJzUnIH0sIFtcclxuXHRcdFx0XHR3KEltYWdlLCB7XHJcblx0XHRcdFx0XHR3aWR0aDogNzIsXHJcblx0XHRcdFx0XHRoZWlnaHQ6IDcyLFxyXG5cdFx0XHRcdFx0bWFyZ2luTGVmdDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0bWFyZ2luUmlnaHQ6ICdhdXRvJyxcclxuXHRcdFx0XHRcdG1hcmdpbkJvdHRvbTogJzQnLFxyXG5cdFx0XHRcdFx0c3JjOiAnaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNC4xL2Fzc2V0cy9icmFuZC9ib290c3RyYXAtc29saWQuc3ZnJ1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdHcoVGV4dCwgeyB0eXBlOiAnaDInLCB2YWx1ZTogJ0NoZWNrb3V0IGZvcm0nIH0pLFxyXG5cdFx0XHRcdHcoVGV4dCwge1xyXG5cdFx0XHRcdFx0dHlwZTogJ2xlYWQnLFxyXG5cdFx0XHRcdFx0dmFsdWU6XHJcblx0XHRcdFx0XHRcdFwiQmVsb3cgaXMgYW4gZXhhbXBsZSBmb3JtIGJ1aWx0IGVudGlyZWx5IHdpdGggQm9vdHN0cmFwJ3MgZm9ybSBjb250cm9scy4gRWFjaCByZXF1aXJlZCBmb3JtIGdyb3VwIGhhcyBhIHZhbGlkYXRpb24gc3RhdGUgdGhhdCBjYW4gYmUgdHJpZ2dlcmVkIGJ5IGF0dGVtcHRpbmcgdG8gc3VibWl0IHRoZSBmb3JtIHdpdGhvdXQgY29tcGxldGluZyBpdC5cIlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR3KEdyaWRSb3csIHt9LCBbXHJcblx0XHRcdFx0dyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDggfSwgW1xyXG5cdFx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdoNCcsIG1hcmdpbkJvdHRvbTogJzMnLCB2YWx1ZTogJ0JpbGxpbmcgYWRkcmVzcycgfSksXHJcblx0XHRcdFx0XHR3KFZpZXcsIHt9LCBbXHJcblx0XHRcdFx0XHRcdHcoR3JpZFJvdywge30sIFtcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNiwgbWFyZ2luQm90dG9tOiAnMycgfSwgW3coVGV4dElucHV0LCB7IGxhYmVsOiAnRmlyc3QgTmFtZScgfSldKSxcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNiwgbWFyZ2luQm90dG9tOiAnMycgfSwgW3coVGV4dElucHV0LCB7IGxhYmVsOiAnTGFzdCBOYW1lJyB9KV0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KFZpZXcsIHsgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdHcoSW5wdXRHcm91cCwgeyBsYWJlbDogJ1VzZXJOYW1lJyB9LCBbXHJcblx0XHRcdFx0XHRcdFx0XHR3KEFkZG9uLCB7IHZhbHVlOiAnQCcgfSksXHJcblx0XHRcdFx0XHRcdFx0XHR3KFRleHRJbnB1dCwgeyBwbGFjZWhvbGRlcjogJ1VzZXJOYW1lJyB9KVxyXG5cdFx0XHRcdFx0XHRcdF0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KFZpZXcsIHsgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dElucHV0LCB7IGxhYmVsOiAnRW1haWwoT3B0aW9uYWwpJywgcGxhY2Vob2xkZXI6ICd5b3VAZXhhbXBsZS5jb20nIH0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KFZpZXcsIHsgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dElucHV0LCB7IGxhYmVsOiAnQWRkcmVzcycsIHBsYWNlaG9sZGVyOiAnMTIzNCBNYWluIFN0JyB9KVxyXG5cdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0dyhWaWV3LCB7IG1hcmdpbkJvdHRvbTogJzMnIH0sIFtcclxuXHRcdFx0XHRcdFx0XHR3KFRleHRJbnB1dCwgeyBsYWJlbDogJ0FkZHJlc3MgMihPcHRpb25hbCknLCBwbGFjZWhvbGRlcjogJ0FwYXJ0bWVudCBvciBzdWl0ZScgfSlcclxuXHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdHcoR3JpZFJvdywge30sIFtcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNSwgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhTZWxlY3QsIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdDb3VudHJ5JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uczpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQnW3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwiQ2hvb3NlLi4uXCJ9LCB7XCJ2YWx1ZVwiOiBcIjJcIiwgXCJsYWJlbFwiOiBcIlVuaXRlZCBTdGF0ZXNcIn1dJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVGaWVsZDogJ3ZhbHVlJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxGaWVsZDogJ2xhYmVsJ1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNCwgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhTZWxlY3QsIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdTdGF0ZScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0J1t7XCJ2YWx1ZVwiOiBcIjFcIiwgXCJsYWJlbFwiOiBcIkNob29zZS4uLlwifSwge1widmFsdWVcIjogXCIyXCIsIFwibGFiZWxcIjogXCJDYWxpZm9ybmlhXCJ9XScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlRmllbGQ6ICd2YWx1ZScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsRmllbGQ6ICdsYWJlbCdcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdFx0dyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDMsIG1hcmdpbkJvdHRvbTogJzMnIH0sIFt3KFRleHRJbnB1dCwgeyBsYWJlbDogJ1ppcCcgfSldKVxyXG5cdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0dyhWaWV3LCB7IGJvcmRlckJvdHRvbTogdHJ1ZSwgbWFyZ2luQm90dG9tOiAnNCcgfSksXHJcblx0XHRcdFx0XHRcdHcoQ2hlY2tib3gsIHsgbGFiZWw6ICdTaGlwcGluZyBhZGRyZXNzIGlzIHRoZSBzYW1lIGFzIG15IGJpbGxpbmcgYWRkcmVzcycgfSksXHJcblx0XHRcdFx0XHRcdHcoQ2hlY2tib3gsIHsgbGFiZWw6ICdTYXZlIHRoaXMgaW5mb3JtYXRpb24gZm9yIG5leHQgdGltZScgfSksXHJcblx0XHRcdFx0XHRcdHcoVmlldywgeyBib3JkZXJCb3R0b206IHRydWUsIG1hcmdpbkJvdHRvbTogJzQnLCBtYXJnaW5Ub3A6ICc0JyB9KSxcclxuXHRcdFx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdoNCcsIG1hcmdpbkJvdHRvbTogJzMnLCB2YWx1ZTogJ1BheW1lbnQnIH0pLFxyXG5cdFx0XHRcdFx0XHR3KFZpZXcsIHsgZGlzcGxheTogJ2Jsb2NrJywgbWFyZ2luVG9wOiAnMycsIG1hcmdpbkJvdHRvbTogJzMnIH0sIFtcclxuXHRcdFx0XHRcdFx0XHR3KFJhZGlvLCB7IG5hbWU6ICdwYXltZW50TWV0aG9kJywgd2lkZ2V0SWQ6ICdjcmVkaXQnLCBsYWJlbDogJ0NyZWRpdCBjYXJkJywgZmx1aWQ6IHRydWUgfSksXHJcblx0XHRcdFx0XHRcdFx0dyhSYWRpbywgeyBuYW1lOiAncGF5bWVudE1ldGhvZCcsIHdpZGdldElkOiAnZGViaXQnLCBsYWJlbDogJ0RlYml0IGNhcmQnLCBmbHVpZDogdHJ1ZSB9KSxcclxuXHRcdFx0XHRcdFx0XHR3KFJhZGlvLCB7IG5hbWU6ICdwYXltZW50TWV0aG9kJywgd2lkZ2V0SWQ6ICdwYXlwYWwnLCBsYWJlbDogJ1BheVBhbCcsIGZsdWlkOiB0cnVlIH0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KEdyaWRSb3csIHt9LCBbXHJcblx0XHRcdFx0XHRcdFx0dyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDYsIG1hcmdpbkJvdHRvbTogJzMnIH0sIFtcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dElucHV0LCB7IGxhYmVsOiAnTmFtZSBvbiBjYXJkJyB9KSxcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0Z1bGwgbmFtZSBhcyBkaXNwbGF5ZWQgb24gY2FyZCcgfSlcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNiwgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhUZXh0SW5wdXQsIHsgbGFiZWw6ICdDcmVkaXQgY2FyZCBudW1iZXInIH0pXHJcblx0XHRcdFx0XHRcdFx0XSlcclxuXHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdHcoR3JpZFJvdywge30sIFtcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogMywgbWFyZ2luQm90dG9tOiAnMycgfSwgW3coVGV4dElucHV0LCB7IGxhYmVsOiAnRXhwaXJhdGlvbicgfSldKSxcclxuXHRcdFx0XHRcdFx0XHR3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogMywgbWFyZ2luQm90dG9tOiAnMycgfSwgW3coVGV4dElucHV0LCB7IGxhYmVsOiAnQ1ZWJyB9KV0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KFZpZXcsIHsgYm9yZGVyQm90dG9tOiB0cnVlLCBtYXJnaW5Cb3R0b206ICc0JyB9KSxcclxuXHRcdFx0XHRcdFx0dyhCdXR0b24sIHsgYXBwZWFyYW5jZTogJ3ByaW1hcnknLCBmbHVpZDogdHJ1ZSwgc2l6ZTogJ2xhcmdlJywgdmFsdWU6ICdDb250aW51ZSB0byBjaGVja291dCcgfSlcclxuXHRcdFx0XHRcdF0pXHJcblx0XHRcdFx0XSksXHJcblx0XHRcdFx0dyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46ICc0JywgbWFyZ2luQm90dG9tOiAnNCcgfSwgW1xyXG5cdFx0XHRcdFx0dyhcclxuXHRcdFx0XHRcdFx0VGV4dCxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdoNCcsXHJcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTogJ2ZsZXgnLFxyXG5cdFx0XHRcdFx0XHRcdGFsaWdubWVudDogJ2NlbnRlcicsXHJcblx0XHRcdFx0XHRcdFx0anVzdGlmeUl0ZW1zOiAnYmV0d2VlbicsXHJcblx0XHRcdFx0XHRcdFx0bWFyZ2luQm90dG9tOiAnMydcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0W1xyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB2YWx1ZTogJ1lvdXIgY2FydCcgfSksXHJcblx0XHRcdFx0XHRcdFx0dyhCYWRnZSwgeyBwaWxsOiB0cnVlLCB2YWx1ZTogJzMnLCBhcHBlYXJhbmNlOiAnc2Vjb25kYXJ5JyB9KVxyXG5cdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0dyhMaXN0R3JvdXAsIHsgbWFyZ2luQm90dG9tOiAnMycgfSwgW1xyXG5cdFx0XHRcdFx0XHR3KExpc3RJdGVtLCB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUl0ZW1zOiAnYmV0d2VlbicgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdHcoVmlldywge30sIFtcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0eXBlOiAnaDYnLCBtYXJnaW5Ub3A6ICcwJywgbWFyZ2luQm90dG9tOiAnMCcsIHZhbHVlOiAnUHJvZHVjdCBuYW1lJyB9KSxcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0JyaWVmIGRlc2NyaXB0aW9uJyB9KVxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB2YWx1ZTogJyQxMicgfSlcclxuXHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdHcoTGlzdEl0ZW0sIHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5SXRlbXM6ICdiZXR3ZWVuJyB9LCBbXHJcblx0XHRcdFx0XHRcdFx0dyhWaWV3LCB7fSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdTZWNvbmQgcHJvZHVjdCcgfSksXHJcblx0XHRcdFx0XHRcdFx0XHR3KFRleHQsIHsgdGV4dENvbG9yOiAnc2Vjb25kYXJ5JywgdHlwZTogJ3NtYWxsJywgdmFsdWU6ICdCcmllZiBkZXNjcmlwdGlvbicgfSlcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHR3KFRleHQsIHsgdGV4dENvbG9yOiAnc2Vjb25kYXJ5JywgdmFsdWU6ICckOCcgfSlcclxuXHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdHcoTGlzdEl0ZW0sIHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5SXRlbXM6ICdiZXR3ZWVuJyB9LCBbXHJcblx0XHRcdFx0XHRcdFx0dyhWaWV3LCB7fSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdUaGlyZCBpdGVtJyB9KSxcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0JyaWVmIGRlc2NyaXB0aW9uJyB9KVxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB2YWx1ZTogJyQ1JyB9KVxyXG5cdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0dyhMaXN0SXRlbSwgeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlJdGVtczogJ2JldHdlZW4nIH0sIFtcclxuXHRcdFx0XHRcdFx0XHR3KFZpZXcsIHsgdGV4dENvbG9yOiAnc3VjY2VzcycgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdQcm9tbyBjb2RlJyB9KSxcclxuXHRcdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0VYQU1QTEVDT0RFJyB9KVxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzdWNjZXNzJywgdmFsdWU6ICctJDUnIH0pXHJcblx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHR3KExpc3RJdGVtLCB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUl0ZW1zOiAnYmV0d2VlbicgfSwgW1xyXG5cdFx0XHRcdFx0XHRcdHcoVGV4dCwgeyB2YWx1ZTogJ1RvdGFsIChVU0QpJyB9KSxcclxuXHRcdFx0XHRcdFx0XHR3KFRleHQsIHsgZm9udFdlaWdodDogJ2JvbGQnLCB2YWx1ZTogJyQyMCcgfSlcclxuXHRcdFx0XHRcdFx0XSlcclxuXHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0dyhDYXJkLCB7IHBhZGRpbmdMZWZ0OiAnMicsIHBhZGRpbmdSaWdodDogJzInLCBwYWRkaW5nVG9wOiAnMicsIHBhZGRpbmdCb3R0b206ICcyJyB9LCBbXHJcblx0XHRcdFx0XHRcdHcoSW5wdXRHcm91cCwge30sIFtcclxuXHRcdFx0XHRcdFx0XHR3KFRleHRJbnB1dCwgeyBwbGFjZWhvbGRlcjogJ1Byb21vIGNvZGUnIH0pLFxyXG5cdFx0XHRcdFx0XHRcdHcoQWRkb24sIHt9LCBbdyhCdXR0b24sIHsgYXBwZWFyYW5jZTogJ3NlY29uZGFyeScsIHZhbHVlOiAnUmVkZWVtJyB9KV0pXHJcblx0XHRcdFx0XHRcdF0pXHJcblx0XHRcdFx0XHRdKVxyXG5cdFx0XHRcdF0pXHJcblx0XHRcdF0pLFxyXG5cdFx0XHR3KEZvb3RlciwgeyBtYXJnaW5Ub3A6ICc1JywgbWFyZ2luQm90dG9tOiAnNScsIHBhZGRpbmdUb3A6ICc1JywgYWxpZ25tZW50OiAnY2VudGVyJyB9LCBbXHJcblx0XHRcdFx0dyhUZXh0LCB7IHR5cGU6ICdwJywgbWFyZ2luQm90dG9tOiAnMScsIHZhbHVlOiAnwqkgMjAxNy0yMDE4IENvbXBhbnkgTmFtZScsIHRleHRDb2xvcjogJ3NlY29uZGFyeScgfSksXHJcblx0XHRcdFx0dyhMaXN0R3JvdXAsIHsgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB9LCBbXHJcblx0XHRcdFx0XHR3KExpc3RJdGVtLCB7IG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfSwgW3coTGluaywgeyB2YWx1ZTogJ1ByaXZhY3knIH0pXSksXHJcblx0XHRcdFx0XHR3KExpc3RJdGVtLCB7IG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfSwgW3coTGluaywgeyB2YWx1ZTogJ1Rlcm1zJyB9KV0pLFxyXG5cdFx0XHRcdFx0dyhMaXN0SXRlbSwgeyBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIH0sIFt3KExpbmssIHsgdmFsdWU6ICdTdXBwb3J0JyB9KV0pXHJcblx0XHRcdFx0XSlcclxuXHRcdFx0XSlcclxuXHRcdF0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlY2tvdXRGb3JtIGV4dGVuZHMgQ2hlY2tvdXRGb3JtQmFzZSB7fVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvd2lkZ2V0cy9DaGVja291dEZvcm0udHMiXSwic291cmNlUm9vdCI6IiJ9