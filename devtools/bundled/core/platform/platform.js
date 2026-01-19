function e(e, t, r) {
    const n = e[t];
    e[t] = e[r],
    e[r] = n
}
function t(r, n, o, i, a, s) {
    if (i <= o)
        return;
    const l = function(t, r, n, o, i) {
        const a = t[i];
        e(t, o, i);
        let s = n;
        for (let i = n; i < o; ++i)
            r(t[i], a) < 0 && (e(t, s, i),
            ++s);
        return e(t, o, s),
        s
    }(r, n, o, i, Math.floor(Math.random() * (i - o)) + o);
    a < l && t(r, n, o, l - 1, a, s),
    l < s && t(r, n, l + 1, i, a, s)
}
function r(e, t, r, n) {
    const o = [];
    let i = 0
      , a = 0;
    for (; i < e.length && a < t.length; ) {
        const s = r(e[i], t[a]);
        !n && s || o.push(s <= 0 ? e[i] : t[a]),
        s <= 0 && i++,
        s >= 0 && a++
    }
    if (n) {
        for (; i < e.length; )
            o.push(e[i++]);
        for (; a < t.length; )
            o.push(t[a++])
    }
    return o
}
function n(e, t, r, n, o) {
    let i = n || 0
      , a = void 0 !== o ? o : e.length;
    for (; i < a; ) {
        const n = i + a >> 1;
        r(t, e[n]) > 0 ? i = n + 1 : a = n
    }
    return a
}
function o(e, t, r) {
    const n = "END" === r;
    if (0 === e.length)
        return null;
    let o = 0
      , i = e.length - 1
      , a = 0
      , s = !1
      , l = !1
      , u = 0;
    do {
        u = o + (i - o) / 2,
        a = n ? Math.ceil(u) : Math.floor(u),
        s = t(e[a]),
        l = s === n,
        l ? o = Math.min(i, a + (o === a ? 1 : 0)) : i = Math.max(o, a + (i === a ? -1 : 0))
    } while (i !== o);
    return t(e[o]) ? o : null
}
var i = Object.freeze({
    __proto__: null,
    DEFAULT_COMPARATOR: (e, t) => e < t ? -1 : e > t ? 1 : 0,
    arrayDoesNotContainNullOrUndefined: function(e) {
        return !e.includes(null) && !e.includes(void 0)
    },
    binaryIndexOf: (e, t, r) => {
        const o = n(e, t, r);
        return o < e.length && 0 === r(t, e[o]) ? o : -1
    }
    ,
    intersectOrdered: (e, t, n) => r(e, t, n, !1),
    lowerBound: n,
    mergeOrdered: (e, t, n) => r(e, t, n, !0),
    nearestIndexFromBeginning: function(e, t) {
        return o(e, t, "BEGINNING")
    },
    nearestIndexFromEnd: function(e, t) {
        return o(e, t, "END")
    },
    removeElement: (e, t, r) => {
        let n = e.indexOf(t);
        if (-1 === n)
            return !1;
        if (r)
            return e.splice(n, 1),
            !0;
        for (let r = n + 1, o = e.length; r < o; ++r)
            e[r] !== t && (e[n++] = e[r]);
        return e.length = n,
        !0
    }
    ,
    sortRange: function(e, r, n, o, i, a) {
        return 0 === n && o === e.length - 1 && 0 === i && a >= o ? e.sort(r) : t(e, r, n, o, i, a),
        e
    },
    swap: e,
    upperBound: function(e, t, r, n, o) {
        let i = n || 0
          , a = void 0 !== o ? o : e.length;
        for (; i < a; ) {
            const n = i + a >> 1;
            r(t, e[n]) >= 0 ? i = n + 1 : a = n
        }
        return a
    }
})
  , a = Object.freeze({
    __proto__: null
})
  , s = Object.freeze({
    __proto__: null
});
var l = Object.freeze({
    __proto__: null,
    isValid: e => !isNaN(e.getTime()),
    toISO8601Compact: e => {
        function t(e) {
            return (e > 9 ? "" : "0") + e
        }
        return e.getFullYear() + t(e.getMonth() + 1) + t(e.getDate()) + "T" + t(e.getHours()) + t(e.getMinutes()) + t(e.getSeconds())
    }
});
var u = Object.freeze({
    __proto__: null,
    EmptyEncodedPathString: "",
    EmptyRawPathString: "",
    EmptyUrlString: "",
    urlString: (e, ...t) => String.raw({
        raw: e
    }, ...t)
});
const c = "undefined" != typeof process && null !== process.versions?.node
  , f = "undefined" != typeof window || "undefined" != typeof self && "function" == typeof self.postMessage
  , p = await (async () => {
    if (c)
        return (await import("./node/node.js")).HostRuntime.HOST_RUNTIME;
    if (f)
        return (await import("./browser/browser.js")).HostRuntime.HOST_RUNTIME;
    throw new Error("Unknown runtime!")
}
)();
var h = Object.freeze({
    __proto__: null,
    HOST_RUNTIME: p,
    IS_BROWSER: f,
    IS_NODE: c
});
const g = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
var d = Object.freeze({
    __proto__: null,
    ARROW_KEYS: g,
    ENTER_KEY: "Enter",
    ESCAPE_KEY: "Escape",
    TAB_KEY: "Tab",
    isEnterOrSpaceKey: function(e) {
        return "Enter" === e.key || " " === e.key
    },
    isEscKey: function(e) {
        return "Escape" === e.key
    },
    keyIsArrowKey: function(e) {
        return g.has(e)
    }
});
class m {
    map = new Map;
    set(e, t) {
        let r = this.map.get(e);
        r || (r = new Set,
        this.map.set(e, r)),
        r.add(t)
    }
    get(e) {
        return this.map.get(e) || new Set
    }
    has(e) {
        return this.map.has(e)
    }
    hasValue(e, t) {
        const r = this.map.get(e);
        return !!r && r.has(t)
    }
    get size() {
        return this.map.size
    }
    delete(e, t) {
        const r = this.get(e);
        if (!r)
            return !1;
        const n = r.delete(t);
        return r.size || this.map.delete(e),
        n
    }
    deleteAll(e) {
        this.map.delete(e)
    }
    keysArray() {
        return [...this.map.keys()]
    }
    keys() {
        return this.map.keys()
    }
    valuesArray() {
        const e = [];
        for (const t of this.map.values())
            e.push(...t.values());
        return e
    }
    clear() {
        this.map.clear()
    }
}
var b = Object.freeze({
    __proto__: null,
    Multimap: m,
    getWithDefault: function(e, t, r) {
        let n = e.get(t);
        return null == n && (n = r(t),
        e.set(t, n)),
        n
    },
    inverse: function(e) {
        const t = new m;
        for (const [r,n] of e.entries())
            t.set(n, r);
        return t
    }
});
const _ = new Set(["application/ecmascript", "application/javascript", "application/json", "application/json+protobuf", "application/mpegurl", "application/vnd.apple.mpegurl", "application/vnd.dart", "application/xml", "application/x-aspx", "application/x-javascript", "application/x-jsp", "application/x-httpd-php", "application/x-mpegurl", "audio/mpegurl", "audio/x-mpegurl"]);
function w(e, t, r=0) {
    for (let n = r; n < e.length; n++)
        if (t.includes(e[n]))
            return n;
    return -1
}
function x(e, t, r=0) {
    for (let n = r; n < e.length; n++)
        if (!t.includes(e[n]))
            return n;
    return -1
}
var E = Object.freeze({
    __proto__: null,
    isTextType: function(e) {
        return e.startsWith("text/") || e.startsWith("multipart/") || e.includes("json") || e.endsWith("+xml") || _.has(e)
    },
    parseContentType: function(e) {
        if ("*/*" === e)
            return {
                mimeType: null,
                charset: null
            };
        const {mimeType: t, params: r} = function(e) {
            e = e.trim();
            let t = w(e, " \t;(");
            t < 0 && (t = e.length);
            const r = e.indexOf("/");
            if (r < 0 || r > t)
                return {
                    mimeType: null,
                    params: new Map
                };
            const n = e.substring(0, t).toLowerCase()
              , o = new Map;
            let i = e.indexOf(";", t);
            for (; i >= 0 && i < e.length; ) {
                if (++i,
                i = x(e, " \t", i),
                i < 0)
                    continue;
                const t = i;
                if (i = w(e, ";=", i),
                i < 0 || ";" === e[i])
                    continue;
                const r = e.substring(t, i).toLowerCase();
                ++i,
                i = x(e, " \t", i);
                let n = "";
                if (!(i < 0 || ";" === e[i])) {
                    if ('"' !== e[i]) {
                        const t = i;
                        i = e.indexOf(";", i);
                        const r = i >= 0 ? i : e.length;
                        n = e.substring(t, r).trimEnd()
                    } else {
                        for (++i; i < e.length && '"' !== e[i]; )
                            "\\" === e[i] && i + 1 < e.length && ++i,
                            n += e[i],
                            ++i;
                        i = e.indexOf(";", i)
                    }
                    o.has(r) || o.set(r, n)
                }
            }
            return {
                mimeType: n,
                params: o
            }
        }(e);
        return {
            mimeType: t,
            charset: r.get("charset")?.toLowerCase().trim() ?? null
        }
    }
});
const y = (e, t) => {
    for (e = Math.round(e),
    t = Math.round(t); 0 !== t; ) {
        const r = t;
        t = e % t,
        e = r
    }
    return e
}
  , O = new Map([["8∶5", "16∶10"]]);
