// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/initialiser.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorWinLane = exports.SquareInsides = void 0;
var SquareInsides = /*#__PURE__*/function () {
  function SquareInsides() {
    _classCallCheck(this, SquareInsides);
    this.colors = "";
    this.elements = 0;
    this.powerUp = null;
  }
  _createClass(SquareInsides, [{
    key: "addPawn",
    value: function addPawn(color) {
      this.elements++;
      this.colors = color;
    }
  }, {
    key: "removePawn",
    value: function removePawn(idx) {
      // RemoveChildFromAnElement(playableSquares[idx])
      // * TODO: CONSIDER PUTTING IT HERE
      if (this.elements) {
        this.elements--;
      }
      if (this.elements <= 0) {
        this.colors = "";
      }
    }
  }]);
  return SquareInsides;
}();
exports.SquareInsides = SquareInsides;
function WinLaneConstructor(color) {
  var arr = Array.from(document.querySelectorAll("[data-win".concat(color, "]")));
  arr.sort(function (a, b) {
    return parseInt(a["dataset"]["win".concat(color)]) - parseInt(b["dataset"]["win".concat(color)]);
  });
  return arr;
}
function ColorWinLane() {
  return {
    red: WinLaneConstructor("red"),
    blue: WinLaneConstructor("blue"),
    green: WinLaneConstructor("green"),
    yellow: WinLaneConstructor("yellow")
  };
}
exports.ColorWinLane = ColorWinLane;
},{}],"src/js/dices.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurnOnDice = void 0;
var dices = document.querySelectorAll(".dice-throw>i");
dices[0].style.visibility = "visible";
function TurnOnDice(i) {
  dices.forEach(function (e) {
    e.style.visibility = "hidden";
  });
  dices[i - 1].style.visibility = "visible";
}
exports.TurnOnDice = TurnOnDice;
},{}],"src/js/clickables.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialiser_1 = require("./initialiser");
var dices_1 = require("./dices");
var colors = ["red", "blue", "green", "yellow"];
var diceThrow = 0;
var roadToWin = 39;
var colorOrder = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red"
};
var playerColor = "red";
var moveCount = 0;
// #region
var boardHistory = document.querySelector(".board-history-table>tbody");
var playableSquares = Array.from(document.querySelectorAll(".square[data-index]")).sort(function (a, b) {
  return parseInt(a.dataset.index) - parseInt(b.dataset.index);
});
var boardPlayArray = new Array(40);
for (var i = 0; i < playableSquares.length; i++) {
  boardPlayArray[i] = new initialiser_1.SquareInsides();
}
var colorWin = document.querySelector(".black");
var playerColorShow = document.querySelector(".player");
var colorWinLane = (0, initialiser_1.ColorWinLane)();
var colorLaneArray = {
  red: new Array(4).fill(""),
  green: new Array(4).fill(""),
  yellow: new Array(4).fill(""),
  blue: new Array(4).fill("")
};
var colorEnd = {
  red: document.querySelector("[data-end=red]").dataset.index,
  blue: document.querySelector("[data-end=blue]").dataset.index,
  yellow: document.querySelector("[data-end=yellow]").dataset.index,
  green: document.querySelector("[data-end=green]").dataset.index
};
var colorStart = {
  red: document.querySelector(".red-light").dataset.index,
  blue: document.querySelector(".blue-light").dataset.index,
  yellow: document.querySelector(".yellow-light").dataset.index,
  green: document.querySelector(".green-light").dataset.index
};
var colorPawnsSpawn = {
  red: document.querySelector("#pawns-red"),
  blue: document.querySelector("#pawns-blue"),
  yellow: document.querySelector("#pawns-yellow"),
  green: document.querySelector("#pawns-green")
};
var colorFinishedPawns = {
  red: document.querySelector(".finished-pawns-red"),
  green: document.querySelector(".finished-pawns-green"),
  blue: document.querySelector(".finished-pawns-blue"),
  yellow: document.querySelector(".finished-pawns-yellow")
};
var placePawn = document.querySelector(".place-pawn");
var placeSkip = document.querySelector(".place-skip");
var placeInfo = document.querySelector(".game-info");
var dice = document.querySelector(".dice");
var diceText = document.querySelector(".dice-before-text");
var diceReady = true;
var pickPawn = false;
var colorPawn = {
  red: Array.from(document.querySelectorAll("[data-pawn=red]")),
  blue: Array.from(document.querySelectorAll("[data-pawn=blue]")),
  green: Array.from(document.querySelectorAll("[data-pawn=green]")),
  yellow: Array.from(document.querySelectorAll("[data-pawn=yellow]"))
};
function TogglePawnAndDice() {
  diceReady = !diceReady;
  pickPawn = !pickPawn;
  if (diceReady) {
    diceText.innerText = "Ready";
  } else {
    diceText.innerText = "Not Ready";
  }
  if (diceReady) {
    console.log(diceReady);
    dice.focus();
  }
}
function NextIdx(currIdx) {
  return (currIdx + diceThrow) % boardPlayArray.length;
}
function CheckAndHandleWin(color) {
  var _a, _b;
  if (((_a = colorFinishedPawns[color]) === null || _a === void 0 ? void 0 : _a.childElementCount) === 4) {
    console.log("WIN");
    (_b = document.querySelector(".win-screen")) === null || _b === void 0 ? void 0 : _b.classList.remove("display-none");
    diceReady = false;
    pickPawn = false;
  }
}
function PawnHandler(color_) {
  return function HOHandler(e) {
    var _a;
    if (playerColor == color_ && pickPawn) {
      var dataSetIndex = this.parentElement.dataset["win".concat(color_)];
      if (dataSetIndex !== undefined) {
        if (this.parentElement) {
          var removedPawn = this.parentElement.removeChild(this);
          if (parseInt(dataSetIndex) + diceThrow > 3) {
            this.removeEventListener("click", HOHandler);
            (_a = colorFinishedPawns[color_]) === null || _a === void 0 ? void 0 : _a.appendChild(removedPawn);
            CheckAndHandleWin(color_);
          } else {
            colorWinLane[color_][parseInt(dataSetIndex) + diceThrow].appendChild(removedPawn);
          }
        }
        TogglePawnAndDice();
        return;
      }
      var idx = parseInt(this.parentElement.dataset.index);
      var nextIdx = NextIdx(idx);
      if (SwitchToLane(idx, nextIdx, color_)) {
        console.log("lane");
        BoardCleanUp(idx, idx, color_, this, true);
        TogglePawnAndDice();
        return;
      }
      BoardCleanUp(idx, nextIdx, color_, this);
      TogglePawnAndDice();
      console.log(playableSquares);
      console.log(boardPlayArray);
    }
  };
  // ! TODO: ADD HISTORY APPEND
}

