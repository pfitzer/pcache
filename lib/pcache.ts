const now = () => { return new Date().getTime(); }

class Store {
    public value: any;
    public expire: any;
}

class Pcache {

    private t: number;
    private storage: Record<string, Store>;

    constructor(t: number) {
        this.t = t;
        this.storage = {};
    }

    public set = (k: any, v: any, t: number) => {
        let e;
        if (!isNaN(t)) {
            e = t * 1000 + now();
        } else if (!isNaN(this.t)) {
            e = this.t + now();
        }
        this.storage[k] = {value: v, expire: e};
    }

    public get = (k: any) => {
        if (!(k in this.storage)) {
            return null;
        }
        var v = this.storage[k].value;
        if (null === this.storage[k].expire || this.storage[k].expire >= now()) {
            return v;
        }
        this.del(k);

        return null;
    }

    public del = (k: any) => {
        delete this.storage[k];
    };

    /**
     *
     */
    public clearAll = () => {
        this.storage = {};
    };

    /**
     *
     * @returns {Array}
     */
    public keys = () => {
        var s = this.storage;
        Object.keys(this.storage).forEach(function(i) {
            if (s[i].expire <= now()) {
                delete s[i];
            }
        });
        this.storage = s;

        return Object.keys(this.storage);
    };
}

export {Pcache}