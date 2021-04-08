// need to import mezr.js whenever this js file needs to be used.
/*!
 * mezr v0.6.2
 * https://github.com/niklasramo/mezr
 * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
 * Released under the MIT license
 */
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return e(t);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t))
    : (t.mezr = e(t));
})(this, function (t, e) {
  "use strict";
  function o(t, e) {
    return (e = (e && D[e]) || 4), O("width", t, e > 1, e > 2, e > 3, e > 4);
  }
  function n(t, e) {
    return (e = (e && D[e]) || 4), O("height", t, e > 1, e > 2, e > 3, e > 4);
  }
  function r(t, e) {
    if (Array.isArray(t) || (e && "string" != typeof e)) {
      var o = [].concat(t),
        n = [].concat(e),
        r = c(t) ? t : k(o[0], o[1]),
        i = c(e) ? e : k(n[0], n[1]);
      return { left: r.left - i.left, top: r.top - i.top };
    }
    return k(t, e);
  }
  function i(t, e) {
    if (Array.isArray(t) || (e && "string" != typeof e)) {
      var o = [].concat(t),
        n = [].concat(e),
        r = c(t) ? t : j(o[0], o[1]),
        i = c(e) ? e : k(n[0], n[1]);
      return (r.left = r.left - i.left), (r.top = r.top - i.top), r;
    }
    return j(t, e);
  }
  function f(t, e) {
    var o, n, r, i, f;
    if (t === N) return null;
    if (t === B) return N;
    var l = e || g(t, "position");
    if ("relative" === l) return t;
    if ("fixed" === l || "absolute" === l) {
      if ("fixed" === l && S.transformLeaksFixed) return B;
      if (((o = t === T ? N : t.parentElement || null), "fixed" === l)) {
        for (; o && o !== N && !h(o); ) o = o.parentElement || N;
        return o === N ? B : o;
      }
      for (; o && o !== N && "static" === g(o, "position") && !h(o); )
        o = o.parentElement || N;
      return o;
    }
    if ("sticky" === l || "-webkit-sticky" === l) {
      for (
        n = ["overflow", "overflow-y", "overflow-x"],
          r = t.parentNode,
          t = null;
        !t && r && r !== N;

      ) {
        for (f = 0; f < 3; f++)
          if ("auto" === (i = g(r, n[f])) || "scroll" === i) {
            t = r;
            break;
          }
        t || (r = r.parentNode);
      }
      return t || B;
    }
    return null;
  }
  function l(t, e) {
    var o = C(t),
      n = C(e);
    return w(o, n) ? -1 : x(o, n);
  }
  function a() {
    var t = w(arguments[0], arguments[1]);
    if (arguments.length > 2)
      for (var e = 2; e < arguments.length && (t = w(t, arguments[e])); ++e);
    return t;
  }
  function u(t, e) {
    var o = v(e, t);
    return { left: -o.left, right: -o.right, top: -o.top, bottom: -o.bottom };
  }
  function p(t) {
    var e,
      o,
      n,
      r = {},
      i = d([S.placeDefaultOptions, t || {}]),
      f = "string" == typeof i.position ? i.position.split(" ") : i.position,
      l = C(i.element, !0),
      a = C(i.target),
      u = c(i.contain),
      p = u && i.contain.within,
      h = u && R(i.contain.onOverflow),
      g = 0,
      m = 0,
      b = i.offsetX,
      w = i.offsetY;
    return (
      (b =
        "string" == typeof b && b.indexOf("%") > -1
          ? (s(b) / 100) * l.width
          : s(b)),
      (w =
        "string" == typeof w && w.indexOf("%") > -1
          ? (s(w) / 100) * l.height
          : s(w)),
      (r.left = A(f[0], f[2], a.width, a.left, l.width, l.left, b)),
      (r.top = A(f[1], f[3], a.height, a.top, l.height, l.top, w)),
      (l.left += r.left),
      (l.top += r.top),
      p &&
        h &&
        ((e = C(p)),
        (o = v(l, e)),
        (o.left < 0 || o.right < 0) && ((g = E(h, o)), (r.left += g)),
        (o.top < 0 || o.bottom < 0) && ((m = E(h, o, 1)), (r.top += m))),
      "function" == typeof i.adjust &&
        (0 !== g && ((l.left += g), (l.right = l.left + l.width)),
        0 !== m && ((l.top += m), (l.bottom = l.left + l.width)),
        (e = p ? e || C(p) : null),
        (n = c(i.element) ? i.element : k.apply(null, [].concat(i.element))),
        (o = e ? v(l, e) : null),
        i.adjust(r, {
          elementRect: l,
          targetRect: a,
          containerRect: e,
          shift: { left: l.left - n.left, top: l.top - n.top },
          overflow: o
            ? { left: -o.left, right: -o.right, top: -o.top, bottom: -o.bottom }
            : null,
          overflowCorrection: { left: g, top: m },
        })),
      r
    );
  }
  function c(t) {
    return (
      "object" == typeof t &&
      "[object Object]" === Object.prototype.toString.call(t)
    );
  }
  function h(t) {
    var e = g(t, S.transform.styleName),
      o = g(t, "display");
    return "none" !== e && "inline" !== o && "none" !== o;
  }
  function s(t) {
    return parseFloat(t) || 0;
  }
  function d(t) {
    for (var e, o, n = {}, r = 0, i = t.length; r < i; r++)
      for (e in t[r])
        t[r].hasOwnProperty(e) &&
          ((o = t[r][e]),
          (n[e] = c(o) ? d([o]) : Array.isArray(o) ? o.slice() : o));
    return n;
  }
  function g(t, e) {
    return B.getComputedStyle(t, null).getPropertyValue(e);
  }
  function m(t, e) {
    return s(g(t, e));
  }
  function b(t, e) {
    Object.keys(e).forEach(function (o) {
      t.style[o] = e[o];
    });
  }
  function v(t, e) {
    var o = C(t),
      n = C(e);
    return {
      left: o.left - n.left,
      right: n.left + n.width - (o.left + o.width),
      top: o.top - n.top,
      bottom: n.top + n.height - (o.top + o.height),
    };
  }
  function w(t, e) {
    var o = {},
      n = C(t),
      r = C(e),
      i = v(n, r),
      f = L(n.width + Y(i.left, 0) + Y(i.right, 0), 0),
      l = L(n.height + Y(i.top, 0) + Y(i.bottom, 0), 0),
      a = f > 0 && l > 0;
    return (
      a &&
        ((o.width = f),
        (o.height = l),
        (o.left = n.left + F(Y(i.left, 0))),
        (o.top = n.top + F(Y(i.top, 0))),
        (o.right = o.left + o.width),
        (o.bottom = o.top + o.height)),
      a ? o : null
    );
  }
  function y(t, e, o, n) {
    return Math.sqrt(Math.pow(o - t, 2) + Math.pow(n - e, 2));
  }
  function x(t, e) {
    var o = t.left,
      n = o + t.width,
      r = t.top,
      i = r + t.height,
      f = e.left,
      l = f + e.width,
      a = e.top,
      u = a + e.height;
    return (f > n || l < o) && (a > i || u < r)
      ? f > n
        ? u < r
          ? y(n, r, f, u)
          : y(n, i, f, a)
        : u < r
        ? y(o, r, l, u)
        : y(o, i, l, a)
      : u < r
      ? r - u
      : f > n
      ? f - n
      : a > i
      ? a - i
      : o - l;
  }
  function O(t, o, n, r, i, f) {
    var l,
      a,
      u,
      p,
      c,
      h,
      s,
      d = "height" === t,
      b = d ? "Height" : "Width",
      v = "inner" + b,
      w = "client" + b,
      y = "scroll" + b,
      x = 0;
    return (
      o.self === B.self
        ? (l = r ? B[v] : T[w])
        : o === N
        ? r
          ? ((x = B[v] - T[w]), (l = L(T[y] + x, X[y] + x, B[v])))
          : (l = L(T[y], X[y], T[w]))
        : ((a = d ? "top" : "left"),
          (u = d ? "bottom" : "right"),
          (l = (z || o.getBoundingClientRect())[t]),
          r ||
            (o === T
              ? (x = B[v] - T[w])
              : P.indexOf(g(o, "display")) < 0 &&
                ((p = m(o, "border-" + a + "-width")),
                (c = m(o, "border-" + u + "-width")),
                (x = Math.round(l) - (o[w] + p + c))),
            (l -= x > 0 ? x : 0)),
          n || ((l -= m(o, "padding-" + a)), (l -= m(o, "padding-" + u))),
          i ||
            ((l -= p !== e ? p : m(o, "border-" + a + "-width")),
            (l -= c !== e ? c : m(o, "border-" + u + "-width"))),
          f &&
            ((h = m(o, "margin-" + a)),
            (s = m(o, "margin-" + u)),
            (l += h > 0 ? h : 0),
            (l += s > 0 ? s : 0))),
      l > 0 ? l : 0
    );
  }
  function k(t, e) {
    var o = { left: 0, top: 0 };
    if (t === N) return o;
    if (
      ((o.left = B.pageXOffset || 0),
      (o.top = B.pageYOffset || 0),
      t.self === B.self)
    )
      return o;
    var n = z || t.getBoundingClientRect();
    if (((o.left += n.left), (o.top += n.top), 5 === (e = (e && D[e]) || 4))) {
      var r = m(t, "margin-left"),
        i = m(t, "margin-top");
      (o.left -= r > 0 ? r : 0), (o.top -= i > 0 ? i : 0);
    }
    return (
      e < 4 &&
        ((o.left += m(t, "border-left-width")),
        (o.top += m(t, "border-top-width"))),
      1 === e &&
        ((o.left += m(t, "padding-left")), (o.top += m(t, "padding-top"))),
      o
    );
  }
  function C(t, e) {
    return t ? (c(t) ? t : ((t = [].concat(t)), j(t[0], t[1], e))) : null;
  }
  function j(t, e, r) {
    var i,
      f = t !== N && t.self !== B.self;
    return (
      (e = e || "border"),
      r && (i = M(t, e)),
      f && (z = t.getBoundingClientRect()),
      r || (i = k(t, e)),
      (i.width = o(t, e)),
      (i.height = n(t, e)),
      (i.bottom = i.top + i.height),
      (i.right = i.left + i.width),
      f && (z = null),
      i
    );
  }
  function M(t, e) {
    if (((e = e || "border"), t === B || t === N)) return k(t, e);
    var o = g(t, "position"),
      n = "absolute" === o || "fixed" === o ? k(f(t) || N, "padding") : k(t, e);
    if ("relative" === o) {
      var r = g(t, "left"),
        i = g(t, "right"),
        l = g(t, "top"),
        a = g(t, "bottom");
      ("auto" === r && "auto" === i) || (n.left -= "auto" === r ? -s(i) : s(r)),
        ("auto" === l && "auto" === a) ||
          (n.top -= "auto" === l ? -s(a) : s(l));
    } else if ("absolute" === o || "fixed" === o) {
      e = D[e];
      var u = m(t, "margin-left"),
        p = m(t, "margin-top");
      5 === e && ((n.left -= F(Y(u, 0))), (n.top -= F(Y(p, 0)))),
        e < 5 && ((n.left += u), (n.top += p)),
        e < 4 &&
          ((n.left += m(t, "border-left-width")),
          (n.top += m(t, "border-top-width"))),
        1 === e &&
          ((n.left += m(t, "padding-left")), (n.top += m(t, "padding-top")));
    }
    return n;
  }
  function A(t, e, o, n, r, i, f) {
    var l = t.charAt(0) + e.charAt(0),
      a = n + f - i;
    return "ll" === l || "tt" === l
      ? a
      : "lc" === l || "tc" === l
      ? a + o / 2
      : "lr" === l || "tb" === l
      ? a + o
      : "cl" === l || "ct" === l
      ? a - r / 2
      : "cr" === l || "cb" === l
      ? a + o - r / 2
      : "rl" === l || "bt" === l
      ? a - r
      : "rc" === l || "bc" === l
      ? a - r + o / 2
      : "rr" === l || "bb" === l
      ? a - r + o
      : a + o / 2 - r / 2;
  }
  function E(t, e, o) {
    var n = 0,
      r = o ? "top" : "left",
      i = o ? "bottom" : "right",
      f = t[r],
      l = t[i],
      a = e[r],
      u = e[i],
      p = a + u;
    return (
      ("push" !== f && "forcepush" !== f) ||
      ("push" !== l && "forcepush" !== l) ||
      !(a < 0 || u < 0)
        ? ("forcepush" === f || "push" === f) && a < 0
          ? (n -= a)
          : ("forcepush" === l || "push" === l) && u < 0 && (n += u)
        : (a < u && (n -= p < 0 ? a + F(p / 2) : a),
          u < a && (n += p < 0 ? u + F(p / 2) : u),
          (a += n),
          (u -= n),
          "forcepush" === f && "forcepush" !== l && a < 0 && (n -= a),
          "forcepush" === l && "forcepush" !== f && u < 0 && (n += u)),
      n
    );
  }
  function R(t) {
    var e = typeof t,
      o = "none",
      n = "none",
      r = "none",
      i = "none";
    return (
      "string" === e
        ? (o = n = r = i = t)
        : "object" === e &&
          ((o = t.left || t.x || o),
          (n = t.right || t.x || n),
          (r = t.top || t.y || r),
          (i = t.bottom || t.y || i)),
      "none" !== o || "none" !== n || "none" !== r || "none" !== i
        ? { left: o, right: n, top: r, bottom: i }
        : null
    );
  }
  var B = t.document && t.self === t.document.defaultView ? t : window,
    N = B.document,
    T = N.documentElement,
    X = N.body;
  if (!X) throw Error("Mezr needs access to body element.");
  var z,
    F = Math.abs,
    L = Math.max,
    Y = Math.min,
    D = { content: 1, padding: 2, scroll: 3, border: 4, margin: 5 },
    P = ["inline", "table-column", "table-column-group"],
    S = {};
  return (
    (S.placeDefaultOptions = {
      element: null,
      target: null,
      position: "left top left top",
      offsetX: 0,
      offsetY: 0,
      contain: null,
      adjust: null,
    }),
    (S.transform = (function () {
      for (
        var t = [
            "transform",
            "WebkitTransform",
            "MozTransform",
            "OTransform",
            "msTransform",
          ],
          o = 0;
        o < t.length;
        o++
      )
        if (T.style[t[o]] !== e) {
          var n = t[o],
            r = n.toLowerCase().split("transform")[0];
          return {
            prefix: r,
            propName: n,
            styleName: r ? "-" + r + "-transform" : n,
          };
        }
      return null;
    })()),
    (S.transformLeaksFixed = (function () {
      if (!S.transform) return !0;
      var t,
        e,
        o = N.createElement("div"),
        n = N.createElement("div");
      return (
        b(o, {
          display: "block",
          visibility: "hidden",
          position: "absolute",
          width: "1px",
          height: "1px",
          left: "1px",
          top: "0",
          margin: "0",
        }),
        b(n, {
          display: "block",
          position: "fixed",
          width: "1px",
          height: "1px",
          left: "0",
          top: "0",
          margin: "0",
        }),
        o.appendChild(n),
        X.appendChild(o),
        (t = n.getBoundingClientRect().left),
        (o.style[S.transform.propName] = "translateX(0)"),
        (e = n.getBoundingClientRect().left),
        X.removeChild(o),
        e === t
      );
    })()),
    {
      width: o,
      height: n,
      offset: r,
      rect: i,
      containingBlock: f,
      distance: l,
      intersection: a,
      overflow: u,
      place: p,
      _settings: S,
    }
  );
});
// references:
//stackoverflow.com/questions/17628456/measure-distance-between-two-html-elements-centers

document.addEventListener("DOMContentLoaded", function handleDOMLoaded() {
  console.log("anaylitics test");
  const adContainerWithNearestImageData = [];
  // const coordinates = window.$sf.ext.geom;
  // debugger;
  const currentUrl = window.location.href;
  
  // const adContainerEl = document.createElement("div");
  // document.body.appendChild(adContainerEl);

  const adContainerEl = window.frameElement;
  console.log(window.top.document.images);

  // TO DO throw error if image selector not present
  var imageCollection = window.top.document.images;
  for (var i = 0; i < imageCollection.length; i++) {
    const imageEl = imageCollection[i];
    const imgElSrc = imageCollection[i].src;
    const distance = mezr.distance(adContainerEl, imageEl);
    const imageData = {
      imageSrc: imgElSrc,
      distance: distance,
      imageEl: imageEl,
    };
    adContainerWithNearestImageData.push(imageData);
  }

  const nearestImageData = adContainerWithNearestImageData.reduce(function (
    prev,
    curr
  ) {
    return prev.distance < curr.distance ? prev : curr;
  });
  console.log(nearestImageData);
});