var S = Object.freeze({
    __proto__: null,
    aspectRatio: (e, t) => {
        const r = y(e, t);
        0 !== r && (e /= r,
        t /= r);
        const n = `${e}∶${t}`;
        return O.get(n) || n
    }
    ,
    clamp: (e, t, r) => {
        let n = e;
        return e < t ? n = t : e > r && (n = r),
        n
    }
    ,
    floor: (e, t=0) => {
        if (t > 0 && t < 1)
            return t = 1 / t,
            Math.floor(e / t) * t;
        const r = Math.pow(10, t);
        return Math.floor(e * r) / r
    }
    ,
    greatestCommonDivisor: y,
    mod: (e, t) => (e % t + t) % t,
    toFixedIfFloating: e => {
        if (!e || Number.isNaN(Number(e)))
            return e;
        const t = Number(e);
        return t % 1 ? t.toFixed(3) : String(t)
    }
    ,
    withThousandsSeparator: function(e) {
        let t = String(e);
        const r = /(\d+)(\d{3})/;
        for (; t.match(r); )
            t = t.replace(r, "$1 $2");
        return t
    }
});
const A = (e, t) => {
    let r = !1;
    for (let n = 0; n < t.length; ++n)
        if (-1 !== e.indexOf(t.charAt(n))) {
            r = !0;
            break
        }
    if (!r)
        return String(e);
    let n = "";
    for (let r = 0; r < e.length; ++r)
        -1 !== t.indexOf(e.charAt(r)) && (n += "\\"),
        n += e.charAt(r);
    return n
}
  , C = (e, t) => e.toString(16).toUpperCase().padStart(t, "0")
  , N = new Map([["\b", "\\b"], ["\f", "\\f"], ["\n", "\\n"], ["\r", "\\r"], ["\t", "\\t"], ["\v", "\\v"], ["'", "\\'"], ["\\", "\\\\"], ["\x3c!--", "\\x3C!--"], ["<script", "\\x3Cscript"], ["</script", "\\x3C/script"]])
  , v = (e, t) => {
    const r = [];
    let n = e.indexOf(t);
    for (; -1 !== n; )
        r.push(n),
        n = e.indexOf(t, n + t.length);
    return r
}
  , L = /^([a-z0-9]+(?:-[a-z0-9]+)*\.)*[a-z0-9]+(?:-[a-z0-9]+)*$/
  , U = "^[]{}()\\.^$*+?|-,"
  , T = function() {
    return U
}
  , M = function(e, t) {
    let r = "";
    for (let t = 0; t < e.length; ++t) {
        const n = e.charAt(t);
        -1 !== T().indexOf(n) && (r += "\\"),
        r += n
    }
    return new RegExp(r,t || "")
}
  , R = /[A-Z]{2,}(?=[A-Z0-9][a-z0-9]+|\b|_)|[A-Za-z][0-9]+[a-z]?|[A-Z]?[a-z]+|[0-9][A-Za-z]+|[A-Z]|[0-9]+|[.]/g
  , z = function(e) {
    return e.match?.(R)?.map(e => e.toLowerCase()).join("-").replaceAll("-.-", ".") || e
};
var j = Object.freeze({
    __proto__: null,
    DOUBLE_QUOTE: '"',
    SINGLE_QUOTE: "'",
    base64ToSize: function(e) {
        if (!e)
            return 0;
        let t = 3 * e.length / 4;
        return "=" === e[e.length - 1] && t--,
        e.length > 1 && "=" === e[e.length - 2] && t--,
        t
    },
    caseInsensetiveComparator: function(e, t) {
        return (e = e.toUpperCase()) === (t = t.toUpperCase()) ? 0 : e > t ? 1 : -1
    },
    collapseWhitespace: e => e.replace(/[\s\xA0]+/g, " "),
    compare: (e, t) => e > t ? 1 : e < t ? -1 : 0,
    concatBase64: function(e, t) {
        if (0 === e.length || !e.endsWith("="))
            return e + t;
        const r = e.substring(0, e.length - 4)
          , n = e.substring(e.length - 4);
        return r + globalThis.btoa(globalThis.atob(n) + globalThis.atob(t))
    },
    countUnmatchedLeftParentheses: e => {
        const t = e.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g, "");
        let r = 0;
        for (const e of t)
            "(" === e ? r++ : ")" === e && r > 0 && r--;
        return r
    }
    ,
    countWtf8Bytes: e => {
        let t = 0;
        for (let r = 0; r < e.length; r++) {
            const n = e.charCodeAt(r);
            if (n <= 127)
                t++;
            else if (n <= 2047)
                t += 2;
            else if (n < 55296 || 57343 < n)
                t += 3;
            else {
                if (n <= 56319 && r + 1 < e.length) {
                    const n = e.charCodeAt(r + 1);
                    if (56320 <= n && n <= 57343) {
                        t += 4,
                        r++;
                        continue
                    }
                }
                t += 3
            }
        }
        return t
    }
    ,
    createPlainTextSearchRegex: M,
    createSearchRegex: function(e, t, r, n=!1) {
        const o = t ? "g" : "gi";
        let i;
        if (r)
            try {
                i = new RegExp(e,o)
            } catch {}
        return i || (i = M(e, o)),
        n && i && (i = new RegExp(`\\b${i.source}\\b`,o)),
        i
    },
    escapeCharacters: A,
    escapeForRegExp: e => A(e, U),
    filterRegex: function(e) {
        let t = "^(?:.*\\0)?";
        for (let r = 0; r < e.length; ++r) {
            let n = e.charAt(r);
            -1 !== U.indexOf(n) && (n = "\\" + n),
            t += "[^\\0" + n + "]*" + n
        }
        return new RegExp(t,"i")
    },
    findIndexesOfSubString: v,
    findLineEndingIndexes: e => {
        const t = v(e, "\n");
        return t.push(e.length),
        t
    }
    ,
    findUnclosedCssQuote: function(e) {
        let t = "";
        for (let r = 0; r < e.length; ++r) {
            const n = e[r];
            "\\" !== n ? "'" !== n && '"' !== n || (t === n ? t = "" : "" === t && (t = n)) : r++
        }
        return t
    },
    formatAsJSLiteral: e => {
        const t = /(\\|<(?:!--|\/?script))|(\p{Control})|(\p{Surrogate})/gu
          , r = /(\\|'|<(?:!--|\/?script))|(\p{Control})|(\p{Surrogate})/gu
          , n = (e, t, r, n) => {
            if (r) {
                if (N.has(r))
                    return N.get(r);
                return "\\x" + C(r.charCodeAt(0), 2)
            }
            if (n) {
                return "\\u" + C(n.charCodeAt(0), 4)
            }
            return t ? N.get(t) || "" : e
        }
        ;
        let o = ""
          , i = "";
        return e.includes("'") ? e.includes('"') ? e.includes("`") || e.includes("${") ? (i = "'",
        o = e.replaceAll(r, n)) : (i = "`",
        o = e.replaceAll(t, n)) : (i = '"',
        o = e.replaceAll(t, n)) : (i = "'",
        o = e.replaceAll(t, n)),
        `${i}${o}${i}`
    }
    ,
    hashCode: function(e) {
        if (!e)
            return 0;
        const t = 4294967291;
        let r = 0
          , n = 1;
        for (let o = 0; o < e.length; o++) {
            r = (r + n * (1506996573 * e.charCodeAt(o))) % t,
            n = 1345575271 * n % t
        }
        return r = (r + n * (t - 1)) % t,
        Math.abs(0 | r)
    },
    isExtendedKebabCase: e => L.test(e),
    isWhitespace: e => /^\s*$/.test(e),
    naturalOrderComparator: (e, t) => {
        const r = /^\d+|^\D+/;
        let n, o, i, a;
        for (; ; ) {
            if (!e)
                return t ? -1 : 0;
            if (!t)
                return 1;
            if (n = e.match(r)[0],
            o = t.match(r)[0],
            i = !Number.isNaN(Number(n)),
            a = !Number.isNaN(Number(o)),
            i && !a)
                return -1;
            if (a && !i)
                return 1;
            if (i && a) {
                const e = Number(n) - Number(o);
                if (e)
                    return e;
                if (n.length !== o.length)
                    return Number(n) || Number(o) ? o.length - n.length : n.length - o.length
            } else if (n !== o)
                return n < o ? -1 : 1;
            e = e.substring(n.length),
            t = t.substring(o.length)
        }
    }
    ,
    regexSpecialCharacters: T,
    removeURLFragment: e => {
        const t = new URL(e);
        return t.hash = "",
        t.toString()
    }
    ,
    replaceControlCharacters: e => e.replace(/[\0-\x08\x0B\f\x0E-\x1F\x80-\x9F]/g, "�"),
    replaceLast: function(e, t, r) {
        const n = e.lastIndexOf(t);
        return -1 === n ? e : e.slice(0, n) + e.slice(n).replace(t, r)
    },
    reverse: e => e.split("").reverse().join(""),
    sprintf: (e, ...t) => {
        let r = 0;
        return e.replaceAll(/%(?:(\d+)\$)?(?:\.(\d*))?([%dfs])/g, (e, n, o, i) => {
            if ("%" === i)
                return "%";
            if (void 0 !== n && (r = parseInt(n, 10) - 1,
            r < 0))
                throw new RangeError(`Invalid parameter index ${r + 1}`);
            if (r >= t.length)
                throw new RangeError(`Expected at least ${r + 1} format parameters, but only ${t.length} where given.`);
            if ("s" === i) {
                const e = String(t[r++]);
                return void 0 !== o ? e.substring(0, Number(o)) : e
            }
            let a = Number(t[r++]);
            return isNaN(a) && (a = 0),
            "d" === i ? String(Math.floor(a)).padStart(Number(o), "0") : void 0 !== o ? a.toFixed(Number(o)) : String(a)
        }
        )
    }
    ,
    stringifyWithPrecision: function(e, t=2) {
        if (0 === t)
            return e.toFixed(0);
        const r = e.toFixed(t).replace(/\.?0*$/, "");
        return "-0" === r ? "0" : r
    },
    stripLineBreaks: e => e.replace(/(\r)?\n/g, ""),
    toBase64: e => {
        function t(e) {
            return e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : 62 === e ? 43 : 63 === e ? 47 : 65
        }
        const r = (new TextEncoder).encode(e.toString())
          , n = r.length;
        let o, i = "";
        if (0 === n)
            return i;
        let a = 0;
        for (let e = 0; e < n; e++)
            o = e % 3,
            a |= r[e] << (16 >>> o & 24),
            2 === o && (i += String.fromCharCode(t(a >>> 18 & 63), t(a >>> 12 & 63), t(a >>> 6 & 63), t(63 & a)),
            a = 0);
        return 0 === o ? i += String.fromCharCode(t(a >>> 18 & 63), t(a >>> 12 & 63), 61, 61) : 1 === o && (i += String.fromCharCode(t(a >>> 18 & 63), t(a >>> 12 & 63), t(a >>> 6 & 63), 61)),
        i
    }
    ,
    toKebabCase: z,
    toKebabCaseKeys: function(e) {
        return Object.fromEntries(Object.entries(e).map( ([e,t]) => [z(e), t]))
    },
    toLowerCaseString: function(e) {
        return e.toLowerCase()
    },
    toSnakeCase: function(e) {
        return e ? e.replace(/(\p{L})(\p{N})/gu, "$1_$2").replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1_$2").replace(/(\p{Ll}|\p{N})(\p{Lu})/gu, "$1_$2").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "") : ""
    },
    toTitleCase: e => e.substring(0, 1).toUpperCase() + e.substring(1),
    trimEndWithMaxLength: (e, t) => e.length <= t ? String(e) : e.substr(0, t - 1) + "…",
    trimMiddle: (e, t) => {
        if (e.length <= t)
            return String(e);
        let r = t >> 1
          , n = t - r - 1;
        return e.codePointAt(e.length - n - 1) >= 65536 && (--n,
        ++r),
        r > 0 && e.codePointAt(r - 1) >= 65536 && --r,
        e.substr(0, r) + "…" + e.substr(e.length - n, n)
    }
    ,
    trimURL: (e, t) => {
        let r = e.replace(/^(https|http|file):\/\//i, "");
        return t && r.toLowerCase().startsWith(t.toLowerCase()) && (r = r.substr(t.length)),
        r
    }
});
var $ = Object.freeze({
    __proto__: null,
    microSecondsToMilliSeconds: function(e) {
        return e / 1e3
    },
    milliSecondsToSeconds: function(e) {
        return e / 1e3
    }
});
class F extends Uint32Array {
    getValue(e) {
        return this[e]
    }
    setValue(e, t) {
        this[e] = t
    }
    asUint32ArrayOrFail() {
        return this
    }
    asArrayOrFail() {
        throw new Error("Not an array")
    }
}
class B {
    #e;
    #t;
    length;
    constructor(e, t) {
        this.#e = [],
        this.length = e;
        let r = 1;
        for (; ; ) {
            r *= 2,
            this.#t = Math.ceil(e / r);
            try {
                if (void 0 !== t && this.#t > t)
                    throw new RangeError;
                for (let e = 0; e < r; ++e)
                    this.#e[e] = new Uint32Array(this.#t);
                return
            } catch (e) {
                if (this.#t < 1e6)
                    throw e
            }
        }
    }
    getValue(e) {
        if (e >= 0 && e < this.length) {
            const t = this.#t;
            return this.#e[Math.floor(e / t)][e % t]
        }
        return this.#e[0][-1]
    }
    setValue(e, t) {
        if (e >= 0 && e < this.length) {
            const r = this.#t;
            this.#e[Math.floor(e / r)][e % r] = t
        }
    }
    asUint32ArrayOrFail() {
        throw new Error("Not a Uint32Array")
    }
    asArrayOrFail() {
        throw new Error("Not an array")
    }
}
class I extends Array {
    getValue(e) {
        return this[e]
    }
    setValue(e, t) {
        this[e] = t
    }
    asUint32ArrayOrFail() {
        throw new Error("Not a Uint32Array")
    }
    asArrayOrFail() {
        return this
    }
}
class W extends Uint8Array {
    constructor(e) {
        super("number" == typeof e ? Math.ceil(e / 8) : e)
    }
    getBit(e) {
        return 0 !== (this[e >> 3] & 1 << (7 & e))
    }
    setBit(e) {
        this[e >> 3] |= 1 << (7 & e)
    }
    clearBit(e) {
        this[e >> 3] &= ~(1 << (7 & e))
    }
    previous(e) {
        for (; e !== e >> 3 << 3; )
            if (--e,
            this.getBit(e))
                return e;
        let t = (e >> 3) - 1;
        for (; t >= 0 && 0 === this[t]; )
            --t;
        if (t < 0)
            return -1;
        for (e = 7 + (t << 3); e >= t << 3; --e)
            if (this.getBit(e))
                return e;
        throw new Error("Unreachable")
    }
}
var k = Object.freeze({
    __proto__: null,
    createBitVector: function(e) {
        return new W(e)
    },
    createExpandableBigUint32Array: function() {
        return new I
    },
    createFixedBigUint32Array: function(e, t) {
        try {
            if (void 0 !== t && e > t)
                throw new RangeError;
            return new F(e)
        } catch {
            return new B(e,t)
        }
    }
});
function V(e, t) {
    if (null == e)
        throw new Error(`Expected given value to not be null/undefined but it was: ${e}${t ? `\n${t}` : ""}`)
}
function D(e, t) {
    throw new Error(t)
}
function K(e) {
    return e
}
var P = Object.freeze({
    __proto__: null,
    assertNever: D,
    assertNotNullOrUndefined: V,
    assertUnhandled: K
});
var H = Object.freeze({
    __proto__: null,
    LocalizedEmptyString: ""
});
class Z extends Error {
    message;
    constructor(e) {
        super(e),
        this.message = e
    }
}
var Y = Object.freeze({
    __proto__: null,
    UserVisibleError: Z,
    isUserVisibleError: function(e) {
        return "object" == typeof e && null !== e && e instanceof Z
    }
});
export {i as ArrayUtilities, a as Brand, s as Constructor, l as DateUtilities, u as DevToolsPath, h as HostRuntime, d as KeyboardUtilities, b as MapUtilities, E as MimeType, S as NumberUtilities, j as StringUtilities, $ as Timing, P as TypeScriptUtilities, k as TypedArrayUtilities, H as UIString, Y as UserVisibleError, D as assertNever, V as assertNotNullOrUndefined, K as assertUnhandled};
//# sourceMappingURL=platform.js.map
