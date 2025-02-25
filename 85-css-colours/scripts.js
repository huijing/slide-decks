"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var slideCount = document.querySelectorAll('section').length;

var controls = function controls(event) {
  var isCover = window.location.hash === '' || window.location.hash === '#start';

  if (isCover) {
    start(event);
  } else {
    navigate(event);
  }
};

var start = function start(event) {
  if (event.code === 'Space' || event.code === 'ArrowRight' || event.code === 'Period') {
    window.location.hash = '#slide1';
  }
};

var navigate = function navigate(event) {
  var isFirstSlide = window.location.hash === '#slide1';
  var isLastSlide = window.location.hash === '#slide' + (slideCount - 1);
  var activeSlide = document.querySelector('[id^="slide"]:target');
  var slideNum = parseInt(activeSlide.getAttribute('id').substring(5));

  if (activeSlide && !isLastSlide && (event.code === 'Space' || event.code === 'ArrowRight' || event.code === 'PageDown')) {
    window.location.hash = 'slide' + (slideNum + 1);
  }

  if (!isFirstSlide && (event.code === 'ArrowLeft' || event.code === 'PageUp')) {
    window.location.hash = 'slide' + (slideNum - 1);
  }

  if (isLastSlide && event.code === 'KeyR') {
    window.location.hash = '#start';
  }

  if (activeSlide && event.code === 'Period') {
    var winHash = window.location.hash;
    var activeList = document.querySelector(winHash + ' .revealable');

    if (activeList) {
      var listArray = _toConsumableArray(document.querySelectorAll(winHash + ' .revealable .fragment'));

      if (listArray[0]) {
        listArray[0].classList.remove('fragment');
      }
    }
  }

  if (activeSlide && event.code === 'Comma') {
    var _winHash = window.location.hash;

    var _activeList = document.querySelector(_winHash + ' .revealable');

    if (_activeList) {
      var _listArray = _toConsumableArray(document.querySelectorAll(_winHash + ' .revealable li'));

      var hideList = _listArray.forEach(function (list) {
        list.classList.add('fragment');
      });

      return hideList;
    }
  }
};

var launchFullscreen = function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

var toggleFullScreen = function toggleFullScreen(event) {
  if (event.code === 'KeyF') {
    launchFullscreen(document.documentElement);
  }
};

document.body.addEventListener('keydown', controls, false);
document.addEventListener('keydown', toggleFullScreen, false);
var root = document.documentElement;
var colourInput = document.getElementById('colour');
var hexCode = document.getElementById('hexCode');
var hexDigits = document.querySelectorAll('[data-digit]');
var hexValues = document.querySelectorAll('[data-value]');
colourInput.addEventListener('input', function () {
  setRgb(colourInput.value);
  var hexChars = colourInput.value.substring(1).split('');
  hexCode.innerHTML = '';

  for (var i = 0; i < hexValues.length; i++) {
    hexValues[i].classList.remove('active');
  }

  hexChars.forEach(printHex);
  hexChars.forEach(getCharacter);
  hexCode.insertAdjacentHTML('afterbegin', '<span>#</span>');
}, false);

function setRgb(hex) {
  var tempHex = hex.replace('#', '');
  var r = parseInt(tempHex.substring(0, 2), 16);
  var g = parseInt(tempHex.substring(2, 4), 16);
  var b = parseInt(tempHex.substring(4, 6), 16);
  root.style.setProperty('--r', r);
  root.style.setProperty('--g', g);
  root.style.setProperty('--b', b);
}

function printHex(item, index, array) {
  hexCode.innerHTML += '<span>' + item + '</span>';
}

function getCharacter(item, index, array) {
  var set = hexDigits[index];
  var value = set.querySelector('[data-value="' + item + '"]');
  value.classList.add('active');
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var gamepadConnected = ('ongamepadconnected' in window);
var controllers = {};
var gamepadLand;
var buttonsCache = [];
var buttonsStatus = []; // Mapping is subject to change
// Turn on debugger function to check

var leftJoyConMapping = {
  0: 'Left',
  1: 'Down',
  2: 'Up',
  3: 'Right',
  4: 'LSL',
  5: 'LSR',
  8: 'Minus',
  10: 'LStick',
  13: 'Capture',
  14: 'L',
  15: 'ZL'
};

if (!gamepadConnected) {
  setInterval(pollGamepads, 500);
}

var pollGamepads = function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];

  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addGamepad(gamepads[i]);
      }
    }
  }
};

