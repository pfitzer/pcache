# pcache

* * *

[![Build Status](https://travis-ci.org/pfitzer/pcache.svg?branch=master)](https://travis-ci.org/pfitzer/pcache) [![devDependency Status](https://david-dm.org/pfitzer/pcache/dev-status.png)](https://david-dm.org/pfitzer/pcache#info=devDependencies) [![npm](https://img.shields.io/npm/dt/pcache.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/pcache)

simple caching module for nodejs

## install
    npm install pcache

## usage

    var cache = import('pcache');
    # init new cache with caching time of 60s
    var myCache = new cache(60);

### setter
    myCache.set('foo', 'bar');
    # you can also set a individual caching time
    myCache.set('foo', 'bar', 3600);

### getter
    myCache.get('foo');

### delete
    myCache.del('foo');

### get all keys
    myCache.keys();

### clear complete cache
    myCache.clearAll();
