'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _qs = require('qs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = Symbol('config');
var http = Symbol('http');

/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} header    The request header
 * @return {object}           An object containing either "data" or "err"
 */

var _http = function () {
  function _http() {
    _classCallCheck(this, _http);

    // bind this
    this.prefix = "";
    this.header = {};
    this.filter = function () {
      return false;
    };
    this.callback = function (_) {
      return _;
    };
    this[config] = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Max-Age": "86400",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "token, host, x-real-ip, x-forwarded-ip, accept, content-type"
      },
      credentials: "include",
      client_max_body_size: "2048m"
    };
  }

  _createClass(_http, [{
    key: http,
    value: function value(url) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.filter && this.filter();
      return (0, _isomorphicFetch2.default)('' + this.prefix + url, _extends({}, this[config], { headers: _extends({}, this[config].headers, this.header, header) }, option)).then(function (resp) {
        if (resp.status >= 400) {
          throw new Error('400+Error');
        }
        return resp;
      }).then(function (resp) {
        try {
          return resp.json();
        } catch (e) {
          throw new Error('JSONError');
        }
      }).then(this.callback);
    }
  }, {
    key: 'setup',
    value: function setup(_ref) {
      var _ref$prefix = _ref.prefix,
          prefix = _ref$prefix === undefined ? "" : _ref$prefix,
          _ref$header = _ref.header,
          header = _ref$header === undefined ? {} : _ref$header,
          _ref$filter = _ref.filter,
          filter = _ref$filter === undefined ? this.filter : _ref$filter,
          _ref$callback = _ref.callback,
          callback = _ref$callback === undefined ? this.callback : _ref$callback;

      this.prefix = prefix;
      this.header = header;
      this.filter = filter;
      this.callback = callback;
    }
  }, {
    key: 'setHeader',
    value: function setHeader() {
      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.header = _extends({}, this.header, header);
    }
  }, {
    key: 'get',
    value: function get(url, param) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url + '?' + (0, _qs.stringify)(param), {}, header);
    }
  }, {
    key: 'post',
    value: function post(url, param) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'POST', body: (0, _qs.stringify)(param) }, header);
    }
  }, {
    key: 'put',
    value: function put(url, param) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'PUT', body: (0, _qs.stringify)(param) }, header);
    }
  }, {
    key: 'delete',
    value: function _delete(url, param) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url + '?' + (0, _qs.stringify)(param), { method: 'DELETE' }, header);
    }
  }, {
    key: 'options',
    value: function options(url, param) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'OPTIONS' }, header);
    }
  }, {
    key: 'json',
    value: function json(url) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments[2];

      return this[http](url, { method: 'POST', body: JSON.stringify(param) }, _extends({}, header, { "Content-Type": "application/json" }));
    }
  }]);

  return _http;
}();

exports.default = new _http();