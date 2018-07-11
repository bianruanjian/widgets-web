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
var root = document.querySelector('my-app');
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
                d_1.w(index_3.default, { width: 72, height: 72, marginLeft: 'auto', marginRight: 'auto', marginBottom: '4', src: 'https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg' }),
                d_1.w(index_4.default, { type: 'h2', value: 'Checkout form' }),
                d_1.w(index_4.default, { type: 'lead', value: 'Below is an example form built entirely with Bootstrap\'s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.' })
            ]),
            d_1.w(index_5.default, {}, [
                d_1.w(index_6.default, { colspan: 8 }, [
                    d_1.w(index_4.default, { type: 'h4', marginBottom: '3', value: 'Billing address' }),
                    d_1.w(index_2.default, {}, [
                        d_1.w(index_5.default, {}, [
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'First Name' })
                            ]),
                            d_1.w(index_6.default, { colspan: 6, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'Last Name' })
                            ])
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
                                d_1.w(index_10.default, { label: 'Country',
                                    options: '[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "United States"}]',
                                    valueField: 'value', labelField: 'label' })
                            ]),
                            d_1.w(index_6.default, { colspan: 4, marginBottom: '3' }, [
                                d_1.w(index_10.default, { label: 'State',
                                    options: '[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "California"}]',
                                    valueField: 'value', labelField: 'label' })
                            ]),
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'Zip' })
                            ])
                        ]),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4' }),
                        d_1.w(index_11.default, { label: 'Shipping address is the same as my billing address' }),
                        d_1.w(index_11.default, { label: 'Save this information for next time' }),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4', marginTop: '4' }),
                        d_1.w(index_4.default, { type: 'h4', marginBottom: '3', value: 'Payment' }),
                        d_1.w(index_2.default, { display: 'block', marginTop: '3', marginBottom: '3' }, [
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'credit', label: 'Credit card', fluid: true }),
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'debit', label: 'Debit card', fluid: true }),
                            d_1.w(index_12.default, { name: 'paymentMethod', widgetId: 'paypal', label: 'PayPal', fluid: true }),
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
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'Expiration' })
                            ]),
                            d_1.w(index_6.default, { colspan: 3, marginBottom: '3' }, [
                                d_1.w(index_7.default, { label: 'CVV' }),
                            ])
                        ]),
                        d_1.w(index_2.default, { borderBottom: true, marginBottom: '4' }),
                        d_1.w(index_13.default, { appearance: 'primary', fluid: true, size: 'large', value: 'Continue to checkout' })
                    ])
                ]),
                d_1.w(index_6.default, { colspan: '4', marginBottom: '4' }, [
                    d_1.w(index_4.default, { type: 'h4', display: 'flex', alignment: 'center', justifyItems: 'between', marginBottom: '3' }, [
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
                            d_1.w(index_9.default, {}, [
                                d_1.w(index_13.default, { appearance: 'secondary', value: 'Redeem' })
                            ])
                        ])
                    ])
                ])
            ]),
            d_1.w(index_18.default, { marginTop: '5', marginBottom: '5', paddingTop: '5', alignment: 'center' }, [
                d_1.w(index_4.default, { type: 'p', marginBottom: '1', value: '© 2017-2018 Company Name', textColor: 'secondary' }),
                d_1.w(index_15.default, { orientation: 'horizontal' }, [
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [
                        d_1.w(index_19.default, { value: 'Privacy' })
                    ]),
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [
                        d_1.w(index_19.default, { value: 'Terms' })
                    ]),
                    d_1.w(index_16.default, { orientation: 'horizontal' }, [
                        d_1.w(index_19.default, { value: 'Support' })
                    ])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0Rlc3Ryb3lhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0V2ZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvaGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2xhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vaGFzL2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9TZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvaGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvYnVpbGQtdGltZS1yZW5kZXIvaGFzQnVpbGRUaW1lUmVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9JbmplY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvTm9kZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1JlZ2lzdHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9SZWdpc3RyeUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2FuaW1hdGlvbnMvY3NzVHJhbnNpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWx3YXlzUmVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2JlZm9yZVByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9kaWZmUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvaGFuZGxlRGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2luamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGlmZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvbWV0YS9CYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0ZvY3VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3Zkb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3M/N2Q0YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vc3R5bGVzL2FkZG9uLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzPzk3ZTMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcz8zYWMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzcz84YjA4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL3N0eWxlcy9jYXJkLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzPzBiNTYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3M/ZDRiZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbW1vbi91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb250YWluZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzP2VjMGIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9mb290ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzP2Q1MjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzPzIzNTgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzcz84MmY4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9zdHlsZXMvZ3JpZC1yb3cubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3M/Yjg1NyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2Uvc3R5bGVzL2ltYWdlLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvc3R5bGVzL2lucHV0LWdyb3VwLm0uY3NzP2MyZmIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL3N0eWxlcy9sYWJlbC5tLmNzcz9jZDYwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9zdHlsZXMvbGFiZWwubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3M/Mjc1YiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9zdHlsZXMvbGluay5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9zdHlsZXMvbGlzdC1ncm91cC5tLmNzcz83NmMyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzP2VlODQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vc3R5bGVzL3JhZGlvLm0uY3NzP2Y0MTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvc2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcz8zZDNhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9zdHlsZXMvdGV4dC1pbnB1dC5tLmNzcz83NjI2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L3N0eWxlcy90ZXh0LWlucHV0Lm0uY3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzPzI3NDgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvc3R5bGVzL3RleHQubS5jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3M/MGQyOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5jc3M/ODQyMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9DaGVja291dEZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7O0FDVkE7QUFDQSw4Q0FBOEMsY0FB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QUFDTDtBQUNBLHVCOzs7Ozs7Ozt1RENiQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbUJBQW1CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7O0FDMU1EO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFCQUFxQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBK0csb0JBQW9CO0FBQ25JO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVEsZ0JBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBCQUEwQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPOzs7Ozs7OztBQ2xIQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLG9CQUFvQjtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVEsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDBCQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyxvQkFBb0I7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRLGdCQUFnQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywwQkFBMEI7QUFDM0Q7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTzs7Ozs7Ozs7QUNoT0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQkFBcUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtHQUErRyxvQkFBb0I7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUSxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsMEJBQTBCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1Rix1QkFBdUIsRUFBRTtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87Ozs7Ozs7O0FDM0ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSTtBQUNwQixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxJQUFJO0FBQ2hCLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw0QkFBNEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsb0NBQW9DO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUscUNBQXFDLEVBQUU7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsNkI7Ozs7Ozs7O0FDallBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQy9EQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixlQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywyQkFBMkI7QUFDckUsOEJBQThCLHNCQUFzQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGdEQUFnRCwwQ0FBMEM7QUFDM0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0I7Ozs7Ozs7O0FDMUhBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDhCOzs7Ozs7OztBQ1RBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0I7Ozs7Ozs7O0FDWkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUM7Ozs7Ozs7O0FDVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZXQUE2VyxpQ0FBaUMsRUFBRTtBQUNoWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7QUN0QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0I7Ozs7Ozs7O0FDdkJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7OztBQ25CQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSx5Qjs7Ozs7Ozs7QUN4Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9COzs7Ozs7OztBQ3ZFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx1Qjs7Ozs7Ozs7QUM1Q0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCOzs7Ozs7OztBQ3pQQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGdCQUFnQixlQUFlLHNDQUFzQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0JBQW9CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxvQ0FBb0M7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1Q0FBdUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUJBQXlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsNkJBQTZCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0IscUNBQXFDO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFB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QUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOURB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QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7O0FDVEQseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7OztBQ25RQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsNEI7Ozs7Ozs7QUNwRUEseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QseUI7Ozs7Ozs7QUNoRkEseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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L0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx3Qjs7Ozs7OztBQ25EQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVCOzs7Ozs7O0FDdEdBLHlDOzs7Ozs7O2dFQ0FBO0FBQ0E7QUFDQTtBQUNBLG1GQUF5QixvQkFBb0IsRUFBRTtBQUFBO0FBQy9DLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNELFNBQVM7QUFDVCxDQUFDLEk7Ozs7Ozs7O0FDVEQ7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw0Qjs7Ozs7OztBQy9GQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsMkI7Ozs7Ozs7QUNoR0EseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyw2REFBNkQ7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsd0I7Ozs7Ozs7QUMzSEEseUM7Ozs7Ozs7Z0VDQUE7QUFDQTtBQUNBO0FBQ0EsbUZBQXlCLG9CQUFvQixFQUFFO0FBQUE7QUFDL0MsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsU0FBUztBQUNULENBQUMsSTs7Ozs7Ozs7QUNURDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHlCOzs7Ozs7O0FDekpBLHlDOzs7Ozs7O2dFQ0FBO0FBQ0E7QUFDQTtBQUNBLG1GQUF5QixvQkFBb0IsRUFBRTtBQUFBO0FBQy9DLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNELFNBQVM7QUFDVCxDQUFDLEk7Ozs7Ozs7O0FDVEQ7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw0Qjs7Ozs7OztBQ3hNQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1Qjs7Ozs7OztBQzdHQSx5Qzs7Ozs7OztnRUNBQTtBQUNBO0FBQ0E7QUFDQSxtRkFBeUIsb0JBQW9CLEVBQUU7QUFBQTtBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxTQUFTO0FBQ1QsQ0FBQyxJOzs7Ozs7OztBQ1REO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0FBQyxFQUFFO3dCQUN0QyxLQUFDLENBQUMsZ0JBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFTLENBQUM7cUJBQzlCLENBQUM7b0JBQ0YsS0FBQyxDQUFDLGdCQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsYUFBWSxDQUFDLEVBQUU7d0JBQ3RDLEtBQUMsQ0FBQyxnQkFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQU8sQ0FBQztxQkFDNUIsQ0FBQztvQkFDRixLQUFDLENBQUMsZ0JBQVEsRUFBRSxFQUFFLFdBQVcsRUFBRSxhQUFZLENBQUMsRUFBRTt3QkFDdEMsS0FBQyxDQUFDLGdCQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBUyxDQUFDO3FCQUM5QjtpQkFDSjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDTCx1QkFBQztBQUFELENBbEpBLENBQXNDLHVCQUFVO0FBQW5DO0FBb0piO0lBQTBDO0lBQTFDOztJQUE0RDtJQUFBLG1CQUFDO0FBQUQsQ0FBNUQsQ0FBMEMsZ0JBQWdCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm1haW5cIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibWFpblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJtYWluXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgbGFuZ18xID0gcmVxdWlyZShcIi4vbGFuZ1wiKTtcclxudmFyIFByb21pc2VfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL1Byb21pc2VcIik7XHJcbi8qKlxyXG4gKiBObyBvcGVyYXRpb24gZnVuY3Rpb24gdG8gcmVwbGFjZSBvd24gb25jZSBpbnN0YW5jZSBpcyBkZXN0b3J5ZWRcclxuICovXHJcbmZ1bmN0aW9uIG5vb3AoKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZV8xLmRlZmF1bHQucmVzb2x2ZShmYWxzZSk7XHJcbn1cclxuLyoqXHJcbiAqIE5vIG9wIGZ1bmN0aW9uIHVzZWQgdG8gcmVwbGFjZSBvd24sIG9uY2UgaW5zdGFuY2UgaGFzIGJlZW4gZGVzdG9yeWVkXHJcbiAqL1xyXG5mdW5jdGlvbiBkZXN0cm95ZWQoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGwgbWFkZSB0byBkZXN0cm95ZWQgbWV0aG9kJyk7XHJcbn1cclxudmFyIERlc3Ryb3lhYmxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGVzdHJveWFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVzID0gW107XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGhhbmRsZXMgZm9yIHRoZSBpbnN0YW5jZSB0aGF0IHdpbGwgYmUgZGVzdHJveWVkIHdoZW4gYHRoaXMuZGVzdHJveWAgaXMgY2FsbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtIYW5kbGV9IGhhbmRsZSBUaGUgaGFuZGxlIHRvIGFkZCBmb3IgdGhlIGluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7SGFuZGxlfSBhIGhhbmRsZSBmb3IgdGhlIGhhbmRsZSwgcmVtb3ZlcyB0aGUgaGFuZGxlIGZvciB0aGUgaW5zdGFuY2UgYW5kIGNhbGxzIGRlc3Ryb3lcclxuICAgICAqL1xyXG4gICAgRGVzdHJveWFibGUucHJvdG90eXBlLm93biA9IGZ1bmN0aW9uIChoYW5kbGVzKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZSA9IEFycmF5LmlzQXJyYXkoaGFuZGxlcykgPyBsYW5nXzEuY3JlYXRlQ29tcG9zaXRlSGFuZGxlLmFwcGx5KHZvaWQgMCwgdHNsaWJfMS5fX3NwcmVhZChoYW5kbGVzKSkgOiBoYW5kbGVzO1xyXG4gICAgICAgIHZhciBfaGFuZGxlcyA9IHRoaXMuaGFuZGxlcztcclxuICAgICAgICBfaGFuZGxlcy5wdXNoKGhhbmRsZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX2hhbmRsZXMuc3BsaWNlKF9oYW5kbGVzLmluZGV4T2YoaGFuZGxlKSk7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIERlc3RycHlzIGFsbCBoYW5kZXJzIHJlZ2lzdGVyZWQgZm9yIHRoZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueX0gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSBhbGwgaGFuZGxlcyBoYXZlIGJlZW4gZGVzdHJveWVkXHJcbiAgICAgKi9cclxuICAgIERlc3Ryb3lhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlXzEuZGVmYXVsdChmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICBfdGhpcy5oYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlICYmIGhhbmRsZS5kZXN0cm95ICYmIGhhbmRsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5kZXN0cm95ID0gbm9vcDtcclxuICAgICAgICAgICAgX3RoaXMub3duID0gZGVzdHJveWVkO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEZXN0cm95YWJsZTtcclxufSgpKTtcclxuZXhwb3J0cy5EZXN0cm95YWJsZSA9IERlc3Ryb3lhYmxlO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBEZXN0cm95YWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0Rlc3Ryb3lhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0Rlc3Ryb3lhYmxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgTWFwXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9NYXBcIik7XHJcbnZhciBEZXN0cm95YWJsZV8xID0gcmVxdWlyZShcIi4vRGVzdHJveWFibGVcIik7XHJcbi8qKlxyXG4gKiBNYXAgb2YgY29tcHV0ZWQgcmVndWxhciBleHByZXNzaW9ucywga2V5ZWQgYnkgc3RyaW5nXHJcbiAqL1xyXG52YXIgcmVnZXhNYXAgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4vKipcclxuICogRGV0ZXJtaW5lcyBpcyB0aGUgZXZlbnQgdHlwZSBnbG9iIGhhcyBiZWVuIG1hdGNoZWRcclxuICpcclxuICogQHJldHVybnMgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB0aGUgZ2xvYiBpcyBtYXRjaGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0dsb2JNYXRjaChnbG9iU3RyaW5nLCB0YXJnZXRTdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgdGFyZ2V0U3RyaW5nID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgZ2xvYlN0cmluZyA9PT0gJ3N0cmluZycgJiYgZ2xvYlN0cmluZy5pbmRleE9mKCcqJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gdm9pZCAwO1xyXG4gICAgICAgIGlmIChyZWdleE1hcC5oYXMoZ2xvYlN0cmluZykpIHtcclxuICAgICAgICAgICAgcmVnZXggPSByZWdleE1hcC5nZXQoZ2xvYlN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoXCJeXCIgKyBnbG9iU3RyaW5nLnJlcGxhY2UoL1xcKi9nLCAnLionKSArIFwiJFwiKTtcclxuICAgICAgICAgICAgcmVnZXhNYXAuc2V0KGdsb2JTdHJpbmcsIHJlZ2V4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodGFyZ2V0U3RyaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnbG9iU3RyaW5nID09PSB0YXJnZXRTdHJpbmc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5pc0dsb2JNYXRjaCA9IGlzR2xvYk1hdGNoO1xyXG4vKipcclxuICogRXZlbnQgQ2xhc3NcclxuICovXHJcbnZhciBFdmVudGVkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoRXZlbnRlZCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEV2ZW50ZWQoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbWFwIG9mIGxpc3RlbmVycyBrZXllZCBieSBldmVudCB0eXBlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3RoaXMubGlzdGVuZXJzTWFwID0gbmV3IE1hcF8xLmRlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBFdmVudGVkLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc01hcC5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RzLCB0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0dsb2JNYXRjaCh0eXBlLCBldmVudC50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QuY2FsbChfdGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGlzdGVuZXIpKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVzXzEgPSBsaXN0ZW5lci5tYXAoZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBfdGhpcy5fYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVzXzEuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7IHJldHVybiBoYW5kbGUuZGVzdHJveSgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgICBFdmVudGVkLnByb3RvdHlwZS5fYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc01hcC5nZXQodHlwZSkgfHwgW107XHJcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzTWFwLnNldCh0eXBlLCBsaXN0ZW5lcnMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBfdGhpcy5saXN0ZW5lcnNNYXAuZ2V0KHR5cGUpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXZlbnRlZDtcclxufShEZXN0cm95YWJsZV8xLkRlc3Ryb3lhYmxlKSk7XHJcbmV4cG9ydHMuRXZlbnRlZCA9IEV2ZW50ZWQ7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50ZWQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS9FdmVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL0V2ZW50ZWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL2dsb2JhbFwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vc3VwcG9ydC9oYXNcIik7XHJcbnRzbGliXzEuX19leHBvcnRTdGFyKHJlcXVpcmUoXCJAZG9qby9zaGltL3N1cHBvcnQvaGFzXCIpLCBleHBvcnRzKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gaGFzXzEuZGVmYXVsdDtcclxuaGFzXzEuYWRkKCdvYmplY3QtYXNzaWduJywgdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJywgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnYXJyYXlidWZmZXInLCB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5BcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2Zvcm1kYXRhJywgdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuRm9ybURhdGEgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcclxuaGFzXzEuYWRkKCdmaWxlcmVhZGVyJywgdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuRmlsZVJlYWRlciAhPT0gJ3VuZGVmaW5lZCcsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ3hocicsIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LlhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJywgdHJ1ZSk7XHJcbmhhc18xLmFkZCgneGhyMicsIGhhc18xLmRlZmF1bHQoJ3hocicpICYmICdyZXNwb25zZVR5cGUnIGluIGdsb2JhbF8xLmRlZmF1bHQuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCB0cnVlKTtcclxuaGFzXzEuYWRkKCdibG9iJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFoYXNfMS5kZWZhdWx0KCd4aHIyJykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBnbG9iYWxfMS5kZWZhdWx0LlhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIGdsb2JhbF8xLmRlZmF1bHQubG9jYXRpb24ucHJvdG9jb2wgKyAnLy93d3cuZ29vZ2xlLmNvbScsIHRydWUpO1xyXG4gICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYmxvYic7XHJcbiAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVR5cGUgPT09ICdibG9iJztcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnbm9kZS1idWZmZXInLCAnQnVmZmVyJyBpbiBnbG9iYWxfMS5kZWZhdWx0ICYmIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LkJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJywgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZmV0Y2gnLCAnZmV0Y2gnIGluIGdsb2JhbF8xLmRlZmF1bHQgJiYgdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuZmV0Y2ggPT09ICdmdW5jdGlvbicsIHRydWUpO1xyXG5oYXNfMS5hZGQoJ3dlYi13b3JrZXIteGhyLXVwbG9hZCcsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnbG9iYWxfMS5kZWZhdWx0LldvcmtlciAhPT0gdW5kZWZpbmVkICYmIGdsb2JhbF8xLmRlZmF1bHQuVVJMICYmIGdsb2JhbF8xLmRlZmF1bHQuVVJMLmNyZWF0ZU9iamVjdFVSTCkge1xyXG4gICAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtcclxuICAgICAgICAgICAgICAgIFwiKGZ1bmN0aW9uICgpIHtcXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoKSB7XFxuXFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xcblxcdHRyeSB7XFxuXFx0XFx0eGhyLnVwbG9hZDtcXG5cXHRcXHRwb3N0TWVzc2FnZSgndHJ1ZScpO1xcblxcdH0gY2F0Y2ggKGUpIHtcXG5cXHRcXHRwb3N0TWVzc2FnZSgnZmFsc2UnKTtcXG5cXHR9XFxufSk7XFxuXFx0XFx0fSkoKVwiXHJcbiAgICAgICAgICAgIF0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pO1xyXG4gICAgICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcclxuICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfYS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBJRTExIG9uIFdpbm9kd3MgOC4xIGVuY291bnRlcnMgYSBzZWN1cml0eSBlcnJvci5cclxuICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgIH1cclxufSksIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvaGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2hhcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIG9iamVjdF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vb2JqZWN0XCIpO1xyXG52YXIgb2JqZWN0XzIgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9vYmplY3RcIik7XHJcbmV4cG9ydHMuYXNzaWduID0gb2JqZWN0XzIuYXNzaWduO1xyXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XHJcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbi8qKlxyXG4gKiBUeXBlIGd1YXJkIHRoYXQgZW5zdXJlcyB0aGF0IHRoZSB2YWx1ZSBjYW4gYmUgY29lcmNlZCB0byBPYmplY3RcclxuICogdG8gd2VlZCBvdXQgaG9zdCBvYmplY3RzIHRoYXQgZG8gbm90IGRlcml2ZSBmcm9tIE9iamVjdC5cclxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNoZWNrIGlmIHdlIHdhbnQgdG8gZGVlcCBjb3B5IGFuIG9iamVjdCBvciBub3QuXHJcbiAqIE5vdGU6IEluIEVTNiBpdCBpcyBwb3NzaWJsZSB0byBtb2RpZnkgYW4gb2JqZWN0J3MgU3ltYm9sLnRvU3RyaW5nVGFnIHByb3BlcnR5LCB3aGljaCB3aWxsXHJcbiAqIGNoYW5nZSB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgYHRvU3RyaW5nYC4gVGhpcyBpcyBhIHJhcmUgZWRnZSBjYXNlIHRoYXQgaXMgZGlmZmljdWx0IHRvIGhhbmRsZSxcclxuICogc28gaXQgaXMgbm90IGhhbmRsZWQgaGVyZS5cclxuICogQHBhcmFtICB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2tcclxuICogQHJldHVybiAgICAgICBJZiB0aGUgdmFsdWUgaXMgY29lcmNpYmxlIGludG8gYW4gT2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBzaG91bGREZWVwQ29weU9iamVjdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG59XHJcbmZ1bmN0aW9uIGNvcHlBcnJheShhcnJheSwgaW5oZXJpdGVkKSB7XHJcbiAgICByZXR1cm4gYXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvcHlBcnJheShpdGVtLCBpbmhlcml0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXNob3VsZERlZXBDb3B5T2JqZWN0KGl0ZW0pXHJcbiAgICAgICAgICAgID8gaXRlbVxyXG4gICAgICAgICAgICA6IF9taXhpbih7XHJcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5oZXJpdGVkOiBpbmhlcml0ZWQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbaXRlbV0sXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHt9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gX21peGluKGt3QXJncykge1xyXG4gICAgdmFyIGRlZXAgPSBrd0FyZ3MuZGVlcDtcclxuICAgIHZhciBpbmhlcml0ZWQgPSBrd0FyZ3MuaW5oZXJpdGVkO1xyXG4gICAgdmFyIHRhcmdldCA9IGt3QXJncy50YXJnZXQ7XHJcbiAgICB2YXIgY29waWVkID0ga3dBcmdzLmNvcGllZCB8fCBbXTtcclxuICAgIHZhciBjb3BpZWRDbG9uZSA9IHRzbGliXzEuX19zcHJlYWQoY29waWVkKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga3dBcmdzLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgc291cmNlID0ga3dBcmdzLnNvdXJjZXNbaV07XHJcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChjb3BpZWRDbG9uZS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkZWVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29weUFycmF5KHZhbHVlLCBpbmhlcml0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzaG91bGREZWVwQ29weU9iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV0gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcGllZC5wdXNoKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX21peGluKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmhlcml0ZWQ6IGluaGVyaXRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXM6IFt2YWx1ZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29waWVkOiBjb3BpZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlKHByb3RvdHlwZSkge1xyXG4gICAgdmFyIG1peGlucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBtaXhpbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICBpZiAoIW1peGlucy5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbGFuZy5jcmVhdGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG1peGluIG9iamVjdC4nKTtcclxuICAgIH1cclxuICAgIHZhciBhcmdzID0gbWl4aW5zLnNsaWNlKCk7XHJcbiAgICBhcmdzLnVuc2hpZnQoT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpKTtcclxuICAgIHJldHVybiBvYmplY3RfMS5hc3NpZ24uYXBwbHkobnVsbCwgYXJncyk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XHJcbmZ1bmN0aW9uIGRlZXBBc3NpZ24odGFyZ2V0KSB7XHJcbiAgICB2YXIgc291cmNlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9taXhpbih7XHJcbiAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICBpbmhlcml0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZXM6IHNvdXJjZXMsXHJcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXRcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVlcEFzc2lnbiA9IGRlZXBBc3NpZ247XHJcbmZ1bmN0aW9uIGRlZXBNaXhpbih0YXJnZXQpIHtcclxuICAgIHZhciBzb3VyY2VzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHNvdXJjZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX21peGluKHtcclxuICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgIGluaGVyaXRlZDogdHJ1ZSxcclxuICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLFxyXG4gICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZXBNaXhpbiA9IGRlZXBNaXhpbjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBzb3VyY2UncyBwcm90b3R5cGUgYXMgdGhlIHByb3RvdHlwZSBmb3IgdGhlIG5ldyBvYmplY3QsIGFuZCB0aGVuXHJcbiAqIGRlZXAgY29waWVzIHRoZSBwcm92aWRlZCBzb3VyY2UncyB2YWx1ZXMgaW50byB0aGUgbmV3IHRhcmdldC5cclxuICpcclxuICogQHBhcmFtIHNvdXJjZSBUaGUgb2JqZWN0IHRvIGR1cGxpY2F0ZVxyXG4gKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBkdXBsaWNhdGUoc291cmNlKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSk7XHJcbiAgICByZXR1cm4gZGVlcE1peGluKHRhcmdldCwgc291cmNlKTtcclxufVxyXG5leHBvcnRzLmR1cGxpY2F0ZSA9IGR1cGxpY2F0ZTtcclxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIGEgRmlyc3QgdmFsdWUgdG8gY29tcGFyZVxyXG4gKiBAcGFyYW0gYiBTZWNvbmQgdmFsdWUgdG8gY29tcGFyZVxyXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWU7IGZhbHNlIG90aGVyd2lzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNJZGVudGljYWwoYSwgYikge1xyXG4gICAgcmV0dXJuIChhID09PSBiIHx8XHJcbiAgICAgICAgLyogYm90aCB2YWx1ZXMgYXJlIE5hTiAqL1xyXG4gICAgICAgIChhICE9PSBhICYmIGIgIT09IGIpKTtcclxufVxyXG5leHBvcnRzLmlzSWRlbnRpY2FsID0gaXNJZGVudGljYWw7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBiaW5kcyBhIG1ldGhvZCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdCBhdCBydW50aW1lLiBUaGlzIGlzIHNpbWlsYXIgdG9cclxuICogYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCwgYnV0IGluc3RlYWQgb2YgYSBmdW5jdGlvbiBpdCB0YWtlcyB0aGUgbmFtZSBvZiBhIG1ldGhvZCBvbiBhbiBvYmplY3QuXHJcbiAqIEFzIGEgcmVzdWx0LCB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgYGxhdGVCaW5kYCB3aWxsIGFsd2F5cyBjYWxsIHRoZSBmdW5jdGlvbiBjdXJyZW50bHkgYXNzaWduZWQgdG9cclxuICogdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0IGFzIG9mIHRoZSBtb21lbnQgdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMgaXMgY2FsbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gaW5zdGFuY2UgVGhlIGNvbnRleHQgb2JqZWN0XHJcbiAqIEBwYXJhbSBtZXRob2QgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCBvbiB0aGUgY29udGV4dCBvYmplY3QgdG8gYmluZCB0byBpdHNlbGZcclxuICogQHBhcmFtIHN1cHBsaWVkQXJncyBBbiBvcHRpb25hbCBhcnJheSBvZiB2YWx1ZXMgdG8gcHJlcGVuZCB0byB0aGUgYGluc3RhbmNlW21ldGhvZF1gIGFyZ3VtZW50cyBsaXN0XHJcbiAqIEByZXR1cm4gVGhlIGJvdW5kIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXRlQmluZChpbnN0YW5jZSwgbWV0aG9kKSB7XHJcbiAgICB2YXIgc3VwcGxpZWRBcmdzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHN1cHBsaWVkQXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBwbGllZEFyZ3MubGVuZ3RoXHJcbiAgICAgICAgPyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA/IHN1cHBsaWVkQXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSA6IHN1cHBsaWVkQXJncztcclxuICAgICAgICAgICAgLy8gVFM3MDE3XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZVttZXRob2RdLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFRTNzAxN1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VbbWV0aG9kXS5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG59XHJcbmV4cG9ydHMubGF0ZUJpbmQgPSBsYXRlQmluZDtcclxuZnVuY3Rpb24gbWl4aW4odGFyZ2V0KSB7XHJcbiAgICB2YXIgc291cmNlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9taXhpbih7XHJcbiAgICAgICAgZGVlcDogZmFsc2UsXHJcbiAgICAgICAgaW5oZXJpdGVkOiB0cnVlLFxyXG4gICAgICAgIHNvdXJjZXM6IHNvdXJjZXMsXHJcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXRcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMubWl4aW4gPSBtaXhpbjtcclxuLyoqXHJcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMgcHJlcGVuZGVkIHRvIGl0cyBhcmd1bWVudCBsaXN0LlxyXG4gKiBMaWtlIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAsIGJ1dCBkb2VzIG5vdCBhbHRlciBleGVjdXRpb24gY29udGV4dC5cclxuICpcclxuICogQHBhcmFtIHRhcmdldEZ1bmN0aW9uIFRoZSBmdW5jdGlvbiB0aGF0IG5lZWRzIHRvIGJlIGJvdW5kXHJcbiAqIEBwYXJhbSBzdXBwbGllZEFyZ3MgQW4gb3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhlIGB0YXJnZXRGdW5jdGlvbmAgYXJndW1lbnRzIGxpc3RcclxuICogQHJldHVybiBUaGUgYm91bmQgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHBhcnRpYWwodGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgIHZhciBzdXBwbGllZEFyZ3MgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgc3VwcGxpZWRBcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPyBzdXBwbGllZEFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBzdXBwbGllZEFyZ3M7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldEZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnBhcnRpYWwgPSBwYXJ0aWFsO1xyXG4vKipcclxuICogUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGRlc3Ryb3kgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBjYWxscyB0aGUgcGFzc2VkLWluIGRlc3RydWN0b3IuXHJcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSBhIHVuaWZpZWQgaW50ZXJmYWNlIGZvciBjcmVhdGluZyBcInJlbW92ZVwiIC8gXCJkZXN0cm95XCIgaGFuZGxlcnMgZm9yXHJcbiAqIGV2ZW50IGxpc3RlbmVycywgdGltZXJzLCBldGMuXHJcbiAqXHJcbiAqIEBwYXJhbSBkZXN0cnVjdG9yIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBoYW5kbGUncyBgZGVzdHJveWAgbWV0aG9kIGlzIGludm9rZWRcclxuICogQHJldHVybiBUaGUgaGFuZGxlIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSGFuZGxlKGRlc3RydWN0b3IpIHtcclxuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVIYW5kbGUgPSBjcmVhdGVIYW5kbGU7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgc2luZ2xlIGhhbmRsZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGRlc3Ryb3kgbXVsdGlwbGUgaGFuZGxlcyBzaW11bHRhbmVvdXNseS5cclxuICpcclxuICogQHBhcmFtIGhhbmRsZXMgQW4gYXJyYXkgb2YgaGFuZGxlcyB3aXRoIGBkZXN0cm95YCBtZXRob2RzXHJcbiAqIEByZXR1cm4gVGhlIGhhbmRsZSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvc2l0ZUhhbmRsZSgpIHtcclxuICAgIHZhciBoYW5kbGVzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIGhhbmRsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVIYW5kbGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBoYW5kbGVzW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNvbXBvc2l0ZUhhbmRsZSA9IGNyZWF0ZUNvbXBvc2l0ZUhhbmRsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL2xhbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2NvcmUvbGFuZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKipcclxuICogUmV0dXJucyBhIHY0IGNvbXBsaWFudCBVVUlELlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gdXVpZCgpIHtcclxuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgdmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsIHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHV1aWQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vY29yZS91dWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9jb3JlL3V1aWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gaXNGZWF0dXJlVGVzdFRoZW5hYmxlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUudGhlbjtcclxufVxyXG4vKipcclxuICogQSBjYWNoZSBvZiByZXN1bHRzIG9mIGZlYXR1cmUgdGVzdHNcclxuICovXHJcbmV4cG9ydHMudGVzdENhY2hlID0ge307XHJcbi8qKlxyXG4gKiBBIGNhY2hlIG9mIHRoZSB1bi1yZXNvbHZlZCBmZWF0dXJlIHRlc3RzXHJcbiAqL1xyXG5leHBvcnRzLnRlc3RGdW5jdGlvbnMgPSB7fTtcclxuLyoqXHJcbiAqIEEgY2FjaGUgb2YgdW5yZXNvbHZlZCB0aGVuYWJsZXMgKHByb2JhYmx5IHByb21pc2VzKVxyXG4gKiBAdHlwZSB7e319XHJcbiAqL1xyXG52YXIgdGVzdFRoZW5hYmxlcyA9IHt9O1xyXG4vKipcclxuICogQSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBzY29wZSAoYHdpbmRvd2AgaW4gYSBicm93c2VyLCBgZ2xvYmFsYCBpbiBOb2RlSlMpXHJcbiAqL1xyXG52YXIgZ2xvYmFsU2NvcGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIEJyb3dzZXJzXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLy8gTm9kZVxyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBXZWIgd29ya2Vyc1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHJldHVybiB7fTtcclxufSkoKTtcclxuLyogR3JhYiB0aGUgc3RhdGljRmVhdHVyZXMgaWYgdGhlcmUgYXJlIGF2YWlsYWJsZSAqL1xyXG52YXIgc3RhdGljRmVhdHVyZXMgPSAoZ2xvYmFsU2NvcGUuRG9qb0hhc0Vudmlyb25tZW50IHx8IHt9KS5zdGF0aWNGZWF0dXJlcztcclxuLyogQ2xlYW5pbmcgdXAgdGhlIERvam9IYXNFbnZpb3JubWVudCAqL1xyXG5pZiAoJ0Rvam9IYXNFbnZpcm9ubWVudCcgaW4gZ2xvYmFsU2NvcGUpIHtcclxuICAgIGRlbGV0ZSBnbG9iYWxTY29wZS5Eb2pvSGFzRW52aXJvbm1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIEN1c3RvbSB0eXBlIGd1YXJkIHRvIG5hcnJvdyB0aGUgYHN0YXRpY0ZlYXR1cmVzYCB0byBlaXRoZXIgYSBtYXAgb3IgYSBmdW5jdGlvbiB0aGF0XHJcbiAqIHJldHVybnMgYSBtYXAuXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gZ3VhcmQgZm9yXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0YXRpY0ZlYXR1cmVGdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG4vKipcclxuICogVGhlIGNhY2hlIG9mIGFzc2VydGVkIGZlYXR1cmVzIHRoYXQgd2VyZSBhdmFpbGFibGUgaW4gdGhlIGdsb2JhbCBzY29wZSB3aGVuIHRoZVxyXG4gKiBtb2R1bGUgbG9hZGVkXHJcbiAqL1xyXG52YXIgc3RhdGljQ2FjaGUgPSBzdGF0aWNGZWF0dXJlc1xyXG4gICAgPyBpc1N0YXRpY0ZlYXR1cmVGdW5jdGlvbihzdGF0aWNGZWF0dXJlcykgPyBzdGF0aWNGZWF0dXJlcy5hcHBseShnbG9iYWxTY29wZSkgOiBzdGF0aWNGZWF0dXJlc1xyXG4gICAgOiB7fTsvKiBQcm92aWRpbmcgYW4gZW1wdHkgY2FjaGUsIGlmIG5vbmUgd2FzIGluIHRoZSBlbnZpcm9ubWVudFxyXG5cclxuLyoqXHJcbiogQU1EIHBsdWdpbiBmdW5jdGlvbi5cclxuKlxyXG4qIENvbmRpdGlvbmFsIGxvYWRzIG1vZHVsZXMgYmFzZWQgb24gYSBoYXMgZmVhdHVyZSB0ZXN0IHZhbHVlLlxyXG4qXHJcbiogQHBhcmFtIHJlc291cmNlSWQgR2l2ZXMgdGhlIHJlc29sdmVkIG1vZHVsZSBpZCB0byBsb2FkLlxyXG4qIEBwYXJhbSByZXF1aXJlIFRoZSBsb2FkZXIgcmVxdWlyZSBmdW5jdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZHVsZSB0aGF0IGNvbnRhaW5lZCB0aGUgcGx1Z2luIHJlc291cmNlIGluIGl0c1xyXG4qICAgICAgICAgICAgICAgIGRlcGVuZGVuY3kgbGlzdC5cclxuKiBAcGFyYW0gbG9hZCBDYWxsYmFjayB0byBsb2FkZXIgdGhhdCBjb25zdW1lcyByZXN1bHQgb2YgcGx1Z2luIGRlbWFuZC5cclxuKi9cclxuZnVuY3Rpb24gbG9hZChyZXNvdXJjZUlkLCByZXF1aXJlLCBsb2FkLCBjb25maWcpIHtcclxuICAgIHJlc291cmNlSWQgPyByZXF1aXJlKFtyZXNvdXJjZUlkXSwgbG9hZCkgOiBsb2FkKCk7XHJcbn1cclxuZXhwb3J0cy5sb2FkID0gbG9hZDtcclxuLyoqXHJcbiAqIEFNRCBwbHVnaW4gZnVuY3Rpb24uXHJcbiAqXHJcbiAqIFJlc29sdmVzIHJlc291cmNlSWQgaW50byBhIG1vZHVsZSBpZCBiYXNlZCBvbiBwb3NzaWJseS1uZXN0ZWQgdGVuYXJ5IGV4cHJlc3Npb24gdGhhdCBicmFuY2hlcyBvbiBoYXMgZmVhdHVyZSB0ZXN0XHJcbiAqIHZhbHVlKHMpLlxyXG4gKlxyXG4gKiBAcGFyYW0gcmVzb3VyY2VJZCBUaGUgaWQgb2YgdGhlIG1vZHVsZVxyXG4gKiBAcGFyYW0gbm9ybWFsaXplIFJlc29sdmVzIGEgcmVsYXRpdmUgbW9kdWxlIGlkIGludG8gYW4gYWJzb2x1dGUgbW9kdWxlIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemUocmVzb3VyY2VJZCwgbm9ybWFsaXplKSB7XHJcbiAgICB2YXIgdG9rZW5zID0gcmVzb3VyY2VJZC5tYXRjaCgvW1xcPzpdfFteOlxcP10qL2cpIHx8IFtdO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgZnVuY3Rpb24gZ2V0KHNraXApIHtcclxuICAgICAgICB2YXIgdGVybSA9IHRva2Vuc1tpKytdO1xyXG4gICAgICAgIGlmICh0ZXJtID09PSAnOicpIHtcclxuICAgICAgICAgICAgLy8gZW1wdHkgc3RyaW5nIG1vZHVsZSBuYW1lLCByZXNvbHZlcyB0byBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcG9zdGZpeGVkIHdpdGggYSA/IG1lYW5zIGl0IGlzIGEgZmVhdHVyZSB0byBicmFuY2ggb24sIHRoZSB0ZXJtIGlzIHRoZSBuYW1lIG9mIHRoZSBmZWF0dXJlXHJcbiAgICAgICAgICAgIGlmICh0b2tlbnNbaSsrXSA9PT0gJz8nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNraXAgJiYgaGFzKHRlcm0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hlZCB0aGUgZmVhdHVyZSwgZ2V0IHRoZSBmaXJzdCB2YWx1ZSBmcm9tIHRoZSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIG5vdCBtYXRjaCwgZ2V0IHRoZSBzZWNvbmQgdmFsdWUsIHBhc3Npbmcgb3ZlciB0aGUgZmlyc3RcclxuICAgICAgICAgICAgICAgICAgICBnZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChza2lwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhIG1vZHVsZVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaWQgPSBnZXQoKTtcclxuICAgIHJldHVybiBpZCAmJiBub3JtYWxpemUoaWQpO1xyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG4vKipcclxuICogQ2hlY2sgaWYgYSBmZWF0dXJlIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZFxyXG4gKlxyXG4gKiBAcGFyYW0gZmVhdHVyZSB0aGUgbmFtZSBvZiB0aGUgZmVhdHVyZVxyXG4gKi9cclxuZnVuY3Rpb24gZXhpc3RzKGZlYXR1cmUpIHtcclxuICAgIHZhciBub3JtYWxpemVkRmVhdHVyZSA9IGZlYXR1cmUudG9Mb3dlckNhc2UoKTtcclxuICAgIHJldHVybiBCb29sZWFuKG5vcm1hbGl6ZWRGZWF0dXJlIGluIHN0YXRpY0NhY2hlIHx8IG5vcm1hbGl6ZWRGZWF0dXJlIGluIGV4cG9ydHMudGVzdENhY2hlIHx8IGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV0pO1xyXG59XHJcbmV4cG9ydHMuZXhpc3RzID0gZXhpc3RzO1xyXG4vKipcclxuICogUmVnaXN0ZXIgYSBuZXcgdGVzdCBmb3IgYSBuYW1lZCBmZWF0dXJlLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBoYXMuYWRkKCdkb20tYWRkZXZlbnRsaXN0ZW5lcicsICEhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcik7XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIGhhcy5hZGQoJ3RvdWNoLWV2ZW50cycsIGZ1bmN0aW9uICgpIHtcclxuICogICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50XHJcbiAqIH0pO1xyXG4gKlxyXG4gKiBAcGFyYW0gZmVhdHVyZSB0aGUgbmFtZSBvZiB0aGUgZmVhdHVyZVxyXG4gKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHJlcG9ydGVkIG9mIHRoZSBmZWF0dXJlLCBvciBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBvbmNlIG9uIGZpcnN0IHRlc3RcclxuICogQHBhcmFtIG92ZXJ3cml0ZSBpZiBhbiBleGlzdGluZyB2YWx1ZSBzaG91bGQgYmUgb3ZlcndyaXR0ZW4uIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gKi9cclxuZnVuY3Rpb24gYWRkKGZlYXR1cmUsIHZhbHVlLCBvdmVyd3JpdGUpIHtcclxuICAgIGlmIChvdmVyd3JpdGUgPT09IHZvaWQgMCkgeyBvdmVyd3JpdGUgPSBmYWxzZTsgfVxyXG4gICAgdmFyIG5vcm1hbGl6ZWRGZWF0dXJlID0gZmVhdHVyZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGV4aXN0cyhub3JtYWxpemVkRmVhdHVyZSkgJiYgIW92ZXJ3cml0ZSAmJiAhKG5vcm1hbGl6ZWRGZWF0dXJlIGluIHN0YXRpY0NhY2hlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGZWF0dXJlIFxcXCJcIiArIGZlYXR1cmUgKyBcIlxcXCIgZXhpc3RzIGFuZCBvdmVyd3JpdGUgbm90IHRydWUuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzRmVhdHVyZVRlc3RUaGVuYWJsZSh2YWx1ZSkpIHtcclxuICAgICAgICB0ZXN0VGhlbmFibGVzW2ZlYXR1cmVdID0gdmFsdWUudGhlbihmdW5jdGlvbiAocmVzb2x2ZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICBleHBvcnRzLnRlc3RDYWNoZVtmZWF0dXJlXSA9IHJlc29sdmVkVmFsdWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0ZXN0VGhlbmFibGVzW2ZlYXR1cmVdO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRlc3RUaGVuYWJsZXNbZmVhdHVyZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBleHBvcnRzLnRlc3RDYWNoZVtub3JtYWxpemVkRmVhdHVyZV0gPSB2YWx1ZTtcclxuICAgICAgICBkZWxldGUgZXhwb3J0cy50ZXN0RnVuY3Rpb25zW25vcm1hbGl6ZWRGZWF0dXJlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmFkZCA9IGFkZDtcclxuLyoqXHJcbiAqIFJldHVybiB0aGUgY3VycmVudCB2YWx1ZSBvZiBhIG5hbWVkIGZlYXR1cmUuXHJcbiAqXHJcbiAqIEBwYXJhbSBmZWF0dXJlIFRoZSBuYW1lIChpZiBhIHN0cmluZykgb3IgaWRlbnRpZmllciAoaWYgYW4gaW50ZWdlcikgb2YgdGhlIGZlYXR1cmUgdG8gdGVzdC5cclxuICovXHJcbmZ1bmN0aW9uIGhhcyhmZWF0dXJlKSB7XHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgdmFyIG5vcm1hbGl6ZWRGZWF0dXJlID0gZmVhdHVyZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRGZWF0dXJlIGluIHN0YXRpY0NhY2hlKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gc3RhdGljQ2FjaGVbbm9ybWFsaXplZEZlYXR1cmVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXhwb3J0cy50ZXN0RnVuY3Rpb25zW25vcm1hbGl6ZWRGZWF0dXJlXSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGV4cG9ydHMudGVzdENhY2hlW25vcm1hbGl6ZWRGZWF0dXJlXSA9IGV4cG9ydHMudGVzdEZ1bmN0aW9uc1tub3JtYWxpemVkRmVhdHVyZV0uY2FsbChudWxsKTtcclxuICAgICAgICBkZWxldGUgZXhwb3J0cy50ZXN0RnVuY3Rpb25zW25vcm1hbGl6ZWRGZWF0dXJlXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG5vcm1hbGl6ZWRGZWF0dXJlIGluIGV4cG9ydHMudGVzdENhY2hlKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gZXhwb3J0cy50ZXN0Q2FjaGVbbm9ybWFsaXplZEZlYXR1cmVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmVhdHVyZSBpbiB0ZXN0VGhlbmFibGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkF0dGVtcHQgdG8gZGV0ZWN0IHVucmVnaXN0ZXJlZCBoYXMgZmVhdHVyZSBcXFwiXCIgKyBmZWF0dXJlICsgXCJcXFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBoYXM7XHJcbi8qXHJcbiAqIE91dCBvZiB0aGUgYm94IGZlYXR1cmUgdGVzdHNcclxuICovXHJcbi8qIEVudmlyb25tZW50cyAqL1xyXG4vKiBVc2VkIGFzIGEgdmFsdWUgdG8gcHJvdmlkZSBhIGRlYnVnIG9ubHkgY29kZSBwYXRoICovXHJcbmFkZCgnZGVidWcnLCB0cnVlKTtcclxuLyogRGV0ZWN0cyBpZiB0aGUgZW52aXJvbm1lbnQgaXMgXCJicm93c2VyIGxpa2VcIiAqL1xyXG5hZGQoJ2hvc3QtYnJvd3NlcicsIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyk7XHJcbi8qIERldGVjdHMgaWYgdGhlIGVudmlyb25tZW50IGFwcGVhcnMgdG8gYmUgTm9kZUpTICovXHJcbmFkZCgnaG9zdC1ub2RlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZSkge1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzLnZlcnNpb25zLm5vZGU7XHJcbiAgICB9XHJcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2hhcy9oYXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL2hhcy9oYXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBpdGVyYXRvcl8xID0gcmVxdWlyZShcIi4vaXRlcmF0b3JcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbFwiKTtcclxudmFyIG9iamVjdF8xID0gcmVxdWlyZShcIi4vb2JqZWN0XCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxucmVxdWlyZShcIi4vU3ltYm9sXCIpO1xyXG5leHBvcnRzLk1hcCA9IGdsb2JhbF8xLmRlZmF1bHQuTWFwO1xyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ2VzNi1tYXAnKSkge1xyXG4gICAgZXhwb3J0cy5NYXAgPSAoX2EgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIE1hcChpdGVyYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSAnTWFwJztcclxuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvcl8xLmlzQXJyYXlMaWtlKGl0ZXJhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KHZhbHVlWzBdLCB2YWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpdGVyYWJsZV8xID0gdHNsaWJfMS5fX3ZhbHVlcyhpdGVyYWJsZSksIGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpOyAhaXRlcmFibGVfMV8xLmRvbmU7IGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KHZhbHVlWzBdLCB2YWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBlXzEsIF9hO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBbiBhbHRlcm5hdGl2ZSB0byBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB1c2luZyBPYmplY3QuaXNcclxuICAgICAgICAgICAgICogdG8gY2hlY2sgZm9yIGVxdWFsaXR5LiBTZWUgaHR0cDovL216bC5sYS8xenVLTzJWXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLl9pbmRleE9mS2V5ID0gZnVuY3Rpb24gKGtleXMsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aF8xID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGhfMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdF8xLmlzKGtleXNbaV0sIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGggPSB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9rZXlzLm1hcChmdW5jdGlvbiAoa2V5LCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIF90aGlzLl92YWx1ZXNbaV1dO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGl0ZXJhdG9yXzEuU2hpbUl0ZXJhdG9yKHZhbHVlcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSB0aGlzLl9rZXlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGhfMiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoXzI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdmFsdWVzW2ldLCBrZXlzW2ldLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogdGhpcy5fdmFsdWVzW2luZGV4XTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpID4gLTE7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaXRlcmF0b3JfMS5TaGltSXRlcmF0b3IodGhpcy5fa2V5cyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggPCAwID8gdGhpcy5fa2V5cy5sZW5ndGggOiBpbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNbaW5kZXhdID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBNYXA7XHJcbiAgICAgICAgfSgpKSxcclxuICAgICAgICBfYVtTeW1ib2wuc3BlY2llc10gPSBfYSxcclxuICAgICAgICBfYSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5NYXA7XHJcbnZhciBfYTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL01hcC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9NYXAuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbFwiKTtcclxudmFyIHF1ZXVlXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L3F1ZXVlXCIpO1xyXG5yZXF1aXJlKFwiLi9TeW1ib2xcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvaGFzXCIpO1xyXG5leHBvcnRzLlNoaW1Qcm9taXNlID0gZ2xvYmFsXzEuZGVmYXVsdC5Qcm9taXNlO1xyXG5leHBvcnRzLmlzVGhlbmFibGUgPSBmdW5jdGlvbiBpc1RoZW5hYmxlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XHJcbn07XHJcbmlmICghaGFzXzEuZGVmYXVsdCgnZXM2LXByb21pc2UnKSkge1xyXG4gICAgZ2xvYmFsXzEuZGVmYXVsdC5Qcm9taXNlID0gZXhwb3J0cy5TaGltUHJvbWlzZSA9IChfYSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgUHJvbWlzZS5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBleGVjdXRvclxyXG4gICAgICAgICAgICAgKiBUaGUgZXhlY3V0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIGltbWVkaWF0ZWx5IHdoZW4gdGhlIFByb21pc2UgaXMgaW5zdGFudGlhdGVkLiBJdCBpcyByZXNwb25zaWJsZSBmb3JcclxuICAgICAgICAgICAgICogc3RhcnRpbmcgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gd2hlbiBpdCBpcyBpbnZva2VkLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBUaGUgZXhlY3V0b3IgbXVzdCBjYWxsIGVpdGhlciB0aGUgcGFzc2VkIGByZXNvbHZlYCBmdW5jdGlvbiB3aGVuIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWRcclxuICAgICAgICAgICAgICogc3VjY2Vzc2Z1bGx5LCBvciB0aGUgYHJlamVjdGAgZnVuY3Rpb24gd2hlbiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gMSAvKiBQZW5kaW5nICovO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tTeW1ib2wudG9TdHJpbmdUYWddID0gJ1Byb21pc2UnO1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBJZiB0cnVlLCB0aGUgcmVzb2x1dGlvbiBvZiB0aGlzIHByb21pc2UgaXMgY2hhaW5lZCAoXCJsb2NrZWQgaW5cIikgdG8gYW5vdGhlciBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNDaGFpbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFdoZXRoZXIgb3Igbm90IHRoaXMgcHJvbWlzZSBpcyBpbiBhIHJlc29sdmVkIHN0YXRlLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNSZXNvbHZlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc3RhdGUgIT09IDEgLyogUGVuZGluZyAqLyB8fCBpc0NoYWluZWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBDYWxsYmFja3MgdGhhdCBzaG91bGQgYmUgaW52b2tlZCBvbmNlIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogSW5pdGlhbGx5IHB1c2hlcyBjYWxsYmFja3Mgb250byBhIHF1ZXVlIGZvciBleGVjdXRpb24gb25jZSB0aGlzIHByb21pc2Ugc2V0dGxlcy4gQWZ0ZXIgdGhlIHByb21pc2Ugc2V0dGxlcyxcclxuICAgICAgICAgICAgICAgICAqIGVucXVldWVzIGNhbGxiYWNrcyBmb3IgZXhlY3V0aW9uIG9uIHRoZSBuZXh0IGV2ZW50IGxvb3AgdHVybi5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHdoZW5GaW5pc2hlZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFNldHRsZXMgdGhpcyBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSBuZXdTdGF0ZSBUaGUgcmVzb2x2ZWQgc3RhdGUgZm9yIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7VHxhbnl9IHZhbHVlIFRoZSByZXNvbHZlZCB2YWx1ZSBmb3IgdGhpcyBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGxlID0gZnVuY3Rpb24gKG5ld1N0YXRlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEEgcHJvbWlzZSBjYW4gb25seSBiZSBzZXR0bGVkIG9uY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnN0YXRlICE9PSAxIC8qIFBlbmRpbmcgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlc29sdmVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB3aGVuRmluaXNoZWQgPSBxdWV1ZV8xLnF1ZXVlTWljcm9UYXNrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgZW5xdWV1ZSBhIGNhbGxiYWNrIHJ1bm5lciBpZiB0aGVyZSBhcmUgY2FsbGJhY2tzIHNvIHRoYXQgaW5pdGlhbGx5IGZ1bGZpbGxlZCBQcm9taXNlcyBkb24ndCBoYXZlIHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2FpdCBhbiBleHRyYSB0dXJuLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MgJiYgY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVfMS5xdWV1ZU1pY3JvVGFzayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gY2FsbGJhY2tzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFJlc29sdmVzIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAobmV3U3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmVzb2x2ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBvcnRzLmlzVGhlbmFibGUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnRoZW4oc2V0dGxlLmJpbmQobnVsbCwgMCAvKiBGdWxmaWxsZWQgKi8pLCBzZXR0bGUuYmluZChudWxsLCAyIC8qIFJlamVjdGVkICovKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hhaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0bGUobmV3U3RhdGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVuID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbkZpbmlzaGVkIGluaXRpYWxseSBxdWV1ZXMgdXAgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gYWZ0ZXIgdGhlIHByb21pc2UgaGFzIHNldHRsZWQuIE9uY2UgdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb21pc2UgaGFzIHNldHRsZWQsIHdoZW5GaW5pc2hlZCB3aWxsIHNjaGVkdWxlIGNhbGxiYWNrcyBmb3IgZXhlY3V0aW9uIG9uIHRoZSBuZXh0IHR1cm4gdGhyb3VnaCB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQgbG9vcC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlbkZpbmlzaGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF90aGlzLnN0YXRlID09PSAyIC8qIFJlamVjdGVkICovID8gb25SZWplY3RlZCA6IG9uRnVsZmlsbGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FsbGJhY2soX3RoaXMucmVzb2x2ZWRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChfdGhpcy5zdGF0ZSA9PT0gMiAvKiBSZWplY3RlZCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChfdGhpcy5yZXNvbHZlZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMucmVzb2x2ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0b3IocmVzb2x2ZS5iaW5kKG51bGwsIDAgLyogRnVsZmlsbGVkICovKSwgcmVzb2x2ZS5iaW5kKG51bGwsIDIgLyogUmVqZWN0ZWQgKi8pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRsZSgyIC8qIFJlamVjdGVkICovLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwgPSBmdW5jdGlvbiAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdWxhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZnVsZmlsbChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2NvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5pc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZmluaXNoKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9wdWxhdGluZyB8fCBjb21wbGV0ZSA8IHRvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzSXRlbShpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK3RvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb3J0cy5pc1RoZW5hYmxlKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBhbiBpdGVtIFByb21pc2UgcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRoZW4oZnVsZmlsbC5iaW5kKG51bGwsIGluZGV4KSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShpdGVtKS50aGVuKGZ1bGZpbGwuYmluZChudWxsLCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpdGVyYWJsZV8xID0gdHNsaWJfMS5fX3ZhbHVlcyhpdGVyYWJsZSksIGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpOyAhaXRlcmFibGVfMV8xLmRvbmU7IGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZV8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbShpLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmaW5pc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMiA9IHRzbGliXzEuX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8yXzEgPSBpdGVyYWJsZV8yLm5leHQoKTsgIWl0ZXJhYmxlXzJfMS5kb25lOyBpdGVyYWJsZV8yXzEgPSBpdGVyYWJsZV8yLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVyYWJsZV8yXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIFByb21pc2UgaXRlbSByZWplY3RzLCB0aGlzIFByb21pc2UgaXMgaW1tZWRpYXRlbHkgcmVqZWN0ZWQgd2l0aCB0aGUgaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoaXRlbSkudGhlbihyZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlXzJfMSAmJiAhaXRlcmFibGVfMl8xLmRvbmUgJiYgKF9hID0gaXRlcmFibGVfMi5yZXR1cm4pKSBfYS5jYWxsKGl0ZXJhYmxlXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVfMiwgX2E7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZTtcclxuICAgICAgICB9KCkpLFxyXG4gICAgICAgIF9hW1N5bWJvbC5zcGVjaWVzXSA9IGV4cG9ydHMuU2hpbVByb21pc2UsXHJcbiAgICAgICAgX2EpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuU2hpbVByb21pc2U7XHJcbnZhciBfYTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxucmVxdWlyZShcIi4vU3ltYm9sXCIpO1xyXG5leHBvcnRzLlNldCA9IGdsb2JhbF8xLmRlZmF1bHQuU2V0O1xyXG5pZiAoIWhhc18xLmRlZmF1bHQoJ2VzNi1zZXQnKSkge1xyXG4gICAgZXhwb3J0cy5TZXQgPSAoX2EgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFNldChpdGVyYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tTeW1ib2wudG9TdHJpbmdUYWddID0gJ1NldCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3JfMS5pc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoaXRlcmFibGVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IHRzbGliXzEuX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhYmxlXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBlXzEsIF9hO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5fc2V0RGF0YS5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGl0ZXJhdG9yXzEuU2hpbUl0ZXJhdG9yKHRoaXMuX3NldERhdGEubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gW3ZhbHVlLCB2YWx1ZV07IH0pKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IHRoaXMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFyZXN1bHQuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrZm4uY2FsbCh0aGlzQXJnLCByZXN1bHQudmFsdWUsIHJlc3VsdC52YWx1ZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldERhdGEuaW5kZXhPZih2YWx1ZSkgPiAtMTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBpdGVyYXRvcl8xLlNoaW1JdGVyYXRvcih0aGlzLl9zZXREYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0RGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgU2V0LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGl0ZXJhdG9yXzEuU2hpbUl0ZXJhdG9yKHRoaXMuX3NldERhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBTZXQucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGl0ZXJhdG9yXzEuU2hpbUl0ZXJhdG9yKHRoaXMuX3NldERhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gU2V0O1xyXG4gICAgICAgIH0oKSksXHJcbiAgICAgICAgX2FbU3ltYm9sLnNwZWNpZXNdID0gX2EsXHJcbiAgICAgICAgX2EpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuU2V0O1xyXG52YXIgX2E7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9TZXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vU2V0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvaGFzXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L3V0aWxcIik7XHJcbmV4cG9ydHMuU3ltYm9sID0gZ2xvYmFsXzEuZGVmYXVsdC5TeW1ib2w7XHJcbmlmICghaGFzXzEuZGVmYXVsdCgnZXM2LXN5bWJvbCcpKSB7XHJcbiAgICAvKipcclxuICAgICAqIFRocm93cyBpZiB0aGUgdmFsdWUgaXMgbm90IGEgc3ltYm9sLCB1c2VkIGludGVybmFsbHkgd2l0aGluIHRoZSBTaGltXHJcbiAgICAgKiBAcGFyYW0gIHthbnl9ICAgIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xyXG4gICAgICogQHJldHVybiB7c3ltYm9sfSAgICAgICBSZXR1cm5zIHRoZSBzeW1ib2wgb3IgdGhyb3dzXHJcbiAgICAgKi9cclxuICAgIHZhciB2YWxpZGF0ZVN5bWJvbF8xID0gZnVuY3Rpb24gdmFsaWRhdGVTeW1ib2wodmFsdWUpIHtcclxuICAgICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHZhbHVlICsgJyBpcyBub3QgYSBzeW1ib2wnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIHZhciBkZWZpbmVQcm9wZXJ0aWVzXzEgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcztcclxuICAgIHZhciBkZWZpbmVQcm9wZXJ0eV8xID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xyXG4gICAgdmFyIGNyZWF0ZV8xID0gT2JqZWN0LmNyZWF0ZTtcclxuICAgIHZhciBvYmpQcm90b3R5cGVfMSA9IE9iamVjdC5wcm90b3R5cGU7XHJcbiAgICB2YXIgZ2xvYmFsU3ltYm9sc18xID0ge307XHJcbiAgICB2YXIgZ2V0U3ltYm9sTmFtZV8xID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3JlYXRlZCA9IGNyZWF0ZV8xKG51bGwpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVzYykge1xyXG4gICAgICAgICAgICB2YXIgcG9zdGZpeCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBuYW1lO1xyXG4gICAgICAgICAgICB3aGlsZSAoY3JlYXRlZFtTdHJpbmcoZGVzYykgKyAocG9zdGZpeCB8fCAnJyldKSB7XHJcbiAgICAgICAgICAgICAgICArK3Bvc3RmaXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVzYyArPSBTdHJpbmcocG9zdGZpeCB8fCAnJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZWRbZGVzY10gPSB0cnVlO1xyXG4gICAgICAgICAgICBuYW1lID0gJ0BAJyArIGRlc2M7XHJcbiAgICAgICAgICAgIC8vIEZJWE1FOiBUZW1wb3JhcnkgZ3VhcmQgdW50aWwgdGhlIGR1cGxpY2F0ZSBleGVjdXRpb24gd2hlbiB0ZXN0aW5nIGNhbiBiZVxyXG4gICAgICAgICAgICAvLyBwaW5uZWQgZG93bi5cclxuICAgICAgICAgICAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9ialByb3RvdHlwZV8xLCBuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHlfMShvYmpQcm90b3R5cGVfMSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5XzEodGhpcywgbmFtZSwgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcih2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gICAgdmFyIEludGVybmFsU3ltYm9sXzEgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcclxuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEludGVybmFsU3ltYm9sXzEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZUVycm9yOiBTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFN5bWJvbChkZXNjcmlwdGlvbik7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5TeW1ib2wgPSBnbG9iYWxfMS5kZWZhdWx0LlN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbChkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzeW0gPSBPYmplY3QuY3JlYXRlKEludGVybmFsU3ltYm9sXzEucHJvdG90eXBlKTtcclxuICAgICAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnRpZXNfMShzeW0sIHtcclxuICAgICAgICAgICAgX19kZXNjcmlwdGlvbl9fOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGRlc2NyaXB0aW9uKSxcclxuICAgICAgICAgICAgX19uYW1lX186IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZ2V0U3ltYm9sTmFtZV8xKGRlc2NyaXB0aW9uKSlcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiBEZWNvcmF0ZSB0aGUgU3ltYm9sIGZ1bmN0aW9uIHdpdGggdGhlIGFwcHJvcHJpYXRlIHByb3BlcnRpZXMgKi9cclxuICAgIGRlZmluZVByb3BlcnR5XzEoZXhwb3J0cy5TeW1ib2wsICdmb3InLCB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZiAoZ2xvYmFsU3ltYm9sc18xW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbFN5bWJvbHNfMVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGdsb2JhbFN5bWJvbHNfMVtrZXldID0gZXhwb3J0cy5TeW1ib2woU3RyaW5nKGtleSkpKTtcclxuICAgIH0pKTtcclxuICAgIGRlZmluZVByb3BlcnRpZXNfMShleHBvcnRzLlN5bWJvbCwge1xyXG4gICAgICAgIGtleUZvcjogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbiAoc3ltKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXk7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlU3ltYm9sXzEoc3ltKTtcclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZ2xvYmFsU3ltYm9sc18xKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsU3ltYm9sc18xW2tleV0gPT09IHN5bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxcclxuICAgICAgICBoYXNJbnN0YW5jZTogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ2hhc0luc3RhbmNlJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgaXNDb25jYXRTcHJlYWRhYmxlOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcignaXNDb25jYXRTcHJlYWRhYmxlJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgaXRlcmF0b3I6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCdpdGVyYXRvcicpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIG1hdGNoOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcignbWF0Y2gnKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICBvYnNlcnZhYmxlOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcignb2JzZXJ2YWJsZScpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIHJlcGxhY2U6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCdyZXBsYWNlJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgc2VhcmNoOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcignc2VhcmNoJyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgc3BlY2llczogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ3NwZWNpZXMnKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICBzcGxpdDogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ3NwbGl0JyksIGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgdG9QcmltaXRpdmU6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wuZm9yKCd0b1ByaW1pdGl2ZScpLCBmYWxzZSwgZmFsc2UpLFxyXG4gICAgICAgIHRvU3RyaW5nVGFnOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcigndG9TdHJpbmdUYWcnKSwgZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICB1bnNjb3BhYmxlczogdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5mb3IoJ3Vuc2NvcGFibGVzJyksIGZhbHNlLCBmYWxzZSlcclxuICAgIH0pO1xyXG4gICAgLyogRGVjb3JhdGUgdGhlIEludGVybmFsU3ltYm9sIG9iamVjdCAqL1xyXG4gICAgZGVmaW5lUHJvcGVydGllc18xKEludGVybmFsU3ltYm9sXzEucHJvdG90eXBlLCB7XHJcbiAgICAgICAgY29uc3RydWN0b3I6IHV0aWxfMS5nZXRWYWx1ZURlc2NyaXB0b3IoZXhwb3J0cy5TeW1ib2wpLFxyXG4gICAgICAgIHRvU3RyaW5nOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19uYW1lX187XHJcbiAgICAgICAgfSwgZmFsc2UsIGZhbHNlKVxyXG4gICAgfSk7XHJcbiAgICAvKiBEZWNvcmF0ZSB0aGUgU3ltYm9sLnByb3RvdHlwZSAqL1xyXG4gICAgZGVmaW5lUHJvcGVydGllc18xKGV4cG9ydHMuU3ltYm9sLnByb3RvdHlwZSwge1xyXG4gICAgICAgIHRvU3RyaW5nOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdTeW1ib2wgKCcgKyB2YWxpZGF0ZVN5bWJvbF8xKHRoaXMpLl9fZGVzY3JpcHRpb25fXyArICcpJztcclxuICAgICAgICB9KSxcclxuICAgICAgICB2YWx1ZU9mOiB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlU3ltYm9sXzEodGhpcyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgZGVmaW5lUHJvcGVydHlfMShleHBvcnRzLlN5bWJvbC5wcm90b3R5cGUsIGV4cG9ydHMuU3ltYm9sLnRvUHJpbWl0aXZlLCB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdmFsaWRhdGVTeW1ib2xfMSh0aGlzKTtcclxuICAgIH0pKTtcclxuICAgIGRlZmluZVByb3BlcnR5XzEoZXhwb3J0cy5TeW1ib2wucHJvdG90eXBlLCBleHBvcnRzLlN5bWJvbC50b1N0cmluZ1RhZywgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcignU3ltYm9sJywgZmFsc2UsIGZhbHNlLCB0cnVlKSk7XHJcbiAgICBkZWZpbmVQcm9wZXJ0eV8xKEludGVybmFsU3ltYm9sXzEucHJvdG90eXBlLCBleHBvcnRzLlN5bWJvbC50b1ByaW1pdGl2ZSwgdXRpbF8xLmdldFZhbHVlRGVzY3JpcHRvcihleHBvcnRzLlN5bWJvbC5wcm90b3R5cGVbZXhwb3J0cy5TeW1ib2wudG9QcmltaXRpdmVdLCBmYWxzZSwgZmFsc2UsIHRydWUpKTtcclxuICAgIGRlZmluZVByb3BlcnR5XzEoSW50ZXJuYWxTeW1ib2xfMS5wcm90b3R5cGUsIGV4cG9ydHMuU3ltYm9sLnRvU3RyaW5nVGFnLCB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLnByb3RvdHlwZVtleHBvcnRzLlN5bWJvbC50b1N0cmluZ1RhZ10sIGZhbHNlLCBmYWxzZSwgdHJ1ZSkpO1xyXG59XHJcbi8qKlxyXG4gKiBBIGN1c3RvbSBndWFyZCBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgaWYgYW4gb2JqZWN0IGlzIGEgc3ltYm9sIG9yIG5vdFxyXG4gKiBAcGFyYW0gIHthbnl9ICAgICAgIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjayB0byBzZWUgaWYgaXQgaXMgYSBzeW1ib2wgb3Igbm90XHJcbiAqIEByZXR1cm4ge2lzIHN5bWJvbH0gICAgICAgUmV0dXJucyB0cnVlIGlmIGEgc3ltYm9sIG9yIG5vdCAoYW5kIG5hcnJvd3MgdGhlIHR5cGUgZ3VhcmQpXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fCB2YWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykpIHx8IGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcclxuLyoqXHJcbiAqIEZpbGwgYW55IG1pc3Npbmcgd2VsbCBrbm93biBzeW1ib2xzIGlmIHRoZSBuYXRpdmUgU3ltYm9sIGlzIG1pc3NpbmcgdGhlbVxyXG4gKi9cclxuW1xyXG4gICAgJ2hhc0luc3RhbmNlJyxcclxuICAgICdpc0NvbmNhdFNwcmVhZGFibGUnLFxyXG4gICAgJ2l0ZXJhdG9yJyxcclxuICAgICdzcGVjaWVzJyxcclxuICAgICdyZXBsYWNlJyxcclxuICAgICdzZWFyY2gnLFxyXG4gICAgJ3NwbGl0JyxcclxuICAgICdtYXRjaCcsXHJcbiAgICAndG9QcmltaXRpdmUnLFxyXG4gICAgJ3RvU3RyaW5nVGFnJyxcclxuICAgICd1bnNjb3BhYmxlcycsXHJcbiAgICAnb2JzZXJ2YWJsZSdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uICh3ZWxsS25vd24pIHtcclxuICAgIGlmICghZXhwb3J0cy5TeW1ib2xbd2VsbEtub3duXSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLlN5bWJvbCwgd2VsbEtub3duLCB1dGlsXzEuZ2V0VmFsdWVEZXNjcmlwdG9yKGV4cG9ydHMuU3ltYm9sLmZvcih3ZWxsS25vd24pLCBmYWxzZSwgZmFsc2UpKTtcclxuICAgIH1cclxufSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuU3ltYm9sO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4vZ2xvYmFsXCIpO1xyXG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L2hhc1wiKTtcclxucmVxdWlyZShcIi4vU3ltYm9sXCIpO1xyXG5leHBvcnRzLldlYWtNYXAgPSBnbG9iYWxfMS5kZWZhdWx0LldlYWtNYXA7XHJcbmlmICghaGFzXzEuZGVmYXVsdCgnZXM2LXdlYWttYXAnKSkge1xyXG4gICAgdmFyIERFTEVURURfMSA9IHt9O1xyXG4gICAgdmFyIGdldFVJRF8xID0gZnVuY3Rpb24gZ2V0VUlEKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xyXG4gICAgfTtcclxuICAgIHZhciBnZW5lcmF0ZU5hbWVfMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0SWQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgJSAxMDAwMDAwMDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBnZW5lcmF0ZU5hbWUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnX193bScgKyBnZXRVSURfMSgpICsgKHN0YXJ0SWQrKyArICdfXycpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG4gICAgZXhwb3J0cy5XZWFrTWFwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgdGhpc1tTeW1ib2wudG9TdHJpbmdUYWddID0gJ1dlYWtNYXAnO1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gZ2VuZXJhdGVOYW1lXzEoKTtcclxuICAgICAgICAgICAgdGhpcy5fZnJvemVuRW50cmllcyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoaXRlcmFibGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvcl8xLmlzQXJyYXlMaWtlKGl0ZXJhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVyYWJsZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoaXRlbVswXSwgaXRlbVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IHRzbGliXzEuX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gdHNsaWJfMS5fX3JlYWQoaXRlcmFibGVfMV8xLnZhbHVlLCAyKSwga2V5ID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlXzFfMSAmJiAhaXRlcmFibGVfMV8xLmRvbmUgJiYgKF9iID0gaXRlcmFibGVfMS5yZXR1cm4pKSBfYi5jYWxsKGl0ZXJhYmxlXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVfMSwgX2I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFdlYWtNYXAucHJvdG90eXBlLl9nZXRGcm96ZW5FbnRyeUluZGV4ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Zyb3plbkVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcm96ZW5FbnRyaWVzW2ldLmtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURURfMSkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkudmFsdWUgPSBERUxFVEVEXzE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChmcm96ZW5JbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm96ZW5FbnRyaWVzLnNwbGljZShmcm96ZW5JbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURURfMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmcm96ZW5JbmRleCA9IHRoaXMuX2dldEZyb3plbkVudHJ5SW5kZXgoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGZyb3plbkluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcm96ZW5FbnRyaWVzW2Zyb3plbkluZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoQm9vbGVhbihlbnRyeSAmJiBlbnRyeS5rZXkgPT09IGtleSAmJiBlbnRyeS52YWx1ZSAhPT0gREVMRVRFRF8xKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGZyb3plbkluZGV4ID0gdGhpcy5fZ2V0RnJvemVuRW50cnlJbmRleChrZXkpO1xyXG4gICAgICAgICAgICBpZiAoZnJvemVuSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCFrZXkgfHwgKHR5cGVvZiBrZXkgIT09ICdvYmplY3QnICYmIHR5cGVvZiBrZXkgIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZhbHVlIHVzZWQgYXMgd2VhayBtYXAga2V5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIWVudHJ5IHx8IGVudHJ5LmtleSAhPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogeyB2YWx1ZToga2V5IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5pc0Zyb3plbihrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJvemVuRW50cmllcy5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXksIHRoaXMuX25hbWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGVudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW50cnkudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gV2Vha01hcDtcclxuICAgIH0oKSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5XZWFrTWFwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vV2Vha01hcC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9XZWFrTWFwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciBpdGVyYXRvcl8xID0gcmVxdWlyZShcIi4vaXRlcmF0b3JcIik7XHJcbnZhciBudW1iZXJfMSA9IHJlcXVpcmUoXCIuL251bWJlclwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9oYXNcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi9zdXBwb3J0L3V0aWxcIik7XHJcbmlmIChoYXNfMS5kZWZhdWx0KCdlczYtYXJyYXknKSAmJiBoYXNfMS5kZWZhdWx0KCdlczYtYXJyYXktZmlsbCcpKSB7XHJcbiAgICBleHBvcnRzLmZyb20gPSBnbG9iYWxfMS5kZWZhdWx0LkFycmF5LmZyb207XHJcbiAgICBleHBvcnRzLm9mID0gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5vZjtcclxuICAgIGV4cG9ydHMuY29weVdpdGhpbiA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4pO1xyXG4gICAgZXhwb3J0cy5maWxsID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGUuZmlsbCk7XHJcbiAgICBleHBvcnRzLmZpbmQgPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LkFycmF5LnByb3RvdHlwZS5maW5kKTtcclxuICAgIGV4cG9ydHMuZmluZEluZGV4ID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGUuZmluZEluZGV4KTtcclxufVxyXG5lbHNlIHtcclxuICAgIC8vIEl0IGlzIG9ubHkgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpL2lPUyB0aGF0IGhhdmUgYSBiYWQgZmlsbCBpbXBsZW1lbnRhdGlvbiBhbmQgc28gYXJlbid0IGluIHRoZSB3aWxkXHJcbiAgICAvLyBUbyBtYWtlIHRoaW5ncyBlYXNpZXIsIGlmIHRoZXJlIGlzIGEgYmFkIGZpbGwgaW1wbGVtZW50YXRpb24sIHRoZSB3aG9sZSBzZXQgb2YgZnVuY3Rpb25zIHdpbGwgYmUgZmlsbGVkXHJcbiAgICAvKipcclxuICAgICAqIEVuc3VyZXMgYSBub24tbmVnYXRpdmUsIG5vbi1pbmZpbml0ZSwgc2FmZSBpbnRlZ2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsZW5ndGggVGhlIG51bWJlciB0byB2YWxpZGF0ZVxyXG4gICAgICogQHJldHVybiBBIHByb3BlciBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgdmFyIHRvTGVuZ3RoXzEgPSBmdW5jdGlvbiB0b0xlbmd0aChsZW5ndGgpIHtcclxuICAgICAgICBpZiAoaXNOYU4obGVuZ3RoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XHJcbiAgICAgICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5mbG9vcihsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbnN1cmUgYSBub24tbmVnYXRpdmUsIHJlYWwsIHNhZmUgaW50ZWdlclxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW5ndGgsIDApLCBudW1iZXJfMS5NQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZyb20gRVM2IDcuMS40IFRvSW50ZWdlcigpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlIEEgdmFsdWUgdG8gY29udmVydFxyXG4gICAgICogQHJldHVybiBBbiBpbnRlZ2VyXHJcbiAgICAgKi9cclxuICAgIHZhciB0b0ludGVnZXJfMSA9IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xyXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IDAgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAodmFsdWUgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnModmFsdWUpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIE5vcm1hbGl6ZXMgYW4gb2Zmc2V0IGFnYWluc3QgYSBnaXZlbiBsZW5ndGgsIHdyYXBwaW5nIGl0IGlmIG5lZ2F0aXZlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgb3JpZ2luYWwgb2Zmc2V0XHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggdG8gbm9ybWFsaXplIGFnYWluc3RcclxuICAgICAqIEByZXR1cm4gSWYgbmVnYXRpdmUsIHByb3ZpZGUgYSBkaXN0YW5jZSBmcm9tIHRoZSBlbmQgKGxlbmd0aCk7IG90aGVyd2lzZSBwcm92aWRlIGEgZGlzdGFuY2UgZnJvbSAwXHJcbiAgICAgKi9cclxuICAgIHZhciBub3JtYWxpemVPZmZzZXRfMSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZU9mZnNldCh2YWx1ZSwgbGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIDwgMCA/IE1hdGgubWF4KGxlbmd0aCArIHZhbHVlLCAwKSA6IE1hdGgubWluKHZhbHVlLCBsZW5ndGgpO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZnJvbSA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLCBtYXBGdW5jdGlvbiwgdGhpc0FyZykge1xyXG4gICAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmcm9tOiByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFwRnVuY3Rpb24gJiYgdGhpc0FyZykge1xyXG4gICAgICAgICAgICBtYXBGdW5jdGlvbiA9IG1hcEZ1bmN0aW9uLmJpbmQodGhpc0FyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXHJcbiAgICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGhfMShhcnJheUxpa2UubGVuZ3RoKTtcclxuICAgICAgICAvLyBTdXBwb3J0IGV4dGVuc2lvblxyXG4gICAgICAgIHZhciBhcnJheSA9IHR5cGVvZiBDb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdChuZXcgQ29uc3RydWN0b3IobGVuZ3RoKSkgOiBuZXcgQXJyYXkobGVuZ3RoKTtcclxuICAgICAgICBpZiAoIWl0ZXJhdG9yXzEuaXNBcnJheUxpa2UoYXJyYXlMaWtlKSAmJiAhaXRlcmF0b3JfMS5pc0l0ZXJhYmxlKGFycmF5TGlrZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB0aGlzIGlzIGFuIGFycmF5IGFuZCB0aGUgbm9ybWFsaXplZCBsZW5ndGggaXMgMCwganVzdCByZXR1cm4gYW4gZW1wdHkgYXJyYXkuIHRoaXMgcHJldmVudHMgYSBwcm9ibGVtXHJcbiAgICAgICAgLy8gd2l0aCB0aGUgaXRlcmF0aW9uIG9uIElFIHdoZW4gdXNpbmcgYSBOYU4gYXJyYXkgbGVuZ3RoLlxyXG4gICAgICAgIGlmIChpdGVyYXRvcl8xLmlzQXJyYXlMaWtlKGFycmF5TGlrZSkpIHtcclxuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMaWtlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IG1hcEZ1bmN0aW9uID8gbWFwRnVuY3Rpb24oYXJyYXlMaWtlW2ldLCBpKSA6IGFycmF5TGlrZVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYXJyYXlMaWtlXzEgPSB0c2xpYl8xLl9fdmFsdWVzKGFycmF5TGlrZSksIGFycmF5TGlrZV8xXzEgPSBhcnJheUxpa2VfMS5uZXh0KCk7ICFhcnJheUxpa2VfMV8xLmRvbmU7IGFycmF5TGlrZV8xXzEgPSBhcnJheUxpa2VfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhcnJheUxpa2VfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5W2ldID0gbWFwRnVuY3Rpb24gPyBtYXBGdW5jdGlvbih2YWx1ZSwgaSkgOiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUxpa2VfMV8xICYmICFhcnJheUxpa2VfMV8xLmRvbmUgJiYgKF9hID0gYXJyYXlMaWtlXzEucmV0dXJuKSkgX2EuY2FsbChhcnJheUxpa2VfMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFycmF5TGlrZS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLm9mID0gZnVuY3Rpb24gb2YoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgaXRlbXNbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGl0ZW1zKTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmNvcHlXaXRoaW4gPSBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldCwgb2Zmc2V0LCBzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvcHlXaXRoaW46IHRhcmdldCBtdXN0IGJlIGFuIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aF8xKHRhcmdldC5sZW5ndGgpO1xyXG4gICAgICAgIG9mZnNldCA9IG5vcm1hbGl6ZU9mZnNldF8xKHRvSW50ZWdlcl8xKG9mZnNldCksIGxlbmd0aCk7XHJcbiAgICAgICAgc3RhcnQgPSBub3JtYWxpemVPZmZzZXRfMSh0b0ludGVnZXJfMShzdGFydCksIGxlbmd0aCk7XHJcbiAgICAgICAgZW5kID0gbm9ybWFsaXplT2Zmc2V0XzEoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0ludGVnZXJfMShlbmQpLCBsZW5ndGgpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKGVuZCAtIHN0YXJ0LCBsZW5ndGggLSBvZmZzZXQpO1xyXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgIGlmIChvZmZzZXQgPiBzdGFydCAmJiBvZmZzZXQgPCBzdGFydCArIGNvdW50KSB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xyXG4gICAgICAgICAgICBzdGFydCArPSBjb3VudCAtIDE7XHJcbiAgICAgICAgICAgIG9mZnNldCArPSBjb3VudCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0IGluIHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W29mZnNldF0gPSB0YXJnZXRbc3RhcnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtvZmZzZXRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9mZnNldCArPSBkaXJlY3Rpb247XHJcbiAgICAgICAgICAgIHN0YXJ0ICs9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgY291bnQtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmZpbGwgPSBmdW5jdGlvbiBmaWxsKHRhcmdldCwgdmFsdWUsIHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGhfMSh0YXJnZXQubGVuZ3RoKTtcclxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9mZnNldF8xKHRvSW50ZWdlcl8xKHN0YXJ0KSwgbGVuZ3RoKTtcclxuICAgICAgICBlbmQgPSBub3JtYWxpemVPZmZzZXRfMShlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW50ZWdlcl8xKGVuZCksIGxlbmd0aCk7XHJcbiAgICAgICAgd2hpbGUgKGkgPCBlbmQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W2krK10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmZpbmQgPSBmdW5jdGlvbiBmaW5kKHRhcmdldCwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBleHBvcnRzLmZpbmRJbmRleCh0YXJnZXQsIGNhbGxiYWNrLCB0aGlzQXJnKTtcclxuICAgICAgICByZXR1cm4gaW5kZXggIT09IC0xID8gdGFyZ2V0W2luZGV4XSA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmZpbmRJbmRleCA9IGZ1bmN0aW9uIGZpbmRJbmRleCh0YXJnZXQsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoXzEodGFyZ2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmaW5kOiBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzQXJnKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2suYmluZCh0aGlzQXJnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sodGFyZ2V0W2ldLCBpLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9O1xyXG59XHJcbmlmIChoYXNfMS5kZWZhdWx0KCdlczctYXJyYXknKSkge1xyXG4gICAgZXhwb3J0cy5pbmNsdWRlcyA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzKTtcclxufVxyXG5lbHNlIHtcclxuICAgIC8qKlxyXG4gICAgICogRW5zdXJlcyBhIG5vbi1uZWdhdGl2ZSwgbm9uLWluZmluaXRlLCBzYWZlIGludGVnZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxlbmd0aCBUaGUgbnVtYmVyIHRvIHZhbGlkYXRlXHJcbiAgICAgKiBAcmV0dXJuIEEgcHJvcGVyIGxlbmd0aFxyXG4gICAgICovXHJcbiAgICB2YXIgdG9MZW5ndGhfMiA9IGZ1bmN0aW9uIHRvTGVuZ3RoKGxlbmd0aCkge1xyXG4gICAgICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xyXG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSBNYXRoLmZsb29yKGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuc3VyZSBhIG5vbi1uZWdhdGl2ZSwgcmVhbCwgc2FmZSBpbnRlZ2VyXHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbmd0aCwgMCksIG51bWJlcl8xLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyh0YXJnZXQsIHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCkge1xyXG4gICAgICAgIGlmIChmcm9tSW5kZXggPT09IHZvaWQgMCkgeyBmcm9tSW5kZXggPSAwOyB9XHJcbiAgICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoXzIodGFyZ2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGZyb21JbmRleDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IHRhcmdldFtpXTtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaEVsZW1lbnQgPT09IGN1cnJlbnRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICAoc2VhcmNoRWxlbWVudCAhPT0gc2VhcmNoRWxlbWVudCAmJiBjdXJyZW50RWxlbWVudCAhPT0gY3VycmVudEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9hcnJheS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ2xvYmFsT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIGdsb2JhbCBzcGVjIGRlZmluZXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgY2FsbGVkICdnbG9iYWwnXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZ2xvYmFsXHJcbiAgICAgICAgLy8gYGdsb2JhbGAgaXMgYWxzbyBkZWZpbmVkIGluIE5vZGVKU1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIHdpbmRvdyBpcyBkZWZpbmVkIGluIGJyb3dzZXJzXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIHNlbGYgaXMgZGVmaW5lZCBpbiBXZWJXb3JrZXJzXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbn0pKCk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdsb2JhbE9iamVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9nbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxucmVxdWlyZShcIi4vU3ltYm9sXCIpO1xyXG52YXIgc3RyaW5nXzEgPSByZXF1aXJlKFwiLi9zdHJpbmdcIik7XHJcbnZhciBzdGF0aWNEb25lID0geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XHJcbi8qKlxyXG4gKiBBIGNsYXNzIHRoYXQgX3NoaW1zXyBhbiBpdGVyYXRvciBpbnRlcmZhY2Ugb24gYXJyYXkgbGlrZSBvYmplY3RzLlxyXG4gKi9cclxudmFyIFNoaW1JdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNoaW1JdGVyYXRvcihsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dEluZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKGlzSXRlcmFibGUobGlzdCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlSXRlcmF0b3IgPSBsaXN0W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBuZXh0IGl0ZXJhdGlvbiByZXN1bHQgZm9yIHRoZSBJdGVyYXRvclxyXG4gICAgICovXHJcbiAgICBTaGltSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZUl0ZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGljRG9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCsrdGhpcy5fbmV4dEluZGV4IDwgdGhpcy5fbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2xpc3RbdGhpcy5fbmV4dEluZGV4XVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdGljRG9uZTtcclxuICAgIH07XHJcbiAgICBTaGltSXRlcmF0b3IucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNoaW1JdGVyYXRvcjtcclxufSgpKTtcclxuZXhwb3J0cy5TaGltSXRlcmF0b3IgPSBTaGltSXRlcmF0b3I7XHJcbi8qKlxyXG4gKiBBIHR5cGUgZ3VhcmQgZm9yIGNoZWNraW5nIGlmIHNvbWV0aGluZyBoYXMgYW4gSXRlcmFibGUgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdHlwZSBndWFyZCBhZ2FpbnN0XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0l0ZXJhYmxlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZXhwb3J0cy5pc0l0ZXJhYmxlID0gaXNJdGVyYWJsZTtcclxuLyoqXHJcbiAqIEEgdHlwZSBndWFyZCBmb3IgY2hlY2tpbmcgaWYgc29tZXRoaW5nIGlzIEFycmF5TGlrZVxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHR5cGUgZ3VhcmQgYWdhaW5zdFxyXG4gKi9cclxuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJztcclxufVxyXG5leHBvcnRzLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBmb3IgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSBpdGVyYWJsZSBUaGUgaXRlcmFibGUgb2JqZWN0IHRvIHJldHVybiB0aGUgaXRlcmF0b3IgZm9yXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXQoaXRlcmFibGUpIHtcclxuICAgIGlmIChpc0l0ZXJhYmxlKGl0ZXJhYmxlKSkge1xyXG4gICAgICAgIHJldHVybiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNoaW1JdGVyYXRvcihpdGVyYWJsZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXQgPSBnZXQ7XHJcbi8qKlxyXG4gKiBTaGltcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBgZm9yIC4uLiBvZmAgYmxvY2tzXHJcbiAqXHJcbiAqIEBwYXJhbSBpdGVyYWJsZSBUaGUgb2JqZWN0IHRoZSBwcm92aWRlcyBhbiBpbnRlcmF0b3IgaW50ZXJmYWNlXHJcbiAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgd2hpY2ggd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSBvZiB0aGUgaXRlcmFibGVcclxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgc2NvcGUgdG8gcGFzcyB0aGUgY2FsbGJhY2tcclxuICovXHJcbmZ1bmN0aW9uIGZvck9mKGl0ZXJhYmxlLCBjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgdmFyIGJyb2tlbiA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gZG9CcmVhaygpIHtcclxuICAgICAgICBicm9rZW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyogV2UgbmVlZCB0byBoYW5kbGUgaXRlcmF0aW9uIG9mIGRvdWJsZSBieXRlIHN0cmluZ3MgcHJvcGVybHkgKi9cclxuICAgIGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkgJiYgdHlwZW9mIGl0ZXJhYmxlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHZhciBsID0gaXRlcmFibGUubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyID0gaXRlcmFibGVbaV07XHJcbiAgICAgICAgICAgIGlmIChpICsgMSA8IGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPj0gc3RyaW5nXzEuSElHSF9TVVJST0dBVEVfTUlOICYmIGNvZGUgPD0gc3RyaW5nXzEuSElHSF9TVVJST0dBVEVfTUFYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhciArPSBpdGVyYWJsZVsrK2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgY2hhciwgaXRlcmFibGUsIGRvQnJlYWspO1xyXG4gICAgICAgICAgICBpZiAoYnJva2VuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaXRlcmF0b3IgPSBnZXQoaXRlcmFibGUpO1xyXG4gICAgICAgIGlmIChpdGVyYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICB3aGlsZSAoIXJlc3VsdC5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHJlc3VsdC52YWx1ZSwgaXRlcmFibGUsIGRvQnJlYWspO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJyb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmZvck9mID0gZm9yT2Y7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbi8qKlxyXG4gKiBUaGUgc21hbGxlc3QgaW50ZXJ2YWwgYmV0d2VlbiB0d28gcmVwcmVzZW50YWJsZSBudW1iZXJzLlxyXG4gKi9cclxuZXhwb3J0cy5FUFNJTE9OID0gMTtcclxuLyoqXHJcbiAqIFRoZSBtYXhpbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0XHJcbiAqL1xyXG5leHBvcnRzLk1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4vKipcclxuICogVGhlIG1pbmltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHRcclxuICovXHJcbmV4cG9ydHMuTUlOX1NBRkVfSU5URUdFUiA9IC1leHBvcnRzLk1BWF9TQUZFX0lOVEVHRVI7XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBOYU4gd2l0aG91dCBjb2Vyc2lvbi5cclxuICpcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgTmFOLCBmYWxzZSBpZiBpdCBpcyBub3RcclxuICovXHJcbmZ1bmN0aW9uIGlzTmFOKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBnbG9iYWxfMS5kZWZhdWx0LmlzTmFOKHZhbHVlKTtcclxufVxyXG5leHBvcnRzLmlzTmFOID0gaXNOYU47XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGZpbml0ZSBudW1iZXIgd2l0aG91dCBjb2Vyc2lvbi5cclxuICpcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgZmluaXRlLCBmYWxzZSBpZiBpdCBpcyBub3RcclxuICovXHJcbmZ1bmN0aW9uIGlzRmluaXRlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBnbG9iYWxfMS5kZWZhdWx0LmlzRmluaXRlKHZhbHVlKTtcclxufVxyXG5leHBvcnRzLmlzRmluaXRlID0gaXNGaW5pdGU7XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLCBmYWxzZSBpZiBpdCBpcyBub3RcclxuICovXHJcbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbn1cclxuZXhwb3J0cy5pc0ludGVnZXIgPSBpc0ludGVnZXI7XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyIHRoYXQgaXMgJ3NhZmUsJyBtZWFuaW5nOlxyXG4gKiAgIDEuIGl0IGNhbiBiZSBleHByZXNzZWQgYXMgYW4gSUVFRS03NTQgZG91YmxlIHByZWNpc2lvbiBudW1iZXJcclxuICogICAyLiBpdCBoYXMgYSBvbmUtdG8tb25lIG1hcHBpbmcgdG8gYSBtYXRoZW1hdGljYWwgaW50ZWdlciwgbWVhbmluZyBpdHNcclxuICogICAgICBJRUVFLTc1NCByZXByZXNlbnRhdGlvbiBjYW5ub3QgYmUgdGhlIHJlc3VsdCBvZiByb3VuZGluZyBhbnkgb3RoZXJcclxuICogICAgICBpbnRlZ2VyIHRvIGZpdCB0aGUgSUVFRS03NTQgcmVwcmVzZW50YXRpb25cclxuICpcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlciwgZmFsc2UgaWYgaXQgaXMgbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gaXNJbnRlZ2VyKHZhbHVlKSAmJiBNYXRoLmFicyh2YWx1ZSkgPD0gZXhwb3J0cy5NQVhfU0FGRV9JTlRFR0VSO1xyXG59XHJcbmV4cG9ydHMuaXNTYWZlSW50ZWdlciA9IGlzU2FmZUludGVnZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9udW1iZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vbnVtYmVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnbG9iYWxfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbFwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vc3VwcG9ydC9oYXNcIik7XHJcbnZhciBTeW1ib2xfMSA9IHJlcXVpcmUoXCIuL1N5bWJvbFwiKTtcclxuaWYgKGhhc18xLmRlZmF1bHQoJ2VzNi1vYmplY3QnKSkge1xyXG4gICAgdmFyIGdsb2JhbE9iamVjdCA9IGdsb2JhbF8xLmRlZmF1bHQuT2JqZWN0O1xyXG4gICAgZXhwb3J0cy5hc3NpZ24gPSBnbG9iYWxPYmplY3QuYXNzaWduO1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eU5hbWVzID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XHJcbiAgICBleHBvcnRzLmdldE93blByb3BlcnR5U3ltYm9scyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XHJcbiAgICBleHBvcnRzLmlzID0gZ2xvYmFsT2JqZWN0LmlzO1xyXG4gICAgZXhwb3J0cy5rZXlzID0gZ2xvYmFsT2JqZWN0LmtleXM7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiBzeW1ib2xBd2FyZUtleXMobykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gIUJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5hc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKG5leHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxyXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5rZXlzKG5leHRTb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKG5leHRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0bztcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKFN5bWJvbF8xLmlzU3ltYm9sKHByb3ApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIHByb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobywgcHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMobykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gIUJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMobykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIEJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKTsgfSlcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBTeW1ib2wuZm9yKGtleS5zdWJzdHJpbmcoMikpOyB9KTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmlzID0gZnVuY3Rpb24gaXModmFsdWUxLCB2YWx1ZTIpIHtcclxuICAgICAgICBpZiAodmFsdWUxID09PSB2YWx1ZTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMSAhPT0gMCB8fCAxIC8gdmFsdWUxID09PSAxIC8gdmFsdWUyOyAvLyAtMFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWUxICE9PSB2YWx1ZTEgJiYgdmFsdWUyICE9PSB2YWx1ZTI7IC8vIE5hTlxyXG4gICAgfTtcclxufVxyXG5pZiAoaGFzXzEuZGVmYXVsdCgnZXMyMDE3LW9iamVjdCcpKSB7XHJcbiAgICB2YXIgZ2xvYmFsT2JqZWN0ID0gZ2xvYmFsXzEuZGVmYXVsdC5PYmplY3Q7XHJcbiAgICBleHBvcnRzLmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycztcclxuICAgIGV4cG9ydHMuZW50cmllcyA9IGdsb2JhbE9iamVjdC5lbnRyaWVzO1xyXG4gICAgZXhwb3J0cy52YWx1ZXMgPSBnbG9iYWxPYmplY3QudmFsdWVzO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgZXhwb3J0cy5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBrZXkpIHtcclxuICAgICAgICAgICAgcHJldmlvdXNba2V5XSA9IGV4cG9ydHMuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5lbnRyaWVzID0gZnVuY3Rpb24gZW50cmllcyhvKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMua2V5cyhvKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gW2tleSwgb1trZXldXTsgfSk7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy52YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMobykge1xyXG4gICAgICAgIHJldHVybiBleHBvcnRzLmtleXMobykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG9ba2V5XTsgfSk7XHJcbiAgICB9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vb2JqZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxcIik7XHJcbnZhciBoYXNfMSA9IHJlcXVpcmUoXCIuL3N1cHBvcnQvaGFzXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vc3VwcG9ydC91dGlsXCIpO1xyXG4vKipcclxuICogVGhlIG1pbmltdW0gbG9jYXRpb24gb2YgaGlnaCBzdXJyb2dhdGVzXHJcbiAqL1xyXG5leHBvcnRzLkhJR0hfU1VSUk9HQVRFX01JTiA9IDB4ZDgwMDtcclxuLyoqXHJcbiAqIFRoZSBtYXhpbXVtIGxvY2F0aW9uIG9mIGhpZ2ggc3Vycm9nYXRlc1xyXG4gKi9cclxuZXhwb3J0cy5ISUdIX1NVUlJPR0FURV9NQVggPSAweGRiZmY7XHJcbi8qKlxyXG4gKiBUaGUgbWluaW11bSBsb2NhdGlvbiBvZiBsb3cgc3Vycm9nYXRlc1xyXG4gKi9cclxuZXhwb3J0cy5MT1dfU1VSUk9HQVRFX01JTiA9IDB4ZGMwMDtcclxuLyoqXHJcbiAqIFRoZSBtYXhpbXVtIGxvY2F0aW9uIG9mIGxvdyBzdXJyb2dhdGVzXHJcbiAqL1xyXG5leHBvcnRzLkxPV19TVVJST0dBVEVfTUFYID0gMHhkZmZmO1xyXG5pZiAoaGFzXzEuZGVmYXVsdCgnZXM2LXN0cmluZycpICYmIGhhc18xLmRlZmF1bHQoJ2VzNi1zdHJpbmctcmF3JykpIHtcclxuICAgIGV4cG9ydHMuZnJvbUNvZGVQb2ludCA9IGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLmZyb21Db2RlUG9pbnQ7XHJcbiAgICBleHBvcnRzLnJhdyA9IGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnJhdztcclxuICAgIGV4cG9ydHMuY29kZVBvaW50QXQgPSB1dGlsXzEud3JhcE5hdGl2ZShnbG9iYWxfMS5kZWZhdWx0LlN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQpO1xyXG4gICAgZXhwb3J0cy5lbmRzV2l0aCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCk7XHJcbiAgICBleHBvcnRzLmluY2x1ZGVzID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKTtcclxuICAgIGV4cG9ydHMubm9ybWFsaXplID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZSk7XHJcbiAgICBleHBvcnRzLnJlcGVhdCA9IHV0aWxfMS53cmFwTmF0aXZlKGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQpO1xyXG4gICAgZXhwb3J0cy5zdGFydHNXaXRoID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0ZXh0IGlzIGRlZmluZWQsIGFuZCBub3JtYWxpemVzIHBvc2l0aW9uIChiYXNlZCBvbiB0aGUgZ2l2ZW4gZGVmYXVsdCBpZiB0aGUgaW5wdXQgaXMgTmFOKS5cclxuICAgICAqIFVzZWQgYnkgc3RhcnRzV2l0aCwgaW5jbHVkZXMsIGFuZCBlbmRzV2l0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIE5vcm1hbGl6ZWQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIHZhciBub3JtYWxpemVTdWJzdHJpbmdBcmdzXzEgPSBmdW5jdGlvbiAobmFtZSwgdGV4dCwgc2VhcmNoLCBwb3NpdGlvbiwgaXNFbmQpIHtcclxuICAgICAgICBpZiAoaXNFbmQgPT09IHZvaWQgMCkgeyBpc0VuZCA9IGZhbHNlOyB9XHJcbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcuJyArIG5hbWUgKyAnIHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nIHRvIHNlYXJjaCBhZ2FpbnN0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiAhPT0gcG9zaXRpb24gPyAoaXNFbmQgPyBsZW5ndGggOiAwKSA6IHBvc2l0aW9uO1xyXG4gICAgICAgIHJldHVybiBbdGV4dCwgU3RyaW5nKHNlYXJjaCksIE1hdGgubWluKE1hdGgubWF4KHBvc2l0aW9uLCAwKSwgbGVuZ3RoKV07XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5mcm9tQ29kZVBvaW50ID0gZnVuY3Rpb24gZnJvbUNvZGVQb2ludCgpIHtcclxuICAgICAgICB2YXIgY29kZVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGNvZGVQb2ludHNbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5mcm9tQ29kZVBvaW50XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcclxuICAgICAgICB2YXIgTUFYX1NJWkUgPSAweDQwMDA7XHJcbiAgICAgICAgdmFyIGNvZGVVbml0cyA9IFtdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xyXG4gICAgICAgICAgICAvLyBDb2RlIHBvaW50cyBtdXN0IGJlIGZpbml0ZSBpbnRlZ2VycyB3aXRoaW4gdGhlIHZhbGlkIHJhbmdlXHJcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gaXNGaW5pdGUoY29kZVBvaW50KSAmJiBNYXRoLmZsb29yKGNvZGVQb2ludCkgPT09IGNvZGVQb2ludCAmJiBjb2RlUG9pbnQgPj0gMCAmJiBjb2RlUG9pbnQgPD0gMHgxMGZmZmY7XHJcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcignc3RyaW5nLmZyb21Db2RlUG9pbnQ6IEludmFsaWQgY29kZSBwb2ludCAnICsgY29kZVBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29kZVBvaW50IDw9IDB4ZmZmZikge1xyXG4gICAgICAgICAgICAgICAgLy8gQk1QIGNvZGUgcG9pbnRcclxuICAgICAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xyXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXHJcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyBleHBvcnRzLkhJR0hfU1VSUk9HQVRFX01JTjtcclxuICAgICAgICAgICAgICAgIHZhciBsb3dTdXJyb2dhdGUgPSBjb2RlUG9pbnQgJSAweDQwMCArIGV4cG9ydHMuTE9XX1NVUlJPR0FURV9NSU47XHJcbiAgICAgICAgICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPT09IGxlbmd0aCB8fCBjb2RlVW5pdHMubGVuZ3RoID4gTUFYX1NJWkUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBmcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcclxuICAgICAgICAgICAgICAgIGNvZGVVbml0cy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5yYXcgPSBmdW5jdGlvbiByYXcoY2FsbFNpdGUpIHtcclxuICAgICAgICB2YXIgc3Vic3RpdHV0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHN1YnN0aXR1dGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYXdTdHJpbmdzID0gY2FsbFNpdGUucmF3O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICB2YXIgbnVtU3Vic3RpdHV0aW9ucyA9IHN1YnN0aXR1dGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIGlmIChjYWxsU2l0ZSA9PSBudWxsIHx8IGNhbGxTaXRlLnJhdyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yYXcgcmVxdWlyZXMgYSB2YWxpZCBjYWxsU2l0ZSBvYmplY3Qgd2l0aCBhIHJhdyB2YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoXzEgPSByYXdTdHJpbmdzLmxlbmd0aDsgaSA8IGxlbmd0aF8xOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHJhd1N0cmluZ3NbaV0gKyAoaSA8IG51bVN1YnN0aXR1dGlvbnMgJiYgaSA8IGxlbmd0aF8xIC0gMSA/IHN1YnN0aXR1dGlvbnNbaV0gOiAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5jb2RlUG9pbnRBdCA9IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHRleHQsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSB2b2lkIDApIHsgcG9zaXRpb24gPSAwOyB9XHJcbiAgICAgICAgLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRcclxuICAgICAgICBpZiAodGV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5jb2RlUG9pbnRBdCByZXF1cmllcyBhIHZhbGlkIHN0cmluZy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRleHQubGVuZ3RoO1xyXG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IGNvZGUgdW5pdFxyXG4gICAgICAgIHZhciBmaXJzdCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbik7XHJcbiAgICAgICAgaWYgKGZpcnN0ID49IGV4cG9ydHMuSElHSF9TVVJST0dBVEVfTUlOICYmIGZpcnN0IDw9IGV4cG9ydHMuSElHSF9TVVJST0dBVEVfTUFYICYmIGxlbmd0aCA+IHBvc2l0aW9uICsgMSkge1xyXG4gICAgICAgICAgICAvLyBTdGFydCBvZiBhIHN1cnJvZ2F0ZSBwYWlyIChoaWdoIHN1cnJvZ2F0ZSBhbmQgdGhlcmUgaXMgYSBuZXh0IGNvZGUgdW5pdCk7IGNoZWNrIGZvciBsb3cgc3Vycm9nYXRlXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxyXG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gdGV4dC5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzZWNvbmQgPj0gZXhwb3J0cy5MT1dfU1VSUk9HQVRFX01JTiAmJiBzZWNvbmQgPD0gZXhwb3J0cy5MT1dfU1VSUk9HQVRFX01BWCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmaXJzdCAtIGV4cG9ydHMuSElHSF9TVVJST0dBVEVfTUlOKSAqIDB4NDAwICsgc2Vjb25kIC0gZXhwb3J0cy5MT1dfU1VSUk9HQVRFX01JTiArIDB4MTAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZW5kc1dpdGggPSBmdW5jdGlvbiBlbmRzV2l0aCh0ZXh0LCBzZWFyY2gsIGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKGVuZFBvc2l0aW9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgZW5kUG9zaXRpb24gPSB0ZXh0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgX2EgPSB0c2xpYl8xLl9fcmVhZChub3JtYWxpemVTdWJzdHJpbmdBcmdzXzEoJ2VuZHNXaXRoJywgdGV4dCwgc2VhcmNoLCBlbmRQb3NpdGlvbiwgdHJ1ZSksIDMpLCB0ZXh0ID0gX2FbMF0sIHNlYXJjaCA9IF9hWzFdLCBlbmRQb3NpdGlvbiA9IF9hWzJdO1xyXG4gICAgICAgIHZhciBzdGFydCA9IGVuZFBvc2l0aW9uIC0gc2VhcmNoLmxlbmd0aDtcclxuICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2Uoc3RhcnQsIGVuZFBvc2l0aW9uKSA9PT0gc2VhcmNoO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgIH07XHJcbiAgICBleHBvcnRzLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXModGV4dCwgc2VhcmNoLCBwb3NpdGlvbikge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7IHBvc2l0aW9uID0gMDsgfVxyXG4gICAgICAgIF9hID0gdHNsaWJfMS5fX3JlYWQobm9ybWFsaXplU3Vic3RyaW5nQXJnc18xKCdpbmNsdWRlcycsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24pLCAzKSwgdGV4dCA9IF9hWzBdLCBzZWFyY2ggPSBfYVsxXSwgcG9zaXRpb24gPSBfYVsyXTtcclxuICAgICAgICByZXR1cm4gdGV4dC5pbmRleE9mKHNlYXJjaCwgcG9zaXRpb24pICE9PSAtMTtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0cy5yZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQodGV4dCwgY291bnQpIHtcclxuICAgICAgICBpZiAoY291bnQgPT09IHZvaWQgMCkgeyBjb3VudCA9IDA7IH1cclxuICAgICAgICAvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcclxuICAgICAgICBpZiAodGV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCAhPT0gY291bnQpIHtcclxuICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgPCAwIHx8IGNvdW50ID09PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIG5vbi1uZWdhdGl2ZSBmaW5pdGUgY291bnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICB3aGlsZSAoY291bnQpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ICUgMikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50ID4+PSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIHN0YXJ0c1dpdGgodGV4dCwgc2VhcmNoLCBwb3NpdGlvbikge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7IHBvc2l0aW9uID0gMDsgfVxyXG4gICAgICAgIHNlYXJjaCA9IFN0cmluZyhzZWFyY2gpO1xyXG4gICAgICAgIF9hID0gdHNsaWJfMS5fX3JlYWQobm9ybWFsaXplU3Vic3RyaW5nQXJnc18xKCdzdGFydHNXaXRoJywgdGV4dCwgc2VhcmNoLCBwb3NpdGlvbiksIDMpLCB0ZXh0ID0gX2FbMF0sIHNlYXJjaCA9IF9hWzFdLCBwb3NpdGlvbiA9IF9hWzJdO1xyXG4gICAgICAgIHZhciBlbmQgPSBwb3NpdGlvbiArIHNlYXJjaC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGVuZCA+IHRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UocG9zaXRpb24sIGVuZCkgPT09IHNlYXJjaDtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICB9O1xyXG59XHJcbmlmIChoYXNfMS5kZWZhdWx0KCdlczIwMTctc3RyaW5nJykpIHtcclxuICAgIGV4cG9ydHMucGFkRW5kID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLnBhZEVuZCk7XHJcbiAgICBleHBvcnRzLnBhZFN0YXJ0ID0gdXRpbF8xLndyYXBOYXRpdmUoZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGV4cG9ydHMucGFkRW5kID0gZnVuY3Rpb24gcGFkRW5kKHRleHQsIG1heExlbmd0aCwgZmlsbFN0cmluZykge1xyXG4gICAgICAgIGlmIChmaWxsU3RyaW5nID09PSB2b2lkIDApIHsgZmlsbFN0cmluZyA9ICcgJzsgfVxyXG4gICAgICAgIGlmICh0ZXh0ID09PSBudWxsIHx8IHRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcucmVwZWF0IHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF4TGVuZ3RoID09PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc3RyaW5nLnBhZEVuZCByZXF1aXJlcyBhIG5vbi1uZWdhdGl2ZSBmaW5pdGUgY291bnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhMZW5ndGggPT09IG51bGwgfHwgbWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWF4TGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICBtYXhMZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RyVGV4dCA9IFN0cmluZyh0ZXh0KTtcclxuICAgICAgICB2YXIgcGFkZGluZyA9IG1heExlbmd0aCAtIHN0clRleHQubGVuZ3RoO1xyXG4gICAgICAgIGlmIChwYWRkaW5nID4gMCkge1xyXG4gICAgICAgICAgICBzdHJUZXh0ICs9XHJcbiAgICAgICAgICAgICAgICBleHBvcnRzLnJlcGVhdChmaWxsU3RyaW5nLCBNYXRoLmZsb29yKHBhZGRpbmcgLyBmaWxsU3RyaW5nLmxlbmd0aCkpICtcclxuICAgICAgICAgICAgICAgICAgICBmaWxsU3RyaW5nLnNsaWNlKDAsIHBhZGRpbmcgJSBmaWxsU3RyaW5nLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJUZXh0O1xyXG4gICAgfTtcclxuICAgIGV4cG9ydHMucGFkU3RhcnQgPSBmdW5jdGlvbiBwYWRTdGFydCh0ZXh0LCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcpIHtcclxuICAgICAgICBpZiAoZmlsbFN0cmluZyA9PT0gdm9pZCAwKSB7IGZpbGxTdHJpbmcgPSAnICc7IH1cclxuICAgICAgICBpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5wYWRTdGFydCByZXF1aXJlcyBhIG5vbi1uZWdhdGl2ZSBmaW5pdGUgY291bnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhMZW5ndGggPT09IG51bGwgfHwgbWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWF4TGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICBtYXhMZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RyVGV4dCA9IFN0cmluZyh0ZXh0KTtcclxuICAgICAgICB2YXIgcGFkZGluZyA9IG1heExlbmd0aCAtIHN0clRleHQubGVuZ3RoO1xyXG4gICAgICAgIGlmIChwYWRkaW5nID4gMCkge1xyXG4gICAgICAgICAgICBzdHJUZXh0ID1cclxuICAgICAgICAgICAgICAgIGV4cG9ydHMucmVwZWF0KGZpbGxTdHJpbmcsIE1hdGguZmxvb3IocGFkZGluZyAvIGZpbGxTdHJpbmcubGVuZ3RoKSkgK1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxTdHJpbmcuc2xpY2UoMCwgcGFkZGluZyAlIGZpbGxTdHJpbmcubGVuZ3RoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0clRleHQ7XHJcbiAgICB9O1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9zdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3RyaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgaGFzXzEgPSByZXF1aXJlKFwiQGRvam8vaGFzL2hhc1wiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4uL2dsb2JhbFwiKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gaGFzXzEuZGVmYXVsdDtcclxudHNsaWJfMS5fX2V4cG9ydFN0YXIocmVxdWlyZShcIkBkb2pvL2hhcy9oYXNcIiksIGV4cG9ydHMpO1xyXG4vKiBFQ01BU2NyaXB0IDYgYW5kIDcgRmVhdHVyZXMgKi9cclxuLyogQXJyYXkgKi9cclxuaGFzXzEuYWRkKCdlczYtYXJyYXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFsnZnJvbScsICdvZiddLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSBpbiBnbG9iYWxfMS5kZWZhdWx0LkFycmF5OyB9KSAmJlxyXG4gICAgICAgIFsnZmluZEluZGV4JywgJ2ZpbmQnLCAnY29weVdpdGhpbiddLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSBpbiBnbG9iYWxfMS5kZWZhdWx0LkFycmF5LnByb3RvdHlwZTsgfSkpO1xyXG59LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdlczYtYXJyYXktZmlsbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgnZmlsbCcgaW4gZ2xvYmFsXzEuZGVmYXVsdC5BcnJheS5wcm90b3R5cGUpIHtcclxuICAgICAgICAvKiBTb21lIHZlcnNpb25zIG9mIFNhZmFyaSBkbyBub3QgcHJvcGVybHkgaW1wbGVtZW50IHRoaXMgKi9cclxuICAgICAgICByZXR1cm4gWzFdLmZpbGwoOSwgTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVswXSA9PT0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZXM3LWFycmF5JywgZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2luY2x1ZGVzJyBpbiBnbG9iYWxfMS5kZWZhdWx0LkFycmF5LnByb3RvdHlwZTsgfSwgdHJ1ZSk7XHJcbi8qIE1hcCAqL1xyXG5oYXNfMS5hZGQoJ2VzNi1tYXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuTWFwID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLypcclxuICAgIElFMTEgYW5kIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBhcmUgbWlzc2luZyBjcml0aWNhbCBFUzYgTWFwIGZ1bmN0aW9uYWxpdHlcclxuICAgIFdlIHdyYXAgdGhpcyBpbiBhIHRyeS9jYXRjaCBiZWNhdXNlIHNvbWV0aW1lcyB0aGUgTWFwIGNvbnN0cnVjdG9yIGV4aXN0cywgYnV0IGRvZXMgbm90XHJcbiAgICB0YWtlIGFyZ3VtZW50cyAoaU9TIDguNClcclxuICAgICAqL1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ2xvYmFsXzEuZGVmYXVsdC5NYXAoW1swLCAxXV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gKG1hcC5oYXMoMCkgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBtYXAua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgaGFzXzEuZGVmYXVsdCgnZXM2LXN5bWJvbCcpICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgbWFwLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIG1hcC5lbnRyaWVzID09PSAnZnVuY3Rpb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vdCB0ZXN0aW5nIG9uIGlPUyBhdCB0aGUgbW9tZW50ICovXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG4vKiBNYXRoICovXHJcbmhhc18xLmFkZCgnZXM2LW1hdGgnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgICdjbHozMicsXHJcbiAgICAgICAgJ3NpZ24nLFxyXG4gICAgICAgICdsb2cxMCcsXHJcbiAgICAgICAgJ2xvZzInLFxyXG4gICAgICAgICdsb2cxcCcsXHJcbiAgICAgICAgJ2V4cG0xJyxcclxuICAgICAgICAnY29zaCcsXHJcbiAgICAgICAgJ3NpbmgnLFxyXG4gICAgICAgICd0YW5oJyxcclxuICAgICAgICAnYWNvc2gnLFxyXG4gICAgICAgICdhc2luaCcsXHJcbiAgICAgICAgJ2F0YW5oJyxcclxuICAgICAgICAndHJ1bmMnLFxyXG4gICAgICAgICdmcm91bmQnLFxyXG4gICAgICAgICdjYnJ0JyxcclxuICAgICAgICAnaHlwb3QnXHJcbiAgICBdLmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5NYXRoW25hbWVdID09PSAnZnVuY3Rpb24nOyB9KTtcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZXM2LW1hdGgtaW11bCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgnaW11bCcgaW4gZ2xvYmFsXzEuZGVmYXVsdC5NYXRoKSB7XHJcbiAgICAgICAgLyogU29tZSB2ZXJzaW9ucyBvZiBTYWZhcmkgb24gaW9zIGRvIG5vdCBwcm9wZXJseSBpbXBsZW1lbnQgdGhpcyAqL1xyXG4gICAgICAgIHJldHVybiBNYXRoLmltdWwoMHhmZmZmZmZmZiwgNSkgPT09IC01O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59LCB0cnVlKTtcclxuLyogT2JqZWN0ICovXHJcbmhhc18xLmFkZCgnZXM2LW9iamVjdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoaGFzXzEuZGVmYXVsdCgnZXM2LXN5bWJvbCcpICYmXHJcbiAgICAgICAgWydhc3NpZ24nLCAnaXMnLCAnZ2V0T3duUHJvcGVydHlTeW1ib2xzJywgJ3NldFByb3RvdHlwZU9mJ10uZXZlcnkoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0Lk9iamVjdFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJzsgfSkpO1xyXG59LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdlczIwMTctb2JqZWN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFsndmFsdWVzJywgJ2VudHJpZXMnLCAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyddLmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5PYmplY3RbbmFtZV0gPT09ICdmdW5jdGlvbic7IH0pO1xyXG59LCB0cnVlKTtcclxuLyogT2JzZXJ2YWJsZSAqL1xyXG5oYXNfMS5hZGQoJ2VzLW9ic2VydmFibGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5PYnNlcnZhYmxlICE9PSAndW5kZWZpbmVkJzsgfSwgdHJ1ZSk7XHJcbi8qIFByb21pc2UgKi9cclxuaGFzXzEuYWRkKCdlczYtcHJvbWlzZScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LlByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIGhhc18xLmRlZmF1bHQoJ2VzNi1zeW1ib2wnKTsgfSwgdHJ1ZSk7XHJcbi8qIFNldCAqL1xyXG5oYXNfMS5hZGQoJ2VzNi1zZXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuU2V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLyogSUUxMSBhbmQgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIGFyZSBtaXNzaW5nIGNyaXRpY2FsIEVTNiBTZXQgZnVuY3Rpb25hbGl0eSAqL1xyXG4gICAgICAgIHZhciBzZXQgPSBuZXcgZ2xvYmFsXzEuZGVmYXVsdC5TZXQoWzFdKTtcclxuICAgICAgICByZXR1cm4gc2V0LmhhcygxKSAmJiAna2V5cycgaW4gc2V0ICYmIHR5cGVvZiBzZXQua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBoYXNfMS5kZWZhdWx0KCdlczYtc3ltYm9sJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG4vKiBTdHJpbmcgKi9cclxuaGFzXzEuYWRkKCdlczYtc3RyaW5nJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChbXHJcbiAgICAgICAgLyogc3RhdGljIG1ldGhvZHMgKi9cclxuICAgICAgICAnZnJvbUNvZGVQb2ludCdcclxuICAgIF0uZXZlcnkoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdHlwZW9mIGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nW2tleV0gPT09ICdmdW5jdGlvbic7IH0pICYmXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAvKiBpbnN0YW5jZSBtZXRob2RzICovXHJcbiAgICAgICAgICAgICdjb2RlUG9pbnRBdCcsXHJcbiAgICAgICAgICAgICdub3JtYWxpemUnLFxyXG4gICAgICAgICAgICAncmVwZWF0JyxcclxuICAgICAgICAgICAgJ3N0YXJ0c1dpdGgnLFxyXG4gICAgICAgICAgICAnZW5kc1dpdGgnLFxyXG4gICAgICAgICAgICAnaW5jbHVkZXMnXHJcbiAgICAgICAgXS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlW2tleV0gPT09ICdmdW5jdGlvbic7IH0pKTtcclxufSwgdHJ1ZSk7XHJcbmhhc18xLmFkZCgnZXM2LXN0cmluZy1yYXcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBnZXRDYWxsU2l0ZShjYWxsU2l0ZSkge1xyXG4gICAgICAgIHZhciBzdWJzdGl0dXRpb25zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgc3Vic3RpdHV0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRzbGliXzEuX19zcHJlYWQoY2FsbFNpdGUpO1xyXG4gICAgICAgIHJlc3VsdC5yYXcgPSBjYWxsU2l0ZS5yYXc7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGlmICgncmF3JyBpbiBnbG9iYWxfMS5kZWZhdWx0LlN0cmluZykge1xyXG4gICAgICAgIHZhciBiID0gMTtcclxuICAgICAgICB2YXIgY2FsbFNpdGUgPSBnZXRDYWxsU2l0ZSh0ZW1wbGF0ZU9iamVjdF8xIHx8ICh0ZW1wbGF0ZU9iamVjdF8xID0gdHNsaWJfMS5fX21ha2VUZW1wbGF0ZU9iamVjdChbXCJhXFxuXCIsIFwiXCJdLCBbXCJhXFxcXG5cIiwgXCJcIl0pKSwgYik7XHJcbiAgICAgICAgY2FsbFNpdGUucmF3ID0gWydhXFxcXG4nXTtcclxuICAgICAgICB2YXIgc3VwcG9ydHNUcnVuYyA9IGdsb2JhbF8xLmRlZmF1bHQuU3RyaW5nLnJhdyhjYWxsU2l0ZSwgNDIpID09PSAnYTpcXFxcbic7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzVHJ1bmM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2VzMjAxNy1zdHJpbmcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gWydwYWRTdGFydCcsICdwYWRFbmQnXS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5TdHJpbmcucHJvdG90eXBlW2tleV0gPT09ICdmdW5jdGlvbic7IH0pO1xyXG59LCB0cnVlKTtcclxuLyogU3ltYm9sICovXHJcbmhhc18xLmFkZCgnZXM2LXN5bWJvbCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LlN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFN5bWJvbCgpID09PSAnc3ltYm9sJzsgfSwgdHJ1ZSk7XHJcbi8qIFdlYWtNYXAgKi9cclxuaGFzXzEuYWRkKCdlczYtd2Vha21hcCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5XZWFrTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qIElFMTEgYW5kIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBhcmUgbWlzc2luZyBjcml0aWNhbCBFUzYgTWFwIGZ1bmN0aW9uYWxpdHkgKi9cclxuICAgICAgICB2YXIga2V5MSA9IHt9O1xyXG4gICAgICAgIHZhciBrZXkyID0ge307XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnbG9iYWxfMS5kZWZhdWx0LldlYWtNYXAoW1trZXkxLCAxXV0pO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUoa2V5MSk7XHJcbiAgICAgICAgcmV0dXJuIG1hcC5nZXQoa2V5MSkgPT09IDEgJiYgbWFwLnNldChrZXkyLCAyKSA9PT0gbWFwICYmIGhhc18xLmRlZmF1bHQoJ2VzNi1zeW1ib2wnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufSwgdHJ1ZSk7XHJcbi8qIE1pc2NlbGxhbmVvdXMgZmVhdHVyZXMgKi9cclxuaGFzXzEuYWRkKCdtaWNyb3Rhc2tzJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gaGFzXzEuZGVmYXVsdCgnZXM2LXByb21pc2UnKSB8fCBoYXNfMS5kZWZhdWx0KCdob3N0LW5vZGUnKSB8fCBoYXNfMS5kZWZhdWx0KCdkb20tbXV0YXRpb25vYnNlcnZlcicpOyB9LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdwb3N0bWVzc2FnZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIElmIHdpbmRvdyBpcyB1bmRlZmluZWQsIGFuZCB3ZSBoYXZlIHBvc3RNZXNzYWdlLCBpdCBwcm9iYWJseSBtZWFucyB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIuIFdlYiB3b3JrZXJzIGhhdmVcclxuICAgIC8vIHBvc3QgbWVzc2FnZSBidXQgaXQgZG9lc24ndCB3b3JrIGhvdyB3ZSBleHBlY3QgaXQgdG8sIHNvIGl0J3MgYmVzdCBqdXN0IHRvIHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cclxuICAgIHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC53aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LnBvc3RNZXNzYWdlID09PSAnZnVuY3Rpb24nO1xyXG59LCB0cnVlKTtcclxuaGFzXzEuYWRkKCdyYWYnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlb2YgZ2xvYmFsXzEuZGVmYXVsdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbic7IH0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ3NldGltbWVkaWF0ZScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVvZiBnbG9iYWxfMS5kZWZhdWx0LnNldEltbWVkaWF0ZSAhPT0gJ3VuZGVmaW5lZCc7IH0sIHRydWUpO1xyXG4vKiBET00gRmVhdHVyZXMgKi9cclxuaGFzXzEuYWRkKCdkb20tbXV0YXRpb25vYnNlcnZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChoYXNfMS5kZWZhdWx0KCdob3N0LWJyb3dzZXInKSAmJiBCb29sZWFuKGdsb2JhbF8xLmRlZmF1bHQuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWxfMS5kZWZhdWx0LldlYktpdE11dGF0aW9uT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgLy8gSUUxMSBoYXMgYW4gdW5yZWxpYWJsZSBNdXRhdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uIHdoZXJlIHNldFByb3BlcnR5KCkgZG9lcyBub3RcclxuICAgICAgICAvLyBnZW5lcmF0ZSBhIG11dGF0aW9uIGV2ZW50LCBvYnNlcnZlcnMgY2FuIGNyYXNoLCBhbmQgdGhlIHF1ZXVlIGRvZXMgbm90IGRyYWluXHJcbiAgICAgICAgLy8gcmVsaWFibHkuIFRoZSBmb2xsb3dpbmcgZmVhdHVyZSB0ZXN0IHdhcyBhZGFwdGVkIGZyb21cclxuICAgICAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS90MTBrby80YWNlYjhjNzE2ODFmZGIyNzVlMzNlZmU1ZTU3NmIxNFxyXG4gICAgICAgIHZhciBleGFtcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWUgKi9cclxuICAgICAgICB2YXIgSG9zdE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWxfMS5kZWZhdWx0Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsXzEuZGVmYXVsdC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBIb3N0TXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7IH0pO1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZXhhbXBsZSwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xyXG4gICAgICAgIGV4YW1wbGUuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICByZXR1cm4gQm9vbGVhbihvYnNlcnZlci50YWtlUmVjb3JkcygpLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0sIHRydWUpO1xyXG5oYXNfMS5hZGQoJ2RvbS13ZWJhbmltYXRpb24nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBoYXNfMS5kZWZhdWx0KCdob3N0LWJyb3dzZXInKSAmJiBnbG9iYWxfMS5kZWZhdWx0LkFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkICYmIGdsb2JhbF8xLmRlZmF1bHQuS2V5ZnJhbWVFZmZlY3QgIT09IHVuZGVmaW5lZDsgfSwgdHJ1ZSk7XHJcbnZhciB0ZW1wbGF0ZU9iamVjdF8xO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC9oYXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC9oYXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIi4uL2dsb2JhbFwiKTtcclxudmFyIGhhc18xID0gcmVxdWlyZShcIi4vaGFzXCIpO1xyXG5mdW5jdGlvbiBleGVjdXRlVGFzayhpdGVtKSB7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlzQWN0aXZlICYmIGl0ZW0uY2FsbGJhY2spIHtcclxuICAgICAgICBpdGVtLmNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0UXVldWVIYW5kbGUoaXRlbSwgZGVzdHJ1Y3Rvcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpdGVtLmNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGRlc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxudmFyIGNoZWNrTWljcm9UYXNrUXVldWU7XHJcbnZhciBtaWNyb1Rhc2tzO1xyXG4vKipcclxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gdGhlIG1hY3JvdGFzayBxdWV1ZS5cclxuICpcclxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxyXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxyXG4gKi9cclxuZXhwb3J0cy5xdWV1ZVRhc2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRlc3RydWN0b3I7XHJcbiAgICB2YXIgZW5xdWV1ZTtcclxuICAgIC8vIFNpbmNlIHRoZSBJRSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0SW1tZWRpYXRlYCBpcyBub3QgZmxhd2xlc3MsIHdlIHdpbGwgdGVzdCBmb3IgYHBvc3RNZXNzYWdlYCBmaXJzdC5cclxuICAgIGlmIChoYXNfMS5kZWZhdWx0KCdwb3N0bWVzc2FnZScpKSB7XHJcbiAgICAgICAgdmFyIHF1ZXVlXzEgPSBbXTtcclxuICAgICAgICBnbG9iYWxfMS5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gQ29uZmlybSB0aGF0IHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgYnkgdGhpcyBwYXJ0aWN1bGFyIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWxfMS5kZWZhdWx0ICYmIGV2ZW50LmRhdGEgPT09ICdkb2pvLXF1ZXVlLW1lc3NhZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZV8xLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVUYXNrKHF1ZXVlXzEuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlbnF1ZXVlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcXVldWVfMS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBnbG9iYWxfMS5kZWZhdWx0LnBvc3RNZXNzYWdlKCdkb2pvLXF1ZXVlLW1lc3NhZ2UnLCAnKicpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYXNfMS5kZWZhdWx0KCdzZXRpbW1lZGlhdGUnKSkge1xyXG4gICAgICAgIGRlc3RydWN0b3IgPSBnbG9iYWxfMS5kZWZhdWx0LmNsZWFySW1tZWRpYXRlO1xyXG4gICAgICAgIGVucXVldWUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0SW1tZWRpYXRlKGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZXN0cnVjdG9yID0gZ2xvYmFsXzEuZGVmYXVsdC5jbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgZW5xdWV1ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSksIDApO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBxdWV1ZVRhc2soY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgaXNBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGlkID0gZW5xdWV1ZShpdGVtKTtcclxuICAgICAgICByZXR1cm4gZ2V0UXVldWVIYW5kbGUoaXRlbSwgZGVzdHJ1Y3RvciAmJlxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0cnVjdG9yKGlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBVc2UgYXNwZWN0LmJlZm9yZSB3aGVuIGl0IGlzIGF2YWlsYWJsZS5cclxuICAgIHJldHVybiBoYXNfMS5kZWZhdWx0KCdtaWNyb3Rhc2tzJylcclxuICAgICAgICA/IHF1ZXVlVGFza1xyXG4gICAgICAgIDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTWljcm9UYXNrUXVldWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlVGFzayhjYWxsYmFjayk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuLy8gV2hlbiBubyBtZWNoYW5pc20gZm9yIHJlZ2lzdGVyaW5nIG1pY3JvdGFza3MgaXMgZXhwb3NlZCBieSB0aGUgZW52aXJvbm1lbnQsIG1pY3JvdGFza3Mgd2lsbFxyXG4vLyBiZSBxdWV1ZWQgYW5kIHRoZW4gZXhlY3V0ZWQgaW4gYSBzaW5nbGUgbWFjcm90YXNrIGJlZm9yZSB0aGUgb3RoZXIgbWFjcm90YXNrcyBhcmUgZXhlY3V0ZWQuXHJcbmlmICghaGFzXzEuZGVmYXVsdCgnbWljcm90YXNrcycpKSB7XHJcbiAgICB2YXIgaXNNaWNyb1Rhc2tRdWV1ZWRfMSA9IGZhbHNlO1xyXG4gICAgbWljcm9UYXNrcyA9IFtdO1xyXG4gICAgY2hlY2tNaWNyb1Rhc2tRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWlzTWljcm9UYXNrUXVldWVkXzEpIHtcclxuICAgICAgICAgICAgaXNNaWNyb1Rhc2tRdWV1ZWRfMSA9IHRydWU7XHJcbiAgICAgICAgICAgIGV4cG9ydHMucXVldWVUYXNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlzTWljcm9UYXNrUXVldWVkXzEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChtaWNyb1Rhc2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoaXRlbSA9IG1pY3JvVGFza3Muc2hpZnQoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZVRhc2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4gKiBTY2hlZHVsZXMgYW4gYW5pbWF0aW9uIHRhc2sgd2l0aCBgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZWAgaWYgaXQgZXhpc3RzLCBvciB3aXRoIGBxdWV1ZVRhc2tgIG90aGVyd2lzZS5cclxuICpcclxuICogU2luY2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJ3MgYmVoYXZpb3IgZG9lcyBub3QgbWF0Y2ggdGhhdCBleHBlY3RlZCBmcm9tIGBxdWV1ZVRhc2tgLCBpdCBpcyBub3QgdXNlZCB0aGVyZS5cclxuICogSG93ZXZlciwgYXQgdGltZXMgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byBkZWxlZ2F0ZSB0byByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IGhlbmNlIHRoZSBmb2xsb3dpbmcgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHRvIGJlIHF1ZXVlZCBhbmQgbGF0ZXIgZXhlY3V0ZWQuXHJcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGEgYGRlc3Ryb3lgIG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgcHJldmVudHMgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnJvbSBleGVjdXRpbmcuXHJcbiAqL1xyXG5leHBvcnRzLnF1ZXVlQW5pbWF0aW9uVGFzayA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWhhc18xLmRlZmF1bHQoJ3JhZicpKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucXVldWVUYXNrO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcXVldWVBbmltYXRpb25UYXNrKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcclxuICAgICAgICByZXR1cm4gZ2V0UXVldWVIYW5kbGUoaXRlbSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWZJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBVc2UgYXNwZWN0LmJlZm9yZSB3aGVuIGl0IGlzIGF2YWlsYWJsZS5cclxuICAgIHJldHVybiBoYXNfMS5kZWZhdWx0KCdtaWNyb3Rhc2tzJylcclxuICAgICAgICA/IHF1ZXVlQW5pbWF0aW9uVGFza1xyXG4gICAgICAgIDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTWljcm9UYXNrUXVldWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlQW5pbWF0aW9uVGFzayhjYWxsYmFjayk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtaWNyb3Rhc2sgcXVldWUuXHJcbiAqXHJcbiAqIEFueSBjYWxsYmFja3MgcmVnaXN0ZXJlZCB3aXRoIGBxdWV1ZU1pY3JvVGFza2Agd2lsbCBiZSBleGVjdXRlZCBiZWZvcmUgdGhlIG5leHQgbWFjcm90YXNrLiBJZiBubyBuYXRpdmVcclxuICogbWVjaGFuaXNtIGZvciBzY2hlZHVsaW5nIG1hY3JvdGFza3MgaXMgZXhwb3NlZCwgdGhlbiBhbnkgY2FsbGJhY2tzIHdpbGwgYmUgZmlyZWQgYmVmb3JlIGFueSBtYWNyb3Rhc2tcclxuICogcmVnaXN0ZXJlZCB3aXRoIGBxdWV1ZVRhc2tgIG9yIGBxdWV1ZUFuaW1hdGlvblRhc2tgLlxyXG4gKlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHRvIGJlIHF1ZXVlZCBhbmQgbGF0ZXIgZXhlY3V0ZWQuXHJcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGEgYGRlc3Ryb3lgIG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgcHJldmVudHMgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnJvbSBleGVjdXRpbmcuXHJcbiAqL1xyXG5leHBvcnRzLnF1ZXVlTWljcm9UYXNrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlbnF1ZXVlO1xyXG4gICAgaWYgKGhhc18xLmRlZmF1bHQoJ2hvc3Qtbm9kZScpKSB7XHJcbiAgICAgICAgZW5xdWV1ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbF8xLmRlZmF1bHQucHJvY2Vzcy5uZXh0VGljayhleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFzXzEuZGVmYXVsdCgnZXM2LXByb21pc2UnKSkge1xyXG4gICAgICAgIGVucXVldWUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBnbG9iYWxfMS5kZWZhdWx0LlByb21pc2UucmVzb2x2ZShpdGVtKS50aGVuKGV4ZWN1dGVUYXNrKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFzXzEuZGVmYXVsdCgnZG9tLW11dGF0aW9ub2JzZXJ2ZXInKSkge1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXHJcbiAgICAgICAgdmFyIEhvc3RNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsXzEuZGVmYXVsdC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbF8xLmRlZmF1bHQuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcclxuICAgICAgICB2YXIgbm9kZV8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmFyIHF1ZXVlXzIgPSBbXTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgSG9zdE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aGlsZSAocXVldWVfMi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlXzIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uaXNBY3RpdmUgJiYgaXRlbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZV8xLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgZW5xdWV1ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlXzIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgbm9kZV8xLnNldEF0dHJpYnV0ZSgncXVldWVTdGF0dXMnLCAnMScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbnF1ZXVlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgY2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xyXG4gICAgICAgICAgICBtaWNyb1Rhc2tzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgaXNBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZW5xdWV1ZShpdGVtKTtcclxuICAgICAgICByZXR1cm4gZ2V0UXVldWVIYW5kbGUoaXRlbSk7XHJcbiAgICB9O1xyXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3NoaW0vc3VwcG9ydC9xdWV1ZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9zdXBwb3J0L3F1ZXVlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSB2YWx1ZSBwcm9wZXJ0eSBkZXNjcmlwdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZSAgICAgICAgVGhlIHZhbHVlIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHNob3VsZCBiZSBzZXQgdG9cclxuICogQHBhcmFtIGVudW1lcmFibGUgICBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGVudW1iZXJhYmxlLCBkZWZhdWx0cyB0byBmYWxzZVxyXG4gKiBAcGFyYW0gd3JpdGFibGUgICAgIElmIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgd3JpdGFibGUsIGRlZmF1bHRzIHRvIHRydWVcclxuICogQHBhcmFtIGNvbmZpZ3VyYWJsZSBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSwgZGVmYXVsdHMgdG8gdHJ1ZVxyXG4gKiBAcmV0dXJuICAgICAgICAgICAgIFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VmFsdWVEZXNjcmlwdG9yKHZhbHVlLCBlbnVtZXJhYmxlLCB3cml0YWJsZSwgY29uZmlndXJhYmxlKSB7XHJcbiAgICBpZiAoZW51bWVyYWJsZSA9PT0gdm9pZCAwKSB7IGVudW1lcmFibGUgPSBmYWxzZTsgfVxyXG4gICAgaWYgKHdyaXRhYmxlID09PSB2b2lkIDApIHsgd3JpdGFibGUgPSB0cnVlOyB9XHJcbiAgICBpZiAoY29uZmlndXJhYmxlID09PSB2b2lkIDApIHsgY29uZmlndXJhYmxlID0gdHJ1ZTsgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZW51bWVyYWJsZSxcclxuICAgICAgICB3cml0YWJsZTogd3JpdGFibGUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBjb25maWd1cmFibGVcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5nZXRWYWx1ZURlc2NyaXB0b3IgPSBnZXRWYWx1ZURlc2NyaXB0b3I7XHJcbmZ1bmN0aW9uIHdyYXBOYXRpdmUobmF0aXZlRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlRnVuY3Rpb24uYXBwbHkodGFyZ2V0LCBhcmdzKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy53cmFwTmF0aXZlID0gd3JhcE5hdGl2ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby9zaGltL3N1cHBvcnQvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vc2hpbS9zdXBwb3J0L3V0aWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbnZhciBoYXMgPSByZXF1aXJlKCdAZG9qby9jb3JlL2hhcycpO1xuaWYgKCFoYXMuZXhpc3RzKCdidWlsZC10aW1lLXJlbmRlcicpKSB7XG4gICAgaGFzLmFkZCgnYnVpbGQtdGltZS1yZW5kZXInLCBmYWxzZSwgZmFsc2UpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGFzQnVpbGRUaW1lUmVuZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9idWlsZC10aW1lLXJlbmRlci9oYXNCdWlsZFRpbWVSZW5kZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9idWlsZC10aW1lLXJlbmRlci9oYXNCdWlsZFRpbWVSZW5kZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBFdmVudGVkXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9FdmVudGVkXCIpO1xyXG52YXIgSW5qZWN0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhJbmplY3RvciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEluamVjdG9yKHBheWxvYWQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBJbmplY3Rvci5wcm90b3R5cGUuc2V0SW52YWxpZGF0b3IgPSBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcclxuICAgICAgICB0aGlzLl9pbnZhbGlkYXRvciA9IGludmFsaWRhdG9yO1xyXG4gICAgfTtcclxuICAgIEluamVjdG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BheWxvYWQ7XHJcbiAgICB9O1xyXG4gICAgSW5qZWN0b3IucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwYXlsb2FkKSB7XHJcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludmFsaWRhdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBJbmplY3RvcjtcclxufShFdmVudGVkXzEuRXZlbnRlZCkpO1xyXG5leHBvcnRzLkluamVjdG9yID0gSW5qZWN0b3I7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEluamVjdG9yO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL0luamVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9JbmplY3Rvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIEV2ZW50ZWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL0V2ZW50ZWRcIik7XHJcbnZhciBNYXBfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL01hcFwiKTtcclxuLyoqXHJcbiAqIEVudW0gdG8gaWRlbnRpZnkgdGhlIHR5cGUgb2YgZXZlbnQuXHJcbiAqIExpc3RlbmluZyB0byAnUHJvamVjdG9yJyB3aWxsIG5vdGlmeSB3aGVuIHByb2plY3RvciBpcyBjcmVhdGVkIG9yIHVwZGF0ZWRcclxuICogTGlzdGVuaW5nIHRvICdXaWRnZXQnIHdpbGwgbm90aWZ5IHdoZW4gd2lkZ2V0IHJvb3QgaXMgY3JlYXRlZCBvciB1cGRhdGVkXHJcbiAqL1xyXG52YXIgTm9kZUV2ZW50VHlwZTtcclxuKGZ1bmN0aW9uIChOb2RlRXZlbnRUeXBlKSB7XHJcbiAgICBOb2RlRXZlbnRUeXBlW1wiUHJvamVjdG9yXCJdID0gXCJQcm9qZWN0b3JcIjtcclxuICAgIE5vZGVFdmVudFR5cGVbXCJXaWRnZXRcIl0gPSBcIldpZGdldFwiO1xyXG59KShOb2RlRXZlbnRUeXBlID0gZXhwb3J0cy5Ob2RlRXZlbnRUeXBlIHx8IChleHBvcnRzLk5vZGVFdmVudFR5cGUgPSB7fSkpO1xyXG52YXIgTm9kZUhhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhOb2RlSGFuZGxlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE5vZGVIYW5kbGVyKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9ub2RlTWFwID0gbmV3IE1hcF8xLmRlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBOb2RlSGFuZGxlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlTWFwLmdldChrZXkpO1xyXG4gICAgfTtcclxuICAgIE5vZGVIYW5kbGVyLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVNYXAuaGFzKGtleSk7XHJcbiAgICB9O1xyXG4gICAgTm9kZUhhbmRsZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtZW50LCBrZXkpIHtcclxuICAgICAgICB0aGlzLl9ub2RlTWFwLnNldChrZXksIGVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZW1pdCh7IHR5cGU6IGtleSB9KTtcclxuICAgIH07XHJcbiAgICBOb2RlSGFuZGxlci5wcm90b3R5cGUuYWRkUm9vdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmVtaXQoeyB0eXBlOiBOb2RlRXZlbnRUeXBlLldpZGdldCB9KTtcclxuICAgIH07XHJcbiAgICBOb2RlSGFuZGxlci5wcm90b3R5cGUuYWRkUHJvamVjdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdCh7IHR5cGU6IE5vZGVFdmVudFR5cGUuUHJvamVjdG9yIH0pO1xyXG4gICAgfTtcclxuICAgIE5vZGVIYW5kbGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9ub2RlTWFwLmNsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5vZGVIYW5kbGVyO1xyXG59KEV2ZW50ZWRfMS5FdmVudGVkKSk7XHJcbmV4cG9ydHMuTm9kZUhhbmRsZXIgPSBOb2RlSGFuZGxlcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTm9kZUhhbmRsZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvTm9kZUhhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL05vZGVIYW5kbGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgUHJvbWlzZV8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vUHJvbWlzZVwiKTtcclxudmFyIE1hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vTWFwXCIpO1xyXG52YXIgU3ltYm9sXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9TeW1ib2xcIik7XHJcbnZhciBFdmVudGVkXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9FdmVudGVkXCIpO1xyXG4vKipcclxuICogV2lkZ2V0IGJhc2Ugc3ltYm9sIHR5cGVcclxuICovXHJcbmV4cG9ydHMuV0lER0VUX0JBU0VfVFlQRSA9IFN5bWJvbF8xLmRlZmF1bHQoJ1dpZGdldCBCYXNlJyk7XHJcbi8qKlxyXG4gKiBDaGVja3MgaXMgdGhlIGl0ZW0gaXMgYSBzdWJjbGFzcyBvZiBXaWRnZXRCYXNlIChvciBhIFdpZGdldEJhc2UpXHJcbiAqXHJcbiAqIEBwYXJhbSBpdGVtIHRoZSBpdGVtIHRvIGNoZWNrXHJcbiAqIEByZXR1cm5zIHRydWUvZmFsc2UgaW5kaWNhdGluZyBpZiB0aGUgaXRlbSBpcyBhIFdpZGdldEJhc2VDb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IoaXRlbSkge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oaXRlbSAmJiBpdGVtLl90eXBlID09PSBleHBvcnRzLldJREdFVF9CQVNFX1RZUEUpO1xyXG59XHJcbmV4cG9ydHMuaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IgPSBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjtcclxuZnVuY3Rpb24gaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQoaXRlbSkge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oaXRlbSAmJlxyXG4gICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ19fZXNNb2R1bGUnKSAmJlxyXG4gICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJlxyXG4gICAgICAgIGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKGl0ZW0uZGVmYXVsdCkpO1xyXG59XHJcbmV4cG9ydHMuaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQgPSBpc1dpZGdldENvbnN0cnVjdG9yRGVmYXVsdEV4cG9ydDtcclxuLyoqXHJcbiAqIFRoZSBSZWdpc3RyeSBpbXBsZW1lbnRhdGlvblxyXG4gKi9cclxudmFyIFJlZ2lzdHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoUmVnaXN0cnksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSZWdpc3RyeSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEVtaXQgbG9hZGVkIGV2ZW50IGZvciByZWdpc3RyeSBsYWJlbFxyXG4gICAgICovXHJcbiAgICBSZWdpc3RyeS5wcm90b3R5cGUuZW1pdExvYWRlZEV2ZW50ID0gZnVuY3Rpb24gKHdpZGdldExhYmVsLCBpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZTogd2lkZ2V0TGFiZWwsXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2xvYWRlZCcsXHJcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeS5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24gKGxhYmVsLCBpdGVtKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5fd2lkZ2V0UmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl93aWRnZXRSZWdpc3RyeSA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl93aWRnZXRSZWdpc3RyeS5oYXMobGFiZWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIndpZGdldCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgZm9yICdcIiArIGxhYmVsLnRvU3RyaW5nKCkgKyBcIidcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dpZGdldFJlZ2lzdHJ5LnNldChsYWJlbCwgaXRlbSk7XHJcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlXzEuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICBpdGVtLnRoZW4oZnVuY3Rpb24gKHdpZGdldEN0b3IpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl93aWRnZXRSZWdpc3RyeS5zZXQobGFiZWwsIHdpZGdldEN0b3IpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXRDdG9yO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IoaXRlbSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSZWdpc3RyeS5wcm90b3R5cGUuZGVmaW5lSW5qZWN0b3IgPSBmdW5jdGlvbiAobGFiZWwsIGluamVjdG9yRmFjdG9yeSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmplY3RvclJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5qZWN0b3JSZWdpc3RyeSA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5qZWN0b3IgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGZvciAnXCIgKyBsYWJlbC50b1N0cmluZygpICsgXCInXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW52YWxpZGF0b3IgPSBuZXcgRXZlbnRlZF8xLkV2ZW50ZWQoKTtcclxuICAgICAgICB2YXIgaW5qZWN0b3JJdGVtID0ge1xyXG4gICAgICAgICAgICBpbmplY3RvcjogaW5qZWN0b3JGYWN0b3J5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGludmFsaWRhdG9yLmVtaXQoeyB0eXBlOiAnaW52YWxpZGF0ZScgfSk7IH0pLFxyXG4gICAgICAgICAgICBpbnZhbGlkYXRvcjogaW52YWxpZGF0b3JcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2luamVjdG9yUmVnaXN0cnkuc2V0KGxhYmVsLCBpbmplY3Rvckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCBpbmplY3Rvckl0ZW0pO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5fd2lkZ2V0UmVnaXN0cnkgfHwgIXRoaXMuaGFzKGxhYmVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl93aWRnZXRSZWdpc3RyeS5nZXQobGFiZWwpO1xyXG4gICAgICAgIGlmIChpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlXzEuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBpdGVtKCk7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCBwcm9taXNlKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHdpZGdldEN0b3IpIHtcclxuICAgICAgICAgICAgaWYgKGlzV2lkZ2V0Q29uc3RydWN0b3JEZWZhdWx0RXhwb3J0KHdpZGdldEN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXRDdG9yID0gd2lkZ2V0Q3Rvci5kZWZhdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLl93aWRnZXRSZWdpc3RyeS5zZXQobGFiZWwsIHdpZGdldEN0b3IpO1xyXG4gICAgICAgICAgICBfdGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIHdpZGdldEN0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gd2lkZ2V0Q3RvcjtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmdldEluamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbmplY3RvclJlZ2lzdHJ5IHx8ICF0aGlzLmhhc0luamVjdG9yKGxhYmVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdG9yUmVnaXN0cnkuZ2V0KGxhYmVsKTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fd2lkZ2V0UmVnaXN0cnkgJiYgdGhpcy5fd2lkZ2V0UmVnaXN0cnkuaGFzKGxhYmVsKSk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnkucHJvdG90eXBlLmhhc0luamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5faW5qZWN0b3JSZWdpc3RyeSAmJiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZWdpc3RyeTtcclxufShFdmVudGVkXzEuRXZlbnRlZCkpO1xyXG5leHBvcnRzLlJlZ2lzdHJ5ID0gUmVnaXN0cnk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFJlZ2lzdHJ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1JlZ2lzdHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9SZWdpc3RyeS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIE1hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vTWFwXCIpO1xyXG52YXIgRXZlbnRlZF8xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvRXZlbnRlZFwiKTtcclxudmFyIFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxudmFyIFJlZ2lzdHJ5SGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFJlZ2lzdHJ5SGFuZGxlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJlZ2lzdHJ5SGFuZGxlcigpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9yZWdpc3RyeSA9IG5ldyBSZWdpc3RyeV8xLlJlZ2lzdHJ5KCk7XHJcbiAgICAgICAgX3RoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAgPSBuZXcgTWFwXzEuTWFwKCk7XHJcbiAgICAgICAgX3RoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcCA9IG5ldyBNYXBfMS5NYXAoKTtcclxuICAgICAgICBfdGhpcy5vd24oX3RoaXMuX3JlZ2lzdHJ5KTtcclxuICAgICAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmJhc2VSZWdpc3RyeSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKF90aGlzLmJhc2VSZWdpc3RyeSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwLmRlbGV0ZShfdGhpcy5iYXNlUmVnaXN0cnkpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYmFzZVJlZ2lzdHJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5vd24oeyBkZXN0cm95OiBkZXN0cm95IH0pO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3RyeUhhbmRsZXIucHJvdG90eXBlLCBcImJhc2VcIiwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGJhc2VSZWdpc3RyeSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYXNlUmVnaXN0cnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcC5kZWxldGUodGhpcy5iYXNlUmVnaXN0cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmFzZVJlZ2lzdHJ5ID0gYmFzZVJlZ2lzdHJ5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbiAobGFiZWwsIHdpZGdldCkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdHJ5LmRlZmluZShsYWJlbCwgd2lkZ2V0KTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeUhhbmRsZXIucHJvdG90eXBlLmRlZmluZUluamVjdG9yID0gZnVuY3Rpb24gKGxhYmVsLCBpbmplY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdHJ5LmRlZmluZUluamVjdG9yKGxhYmVsLCBpbmplY3Rvcik7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5SGFuZGxlci5wcm90b3R5cGUuaGFzSW5qZWN0b3IgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzSW5qZWN0b3IobGFiZWwpIHx8IEJvb2xlYW4odGhpcy5iYXNlUmVnaXN0cnkgJiYgdGhpcy5iYXNlUmVnaXN0cnkuaGFzSW5qZWN0b3IobGFiZWwpKTtcclxuICAgIH07XHJcbiAgICBSZWdpc3RyeUhhbmRsZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSkge1xyXG4gICAgICAgIGlmIChnbG9iYWxQcmVjZWRlbmNlID09PSB2b2lkIDApIHsgZ2xvYmFsUHJlY2VkZW5jZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldChsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSwgJ2dldCcsIHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXApO1xyXG4gICAgfTtcclxuICAgIFJlZ2lzdHJ5SGFuZGxlci5wcm90b3R5cGUuZ2V0SW5qZWN0b3IgPSBmdW5jdGlvbiAobGFiZWwsIGdsb2JhbFByZWNlZGVuY2UpIHtcclxuICAgICAgICBpZiAoZ2xvYmFsUHJlY2VkZW5jZSA9PT0gdm9pZCAwKSB7IGdsb2JhbFByZWNlZGVuY2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQobGFiZWwsIGdsb2JhbFByZWNlZGVuY2UsICdnZXRJbmplY3RvcicsIHRoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcCk7XHJcbiAgICB9O1xyXG4gICAgUmVnaXN0cnlIYW5kbGVyLnByb3RvdHlwZS5fZ2V0ID0gZnVuY3Rpb24gKGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlLCBnZXRGdW5jdGlvbk5hbWUsIGxhYmVsTWFwKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcmVnaXN0cmllcyA9IGdsb2JhbFByZWNlZGVuY2UgPyBbdGhpcy5iYXNlUmVnaXN0cnksIHRoaXMuX3JlZ2lzdHJ5XSA6IFt0aGlzLl9yZWdpc3RyeSwgdGhpcy5iYXNlUmVnaXN0cnldO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcmVnaXN0cnkgPSByZWdpc3RyaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXJlZ2lzdHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHJlZ2lzdHJ5W2dldEZ1bmN0aW9uTmFtZV0obGFiZWwpO1xyXG4gICAgICAgICAgICB2YXIgcmVnaXN0ZXJlZExhYmVscyA9IGxhYmVsTWFwLmdldChyZWdpc3RyeSkgfHwgW107XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyZWdpc3RlcmVkTGFiZWxzLmluZGV4T2YobGFiZWwpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IHJlZ2lzdHJ5Lm9uKGxhYmVsLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID09PSAnbG9hZGVkJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpc1tnZXRGdW5jdGlvbk5hbWVdKGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlKSA9PT0gZXZlbnQuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KHsgdHlwZTogJ2ludmFsaWRhdGUnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vd24oaGFuZGxlKTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTWFwLnNldChyZWdpc3RyeSwgdHNsaWJfMS5fX3NwcmVhZChyZWdpc3RlcmVkTGFiZWxzLCBbbGFiZWxdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlZ2lzdHJ5SGFuZGxlcjtcclxufShFdmVudGVkXzEuRXZlbnRlZCkpO1xyXG5leHBvcnRzLlJlZ2lzdHJ5SGFuZGxlciA9IFJlZ2lzdHJ5SGFuZGxlcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUmVnaXN0cnlIYW5kbGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL1JlZ2lzdHJ5SGFuZGxlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvUmVnaXN0cnlIYW5kbGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgTWFwXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9NYXBcIik7XHJcbnZhciBXZWFrTWFwXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9XZWFrTWFwXCIpO1xyXG52YXIgU3ltYm9sXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9TeW1ib2xcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiLi9kXCIpO1xyXG52YXIgZGlmZl8xID0gcmVxdWlyZShcIi4vZGlmZlwiKTtcclxudmFyIFJlZ2lzdHJ5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vUmVnaXN0cnlIYW5kbGVyXCIpO1xyXG52YXIgTm9kZUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL05vZGVIYW5kbGVyXCIpO1xyXG52YXIgdmRvbV8xID0gcmVxdWlyZShcIi4vdmRvbVwiKTtcclxudmFyIFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxudmFyIGRlY29yYXRvck1hcCA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbnZhciBib3VuZEF1dG8gPSBkaWZmXzEuYXV0by5iaW5kKG51bGwpO1xyXG5leHBvcnRzLm5vQmluZCA9IFN5bWJvbF8xLmRlZmF1bHQuZm9yKCdkb2pvTm9CaW5kJyk7XHJcbi8qKlxyXG4gKiBNYWluIHdpZGdldCBiYXNlIGZvciBhbGwgd2lkZ2V0cyB0byBleHRlbmRcclxuICovXHJcbnZhciBXaWRnZXRCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gV2lkZ2V0QmFzZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgaW5pdGlhbCBzZXQgcHJvcGVydGllcyBjeWNsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxQcm9wZXJ0aWVzID0gdHJ1ZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBcnJheSBvZiBwcm9wZXJ0eSBrZXlzIGNvbnNpZGVyZWQgY2hhbmdlZCBmcm9tIHRoZSBwcmV2aW91cyBzZXQgcHJvcGVydGllc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9ub2RlSGFuZGxlciA9IG5ldyBOb2RlSGFuZGxlcl8xLmRlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLl9kZWNvcmF0b3JDYWNoZSA9IG5ldyBNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2JvdW5kUmVuZGVyRnVuYyA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fYm91bmRJbnZhbGlkYXRlID0gdGhpcy5pbnZhbGlkYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdmRvbV8xLndpZGdldEluc3RhbmNlTWFwLnNldCh0aGlzLCB7XHJcbiAgICAgICAgICAgIGRpcnR5OiB0cnVlLFxyXG4gICAgICAgICAgICBvbkF0dGFjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub25BdHRhY2goKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EZXRhY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uRGV0YWNoKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vZGVIYW5kbGVyOiB0aGlzLl9ub2RlSGFuZGxlcixcclxuICAgICAgICAgICAgcmVnaXN0cnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZWdpc3RyeTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29yZVByb3BlcnRpZXM6IHt9LFxyXG4gICAgICAgICAgICByZW5kZXJpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFByb3BlcnRpZXM6IHt9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fcnVuQWZ0ZXJDb25zdHJ1Y3RvcnMoKTtcclxuICAgIH1cclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLm1ldGEgPSBmdW5jdGlvbiAoTWV0YVR5cGUpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWV0YU1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGFNYXAgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2FjaGVkID0gdGhpcy5fbWV0YU1hcC5nZXQoTWV0YVR5cGUpO1xyXG4gICAgICAgIGlmICghY2FjaGVkKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZCA9IG5ldyBNZXRhVHlwZSh7XHJcbiAgICAgICAgICAgICAgICBpbnZhbGlkYXRlOiB0aGlzLl9ib3VuZEludmFsaWRhdGUsXHJcbiAgICAgICAgICAgICAgICBub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICBiaW5kOiB0aGlzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm93bihjYWNoZWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRhTWFwLnNldChNZXRhVHlwZSwgY2FjaGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZDtcclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5vbkF0dGFjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUub25EZXRhY2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXaWRnZXRCYXNlLnByb3RvdHlwZSwgXCJwcm9wZXJ0aWVzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2lkZ2V0QmFzZS5wcm90b3R5cGUsIFwiY2hhbmdlZFByb3BlcnR5S2V5c1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fc3ByZWFkKHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX19zZXRDb3JlUHJvcGVydGllc19fID0gZnVuY3Rpb24gKGNvcmVQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgdmFyIGJhc2VSZWdpc3RyeSA9IGNvcmVQcm9wZXJ0aWVzLmJhc2VSZWdpc3RyeTtcclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdmRvbV8xLndpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKTtcclxuICAgICAgICBpZiAoaW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJhc2VSZWdpc3RyeSAhPT0gYmFzZVJlZ2lzdHJ5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBSZWdpc3RyeUhhbmRsZXJfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bih0aGlzLl9yZWdpc3RyeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bih0aGlzLl9yZWdpc3RyeS5vbignaW52YWxpZGF0ZScsIHRoaXMuX2JvdW5kSW52YWxpZGF0ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5LmJhc2UgPSBiYXNlUmVnaXN0cnk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMgPSBjb3JlUHJvcGVydGllcztcclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5fX3NldFByb3BlcnRpZXNfXyA9IGZ1bmN0aW9uIChvcmlnaW5hbFByb3BlcnRpZXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB2ZG9tXzEud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpO1xyXG4gICAgICAgIGluc3RhbmNlRGF0YS5pbnB1dFByb3BlcnRpZXMgPSBvcmlnaW5hbFByb3BlcnRpZXM7XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB0aGlzLl9ydW5CZWZvcmVQcm9wZXJ0aWVzKG9yaWdpbmFsUHJvcGVydGllcyk7XHJcbiAgICAgICAgdmFyIHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdyZWdpc3RlcmVkRGlmZlByb3BlcnR5Jyk7XHJcbiAgICAgICAgdmFyIGNoYW5nZWRQcm9wZXJ0eUtleXMgPSBbXTtcclxuICAgICAgICB2YXIgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9PT0gZmFsc2UgfHwgcmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgYWxsUHJvcGVydGllcyA9IHRzbGliXzEuX19zcHJlYWQocHJvcGVydHlOYW1lcywgT2JqZWN0LmtleXModGhpcy5fcHJvcGVydGllcykpO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tlZFByb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGRpZmZQcm9wZXJ0eVJlc3VsdHNfMSA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgcnVuUmVhY3Rpb25zID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGFsbFByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZFByb3BlcnRpZXMucHVzaChwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzUHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3UHJvcGVydHkgPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0sIGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iaW5kKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RlcmVkRGlmZlByb3BlcnR5TmFtZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1blJlYWN0aW9ucyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZGdW5jdGlvbnMgPSB0aGlzLmdldERlY29yYXRvcihcImRpZmZQcm9wZXJ0eTpcIiArIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgZGlmZkZ1bmN0aW9ucy5sZW5ndGg7IGlfMSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBkaWZmRnVuY3Rpb25zW2lfMV0ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoYW5nZWQgJiYgY2hhbmdlZFByb3BlcnR5S2V5cy5pbmRleE9mKHByb3BlcnR5TmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZQcm9wZXJ0eVJlc3VsdHNfMVtwcm9wZXJ0eU5hbWVdID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGJvdW5kQXV0byhwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZQcm9wZXJ0eVJlc3VsdHNfMVtwcm9wZXJ0eU5hbWVdID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocnVuUmVhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhY3Rpb25GdW5jdGlvbnMgPSB0aGlzLmdldERlY29yYXRvcignZGlmZlJlYWN0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhlY3V0ZWRSZWFjdGlvbnNfMSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVhY3Rpb25GdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVhY3Rpb24gPSBfYS5yZWFjdGlvbiwgcHJvcGVydHlOYW1lID0gX2EucHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eUNoYW5nZWQgPSBjaGFuZ2VkUHJvcGVydHlLZXlzLmluZGV4T2YocHJvcGVydHlOYW1lKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWN0aW9uUnVuID0gZXhlY3V0ZWRSZWFjdGlvbnNfMS5pbmRleE9mKHJlYWN0aW9uKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5Q2hhbmdlZCAmJiAhcmVhY3Rpb25SdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3Rpb24uY2FsbChfdGhpcywgX3RoaXMuX3Byb3BlcnRpZXMsIGRpZmZQcm9wZXJ0eVJlc3VsdHNfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVkUmVhY3Rpb25zXzEucHVzaChyZWFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IGRpZmZQcm9wZXJ0eVJlc3VsdHNfMTtcclxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cyA9IGNoYW5nZWRQcm9wZXJ0eUtleXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0sIGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iaW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wZXJ0eUtleXMucHVzaChwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMgPSBjaGFuZ2VkUHJvcGVydHlLZXlzO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXaWRnZXRCYXNlLnByb3RvdHlwZSwgXCJjaGlsZHJlblwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9fc2V0Q2hpbGRyZW5fXyA9IGZ1bmN0aW9uIChjaGlsZHJlbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwIHx8IGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9fcmVuZGVyX18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IHZkb21fMS53aWRnZXRJbnN0YW5jZU1hcC5nZXQodGhpcyk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlbmRlciA9IHRoaXMuX3J1bkJlZm9yZVJlbmRlcnMoKTtcclxuICAgICAgICB2YXIgZE5vZGUgPSByZW5kZXIoKTtcclxuICAgICAgICBkTm9kZSA9IHRoaXMucnVuQWZ0ZXJSZW5kZXJzKGROb2RlKTtcclxuICAgICAgICB0aGlzLl9ub2RlSGFuZGxlci5jbGVhcigpO1xyXG4gICAgICAgIHJldHVybiBkTm9kZTtcclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB2ZG9tXzEud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpO1xyXG4gICAgICAgIGlmIChpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7fSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgZGVjb3JhdG9ycyB0byBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRlY29yYXRvcktleSBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3JcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGRlY29yYXRvclxyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5hZGREZWNvcmF0b3IgPSBmdW5jdGlvbiAoZGVjb3JhdG9yS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ2NvbnN0cnVjdG9yJykpIHtcclxuICAgICAgICAgICAgdmFyIGRlY29yYXRvckxpc3QgPSBkZWNvcmF0b3JNYXAuZ2V0KHRoaXMuY29uc3RydWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoIWRlY29yYXRvckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGRlY29yYXRvckxpc3QgPSBuZXcgTWFwXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yTWFwLnNldCh0aGlzLmNvbnN0cnVjdG9yLCBkZWNvcmF0b3JMaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3BlY2lmaWNEZWNvcmF0b3JMaXN0ID0gZGVjb3JhdG9yTGlzdC5nZXQoZGVjb3JhdG9yS2V5KTtcclxuICAgICAgICAgICAgaWYgKCFzcGVjaWZpY0RlY29yYXRvckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHNwZWNpZmljRGVjb3JhdG9yTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yTGlzdC5zZXQoZGVjb3JhdG9yS2V5LCBzcGVjaWZpY0RlY29yYXRvckxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWNpZmljRGVjb3JhdG9yTGlzdC5wdXNoLmFwcGx5KHNwZWNpZmljRGVjb3JhdG9yTGlzdCwgdHNsaWJfMS5fX3NwcmVhZCh2YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRlY29yYXRvcnMgPSB0aGlzLmdldERlY29yYXRvcihkZWNvcmF0b3JLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWNvcmF0b3JDYWNoZS5zZXQoZGVjb3JhdG9yS2V5LCB0c2xpYl8xLl9fc3ByZWFkKGRlY29yYXRvcnMsIHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gYnVpbGQgdGhlIGxpc3Qgb2YgZGVjb3JhdG9ycyBmcm9tIHRoZSBnbG9iYWwgZGVjb3JhdG9yIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVjb3JhdG9yS2V5ICBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3JcclxuICAgICAqIEByZXR1cm4gQW4gYXJyYXkgb2YgZGVjb3JhdG9yIHZhbHVlc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX2J1aWxkRGVjb3JhdG9yTGlzdCA9IGZ1bmN0aW9uIChkZWNvcmF0b3JLZXkpIHtcclxuICAgICAgICB2YXIgYWxsRGVjb3JhdG9ycyA9IFtdO1xyXG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XHJcbiAgICAgICAgd2hpbGUgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZU1hcCA9IGRlY29yYXRvck1hcC5nZXQoY29uc3RydWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2VNYXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3JzID0gaW5zdGFuY2VNYXAuZ2V0KGRlY29yYXRvcktleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVjb3JhdG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbERlY29yYXRvcnMudW5zaGlmdC5hcHBseShhbGxEZWNvcmF0b3JzLCB0c2xpYl8xLl9fc3ByZWFkKGRlY29yYXRvcnMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxEZWNvcmF0b3JzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gcmV0cmlldmUgZGVjb3JhdG9yIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkZWNvcmF0b3JLZXkgVGhlIGtleSBvZiB0aGUgZGVjb3JhdG9yXHJcbiAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBkZWNvcmF0b3IgdmFsdWVzXHJcbiAgICAgKi9cclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLmdldERlY29yYXRvciA9IGZ1bmN0aW9uIChkZWNvcmF0b3JLZXkpIHtcclxuICAgICAgICB2YXIgYWxsRGVjb3JhdG9ycyA9IHRoaXMuX2RlY29yYXRvckNhY2hlLmdldChkZWNvcmF0b3JLZXkpO1xyXG4gICAgICAgIGlmIChhbGxEZWNvcmF0b3JzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbERlY29yYXRvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFsbERlY29yYXRvcnMgPSB0aGlzLl9idWlsZERlY29yYXRvckxpc3QoZGVjb3JhdG9yS2V5KTtcclxuICAgICAgICB0aGlzLl9kZWNvcmF0b3JDYWNoZS5zZXQoZGVjb3JhdG9yS2V5LCBhbGxEZWNvcmF0b3JzKTtcclxuICAgICAgICByZXR1cm4gYWxsRGVjb3JhdG9ycztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEJpbmRzIHVuYm91bmQgcHJvcGVydHkgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGJpbmRgIHByb3BlcnR5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgcHJvcGVydGllcyB0byBjaGVjayBmb3IgZnVuY3Rpb25zXHJcbiAgICAgKi9cclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgYmluZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgIXByb3BlcnR5W2V4cG9ydHMubm9CaW5kXSAmJiBSZWdpc3RyeV8xLmlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKHByb3BlcnR5KSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwID0gbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGJpbmRJbmZvID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuZ2V0KHByb3BlcnR5KSB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIGJvdW5kRnVuYyA9IGJpbmRJbmZvLmJvdW5kRnVuYywgc2NvcGUgPSBiaW5kSW5mby5zY29wZTtcclxuICAgICAgICAgICAgaWYgKGJvdW5kRnVuYyA9PT0gdW5kZWZpbmVkIHx8IHNjb3BlICE9PSBiaW5kKSB7XHJcbiAgICAgICAgICAgICAgICBib3VuZEZ1bmMgPSBwcm9wZXJ0eS5iaW5kKGJpbmQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuc2V0KHByb3BlcnR5LCB7IGJvdW5kRnVuYzogYm91bmRGdW5jLCBzY29wZTogYmluZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYm91bmRGdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydHk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdpZGdldEJhc2UucHJvdG90eXBlLCBcInJlZ2lzdHJ5XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5SGFuZGxlcl8xLmRlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5Lm9uKCdpbnZhbGlkYXRlJywgdGhpcy5fYm91bmRJbnZhbGlkYXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX3J1bkJlZm9yZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAocHJvcGVydGllcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJlZm9yZVByb3BlcnRpZXMgPSB0aGlzLmdldERlY29yYXRvcignYmVmb3JlUHJvcGVydGllcycpO1xyXG4gICAgICAgIGlmIChiZWZvcmVQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBiZWZvcmVQcm9wZXJ0aWVzRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fYXNzaWduKHt9LCBwcm9wZXJ0aWVzLCBiZWZvcmVQcm9wZXJ0aWVzRnVuY3Rpb24uY2FsbChfdGhpcywgcHJvcGVydGllcykpO1xyXG4gICAgICAgICAgICB9LCB0c2xpYl8xLl9fYXNzaWduKHt9LCBwcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUnVuIGFsbCByZWdpc3RlcmVkIGJlZm9yZSByZW5kZXJzIGFuZCByZXR1cm4gdGhlIHVwZGF0ZWQgcmVuZGVyIG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5fcnVuQmVmb3JlUmVuZGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBiZWZvcmVSZW5kZXJzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2JlZm9yZVJlbmRlcicpO1xyXG4gICAgICAgIGlmIChiZWZvcmVSZW5kZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZVJlbmRlcnMucmVkdWNlKGZ1bmN0aW9uIChyZW5kZXIsIGJlZm9yZVJlbmRlckZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZFJlbmRlciA9IGJlZm9yZVJlbmRlckZ1bmN0aW9uLmNhbGwoX3RoaXMsIHJlbmRlciwgX3RoaXMuX3Byb3BlcnRpZXMsIF90aGlzLl9jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVwZGF0ZWRSZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlbmRlciBmdW5jdGlvbiBub3QgcmV0dXJuZWQgZnJvbSBiZWZvcmVSZW5kZXIsIHVzaW5nIHByZXZpb3VzIHJlbmRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFJlbmRlcjtcclxuICAgICAgICAgICAgfSwgdGhpcy5fYm91bmRSZW5kZXJGdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kUmVuZGVyRnVuYztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJ1biBhbGwgcmVnaXN0ZXJlZCBhZnRlciByZW5kZXJzIGFuZCByZXR1cm4gdGhlIGRlY29yYXRlZCBETm9kZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZE5vZGUgVGhlIEROb2RlcyB0byBydW4gdGhyb3VnaCB0aGUgYWZ0ZXIgcmVuZGVyc1xyXG4gICAgICovXHJcbiAgICBXaWRnZXRCYXNlLnByb3RvdHlwZS5ydW5BZnRlclJlbmRlcnMgPSBmdW5jdGlvbiAoZE5vZGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhZnRlclJlbmRlcnMgPSB0aGlzLmdldERlY29yYXRvcignYWZ0ZXJSZW5kZXInKTtcclxuICAgICAgICBpZiAoYWZ0ZXJSZW5kZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZE5vZGUgPSBhZnRlclJlbmRlcnMucmVkdWNlKGZ1bmN0aW9uIChkTm9kZSwgYWZ0ZXJSZW5kZXJGdW5jdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFmdGVyUmVuZGVyRnVuY3Rpb24uY2FsbChfdGhpcywgZE5vZGUpO1xyXG4gICAgICAgICAgICB9LCBkTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tZXRhTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0YU1hcC5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhLmFmdGVyUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZE5vZGU7XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUuX3J1bkFmdGVyQ29uc3RydWN0b3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFmdGVyQ29uc3RydWN0b3JzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2FmdGVyQ29uc3RydWN0b3InKTtcclxuICAgICAgICBpZiAoYWZ0ZXJDb25zdHJ1Y3RvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhZnRlckNvbnN0cnVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChhZnRlckNvbnN0cnVjdG9yKSB7IHJldHVybiBhZnRlckNvbnN0cnVjdG9yLmNhbGwoX3RoaXMpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgV2lkZ2V0QmFzZS5wcm90b3R5cGUub3duID0gZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXMucHVzaChoYW5kbGUpO1xyXG4gICAgfTtcclxuICAgIFdpZGdldEJhc2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2hhbmRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gdGhpcy5faGFuZGxlcy5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIHN0YXRpYyBpZGVudGlmaWVyXHJcbiAgICAgKi9cclxuICAgIFdpZGdldEJhc2UuX3R5cGUgPSBSZWdpc3RyeV8xLldJREdFVF9CQVNFX1RZUEU7XHJcbiAgICByZXR1cm4gV2lkZ2V0QmFzZTtcclxufSgpKTtcclxuZXhwb3J0cy5XaWRnZXRCYXNlID0gV2lkZ2V0QmFzZTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gV2lkZ2V0QmFzZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lID0gJyc7XHJcbnZhciBicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnJztcclxuZnVuY3Rpb24gZGV0ZXJtaW5lQnJvd3NlclN0eWxlTmFtZXMoZWxlbWVudCkge1xyXG4gICAgaWYgKCdXZWJraXRUcmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlKSB7XHJcbiAgICAgICAgYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICd3ZWJraXRUcmFuc2l0aW9uRW5kJztcclxuICAgICAgICBicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnd2Via2l0QW5pbWF0aW9uRW5kJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCd0cmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlIHx8ICdNb3pUcmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlKSB7XHJcbiAgICAgICAgYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICd0cmFuc2l0aW9uZW5kJztcclxuICAgICAgICBicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnYW5pbWF0aW9uZW5kJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbml0aWFsaXplKGVsZW1lbnQpIHtcclxuICAgIGlmIChicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPT09ICcnKSB7XHJcbiAgICAgICAgZGV0ZXJtaW5lQnJvd3NlclN0eWxlTmFtZXMoZWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcnVuQW5kQ2xlYW5VcChlbGVtZW50LCBzdGFydEFuaW1hdGlvbiwgZmluaXNoQW5pbWF0aW9uKSB7XHJcbiAgICBpbml0aWFsaXplKGVsZW1lbnQpO1xyXG4gICAgdmFyIGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICB2YXIgdHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUsIHRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcclxuICAgICAgICAgICAgZmluaXNoQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHN0YXJ0QW5pbWF0aW9uKCk7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcclxufVxyXG5mdW5jdGlvbiBleGl0KG5vZGUsIHByb3BlcnRpZXMsIGV4aXRBbmltYXRpb24sIHJlbW92ZU5vZGUpIHtcclxuICAgIHZhciBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZXhpdEFuaW1hdGlvbkFjdGl2ZSB8fCBleGl0QW5pbWF0aW9uICsgXCItYWN0aXZlXCI7XHJcbiAgICBydW5BbmRDbGVhblVwKG5vZGUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoZXhpdEFuaW1hdGlvbik7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZW1vdmVOb2RlKCk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBlbnRlcihub2RlLCBwcm9wZXJ0aWVzLCBlbnRlckFuaW1hdGlvbikge1xyXG4gICAgdmFyIGFjdGl2ZUNsYXNzID0gcHJvcGVydGllcy5lbnRlckFuaW1hdGlvbkFjdGl2ZSB8fCBlbnRlckFuaW1hdGlvbiArIFwiLWFjdGl2ZVwiO1xyXG4gICAgcnVuQW5kQ2xlYW5VcChub2RlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGVudGVyQW5pbWF0aW9uKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShlbnRlckFuaW1hdGlvbik7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHtcclxuICAgIGVudGVyOiBlbnRlcixcclxuICAgIGV4aXQ6IGV4aXRcclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9hbmltYXRpb25zL2Nzc1RyYW5zaXRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9hbmltYXRpb25zL2Nzc1RyYW5zaXRpb25zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgU3ltYm9sXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9TeW1ib2xcIik7XHJcbi8qKlxyXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgV05vZGUgdHlwZVxyXG4gKi9cclxuZXhwb3J0cy5XTk9ERSA9IFN5bWJvbF8xLmRlZmF1bHQoJ0lkZW50aWZpZXIgZm9yIGEgV05vZGUuJyk7XHJcbi8qKlxyXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgVk5vZGUgdHlwZVxyXG4gKi9cclxuZXhwb3J0cy5WTk9ERSA9IFN5bWJvbF8xLmRlZmF1bHQoJ0lkZW50aWZpZXIgZm9yIGEgVk5vZGUuJyk7XHJcbi8qKlxyXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgVk5vZGUgdHlwZSBjcmVhdGVkIHVzaW5nIGRvbSgpXHJcbiAqL1xyXG5leHBvcnRzLkRPTVZOT0RFID0gU3ltYm9sXzEuZGVmYXVsdCgnSWRlbnRpZmllciBmb3IgYSBWTm9kZSBjcmVhdGVkIHVzaW5nIGV4aXN0aW5nIGRvbS4nKTtcclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBXTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxyXG4gKi9cclxuZnVuY3Rpb24gaXNXTm9kZShjaGlsZCkge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oY2hpbGQgJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiBjaGlsZC50eXBlID09PSBleHBvcnRzLldOT0RFKTtcclxufVxyXG5leHBvcnRzLmlzV05vZGUgPSBpc1dOb2RlO1xyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBgRE5vZGVgIGlzIGEgYFZOb2RlYCB1c2luZyB0aGUgYHR5cGVgIHByb3BlcnR5XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1ZOb2RlKGNoaWxkKSB7XHJcbiAgICByZXR1cm4gQm9vbGVhbihjaGlsZCAmJiB0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIChjaGlsZC50eXBlID09PSBleHBvcnRzLlZOT0RFIHx8IGNoaWxkLnR5cGUgPT09IGV4cG9ydHMuRE9NVk5PREUpKTtcclxufVxyXG5leHBvcnRzLmlzVk5vZGUgPSBpc1ZOb2RlO1xyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBgRE5vZGVgIGlzIGEgYFZOb2RlYCBjcmVhdGVkIHdpdGggYGRvbSgpYCB1c2luZyB0aGUgYHR5cGVgIHByb3BlcnR5XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvbVZOb2RlKGNoaWxkKSB7XHJcbiAgICByZXR1cm4gQm9vbGVhbihjaGlsZCAmJiB0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIGNoaWxkLnR5cGUgPT09IGV4cG9ydHMuRE9NVk5PREUpO1xyXG59XHJcbmV4cG9ydHMuaXNEb21WTm9kZSA9IGlzRG9tVk5vZGU7XHJcbmZ1bmN0aW9uIGlzRWxlbWVudE5vZGUodmFsdWUpIHtcclxuICAgIHJldHVybiAhIXZhbHVlLnRhZ05hbWU7XHJcbn1cclxuZXhwb3J0cy5pc0VsZW1lbnROb2RlID0gaXNFbGVtZW50Tm9kZTtcclxuZnVuY3Rpb24gZGVjb3JhdGUoZE5vZGVzLCBvcHRpb25zT3JNb2RpZmllciwgcHJlZGljYXRlKSB7XHJcbiAgICB2YXIgc2hhbGxvdyA9IGZhbHNlO1xyXG4gICAgdmFyIG1vZGlmaWVyO1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zT3JNb2RpZmllciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG1vZGlmaWVyID0gb3B0aW9uc09yTW9kaWZpZXI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBtb2RpZmllciA9IG9wdGlvbnNPck1vZGlmaWVyLm1vZGlmaWVyO1xyXG4gICAgICAgIHByZWRpY2F0ZSA9IG9wdGlvbnNPck1vZGlmaWVyLnByZWRpY2F0ZTtcclxuICAgICAgICBzaGFsbG93ID0gb3B0aW9uc09yTW9kaWZpZXIuc2hhbGxvdyB8fCBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBub2RlcyA9IEFycmF5LmlzQXJyYXkoZE5vZGVzKSA/IHRzbGliXzEuX19zcHJlYWQoZE5vZGVzKSA6IFtkTm9kZXNdO1xyXG4gICAgZnVuY3Rpb24gYnJlYWtlcigpIHtcclxuICAgICAgICBub2RlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKG5vZGVzLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBub2RlID0gbm9kZXMuc2hpZnQoKTtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoIXNoYWxsb3cgJiYgKGlzV05vZGUobm9kZSkgfHwgaXNWTm9kZShub2RlKSkgJiYgbm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgbm9kZXMgPSB0c2xpYl8xLl9fc3ByZWFkKG5vZGVzLCBub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXByZWRpY2F0ZSB8fCBwcmVkaWNhdGUobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyKG5vZGUsIGJyZWFrZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGROb2RlcztcclxufVxyXG5leHBvcnRzLmRlY29yYXRlID0gZGVjb3JhdGU7XHJcbi8qKlxyXG4gKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBjYWxscyB0byBjcmVhdGUgYSB3aWRnZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiB3KHdpZGdldENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzLCBjaGlsZHJlbikge1xyXG4gICAgaWYgKGNoaWxkcmVuID09PSB2b2lkIDApIHsgY2hpbGRyZW4gPSBbXTsgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXHJcbiAgICAgICAgd2lkZ2V0Q29uc3RydWN0b3I6IHdpZGdldENvbnN0cnVjdG9yLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXHJcbiAgICAgICAgdHlwZTogZXhwb3J0cy5XTk9ERVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLncgPSB3O1xyXG5mdW5jdGlvbiB2KHRhZywgcHJvcGVydGllc09yQ2hpbGRyZW4sIGNoaWxkcmVuKSB7XHJcbiAgICBpZiAocHJvcGVydGllc09yQ2hpbGRyZW4gPT09IHZvaWQgMCkgeyBwcm9wZXJ0aWVzT3JDaGlsZHJlbiA9IHt9OyB9XHJcbiAgICBpZiAoY2hpbGRyZW4gPT09IHZvaWQgMCkgeyBjaGlsZHJlbiA9IHVuZGVmaW5lZDsgfVxyXG4gICAgdmFyIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzT3JDaGlsZHJlbjtcclxuICAgIHZhciBkZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjaztcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BlcnRpZXNPckNoaWxkcmVuKSkge1xyXG4gICAgICAgIGNoaWxkcmVuID0gcHJvcGVydGllc09yQ2hpbGRyZW47XHJcbiAgICAgICAgcHJvcGVydGllcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2sgPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSB7fTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiB0YWcsXHJcbiAgICAgICAgZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2s6IGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrLFxyXG4gICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcclxuICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIHR5cGU6IGV4cG9ydHMuVk5PREVcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy52ID0gdjtcclxuLyoqXHJcbiAqIENyZWF0ZSBhIFZOb2RlIGZvciBhbiBleGlzdGluZyBET00gTm9kZS5cclxuICovXHJcbmZ1bmN0aW9uIGRvbShfYSwgY2hpbGRyZW4pIHtcclxuICAgIHZhciBub2RlID0gX2Eubm9kZSwgX2IgPSBfYS5hdHRycywgYXR0cnMgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgX2MgPSBfYS5wcm9wcywgcHJvcHMgPSBfYyA9PT0gdm9pZCAwID8ge30gOiBfYywgX2QgPSBfYS5vbiwgb24gPSBfZCA9PT0gdm9pZCAwID8ge30gOiBfZCwgX2UgPSBfYS5kaWZmVHlwZSwgZGlmZlR5cGUgPSBfZSA9PT0gdm9pZCAwID8gJ25vbmUnIDogX2U7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogaXNFbGVtZW50Tm9kZShub2RlKSA/IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpIDogJycsXHJcbiAgICAgICAgcHJvcGVydGllczogcHJvcHMsXHJcbiAgICAgICAgYXR0cmlidXRlczogYXR0cnMsXHJcbiAgICAgICAgZXZlbnRzOiBvbixcclxuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXHJcbiAgICAgICAgdHlwZTogZXhwb3J0cy5ET01WTk9ERSxcclxuICAgICAgICBkb21Ob2RlOiBub2RlLFxyXG4gICAgICAgIHRleHQ6IGlzRWxlbWVudE5vZGUobm9kZSkgPyB1bmRlZmluZWQgOiBub2RlLmRhdGEsXHJcbiAgICAgICAgZGlmZlR5cGU6IGRpZmZUeXBlXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZG9tID0gZG9tO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGhhbmRsZURlY29yYXRvcl8xID0gcmVxdWlyZShcIi4vaGFuZGxlRGVjb3JhdG9yXCIpO1xyXG5mdW5jdGlvbiBhZnRlclJlbmRlcihtZXRob2QpIHtcclxuICAgIHJldHVybiBoYW5kbGVEZWNvcmF0b3JfMS5oYW5kbGVEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKCdhZnRlclJlbmRlcicsIHByb3BlcnR5S2V5ID8gdGFyZ2V0W3Byb3BlcnR5S2V5XSA6IG1ldGhvZCk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmFmdGVyUmVuZGVyID0gYWZ0ZXJSZW5kZXI7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGFmdGVyUmVuZGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGhhbmRsZURlY29yYXRvcl8xID0gcmVxdWlyZShcIi4vaGFuZGxlRGVjb3JhdG9yXCIpO1xyXG52YXIgYmVmb3JlUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYmVmb3JlUHJvcGVydGllc1wiKTtcclxuZnVuY3Rpb24gYWx3YXlzUmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIGhhbmRsZURlY29yYXRvcl8xLmhhbmRsZURlY29yYXRvcihmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgIGJlZm9yZVByb3BlcnRpZXNfMS5iZWZvcmVQcm9wZXJ0aWVzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgfSkodGFyZ2V0KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuYWx3YXlzUmVuZGVyID0gYWx3YXlzUmVuZGVyO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBhbHdheXNSZW5kZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9hbHdheXNSZW5kZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvYWx3YXlzUmVuZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBoYW5kbGVEZWNvcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2hhbmRsZURlY29yYXRvclwiKTtcclxuZnVuY3Rpb24gYmVmb3JlUHJvcGVydGllcyhtZXRob2QpIHtcclxuICAgIHJldHVybiBoYW5kbGVEZWNvcmF0b3JfMS5oYW5kbGVEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKCdiZWZvcmVQcm9wZXJ0aWVzJywgcHJvcGVydHlLZXkgPyB0YXJnZXRbcHJvcGVydHlLZXldIDogbWV0aG9kKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuYmVmb3JlUHJvcGVydGllcyA9IGJlZm9yZVByb3BlcnRpZXM7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGJlZm9yZVByb3BlcnRpZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9iZWZvcmVQcm9wZXJ0aWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2JlZm9yZVByb3BlcnRpZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vUmVnaXN0cnlcIik7XHJcbi8qKlxyXG4gKiBUaGlzIERlY29yYXRvciBpcyBwcm92aWRlZCBwcm9wZXJ0aWVzIHRoYXQgZGVmaW5lIHRoZSBiZWhhdmlvciBvZiBhIGN1c3RvbSBlbGVtZW50LCBhbmRcclxuICogcmVnaXN0ZXJzIHRoYXQgY3VzdG9tIGVsZW1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBjdXN0b21FbGVtZW50KF9hKSB7XHJcbiAgICB2YXIgdGFnID0gX2EudGFnLCBfYiA9IF9hLnByb3BlcnRpZXMsIHByb3BlcnRpZXMgPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYiwgX2MgPSBfYS5hdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzID0gX2MgPT09IHZvaWQgMCA/IFtdIDogX2MsIF9kID0gX2EuZXZlbnRzLCBldmVudHMgPSBfZCA9PT0gdm9pZCAwID8gW10gOiBfZCwgX2UgPSBfYS5jaGlsZFR5cGUsIGNoaWxkVHlwZSA9IF9lID09PSB2b2lkIDAgPyByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLkRPSk8gOiBfZSwgX2YgPSBfYS5yZWdpc3RyeUZhY3RvcnksIHJlZ2lzdHJ5RmFjdG9yeSA9IF9mID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUmVnaXN0cnlfMS5kZWZhdWx0KCk7IH0gOiBfZjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5fX2N1c3RvbUVsZW1lbnREZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICB0YWdOYW1lOiB0YWcsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXHJcbiAgICAgICAgICAgIGV2ZW50czogZXZlbnRzLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IGNoaWxkVHlwZSxcclxuICAgICAgICAgICAgcmVnaXN0cnlGYWN0b3J5OiByZWdpc3RyeUZhY3RvcnlcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmN1c3RvbUVsZW1lbnQgPSBjdXN0b21FbGVtZW50O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBjdXN0b21FbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBoYW5kbGVEZWNvcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2hhbmRsZURlY29yYXRvclwiKTtcclxuLyoqXHJcbiAqIERlY29yYXRvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZ2lzdGVyIGEgZnVuY3Rpb24gYXMgYSBzcGVjaWZpYyBwcm9wZXJ0eSBkaWZmXHJcbiAqXHJcbiAqIEBwYXJhbSBwcm9wZXJ0eU5hbWUgIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSBvZiB3aGljaCB0aGUgZGlmZiBmdW5jdGlvbiBpcyBhcHBsaWVkXHJcbiAqIEBwYXJhbSBkaWZmVHlwZSAgICAgIFRoZSBkaWZmIHR5cGUsIGRlZmF1bHQgaXMgRGlmZlR5cGUuQVVUTy5cclxuICogQHBhcmFtIGRpZmZGdW5jdGlvbiAgQSBkaWZmIGZ1bmN0aW9uIHRvIHJ1biBpZiBkaWZmVHlwZSBpZiBEaWZmVHlwZS5DVVNUT01cclxuICovXHJcbmZ1bmN0aW9uIGRpZmZQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIGRpZmZGdW5jdGlvbiwgcmVhY3Rpb25GdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGhhbmRsZURlY29yYXRvcl8xLmhhbmRsZURlY29yYXRvcihmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgIHRhcmdldC5hZGREZWNvcmF0b3IoXCJkaWZmUHJvcGVydHk6XCIgKyBwcm9wZXJ0eU5hbWUsIGRpZmZGdW5jdGlvbi5iaW5kKG51bGwpKTtcclxuICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKCdyZWdpc3RlcmVkRGlmZlByb3BlcnR5JywgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICBpZiAocmVhY3Rpb25GdW5jdGlvbiB8fCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKCdkaWZmUmVhY3Rpb24nLCB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5TmFtZSxcclxuICAgICAgICAgICAgICAgIHJlYWN0aW9uOiBwcm9wZXJ0eUtleSA/IHRhcmdldFtwcm9wZXJ0eUtleV0gOiByZWFjdGlvbkZ1bmN0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGlmZlByb3BlcnR5ID0gZGlmZlByb3BlcnR5O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBkaWZmUHJvcGVydHk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9kaWZmUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvZGlmZlByb3BlcnR5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8qKlxyXG4gKiBHZW5lcmljIGRlY29yYXRvciBoYW5kbGVyIHRvIHRha2UgY2FyZSBvZiB3aGV0aGVyIG9yIG5vdCB0aGUgZGVjb3JhdG9yIHdhcyBjYWxsZWQgYXQgdGhlIGNsYXNzIGxldmVsXHJcbiAqIG9yIHRoZSBtZXRob2QgbGV2ZWwuXHJcbiAqXHJcbiAqIEBwYXJhbSBoYW5kbGVyXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVEZWNvcmF0b3IoaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgaGFuZGxlcih0YXJnZXQucHJvdG90eXBlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaGFuZGxlcih0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuaGFuZGxlRGVjb3JhdG9yID0gaGFuZGxlRGVjb3JhdG9yO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBoYW5kbGVEZWNvcmF0b3I7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9oYW5kbGVEZWNvcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvaGFuZGxlRGVjb3JhdG9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBXZWFrTWFwXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9XZWFrTWFwXCIpO1xyXG52YXIgaGFuZGxlRGVjb3JhdG9yXzEgPSByZXF1aXJlKFwiLi9oYW5kbGVEZWNvcmF0b3JcIik7XHJcbnZhciBiZWZvcmVQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9iZWZvcmVQcm9wZXJ0aWVzXCIpO1xyXG4vKipcclxuICogTWFwIG9mIGluc3RhbmNlcyBhZ2FpbnN0IHJlZ2lzdGVyZWQgaW5qZWN0b3JzLlxyXG4gKi9cclxudmFyIHJlZ2lzdGVyZWRJbmplY3RvcnNNYXAgPSBuZXcgV2Vha01hcF8xLmRlZmF1bHQoKTtcclxuLyoqXHJcbiAqIERlY29yYXRvciByZXRyaWV2ZXMgYW4gaW5qZWN0b3IgZnJvbSBhbiBhdmFpbGFibGUgcmVnaXN0cnkgdXNpbmcgdGhlIG5hbWUgYW5kXHJcbiAqIGNhbGxzIHRoZSBgZ2V0UHJvcGVydGllc2AgZnVuY3Rpb24gd2l0aCB0aGUgcGF5bG9hZCBmcm9tIHRoZSBpbmplY3RvclxyXG4gKiBhbmQgY3VycmVudCBwcm9wZXJ0aWVzIHdpdGggdGhlIHRoZSBpbmplY3RlZCBwcm9wZXJ0aWVzIHJldHVybmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gSW5qZWN0Q29uZmlnIHRoZSBpbmplY3QgY29uZmlndXJhdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaW5qZWN0KF9hKSB7XHJcbiAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIGdldFByb3BlcnRpZXMgPSBfYS5nZXRQcm9wZXJ0aWVzO1xyXG4gICAgcmV0dXJuIGhhbmRsZURlY29yYXRvcl8xLmhhbmRsZURlY29yYXRvcihmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgIGJlZm9yZVByb3BlcnRpZXNfMS5iZWZvcmVQcm9wZXJ0aWVzKGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpbmplY3Rvckl0ZW0gPSB0aGlzLnJlZ2lzdHJ5LmdldEluamVjdG9yKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5qZWN0b3JJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5qZWN0b3IgPSBpbmplY3Rvckl0ZW0uaW5qZWN0b3IsIGludmFsaWRhdG9yID0gaW5qZWN0b3JJdGVtLmludmFsaWRhdG9yO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWRJbmplY3RvcnMgPSByZWdpc3RlcmVkSW5qZWN0b3JzTWFwLmdldCh0aGlzKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RlcmVkSW5qZWN0b3JzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRJbmplY3RvcnNNYXAuc2V0KHRoaXMsIHJlZ2lzdGVyZWRJbmplY3RvcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZ2lzdGVyZWRJbmplY3RvcnMuaW5kZXhPZihpbmplY3Rvckl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duKGludmFsaWRhdG9yLm9uKCdpbnZhbGlkYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRJbmplY3RvcnMucHVzaChpbmplY3Rvckl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFByb3BlcnRpZXMoaW5qZWN0b3IoKSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSh0YXJnZXQpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5pbmplY3QgPSBpbmplY3Q7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGluamVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2luamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9pbmplY3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9SZWdpc3RyeVwiKTtcclxuZnVuY3Rpb24gaXNPYmplY3RPckFycmF5KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gYWx3YXlzKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZWQ6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IG5ld1Byb3BlcnR5XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuYWx3YXlzID0gYWx3YXlzO1xyXG5mdW5jdGlvbiBpZ25vcmUocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhbmdlZDogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6IG5ld1Byb3BlcnR5XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuaWdub3JlID0gaWdub3JlO1xyXG5mdW5jdGlvbiByZWZlcmVuY2UocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhbmdlZDogcHJldmlvdXNQcm9wZXJ0eSAhPT0gbmV3UHJvcGVydHksXHJcbiAgICAgICAgdmFsdWU6IG5ld1Byb3BlcnR5XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG5mdW5jdGlvbiBzaGFsbG93KHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KSB7XHJcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgdmFyIHZhbGlkT2xkUHJvcGVydHkgPSBwcmV2aW91c1Byb3BlcnR5ICYmIGlzT2JqZWN0T3JBcnJheShwcmV2aW91c1Byb3BlcnR5KTtcclxuICAgIHZhciB2YWxpZE5ld1Byb3BlcnR5ID0gbmV3UHJvcGVydHkgJiYgaXNPYmplY3RPckFycmF5KG5ld1Byb3BlcnR5KTtcclxuICAgIGlmICghdmFsaWRPbGRQcm9wZXJ0eSB8fCAhdmFsaWROZXdQcm9wZXJ0eSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNoYW5nZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXdQcm9wZXJ0eVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICB2YXIgcHJldmlvdXNLZXlzID0gT2JqZWN0LmtleXMocHJldmlvdXNQcm9wZXJ0eSk7XHJcbiAgICB2YXIgbmV3S2V5cyA9IE9iamVjdC5rZXlzKG5ld1Byb3BlcnR5KTtcclxuICAgIGlmIChwcmV2aW91c0tleXMubGVuZ3RoICE9PSBuZXdLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2hhbmdlZCA9IG5ld0tleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdQcm9wZXJ0eVtrZXldICE9PSBwcmV2aW91c1Byb3BlcnR5W2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZWQ6IGNoYW5nZWQsXHJcbiAgICAgICAgdmFsdWU6IG5ld1Byb3BlcnR5XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuc2hhbGxvdyA9IHNoYWxsb3c7XHJcbmZ1bmN0aW9uIGF1dG8ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpIHtcclxuICAgIHZhciByZXN1bHQ7XHJcbiAgICBpZiAodHlwZW9mIG5ld1Byb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgaWYgKG5ld1Byb3BlcnR5Ll90eXBlID09PSBSZWdpc3RyeV8xLldJREdFVF9CQVNFX1RZUEUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVmZXJlbmNlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGlnbm9yZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNPYmplY3RPckFycmF5KG5ld1Byb3BlcnR5KSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHNoYWxsb3cocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVmZXJlbmNlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZXhwb3J0cy5hdXRvID0gYXV0bztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kaWZmLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9kaWZmLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgRGVzdHJveWFibGVfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL0Rlc3Ryb3lhYmxlXCIpO1xyXG52YXIgU2V0XzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9TZXRcIik7XHJcbnZhciBCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEJhc2UocHJvcGVydGllcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX3JlcXVlc3RlZE5vZGVLZXlzID0gbmV3IFNldF8xLmRlZmF1bHQoKTtcclxuICAgICAgICBfdGhpcy5faW52YWxpZGF0ZSA9IHByb3BlcnRpZXMuaW52YWxpZGF0ZTtcclxuICAgICAgICBfdGhpcy5ub2RlSGFuZGxlciA9IHByb3BlcnRpZXMubm9kZUhhbmRsZXI7XHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuYmluZCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fYmluZCA9IHByb3BlcnRpZXMuYmluZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQmFzZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVIYW5kbGVyLmhhcyhrZXkpO1xyXG4gICAgfTtcclxuICAgIEJhc2UucHJvdG90eXBlLmdldE5vZGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc3RyaW5nS2V5ID0gXCJcIiArIGtleTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZUhhbmRsZXIuZ2V0KHN0cmluZ0tleSk7XHJcbiAgICAgICAgaWYgKCFub2RlICYmICF0aGlzLl9yZXF1ZXN0ZWROb2RlS2V5cy5oYXMoc3RyaW5nS2V5KSkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlXzEgPSB0aGlzLm5vZGVIYW5kbGVyLm9uKHN0cmluZ0tleSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlXzEuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlcXVlc3RlZE5vZGVLZXlzLmRlbGV0ZShzdHJpbmdLZXkpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5vd24oaGFuZGxlXzEpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWROb2RlS2V5cy5hZGQoc3RyaW5nS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9O1xyXG4gICAgQmFzZS5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQmFzZS5wcm90b3R5cGUuYWZ0ZXJSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXNlO1xyXG59KERlc3Ryb3lhYmxlXzEuRGVzdHJveWFibGUpKTtcclxuZXhwb3J0cy5CYXNlID0gQmFzZTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQmFzZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93aWRnZXQtY29yZS9tZXRhL0Jhc2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21ldGEvQmFzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIEJhc2VfMSA9IHJlcXVpcmUoXCIuL0Jhc2VcIik7XHJcbnZhciBsYW5nXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9sYW5nXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9nbG9iYWxcIik7XHJcbnZhciBkZWZhdWx0UmVzdWx0cyA9IHtcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBjb250YWluc0ZvY3VzOiBmYWxzZVxyXG59O1xyXG52YXIgRm9jdXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhGb2N1cywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZvY3VzKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9vbkZvY3VzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fYWN0aXZlRWxlbWVudCA9IGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgX3RoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgRm9jdXMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2V0Tm9kZShrZXkpO1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX2Fzc2lnbih7fSwgZGVmYXVsdFJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IGdsb2JhbF8xLmRlZmF1bHQuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWN0aXZlOiBub2RlID09PSB0aGlzLl9hY3RpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICBjb250YWluc0ZvY3VzOiAhIXRoaXMuX2FjdGl2ZUVsZW1lbnQgJiYgbm9kZS5jb250YWlucyh0aGlzLl9hY3RpdmVFbGVtZW50KVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgRm9jdXMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2V0Tm9kZShrZXkpO1xyXG4gICAgICAgIG5vZGUgJiYgbm9kZS5mb2N1cygpO1xyXG4gICAgfTtcclxuICAgIEZvY3VzLnByb3RvdHlwZS5fY3JlYXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb25Gb2N1c0NoYW5nZSk7XHJcbiAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuX29uRm9jdXNDaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMub3duKGxhbmdfMS5jcmVhdGVIYW5kbGUodGhpcy5fcmVtb3ZlTGlzdGVuZXIuYmluZCh0aGlzKSkpO1xyXG4gICAgfTtcclxuICAgIEZvY3VzLnByb3RvdHlwZS5fcmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5fb25Gb2N1c0NoYW5nZSk7XHJcbiAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuX29uRm9jdXNDaGFuZ2UpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBGb2N1cztcclxufShCYXNlXzEuQmFzZSkpO1xyXG5leHBvcnRzLkZvY3VzID0gRm9jdXM7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEZvY3VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21ldGEvRm9jdXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21ldGEvRm9jdXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBsYW5nXzEgPSByZXF1aXJlKFwiQGRvam8vY29yZS9sYW5nXCIpO1xyXG52YXIgY3NzVHJhbnNpdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hbmltYXRpb25zL2Nzc1RyYW5zaXRpb25zXCIpO1xyXG52YXIgYWZ0ZXJSZW5kZXJfMSA9IHJlcXVpcmUoXCIuLy4uL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiLi8uLi9kXCIpO1xyXG52YXIgdmRvbV8xID0gcmVxdWlyZShcIi4vLi4vdmRvbVwiKTtcclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGF0dGFjaCBzdGF0ZSBvZiB0aGUgcHJvamVjdG9yXHJcbiAqL1xyXG52YXIgUHJvamVjdG9yQXR0YWNoU3RhdGU7XHJcbihmdW5jdGlvbiAoUHJvamVjdG9yQXR0YWNoU3RhdGUpIHtcclxuICAgIFByb2plY3RvckF0dGFjaFN0YXRlW1Byb2plY3RvckF0dGFjaFN0YXRlW1wiQXR0YWNoZWRcIl0gPSAxXSA9IFwiQXR0YWNoZWRcIjtcclxuICAgIFByb2plY3RvckF0dGFjaFN0YXRlW1Byb2plY3RvckF0dGFjaFN0YXRlW1wiRGV0YWNoZWRcIl0gPSAyXSA9IFwiRGV0YWNoZWRcIjtcclxufSkoUHJvamVjdG9yQXR0YWNoU3RhdGUgPSBleHBvcnRzLlByb2plY3RvckF0dGFjaFN0YXRlIHx8IChleHBvcnRzLlByb2plY3RvckF0dGFjaFN0YXRlID0ge30pKTtcclxuLyoqXHJcbiAqIEF0dGFjaCB0eXBlIGZvciB0aGUgcHJvamVjdG9yXHJcbiAqL1xyXG52YXIgQXR0YWNoVHlwZTtcclxuKGZ1bmN0aW9uIChBdHRhY2hUeXBlKSB7XHJcbiAgICBBdHRhY2hUeXBlW0F0dGFjaFR5cGVbXCJBcHBlbmRcIl0gPSAxXSA9IFwiQXBwZW5kXCI7XHJcbiAgICBBdHRhY2hUeXBlW0F0dGFjaFR5cGVbXCJNZXJnZVwiXSA9IDJdID0gXCJNZXJnZVwiO1xyXG59KShBdHRhY2hUeXBlID0gZXhwb3J0cy5BdHRhY2hUeXBlIHx8IChleHBvcnRzLkF0dGFjaFR5cGUgPSB7fSkpO1xyXG5mdW5jdGlvbiBQcm9qZWN0b3JNaXhpbihCYXNlKSB7XHJcbiAgICB2YXIgUHJvamVjdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIHRzbGliXzEuX19leHRlbmRzKFByb2plY3RvciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQcm9qZWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmFwcGx5KHRoaXMsIHRzbGliXzEuX19zcHJlYWQoYXJncykpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLl9yb290ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgX3RoaXMuX2FzeW5jID0gdHJ1ZTtcclxuICAgICAgICAgICAgX3RoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICAgICAgX3RoaXMuX3Byb2plY3Rpb25PcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbnM6IGNzc1RyYW5zaXRpb25zXzEuZGVmYXVsdFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBfdGhpcy5yb290ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgX3RoaXMucHJvamVjdG9yU3RhdGUgPSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5EZXRhY2hlZDtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChyb290KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogQXR0YWNoVHlwZS5BcHBlbmQsXHJcbiAgICAgICAgICAgICAgICByb290OiByb290XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2gob3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9qZWN0b3IucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKHJvb3QpIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRhY2hUeXBlLk1lcmdlLFxyXG4gICAgICAgICAgICAgICAgcm9vdDogcm9vdFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXR0YWNoKG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb2plY3Rvci5wcm90b3R5cGUsIFwicm9vdFwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHJvb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGFscmVhZHkgYXR0YWNoZWQsIGNhbm5vdCBjaGFuZ2Ugcm9vdCBlbGVtZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290ID0gcm9vdDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb2plY3Rvci5wcm90b3R5cGUsIFwiYXN5bmNcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hc3luYztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGFscmVhZHkgYXR0YWNoZWQsIGNhbm5vdCBjaGFuZ2UgYXN5bmMgbW9kZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXN5bmMgPSBhc3luYztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS5zYW5kYm94ID0gZnVuY3Rpb24gKGRvYykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZG9jID09PSB2b2lkIDApIHsgZG9jID0gZG9jdW1lbnQ7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY3JlYXRlIHNhbmRib3gnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9hc3luYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcHJldmlvdXNSb290ID0gdGhpcy5yb290O1xyXG4gICAgICAgICAgICAvKiBmcmVlIHVwIHRoZSBkb2N1bWVudCBmcmFnbWVudCBmb3IgR0MgKi9cclxuICAgICAgICAgICAgdGhpcy5vd24oe1xyXG4gICAgICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yb290ID0gcHJldmlvdXNSb290O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoKHtcclxuICAgICAgICAgICAgICAgIC8qIERvY3VtZW50RnJhZ21lbnQgaXMgbm90IGFzc2lnbmFibGUgdG8gRWxlbWVudCwgYnV0IHByb3ZpZGVzIGV2ZXJ5dGhpbmcgbmVlZGVkIHRvIHdvcmsgKi9cclxuICAgICAgICAgICAgICAgIHJvb3Q6IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRhY2hUeXBlLkFwcGVuZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuc2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fX3NldENoaWxkcmVuX18oY2hpbGRyZW4pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fX3NldFByb3BlcnRpZXNfXyhwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuX19zZXRQcm9wZXJ0aWVzX18gPSBmdW5jdGlvbiAocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJvamVjdG9yUHJvcGVydGllcyAmJiB0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5ICE9PSBwcm9wZXJ0aWVzLnJlZ2lzdHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMucmVnaXN0cnkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgPSBsYW5nXzEuYXNzaWduKHt9LCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5fX3NldENvcmVQcm9wZXJ0aWVzX18uY2FsbCh0aGlzLCB7IGJpbmQ6IHRoaXMsIGJhc2VSZWdpc3RyeTogcHJvcGVydGllcy5yZWdpc3RyeSB9KTtcclxuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5fX3NldFByb3BlcnRpZXNfXy5jYWxsKHRoaXMsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS50b0h0bWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RvclN0YXRlICE9PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCB8fCAhdGhpcy5fcHJvamVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0b3IgaXMgbm90IGF0dGFjaGVkLCBjYW5ub3QgcmV0dXJuIGFuIEhUTUwgc3RyaW5nIG9mIHByb2plY3Rpb24uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2plY3Rpb24uZG9tTm9kZS5jaGlsZE5vZGVzWzBdLm91dGVySFRNTDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuYWZ0ZXJSZW5kZXIgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycgfHwgcmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gZF8xLnYoJ3NwYW4nLCB7fSwgW3Jlc3VsdF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvamVjdG9yLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFByb2plY3Rvci5wcm90b3R5cGUuX2F0dGFjaCA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IF9hLnR5cGUsIHJvb3QgPSBfYS5yb290O1xyXG4gICAgICAgICAgICBpZiAocm9vdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXR0YWNoSGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXR0YWNoSGFuZGxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdG9yU3RhdGUgPSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZDtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9wcm9qZWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkRldGFjaGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5vd24oaGFuZGxlKTtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHRoaXMuX3Byb2plY3Rpb25PcHRpb25zLCB7IHN5bmM6ICF0aGlzLl9hc3luYyB9KTtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEF0dGFjaFR5cGUuQXBwZW5kOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2plY3Rpb24gPSB2ZG9tXzEuZG9tLmFwcGVuZCh0aGlzLnJvb3QsIHRoaXMsIHRoaXMuX3Byb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQXR0YWNoVHlwZS5NZXJnZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9qZWN0aW9uID0gdmRvbV8xLmRvbS5tZXJnZSh0aGlzLnJvb3QsIHRoaXMsIHRoaXMuX3Byb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXR0YWNoSGFuZGxlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICAgICAgYWZ0ZXJSZW5kZXJfMS5hZnRlclJlbmRlcigpLFxyXG4gICAgICAgICAgICB0c2xpYl8xLl9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBGdW5jdGlvbiksXHJcbiAgICAgICAgICAgIHRzbGliXzEuX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtPYmplY3RdKSxcclxuICAgICAgICAgICAgdHNsaWJfMS5fX21ldGFkYXRhKFwiZGVzaWduOnJldHVybnR5cGVcIiwgdm9pZCAwKVxyXG4gICAgICAgIF0sIFByb2plY3Rvci5wcm90b3R5cGUsIFwiYWZ0ZXJSZW5kZXJcIiwgbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIFByb2plY3RvcjtcclxuICAgIH0oQmFzZSkpO1xyXG4gICAgcmV0dXJuIFByb2plY3RvcjtcclxufVxyXG5leHBvcnRzLlByb2plY3Rvck1peGluID0gUHJvamVjdG9yTWl4aW47XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFByb2plY3Rvck1peGluO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9Qcm9qZWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9Qcm9qZWN0b3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBJbmplY3Rvcl8xID0gcmVxdWlyZShcIi4vLi4vSW5qZWN0b3JcIik7XHJcbnZhciBpbmplY3RfMSA9IHJlcXVpcmUoXCIuLy4uL2RlY29yYXRvcnMvaW5qZWN0XCIpO1xyXG52YXIgaGFuZGxlRGVjb3JhdG9yXzEgPSByZXF1aXJlKFwiLi8uLi9kZWNvcmF0b3JzL2hhbmRsZURlY29yYXRvclwiKTtcclxudmFyIGRpZmZQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vLi4vZGVjb3JhdG9ycy9kaWZmUHJvcGVydHlcIik7XHJcbnZhciBkaWZmXzEgPSByZXF1aXJlKFwiLi8uLi9kaWZmXCIpO1xyXG52YXIgVEhFTUVfS0VZID0gJyBfa2V5JztcclxuZXhwb3J0cy5JTkpFQ1RFRF9USEVNRV9LRVkgPSBTeW1ib2woJ3RoZW1lJyk7XHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgZm9yIGJhc2UgY3NzIGNsYXNzZXNcclxuICovXHJcbmZ1bmN0aW9uIHRoZW1lKHRoZW1lKSB7XHJcbiAgICByZXR1cm4gaGFuZGxlRGVjb3JhdG9yXzEuaGFuZGxlRGVjb3JhdG9yKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICB0YXJnZXQuYWRkRGVjb3JhdG9yKCdiYXNlVGhlbWVDbGFzc2VzJywgdGhlbWUpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy50aGVtZSA9IHRoZW1lO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHJldmVyc2UgbG9va3VwIGZvciB0aGUgY2xhc3NlcyBwYXNzZWQgaW4gdmlhIHRoZSBgdGhlbWVgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gY2xhc3NlcyBUaGUgYmFzZUNsYXNzZXMgb2JqZWN0XHJcbiAqIEByZXF1aXJlc1xyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlVGhlbWVDbGFzc2VzTG9va3VwKGNsYXNzZXMpIHtcclxuICAgIHJldHVybiBjbGFzc2VzLnJlZHVjZShmdW5jdGlvbiAoY3VycmVudENsYXNzTmFtZXMsIGJhc2VDbGFzcykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGJhc2VDbGFzcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDbGFzc05hbWVzW2Jhc2VDbGFzc1trZXldXSA9IGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudENsYXNzTmFtZXM7XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuLyoqXHJcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRoYXQgaXMgZ2l2ZW4gYSB0aGVtZSBhbmQgYW4gb3B0aW9uYWwgcmVnaXN0cnksIHRoZSB0aGVtZVxyXG4gKiBpbmplY3RvciBpcyBkZWZpbmVkIGFnYWluc3QgdGhlIHJlZ2lzdHJ5LCByZXR1cm5pbmcgdGhlIHRoZW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0gdGhlbWUgdGhlIHRoZW1lIHRvIHNldFxyXG4gKiBAcGFyYW0gdGhlbWVSZWdpc3RyeSByZWdpc3RyeSB0byBkZWZpbmUgdGhlIHRoZW1lIGluamVjdG9yIGFnYWluc3QuIERlZmF1bHRzXHJcbiAqIHRvIHRoZSBnbG9iYWwgcmVnaXN0cnlcclxuICpcclxuICogQHJldHVybnMgdGhlIHRoZW1lIGluamVjdG9yIHVzZWQgdG8gc2V0IHRoZSB0aGVtZVxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJUaGVtZUluamVjdG9yKHRoZW1lLCB0aGVtZVJlZ2lzdHJ5KSB7XHJcbiAgICB2YXIgdGhlbWVJbmplY3RvciA9IG5ldyBJbmplY3Rvcl8xLkluamVjdG9yKHRoZW1lKTtcclxuICAgIHRoZW1lUmVnaXN0cnkuZGVmaW5lSW5qZWN0b3IoZXhwb3J0cy5JTkpFQ1RFRF9USEVNRV9LRVksIGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoZW1lSW5qZWN0b3Iuc2V0SW52YWxpZGF0b3IoaW52YWxpZGF0b3IpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGVtZUluamVjdG9yLmdldCgpOyB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhlbWVJbmplY3RvcjtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyVGhlbWVJbmplY3RvciA9IHJlZ2lzdGVyVGhlbWVJbmplY3RvcjtcclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNsYXNzIGRlY29yYXRlZCB3aXRoIHdpdGggVGhlbWVkIGZ1bmN0aW9uYWxpdHlcclxuICovXHJcbmZ1bmN0aW9uIFRoZW1lZE1peGluKEJhc2UpIHtcclxuICAgIHZhciBUaGVtZWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgdHNsaWJfMS5fX2V4dGVuZHMoVGhlbWVkLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFRoZW1lZCgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZWdpc3RlcmVkIGJhc2UgdGhlbWUga2V5c1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgX3RoaXMuX3JlZ2lzdGVyZWRCYXNlVGhlbWVLZXlzID0gW107XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgY2xhc3NlcyBtZXRhIGRhdGEgbmVlZCB0byBiZSBjYWxjdWxhdGVkLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgX3RoaXMuX3JlY2FsY3VsYXRlQ2xhc3NlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBMb2FkZWQgdGhlbWVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF90aGlzLl90aGVtZSA9IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRoZW1lZC5wcm90b3R5cGUudGhlbWUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjYWxjdWxhdGVDbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVRoZW1lQ2xhc3NlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzZXMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlcy5tYXAoZnVuY3Rpb24gKGNsYXNzTmFtZSkgeyByZXR1cm4gX3RoaXMuX2dldFRoZW1lQ2xhc3MoY2xhc3NOYW1lKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFRoZW1lQ2xhc3MoY2xhc3Nlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5jdGlvbiBmaXJlZCB3aGVuIGB0aGVtZWAgb3IgYGV4dHJhQ2xhc3Nlc2AgYXJlIGNoYW5nZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVGhlbWVkLnByb3RvdHlwZS5vblByb3BlcnRpZXNDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZUNsYXNzZXMgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGhlbWVkLnByb3RvdHlwZS5fZ2V0VGhlbWVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGNsYXNzTmFtZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZXh0cmFDbGFzc2VzID0gdGhpcy5wcm9wZXJ0aWVzLmV4dHJhQ2xhc3NlcyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIHRoZW1lQ2xhc3NOYW1lID0gdGhpcy5fYmFzZVRoZW1lQ2xhc3Nlc1JldmVyc2VMb29rdXBbY2xhc3NOYW1lXTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdENsYXNzTmFtZXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCF0aGVtZUNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2xhc3MgbmFtZTogJ1wiICsgY2xhc3NOYW1lICsgXCInIG5vdCBmb3VuZCBpbiB0aGVtZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChleHRyYUNsYXNzZXNbdGhlbWVDbGFzc05hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRDbGFzc05hbWVzLnB1c2goZXh0cmFDbGFzc2VzW3RoZW1lQ2xhc3NOYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RoZW1lW3RoZW1lQ2xhc3NOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Q2xhc3NOYW1lcy5wdXNoKHRoaXMuX3RoZW1lW3RoZW1lQ2xhc3NOYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRDbGFzc05hbWVzLnB1c2godGhpcy5fcmVnaXN0ZXJlZEJhc2VUaGVtZVt0aGVtZUNsYXNzTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRDbGFzc05hbWVzLmpvaW4oJyAnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRoZW1lZC5wcm90b3R5cGUuX3JlY2FsY3VsYXRlVGhlbWVDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMudGhlbWUsIHRoZW1lID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2E7XHJcbiAgICAgICAgICAgIHZhciBiYXNlVGhlbWVzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2Jhc2VUaGVtZUNsYXNzZXMnKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RlcmVkQmFzZVRoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcmVkQmFzZVRoZW1lID0gYmFzZVRoZW1lcy5yZWR1Y2UoZnVuY3Rpb24gKGZpbmFsQmFzZVRoZW1lLCBiYXNlVGhlbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBUSEVNRV9LRVksIGtleSA9IGJhc2VUaGVtZVtfYV0sIGNsYXNzZXMgPSB0c2xpYl8xLl9fcmVzdChiYXNlVGhlbWUsIFt0eXBlb2YgX2EgPT09IFwic3ltYm9sXCIgPyBfYSA6IF9hICsgXCJcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZWdpc3RlcmVkQmFzZVRoZW1lS2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRzbGliXzEuX19hc3NpZ24oe30sIGZpbmFsQmFzZVRoZW1lLCBjbGFzc2VzKTtcclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhc2VUaGVtZUNsYXNzZXNSZXZlcnNlTG9va3VwID0gY3JlYXRlVGhlbWVDbGFzc2VzTG9va3VwKGJhc2VUaGVtZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3RoZW1lID0gdGhpcy5fcmVnaXN0ZXJlZEJhc2VUaGVtZUtleXMucmVkdWNlKGZ1bmN0aW9uIChiYXNlVGhlbWUsIHRoZW1lS2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX2Fzc2lnbih7fSwgYmFzZVRoZW1lLCB0aGVtZVt0aGVtZUtleV0pO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlQ2xhc3NlcyA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICAgICAgZGlmZlByb3BlcnR5XzEuZGlmZlByb3BlcnR5KCd0aGVtZScsIGRpZmZfMS5zaGFsbG93KSxcclxuICAgICAgICAgICAgZGlmZlByb3BlcnR5XzEuZGlmZlByb3BlcnR5KCdleHRyYUNsYXNzZXMnLCBkaWZmXzEuc2hhbGxvdyksXHJcbiAgICAgICAgICAgIHRzbGliXzEuX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcclxuICAgICAgICAgICAgdHNsaWJfMS5fX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxyXG4gICAgICAgICAgICB0c2xpYl8xLl9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXHJcbiAgICAgICAgXSwgVGhlbWVkLnByb3RvdHlwZSwgXCJvblByb3BlcnRpZXNDaGFuZ2VkXCIsIG51bGwpO1xyXG4gICAgICAgIFRoZW1lZCA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgICAgIGluamVjdF8xLmluamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBleHBvcnRzLklOSkVDVEVEX1RIRU1FX0tFWSxcclxuICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXM6IGZ1bmN0aW9uICh0aGVtZSwgcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydGllcy50aGVtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB0aGVtZTogdGhlbWUgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF0sIFRoZW1lZCk7XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lZDtcclxuICAgIH0oQmFzZSkpO1xyXG4gICAgcmV0dXJuIFRoZW1lZDtcclxufVxyXG5leHBvcnRzLlRoZW1lZE1peGluID0gVGhlbWVkTWl4aW47XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRoZW1lZE1peGluO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiLi9XaWRnZXRCYXNlXCIpO1xyXG52YXIgUHJvamVjdG9yXzEgPSByZXF1aXJlKFwiLi9taXhpbnMvUHJvamVjdG9yXCIpO1xyXG52YXIgYXJyYXlfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL2FycmF5XCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIi4vZFwiKTtcclxudmFyIGdsb2JhbF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vZ2xvYmFsXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiLi9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgYWx3YXlzUmVuZGVyXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JzL2Fsd2F5c1JlbmRlclwiKTtcclxudmFyIEN1c3RvbUVsZW1lbnRDaGlsZFR5cGU7XHJcbihmdW5jdGlvbiAoQ3VzdG9tRWxlbWVudENoaWxkVHlwZSkge1xyXG4gICAgQ3VzdG9tRWxlbWVudENoaWxkVHlwZVtcIkRPSk9cIl0gPSBcIkRPSk9cIjtcclxuICAgIEN1c3RvbUVsZW1lbnRDaGlsZFR5cGVbXCJOT0RFXCJdID0gXCJOT0RFXCI7XHJcbiAgICBDdXN0b21FbGVtZW50Q2hpbGRUeXBlW1wiVEVYVFwiXSA9IFwiVEVYVFwiO1xyXG59KShDdXN0b21FbGVtZW50Q2hpbGRUeXBlID0gZXhwb3J0cy5DdXN0b21FbGVtZW50Q2hpbGRUeXBlIHx8IChleHBvcnRzLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUgPSB7fSkpO1xyXG5mdW5jdGlvbiBEb21Ub1dpZGdldFdyYXBwZXIoZG9tTm9kZSkge1xyXG4gICAgdmFyIERvbVRvV2lkZ2V0V3JhcHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICB0c2xpYl8xLl9fZXh0ZW5kcyhEb21Ub1dpZGdldFdyYXBwZXIsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gRG9tVG9XaWRnZXRXcmFwcGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERvbVRvV2lkZ2V0V3JhcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywga2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfdGhpcy5wcm9wZXJ0aWVzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoJ29uJykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIl9fXCIgKyBrZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9wc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS5kb20oeyBub2RlOiBkb21Ob2RlLCBwcm9wczogcHJvcGVydGllcywgZGlmZlR5cGU6ICdkb20nIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvbVRvV2lkZ2V0V3JhcHBlciwgXCJkb21Ob2RlXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9tTm9kZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgRG9tVG9XaWRnZXRXcmFwcGVyID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICAgICAgYWx3YXlzUmVuZGVyXzEuYWx3YXlzUmVuZGVyKClcclxuICAgICAgICBdLCBEb21Ub1dpZGdldFdyYXBwZXIpO1xyXG4gICAgICAgIHJldHVybiBEb21Ub1dpZGdldFdyYXBwZXI7XHJcbiAgICB9KFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKSk7XHJcbiAgICByZXR1cm4gRG9tVG9XaWRnZXRXcmFwcGVyO1xyXG59XHJcbmV4cG9ydHMuRG9tVG9XaWRnZXRXcmFwcGVyID0gRG9tVG9XaWRnZXRXcmFwcGVyO1xyXG5mdW5jdGlvbiBjcmVhdGUoZGVzY3JpcHRvciwgV2lkZ2V0Q29uc3RydWN0b3IpIHtcclxuICAgIHZhciBhdHRyaWJ1dGVzID0gZGVzY3JpcHRvci5hdHRyaWJ1dGVzLCBjaGlsZFR5cGUgPSBkZXNjcmlwdG9yLmNoaWxkVHlwZSwgcmVnaXN0cnlGYWN0b3J5ID0gZGVzY3JpcHRvci5yZWdpc3RyeUZhY3Rvcnk7XHJcbiAgICB2YXIgYXR0cmlidXRlTWFwID0ge307XHJcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgYXR0cmlidXRlTWFwW2F0dHJpYnV0ZU5hbWVdID0gcHJvcGVydHlOYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIHRzbGliXzEuX19leHRlbmRzKGNsYXNzXzEsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLl9wcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgICAgIF90aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICBfdGhpcy5fZXZlbnRQcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgICAgIF90aGlzLl9pbml0aWFsaXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNvbm5lY3RlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5pdGlhbGlzZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZG9tUHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGRlc2NyaXB0b3IuYXR0cmlidXRlcywgcHJvcGVydGllcyA9IGRlc2NyaXB0b3IucHJvcGVydGllcywgZXZlbnRzID0gZGVzY3JpcHRvci5ldmVudHM7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCB0aGlzLl9wcm9wZXJ0aWVzLCB0aGlzLl9hdHRyaWJ1dGVzVG9Qcm9wZXJ0aWVzKGF0dHJpYnV0ZXMpKTtcclxuICAgICAgICAgICAgdHNsaWJfMS5fX3NwcmVhZChhdHRyaWJ1dGVzLCBwcm9wZXJ0aWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IF90aGlzW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWRQcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZSgvXm9uLywgJ19fJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZFByb3BlcnR5TmFtZSAhPT0gcHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tUHJvcGVydGllc1tmaWx0ZXJlZFByb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2dldFByb3BlcnR5KHByb3BlcnR5TmFtZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5fc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG9tUHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2dldFByb3BlcnR5KHByb3BlcnR5TmFtZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLl9zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTsgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZSgvXm9uLywgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWRQcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZSgvXm9uLywgJ19fb24nKTtcclxuICAgICAgICAgICAgICAgIGRvbVByb3BlcnRpZXNbZmlsdGVyZWRQcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2dldEV2ZW50UHJvcGVydHkocHJvcGVydHlOYW1lKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuX3NldEV2ZW50UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fZXZlbnRQcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRDYWxsYmFjayA9IF90aGlzLl9nZXRFdmVudFByb3BlcnR5KHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2suYXBwbHkodm9pZCAwLCB0c2xpYl8xLl9fc3ByZWFkKGFyZ3MpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGFyZ3NcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywgZG9tUHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGNoaWxkVHlwZSA9PT0gQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhUID8gdGhpcy5jaGlsZE5vZGVzIDogdGhpcy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgYXJyYXlfMS5mcm9tKGNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFR5cGUgPT09IEN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuRE9KTykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZS5hZGRFdmVudExpc3RlbmVyKCdkb2pvLWNlLXJlbmRlcicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9yZW5kZXIoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2Rvam8tY2UtY29ubmVjdGVkJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3JlbmRlcigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fY2hpbGRyZW4ucHVzaChEb21Ub1dpZGdldFdyYXBwZXIoY2hpbGROb2RlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fY2hpbGRyZW4ucHVzaChkXzEuZG9tKHsgbm9kZTogY2hpbGROb2RlLCBkaWZmVHlwZTogJ2RvbScgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdkb2pvLWNlLWNvbm5lY3RlZCcsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fY2hpbGRDb25uZWN0ZWQoZSk7IH0pO1xyXG4gICAgICAgICAgICB2YXIgd2lkZ2V0UHJvcGVydGllcyA9IHRoaXMuX3Byb3BlcnRpZXM7XHJcbiAgICAgICAgICAgIHZhciByZW5kZXJDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9fY2hpbGRyZW5fXygpOyB9O1xyXG4gICAgICAgICAgICB2YXIgV3JhcHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgICAgIHRzbGliXzEuX19leHRlbmRzKGNsYXNzXzIsIF9zdXBlcik7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGFzc18yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsYXNzXzIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZF8xLncoV2lkZ2V0Q29uc3RydWN0b3IsIHdpZGdldFByb3BlcnRpZXMsIHJlbmRlckNoaWxkcmVuKCkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc18yO1xyXG4gICAgICAgICAgICB9KFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKSk7XHJcbiAgICAgICAgICAgIHZhciByZWdpc3RyeSA9IHJlZ2lzdHJ5RmFjdG9yeSgpO1xyXG4gICAgICAgICAgICB2YXIgdGhlbWVDb250ZXh0ID0gVGhlbWVkXzEucmVnaXN0ZXJUaGVtZUluamVjdG9yKHRoaXMuX2dldFRoZW1lKCksIHJlZ2lzdHJ5KTtcclxuICAgICAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKCdkb2pvLXRoZW1lLXNldCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoZW1lQ29udGV4dC5zZXQoX3RoaXMuX2dldFRoZW1lKCkpOyB9KTtcclxuICAgICAgICAgICAgdmFyIFByb2plY3RvciA9IFByb2plY3Rvcl8xLlByb2plY3Rvck1peGluKFdyYXBwZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3IgPSBuZXcgUHJvamVjdG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3Rvci5zZXRQcm9wZXJ0aWVzKHsgcmVnaXN0cnk6IHJlZ2lzdHJ5IH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3IuYXBwZW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Rvam8tY2UtY29ubmVjdGVkJywge1xyXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRldGFpbDogdGhpc1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fZ2V0VGhlbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxfMS5kZWZhdWx0ICYmIGdsb2JhbF8xLmRlZmF1bHQuZG9qb2NlICYmIGdsb2JhbF8xLmRlZmF1bHQuZG9qb2NlLnRoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsXzEuZGVmYXVsdC5kb2pvY2UudGhlbWVzW2dsb2JhbF8xLmRlZmF1bHQuZG9qb2NlLnRoZW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX2NoaWxkQ29ubmVjdGVkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBlLmRldGFpbDtcclxuICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IHRoaXMuX2NoaWxkcmVuLnNvbWUoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBjaGlsZC5kb21Ob2RlID09PSBub2RlOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdkb2pvLWNlLXJlbmRlcicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9yZW5kZXIoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChEb21Ub1dpZGdldFdyYXBwZXIobm9kZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJvamVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9qZWN0b3IuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZG9qby1jZS1yZW5kZXInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9fcHJvcGVydGllc19fID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX2Fzc2lnbih7fSwgdGhpcy5fcHJvcGVydGllcywgdGhpcy5fZXZlbnRQcm9wZXJ0aWVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9fY2hpbGRyZW5fXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkVHlwZSA9PT0gQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5ET0pPKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChDaGlsZCkgeyByZXR1cm4gQ2hpbGQuZG9tTm9kZS5pc1dpZGdldDsgfSkubWFwKGZ1bmN0aW9uIChDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb21Ob2RlID0gQ2hpbGQuZG9tTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZF8xLncoQ2hpbGQsIHRzbGliXzEuX19hc3NpZ24oe30sIGRvbU5vZGUuX19wcm9wZXJ0aWVzX18oKSksIHRzbGliXzEuX19zcHJlYWQoZG9tTm9kZS5fX2NoaWxkcmVuX18oKSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZU1hcFtuYW1lXTtcclxuICAgICAgICAgICAgdGhpcy5fc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fc2V0RXZlbnRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50UHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5fZ2V0RXZlbnRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50UHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuX3NldFByb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVbV2lkZ2V0QmFzZV8xLm5vQmluZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLl9hdHRyaWJ1dGVzVG9Qcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXMucmVkdWNlKGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMSwgXCJvYnNlcnZlZEF0dHJpYnV0ZXNcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwiaXNXaWRnZXRcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oSFRNTEVsZW1lbnQpKTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZSA9IGNyZWF0ZTtcclxuZnVuY3Rpb24gcmVnaXN0ZXIoV2lkZ2V0Q29uc3RydWN0b3IpIHtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gV2lkZ2V0Q29uc3RydWN0b3IucHJvdG90eXBlICYmIFdpZGdldENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX2N1c3RvbUVsZW1lbnREZXNjcmlwdG9yO1xyXG4gICAgaWYgKCFkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZ2V0IGRlc2NyaXB0b3IgZm9yIEN1c3RvbSBFbGVtZW50LCBoYXZlIHlvdSBhZGRlZCB0aGUgQGN1c3RvbUVsZW1lbnQgZGVjb3JhdG9yIHRvIHlvdXIgV2lkZ2V0PycpO1xyXG4gICAgfVxyXG4gICAgZ2xvYmFsXzEuZGVmYXVsdC5jdXN0b21FbGVtZW50cy5kZWZpbmUoZGVzY3JpcHRvci50YWdOYW1lLCBjcmVhdGUoZGVzY3JpcHRvciwgV2lkZ2V0Q29uc3RydWN0b3IpKTtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHJlZ2lzdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZ2xvYmFsXzEgPSByZXF1aXJlKFwiQGRvam8vc2hpbS9nbG9iYWxcIik7XHJcbnZhciBhcnJheV8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vYXJyYXlcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiLi9kXCIpO1xyXG52YXIgUmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuL1JlZ2lzdHJ5XCIpO1xyXG52YXIgV2Vha01hcF8xID0gcmVxdWlyZShcIkBkb2pvL3NoaW0vV2Vha01hcFwiKTtcclxudmFyIE5BTUVTUEFDRV9XMyA9ICdodHRwOi8vd3d3LnczLm9yZy8nO1xyXG52YXIgTkFNRVNQQUNFX1NWRyA9IE5BTUVTUEFDRV9XMyArICcyMDAwL3N2Zyc7XHJcbnZhciBOQU1FU1BBQ0VfWExJTksgPSBOQU1FU1BBQ0VfVzMgKyAnMTk5OS94bGluayc7XHJcbnZhciBlbXB0eUFycmF5ID0gW107XHJcbnZhciBub2RlT3BlcmF0aW9ucyA9IFsnZm9jdXMnLCAnYmx1cicsICdzY3JvbGxJbnRvVmlldycsICdjbGljayddO1xyXG5leHBvcnRzLndpZGdldEluc3RhbmNlTWFwID0gbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbnZhciBpbnN0YW5jZU1hcCA9IG5ldyBXZWFrTWFwXzEuZGVmYXVsdCgpO1xyXG52YXIgbmV4dFNpYmxpbmdNYXAgPSBuZXcgV2Vha01hcF8xLmRlZmF1bHQoKTtcclxudmFyIHByb2plY3RvclN0YXRlTWFwID0gbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbmZ1bmN0aW9uIHNhbWUoZG5vZGUxLCBkbm9kZTIpIHtcclxuICAgIGlmIChkXzEuaXNWTm9kZShkbm9kZTEpICYmIGRfMS5pc1ZOb2RlKGRub2RlMikpIHtcclxuICAgICAgICBpZiAoZF8xLmlzRG9tVk5vZGUoZG5vZGUxKSB8fCBkXzEuaXNEb21WTm9kZShkbm9kZTIpKSB7XHJcbiAgICAgICAgICAgIGlmIChkbm9kZTEuZG9tTm9kZSAhPT0gZG5vZGUyLmRvbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG5vZGUxLnRhZyAhPT0gZG5vZGUyLnRhZykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkbm9kZTEucHJvcGVydGllcy5rZXkgIT09IGRub2RlMi5wcm9wZXJ0aWVzLmtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZF8xLmlzV05vZGUoZG5vZGUxKSAmJiBkXzEuaXNXTm9kZShkbm9kZTIpKSB7XHJcbiAgICAgICAgaWYgKGRub2RlMS5pbnN0YW5jZSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBkbm9kZTIud2lkZ2V0Q29uc3RydWN0b3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRub2RlMS53aWRnZXRDb25zdHJ1Y3RvciAhPT0gZG5vZGUyLndpZGdldENvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRub2RlMS5wcm9wZXJ0aWVzLmtleSAhPT0gZG5vZGUyLnByb3BlcnRpZXMua2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxudmFyIG1pc3NpbmdUcmFuc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIGEgdHJhbnNpdGlvbnMgb2JqZWN0IHRvIHRoZSBwcm9qZWN0aW9uT3B0aW9ucyB0byBkbyBhbmltYXRpb25zJyk7XHJcbn07XHJcbmZ1bmN0aW9uIGdldFByb2plY3Rpb25PcHRpb25zKHByb2plY3Rvck9wdGlvbnMsIHByb2plY3Rvckluc3RhbmNlKSB7XHJcbiAgICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgbmFtZXNwYWNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgc3R5bGVBcHBseWVyOiBmdW5jdGlvbiAoZG9tTm9kZSwgc3R5bGVOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb21Ob2RlLnN0eWxlW3N0eWxlTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyYW5zaXRpb25zOiB7XHJcbiAgICAgICAgICAgIGVudGVyOiBtaXNzaW5nVHJhbnNpdGlvbixcclxuICAgICAgICAgICAgZXhpdDogbWlzc2luZ1RyYW5zaXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcHRoOiAwLFxyXG4gICAgICAgIG1lcmdlOiBmYWxzZSxcclxuICAgICAgICBzeW5jOiBmYWxzZSxcclxuICAgICAgICBwcm9qZWN0b3JJbnN0YW5jZTogcHJvamVjdG9ySW5zdGFuY2VcclxuICAgIH07XHJcbiAgICByZXR1cm4gdHNsaWJfMS5fX2Fzc2lnbih7fSwgZGVmYXVsdHMsIHByb2plY3Rvck9wdGlvbnMpO1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrU3R5bGVWYWx1ZShzdHlsZVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0eWxlVmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHlsZSB2YWx1ZXMgbXVzdCBiZSBzdHJpbmdzJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlRXZlbnQoZG9tTm9kZSwgZXZlbnROYW1lLCBjdXJyZW50VmFsdWUsIHByb2plY3Rpb25PcHRpb25zLCBiaW5kLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgdmFyIGV2ZW50TWFwID0gcHJvamVjdG9yU3RhdGUubm9kZU1hcC5nZXQoZG9tTm9kZSkgfHwgbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c0V2ZW50ID0gZXZlbnRNYXAuZ2V0KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgIGRvbU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHByZXZpb3VzRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgdmFyIGNhbGxiYWNrID0gY3VycmVudFZhbHVlLmJpbmQoYmluZCk7XHJcbiAgICBpZiAoZXZlbnROYW1lID09PSAnaW5wdXQnKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5jYWxsKHRoaXMsIGV2dCk7XHJcbiAgICAgICAgICAgIGV2dC50YXJnZXRbJ29uaW5wdXQtdmFsdWUnXSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgfS5iaW5kKGJpbmQpO1xyXG4gICAgfVxyXG4gICAgZG9tTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gICAgZXZlbnRNYXAuc2V0KGN1cnJlbnRWYWx1ZSwgY2FsbGJhY2spO1xyXG4gICAgcHJvamVjdG9yU3RhdGUubm9kZU1hcC5zZXQoZG9tTm9kZSwgZXZlbnRNYXApO1xyXG59XHJcbmZ1bmN0aW9uIGFkZENsYXNzZXMoZG9tTm9kZSwgY2xhc3Nlcykge1xyXG4gICAgaWYgKGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lcyA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZG9tTm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzKGRvbU5vZGUsIGNsYXNzZXMpIHtcclxuICAgIGlmIChjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZXMgPSBjbGFzc2VzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRvbU5vZGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYnVpbGRQcmV2aW91c1Byb3BlcnRpZXMoZG9tTm9kZSwgcHJldmlvdXMsIGN1cnJlbnQpIHtcclxuICAgIHZhciBkaWZmVHlwZSA9IGN1cnJlbnQuZGlmZlR5cGUsIHByb3BlcnRpZXMgPSBjdXJyZW50LnByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgPSBjdXJyZW50LmF0dHJpYnV0ZXM7XHJcbiAgICBpZiAoIWRpZmZUeXBlIHx8IGRpZmZUeXBlID09PSAndmRvbScpIHtcclxuICAgICAgICByZXR1cm4geyBwcm9wZXJ0aWVzOiBwcmV2aW91cy5wcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzOiBwcmV2aW91cy5hdHRyaWJ1dGVzLCBldmVudHM6IHByZXZpb3VzLmV2ZW50cyB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGlmZlR5cGUgPT09ICdub25lJykge1xyXG4gICAgICAgIHJldHVybiB7IHByb3BlcnRpZXM6IHt9LCBhdHRyaWJ1dGVzOiBwcmV2aW91cy5hdHRyaWJ1dGVzID8ge30gOiB1bmRlZmluZWQsIGV2ZW50czogcHJldmlvdXMuZXZlbnRzIH07XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3UHJvcGVydGllcyA9IHtcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7fVxyXG4gICAgfTtcclxuICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgbmV3UHJvcGVydGllcy5hdHRyaWJ1dGVzID0ge307XHJcbiAgICAgICAgbmV3UHJvcGVydGllcy5ldmVudHMgPSBwcmV2aW91cy5ldmVudHM7XHJcbiAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcE5hbWUpIHtcclxuICAgICAgICAgICAgbmV3UHJvcGVydGllcy5wcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IGRvbU5vZGVbcHJvcE5hbWVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJOYW1lKSB7XHJcbiAgICAgICAgICAgIG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlc1thdHRyTmFtZV0gPSBkb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Byb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgICBuZXdQcm9wZXJ0aWVzLnByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5yZWR1Y2UoZnVuY3Rpb24gKHByb3BzLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgIHByb3BzW3Byb3BlcnR5XSA9IGRvbU5vZGUuZ2V0QXR0cmlidXRlKHByb3BlcnR5KSB8fCBkb21Ob2RlW3Byb3BlcnR5XTtcclxuICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICB9LCB7fSk7XHJcbiAgICByZXR1cm4gbmV3UHJvcGVydGllcztcclxufVxyXG5mdW5jdGlvbiBub2RlT3BlcmF0aW9uKHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzVmFsdWUsIGRvbU5vZGUsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXN1bHQgPSBwcm9wVmFsdWUoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHByb3BWYWx1ZSAmJiAhcHJldmlvdXNWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb21Ob2RlW3Byb3BOYW1lXSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIG9ubHlFdmVudHMpIHtcclxuICAgIGlmIChvbmx5RXZlbnRzID09PSB2b2lkIDApIHsgb25seUV2ZW50cyA9IGZhbHNlOyB9XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgdmFyIGV2ZW50TWFwID0gcHJvamVjdG9yU3RhdGUubm9kZU1hcC5nZXQoZG9tTm9kZSk7XHJcbiAgICBpZiAoZXZlbnRNYXApIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhwcmV2aW91c1Byb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0V2ZW50ID0gcHJvcE5hbWUuc3Vic3RyKDAsIDIpID09PSAnb24nIHx8IG9ubHlFdmVudHM7XHJcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBvbmx5RXZlbnRzID8gcHJvcE5hbWUgOiBwcm9wTmFtZS5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIGlmIChpc0V2ZW50ICYmICFwcm9wZXJ0aWVzW3Byb3BOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q2FsbGJhY2sgPSBldmVudE1hcC5nZXQocHJldmlvdXNQcm9wZXJ0aWVzW3Byb3BOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlKGRvbU5vZGUsIGF0dHJOYW1lLCBhdHRyVmFsdWUsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICBpZiAocHJvamVjdGlvbk9wdGlvbnMubmFtZXNwYWNlID09PSBOQU1FU1BBQ0VfU1ZHICYmIGF0dHJOYW1lID09PSAnaHJlZicpIHtcclxuICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZU5TKE5BTUVTUEFDRV9YTElOSywgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgoYXR0ck5hbWUgPT09ICdyb2xlJyAmJiBhdHRyVmFsdWUgPT09ICcnKSB8fCBhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGRvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZXMoZG9tTm9kZSwgcHJldmlvdXNBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xyXG4gICAgdmFyIGF0dHJDb3VudCA9IGF0dHJOYW1lcy5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGF0dHJOYW1lID0gYXR0ck5hbWVzW2ldO1xyXG4gICAgICAgIHZhciBhdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJOYW1lXTtcclxuICAgICAgICB2YXIgcHJldmlvdXNBdHRyVmFsdWUgPSBwcmV2aW91c0F0dHJpYnV0ZXNbYXR0ck5hbWVdO1xyXG4gICAgICAgIGlmIChhdHRyVmFsdWUgIT09IHByZXZpb3VzQXR0clZhbHVlKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZShkb21Ob2RlLCBhdHRyTmFtZSwgYXR0clZhbHVlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZSwgcHJldmlvdXNQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucywgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzKSB7XHJcbiAgICBpZiAoaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzID09PSB2b2lkIDApIHsgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzID0gdHJ1ZTsgfVxyXG4gICAgdmFyIHByb3BlcnRpZXNVcGRhdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XHJcbiAgICB2YXIgcHJvcENvdW50ID0gcHJvcE5hbWVzLmxlbmd0aDtcclxuICAgIGlmIChwcm9wTmFtZXMuaW5kZXhPZignY2xhc3NlcycpID09PSAtMSAmJiBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcykge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzICYmIHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wQ291bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciBwcm9wTmFtZSA9IHByb3BOYW1lc1tpXTtcclxuICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcGVydGllc1twcm9wTmFtZV07XHJcbiAgICAgICAgdmFyIHByZXZpb3VzVmFsdWUgPSBwcmV2aW91c1Byb3BlcnRpZXNbcHJvcE5hbWVdO1xyXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2NsYXNzZXMnKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91c0NsYXNzZXMgPSBBcnJheS5pc0FycmF5KHByZXZpb3VzVmFsdWUpID8gcHJldmlvdXNWYWx1ZSA6IFtwcmV2aW91c1ZhbHVlXTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRDbGFzc2VzID0gQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpID8gcHJvcFZhbHVlIDogW3Byb3BWYWx1ZV07XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c0NsYXNzZXMgJiYgcHJldmlvdXNDbGFzc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICghcHJvcFZhbHVlIHx8IHByb3BWYWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCBwcmV2aW91c0NsYXNzZXMubGVuZ3RoOyBpXzErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzQ2xhc3Nlc1tpXzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2xhc3NlcyA9IHRzbGliXzEuX19zcHJlYWQoY3VycmVudENsYXNzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMiA9IDA7IGlfMiA8IHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGg7IGlfMisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c0NsYXNzTmFtZSA9IHByZXZpb3VzQ2xhc3Nlc1tpXzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNDbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc0luZGV4ID0gbmV3Q2xhc3Nlcy5pbmRleE9mKHByZXZpb3VzQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZG9tTm9kZSwgcHJldmlvdXNDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2xhc3Nlcy5zcGxpY2UoY2xhc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaV8zID0gMDsgaV8zIDwgbmV3Q2xhc3Nlcy5sZW5ndGg7IGlfMysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoZG9tTm9kZSwgbmV3Q2xhc3Nlc1tpXzNdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzQgPSAwOyBpXzQgPCBjdXJyZW50Q2xhc3Nlcy5sZW5ndGg7IGlfNCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3Nlcyhkb21Ob2RlLCBjdXJyZW50Q2xhc3Nlc1tpXzRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChub2RlT3BlcmF0aW9ucy5pbmRleE9mKHByb3BOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbm9kZU9wZXJhdGlvbihwcm9wTmFtZSwgcHJvcFZhbHVlLCBwcmV2aW91c1ZhbHVlLCBkb21Ob2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3BOYW1lID09PSAnc3R5bGVzJykge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGVOYW1lcyA9IE9iamVjdC5rZXlzKHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZUNvdW50ID0gc3R5bGVOYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3R5bGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVOYW1lID0gc3R5bGVOYW1lc1tqXTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdTdHlsZVZhbHVlID0gcHJvcFZhbHVlW3N0eWxlTmFtZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkU3R5bGVWYWx1ZSA9IHByZXZpb3VzVmFsdWUgJiYgcHJldmlvdXNWYWx1ZVtzdHlsZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1N0eWxlVmFsdWUgPT09IG9sZFN0eWxlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdTdHlsZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTdHlsZVZhbHVlKG5ld1N0eWxlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb25PcHRpb25zLnN0eWxlQXBwbHllcihkb21Ob2RlLCBzdHlsZU5hbWUsIG5ld1N0eWxlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdGlvbk9wdGlvbnMuc3R5bGVBcHBseWVyKGRvbU5vZGUsIHN0eWxlTmFtZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXByb3BWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvbVZhbHVlID0gZG9tTm9kZVtwcm9wTmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9tVmFsdWUgIT09IHByb3BWYWx1ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChkb21Ob2RlWydvbmlucHV0LXZhbHVlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkb21WYWx1ZSA9PT0gZG9tTm9kZVsnb25pbnB1dC12YWx1ZSddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVbJ29uaW5wdXQtdmFsdWUnXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcE5hbWUgIT09ICdrZXknICYmIHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicgJiYgcHJvcE5hbWUubGFzdEluZGV4T2YoJ29uJywgMCkgPT09IDAgJiYgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRXZlbnQoZG9tTm9kZSwgcHJvcE5hbWUuc3Vic3RyKDIpLCBwcm9wVmFsdWUsIHByb2plY3Rpb25PcHRpb25zLCBwcm9wZXJ0aWVzLmJpbmQsIHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgcHJvcE5hbWUgIT09ICdpbm5lckhUTUwnICYmIGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZShkb21Ob2RlLCBwcm9wTmFtZSwgcHJvcFZhbHVlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ3Njcm9sbExlZnQnIHx8IHByb3BOYW1lID09PSAnc2Nyb2xsVG9wJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb21Ob2RlW3Byb3BOYW1lXSAhPT0gcHJvcFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbU5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXNVcGRhdGVkO1xyXG59XHJcbmZ1bmN0aW9uIGZpbmRJbmRleE9mQ2hpbGQoY2hpbGRyZW4sIHNhbWVBcywgc3RhcnQpIHtcclxuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNhbWUoY2hpbGRyZW5baV0sIHNhbWVBcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmZ1bmN0aW9uIHRvUGFyZW50Vk5vZGUoZG9tTm9kZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICcnLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHt9LFxyXG4gICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZG9tTm9kZTogZG9tTm9kZSxcclxuICAgICAgICB0eXBlOiBkXzEuVk5PREVcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy50b1BhcmVudFZOb2RlID0gdG9QYXJlbnRWTm9kZTtcclxuZnVuY3Rpb24gdG9UZXh0Vk5vZGUoZGF0YSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICcnLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHt9LFxyXG4gICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdGV4dDogXCJcIiArIGRhdGEsXHJcbiAgICAgICAgZG9tTm9kZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIHR5cGU6IGRfMS5WTk9ERVxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLnRvVGV4dFZOb2RlID0gdG9UZXh0Vk5vZGU7XHJcbmZ1bmN0aW9uIHRvSW50ZXJuYWxXTm9kZShpbnN0YW5jZSwgaW5zdGFuY2VEYXRhKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcclxuICAgICAgICByZW5kZXJlZDogW10sXHJcbiAgICAgICAgY29yZVByb3BlcnRpZXM6IGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcyxcclxuICAgICAgICBjaGlsZHJlbjogaW5zdGFuY2UuY2hpbGRyZW4sXHJcbiAgICAgICAgd2lkZ2V0Q29uc3RydWN0b3I6IGluc3RhbmNlLmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IGluc3RhbmNlRGF0YS5pbnB1dFByb3BlcnRpZXMsXHJcbiAgICAgICAgdHlwZTogZF8xLldOT0RFXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4oY2hpbGRyZW4sIGluc3RhbmNlKSB7XHJcbiAgICBpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eUFycmF5O1xyXG4gICAgfVxyXG4gICAgY2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuIDogW2NoaWxkcmVuXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOykge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB0b1RleHRWTm9kZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZF8xLmlzVk5vZGUoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQucHJvcGVydGllcy5iaW5kID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wcm9wZXJ0aWVzLmJpbmQgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQuY2hpbGRyZW4gJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZC5jb3JlUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuY29yZVByb3BlcnRpZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQ6IGluc3RhbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlUmVnaXN0cnk6IGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iYXNlUmVnaXN0cnlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xyXG59XHJcbmV4cG9ydHMuZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbiA9IGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW47XHJcbmZ1bmN0aW9uIG5vZGVBZGRlZChkbm9kZSwgdHJhbnNpdGlvbnMpIHtcclxuICAgIGlmIChkXzEuaXNWTm9kZShkbm9kZSkgJiYgZG5vZGUucHJvcGVydGllcykge1xyXG4gICAgICAgIHZhciBlbnRlckFuaW1hdGlvbiA9IGRub2RlLnByb3BlcnRpZXMuZW50ZXJBbmltYXRpb247XHJcbiAgICAgICAgaWYgKGVudGVyQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW50ZXJBbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGVudGVyQW5pbWF0aW9uKGRub2RlLmRvbU5vZGUsIGRub2RlLnByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbnMuZW50ZXIoZG5vZGUuZG9tTm9kZSwgZG5vZGUucHJvcGVydGllcywgZW50ZXJBbmltYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG5vZGVUb1JlbW92ZShkbm9kZSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICBpZiAoZF8xLmlzV05vZGUoZG5vZGUpKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQoZG5vZGUuaW5zdGFuY2UpO1xyXG4gICAgICAgIHZhciByZW5kZXJlZCA9IChpdGVtID8gaXRlbS5kbm9kZS5yZW5kZXJlZCA6IGRub2RlLnJlbmRlcmVkKSB8fCBlbXB0eUFycmF5O1xyXG4gICAgICAgIGlmIChkbm9kZS5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQoZG5vZGUuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGEub25EZXRhY2goKTtcclxuICAgICAgICAgICAgaW5zdGFuY2VNYXAuZGVsZXRlKGRub2RlLmluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub2RlVG9SZW1vdmUocmVuZGVyZWRbaV0sIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGRvbU5vZGVfMSA9IGRub2RlLmRvbU5vZGU7XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBkbm9kZS5wcm9wZXJ0aWVzO1xyXG4gICAgICAgIGlmIChkbm9kZS5jaGlsZHJlbiAmJiBkbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5vZGVUb1JlbW92ZShkbm9kZS5jaGlsZHJlbltpXSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZXhpdEFuaW1hdGlvbiA9IHByb3BlcnRpZXMuZXhpdEFuaW1hdGlvbjtcclxuICAgICAgICBpZiAocHJvcGVydGllcyAmJiBleGl0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRvbU5vZGVfMS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlRG9tTm9kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRvbU5vZGVfMSAmJiBkb21Ob2RlXzEucGFyZW50Tm9kZSAmJiBkb21Ob2RlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlXzEpO1xyXG4gICAgICAgICAgICAgICAgZG5vZGUuZG9tTm9kZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleGl0QW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBleGl0QW5pbWF0aW9uKGRvbU5vZGVfMSwgcmVtb3ZlRG9tTm9kZSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9ucy5leGl0KGRub2RlLmRvbU5vZGUsIHByb3BlcnRpZXMsIGV4aXRBbmltYXRpb24sIHJlbW92ZURvbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbU5vZGVfMSAmJiBkb21Ob2RlXzEucGFyZW50Tm9kZSAmJiBkb21Ob2RlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlXzEpO1xyXG4gICAgICAgIGRub2RlLmRvbU5vZGUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tEaXN0aW5ndWlzaGFibGUoY2hpbGROb2RlcywgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSkge1xyXG4gICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkTm9kZXNbaW5kZXhUb0NoZWNrXTtcclxuICAgIGlmIChkXzEuaXNWTm9kZShjaGlsZE5vZGUpICYmICFjaGlsZE5vZGUudGFnKSB7XHJcbiAgICAgICAgcmV0dXJuOyAvLyBUZXh0IG5vZGVzIG5lZWQgbm90IGJlIGRpc3Rpbmd1aXNoYWJsZVxyXG4gICAgfVxyXG4gICAgdmFyIGtleSA9IGNoaWxkTm9kZS5wcm9wZXJ0aWVzLmtleTtcclxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4VG9DaGVjaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjaGlsZE5vZGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbWUobm9kZSwgY2hpbGROb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlSWRlbnRpZmllciA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50TmFtZSA9IHBhcmVudEluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ3Vua25vd24nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkXzEuaXNXTm9kZShjaGlsZE5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJZGVudGlmaWVyID0gY2hpbGROb2RlLndpZGdldENvbnN0cnVjdG9yLm5hbWUgfHwgJ3Vua25vd24nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUlkZW50aWZpZXIgPSBjaGlsZE5vZGUudGFnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBIHdpZGdldCAoXCIgKyBwYXJlbnROYW1lICsgXCIpIGhhcyBoYWQgYSBjaGlsZCBhZGRkZWQgb3IgcmVtb3ZlZCwgYnV0IHRoZXkgd2VyZSBub3QgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmaWVkLiBJdCBpcyByZWNvbW1lbmRlZCB0byBwcm92aWRlIGEgdW5pcXVlICdrZXknIHByb3BlcnR5IHdoZW4gdXNpbmcgdGhlIHNhbWUgd2lkZ2V0IG9yIGVsZW1lbnQgKFwiICsgbm9kZUlkZW50aWZpZXIgKyBcIikgbXVsdGlwbGUgdGltZXMgYXMgc2libGluZ3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIHNpYmxpbmdzLCBvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIHBhcmVudEluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgb2xkQ2hpbGRyZW4gPSBvbGRDaGlsZHJlbiB8fCBlbXB0eUFycmF5O1xyXG4gICAgbmV3Q2hpbGRyZW4gPSBuZXdDaGlsZHJlbjtcclxuICAgIHZhciBvbGRDaGlsZHJlbkxlbmd0aCA9IG9sZENoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciBuZXdDaGlsZHJlbkxlbmd0aCA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciB0cmFuc2l0aW9ucyA9IHByb2plY3Rpb25PcHRpb25zLnRyYW5zaXRpb25zO1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIHByb2plY3Rpb25PcHRpb25zID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvamVjdGlvbk9wdGlvbnMsIHsgZGVwdGg6IHByb2plY3Rpb25PcHRpb25zLmRlcHRoICsgMSB9KTtcclxuICAgIHZhciBvbGRJbmRleCA9IDA7XHJcbiAgICB2YXIgbmV3SW5kZXggPSAwO1xyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgdGV4dFVwZGF0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZEluZGV4IDwgb2xkQ2hpbGRyZW5MZW5ndGggPyBvbGRDaGlsZHJlbltvbGRJbmRleF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5bbmV3SW5kZXhdO1xyXG4gICAgICAgIGlmIChkXzEuaXNWTm9kZShuZXdDaGlsZCkgJiYgdHlwZW9mIG5ld0NoaWxkLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG5ld0NoaWxkLmluc2VydGVkID0gZF8xLmlzVk5vZGUob2xkQ2hpbGQpICYmIG9sZENoaWxkLmluc2VydGVkO1xyXG4gICAgICAgICAgICBhZGREZWZlcnJlZFByb3BlcnRpZXMobmV3Q2hpbGQsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9sZENoaWxkICE9PSB1bmRlZmluZWQgJiYgc2FtZShvbGRDaGlsZCwgbmV3Q2hpbGQpKSB7XHJcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XHJcbiAgICAgICAgICAgIG5ld0luZGV4Kys7XHJcbiAgICAgICAgICAgIHRleHRVcGRhdGVkID1cclxuICAgICAgICAgICAgICAgIHVwZGF0ZURvbShvbGRDaGlsZCwgbmV3Q2hpbGQsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRWTm9kZSwgcGFyZW50SW5zdGFuY2UsIG9sZENoaWxkcmVuLnNsaWNlKG9sZEluZGV4KSwgbmV3Q2hpbGRyZW4uc2xpY2UobmV3SW5kZXgpKSB8fCB0ZXh0VXBkYXRlZDtcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZpbmRPbGRJbmRleCA9IGZpbmRJbmRleE9mQ2hpbGQob2xkQ2hpbGRyZW4sIG5ld0NoaWxkLCBvbGRJbmRleCArIDEpO1xyXG4gICAgICAgIHZhciBhZGRDaGlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluc2VydEJlZm9yZURvbU5vZGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbkFycmF5ID0gb2xkQ2hpbGRyZW47XHJcbiAgICAgICAgICAgIHZhciBuZXh0SW5kZXggPSBvbGRJbmRleCArIDE7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9sZENoaWxkcmVuW29sZEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBzaWJsaW5nc1swXTtcclxuICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkFycmF5ID0gc2libGluZ3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0QmVmb3JlQ2hpbGRyZW4gPSBbY2hpbGRdO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnNlcnRCZWZvcmUgPSBpbnNlcnRCZWZvcmVDaGlsZHJlbi5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkXzEuaXNXTm9kZShpbnNlcnRCZWZvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KGluc2VydEJlZm9yZS5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZG5vZGUucmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEJlZm9yZUNoaWxkcmVuLnB1c2guYXBwbHkoaW5zZXJ0QmVmb3JlQ2hpbGRyZW4sIHRzbGliXzEuX19zcHJlYWQoaXRlbS5kbm9kZS5yZW5kZXJlZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0QmVmb3JlLmRvbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnNlcnRCZWZvcmUuZG9tTm9kZS5wYXJlbnRFbGVtZW50ICE9PSBwYXJlbnRWTm9kZS5kb21Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCZWZvcmVEb21Ob2RlID0gaW5zZXJ0QmVmb3JlLmRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0QmVmb3JlQ2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIGNoaWxkcmVuQXJyYXlbbmV4dEluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCZWZvcmVDaGlsZHJlbi5wdXNoKGNoaWxkcmVuQXJyYXlbbmV4dEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjcmVhdGVEb20obmV3Q2hpbGQsIHBhcmVudFZOb2RlLCBuZXdDaGlsZHJlbi5zbGljZShuZXdJbmRleCArIDEpLCBpbnNlcnRCZWZvcmVEb21Ob2RlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBub2RlQWRkZWQobmV3Q2hpbGQsIHRyYW5zaXRpb25zKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4VG9DaGVjayA9IG5ld0luZGV4O1xyXG4gICAgICAgICAgICBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGlzdGluZ3Vpc2hhYmxlKG5ld0NoaWxkcmVuLCBpbmRleFRvQ2hlY2ssIHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIW9sZENoaWxkIHx8IGZpbmRPbGRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgYWRkQ2hpbGQoKTtcclxuICAgICAgICAgICAgbmV3SW5kZXgrKztcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXhUb0NoZWNrID0gb2xkSW5kZXg7XHJcbiAgICAgICAgICAgIHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEaXN0aW5ndWlzaGFibGUob2xkQ2hpbGRyZW4sIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRfMS5pc1dOb2RlKG9sZENoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQob2xkQ2hpbGQuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRDaGlsZCA9IGl0ZW0uZG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZVRvUmVtb3ZlKG9sZENoaWxkLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGZpbmROZXdJbmRleCA9IGZpbmRJbmRleE9mQ2hpbGQobmV3Q2hpbGRyZW4sIG9sZENoaWxkLCBuZXdJbmRleCArIDEpO1xyXG4gICAgICAgIGlmIChmaW5kTmV3SW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkKCk7XHJcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZENoaWxkKCk7XHJcbiAgICAgICAgcmVtb3ZlQ2hpbGQoKTtcclxuICAgICAgICBvbGRJbmRleCsrO1xyXG4gICAgICAgIG5ld0luZGV4Kys7XHJcbiAgICB9O1xyXG4gICAgd2hpbGUgKG5ld0luZGV4IDwgbmV3Q2hpbGRyZW5MZW5ndGgpIHtcclxuICAgICAgICBfbG9vcF8xKCk7XHJcbiAgICB9XHJcbiAgICBpZiAob2xkQ2hpbGRyZW5MZW5ndGggPiBvbGRJbmRleCkge1xyXG4gICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXhUb0NoZWNrID0gaTtcclxuICAgICAgICAgICAgcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Rpc3Rpbmd1aXNoYWJsZShvbGRDaGlsZHJlbiwgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRUb1JlbW92ZSA9IG9sZENoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoZF8xLmlzV05vZGUoY2hpbGRUb1JlbW92ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KGNoaWxkVG9SZW1vdmUuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZFRvUmVtb3ZlID0gaXRlbS5kbm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlVG9SZW1vdmUoY2hpbGRUb1JlbW92ZSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFJlbW92ZSBjaGlsZCBmcmFnbWVudHNcclxuICAgICAgICBmb3IgKGkgPSBvbGRJbmRleDsgaSA8IG9sZENoaWxkcmVuTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgX2xvb3BfMigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0VXBkYXRlZDtcclxufVxyXG5mdW5jdGlvbiBhZGRDaGlsZHJlbihwYXJlbnRWTm9kZSwgY2hpbGRyZW4sIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgaW5zZXJ0QmVmb3JlLCBjaGlsZE5vZGVzKSB7XHJcbiAgICBpZiAoaW5zZXJ0QmVmb3JlID09PSB2b2lkIDApIHsgaW5zZXJ0QmVmb3JlID0gdW5kZWZpbmVkOyB9XHJcbiAgICBpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICBpZiAocHJvamVjdG9yU3RhdGUubWVyZ2UgJiYgY2hpbGROb2RlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2hpbGROb2RlcyA9IGFycmF5XzEuZnJvbShwYXJlbnRWTm9kZS5kb21Ob2RlLmNoaWxkTm9kZXMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHRyYW5zaXRpb25zID0gcHJvamVjdGlvbk9wdGlvbnMudHJhbnNpdGlvbnM7XHJcbiAgICBwcm9qZWN0aW9uT3B0aW9ucyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb2plY3Rpb25PcHRpb25zLCB7IGRlcHRoOiBwcm9qZWN0aW9uT3B0aW9ucy5kZXB0aCArIDEgfSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgdmFyIG5leHRTaWJsaW5ncyA9IGNoaWxkcmVuLnNsaWNlKGkgKyAxKTtcclxuICAgICAgICBpZiAoZF8xLmlzVk5vZGUoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9qZWN0b3JTdGF0ZS5tZXJnZSAmJiBjaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZG9tRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChjaGlsZC5kb21Ob2RlID09PSB1bmRlZmluZWQgJiYgY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tRWxlbWVudCA9IGNoaWxkTm9kZXMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tRWxlbWVudCAmJiBkb21FbGVtZW50LnRhZ05hbWUgPT09IChjaGlsZC50YWcudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmRvbU5vZGUgPSBkb21FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjcmVhdGVEb20oY2hpbGQsIHBhcmVudFZOb2RlLCBuZXh0U2libGluZ3MsIGluc2VydEJlZm9yZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZURvbShjaGlsZCwgcGFyZW50Vk5vZGUsIG5leHRTaWJsaW5ncywgaW5zZXJ0QmVmb3JlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UsIGNoaWxkTm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlQWRkZWQoY2hpbGQsIHRyYW5zaXRpb25zKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKGRvbU5vZGUsIGRub2RlLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHtcclxuICAgIGFkZENoaWxkcmVuKGRub2RlLCBkbm9kZS5jaGlsZHJlbiwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlLCB1bmRlZmluZWQpO1xyXG4gICAgaWYgKHR5cGVvZiBkbm9kZS5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBkbm9kZS5pbnNlcnRlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYWRkRGVmZXJyZWRQcm9wZXJ0aWVzKGRub2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcclxuICAgICAgICB1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGUsIHt9LCBkbm9kZS5hdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgdXBkYXRlUHJvcGVydGllcyhkb21Ob2RlLCB7fSwgZG5vZGUucHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIGZhbHNlKTtcclxuICAgICAgICByZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCB7fSwgZG5vZGUuZXZlbnRzLCBwcm9qZWN0aW9uT3B0aW9ucywgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIGV2ZW50c18xID0gZG5vZGUuZXZlbnRzO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGV2ZW50c18xKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB1cGRhdGVFdmVudChkb21Ob2RlLCBldmVudCwgZXZlbnRzXzFbZXZlbnRdLCBwcm9qZWN0aW9uT3B0aW9ucywgZG5vZGUucHJvcGVydGllcy5iaW5kKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZSwge30sIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gbnVsbCAmJiBkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IGV4cG9ydHMud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHBhcmVudEluc3RhbmNlKTtcclxuICAgICAgICBpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkKGRvbU5vZGUsIFwiXCIgKyBkbm9kZS5wcm9wZXJ0aWVzLmtleSk7XHJcbiAgICB9XHJcbiAgICBkbm9kZS5pbnNlcnRlZCA9IHRydWU7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlRG9tKGRub2RlLCBwYXJlbnRWTm9kZSwgbmV4dFNpYmxpbmdzLCBpbnNlcnRCZWZvcmUsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgY2hpbGROb2Rlcykge1xyXG4gICAgdmFyIGRvbU5vZGU7XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgaWYgKGRfMS5pc1dOb2RlKGRub2RlKSkge1xyXG4gICAgICAgIHZhciB3aWRnZXRDb25zdHJ1Y3RvciA9IGRub2RlLndpZGdldENvbnN0cnVjdG9yO1xyXG4gICAgICAgIHZhciBwYXJlbnRJbnN0YW5jZURhdGEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgaWYgKCFSZWdpc3RyeV8xLmlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKHdpZGdldENvbnN0cnVjdG9yKSkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHBhcmVudEluc3RhbmNlRGF0YS5yZWdpc3RyeSgpLmdldCh3aWRnZXRDb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2lkZ2V0Q29uc3RydWN0b3IgPSBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5zdGFuY2VfMSA9IG5ldyB3aWRnZXRDb25zdHJ1Y3RvcigpO1xyXG4gICAgICAgIGRub2RlLmluc3RhbmNlID0gaW5zdGFuY2VfMTtcclxuICAgICAgICBuZXh0U2libGluZ01hcC5zZXQoaW5zdGFuY2VfMSwgbmV4dFNpYmxpbmdzKTtcclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhXzEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZV8xKTtcclxuICAgICAgICBpbnN0YW5jZURhdGFfMS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGFfMS5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZURhdGFfMS5yZW5kZXJpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZS5wdXNoKHsgaW5zdGFuY2U6IGluc3RhbmNlXzEsIGRlcHRoOiBwcm9qZWN0aW9uT3B0aW9ucy5kZXB0aCB9KTtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlUmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhXzEucmVuZGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICBpbnN0YW5jZV8xLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XHJcbiAgICAgICAgaW5zdGFuY2VfMS5fX3NldENoaWxkcmVuX18oZG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIGluc3RhbmNlXzEuX19zZXRQcm9wZXJ0aWVzX18oZG5vZGUucHJvcGVydGllcyk7XHJcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gaW5zdGFuY2VfMS5fX3JlbmRlcl9fKCk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhXzEucmVuZGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHJlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZFJlbmRlcmVkID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihyZW5kZXJlZCwgaW5zdGFuY2VfMSk7XHJcbiAgICAgICAgICAgIGRub2RlLnJlbmRlcmVkID0gZmlsdGVyZWRSZW5kZXJlZDtcclxuICAgICAgICAgICAgYWRkQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIGZpbHRlcmVkUmVuZGVyZWQsIHByb2plY3Rpb25PcHRpb25zLCBpbnN0YW5jZV8xLCBpbnNlcnRCZWZvcmUsIGNoaWxkTm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnN0YW5jZU1hcC5zZXQoaW5zdGFuY2VfMSwgeyBkbm9kZTogZG5vZGUsIHBhcmVudFZOb2RlOiBwYXJlbnRWTm9kZSB9KTtcclxuICAgICAgICBpbnN0YW5jZURhdGFfMS5ub2RlSGFuZGxlci5hZGRSb290KCk7XHJcbiAgICAgICAgcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlRGF0YV8xLm9uQXR0YWNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAocHJvamVjdG9yU3RhdGUubWVyZ2UgJiYgcHJvamVjdG9yU3RhdGUubWVyZ2VFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaW5pdFByb3BlcnRpZXNBbmRDaGlsZHJlbihkb21Ob2RlLCBkbm9kZSwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZG9jID0gcGFyZW50Vk5vZGUuZG9tTm9kZS5vd25lckRvY3VtZW50O1xyXG4gICAgICAgIGlmICghZG5vZGUudGFnICYmIHR5cGVvZiBkbm9kZS50ZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoZG5vZGUuZG9tTm9kZSAhPT0gdW5kZWZpbmVkICYmIHBhcmVudFZOb2RlLmRvbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdEb21Ob2RlID0gZG5vZGUuZG9tTm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRub2RlLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFZOb2RlLmRvbU5vZGUgPT09IGRub2RlLmRvbU5vZGUucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZOb2RlLmRvbU5vZGUucmVwbGFjZUNoaWxkKG5ld0RvbU5vZGUsIGRub2RlLmRvbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Vk5vZGUuZG9tTm9kZS5hcHBlbmRDaGlsZChuZXdEb21Ob2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBkbm9kZS5kb21Ob2RlLnBhcmVudE5vZGUgJiYgZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRub2RlLmRvbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG5vZGUuZG9tTm9kZSA9IG5ld0RvbU5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IGRvYy5jcmVhdGVUZXh0Tm9kZShkbm9kZS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnNlcnRCZWZvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZOb2RlLmRvbU5vZGUuaW5zZXJ0QmVmb3JlKGRvbU5vZGUsIGluc2VydEJlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWTm9kZS5kb21Ob2RlLmFwcGVuZENoaWxkKGRvbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZG5vZGUuZG9tTm9kZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG5vZGUudGFnID09PSAnc3ZnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3Rpb25PcHRpb25zID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvamVjdGlvbk9wdGlvbnMsIHsgbmFtZXNwYWNlOiBOQU1FU1BBQ0VfU1ZHIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudE5TKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSwgZG5vZGUudGFnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlID0gZG5vZGUuZG9tTm9kZSB8fCBkb2MuY3JlYXRlRWxlbWVudChkbm9kZS50YWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tTm9kZSA9IGRub2RlLmRvbU5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5pdFByb3BlcnRpZXNBbmRDaGlsZHJlbihkb21Ob2RlLCBkbm9kZSwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGluc2VydEJlZm9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRWTm9kZS5kb21Ob2RlLmluc2VydEJlZm9yZShkb21Ob2RlLCBpbnNlcnRCZWZvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRvbU5vZGUucGFyZW50Tm9kZSAhPT0gcGFyZW50Vk5vZGUuZG9tTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Vk5vZGUuZG9tTm9kZS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1cGRhdGVEb20ocHJldmlvdXMsIGRub2RlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50Vk5vZGUsIHBhcmVudEluc3RhbmNlLCBvbGROZXh0U2libGluZ3MsIG5leHRTaWJsaW5ncykge1xyXG4gICAgaWYgKGRfMS5pc1dOb2RlKGRub2RlKSkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHByZXZpb3VzLmluc3RhbmNlO1xyXG4gICAgICAgIHZhciBfYSA9IGluc3RhbmNlTWFwLmdldChpbnN0YW5jZSksIHBhcmVudFZOb2RlXzEgPSBfYS5wYXJlbnRWTm9kZSwgbm9kZSA9IF9hLmRub2RlO1xyXG4gICAgICAgIHZhciBwcmV2aW91c1JlbmRlcmVkID0gbm9kZSA/IG5vZGUucmVuZGVyZWQgOiBwcmV2aW91cy5yZW5kZXJlZDtcclxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpO1xyXG4gICAgICAgIGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIGluc3RhbmNlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XHJcbiAgICAgICAgaW5zdGFuY2UuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICBpbnN0YW5jZS5fX3NldFByb3BlcnRpZXNfXyhkbm9kZS5wcm9wZXJ0aWVzKTtcclxuICAgICAgICBuZXh0U2libGluZ01hcC5zZXQoaW5zdGFuY2UsIG5leHRTaWJsaW5ncyk7XHJcbiAgICAgICAgZG5vZGUuaW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgICAgICBpZiAoaW5zdGFuY2VEYXRhLmRpcnR5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHZhciByZW5kZXJlZCA9IGluc3RhbmNlLl9fcmVuZGVyX18oKTtcclxuICAgICAgICAgICAgaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkbm9kZS5yZW5kZXJlZCA9IGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4ocmVuZGVyZWQsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4ocGFyZW50Vk5vZGVfMSwgb2xkTmV4dFNpYmxpbmdzLCBwcmV2aW91c1JlbmRlcmVkLCBkbm9kZS5yZW5kZXJlZCwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG5vZGUucmVuZGVyZWQgPSBwcmV2aW91c1JlbmRlcmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnN0YW5jZU1hcC5zZXQoaW5zdGFuY2UsIHsgZG5vZGU6IGRub2RlLCBwYXJlbnRWTm9kZTogcGFyZW50Vk5vZGVfMSB9KTtcclxuICAgICAgICBpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzID09PSBkbm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkb21Ob2RlXzIgPSAoZG5vZGUuZG9tTm9kZSA9IHByZXZpb3VzLmRvbU5vZGUpO1xyXG4gICAgICAgIHZhciB0ZXh0VXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciB1cGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFkbm9kZS50YWcgJiYgdHlwZW9mIGRub2RlLnRleHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmIChkbm9kZS50ZXh0ICE9PSBwcmV2aW91cy50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RG9tTm9kZSA9IGRvbU5vZGVfMi5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRub2RlLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgZG9tTm9kZV8yLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0RvbU5vZGUsIGRvbU5vZGVfMik7XHJcbiAgICAgICAgICAgICAgICBkbm9kZS5kb21Ob2RlID0gbmV3RG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIHRleHRVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0VXBkYXRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRub2RlLnRhZyAmJiBkbm9kZS50YWcubGFzdEluZGV4T2YoJ3N2ZycsIDApID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uT3B0aW9ucyA9IHRzbGliXzEuX19hc3NpZ24oe30sIHByb2plY3Rpb25PcHRpb25zLCB7IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMuY2hpbGRyZW4gIT09IGRub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGRub2RlLmNoaWxkcmVuLCBwYXJlbnRJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBkbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZG5vZGUsIG9sZE5leHRTaWJsaW5ncywgcHJldmlvdXMuY2hpbGRyZW4sIGNoaWxkcmVuLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHx8IHVwZGF0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzUHJvcGVydGllc18xID0gYnVpbGRQcmV2aW91c1Byb3BlcnRpZXMoZG9tTm9kZV8yLCBwcmV2aW91cywgZG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZXMoZG9tTm9kZV8yLCBwcmV2aW91c1Byb3BlcnRpZXNfMS5hdHRyaWJ1dGVzLCBkbm9kZS5hdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkID1cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGVfMiwgcHJldmlvdXNQcm9wZXJ0aWVzXzEucHJvcGVydGllcywgZG5vZGUucHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIGZhbHNlKSB8fCB1cGRhdGVkO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlT3JwaGFuZWRFdmVudHMoZG9tTm9kZV8yLCBwcmV2aW91c1Byb3BlcnRpZXNfMS5ldmVudHMsIGRub2RlLmV2ZW50cywgcHJvamVjdGlvbk9wdGlvbnMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50c18yID0gZG5vZGUuZXZlbnRzO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZXZlbnRzXzIpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRXZlbnQoZG9tTm9kZV8yLCBldmVudCwgZXZlbnRzXzJbZXZlbnRdLCBwcm9qZWN0aW9uT3B0aW9ucywgZG5vZGUucHJvcGVydGllcy5iaW5kLCBwcmV2aW91c1Byb3BlcnRpZXNfMS5ldmVudHNbZXZlbnRdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUHJvcGVydGllcyhkb21Ob2RlXzIsIHByZXZpb3VzUHJvcGVydGllc18xLnByb3BlcnRpZXMsIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gbnVsbCAmJiBkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gZXhwb3J0cy53aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZChkb21Ob2RlXzIsIFwiXCIgKyBkbm9kZS5wcm9wZXJ0aWVzLmtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwZGF0ZWQgJiYgZG5vZGUucHJvcGVydGllcyAmJiBkbm9kZS5wcm9wZXJ0aWVzLnVwZGF0ZUFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBkbm9kZS5wcm9wZXJ0aWVzLnVwZGF0ZUFuaW1hdGlvbihkb21Ob2RlXzIsIGRub2RlLnByb3BlcnRpZXMsIHByZXZpb3VzLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGREZWZlcnJlZFByb3BlcnRpZXModm5vZGUsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICAvLyB0cmFuc2ZlciBhbnkgcHJvcGVydGllcyB0aGF0IGhhdmUgYmVlbiBwYXNzZWQgLSBhcyB0aGVzZSBtdXN0IGJlIGRlY29yYXRlZCBwcm9wZXJ0aWVzXHJcbiAgICB2bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMgPSB2bm9kZS5wcm9wZXJ0aWVzO1xyXG4gICAgdmFyIHByb3BlcnRpZXMgPSB2bm9kZS5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayghIXZub2RlLmluc2VydGVkKTtcclxuICAgIHZhciBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSk7XHJcbiAgICB2bm9kZS5wcm9wZXJ0aWVzID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHJvcGVydGllcywgdm5vZGUuZGVjb3JhdGVkRGVmZXJyZWRQcm9wZXJ0aWVzKTtcclxuICAgIHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgdm5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2soISF2bm9kZS5pbnNlcnRlZCksIHZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllcyk7XHJcbiAgICAgICAgdXBkYXRlUHJvcGVydGllcyh2bm9kZS5kb21Ob2RlLCB2bm9kZS5wcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgdm5vZGUucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIGlmIChwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocHJvamVjdGlvbk9wdGlvbnMuc3luYykge1xyXG4gICAgICAgICAgICB3aGlsZSAocHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ2xvYmFsXzEuZGVmYXVsdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpO1xyXG4gICAgaWYgKHByb2plY3Rpb25PcHRpb25zLnN5bmMpIHtcclxuICAgICAgICB3aGlsZSAocHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbF8xLmRlZmF1bHQucmVxdWVzdElkbGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBnbG9iYWxfMS5kZWZhdWx0LnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzY2hlZHVsZVJlbmRlcihwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XHJcbiAgICAgICAgcmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcHJvamVjdG9yU3RhdGUucmVuZGVyU2NoZWR1bGVkID0gZ2xvYmFsXzEuZGVmYXVsdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW5kZXIocHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlbmRlcihwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgdmFyIHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKTtcclxuICAgIHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IHVuZGVmaW5lZDtcclxuICAgIHZhciByZW5kZXJRdWV1ZSA9IHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlO1xyXG4gICAgdmFyIHJlbmRlcnMgPSB0c2xpYl8xLl9fc3ByZWFkKHJlbmRlclF1ZXVlKTtcclxuICAgIHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlID0gW107XHJcbiAgICByZW5kZXJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZGVwdGggLSBiLmRlcHRoOyB9KTtcclxuICAgIHZhciBwcmV2aW91c2x5UmVuZGVyZWQgPSBbXTtcclxuICAgIHdoaWxlIChyZW5kZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHJlbmRlcnMuc2hpZnQoKS5pbnN0YW5jZTtcclxuICAgICAgICBpZiAoaW5zdGFuY2VNYXAuaGFzKGluc3RhbmNlKSAmJiBwcmV2aW91c2x5UmVuZGVyZWQuaW5kZXhPZihpbnN0YW5jZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzbHlSZW5kZXJlZC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdmFyIF9hID0gaW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSwgcGFyZW50Vk5vZGUgPSBfYS5wYXJlbnRWTm9kZSwgZG5vZGUgPSBfYS5kbm9kZTtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IGV4cG9ydHMud2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5ncyA9IG5leHRTaWJsaW5nTWFwLmdldChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHVwZGF0ZURvbShkbm9kZSwgdG9JbnRlcm5hbFdOb2RlKGluc3RhbmNlLCBpbnN0YW5jZURhdGEpLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50Vk5vZGUsIGluc3RhbmNlLCBuZXh0U2libGluZ3MsIG5leHRTaWJsaW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnMpO1xyXG4gICAgcnVuRGVmZXJyZWRSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMuZG9tID0ge1xyXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHByb2plY3Rpb25PcHRpb25zID09PSB2b2lkIDApIHsgcHJvamVjdGlvbk9wdGlvbnMgPSB7fTsgfVxyXG4gICAgICAgIHZhciBpbnN0YW5jZURhdGEgPSBleHBvcnRzLndpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSk7XHJcbiAgICAgICAgdmFyIGZpbmFsUHJvamVjdG9yT3B0aW9ucyA9IGdldFByb2plY3Rpb25PcHRpb25zKHByb2plY3Rpb25PcHRpb25zLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgdmFyIHByb2plY3RvclN0YXRlID0ge1xyXG4gICAgICAgICAgICBhZnRlclJlbmRlckNhbGxiYWNrczogW10sXHJcbiAgICAgICAgICAgIGRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzOiBbXSxcclxuICAgICAgICAgICAgbm9kZU1hcDogbmV3IFdlYWtNYXBfMS5kZWZhdWx0KCksXHJcbiAgICAgICAgICAgIHJlbmRlclNjaGVkdWxlZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICByZW5kZXJRdWV1ZTogW10sXHJcbiAgICAgICAgICAgIG1lcmdlOiBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgbWVyZ2VFbGVtZW50OiBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZUVsZW1lbnRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlTWFwLnNldChpbnN0YW5jZSwgcHJvamVjdG9yU3RhdGUpO1xyXG4gICAgICAgIGZpbmFsUHJvamVjdG9yT3B0aW9ucy5yb290Tm9kZSA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgdmFyIHBhcmVudFZOb2RlID0gdG9QYXJlbnRWTm9kZShmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUpO1xyXG4gICAgICAgIHZhciBub2RlID0gdG9JbnRlcm5hbFdOb2RlKGluc3RhbmNlLCBpbnN0YW5jZURhdGEpO1xyXG4gICAgICAgIGluc3RhbmNlTWFwLnNldChpbnN0YW5jZSwgeyBkbm9kZTogbm9kZSwgcGFyZW50Vk5vZGU6IHBhcmVudFZOb2RlIH0pO1xyXG4gICAgICAgIGluc3RhbmNlRGF0YS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZURhdGEuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlLnB1c2goeyBpbnN0YW5jZTogaW5zdGFuY2UsIGRlcHRoOiBmaW5hbFByb2plY3Rvck9wdGlvbnMuZGVwdGggfSk7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVJlbmRlcihmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB1cGRhdGVEb20obm9kZSwgbm9kZSwgZmluYWxQcm9qZWN0b3JPcHRpb25zLCBwYXJlbnRWTm9kZSwgaW5zdGFuY2UsIFtdLCBbXSk7XHJcbiAgICAgICAgcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlRGF0YS5vbkF0dGFjaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJ1bkRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzKGZpbmFsUHJvamVjdG9yT3B0aW9ucyk7XHJcbiAgICAgICAgcnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MoZmluYWxQcm9qZWN0b3JPcHRpb25zKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb21Ob2RlOiBmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgIH0sXHJcbiAgICBtZXJnZTogZnVuY3Rpb24gKGVsZW1lbnQsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChwcm9qZWN0aW9uT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHByb2plY3Rpb25PcHRpb25zID0ge307IH1cclxuICAgICAgICBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZSA9IHRydWU7XHJcbiAgICAgICAgcHJvamVjdGlvbk9wdGlvbnMubWVyZ2VFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB2YXIgcHJvamVjdGlvbiA9IHRoaXMuYXBwZW5kKGVsZW1lbnQucGFyZW50Tm9kZSwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcclxuICAgICAgICB2YXIgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQoaW5zdGFuY2UpO1xyXG4gICAgICAgIHByb2plY3RvclN0YXRlLm1lcmdlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHByb2plY3Rpb247XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvdmRvbS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGRvam8vd2lkZ2V0LWNvcmUvdmRvbS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgYXJyYXlfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL2FycmF5XCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9hZGRvbi5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgQWRkb25CYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQWRkb25CYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQWRkb25CYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEFkZG9uQmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnYWRkb24nO1xyXG4gICAgfTtcclxuICAgIEFkZG9uQmFzZS5wcm90b3R5cGUuaXNDaGVja2JveE9yUmFkaW8gPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHZhciBjaGlsZEtleSA9IG5vZGUucHJvcGVydGllcy5rZXk7XHJcbiAgICAgICAgaWYgKGNoaWxkS2V5ID09PSAnY2hlY2tib3gnIHx8IGNoaWxkS2V5ID09PSAncmFkaW8nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBZGRvbkJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgdmFsdWUgPSBfYS52YWx1ZSwgcG9zaXRpb24gPSBfYS5wb3NpdGlvbjtcclxuICAgICAgICB2YXIgY3NzQ2xhc3MgPSBbJ2lucHV0LWdyb3VwLXByZXBlbmQnXTtcclxuICAgICAgICBpZiAocG9zaXRpb24gJiYgcG9zaXRpb24gPT09ICdhcHBlbmQnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzID0gWydpbnB1dC1ncm91cC1hcHBlbmQnXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goZF8xLnYoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFsnaW5wdXQtZ3JvdXAtdGV4dCddLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9LCBbdmFsdWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tib3hPclJhZGlvTm9kZSA9IGFycmF5XzEuZmluZCh0aGlzLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5pc0NoZWNrYm94T3JSYWRpbyhjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hPclJhZGlvTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChkXzEudignZGl2JywgeyBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFsnaW5wdXQtZ3JvdXAtdGV4dCddLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSB9LCB0aGlzLmNoaWxkcmVuKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzcyA9IGNzc0NsYXNzLmNvbmNhdCh1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKTtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW3RoaXMudGhlbWUoY3NzLnJvb3QpXSwgY3NzQ2xhc3MpXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIEFkZG9uQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1hZGRvbicsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ3dpZGdldElkJywgJ3ZhbHVlJywgJ3Bvc2l0aW9uJywgJ3RleHRDb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBBZGRvbkJhc2UpO1xyXG4gICAgcmV0dXJuIEFkZG9uQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5BZGRvbkJhc2UgPSBBZGRvbkJhc2U7XHJcbnZhciBBZGRvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEFkZG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQWRkb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFkZG9uO1xyXG59KEFkZG9uQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBBZGRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL3N0eWxlcy9hZGRvbi5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2FkZG9uL3N0eWxlcy9hZGRvbi5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiSkk0VWdDY25cIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9hZGRvblwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYWRkb24vc3R5bGVzL2FkZG9uLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9hZGRvbi9zdHlsZXMvYWRkb24ubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvYmFkZ2UubS5jc3NcIik7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuLi9idXR0b25cIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIEJhZGdlQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEJhZGdlQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEJhZGdlQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBCYWRnZUJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2JhZGdlJztcclxuICAgIH07XHJcbiAgICBCYWRnZUJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlUG9zaXRpb24gPSBfYS52YWx1ZVBvc2l0aW9uLCBhcHBlYXJhbmNlID0gX2EuYXBwZWFyYW5jZSwgcGlsbCA9IF9hLnBpbGwsIGhyZWYgPSBfYS5ocmVmLCB0YXJnZXQgPSBfYS50YXJnZXQ7XHJcbiAgICAgICAgdmFyIHRhZyA9ICdzcGFuJztcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChocmVmKSB7XHJcbiAgICAgICAgICAgIHRhZyA9ICdhJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBidXR0b25fMS50YXJnZXRNYXBbdGFyZ2V0XSB8fCB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goXCJiYWRnZS1cIiArIGFwcGVhcmFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGlsbCA9PT0gdHJ1ZSB8fCBwaWxsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdiYWRnZS1waWxsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjaGlsZHJlbjtcclxuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWVQb3NpdGlvbiAmJiB2YWx1ZVBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4gPSB0c2xpYl8xLl9fc3ByZWFkKFt2YWx1ZV0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4gPSB0c2xpYl8xLl9fc3ByZWFkKHRoaXMuY2hpbGRyZW4sIFt2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYodGFnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFt0aGlzLnRoZW1lKGNzcy5yb290KSwgJ2JhZGdlJ10sIGNzc0NsYXNzZXMsIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgaHJlZjogaHJlZixcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcclxuICAgICAgICB9LCBjaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgQmFkZ2VCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWJhZGdlJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGVhcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgJ3BpbGwnLFxyXG4gICAgICAgICAgICAgICAgJ2hyZWYnLFxyXG4gICAgICAgICAgICAgICAgJ3RhcmdldCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIEJhZGdlQmFzZSk7XHJcbiAgICByZXR1cm4gQmFkZ2VCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkJhZGdlQmFzZSA9IEJhZGdlQmFzZTtcclxudmFyIEJhZGdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQmFkZ2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCYWRnZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQmFkZ2U7XHJcbn0oQmFkZ2VCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEJhZGdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2JhZGdlL3N0eWxlcy9iYWRnZS5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfM2txaUNNMHBcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9iYWRnZVwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYmFkZ2Uvc3R5bGVzL2JhZGdlLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9iYWRnZS9zdHlsZXMvYmFkZ2UubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvYnV0dG9uLm0uY3NzXCIpO1xyXG5leHBvcnRzLnNpemVNYXAgPSB7XHJcbiAgICBsYXJnZTogJ2J0bi1sZycsXHJcbiAgICBzbWFsbDogJ2J0bi1zbScsXHJcbiAgICBkZWZhdWx0OiAnJ1xyXG59O1xyXG5leHBvcnRzLnRhcmdldE1hcCA9IHtcclxuICAgIHNlbGY6ICdfc2VsZicsXHJcbiAgICBibGFuazogJ19ibGFuaydcclxufTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgQnV0dG9uQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEJ1dHRvbkJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCdXR0b25CYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEJ1dHRvbkJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2J1dHRvbic7XHJcbiAgICB9O1xyXG4gICAgQnV0dG9uQmFzZS5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMub25DbGljayAmJiB0aGlzLnByb3BlcnRpZXMub25DbGljaygpO1xyXG4gICAgfTtcclxuICAgIEJ1dHRvbkJhc2UucHJvdG90eXBlLnJlbmRlckNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgdmFsdWUgPSBfYS52YWx1ZSwgdmFsdWVQb3NpdGlvbiA9IF9hLnZhbHVlUG9zaXRpb247XHJcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdmFsdWVQb3NpdGlvbiB8fCB2YWx1ZVBvc2l0aW9uID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLmNoaWxkcmVuLCBbdmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlUG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHNsaWJfMS5fX3NwcmVhZChbdmFsdWVdLCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlUG9zaXRpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIGRfMS52KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZC1ibG9jayddXHJcbiAgICAgICAgICAgICAgICB9LCBbdmFsdWVdKVxyXG4gICAgICAgICAgICBdLCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlUG9zaXRpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fc3ByZWFkKHRoaXMuY2hpbGRyZW4sIFtcclxuICAgICAgICAgICAgICAgIGRfMS52KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZC1ibG9jayddXHJcbiAgICAgICAgICAgICAgICB9LCBbdmFsdWVdKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRzbGliXzEuX19zcHJlYWQodGhpcy5jaGlsZHJlbiwgW3ZhbHVlXSk7XHJcbiAgICB9O1xyXG4gICAgQnV0dG9uQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgYXBwZWFyYW5jZSA9IF9hLmFwcGVhcmFuY2UsIHNpemUgPSBfYS5zaXplLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCB0eXBlID0gX2EudHlwZSwgZmx1aWQgPSBfYS5mbHVpZCwgYWN0aXZlID0gX2EuYWN0aXZlLCBocmVmID0gX2EuaHJlZiwgdGFyZ2V0ID0gX2EudGFyZ2V0LCBfYiA9IF9hLmlzTGlzdEl0ZW0sIGlzTGlzdEl0ZW0gPSBfYiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYjtcclxuICAgICAgICB2YXIgc2l6ZUNsYXNzID0gZXhwb3J0cy5zaXplTWFwW3NpemVdO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gZXhwb3J0cy50YXJnZXRNYXBbdGFyZ2V0XSB8fCB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucmVuZGVyQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAoaHJlZikge1xyXG4gICAgICAgICAgICAvLyDkvb/nlKhh5qCH562+XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignYScsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgIGhyZWY6IFwiXCIgKyBocmVmLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBpc0xpc3RJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGlzdC1ncm91cC1pdGVtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbS1hY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0JyA/IFwibGlzdC1ncm91cC1pdGVtLVwiICsgYXBwZWFyYW5jZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID09PSB0cnVlIHx8IGFjdGl2ZSA9PT0gJ3RydWUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImJ0bi1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVDbGFzcyAhPT0gJycgPyBzaXplQ2xhc3MgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdWlkID09PSB0cnVlIHx8IGZsdWlkID09PSAndHJ1ZScgPyAnYnRuLWJsb2NrJyA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID09PSB0cnVlIHx8IGFjdGl2ZSA9PT0gJ3RydWUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcm9sZTogJ2J1dHRvbidcclxuICAgICAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS52KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBpc0xpc3RJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGlzdC1ncm91cC1pdGVtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbS1hY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0JyA/IFwibGlzdC1ncm91cC1pdGVtLVwiICsgYXBwZWFyYW5jZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID09PSB0cnVlIHx8IGFjdGl2ZSA9PT0gJ3RydWUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSAmJiBhcHBlYXJhbmNlICE9PSAnZGVmYXVsdCcgPyBcImJ0bi1cIiArIGFwcGVhcmFuY2UgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVDbGFzcyAhPT0gJycgPyBzaXplQ2xhc3MgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdWlkID09PSB0cnVlIHx8IGZsdWlkID09PSAndHJ1ZScgPyAnYnRuLWJsb2NrJyA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID09PSB0cnVlIHx8IGFjdGl2ZSA9PT0gJ3RydWUnID8gJ2FjdGl2ZScgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgb25jbGljazogdGhpcy5fb25DbGlja1xyXG4gICAgICAgICAgICB9LCBjaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEJ1dHRvbkJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItYnV0dG9uJyxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWVQb3NpdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYXBwZWFyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAnc2l6ZScsXHJcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsdWlkJyxcclxuICAgICAgICAgICAgICAgICdhY3RpdmUnLFxyXG4gICAgICAgICAgICAgICAgJ2hyZWYnLFxyXG4gICAgICAgICAgICAgICAgJ3RhcmdldCcsXHJcbiAgICAgICAgICAgICAgICAnaXNMaXN0SXRlbSdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogWydvbkNsaWNrJ11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBCdXR0b25CYXNlKTtcclxuICAgIHJldHVybiBCdXR0b25CYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkJ1dHRvbkJhc2UgPSBCdXR0b25CYXNlO1xyXG52YXIgQnV0dG9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBCdXR0b247XHJcbn0oQnV0dG9uQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL3N0eWxlcy9idXR0b24ubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzFQaUZRV0pyXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvYnV0dG9uXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9idXR0b24vc3R5bGVzL2J1dHRvbi5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvYnV0dG9uL3N0eWxlcy9idXR0b24ubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBzdHJpbmdfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL3N0cmluZ1wiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9jYXJkLm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBDYXJkQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKENhcmRCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ2FyZEJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgQ2FyZEJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2NhcmQnO1xyXG4gICAgfTtcclxuICAgIENhcmRCYXNlLnByb3RvdHlwZS5fZ2V0U3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBjc3NTdHlsZXMgPSB7fTtcclxuICAgICAgICBpZiAod2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aWR0aCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmluZ18xLmVuZHNXaXRoKHdpZHRoLCAnJScpIHx8IHdpZHRoID09PSAnYXV0bycpIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhlaWdodCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyaW5nXzEuZW5kc1dpdGgoaGVpZ2h0LCAnJScpIHx8IGhlaWdodCA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3NzU3R5bGVzO1xyXG4gICAgfTtcclxuICAgIENhcmRCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHdpZGdldElkID0gdGhpcy5wcm9wZXJ0aWVzLndpZGdldElkO1xyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdjYXJkJ1xyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRDb2xvcnNDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRCb3JkZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRzbGliXzEuX19hc3NpZ24oe30sIHV0aWxfMS5nZXRUZXh0U3R5bGVzKHRoaXMucHJvcGVydGllcyksIHRoaXMuX2dldFN0eWxlcygpKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIENhcmRCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWNhcmQnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckNvbG9yJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJSb3VuZCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250V2VpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250SXRhbGljJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25tZW50JyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ3RydW5jYXRlJyxcclxuICAgICAgICAgICAgICAgICd3cmFwJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBDYXJkQmFzZSk7XHJcbiAgICByZXR1cm4gQ2FyZEJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuQ2FyZEJhc2UgPSBDYXJkQmFzZTtcclxudmFyIENhcmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDYXJkLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ2FyZCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ2FyZDtcclxufShDYXJkQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBDYXJkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NhcmQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NhcmQvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL3N0eWxlcy9jYXJkLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jYXJkL3N0eWxlcy9jYXJkLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzFYajEzdDhIXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvY2FyZFwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2FyZC9zdHlsZXMvY2FyZC5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV1aWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL3V1aWRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvY2hlY2tib3gubS5jc3NcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4uL2xhYmVsXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBDaGVja2JveEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDaGVja2JveEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDaGVja2JveEJhc2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fdXVpZCA9IHV1aWRfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ2hlY2tib3hCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdjaGVja2JveCc7XHJcbiAgICB9O1xyXG4gICAgQ2hlY2tib3hCYXNlLnByb3RvdHlwZS5yZW5kZXJDaGVja2JveCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWUsIGNoZWNrZWQgPSBfYS5jaGVja2VkLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCByZWFkT25seSA9IF9hLnJlYWRPbmx5O1xyXG4gICAgICAgIHZhciBjc3NDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCA9PT0gdHJ1ZSB8fCBjaGVja2VkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogcmVxdWlyZWQgPT09IHRydWUgfHwgcmVxdWlyZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHJlYWRPbmx5ID09PSB0cnVlIHx8IHJlYWRPbmx5ID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsnZm9ybS1jaGVjay1pbnB1dCddXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQ2hlY2tib3hCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIGxhYmVsID0gX2EubGFiZWwsIHNpemUgPSBfYS5zaXplLCBsYWJlbEFmdGVyID0gX2EubGFiZWxBZnRlciwgZmx1aWQgPSBfYS5mbHVpZCwgZGlzcGxheSA9IF9hLmRpc3BsYXksIHZhbHVlID0gX2EudmFsdWUsIGNoZWNrZWQgPSBfYS5jaGVja2VkLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCByZWFkT25seSA9IF9hLnJlYWRPbmx5LCBfYyA9IF9hLmlzSW5BZGRvbiwgaXNJbkFkZG9uID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2M7XHJcbiAgICAgICAgaWYgKGlzSW5BZGRvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkID09PSB0cnVlIHx8IGNoZWNrZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHJlcXVpcmVkID09PSB0cnVlIHx8IHJlcXVpcmVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogcmVhZE9ubHkgPT09IHRydWUgfHwgcmVhZE9ubHkgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPyB1dGlsXzEuZm9ybVNpemVNYXBbc2l6ZV0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KCksXHJcbiAgICAgICAgICAgIGxhYmVsID8gZF8xLncobGFiZWxfMS5kZWZhdWx0LCB7IHZhbHVlOiBsYWJlbCwgZm9ySWQ6IHdpZGdldElkLCBjbGFzc2VzOiAnZm9ybS1jaGVjay1sYWJlbCcgfSkgOiBudWxsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAobGFiZWxBZnRlciA9PT0gZmFsc2UgfHwgbGFiZWxBZnRlciA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh1dGlsXzEucmVuZGVyTWVzc2FnZU5vZGUodGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdmb3JtLWNoZWNrJyxcclxuICAgICAgICAgICAgICAgIHNpemUgPyB1dGlsXzEuZm9ybVNpemVNYXBbc2l6ZV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnID8gdW5kZWZpbmVkIDogJ2Zvcm0tY2hlY2staW5saW5lJ1xyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIENoZWNrYm94QmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1jaGVja2JveCcsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ2NoZWNrZWQnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdsYWJlbEFmdGVyJyxcclxuICAgICAgICAgICAgICAgICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgJ3JlYWRPbmx5JyxcclxuICAgICAgICAgICAgICAgICdmbHVpZCcsXHJcbiAgICAgICAgICAgICAgICAnc2l6ZScsXHJcbiAgICAgICAgICAgICAgICAnaW52YWxpZE1lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAnaXNJbkFkZG9uJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2Zsb2F0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIENoZWNrYm94QmFzZSk7XHJcbiAgICByZXR1cm4gQ2hlY2tib3hCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkNoZWNrYm94QmFzZSA9IENoZWNrYm94QmFzZTtcclxudmFyIENoZWNrYm94ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ2hlY2tib3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDaGVja2JveCgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ2hlY2tib3g7XHJcbn0oQ2hlY2tib3hCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IENoZWNrYm94O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NoZWNrYm94L3N0eWxlcy9jaGVja2JveC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMkk3TDdIbDZcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9jaGVja2JveFwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY2hlY2tib3gvc3R5bGVzL2NoZWNrYm94Lm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jaGVja2JveC9zdHlsZXMvY2hlY2tib3gubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vYmFzZS5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29tbW9uL2Jhc2UubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vYmFzZS5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1widGV4dERlY29yYXRpb25VbmRlcmxpbmVcIjpcIl8xRFVyWGdtWFwiLFwidGV4dERlY29yYXRpb25MaW5lVGhyb3VnaFwiOlwiVW5feThKbVRcIixcInRleHREZWNvcmF0aW9uT3ZlcmxpbmVcIjpcIl8yQTF0bEE2WVwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2Jhc2VcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbW1vbi9iYXNlLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vYmFzZS5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9iYXNlLm0uY3NzXCIpO1xyXG5mdW5jdGlvbiBnZXRTcGFjaW5nQ2xhc3Nlcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgbWFyZ2luVG9wID0gcHJvcGVydGllcy5tYXJnaW5Ub3AsIG1hcmdpbkJvdHRvbSA9IHByb3BlcnRpZXMubWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0ID0gcHJvcGVydGllcy5tYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCA9IHByb3BlcnRpZXMubWFyZ2luUmlnaHQsIHBhZGRpbmdUb3AgPSBwcm9wZXJ0aWVzLnBhZGRpbmdUb3AsIHBhZGRpbmdCb3R0b20gPSBwcm9wZXJ0aWVzLnBhZGRpbmdCb3R0b20sIHBhZGRpbmdMZWZ0ID0gcHJvcGVydGllcy5wYWRkaW5nTGVmdCwgcGFkZGluZ1JpZ2h0ID0gcHJvcGVydGllcy5wYWRkaW5nUmlnaHQ7XHJcbiAgICB2YXIgc3BhY2luZ0NsYXNzZXMgPSBbXTtcclxuICAgIGlmIChtYXJnaW5Ub3AgJiZcclxuICAgICAgICBtYXJnaW5Ub3AgIT0gJ2RlZmF1bHQnICYmXHJcbiAgICAgICAgbWFyZ2luVG9wID09PSBtYXJnaW5Cb3R0b20gJiZcclxuICAgICAgICBtYXJnaW5Ub3AgPT09IG1hcmdpbkxlZnQgJiZcclxuICAgICAgICBtYXJnaW5Ub3AgPT09IG1hcmdpblJpZ2h0KSB7XHJcbiAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcIm0tXCIgKyBtYXJnaW5Ub3ApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKG1hcmdpblRvcCAmJiBtYXJnaW5Ub3AgIT0gJ2RlZmF1bHQnICYmIG1hcmdpblRvcCA9PT0gbWFyZ2luQm90dG9tKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJteS1cIiArIG1hcmdpblRvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobWFyZ2luVG9wICYmIG1hcmdpblRvcCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJtdC1cIiArIG1hcmdpblRvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hcmdpbkJvdHRvbSAmJiBtYXJnaW5Cb3R0b20gIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwibWItXCIgKyBtYXJnaW5Cb3R0b20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXJnaW5MZWZ0ICYmIG1hcmdpbkxlZnQgIT0gJ2RlZmF1bHQnICYmIG1hcmdpbkxlZnQgPT09IG1hcmdpblJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJteC1cIiArIG1hcmdpbkxlZnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG1hcmdpbkxlZnQgJiYgbWFyZ2luTGVmdCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJtbC1cIiArIG1hcmdpbkxlZnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXJnaW5SaWdodCAmJiBtYXJnaW5SaWdodCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJtci1cIiArIG1hcmdpblJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYWRkaW5nVG9wICYmXHJcbiAgICAgICAgcGFkZGluZ1RvcCAhPSAnZGVmYXVsdCcgJiZcclxuICAgICAgICBwYWRkaW5nVG9wID09PSBwYWRkaW5nQm90dG9tICYmXHJcbiAgICAgICAgcGFkZGluZ1RvcCA9PT0gcGFkZGluZ0xlZnQgJiZcclxuICAgICAgICBwYWRkaW5nVG9wID09PSBwYWRkaW5nUmlnaHQpIHtcclxuICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicC1cIiArIHBhZGRpbmdUb3ApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhZGRpbmdUb3AgJiYgcGFkZGluZ1RvcCAhPSAnZGVmYXVsdCcgJiYgcGFkZGluZ1RvcCA9PT0gcGFkZGluZ0JvdHRvbSkge1xyXG4gICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicHktXCIgKyBwYWRkaW5nVG9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwYWRkaW5nVG9wICYmIHBhZGRpbmdUb3AgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nQ2xhc3Nlcy5wdXNoKFwicHQtXCIgKyBwYWRkaW5nVG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFkZGluZ0JvdHRvbSAmJiBwYWRkaW5nQm90dG9tICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgc3BhY2luZ0NsYXNzZXMucHVzaChcInBiLVwiICsgcGFkZGluZ0JvdHRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZGRpbmdMZWZ0ICYmIHBhZGRpbmdMZWZ0ICE9ICdkZWZhdWx0JyAmJiBwYWRkaW5nTGVmdCA9PT0gcGFkZGluZ1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJweC1cIiArIHBhZGRpbmdMZWZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwYWRkaW5nTGVmdCAmJiBwYWRkaW5nTGVmdCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJwbC1cIiArIHBhZGRpbmdMZWZ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFkZGluZ1JpZ2h0ICYmIHBhZGRpbmdSaWdodCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdDbGFzc2VzLnB1c2goXCJwci1cIiArIHBhZGRpbmdSaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3BhY2luZ0NsYXNzZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRTcGFjaW5nQ2xhc3NlcyA9IGdldFNwYWNpbmdDbGFzc2VzO1xyXG5mdW5jdGlvbiBnZXRGbGV4Q29udGFpbmVyQ2xhc3Nlcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgZmxleERpcmVjdGlvbiA9IHByb3BlcnRpZXMuZmxleERpcmVjdGlvbiwgcmV2ZXJzZSA9IHByb3BlcnRpZXMucmV2ZXJzZSwganVzdGlmeUl0ZW1zID0gcHJvcGVydGllcy5qdXN0aWZ5SXRlbXMsIGFsaWduSXRlbXMgPSBwcm9wZXJ0aWVzLmFsaWduSXRlbXMsIGZsZXhXcmFwID0gcHJvcGVydGllcy5mbGV4V3JhcCwgYWxpZ25Db250ZW50ID0gcHJvcGVydGllcy5hbGlnbkNvbnRlbnQ7XHJcbiAgICB2YXIgZmxleENvbnRhaW5lckNsYXNzZXMgPSBbXTtcclxuICAgIGlmIChmbGV4RGlyZWN0aW9uICYmIGZsZXhEaXJlY3Rpb24gIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgaWYgKHJldmVyc2UgPT09IHRydWUgfHwgcmV2ZXJzZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzLnB1c2goXCJmbGV4LVwiICsgZmxleERpcmVjdGlvbiArIFwiLXJldmVyc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3Nlcy5wdXNoKFwiZmxleC1cIiArIGZsZXhEaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqdXN0aWZ5SXRlbXMgJiYganVzdGlmeUl0ZW1zICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzLnB1c2goXCJqdXN0aWZ5LWNvbnRlbnQtXCIgKyBqdXN0aWZ5SXRlbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsaWduSXRlbXMgJiYgYWxpZ25JdGVtcyAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3Nlcy5wdXNoKFwiYWxpZ24taXRlbXMtXCIgKyBhbGlnbkl0ZW1zKTtcclxuICAgIH1cclxuICAgIGlmIChmbGV4V3JhcCAmJiBmbGV4V3JhcCAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICBpZiAoZmxleFdyYXAgPT0gJ3JldmVyc2VXcmFwJykge1xyXG4gICAgICAgICAgICBmbGV4Q29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdmbGV4LXdyYXAtcmV2ZXJzZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMucHVzaChcImZsZXgtXCIgKyBmbGV4V3JhcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGFsaWduQ29udGVudCAmJiBhbGlnbkNvbnRlbnQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMucHVzaChcImFsaWduLWNvbnRlbnQtXCIgKyBhbGlnbkNvbnRlbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZsZXhDb250YWluZXJDbGFzc2VzO1xyXG59XHJcbmV4cG9ydHMuZ2V0RmxleENvbnRhaW5lckNsYXNzZXMgPSBnZXRGbGV4Q29udGFpbmVyQ2xhc3NlcztcclxuZnVuY3Rpb24gZ2V0RmxleEl0ZW1DbGFzc2VzKHByb3BlcnRpZXMpIHtcclxuICAgIHZhciBhbGlnblNlbGYgPSBwcm9wZXJ0aWVzLmFsaWduU2VsZiwgb3JkZXIgPSBwcm9wZXJ0aWVzLm9yZGVyO1xyXG4gICAgdmFyIGZsZXhJdGVtQ2xhc3NlcyA9IFtdO1xyXG4gICAgaWYgKGFsaWduU2VsZiAmJiBhbGlnblNlbGYgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgZmxleEl0ZW1DbGFzc2VzLnB1c2goXCJhbGlnbi1zZWxmLVwiICsgYWxpZ25TZWxmKTtcclxuICAgIH1cclxuICAgIGlmICgob3JkZXIgJiYgb3JkZXIgIT0gJ2RlZmF1bHQnKSB8fCBvcmRlciA9PT0gMCkge1xyXG4gICAgICAgIGZsZXhJdGVtQ2xhc3Nlcy5wdXNoKFwib3JkZXItXCIgKyBvcmRlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmxleEl0ZW1DbGFzc2VzO1xyXG59XHJcbmV4cG9ydHMuZ2V0RmxleEl0ZW1DbGFzc2VzID0gZ2V0RmxleEl0ZW1DbGFzc2VzO1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJDbGFzc2VzKHByb3BlcnRpZXMpIHtcclxuICAgIHZhciBib3JkZXJMZWZ0ID0gcHJvcGVydGllcy5ib3JkZXJMZWZ0LCBib3JkZXJUb3AgPSBwcm9wZXJ0aWVzLmJvcmRlclRvcCwgYm9yZGVyUmlnaHQgPSBwcm9wZXJ0aWVzLmJvcmRlclJpZ2h0LCBib3JkZXJCb3R0b20gPSBwcm9wZXJ0aWVzLmJvcmRlckJvdHRvbSwgYm9yZGVyQ29sb3IgPSBwcm9wZXJ0aWVzLmJvcmRlckNvbG9yLCBib3JkZXJSb3VuZCA9IHByb3BlcnRpZXMuYm9yZGVyUm91bmQ7XHJcbiAgICB2YXIgYm9yZGVyQ2xhc3NlcyA9IFtdO1xyXG4gICAgaWYgKGJvcmRlckxlZnQgPT09IHRydWUgfHwgYm9yZGVyTGVmdCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgYm9yZGVyQ2xhc3Nlcy5wdXNoKCdib3JkZXItbGVmdCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlclRvcCA9PT0gdHJ1ZSB8fCBib3JkZXJUb3AgPT09ICd0cnVlJykge1xyXG4gICAgICAgIGJvcmRlckNsYXNzZXMucHVzaCgnYm9yZGVyLXRvcCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlclJpZ2h0ID09PSB0cnVlIHx8IGJvcmRlclJpZ2h0ID09PSAndHJ1ZScpIHtcclxuICAgICAgICBib3JkZXJDbGFzc2VzLnB1c2goJ2JvcmRlci1yaWdodCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlckJvdHRvbSA9PT0gdHJ1ZSB8fCBib3JkZXJCb3R0b20gPT09ICd0cnVlJykge1xyXG4gICAgICAgIGJvcmRlckNsYXNzZXMucHVzaCgnYm9yZGVyLWJvdHRvbScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlckNsYXNzZXMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgYm9yZGVyQ2xhc3NlcyA9IFsnYm9yZGVyJ107XHJcbiAgICB9XHJcbiAgICBpZiAoYm9yZGVyQ29sb3IgJiYgYm9yZGVyQ29sb3IgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgYm9yZGVyQ2xhc3Nlcy5wdXNoKFwiYm9yZGVyLVwiICsgYm9yZGVyQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJvcmRlclJvdW5kKSB7XHJcbiAgICAgICAgaWYgKGJvcmRlclJvdW5kID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgYm9yZGVyQ2xhc3Nlcy5wdXNoKCdyb3VuZGVkLTAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYm9yZGVyUm91bmQgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIGJvcmRlckNsYXNzZXMucHVzaCgncm91bmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYm9yZGVyQ2xhc3Nlcy5wdXNoKFwicm91bmRlZC1cIiArIGJvcmRlclJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9yZGVyQ2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldEJvcmRlckNsYXNzZXMgPSBnZXRCb3JkZXJDbGFzc2VzO1xyXG5mdW5jdGlvbiBnZXRUZXh0Q2xhc3Nlcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgZm9udFdlaWdodCA9IHByb3BlcnRpZXMuZm9udFdlaWdodCwgZm9udEl0YWxpYyA9IHByb3BlcnRpZXMuZm9udEl0YWxpYywgYWxpZ25tZW50ID0gcHJvcGVydGllcy5hbGlnbm1lbnQsIHRyYW5zZm9ybSA9IHByb3BlcnRpZXMudHJhbnNmb3JtLCB0cnVuY2F0ZSA9IHByb3BlcnRpZXMudHJ1bmNhdGUsIHdyYXAgPSBwcm9wZXJ0aWVzLndyYXA7XHJcbiAgICB2YXIgdGV4dENsYXNzZXMgPSBbXTtcclxuICAgIGlmIChmb250V2VpZ2h0ICYmIGZvbnRXZWlnaHQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaChcImZvbnQtd2VpZ2h0LVwiICsgZm9udFdlaWdodCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZm9udEl0YWxpYyA9PT0gdHJ1ZSB8fCBmb250SXRhbGljID09PSAndHJ1ZScpIHtcclxuICAgICAgICB0ZXh0Q2xhc3Nlcy5wdXNoKCdmb250LWl0YWxpYycpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsaWdubWVudCAmJiBhbGlnbm1lbnQgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaChcInRleHQtXCIgKyBhbGlnbm1lbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0gIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaChcInRleHQtXCIgKyB0cmFuc2Zvcm0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRydW5jYXRlICYmIHRydW5jYXRlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIHRleHRDbGFzc2VzLnB1c2goJ3RleHQtdHJ1bmNhdGUnKTtcclxuICAgIH1cclxuICAgIGlmICh3cmFwKSB7XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaCgndGV4dC1ub3dyYXAnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0Q2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldFRleHRDbGFzc2VzID0gZ2V0VGV4dENsYXNzZXM7XHJcbmZ1bmN0aW9uIGdldFRleHRTdHlsZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIHRydW5jYXRlID0gcHJvcGVydGllcy50cnVuY2F0ZSwgd3JhcCA9IHByb3BlcnRpZXMud3JhcDtcclxuICAgIHZhciB0ZXh0U3R5bGVzID0ge307XHJcbiAgICBpZiAodHJ1bmNhdGUgJiYgdHJ1bmNhdGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0cnVuY2F0ZSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0ZXh0U3R5bGVzLm1heFdpZHRoID0gdHJ1bmNhdGUgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0U3R5bGVzLm1heFdpZHRoID0gXCJcIiArIHRydW5jYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh3cmFwKSB7XHJcbiAgICAgICAgdGV4dFN0eWxlcy53aWR0aCA9IHdyYXAgKyBcInJlbVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHRTdHlsZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRUZXh0U3R5bGVzID0gZ2V0VGV4dFN0eWxlcztcclxuZXhwb3J0cy50ZXh0RGVjb3JhdGlvbk1hcCA9IHtcclxuICAgIHVuZGVybGluZTogJ3RleHREZWNvcmF0aW9uVW5kZXJsaW5lJyxcclxuICAgIG92ZXJsaW5lOiAndGV4dERlY29yYXRpb25PdmVybGluZScsXHJcbiAgICBsaW5lVGhyb3VnaDogJ3RleHREZWNvcmF0aW9uTGluZVRocm91Z2gnLFxyXG4gICAgZGVmYXVsdDogJydcclxufTtcclxuZnVuY3Rpb24gZ2V0VGV4dERlY29yYXRpb25DbGFzcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgdGV4dERlY29yYXRpb24gPSBwcm9wZXJ0aWVzLnRleHREZWNvcmF0aW9uO1xyXG4gICAgdmFyIHRleHRDbGFzc2VzID0gW107XHJcbiAgICBpZiAodGV4dERlY29yYXRpb24gJiYgdGV4dERlY29yYXRpb24gIT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIHZhciB0ZXh0RGVjb3JhdGlvbkNsYXNzID0gZXhwb3J0cy50ZXh0RGVjb3JhdGlvbk1hcFt0ZXh0RGVjb3JhdGlvbl07XHJcbiAgICAgICAgdGV4dENsYXNzZXMucHVzaChjc3NbdGV4dERlY29yYXRpb25DbGFzc10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHRDbGFzc2VzO1xyXG59XHJcbmV4cG9ydHMuZ2V0VGV4dERlY29yYXRpb25DbGFzcyA9IGdldFRleHREZWNvcmF0aW9uQ2xhc3M7XHJcbmZ1bmN0aW9uIGdldENvbG9yc0NsYXNzZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIHRleHRDb2xvciA9IHByb3BlcnRpZXMudGV4dENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IgPSBwcm9wZXJ0aWVzLmJhY2tncm91bmRDb2xvcjtcclxuICAgIHZhciBjb2xvcnNDbGFzc2VzID0gW107XHJcbiAgICBpZiAodGV4dENvbG9yICYmIHRleHRDb2xvciAhPT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgY29sb3JzQ2xhc3Nlcy5wdXNoKFwidGV4dC1cIiArIHRleHRDb2xvcik7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yICYmIGJhY2tncm91bmRDb2xvciAhPT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgY29sb3JzQ2xhc3Nlcy5wdXNoKFwiYmctXCIgKyBiYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbG9yc0NsYXNzZXM7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xvcnNDbGFzc2VzID0gZ2V0Q29sb3JzQ2xhc3NlcztcclxuZnVuY3Rpb24gZ2V0RmxvYXRDbGFzcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgZmxvYXQgPSBwcm9wZXJ0aWVzLmZsb2F0O1xyXG4gICAgdmFyIGZsb2F0Q2xhc3NlcyA9IFtdO1xyXG4gICAgaWYgKGZsb2F0ICYmIGZsb2F0ICE9PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICBmbG9hdENsYXNzZXMucHVzaChcImZsb2F0LVwiICsgZmxvYXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZsb2F0Q2xhc3NlcztcclxufVxyXG5leHBvcnRzLmdldEZsb2F0Q2xhc3MgPSBnZXRGbG9hdENsYXNzO1xyXG5mdW5jdGlvbiByZW5kZXJNZXNzYWdlTm9kZShwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgaW52YWxpZE1lc3NhZ2UgPSBwcm9wZXJ0aWVzLmludmFsaWRNZXNzYWdlLCB2YWxpZE1lc3NhZ2UgPSBwcm9wZXJ0aWVzLnZhbGlkTWVzc2FnZTtcclxuICAgIGlmICghaW52YWxpZE1lc3NhZ2UgJiYgIXZhbGlkTWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgY2xhc3NlczogW2ludmFsaWRNZXNzYWdlID8gJ2ludmFsaWQtdG9vbHRpcCcgOiB2YWxpZE1lc3NhZ2UgPyAndmFsaWQtdG9vbHRpcCcgOiAnJ11cclxuICAgIH0sIFtpbnZhbGlkTWVzc2FnZSA/IGludmFsaWRNZXNzYWdlIDogdmFsaWRNZXNzYWdlID8gdmFsaWRNZXNzYWdlIDogJyddKTtcclxufVxyXG5leHBvcnRzLnJlbmRlck1lc3NhZ2VOb2RlID0gcmVuZGVyTWVzc2FnZU5vZGU7XHJcbmV4cG9ydHMuZm9ybVNpemVNYXAgPSB7XHJcbiAgICBzbWFsbDogJ2Zvcm0tY29udHJvbC1zbScsXHJcbiAgICBsYXJnZTogJ2Zvcm0tY29udHJvbC1sZycsXHJcbiAgICBkZWZhdWx0OiAnJ1xyXG59O1xyXG5leHBvcnRzLmRpc3BsYXlNYXAgPSB7XHJcbiAgICBub25lOiAnZC1ub25lJyxcclxuICAgIGlubGluZTogJ2QtaW5saW5lJyxcclxuICAgIGlubGluZUJsb2NrOiAnZC1pbmxpbmUtYmxvY2snLFxyXG4gICAgYmxvY2s6ICdkLWJsb2NrJyxcclxuICAgIHRhYmxlOiAnZC10YWJsZScsXHJcbiAgICB0YWJsZUNlbGw6ICdkLXRhYmxlLWNlbGwnLFxyXG4gICAgdGFibGVSb3c6ICdkLXRhYmxlLXJvdycsXHJcbiAgICBmbGV4OiAnZC1mbGV4JyxcclxuICAgIGlubGluZUZsZXg6ICdkLWlubGluZS1mbGV4JyxcclxuICAgIGRlZmF1bHQ6ICcnXHJcbn07XHJcbmZ1bmN0aW9uIGdldERpc3BsYXlDbGFzcyhwcm9wZXJ0aWVzKSB7XHJcbiAgICB2YXIgZGlzcGxheSA9IHByb3BlcnRpZXMuZGlzcGxheTtcclxuICAgIHJldHVybiBleHBvcnRzLmRpc3BsYXlNYXBbZGlzcGxheV0gfHwgdW5kZWZpbmVkO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGlzcGxheUNsYXNzID0gZ2V0RGlzcGxheUNsYXNzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbW1vbi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb21tb24vdXRpbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL3JlZ2lzdGVyQ3VzdG9tRWxlbWVudFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9jb250YWluZXIubS5jc3NcIik7XHJcbnZhciBzdHJpbmdfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL3N0cmluZ1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgQ29udGFpbmVyQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKENvbnRhaW5lckJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDb250YWluZXJCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIENvbnRhaW5lckJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2NvbnRhaW5lcic7XHJcbiAgICB9O1xyXG4gICAgQ29udGFpbmVyQmFzZS5wcm90b3R5cGUuX2dldE1heFdpZHRoU3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtYXhXaWR0aCA9IHRoaXMucHJvcGVydGllcy5tYXhXaWR0aDtcclxuICAgICAgICB2YXIgbWF4V2lkdGhTdHlsZXMgPSB7fTtcclxuICAgICAgICBpZiAobWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXhXaWR0aCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGhTdHlsZXMubWF4V2lkdGggPSBtYXhXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJpbmdfMS5lbmRzV2l0aChtYXhXaWR0aCwgJyUnKSkge1xyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGhTdHlsZXMubWF4V2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4V2lkdGhTdHlsZXM7XHJcbiAgICB9O1xyXG4gICAgQ29udGFpbmVyQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZmx1aWQgPSBfYS5mbHVpZDtcclxuICAgICAgICB2YXIgY3NzQ2xhc3MgPSBmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnID8gJ2NvbnRhaW5lci1mbHVpZCcgOiAnY29udGFpbmVyJztcclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFt0aGlzLnRoZW1lKGNzcy5yb290KSwgY3NzQ2xhc3NdLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuX2dldE1heFdpZHRoU3R5bGVzKClcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBDb250YWluZXJCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ3dpZGdldElkJywgJ2ZsdWlkJywgJ21heFdpZHRoJ10sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgQ29udGFpbmVyQmFzZSk7XHJcbiAgICByZXR1cm4gQ29udGFpbmVyQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5Db250YWluZXJCYXNlID0gQ29udGFpbmVyQmFzZTtcclxudmFyIENvbnRhaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENvbnRhaW5lcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ29udGFpbmVyO1xyXG59KENvbnRhaW5lckJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ29udGFpbmVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29udGFpbmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29udGFpbmVyL3N0eWxlcy9jb250YWluZXIubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2NvbnRhaW5lci9zdHlsZXMvY29udGFpbmVyLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29udGFpbmVyL3N0eWxlcy9jb250YWluZXIubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcInh3cklBWWNhXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvY29udGFpbmVyXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9jb250YWluZXIvc3R5bGVzL2NvbnRhaW5lci5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvY29udGFpbmVyL3N0eWxlcy9jb250YWluZXIubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvZm9vdGVyLm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBGb290ZXJCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoRm9vdGVyQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZvb3RlckJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgRm9vdGVyQmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnZm9vdGVyJztcclxuICAgIH07XHJcbiAgICBGb290ZXJCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICB2YXIgZmxleENvbnRhaW5lckNsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZGlzcGxheSAmJiAoZGlzcGxheSA9PT0gJ2ZsZXgnIHx8IGRpc3BsYXkgPT09ICdpbmxpbmVGbGV4JykpIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMgPSB1dGlsXzEuZ2V0RmxleENvbnRhaW5lckNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dENsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHREZWNvcmF0aW9uQ2xhc3ModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcyksXHJcbiAgICAgICAgICAgIHN0eWxlczogdXRpbF8xLmdldFRleHRTdHlsZXModGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIEZvb3RlckJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItZm9vdGVyJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250V2VpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250SXRhbGljJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25tZW50JyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ3RydW5jYXRlJyxcclxuICAgICAgICAgICAgICAgICd3cmFwJyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdmbGV4RGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICdyZXZlcnNlJyxcclxuICAgICAgICAgICAgICAgICdqdXN0aWZ5SXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduSXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhXcmFwJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkNvbnRlbnQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgRm9vdGVyQmFzZSk7XHJcbiAgICByZXR1cm4gRm9vdGVyQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5Gb290ZXJCYXNlID0gRm9vdGVyQmFzZTtcclxudmFyIEZvb3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZvb3RlcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRm9vdGVyO1xyXG59KEZvb3RlckJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gRm9vdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZm9vdGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZm9vdGVyL3N0eWxlcy9mb290ZXIubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZm9vdGVyL3N0eWxlcy9mb290ZXIubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xQTVvNDdVMVwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2Zvb3RlclwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZm9vdGVyL3N0eWxlcy9mb290ZXIubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2Zvb3Rlci9zdHlsZXMvZm9vdGVyLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBHcmlkQ29sdW1uQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEdyaWRDb2x1bW5CYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR3JpZENvbHVtbkJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgR3JpZENvbHVtbkJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2dyaWQtY29sdW1uJztcclxuICAgIH07XHJcbiAgICBHcmlkQ29sdW1uQmFzZS5wcm90b3R5cGUuX2dldENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBvZmZzZXQgPSBfYS5vZmZzZXQsIGNvbHNwYW4gPSBfYS5jb2xzcGFuO1xyXG4gICAgICAgIHZhciBjc3NDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGNvbHNwYW4gJiYgY29sc3BhbiAhPT0gJ2RlZmF1bHQnICYmIGNvbHNwYW4gIT09IDEpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKFwiY29sLVwiICsgY29sc3Bhbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ2NvbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKG9mZnNldCAmJiBvZmZzZXQgIT09ICdkZWZhdWx0JykgfHwgb2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaChcIm9mZnNldC1cIiArIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xyXG4gICAgfTtcclxuICAgIEdyaWRDb2x1bW5CYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICB2YXIgZmxleENvbnRhaW5lckNsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZGlzcGxheSAmJiAoZGlzcGxheSA9PT0gJ2ZsZXgnIHx8IGRpc3BsYXkgPT09ICdpbmxpbmVGbGV4JykpIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMgPSB1dGlsXzEuZ2V0RmxleENvbnRhaW5lckNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIHRoaXMuX2dldENsYXNzZXMoKSwgdXRpbF8xLmdldEJvcmRlckNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIGZsZXhDb250YWluZXJDbGFzc2VzLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRzbGliXzEuX19hc3NpZ24oe30sIHV0aWxfMS5nZXRUZXh0U3R5bGVzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgR3JpZENvbHVtbkJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItZ3JpZC1jb2x1bW4nLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdvZmZzZXQnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbHNwYW4nLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclRvcCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlckJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyQ29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JvcmRlclJvdW5kJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRXZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRJdGFsaWMnLFxyXG4gICAgICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbm1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJ1bmNhdGUnLFxyXG4gICAgICAgICAgICAgICAgJ3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhEaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3JldmVyc2UnLFxyXG4gICAgICAgICAgICAgICAgJ2p1c3RpZnlJdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25JdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnZmxleFdyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduQ29udGVudCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBHcmlkQ29sdW1uQmFzZSk7XHJcbiAgICByZXR1cm4gR3JpZENvbHVtbkJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuR3JpZENvbHVtbkJhc2UgPSBHcmlkQ29sdW1uQmFzZTtcclxudmFyIEdyaWRDb2x1bW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhHcmlkQ29sdW1uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR3JpZENvbHVtbigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gR3JpZENvbHVtbjtcclxufShHcmlkQ29sdW1uQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBHcmlkQ29sdW1uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL3N0eWxlcy9ncmlkLWNvbHVtbi5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMTdkRV95QURcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9ncmlkLWNvbHVtblwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1jb2x1bW4vc3R5bGVzL2dyaWQtY29sdW1uLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLWNvbHVtbi9zdHlsZXMvZ3JpZC1jb2x1bW4ubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvZ3JpZC1yb3cubS5jc3NcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIEdyaWRSb3dCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JpZFJvd0Jhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBHcmlkUm93QmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBHcmlkUm93QmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnZ3JpZC1yb3cnO1xyXG4gICAgfTtcclxuICAgIEdyaWRSb3dCYXNlLnByb3RvdHlwZS5fZ2V0R3V0dGVyc0NsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGd1dHRlcnMgPSB0aGlzLnByb3BlcnRpZXMuZ3V0dGVycztcclxuICAgICAgICB2YXIgZ3V0dGVyc0NsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZ3V0dGVycyA9PT0gZmFsc2UgfHwgZ3V0dGVycyA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICBndXR0ZXJzQ2xhc3Nlcy5wdXNoKCduby1ndXR0ZXJzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBndXR0ZXJzQ2xhc3NlcztcclxuICAgIH07XHJcbiAgICBHcmlkUm93QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdyb3cnXHJcbiAgICAgICAgICAgIF0sIHRoaXMuX2dldEd1dHRlcnNDbGFzc2VzKCksIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIGZsZXhDb250YWluZXJDbGFzc2VzLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgR3JpZFJvd0Jhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItZ3JpZC1yb3cnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdndXR0ZXJzJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhEaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3JldmVyc2UnLFxyXG4gICAgICAgICAgICAgICAgJ2p1c3RpZnlJdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25JdGVtcycsXHJcbiAgICAgICAgICAgICAgICAnZmxleFdyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduQ29udGVudCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBHcmlkUm93QmFzZSk7XHJcbiAgICByZXR1cm4gR3JpZFJvd0Jhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuR3JpZFJvd0Jhc2UgPSBHcmlkUm93QmFzZTtcclxudmFyIEdyaWRSb3cgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhHcmlkUm93LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gR3JpZFJvdygpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gR3JpZFJvdztcclxufShHcmlkUm93QmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBHcmlkUm93O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2dyaWQtcm93L3N0eWxlcy9ncmlkLXJvdy5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvc3R5bGVzL2dyaWQtcm93Lm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvc3R5bGVzL2dyaWQtcm93Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMy10dEJDRnBcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9ncmlkLXJvd1wifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvZ3JpZC1yb3cvc3R5bGVzL2dyaWQtcm93Lm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9ncmlkLXJvdy9zdHlsZXMvZ3JpZC1yb3cubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvaW1hZ2UubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIEltYWdlQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEltYWdlQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEltYWdlQmFzZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBJbWFnZUJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2ltYWdlJztcclxuICAgIH07XHJcbiAgICBJbWFnZUJhc2UucHJvdG90eXBlLmdldEltZ0NsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBmbHVpZCA9IF9hLmZsdWlkLCB0aHVtYm5haWwgPSBfYS50aHVtYm5haWwsIGFsaWdubWVudCA9IF9hLmFsaWdubWVudDtcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChmbHVpZCA9PT0gdHJ1ZSB8fCBmbHVpZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnaW1nLWZsdWlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aHVtYm5haWwgPT09IHRydWUgfHwgdGh1bWJuYWlsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdpbWctdGh1bWJuYWlsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbGlnbm1lbnQgJiYgYWxpZ25tZW50ICE9PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnbXgtYXV0bycpO1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdkLWJsb2NrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goXCJmbG9hdC1cIiArIGFsaWdubWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNzc0NsYXNzZXM7XHJcbiAgICB9O1xyXG4gICAgSW1hZ2VCYXNlLnByb3RvdHlwZS5nZXRJbWdTdHlsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIGNzc1N0eWxlcyA9IHt9O1xyXG4gICAgICAgIGlmICh3aWR0aCAmJiB3aWR0aCAhPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdudW1iZXInIHx8IHdpZHRoLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNzc1N0eWxlcy53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLndpZHRoID0gXCJcIiArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoZWlnaHQgJiYgaGVpZ2h0ICE9PSAnYXV0bycpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZWlnaHQgPT09ICdudW1iZXInIHx8IGhlaWdodC5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NTdHlsZXMuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3NzU3R5bGVzLmhlaWdodCA9IFwiXCIgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNzc1N0eWxlcztcclxuICAgIH07XHJcbiAgICBJbWFnZUJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIHNyYyA9IF9hLnNyYywgYWx0ID0gX2EuYWx0O1xyXG4gICAgICAgIHJldHVybiBkXzEudignaW1nJywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgIGFsdDogYWx0LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIHRoaXMuZ2V0SW1nQ2xhc3NlcygpLCB1dGlsXzEuZ2V0Qm9yZGVyQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSksXHJcbiAgICAgICAgICAgIHN0eWxlczogdHNsaWJfMS5fX2Fzc2lnbih7fSwgdGhpcy5nZXRJbWdTdHlsZXMoKSlcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBJbWFnZUJhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItaW1nJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnZmx1aWQnLFxyXG4gICAgICAgICAgICAgICAgJ3RodW1ibmFpbCcsXHJcbiAgICAgICAgICAgICAgICAnc3JjJyxcclxuICAgICAgICAgICAgICAgICdhbHQnLFxyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyUm91bmQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBJbWFnZUJhc2UpO1xyXG4gICAgcmV0dXJuIEltYWdlQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5JbWFnZUJhc2UgPSBJbWFnZUJhc2U7XHJcbnZhciBJbWFnZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKEltYWdlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSW1hZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEltYWdlO1xyXG59KEltYWdlQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBJbWFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2UvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbWFnZS9zdHlsZXMvaW1hZ2UubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL3N0eWxlcy9pbWFnZS5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL3N0eWxlcy9pbWFnZS5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzNDckRfQkx6XCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvaW1hZ2VcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2ltYWdlL3N0eWxlcy9pbWFnZS5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW1hZ2Uvc3R5bGVzL2ltYWdlLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi9sYWJlbC9pbmRleFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzc1wiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxuZXhwb3J0cy5zaXplTWFwID0ge1xyXG4gICAgc21hbGw6ICdzbScsXHJcbiAgICBsYXJnZTogJ2xnJ1xyXG59O1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBJbnB1dEdyb3VwQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKElucHV0R3JvdXBCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSW5wdXRHcm91cEJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgSW5wdXRHcm91cEJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2lucHV0LWdyb3VwJztcclxuICAgIH07XHJcbiAgICBJbnB1dEdyb3VwQmFzZS5wcm90b3R5cGUucmVuZGVySW5wdXRHcm91cCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIHNpemUgPSBfYS5zaXplLCBsYWJlbCA9IF9hLmxhYmVsLCBkaXNwbGF5ID0gX2EuZGlzcGxheSwgbGFiZWxQb3NpdGlvbiA9IF9hLmxhYmVsUG9zaXRpb247XHJcbiAgICAgICAgdmFyIHNpemVDbGFzcyA9ICcnO1xyXG4gICAgICAgIGlmIChzaXplICYmIHNpemUgIT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBzaXplQ2xhc3MgPSBcImlucHV0LWdyb3VwLVwiICsgZXhwb3J0cy5zaXplTWFwW3NpemVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2xhc3NlcyA9IGtleSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gWydpbnB1dC1ncm91cCcsIHNpemVDbGFzc11cclxuICAgICAgICAgICAgOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgICdpbnB1dC1ncm91cCcsXHJcbiAgICAgICAgICAgICAgICBzaXplQ2xhc3NcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKTtcclxuICAgICAgICBpZiAoIShsYWJlbCAmJiBsYWJlbFBvc2l0aW9uICYmIGxhYmVsUG9zaXRpb24gPT09ICdsZWZ0JykpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMudGhlbWUoY3NzLnJvb3QpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgICAgID8gZF8xLncoaW5kZXhfMS5kZWZhdWx0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnY29sLWZvcm0tbGFiZWwnLCAnbXItMyddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgICBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzXHJcbiAgICAgICAgICAgIH0sIHRoaXMucmVPcmRlckNoaWxkcmVuKCkpXHJcbiAgICAgICAgXTtcclxuICAgIH07XHJcbiAgICBJbnB1dEdyb3VwQmFzZS5wcm90b3R5cGUucmVPcmRlckNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIOWxnuaApyBwb3NpdGlvbiDpnIDopoHnu5PlkIjlrZDpg6jku7bnmoTkvY3nva7mnaXlrp7njrDmlYjmnpzvvIzmlYXlnKjmraTnlLHnqIvluo/moLnmja4gcG9zaXRpb24g55qE5YC85p2l6Ieq5Yqo6LCD5pW05a2Q6YOo5Lu255qE5L2N572uXHJcbiAgICAgICAgdmFyIHByZXBlbmRDaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHZhciBpbnB1dENoaWxkcmVuID0gW107XHJcbiAgICAgICAgdmFyIGFwcGVuZENoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRLZXkgPSBjaGlsZE5vZGUucHJvcGVydGllcy5rZXk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGlsZE5vZGUucHJvcGVydGllcy5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZEtleSA9PT0gJ2FkZG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiAmJiBwb3NpdGlvbiA9PT0gJ2FwcGVuZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGRyZW4ucHVzaChjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGVuZENoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dENoaWxkcmVuLnB1c2goY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0c2xpYl8xLl9fc3ByZWFkKHByZXBlbmRDaGlsZHJlbiwgaW5wdXRDaGlsZHJlbiwgYXBwZW5kQ2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIElucHV0R3JvdXBCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBsYWJlbCA9IF9hLmxhYmVsLCBsYWJlbFBvc2l0aW9uID0gX2EubGFiZWxQb3NpdGlvbiwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYm9vdHN0cmFwIOS4reacieS4ieenjSBpbmxpbmUg5a6e546w77yaXHJcbiAgICAgICAgICogMS4gaW5saW5lIGZvcm1zLCDlnKggZm9ybSDooajljZXlpJbmlL7kuIDkuKogaW5saW5lIGZvcm0g5biD5bGA566h55CG5Zmo5a6e546w55qELOebuOW9k+S6jiBhbmRyb2lkIOeahOawtOW5syBsaW5lYXJsYXlvdXTvvJtcclxuICAgICAgICAgKiAyLiBjaGVja2JveCBpbmxpbmXvvIznm7TmjqXlpITnkIbmr4/kuKogZm9ybSDooajljZXlkowgbGFiZWzvvJtcclxuICAgICAgICAgKiAzLiBGb3JtIEdyaWQg5Lit55qEIEhvcml6b250YWwgZm9ybe+8jOS9v+eUqCBHcmlkIOW4g+WxgO+8jOS9huaYryBMYWJlbCDnmoTlrr3luqbml6Dms5XliqjmgIHosIPmlbTkuLrku7vmhI/lgLzjgIJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIOeOsOWcqOS9v+eUqCDnrKzkuoznp43lrp7njrDvvIzlvZPmnInmm7Tlpb3nmoTlrp7njrDml7bvvIzlho3lrozlloTmraTlpITku6PnoIHjgIJcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAobGFiZWwgJiYgbGFiZWxQb3NpdGlvbiAmJiBsYWJlbFBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICAgICAnZm9ybS1ncm91cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm0tY2hlY2staW5saW5lJyxcclxuICAgICAgICAgICAgICAgICAgICAndy0xMDAnXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICAgICAgfSwgdGhpcy5yZW5kZXJJbnB1dEdyb3VwKHVuZGVmaW5lZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJJbnB1dEdyb3VwKHRoaXMuZ2V0S2V5KCkpO1xyXG4gICAgfTtcclxuICAgIElucHV0R3JvdXBCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWlucHV0LWdyb3VwJyxcclxuICAgICAgICAgICAgY2hpbGRUeXBlOiByZWdpc3RlckN1c3RvbUVsZW1lbnRfMS5DdXN0b21FbGVtZW50Q2hpbGRUeXBlLlRFWFQsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICAgICd3aWRnZXRJZCcsXHJcbiAgICAgICAgICAgICAgICAnc2l6ZScsXHJcbiAgICAgICAgICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcicsXHJcbiAgICAgICAgICAgICAgICAnZmxvYXQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgSW5wdXRHcm91cEJhc2UpO1xyXG4gICAgcmV0dXJuIElucHV0R3JvdXBCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLklucHV0R3JvdXBCYXNlID0gSW5wdXRHcm91cEJhc2U7XHJcbnZhciBJbnB1dEdyb3VwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoSW5wdXRHcm91cCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIElucHV0R3JvdXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIElucHV0R3JvdXA7XHJcbn0oSW5wdXRHcm91cEJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gSW5wdXRHcm91cDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9pbnB1dC1ncm91cC9zdHlsZXMvaW5wdXQtZ3JvdXAubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzNZTDljaFlYXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXBcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2lucHV0LWdyb3VwL3N0eWxlcy9pbnB1dC1ncm91cC5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvc3R5bGVzL2lucHV0LWdyb3VwLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2xhYmVsLm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBMYWJlbEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhMYWJlbEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMYWJlbEJhc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgTGFiZWxCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdsYWJlbCc7XHJcbiAgICB9O1xyXG4gICAgTGFiZWxCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCB2YWx1ZSA9IF9hLnZhbHVlLCBmb3JJZCA9IF9hLmZvcklkLCBjbGFzc2VzID0gX2EuY2xhc3NlcztcclxuICAgICAgICBpZiAoY2xhc3NlcyAmJiB0eXBlb2YgY2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY2xhc3NlcyA9IFtjbGFzc2VzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdsYWJlbCcsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGZvcjogZm9ySWQsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXNcclxuICAgICAgICAgICAgICAgID8gdHNsaWJfMS5fX3NwcmVhZChbdGhpcy50aGVtZShjc3Mucm9vdCksIGNzcy5mb250RGlyZWN0aW9uXSwgY2xhc3NlcykgOiBbdGhpcy50aGVtZShjc3Mucm9vdCksIGNzcy5mb250RGlyZWN0aW9uXVxyXG4gICAgICAgIH0sIHRzbGliXzEuX19zcHJlYWQoW3ZhbHVlXSwgdGhpcy5jaGlsZHJlbikpO1xyXG4gICAgfTtcclxuICAgIExhYmVsQmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1sYWJlbCcsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ3dpZGdldElkJywgJ3ZhbHVlJywgJ2ZvcklkJ10sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgTGFiZWxCYXNlKTtcclxuICAgIHJldHVybiBMYWJlbEJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuTGFiZWxCYXNlID0gTGFiZWxCYXNlO1xyXG52YXIgTGFiZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhMYWJlbCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExhYmVsKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBMYWJlbDtcclxufShMYWJlbEJhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGFiZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xhYmVsL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvc3R5bGVzL2xhYmVsLm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9zdHlsZXMvbGFiZWwubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9zdHlsZXMvbGFiZWwubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8zaXJjUDNzZFwiLFwiZm9udERpcmVjdGlvblwiOlwicDlrUEF4VEZcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9sYWJlbFwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGFiZWwvc3R5bGVzL2xhYmVsLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9sYWJlbC9zdHlsZXMvbGFiZWwubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvbGluay5tLmNzc1wiKTtcclxudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIi4uL2J1dHRvblwiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgTGlua0Jhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhMaW5rQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExpbmtCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIExpbmtCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdsaW5rJztcclxuICAgIH07XHJcbiAgICBMaW5rQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgX2IgPSBfYS5ocmVmLCBocmVmID0gX2IgPT09IHZvaWQgMCA/ICcjJyA6IF9iLCB0YXJnZXQgPSBfYS50YXJnZXQsIHZhbHVlID0gX2EudmFsdWUsIHZhbHVlUG9zaXRpb24gPSBfYS52YWx1ZVBvc2l0aW9uLCBfYyA9IF9hLmlzTGlzdEl0ZW0sIGlzTGlzdEl0ZW0gPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYywgYXBwZWFyYW5jZSA9IF9hLmFwcGVhcmFuY2UsIGRpc3BsYXkgPSBfYS5kaXNwbGF5O1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYnV0dG9uXzEudGFyZ2V0TWFwW3RhcmdldF0gfHwgdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRyZW47XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlUG9zaXRpb24gJiYgdmFsdWVQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZChbdmFsdWVdLCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLmNoaWxkcmVuLCBbdmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdhJywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgaHJlZjogaHJlZixcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IGlzTGlzdEl0ZW1cclxuICAgICAgICAgICAgICAgID8gdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAtaXRlbS1hY3Rpb24nXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0JyA/IFwibGlzdC1ncm91cC1pdGVtLVwiICsgYXBwZWFyYW5jZSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldFRleHREZWNvcmF0aW9uQ2xhc3ModGhpcy5wcm9wZXJ0aWVzKSkgOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRDb2xvcnNDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHV0aWxfMS5nZXRUZXh0U3R5bGVzKHRoaXMucHJvcGVydGllcylcclxuICAgICAgICB9LCBjaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgTGlua0Jhc2UgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnRfMS5jdXN0b21FbGVtZW50KHtcclxuICAgICAgICAgICAgdGFnOiAnZGItbGluaycsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ2hyZWYnLFxyXG4gICAgICAgICAgICAgICAgJ3RhcmdldCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2lzTGlzdEl0ZW0nLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGVhcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udFdlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udEl0YWxpYycsXHJcbiAgICAgICAgICAgICAgICAndGV4dERlY29yYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cnVuY2F0ZScsXHJcbiAgICAgICAgICAgICAgICAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25TZWxmJyxcclxuICAgICAgICAgICAgICAgICdvcmRlcicsXHJcbiAgICAgICAgICAgICAgICAndGV4dENvbG9yJyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgTGlua0Jhc2UpO1xyXG4gICAgcmV0dXJuIExpbmtCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkxpbmtCYXNlID0gTGlua0Jhc2U7XHJcbnZhciBMaW5rID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGluaywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExpbmsoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIExpbms7XHJcbn0oTGlua0Jhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGluaztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saW5rL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saW5rL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9zdHlsZXMvbGluay5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGluay9zdHlsZXMvbGluay5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xTU5Xczg1RFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2xpbmtcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpbmsvc3R5bGVzL2xpbmsubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvbGlzdC1ncm91cC5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgTGlzdEdyb3VwQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKExpc3RHcm91cEJhc2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMaXN0R3JvdXBCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIExpc3RHcm91cEJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ2xpc3QtZ3JvdXAnO1xyXG4gICAgfTtcclxuICAgIExpc3RHcm91cEJhc2UucHJvdG90eXBlLmdldFRhZ05hbWVCeUNoaWxkTm9kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGFnID0gJ3VsJztcclxuICAgICAgICB2YXIgZXhpc3RMaXN0SXRlbSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBleGlzdEJ1dHRvbk9yTGluayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkS2V5ID0gY2hpbGQucHJvcGVydGllcy5rZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRLZXkgPT09ICdsaW5rJyB8fCBjaGlsZEtleSA9PT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWcgPSAnZGl2JztcclxuICAgICAgICAgICAgICAgICAgICBleGlzdEJ1dHRvbk9yTGluayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRLZXkgPT09ICdsaXN0LWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RMaXN0SXRlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZXhpc3RCdXR0b25PckxpbmsgJiYgZXhpc3RMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMaXN0SXRlbSBhbmQgQnV0dG9uL0xpbmsgY2FuIG5vdCBiZSBhbGxvd2VkIGF0IHRoZSBzYW1lIHRpbWUgaW4gdGhlIExpc3RHcm91cCB3aWRnZXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH07XHJcbiAgICBMaXN0R3JvdXBCYXNlLnByb3RvdHlwZS5yZW5kZXJDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcclxuICAgIH07XHJcbiAgICBMaXN0R3JvdXBCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBmbHVzaCA9IF9hLmZsdXNoLCBvcmllbnRhdGlvbiA9IF9hLm9yaWVudGF0aW9uO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudigndWwnLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFt0aGlzLnRoZW1lKGNzcy5yb290KSwgJ2xpc3QtaW5saW5lJ10sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9LCB0aGlzLnJlbmRlckNoaWxkcmVuKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFnID0gdGhpcy5nZXRUYWdOYW1lQnlDaGlsZE5vZGUoKTtcclxuICAgICAgICByZXR1cm4gZF8xLnYodGFnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgJ2xpc3QtZ3JvdXAnLFxyXG4gICAgICAgICAgICAgICAgZmx1c2ggPT09IHRydWUgfHwgZmx1c2ggPT09ICd0cnVlJyA/ICdsaXN0LWdyb3VwLWZsdXNoJyA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCB1dGlsXzEuZ2V0U3BhY2luZ0NsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKTtcclxuICAgIH07XHJcbiAgICBMaXN0R3JvdXBCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWxpc3QtZ3JvdXAnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuTk9ERSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdmbHVzaCcsXHJcbiAgICAgICAgICAgICAgICAnb3JpZW50YXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBMaXN0R3JvdXBCYXNlKTtcclxuICAgIHJldHVybiBMaXN0R3JvdXBCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkxpc3RHcm91cEJhc2UgPSBMaXN0R3JvdXBCYXNlO1xyXG52YXIgTGlzdEdyb3VwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGlzdEdyb3VwLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGlzdEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBMaXN0R3JvdXA7XHJcbn0oTGlzdEdyb3VwQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBMaXN0R3JvdXA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtZ3JvdXAvc3R5bGVzL2xpc3QtZ3JvdXAubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtZ3JvdXAvc3R5bGVzL2xpc3QtZ3JvdXAubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfMjB6d3NYX01cIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9saXN0LWdyb3VwXCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9saXN0LWdyb3VwL3N0eWxlcy9saXN0LWdyb3VwLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL2xpc3QtaXRlbS5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgTGlzdEl0ZW1CYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGlzdEl0ZW1CYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGlzdEl0ZW1CYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIExpc3RJdGVtQmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnbGlzdC1pdGVtJztcclxuICAgIH07XHJcbiAgICBMaXN0SXRlbUJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIHdpZGdldElkID0gX2Eud2lkZ2V0SWQsIGFjdGl2ZSA9IF9hLmFjdGl2ZSwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgYXBwZWFyYW5jZSA9IF9hLmFwcGVhcmFuY2UsIGRpc3BsYXkgPSBfYS5kaXNwbGF5LCBfYiA9IF9hLm9yaWVudGF0aW9uLCBvcmllbnRhdGlvbiA9IF9iID09PSB2b2lkIDAgPyAndmVydGljYWwnIDogX2I7XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignbGknLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LWlubGluZS1pdGVtJyxcclxuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlICYmIGFwcGVhcmFuY2UgIT09ICdkZWZhdWx0JyA/IFwibGlzdC1ncm91cC1pdGVtLVwiICsgYXBwZWFyYW5jZSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcywgdXRpbF8xLmdldFRleHRDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0RGVjb3JhdGlvbkNsYXNzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRDb2xvcnNDbGFzc2VzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2xpJywge1xyXG4gICAgICAgICAgICBpZDogd2lkZ2V0SWQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAnbGlzdC1ncm91cC1pdGVtJyxcclxuICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgJiYgYXBwZWFyYW5jZSAhPT0gJ2RlZmF1bHQnID8gXCJsaXN0LWdyb3VwLWl0ZW0tXCIgKyBhcHBlYXJhbmNlIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyA/ICdkaXNhYmxlZCcgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPT09IHRydWUgfHwgYWN0aXZlID09PSAndHJ1ZScgPyAnYWN0aXZlJyA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgZmxleENvbnRhaW5lckNsYXNzZXMsIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgICAgfSwgdGhpcy5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgTGlzdEl0ZW1CYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLWxpc3QtaXRlbScsXHJcbiAgICAgICAgICAgIGNoaWxkVHlwZTogcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEuQ3VzdG9tRWxlbWVudENoaWxkVHlwZS5URVhULFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ2FjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGVhcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgJ29yaWVudGF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdmbGV4RGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICdyZXZlcnNlJyxcclxuICAgICAgICAgICAgICAgICdqdXN0aWZ5SXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduSXRlbXMnLFxyXG4gICAgICAgICAgICAgICAgJ2ZsZXhXcmFwJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkNvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRXZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnRJdGFsaWMnLFxyXG4gICAgICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbm1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJ1bmNhdGUnLFxyXG4gICAgICAgICAgICAgICAgJ3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgJ3RleHRDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZENvbG9yJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIExpc3RJdGVtQmFzZSk7XHJcbiAgICByZXR1cm4gTGlzdEl0ZW1CYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLkxpc3RJdGVtQmFzZSA9IExpc3RJdGVtQmFzZTtcclxudmFyIExpc3RJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTGlzdEl0ZW0sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMaXN0SXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTGlzdEl0ZW07XHJcbn0oTGlzdEl0ZW1CYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpc3RJdGVtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1pdGVtL3N0eWxlcy9saXN0LWl0ZW0ubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInJlcXVpcmUoJ0U6L2dpdC93aWRnZXRzLXdlYi9leGFtcGxlcy9jaGVja291dC9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1pdGVtL3N0eWxlcy9saXN0LWl0ZW0ubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8xQU9yQ0xjUFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL2xpc3QtaXRlbVwifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvbGlzdC1pdGVtL3N0eWxlcy9saXN0LWl0ZW0ubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL2xpc3QtaXRlbS9zdHlsZXMvbGlzdC1pdGVtLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXVpZF8xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvdXVpZFwiKTtcclxudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbFwiKTtcclxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy9yYWRpby5tLmNzc1wiKTtcclxudmFyIGxhYmVsXzEgPSByZXF1aXJlKFwiLi4vbGFiZWxcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIFJhZGlvQmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFJhZGlvQmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJhZGlvQmFzZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl91dWlkID0gdXVpZF8xLmRlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBSYWRpb0Jhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ3JhZGlvJztcclxuICAgIH07XHJcbiAgICBSYWRpb0Jhc2UucHJvdG90eXBlLnJlbmRlclJhZGlvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBuYW1lID0gX2EubmFtZSwgdmFsdWUgPSBfYS52YWx1ZSwgY2hlY2tlZCA9IF9hLmNoZWNrZWQsIGRpc2FibGVkID0gX2EuZGlzYWJsZWQsIHJlYWRPbmx5ID0gX2EucmVhZE9ubHk7XHJcbiAgICAgICAgdmFyIGNzc0NsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignaW5wdXQnLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdyYWRpbycsXHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkID09PSB0cnVlIHx8IGNoZWNrZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSA9PT0gdHJ1ZSB8fCByZWFkT25seSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ2Zvcm0tY2hlY2staW5wdXQnXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFJhZGlvQmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBsYWJlbCA9IF9hLmxhYmVsLCBzaXplID0gX2Euc2l6ZSwgbGFiZWxBZnRlciA9IF9hLmxhYmVsQWZ0ZXIsIGZsdWlkID0gX2EuZmx1aWQsIGRpc3BsYXkgPSBfYS5kaXNwbGF5LCB2YWx1ZSA9IF9hLnZhbHVlLCBjaGVja2VkID0gX2EuY2hlY2tlZCwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgcmVhZE9ubHkgPSBfYS5yZWFkT25seSwgX2MgPSBfYS5pc0luQWRkb24sIGlzSW5BZGRvbiA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jO1xyXG4gICAgICAgIGlmIChpc0luQWRkb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRfMS52KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdyYWRpbycsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCA9PT0gdHJ1ZSB8fCBjaGVja2VkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgPT09IHRydWUgfHwgZGlzYWJsZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSA9PT0gdHJ1ZSB8fCByZWFkT25seSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA/IHV0aWxfMS5mb3JtU2l6ZU1hcFtzaXplXSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmFkaW8oKSxcclxuICAgICAgICAgICAgbGFiZWwgPyBkXzEudyhsYWJlbF8xLmRlZmF1bHQsIHsgdmFsdWU6IGxhYmVsLCBmb3JJZDogd2lkZ2V0SWQsIGNsYXNzZXM6ICdmb3JtLWNoZWNrLWxhYmVsJyB9KSA6IG51bGxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChsYWJlbEFmdGVyID09PSBmYWxzZSB8fCBsYWJlbEFmdGVyID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ucmV2ZXJzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZHJlbi5wdXNoKHV0aWxfMS5yZW5kZXJNZXNzYWdlTm9kZSh0aGlzLnByb3BlcnRpZXMpKTtcclxuICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgJ2Zvcm0tY2hlY2snLFxyXG4gICAgICAgICAgICAgICAgc2l6ZSA/IHV0aWxfMS5mb3JtU2l6ZU1hcFtzaXplXSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGZsdWlkID09PSB0cnVlIHx8IGZsdWlkID09PSAndHJ1ZScgPyB1bmRlZmluZWQgOiAnZm9ybS1jaGVjay1pbmxpbmUnXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSlcclxuICAgICAgICB9LCBjaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgUmFkaW9CYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLXJhZGlvJyxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICduYW1lJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tlZCcsXHJcbiAgICAgICAgICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsQWZ0ZXInLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICdyZWFkT25seScsXHJcbiAgICAgICAgICAgICAgICAnZmx1aWQnLFxyXG4gICAgICAgICAgICAgICAgJ3NpemUnLFxyXG4gICAgICAgICAgICAgICAgJ2ludmFsaWRNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICd2YWxpZE1lc3NhZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2lzSW5BZGRvbicsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJyxcclxuICAgICAgICAgICAgICAgICdmbG9hdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogW10sXHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9KSxcclxuICAgICAgICBUaGVtZWRfMS50aGVtZShjc3MpXHJcbiAgICBdLCBSYWRpb0Jhc2UpO1xyXG4gICAgcmV0dXJuIFJhZGlvQmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5SYWRpb0Jhc2UgPSBSYWRpb0Jhc2U7XHJcbnZhciBSYWRpbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFJhZGlvLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmFkaW8oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJhZGlvO1xyXG59KFJhZGlvQmFzZSkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBSYWRpbztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9yYWRpby9zdHlsZXMvcmFkaW8ubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzcycpO1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGZhY3RvcnkoKSk7IH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1wicm9vdFwiOlwiXzEyNlBUalJYXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvcmFkaW9cIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3JhZGlvL3N0eWxlcy9yYWRpby5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvcmFkaW8vc3R5bGVzL3JhZGlvLm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBUaGVtZWRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9taXhpbnMvVGhlbWVkXCIpO1xyXG52YXIgV2lkZ2V0QmFzZV8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL1dpZGdldEJhc2VcIik7XHJcbnZhciBjdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZGVjb3JhdG9ycy9jdXN0b21FbGVtZW50XCIpO1xyXG52YXIgcmVnaXN0ZXJDdXN0b21FbGVtZW50XzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvcmVnaXN0ZXJDdXN0b21FbGVtZW50XCIpO1xyXG52YXIgdXVpZF8xID0gcmVxdWlyZShcIkBkb2pvL2NvcmUvdXVpZFwiKTtcclxudmFyIGxhYmVsXzEgPSByZXF1aXJlKFwiLi4vbGFiZWxcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvc2VsZWN0Lm0uY3NzXCIpO1xyXG5leHBvcnRzLlRoZW1lZEJhc2UgPSBUaGVtZWRfMS5UaGVtZWRNaXhpbihXaWRnZXRCYXNlXzEuV2lkZ2V0QmFzZSk7XHJcbnZhciBTZWxlY3RCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoU2VsZWN0QmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNlbGVjdEJhc2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5fdXVpZCA9IHV1aWRfMS5kZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgU2VsZWN0QmFzZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAnc2VsZWN0JztcclxuICAgIH07XHJcbiAgICBTZWxlY3RCYXNlLnByb3RvdHlwZS5yZW5kZXJTZWxlY3QgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCByZXF1aXJlZCA9IF9hLnJlcXVpcmVkLCByZWFkT25seSA9IF9hLnJlYWRPbmx5LCBvcHRpb25zID0gX2Eub3B0aW9ucywgbGFiZWxGaWVsZCA9IF9hLmxhYmVsRmllbGQsIHZhbHVlRmllbGQgPSBfYS52YWx1ZUZpZWxkLCBkYXRhUGF0aCA9IF9hLmRhdGFQYXRoLCBzaXplID0gX2Euc2l6ZSwgZGlzcGxheSA9IF9hLmRpc3BsYXksIGxhYmVsID0gX2EubGFiZWwsIGxhYmVsUG9zaXRpb24gPSBfYS5sYWJlbFBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBjc3NDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2l6ZSkge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2godXRpbF8xLmZvcm1TaXplTWFwW3NpemVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdmb3JtLWNvbnRyb2wnKTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAvLyDkuI3kvb/nlKggSlNPTi5wYXJzZSgpIOWwhiBqc29uIOi9rOS4uuaVsOe7hOeahOWOn+WboOaYryBKU09OLnBhcnNlKCkg5LiN5pSv5oyB5Y2V5byV5Y+3LOS4lOS4jeaUr+aMgei9rOS5ieesplxyXG4gICAgICAgICAgICB2YXIgb3B0aW9uSnNvbiA9IGV2YWwob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gb3B0aW9uSnNvbi5tYXAoZnVuY3Rpb24gKG9wdGlvbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkXzEudignb3B0aW9uJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXggKyB1dWlkXzEuZGVmYXVsdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb25bdmFsdWVGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG9wdGlvblt2YWx1ZUZpZWxkXSA9PT0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0sIFtvcHRpb25bbGFiZWxGaWVsZF1dKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhUGF0aCkge1xyXG4gICAgICAgICAgICAvL1RPRE86IOWPkemAgeivt+axgu+8jOiOt+WPluaVsOaNru+8jOaaguaXtuS4jeWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2xhc3NlcyA9IGtleSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gY3NzQ2xhc3Nlc1xyXG4gICAgICAgICAgICA6IHRzbGliXzEuX19zcHJlYWQoY3NzQ2xhc3NlcywgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKTtcclxuICAgICAgICBpZiAoIShsYWJlbCAmJiBsYWJlbFBvc2l0aW9uICYmIGxhYmVsUG9zaXRpb24gPT09ICdsZWZ0JykpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMudGhlbWUoY3NzLnJvb3QpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdzZWxlY3QnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogcmVxdWlyZWQgPT09IHRydWUgfHwgcmVxdWlyZWQgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHJlYWRPbmx5ID09PSB0cnVlIHx8IHJlYWRPbmx5ID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXNcclxuICAgICAgICB9LCBjaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0QmFzZS5wcm90b3R5cGUucmVuZGVyU2VsZWN0V3JhcHBlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbGFiZWwgPSBfYS5sYWJlbDtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAgICAgPyBkXzEudyhsYWJlbF8xLmRlZmF1bHQsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ySWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnY29sLWZvcm0tbGFiZWwnLCAnbXItMyddXHJcbiAgICAgICAgICAgICAgICB9LCBbXSlcclxuICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWxlY3Qoa2V5KSxcclxuICAgICAgICAgICAgdXRpbF8xLnJlbmRlck1lc3NhZ2VOb2RlKHRoaXMucHJvcGVydGllcylcclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIFNlbGVjdEJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIGxhYmVsID0gX2EubGFiZWwsIGxhYmVsUG9zaXRpb24gPSBfYS5sYWJlbFBvc2l0aW9uLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBib290c3RyYXAg5Lit5pyJ5LiJ56eNIGlubGluZSDlrp7njrDvvJpcclxuICAgICAgICAgKiAxLiBpbmxpbmUgZm9ybXMsIOWcqCBmb3JtIOihqOWNleWkluaUvuS4gOS4qiBpbmxpbmUgZm9ybSDluIPlsYDnrqHnkIblmajlrp7njrDnmoQs55u45b2T5LqOIGFuZHJvaWQg55qE5rC05bmzIGxpbmVhcmxheW91dO+8m1xyXG4gICAgICAgICAqIDIuIGNoZWNrYm94IGlubGluZe+8jOebtOaOpeWkhOeQhuavj+S4qiBmb3JtIOihqOWNleWSjCBsYWJlbO+8m1xyXG4gICAgICAgICAqIDMuIEZvcm0gR3JpZCDkuK3nmoQgSG9yaXpvbnRhbCBmb3Jt77yM5L2/55SoIEdyaWQg5biD5bGA77yM5L2G5pivIExhYmVsIOeahOWuveW6puaXoOazleWKqOaAgeiwg+aVtOS4uuS7u+aEj+WAvOOAglxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICog546w5Zyo5L2/55SoIOesrOS6jOenjeWunueOsO+8jOW9k+acieabtOWlveeahOWunueOsOaXtu+8jOWGjeWujOWWhOatpOWkhOS7o+eggeOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChsYWJlbCAmJiBsYWJlbFBvc2l0aW9uICYmIGxhYmVsUG9zaXRpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gZF8xLnYoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICdmb3JtLWdyb3VwJyxcclxuICAgICAgICAgICAgICAgICAgICAnZm9ybS1jaGVjay1pbmxpbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICd3LTEwMCdcclxuICAgICAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgICAgICB9LCB0aGlzLnJlbmRlclNlbGVjdFdyYXBwZXIodW5kZWZpbmVkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclNlbGVjdFdyYXBwZXIodGhpcy5nZXRLZXkoKSk7XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0QmFzZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY3VzdG9tRWxlbWVudF8xLmN1c3RvbUVsZW1lbnQoe1xyXG4gICAgICAgICAgICB0YWc6ICdkYi1zZWxlY3QnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICduYW1lJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICdyZXF1aXJlZCcsXHJcbiAgICAgICAgICAgICAgICAncmVhZE9ubHknLFxyXG4gICAgICAgICAgICAgICAgJ29wdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsRmllbGQnLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlRmllbGQnLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGFQYXRoJyxcclxuICAgICAgICAgICAgICAgICdzaXplJyxcclxuICAgICAgICAgICAgICAgICdpbnZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAndmFsaWRNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInLFxyXG4gICAgICAgICAgICAgICAgJ2Zsb2F0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIFNlbGVjdEJhc2UpO1xyXG4gICAgcmV0dXJuIFNlbGVjdEJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuU2VsZWN0QmFzZSA9IFNlbGVjdEJhc2U7XHJcbnZhciBTZWxlY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTZWxlY3QsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNlbGVjdDtcclxufShTZWxlY3RCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNlbGVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3NlbGVjdC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3NlbGVjdC9zdHlsZXMvc2VsZWN0Lm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3NlbGVjdC9zdHlsZXMvc2VsZWN0Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfM01ZMjlFeHlcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi9zZWxlY3RcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3NlbGVjdC9zdHlsZXMvc2VsZWN0Lm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi9zZWxlY3Qvc3R5bGVzL3NlbGVjdC5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcclxudmFyIGRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kXCIpO1xyXG52YXIgVGhlbWVkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvbWl4aW5zL1RoZW1lZFwiKTtcclxudmFyIFdpZGdldEJhc2VfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlXCIpO1xyXG52YXIgY3VzdG9tRWxlbWVudF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RlY29yYXRvcnMvY3VzdG9tRWxlbWVudFwiKTtcclxudmFyIHV1aWRfMSA9IHJlcXVpcmUoXCJAZG9qby9jb3JlL3V1aWRcIik7XHJcbnZhciBGb2N1c18xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21ldGEvRm9jdXNcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4uL2xhYmVsXCIpO1xyXG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbW1vbi91dGlsXCIpO1xyXG52YXIgY3NzID0gcmVxdWlyZShcIi4vc3R5bGVzL3RleHQtaW5wdXQubS5jc3NcIik7XHJcbmV4cG9ydHMuVGhlbWVkQmFzZSA9IFRoZW1lZF8xLlRoZW1lZE1peGluKFdpZGdldEJhc2VfMS5XaWRnZXRCYXNlKTtcclxudmFyIFRleHRJbnB1dEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhUZXh0SW5wdXRCYXNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVGV4dElucHV0QmFzZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9mb2N1c2FibGVJbnB1dEtleSA9ICdmb2N1c2FibGVJbnB1dCc7XHJcbiAgICAgICAgX3RoaXMuX3V1aWQgPSB1dWlkXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtaW5wdXQnO1xyXG4gICAgfTtcclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLl9vbklucHV0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLm9uSW5wdXQgJiYgdGhpcy5wcm9wZXJ0aWVzLm9uSW5wdXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgIH07XHJcbiAgICBUZXh0SW5wdXRCYXNlLnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMub25DaGFuZ2UgJiYgdGhpcy5wcm9wZXJ0aWVzLm9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dElucHV0QmFzZS5wcm90b3R5cGUucmVuZGVySW5wdXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCBfYiA9IF9hLndpZGdldElkLCB3aWRnZXRJZCA9IF9iID09PSB2b2lkIDAgPyB0aGlzLl91dWlkIDogX2IsIG5hbWUgPSBfYS5uYW1lLCB0eXBlID0gX2EudHlwZSwgdmFsdWUgPSBfYS52YWx1ZSwgcGFzc3dvcmQgPSBfYS5wYXNzd29yZCwgcGxhY2Vob2xkZXIgPSBfYS5wbGFjZWhvbGRlciwgZGlzYWJsZWQgPSBfYS5kaXNhYmxlZCwgcmVxdWlyZWQgPSBfYS5yZXF1aXJlZCwgcmVhZE9ubHkgPSBfYS5yZWFkT25seSwgbWF4TGVuZ3RoID0gX2EubWF4TGVuZ3RoLCBtaW5MZW5ndGggPSBfYS5taW5MZW5ndGgsIHNpemUgPSBfYS5zaXplLCBzaG91bGRGb2N1cyA9IF9hLnNob3VsZEZvY3VzLCBwbGFpblRleHQgPSBfYS5wbGFpblRleHQsIGRpc3BsYXkgPSBfYS5kaXNwbGF5LCBsYWJlbCA9IF9hLmxhYmVsLCBsYWJlbFBvc2l0aW9uID0gX2EubGFiZWxQb3NpdGlvbjtcclxuICAgICAgICB2YXIgY3NzQ2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIGlmIChzaG91bGRGb2N1cyA9PT0gdHJ1ZSB8fCBzaG91bGRGb2N1cyA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWV0YShGb2N1c18xLmRlZmF1bHQpLnNldChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFzc3dvcmQgPT09IHRydWUgfHwgcGFzc3dvcmQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICB0eXBlID0gJ3Bhc3N3b3JkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2l6ZSkge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2godXRpbF8xLmZvcm1TaXplTWFwW3NpemVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBsYWluVGV4dCA9PT0gdHJ1ZSB8fCBwbGFpblRleHQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICBjc3NDbGFzc2VzLnB1c2goJ2Zvcm0tY29udHJvbC1wbGFpbnRleHQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXMucHVzaCgnZm9ybS1jb250cm9sJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjbGFzc2VzID0ga2V5ID09PSB0aGlzLl9mb2N1c2FibGVJbnB1dEtleVxyXG4gICAgICAgICAgICA/IGNzc0NsYXNzZXNcclxuICAgICAgICAgICAgOiB0c2xpYl8xLl9fc3ByZWFkKGNzc0NsYXNzZXMsIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRGbGV4SXRlbUNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgdXRpbF8xLmdldEZsb2F0Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSk7XHJcbiAgICAgICAgaWYgKCEobGFiZWwgJiYgbGFiZWxQb3NpdGlvbiAmJiBsYWJlbFBvc2l0aW9uID09PSAnbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLnRoZW1lKGNzcy5yb290KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudignaW5wdXQnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUgJiYgdHlwZSAhPT0gJ2RlZmF1bHQnID8gdHlwZSA6ICcnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkID09PSB0cnVlIHx8IGRpc2FibGVkID09PSAndHJ1ZScsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiByZXF1aXJlZCA9PT0gdHJ1ZSB8fCByZXF1aXJlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICByZWFkT25seTogcmVhZE9ubHkgPT09IHRydWUgfHwgcmVhZE9ubHkgPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgbWF4bGVuZ3RoOiBtYXhMZW5ndGggPyBcIlwiICsgbWF4TGVuZ3RoIDogbnVsbCxcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiBtaW5MZW5ndGggPyBcIlwiICsgbWluTGVuZ3RoIDogbnVsbCxcclxuICAgICAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcclxuICAgICAgICAgICAgb25pbnB1dDogdGhpcy5fb25JbnB1dCxcclxuICAgICAgICAgICAgb25jaGFuZ2U6IHRoaXMuX29uQ2hhbmdlXHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgfTtcclxuICAgIFRleHRJbnB1dEJhc2UucHJvdG90eXBlLnJlbmRlclRleHRJbnB1dCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BlcnRpZXMsIF9iID0gX2Eud2lkZ2V0SWQsIHdpZGdldElkID0gX2IgPT09IHZvaWQgMCA/IHRoaXMuX3V1aWQgOiBfYiwgbGFiZWwgPSBfYS5sYWJlbDtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAgICAgPyBkXzEudyhsYWJlbF8xLmRlZmF1bHQsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ySWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnY29sLWZvcm0tbGFiZWwnLCAnbXItMyddXHJcbiAgICAgICAgICAgICAgICB9LCBbXSlcclxuICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnB1dChrZXkpLFxyXG4gICAgICAgICAgICB1dGlsXzEucmVuZGVyTWVzc2FnZU5vZGUodGhpcy5wcm9wZXJ0aWVzKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgVGV4dElucHV0QmFzZS5wcm90b3R5cGUucmVuZGVyRmlsZUlucHV0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgX2IgPSBfYS53aWRnZXRJZCwgd2lkZ2V0SWQgPSBfYiA9PT0gdm9pZCAwID8gdGhpcy5fdXVpZCA6IF9iLCBsYWJlbCA9IF9hLmxhYmVsLCBkaXNhYmxlZCA9IF9hLmRpc2FibGVkLCBuYW1lID0gX2EubmFtZSwgZGlzcGxheSA9IF9hLmRpc3BsYXk7XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGtleTogdGhpcy5nZXRLZXkoKSxcclxuICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lKGNzcy5yb290KSxcclxuICAgICAgICAgICAgICAgICdjdXN0b20tZmlsZSdcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPyB1dGlsXzEuZ2V0RGlzcGxheUNsYXNzKHRoaXMucHJvcGVydGllcykgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgXSwgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKVxyXG4gICAgICAgIH0sIFtcclxuICAgICAgICAgICAgZF8xLnYoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdmaWxlJyxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCA9PT0gdHJ1ZSB8fCBkaXNhYmxlZCA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogWydjdXN0b20tZmlsZS1pbnB1dCddLFxyXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6IHRoaXMuX29uQ2hhbmdlXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAgICAgPyBkXzEudyhsYWJlbF8xLmRlZmF1bHQsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ySWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdjdXN0b20tZmlsZS1sYWJlbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIHV0aWxfMS5yZW5kZXJNZXNzYWdlTm9kZSh0aGlzLnByb3BlcnRpZXMpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9O1xyXG4gICAgVGV4dElucHV0QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgdHlwZSA9IF9hLnR5cGUsIGxhYmVsID0gX2EubGFiZWwsIGxhYmVsUG9zaXRpb24gPSBfYS5sYWJlbFBvc2l0aW9uLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICBpZiAodHlwZSAmJiB0eXBlID09PSAnZmlsZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRmlsZUlucHV0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGJvb3RzdHJhcCDkuK3mnInkuInnp40gaW5saW5lIOWunueOsO+8mlxyXG4gICAgICAgICAqIDEuIGlubGluZSBmb3Jtcywg5ZyoIGZvcm0g6KGo5Y2V5aSW5pS+5LiA5LiqIGlubGluZSBmb3JtIOW4g+WxgOeuoeeQhuWZqOWunueOsOeahCznm7jlvZPkuo4gYW5kcm9pZCDnmoTmsLTlubMgbGluZWFybGF5b3V077ybXHJcbiAgICAgICAgICogMi4gY2hlY2tib3ggaW5saW5l77yM55u05o6l5aSE55CG5q+P5LiqIGZvcm0g6KGo5Y2V5ZKMIGxhYmVs77ybXHJcbiAgICAgICAgICogMy4gRm9ybSBHcmlkIOS4reeahCBIb3Jpem9udGFsIGZvcm3vvIzkvb/nlKggR3JpZCDluIPlsYDvvIzkvYbmmK8gTGFiZWwg55qE5a695bqm5peg5rOV5Yqo5oCB6LCD5pW05Li65Lu75oSP5YC844CCXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiDnjrDlnKjkvb/nlKgg56ys5LqM56eN5a6e546w77yM5b2T5pyJ5pu05aW955qE5a6e546w5pe277yM5YaN5a6M5ZaE5q2k5aSE5Luj56CB44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGxhYmVsICYmIGxhYmVsUG9zaXRpb24gJiYgbGFiZWxQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkXzEudignZGl2Jywge1xyXG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogdHNsaWJfMS5fX3NwcmVhZChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdCksXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm0tZ3JvdXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ctMTAwJ1xyXG4gICAgICAgICAgICAgICAgXSwgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIFtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBdLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRGbG9hdENsYXNzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgICAgIH0sIHRoaXMucmVuZGVyVGV4dElucHV0KHRoaXMuX2ZvY3VzYWJsZUlucHV0S2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclRleHRJbnB1dCh0aGlzLmdldEtleSgpKTtcclxuICAgIH07XHJcbiAgICBUZXh0SW5wdXRCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLXRleHQtaW5wdXQnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnd2lkZ2V0SWQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgJ2xhYmVsUG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3BsYWNlaG9sZGVyJyxcclxuICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlckFwcGVhcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgJ3JlcXVpcmVkJyxcclxuICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICAncmVhZE9ubHknLFxyXG4gICAgICAgICAgICAgICAgJ3NpemUnLFxyXG4gICAgICAgICAgICAgICAgJ3Nob3VsZEZvY3VzJyxcclxuICAgICAgICAgICAgICAgICdwbGFpblRleHQnLFxyXG4gICAgICAgICAgICAgICAgJ21heExlbmd0aCcsXHJcbiAgICAgICAgICAgICAgICAnbWluTGVuZ3RoJyxcclxuICAgICAgICAgICAgICAgICdpbnZhbGlkTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAndmFsaWRNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Ub3AnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdUb3AnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdCb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWduU2VsZicsXHJcbiAgICAgICAgICAgICAgICAnb3JkZXInLFxyXG4gICAgICAgICAgICAgICAgJ2Zsb2F0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbJ29uSW5wdXQnLCAnb25DaGFuZ2UnXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIFRleHRJbnB1dEJhc2UpO1xyXG4gICAgcmV0dXJuIFRleHRJbnB1dEJhc2U7XHJcbn0oZXhwb3J0cy5UaGVtZWRCYXNlKSk7XHJcbmV4cG9ydHMuVGV4dElucHV0QmFzZSA9IFRleHRJbnB1dEJhc2U7XHJcbnZhciBUZXh0SW5wdXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhUZXh0SW5wdXQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUZXh0SW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFRleHRJbnB1dDtcclxufShUZXh0SW5wdXRCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRleHRJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0LWlucHV0L2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9zdHlsZXMvdGV4dC1pbnB1dC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC1pbnB1dC9zdHlsZXMvdGV4dC1pbnB1dC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQtaW5wdXQvc3R5bGVzL3RleHQtaW5wdXQubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcIl8yQjZIUlJYaFwiLFwiIF9rZXlcIjpcIndpZGdldHMtd2ViL3RleHQtaW5wdXRcIn07XG59KSk7O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQtaW5wdXQvc3R5bGVzL3RleHQtaW5wdXQubS5jc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQtaW5wdXQvc3R5bGVzL3RleHQtaW5wdXQubS5jc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XHJcbnZhciBkXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvZFwiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvdGV4dC5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgVGV4dEJhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhUZXh0QmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRleHRCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFRleHRCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0JztcclxuICAgIH07XHJcbiAgICBUZXh0QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcGVydGllcywgd2lkZ2V0SWQgPSBfYS53aWRnZXRJZCwgdmFsdWUgPSBfYS52YWx1ZSwgdmFsdWVQb3NpdGlvbiA9IF9hLnZhbHVlUG9zaXRpb24sIHR5cGUgPSBfYS50eXBlLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICB2YXIgdGFnO1xyXG4gICAgICAgIHZhciBjc3NDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKCF0eXBlKSB7XHJcbiAgICAgICAgICAgIHRhZyA9ICdzcGFuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgIHRhZyA9ICdzcGFuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2xlYWQnKSB7XHJcbiAgICAgICAgICAgIHRhZyA9ICdwJztcclxuICAgICAgICAgICAgY3NzQ2xhc3Nlcy5wdXNoKCdsZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0YWcgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRyZW47XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlUG9zaXRpb24gJiYgdmFsdWVQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZChbdmFsdWVdLCB0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdHNsaWJfMS5fX3NwcmVhZCh0aGlzLmNoaWxkcmVuLCBbdmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsZXhDb250YWluZXJDbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGRpc3BsYXkgJiYgKGRpc3BsYXkgPT09ICdmbGV4JyB8fCBkaXNwbGF5ID09PSAnaW5saW5lRmxleCcpKSB7XHJcbiAgICAgICAgICAgIGZsZXhDb250YWluZXJDbGFzc2VzID0gdXRpbF8xLmdldEZsZXhDb250YWluZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkXzEudih0YWcsIHtcclxuICAgICAgICAgICAgaWQ6IHdpZGdldElkLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuZ2V0S2V5KCksXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IHRzbGliXzEuX19zcHJlYWQoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZShjc3Mucm9vdClcclxuICAgICAgICAgICAgXSwgY3NzQ2xhc3NlcywgdXRpbF8xLmdldFNwYWNpbmdDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRUZXh0Q2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dERlY29yYXRpb25DbGFzcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCBbXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID8gdXRpbF8xLmdldERpc3BsYXlDbGFzcyh0aGlzLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIF0sIGZsZXhDb250YWluZXJDbGFzc2VzLCB1dGlsXzEuZ2V0RmxleEl0ZW1DbGFzc2VzKHRoaXMucHJvcGVydGllcykpLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHRzbGliXzEuX19hc3NpZ24oe30sIHV0aWxfMS5nZXRUZXh0U3R5bGVzKHRoaXMucHJvcGVydGllcykpXHJcbiAgICAgICAgfSwgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIFRleHRCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLXRleHQnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWVQb3NpdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luVG9wJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b20nLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpbkxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nVG9wJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250V2VpZ2h0JyxcclxuICAgICAgICAgICAgICAgICdmb250SXRhbGljJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25tZW50JyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ3RydW5jYXRlJyxcclxuICAgICAgICAgICAgICAgICd3cmFwJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnZmxleERpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAncmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAnanVzdGlmeUl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdmbGV4V3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25Db250ZW50JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFRoZW1lZF8xLnRoZW1lKGNzcylcclxuICAgIF0sIFRleHRCYXNlKTtcclxuICAgIHJldHVybiBUZXh0QmFzZTtcclxufShleHBvcnRzLlRoZW1lZEJhc2UpKTtcclxuZXhwb3J0cy5UZXh0QmFzZSA9IFRleHRCYXNlO1xyXG52YXIgVGV4dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKFRleHQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUZXh0KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBUZXh0O1xyXG59KFRleHRCYXNlKSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRleHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdGV4dC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvc3R5bGVzL3RleHQubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3RleHQvc3R5bGVzL3RleHQubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwicmVxdWlyZSgnRTovZ2l0L3dpZGdldHMtd2ViL2V4YW1wbGVzL2NoZWNrb3V0L25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzJyk7XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoZmFjdG9yeSgpKTsgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XCJyb290XCI6XCJfM0UyNVBaMUpcIixcIiBfa2V5XCI6XCJ3aWRnZXRzLXdlYi90ZXh0XCJ9O1xufSkpOztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi90ZXh0L3N0eWxlcy90ZXh0Lm0uY3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xyXG52YXIgZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL2RcIik7XHJcbnZhciBzdHJpbmdfMSA9IHJlcXVpcmUoXCJAZG9qby9zaGltL3N0cmluZ1wiKTtcclxudmFyIFRoZW1lZF8xID0gcmVxdWlyZShcIkBkb2pvL3dpZGdldC1jb3JlL21peGlucy9UaGVtZWRcIik7XHJcbnZhciBXaWRnZXRCYXNlXzEgPSByZXF1aXJlKFwiQGRvam8vd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZVwiKTtcclxudmFyIGN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9kZWNvcmF0b3JzL2N1c3RvbUVsZW1lbnRcIik7XHJcbnZhciByZWdpc3RlckN1c3RvbUVsZW1lbnRfMSA9IHJlcXVpcmUoXCJAZG9qby93aWRnZXQtY29yZS9yZWdpc3RlckN1c3RvbUVsZW1lbnRcIik7XHJcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxcIik7XHJcbnZhciBjc3MgPSByZXF1aXJlKFwiLi9zdHlsZXMvdmlldy5tLmNzc1wiKTtcclxuZXhwb3J0cy5UaGVtZWRCYXNlID0gVGhlbWVkXzEuVGhlbWVkTWl4aW4oV2lkZ2V0QmFzZV8xLldpZGdldEJhc2UpO1xyXG52YXIgVmlld0Jhc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhWaWV3QmFzZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZpZXdCYXNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFZpZXdCYXNlLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICd2aWV3JztcclxuICAgIH07XHJcbiAgICBWaWV3QmFzZS5wcm90b3R5cGUuX2dldE1heFdpZHRoU3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtYXhXaWR0aCA9IHRoaXMucHJvcGVydGllcy5tYXhXaWR0aDtcclxuICAgICAgICB2YXIgbWF4V2lkdGhTdHlsZXMgPSB7fTtcclxuICAgICAgICBpZiAobWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXhXaWR0aCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGhTdHlsZXMubWF4V2lkdGggPSBtYXhXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJpbmdfMS5lbmRzV2l0aChtYXhXaWR0aCwgJyUnKSkge1xyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGhTdHlsZXMubWF4V2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoU3R5bGVzLm1heFdpZHRoID0gbWF4V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFdpZHRoU3R5bGVzO1xyXG4gICAgfTtcclxuICAgIFZpZXdCYXNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wZXJ0aWVzLCB3aWRnZXRJZCA9IF9hLndpZGdldElkLCBkaXNwbGF5ID0gX2EuZGlzcGxheTtcclxuICAgICAgICB2YXIgZmxleENvbnRhaW5lckNsYXNzZXMgPSBbXTtcclxuICAgICAgICBpZiAoZGlzcGxheSAmJiAoZGlzcGxheSA9PT0gJ2ZsZXgnIHx8IGRpc3BsYXkgPT09ICdpbmxpbmVGbGV4JykpIHtcclxuICAgICAgICAgICAgZmxleENvbnRhaW5lckNsYXNzZXMgPSB1dGlsXzEuZ2V0RmxleENvbnRhaW5lckNsYXNzZXModGhpcy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRfMS52KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGlkOiB3aWRnZXRJZCxcclxuICAgICAgICAgICAga2V5OiB0aGlzLmdldEtleSgpLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB0c2xpYl8xLl9fc3ByZWFkKFtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhlbWUoY3NzLnJvb3QpXHJcbiAgICAgICAgICAgIF0sIHV0aWxfMS5nZXRCb3JkZXJDbGFzc2VzKHRoaXMucHJvcGVydGllcyksIHV0aWxfMS5nZXRTcGFjaW5nQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0VGV4dENsYXNzZXModGhpcy5wcm9wZXJ0aWVzKSwgW1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA/IHV0aWxfMS5nZXREaXNwbGF5Q2xhc3ModGhpcy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBdLCBmbGV4Q29udGFpbmVyQ2xhc3NlcywgdXRpbF8xLmdldEZsZXhJdGVtQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0Q29sb3JzQ2xhc3Nlcyh0aGlzLnByb3BlcnRpZXMpLCB1dGlsXzEuZ2V0RmxvYXRDbGFzcyh0aGlzLnByb3BlcnRpZXMpKSxcclxuICAgICAgICAgICAgc3R5bGVzOiB0c2xpYl8xLl9fYXNzaWduKHt9LCB1dGlsXzEuZ2V0VGV4dFN0eWxlcyh0aGlzLnByb3BlcnRpZXMpLCB0aGlzLl9nZXRNYXhXaWR0aFN0eWxlcygpKVxyXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgfTtcclxuICAgIFZpZXdCYXNlID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcclxuICAgICAgICBjdXN0b21FbGVtZW50XzEuY3VzdG9tRWxlbWVudCh7XHJcbiAgICAgICAgICAgIHRhZzogJ2RiLXZpZXcnLFxyXG4gICAgICAgICAgICBjaGlsZFR5cGU6IHJlZ2lzdGVyQ3VzdG9tRWxlbWVudF8xLkN1c3RvbUVsZW1lbnRDaGlsZFR5cGUuVEVYVCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgICAgJ3dpZGdldElkJyxcclxuICAgICAgICAgICAgICAgICdtYXhXaWR0aCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyTGVmdCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyVG9wJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdib3JkZXJDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnYm9yZGVyUm91bmQnLFxyXG4gICAgICAgICAgICAgICAgJ21hcmdpblRvcCcsXHJcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tJyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5MZWZ0JyxcclxuICAgICAgICAgICAgICAgICdtYXJnaW5SaWdodCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ1RvcCcsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZ0xlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udFdlaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udEl0YWxpYycsXHJcbiAgICAgICAgICAgICAgICAndGV4dERlY29yYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2FsaWdubWVudCcsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cnVuY2F0ZScsXHJcbiAgICAgICAgICAgICAgICAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheScsXHJcbiAgICAgICAgICAgICAgICAnZmxleERpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAncmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAnanVzdGlmeUl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdhbGlnbkl0ZW1zJyxcclxuICAgICAgICAgICAgICAgICdmbGV4V3JhcCcsXHJcbiAgICAgICAgICAgICAgICAnYWxpZ25Db250ZW50JyxcclxuICAgICAgICAgICAgICAgICdhbGlnblNlbGYnLFxyXG4gICAgICAgICAgICAgICAgJ29yZGVyJyxcclxuICAgICAgICAgICAgICAgICd0ZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnZmxvYXQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdLFxyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgVGhlbWVkXzEudGhlbWUoY3NzKVxyXG4gICAgXSwgVmlld0Jhc2UpO1xyXG4gICAgcmV0dXJuIFZpZXdCYXNlO1xyXG59KGV4cG9ydHMuVGhlbWVkQmFzZSkpO1xyXG5leHBvcnRzLlZpZXdCYXNlID0gVmlld0Jhc2U7XHJcbnZhciBWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoVmlldywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZpZXc7XHJcbn0oVmlld0Jhc2UpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gVmlldztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi92aWV3L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aWRnZXRzLXdlYi92aWV3L2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJyZXF1aXJlKCdFOi9naXQvd2lkZ2V0cy13ZWIvZXhhbXBsZXMvY2hlY2tvdXQvbm9kZV9tb2R1bGVzL3dpZGdldHMtd2ViL3ZpZXcvc3R5bGVzL3ZpZXcubS5jc3MnKTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChmYWN0b3J5KCkpOyB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcInJvb3RcIjpcInBkOHJrMEZPXCIsXCIgX2tleVwiOlwid2lkZ2V0cy13ZWIvdmlld1wifTtcbn0pKTs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2lkZ2V0cy13ZWIvdmlldy9zdHlsZXMvdmlldy5tLmNzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9tYWluLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJpbXBvcnQgeyBQcm9qZWN0b3JNaXhpbiB9IGZyb20gJ0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9Qcm9qZWN0b3InO1xuaW1wb3J0IENoZWNrb3V0Rm9ybSBmcm9tICcuL3dpZGdldHMvQ2hlY2tvdXRGb3JtJztcblxuLy8gQ3JlYXRlIGEgcHJvamVjdG9yIHRvIGNvbnZlcnQgdGhlIHZpcnR1YWwgRE9NIHByb2R1Y2VkIGJ5IHRoZSBhcHBsaWNhdGlvbiBpbnRvIHRoZSByZW5kZXJlZCBwYWdlLlxuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gc3RhcnRpbmcgdXAgYSBEb2pvIDIgYXBwbGljYXRpb24sIHRha2UgYSBsb29rIGF0XG4vLyBodHRwczovL2Rvam8uaW8vdHV0b3JpYWxzLzAwMl9jcmVhdGluZ19hbl9hcHBsaWNhdGlvbi9cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdteS1hcHAnKTtcbmlmKHJvb3Qpe1xuICAgIGNvbnN0IFByb2plY3RvciA9IFByb2plY3Rvck1peGluKENoZWNrb3V0Rm9ybSk7XG4gICAgY29uc3QgcHJvamVjdG9yID0gbmV3IFByb2plY3RvcigpO1xuICAgIFxuICAgIC8vIEJ5IGRlZmF1bHQsIGFwcGVuZCgpIHdpbGwgYXR0YWNoIHRoZSByZW5kZXJlZCBjb250ZW50IHRvIGRvY3VtZW50LmJvZHkuICBUbyBpbnNlcnQgdGhpcyBhcHBsaWNhdGlvblxuICAgIC8vIGludG8gZXhpc3RpbmcgSFRNTCBjb250ZW50LCBwYXNzIHRoZSBkZXNpcmVkIHJvb3Qgbm9kZSB0byBhcHBlbmQoKS5cbiAgICBwcm9qZWN0b3IuYXBwZW5kKHJvb3QgYXMgRWxlbWVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvbWFpbi50cyIsImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tICdAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlJztcclxuaW1wb3J0IHsgV2lkZ2V0UHJvcGVydGllcyB9IGZyb20gJ0Bkb2pvL3dpZGdldC1jb3JlL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyB3IH0gZnJvbSAnQGRvam8vd2lkZ2V0LWNvcmUvZCc7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnd2lkZ2V0cy13ZWIvY29udGFpbmVyL2luZGV4JztcclxuaW1wb3J0IFZpZXcgZnJvbSAnd2lkZ2V0cy13ZWIvdmlldy9pbmRleCc7XHJcbmltcG9ydCBJbWFnZSBmcm9tICd3aWRnZXRzLXdlYi9pbWFnZS9pbmRleCc7XHJcbmltcG9ydCBUZXh0IGZyb20gJ3dpZGdldHMtd2ViL3RleHQvaW5kZXgnO1xyXG5pbXBvcnQgR3JpZFJvdyBmcm9tICd3aWRnZXRzLXdlYi9ncmlkLXJvdy9pbmRleCc7XHJcbmltcG9ydCBHcmlkQ29sdW1uIGZyb20gJ3dpZGdldHMtd2ViL2dyaWQtY29sdW1uL2luZGV4JztcclxuaW1wb3J0IFRleHRJbnB1dCBmcm9tICd3aWRnZXRzLXdlYi90ZXh0LWlucHV0L2luZGV4JztcclxuaW1wb3J0IElucHV0R3JvdXAgZnJvbSAnd2lkZ2V0cy13ZWIvaW5wdXQtZ3JvdXAvaW5kZXgnO1xyXG5pbXBvcnQgQWRkb24gZnJvbSAnd2lkZ2V0cy13ZWIvYWRkb24vaW5kZXgnO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ3dpZGdldHMtd2ViL3NlbGVjdC9pbmRleCc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICd3aWRnZXRzLXdlYi9jaGVja2JveC9pbmRleCc7XHJcbmltcG9ydCBSYWRpbyBmcm9tICd3aWRnZXRzLXdlYi9yYWRpby9pbmRleCc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnd2lkZ2V0cy13ZWIvYnV0dG9uL2luZGV4JztcclxuaW1wb3J0IEJhZGdlIGZyb20gJ3dpZGdldHMtd2ViL2JhZGdlL2luZGV4JztcclxuaW1wb3J0IExpc3RHcm91cCBmcm9tICd3aWRnZXRzLXdlYi9saXN0LWdyb3VwL2luZGV4JztcclxuaW1wb3J0IExpc3RJdGVtIGZyb20gJ3dpZGdldHMtd2ViL2xpc3QtaXRlbS9pbmRleCc7XHJcbmltcG9ydCBDYXJkIGZyb20gJ3dpZGdldHMtd2ViL2NhcmQvaW5kZXgnO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJ3dpZGdldHMtd2ViL2Zvb3Rlci9pbmRleCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ3dpZGdldHMtd2ViL2xpbmsvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrb3V0Rm9ybUJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlPFdpZGdldFByb3BlcnRpZXM+IHtcclxuICAgIHByb3RlY3RlZCByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHcoQ29udGFpbmVyLCB7IG1heFdpZHRoOiA5NjAgfSwgW1xyXG4gICAgICAgICAgICB3KFZpZXcsIHsgYWxpZ25tZW50OiAnY2VudGVyJywgcGFkZGluZ1RvcDogJzUnLCBwYWRkaW5nQm90dG9tOiAnNScgfSwgW1xyXG4gICAgICAgICAgICAgICAgdyhJbWFnZSwgeyB3aWR0aDogNzIsIGhlaWdodDogNzIsIG1hcmdpbkxlZnQ6ICdhdXRvJywgbWFyZ2luUmlnaHQ6ICdhdXRvJywgbWFyZ2luQm90dG9tOiAnNCcsIHNyYzogJ2h0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzQuMS9hc3NldHMvYnJhbmQvYm9vdHN0cmFwLXNvbGlkLnN2ZycgfSksXHJcbiAgICAgICAgICAgICAgICB3KFRleHQsIHsgdHlwZTogJ2gyJywgdmFsdWU6ICdDaGVja291dCBmb3JtJ30pLFxyXG4gICAgICAgICAgICAgICAgdyhUZXh0LCB7IHR5cGU6ICdsZWFkJywgdmFsdWU6ICdCZWxvdyBpcyBhbiBleGFtcGxlIGZvcm0gYnVpbHQgZW50aXJlbHkgd2l0aCBCb290c3RyYXBcXCdzIGZvcm0gY29udHJvbHMuIEVhY2ggcmVxdWlyZWQgZm9ybSBncm91cCBoYXMgYSB2YWxpZGF0aW9uIHN0YXRlIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBieSBhdHRlbXB0aW5nIHRvIHN1Ym1pdCB0aGUgZm9ybSB3aXRob3V0IGNvbXBsZXRpbmcgaXQuJ30pXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB3KEdyaWRSb3csIHt9LCBbXHJcbiAgICAgICAgICAgICAgICB3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogOCB9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHR5cGU6ICdoNCcsIG1hcmdpbkJvdHRvbTogJzMnLCB2YWx1ZTogJ0JpbGxpbmcgYWRkcmVzcyd9KSxcclxuICAgICAgICAgICAgICAgICAgICB3KFZpZXcsIHt9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoR3JpZFJvdywge30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoR3JpZENvbHVtbiwgeyBjb2xzcGFuOiA2LCBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHRJbnB1dCwgeyBsYWJlbDogJ0ZpcnN0IE5hbWUnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDYsIG1hcmdpbkJvdHRvbTogJzMnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dElucHV0LCB7IGxhYmVsOiAnTGFzdCBOYW1lJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhWaWV3LCB7IG1hcmdpbkJvdHRvbTogJzMnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhJbnB1dEdyb3VwLCB7IGxhYmVsOiAnVXNlck5hbWUnIH0sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KEFkZG9uLCB7IHZhbHVlOiAnQCd9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0SW5wdXQsIHsgcGxhY2Vob2xkZXI6ICdVc2VyTmFtZSd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoVmlldywgeyBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dElucHV0LCB7IGxhYmVsOiAnRW1haWwoT3B0aW9uYWwpJywgcGxhY2Vob2xkZXI6ICd5b3VAZXhhbXBsZS5jb20nfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoVmlldywgeyBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dElucHV0LCB7IGxhYmVsOiAnQWRkcmVzcycsIHBsYWNlaG9sZGVyOiAnMTIzNCBNYWluIFN0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KFZpZXcsIHsgbWFyZ2luQm90dG9tOiAnMyd9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHRJbnB1dCwgeyBsYWJlbDogJ0FkZHJlc3MgMihPcHRpb25hbCknLCBwbGFjZWhvbGRlcjogJ0FwYXJ0bWVudCBvciBzdWl0ZSd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkUm93LCB7fSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDUsIG1hcmdpbkJvdHRvbTogJzMnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoU2VsZWN0LCB7IGxhYmVsOiAnQ291bnRyeScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAnW3tcInZhbHVlXCI6IFwiMVwiLCBcImxhYmVsXCI6IFwiQ2hvb3NlLi4uXCJ9LCB7XCJ2YWx1ZVwiOiBcIjJcIiwgXCJsYWJlbFwiOiBcIlVuaXRlZCBTdGF0ZXNcIn1dJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVGaWVsZDogJ3ZhbHVlJywgbGFiZWxGaWVsZDogJ2xhYmVsJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoR3JpZENvbHVtbiwgeyBjb2xzcGFuOiA0LCBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFNlbGVjdCwgeyBsYWJlbDogJ1N0YXRlJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICdbe1widmFsdWVcIjogXCIxXCIsIFwibGFiZWxcIjogXCJDaG9vc2UuLi5cIn0sIHtcInZhbHVlXCI6IFwiMlwiLCBcImxhYmVsXCI6IFwiQ2FsaWZvcm5pYVwifV0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkOiAndmFsdWUnLCBsYWJlbEZpZWxkOiAnbGFiZWwnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46MywgbWFyZ2luQm90dG9tOiAnMyd9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0SW5wdXQsIHsgbGFiZWw6ICdaaXAnIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhWaWV3LCB7IGJvcmRlckJvdHRvbTogdHJ1ZSwgbWFyZ2luQm90dG9tOiAnNCd9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhDaGVja2JveCwgeyBsYWJlbDogJ1NoaXBwaW5nIGFkZHJlc3MgaXMgdGhlIHNhbWUgYXMgbXkgYmlsbGluZyBhZGRyZXNzJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KENoZWNrYm94LCB7IGxhYmVsOiAnU2F2ZSB0aGlzIGluZm9ybWF0aW9uIGZvciBuZXh0IHRpbWUnfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoVmlldywgeyBib3JkZXJCb3R0b206IHRydWUsIG1hcmdpbkJvdHRvbTogJzQnLCBtYXJnaW5Ub3A6ICc0J30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KFRleHQsIHsgdHlwZTogJ2g0JywgbWFyZ2luQm90dG9tOiAnMycsIHZhbHVlOiAnUGF5bWVudCd9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhWaWV3LCB7IGRpc3BsYXk6ICdibG9jaycsIG1hcmdpblRvcDogJzMnLCBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoUmFkaW8sIHsgbmFtZTogJ3BheW1lbnRNZXRob2QnLCB3aWRnZXRJZDogJ2NyZWRpdCcsIGxhYmVsOiAnQ3JlZGl0IGNhcmQnLCBmbHVpZDogdHJ1ZX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhSYWRpbywgeyBuYW1lOiAncGF5bWVudE1ldGhvZCcsIHdpZGdldElkOiAnZGViaXQnLCBsYWJlbDogJ0RlYml0IGNhcmQnLCBmbHVpZDogdHJ1ZX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhSYWRpbywgeyBuYW1lOiAncGF5bWVudE1ldGhvZCcsIHdpZGdldElkOiAncGF5cGFsJywgbGFiZWw6ICdQYXlQYWwnLCBmbHVpZDogdHJ1ZX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkUm93LCB7fSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhHcmlkQ29sdW1uLCB7IGNvbHNwYW46IDYsIG1hcmdpbkJvdHRvbTogJzMnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dElucHV0LCB7IGxhYmVsOiAnTmFtZSBvbiBjYXJkJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0Z1bGwgbmFtZSBhcyBkaXNwbGF5ZWQgb24gY2FyZCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogNiwgbWFyZ2luQm90dG9tOiAnMyd9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0SW5wdXQsIHsgbGFiZWw6ICdDcmVkaXQgY2FyZCBudW1iZXInfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KEdyaWRSb3csIHt9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogMywgbWFyZ2luQm90dG9tOiAnMyd9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0SW5wdXQsIHsgbGFiZWw6ICdFeHBpcmF0aW9uJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoR3JpZENvbHVtbiwgeyBjb2xzcGFuOiAzLCBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHRJbnB1dCwgeyBsYWJlbDogJ0NWVid9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KFZpZXcsIHsgYm9yZGVyQm90dG9tOiB0cnVlLCBtYXJnaW5Cb3R0b206ICc0J30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KEJ1dHRvbiwge2FwcGVhcmFuY2U6ICdwcmltYXJ5JywgZmx1aWQ6IHRydWUsIHNpemU6ICdsYXJnZScsIHZhbHVlOiAnQ29udGludWUgdG8gY2hlY2tvdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICB3KEdyaWRDb2x1bW4sIHsgY29sc3BhbjogJzQnLCBtYXJnaW5Cb3R0b206ICc0J30sIFtcclxuICAgICAgICAgICAgICAgICAgICB3KFRleHQsIHt0eXBlOiAnaDQnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWdubWVudDogJ2NlbnRlcicsIGp1c3RpZnlJdGVtczogJ2JldHdlZW4nLCBtYXJnaW5Cb3R0b206ICczJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHRleHRDb2xvcjogJ3NlY29uZGFyeScsIHZhbHVlOiAnWW91ciBjYXJ0JyB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhCYWRnZSwgeyBwaWxsOiB0cnVlLCB2YWx1ZTogJzMnLCBhcHBlYXJhbmNlOiAnc2Vjb25kYXJ5J30pXHJcbiAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgdyhMaXN0R3JvdXAsIHsgbWFyZ2luQm90dG9tOiAnMyd9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoTGlzdEl0ZW0sIHtkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlJdGVtczogJ2JldHdlZW4nfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhWaWV3LCB7fSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0eXBlOiAnaDYnLCBtYXJnaW5Ub3A6ICcwJywgbWFyZ2luQm90dG9tOiAnMCcsIHZhbHVlOiAnUHJvZHVjdCBuYW1lJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0JyaWVmIGRlc2NyaXB0aW9uJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB2YWx1ZTogJyQxMid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhMaXN0SXRlbSwge2Rpc3BsYXk6ICdmbGV4JywganVzdGlmeUl0ZW1zOiAnYmV0d2Vlbid9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFZpZXcsIHt9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdTZWNvbmQgcHJvZHVjdCd9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHQsIHsgdGV4dENvbG9yOiAnc2Vjb25kYXJ5JywgdHlwZTogJ3NtYWxsJywgdmFsdWU6ICdCcmllZiBkZXNjcmlwdGlvbid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHQsIHsgdGV4dENvbG9yOiAnc2Vjb25kYXJ5JywgdmFsdWU6ICckOCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhMaXN0SXRlbSwge2Rpc3BsYXk6ICdmbGV4JywganVzdGlmeUl0ZW1zOiAnYmV0d2Vlbid9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFZpZXcsIHt9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdUaGlyZCBpdGVtJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0JyaWVmIGRlc2NyaXB0aW9uJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzZWNvbmRhcnknLCB2YWx1ZTogJyQ1J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KExpc3RJdGVtLCB7ZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5SXRlbXM6ICdiZXR3ZWVuJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVmlldywgeyB0ZXh0Q29sb3I6ICdzdWNjZXNzJyB9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHR5cGU6ICdoNicsIG1hcmdpblRvcDogJzAnLCBtYXJnaW5Cb3R0b206ICcwJywgdmFsdWU6ICdQcm9tbyBjb2RlJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0eXBlOiAnc21hbGwnLCB2YWx1ZTogJ0VYQU1QTEVDT0RFJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dCwgeyB0ZXh0Q29sb3I6ICdzdWNjZXNzJywgdmFsdWU6ICctJDUnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoTGlzdEl0ZW0sIHtkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlJdGVtczogJ2JldHdlZW4nfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhUZXh0LCB7IHZhbHVlOiAnVG90YWwgKFVTRCknfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3KFRleHQsIHsgZm9udFdlaWdodDogJ2JvbGQnLCB2YWx1ZTogJyQyMCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHcoQ2FyZCwgeyBwYWRkaW5nTGVmdDogJzInLCBwYWRkaW5nUmlnaHQ6ICcyJywgcGFkZGluZ1RvcDogJzInLCBwYWRkaW5nQm90dG9tOiAnMid9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcoSW5wdXRHcm91cCwge30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoVGV4dElucHV0LCB7IHBsYWNlaG9sZGVyOiAnUHJvbW8gY29kZSd9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcoQWRkb24sIHt9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyhCdXR0b24sIHsgYXBwZWFyYW5jZTogJ3NlY29uZGFyeScsIHZhbHVlOiAnUmVkZWVtJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgdyhGb290ZXIsIHsgbWFyZ2luVG9wOiAnNScsIG1hcmdpbkJvdHRvbTogJzUnLCBwYWRkaW5nVG9wOiAnNScsIGFsaWdubWVudDogJ2NlbnRlcid9LCBbXHJcbiAgICAgICAgICAgICAgICB3KFRleHQsIHsgdHlwZTogJ3AnLCBtYXJnaW5Cb3R0b206ICcxJywgdmFsdWU6ICfCqSAyMDE3LTIwMTggQ29tcGFueSBOYW1lJywgdGV4dENvbG9yOiAnc2Vjb25kYXJ5J30pLFxyXG4gICAgICAgICAgICAgICAgdyhMaXN0R3JvdXAsIHsgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB9LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgdyhMaXN0SXRlbSwgeyBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KExpbmssIHsgdmFsdWU6ICdQcml2YWN5J30pXHJcbiAgICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgICAgdyhMaXN0SXRlbSwgeyBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnfSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3KExpbmssIHsgdmFsdWU6ICdUZXJtcyd9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHcoTGlzdEl0ZW0sIHsgb3JpZW50YXRpb246ICdob3Jpem9udGFsJ30sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyhMaW5rLCB7IHZhbHVlOiAnU3VwcG9ydCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja291dEZvcm0gZXh0ZW5kcyBDaGVja291dEZvcm1CYXNlIHt9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9jc3MtbW9kdWxlLWR0cy1sb2FkZXI/dHlwZT10cyZpbnN0YW5jZU5hbWU9MF9kb2pvIS4vc3JjL3dpZGdldHMvQ2hlY2tvdXRGb3JtLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==