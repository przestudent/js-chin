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
exports.ClearBoardHistory = exports.AppendBoardHistory = exports.ColorWinLane = exports.TurnOnDice = exports.SquareInsides = void 0;
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
var dices = document.querySelectorAll(".dice-throw>i");
dices[0].style.visibility = "visible";
function TurnOnDice(i) {
  dices.forEach(function (e) {
    e.style.visibility = "hidden";
  });
  dices[i - 1].style.visibility = "visible";
}
exports.TurnOnDice = TurnOnDice;
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
var moveCount = 0;
var boardHistory = document.querySelector(".board-history-table>tbody");
function AppendBoardHistory(color, diceThrow) {
  moveCount++;
  var tableRow = document.createElement("tr");
  tableRow.innerHTML = "<td>".concat(moveCount, "</td><td style=\"--player-color:").concat(color, "\">").concat(color, "</td><td>").concat(diceThrow, "</td>");
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRow);
  } else {
    boardHistory.insertBefore(tableRow, boardHistory.children[0]);
  }
}
exports.AppendBoardHistory = AppendBoardHistory;
function ClearBoardHistory() {
  boardHistory.innerHTML = "";
  moveCount = 0;
}
exports.ClearBoardHistory = ClearBoardHistory;
},{}],"src/js/clickables.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _a, _b;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialiser_1 = require("./initialiser");
var colors = ["red", "blue", "green", "yellow"];
var roadToWin = 39;
var colorOrder = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red"
};
var initDiceThrow = 6;
var diceThrow = initDiceThrow;
var initColor = "red";
var playerColor = initColor;
// #region
var playableSquares = Array.from(document.querySelectorAll(".square[data-index]")).sort(function (a, b) {
  return parseInt(a.dataset.index) - parseInt(b.dataset.index);
});
// const boardPlayArray = new Array<SquareInsides>(40);
// for (let i = 0; i < playableSquares.length; i++) {
//   boardPlayArray[i] = new SquareInsides();
// }
var colorWin = document.querySelector(".black");
var playerColorShow = document.querySelector(".player");
var colorWinLane = (0, initialiser_1.ColorWinLane)();
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
(_a = document.querySelector("#win-modal")) === null || _a === void 0 ? void 0 : _a.showModal();
var buttonRestart = document.querySelector(".button-restart");
buttonRestart.addEventListener("click", KillAllPawns);
var dice = document.querySelector(".dice");
var diceText = document.querySelector(".dice-before-text");
var winModal = document.querySelector("#win-modal");
(_b = document.querySelector(".close-modal")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", ModalCloser);
buttonRestart.addEventListener("click", ModalCloser);
function ModalCloser() {
  winModal.close();
}
var diceReady = true;
var pickPawn = false;
// #endregion
function TogglePawnAndDice() {
  diceReady = !diceReady;
  pickPawn = !pickPawn;
  if (diceReady) {
    diceText.innerText = "Ready";
  } else {
    diceText.innerText = "Not Ready";
  }
  if (diceReady) {
    dice.focus();
  }
}
function NextIdx(currIdx) {
  return (currIdx + diceThrow) % playableSquares.length;
}
function CheckAndHandleWin(color) {
  var _a, _b;
  if (((_a = colorFinishedPawns[color]) === null || _a === void 0 ? void 0 : _a.childElementCount) === 1) {
    console.log("WIN");
    dice.removeEventListener("click", DiceClick);
    (_b = document.querySelector(".win-screen")) === null || _b === void 0 ? void 0 : _b.classList.remove("display-none");
    buttonRestart.focus();
    diceReady = false;
    pickPawn = false;
  }
}
function PawnHandler(color_) {
  return function HOHandler(e) {
    var _a;
    // * Check if we can move the pawn
    if (playerColor == color_ && pickPawn) {
      var dataSetIndex = this.parentElement.dataset["win".concat(color_)];
      // * Check if we are on the lane and if we win
      playerColor = colorOrder[color_];
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
      // * We are not on lane
      var idx = parseInt(this.parentElement.dataset.index);
      var nextIdx = NextIdx(idx);
      if (SwitchToLane(idx, nextIdx, color_)) {
        console.log("lane");
        BoardCleanUp(idx, idx, color_, this, true);
        TogglePawnAndDice();
        return;
      }
      // * we are on the board
      BoardCleanUp(idx, nextIdx, color_, this);
      TogglePawnAndDice();
      //console.log(playableSquares);
      //console.log(boardPlayArray);
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
    //boardPlayArray[currIdx].removePawn(0);
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
  //boardPlayArray[currIdx].removePawn(0);
  //boardPlayArray[nextIdx].addPawn(color);
  // ! we need to kill pawns
  if (pawnElement.parentElement) {
    var movedPawn = RemoveChildFromAnElement(pawnElement.parentElement);
    playableSquares[nextIdx].appendChild(movedPawn);
    CheckAndKillEnemyPawns(nextIdx, color);
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
      var removedPawnFromSpawn = colorSpawn.removeChild(colorSpawn.lastElementChild);
      var startIndex = parseInt(colorStart[playerColor]);
      removedPawnFromSpawn.addEventListener("click", PawnHandler(color));
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      CheckAndKillEnemyPawns(startIndex, color);
      TogglePawnAndDice();
    } else {
      console.log("you gavbe to throw 6 to move");
    }
  };
}
for (var _i = 0, _colors = colors; _i < _colors.length; _i++) {
  var color = _colors[_i];
  var colorSpawn = colorPawnsSpawn[color];
  colorSpawn.addEventListener("click", SpawnCallback(colorSpawn, color));
}
function CheckAndKillEnemyPawns(idx, color) {
  var _a;
  if (playableSquares[idx].firstElementChild) {
    var nextIdxSquare = playableSquares[idx];
    var enemyPawn = nextIdxSquare.firstElementChild;
    if (enemyPawn instanceof HTMLElement && ((_a = enemyPawn.dataset) === null || _a === void 0 ? void 0 : _a.pawn) === color) {
      var _colorPawnsSpawn$enem;
      console.log("enemy");
      var enemyPawnColor = enemyPawn.dataset.pawn;
      Array.from(nextIdxSquare.children).forEach(function (child) {
        child.removeEventListener("click", PawnHandler(enemyPawnColor));
      });
      (_colorPawnsSpawn$enem = colorPawnsSpawn[enemyPawnColor]).append.apply(_colorPawnsSpawn$enem, _toConsumableArray(nextIdxSquare.children));
    } else {
      console.log("its our pawn, do nofin");
    }
  } else {
    console.log("no children, we can proceed");
  }
}
// ! TODO FIX IT SO YOU CANT CLICK THE DICE
dice.addEventListener("click", DiceClick);
function DiceClick(e) {
  if (diceReady) {
    diceThrow = Math.floor(Math.random() * 6) + 1; //! PLACE FOR THE CHANGE OF DICE THROW
    (0, initialiser_1.AppendBoardHistory)(playerColor, diceThrow);
    (0, initialiser_1.TurnOnDice)(diceThrow);
    TogglePawnAndDice();
  } else {
    console.log("YOU ARE NOT SUPPOSED TO THROW THE DICE YET");
  }
  this.focus();
}
function RemoveChildFromAnElement(parent) {
  return parent.removeChild(parent.lastElementChild);
}
function KillAllPawns() {
  var _iterator = _createForOfIteratorHelper(colors),
    _step;
  try {
    var _loop = function _loop() {
      var color = _step.value;
      var spawnForColor = colorPawnsSpawn[color];
      var pawnOfColor = Array.from(document.querySelectorAll("[data-pawn=".concat(color, "]")));
      pawnOfColor.forEach(function (e) {
        var _a;
        (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(e);
        e.removeEventListener("click", PawnHandler(color));
        console.log(e);
      });
      spawnForColor.append.apply(spawnForColor, pawnOfColor);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  (0, initialiser_1.ClearBoardHistory)();
  playerColor = initColor;
  diceThrow = initDiceThrow;
  diceReady = true;
  pickPawn = false;
  diceText.innerText = "Ready";
  dice.addEventListener("click", DiceClick);
}
},{"./initialiser":"src/js/initialiser.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50976" + '/');
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