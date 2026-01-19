import*as e from "../platform/platform.js";
class t {
    #e = new Map;
    get(e) {
        const t = this.#e.get(e);
        if (!t)
            throw new Error(`No instance for ${e.name}. Ensure the bootstrapper creates it.`);
        return t
    }
    has(e) {
        return this.#e.has(e)
    }
    set(e, t) {
        this.#e.set(e, t)
    }
    delete(e) {
        this.#e.delete(e)
    }
}
let s = null;
var n = Object.freeze({
    __proto__: null,
    DevToolsContext: t,
    globalInstance: function() {
        return s || (s = new t),
        s
    },
    setGlobalInstance: function(e) {
        s = e
    }
});
let r, a, i, o = "";
function l() {
    return window.location.pathname
}
function c(e) {
    return ["node_app", "js_app"].some(t => e.includes(t))
}
class h {
    constructor() {}
    static instance(e={
        forceNew: null
    }) {
        const {forceNew: t} = e;
        return r && !t || (r = new h),
        r
    }
    static removeInstance() {
        r = void 0
    }
    static #t;
    static #s() {
        return !h.#t && "location"in globalThis && (h.#t = new URLSearchParams(location.search)),
        h.#t
    }
    static queryParam(e) {
        return h.#s()?.get(e) ?? null
    }
    static setQueryParamForTesting(e, t) {
        h.#s()?.set(e, t)
    }
    static isNode() {
        return void 0 === a && (a = c(l())),
        a
    }
    static isTraceApp() {
        return void 0 === i && (i = l().includes("trace_app")),
        i
    }
    static setPlatform(e) {
        o = e
    }
    static platform() {
        return o
    }
    static isDescriptorEnabled(e) {
        const {experiment: t} = e;
        if ("*" === t)
            return !0;
        if (t && t.startsWith("!") && d.isEnabled(t.substring(1)))
            return !1;
        if (t && !t.startsWith("!") && !d.isEnabled(t))
            return !1;
        const {condition: s} = e;
        return !s || s(x)
    }
    loadLegacyModule(e) {
        console.log("Loading legacy module: " + e);
        return import(`../../${e}`).then(t => (console.log("Loaded legacy module: " + e),
        t))
    }
}
class m {
    #n = [];
    #r = new Set;
    #a = new Set;
    #i = new Set;
    #o = new Set;
    #l = new p;
    allConfigurableExperiments() {
        const e = [];
        for (const t of this.#n)
            this.#a.has(t.name) || e.push(t);
        return e
    }
    register(t, s, n, r, a) {
        if (this.#r.has(t))
            throw new Error(`Duplicate registration of experiment '${t}'`);
        this.#r.add(t),
        this.#n.push(new u(this,t,s,Boolean(n),r ?? e.DevToolsPath.EmptyUrlString,a ?? e.DevToolsPath.EmptyUrlString))
    }
    isEnabled(e) {
        return this.checkExperiment(e),
        !1 !== this.#l.get(e) && (!(!this.#a.has(e) && !this.#i.has(e)) || (!!this.#o.has(e) || Boolean(this.#l.get(e))))
    }
    setEnabled(e, t) {
        this.checkExperiment(e),
        this.#l.set(e, t)
    }
    enableExperimentsTransiently(e) {
        for (const t of e)
            this.checkExperiment(t),
            this.#a.add(t)
    }
    enableExperimentsByDefault(e) {
        for (const t of e)
            this.checkExperiment(t),
            this.#i.add(t)
    }
    setServerEnabledExperiments(e) {
        for (const t of e)
            this.checkExperiment(t),
            this.#o.add(t)
    }
    enableForTest(e) {
        this.checkExperiment(e),
        this.#a.add(e)
    }
    disableForTest(e) {
        this.checkExperiment(e),
        this.#a.delete(e)
    }
    clearForTest() {
        this.#n = [],
        this.#r.clear(),
        this.#a.clear(),
        this.#i.clear(),
        this.#o.clear()
    }
    cleanUpStaleExperiments() {
        this.#l.cleanUpStaleExperiments(this.#r)
    }
    checkExperiment(e) {
        if (!this.#r.has(e))
            throw new Error(`Unknown experiment '${e}'`)
    }
}
class p {
    #n = {};
    constructor() {
        try {
            const e = self.localStorage?.getItem("experiments");
            e && (this.#n = JSON.parse(e))
        } catch {
            console.error("Failed to parse localStorage['experiments']")
        }
    }
    get(e) {
        return this.#n[e]
    }
    set(e, t) {
        this.#n[e] = t,
        this.#c()
    }
    cleanUpStaleExperiments(e) {
        for (const [t] of Object.entries(this.#n))
            e.has(t) || delete this.#n[t];
        this.#c()
    }
    #c() {
        self.localStorage?.setItem("experiments", JSON.stringify(this.#n))
    }
}
class u {
    name;
    title;
    unstable;
    docLink;
    feedbackLink;
    #n;
    constructor(e, t, s, n, r, a) {
        this.name = t,
        this.title = s,
        this.unstable = n,
        this.docLink = r,
        this.feedbackLink = a,
        this.#n = e
    }
    isEnabled() {
        return this.#n.isEnabled(this.name)
    }
    setEnabled(e) {
        this.#n.setEnabled(this.name, e)
    }
}
const d = new m;
var E, f, g;
!function(e) {
    e[e.ALLOW = 0] = "ALLOW",
    e[e.ALLOW_WITHOUT_LOGGING = 1] = "ALLOW_WITHOUT_LOGGING",
    e[e.DISABLE = 2] = "DISABLE"
}(E || (E = {})),
function(e) {
    e.ALL_SCRIPTS = "ALL_SCRIPTS",
    e.SIDE_EFFECT_FREE_SCRIPTS_ONLY = "SIDE_EFFECT_FREE_SCRIPTS_ONLY",
    e.NO_SCRIPTS = "NO_SCRIPTS"
}(f || (f = {})),
function(e) {
    e[e.ENABLED = 0] = "ENABLED",
    e[e.ENABLED_WITHOUT_BADGES = 1] = "ENABLED_WITHOUT_BADGES",
    e[e.DISABLED = 2] = "DISABLED"
}(g || (g = {}));
const x = Object.create(null)
  , b = {
    canDock: () => Boolean(h.queryParam("can_dock"))
};
var S = Object.freeze({
    __proto__: null,
    Experiment: u,
    ExperimentsSupport: m,
    get GdpProfilesEnterprisePolicyValue() {
        return g
    },
    get GenAiEnterprisePolicyValue() {
        return E
    },
    get HostConfigFreestylerExecutionMode() {
        return f
    },
    Runtime: h,
    conditions: b,
    experiments: d,
    getChromeVersion: () => {
        const e = navigator.userAgent.match(/(?:^|\W)(?:Chrome|HeadlessChrome)\/(\S+)/);
        return e && e.length > 1 ? e[1] : ""
    }
    ,
    getPathName: l,
    getRemoteBase: function(e=self.location.toString()) {
        const t = new URL(e).searchParams.get("remoteBase");
        if (!t)
            return null;
        const s = /\/serve_file\/(@[0-9a-zA-Z]+)\/?$/.exec(t);
        return s ? {
            base: `devtools://devtools/remote/serve_file/${s[1]}/`,
            version: s[1]
        } : null
    },
    hostConfig: x,
    isNodeEntry: c
});
export {n as DevToolsContext, S as Runtime};
//# sourceMappingURL=root.js.map
