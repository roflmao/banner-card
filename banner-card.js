/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  e =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  i = Symbol(),
  s = new WeakMap();
let n = class {
  constructor(t, e, s) {
    if (((this._$cssResult$ = !0), s !== i))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (e && void 0 === t) {
      const e = void 0 !== i && 1 === i.length;
      e && (t = s.get(i)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          e && s.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const r = e
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = "";
              for (const i of t.cssRules) e += i.cssText;
              return ((t) =>
                new n("string" == typeof t ? t : t + "", void 0, i))(e);
            })(t)
          : t,
  {
    is: o,
    defineProperty: a,
    getOwnPropertyDescriptor: c,
    getOwnPropertyNames: h,
    getOwnPropertySymbols: l,
    getPrototypeOf: d,
  } = Object,
  u = globalThis,
  p = u.trustedTypes,
  $ = p ? p.emptyScript : "",
  f = u.reactiveElementPolyfillSupport,
  m = (t, e) => t,
  g = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? $ : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let i = t;
      switch (e) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    },
  },
  y = (t, e) => !o(t, e),
  _ = {
    attribute: !0,
    type: String,
    converter: g,
    reflect: !1,
    useDefault: !1,
    hasChanged: y,
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ (Symbol.metadata ??= Symbol("metadata")),
  (u.litPropertyMetadata ??= new WeakMap());
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _) {
    if (
      (e.state && (e.attribute = !1),
      this._$Ei(),
      this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0),
      this.elementProperties.set(t, e),
      !e.noAccessor)
    ) {
      const i = Symbol(),
        s = this.getPropertyDescriptor(t, i, e);
      void 0 !== s && a(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = c(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(t) {
        this[e] = t;
      },
    };
    return {
      get: s,
      set(e) {
        const r = s?.call(this);
        n?.call(this, e), this.requestUpdate(t, r, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _;
  }
  static _$Ei() {
    if (this.hasOwnProperty(m("elementProperties"))) return;
    const t = d(this);
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(m("finalized"))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(m("properties")))
    ) {
      const t = this.properties,
        e = [...h(t), ...l(t)];
      for (const i of e) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const e = litPropertyMetadata.get(t);
      if (void 0 !== e)
        for (const [t, i] of e) this.elementProperties.set(t, i);
    }
    this._$Eh = new Map();
    for (const [t, e] of this.elementProperties) {
      const i = this._$Eu(t, e);
      void 0 !== i && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) e.unshift(r(t));
    } else void 0 !== t && e.push(r(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return !1 === i
      ? void 0
      : "string" == typeof i
      ? i
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$ES = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = new Map(),
      e = this.constructor.elementProperties;
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const i =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((i, s) => {
        if (e)
          i.adoptedStyleSheets = s.map((t) =>
            t instanceof CSSStyleSheet ? t : t.styleSheet
          );
        else
          for (const e of s) {
            const s = document.createElement("style"),
              n = t.litNonce;
            void 0 !== n && s.setAttribute("nonce", n),
              (s.textContent = e.cssText),
              i.appendChild(s);
          }
      })(i, this.constructor.elementStyles),
      i
    );
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t),
      s = this.constructor._$Eu(t, i);
    if (void 0 !== s && !0 === i.reflect) {
      const n = (void 0 !== i.converter?.toAttribute
        ? i.converter
        : g
      ).toAttribute(e, i.type);
      (this._$Em = t),
        null == n ? this.removeAttribute(s) : this.setAttribute(s, n),
        (this._$Em = null);
    }
  }
  _$AK(t, e) {
    const i = this.constructor,
      s = i._$Eh.get(t);
    if (void 0 !== s && this._$Em !== s) {
      const t = i.getPropertyOptions(s),
        n =
          "function" == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== t.converter?.fromAttribute
            ? t.converter
            : g;
      this._$Em = s;
      const r = n.fromAttribute(e, t.type);
      (this[s] = r ?? this._$Ej?.get(s) ?? r), (this._$Em = null);
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (void 0 !== t) {
      const r = this.constructor;
      if (
        (!1 === s && (n = this[t]),
        (i ??= r.getPropertyOptions(t)),
        !(
          (i.hasChanged ?? y)(n, e) ||
          (i.useDefault &&
            i.reflect &&
            n === this._$Ej?.get(t) &&
            !this.hasAttribute(r._$Eu(t, i)))
        ))
      )
        return;
      this.C(t, e, i);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, r) {
    (i &&
      !(this._$Ej ??= new Map()).has(t) &&
      (this._$Ej.set(t, r ?? e ?? this[t]), !0 !== n || void 0 !== r)) ||
      (this._$AL.has(t) ||
        (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)),
      !0 === s && this._$Em !== t && (this._$Eq ??= new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, e] of this._$Ep) this[t] = e;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [e, i] of t) {
          const { wrapped: t } = i,
            s = this[e];
          !0 !== t ||
            this._$AL.has(e) ||
            void 0 === s ||
            this.C(e, void 0, i, s);
        }
    }
    let t = !1;
    const e = this._$AL;
    try {
      (t = this.shouldUpdate(e)),
        t
          ? (this.willUpdate(e),
            this._$EO?.forEach((t) => t.hostUpdate?.()),
            this.update(e))
          : this._$EM();
    } catch (e) {
      throw ((t = !1), this._$EM(), e);
    }
    t && this._$AE(e);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$EO?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EM() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    (this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t]))),
      this._$EM();
  }
  updated(t) {}
  firstUpdated(t) {}
};
(v.elementStyles = []),
  (v.shadowRootOptions = { mode: "open" }),
  (v[m("elementProperties")] = new Map()),
  (v[m("finalized")] = new Map()),
  f?.({ ReactiveElement: v }),
  (u.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis,
  A = (t) => t,
  w = b.trustedTypes,
  E = w ? w.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
  S = "$lit$",
  C = `lit$${Math.random().toFixed(9).slice(2)}$`,
  x = "?" + C,
  k = `<${x}>`,
  P = document,
  z = () => P.createComment(""),
  O = (t) => null === t || ("object" != typeof t && "function" != typeof t),
  U = Array.isArray,
  H = "[ \t\n\f\r]",
  M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  T = /-->/g,
  N = />/g,
  R = RegExp(
    `>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  D = /'/g,
  j = /"/g,
  I = /^(?:script|style|textarea|title)$/i,
  B = ((t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }))(1),
  L = Symbol.for("lit-noChange"),
  V = Symbol.for("lit-nothing"),
  W = new WeakMap(),
  q = P.createTreeWalker(P, 129);
function J(t, e) {
  if (!U(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== E ? E.createHTML(e) : e;
}
const K = (t, e) => {
  const i = t.length - 1,
    s = [];
  let n,
    r = 2 === e ? "<svg>" : 3 === e ? "<math>" : "",
    o = M;
  for (let e = 0; e < i; e++) {
    const i = t[e];
    let a,
      c,
      h = -1,
      l = 0;
    for (; l < i.length && ((o.lastIndex = l), (c = o.exec(i)), null !== c); )
      (l = o.lastIndex),
        o === M
          ? "!--" === c[1]
            ? (o = T)
            : void 0 !== c[1]
            ? (o = N)
            : void 0 !== c[2]
            ? (I.test(c[2]) && (n = RegExp("</" + c[2], "g")), (o = R))
            : void 0 !== c[3] && (o = R)
          : o === R
          ? ">" === c[0]
            ? ((o = n ?? M), (h = -1))
            : void 0 === c[1]
            ? (h = -2)
            : ((h = o.lastIndex - c[2].length),
              (a = c[1]),
              (o = void 0 === c[3] ? R : '"' === c[3] ? j : D))
          : o === j || o === D
          ? (o = R)
          : o === T || o === N
          ? (o = M)
          : ((o = R), (n = void 0));
    const d = o === R && t[e + 1].startsWith("/>") ? " " : "";
    r +=
      o === M
        ? i + k
        : h >= 0
        ? (s.push(a), i.slice(0, h) + S + i.slice(h) + C + d)
        : i + C + (-2 === h ? e : d);
  }
  return [
    J(t, r + (t[i] || "<?>") + (2 === e ? "</svg>" : 3 === e ? "</math>" : "")),
    s,
  ];
};
class Z {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0,
      r = 0;
    const o = t.length - 1,
      a = this.parts,
      [c, h] = K(t, e);
    if (
      ((this.el = Z.createElement(c, i)),
      (q.currentNode = this.el.content),
      2 === e || 3 === e)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (s = q.nextNode()) && a.length < o; ) {
      if (1 === s.nodeType) {
        if (s.hasAttributes())
          for (const t of s.getAttributeNames())
            if (t.endsWith(S)) {
              const e = h[r++],
                i = s.getAttribute(t).split(C),
                o = /([.?@])?(.*)/.exec(e);
              a.push({
                type: 1,
                index: n,
                name: o[2],
                strings: i,
                ctor:
                  "." === o[1] ? X : "?" === o[1] ? tt : "@" === o[1] ? et : Q,
              }),
                s.removeAttribute(t);
            } else
              t.startsWith(C) &&
                (a.push({ type: 6, index: n }), s.removeAttribute(t));
        if (I.test(s.tagName)) {
          const t = s.textContent.split(C),
            e = t.length - 1;
          if (e > 0) {
            s.textContent = w ? w.emptyScript : "";
            for (let i = 0; i < e; i++)
              s.append(t[i], z()),
                q.nextNode(),
                a.push({ type: 2, index: ++n });
            s.append(t[e], z());
          }
        }
      } else if (8 === s.nodeType)
        if (s.data === x) a.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = s.data.indexOf(C, t + 1)); )
            a.push({ type: 7, index: n }), (t += C.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return (i.innerHTML = t), i;
  }
}
function F(t, e, i = t, s) {
  if (e === L) return e;
  let n = void 0 !== s ? i._$Co?.[s] : i._$Cl;
  const r = O(e) ? void 0 : e._$litDirective$;
  return (
    n?.constructor !== r &&
      (n?._$AO?.(!1),
      void 0 === r ? (n = void 0) : ((n = new r(t)), n._$AT(t, i, s)),
      void 0 !== s ? ((i._$Co ??= [])[s] = n) : (i._$Cl = n)),
    void 0 !== n && (e = F(t, n._$AS(t, e.values), n, s)),
    e
  );
}
class G {
  constructor(t, e) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: e },
        parts: i,
      } = this._$AD,
      s = (t?.creationScope ?? P).importNode(e, !0);
    q.currentNode = s;
    let n = q.nextNode(),
      r = 0,
      o = 0,
      a = i[0];
    for (; void 0 !== a; ) {
      if (r === a.index) {
        let e;
        2 === a.type
          ? (e = new Y(n, n.nextSibling, this, t))
          : 1 === a.type
          ? (e = new a.ctor(n, a.name, a.strings, this, t))
          : 6 === a.type && (e = new it(n, this, t)),
          this._$AV.push(e),
          (a = i[++o]);
      }
      r !== a?.index && ((n = q.nextNode()), r++);
    }
    return (q.currentNode = P), s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      void 0 !== i &&
        (void 0 !== i.strings
          ? (i._$AI(t, i, e), (e += i.strings.length - 2))
          : i._$AI(t[e])),
        e++;
  }
}
class Y {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    (this.type = 2),
      (this._$AH = V),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = s),
      (this._$Cv = s?.isConnected ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = F(this, t, e)),
      O(t)
        ? t === V || null == t || "" === t
          ? (this._$AH !== V && this._$AR(), (this._$AH = V))
          : t !== this._$AH && t !== L && this._(t)
        : void 0 !== t._$litType$
        ? this.$(t)
        : void 0 !== t.nodeType
        ? this.T(t)
        : ((t) => U(t) || "function" == typeof t?.[Symbol.iterator])(t)
        ? this.k(t)
        : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  _(t) {
    this._$AH !== V && O(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(P.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    const { values: e, _$litType$: i } = t,
      s =
        "number" == typeof i
          ? this._$AC(t)
          : (void 0 === i.el &&
              (i.el = Z.createElement(J(i.h, i.h[0]), this.options)),
            i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const t = new G(s, this),
        i = t.u(this.options);
      t.p(e), this.T(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = W.get(t.strings);
    return void 0 === e && W.set(t.strings, (e = new Z(t))), e;
  }
  k(t) {
    U(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      s = 0;
    for (const n of t)
      s === e.length
        ? e.push((i = new Y(this.O(z()), this.O(z()), this, this.options)))
        : (i = e[s]),
        i._$AI(n),
        s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), (e.length = s));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const e = A(t).nextSibling;
      A(t).remove(), (t = e);
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    (this.type = 1),
      (this._$AH = V),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = s),
      (this.options = n),
      i.length > 2 || "" !== i[0] || "" !== i[1]
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = V);
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (void 0 === n)
      (t = F(this, t, e, 0)),
        (r = !O(t) || (t !== this._$AH && t !== L)),
        r && (this._$AH = t);
    else {
      const s = t;
      let o, a;
      for (t = n[0], o = 0; o < n.length - 1; o++)
        (a = F(this, s[i + o], e, o)),
          a === L && (a = this._$AH[o]),
          (r ||= !O(a) || a !== this._$AH[o]),
          a === V ? (t = V) : t !== V && (t += (a ?? "") + n[o + 1]),
          (this._$AH[o] = a);
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === V
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? "");
  }
}
class X extends Q {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === V ? void 0 : t;
  }
}
class tt extends Q {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== V);
  }
}
class et extends Q {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    if ((t = F(this, t, e, 0) ?? V) === L) return;
    const i = this._$AH,
      s =
        (t === V && i !== V) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== V && (i === V || s);
    s && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    "function" == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class it {
  constructor(t, e, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    F(this, t);
  }
}
const st = b.litHtmlPolyfillSupport;
st?.(Z, Y), (b.litHtmlVersions ??= []).push("3.3.2");
const nt = globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class rt extends v {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, e, i) => {
        const s = i?.renderBefore ?? e;
        let n = s._$litPart$;
        if (void 0 === n) {
          const t = i?.renderBefore ?? null;
          s._$litPart$ = n = new Y(e.insertBefore(z(), t), t, void 0, i ?? {});
        }
        return n._$AI(t), n;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return L;
  }
}
(rt._$litElement$ = !0),
  (rt.finalized = !0),
  nt.litElementHydrateSupport?.({ LitElement: rt });
const ot = nt.litElementPolyfillSupport;
ot?.({ LitElement: rt }), (nt.litElementVersions ??= []).push("4.2.2");
var at = ((t, ...e) => {
  const s =
    1 === t.length
      ? t[0]
      : e.reduce(
          (e, i, s) =>
            e +
            ((t) => {
              if (!0 === t._$cssResult$) return t.cssText;
              if ("number" == typeof t) return t;
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                  t +
                  ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
              );
            })(i) +
            t[s + 1],
          t[0]
        );
  return new n(s, t, i);
})`
  :host {
    --bc-font-size-heading: var(--banner-card-heading-size, 3em);
    --bc-font-size-entity-value: var(--banner-card-entity-value-size, 1.5em);
    --bc-font-size-media-title: var(--banner-card-media-title-size, 0.9em);
    --bc-margin-heading: var(--banner-card-heading-margin, 1em);
    --bc-spacing: var(--banner-card-spacing, 4px);
    --bc-button-size: var(--banner-card-button-size, 32px);
    --bc-heading-color-dark: var(
      --banner-card-heading-color-dark,
      var(--primary-text-color)
    );
    --bc-heading-color-light: var(--banner-card-heading-color-light, #fff);
  }
  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto !important;
  }

  a {
    cursor: pointer;
  }

  ha-icon-button {
    width: var(--bc-button-size);
    height: var(--bc-button-size);
    padding: var(--bc-spacing);
  }

  .heading {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--bc-font-size-heading);
    margin: var(--bc-margin-heading);
    font-weight: 300;
    cursor: pointer;
  }

  ha-icon.heading-icon {
    --iron-icon-width: 1em;
    --iron-icon-height: 1em;
    margin: 0 var(--bc-spacing);
  }

  .overlay-strip {
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 100%;
  }

  .entities {
    padding: calc(var(--bc-spacing) * 2) 0px;
    color: white;
    display: grid;
  }

  .entity-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: var(--bc-spacing);
    margin-bottom: var(--bc-spacing);
    box-shadow: -1px 0px 0 0 white;
    width: 100%;
  }

  .media-title {
    flex: 1 0;
    overflow: hidden;
    font-weight: 300;
    font-size: var(--bc-font-size-media-title);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .media-controls {
    display: flex;
    flex: 0 0 calc(var(--bc-button-size) * 3);
  }

  .entity-padded {
    display: block;
    min-width: -webkit-fill-available;
    padding: 16px 16px 0 16px;
  }

  .small-text {
    font-size: 0.6em;
  }

  .entity-state.expand .entity-value {
    width: 100%;
  }

  .entity-state-left {
    margin-right: auto;
    margin-left: 16px;
  }

  .entity-state-right {
    margin-left: auto;
    margin-right: 16px;
  }

  .entity-name {
    font-weight: 700;
    white-space: nowrap;
    padding-top: calc(var(--bc-spacing) * 2);
    padding-bottom: calc(var(--bc-spacing) * 2);
  }

  .entity-value {
    display: flex;
    width: 100%;
    flex: 1 0;
    font-size: var(--bc-font-size-entity-value);
    align-items: center;
    justify-content: center;
  }

  .entity-value.error {
    display: inline-block;
    word-wrap: break-word;
    font-size: 16px;
    width: 90%;
  }

  .entity-value ha-icon {
    color: white;
  }

  ha-button {
    --mdc-theme-primary: white;
  }
  ha-switch {
    --mdc-theme-secondary: white;
  }
`;
function ct({ state: t, attributes: e }, i = !1) {
  return "string" == typeof i && e.hasOwnProperty(i) ? e[i] : t;
}
function ht(t) {
  return "object" == typeof t
    ? ((e = t),
      (i = (t) => (!1 === t ? null : t)),
      Object.entries(e).reduce((t, [e, s]) => ({ ...t, [e]: i(s, e) }), {}))
    : { entity: t };
  var e, i;
}
const lt = {
  "=": (t, e) => e.includes(t),
  ">": (t, e) => t > e[0],
  "<": (t, e) => t < e[0],
  "!=": (t, e) => !e.includes(t),
};
function dt(t, e) {
  if (["string", "number", "boolean"].includes(typeof t))
    return lt["="](e, [t]);
  if (Array.isArray(t)) {
    const [i, ...s] = t;
    return lt.hasOwnProperty(i) ? lt[i](e, s) : lt["="](e, s);
  }
  throw new Error(`Couldn't find a valid matching strategy for '${t}'`);
}
!(function (t) {
  console.info(`%cbanner-card: ${t}`, "font-weight: bold");
})("0.14.0");
const ut = /^(mdi|hass):/;
function pt(t) {
  return "string" == typeof t && t.match(ut);
}
function $t(t, e = null) {
  return e
    ? B` <a class="entity-name" @click=${e}>${t}</a> `
    : B` <span class="entity-name">${t}</span> `;
}
class ft extends rt {
  static get properties() {
    return {
      config: { attribute: !1 },
      color: { attribute: !1 },
      entities: { attribute: !1 },
      entityValues: { attribute: !1 },
      rowSize: { attribute: !1 },
      _hass: { attribute: !1 },
    };
  }
  static get styles() {
    return [at];
  }
  constructor() {
    super(), (this.config = {}), (this.entities = []), (this._hass = {});
  }
  setConfig(t) {
    if (void 0 === t.heading) throw new Error("You need to define a heading");
    (this.entities = (t.entities || []).map(ht)),
      (this.config = t),
      (this.color =
        t.color ||
        (function (t, e, i) {
          if (!t || "#" !== t[0]) return i;
          if (3 === (t = t.substring(1)).length) {
            const [e, i, s] = t;
            t = [e, e, i, i, s, s].join("");
          }
          if (6 !== t.length) return i;
          const s = [
              parseInt(t.slice(0, 2), 16) / 255,
              parseInt(t.slice(2, 4), 16) / 255,
              parseInt(t.slice(4, 6), 16) / 255,
            ],
            [n, r, o] = s.map((t) =>
              t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)
            );
          return 0.2126 * n + 0.7152 * r + 0.0722 * o > 0.179 ? i : e;
        })(
          t.background,
          "var(--bc-heading-color-light)",
          "var(--bc-heading-color-dark)"
        ));
    if ("undefined" !== typeof t.row_size) {
      if (t.row_size < 1) throw new Error("row_size must be at least 1");
      "auto" === t.row_size
        ? (this.rowSize = this.entities.length)
        : (this.rowSize = t.row_size);
    }
    this.rowSize = this.rowSize || 3;
  }
  set hass(t) {
    (this._hass = t),
      (this.entityValues = (this.entities || [])
        .filter((e) =>
          (function (t, e) {
            if (!e.hasOwnProperty(t.entity)) return !1;
            if (t.when) {
              const { state: i, entity: s = t.entity, attributes: n } =
                  "string" == typeof t.when ? { state: t.when } : t.when,
                r = e[s];
              return (
                !(void 0 !== i && !dt(i, r.state)) &&
                Object.entries(n || {}).every(([t, e]) =>
                  dt(e, r.attributes[t])
                )
              );
            }
            return !0;
          })(e, t.states)
        )
        .map((t) => this.parseEntity(t)));
  }
  parseEntity(t) {
    const e = this._hass.states[t.entity],
      i = e ? e.attributes : {},
      s = {};
    if (t.map_state && e.state in t.map_state) {
      const i = t.map_state[e.state],
        n = typeof i;
      "string" === n
        ? (s.value = i)
        : "object" === n &&
          Object.entries(i).forEach(([t, e]) => {
            s[t] = e;
          });
    }
    const n = {
      name: i.friendly_name,
      state: e ? e.state : "",
      value: ct(e || {}, t.attribute),
      unit: i.unit_of_measurement,
      attributes: i,
      domain: t.entity ? t.entity.split(".")[0] : void 0,
    };
    return (
      i.hasOwnProperty("current_position") && (n.state = i.current_position),
      { ...n, ...t, ...s }
    );
  }
  grid(t = 1) {
    return "full" === t || t > this.rowSize
      ? `grid-column: span ${this.rowSize};`
      : `grid-column: span ${t};`;
  }
  _service(t, e, i) {
    return () => this._hass.callService(t, e, { entity_id: i });
  }
  render() {
    return B`
      <ha-card style="background: ${this.config.background};">
        ${this.renderHeading()} ${this.renderEntities()}
      </ha-card>
    `;
  }
  renderHeading() {
    let t = this.config.heading;
    if (!1 === t) return V;
    Array.isArray(t) || (t = [t]);
    return B`
      <h2 class="heading" @click=${() =>
        this.config.link && this.navigate(this.config.link)} style="color: ${
      this.color
    };">
        ${t.map((t) =>
          pt(t)
            ? B`
              <ha-icon class="heading-icon" .icon="${t}"></ha-icon>
            `
            : B` <span>${t}</span> `
        )}
      </h2>
    `;
  }
  renderEntities() {
    return 0 === this.entityValues.length
      ? V
      : B`
      <div class="overlay-strip">
        <div
          class="entities"
          style="grid-template-columns: repeat(${this.rowSize}, 1fr);"
        >
          ${this.entityValues.map((t) => {
            if (t.error)
              return B`
                <div class="entity-state" style="${this.grid(t.size)}">
                  ${$t(t.error)}
                  <span class="entity-value error">${t.entity}</span>
                </div>
              `;
            const e = { ...t, onClick: () => this.openEntityPopover(t.entity) };
            if (t.action)
              return this.renderCustom({
                ...e,
                action: () => {
                  const { service: e, ...i } = t.action,
                    [s, n] = e.split(".");
                  this._hass.callService(s, n, { entity_id: t.entity, ...i });
                },
              });
            if (!t.attribute) {
              if (t.type && t.type.startsWith("custom:")) {
                const i = t.type.split(":")[1];
                let s = "";
                return (
                  "calendar-card" === i && (s = "small-text"),
                  this.renderCustomElement(i, e, s)
                );
              }
              switch (t.domain) {
                case "light":
                case "switch":
                case "input_boolean":
                  return this.renderAsToggle(e);
                case "cover":
                  return this.renderDomainCover(e);
                case "media_player":
                  return this.renderDomainMediaPlayer(e);
              }
            }
            return this.renderDomainDefault(e);
          })}
        </div>
      </div>
    `;
  }
  renderValue(
    { icon: t, value: e, image: i, action: s, click: n, color: r },
    o
  ) {
    return t || pt(e)
      ? B`
        <ha-icon
          .icon="${t || e}"
          style="${(r = r ? `color: ${r}` : "")}"
          @click=${n}
        ></ha-icon>
      `
      : !0 === i
      ? B`
        <state-badge
          style="background-image: url(${e});"
          @click=${n}
        ></state-badge>
      `
      : o();
  }
  renderDomainDefault({
    value: t,
    unit: e,
    name: i,
    size: s,
    onClick: n,
    ...r
  }) {
    const o = this.renderValue(
      { ...r, value: t, click: n },
      () => B` ${t} ${e} `
    );
    return B`
      <a class="entity-state" style="${this.grid(s)}" @click=${n}>
        ${$t(i, n)}
        <span class="entity-value">${o}</span>
      </a>
    `;
  }
  renderCustom({
    value: t,
    unit: e,
    action: i,
    name: s,
    size: n,
    onClick: r,
    ...o
  }) {
    const a = this.renderValue(
      { ...o, value: t, unit: e, click: i },
      () => B`
        <ha-button ?dense=${!0} @click=${i}>
          ${t} ${e}
        </ha-button>
      `
    );
    return B`
      <div class="entity-state" style="${this.grid(n)}">
        ${$t(s, r)}
        <span class="entity-value">${a}</span>
      </div>
    `;
  }
  renderDomainMediaPlayer({
    onClick: t,
    attributes: e,
    size: i,
    name: s,
    state: n,
    entity: r,
    domain: o,
  }) {
    const a = "playing" === n,
      c = a ? "media_pause" : "media_play",
      h = [e.media_artist, e.media_title].join(" – ");
    return B`
      <div class="entity-state" style="${this.grid(i || "full")}">
        ${$t(s, t)}
        <div class="entity-value">
          <div class="entity-state-left media-title">${h}</div>
          <div class="entity-state-right media-controls">
            <ha-icon-button
              @click=${this._service(o, "media_previous_track", r)}
            >
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${this._service(o, c, r)}>
              <ha-icon icon="${a ? "mdi:stop" : "mdi:play"}"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${this._service(o, "media_next_track", r)}
            >
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </div>
    `;
  }
  _renderCustomElement(t, e, i) {
    return B`
      <div class="entity-state" style="${this.grid(e.size || "full")}">
        <div class="entity-value">
          <div class="entity-padded ${i}">
            ${(function (t, e, i) {
              const s = document.createElement(t);
              return s.setConfig && s.setConfig(e), (s.hass = i), s;
            })(t, e, this._hass)}
          </div>
        </div>
      </div>
    `;
  }
  renderCustomElement(t, e, i = "") {
    if (customElements.get(t)) return this._renderCustomElement(t, e, i);
    console.error(t + " doesn't exist");
  }
  renderAsToggle({
    onClick: t,
    size: e,
    name: i,
    state: s,
    domain: n,
    entity: r,
    color: o,
  }) {
    const a = o ? `--switch-checked-color: ${o};` : "";
    return B`
      <div class="entity-state" style="${this.grid(e)}">
        ${$t(i, t)}
        <span class="entity-value">
          <ha-switch
            style="${a}"
            ?checked=${"on" === s}
            @change=${this._service(n, "toggle", r)}
          >
          </ha-switch>
        </span>
      </div>
    `;
  }
  renderDomainCover({ onClick: t, size: e, name: i, state: s, entity: n }) {
    const r = "closed" === s || 0 === s,
      o = "open" === s || 100 === s;
    return B`
      <div class="entity-state" style="${this.grid(e)}">
        ${$t(i, t)}
        <span class="entity-value">
          <ha-icon-button
            ?disabled=${o}
            @click=${this._service("cover", "open_cover", n)}
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._service("cover", "stop_cover", n)}
          >
            <ha-icon icon="mdi:stop"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            ?disabled=${r}
            @click=${this._service("cover", "close_cover", n)}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </ha-icon-button>
        </span>
      </div>
    `;
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return { rows: 3, columns: 12, min_rows: 2, min_columns: 6 };
  }
  navigate(t) {
    history.pushState(null, "", t),
      this.fire("location-changed", { replace: !0 });
  }
  openEntityPopover(t) {
    this.fire("hass-more-info", { entityId: t });
  }
  fire(t, e, i) {
    (i = i || {}), (e = null == e ? {} : e);
    const s = new Event(t, {
      bubbles: void 0 === i.bubbles || i.bubbles,
      cancelable: Boolean(i.cancelable),
      composed: void 0 === i.composed || i.composed,
    });
    return (s.detail = e), this.dispatchEvent(s), s;
  }
}
window.customElements.define("banner-card", ft),
  (window.customCards = window.customCards || []),
  window.customCards.push({
    type: "banner-card",
    name: "Banner Card",
    preview: !1,
    description:
      "The Banner card is a linkable banner with a large heading and interactive glaces of entities",
  });
export { ft as default };