var addGamepad = function addGamepad(gamepad) {
  console.log(gamepad);
  window.location.hash = '#start';
  controllers[gamepad.index] = gamepad;
  var d = document.createElement('aside');
  d.className = 'controllers';
  var p = document.createElement('span');
  p.innerHTML = '🕹';
  p.setAttribute('id', 'controller' + gamepad.index);
  d.appendChild(p);
  document.body.appendChild(d);
  gamepadLand = requestAnimationFrame(updateStatus);
};

var updateStatus = function updateStatus() {
  if (!gamepadConnected) {
    pollGamepads();
  }

  for (var j in controllers) {
    var controller = controllers[j];
    var buttonsArray = controller.buttons;

    for (var i = 0; i < buttonsArray.length; i++) {
      if (buttonPressed(buttonsArray[i])) {
        mappingDebugger(i);
        var isCover = window.location.hash === '' || window.location.hash === '#start';
        var isFirstSlide = window.location.hash === '#slide1';
        var isLastSlide = window.location.hash === '#slide' + (slideCount - 1);

        if (isCover) {
          window.location.hash = '#slide1';
        } else {
          var activeSlide = document.querySelector('[id^="slide"]:target');
          var slideNum = parseInt(activeSlide.getAttribute('id').substring(5));

          switch (leftJoyConMapping[i]) {
            case 'Left':
              if (!isFirstSlide) {
                window.location.hash = 'slide' + (slideNum - 1);
              }

              break;

            case 'Right':
              if (activeSlide && !isLastSlide) {
                console.log(slideNum);
                window.location.hash = 'slide' + (slideNum + 1);
              }

              break;

            case 'Up':
              break;

            case 'Down':
              break;

            case 'Minus':
              if (isLastSlide) {
                window.location.hash = '#slide1';
              }

              break;

            case 'L':
              launchFullscreen(document.documentElement);
              break;

            case 'ZL':
              exitFullscreen();
              break;

            default:
              console.log('The mapping is probably off. Turn on debugger to check. ¯\\\_(ツ)_/¯');
          }
        }
      }
    }
  }

  gamepadLand = setTimeout(function () {
    return requestAnimationFrame(updateStatus);
  }, 200);
};

var buttonPressed = function buttonPressed(key) {
  if (_typeof(key) == 'object') {
    return key.pressed;
  }

  return false;
};

var mappingDebugger = function mappingDebugger(index) {
  console.log('Did you press ' + leftJoyConMapping[index] + '? If you see "Undefined", the mapping is off. Index position of pressed button is ' + index);
};

var connectHandler = function connectHandler(event) {
  addGamepad(event.gamepad);
};

var disconnectHandler = function disconnectHandler(event) {
  removeGamepad(event.gamepad);
};