function BoardCleanUp(currIdx) {
  var nextIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currIdx;
  var color = arguments.length > 2 ? arguments[2] : undefined;
  var pawnElement = arguments.length > 3 ? arguments[3] : undefined;
  var winLane = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (winLane) {
    boardPlayArray[currIdx].removePawn(0);
    var steps = currIdx - parseInt(colorEnd[color]) + diceThrow;
    if (steps > 4) {
      if (pawnElement.parentElement) {
        colorWin.appendChild(RemoveChildFromAnElement(pawnElement.parentElement));
      } else {
        console.log("SOMETHING HAS GONE HORRIBLY WRONG");
      }
    }
    if (pawnElement.parentElement) {
      colorWinLane[color][steps].appendChild(RemoveChildFromAnElement(pawnElement.parentElement));
    } else {
      console.log("SOMETHING HAS GONE HORRIBLY WRONG_2");
    }
    return;
  }
  boardPlayArray[currIdx].removePawn(0);
  boardPlayArray[nextIdx].addPawn(color);
  if (pawnElement.parentElement) {
    playableSquares[nextIdx].appendChild(RemoveChildFromAnElement(pawnElement.parentElement));
  } else {
    console.log("no parent");
  }
}
// TODO: FIX IT SO WE HAVE A NICE FUNCTION THAT CHECKS FOR THE PARENT
function SwitchToLane(currIdx, nextIdx, color) {
  // * TODO: make it pretty maybe
  if (nextIdx > parseInt(colorEnd[color]) && currIdx < parseInt(colorEnd[color])) {
    return true;
  } else {
    return false;
  }
}
function SpawnCallback(colorSpawn, color) {
  return function (e) {
    if (pickPawn && diceThrow === 6 && colorSpawn.childElementCount > 0 && playerColor == color) {
      var removedPawnFromSpawn = colorSpawn.removeChild(colorSpawn.firstElementChild);
      var startIndex = parseInt(colorStart[playerColor]);
      removedPawnFromSpawn.addEventListener("click", PawnHandler(color));
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      TogglePawnAndDice();
    } else {
      console.log("YOU CANT PICK A PAWN WITHOUT A 6");
    }
  };
}
for (var _i = 0, _colors = colors; _i < _colors.length; _i++) {
  var color = _colors[_i];
  var colorSpawn = colorPawnsSpawn[color];
  colorSpawn.addEventListener("click", SpawnCallback(colorSpawn, color));
}
dice.addEventListener("click", function (e) {
  if (diceReady) {
    diceThrow = 6; //! PLACE FOR THE CHANGE OF DICE THROW
    AppendBoardHistory();
    (0, dices_1.TurnOnDice)(diceThrow);
    TogglePawnAndDice();
  } else {
    console.log("YOU ARE NOT SUPPOSED TO THROW THE DICE YET");
  }
  this.focus();
});
function RemoveChildFromAnElement(parent) {
  return parent.removeChild(parent.firstElementChild);
}
function AppendBoardHistory() {
  moveCount++;
  var tableRow = document.createElement("tr");
  tableRow.innerHTML = "<td>".concat(moveCount, "</td><td style=\"--player-color:").concat(playerColor, "\">").concat(playerColor, "</td><td>").concat(diceThrow, "</td>");
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRow);
  } else {
    boardHistory.insertBefore(tableRow, boardHistory.children[0]);
  }
}
},{"./initialiser":"src/js/initialiser.ts","./dices":"src/js/dices.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62565" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/clickables.ts"], null)
//# sourceMappingURL=/clickables.832794a0.js.map