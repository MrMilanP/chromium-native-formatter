class e {
    #e;
    #r;
    #s;
    constructor(e) {
        this.#e = new Promise( (r, s) => {
            this.#s = s;
            const o = new Worker(new URL(e),{
                type: "module"
            });
            o.onerror = r => {
                console.error(`Failed to load worker for ${e}:`, r)
            }
            ,
            o.onmessage = e => {
                console.assert("workerReady" === e.data),
                o.onmessage = null,
                r(o)
            }
        }
        )
    }
    postMessage(e, r) {
        this.#e.then(s => {
            this.#r || s.postMessage(e, r ?? [])
        }
        )
    }
    dispose() {
        this.#r = !0,
        this.#e.then(e => e.terminate())
    }
    terminate(e=!1) {
        e && this.#s?.(new Error("Worker terminated")),
        this.dispose()
    }
    set onmessage(e) {
        this.#e.then(r => {
            r.onmessage = e
        }
        )
    }
    set onerror(e) {
        this.#e.then(r => {
            r.onerror = e
        }
        )
    }
}
const r = {
    createWorker: r => new e(r),
    workerScope: new class {
        postMessage(e) {
            self.postMessage(e)
        }
        set onmessage(e) {
            self.onmessage = e
        }
    }
};
var s = Object.freeze({
    __proto__: null,
    HOST_RUNTIME: r
});
export {s as HostRuntime};
//# sourceMappingURL=browser.js.map