var removeGamepad = function removeGamepad(gamepad) {
  var d = document.getElementById('controller' + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
  cancelAnimationFrame(gamepadLand);
};

var exitFullscreen = function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

window.addEventListener("gamepadconnected", connectHandler);
window.addEventListener("gamepaddisconnected", disconnectHandler);
"use strict";

/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (u) {
  var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
    manual: u.Prism && u.Prism.manual,
    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof _ ? new _(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function type(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", {
          value: ++n
        }), e.__id;
      },
      clone: function t(e, r) {
        var a,
            n,
            l = C.util.type(e);

        switch (r = r || {}, l) {
          case "Object":
            if (n = C.util.objId(e), r[n]) return r[n];

            for (var i in a = {}, r[n] = a, e) {
              e.hasOwnProperty(i) && (a[i] = t(e[i], r));
            }

            return a;

          case "Array":
            return n = C.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function (e, n) {
              a[n] = t(e, r);
            }), a);

          default:
            return e;
        }
      },
      getLanguage: function getLanguage(e) {
        for (; e && !c.test(e.className);) {
          e = e.parentElement;
        }

        return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none";
      },
      currentScript: function currentScript() {
        if ("undefined" == typeof document) return null;
        if ("currentScript" in document) return document.currentScript;

        try {
          throw new Error();
        } catch (e) {
          var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];

          if (n) {
            var t = document.getElementsByTagName("script");

            for (var r in t) {
              if (t[r].src == n) return t[r];
            }
          }

          return null;
        }
      }
    },
    languages: {
      extend: function extend(e, n) {
        var t = C.util.clone(C.languages[e]);

        for (var r in n) {
          t[r] = n[r];
        }

        return t;
      },
      insertBefore: function insertBefore(t, e, n, r) {
        var a = (r = r || C.languages)[t],
            l = {};

        for (var i in a) {
          if (a.hasOwnProperty(i)) {
            if (i == e) for (var o in n) {
              n.hasOwnProperty(o) && (l[o] = n[o]);
            }
            n.hasOwnProperty(i) || (l[i] = a[i]);
          }
        }

        var s = r[t];
        return r[t] = l, C.languages.DFS(C.languages, function (e, n) {
          n === s && e != t && (this[e] = l);
        }), l;
      },
      DFS: function e(n, t, r, a) {
        a = a || {};
        var l = C.util.objId;

        for (var i in n) {
          if (n.hasOwnProperty(i)) {
            t.call(n, i, n[i], r || i);
            var o = n[i],
                s = C.util.type(o);
            "Object" !== s || a[l(o)] ? "Array" !== s || a[l(o)] || (a[l(o)] = !0, e(o, t, i, a)) : (a[l(o)] = !0, e(o, t, null, a));
          }
        }
      }
    },
    plugins: {},
    highlightAll: function highlightAll(e, n) {
      C.highlightAllUnder(document, e, n);
    },
    highlightAllUnder: function highlightAllUnder(e, n, t) {
      var r = {
        callback: t,
        container: e,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      C.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), C.hooks.run("before-all-elements-highlight", r);

      for (var a, l = 0; a = r.elements[l++];) {
        C.highlightElement(a, !0 === n, r.callback);
      }
    },
    highlightElement: function highlightElement(e, n, t) {
      var r = C.util.getLanguage(e),
          a = C.languages[r];
      e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
      var l = e.parentNode;
      l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
      var i = {
        element: e,
        language: r,
        grammar: a,
        code: e.textContent
      };

      function o(e) {
        i.highlightedCode = e, C.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, C.hooks.run("after-highlight", i), C.hooks.run("complete", i), t && t.call(i.element);
      }

      if (C.hooks.run("before-sanity-check", i), !i.code) return C.hooks.run("complete", i), void (t && t.call(i.element));
      if (C.hooks.run("before-highlight", i), i.grammar) {
        if (n && u.Worker) {
          var s = new Worker(C.filename);
          s.onmessage = function (e) {
            o(e.data);
          }, s.postMessage(JSON.stringify({
            language: i.language,
            code: i.code,
            immediateClose: !0
          }));
        } else o(C.highlight(i.code, i.grammar, i.language));
      } else o(C.util.encode(i.code));
    },
    highlight: function highlight(e, n, t) {
      var r = {
        code: e,
        grammar: n,
        language: t
      };
      return C.hooks.run("before-tokenize", r), r.tokens = C.tokenize(r.code, r.grammar), C.hooks.run("after-tokenize", r), _.stringify(C.util.encode(r.tokens), r.language);
    },
    tokenize: function tokenize(e, n) {
      var t = n.rest;

      if (t) {
        for (var r in t) {
          n[r] = t[r];
        }

        delete n.rest;
      }

      var a = new l();
      return M(a, a.head, e), function e(n, t, r, a, l, i, o) {
        for (var s in r) {
          if (r.hasOwnProperty(s) && r[s]) {
            var u = r[s];
            u = Array.isArray(u) ? u : [u];

            for (var c = 0; c < u.length; ++c) {
              if (o && o == s + "," + c) return;
              var g = u[c],
                  f = g.inside,
                  h = !!g.lookbehind,
                  d = !!g.greedy,
                  v = 0,
                  p = g.alias;

              if (d && !g.pattern.global) {
                var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                g.pattern = RegExp(g.pattern.source, m + "g");
              }

              g = g.pattern || g;

              for (var y = a.next, k = l; y !== t.tail; k += y.value.length, y = y.next) {
                var b = y.value;
                if (t.length > n.length) return;

                if (!(b instanceof _)) {
                  var x = 1;

                  if (d && y != t.tail.prev) {
                    g.lastIndex = k;
                    var w = g.exec(n);
                    if (!w) break;
                    var A = w.index + (h && w[1] ? w[1].length : 0),
                        P = w.index + w[0].length,
                        S = k;

                    for (S += y.value.length; S <= A;) {
                      y = y.next, S += y.value.length;
                    }

                    if (S -= y.value.length, k = S, y.value instanceof _) continue;

                    for (var O = y; O !== t.tail && (S < P || "string" == typeof O.value && !O.prev.value.greedy); O = O.next) {
                      x++, S += O.value.length;
                    }

                    x--, b = n.slice(k, S), w.index -= k;
                  } else {
                    g.lastIndex = 0;
                    var w = g.exec(b);
                  }

                  if (w) {
                    h && (v = w[1] ? w[1].length : 0);
                    var A = w.index + v,
                        w = w[0].slice(v),
                        P = A + w.length,
                        E = b.slice(0, A),
                        N = b.slice(P),
                        j = y.prev;
                    E && (j = M(t, j, E), k += E.length), W(t, j, x);
                    var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d);
                    if (y = M(t, j, L), N && M(t, y, N), 1 < x && e(n, t, r, y.prev, k, !0, s + "," + c), i) break;
                  } else if (i) break;
                }
              }
            }
          }
        }
      }(e, a, n, a.head, 0), function (e) {
        var n = [],
            t = e.head.next;

        for (; t !== e.tail;) {
          n.push(t.value), t = t.next;
        }

        return n;
      }(a);
    },
    hooks: {
      all: {},
      add: function add(e, n) {
        var t = C.hooks.all;
        t[e] = t[e] || [], t[e].push(n);
      },
      run: function run(e, n) {
        var t = C.hooks.all[e];
        if (t && t.length) for (var r, a = 0; r = t[a++];) {
          r(n);
        }
      }
    },
    Token: _
  };

  function _(e, n, t, r, a) {
    this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length, this.greedy = !!a;
  }

  function l() {
    var e = {
      value: null,
      prev: null,
      next: null
    },
        n = {
      value: null,
      prev: e,
      next: null
    };
    e.next = n, this.head = e, this.tail = n, this.length = 0;
  }

  function M(e, n, t) {
    var r = n.next,
        a = {
      value: t,
      prev: n,
      next: r
    };
    return n.next = a, r.prev = a, e.length++, a;
  }

  function W(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) {
      r = r.next;
    }

    (n.next = r).prev = n, e.length -= a;
  }

  if (u.Prism = C, _.stringify = function n(e, t) {
    if ("string" == typeof e) return e;

    if (Array.isArray(e)) {
      var r = "";
      return e.forEach(function (e) {
        r += n(e, t);
      }), r;
    }

    var a = {
      type: e.type,
      content: n(e.content, t),
      tag: "span",
      classes: ["token", e.type],
      attributes: {},
      language: t
    },
        l = e.alias;
    l && (Array.isArray(l) ? Array.prototype.push.apply(a.classes, l) : a.classes.push(l)), C.hooks.run("wrap", a);
    var i = "";

    for (var o in a.attributes) {
      i += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
    }

    return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + i + ">" + a.content + "</" + a.tag + ">";
  }, !u.document) return u.addEventListener && (C.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
    var n = JSON.parse(e.data),
        t = n.language,
        r = n.code,
        a = n.immediateClose;
    u.postMessage(C.highlight(r, C.languages[t], t)), a && u.close();
  }, !1)), C;
  var e = C.util.currentScript();

  function t() {
    C.manual || C.highlightAll();
  }

  if (e && (C.filename = e.src, e.hasAttribute("data-manual") && (C.manual = !0)), !C.manual) {
    var r = document.readyState;
    "loading" === r || "interactive" === r && e && e.defer ? document.addEventListener("DOMContentLoaded", t) : window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.setTimeout(t, 16);
  }

  return C;
}(_self);

