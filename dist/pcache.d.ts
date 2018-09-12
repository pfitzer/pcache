declare class Pcache {
    private t;
    private storage;
    constructor(t: number);
    set: (k: any, v: any, t: number) => void;
    get: (k: string) => any;
    del: (k: any) => void;
    /**
     *
     */
    clearAll: () => void;
    /**
     *
     * @returns {Array}
     */
    keys: () => string[];
}
export { Pcache };
