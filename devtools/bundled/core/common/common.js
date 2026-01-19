import*as t from "../root/root.js";
import*as e from "../platform/platform.js";
export {UIString} from "../platform/platform.js";
import*as s from "../i18n/i18n.js";
var r = Object.freeze({
    __proto__: null
});
const i = [];
var n = Object.freeze({
    __proto__: null,
    getRegisteredAppProviders: function() {
        return i.filter(e => t.Runtime.Runtime.isDescriptorEnabled({
            experiment: void 0,
            condition: e.condition
        })).sort( (t, e) => (t.order || 0) - (e.order || 0))
    },
    registerAppProvider: function(t) {
        i.push(t)
    }
});
const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , o = new Uint8Array(123);
for (let t = 0; t < 64; ++t)
    o[a.charCodeAt(t)] = t;
var l = Object.freeze({
    __proto__: null,
    BASE64_CHARS: a,
    BASE64_CODES: o,
    decode: function(t) {
        let e = 3 * t.length / 4 >>> 0;
        61 === t.charCodeAt(t.length - 2) ? e -= 2 : 61 === t.charCodeAt(t.length - 1) && (e -= 1);
        const s = new Uint8Array(e);
        for (let e = 0, r = 0; e < t.length; e += 4) {
            const i = o[t.charCodeAt(e + 0)]
              , n = o[t.charCodeAt(e + 1)]
              , a = o[t.charCodeAt(e + 2)]
              , l = o[t.charCodeAt(e + 3)];
            s[r++] = i << 2 | n >> 4,
            s[r++] = (15 & n) << 4 | a >> 2,
            s[r++] = (3 & a) << 6 | 63 & l
        }
        return s
    },
    encode: function(t) {
        return new Promise( (e, s) => {
            const r = new FileReader;
            r.onerror = () => s(new Error("failed to convert to base64")),
            r.onload = () => {
                const t = r.result
                  , [,s] = t.split(",", 2);
                e(s)
            }
            ,
            r.readAsDataURL(new Blob([t]))
        }
        )
    }
});
var h = Object.freeze({
    __proto__: null,
    CharacterIdMap: class {
        #t = new Map;
        #e = new Map;
        #s = 33;
        toChar(t) {
            let e = this.#t.get(t);
            if (!e) {
                if (this.#s >= 65535)
                    throw new Error("CharacterIdMap ran out of capacity!");
                e = String.fromCharCode(this.#s++),
                this.#t.set(t, e),
                this.#e.set(e, t)
            }
            return e
        }
        fromChar(t) {
            const e = this.#e.get(t);
            return void 0 === e ? null : e
        }
    }
});
const c = .9642
  , g = .8251;
class u {
    values = [0, 0, 0];
    constructor(t) {
        t && (this.values = t)
    }
}
class d {
    values = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    constructor(t) {
        t && (this.values = t)
    }
    multiply(t) {
        const e = new u;
        for (let s = 0; s < 3; ++s)
            e.values[s] = this.values[s][0] * t.values[0] + this.values[s][1] * t.values[1] + this.values[s][2] * t.values[2];
        return e
    }
}
class p {
    g;
    a;
    b;
    c;
    d;
    e;
    f;
    constructor(t, e, s=0, r=0, i=0, n=0, a=0) {
        this.g = t,
        this.a = e,
        this.b = s,
        this.c = r,
        this.d = i,
        this.e = n,
        this.f = a
    }
    eval(t) {
        const e = t < 0 ? -1 : 1
          , s = t * e;
        return s < this.d ? e * (this.c * s + this.f) : e * (Math.pow(this.a * s + this.b, this.g) + this.e)
    }
}
const m = {
    sRGB: new p(2.4,1 / 1.055,.055 / 1.055,1 / 12.92,.04045,0,0),
    sRGB_INVERSE: new p(.416667,1.13728,-0,12.92,.0031308,-.0549698,-0),
    proPhotoRGB: new p(1.8,1),
    proPhotoRGB_INVERSE: new p(.555556,1,-0,0,0,0,0),
    k2Dot2: new p(2.2,1),
    k2Dot2_INVERSE: new p(.454545,1),
    rec2020: new p(2.22222,.909672,.0903276,.222222,.0812429,0,0),
    rec2020_INVERSE: new p(.45,1.23439,-0,4.5,.018054,-.0993195,-0)
}
  , y = {
    sRGB: new d([[.436065674, .385147095, .143066406], [.222488403, .716873169, .06060791], [.013916016, .097076416, .714096069]]),
    sRGB_INVERSE: new d([[3.134112151374599, -1.6173924597114966, -.4906334036481285], [-.9787872938826594, 1.9162795854799963, .0334547139520088], [.07198304248352326, -.2289858493321844, 1.4053851325241447]]),
    displayP3: new d([[.515102, .291965, .157153], [.241182, .692236, .0665819], [-.00104941, .0418818, .784378]]),
    displayP3_INVERSE: new d([[2.404045155982687, -.9898986932663839, -.3976317191366333], [-.8422283799266768, 1.7988505115115485, .016048170293157416], [.04818705979712955, -.09737385156228891, 1.2735066448052303]]),
    adobeRGB: new d([[.60974, .20528, .14919], [.31111, .62567, .06322], [.01947, .06087, .74457]]),
    adobeRGB_INVERSE: new d([[1.9625385510109137, -.6106892546501431, -.3413827467482388], [-.9787580455521, 1.9161624707082339, .03341676594241408], [.028696263137883395, -.1406807819331586, 1.349252109991369]]),
    rec2020: new d([[.673459, .165661, .1251], [.279033, .675338, .0456288], [-.00193139, .0299794, .797162]]),
    rec2020_INVERSE: new d([[1.647275201661012, -.3936024771460771, -.23598028884792507], [-.6826176165196962, 1.647617775014935, .01281626807852422], [.029662725298529837, -.06291668721366285, 1.2533964313435522]]),
    xyz: new d([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
};
function b(t) {
    return t * (Math.PI / 180)
}
function w(t, e, s, r) {
    return [t.eval(e), t.eval(s), t.eval(r)]
}
const f = new d([[.9999999984505198, .39633779217376786, .2158037580607588], [1.0000000088817609, -.10556134232365635, -.06385417477170591], [1.0000000546724108, -.08948418209496575, -1.2914855378640917]])
  , S = new d([[.2104542553, .7936177849999999, -.0040720468], [1.9779984951000003, -2.4285922049999997, .4505937099000001], [.025904037099999982, .7827717662, -.8086757660000001]])
  , x = new d([[.8190224432164319, .3619062562801221, -.12887378261216414], [.0329836671980271, .9292868468965546, .03614466816999844], [.048177199566046255, .26423952494422764, .6335478258136937]])
  , v = new d([[1.226879873374156, -.5578149965554814, .2813910501772159], [-.040575762624313734, 1.1122868293970596, -.07171106666151703], [-.07637294974672144, -.4214933239627915, 1.586924024427242]])
  , T = new d([[.7976700747153241, .13519395152800417, .03135596341127167], [.28803902352472205, .7118744007923554, 8661179538844252e-20], [2.739876695467402e-7, -14405226518969991e-22, .825211112593861]])
  , R = new d([[1.3459533710138858, -.25561367037652133, -.051116041522131374], [-.544600415668951, 1.5081687311475767, .020535163968720935], [-13975622054109725e-22, 2717590904589903e-21, 1.2118111696814942]])
  , z = new d([[1.0478573189120088, .022907374491829943, -.050162247377152525], [.029570500050499514, .9904755577034089, -.017061518194840468], [-.00924047197558879, .015052921526981566, .7519708530777581]])
  , A = new d([[.9555366447632887, -.02306009252137888, .06321844147263304], [-.028315378228764922, 1.009951351591575, .021026001591792402], [.012308773293784308, -.02050053471777469, 1.3301947294775631]]);
class P {
    static labToXyzd50(t, e, s) {
        let r = (t + 16) / 116
          , i = r + e / 500
          , n = r - s / 200;
        function a(t) {
            return t <= 24 / 116 ? 108 / 841 * (t - 16 / 116) : t * t * t
        }
        return i = a(i) * c,
        r = 1 * a(r),
        n = a(n) * g,
        [i, r, n]
    }
    static xyzd50ToLab(t, e, s) {
        function r(t) {
            return t <= .008856451679035631 ? 841 / 108 * t + 16 / 116 : Math.pow(t, 1 / 3)
        }
        t = r(t / c);
        return [116 * (e = r(e / 1)) - 16, 500 * (t - e), 200 * (e - (s = r(s / g)))]
    }
    static oklabToXyzd65(t, e, s) {
        const r = new u([t, e, s])
          , i = f.multiply(r);
        i.values[0] = i.values[0] * i.values[0] * i.values[0],
        i.values[1] = i.values[1] * i.values[1] * i.values[1],
        i.values[2] = i.values[2] * i.values[2] * i.values[2];
        return v.multiply(i).values
    }
    static xyzd65ToOklab(t, e, s) {
        const r = new u([t, e, s])
          , i = x.multiply(r);
        i.values[0] = Math.pow(i.values[0], 1 / 3),
        i.values[1] = Math.pow(i.values[1], 1 / 3),
        i.values[2] = Math.pow(i.values[2], 1 / 3);
        const n = S.multiply(i);
        return [n.values[0], n.values[1], n.values[2]]
    }
    static lchToLab(t, e, s) {
        return void 0 === s ? [t, 0, 0] : [t, e * Math.cos(b(s)), e * Math.sin(b(s))]
    }
    static labToLch(t, e, s) {
        return [t, Math.sqrt(e * e + s * s), (r = Math.atan2(s, e),
        r * (180 / Math.PI))];
        var r
    }
    static displayP3ToXyzd50(t, e, s) {
        const [r,i,n] = w(m.sRGB, t, e, s)
          , a = new u([r, i, n]);
        return y.displayP3.multiply(a).values
    }
    static xyzd50ToDisplayP3(t, e, s) {
        const r = new u([t, e, s])
          , i = y.displayP3_INVERSE.multiply(r);
        return w(m.sRGB_INVERSE, i.values[0], i.values[1], i.values[2])
    }
    static proPhotoToXyzd50(t, e, s) {
        const [r,i,n] = w(m.proPhotoRGB, t, e, s)
          , a = new u([r, i, n]);
        return T.multiply(a).values
    }
    static xyzd50ToProPhoto(t, e, s) {
        const r = new u([t, e, s])
          , i = R.multiply(r);
        return w(m.proPhotoRGB_INVERSE, i.values[0], i.values[1], i.values[2])
    }
    static adobeRGBToXyzd50(t, e, s) {
        const [r,i,n] = w(m.k2Dot2, t, e, s)
          , a = new u([r, i, n]);
        return y.adobeRGB.multiply(a).values
    }
    static xyzd50ToAdobeRGB(t, e, s) {
        const r = new u([t, e, s])
          , i = y.adobeRGB_INVERSE.multiply(r);
        return w(m.k2Dot2_INVERSE, i.values[0], i.values[1], i.values[2])
    }
    static rec2020ToXyzd50(t, e, s) {
        const [r,i,n] = w(m.rec2020, t, e, s)
          , a = new u([r, i, n]);
        return y.rec2020.multiply(a).values
    }
    static xyzd50ToRec2020(t, e, s) {
        const r = new u([t, e, s])
          , i = y.rec2020_INVERSE.multiply(r);
        return w(m.rec2020_INVERSE, i.values[0], i.values[1], i.values[2])
    }
    static xyzd50ToD65(t, e, s) {
        const r = new u([t, e, s]);
        return A.multiply(r).values
    }
    static xyzd65ToD50(t, e, s) {
        const r = new u([t, e, s]);
        return z.multiply(r).values
    }
    static xyzd50TosRGBLinear(t, e, s) {
        const r = new u([t, e, s]);
        return y.sRGB_INVERSE.multiply(r).values
    }
    static srgbLinearToXyzd50(t, e, s) {
        const r = new u([t, e, s]);
        return y.sRGB.multiply(r).values
    }
    static srgbToXyzd50(t, e, s) {
        const [r,i,n] = w(m.sRGB, t, e, s)
          , a = new u([r, i, n]);
        return y.sRGB.multiply(a).values
    }
    static xyzd50ToSrgb(t, e, s) {
        const r = new u([t, e, s])
          , i = y.sRGB_INVERSE.multiply(r);
        return w(m.sRGB_INVERSE, i.values[0], i.values[1], i.values[2])
    }
    static oklchToXyzd50(t, e, s) {
        const [r,i,n] = P.lchToLab(t, e, s)
          , [a,o,l] = P.oklabToXyzd65(r, i, n);
        return P.xyzd65ToD50(a, o, l)
    }
    static xyzd50ToOklch(t, e, s) {
        const [r,i,n] = P.xyzd50ToD65(t, e, s)
          , [a,o,l] = P.xyzd65ToOklab(r, i, n);
        return P.labToLch(a, o, l)
    }
}
var E = Object.freeze({
    __proto__: null,
    ColorConverter: P
});
function k(t, e) {
    const s = t[3];
    return [(1 - s) * e[0] + s * t[0], (1 - s) * e[1] + s * t[1], (1 - s) * e[2] + s * t[2], s + e[3] * (1 - s)]
}
function L([t,e,s]) {
    const r = Math.max(t, e, s)
      , i = Math.min(t, e, s)
      , n = r - i;
    let a;
    return a = i === r ? 0 : t === r ? (1 / 6 * (e - s) / n + 1) % 1 : e === r ? 1 / 6 * (s - t) / n + 1 / 3 : 1 / 6 * (t - e) / n + 2 / 3,
    a
}
function I(t) {
    const [e,s,r] = C([...t, void 0]);
    return [e, s, r]
}
function C([t,e,s,r]) {
    const i = Math.max(t, e, s)
      , n = Math.min(t, e, s)
      , a = i - n
      , o = i + n
      , l = .5 * o;
    let h;
    return h = 0 === l || 1 === l ? 0 : l <= .5 ? a / o : a / (2 - o),
    [L([t, e, s]), h, l, r]
}
function _(t) {
    const [e,s,r] = N([...t, void 0]);
    return [e, s, r]
}
function N([t,e,s,r]) {
    const i = L([t, e, s])
      , n = Math.max(t, e, s);
    return [i, Math.min(t, e, s), 1 - n, r]
}
function O([t,e,s]) {
    return .2126 * (t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)) + .7152 * (e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)) + .0722 * (s <= .04045 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4))
}
const G = .027;
function V([t,e,s]) {
    return .2126729 * Math.pow(t, 2.4) + .7151522 * Math.pow(e, 2.4) + .072175 * Math.pow(s, 2.4)
}
function B(t, e) {
    return D(V(k(t, e)), V(e))
}
function M(t) {
    return t > .022 ? t : t + Math.pow(.022 - t, 1.414)
}
function D(t, e) {
    if (t = M(t),
    e = M(e),
    Math.abs(t - e) < 5e-4)
        return 0;
    let s = 0;
    return e > t ? (s = 1.14 * (Math.pow(e, .56) - Math.pow(t, .57)),
    s = s < .1 ? 0 : s - G) : (s = 1.14 * (Math.pow(e, .65) - Math.pow(t, .62)),
    s = s > -.1 ? 0 : s + G),
    100 * s
}
function X(t, e, s) {
    function r() {
        return s ? Math.pow(Math.abs(Math.pow(t, .65) - (-e - G) / 1.14), 1 / .62) : Math.pow(Math.abs(Math.pow(t, .56) - (e + G) / 1.14), 1 / .57)
    }
    t = M(t),
    e /= 100;
    let i = r();
    return (i < 0 || i > 1) && (s = !s,
    i = r()),
    i
}
const F = [[12, -1, -1, -1, -1, 100, 90, 80, -1, -1], [14, -1, -1, -1, 100, 90, 80, 60, 60, -1], [16, -1, -1, 100, 90, 80, 60, 55, 50, 50], [18, -1, -1, 90, 80, 60, 55, 50, 40, 40], [24, -1, 100, 80, 60, 55, 50, 40, 38, 35], [30, -1, 90, 70, 55, 50, 40, 38, 35, 40], [36, -1, 80, 60, 50, 40, 38, 35, 30, 25], [48, 100, 70, 55, 40, 38, 35, 30, 25, 20], [60, 90, 60, 50, 38, 35, 30, 25, 20, 20], [72, 80, 55, 40, 35, 30, 25, 20, 20, 20], [96, 70, 50, 35, 30, 25, 20, 20, 20, 20], [120, 60, 40, 30, 25, 20, 20, 20, 20, 20]];
function W(t, e) {
    const s = 72 * parseFloat(t.replace("px", "")) / 96;
    return (isNaN(Number(e)) ? ["bold", "bolder"].includes(e) : Number(e) >= 600) ? s >= 14 : s >= 18
}
F.reverse();
const U = {
    aa: 3,
    aaa: 4.5
}
  , j = {
    aa: 4.5,
    aaa: 7
};
var $ = Object.freeze({
    __proto__: null,
    blendColors: k,
    contrastRatio: function(t, e) {
        const s = O(k(t, e))
          , r = O(e);
        return (Math.max(s, r) + .05) / (Math.min(s, r) + .05)
    },
    contrastRatioAPCA: B,
    contrastRatioByLuminanceAPCA: D,
    desiredLuminanceAPCA: X,
    getAPCAThreshold: function(t, e) {
        const s = parseFloat(t.replace("px", ""))
          , r = parseFloat(e);
        for (const [t,...e] of F)
            if (s >= t)
                for (const [t,s] of [900, 800, 700, 600, 500, 400, 300, 200, 100].entries())
                    if (r >= s) {
                        const s = e[e.length - 1 - t];
                        return -1 === s ? null : s
                    }
        return null
    },
    getContrastThreshold: function(t, e) {
        return W(t, e) ? U : j
    },
    isLargeFont: W,
    luminance: O,
    luminanceAPCA: V,
    rgbToHsl: I,
    rgbToHwb: _,
    rgbaToHsla: C,
    rgbaToHwba: N
});
function H(t) {
    return (t % 360 + 360) % 360
}
function q(t) {
    const e = t.replace(/(deg|g?rad|turn)$/, "");
    if (isNaN(e) || t.match(/\s+(deg|g?rad|turn)/))
        return null;
    const s = parseFloat(e);
    return t.includes("turn") ? 360 * s : t.includes("grad") ? 9 * s / 10 : t.includes("rad") ? 180 * s / Math.PI : s
}
function K(t) {
    switch (t) {
    case "srgb":
        return "srgb";
    case "srgb-linear":
        return "srgb-linear";
    case "display-p3":
        return "display-p3";
    case "a98-rgb":
        return "a98-rgb";
    case "prophoto-rgb":
        return "prophoto-rgb";
    case "rec2020":
        return "rec2020";
    case "xyz":
        return "xyz";
    case "xyz-d50":
        return "xyz-d50";
    case "xyz-d65":
        return "xyz-d65"
    }
    return null
}
function Z(t, e) {
    const s = Math.sign(t)
      , r = Math.abs(t)
      , [i,n] = e;
    return s * (r * (n - i) / 100 + i)
}
function Y(t, {min: e, max: s}) {
    return null === t || (void 0 !== e && (t = Math.max(t, e)),
    void 0 !== s && (t = Math.min(t, s))),
    t
}
function J(t, e) {
    if (!t.endsWith("%"))
        return null;
    const s = parseFloat(t.substr(0, t.length - 1));
    return isNaN(s) ? null : Z(s, e)
}
function Q(t) {
    const e = parseFloat(t);
    return isNaN(e) ? null : e
}
function tt(t) {
    return void 0 === t ? null : Y(J(t, [0, 1]) ?? Q(t), {
        min: 0,
        max: 1
    })
}
function et(t, e=[0, 1]) {
    if (isNaN(t.replace("%", "")))
        return null;
    const s = parseFloat(t);
    return -1 !== t.indexOf("%") ? t.indexOf("%") !== t.length - 1 ? null : Z(s, e) : s
}
function st(t) {
    const e = et(t);
    return null === e ? null : -1 !== t.indexOf("%") ? e : e / 255
}
function rt(t) {
    const e = t.replace(/(deg|g?rad|turn)$/, "");
    if (isNaN(e) || t.match(/\s+(deg|g?rad|turn)/))
        return null;
    const s = parseFloat(e);
    return -1 !== t.indexOf("turn") ? s % 1 : -1 !== t.indexOf("grad") ? s / 400 % 1 : -1 !== t.indexOf("rad") ? s / (2 * Math.PI) % 1 : s / 360 % 1
}
function it(t) {
    if (t.indexOf("%") !== t.length - 1 || isNaN(t.replace("%", "")))
        return null;
    return parseFloat(t) / 100
}
function nt(t) {
    const e = t[0];
    let s = t[1];
    const r = t[2];
    function i(t, e, s) {
        return s < 0 ? s += 1 : s > 1 && (s -= 1),
        6 * s < 1 ? t + (e - t) * s * 6 : 2 * s < 1 ? e : 3 * s < 2 ? t + (e - t) * (2 / 3 - s) * 6 : t
    }
    let n;
    s < 0 && (s = 0),
    n = r <= .5 ? r * (1 + s) : r + s - r * s;
    const a = 2 * r - n
      , o = e
      , l = e - 1 / 3;
    return [i(a, n, e + 1 / 3), i(a, n, o), i(a, n, l), t[3]]
}
function at(t) {
    return nt(function(t) {
        const e = t[0];
        let s = t[1];
        const r = t[2]
          , i = (2 - s) * r;
        return 0 === r || 0 === s ? s = 0 : s *= r / (i < 1 ? i : 2 - i),
        [e, s, i / 2, t[3]]
    }(t))
}
function ot(t, e, s) {
    function r() {
        return s ? (t + .05) * e - .05 : (t + .05) / e - .05
    }
    let i = r();
    return (i < 0 || i > 1) && (s = !s,
    i = r()),
    i
}
function lt(t, e, s, r) {
    let i = t[e]
      , n = 1
      , a = r(t) - s
      , o = Math.sign(a);
    for (let l = 100; l; l--) {
        if (Math.abs(a) < 2e-4)
            return t[e] = i,
            i;
        const l = Math.sign(a);
        if (l !== o)
            n /= 2,
            o = l;
        else if (i < 0 || i > 1)
            return null;
        i += n * (2 === e ? -a : a),
        t[e] = i,
        a = r(t) - s
    }
    return null
}
function ht(t, e, s=.01) {
    if (Array.isArray(t) && Array.isArray(e)) {
        if (t.length !== e.length)
            return !1;
        for (const s in t)
            if (!ht(t[s], e[s]))
                return !1;
        return !0
    }
    return !Array.isArray(t) && !Array.isArray(e) && (null === t || null === e ? t === e : Math.abs(t - e) < s)
}
function ct(t, e, s=.01) {
    return t - e <= s
}
class gt {
    l;
    a;
    b;
    alpha;
    #r;
    #i;
    channels = ["l", "a", "b", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => new ut(...P.labToLch(t.l, t.a, t.b),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => t,
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.labToXyzd50(this.l, this.a, this.b)
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, s, r, i) {
        this.#i = [t, e, s],
        this.l = Y(t, {
            min: 0,
            max: 100
        }),
        (ht(this.l, 0, 1) || ht(this.l, 100, 1)) && (e = s = 0),
        this.a = e,
        this.b = s,
        this.alpha = Y(r, {
            min: 0,
            max: 1
        }),
        this.#r = i
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return gt.#n[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    equal(t) {
        const e = t.as("lab");
        return ht(e.l, this.l, 1) && ht(e.a, this.a) && ht(e.b, this.b) && ht(e.alpha, this.alpha)
    }
    format() {
        return "lab"
    }
    setAlpha(t) {
        return new gt(this.l,this.a,this.b,t,void 0)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.a, this.b)
    }
    #l(t, s, r) {
        const i = null === this.alpha || ht(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `lab(${e.StringUtilities.stringifyWithPrecision(t, 0)} ${e.StringUtilities.stringifyWithPrecision(s)} ${e.StringUtilities.stringifyWithPrecision(r)}${i})`
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const s = J(t[0], [0, 100]) ?? Q(t[0]);
        if (null === s)
            return null;
        const r = J(t[1], [0, 125]) ?? Q(t[1]);
        if (null === r)
            return null;
        const i = J(t[2], [0, 125]) ?? Q(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new gt(s,r,i,n,e)
    }
}
class ut {
    #i;
    l;
    c;
    h;
    alpha;
    #r;
    channels = ["l", "c", "h", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => t,
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.lchToLab(t.l, t.c, t.h),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.labToXyzd50(...P.lchToLab(this.l, this.c, this.h))
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, s, r, i) {
        this.#i = [t, e, s],
        this.l = Y(t, {
            min: 0,
            max: 100
        }),
        e = ht(this.l, 0, 1) || ht(this.l, 100, 1) ? 0 : e,
        this.c = Y(e, {
            min: 0
        }),
        s = ht(e, 0) ? 0 : s,
        this.h = H(s),
        this.alpha = Y(r, {
            min: 0,
            max: 1
        }),
        this.#r = i
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return ut.#n[t](this)
    }
    equal(t) {
        const e = t.as("lch");
        return ht(e.l, this.l, 1) && ht(e.c, this.c) && ht(e.h, this.h) && ht(e.alpha, this.alpha)
    }
    format() {
        return "lch"
    }
    setAlpha(t) {
        return new ut(this.l,this.c,this.h,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.c, this.h)
    }
    #l(t, s, r) {
        const i = null === this.alpha || ht(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `lch(${e.StringUtilities.stringifyWithPrecision(t, 0)} ${e.StringUtilities.stringifyWithPrecision(s)} ${e.StringUtilities.stringifyWithPrecision(r)}${i})`
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !1
    }
    isHuePowerless() {
        return ht(this.c, 0)
    }
    static fromSpec(t, e) {
        const s = J(t[0], [0, 100]) ?? Q(t[0]);
        if (null === s)
            return null;
        const r = J(t[1], [0, 150]) ?? Q(t[1]);
        if (null === r)
            return null;
        const i = q(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new ut(s,r,i,n,e)
    }
}
class dt {
    #i;
    l;
    a;
    b;
    alpha;
    #r;
    channels = ["l", "a", "b", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => t,
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.xyzd65ToD50(...P.oklabToXyzd65(this.l, this.a, this.b))
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, s, r, i) {
        this.#i = [t, e, s],
        this.l = Y(t, {
            min: 0,
            max: 1
        }),
        (ht(this.l, 0) || ht(this.l, 1)) && (e = s = 0),
        this.a = e,
        this.b = s,
        this.alpha = Y(r, {
            min: 0,
            max: 1
        }),
        this.#r = i
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return dt.#n[t](this)
    }
    equal(t) {
        const e = t.as("oklab");
        return ht(e.l, this.l) && ht(e.a, this.a) && ht(e.b, this.b) && ht(e.alpha, this.alpha)
    }
    format() {
        return "oklab"
    }
    setAlpha(t) {
        return new dt(this.l,this.a,this.b,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.a, this.b)
    }
    #l(t, s, r) {
        const i = null === this.alpha || ht(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `oklab(${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(s)} ${e.StringUtilities.stringifyWithPrecision(r)}${i})`
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const s = J(t[0], [0, 1]) ?? Q(t[0]);
        if (null === s)
            return null;
        const r = J(t[1], [0, .4]) ?? Q(t[1]);
        if (null === r)
            return null;
        const i = J(t[2], [0, .4]) ?? Q(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new dt(s,r,i,n,e)
    }
}
class pt {
    #i;
    l;
    c;
    h;
    alpha;
    #r;
    channels = ["l", "c", "h", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => t,
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        return P.oklchToXyzd50(this.l, this.c, this.h)
    }
    #a(t=!0) {
        const e = P.xyzd50ToSrgb(...this.#o());
        return t ? [...e, this.alpha ?? void 0] : e
    }
    constructor(t, e, s, r, i) {
        this.#i = [t, e, s],
        this.l = Y(t, {
            min: 0,
            max: 1
        }),
        e = ht(this.l, 0) || ht(this.l, 1) ? 0 : e,
        this.c = Y(e, {
            min: 0
        }),
        s = ht(e, 0) ? 0 : s,
        this.h = H(s),
        this.alpha = Y(r, {
            min: 0,
            max: 1
        }),
        this.#r = i
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return pt.#n[t](this)
    }
    equal(t) {
        const e = t.as("oklch");
        return ht(e.l, this.l) && ht(e.c, this.c) && ht(e.h, this.h) && ht(e.alpha, this.alpha)
    }
    format() {
        return "oklch"
    }
    setAlpha(t) {
        return new pt(this.l,this.c,this.h,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.l, this.c, this.h)
    }
    #l(t, s, r) {
        const i = null === this.alpha || ht(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `oklch(${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(s)} ${e.StringUtilities.stringifyWithPrecision(r)}${i})`
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !1
    }
    static fromSpec(t, e) {
        const s = J(t[0], [0, 1]) ?? Q(t[0]);
        if (null === s)
            return null;
        const r = J(t[1], [0, .4]) ?? Q(t[1]);
        if (null === r)
            return null;
        const i = q(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new pt(s,r,i,n,e)
    }
}
class mt {
    #i;
    p0;
    p1;
    p2;
    alpha;
    colorSpace;
    #r;
    get channels() {
        return this.isXYZ() ? ["x", "y", "z", "alpha"] : ["r", "g", "b", "alpha"]
    }
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        const [t,e,s] = this.#i;
        switch (this.colorSpace) {
        case "srgb":
            return P.srgbToXyzd50(t, e, s);
        case "srgb-linear":
            return P.srgbLinearToXyzd50(t, e, s);
        case "display-p3":
            return P.displayP3ToXyzd50(t, e, s);
        case "a98-rgb":
            return P.adobeRGBToXyzd50(t, e, s);
        case "prophoto-rgb":
            return P.proPhotoToXyzd50(t, e, s);
        case "rec2020":
            return P.rec2020ToXyzd50(t, e, s);
        case "xyz-d50":
            return [t, e, s];
        case "xyz":
        case "xyz-d65":
            return P.xyzd65ToD50(t, e, s)
        }
        throw new Error("Invalid color space")
    }
    #a(t=!0) {
        const [e,s,r] = this.#i
          , i = "srgb" === this.colorSpace ? [e, s, r] : [...P.xyzd50ToSrgb(...this.#o())];
        return t ? [...i, this.alpha ?? void 0] : i
    }
    constructor(t, e, s, r, i, n) {
        this.#i = [e, s, r],
        this.colorSpace = t,
        this.#r = n,
        "xyz-d50" !== this.colorSpace && "xyz-d65" !== this.colorSpace && "xyz" !== this.colorSpace && (e = Y(e, {
            min: 0,
            max: 1
        }),
        s = Y(s, {
            min: 0,
            max: 1
        }),
        r = Y(r, {
            min: 0,
            max: 1
        })),
        this.p0 = e,
        this.p1 = s,
        this.p2 = r,
        this.alpha = Y(i, {
            min: 0,
            max: 1
        })
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return this.colorSpace === t ? this : mt.#n[t](this)
    }
    equal(t) {
        const e = t.as(this.colorSpace);
        return ht(this.p0, e.p0) && ht(this.p1, e.p1) && ht(this.p2, e.p2) && ht(this.alpha, e.alpha)
    }
    format() {
        return this.colorSpace
    }
    setAlpha(t) {
        return new mt(this.colorSpace,this.p0,this.p1,this.p2,t)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.p0, this.p1, this.p2)
    }
    #l(t, s, r) {
        const i = null === this.alpha || ht(this.alpha, 1) ? "" : ` / ${e.StringUtilities.stringifyWithPrecision(this.alpha)}`;
        return `color(${this.colorSpace} ${e.StringUtilities.stringifyWithPrecision(t)} ${e.StringUtilities.stringifyWithPrecision(s)} ${e.StringUtilities.stringifyWithPrecision(r)}${i})`
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return "xyz-d50" !== this.colorSpace && "xyz-d65" !== this.colorSpace && "xyz" !== this.colorSpace && !ht(this.#i, [this.p0, this.p1, this.p2])
    }
    isXYZ() {
        switch (this.colorSpace) {
        case "xyz":
        case "xyz-d50":
        case "xyz-d65":
            return !0
        }
        return !1
    }
    static fromSpec(t, e) {
        const [s,r] = e.split("/", 2)
          , i = s.trim().split(/\s+/)
          , [n,...a] = i
          , o = K(n);
        if (!o)
            return null;
        if (0 === a.length && void 0 === r)
            return new mt(o,0,0,0,null,t);
        if (0 === a.length && void 0 !== r && r.trim().split(/\s+/).length > 1)
            return null;
        if (a.length > 3)
            return null;
        const l = a.map(t => "none" === t ? "0" : t).map(t => et(t, [0, 1]));
        if (l.includes(null))
            return null;
        const h = r ? et(r, [0, 1]) ?? 1 : 1
          , c = [l[0] ?? 0, l[1] ?? 0, l[2] ?? 0, h];
        return new mt(o,...c,t)
    }
}
class yt {
    h;
    s;
    l;
    alpha;
    #i;
    #r;
    channels = ["h", "s", "l", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => t,
        hsla: t => t,
        hwb: t => new bt(..._(t.#a(!1)),t.alpha),
        hwba: t => new bt(..._(t.#a(!1)),t.alpha),
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #a(t=!0) {
        const e = nt([this.h, this.s, this.l, 0]);
        return t ? [e[0], e[1], e[2], this.alpha ?? void 0] : [e[0], e[1], e[2]]
    }
    #o() {
        const t = this.#a(!1);
        return P.srgbToXyzd50(t[0], t[1], t[2])
    }
    constructor(t, e, s, r, i) {
        this.#i = [t, e, s],
        this.l = Y(s, {
            min: 0,
            max: 1
        }),
        e = ht(this.l, 0) || ht(this.l, 1) ? 0 : e,
        this.s = Y(e, {
            min: 0,
            max: 1
        }),
        t = ht(this.s, 0) ? 0 : t,
        this.h = H(360 * t) / 360,
        this.alpha = Y(r ?? null, {
            min: 0,
            max: 1
        }),
        this.#r = i
    }
    equal(t) {
        const e = t.as("hsl");
        return ht(this.h, e.h) && ht(this.s, e.s) && ht(this.l, e.l) && ht(this.alpha, e.alpha)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.h, this.s, this.l)
    }
    #l(t, s, r) {
        const i = e.StringUtilities.sprintf("hsl(%sdeg %s% %s%", e.StringUtilities.stringifyWithPrecision(360 * t), e.StringUtilities.stringifyWithPrecision(100 * s), e.StringUtilities.stringifyWithPrecision(100 * r));
        return null !== this.alpha && 1 !== this.alpha ? i + e.StringUtilities.sprintf(" / %s%)", e.StringUtilities.stringifyWithPrecision(100 * this.alpha)) : i + ")"
    }
    setAlpha(t) {
        return new yt(this.h,this.s,this.l,t)
    }
    format() {
        return null === this.alpha || 1 === this.alpha ? "hsl" : "hsla"
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : yt.#n[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !ct(this.#i[1], 1) || !ct(0, this.#i[1])
    }
    static fromSpec(t, e) {
        const s = rt(t[0]);
        if (null === s)
            return null;
        const r = it(t[1]);
        if (null === r)
            return null;
        const i = it(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new yt(s,r,i,n,e)
    }
    hsva() {
        const t = this.s * (this.l < .5 ? this.l : 1 - this.l);
        return [this.h, 0 !== t ? 2 * t / (this.l + t) : 0, this.l + t, this.alpha ?? 1]
    }
    canonicalHSLA() {
        return [Math.round(360 * this.h), Math.round(100 * this.s), Math.round(100 * this.l), this.alpha ?? 1]
    }
}
class bt {
    h;
    w;
    b;
    alpha;
    #i;
    #r;
    channels = ["h", "w", "b", "alpha"];
    static #n = {
        hex: t => new vt(t.#a(!1),"hex"),
        hexa: t => new vt(t.#a(!0),"hexa"),
        rgb: t => new vt(t.#a(!1),"rgb"),
        rgba: t => new vt(t.#a(!0),"rgba"),
        hsl: t => new yt(...I(t.#a(!1)),t.alpha),
        hsla: t => new yt(...I(t.#a(!1)),t.alpha),
        hwb: t => t,
        hwba: t => t,
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #a(t=!0) {
        const e = function(t) {
            const e = t[0]
              , s = t[1]
              , r = t[2]
              , i = s / (s + r);
            let n = [i, i, i, t[3]];
            if (s + r < 1) {
                n = nt([e, 1, .5, t[3]]);
                for (let t = 0; t < 3; ++t)
                    n[t] += s - (s + r) * n[t]
            }
            return n
        }([this.h, this.w, this.b, 0]);
        return t ? [e[0], e[1], e[2], this.alpha ?? void 0] : [e[0], e[1], e[2]]
    }
    #o() {
        const t = this.#a(!1);
        return P.srgbToXyzd50(t[0], t[1], t[2])
    }
    constructor(t, e, s, r, i) {
        if (this.#i = [t, e, s],
        this.w = Y(e, {
            min: 0,
            max: 1
        }),
        this.b = Y(s, {
            min: 0,
            max: 1
        }),
        t = ct(1, this.w + this.b) ? 0 : t,
        this.h = H(360 * t) / 360,
        this.alpha = Y(r, {
            min: 0,
            max: 1
        }),
        ct(1, this.w + this.b)) {
            const t = this.w / this.b;
            this.b = 1 / (1 + t),
            this.w = 1 - this.b
        }
        this.#r = i
    }
    equal(t) {
        const e = t.as("hwb");
        return ht(this.h, e.h) && ht(this.w, e.w) && ht(this.b, e.b) && ht(this.alpha, e.alpha)
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(this.h, this.w, this.b)
    }
    #l(t, s, r) {
        const i = e.StringUtilities.sprintf("hwb(%sdeg %s% %s%", e.StringUtilities.stringifyWithPrecision(360 * t), e.StringUtilities.stringifyWithPrecision(100 * s), e.StringUtilities.stringifyWithPrecision(100 * r));
        return null !== this.alpha && 1 !== this.alpha ? i + e.StringUtilities.sprintf(" / %s%)", e.StringUtilities.stringifyWithPrecision(100 * this.alpha)) : i + ")"
    }
    setAlpha(t) {
        return new bt(this.h,this.w,this.b,t,this.#r)
    }
    format() {
        return null === this.alpha || ht(this.alpha, 1) ? "hwb" : "hwba"
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : bt.#n[t](this)
    }
    asLegacyColor() {
        return this.as("rgba")
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    canonicalHWBA() {
        return [Math.round(360 * this.h), Math.round(100 * this.w), Math.round(100 * this.b), this.alpha ?? 1]
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(...this.#i)
    }
    isGamutClipped() {
        return !(ct(this.#i[1], 1) && ct(0, this.#i[1]) && ct(this.#i[2], 1) && ct(0, this.#i[2]))
    }
    static fromSpec(t, e) {
        const s = rt(t[0]);
        if (null === s)
            return null;
        const r = it(t[1]);
        if (null === r)
            return null;
        const i = it(t[2]);
        if (null === i)
            return null;
        const n = tt(t[3]);
        return new bt(s,r,i,n,e)
    }
}
function wt(t) {
    return Math.round(255 * t)
}
class ft {
    color;
    channels = ["r", "g", "b", "alpha"];
    constructor(t) {
        this.color = t
    }
    get alpha() {
        return this.color.alpha
    }
    rgba() {
        return this.color.rgba()
    }
    equal(t) {
        return this.color.equal(t)
    }
    setAlpha(t) {
        return this.color.setAlpha(t)
    }
    format() {
        return 1 !== (this.alpha ?? 1) ? "hexa" : "hex"
    }
    as(t) {
        return this.color.as(t)
    }
    is(t) {
        return this.color.is(t)
    }
    asLegacyColor() {
        return this.color.asLegacyColor()
    }
    getAuthoredText() {
        return this.color.getAuthoredText()
    }
    getRawParameters() {
        return this.color.getRawParameters()
    }
    isGamutClipped() {
        return this.color.isGamutClipped()
    }
    asString(t) {
        if (t)
            return this.as(t).asString();
        const [e,s,r] = this.color.rgba();
        return this.stringify(e, s, r)
    }
    getAsRawString(t) {
        if (t)
            return this.as(t).getAsRawString();
        const [e,s,r] = this.getRawParameters();
        return this.stringify(e, s, r)
    }
}
class St extends ft {
    setAlpha(t) {
        return new St(this.color.setAlpha(t))
    }
    asString(t) {
        return t && t !== this.format() ? super.as(t).asString() : super.asString()
    }
    stringify(t, s, r) {
        function i(t) {
            return (Math.round(255 * t) / 17).toString(16)
        }
        return this.color.hasAlpha() ? e.StringUtilities.sprintf("#%s%s%s%s", i(t), i(s), i(r), i(this.alpha ?? 1)).toLowerCase() : e.StringUtilities.sprintf("#%s%s%s", i(t), i(s), i(r)).toLowerCase()
    }
}
class xt extends ft {
    nickname;
    constructor(t, e) {
        super(e),
        this.nickname = t
    }
    static fromName(t, e) {
        const s = t.toLowerCase()
          , r = Rt.get(s);
        return void 0 !== r ? new xt(s,vt.fromRGBA(r, e)) : null
    }
    stringify() {
        return this.nickname
    }
    getAsRawString(t) {
        return this.color.getAsRawString(t)
    }
}
class vt {
    #i;
    #h;
    #r;
    #c;
    channels = ["r", "g", "b", "alpha"];
    static #n = {
        hex: t => new vt(t.#h,"hex"),
        hexa: t => new vt(t.#h,"hexa"),
        rgb: t => new vt(t.#h,"rgb"),
        rgba: t => new vt(t.#h,"rgba"),
        hsl: t => new yt(...I([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hsla: t => new yt(...I([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hwb: t => new bt(..._([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        hwba: t => new bt(..._([t.#h[0], t.#h[1], t.#h[2]]),t.alpha),
        lch: t => new ut(...P.labToLch(...P.xyzd50ToLab(...t.#o())),t.alpha),
        oklch: t => new pt(...P.xyzd50ToOklch(...t.#o()),t.alpha),
        lab: t => new gt(...P.xyzd50ToLab(...t.#o()),t.alpha),
        oklab: t => new dt(...P.xyzd65ToOklab(...P.xyzd50ToD65(...t.#o())),t.alpha),
        srgb: t => new mt("srgb",...P.xyzd50ToSrgb(...t.#o()),t.alpha),
        "srgb-linear": t => new mt("srgb-linear",...P.xyzd50TosRGBLinear(...t.#o()),t.alpha),
        "display-p3": t => new mt("display-p3",...P.xyzd50ToDisplayP3(...t.#o()),t.alpha),
        "a98-rgb": t => new mt("a98-rgb",...P.xyzd50ToAdobeRGB(...t.#o()),t.alpha),
        "prophoto-rgb": t => new mt("prophoto-rgb",...P.xyzd50ToProPhoto(...t.#o()),t.alpha),
        rec2020: t => new mt("rec2020",...P.xyzd50ToRec2020(...t.#o()),t.alpha),
        xyz: t => new mt("xyz",...P.xyzd50ToD65(...t.#o()),t.alpha),
        "xyz-d50": t => new mt("xyz-d50",...t.#o(),t.alpha),
        "xyz-d65": t => new mt("xyz-d65",...P.xyzd50ToD65(...t.#o()),t.alpha)
    };
    #o() {
        const [t,e,s] = this.#h;
        return P.srgbToXyzd50(t, e, s)
    }
    get alpha() {
        switch (this.format()) {
        case "hexa":
        case "rgba":
            return this.#h[3];
        default:
            return null
        }
    }
    asLegacyColor() {
        return this
    }
    nickname() {
        const t = zt.get(String(this.canonicalRGBA()));
        return t ? new xt(t,this) : null
    }
    shortHex() {
        for (let t = 0; t < 4; ++t) {
            if (Math.round(255 * this.#h[t]) % 17)
                return null
        }
        return new St(this)
    }
    constructor(t, e, s) {
        this.#r = s || null,
        this.#c = e,
        this.#i = [t[0], t[1], t[2]],
        this.#h = [Y(t[0], {
            min: 0,
            max: 1
        }), Y(t[1], {
            min: 0,
            max: 1
        }), Y(t[2], {
            min: 0,
            max: 1
        }), Y(t[3] ?? 1, {
            min: 0,
            max: 1
        })]
    }
    static fromHex(t, e) {
        const s = 4 === (t = t.toLowerCase()).length || 8 === t.length ? "hexa" : "hex"
          , r = t.length <= 4;
        r && (t = t.charAt(0) + t.charAt(0) + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3));
        const i = parseInt(t.substring(0, 2), 16)
          , n = parseInt(t.substring(2, 4), 16)
          , a = parseInt(t.substring(4, 6), 16);
        let o = 1;
        8 === t.length && (o = parseInt(t.substring(6, 8), 16) / 255);
        const l = new vt([i / 255, n / 255, a / 255, o],s,e);
        return r ? new St(l) : l
    }
    static fromRGBAFunction(t, s, r, i, n) {
        const a = [st(t), st(s), st(r), i ? (o = i,
        et(o)) : 1];
        var o;
        return e.ArrayUtilities.arrayDoesNotContainNullOrUndefined(a) ? new vt(a,i ? "rgba" : "rgb",n) : null
    }
    static fromRGBA(t, e) {
        return new vt([t[0] / 255, t[1] / 255, t[2] / 255, t[3]],"rgba",e)
    }
    static fromHSVA(t) {
        const e = at(t);
        return new vt(e,"rgba")
    }
    is(t) {
        return t === this.format()
    }
    as(t) {
        return t === this.format() ? this : vt.#n[t](this)
    }
    format() {
        return this.#c
    }
    hasAlpha() {
        return 1 !== this.#h[3]
    }
    detectHEXFormat() {
        return this.hasAlpha() ? "hexa" : "hex"
    }
    asString(t) {
        return t ? this.as(t).asString() : this.#l(t, this.#h[0], this.#h[1], this.#h[2])
    }
    #l(t, s, r, i) {
        function n(t) {
            const e = Math.round(255 * t).toString(16);
            return 1 === e.length ? "0" + e : e
        }
        switch (t || (t = this.#c),
        t) {
        case "rgb":
        case "rgba":
            {
                const t = e.StringUtilities.sprintf("rgb(%d %d %d", wt(s), wt(r), wt(i));
                return this.hasAlpha() ? t + e.StringUtilities.sprintf(" / %d%)", Math.round(100 * this.#h[3])) : t + ")"
            }
        case "hex":
        case "hexa":
            return this.hasAlpha() ? e.StringUtilities.sprintf("#%s%s%s%s", n(s), n(r), n(i), n(this.#h[3])).toLowerCase() : e.StringUtilities.sprintf("#%s%s%s", n(s), n(r), n(i)).toLowerCase()
        }
    }
    getAuthoredText() {
        return this.#r ?? null
    }
    getRawParameters() {
        return [...this.#i]
    }
    getAsRawString(t) {
        return t ? this.as(t).getAsRawString() : this.#l(t, ...this.#i)
    }
    isGamutClipped() {
        return !ht(this.#i.map(wt), [this.#h[0], this.#h[1], this.#h[2]].map(wt), 1)
    }
    rgba() {
        return [...this.#h]
    }
    canonicalRGBA() {
        const t = new Array(4);
        for (let e = 0; e < 3; ++e)
            t[e] = Math.round(255 * this.#h[e]);
        return t[3] = this.#h[3],
        t
    }
    toProtocolRGBA() {
        const t = this.canonicalRGBA()
          , e = {
            r: t[0],
            g: t[1],
            b: t[2],
            a: void 0
        };
        return 1 !== t[3] && (e.a = t[3]),
        e
    }
    invert() {
        const t = [0, 0, 0, 0];
        return t[0] = 1 - this.#h[0],
        t[1] = 1 - this.#h[1],
        t[2] = 1 - this.#h[2],
        t[3] = this.#h[3],
        new vt(t,"rgba")
    }
    grayscale() {
        const [t,e,s] = this.#h
          , r = .299 * t + .587 * e + .114 * s;
        return new vt([r, r, r, .5],"rgba")
    }
    setAlpha(t) {
        const e = [...this.#h];
        return e[3] = t,
        new vt(e,"rgba")
    }
    blendWith(t) {
        const e = k(t.#h, this.#h);
        return new vt(e,"rgba")
    }
    blendWithAlpha(t) {
        const e = [...this.#h];
        return e[3] *= t,
        new vt(e,"rgba")
    }
    setFormat(t) {
        this.#c = t
    }
    equal(t) {
        const e = t.as(this.#c);
        return ht(wt(this.#h[0]), wt(e.#h[0]), 1) && ht(wt(this.#h[1]), wt(e.#h[1]), 1) && ht(wt(this.#h[2]), wt(e.#h[2]), 1) && ht(this.#h[3], e.#h[3])
    }
}
const Tt = [["aliceblue", [240, 248, 255]], ["antiquewhite", [250, 235, 215]], ["aqua", [0, 255, 255]], ["aquamarine", [127, 255, 212]], ["azure", [240, 255, 255]], ["beige", [245, 245, 220]], ["bisque", [255, 228, 196]], ["black", [0, 0, 0]], ["blanchedalmond", [255, 235, 205]], ["blue", [0, 0, 255]], ["blueviolet", [138, 43, 226]], ["brown", [165, 42, 42]], ["burlywood", [222, 184, 135]], ["cadetblue", [95, 158, 160]], ["chartreuse", [127, 255, 0]], ["chocolate", [210, 105, 30]], ["coral", [255, 127, 80]], ["cornflowerblue", [100, 149, 237]], ["cornsilk", [255, 248, 220]], ["crimson", [237, 20, 61]], ["cyan", [0, 255, 255]], ["darkblue", [0, 0, 139]], ["darkcyan", [0, 139, 139]], ["darkgoldenrod", [184, 134, 11]], ["darkgray", [169, 169, 169]], ["darkgrey", [169, 169, 169]], ["darkgreen", [0, 100, 0]], ["darkkhaki", [189, 183, 107]], ["darkmagenta", [139, 0, 139]], ["darkolivegreen", [85, 107, 47]], ["darkorange", [255, 140, 0]], ["darkorchid", [153, 50, 204]], ["darkred", [139, 0, 0]], ["darksalmon", [233, 150, 122]], ["darkseagreen", [143, 188, 143]], ["darkslateblue", [72, 61, 139]], ["darkslategray", [47, 79, 79]], ["darkslategrey", [47, 79, 79]], ["darkturquoise", [0, 206, 209]], ["darkviolet", [148, 0, 211]], ["deeppink", [255, 20, 147]], ["deepskyblue", [0, 191, 255]], ["dimgray", [105, 105, 105]], ["dimgrey", [105, 105, 105]], ["dodgerblue", [30, 144, 255]], ["firebrick", [178, 34, 34]], ["floralwhite", [255, 250, 240]], ["forestgreen", [34, 139, 34]], ["fuchsia", [255, 0, 255]], ["gainsboro", [220, 220, 220]], ["ghostwhite", [248, 248, 255]], ["gold", [255, 215, 0]], ["goldenrod", [218, 165, 32]], ["gray", [128, 128, 128]], ["grey", [128, 128, 128]], ["green", [0, 128, 0]], ["greenyellow", [173, 255, 47]], ["honeydew", [240, 255, 240]], ["hotpink", [255, 105, 180]], ["indianred", [205, 92, 92]], ["indigo", [75, 0, 130]], ["ivory", [255, 255, 240]], ["khaki", [240, 230, 140]], ["lavender", [230, 230, 250]], ["lavenderblush", [255, 240, 245]], ["lawngreen", [124, 252, 0]], ["lemonchiffon", [255, 250, 205]], ["lightblue", [173, 216, 230]], ["lightcoral", [240, 128, 128]], ["lightcyan", [224, 255, 255]], ["lightgoldenrodyellow", [250, 250, 210]], ["lightgreen", [144, 238, 144]], ["lightgray", [211, 211, 211]], ["lightgrey", [211, 211, 211]], ["lightpink", [255, 182, 193]], ["lightsalmon", [255, 160, 122]], ["lightseagreen", [32, 178, 170]], ["lightskyblue", [135, 206, 250]], ["lightslategray", [119, 136, 153]], ["lightslategrey", [119, 136, 153]], ["lightsteelblue", [176, 196, 222]], ["lightyellow", [255, 255, 224]], ["lime", [0, 255, 0]], ["limegreen", [50, 205, 50]], ["linen", [250, 240, 230]], ["magenta", [255, 0, 255]], ["maroon", [128, 0, 0]], ["mediumaquamarine", [102, 205, 170]], ["mediumblue", [0, 0, 205]], ["mediumorchid", [186, 85, 211]], ["mediumpurple", [147, 112, 219]], ["mediumseagreen", [60, 179, 113]], ["mediumslateblue", [123, 104, 238]], ["mediumspringgreen", [0, 250, 154]], ["mediumturquoise", [72, 209, 204]], ["mediumvioletred", [199, 21, 133]], ["midnightblue", [25, 25, 112]], ["mintcream", [245, 255, 250]], ["mistyrose", [255, 228, 225]], ["moccasin", [255, 228, 181]], ["navajowhite", [255, 222, 173]], ["navy", [0, 0, 128]], ["oldlace", [253, 245, 230]], ["olive", [128, 128, 0]], ["olivedrab", [107, 142, 35]], ["orange", [255, 165, 0]], ["orangered", [255, 69, 0]], ["orchid", [218, 112, 214]], ["palegoldenrod", [238, 232, 170]], ["palegreen", [152, 251, 152]], ["paleturquoise", [175, 238, 238]], ["palevioletred", [219, 112, 147]], ["papayawhip", [255, 239, 213]], ["peachpuff", [255, 218, 185]], ["peru", [205, 133, 63]], ["pink", [255, 192, 203]], ["plum", [221, 160, 221]], ["powderblue", [176, 224, 230]], ["purple", [128, 0, 128]], ["rebeccapurple", [102, 51, 153]], ["red", [255, 0, 0]], ["rosybrown", [188, 143, 143]], ["royalblue", [65, 105, 225]], ["saddlebrown", [139, 69, 19]], ["salmon", [250, 128, 114]], ["sandybrown", [244, 164, 96]], ["seagreen", [46, 139, 87]], ["seashell", [255, 245, 238]], ["sienna", [160, 82, 45]], ["silver", [192, 192, 192]], ["skyblue", [135, 206, 235]], ["slateblue", [106, 90, 205]], ["slategray", [112, 128, 144]], ["slategrey", [112, 128, 144]], ["snow", [255, 250, 250]], ["springgreen", [0, 255, 127]], ["steelblue", [70, 130, 180]], ["tan", [210, 180, 140]], ["teal", [0, 128, 128]], ["thistle", [216, 191, 216]], ["tomato", [255, 99, 71]], ["turquoise", [64, 224, 208]], ["violet", [238, 130, 238]], ["wheat", [245, 222, 179]], ["white", [255, 255, 255]], ["whitesmoke", [245, 245, 245]], ["yellow", [255, 255, 0]], ["yellowgreen", [154, 205, 50]], ["transparent", [0, 0, 0, 0]]];
console.assert(Tt.every( ([t]) => t.toLowerCase() === t), "All color nicknames must be lowercase.");
const Rt = new Map(Tt)
  , zt = new Map(Tt.map( ([t,[e,s,r,i=1]]) => [String([e, s, r, i]), t]))
  , At = [127, 32, 210]
  , Pt = {
    Content: vt.fromRGBA([111, 168, 220, .66]),
    ContentLight: vt.fromRGBA([111, 168, 220, .5]),
    ContentOutline: vt.fromRGBA([9, 83, 148]),
    Padding: vt.fromRGBA([147, 196, 125, .55]),
    PaddingLight: vt.fromRGBA([147, 196, 125, .4]),
    Border: vt.fromRGBA([255, 229, 153, .66]),
    BorderLight: vt.fromRGBA([255, 229, 153, .5]),
    Margin: vt.fromRGBA([246, 178, 107, .66]),
    MarginLight: vt.fromRGBA([246, 178, 107, .5]),
    EventTarget: vt.fromRGBA([255, 196, 196, .66]),
    Shape: vt.fromRGBA([96, 82, 177, .8]),
    ShapeMargin: vt.fromRGBA([96, 82, 127, .6]),
    CssGrid: vt.fromRGBA([75, 0, 130, 1]),
    LayoutLine: vt.fromRGBA([...At, 1]),
    GridBorder: vt.fromRGBA([...At, 1]),
    GapBackground: vt.fromRGBA([...At, .3]),
    GapHatch: vt.fromRGBA([...At, .8]),
    GridAreaBorder: vt.fromRGBA([26, 115, 232, 1])
}
  , Et = {
    ParentOutline: vt.fromRGBA([224, 90, 183, 1]),
    ChildOutline: vt.fromRGBA([0, 120, 212, 1])
}
  , kt = {
    Resizer: vt.fromRGBA([222, 225, 230, 1]),
    ResizerHandle: vt.fromRGBA([166, 166, 166, 1]),
    Mask: vt.fromRGBA([248, 249, 249, 1])
};
var Lt = Object.freeze({
    __proto__: null,
    ColorFunction: mt,
    ColorMixRegex: /color-mix\(.*,\s*(?<firstColor>.+)\s*,\s*(?<secondColor>.+)\s*\)/g,
    Generator: class {
        #g;
        #u;
        #d;
        #p;
        #m = new Map;
        constructor(t, e, s, r) {
            this.#g = t || {
                min: 0,
                max: 360,
                count: void 0
            },
            this.#u = e || 67,
            this.#d = s || 80,
            this.#p = r || 1
        }
        setColorForID(t, e) {
            this.#m.set(t, e)
        }
        colorForID(t) {
            let e = this.#m.get(t);
            return e || (e = this.generateColorForID(t),
            this.#m.set(t, e)),
            e
        }
        generateColorForID(t) {
            const s = e.StringUtilities.hashCode(t)
              , r = this.indexToValueInSpace(s, this.#g)
              , i = this.indexToValueInSpace(s >> 8, this.#u)
              , n = this.indexToValueInSpace(s >> 16, this.#d)
              , a = this.indexToValueInSpace(s >> 24, this.#p)
              , o = `hsl(${r}deg ${i}% ${n}%`;
            return 1 !== a ? `${o} / ${Math.floor(100 * a)}%)` : `${o})`
        }
        indexToValueInSpace(t, e) {
            if ("number" == typeof e)
                return e;
            const s = e.count || e.max - e.min;
            return t %= s,
            e.min + Math.floor(t / (s - 1) * (e.max - e.min))
        }
    }
    ,
    HSL: yt,
    HWB: bt,
    IsolationModeHighlight: kt,
    LCH: ut,
    Lab: gt,
    Legacy: vt,
    Nickname: xt,
    Nicknames: Rt,
    Oklab: dt,
    Oklch: pt,
    PageHighlight: Pt,
    Regex: /((?:rgba?|hsla?|hwba?|lab|lch|oklab|oklch|color)\([^)]+\)|#[0-9a-fA-F]{8}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3,4}|\b[a-zA-Z]+\b(?!-))/g,
    ShortHex: St,
    SourceOrderHighlight: Et,
    approachColorValue: lt,
    desiredLuminance: ot,
    findFgColorForContrast: function(t, e, s) {
        const r = t.as("hsl").hsva()
          , i = e.rgba()
          , n = t => O(k(vt.fromHSVA(t).rgba(), i))
          , a = O(e.rgba())
          , o = ot(a, s, n(r) > a);
        return lt(r, 2, o, n) ? vt.fromHSVA(r) : (r[2] = 1,
        lt(r, 1, o, n) ? vt.fromHSVA(r) : null)
    },
    findFgColorForContrastAPCA: function(t, e, s) {
        const r = t.as("hsl").hsva()
          , i = t => V(vt.fromHSVA(t).rgba())
          , n = V(e.rgba())
          , a = X(n, s, i(r) >= n);
        if (lt(r, 2, a, i)) {
            const t = vt.fromHSVA(r);
            if (Math.abs(B(e.rgba(), t.rgba())) >= s)
                return t
        }
        if (r[2] = 1,
        lt(r, 1, a, i)) {
            const t = vt.fromHSVA(r);
            if (Math.abs(B(e.rgba(), t.rgba())) >= s)
                return t
        }
        return null
    },
    getFormat: function(t) {
        switch (t) {
        case "hex":
            return "hex";
        case "hexa":
            return "hexa";
        case "rgb":
            return "rgb";
        case "rgba":
            return "rgba";
        case "hsl":
            return "hsl";
        case "hsla":
            return "hsla";
        case "hwb":
            return "hwb";
        case "hwba":
            return "hwba";
        case "lch":
            return "lch";
        case "oklch":
            return "oklch";
        case "lab":
            return "lab";
        case "oklab":
            return "oklab"
        }
        return K(t)
    },
    hsl2rgb: nt,
    hsva2rgba: at,
    parse: function(t) {
        if (!t.match(/\s/)) {
            const e = t.toLowerCase().match(/^(?:#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(\w+))$/i);
            if (e)
                return e[1] ? vt.fromHex(e[1], t) : e[2] ? xt.fromName(e[2], t) : null
        }
        const e = t.toLowerCase().match(/^\s*(?:(rgba?)|(hsla?)|(hwba?)|(lch)|(oklch)|(lab)|(oklab)|(color))\((.*)\)\s*$/);
        if (e) {
            const s = Boolean(e[1])
              , r = Boolean(e[2])
              , i = Boolean(e[3])
              , n = Boolean(e[4])
              , a = Boolean(e[5])
              , o = Boolean(e[6])
              , l = Boolean(e[7])
              , h = Boolean(e[8])
              , c = e[9];
            if (h)
                return mt.fromSpec(t, c);
            const g = function(t, {allowCommas: e, convertNoneToZero: s}) {
                const r = t.trim();
                let i = [];
                e && (i = r.split(/\s*,\s*/));
                if (!e || 1 === i.length)
                    if (i = r.split(/\s+/),
                    "/" === i[3]) {
                        if (i.splice(3, 1),
                        4 !== i.length)
                            return null
                    } else if (i.length > 2 && -1 !== i[2].indexOf("/") || i.length > 3 && -1 !== i[3].indexOf("/")) {
                        const t = i.slice(2, 4).join("");
                        i = i.slice(0, 2).concat(t.split(/\//)).concat(i.slice(4))
                    } else if (i.length >= 4)
                        return null;
                if (3 !== i.length && 4 !== i.length || i.indexOf("") > -1)
                    return null;
                if (s)
                    return i.map(t => "none" === t ? "0" : t);
                return i
            }(c, {
                allowCommas: s || r,
                convertNoneToZero: !(s || r || i)
            });
            if (!g)
                return null;
            const u = [g[0], g[1], g[2], g[3]];
            if (s)
                return vt.fromRGBAFunction(g[0], g[1], g[2], g[3], t);
            if (r)
                return yt.fromSpec(u, t);
            if (i)
                return bt.fromSpec(u, t);
            if (n)
                return ut.fromSpec(u, t);
            if (a)
                return pt.fromSpec(u, t);
            if (o)
                return gt.fromSpec(u, t);
            if (l)
                return dt.fromSpec(u, t)
        }
        return null
    },
    parseHueNumeric: rt,
    rgb2hsv: function(t) {
        const e = I(t)
          , s = e[0];
        let r = e[1];
        const i = e[2];
        return r *= i < .5 ? i : 1 - i,
        [s, 0 !== r ? 2 * r / (i + r) : 0, i + r]
    }
});
class It {
    listeners;
    addEventListener(t, e, s) {
        this.listeners || (this.listeners = new Map);
        let r = this.listeners.get(t);
        return r || (r = new Set,
        this.listeners.set(t, r)),
        r.add({
            thisObject: s,
            listener: e
        }),
        {
            eventTarget: this,
            eventType: t,
            thisObject: s,
            listener: e
        }
    }
    once(t) {
        return new Promise(e => {
            const s = this.addEventListener(t, r => {
                this.removeEventListener(t, s.listener),
                e(r.data)
            }
            )
        }
        )
    }
    removeEventListener(t, e, s) {
        const r = this.listeners?.get(t);
        if (r) {
            for (const t of r)
                t.listener === e && t.thisObject === s && (t.disposed = !0,
                r.delete(t));
            r.size || this.listeners?.delete(t)
        }
    }
    hasEventListeners(t) {
        return Boolean(this.listeners?.has(t))
    }
    dispatchEventToListeners(t, ...[e]) {
        const s = this.listeners?.get(t);
        if (!s)
            return;
        const r = {
            data: e,
            source: this
        };
        for (const t of [...s])
            t.disposed || t.listener.call(t.thisObject, r)
    }
}
var Ct = Object.freeze({
    __proto__: null,
    ObjectWrapper: It,
    eventMixin: function(t) {
        return console.assert(t !== HTMLElement),
        class extends t {
            #y = new It;
            addEventListener(t, e, s) {
                return this.#y.addEventListener(t, e, s)
            }
            once(t) {
                return this.#y.once(t)
            }
            removeEventListener(t, e, s) {
                this.#y.removeEventListener(t, e, s)
            }
            hasEventListeners(t) {
                return this.#y.hasEventListeners(t)
            }
            dispatchEventToListeners(t, ...e) {
                this.#y.dispatchEventToListeners(t, ...e)
            }
        }
    }
});
const _t = {
    elementsPanel: "Elements panel",
    stylesSidebar: "styles sidebar",
    changesDrawer: "Changes drawer",
    issuesView: "Issues view",
    networkPanel: "Network panel",
    requestConditionsDrawer: "Request conditions drawer",
    applicationPanel: "Application panel",
    securityPanel: "Security panel",
    sourcesPanel: "Sources panel",
    timelinePanel: "Performance panel",
    memoryInspectorPanel: "Memory inspector panel",
    developerResourcesPanel: "Developer Resources panel",
    animationsPanel: "Animations panel"
}
  , Nt = s.i18n.registerUIStrings("core/common/Revealer.ts", _t)
  , Ot = s.i18n.getLazilyComputedLocalizedString.bind(void 0, Nt);
let Gt;
class Vt {
    registeredRevealers = [];
    static instance() {
        return void 0 === Gt && (Gt = new Vt),
        Gt
    }
    static removeInstance() {
        Gt = void 0
    }
    register(t) {
        this.registeredRevealers.push(t)
    }
    async reveal(t, e) {
        const s = await Promise.all(this.getApplicableRegisteredRevealers(t).map(t => t.loadRevealer()));
        if (s.length < 1)
            throw new Error(`No revealers found for ${t}`);
        if (s.length > 1)
            throw new Error(`Conflicting reveals found for ${t}`);
        return await s[0].reveal(t, e)
    }
    getApplicableRegisteredRevealers(t) {
        return this.registeredRevealers.filter(e => {
            for (const s of e.contextTypes())
                if (t instanceof s)
                    return !0;
            return !1
        }
        )
    }
}
async function Bt(t, e=!1) {
    await Vt.instance().reveal(t, e)
}
const Mt = {
    DEVELOPER_RESOURCES_PANEL: Ot(_t.developerResourcesPanel),
    ELEMENTS_PANEL: Ot(_t.elementsPanel),
    STYLES_SIDEBAR: Ot(_t.stylesSidebar),
    CHANGES_DRAWER: Ot(_t.changesDrawer),
    ISSUES_VIEW: Ot(_t.issuesView),
    NETWORK_PANEL: Ot(_t.networkPanel),
    REQUEST_CONDITIONS_DRAWER: Ot(_t.requestConditionsDrawer),
    TIMELINE_PANEL: Ot(_t.timelinePanel),
    APPLICATION_PANEL: Ot(_t.applicationPanel),
    SOURCES_PANEL: Ot(_t.sourcesPanel),
    SECURITY_PANEL: Ot(_t.securityPanel),
    MEMORY_INSPECTOR_PANEL: Ot(_t.memoryInspectorPanel),
    ANIMATIONS_PANEL: Ot(_t.animationsPanel)
};
var Dt = Object.freeze({
    __proto__: null,
    RevealerDestination: Mt,
    RevealerRegistry: Vt,
    registerRevealer: function(t) {
        Vt.instance().register(t)
    },
    reveal: Bt,
    revealDestination: function(t) {
        const e = Vt.instance().getApplicableRegisteredRevealers(t);
        for (const {destination: t} of e)
            if (t)
                return t();
        return null
    }
});
let Xt;
class Ft extends It {
    #b = [];
    static instance(t) {
        return Xt && !t?.forceNew || (Xt = new Ft),
        Xt
    }
    static removeInstance() {
        Xt = void 0
    }
    addMessage(t, e="info", s=!1, r) {
        const i = new Ut(t,e,Date.now(),s,r);
        this.#b.push(i),
        this.dispatchEventToListeners("messageAdded", i)
    }
    log(t) {
        this.addMessage(t, "info")
    }
    warn(t, e) {
        this.addMessage(t, "warning", void 0, e)
    }
    error(t, e=!0) {
        this.addMessage(t, "error", e)
    }
    messages() {
        return this.#b
    }
    show() {
        this.showPromise()
    }
    showPromise() {
        return Bt(this)
    }
}
var Wt;
!function(t) {
    t.CSS = "css",
    t.ConsoleAPI = "console-api",
    t.ISSUE_PANEL = "issue-panel",
    t.SELF_XSS = "self-xss"
}(Wt || (Wt = {}));
class Ut {
    text;
    level;
    timestamp;
    show;
    source;
    constructor(t, e, s, r, i) {
        this.text = t,
        this.level = e,
        this.timestamp = "number" == typeof s ? s : Date.now(),
        this.show = r,
        i && (this.source = i)
    }
}
var jt = Object.freeze({
    __proto__: null,
    Console: Ft,
    get FrontendMessageSource() {
        return Wt
    },
    Message: Ut
});
var $t = Object.freeze({
    __proto__: null,
    debounce: function(t, e) {
        let s;
        return (...r) => {
            clearTimeout(s),
            s = setTimeout( () => t(...r), e)
        }
    }
});
var Ht = Object.freeze({
    __proto__: null,
    fireEvent: function(t, e={}, s=window) {
        const r = new CustomEvent(t,{
            bubbles: !0,
            cancelable: !0,
            detail: e
        });
        s.dispatchEvent(r)
    },
    removeEventListeners: function(t) {
        for (const e of t)
            e.eventTarget.removeEventListener(e.eventType, e.listener, e.thisObject);
        t.splice(0)
    }
});
function qt(t) {
    const e = new Uint8Array(t);
    return !(!e || e.length < 3) && (31 === e[0] && 139 === e[1] && 8 === e[2])
}
async function Kt(t) {
    const e = await Zt(t, new DecompressionStream("gzip"));
    return new TextDecoder("utf-8").decode(e)
}
async function Zt(t, e) {
    const s = new ReadableStream({
        start(e) {
            e.enqueue(t instanceof ArrayBuffer ? new Uint8Array(t) : t),
            e.close()
        }
    }).pipeThrough(e);
    return await new Response(s).arrayBuffer()
}
function Yt(t) {
    const e = new DecompressionStream("gzip");
    return t.pipeThrough(e)
}
var Jt = Object.freeze({
    __proto__: null,
    arrayBufferToString: async function(t) {
        return qt(t) ? await Kt(t) : new TextDecoder("utf-8").decode(t)
    },
    compress: async function(t) {
        const e = (new TextEncoder).encode(t);
        return await Zt(e, new CompressionStream("gzip"))
    },
    compressStream: function(t) {
        const e = new CompressionStream("gzip");
        return t.pipeThrough(e)
    },
    decompress: Kt,
    decompressStream: Yt,
    fileToString: async function(t) {
        let e = t.stream();
        t.type.endsWith("gzip") && (e = Yt(e));
        const s = await new Response(e).arrayBuffer();
        return new TextDecoder("utf-8").decode(s)
    },
    isGzip: qt
})
  , Qt = Object.freeze({
    __proto__: null
});
const te = Symbol("uninitialized")
  , ee = Symbol("error");
var se = Object.freeze({
    __proto__: null,
    lazy: function(t) {
        let e = te
          , s = new Error("Initial");
        return () => {
            if (e === ee)
                throw s;
            if (e !== te)
                return e;
            try {
                return e = t(),
                e
            } catch (t) {
                throw s = t instanceof Error ? t : new Error(t),
                e = ee,
                s
            }
        }
    }
});
class re extends Map {
    getOrInsert(t, e) {
        return this.has(t) || this.set(t, e),
        this.get(t)
    }
    getOrInsertComputed(t, e) {
        return this.has(t) || this.set(t, e(t)),
        this.get(t)
    }
}
var ie = Object.freeze({
    __proto__: null,
    MapWithDefault: re
});
var ne = Object.freeze({
    __proto__: null,
    Mutex: class {
        #w = !1;
        #f = [];
        acquire() {
            const t = {
                resolved: !1
            };
            return this.#w ? new Promise(e => {
                this.#f.push( () => e(this.#S.bind(this, t)))
            }
            ) : (this.#w = !0,
            Promise.resolve(this.#S.bind(this, t)))
        }
        #S(t) {
            if (t.resolved)
                throw new Error("Cannot release more than once.");
            t.resolved = !0;
            const e = this.#f.shift();
            e ? e() : this.#w = !1
        }
        async run(t) {
            const e = await this.acquire();
            try {
                return await t()
            } finally {
                e()
            }
        }
    }
});
function ae(t) {
    if (-1 === t.indexOf("..") && -1 === t.indexOf("."))
        return t;
    const e = ("/" === t[0] ? t.substring(1) : t).split("/")
      , s = [];
    for (const t of e)
        "." !== t && (".." === t ? s.pop() : s.push(t));
    let r = s.join("/");
    return "/" === t[0] && r && (r = "/" + r),
    "/" === r[r.length - 1] || "/" !== t[t.length - 1] && "." !== e[e.length - 1] && ".." !== e[e.length - 1] || (r += "/"),
    r
}
class oe {
    isValid = !1;
    url;
    scheme = "";
    user = "";
    host = "";
    port = "";
    path = "";
    queryParams = "";
    fragment = "";
    folderPathComponents = "";
    lastPathComponent = "";
    blobInnerScheme;
    #x;
    #v;
    constructor(t) {
        this.url = t;
        const e = this.url.startsWith("blob:")
          , s = (e ? t.substring(5) : t).match(oe.urlRegex());
        if (s)
            this.isValid = !0,
            e ? (this.blobInnerScheme = s[2].toLowerCase(),
            this.scheme = "blob") : this.scheme = s[2].toLowerCase(),
            this.user = s[3] ?? "",
            this.host = s[4] ?? "",
            this.port = s[5] ?? "",
            this.path = s[6] ?? "/",
            this.queryParams = s[7] ?? "",
            this.fragment = s[8] ?? "";
        else {
            if (this.url.startsWith("data:"))
                return void (this.scheme = "data");
            if (this.url.startsWith("blob:"))
                return void (this.scheme = "blob");
            if ("about:blank" === this.url)
                return void (this.scheme = "about");
            this.path = this.url
        }
        const r = this.path.lastIndexOf("/", this.path.length - 2);
        this.lastPathComponent = -1 !== r ? this.path.substring(r + 1) : this.path;
        const i = this.path.lastIndexOf("/");
        -1 !== i && (this.folderPathComponents = this.path.substring(0, i))
    }
    static fromString(t) {
        const e = new oe(t.toString());
        return e.isValid ? e : null
    }
    static preEncodeSpecialCharactersInPath(t) {
        for (const e of ["%", ";", "#", "?", " "])
            t = t.replaceAll(e, encodeURIComponent(e));
        return t
    }
    static rawPathToEncodedPathString(t) {
        const e = oe.preEncodeSpecialCharactersInPath(t);
        return t.startsWith("/") ? new URL(e,"file:///").pathname : new URL("/" + e,"file:///").pathname.substr(1)
    }
    static encodedFromParentPathAndName(t, e) {
        return oe.concatenate(t, "/", oe.preEncodeSpecialCharactersInPath(e))
    }
    static urlFromParentUrlAndName(t, e) {
        return oe.concatenate(t, "/", oe.preEncodeSpecialCharactersInPath(e))
    }
    static encodedPathToRawPathString(t) {
        return decodeURIComponent(t)
    }
    static rawPathToUrlString(t) {
        let e = oe.preEncodeSpecialCharactersInPath(t.replace(/\\/g, "/"));
        return e = e.replace(/\\/g, "/"),
        e.startsWith("file://") || (e = e.startsWith("/") ? "file://" + e : "file:///" + e),
        new URL(e).toString()
    }
    static relativePathToUrlString(t, e) {
        const s = oe.preEncodeSpecialCharactersInPath(t.replace(/\\/g, "/"));
        return new URL(s,e).toString()
    }
    static urlToRawPathString(t, e) {
        console.assert(t.startsWith("file://"), "This must be a file URL.");
        const s = decodeURIComponent(t);
        return e ? s.substr(8).replace(/\//g, "\\") : s.substr(7)
    }
    static sliceUrlToEncodedPathString(t, e) {
        return t.substring(e)
    }
    static substr(t, e, s) {
        return t.substr(e, s)
    }
    static substring(t, e, s) {
        return t.substring(e, s)
    }
    static prepend(t, e) {
        return t + e
    }
    static concatenate(t, ...e) {
        return t.concat(...e)
    }
    static trim(t) {
        return t.trim()
    }
    static slice(t, e, s) {
        return t.slice(e, s)
    }
    static join(t, e) {
        return t.join(e)
    }
    static split(t, e, s) {
        return t.split(e, s)
    }
    static toLowerCase(t) {
        return t.toLowerCase()
    }
    static isValidUrlString(t) {
        return new oe(t).isValid
    }
    static urlWithoutHash(t) {
        const e = t.indexOf("#");
        return -1 !== e ? t.substr(0, e) : t
    }
    static urlRegex() {
        if (oe.urlRegexInstance)
            return oe.urlRegexInstance;
        return oe.urlRegexInstance = new RegExp("^(" + /([A-Za-z][A-Za-z0-9+.-]*):\/\//.source + /(?:([A-Za-z0-9\-._~%!$&'()*+,;=:]*)@)?/.source + /((?:\[::\d?\])|(?:[^\s\/:]*))/.source + /(?::([\d]+))?/.source + ")" + /(\/[^#?]*)?/.source + /(?:\?([^#]*))?/.source + /(?:#(.*))?/.source + "$"),
        oe.urlRegexInstance
    }
    static extractPath(t) {
        const e = this.fromString(t);
        return e ? e.path : ""
    }
    static extractOrigin(t) {
        const s = this.fromString(t);
        return s ? s.securityOrigin() : e.DevToolsPath.EmptyUrlString
    }
    static extractExtension(t) {
        const e = (t = oe.urlWithoutHash(t)).indexOf("?");
        -1 !== e && (t = t.substr(0, e));
        const s = t.lastIndexOf("/");
        -1 !== s && (t = t.substr(s + 1));
        const r = t.lastIndexOf(".");
        if (-1 !== r) {
            const e = (t = t.substr(r + 1)).indexOf("%");
            return -1 !== e ? t.substr(0, e) : t
        }
        return ""
    }
    static extractName(t) {
        let e = t.lastIndexOf("/");
        const s = -1 !== e ? t.substr(e + 1) : t;
        return e = s.indexOf("?"),
        e < 0 ? s : s.substr(0, e)
    }
    static completeURL(t, e) {
        if (e.startsWith("data:") || e.startsWith("blob:") || e.startsWith("javascript:") || e.startsWith("mailto:"))
            return e;
        const s = e.trim()
          , r = this.fromString(s);
        if (r?.scheme) {
            return r.securityOrigin() + ae(r.path) + (r.queryParams && `?${r.queryParams}`) + (r.fragment && `#${r.fragment}`)
        }
        const i = this.fromString(t);
        if (!i)
            return null;
        if (i.isDataURL())
            return e;
        if (e.length > 1 && "/" === e.charAt(0) && "/" === e.charAt(1))
            return i.scheme + ":" + e;
        const n = i.securityOrigin()
          , a = i.path
          , o = i.queryParams ? "?" + i.queryParams : "";
        if (!e.length)
            return n + a + o;
        if ("#" === e.charAt(0))
            return n + a + o + e;
        if ("?" === e.charAt(0))
            return n + a + e;
        const l = e.match(/^[^#?]*/);
        if (!l || !e.length)
            throw new Error("Invalid href");
        let h = l[0];
        const c = e.substring(h.length);
        return "/" !== h.charAt(0) && (h = i.folderPathComponents + "/" + h),
        n + ae(h) + c
    }
    static splitLineAndColumn(t) {
        const e = t.match(oe.urlRegex());
        let s = ""
          , r = t;
        e && (s = e[1],
        r = t.substring(e[1].length));
        const i = /(?::(\d+))?(?::(\d+))?$/.exec(r);
        let n, a;
        if (console.assert(Boolean(i)),
        !i)
            return {
                url: t,
                lineNumber: 0,
                columnNumber: 0
            };
        "string" == typeof i[1] && (n = parseInt(i[1], 10),
        n = isNaN(n) ? void 0 : n - 1),
        "string" == typeof i[2] && (a = parseInt(i[2], 10),
        a = isNaN(a) ? void 0 : a - 1);
        let o = s + r.substring(0, r.length - i[0].length);
        if (void 0 === i[1] && void 0 === i[2]) {
            const t = /wasm-function\[\d+\]:0x([a-z0-9]+)$/g.exec(r);
            t && "string" == typeof t[1] && (o = oe.removeWasmFunctionInfoFromURL(o),
            a = parseInt(t[1], 16),
            a = isNaN(a) ? void 0 : a)
        }
        return {
            url: o,
            lineNumber: n,
            columnNumber: a
        }
    }
    static removeWasmFunctionInfoFromURL(t) {
        const e = t.search(/:wasm-function\[\d+\]/);
        return -1 === e ? t : oe.substring(t, 0, e)
    }
    static beginsWithWindowsDriveLetter(t) {
        return /^[A-Za-z]:/.test(t)
    }
    static beginsWithScheme(t) {
        return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(t)
    }
    static isRelativeURL(t) {
        return !this.beginsWithScheme(t) || this.beginsWithWindowsDriveLetter(t)
    }
    get displayName() {
        return this.#x ? this.#x : this.isDataURL() ? this.dataURLDisplayName() : this.isBlobURL() || this.isAboutBlank() ? this.url : (this.#x = this.lastPathComponent,
        this.#x || (this.#x = (this.host || "") + "/"),
        "/" === this.#x && (this.#x = this.url),
        this.#x)
    }
    dataURLDisplayName() {
        return this.#v ? this.#v : this.isDataURL() ? (this.#v = e.StringUtilities.trimEndWithMaxLength(this.url, 20),
        this.#v) : ""
    }
    isAboutBlank() {
        return "about:blank" === this.url
    }
    isDataURL() {
        return "data" === this.scheme
    }
    extractDataUrlMimeType() {
        const t = this.url.match(/^data:((?<type>\w+)\/(?<subtype>\w+))?(;base64)?,/);
        return {
            type: t?.groups?.type,
            subtype: t?.groups?.subtype
        }
    }
    isBlobURL() {
        return this.url.startsWith("blob:")
    }
    lastPathComponentWithFragment() {
        return this.lastPathComponent + (this.fragment ? "#" + this.fragment : "")
    }
    domain() {
        return this.isDataURL() ? "data:" : this.host + (this.port ? ":" + this.port : "")
    }
    securityOrigin() {
        if (this.isDataURL())
            return "data:";
        return (this.isBlobURL() ? this.blobInnerScheme : this.scheme) + "://" + this.domain()
    }
    urlWithoutScheme() {
        return this.scheme && this.url.startsWith(this.scheme + "://") ? this.url.substring(this.scheme.length + 3) : this.url
    }
    static urlRegexInstance = null
}
var le = Object.freeze({
    __proto__: null,
    ParsedURL: oe,
    normalizePath: ae,
    schemeIs: function(t, e) {
        try {
            return new URL(t).protocol === e
        } catch {
            return !1
        }
    }
});
class he {
    #T;
    #R;
    #z;
    #A;
    constructor(t, e) {
        this.#T = t,
        this.#R = e || 1,
        this.#z = 0,
        this.#A = 0
    }
    get canceled() {
        return this.#T.parent.canceled
    }
    set title(t) {
        this.#T.parent.title = t
    }
    set done(t) {
        t && (this.worked = this.#A,
        this.#T.childDone())
    }
    set totalWork(t) {
        this.#A = t,
        this.#T.update()
    }
    set worked(t) {
        this.#z = t,
        this.#T.update()
    }
    get weight() {
        return this.#R
    }
    get worked() {
        return this.#z
    }
    get totalWork() {
        return this.#A
    }
}
var ce = Object.freeze({
    __proto__: null,
    CompositeProgress: class {
        parent;
        #P;
        #E;
        constructor(t) {
            this.parent = t,
            this.#P = [],
            this.#E = 0,
            this.parent.totalWork = 1,
            this.parent.worked = 0
        }
        childDone() {
            ++this.#E === this.#P.length && (this.parent.done = !0)
        }
        createSubProgress(t) {
            const e = new he(this,t);
            return this.#P.push(e),
            e
        }
        update() {
            let t = 0
              , e = 0;
            for (let s = 0; s < this.#P.length; ++s) {
                const r = this.#P[s];
                r.totalWork && (e += r.weight * r.worked / r.totalWork),
                t += r.weight
            }
            this.parent.worked = e / t
        }
    }
    ,
    Progress: class {
        totalWork = 0;
        worked = 0;
        title = void 0;
        canceled = !1;
        done = !1
    }
    ,
    ProgressProxy: class {
        #k;
        #L;
        #I;
        constructor(t, e, s) {
            this.#k = t,
            this.#L = e,
            this.#I = s
        }
        get canceled() {
            return !!this.#k && this.#k.canceled
        }
        set title(t) {
            this.#k && (this.#k.title = t),
            this.#I && this.#I()
        }
        get title() {
            return this.#k?.title ?? ""
        }
        set done(t) {
            this.#k && (this.#k.done = t),
            t && this.#L && this.#L()
        }
        get done() {
            return !!this.#k && this.#k.done
        }
        set totalWork(t) {
            this.#k && (this.#k.totalWork = t),
            this.#I && this.#I()
        }
        get totalWork() {
            return this.#k ? this.#k.totalWork : 0
        }
        set worked(t) {
            this.#k && (this.#k.worked = t),
            this.#I && this.#I?.()
        }
        get worked() {
            return this.#k ? this.#k.worked : 0
        }
    }
    ,
    SubProgress: he
});
var ge = Object.freeze({
    __proto__: null,
    ResolverBase: class {
        #C = new Map;
        async waitFor(t) {
            const e = this.getForId(t);
            return e || await this.getOrCreatePromise(t)
        }
        tryGet(t, e) {
            const s = this.getForId(t);
            if (!s) {
                const s = () => {}
                ;
                return this.getOrCreatePromise(t).catch(s).then(t => {
                    t && e(t)
                }
                ),
                null
            }
            return s
        }
        clear() {
            this.stopListening();
            for (const [t,{reject: e}] of this.#C.entries())
                e(new Error(`Object with ${t} never resolved.`));
            this.#C.clear()
        }
        getOrCreatePromise(t) {
            const e = this.#C.get(t);
            if (e)
                return e.promise;
            const {resolve: s, reject: r, promise: i} = Promise.withResolvers();
            return this.#C.set(t, {
                promise: i,
                resolve: s,
                reject: r
            }),
            this.startListening(),
            i
        }
        onResolve(t, e) {
            const s = this.#C.get(t);
            this.#C.delete(t),
            0 === this.#C.size && this.stopListening(),
            s?.resolve(e)
        }
    }
});
const ue = {
    fetchAndXHR: "`Fetch` and `XHR`",
    javascript: "JavaScript",
    js: "JS",
    css: "CSS",
    img: "Img",
    media: "Media",
    font: "Font",
    doc: "Doc",
    socketShort: "Socket",
    webassembly: "WebAssembly",
    wasm: "Wasm",
    manifest: "Manifest",
    other: "Other",
    document: "Document",
    stylesheet: "Stylesheet",
    image: "Image",
    script: "Script",
    texttrack: "TextTrack",
    fetch: "Fetch",
    eventsource: "EventSource",
    websocket: "WebSocket",
    webtransport: "WebTransport",
    directsocket: "DirectSocket",
    signedexchange: "SignedExchange",
    ping: "Ping",
    cspviolationreport: "CSPViolationReport",
    preflight: "Preflight",
    fedcm: "FedCM"
}
  , de = s.i18n.registerUIStrings("core/common/ResourceType.ts", ue)
  , pe = s.i18n.getLazilyComputedLocalizedString.bind(void 0, de);
class me {
    #_;
    #N;
    #O;
    #G;
    constructor(t, e, s, r) {
        this.#_ = t,
        this.#N = e,
        this.#O = s,
        this.#G = r
    }
    static fromMimeType(t) {
        return t ? t.startsWith("text/html") ? we.Document : t.startsWith("text/css") ? we.Stylesheet : t.startsWith("image/") ? we.Image : t.startsWith("text/") ? we.Script : t.includes("font") ? we.Font : t.includes("script") ? we.Script : t.includes("octet") ? we.Other : t.includes("application") ? we.Script : we.Other : we.Other
    }
    static fromMimeTypeOverride(t) {
        return "application/manifest+json" === t ? we.Manifest : "application/wasm" === t ? we.Wasm : null
    }
    static fromURL(t) {
        return Se.get(oe.extractExtension(t)) || null
    }
    static fromName(t) {
        for (const e of Object.values(we))
            if (e.name() === t)
                return e;
        return null
    }
    static mimeFromURL(t) {
        if (t.startsWith("snippet://") || t.startsWith("debugger://"))
            return "text/javascript";
        const e = oe.extractName(t);
        if (fe.has(e))
            return fe.get(e);
        let s = oe.extractExtension(t).toLowerCase();
        return "html" === s && e.endsWith(".component.html") && (s = "component.html"),
        xe.get(s)
    }
    static mimeFromExtension(t) {
        return xe.get(t)
    }
    static simplifyContentType(t) {
        return new RegExp("^application(.*json$|/json+.*)").test(t) ? "application/json" : t
    }
    static mediaTypeForMetrics(t, e, s, r, i) {
        return "text/javascript" !== t ? t : e ? "text/javascript+sourcemapped" : s ? "text/javascript+minified" : r ? "text/javascript+snippet" : i ? "text/javascript+eval" : "text/javascript+plain"
    }
    name() {
        return this.#_
    }
    title() {
        return this.#N()
    }
    category() {
        return this.#O
    }
    isTextType() {
        return this.#G
    }
    isScript() {
        return "script" === this.#_ || "sm-script" === this.#_
    }
    hasScripts() {
        return this.isScript() || this.isDocument()
    }
    isStyleSheet() {
        return "stylesheet" === this.#_ || "sm-stylesheet" === this.#_
    }
    hasStyleSheets() {
        return this.isStyleSheet() || this.isDocument()
    }
    isDocument() {
        return "document" === this.#_
    }
    isDocumentOrScriptOrStyleSheet() {
        return this.isDocument() || this.isScript() || this.isStyleSheet()
    }
    isFont() {
        return "font" === this.#_
    }
    isImage() {
        return "image" === this.#_
    }
    isFromSourceMap() {
        return this.#_.startsWith("sm-")
    }
    toString() {
        return this.#_
    }
    canonicalMimeType() {
        return this.isDocument() ? "text/html" : this.isScript() ? "text/javascript" : this.isStyleSheet() ? "text/css" : ""
    }
}
class ye {
    name;
    title;
    shortTitle;
    constructor(t, e, s) {
        this.name = t,
        this.title = e,
        this.shortTitle = s
    }
}
const be = {
    XHR: new ye("Fetch and XHR",pe(ue.fetchAndXHR),s.i18n.lockedLazyString("Fetch/XHR")),
    Document: new ye(ue.document,pe(ue.document),pe(ue.doc)),
    Stylesheet: new ye(ue.css,pe(ue.css),pe(ue.css)),
    Script: new ye(ue.javascript,pe(ue.javascript),pe(ue.js)),
    Font: new ye(ue.font,pe(ue.font),pe(ue.font)),
    Image: new ye(ue.image,pe(ue.image),pe(ue.img)),
    Media: new ye(ue.media,pe(ue.media),pe(ue.media)),
    Manifest: new ye(ue.manifest,pe(ue.manifest),pe(ue.manifest)),
    Socket: new ye("Socket",s.i18n.lockedLazyString("WebSocket | WebTransport | DirectSocket"),pe(ue.socketShort)),
    Wasm: new ye(ue.webassembly,pe(ue.webassembly),pe(ue.wasm)),
    Other: new ye(ue.other,pe(ue.other),pe(ue.other))
}
  , we = {
    Document: new me("document",pe(ue.document),be.Document,!0),
    Stylesheet: new me("stylesheet",pe(ue.stylesheet),be.Stylesheet,!0),
    Image: new me("image",pe(ue.image),be.Image,!1),
    Media: new me("media",pe(ue.media),be.Media,!1),
    Font: new me("font",pe(ue.font),be.Font,!1),
    Script: new me("script",pe(ue.script),be.Script,!0),
    TextTrack: new me("texttrack",pe(ue.texttrack),be.Other,!0),
    XHR: new me("xhr",s.i18n.lockedLazyString("XHR"),be.XHR,!0),
    Fetch: new me("fetch",pe(ue.fetch),be.XHR,!0),
    Prefetch: new me("prefetch",s.i18n.lockedLazyString("Prefetch"),be.Document,!0),
    EventSource: new me("eventsource",pe(ue.eventsource),be.XHR,!0),
    WebSocket: new me("websocket",pe(ue.websocket),be.Socket,!1),
    WebTransport: new me("webtransport",pe(ue.webtransport),be.Socket,!1),
    DirectSocket: new me("directsocket",pe(ue.directsocket),be.Socket,!1),
    Wasm: new me("wasm",pe(ue.wasm),be.Wasm,!1),
    Manifest: new me("manifest",pe(ue.manifest),be.Manifest,!0),
    SignedExchange: new me("signed-exchange",pe(ue.signedexchange),be.Other,!1),
    Ping: new me("ping",pe(ue.ping),be.Other,!1),
    CSPViolationReport: new me("csp-violation-report",pe(ue.cspviolationreport),be.Other,!1),
    Other: new me("other",pe(ue.other),be.Other,!1),
    Preflight: new me("preflight",pe(ue.preflight),be.Other,!0),
    SourceMapScript: new me("sm-script",pe(ue.script),be.Script,!0),
    SourceMapStyleSheet: new me("sm-stylesheet",pe(ue.stylesheet),be.Stylesheet,!0),
    FedCM: new me("fedcm",pe(ue.fedcm),be.Other,!1)
}
  , fe = new Map([["Cakefile", "text/x-coffeescript"]])
  , Se = new Map([["js", we.Script], ["mjs", we.Script], ["css", we.Stylesheet], ["xsl", we.Stylesheet], ["avif", we.Image], ["bmp", we.Image], ["gif", we.Image], ["ico", we.Image], ["jpeg", we.Image], ["jpg", we.Image], ["jxl", we.Image], ["png", we.Image], ["svg", we.Image], ["tif", we.Image], ["tiff", we.Image], ["vue", we.Document], ["webmanifest", we.Manifest], ["webp", we.Media], ["otf", we.Font], ["ttc", we.Font], ["ttf", we.Font], ["woff", we.Font], ["woff2", we.Font], ["wasm", we.Wasm]])
  , xe = new Map([["js", "text/javascript"], ["mjs", "text/javascript"], ["css", "text/css"], ["html", "text/html"], ["htm", "text/html"], ["xml", "application/xml"], ["xsl", "application/xml"], ["wasm", "application/wasm"], ["webmanifest", "application/manifest+json"], ["asp", "application/x-aspx"], ["aspx", "application/x-aspx"], ["jsp", "application/x-jsp"], ["c", "text/x-c++src"], ["cc", "text/x-c++src"], ["cpp", "text/x-c++src"], ["h", "text/x-c++src"], ["m", "text/x-c++src"], ["mm", "text/x-c++src"], ["coffee", "text/x-coffeescript"], ["dart", "application/vnd.dart"], ["ts", "text/typescript"], ["tsx", "text/typescript-jsx"], ["json", "application/json"], ["gyp", "application/json"], ["gypi", "application/json"], ["map", "application/json"], ["cs", "text/x-csharp"], ["go", "text/x-go"], ["java", "text/x-java"], ["kt", "text/x-kotlin"], ["scala", "text/x-scala"], ["less", "text/x-less"], ["php", "application/x-httpd-php"], ["phtml", "application/x-httpd-php"], ["py", "text/x-python"], ["sh", "text/x-sh"], ["gss", "text/x-gss"], ["sass", "text/x-sass"], ["scss", "text/x-scss"], ["vtt", "text/vtt"], ["ls", "text/x-livescript"], ["md", "text/markdown"], ["cljs", "text/x-clojure"], ["cljc", "text/x-clojure"], ["cljx", "text/x-clojure"], ["styl", "text/x-styl"], ["jsx", "text/jsx"], ["avif", "image/avif"], ["bmp", "image/bmp"], ["gif", "image/gif"], ["ico", "image/ico"], ["jpeg", "image/jpeg"], ["jpg", "image/jpeg"], ["jxl", "image/jxl"], ["png", "image/png"], ["svg", "image/svg+xml"], ["tif", "image/tif"], ["tiff", "image/tiff"], ["webp", "image/webp"], ["otf", "font/otf"], ["ttc", "font/collection"], ["ttf", "font/ttf"], ["woff", "font/woff"], ["woff2", "font/woff2"], ["component.html", "text/x.angular"], ["svelte", "text/x.svelte"], ["vue", "text/x.vue"]]);
var ve = Object.freeze({
    __proto__: null,
    ResourceCategory: ye,
    ResourceType: me,
    mimeTypeByExtension: xe,
    resourceCategories: be,
    resourceTypeByExtension: Se,
    resourceTypes: we
});
var Te = Object.freeze({
    __proto__: null,
    ReturnToPanelFlavor: class {
        viewId;
        constructor(t) {
            this.viewId = t
        }
    }
});
const Re = new Map;
const ze = [];
var Ae = Object.freeze({
    __proto__: null,
    earlyInitializationRunnables: function() {
        return ze
    },
    lateInitializationRunnables: function() {
        return [...Re.values()]
    },
    maybeRemoveLateInitializationRunnable: function(t) {
        return Re.delete(t)
    },
    registerEarlyInitializationRunnable: function(t) {
        ze.push(t)
    },
    registerLateInitializationRunnable: function(t) {
        const {id: e, loadRunnable: s} = t;
        if (Re.has(e))
            throw new Error(`Duplicate late Initializable runnable id '${e}'`);
        Re.set(e, s)
    }
});
class Pe {
    begin;
    end;
    data;
    constructor(t, e, s) {
        if (t > e)
            throw new Error("Invalid segment");
        this.begin = t,
        this.end = e,
        this.data = s
    }
    intersects(t) {
        return this.begin < t.end && t.begin < this.end
    }
}
var Ee = Object.freeze({
    __proto__: null,
    Segment: Pe,
    SegmentedRange: class {
        #V = [];
        #B;
        constructor(t) {
            this.#B = t
        }
        append(t) {
            let s = e.ArrayUtilities.lowerBound(this.#V, t, (t, e) => t.begin - e.begin)
              , r = s
              , i = null;
            if (s > 0) {
                const e = this.#V[s - 1];
                i = this.tryMerge(e, t),
                i ? (--s,
                t = i) : this.#V[s - 1].end >= t.begin && (t.end < e.end && this.#V.splice(s, 0, new Pe(t.end,e.end,e.data)),
                e.end = t.begin)
            }
            for (; r < this.#V.length && this.#V[r].end <= t.end; )
                ++r;
            r < this.#V.length && (i = this.tryMerge(t, this.#V[r]),
            i ? (r++,
            t = i) : t.intersects(this.#V[r]) && (this.#V[r].begin = t.end)),
            this.#V.splice(s, r - s, t)
        }
        segments() {
            return this.#V
        }
        tryMerge(t, e) {
            const s = this.#B && this.#B(t, e);
            return s ? (s.begin = t.begin,
            s.end = Math.max(t.end, e.end),
            s) : null
        }
    }
});
const ke = {
    elements: "Elements",
    ai: "AI",
    appearance: "Appearance",
    sources: "Sources",
    network: "Network",
    performance: "Performance",
    console: "Console",
    persistence: "Persistence",
    debugger: "Debugger",
    global: "Global",
    rendering: "Rendering",
    grid: "Grid",
    mobile: "Mobile",
    memory: "Memory",
    extension: "Extension",
    adorner: "Adorner",
    account: "Account",
    privacy: "Privacy"
}
  , Le = s.i18n.registerUIStrings("core/common/SettingRegistration.ts", ke)
  , Ie = s.i18n.getLocalizedString.bind(void 0, Le);
let Ce = [];
const _e = new Set;
function Ne(t) {
    const e = t.settingName;
    if (_e.has(e))
        throw new Error(`Duplicate setting name '${e}'`);
    _e.add(e),
    Ce.push(t)
}
function Oe(t, e=!1) {
    if (0 === Ce.length || e) {
        Ce = t,
        _e.clear();
        for (const e of t) {
            const t = e.settingName;
            if (_e.has(t))
                throw new Error(`Duplicate setting name '${t}'`);
            _e.add(t)
        }
    }
}
function Ge() {
    Ce = [],
    _e.clear()
}
function Ve(t) {
    const e = Ce.findIndex(e => e.settingName === t);
    return !(e < 0 || !_e.delete(t)) && (Ce.splice(e, 1),
    !0)
}
function Be(t) {
    switch (t) {
    case "ELEMENTS":
        return Ie(ke.elements);
    case "AI":
        return Ie(ke.ai);
    case "APPEARANCE":
        return Ie(ke.appearance);
    case "SOURCES":
        return Ie(ke.sources);
    case "NETWORK":
        return Ie(ke.network);
    case "PERFORMANCE":
        return Ie(ke.performance);
    case "CONSOLE":
    case "EMULATION":
        return Ie(ke.console);
    case "PERSISTENCE":
        return Ie(ke.persistence);
    case "DEBUGGER":
        return Ie(ke.debugger);
    case "GLOBAL":
        return Ie(ke.global);
    case "RENDERING":
        return Ie(ke.rendering);
    case "GRID":
        return Ie(ke.grid);
    case "MOBILE":
        return Ie(ke.mobile);
    case "MEMORY":
        return Ie(ke.memory);
    case "EXTENSIONS":
        return Ie(ke.extension);
    case "ADORNER":
        return Ie(ke.adorner);
    case "":
        return s.i18n.lockedString("");
    case "ACCOUNT":
        return Ie(ke.account);
    case "PRIVACY":
        return Ie(ke.privacy)
    }
}
var Me = Object.freeze({
    __proto__: null,
    getLocalizedSettingsCategory: Be,
    getRegisteredSettings: function() {
        return Ce.filter(e => t.Runtime.Runtime.isDescriptorEnabled(e))
    },
    maybeRemoveSettingExtension: Ve,
    registerSettingExtension: Ne,
    registerSettingsForTest: Oe,
    resetSettings: Ge
});
let De;
class Xe {
    syncedStorage;
    globalStorage;
    localStorage;
    #M;
    #D = new We({});
    settingNameSet = new Set;
    orderValuesBySettingCategory = new Map;
    #X = new It;
    #F = new Map;
    moduleSettings = new Map;
    #W;
    constructor({syncedStorage: e, globalStorage: s, localStorage: r, settingRegistrations: i, logSettingAccess: n, runSettingsMigration: a}) {
        this.syncedStorage = e,
        this.globalStorage = s,
        this.localStorage = r,
        this.#M = i,
        this.#W = n;
        for (const e of this.#M) {
            const {settingName: s, defaultValue: r, storageType: i} = e
              , n = "regex" === e.settingType
              , a = "function" == typeof r ? r(t.Runtime.hostConfig) : r
              , o = n && "string" == typeof a ? this.createRegExpSetting(s, a, void 0, i) : this.createSetting(s, a, i);
            o.setTitleFunction(e.title),
            e.userActionCondition && o.setRequiresUserAction(Boolean(t.Runtime.Runtime.queryParam(e.userActionCondition))),
            o.setRegistration(e),
            this.registerModuleSetting(o)
        }
        a && new He(this).updateVersion()
    }
    getRegisteredSettings() {
        return this.#M
    }
    static hasInstance() {
        return void 0 !== De
    }
    static instance(t={
        forceNew: null,
        syncedStorage: null,
        globalStorage: null,
        localStorage: null,
        settingRegistrations: null
    }) {
        const {forceNew: e, syncedStorage: s, globalStorage: r, localStorage: i, settingRegistrations: n, logSettingAccess: a, runSettingsMigration: o} = t;
        if (!De || e) {
            if (!(s && r && i && n))
                throw new Error(`Unable to create settings: global and local storage must be provided: ${(new Error).stack}`);
            De = new Xe({
                syncedStorage: s,
                globalStorage: r,
                localStorage: i,
                settingRegistrations: n,
                logSettingAccess: a,
                runSettingsMigration: o
            })
        }
        return De
    }
    static removeInstance() {
        De = void 0
    }
    registerModuleSetting(t) {
        const e = t.name
          , s = t.category()
          , r = t.order();
        if (this.settingNameSet.has(e))
            throw new Error(`Duplicate Setting name '${e}'`);
        if (s && r) {
            const t = this.orderValuesBySettingCategory.get(s) || new Set;
            if (t.has(r))
                throw new Error(`Duplicate order value '${r}' for settings category '${s}'`);
            t.add(r),
            this.orderValuesBySettingCategory.set(s, t)
        }
        this.settingNameSet.add(e),
        this.moduleSettings.set(t.name, t)
    }
    static normalizeSettingName(t) {
        return [He.GLOBAL_VERSION_SETTING_NAME, He.SYNCED_VERSION_SETTING_NAME, He.LOCAL_VERSION_SETTING_NAME, "currentDockState", "isUnderTest"].includes(t) ? t : e.StringUtilities.toKebabCase(t)
    }
    moduleSetting(t) {
        const e = this.moduleSettings.get(t);
        if (!e)
            throw new Error("No setting registered: " + t);
        return e
    }
    settingForTest(t) {
        const e = this.#F.get(t);
        if (!e)
            throw new Error("No setting registered: " + t);
        return e
    }
    createSetting(t, e, s) {
        const r = this.storageFromType(s);
        let i = this.#F.get(t);
        return i || (i = new je(t,e,this.#X,r,this.#W),
        this.#F.set(t, i)),
        i
    }
    createLocalSetting(t, e) {
        return this.createSetting(t, e, "Local")
    }
    createRegExpSetting(t, e, s, r) {
        return this.#F.get(t) || this.#F.set(t, new $e(t,e,this.#X,this.storageFromType(r),s,this.#W)),
        this.#F.get(t)
    }
    clearAll() {
        this.globalStorage.removeAll(),
        this.syncedStorage.removeAll(),
        this.localStorage.removeAll(),
        new He(this).resetToCurrent()
    }
    storageFromType(t) {
        switch (t) {
        case "Local":
            return this.localStorage;
        case "Session":
            return this.#D;
        case "Global":
            return this.globalStorage;
        case "Synced":
            return this.syncedStorage
        }
        return this.globalStorage
    }
    getRegistry() {
        return this.#F
    }
}
const Fe = {
    register: () => {}
    ,
    set: () => {}
    ,
    get: () => Promise.resolve(""),
    remove: () => {}
    ,
    clear: () => {}
};
class We {
    object;
    backingStore;
    storagePrefix;
    constructor(t, e=Fe, s="") {
        this.object = t,
        this.backingStore = e,
        this.storagePrefix = s
    }
    register(t) {
        t = this.storagePrefix + t,
        this.backingStore.register(t)
    }
    set(t, e) {
        t = this.storagePrefix + t,
        this.object[t] = e,
        this.backingStore.set(t, e)
    }
    has(t) {
        return (t = this.storagePrefix + t)in this.object
    }
    get(t) {
        return t = this.storagePrefix + t,
        this.object[t]
    }
    async forceGet(t) {
        const e = this.storagePrefix + t
          , s = await this.backingStore.get(e);
        return s && s !== this.object[e] ? this.set(t, s) : s || this.remove(t),
        s
    }
    remove(t) {
        t = this.storagePrefix + t,
        delete this.object[t],
        this.backingStore.remove(t)
    }
    removeAll() {
        this.object = {},
        this.backingStore.clear()
    }
    keys() {
        return Object.keys(this.object)
    }
    dumpSizes() {
        Ft.instance().log("Ten largest settings: ");
        const t = {
            __proto__: null
        };
        for (const e in this.object)
            t[e] = this.object[e].length;
        const e = Object.keys(t);
        e.sort(function(e, s) {
            return t[s] - t[e]
        });
        for (let s = 0; s < 10 && s < e.length; ++s)
            Ft.instance().log("Setting: '" + e[s] + "', size: " + t[e[s]])
    }
}
class Ue {
    disabled;
    warning;
    experiment;
    constructor({deprecationNotice: e}) {
        if (!e)
            throw new Error("Cannot create deprecation info for a non-deprecated setting");
        this.disabled = e.disabled,
        this.warning = e.warning(),
        this.experiment = e.experiment ? t.Runtime.experiments.allConfigurableExperiments().find(t => t.name === e.experiment) : void 0
    }
}
class je {
    name;
    defaultValue;
    eventSupport;
    storage;
    #U;
    #N;
    #j = null;
    #$;
    #H;
    #q = JSON;
    #K;
    #Z;
    #Y = null;
    #J = !1;
    #W;
    constructor(t, e, s, r, i) {
        this.name = t,
        this.defaultValue = e,
        this.eventSupport = s,
        this.storage = r,
        r.register(this.name),
        this.#W = i
    }
    setSerializer(t) {
        this.#q = t
    }
    addChangeListener(t, e) {
        return this.eventSupport.addEventListener(this.name, t, e)
    }
    removeChangeListener(t, e) {
        this.eventSupport.removeEventListener(this.name, t, e)
    }
    title() {
        return this.#N ? this.#N : this.#U ? this.#U() : ""
    }
    setTitleFunction(t) {
        t && (this.#U = t)
    }
    setTitle(t) {
        this.#N = t
    }
    setRequiresUserAction(t) {
        this.#$ = t
    }
    disabled() {
        if (this.#j?.disabledCondition) {
            const {disabled: e} = this.#j.disabledCondition(t.Runtime.hostConfig);
            if (e)
                return !0
        }
        return this.#Z || !1
    }
    disabledReasons() {
        if (this.#j?.disabledCondition) {
            const e = this.#j.disabledCondition(t.Runtime.hostConfig);
            if (e.disabled)
                return e.reasons
        }
        return []
    }
    setDisabled(t) {
        this.#Z = t,
        this.eventSupport.dispatchEventToListeners(this.name)
    }
    #Q(t) {
        try {
            const e = "string" == typeof t || "number" == typeof t || "boolean" == typeof t ? t : this.#q?.stringify(t);
            void 0 !== e && this.#W && this.#W(this.name, e)
        } catch {}
    }
    #tt(t) {
        this.#J || (this.#Q(t),
        this.#J = !0)
    }
    get() {
        if (this.#$ && !this.#K)
            return this.#tt(this.defaultValue),
            this.defaultValue;
        if (void 0 !== this.#H)
            return this.#tt(this.#H),
            this.#H;
        if (this.#H = this.defaultValue,
        this.storage.has(this.name))
            try {
                this.#H = this.#q.parse(this.storage.get(this.name))
            } catch {
                this.storage.remove(this.name)
            }
        return this.#tt(this.#H),
        this.#H
    }
    getIfNotDisabled() {
        if (!this.disabled())
            return this.get()
    }
    async forceGet() {
        const t = this.name
          , e = this.storage.get(t)
          , s = await this.storage.forceGet(t);
        if (this.#H = this.defaultValue,
        s)
            try {
                this.#H = this.#q.parse(s)
            } catch {
                this.storage.remove(this.name)
            }
        return e !== s && this.eventSupport.dispatchEventToListeners(this.name, this.#H),
        this.#tt(this.#H),
        this.#H
    }
    set(t) {
        this.#Q(t),
        this.#K = !0,
        this.#H = t;
        try {
            const e = this.#q.stringify(t);
            try {
                this.storage.set(this.name, e)
            } catch (t) {
                this.printSettingsSavingError(t.message, e)
            }
        } catch (t) {
            Ft.instance().error("Cannot stringify setting with name: " + this.name + ", error: " + t.message)
        }
        this.eventSupport.dispatchEventToListeners(this.name, t)
    }
    setRegistration(e) {
        this.#j = e;
        const {deprecationNotice: s} = e;
        if (s?.disabled) {
            const e = s.experiment ? t.Runtime.experiments.allConfigurableExperiments().find(t => t.name === s.experiment) : void 0;
            e && !e.isEnabled() || (this.set(this.defaultValue),
            this.setDisabled(!0))
        }
    }
    type() {
        return this.#j ? this.#j.settingType : null
    }
    options() {
        return this.#j && this.#j.options ? this.#j.options.map(t => {
            const {value: e, title: s, text: r, raw: i} = t;
            return {
                value: e,
                title: s(),
                text: "function" == typeof r ? r() : r,
                raw: i
            }
        }
        ) : []
    }
    reloadRequired() {
        return this.#j && this.#j.reloadRequired || null
    }
    category() {
        return this.#j && this.#j.category || null
    }
    tags() {
        return this.#j && this.#j.tags ? this.#j.tags.map(t => t()).join("\0") : null
    }
    order() {
        return this.#j && this.#j.order || null
    }
    learnMore() {
        return this.#j?.learnMore ?? null
    }
    get deprecation() {
        return this.#j && this.#j.deprecationNotice ? (this.#Y || (this.#Y = new Ue(this.#j)),
        this.#Y) : null
    }
    printSettingsSavingError(t, e) {
        const s = "Error saving setting with name: " + this.name + ", value length: " + e.length + ". Error: " + t;
        console.error(s),
        Ft.instance().error(s),
        this.storage.dumpSizes()
    }
}
class $e extends je {
    #et;
    #st;
    constructor(t, e, s, r, i, n) {
        super(t, e ? [{
            pattern: e
        }] : [], s, r, n),
        this.#et = i
    }
    get() {
        const t = []
          , e = this.getAsArray();
        for (let s = 0; s < e.length; ++s) {
            const r = e[s];
            r.pattern && !r.disabled && t.push(r.pattern)
        }
        return t.join("|")
    }
    getAsArray() {
        return super.get()
    }
    set(t) {
        this.setAsArray([{
            pattern: t,
            disabled: !1
        }])
    }
    setAsArray(t) {
        this.#st = void 0,
        super.set(t)
    }
    asRegExp() {
        if (void 0 !== this.#st)
            return this.#st;
        this.#st = null;
        try {
            const t = this.get();
            t && (this.#st = new RegExp(t,this.#et || ""))
        } catch {}
        return this.#st
    }
}
class He {
    static GLOBAL_VERSION_SETTING_NAME = "inspectorVersion";
    static SYNCED_VERSION_SETTING_NAME = "syncedInspectorVersion";
    static LOCAL_VERSION_SETTING_NAME = "localInspectorVersion";
    static CURRENT_VERSION = 40;
    #rt;
    #it;
    #nt;
    #at;
    constructor(t) {
        this.#rt = t,
        this.#it = this.#rt.createSetting(He.GLOBAL_VERSION_SETTING_NAME, He.CURRENT_VERSION, "Global"),
        this.#nt = this.#rt.createSetting(He.SYNCED_VERSION_SETTING_NAME, He.CURRENT_VERSION, "Synced"),
        this.#at = this.#rt.createSetting(He.LOCAL_VERSION_SETTING_NAME, He.CURRENT_VERSION, "Local")
    }
    resetToCurrent() {
        this.#it.set(He.CURRENT_VERSION),
        this.#nt.set(He.CURRENT_VERSION),
        this.#at.set(He.CURRENT_VERSION)
    }
    #ot(t) {
        const e = t.name;
        this.#rt.getRegistry().delete(e),
        this.#rt.moduleSettings.delete(e),
        t.storage.remove(e)
    }
    updateVersion() {
        const t = He.CURRENT_VERSION
          , e = Math.min(this.#it.get(), this.#nt.get(), this.#at.get())
          , s = this.methodsToRunToUpdateVersion(e, t);
        console.assert(void 0 === this[`updateVersionFrom${t}To${t + 1}`], "Unexpected migration method found. Increment CURRENT_VERSION or remove the method.");
        for (const t of s)
            this[t].call(this);
        this.resetToCurrent()
    }
    methodsToRunToUpdateVersion(t, e) {
        const s = [];
        for (let r = t; r < e; ++r)
            s.push("updateVersionFrom" + r + "To" + (r + 1));
        return s
    }
    updateVersionFrom0To1() {
        this.clearBreakpointsWhenTooMany(this.#rt.createLocalSetting("breakpoints", []), 5e5)
    }
    updateVersionFrom1To2() {
        this.#rt.createSetting("previouslyViewedFiles", []).set([])
    }
    updateVersionFrom2To3() {
        this.#rt.createSetting("fileSystemMapping", {}).set({}),
        this.#ot(this.#rt.createSetting("fileMappingEntries", []))
    }
    updateVersionFrom3To4() {
        const t = this.#rt.createSetting("showHeaSnapshotObjectsHiddenProperties", !1);
        this.#rt.moduleSetting("showAdvancedHeapSnapshotProperties").set(t.get()),
        this.#ot(t)
    }
    updateVersionFrom4To5() {
        const t = {
            FileSystemViewSidebarWidth: "fileSystemViewSplitViewState",
            elementsSidebarWidth: "elementsPanelSplitViewState",
            StylesPaneSplitRatio: "stylesPaneSplitViewState",
            heapSnapshotRetainersViewSize: "heapSnapshotSplitViewState",
            "InspectorView.splitView": "InspectorView.splitViewState",
            "InspectorView.screencastSplitView": "InspectorView.screencastSplitViewState",
            "Inspector.drawerSplitView": "Inspector.drawerSplitViewState",
            layerDetailsSplitView: "layerDetailsSplitViewState",
            networkSidebarWidth: "networkPanelSplitViewState",
            sourcesSidebarWidth: "sourcesPanelSplitViewState",
            scriptsPanelNavigatorSidebarWidth: "sourcesPanelNavigatorSplitViewState",
            sourcesPanelSplitSidebarRatio: "sourcesPanelDebuggerSidebarSplitViewState",
            "timeline-details": "timelinePanelDetailsSplitViewState",
            "timeline-split": "timelinePanelRecorsSplitViewState",
            "timeline-view": "timelinePanelTimelineStackSplitViewState",
            auditsSidebarWidth: "auditsPanelSplitViewState",
            layersSidebarWidth: "layersPanelSplitViewState",
            profilesSidebarWidth: "profilesPanelSplitViewState",
            resourcesSidebarWidth: "resourcesPanelSplitViewState"
        }
          , e = {};
        for (const s in t) {
            const r = t[s]
              , i = s + "H";
            let n = null;
            const a = this.#rt.createSetting(s, e);
            a.get() !== e && (n = n || {},
            n.vertical = {},
            n.vertical.size = a.get(),
            this.#ot(a));
            const o = this.#rt.createSetting(i, e);
            o.get() !== e && (n = n || {},
            n.horizontal = {},
            n.horizontal.size = o.get(),
            this.#ot(o)),
            n && this.#rt.createSetting(r, {}).set(n)
        }
    }
    updateVersionFrom5To6() {
        const t = {
            debuggerSidebarHidden: "sourcesPanelSplitViewState",
            navigatorHidden: "sourcesPanelNavigatorSplitViewState",
            "WebInspector.Drawer.showOnLoad": "Inspector.drawerSplitViewState"
        };
        for (const e in t) {
            const s = this.#rt.createSetting(e, null);
            if (null === s.get()) {
                this.#ot(s);
                continue
            }
            const r = t[e]
              , i = "WebInspector.Drawer.showOnLoad" === e
              , n = s.get() !== i;
            this.#ot(s);
            const a = n ? "OnlyMain" : "Both"
              , o = this.#rt.createSetting(r, {})
              , l = o.get() || {};
            l.vertical = l.vertical || {},
            l.vertical.showMode = a,
            l.horizontal = l.horizontal || {},
            l.horizontal.showMode = a,
            o.set(l)
        }
    }
    updateVersionFrom6To7() {
        const t = {
            sourcesPanelNavigatorSplitViewState: "sourcesPanelNavigatorSplitViewState",
            elementsPanelSplitViewState: "elementsPanelSplitViewState",
            stylesPaneSplitViewState: "stylesPaneSplitViewState",
            sourcesPanelDebuggerSidebarSplitViewState: "sourcesPanelDebuggerSidebarSplitViewState"
        }
          , e = {};
        for (const s in t) {
            const t = this.#rt.createSetting(s, e)
              , r = t.get();
            r !== e && (r.vertical?.size && r.vertical.size < 1 && (r.vertical.size = 0),
            r.horizontal?.size && r.horizontal.size < 1 && (r.horizontal.size = 0),
            t.set(r))
        }
    }
    updateVersionFrom7To8() {}
    updateVersionFrom8To9() {
        const t = ["skipStackFramesPattern", "workspaceFolderExcludePattern"];
        for (let e = 0; e < t.length; ++e) {
            const s = this.#rt.createSetting(t[e], "");
            let r = s.get();
            if (!r)
                return;
            "string" == typeof r && (r = [r]);
            for (let t = 0; t < r.length; ++t)
                "string" == typeof r[t] && (r[t] = {
                    pattern: r[t]
                });
            s.set(r)
        }
    }
    updateVersionFrom9To10() {
        if (window.localStorage)
            for (const t in window.localStorage)
                t.startsWith("revision-history") && window.localStorage.removeItem(t)
    }
    updateVersionFrom10To11() {
        const t = this.#rt.createSetting("customDevicePresets", void 0)
          , e = t.get();
        if (!Array.isArray(e))
            return;
        const s = [];
        for (let t = 0; t < e.length; ++t) {
            const r = e[t]
              , i = {};
            i.title = r.title,
            i.type = "unknown",
            i["user-agent"] = r.userAgent,
            i.capabilities = [],
            r.touch && i.capabilities.push("touch"),
            r.mobile && i.capabilities.push("mobile"),
            i.screen = {},
            i.screen.vertical = {
                width: r.width,
                height: r.height
            },
            i.screen.horizontal = {
                width: r.height,
                height: r.width
            },
            i.screen["device-pixel-ratio"] = r.deviceScaleFactor,
            i.modes = [],
            i["show-by-default"] = !0,
            i.show = "Default",
            s.push(i)
        }
        s.length && this.#rt.createSetting("customEmulatedDeviceList", []).set(s),
        this.#ot(t)
    }
    updateVersionFrom11To12() {
        this.migrateSettingsFromLocalStorage()
    }
    updateVersionFrom12To13() {
        this.migrateSettingsFromLocalStorage(),
        this.#ot(this.#rt.createSetting("timelineOverviewMode", ""))
    }
    updateVersionFrom13To14() {
        const t = {
            throughput: -1,
            latency: 0
        };
        this.#rt.createSetting("networkConditions", t).set(t)
    }
    updateVersionFrom14To15() {
        const t = this.#rt.createLocalSetting("workspaceExcludedFolders", {})
          , e = t.get()
          , s = {};
        for (const t in e) {
            s[t] = [];
            for (const r of e[t])
                s[t].push(r.path)
        }
        t.set(s)
    }
    updateVersionFrom15To16() {
        const t = this.#rt.createSetting("InspectorView.panelOrder", {})
          , e = t.get();
        for (const t of Object.keys(e))
            e[t] = 10 * (e[t] + 1);
        t.set(e)
    }
    updateVersionFrom16To17() {
        const t = this.#rt.createSetting("networkConditionsCustomProfiles", [])
          , e = t.get()
          , s = [];
        if (Array.isArray(e))
            for (const t of e)
                "string" == typeof t.title && "object" == typeof t.value && "number" == typeof t.value.throughput && "number" == typeof t.value.latency && s.push({
                    title: t.title,
                    value: {
                        download: t.value.throughput,
                        upload: t.value.throughput,
                        latency: t.value.latency
                    }
                });
        t.set(s)
    }
    updateVersionFrom17To18() {
        const t = this.#rt.createLocalSetting("workspaceExcludedFolders", {})
          , e = t.get()
          , s = {};
        for (const t in e) {
            let r = t.replace(/\\/g, "/");
            r.startsWith("file://") || (r = r.startsWith("/") ? "file://" + r : "file:///" + r),
            s[r] = e[t]
        }
        t.set(s)
    }
    updateVersionFrom18To19() {
        const t = this.#rt.createSetting("networkLogColumnsVisibility", {
            status: !0,
            type: !0,
            initiator: !0,
            size: !0,
            time: !0
        })
          , e = t.get();
        e.name = !0,
        e.timeline = !0;
        const s = {};
        for (const t in e)
            e.hasOwnProperty(t) && (s[t.toLowerCase()] = {
                visible: e[t]
            });
        this.#rt.createSetting("networkLogColumns", {}).set(s),
        this.#ot(t)
    }
    updateVersionFrom19To20() {
        const t = this.#rt.createSetting("InspectorView.panelOrder", {});
        this.#rt.createSetting("panel-tabOrder", {}).set(t.get()),
        this.#ot(t)
    }
    updateVersionFrom20To21() {
        const t = this.#rt.createSetting("networkLogColumns", {})
          , e = t.get();
        delete e.timeline,
        delete e.waterfall,
        t.set(e)
    }
    updateVersionFrom21To22() {
        const t = this.#rt.createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e)
            t.url = t.sourceFileId,
            delete t.sourceFileId;
        t.set(e)
    }
    updateVersionFrom22To23() {}
    updateVersionFrom23To24() {
        const t = this.#rt.createSetting("searchInContentScripts", !1);
        this.#rt.createSetting("searchInAnonymousAndContentScripts", !1).set(t.get()),
        this.#ot(t)
    }
    updateVersionFrom24To25() {
        const t = this.#rt.createSetting("networkLogColumns", {
            status: !0,
            type: !0,
            initiator: !0,
            size: !0,
            time: !0
        })
          , e = t.get();
        delete e.product,
        t.set(e)
    }
    updateVersionFrom25To26() {
        const t = this.#rt.createSetting("messageURLFilters", {})
          , e = Object.keys(t.get()).map(t => `-url:${t}`).join(" ");
        if (e) {
            const t = this.#rt.createSetting("console.textFilter", "")
              , s = t.get() ? ` ${t.get()}` : "";
            t.set(`${e}${s}`)
        }
        this.#ot(t)
    }
    updateVersionFrom26To27() {
        const t = this.#rt;
        function e(e, s, r) {
            const i = t.createSetting(e, {})
              , n = i.get();
            s in n && (n[r] = n[s],
            delete n[s],
            i.set(n))
        }
        e("panel-tabOrder", "audits2", "audits"),
        e("panel-closeableTabs", "audits2", "audits"),
        function(e, s, r) {
            const i = t.createSetting(e, "");
            i.get() === s && i.set(r)
        }("panel-selectedTab", "audits2", "audits")
    }
    updateVersionFrom27To28() {
        const t = this.#rt.createSetting("uiTheme", "systemPreferred");
        "default" === t.get() && t.set("systemPreferred")
    }
    updateVersionFrom28To29() {
        const t = this.#rt;
        function e(e, s, r) {
            const i = t.createSetting(e, {})
              , n = i.get();
            s in n && (n[r] = n[s],
            delete n[s],
            i.set(n))
        }
        e("panel-tabOrder", "audits", "lighthouse"),
        e("panel-closeableTabs", "audits", "lighthouse"),
        function(e, s, r) {
            const i = t.createSetting(e, "");
            i.get() === s && i.set(r)
        }("panel-selectedTab", "audits", "lighthouse")
    }
    updateVersionFrom29To30() {
        const t = this.#rt.createSetting("closeableTabs", {})
          , e = this.#rt.createSetting("panel-closeableTabs", {})
          , s = this.#rt.createSetting("drawer-view-closeableTabs", {})
          , r = e.get()
          , i = e.get()
          , n = Object.assign(i, r);
        t.set(n),
        this.#ot(e),
        this.#ot(s)
    }
    updateVersionFrom30To31() {
        const t = this.#rt.createSetting("recorder_recordings", []);
        this.#ot(t)
    }
    updateVersionFrom31To32() {
        const t = this.#rt.createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e)
            t.resourceTypeName = "script";
        t.set(e)
    }
    updateVersionFrom32To33() {
        const t = this.#rt.createLocalSetting("previouslyViewedFiles", []);
        let e = t.get();
        e = e.filter(t => "url"in t);
        for (const t of e)
            t.resourceTypeName = "script";
        t.set(e)
    }
    updateVersionFrom33To34() {
        const t = this.#rt.createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e) {
            const e = t.condition.startsWith("/** DEVTOOLS_LOGPOINT */ console.log(") && t.condition.endsWith(")");
            t.isLogpoint = e
        }
        t.set(e)
    }
    updateVersionFrom34To35() {
        const t = this.#rt.createLocalSetting("breakpoints", [])
          , e = t.get();
        for (const t of e) {
            const {condition: e, isLogpoint: s} = t;
            s && (t.condition = e.slice(37, e.length - 1))
        }
        t.set(e)
    }
    updateVersionFrom35To36() {
        this.#rt.createSetting("showThirdPartyIssues", !0).set(!0)
    }
    updateVersionFrom36To37() {
        const t = t => {
            for (const e of t.keys()) {
                const s = Xe.normalizeSettingName(e);
                if (s !== e) {
                    const r = t.get(e);
                    this.#ot({
                        name: e,
                        storage: t
                    }),
                    t.set(s, r)
                }
            }
        }
        ;
        t(this.#rt.globalStorage),
        t(this.#rt.syncedStorage),
        t(this.#rt.localStorage);
        for (const t of this.#rt.globalStorage.keys()) {
            if (t.startsWith("data-grid-") && t.endsWith("-column-weights") || t.endsWith("-tab-order") || "views-location-override" === t || "closeable-tabs" === t) {
                const s = this.#rt.createSetting(t, {});
                s.set(e.StringUtilities.toKebabCaseKeys(s.get()))
            }
            if (t.endsWith("-selected-tab")) {
                const s = this.#rt.createSetting(t, "");
                s.set(e.StringUtilities.toKebabCase(s.get()))
            }
        }
    }
    updateVersionFrom37To38() {
        const t = ( () => {
            try {
                return this.#rt.moduleSetting("console-insights-enabled")
            } catch {
                return
            }
        }
        )()
          , e = this.#rt.createLocalSetting("console-insights-onboarding-finished", !1);
        t && !0 === t.get() && !1 === e.get() && t.set(!1),
        t && !1 === t.get() && e.set(!1)
    }
    updateVersionFrom38To39() {
        const t = "preferred-network-condition"
          , e = this.#rt.globalStorage.get(t);
        if (e)
            try {
                const s = JSON.parse(e);
                "Slow 3G" === s.title ? (s.title = "3G",
                s.i18nTitleKey = "3G",
                this.#rt.globalStorage.set(t, JSON.stringify(s))) : "Fast 3G" === s.title && (s.title = "Slow 4G",
                s.i18nTitleKey = "Slow 4G",
                this.#rt.globalStorage.set(t, JSON.stringify(s)))
            } catch {
                this.#rt.globalStorage.remove(t)
            }
    }
    updateVersionFrom39To40() {
        if (( () => {
            try {
                return this.#rt.moduleSetting("custom-network-conditions"),
                !0
            } catch {
                return !1
            }
        }
        )()) {
            const t = this.#rt.moduleSetting("custom-network-conditions")
              , e = t.get();
            e?.length > 0 && (e.forEach( (t, e) => {
                t.key || (t.key = `USER_CUSTOM_SETTING_${e + 1}`)
            }
            ),
            t.set(e))
        }
        const t = "preferred-network-condition"
          , e = this.#rt.globalStorage.get(t);
        if (!e)
            return;
        const s = {
            "Fast 4G": "SPEED_FAST_4G",
            "Slow 4G": "SPEED_SLOW_4G",
            "3G": "SPEED_3G",
            "No throttling": "NO_THROTTLING",
            Offline: "OFFLINE"
        };
        try {
            const t = JSON.parse(e);
            if (t.i18nTitleKey && s.hasOwnProperty(t.i18nTitleKey)) {
                const e = s[t.i18nTitleKey];
                this.#rt.createSetting("active-network-condition-key", "NO_THROTTLING").set(e)
            }
        } finally {
            this.#rt.globalStorage.remove(t)
        }
    }
    migrateSettingsFromLocalStorage() {
        const t = new Set(["advancedSearchConfig", "breakpoints", "consoleHistory", "domBreakpoints", "eventListenerBreakpoints", "fileSystemMapping", "lastSelectedSourcesSidebarPaneTab", "previouslyViewedFiles", "savedURLs", "watchExpressions", "workspaceExcludedFolders", "xhrBreakpoints"]);
        if (window.localStorage)
            for (const e in window.localStorage) {
                if (t.has(e))
                    continue;
                const s = window.localStorage[e];
                window.localStorage.removeItem(e),
                this.#rt.globalStorage.set(e, s)
            }
    }
    clearBreakpointsWhenTooMany(t, e) {
        t.get().length > e && t.set([])
    }
}
var qe = Object.freeze({
    __proto__: null,
    Deprecation: Ue,
    NOOP_STORAGE: Fe,
    RegExpSetting: $e,
    Setting: je,
    Settings: Xe,
    SettingsStorage: We,
    VersionController: He,
    getLocalizedSettingsCategory: Be,
    maybeRemoveSettingExtension: Ve,
    moduleSetting: function(t) {
        return Xe.instance().moduleSetting(t)
    },
    registerSettingExtension: Ne,
    registerSettingsForTest: Oe,
    resetSettings: Ge,
    settingForTest: function(t) {
        return Xe.instance().settingForTest(t)
    }
});
var Ke = Object.freeze({
    __proto__: null,
    SimpleHistoryManager: class {
        #lt;
        #ht;
        #ct;
        #gt;
        constructor(t) {
            this.#lt = [],
            this.#ht = -1,
            this.#ct = 0,
            this.#gt = t
        }
        readOnlyLock() {
            ++this.#ct
        }
        releaseReadOnlyLock() {
            --this.#ct
        }
        getPreviousValidIndex() {
            if (this.empty())
                return -1;
            let t = this.#ht - 1;
            for (; t >= 0 && !this.#lt[t].valid(); )
                --t;
            return t < 0 ? -1 : t
        }
        getNextValidIndex() {
            let t = this.#ht + 1;
            for (; t < this.#lt.length && !this.#lt[t].valid(); )
                ++t;
            return t >= this.#lt.length ? -1 : t
        }
        readOnly() {
            return Boolean(this.#ct)
        }
        empty() {
            return !this.#lt.length
        }
        active() {
            return this.empty() ? null : this.#lt[this.#ht]
        }
        push(t) {
            this.readOnly() || (this.empty() || this.#lt.splice(this.#ht + 1),
            this.#lt.push(t),
            this.#lt.length > this.#gt && this.#lt.shift(),
            this.#ht = this.#lt.length - 1)
        }
        canRollback() {
            return this.getPreviousValidIndex() >= 0
        }
        canRollover() {
            return this.getNextValidIndex() >= 0
        }
        rollback() {
            const t = this.getPreviousValidIndex();
            return -1 !== t && (this.readOnlyLock(),
            this.#ht = t,
            this.#lt[t].reveal(),
            this.releaseReadOnlyLock(),
            !0)
        }
        rollover() {
            const t = this.getNextValidIndex();
            return -1 !== t && (this.readOnlyLock(),
            this.#ht = t,
            this.#lt[t].reveal(),
            this.releaseReadOnlyLock(),
            !0)
        }
    }
});
var Ze = Object.freeze({
    __proto__: null,
    StringOutputStream: class {
        #ut = "";
        async write(t) {
            this.#ut += t
        }
        async close() {}
        data() {
            return this.#ut
        }
    }
});
class Ye {
    #dt;
    #pt;
    #mt;
    #yt;
    #bt;
    #wt;
    #ft;
    constructor(t) {
        this.#pt = 0,
        this.#ft = t,
        this.clear()
    }
    static newStringTrie() {
        return new Ye({
            empty: () => "",
            append: (t, e) => t + e,
            slice: (t, e, s) => t.slice(e, s)
        })
    }
    static newArrayTrie() {
        return new Ye({
            empty: () => [],
            append: (t, e) => t.concat([e]),
            slice: (t, e, s) => t.slice(e, s)
        })
    }
    add(t) {
        let e = this.#pt;
        ++this.#bt[this.#pt];
        for (let s = 0; s < t.length; ++s) {
            const r = t[s];
            let i = this.#mt[e].get(r);
            i || (this.#wt.length ? i = this.#wt.pop() : (i = this.#dt++,
            this.#yt.push(!1),
            this.#bt.push(0),
            this.#mt.push(new Map)),
            this.#mt[e].set(r, i)),
            ++this.#bt[i],
            e = i
        }
        this.#yt[e] = !0
    }
    remove(t) {
        if (!this.has(t))
            return !1;
        let e = this.#pt;
        --this.#bt[this.#pt];
        for (let s = 0; s < t.length; ++s) {
            const r = t[s]
              , i = this.#mt[e].get(r);
            --this.#bt[i] || (this.#mt[e].delete(r),
            this.#wt.push(i)),
            e = i
        }
        return this.#yt[e] = !1,
        !0
    }
    has(t) {
        let e = this.#pt;
        for (let s = 0; s < t.length; ++s)
            if (e = this.#mt[e].get(t[s]),
            !e)
                return !1;
        return this.#yt[e]
    }
    words(t) {
        t = t ?? this.#ft.empty();
        let e = this.#pt;
        for (let s = 0; s < t.length; ++s)
            if (e = this.#mt[e].get(t[s]),
            !e)
                return [];
        const s = [];
        return this.dfs(e, t, s),
        s
    }
    dfs(t, e, s) {
        this.#yt[t] && s.push(e);
        const r = this.#mt[t];
        for (const [t,i] of r) {
            const r = this.#ft.append(e, t);
            this.dfs(i, r, s)
        }
    }
    longestPrefix(t, e) {
        let s = this.#pt
          , r = 0;
        for (let i = 0; i < t.length && (s = this.#mt[s].get(t[i]),
        s); ++i)
            e && !this.#yt[s] || (r = i + 1);
        return this.#ft.slice(t, 0, r)
    }
    clear() {
        this.#dt = 1,
        this.#pt = 0,
        this.#mt = [new Map],
        this.#yt = [!1],
        this.#bt = [0],
        this.#wt = []
    }
}
var Je = Object.freeze({
    __proto__: null,
    Trie: Ye
});
var Qe = Object.freeze({
    __proto__: null,
    TextDictionary: class {
        words = new Map;
        index = Ye.newStringTrie();
        addWord(t) {
            let e = this.words.get(t) || 0;
            ++e,
            this.words.set(t, e),
            this.index.add(t)
        }
        removeWord(t) {
            let e = this.words.get(t) || 0;
            if (e) {
                if (1 === e)
                    return this.words.delete(t),
                    void this.index.remove(t);
                --e,
                this.words.set(t, e)
            }
        }
        wordsWithPrefix(t) {
            return this.index.words(t)
        }
        hasWord(t) {
            return this.words.has(t)
        }
        wordCount(t) {
            return this.words.get(t) || 0
        }
        reset() {
            this.words.clear(),
            this.index.clear()
        }
    }
});
var ts = Object.freeze({
    __proto__: null,
    Throttler: class {
        #St;
        #xt;
        #vt;
        #Tt;
        #Rt;
        #zt = Promise.withResolvers();
        #At;
        constructor(t) {
            this.#St = t,
            this.#xt = !1,
            this.#vt = !1,
            this.#Tt = null,
            this.#Rt = 0
        }
        #Pt() {
            this.#Rt = this.#Et(),
            this.#xt = !1,
            this.#Tt && this.#kt(!1)
        }
        get process() {
            return this.#Tt
        }
        get processCompleted() {
            return this.#Tt ? this.#zt.promise : null
        }
        #Lt() {
            this.#At = void 0,
            this.#vt = !1,
            this.#xt = !0,
            Promise.resolve().then(this.#Tt).catch(console.error.bind(console)).then(this.#Pt.bind(this)).then(this.#zt.resolve),
            this.#zt = Promise.withResolvers(),
            this.#Tt = null
        }
        async schedule(t, e="Default") {
            this.#Tt = t;
            const s = Boolean(this.#At) || this.#xt
              , r = this.#Et() - this.#Rt > this.#St
              , i = "AsSoonAsPossible" === e || "Default" === e && !s && r
              , n = i && !this.#vt;
            this.#vt = this.#vt || i,
            this.#kt(n),
            await this.#zt.promise
        }
        #kt(t) {
            if (this.#xt)
                return;
            if (this.#At && !t)
                return;
            clearTimeout(this.#At);
            const e = this.#vt ? 0 : this.#St;
            this.#At = setTimeout(this.#Lt.bind(this), e)
        }
        #Et() {
            return performance.now()
        }
    }
});
export {r as App, n as AppProvider, l as Base64, h as CharacterIdMap, Lt as Color, E as ColorConverter, $ as ColorUtils, jt as Console, $t as Debouncer, Ht as EventTarget, Jt as Gzip, Qt as JavaScriptMetaData, se as Lazy, ie as MapWithDefault, ne as Mutex, Ct as ObjectWrapper, le as ParsedURL, ce as Progress, ge as ResolverBase, ve as ResourceType, Te as ReturnToPanel, Dt as Revealer, Ae as Runnable, Ee as SegmentedRange, Me as SettingRegistration, qe as Settings, Ke as SimpleHistoryManager, Ze as StringOutputStream, Qe as TextDictionary, ts as Throttler, Je as Trie};
//# sourceMappingURL=common.js.map
