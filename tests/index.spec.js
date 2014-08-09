describe('testing pcache node module', function() {

    it('should set and delete a cache entry', function() {
        var cache = new pcache();
        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');

        cache.del('foo');
        expect(cache.get('foo')).toBeNull();
    });

    it('should use the cache time', function() {
        var cache = new pcache(2);
        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');
        setTimeout(function() {
            expect(cache.get('foo')).toBeNull();
        }, 3000);
    });

    it('should use the individual cache time', function() {
        var cache = new pcache(10);
        cache.set('foo', 'bar', 2);
        expect(cache.get('foo')).toBe('bar');
        setTimeout(function() {
            expect(cache.get('foo')).toBeNull();
        }, 3000);
    });

    it('should give all keys', function() {
        var cache = new pcache(60);
        cache.set('foo', 'bar');
        cache.set(1, 'more bar');

        expect(cache.keys()).toContain('foo');
        expect(cache.keys()).toContain('1');
    });

    it('should clear the cache', function() {
        var cache = new pcache(60);
        cache.set('foo', 'bar');
        cache.set(1, 'more bar');
        cache.clearAll();

        expect(cache.get('foo')).toBeNull();
        expect(cache.get(1)).toBeNull();
    });

});