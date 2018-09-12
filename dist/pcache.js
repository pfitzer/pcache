"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var now = function () { return new Date().getTime(); };
var Pcache = /** @class */ (function () {
    function Pcache(t) {
        var _this = this;
        this.set = function (k, v, t) {
            var e;
            if (!isNaN(t)) {
                e = t * 1000 + now();
            }
            else if (!isNaN(_this.t)) {
                e = _this.t + now();
            }
            else {
                e = null;
            }
            _this.storage[k] = { value: v, expire: e };
        };
        this.get = function (k) {
            console.log(_this.storage[k]);
            if (!_this.storage.hasOwnProperty(k)) {
                return null;
            }
            var v = _this.storage[k].value;
            if (null === _this.storage[k].expire || _this.storage[k].expire >= now()) {
                return v;
            }
            _this.del(k);
            return null;
        };
        this.del = function (k) {
            delete _this.storage[k];
        };
        /**
         *
         */
        this.clearAll = function () {
            _this.storage = {};
        };
        /**
         *
         * @returns {Array}
         */
        this.keys = function () {
            var s = _this.storage;
            Object.keys(_this.storage).forEach(function (i) {
                if (s[i].expire <= now()) {
                    delete s[i];
                }
            });
            _this.storage = s;
            return Object.keys(_this.storage);
        };
        this.t = t;
        this.storage = {};
    }
    return Pcache;
}());
exports.Pcache = Pcache;
