(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hulk"] = factory();
	else
		root["hulk"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, context, definition) {
  if ( true && module.exports) module.exports = definition();
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else {}
})('urljoin', this, function () {

  function normalize (strArray) {
    var resultArray = [];
    if (strArray.length === 0) { return ''; }

    if (typeof strArray[0] !== 'string') {
      throw new TypeError('Url must be a string. Received ' + strArray[0]);
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
      var first = strArray.shift();
      strArray[0] = first + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }

    for (var i = 0; i < strArray.length; i++) {
      var component = strArray[i];

      if (typeof component !== 'string') {
        throw new TypeError('Url must be a string. Received ' + component);
      }

      if (component === '') { continue; }

      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(/^[\/]+/, '');
      }
      if (i < strArray.length - 1) {
        // Removing the ending slashes for each component but the last.
        component = component.replace(/[\/]+$/, '');
      } else {
        // For the last component we will combine multiple slashes to a single one.
        component = component.replace(/[\/]+$/, '/');
      }

      resultArray.push(component);

    }

    var str = resultArray.join('/');
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    var parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

    return str;
  }

  return function () {
    var input;

    if (typeof arguments[0] === 'object') {
      input = arguments[0];
    } else {
      input = [].slice.call(arguments);
    }

    return normalize(input);
  };

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var p_retry_1 = __importDefault(__webpack_require__(8));
var debounce_promise_1 = __importDefault(__webpack_require__(12));
var clientSubscriptionErrors_1 = __webpack_require__(2);
var FetchError = /** @class */ (function (_super) {
    __extends(FetchError, _super);
    function FetchError(message, url, method, requestBody, responseStatus) {
        var _this = _super.call(this, message) || this;
        // Check https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // to understand the need to set the prototype for PushSubscriptionError Class
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, FetchError.prototype);
        }
        else {
            /// @ts-ignore
            _this.__proto__ = FetchError.prototype;
        }
        _this.url = url;
        _this.method = method;
        _this.requestBody = requestBody;
        _this.responseStatus = responseStatus;
        return _this;
    }
    return FetchError;
}(Error));
exports.FetchError = FetchError;
var getContentTypeHeader = function (headers) {
    for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
        var header = _a[_i];
        if (header.toLowerCase() === 'content-type') {
            /// @ts-ignore
            return headers[header];
        }
    }
    return null;
};
exports.fRetry = function (retryOptions) { return function (input, init, withClientError, responseValidator) {
    if (withClientError === void 0) { withClientError = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var debounceTrackClientErrors, run;
        return __generator(this, function (_a) {
            debounceTrackClientErrors = debounce_promise_1.default(clientSubscriptionErrors_1.trackClientErrors, 500);
            run = function (numberOfAttempts) { return __awaiter(void 0, void 0, void 0, function () {
                var contentType, requestBody, url, method, body, _a, _b, _c, _d, response, isResponseInvalid, _e, message, error_1;
                var _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (init && init.method && init.method.toUpperCase() !== 'GET' && init.headers && typeof init.body === 'string') {
                                contentType = getContentTypeHeader(init.headers);
                                if (contentType && contentType.toLowerCase() === 'application/json') {
                                    requestBody = JSON.parse(init.body);
                                    if (typeof requestBody === 'object') {
                                        init.body = JSON.stringify(__assign({ __numberOfAttempts: numberOfAttempts }, requestBody));
                                    }
                                }
                            }
                            url = typeof input === 'string' ? input : input.url;
                            method = (init && init.method) || (typeof input !== 'string' && input.method) || 'get';
                            _b = (_a = JSON).parse;
                            _c = (init && init.body);
                            if (_c) return [3 /*break*/, 3];
                            _d = typeof input !== 'string';
                            if (!_d) return [3 /*break*/, 2];
                            return [4 /*yield*/, input.clone().text()];
                        case 1:
                            _d = (_g.sent());
                            _g.label = 2;
                        case 2:
                            _c = (_d);
                            _g.label = 3;
                        case 3:
                            body = _b.apply(_a, [(_c).toString()]) ||
                                undefined;
                            _g.label = 4;
                        case 4:
                            _g.trys.push([4, 8, 9, 10]);
                            return [4 /*yield*/, fetch(input, __assign(__assign({}, init), { credentials: (init === null || init === void 0 ? void 0 : init.credentials) || 'omit' }))];
                        case 5:
                            response = _g.sent();
                            _e = responseValidator;
                            if (!_e) return [3 /*break*/, 7];
                            return [4 /*yield*/, responseValidator(response)];
                        case 6:
                            _e = !(_g.sent());
                            _g.label = 7;
                        case 7:
                            isResponseInvalid = _e;
                            if (!response.ok || isResponseInvalid) {
                                message = isResponseInvalid ? 'Failed response validation' : response.statusText;
                                throw new FetchError(message, url, method, body, response.status);
                            }
                            return [2 /*return*/, response];
                        case 8:
                            error_1 = _g.sent();
                            if (error_1 instanceof FetchError) {
                                throw error_1;
                            }
                            throw new FetchError(error_1.message || 'Unexpected fetch error', url, method, body);
                        case 9:
                            if (withClientError) {
                                // @ts-ignore
                                // tslint:disable-next-line: no-floating-promises
                                debounceTrackClientErrors((_f = init === null || init === void 0 ? void 0 : init.headers) === null || _f === void 0 ? void 0 : _f.Authorization);
                            }
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            }); };
            return [2 /*return*/, p_retry_1.default(run, retryOptions)];
        });
    });
}; };
var fetchWithRetry = exports.fRetry({ retries: 5 });
exports.default = fetchWithRetry;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleStorage_1 = __importDefault(__webpack_require__(3));
var serialize_error_1 = __webpack_require__(6);
var url_join_1 = __importDefault(__webpack_require__(0));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var storageKey = 'MOL-FE-WEB-PUSH_CLIENT_SUBSCRIPTION_ERRORS';
var sessionStore = new SimpleStorage_1.default(storageKey, sessionStorage);
var baseEndpoint;
exports.setBaseEndpoint = function (endpoint) { return (baseEndpoint = endpoint); };
exports.getErrors = function () { return sessionStore.get(); };
exports.addError = function (err) {
    var error = serialize_error_1.serializeError(err);
    var session = exports.getErrors();
    // a bit crude and not 100% efficient
    var isDuplicate = session === null || session === void 0 ? void 0 : session.find(function (storedError) { return JSON.stringify(storedError) === JSON.stringify(error); });
    if (!isDuplicate) {
        sessionStore.set(__spreadArrays((session || []), [error]));
    }
};
exports.clear = function () { return sessionStore.clear(); };
exports.trackClientErrors = function (authorizationHeader) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, trackEndpoint, requestInit, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = exports.getErrors();
                if (!errors || errors.length === 0) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                trackEndpoint = url_join_1.default(baseEndpoint, 'analytics/client/error');
                requestInit = {
                    body: JSON.stringify({ errors: errors }),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'post'
                };
                if (authorizationHeader) {
                    requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: authorizationHeader });
                }
                return [4 /*yield*/, fetchWithRetry_1.default(trackEndpoint, requestInit, false)];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                exports.clear();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                // noop for now we do not care if it fails
                // tslint:disable-next-line: no-console
                console.error('Track Client Errors', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SimpleStorage = /** @class */ (function () {
    function SimpleStorage(name, storageMechanism) {
        if (storageMechanism === void 0) { storageMechanism = localStorage; }
        this.name = name;
        this.storage = storageMechanism;
    }
    SimpleStorage.prototype.get = function () {
        try {
            var rawData = this.storage.getItem(this.name);
            if (rawData !== null) {
                return JSON.parse(rawData);
            }
        }
        catch (error) {
            // tslint:disable-next-line: no-console
            console.error(error);
        }
        return null;
    };
    SimpleStorage.prototype.set = function (data) {
        try {
            this.storage.setItem(this.name, JSON.stringify(data));
        }
        catch (error) {
            // tslint:disable-next-line: no-console
            console.error(error);
        }
    };
    SimpleStorage.prototype.clear = function () {
        try {
            this.storage.removeItem(this.name);
        }
        catch (error) {
            // tslint:disable-next-line: no-console
            console.error(error);
        }
    };
    return SimpleStorage;
}());
exports.default = SimpleStorage;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var equalUint8Array_1 = __importDefault(__webpack_require__(13));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var PushSubscriptionError_1 = __importDefault(__webpack_require__(7));
exports.isWebPushSupported = function () { return 'serviceWorker' in navigator && 'PushManager' in window; };
var msPerWeek = 7 * 24 * 60 * 60 * 1000;
exports.needsMigration = function (subscription, appServerKey) {
    return (subscription.options.applicationServerKey instanceof ArrayBuffer &&
        !equalUint8Array_1.default(appServerKey, new Uint8Array(subscription.options.applicationServerKey, 0)));
};
exports.willExpireSoon = function (subscription) {
    return !!subscription.expirationTime && subscription.expirationTime < Date.now() + msPerWeek;
};
var isValidPushSubscription = function (subscription) {
    var auth;
    var p256dh;
    try {
        auth = subscription.getKey('auth');
        p256dh = subscription.getKey('p256dh');
    }
    catch (error) {
        // tslint:disable-next-line: no-console
        console.error("Unable to get auth and p256dh keys, subscription " + JSON.stringify(subscription, null, 2));
        return false;
    }
    return auth !== null && p256dh !== null;
};
exports.registerPushSubscription = function (subscriptionEndpoint, _a, apiKey) {
    var subscription = _a.subscription, metadata = _a.metadata;
    return __awaiter(void 0, void 0, void 0, function () {
        var body, requestInit;
        return __generator(this, function (_b) {
            if (isValidPushSubscription(subscription)) {
                body = {
                    metadata: __assign(__assign({}, metadata), { browserLanguage: navigator.language, subscribedUrl: location.href }),
                    subscription: subscription
                };
                requestInit = {
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors'
                };
                if (apiKey) {
                    requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey " + apiKey });
                }
                return [2 /*return*/, fetchWithRetry_1.default(subscriptionEndpoint, requestInit)];
            }
            return [2 /*return*/, undefined];
        });
    });
};
exports.subscribePushNotifications = function (_a) {
    var apiKey = _a.apiKey, appServerKey = _a.appServerKey, metadata = _a.metadata, subscriptionEndpoint = _a.subscriptionEndpoint, registration = _a.registration;
    return __awaiter(void 0, void 0, void 0, function () {
        var subscription, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, registration.pushManager.subscribe({
                            applicationServerKey: appServerKey,
                            userVisibleOnly: true
                        })];
                case 1:
                    subscription = _b.sent();
                    return [4 /*yield*/, exports.registerPushSubscription(subscriptionEndpoint, { subscription: subscription, metadata: metadata }, apiKey)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, subscription];
                case 3:
                    error_1 = _b.sent();
                    throw new PushSubscriptionError_1.default(error_1.message, 'register', error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.requestPushNotificationPermission = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var response = Notification.requestPermission(function (result) {
                    resolve(result);
                });
                if (response instanceof Promise) {
                    response.then(resolve, reject);
                }
            })];
    });
}); };
exports.requestPushPermissionAndSubscribe = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var permission;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.requestPushNotificationPermission()];
            case 1:
                permission = _a.sent();
                if (!(permission === 'granted')) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.subscribePushNotifications(__assign({}, options))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, permission];
        }
    });
}); };
exports.updatePushSubscription = function (subscriptionEndpoint, _a, apiKey) {
    var subscription = _a.subscription, metadata = _a.metadata;
    return __awaiter(void 0, void 0, void 0, function () {
        var body, requestInit, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = {
                        metadata: __assign(__assign({}, metadata), { browserLanguage: navigator.language, subscribedUrl: location.href }),
                        subscription: subscription
                    };
                    requestInit = {
                        body: JSON.stringify(body),
                        headers: {
                            'Content-type': 'application/json'
                        },
                        method: 'PATCH',
                        mode: 'cors'
                    };
                    if (apiKey) {
                        requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey " + apiKey });
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchWithRetry_1.default(subscriptionEndpoint, requestInit)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    throw new PushSubscriptionError_1.default(error_2.message, 'update', error_2);
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.replaceSubscription = function (_a) {
    var apiKey = _a.apiKey, appServerKey = _a.appServerKey, metadata = _a.metadata, registration = _a.registration, subscription = _a.subscription, subscriptionEndpoint = _a.subscriptionEndpoint;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, subscription.unsubscribe()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, exports.subscribePushNotifications({
                            apiKey: apiKey,
                            appServerKey: appServerKey,
                            metadata: metadata,
                            registration: registration,
                            subscriptionEndpoint: subscriptionEndpoint
                        })];
            }
        });
    });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleStorage_1 = __importDefault(__webpack_require__(3));
