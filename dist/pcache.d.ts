declare class Pcache {
    private t;
    private storage;
    constructor(t: number);
    set: (k: string, v: any, t: number) => void;
    get: (k: string) => any;
    del: (k: any) => void;
    clearAll: () => void;
    keys: () => string[];
}
export { Pcache as pcache };
