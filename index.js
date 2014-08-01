var pcache = function(t) {
    this.t = t;
    this.storage = {};
}

pcache.prototype.set = function(k, v) {
    this.storage[k]= v;
}

pcache.prototype.get = function(k) {
    return this.storage[k]
}

pcache.prototype.clearAll = function() {
    this.storage = {};
}

pcache.prototype.keys = function() {
    return Object.keys(this.storage);
};

if (typeof exports !== "undefined") {
    module.exports = pcache;
}