var storage = new SimpleStorage_1.default('MOL-FE-WEB-PUSH_SUBSCRIPTION_STATUS');
exports.setStatus = function (state, metadata) {
    storage.set({ state: state, metadata: metadata });
};
exports.getStatus = function () { return storage.get(); };
exports.clearStatus = function () { return storage.clear(); };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class NonError extends Error {
	constructor(message) {
		super(NonError._prepareSuperMessage(message));
		Object.defineProperty(this, 'name', {
			value: 'NonError',
			configurable: true,
			writable: true
		});

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NonError);
		}
	}

	static _prepareSuperMessage(message) {
		try {
			return JSON.stringify(message);
		} catch (_) {
			return String(message);
		}
	}
}

const commonProperties = [
	{property: 'name', enumerable: false},
	{property: 'message', enumerable: false},
	{property: 'stack', enumerable: false},
	{property: 'code', enumerable: true}
];

const destroyCircular = ({from, seen, to_, forceEnumerable}) => {
	const to = to_ || (Array.isArray(from) ? [] : {});

	seen.push(from);

	for (const [key, value] of Object.entries(from)) {
		if (typeof value === 'function') {
			continue;
		}

		if (!value || typeof value !== 'object') {
			to[key] = value;
			continue;
		}

		if (!seen.includes(from[key])) {
			to[key] = destroyCircular({from: from[key], seen: seen.slice(), forceEnumerable});
			continue;
		}

		to[key] = '[Circular]';
	}

	for (const {property, enumerable} of commonProperties) {
		if (typeof from[property] === 'string') {
			Object.defineProperty(to, property, {
				value: from[property],
				enumerable: forceEnumerable ? true : enumerable,
				configurable: true,
				writable: true
			});
		}
	}

	return to;
};

const serializeError = value => {
	if (typeof value === 'object' && value !== null) {
		return destroyCircular({from: value, seen: [], forceEnumerable: true});
	}

	// People sometimes throw things besides Error objects…
	if (typeof value === 'function') {
		// `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
		return `[Function: ${(value.name || 'anonymous')}]`;
	}

	return value;
};

const deserializeError = value => {
	if (value instanceof Error) {
		return value;
	}

	if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
		const newError = new Error();
		destroyCircular({from: value, seen: [], to_: newError});
		return newError;
	}

	return new NonError(value);
};

module.exports = {
	serializeError,
	deserializeError
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PushSubscriptionError = /** @class */ (function (_super) {
    __extends(PushSubscriptionError, _super);
    function PushSubscriptionError(message, type, cause) {
        var _this = _super.call(this, message) || this;
        // Check https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // to understand the need to set the prototype for PushSubscriptionError Class
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, PushSubscriptionError.prototype);
        }
        else {
            /// @ts-ignore
            _this.__proto__ = PushSubscriptionError.prototype;
        }
        _this.type = type;
        _this.cause = cause;
        return _this;
    }
    return PushSubscriptionError;
}(Error));
exports.default = PushSubscriptionError;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const retry = __webpack_require__(9);

class AbortError extends Error {
  constructor(message) {
    super();

    if (message instanceof Error) {
      this.originalError = message;
      ({
        message
      } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }

    this.name = 'AbortError';
    this.message = message;
  }

}

const decorateErrorWithCounts = (error, attemptNumber, options) => {
  // Minus 1 from attemptNumber because the first attempt does not count as a retry
  const retriesLeft = options.retries - (attemptNumber - 1);
  error.attemptNumber = attemptNumber;
  error.retriesLeft = retriesLeft;
  return error;
};

const pRetry = (input, options) => new Promise((resolve, reject) => {
  options = {
    onFailedAttempt: () => {},
    retries: 10,
    ...options
  };
  const operation = retry.operation(options);
  operation.attempt(async attemptNumber => {
    try {
      resolve((await input(attemptNumber)));
    } catch (error) {
      if (!(error instanceof Error)) {
        reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
        return;
      }

      if (error instanceof AbortError) {
        operation.stop();
        reject(error.originalError);
      } else if (error instanceof TypeError) {
        operation.stop();
        reject(error);
      } else {
        decorateErrorWithCounts(error, attemptNumber, options);

        try {
          await options.onFailedAttempt(error);
        } catch (error) {
          reject(error);
          return;
        }

        if (!operation.retry(error)) {
          reject(operation.mainError());
        }
      }
    }
  });
});

module.exports = pRetry; // TODO: remove this in the next major version

module.exports.default = pRetry;
module.exports.AbortError = AbortError;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var RetryOperation = __webpack_require__(11);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && options.forever,
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts;
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(this._errors.length - 1, this._errors.length);
      this._timeouts = this._cachedTimeouts.slice(0);
      timeout = this._timeouts.shift();
    } else {
      return false;
    }
  }

  var self = this;
  var timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global setTimeout, clearTimeout */

module.exports = function debounce(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var lastCallAt = void 0;
  var deferred = void 0;
  var timer = void 0;
  var pendingArgs = [];
  return function debounced() {
    var currentWait = getWait(wait);
    var currentTime = new Date().getTime();

    var isCold = !lastCallAt || currentTime - lastCallAt > currentWait;

    lastCallAt = currentTime;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isCold && options.leading) {
      return options.accumulate ? Promise.resolve(fn.call(this, [args])).then(function (result) {
        return result[0];
      }) : Promise.resolve(fn.call.apply(fn, [this].concat(args)));
    }

    if (deferred) {
      clearTimeout(timer);
    } else {
      deferred = defer();
    }

    pendingArgs.push(args);
    timer = setTimeout(flush.bind(this), currentWait);

    if (options.accumulate) {
      var argsIndex = pendingArgs.length - 1;
      return deferred.promise.then(function (results) {
        return results[argsIndex];
      });
    }

    return deferred.promise;
  };

  function flush() {
    var thisDeferred = deferred;
    clearTimeout(timer);

    Promise.resolve(options.accumulate ? fn.call(this, pendingArgs) : fn.apply(this, pendingArgs[pendingArgs.length - 1])).then(thisDeferred.resolve, thisDeferred.reject);

    pendingArgs = [];
    deferred = null;
  }
};

function getWait(wait) {
  return typeof wait === 'function' ? wait() : wait;
}