"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: !0
      },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/
    }
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{
            pattern: /^=/,
            alias: "attr-equals"
          }, /"|'/]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: [{
    pattern: /&[\da-z]{1,8};/i,
    alias: "named-entity"
  }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function value(a, e) {
    var s = {};
    s["language-" + e] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: !0,
      inside: Prism.languages[e]
    }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
    var n = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: s
      }
    };
    n["language-" + e] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[e]
    };
    var t = {};
    t[a] = {
      pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
        return a;
      }), "i"),
      lookbehind: !0,
      greedy: !0,
      inside: n
    }, Prism.languages.insertBefore("markup", "cdata", t);
  }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
!function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        }
      }
    },
    url: {
      pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
      greedy: !0,
      inside: {
        "function": /^url/i,
        punctuation: /^\(|\)$/
      }
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
    string: {
      pattern: e,
      greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }, s.languages.css.atrule.inside.rest = s.languages.css;
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
      inside: {
        "attr-name": {
          pattern: /^\s*style/i,
          inside: t.tag.inside
        },
        punctuation: /^\s*=\s*['"]|['"]\s*$/,
        "attr-value": {
          pattern: /.+/i,
          inside: s.languages.css
        }
      },
      alias: "language-css"
    }
  }, t.tag));
}(Prism);
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(?:true|false)\b/,
  "function": /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
    lookbehind: !0
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: !0
  }],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  "function": /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: !0,
    greedy: !0
  },
  "function-variable": {
    pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: "function"
  },
  parameter: [{
    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: !0,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript;