const now = (): number => {
    return new Date().getTime();
};

interface IStore {
    value: any;
    expire: any;
}

class Pcache {
    private storage: {[key: string]: IStore};

    constructor(private t: number) {
        this.t = t;
        this.storage = {};
    }

    public set = (k: string, v: any, t: number) => {
        let e;
        if (!isNaN(t)) {
            e = t * 1000 + now();
        } else if (!isNaN(this.t)) {
            e = this.t + now();
        } else {
            e = null;
        }
        this.storage[k] = {value: v, expire: e};
    }

    public get = (k: string): any => {
        if (!this.storage.hasOwnProperty(k)) {
            return null;
        }
        const v = this.storage[k].value;
        if (null === this.storage[k].expire || this.storage[k].expire >= now()) {
            return v;
        }
        this.del(k);

        return null;
    }

    public del = (k: any) => {
        delete this.storage[k];
    }

    public clearAll = () => {
        this.storage = {};
    }

    public keys = (): string[] => {
        const s = this.storage;
        Object.keys(this.storage).forEach((i) => {
            if (s[i].expire <= now()) {
                delete s[i];
            }
        });
        this.storage = s;

        return Object.keys(this.storage);
    }
}

export {Pcache as pcache};