function defer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var equalUint8Array = function (a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    for (var i = 0; i !== a.byteLength; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};
exports.default = equalUint8Array;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (environment) {
    switch (environment) {
        case 'production':
            return 'https://hulkprod.anm.co.uk/api/web-push-notification';
        case 'integration':
            return 'https://hulkint.anm.co.uk/api/web-push-notification';
        default:
            return '/public';
    }
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PushSubscriptionError_1 = __importDefault(__webpack_require__(7));
var subscriptionStatus_1 = __webpack_require__(5);
var serialize_error_1 = __webpack_require__(6);
var clientSubscriptionErrors_1 = __webpack_require__(2);
exports.default = (function (error, _a) {
    var emit = _a.emit, metadata = _a.metadata, rawAppServerKey = _a.rawAppServerKey;
    if (error instanceof PushSubscriptionError_1.default) {
        if (error.type === 'register') {
            subscriptionStatus_1.setStatus('register_pending', metadata);
        }
        else if (error.type === 'update') {
            subscriptionStatus_1.setStatus('update_pending', metadata);
        }
    }
    var enhancedSerializedError = __assign(__assign({}, serialize_error_1.serializeError(error)), { organisation: metadata.organisation, rawAppServerKey: rawAppServerKey, userAgent: metadata.userAgent });
    // tslint:disable-next-line: no-any
    if (true) {
        clientSubscriptionErrors_1.addError(enhancedSerializedError);
    }
    emit('error', enhancedSerializedError);
});


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var trackEvent_1 = __importDefault(__webpack_require__(23));
var safeTrackEvent = function (baseEndpoint, event, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, trackEvent_1.default(baseEndpoint, event, apiKey)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                // tslint:disable-next-line: no-console
                console.error('TrackEvent Error', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = safeTrackEvent;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_join_1 = __importDefault(__webpack_require__(0));
var Emitter_1 = __importDefault(__webpack_require__(18));
var fetchApplicationServerKey_1 = __importDefault(__webpack_require__(19));
var init_1 = __importDefault(__webpack_require__(21));
var showPrompt_1 = __importDefault(__webpack_require__(26));
var getBaseEndpoint_1 = __importDefault(__webpack_require__(14));
var pushSubscription_1 = __webpack_require__(4);
var validateRegisterOpts_1 = __importDefault(__webpack_require__(28));
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register(options) {
        var _this = _super.call(this) || this;
        _this.appServerKey = null;
        _this.registration = null;
        var baseEndpoint = options.environment ? getBaseEndpoint_1.default(options.environment) : options.baseEndpoint || '';
        _this.options = validateRegisterOpts_1.default(__assign({}, options));
        _this.baseEndpoint = url_join_1.default(baseEndpoint, '/v1/organisation', _this.options.metadata.organisation);
        _this.subscriptionEndpoint = url_join_1.default(_this.baseEndpoint, 'subscription');
        return _this;
    }
    Register.isWebPushSupported = function () {
        return pushSubscription_1.isWebPushSupported();
    };
    Register.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parsed, raw, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getAppServerKey()];
                    case 1:
                        _a = (_c.sent()) || {}, parsed = _a.parsed, raw = _a.raw;
                        _b = this;
                        return [4 /*yield*/, init_1.default(__assign(__assign({}, this.options), { appServerKey: parsed, baseEndpoint: this.baseEndpoint, emit: function (name, args) { return _this.emit(name, args); }, rawAppServerKey: raw, subscriptionEndpoint: this.subscriptionEndpoint }))];
                    case 2:
                        _b.registration = _c.sent();
                        return [2 /*return*/, this.registration];
                }
            });
        });
    };
    Register.prototype.showPrompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parsed, raw;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAppServerKey()];
                    case 1:
                        _a = (_b.sent()) || {}, parsed = _a.parsed, raw = _a.raw;
                        if (this.registration === null) {
                            throw new Error('Init must be called before attempting to call showPrompt');
                        }
                        return [2 /*return*/, showPrompt_1.default(this.registration, __assign(__assign({}, this.options), { appServerKey: parsed, baseEndpoint: this.baseEndpoint, emit: function (name, args) { return _this.emit(name, args); }, rawAppServerKey: raw, subscriptionEndpoint: this.subscriptionEndpoint }))];
                }
            });
        });
    };
    Register.prototype.getAppServerKey = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.appServerKey === null || force)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, fetchApplicationServerKey_1.default(url_join_1.default(this.subscriptionEndpoint, 'publicKey'), this.options.apiKey)];
                    case 1:
                        _a.appServerKey = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.appServerKey];
                }
            });
        });
    };
    return Register;
}(Emitter_1.default));
exports.Register = Register;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @alias module:tiny-emitter
 * @class
 * @description Subset of  node's [Emitter class]{@link https://nodejs.org/api/events.html#events_class_eventemitter}
 * @param logger - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 */
var Emitter = /** @class */ (function () {
    function Emitter(logger) {
        this.events = {};
        this.logger = logger || console;
    }
    /**a
     * Adds the listener function to the end of the listeners array for the event named eventName.
     *
     * @param eventName - The name of the event.
     * @param listener - Listener fn that handles the evt.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.on = function (eventName, listener) {
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        evtListeners.push(listener);
        return this;
    };
    /**
     * Removes the specified listener from the listener array for the event named eventName.
     *
     * @param eventName - The name of the event.
     * @param listener - Listener fn that handles the evt.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.removeListener = function (eventName, listener) {
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        events[eventName] = evtListeners.filter(function (eListener) { return eListener !== listener; });
        return this;
    };
    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * @param eventName - The name of the event. Optional if ommited all listeners will be removed.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.removeAllListeners = function (eventName) {
        if (eventName) {
            this.events[eventName] = null;
        }
        else {
            this.events = {};
        }
        return this;
    };
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param eventName - The name of the event.
     * @returns - Returns true if the event had listeners, false otherwise.
     */
    // tslint:disable:no-any
    Emitter.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        var haveListeners = evtListeners.length > 0;
        var clonedArgs = args;
        // due to unexpected mutations on the event data (rta), we clone the data to prevent errors in ES
        try {
            clonedArgs = JSON.parse(JSON.stringify(args));
        }
        catch (e) {
            // noop
        }
        evtListeners.forEach(function (handler) {
            try {
                handler.apply(void 0, clonedArgs);
            }
            catch (error) {
                _this.logger.error(error, error.stack);
            }
        });
        return haveListeners;
    };
    return Emitter;
}());
exports.default = Emitter;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlBase64ToUint8Array_1 = __importDefault(__webpack_require__(20));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var fetchApplicationServerKey = function (serverKeyEndpoint, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var requestInit, response, vapidPublicKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestInit = {
                    mode: 'cors'
                };
                if (apiKey) {
                    requestInit.headers = { Authorization: "ApiKey " + apiKey };
                }
                return [4 /*yield*/, fetchWithRetry_1.default(serverKeyEndpoint, requestInit, true, function (res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, res.clone().text()];
                            case 1: return [2 /*return*/, (_a.sent()).trim() !== ''];
                        }
                    }); }); })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                vapidPublicKey = _a.sent();
                return [2 /*return*/, {
                        parsed: urlBase64ToUint8Array_1.default(vapidPublicKey),
                        raw: vapidPublicKey
                    }];
        }
    });
}); };
exports.default = fetchApplicationServerKey;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hasAtobBeenTampered = function () {
    try {
        // @ts-ignore
        window.atob();
        return true;
    }
    catch (error) {
        return false;
    }
};
// Original code from https://gist.github.com/oeon/0ada0457194ebf70ec2428900ba76255
var decode = function (encoded) {
    var b;
    var c;
    var d;
    var char64Number = {};
    var f = 0;
    var g = 0;
    var decoded = '';
    var length = encoded.length;
    for (b = 0; b < 64; b++) {
        char64Number['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(b)] = b;
    }
    for (c = 0; c < length; c++) {
        // tslint:disable-next-line: ban-comma-operator no-bitwise
        for (b = char64Number[encoded.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;) {
            // tslint:disable-next-line: ban-comma-operator no-unused-expression no-bitwise
            ((d = 255 & (f >>> (g -= 8))) || length - 2 > c) && (decoded += String.fromCharCode(d));
        }
    }
    return decoded;
};
// Note: from https://github.com/web-push-libs/web-push#using-vapid-key-for-applicationserverkey
var urlBase64ToUint8Array = function (base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var rawData;
    rawData = hasAtobBeenTampered() ? decode(base64) : window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
exports.default = urlBase64ToUint8Array;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var documentReady_1 = __importDefault(__webpack_require__(22));
var pushSubscription_1 = __webpack_require__(4);
var subscriptionStatus_1 = __webpack_require__(5);
var handleSubscriptionError_1 = __importDefault(__webpack_require__(15));
var clientSubscriptionErrors_1 = __webpack_require__(2);
var safeTrackEvent_1 = __importDefault(__webpack_require__(16));
var crossOrgRequest_1 = __webpack_require__(24);
var getCentralCrossOrgUserId = function (metadata, emit, rawAppServerKey) { return __awaiter(void 0, void 0, void 0, function () {
    var subscriptionStatus, organisation, crossOrgUserIds, crossOrgUserId, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subscriptionStatus = subscriptionStatus_1.getStatus();
                organisation = metadata.organisation;
                crossOrgUserIds = subscriptionStatus && Array.isArray(subscriptionStatus.metadata.crossOrgUserIds)
                    ? subscriptionStatus.metadata.crossOrgUserIds
                    : [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, crossOrgRequest_1.getCrossOrgUserIdFromCentral(organisation)];
            case 2:
                crossOrgUserId = (_a.sent()) || undefined;
                if (crossOrgUserId && !crossOrgUserIds.includes(crossOrgUserId)) {
                    // Don't wait for this to complete
                    crossOrgRequest_1.updateCrossOrgUserIdOnOtherOrgs(organisation, crossOrgUserId).catch(function (error) {
                        handleSubscriptionError_1.default(error, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                    });
                }
                return [2 /*return*/, crossOrgUserId];
            case 3:
                error_1 = _a.sent();
                handleSubscriptionError_1.default(error_1, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, crossOrgUserIds[crossOrgUserIds.length - 1]];
        }
    });
}); };
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, appServerKey, notificationMacros, emit, metadata, baseEndpoint, swUrl, subscriptionEndpoint, rawAppServerKey, visitorId, userAgent, params, ito, subscriptionStatus, crossOrgUserId, crossOrgUserIds, campaignId, subscriptionId, assetId, notificationClickEvent, error_2, registration, subscription, migrated, msgData, newMeta, newState, newMeta, meta, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = options.apiKey, appServerKey = options.appServerKey, notificationMacros = options.notificationMacros, emit = options.emit, metadata = options.metadata, baseEndpoint = options.baseEndpoint, swUrl = options.swUrl, subscriptionEndpoint = options.subscriptionEndpoint, rawAppServerKey = options.rawAppServerKey;
                visitorId = Array.isArray(metadata.visitorIds) ? metadata.visitorIds[0] : undefined;
                userAgent = metadata.userAgent;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 21, , 22]);
                return [4 /*yield*/, documentReady_1.default];
            case 2:
                _a.sent();
                params = new URLSearchParams(window.location.search);
                ito = params.get('ito');
                clientSubscriptionErrors_1.setBaseEndpoint(baseEndpoint);
                subscriptionStatus = subscriptionStatus_1.getStatus();
                return [4 /*yield*/, getCentralCrossOrgUserId(metadata, emit, rawAppServerKey)];
            case 3:
                crossOrgUserId = _a.sent();
                crossOrgUserIds = crossOrgUserId ? [crossOrgUserId] : undefined;
                metadata.crossOrgUserIds = crossOrgUserIds;
                if (!(ito === 'push-notification')) return [3 /*break*/, 5];
                campaignId = params.get('ci');
                subscriptionId = params.get('si');
                assetId = params.get('ai');
                if (!(campaignId && subscriptionId)) return [3 /*break*/, 5];
                notificationClickEvent = {
                    action: 'click',
                    campaignId: campaignId,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    platform: metadata.platform,
                    subscriptionId: subscriptionId,
                    type: 'notification',
                    userAgent: userAgent,
                    visitorId: visitorId
                };
                if (assetId) {
                    notificationClickEvent.assetId = assetId;
                }
                emit('notification_click', notificationClickEvent);
                return [4 /*yield*/, safeTrackEvent_1.default(baseEndpoint, __assign(__assign({}, notificationClickEvent), { action: 'click_page_load' }), apiKey)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!swUrl) return [3 /*break*/, 9];
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, navigator.serviceWorker.register(swUrl, { scope: '/' })];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                // tslint:disable-next-line: no-console
                console.error('ServiceWorker registration failed: ', error_2);
                return [3 /*break*/, 9];
            case 9: return [4 /*yield*/, navigator.serviceWorker.ready];
            case 10:
                registration = _a.sent();
                return [4 /*yield*/, registration.pushManager.getSubscription()];
            case 11:
                subscription = _a.sent();
                migrated = !!subscription && pushSubscription_1.needsMigration(subscription, appServerKey);
                subscriptionStatus = subscriptionStatus_1.getStatus();
                msgData = {
                    apiKey: apiKey,
                    baseEndpoint: baseEndpoint,
                    crossOrgUserId: crossOrgUserId,
                    navigatorPlatform: window.navigator.platform,
                    notificationMacros: notificationMacros,
                    organisation: metadata.organisation,
                    permission: Notification.permission,
                    subscription: migrated ? null : subscription,
                    type: 'web-push-sw-init-data',
                    userAgent: metadata.userAgent,
                    visitorId: visitorId
                };
                /// @ts-ignore
                registration.active.postMessage(JSON.stringify(msgData));
                if (subscriptionStatus && subscriptionStatus.state === 'undecided' && Notification.permission === 'granted') {
                    subscriptionStatus_1.setStatus('register_pending', subscriptionStatus.metadata);
                    subscriptionStatus = subscriptionStatus_1.getStatus();
                }
                if (subscriptionStatus &&
                    subscriptionStatus.state !== 'undecided' &&
                    subscriptionStatus.metadata &&
                    (subscriptionStatus.metadata.userAgent !== metadata.userAgent ||
                        subscriptionStatus.metadata.profilingAllowed !== metadata.profilingAllowed ||
                        (subscriptionStatus.metadata.visitorIds || []).join(',') !== (metadata.visitorIds || []).join(',') ||
                        (subscriptionStatus.metadata.crossOrgUserIds || []).join(',') !== (crossOrgUserIds || []).join(',') ||
                        ito === 'push-notification')) {
                    newMeta = __assign(__assign({}, subscriptionStatus.metadata), { crossOrgUserIds: Array.from(new Set(__spreadArrays((subscriptionStatus.metadata.crossOrgUserIds || []), (crossOrgUserIds || [])))), keywords: Array.from(new Set(__spreadArrays((subscriptionStatus.metadata.keywords || []), (metadata.keywords || [])))), profilingAllowed: metadata.profilingAllowed, userAgent: metadata.userAgent, visitorIds: Array.from(new Set(__spreadArrays((subscriptionStatus.metadata.visitorIds || []), (metadata.visitorIds || [])))) });
                    newState = subscriptionStatus.state === 'ready' ? 'update_pending' : subscriptionStatus.state;
                    subscriptionStatus_1.setStatus(newState, newMeta);
                    subscriptionStatus = subscriptionStatus_1.getStatus();
                }
                if (!subscription) return [3 /*break*/, 18];
                newMeta = subscriptionStatus ? subscriptionStatus.metadata : metadata;
                if (!(migrated || pushSubscription_1.willExpireSoon(subscription))) return [3 /*break*/, 13];
                return [4 /*yield*/, pushSubscription_1.replaceSubscription({
                        apiKey: apiKey,
                        appServerKey: appServerKey,
                        metadata: __assign(__assign({}, metadata), { migrated: migrated, migratedSubscriptionEndpoint: migrated ? subscription.endpoint : undefined }),
                        registration: registration,
                        subscription: subscription,
                        subscriptionEndpoint: subscriptionEndpoint
                    })];
            case 12:
                _a.sent();
                return [3 /*break*/, 17];
            case 13:
                if (!(subscriptionStatus && subscriptionStatus.state === 'register_pending')) return [3 /*break*/, 15];
                return [4 /*yield*/, pushSubscription_1.registerPushSubscription(subscriptionEndpoint, { subscription: subscription, metadata: newMeta }, apiKey)];
            case 14:
                _a.sent();
                return [3 /*break*/, 17];
            case 15:
                if (!((subscriptionStatus && subscriptionStatus.state === 'update_pending') || !subscriptionStatus)) return [3 /*break*/, 17];
                return [4 /*yield*/, pushSubscription_1.updatePushSubscription(subscriptionEndpoint, { subscription: subscription, metadata: newMeta }, apiKey)];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17:
                subscriptionStatus_1.setStatus('ready', metadata);
                return [3 /*break*/, 20];
            case 18:
                if (!(Notification.permission === 'granted')) return [3 /*break*/, 20];
                meta = subscriptionStatus ? subscriptionStatus.metadata : metadata;
                return [4 /*yield*/, pushSubscription_1.subscribePushNotifications({
                        apiKey: apiKey,
                        appServerKey: appServerKey,
                        metadata: meta,
                        registration: registration,
                        subscriptionEndpoint: subscriptionEndpoint
                    })];
            case 19:
                _a.sent();
                subscriptionStatus_1.setStatus('ready', meta);
                _a.label = 20;
            case 20: return [2 /*return*/, registration];
            case 21:
                error_3 = _a.sent();
                handleSubscriptionError_1.default(error_3, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/, null];
        }
    });
}); });


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var waitForDocumentReady = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                /* istanbul ignore else */
                if (document.readyState === 'complete') {
                    resolve();
                    return;
                }
                document.addEventListener('readystatechange', function () {
                    if (document.readyState === 'complete') {
                        resolve();
                    }
                });
            })];
    });
}); };
var documentReady = waitForDocumentReady();
exports.default = documentReady;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_join_1 = __importDefault(__webpack_require__(0));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var trackEvent = function (baseEndpoint, event, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var type, action, trackEndpoint, requestInit;
    return __generator(this, function (_a) {
        type = event.type, action = event.action;
        trackEndpoint = url_join_1.default(baseEndpoint, 'analytics/track', type, action);
        requestInit = {
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'post',
            mode: 'cors'
        };
        if (apiKey) {
            requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey " + apiKey });
        }
        return [2 /*return*/, fetchWithRetry_1.default(trackEndpoint, requestInit)];
    });
}); };
exports.default = trackEvent;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var crossFrame_1 = __webpack_require__(25);
exports.API_ROOT_BY_ENV = {
    development: {
        central: location.protocol + "//" + location.host + "/public/v1/static/latest/mol-fe-web-push-browser-register",
        metro: location.protocol + "//" + location.host + "/public/v1/static/latest/mol-fe-web-push-browser-register",
        mol: location.protocol + "//" + location.host + "/public/v1/static/latest/mol-fe-web-push-browser-register",
        newzit: location.protocol + "//" + location.host + "/public/v1/static/latest/mol-fe-web-push-browser-register"
    },
    integration: {
        central: 'https://hulkint.anm.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        metro: 'https://test1.metro.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        mol: 'https://www.dailymailint.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        newzit: 'https://www.newzitint.com/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register'
    },
    production: {
        central: 'https://hulkprod.anm.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        metro: 'https://metro.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        mol: 'https://www.dailymail.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register',
        newzit: 'https://www.newzit.com/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register'
    }
};
var PROD_HOSTNAMES = {
    metro: ['metro.co.uk'],
    mol: ['www.dailymail.co.uk', 'a.dailymail.co.uk', 'b.dailymail.co.uk', 'c.dailymail.co.uk'],
    newzit: ['www.newzit.com']
};
var CROSS_UPDATING_ORGANISATIONS = ['mol', 'newzit', 'metro'];
var getEnvironmentByOrganisationAndUrl = function (organisation, url) {
    var hostname = new URL(url).hostname;
    if (hostname === 'localhost' || hostname.endsWith('ngrok.io')) {
        return 'development';
    }
    if (!PROD_HOSTNAMES[organisation]) {
        throw new Error("No hostnames for organisation: " + organisation);
    }
    if (PROD_HOSTNAMES[organisation].includes(hostname)) {
        return 'production';
    }
    return 'integration';
};
exports.getCrossOrgUserIdFromCentral = function (organisation) { return __awaiter(void 0, void 0, void 0, function () {
    var environment, frameUrl, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                environment = getEnvironmentByOrganisationAndUrl(organisation, location.href);
                frameUrl = exports.API_ROOT_BY_ENV[environment].central + "/crossOrgInlinedMin.html?command=getCrossOrgUserId";
                return [4 /*yield*/, crossFrame_1.loadIframeAndWaitForMessage(frameUrl, 'mol-fe-web-push-cross-org-user-id')];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data && data.crossOrgUserId];
        }
    });
}); };
exports.updateCrossOrgUserIdOnOtherOrgs = function (currentOrg, crossOrgUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var environment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!CROSS_UPDATING_ORGANISATIONS.includes(currentOrg)) {
                    return [2 /*return*/];
                }
                environment = getEnvironmentByOrganisationAndUrl(currentOrg, location.href);
                return [4 /*yield*/, Promise.all(CROSS_UPDATING_ORGANISATIONS.filter(function (org) { return org !== currentOrg; }).map(function (organisation) { return __awaiter(void 0, void 0, void 0, function () {
                        var frameUrl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    frameUrl = exports.API_ROOT_BY_ENV[environment][organisation] + "/crossOrgInlinedMin.html?command=updateCrossOrgUserId&crossOrgUserId=" + crossOrgUserId + "&environment=" + environment;
                                    return [4 /*yield*/, crossFrame_1.loadIframeAndWaitForMessage(frameUrl, 'mol-fe-web-push-cross-org-update')];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var FRAME_TIMEOUT = 10000;
exports.loadIframeAndWaitForMessage = function (frameUrl, expectedScope) { return __awaiter(void 0, void 0, void 0, function () {
    var expectedOrigin;
    return __generator(this, function (_a) {
        expectedOrigin = new URL(frameUrl).origin;
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var timeout;
                var iframe = null;
                var messageHandler = function (event) {
                    if (event.data.scope !== expectedScope || event.origin !== expectedOrigin) {
                        return;
                    }
                    window.removeEventListener('message', messageHandler);
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    if (typeof event.data.data !== 'undefined') {
                        resolve(event.data.data);
                    }
                    else {
                        reject(new Error('Invalid data posted back from crossOrg iframe'));
                    }
                    if (iframe) {
                        iframe.remove();
                    }
                };
                window.addEventListener('message', messageHandler);
                iframe = document.createElement('iframe');
                iframe.style.width = '0px';
                iframe.style.height = '0px';
                iframe.style.border = 'none';
                iframe.src = frameUrl;
                document.body.appendChild(iframe);
                timeout = window.setTimeout(function () {
                    window.removeEventListener('message', messageHandler);
                    reject(new Error('crossOrg iframe timed out'));
                    if (iframe) {
                        iframe.remove();
                    }
                }, FRAME_TIMEOUT);
            })];
    });
}); };


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ms_1 = __importDefault(__webpack_require__(27));
var pushSubscription_1 = __webpack_require__(4);
var subscriptionStatus_1 = __webpack_require__(5);
var safeTrackEvent_1 = __importDefault(__webpack_require__(16));
var handleSubscriptionError_1 = __importDefault(__webpack_require__(15));
exports.LAST_PROMPT_EPOCH = 'mol-fe-browser-notifications-last-prompt-epoch';
var canShowPrompt = function (promptFrequency) {
    if (!promptFrequency) {
        return true;
    }
    var frequency = ms_1.default(promptFrequency);
    if (typeof frequency !== 'number') {
        throw new TypeError('Prompt frequency must be a valid string like `1d` or `1h`');
    }
    if (!('localStorage' in window)) {
        return true;
    }
    var lastShown = JSON.parse(window.localStorage.getItem(exports.LAST_PROMPT_EPOCH) || '0');
    return Date.now() - lastShown >= frequency;
};
exports.default = (function (registration, options) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, appServerKey, emit, metadata, baseEndpoint, subscriptionEndpoint, promptFrequency, rawAppServerKey, channels, crossOrgUserIds, platform, subChannels, userAgent, visitorIds, visitorId, crossOrgUserId, channel, subChannel, promptImpressionEvt, permission, promptClickEvt, subscription, msgData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = options.apiKey, appServerKey = options.appServerKey, emit = options.emit, metadata = options.metadata, baseEndpoint = options.baseEndpoint, subscriptionEndpoint = options.subscriptionEndpoint, promptFrequency = options.promptFrequency, rawAppServerKey = options.rawAppServerKey;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                channels = metadata.channels, crossOrgUserIds = metadata.crossOrgUserIds, platform = metadata.platform, subChannels = metadata.subChannels, userAgent = metadata.userAgent, visitorIds = metadata.visitorIds;
                visitorId = Array.isArray(visitorIds) ? visitorIds[0] : undefined;
                crossOrgUserId = Array.isArray(crossOrgUserIds) ? crossOrgUserIds[0] : undefined;
                channel = Array.isArray(channels) ? channels[0] : undefined;
                subChannel = Array.isArray(subChannels) ? subChannels[0] : undefined;
                if (!!canShowPrompt(promptFrequency)) return [3 /*break*/, 2];
                emit('prompt_discarded', {
                    action: 'discarded',
                    channel: channel,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    permission: Notification.permission,
                    platform: platform,
                    subChannel: subChannel,
                    type: 'prompt',
                    userAgent: userAgent,
                    visitorId: visitorId
                });
                return [3 /*break*/, 9];
            case 2:
                if (!(Notification.permission === 'default')) return [3 /*break*/, 6];
                promptImpressionEvt = {
                    action: 'impression',
                    channel: channel,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    permission: Notification.permission,
                    platform: platform,
                    subChannel: subChannel,
                    type: 'prompt',
                    userAgent: userAgent,
                    visitorId: visitorId
                };
                emit('prompt_impression', promptImpressionEvt);
                return [4 /*yield*/, safeTrackEvent_1.default(baseEndpoint, promptImpressionEvt, apiKey)];
            case 3:
                _a.sent();
                return [4 /*yield*/, pushSubscription_1.requestPushPermissionAndSubscribe({
                        apiKey: apiKey,
                        appServerKey: appServerKey,
                        metadata: metadata,
                        registration: registration,
                        subscriptionEndpoint: subscriptionEndpoint
                    })];
            case 4:
                permission = _a.sent();
                promptClickEvt = {
                    action: 'click',
                    channel: channel,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    permission: permission,
                    platform: platform,
                    subChannel: subChannel,
                    type: 'prompt',
                    userAgent: userAgent,
                    visitorId: visitorId
                };
                emit('prompt_click', promptClickEvt);
                return [4 /*yield*/, safeTrackEvent_1.default(baseEndpoint, promptClickEvt, apiKey)];
            case 5:
                _a.sent();
                if ('localStorage' in window) {
                    window.localStorage.setItem(exports.LAST_PROMPT_EPOCH, JSON.stringify(Date.now()));
                }
                _a.label = 6;
            case 6:
                if (!(Notification.permission === 'granted')) return [3 /*break*/, 8];
                return [4 /*yield*/, registration.pushManager.getSubscription()];
            case 7:
                subscription = (_a.sent());
                msgData = {
                    subscription: subscription,
                    type: 'web-push-sw-subscription-ready'
                };
                /// @ts-ignore
                registration.active.postMessage(JSON.stringify(msgData));
                subscriptionStatus_1.setStatus('ready', metadata);
                return [3 /*break*/, 9];
            case 8:
                if (Notification.permission === 'default') {
                    subscriptionStatus_1.setStatus('undecided', metadata);
                }
                else {
                    subscriptionStatus_1.clearStatus();
                }
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                handleSubscriptionError_1.default(error_1, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isBadString = function (value, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return typeof value !== 'string' || value.length === 0 || (maxLength && maxLength < value.length);
};
var isBadObject = function (value, properties) {
    var type = typeof value;
    if (value !== null && type === 'object') {
        var keys_1 = Object.keys(value);
        var hasProps = properties && properties.map(function (prop) { return keys_1.includes(prop); }).filter(Boolean).length === properties.length;
        return !keys_1.length || !hasProps;
    }
    return true;
};
var isBadBoolean = function (value) { return typeof value !== 'boolean'; };
var isBadStringArray = function (value) {
    return !Array.isArray(value) || (value.length && value.map(isBadString).every(Boolean));
};
var requiredMetadataProps = ['organisation', 'platform', 'profilingAllowed', 'userAgent'];
exports.default = (function (opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // required props
    if (isBadObject(opts.metadata, requiredMetadataProps)) {
        throw new Error("metadata is required and must be object containing the following required fields " + requiredMetadataProps.join(', ') + ".");
    }
    if (isBadString((_a = opts.metadata) === null || _a === void 0 ? void 0 : _a.organisation)) {
        throw new Error('metadata.organisation is required and must be a non empty string.');
    }
    if (isBadString((_b = opts.metadata) === null || _b === void 0 ? void 0 : _b.platform)) {
        throw new Error('metadata.platform is required and must be a non empty string.');
    }
    if (isBadBoolean((_c = opts.metadata) === null || _c === void 0 ? void 0 : _c.profilingAllowed)) {
        throw new Error('metadata.profilingAllowed is required and must be a boolean.');
    }
    if (isBadString((_d = opts.metadata) === null || _d === void 0 ? void 0 : _d.userAgent)) {
        throw new Error('metadata.userAgent is required and must be a non empty string.');
    }
    // optional props
    if (opts.swUrl !== undefined && isBadString(opts.swUrl)) {
        throw new Error('swUrl is optional but must be non empty string when provided.');
    }
    if (((_e = opts.metadata) === null || _e === void 0 ? void 0 : _e.visitorIds) !== undefined && isBadStringArray((_f = opts.metadata) === null || _f === void 0 ? void 0 : _f.visitorIds)) {
        throw new Error('metadata.visitorIds is optional but must be a non empty string array.');
    }
    if (((_g = opts.metadata) === null || _g === void 0 ? void 0 : _g.crossOrgUserIds) !== undefined && isBadStringArray((_h = opts.metadata) === null || _h === void 0 ? void 0 : _h.crossOrgUserIds)) {
        throw new Error('metadata.crossOrgUserIds is optional but must be a non empty string array.');
    }
    if (((_j = opts.metadata) === null || _j === void 0 ? void 0 : _j.keywords) !== undefined && isBadStringArray((_k = opts.metadata) === null || _k === void 0 ? void 0 : _k.keywords)) {
        throw new Error('metadata.keywords is optional but must be a non empty string array when provided.');
    }
    if (((_l = opts.metadata) === null || _l === void 0 ? void 0 : _l.channels) !== undefined && isBadStringArray((_m = opts.metadata) === null || _m === void 0 ? void 0 : _m.channels)) {
        throw new Error('metadata.channels is optional but must be a non empty string array when provided.');
    }
    if (((_o = opts.metadata) === null || _o === void 0 ? void 0 : _o.subChannels) !== undefined && isBadStringArray((_p = opts.metadata) === null || _p === void 0 ? void 0 : _p.subChannels)) {
        throw new Error('metadata.subChannels is optional but must be a non empty string array when provided.');
    }
    return opts;
});


/***/ })
/******/ ]);
});
//# sourceMappingURL=register.js.map