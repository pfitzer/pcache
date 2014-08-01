# pcache

* * *

simple caching module for nodejs

## install
    npm install pcache

## usage

    var cache = import('pcache');
    // init new cache with cache time of 60s
    var myCache = new cache(60);

### setter
    myCache.set('foo', 'bar');

### getter
    myCache.get('foo');

### delete
    myCache.del('foo');

### get all keys
    myCache.keys();

### clear complete cache
    myCache.clearAll();
