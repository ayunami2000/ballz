/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Box = __webpack_require__(3);

var _Box2 = _interopRequireDefault(_Box);

var _Ball = __webpack_require__(2);

var _Ball2 = _interopRequireDefault(_Ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = {
    game: {
        background: '#333',
        gravity: -0.001,
        rowCount: 6,
        triggerBallsCount: 10
    },
    ground: {
        height: 50,
        color: '#666'
    },
    balls: {
        radius: 5,
        color: 'white',
        moveSpeed: 8,
        generateSpeed: 5
    }
};

var Game = function () {
    function Game(query) {
        _classCallCheck(this, Game);

        // Options setup
        this.options = options;
        // Canvas setup
        this.canvas = document.querySelector(query);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.background = this.options.game.background;
        // Dynamic variables setup
        this.initalizeDynamicVariables
        // Trigger Listeners
        ();this.canvas.addEventListener('mousedown', this.onDragStarted.bind(this));
        this.canvas.addEventListener('mousemove', this.onPointerMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onDragEnded.bind(this));
        if(window.parent!=window){window.parent.frameRegister(window.frameElement.id);}
        function touchHandler(event){
          var touches=event.changedTouches,first=touches[0],type="";
          switch(event.type){
            case "touchstart": type = "mousedown"; break;
            case "touchmove":  type = "mousemove"; break;        
            case "touchend":   type = "mouseup";   break;
            default:           return;
          }
          var simulatedEvent = document.createEvent("MouseEvent");
          simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                        first.screenX, first.screenY, 
                                        first.clientX, first.clientY, false, 
                                        false, false, false, 0/*left*/, null);
          first.target.dispatchEvent(simulatedEvent);
          event.preventDefault();
        }
        this.canvas.addEventListener("touchstart", touchHandler, true);
        this.canvas.addEventListener("touchmove", touchHandler, true);
        this.canvas.addEventListener("touchend", touchHandler, true);
        this.canvas.addEventListener("touchcancel", touchHandler, true);
        // Boxes and Balls arrays
        this.boxes = [];
        this.balls = [];
        // Let's play
        this.goNextStep();
    }

    _createClass(Game, [{
        key: 'initalizeDynamicVariables',
        value: function initalizeDynamicVariables() {
            // Game size
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            // Ballz area size
            this.lowestX = this.options.balls.radius;
            this.highestX = this.width - this.options.balls.radius;
            this.lowestY = this.height - this.options.ground.height - this.options.balls.radius;
            this.highestY = this.options.balls.radius;
            // Box Dynamic vars
            this.boxSize = this.width / this.options.game.rowCount;
            // Logic setup
            this.step = 0;
            this.isLocked = false;
            this.ballzCount = 1;
            this.onGroundBallX = this.width / 2;
            this.nextOnGroundBallX = -1;
            this.howManyShouldShoot = 0;
            this.shootAngle = [1, 1];
            // Trigger Setup
            this.trigger = {
                start: [0, 0],
                end: [0, 0]
            };
        }

        // Flow Controls

    }, {
        key: 'start',
        value: function start() {
            this.renderer = framesFlow.render(this.render.bind(this));
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.renderer.pause();
        }
    }, {
        key: 'play',
        value: function play() {
            this.renderer.play();
        }
    }, {
        key: 'goNextStep',
        value: function goNextStep() {
            this.step++;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var box = _step2.value;
                            box.onStepChanged();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.insertBoxRow();
        }

        // Game Methods

    }, {
        key: 'throwBall',
        value: function throwBall(angleVector) {
            this.balls.push(new _Ball2.default(this, this.onGroundBallX, angleVector));
        }
    }, {
        key: 'shoot',
        value: function shoot(angleVector) {
            if (!this.isLocked) {
                this.isLocked = true;
                this.shootAngle = angleVector;
                this.howManyShouldShoot = this.step;
            }
        }
    }, {
        key: 'removeBall',
        value: function removeBall(which) {
            var index = this.balls.indexOf(which);
            which = null; // Use garbage collector to remove this ball from memory
            if (index > -1) this.balls.splice(index, 1);
        }
    }, {
        key: 'insertBoxRow',
        value: function insertBoxRow() {
            var countInThisRow = Math.floor(Math.random() * (this.options.game.rowCount - 1)) + 1;
            var usedIndexes = [];
            var row = [];
            var index = void 0;
            for (var i = 0; i < countInThisRow; i++) {
                do {
                    index = Math.floor(Math.random() * this.options.game.rowCount);
                } while (usedIndexes.indexOf(index) !== -1);
                usedIndexes.push(index);
                row.push(new _Box2.default(this, index));
            }
            this.boxes.push(row);
        }
    }, {
        key: 'removeBox',
        value: function removeBox(which) {
            var rowIndex = which.step - 1;
            var index = this.boxes[rowIndex].indexOf(which);
            which = null; // Use garbage collector to remove this ball from memory
            if (index > -1) this.boxes[rowIndex].splice(index, 1);
        }
    }, {
        key: 'shootIfNeeded',
        value: function shootIfNeeded() {
            this.throwBall(this.shootAngle.slice(0));
            this.howManyShouldShoot--;
            if (this.howManyShouldShoot === 0) {
                if (this.nextOnGroundBallX !== -1) {
                    this.onGroundBallX = this.nextOnGroundBallX;
                    this.nextOnGroundBallX = -1;
                } else {
                    this.onGroundBallX = -1;
                }
            }
        }
    }, {
        key: 'drawAFakeBall',
        value: function drawAFakeBall(x, y, sizeRatio) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.options.balls.radius * sizeRatio, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.options.balls.color;
            this.ctx.fill();
        }

        // Trigger Handle

    }, {
        key: 'triggerIsValid',
        value: function triggerIsValid() {
            var deltaX = this.trigger.start[0] - this.trigger.end[0];
            var deltaY = this.trigger.start[1] - this.trigger.end[1];
            var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            var angleRate = deltaY / Math.abs(deltaX);
            return dist > 50 && angleRate < -0.1;
        }
    }, {
        key: 'onDragStarted',
        value: function onDragStarted(e) {
            if (!this.isLocked) {
                this.mouseIsDown = true;
                this.trigger.start = this.trigger.end = [this.width*(e.offsetX/this.canvas.offsetWidth),(e.offsetY/this.canvas.offsetHeight)*this.height];
            }
        }
    }, {
        key: 'onPointerMove',
        value: function onPointerMove(e) {
            if (this.mouseIsDown) {
                this.trigger.end = [this.width*(e.offsetX/this.canvas.offsetWidth),(e.offsetY/this.canvas.offsetHeight)*this.height];
            }
        }
    }, {
        key: 'onDragEnded',
        value: function onDragEnded(e) {
            this.mouseIsDown = false;
            if (!this.isLocked && this.triggerIsValid()) {
                var deltaX = this.trigger.start[0] - this.trigger.end[0];
                var deltaY = this.trigger.start[1] - this.trigger.end[1];
                var angle = Math.atan(deltaY / Math.abs(deltaX));
                this.shoot([Math.cos(angle) * Math.sign(deltaX) * this.options.balls.moveSpeed, Math.sin(angle) * this.options.balls.moveSpeed]);
            }
            this.trigger.end = this.trigger.start;
        }

        // Render Methods

    }, {
        key: 'render',
        value: function render(frames) {
            this.clear();
            if (frames.index % this.options.balls.generateSpeed === 0 && this.howManyShouldShoot > 0) this.shootIfNeeded();
            this.drawBallsAndBoxes();
            this.drawGround();
            this.drawTrigger();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }, {
        key: 'drawGround',
        value: function drawGround() {
            // Drawing onGround Ball
            if (this.onGroundBallX !== -1) {
                this.drawAFakeBall(this.onGroundBallX, this.lowestY, 1);
            }
            if (this.nextOnGroundBallX !== -1) {
                this.drawAFakeBall(this.nextOnGroundBallX, this.lowestY, 1);
            }
            // Drawing Ground
            this.ctx.fillStyle = this.options.ground.color;
            this.ctx.fillRect(0, this.height - this.options.ground.height, this.width, this.height);
        }
    }, {
        key: 'drawBallsAndBoxes',
        value: function drawBallsAndBoxes() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.boxes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var row = _step3.value;
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = row[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var box = _step5.value;
                            box.render();
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.balls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var ball = _step4.value;
                    ball.render();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'drawTrigger',
        value: function drawTrigger() {
            if (this.triggerIsValid()) {
                var deltaX = this.trigger.start[0] - this.trigger.end[0];
                var deltaY = this.trigger.start[1] - this.trigger.end[1];
                for (var i = 0; i < this.options.game.triggerBallsCount; i++) {
                    this.drawAFakeBall(this.trigger.start[0] - deltaX * i / this.options.game.triggerBallsCount, this.trigger.start[1] - deltaY * i / this.options.game.triggerBallsCount, 1 / Math.sqrt(i + 1));
                }
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_FramesFlow__ = __webpack_require__(5);


// defining framesFlow as a global object
if (!(window.framesFlow instanceof __WEBPACK_IMPORTED_MODULE_0__components_FramesFlow__["a" /* default */])) { // if it didn't define before
    window.framesFlow = new __WEBPACK_IMPORTED_MODULE_0__components_FramesFlow__["a" /* default */]()
}

// export
/* harmony default export */ __webpack_exports__["default"] = (window.framesFlow);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball(game, startX, velocityVector) {
        _classCallCheck(this, Ball);

        this.game = game;
        this.ctx = this.game.ctx;
        this.velocityVector = velocityVector;
        this.radius = this.game.options.balls.radius;
        this.weight = 1;
        this.x = startX;
        this.y = this.game.lowestY;
    }

    _createClass(Ball, [{
        key: "remove",
        value: function remove() {
            this.velocityVector = null;
            this.game.removeBall(this);
        }
    }, {
        key: "reflect",
        value: function reflect(reflectArr) {
            this.velocityVector[0] *= reflectArr[0];
            this.velocityVector[1] *= reflectArr[1];
        }
    }, {
        key: "computeCollisions",
        value: function computeCollisions() {
            // Walls Collisions
            if (this.x >= this.game.highestX) {
                this.x = this.game.highestX;
                this.reflect([-1, 1]);
            }
            if (this.x <= this.game.lowestX) {
                this.x = this.game.lowestX;
                this.reflect([-1, 1]);
            }
            if (this.y <= this.game.highestY) {
                this.y = this.game.highestY;
                this.reflect([1, -1]);
            }
            // Boxes Collisions
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.game.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var box = _step2.value;

                            this.reflect(box.checkCollisionWith(this));
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "computeGravity",
        value: function computeGravity() {
            this.velocityVector[1] -= this.game.options.game.gravity;
        }
    }, {
        key: "checkIfShouldDie",
        value: function checkIfShouldDie() {
            var _this = this;

            if (this.y > this.game.lowestY) {
                if (this.game.onGroundBallX === -1) {
                    this.game.onGroundBallX = this.x;
                } else if (this.game.onGroundBallX !== -1 && this.game.nextOnGroundBallX === -1) {
                    this.game.nextOnGroundBallX = this.x;
                }
                this.remove();
                if (this.game.balls.length === 0) {
                    this.game.nextOnGroundBallX = -1;
                    this.game.goNextStep();
                    setTimeout(function () {
                        _this.game.isLocked = false;
                    }, 300);
                }
            }
        }

        // Moves and Animation

    }, {
        key: "render",
        value: function render() {
            this.changes();
            this.draw();
        }
    }, {
        key: "changes",
        value: function changes() {
            this.computeCollisions();
            this.computeGravity();
            this.x += this.velocityVector[0];
            this.y += this.velocityVector[1];
            this.checkIfShouldDie();
        }
    }, {
        key: "draw",
        value: function draw() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.game.options.balls.color;
            this.ctx.fill();
        }
    }]);

    return Ball;
}();

exports.default = Ball;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = ['red', 'blue', 'magenta', 'yellow'];
var lastChosenColorIndex = -1;
var nextColor = function nextColor() {
    lastChosenColorIndex++;
    if (lastChosenColorIndex === colors.length) lastChosenColorIndex = 0;
    return colors[lastChosenColorIndex];
};

var Box = function () {
    function Box(game, place) {
        _classCallCheck(this, Box);

        this.game = game;
        this.ctx = this.game.ctx;
        this.step = this.game.step;
        this.place = place;
        this.weight = (this.step + 1) * Math.floor(Math.random() * 2 + 1);
        this.size = this.game.boxSize;
        this.color = nextColor();
        this.position = { x: this.place * this.size, y: 0 };
        this.positionOnDisplay = { x: this.position.x, y: -this.size };
        this.onStepChanged();
    }

    _createClass(Box, [{
        key: 'remove',
        value: function remove() {
            this.position = null;
            this.positionOnDisplay = null;
            this.game.removeBox(this);
        }
    }, {
        key: 'checkCollisionWith',
        value: function checkCollisionWith(ball) {
            var distX = Math.abs(ball.x - this.positionOnDisplay.x - this.size / 2);
            var distY = Math.abs(ball.y - this.positionOnDisplay.y - this.size / 2
            // If no collision detected
            );if (distX > this.size / 2 + ball.radius) return [1, 1];
            if (distY > this.size / 2 + ball.radius) return [1, 1];
            // If has collisions
            var ret = [-1, -1];
            if (distY < this.size / 2) {
                if (ball.velocityVector[0] >= 0) ball.x = this.positionOnDisplay.x - ball.radius;else ball.x = this.positionOnDisplay.x + this.size + ball.radius;
                ret = [-1, 1];
            } else if (distX < this.size / 2) {
                if (ball.velocityVector[1] >= 0) ball.y = this.positionOnDisplay.y - ball.radius;else ball.y = this.positionOnDisplay.y + this.size + ball.radius;
                ret = [1, -1];
            }
            this.onBallCollised(ball
            // If it collised with a corner
            );return ret;
        }

        // Listeners

    }, {
        key: 'onStepChanged',
        value: function onStepChanged() {
            this.position.y = (this.game.step - this.step) * this.size + this.size;
        }
    }, {
        key: 'onBallCollised',
        value: function onBallCollised(ball) {
            this.weight = Math.max(0, this.weight - ball.weight);
            if (this.weight === 0) this.remove();
        }

        // Moves and Animation

    }, {
        key: 'render',
        value: function render() {
            this.changes();
            this.draw();
        }
    }, {
        key: 'changes',
        value: function changes() {
            this.positionOnDisplay.y += (this.position.y - this.positionOnDisplay.y) / 10;
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.positionOnDisplay.x, this.positionOnDisplay.y, this.size, this.size);

            this.ctx.font = "20px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillText(this.weight, this.positionOnDisplay.x + this.size / 2, this.positionOnDisplay.y + this.size / 2);
        }
    }]);

    return Box;
}();

exports.default = Box;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _Game = __webpack_require__(0);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ballz = window.ballz = new _Game2.default('#playground');

ballz.start();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RendererArray__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Renderer__ = __webpack_require__(6);



// Compatibility for all browsers - Paul Irish version
window.requestAnimFrame = (function () {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60)
          }
})()

// FramesFlow
class FramesFlow {
    constructor () {
        this.frames = 0
        this._fps = 30
        this.options = {
            minimumAcceptableFPS: 30
        }
        this.renderers = new __WEBPACK_IMPORTED_MODULE_0__RendererArray__["a" /* default */]
        this.performance = {
            logs: new Array(100),
            logsPointer: 0,
            lastTimeStamp: undefined,
            lastFrameFPS: 30,
            ratio: 1,
            status: 0,
            average: {
                fps: 30,
                ratio: 1,
                status: 0
            }
        }
        this.requestLoop()
    }
    get (id) {
        return this.renderers.get(id)
    }
    getAll () {
        return this.renderers
    }
    getAllByClass (className) {
        return this.renderers.filter(renderer => renderer.class == className)
    }
    removeRendererById (id) {
        this.renderers.remove(id)
    }
    checkValidationOfFrameRate (rate, isGlobalCheck = false) {
        let error = null
        const pointer = isGlobalCheck ? 'any' : 'this'
        if (rate < 0) error = 'FPS must not be a negative number!'
        else if (rate < 30 && rate > 0 && (30 / rate) % 1 !== 0) error = 'if FPS is less than 30fps, it have to be like this: (30 / FPS) should be integer'
        else if (rate > 30 && rate % 30 !== 0) error = 'if FPS is more than 30fps, it have to be like this: (FPS % 30 == 0)'
        if (error !== null) throw `can't set ${rate}fps for this renderer. REASON: <${error}>`
    }
    get fps () {
        return this._fps
    }
    set fps (newFPS) {
        try {
            this.checkValidationOfFrameRate(rate, true)
            this._fps = newFPS
        } catch (e) {
            console.error(e)
        }
    }
    playAll () {
        for (let renderer of this.getAllRenderers()) renderer.play()
    }
    pauseAll () {
        for (let renderer of this.getAllRenderers()) renderer.pause()
    }
    render (className, func) {
        if (typeof className == 'function') {
            func = className
            className = ''
        }
        const renderer = new __WEBPACK_IMPORTED_MODULE_1__Renderer__["a" /* default */](this, {
            id: this.renderers.length,
            class: className
        }, func)
        this.renderers.push(renderer)
        return renderer
    }
    onLag (minimumFPS, callback) {
        if (typeof minimumFPS == 'function') callback = minimumFPS
        else this.options.minimumAcceptableFPS = minimumFPS
        this.onLagCallback = callback
    }
    registerPerformanceLog (renderTime) {
        // Calculating fps
        this.performance.lastFrameFPS = 1000 / renderTime
        // Calculating lags
        if (this.performance.lastFrameFPS < this.options.minimumAcceptableFPS) if (typeof this.onLagCallback === 'function') this.onLagCallback(this.performance.lastFrameFPS)
        // logging
        this.performance.logs[this.performance.logsPointer] = this.performance.lastFrameFPS
        this.performance.logsPointer = (this.performance.logsPointer + 1) % 100
        // analyzing logs
        this.analyzePerformance()
    }
    analyzePerformance () {
        const allData = this.performance.logs.filter(data => typeof data == 'number')
        // Calculating average of data
        let FPSSum = 0
        for (let data of allData) FPSSum += data
        this.performance.average.fps = FPSSum / allData.length
        // Calculating performance percentage
        this.performance.ratio = this.performance.lastFrameFPS / 30
        this.performance.average.ratio = this.performance.average.fps / 30
        // defining status
        this.performance.status = this._getStatusOfFPS(this.performance.lastFrameFPS)
        this.performance.average.status = this._getStatusOfFPS(this.performance.average.fps)
    }
    _getStatusOfFPS (fps) {
        const ratio = fps / this.fps
        let status = -3 // WORST
        if (ratio > 0.3) status = -2 // BAD
        if (ratio > 0.6) status = -1 // NOT BAD
        if (ratio > 0.9) status = 0 // OK
        if (ratio > 1.3) status = 1 // GOOD
        if (ratio > 1.6) status = 2 // EXCELLENT
        if (ratio > 2) status = 3 // BEST
        return status
    }
    requestLoop () {
        requestAnimFrame(this.requestLoop.bind(this))
        this.frames++
        this.renderers.each(renderer => renderer.render())
        if (this.performance.lastTimeStamp !== undefined) this.registerPerformanceLog(Date.now() - this.performance.lastTimeStamp)
        this.performance.lastTimeStamp = Date.now()
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FramesFlow);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Renderer {
    constructor (framesFlow, options, func) {
        this.id = options.id
        this.class = options.class || ''
        this.props = {
            isDebuging: false
        }
        this.framesFlow = framesFlow
        this._fps = undefined
        this.func = func
        this.frames = 0
        this.shouldGoNext = false
        this.render()
    }
    // Render next frame
    next () {
        this.shouldGoNext = true
    }
    remove () {
        this.framesFlow.removeRendererById(this.id)
    }
    pause () {
        this.props.isDebuging = true
    }
    play () {
        this.props.isDebuging = false
    }
    set fps (newFPS) {
        if (newFPS == undefined) return this._fps = newFPS
        try {
            this.framesFlow.checkValidationOfFrameRate(newFPS)
            this._fps = newFPS
        } catch (e) {
            console.error(e)
        }
    }
    get fps () {
        return this._fps || this.framesFlow.fps
    }
    shouldRenderThisFrame () {
        // all conditions to pause or play rendering
        const conditions = [
            !this.props.isDebuging,
            this.framesFlow.frames % (30 / Math.min(this.fps, 30)) == 0,
        ]
        let ret = true
        for (let cond of conditions) ret = ret && cond
        return ret
    }
    getFrameObjectToReturn () {
        return {
            renderer: this,
            index: this.frames,
            fps: this.fps,
            performance: {
                fps: this.framesFlow.performance.lastFrameFPS,
                ratio: this.framesFlow.performance.ratio,
                status: this.framesFlow.performance.status,
                average: this.framesFlow.performance.average
            }
        }
    }
    render () {
        if (this.shouldRenderThisFrame() || this.shouldGoNext) {
            let iteration = 0
            if (this.fps > 30) iteration = (Math.max(this.fps, 30) / 30)
            else iteration = 30 / this.fps
            for (let i = 0; i < iteration; i++) {
                this.frames++
                this.shouldGoNext = false
                this.func(this.getFrameObjectToReturn())
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Renderer);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RendererArray {
    constructor(...args) {
        if (typeof args[0] === 'array') this.arr = args[0]
        else this.arr = new Array(...args)
    }
    get (i) {
        return this.arr[i]
    }
    set (i, val) {
        this.arr[i] = val
        return this
    }
    push (val) {
        this.arr.push(val)
        return this
    }
    remove (i) {
        this.arr[i] = undefined
        this.arr.splice(i, 1)
        return this
    }
    filter (condFunc) {
        return new RendererArray(this.arr.filter(condFunc))
    }
    each (cb) {
        for (let item of this.arr) cb(item)
    }
    get length () {
        return this.arr.length
    }
    toArray () {
        return this.arr
    }
    set fps (newFPS) {
        this.each(renderer => renderer.fps = newFPS)
    }
    remove () {
        this.each(renderer => renderer.remove())
    }
    next () {
        this.each(renderer => renderer.next())
    }
    pause () {
        this.each(renderer => renderer.pause())
    }
    play () {
        this.each(renderer => renderer.play())
    }
}

/* harmony default export */ __webpack_exports__["a"] = (RendererArray);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzdkYThhNWY4NGE4MDdkMGIyMjciLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9HYW1lLmpzIiwid2VicGFjazovLy8uL34vZnJhbWVzZmxvdy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9CYWxsLmpzIiwid2VicGFjazovLy8uL2FwcC9zcmMvQm94LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnJhbWVzZmxvdy9zcmMvY29tcG9uZW50cy9GcmFtZXNGbG93LmpzIiwid2VicGFjazovLy8uL34vZnJhbWVzZmxvdy9zcmMvY29tcG9uZW50cy9SZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZyYW1lc2Zsb3cvc3JjL2NvbXBvbmVudHMvUmVuZGVyZXJBcnJheS5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiZ2FtZSIsImJhY2tncm91bmQiLCJncmF2aXR5Iiwicm93Q291bnQiLCJ0cmlnZ2VyQmFsbHNDb3VudCIsImdyb3VuZCIsImhlaWdodCIsImNvbG9yIiwiYmFsbHMiLCJyYWRpdXMiLCJtb3ZlU3BlZWQiLCJnZW5lcmF0ZVNwZWVkIiwiR2FtZSIsInF1ZXJ5IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsInN0eWxlIiwiaW5pdGFsaXplRHluYW1pY1ZhcmlhYmxlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkRyYWdTdGFydGVkIiwiYmluZCIsIm9uUG9pbnRlck1vdmUiLCJvbkRyYWdFbmRlZCIsImJveGVzIiwiZ29OZXh0U3RlcCIsIndpZHRoIiwibG93ZXN0WCIsImhpZ2hlc3RYIiwibG93ZXN0WSIsImhpZ2hlc3RZIiwiYm94U2l6ZSIsInN0ZXAiLCJpc0xvY2tlZCIsImJhbGx6Q291bnQiLCJvbkdyb3VuZEJhbGxYIiwibmV4dE9uR3JvdW5kQmFsbFgiLCJob3dNYW55U2hvdWxkU2hvb3QiLCJzaG9vdEFuZ2xlIiwidHJpZ2dlciIsInN0YXJ0IiwiZW5kIiwicmVuZGVyZXIiLCJmcmFtZXNGbG93IiwicmVuZGVyIiwicGF1c2UiLCJwbGF5Iiwicm93IiwiYm94Iiwib25TdGVwQ2hhbmdlZCIsImluc2VydEJveFJvdyIsImFuZ2xlVmVjdG9yIiwicHVzaCIsIndoaWNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiY291bnRJblRoaXNSb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ1c2VkSW5kZXhlcyIsImkiLCJyb3dJbmRleCIsInRocm93QmFsbCIsInNsaWNlIiwieCIsInkiLCJzaXplUmF0aW8iLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJkZWx0YVgiLCJkZWx0YVkiLCJkaXN0Iiwic3FydCIsInBvdyIsImFuZ2xlUmF0ZSIsImFicyIsImUiLCJtb3VzZUlzRG93biIsIm9mZnNldFgiLCJvZmZzZXRZIiwidHJpZ2dlcklzVmFsaWQiLCJhbmdsZSIsImF0YW4iLCJzaG9vdCIsImNvcyIsInNpZ24iLCJzaW4iLCJmcmFtZXMiLCJjbGVhciIsInNob290SWZOZWVkZWQiLCJkcmF3QmFsbHNBbmRCb3hlcyIsImRyYXdHcm91bmQiLCJkcmF3VHJpZ2dlciIsImNsZWFyUmVjdCIsImRyYXdBRmFrZUJhbGwiLCJmaWxsUmVjdCIsImJhbGwiLCJCYWxsIiwic3RhcnRYIiwidmVsb2NpdHlWZWN0b3IiLCJ3ZWlnaHQiLCJyZW1vdmVCYWxsIiwicmVmbGVjdEFyciIsInJlZmxlY3QiLCJjaGVja0NvbGxpc2lvbldpdGgiLCJyZW1vdmUiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiY2hhbmdlcyIsImRyYXciLCJjb21wdXRlQ29sbGlzaW9ucyIsImNvbXB1dGVHcmF2aXR5IiwiY2hlY2tJZlNob3VsZERpZSIsImNvbG9ycyIsImxhc3RDaG9zZW5Db2xvckluZGV4IiwibmV4dENvbG9yIiwiQm94IiwicGxhY2UiLCJzaXplIiwicG9zaXRpb24iLCJwb3NpdGlvbk9uRGlzcGxheSIsInJlbW92ZUJveCIsImRpc3RYIiwiZGlzdFkiLCJyZXQiLCJvbkJhbGxDb2xsaXNlZCIsIm1heCIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsVGV4dCIsImJhbGx6Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVO0FBQ1pDLFVBQU07QUFDRkMsb0JBQVksTUFEVjtBQUVGQyxpQkFBUyxDQUFDLEtBRlI7QUFHRkMsa0JBQVUsQ0FIUjtBQUlGQywyQkFBbUI7QUFKakIsS0FETTtBQU9aQyxZQUFRO0FBQ0pDLGdCQUFRLEVBREo7QUFFSkMsZUFBTztBQUZILEtBUEk7QUFXWkMsV0FBTztBQUNIQyxnQkFBUSxDQURMO0FBRUhGLGVBQU8sT0FGSjtBQUdIRyxtQkFBVyxDQUhSO0FBSUhDLHVCQUFlO0FBSlo7QUFYSyxDQUFoQjs7SUFtQk1DLEk7QUFDRixrQkFBYUMsS0FBYixFQUFvQjtBQUFBOztBQUNoQjtBQUNBLGFBQUtkLE9BQUwsR0FBZUEsT0FBZjtBQUNBO0FBQ0EsYUFBS2UsTUFBTCxHQUFjQyxTQUFTQyxhQUFULENBQXVCSCxLQUF2QixDQUFkO0FBQ0EsYUFBS0ksR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFBWixDQUF1QixJQUF2QixDQUFYO0FBQ0EsYUFBS0osTUFBTCxDQUFZSyxLQUFaLENBQWtCbEIsVUFBbEIsR0FBK0IsS0FBS0YsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxVQUFqRDtBQUNBO0FBQ0EsYUFBS21CO0FBQ0w7QUFEQSxXQUVBLEtBQUtOLE1BQUwsQ0FBWU8sZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBS0MsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBMUM7QUFDQSxhQUFLVCxNQUFMLENBQVlPLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDLEtBQUtHLGFBQUwsQ0FBbUJELElBQW5CLENBQXdCLElBQXhCLENBQTFDO0FBQ0EsYUFBS1QsTUFBTCxDQUFZTyxnQkFBWixDQUE2QixTQUE3QixFQUF3QyxLQUFLSSxXQUFMLENBQWlCRixJQUFqQixDQUFzQixJQUF0QjtBQUN4QztBQURBLFVBRUEsS0FBS0csS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLbEIsS0FBTCxHQUFhLEVBQWI7QUFDQTtBQUNBLGFBQUttQixVQUFMO0FBQ0g7Ozs7b0RBQzRCO0FBQ3pCO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYSxLQUFLZCxNQUFMLENBQVljLEtBQXpCO0FBQ0EsaUJBQUt0QixNQUFMLEdBQWMsS0FBS1EsTUFBTCxDQUFZUixNQUExQjtBQUNBO0FBQ0EsaUJBQUt1QixPQUFMLEdBQWUsS0FBSzlCLE9BQUwsQ0FBYVMsS0FBYixDQUFtQkMsTUFBbEM7QUFDQSxpQkFBS3FCLFFBQUwsR0FBZ0IsS0FBS0YsS0FBTCxHQUFhLEtBQUs3QixPQUFMLENBQWFTLEtBQWIsQ0FBbUJDLE1BQWhEO0FBQ0EsaUJBQUtzQixPQUFMLEdBQWUsS0FBS3pCLE1BQUwsR0FBYyxLQUFLUCxPQUFMLENBQWFNLE1BQWIsQ0FBb0JDLE1BQWxDLEdBQTJDLEtBQUtQLE9BQUwsQ0FBYVMsS0FBYixDQUFtQkMsTUFBN0U7QUFDQSxpQkFBS3VCLFFBQUwsR0FBZ0IsS0FBS2pDLE9BQUwsQ0FBYVMsS0FBYixDQUFtQkMsTUFBbkM7QUFDQTtBQUNBLGlCQUFLd0IsT0FBTCxHQUFlLEtBQUtMLEtBQUwsR0FBYSxLQUFLN0IsT0FBTCxDQUFhQyxJQUFiLENBQWtCRyxRQUE5QztBQUNBO0FBQ0EsaUJBQUsrQixJQUFMLEdBQVksQ0FBWjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsaUJBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxpQkFBS0MsYUFBTCxHQUFxQixLQUFLVCxLQUFMLEdBQVcsQ0FBaEM7QUFDQSxpQkFBS1UsaUJBQUwsR0FBeUIsQ0FBQyxDQUExQjtBQUNBLGlCQUFLQyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLGlCQUFLQyxVQUFMLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBbEI7QUFDQTtBQUNBLGlCQUFLQyxPQUFMLEdBQWU7QUFDWEMsdUJBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURJO0FBRVhDLHFCQUFLLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFGTSxhQUFmO0FBSUg7O0FBRUQ7Ozs7Z0NBQ1M7QUFDTCxpQkFBS0MsUUFBTCxHQUFnQkMsV0FBV0MsTUFBWCxDQUFrQixLQUFLQSxNQUFMLENBQVl2QixJQUFaLENBQWlCLElBQWpCLENBQWxCLENBQWhCO0FBQ0g7OztnQ0FDUTtBQUNMLGlCQUFLcUIsUUFBTCxDQUFjRyxLQUFkO0FBQ0g7OzsrQkFDTztBQUNKLGlCQUFLSCxRQUFMLENBQWNJLElBQWQ7QUFDSDs7O3FDQUNhO0FBQ1YsaUJBQUtkLElBQUw7QUFEVTtBQUFBO0FBQUE7O0FBQUE7QUFFVixxQ0FBZ0IsS0FBS1IsS0FBckI7QUFBQSx3QkFBU3VCLEdBQVQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBNEIsOENBQWdCQSxHQUFoQjtBQUFBLGdDQUFTQyxHQUFUO0FBQXFCQSxnQ0FBSUMsYUFBSjtBQUFyQjtBQUE1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUdWLGlCQUFLQyxZQUFMO0FBQ0g7O0FBRUQ7Ozs7a0NBQ1dDLFcsRUFBYTtBQUNwQixpQkFBSzdDLEtBQUwsQ0FBVzhDLElBQVgsQ0FBZ0IsbUJBQVMsSUFBVCxFQUFlLEtBQUtqQixhQUFwQixFQUFtQ2dCLFdBQW5DLENBQWhCO0FBQ0g7Ozs4QkFDTUEsVyxFQUFhO0FBQ2hCLGdCQUFJLENBQUMsS0FBS2xCLFFBQVYsRUFBb0I7QUFDaEIscUJBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxxQkFBS0ssVUFBTCxHQUFrQmEsV0FBbEI7QUFDQSxxQkFBS2Qsa0JBQUwsR0FBMEIsS0FBS0wsSUFBL0I7QUFDSDtBQUNKOzs7bUNBQ1dxQixLLEVBQU87QUFDZixnQkFBTUMsUUFBUSxLQUFLaEQsS0FBTCxDQUFXaUQsT0FBWCxDQUFtQkYsS0FBbkIsQ0FBZDtBQUNBQSxvQkFBUSxJQUFSLENBRmUsQ0FFRjtBQUNiLGdCQUFJQyxRQUFRLENBQUMsQ0FBYixFQUFnQixLQUFLaEQsS0FBTCxDQUFXa0QsTUFBWCxDQUFrQkYsS0FBbEIsRUFBeUIsQ0FBekI7QUFDbkI7Ozt1Q0FDZTtBQUNaLGdCQUFNRyxpQkFBaUJDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxNQUFpQixLQUFLL0QsT0FBTCxDQUFhQyxJQUFiLENBQWtCRyxRQUFsQixHQUE2QixDQUE5QyxDQUFYLElBQStELENBQXRGO0FBQ0EsZ0JBQU00RCxjQUFjLEVBQXBCO0FBQ0EsZ0JBQU1kLE1BQU0sRUFBWjtBQUNBLGdCQUFJTyxjQUFKO0FBQ0EsaUJBQUssSUFBSVEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTCxjQUFwQixFQUFvQ0ssR0FBcEMsRUFBeUM7QUFDckMsbUJBQUc7QUFDQ1IsNEJBQVFJLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQixLQUFLL0QsT0FBTCxDQUFhQyxJQUFiLENBQWtCRyxRQUE3QyxDQUFSO0FBQ0gsaUJBRkQsUUFFUzRELFlBQVlOLE9BQVosQ0FBb0JELEtBQXBCLE1BQStCLENBQUMsQ0FGekM7QUFHQU8sNEJBQVlULElBQVosQ0FBaUJFLEtBQWpCO0FBQ0FQLG9CQUFJSyxJQUFKLENBQVMsa0JBQVEsSUFBUixFQUFjRSxLQUFkLENBQVQ7QUFDSDtBQUNELGlCQUFLOUIsS0FBTCxDQUFXNEIsSUFBWCxDQUFnQkwsR0FBaEI7QUFDSDs7O2tDQUNVTSxLLEVBQU87QUFDZCxnQkFBTVUsV0FBV1YsTUFBTXJCLElBQU4sR0FBYSxDQUE5QjtBQUNBLGdCQUFNc0IsUUFBUSxLQUFLOUIsS0FBTCxDQUFXdUMsUUFBWCxFQUFxQlIsT0FBckIsQ0FBNkJGLEtBQTdCLENBQWQ7QUFDQUEsb0JBQVEsSUFBUixDQUhjLENBR0Q7QUFDYixnQkFBSUMsUUFBUSxDQUFDLENBQWIsRUFBZ0IsS0FBSzlCLEtBQUwsQ0FBV3VDLFFBQVgsRUFBcUJQLE1BQXJCLENBQTRCRixLQUE1QixFQUFtQyxDQUFuQztBQUNuQjs7O3dDQUNnQjtBQUNiLGlCQUFLVSxTQUFMLENBQWUsS0FBSzFCLFVBQUwsQ0FBZ0IyQixLQUFoQixDQUFzQixDQUF0QixDQUFmO0FBQ0EsaUJBQUs1QixrQkFBTDtBQUNBLGdCQUFJLEtBQUtBLGtCQUFMLEtBQTRCLENBQWhDLEVBQW1DO0FBQy9CLG9CQUFJLEtBQUtELGlCQUFMLEtBQTJCLENBQUMsQ0FBaEMsRUFBbUM7QUFDL0IseUJBQUtELGFBQUwsR0FBcUIsS0FBS0MsaUJBQTFCO0FBQ0EseUJBQUtBLGlCQUFMLEdBQXlCLENBQUMsQ0FBMUI7QUFDSCxpQkFIRCxNQUlLO0FBQ0QseUJBQUtELGFBQUwsR0FBcUIsQ0FBQyxDQUF0QjtBQUNIO0FBQ0o7QUFDSjs7O3NDQUNjK0IsQyxFQUFHQyxDLEVBQUdDLFMsRUFBVztBQUM1QixpQkFBS3JELEdBQUwsQ0FBU3NELFNBQVQ7QUFDQSxpQkFBS3RELEdBQUwsQ0FBU3VELEdBQVQsQ0FBYUosQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUIsS0FBS3RFLE9BQUwsQ0FBYVMsS0FBYixDQUFtQkMsTUFBbkIsR0FBNEI2RCxTQUEvQyxFQUEwRCxDQUExRCxFQUE2RCxJQUFJVixLQUFLYSxFQUF0RSxFQUEwRSxLQUExRTtBQUNBLGlCQUFLeEQsR0FBTCxDQUFTeUQsU0FBVCxHQUFxQixLQUFLM0UsT0FBTCxDQUFhUyxLQUFiLENBQW1CRCxLQUF4QztBQUNBLGlCQUFLVSxHQUFMLENBQVMwRCxJQUFUO0FBQ0g7O0FBRUQ7Ozs7eUNBQ2tCO0FBQ2QsZ0JBQU1DLFNBQVMsS0FBS25DLE9BQUwsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixJQUF3QixLQUFLRCxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsQ0FBakIsQ0FBdkM7QUFDQSxnQkFBTWtDLFNBQVMsS0FBS3BDLE9BQUwsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixJQUF3QixLQUFLRCxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsQ0FBakIsQ0FBdkM7QUFDQSxnQkFBTW1DLE9BQU9sQixLQUFLbUIsSUFBTCxDQUFVbkIsS0FBS29CLEdBQUwsQ0FBU0osTUFBVCxFQUFpQixDQUFqQixJQUFzQmhCLEtBQUtvQixHQUFMLENBQVNILE1BQVQsRUFBaUIsQ0FBakIsQ0FBaEMsQ0FBYjtBQUNBLGdCQUFNSSxZQUFZSixTQUFTakIsS0FBS3NCLEdBQUwsQ0FBU04sTUFBVCxDQUEzQjtBQUNBLG1CQUFPRSxPQUFPLEVBQVAsSUFBYUcsWUFBWSxDQUFDLEdBQWpDO0FBQ0g7OztzQ0FDY0UsQyxFQUFHO0FBQ2QsZ0JBQUksQ0FBQyxLQUFLaEQsUUFBVixFQUFvQjtBQUNoQixxQkFBS2lELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxxQkFBSzNDLE9BQUwsQ0FBYUMsS0FBYixHQUFxQixLQUFLRCxPQUFMLENBQWFFLEdBQWIsR0FBbUIsQ0FBQ3dDLEVBQUVFLE9BQUgsRUFBWUYsRUFBRUcsT0FBZCxDQUF4QztBQUNIO0FBQ0o7OztzQ0FDY0gsQyxFQUFHO0FBQ2QsZ0JBQUksS0FBS0MsV0FBVCxFQUFzQjtBQUNsQixxQkFBSzNDLE9BQUwsQ0FBYUUsR0FBYixHQUFtQixDQUFDd0MsRUFBRUUsT0FBSCxFQUFZRixFQUFFRyxPQUFkLENBQW5CO0FBQ0g7QUFDSjs7O29DQUNZSCxDLEVBQUc7QUFDWixpQkFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGdCQUFJLENBQUMsS0FBS2pELFFBQU4sSUFBa0IsS0FBS29ELGNBQUwsRUFBdEIsRUFBNkM7QUFDekMsb0JBQU1YLFNBQVMsS0FBS25DLE9BQUwsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixJQUF3QixLQUFLRCxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsQ0FBakIsQ0FBdkM7QUFDQSxvQkFBTWtDLFNBQVMsS0FBS3BDLE9BQUwsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixJQUF3QixLQUFLRCxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsQ0FBakIsQ0FBdkM7QUFDQSxvQkFBSTZDLFFBQVE1QixLQUFLNkIsSUFBTCxDQUFVWixTQUFTakIsS0FBS3NCLEdBQUwsQ0FBU04sTUFBVCxDQUFuQixDQUFaO0FBQ0EscUJBQUtjLEtBQUwsQ0FBVyxDQUFDOUIsS0FBSytCLEdBQUwsQ0FBU0gsS0FBVCxJQUFrQjVCLEtBQUtnQyxJQUFMLENBQVVoQixNQUFWLENBQWxCLEdBQXNDLEtBQUs3RSxPQUFMLENBQWFTLEtBQWIsQ0FBbUJFLFNBQTFELEVBQXFFa0QsS0FBS2lDLEdBQUwsQ0FBU0wsS0FBVCxJQUFrQixLQUFLekYsT0FBTCxDQUFhUyxLQUFiLENBQW1CRSxTQUExRyxDQUFYO0FBQ0g7QUFDRCxpQkFBSytCLE9BQUwsQ0FBYUUsR0FBYixHQUFtQixLQUFLRixPQUFMLENBQWFDLEtBQWhDO0FBQ0g7O0FBR0Q7Ozs7K0JBQ1FvRCxNLEVBQVE7QUFDWixpQkFBS0MsS0FBTDtBQUNBLGdCQUFJRCxPQUFPdEMsS0FBUCxHQUFlLEtBQUt6RCxPQUFMLENBQWFTLEtBQWIsQ0FBbUJHLGFBQWxDLEtBQW9ELENBQXBELElBQXlELEtBQUs0QixrQkFBTCxHQUEwQixDQUF2RixFQUEwRixLQUFLeUQsYUFBTDtBQUMxRixpQkFBS0MsaUJBQUw7QUFDQSxpQkFBS0MsVUFBTDtBQUNBLGlCQUFLQyxXQUFMO0FBQ0g7OztnQ0FDUTtBQUNMLGlCQUFLbEYsR0FBTCxDQUFTbUYsU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixLQUFLeEUsS0FBOUIsRUFBcUMsS0FBS3RCLE1BQTFDO0FBQ0g7OztxQ0FDYTtBQUNWO0FBQ0EsZ0JBQUksS0FBSytCLGFBQUwsS0FBdUIsQ0FBQyxDQUE1QixFQUErQjtBQUMzQixxQkFBS2dFLGFBQUwsQ0FBbUIsS0FBS2hFLGFBQXhCLEVBQXVDLEtBQUtOLE9BQTVDLEVBQXFELENBQXJEO0FBQ0g7QUFDRCxnQkFBSSxLQUFLTyxpQkFBTCxLQUEyQixDQUFDLENBQWhDLEVBQW1DO0FBQy9CLHFCQUFLK0QsYUFBTCxDQUFtQixLQUFLL0QsaUJBQXhCLEVBQTJDLEtBQUtQLE9BQWhELEVBQXlELENBQXpEO0FBQ0g7QUFDRDtBQUNBLGlCQUFLZCxHQUFMLENBQVN5RCxTQUFULEdBQXFCLEtBQUszRSxPQUFMLENBQWFNLE1BQWIsQ0FBb0JFLEtBQXpDO0FBQ0EsaUJBQUtVLEdBQUwsQ0FBU3FGLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBS2hHLE1BQUwsR0FBYyxLQUFLUCxPQUFMLENBQWFNLE1BQWIsQ0FBb0JDLE1BQXZELEVBQStELEtBQUtzQixLQUFwRSxFQUEyRSxLQUFLdEIsTUFBaEY7QUFDSDs7OzRDQUNvQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNqQixzQ0FBZ0IsS0FBS29CLEtBQXJCO0FBQUEsd0JBQVN1QixHQUFUO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQTRCLDhDQUFnQkEsR0FBaEI7QUFBQSxnQ0FBU0MsR0FBVDtBQUFxQkEsZ0NBQUlKLE1BQUo7QUFBckI7QUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBRWpCLHNDQUFpQixLQUFLdEMsS0FBdEI7QUFBQSx3QkFBUytGLElBQVQ7QUFBNkJBLHlCQUFLekQsTUFBTDtBQUE3QjtBQUZpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR3BCOzs7c0NBQ2M7QUFDWCxnQkFBSSxLQUFLeUMsY0FBTCxFQUFKLEVBQTJCO0FBQ3ZCLG9CQUFNWCxTQUFTLEtBQUtuQyxPQUFMLENBQWFDLEtBQWIsQ0FBbUIsQ0FBbkIsSUFBd0IsS0FBS0QsT0FBTCxDQUFhRSxHQUFiLENBQWlCLENBQWpCLENBQXZDO0FBQ0Esb0JBQU1rQyxTQUFTLEtBQUtwQyxPQUFMLENBQWFDLEtBQWIsQ0FBbUIsQ0FBbkIsSUFBd0IsS0FBS0QsT0FBTCxDQUFhRSxHQUFiLENBQWlCLENBQWpCLENBQXZDO0FBQ0EscUJBQUssSUFBSXFCLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLakUsT0FBTCxDQUFhQyxJQUFiLENBQWtCSSxpQkFBdEMsRUFBeUQ0RCxHQUF6RDtBQUNJLHlCQUFLcUMsYUFBTCxDQUNJLEtBQUs1RCxPQUFMLENBQWFDLEtBQWIsQ0FBbUIsQ0FBbkIsSUFBeUJrQyxTQUFTWixDQUFULEdBQWEsS0FBS2pFLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkksaUJBRDVELEVBRUksS0FBS3FDLE9BQUwsQ0FBYUMsS0FBYixDQUFtQixDQUFuQixJQUF5Qm1DLFNBQVNiLENBQVQsR0FBYSxLQUFLakUsT0FBTCxDQUFhQyxJQUFiLENBQWtCSSxpQkFGNUQsRUFHSSxJQUFJd0QsS0FBS21CLElBQUwsQ0FBVWYsSUFBSSxDQUFkLENBSFI7QUFESjtBQUtIO0FBQ0o7Ozs7OztrQkFHVXBELEk7Ozs7Ozs7OztBQ25OZjs7QUFFQTtBQUNBLDhHQUFpRDtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsZ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDUk00RixJO0FBQ0Ysa0JBQWF4RyxJQUFiLEVBQW1CeUcsTUFBbkIsRUFBMkJDLGNBQTNCLEVBQTJDO0FBQUE7O0FBQ3ZDLGFBQUsxRyxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLaUIsR0FBTCxHQUFXLEtBQUtqQixJQUFMLENBQVVpQixHQUFyQjtBQUNBLGFBQUt5RixjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLGFBQUtqRyxNQUFMLEdBQWMsS0FBS1QsSUFBTCxDQUFVRCxPQUFWLENBQWtCUyxLQUFsQixDQUF3QkMsTUFBdEM7QUFDQSxhQUFLa0csTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLdkMsQ0FBTCxHQUFTcUMsTUFBVDtBQUNBLGFBQUtwQyxDQUFMLEdBQVMsS0FBS3JFLElBQUwsQ0FBVStCLE9BQW5CO0FBQ0g7Ozs7aUNBQ1M7QUFDTixpQkFBSzJFLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxpQkFBSzFHLElBQUwsQ0FBVTRHLFVBQVYsQ0FBcUIsSUFBckI7QUFDSDs7O2dDQUNRQyxVLEVBQVk7QUFDakIsaUJBQUtILGNBQUwsQ0FBb0IsQ0FBcEIsS0FBMEJHLFdBQVcsQ0FBWCxDQUExQjtBQUNBLGlCQUFLSCxjQUFMLENBQW9CLENBQXBCLEtBQTBCRyxXQUFXLENBQVgsQ0FBMUI7QUFDSDs7OzRDQUNvQjtBQUNqQjtBQUNBLGdCQUFJLEtBQUt6QyxDQUFMLElBQVUsS0FBS3BFLElBQUwsQ0FBVThCLFFBQXhCLEVBQWtDO0FBQzlCLHFCQUFLc0MsQ0FBTCxHQUFTLEtBQUtwRSxJQUFMLENBQVU4QixRQUFuQjtBQUNBLHFCQUFLZ0YsT0FBTCxDQUFhLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUFiO0FBQ0g7QUFDRCxnQkFBSSxLQUFLMUMsQ0FBTCxJQUFVLEtBQUtwRSxJQUFMLENBQVU2QixPQUF4QixFQUFpQztBQUM3QixxQkFBS3VDLENBQUwsR0FBUyxLQUFLcEUsSUFBTCxDQUFVNkIsT0FBbkI7QUFDQSxxQkFBS2lGLE9BQUwsQ0FBYSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FBYjtBQUNIO0FBQ0QsZ0JBQUksS0FBS3pDLENBQUwsSUFBVSxLQUFLckUsSUFBTCxDQUFVZ0MsUUFBeEIsRUFBa0M7QUFDOUIscUJBQUtxQyxDQUFMLEdBQVMsS0FBS3JFLElBQUwsQ0FBVWdDLFFBQW5CO0FBQ0EscUJBQUs4RSxPQUFMLENBQWEsQ0FBQyxDQUFELEVBQUksQ0FBQyxDQUFMLENBQWI7QUFDSDtBQUNEO0FBZGlCO0FBQUE7QUFBQTs7QUFBQTtBQWVqQixxQ0FBZ0IsS0FBSzlHLElBQUwsQ0FBVTBCLEtBQTFCO0FBQUEsd0JBQVN1QixHQUFUO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQWlDLDhDQUFnQkEsR0FBaEIsbUlBQXFCO0FBQUEsZ0NBQVpDLEdBQVk7O0FBQ2xELGlDQUFLNEQsT0FBTCxDQUFhNUQsSUFBSTZELGtCQUFKLENBQXVCLElBQXZCLENBQWI7QUFDSDtBQUZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWZpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JwQjs7O3lDQUNpQjtBQUNkLGlCQUFLTCxjQUFMLENBQW9CLENBQXBCLEtBQTBCLEtBQUsxRyxJQUFMLENBQVVELE9BQVYsQ0FBa0JDLElBQWxCLENBQXVCRSxPQUFqRDtBQUNIOzs7MkNBQ21CO0FBQUE7O0FBQ2hCLGdCQUFJLEtBQUttRSxDQUFMLEdBQVMsS0FBS3JFLElBQUwsQ0FBVStCLE9BQXZCLEVBQWdDO0FBQzVCLG9CQUFJLEtBQUsvQixJQUFMLENBQVVxQyxhQUFWLEtBQTRCLENBQUMsQ0FBakMsRUFBb0M7QUFDaEMseUJBQUtyQyxJQUFMLENBQVVxQyxhQUFWLEdBQTBCLEtBQUsrQixDQUEvQjtBQUNILGlCQUZELE1BR0ssSUFBSSxLQUFLcEUsSUFBTCxDQUFVcUMsYUFBVixLQUE0QixDQUFDLENBQTdCLElBQWtDLEtBQUtyQyxJQUFMLENBQVVzQyxpQkFBVixLQUFnQyxDQUFDLENBQXZFLEVBQTBFO0FBQzNFLHlCQUFLdEMsSUFBTCxDQUFVc0MsaUJBQVYsR0FBOEIsS0FBSzhCLENBQW5DO0FBQ0g7QUFDRCxxQkFBSzRDLE1BQUw7QUFDQSxvQkFBSSxLQUFLaEgsSUFBTCxDQUFVUSxLQUFWLENBQWdCeUcsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7QUFDOUIseUJBQUtqSCxJQUFMLENBQVVzQyxpQkFBVixHQUE4QixDQUFDLENBQS9CO0FBQ0EseUJBQUt0QyxJQUFMLENBQVUyQixVQUFWO0FBQ0F1RiwrQkFBVyxZQUFJO0FBQ1gsOEJBQUtsSCxJQUFMLENBQVVtQyxRQUFWLEdBQXFCLEtBQXJCO0FBQ0gscUJBRkQsRUFFRyxHQUZIO0FBR0g7QUFDSjtBQUNKOztBQUVEOzs7O2lDQUNVO0FBQ04saUJBQUtnRixPQUFMO0FBQ0EsaUJBQUtDLElBQUw7QUFDSDs7O2tDQUNVO0FBQ1AsaUJBQUtDLGlCQUFMO0FBQ0EsaUJBQUtDLGNBQUw7QUFDQSxpQkFBS2xELENBQUwsSUFBVSxLQUFLc0MsY0FBTCxDQUFvQixDQUFwQixDQUFWO0FBQ0EsaUJBQUtyQyxDQUFMLElBQVUsS0FBS3FDLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBLGlCQUFLYSxnQkFBTDtBQUNIOzs7K0JBQ087QUFDSixpQkFBS3RHLEdBQUwsQ0FBU3NELFNBQVQ7QUFDQSxpQkFBS3RELEdBQUwsQ0FBU3VELEdBQVQsQ0FBYSxLQUFLSixDQUFsQixFQUFxQixLQUFLQyxDQUExQixFQUE2QixLQUFLNUQsTUFBbEMsRUFBMEMsQ0FBMUMsRUFBNkMsSUFBSW1ELEtBQUthLEVBQXRELEVBQTBELEtBQTFEO0FBQ0EsaUJBQUt4RCxHQUFMLENBQVN5RCxTQUFULEdBQXFCLEtBQUsxRSxJQUFMLENBQVVELE9BQVYsQ0FBa0JTLEtBQWxCLENBQXdCRCxLQUE3QztBQUNBLGlCQUFLVSxHQUFMLENBQVMwRCxJQUFUO0FBQ0g7Ozs7OztrQkFHVTZCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0VmLElBQU1nQixTQUFTLENBQ1gsS0FEVyxFQUVYLE1BRlcsRUFHWCxTQUhXLEVBSVgsUUFKVyxDQUFmO0FBTUEsSUFBSUMsdUJBQXVCLENBQUMsQ0FBNUI7QUFDQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksR0FBTTtBQUNwQkQ7QUFDQSxRQUFJQSx5QkFBeUJELE9BQU9QLE1BQXBDLEVBQTRDUSx1QkFBdUIsQ0FBdkI7QUFDNUMsV0FBT0QsT0FBT0Msb0JBQVAsQ0FBUDtBQUNILENBSkQ7O0lBTU1FLEc7QUFDRixpQkFBYTNILElBQWIsRUFBbUI0SCxLQUFuQixFQUEwQjtBQUFBOztBQUN0QixhQUFLNUgsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS2lCLEdBQUwsR0FBVyxLQUFLakIsSUFBTCxDQUFVaUIsR0FBckI7QUFDQSxhQUFLaUIsSUFBTCxHQUFZLEtBQUtsQyxJQUFMLENBQVVrQyxJQUF0QjtBQUNBLGFBQUswRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLakIsTUFBTCxHQUFjLENBQUMsS0FBS3pFLElBQUwsR0FBWSxDQUFiLElBQWtCMEIsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLENBQS9CLENBQWhDO0FBQ0EsYUFBSytELElBQUwsR0FBWSxLQUFLN0gsSUFBTCxDQUFVaUMsT0FBdEI7QUFDQSxhQUFLMUIsS0FBTCxHQUFhbUgsV0FBYjtBQUNBLGFBQUtJLFFBQUwsR0FBZ0IsRUFBQzFELEdBQUcsS0FBS3dELEtBQUwsR0FBYSxLQUFLQyxJQUF0QixFQUE0QnhELEdBQUcsQ0FBL0IsRUFBaEI7QUFDQSxhQUFLMEQsaUJBQUwsR0FBeUIsRUFBQzNELEdBQUcsS0FBSzBELFFBQUwsQ0FBYzFELENBQWxCLEVBQXFCQyxHQUFHLENBQUMsS0FBS3dELElBQTlCLEVBQXpCO0FBQ0EsYUFBSzFFLGFBQUw7QUFDSDs7OztpQ0FDUztBQUNOLGlCQUFLMkUsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGlCQUFLQyxpQkFBTCxHQUF5QixJQUF6QjtBQUNBLGlCQUFLL0gsSUFBTCxDQUFVZ0ksU0FBVixDQUFvQixJQUFwQjtBQUNIOzs7MkNBQ21CekIsSSxFQUFNO0FBQ3RCLGdCQUFNMEIsUUFBUXJFLEtBQUtzQixHQUFMLENBQVNxQixLQUFLbkMsQ0FBTCxHQUFTLEtBQUsyRCxpQkFBTCxDQUF1QjNELENBQWhDLEdBQW9DLEtBQUt5RCxJQUFMLEdBQVUsQ0FBdkQsQ0FBZDtBQUNBLGdCQUFNSyxRQUFRdEUsS0FBS3NCLEdBQUwsQ0FBU3FCLEtBQUtsQyxDQUFMLEdBQVMsS0FBSzBELGlCQUFMLENBQXVCMUQsQ0FBaEMsR0FBb0MsS0FBS3dELElBQUwsR0FBVTtBQUNyRTtBQURjLGFBQWQsQ0FFQSxJQUFJSSxRQUFTLEtBQUtKLElBQUwsR0FBVSxDQUFWLEdBQWN0QixLQUFLOUYsTUFBaEMsRUFBeUMsT0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVA7QUFDekMsZ0JBQUl5SCxRQUFTLEtBQUtMLElBQUwsR0FBVSxDQUFWLEdBQWN0QixLQUFLOUYsTUFBaEMsRUFBeUMsT0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVA7QUFDekM7QUFDQSxnQkFBSTBILE1BQU0sQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFDLENBQU4sQ0FBVjtBQUNBLGdCQUFJRCxRQUFRLEtBQUtMLElBQUwsR0FBVSxDQUF0QixFQUF5QjtBQUNyQixvQkFBSXRCLEtBQUtHLGNBQUwsQ0FBb0IsQ0FBcEIsS0FBMEIsQ0FBOUIsRUFBaUNILEtBQUtuQyxDQUFMLEdBQVMsS0FBSzJELGlCQUFMLENBQXVCM0QsQ0FBdkIsR0FBMkJtQyxLQUFLOUYsTUFBekMsQ0FBakMsS0FDSzhGLEtBQUtuQyxDQUFMLEdBQVMsS0FBSzJELGlCQUFMLENBQXVCM0QsQ0FBdkIsR0FBMkIsS0FBS3lELElBQWhDLEdBQXVDdEIsS0FBSzlGLE1BQXJEO0FBQ0wwSCxzQkFBTSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FBTjtBQUNILGFBSkQsTUFLSyxJQUFJRixRQUFRLEtBQUtKLElBQUwsR0FBVSxDQUF0QixFQUF5QjtBQUMxQixvQkFBSXRCLEtBQUtHLGNBQUwsQ0FBb0IsQ0FBcEIsS0FBMEIsQ0FBOUIsRUFBaUNILEtBQUtsQyxDQUFMLEdBQVMsS0FBSzBELGlCQUFMLENBQXVCMUQsQ0FBdkIsR0FBMkJrQyxLQUFLOUYsTUFBekMsQ0FBakMsS0FDSzhGLEtBQUtsQyxDQUFMLEdBQVMsS0FBSzBELGlCQUFMLENBQXVCMUQsQ0FBdkIsR0FBMkIsS0FBS3dELElBQWhDLEdBQXVDdEIsS0FBSzlGLE1BQXJEO0FBQ0wwSCxzQkFBTSxDQUFDLENBQUQsRUFBSSxDQUFDLENBQUwsQ0FBTjtBQUNIO0FBQ0QsaUJBQUtDLGNBQUwsQ0FBb0I3QjtBQUNwQjtBQURBLGNBRUEsT0FBTzRCLEdBQVA7QUFDSDs7QUFFRDs7Ozt3Q0FDaUI7QUFDYixpQkFBS0wsUUFBTCxDQUFjekQsQ0FBZCxHQUFtQixDQUFDLEtBQUtyRSxJQUFMLENBQVVrQyxJQUFWLEdBQWlCLEtBQUtBLElBQXZCLElBQStCLEtBQUsyRixJQUFyQyxHQUE2QyxLQUFLQSxJQUFwRTtBQUNIOzs7dUNBQ2V0QixJLEVBQU07QUFDbEIsaUJBQUtJLE1BQUwsR0FBYy9DLEtBQUt5RSxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUsxQixNQUFMLEdBQWNKLEtBQUtJLE1BQS9CLENBQWQ7QUFDQSxnQkFBSSxLQUFLQSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCLEtBQUtLLE1BQUw7QUFDMUI7O0FBRUQ7Ozs7aUNBQ1U7QUFDTixpQkFBS0csT0FBTDtBQUNBLGlCQUFLQyxJQUFMO0FBQ0g7OztrQ0FDVTtBQUNQLGlCQUFLVyxpQkFBTCxDQUF1QjFELENBQXZCLElBQTRCLENBQUMsS0FBS3lELFFBQUwsQ0FBY3pELENBQWQsR0FBa0IsS0FBSzBELGlCQUFMLENBQXVCMUQsQ0FBMUMsSUFBK0MsRUFBM0U7QUFDSDs7OytCQUNPO0FBQ0osaUJBQUtwRCxHQUFMLENBQVN5RCxTQUFULEdBQXFCLEtBQUtuRSxLQUExQjtBQUNBLGlCQUFLVSxHQUFMLENBQVNxRixRQUFULENBQWtCLEtBQUt5QixpQkFBTCxDQUF1QjNELENBQXpDLEVBQTRDLEtBQUsyRCxpQkFBTCxDQUF1QjFELENBQW5FLEVBQXNFLEtBQUt3RCxJQUEzRSxFQUFpRixLQUFLQSxJQUF0Rjs7QUFFQSxpQkFBSzVHLEdBQUwsQ0FBU3FILElBQVQsR0FBYyxZQUFkO0FBQ0EsaUJBQUtySCxHQUFMLENBQVNzSCxTQUFULEdBQW1CLFFBQW5CO0FBQ0EsaUJBQUt0SCxHQUFMLENBQVN1SCxZQUFULEdBQXdCLFFBQXhCO0FBQ0EsaUJBQUt2SCxHQUFMLENBQVN5RCxTQUFULEdBQXFCLE1BQXJCO0FBQ0EsaUJBQUt6RCxHQUFMLENBQVN3SCxRQUFULENBQWtCLEtBQUs5QixNQUF2QixFQUErQixLQUFLb0IsaUJBQUwsQ0FBdUIzRCxDQUF2QixHQUEyQixLQUFLeUQsSUFBTCxHQUFVLENBQXBFLEVBQXVFLEtBQUtFLGlCQUFMLENBQXVCMUQsQ0FBdkIsR0FBMkIsS0FBS3dELElBQUwsR0FBVSxDQUE1RztBQUNIOzs7Ozs7a0JBR1VGLEc7Ozs7Ozs7OztBQ25GZjs7QUFDQTs7Ozs7O0FBRUEsSUFBTWUsUUFBUUMsT0FBT0QsS0FBUCxHQUFlLG1CQUFTLGFBQVQsQ0FBN0I7O0FBRUFBLE1BQU1oRyxLQUFOLEc7Ozs7Ozs7OztBQ0xBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUssa0NBQWtDLE1BQU07QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtRTs7Ozs7OztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGVBQWU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUU7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0UiLCJmaWxlIjoiLi9wdWJsaWMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjN2RhOGE1Zjg0YTgwN2QwYjIyNyIsImltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnXHJcbmltcG9ydCBCYWxsIGZyb20gJy4vQmFsbCdcclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBnYW1lOiB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogJyMzMzMnLFxyXG4gICAgICAgIGdyYXZpdHk6IC0wLjAwMSxcclxuICAgICAgICByb3dDb3VudDogNixcclxuICAgICAgICB0cmlnZ2VyQmFsbHNDb3VudDogMTBcclxuICAgIH0sXHJcbiAgICBncm91bmQ6IHtcclxuICAgICAgICBoZWlnaHQ6IDUwLFxyXG4gICAgICAgIGNvbG9yOiAnIzY2NidcclxuICAgIH0sXHJcbiAgICBiYWxsczoge1xyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICBtb3ZlU3BlZWQ6IDgsXHJcbiAgICAgICAgZ2VuZXJhdGVTcGVlZDogNVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIGNvbnN0cnVjdG9yIChxdWVyeSkge1xyXG4gICAgICAgIC8vIE9wdGlvbnMgc2V0dXBcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgLy8gQ2FudmFzIHNldHVwXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLm9wdGlvbnMuZ2FtZS5iYWNrZ3JvdW5kXHJcbiAgICAgICAgLy8gRHluYW1pYyB2YXJpYWJsZXMgc2V0dXBcclxuICAgICAgICB0aGlzLmluaXRhbGl6ZUR5bmFtaWNWYXJpYWJsZXMoKVxyXG4gICAgICAgIC8vIFRyaWdnZXIgTGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbkRyYWdTdGFydGVkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vblBvaW50ZXJNb3ZlLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25EcmFnRW5kZWQuYmluZCh0aGlzKSlcclxuICAgICAgICAvLyBCb3hlcyBhbmQgQmFsbHMgYXJyYXlzXHJcbiAgICAgICAgdGhpcy5ib3hlcyA9IFtdXHJcbiAgICAgICAgdGhpcy5iYWxscyA9IFtdXHJcbiAgICAgICAgLy8gTGV0J3MgcGxheVxyXG4gICAgICAgIHRoaXMuZ29OZXh0U3RlcCgpXHJcbiAgICB9XHJcbiAgICBpbml0YWxpemVEeW5hbWljVmFyaWFibGVzICgpIHtcclxuICAgICAgICAvLyBHYW1lIHNpemVcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGhcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodFxyXG4gICAgICAgIC8vIEJhbGx6IGFyZWEgc2l6ZVxyXG4gICAgICAgIHRoaXMubG93ZXN0WCA9IHRoaXMub3B0aW9ucy5iYWxscy5yYWRpdXNcclxuICAgICAgICB0aGlzLmhpZ2hlc3RYID0gdGhpcy53aWR0aCAtIHRoaXMub3B0aW9ucy5iYWxscy5yYWRpdXNcclxuICAgICAgICB0aGlzLmxvd2VzdFkgPSB0aGlzLmhlaWdodCAtIHRoaXMub3B0aW9ucy5ncm91bmQuaGVpZ2h0IC0gdGhpcy5vcHRpb25zLmJhbGxzLnJhZGl1c1xyXG4gICAgICAgIHRoaXMuaGlnaGVzdFkgPSB0aGlzLm9wdGlvbnMuYmFsbHMucmFkaXVzXHJcbiAgICAgICAgLy8gQm94IER5bmFtaWMgdmFyc1xyXG4gICAgICAgIHRoaXMuYm94U2l6ZSA9IHRoaXMud2lkdGggLyB0aGlzLm9wdGlvbnMuZ2FtZS5yb3dDb3VudFxyXG4gICAgICAgIC8vIExvZ2ljIHNldHVwXHJcbiAgICAgICAgdGhpcy5zdGVwID0gMFxyXG4gICAgICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuYmFsbHpDb3VudCA9IDFcclxuICAgICAgICB0aGlzLm9uR3JvdW5kQmFsbFggPSB0aGlzLndpZHRoLzJcclxuICAgICAgICB0aGlzLm5leHRPbkdyb3VuZEJhbGxYID0gLTFcclxuICAgICAgICB0aGlzLmhvd01hbnlTaG91bGRTaG9vdCA9IDBcclxuICAgICAgICB0aGlzLnNob290QW5nbGUgPSBbMSwgMV1cclxuICAgICAgICAvLyBUcmlnZ2VyIFNldHVwXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyID0ge1xyXG4gICAgICAgICAgICBzdGFydDogWzAsIDBdLFxyXG4gICAgICAgICAgICBlbmQ6IFswLCAwXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gRmxvdyBDb250cm9sc1xyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBmcmFtZXNGbG93LnJlbmRlcih0aGlzLnJlbmRlci5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG4gICAgcGF1c2UgKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucGF1c2UoKVxyXG4gICAgfVxyXG4gICAgcGxheSAoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5wbGF5KClcclxuICAgIH1cclxuICAgIGdvTmV4dFN0ZXAgKCkge1xyXG4gICAgICAgIHRoaXMuc3RlcCsrXHJcbiAgICAgICAgZm9yIChsZXQgcm93IG9mIHRoaXMuYm94ZXMpIGZvciAobGV0IGJveCBvZiByb3cpIGJveC5vblN0ZXBDaGFuZ2VkKClcclxuICAgICAgICB0aGlzLmluc2VydEJveFJvdygpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2FtZSBNZXRob2RzXHJcbiAgICB0aHJvd0JhbGwgKGFuZ2xlVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5iYWxscy5wdXNoKG5ldyBCYWxsKHRoaXMsIHRoaXMub25Hcm91bmRCYWxsWCwgYW5nbGVWZWN0b3IpKVxyXG4gICAgfVxyXG4gICAgc2hvb3QgKGFuZ2xlVmVjdG9yKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RBbmdsZSA9IGFuZ2xlVmVjdG9yXHJcbiAgICAgICAgICAgIHRoaXMuaG93TWFueVNob3VsZFNob290ID0gdGhpcy5zdGVwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQmFsbCAod2hpY2gpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYmFsbHMuaW5kZXhPZih3aGljaClcclxuICAgICAgICB3aGljaCA9IG51bGwgLy8gVXNlIGdhcmJhZ2UgY29sbGVjdG9yIHRvIHJlbW92ZSB0aGlzIGJhbGwgZnJvbSBtZW1vcnlcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5iYWxscy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICBpbnNlcnRCb3hSb3cgKCkge1xyXG4gICAgICAgIGNvbnN0IGNvdW50SW5UaGlzUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMub3B0aW9ucy5nYW1lLnJvd0NvdW50IC0gMSkpICsgMVxyXG4gICAgICAgIGNvbnN0IHVzZWRJbmRleGVzID0gW11cclxuICAgICAgICBjb25zdCByb3cgPSBbXVxyXG4gICAgICAgIGxldCBpbmRleFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRJblRoaXNSb3c7IGkrKykge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMub3B0aW9ucy5nYW1lLnJvd0NvdW50KVxyXG4gICAgICAgICAgICB9IHdoaWxlICh1c2VkSW5kZXhlcy5pbmRleE9mKGluZGV4KSAhPT0gLTEpXHJcbiAgICAgICAgICAgIHVzZWRJbmRleGVzLnB1c2goaW5kZXgpXHJcbiAgICAgICAgICAgIHJvdy5wdXNoKG5ldyBCb3godGhpcywgaW5kZXgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJveGVzLnB1c2gocm93KVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQm94ICh3aGljaCkge1xyXG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gd2hpY2guc3RlcCAtIDFcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYm94ZXNbcm93SW5kZXhdLmluZGV4T2Yod2hpY2gpXHJcbiAgICAgICAgd2hpY2ggPSBudWxsIC8vIFVzZSBnYXJiYWdlIGNvbGxlY3RvciB0byByZW1vdmUgdGhpcyBiYWxsIGZyb20gbWVtb3J5XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuYm94ZXNbcm93SW5kZXhdLnNwbGljZShpbmRleCwgMSlcclxuICAgIH1cclxuICAgIHNob290SWZOZWVkZWQgKCkge1xyXG4gICAgICAgIHRoaXMudGhyb3dCYWxsKHRoaXMuc2hvb3RBbmdsZS5zbGljZSgwKSlcclxuICAgICAgICB0aGlzLmhvd01hbnlTaG91bGRTaG9vdC0tXHJcbiAgICAgICAgaWYgKHRoaXMuaG93TWFueVNob3VsZFNob290ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRPbkdyb3VuZEJhbGxYICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZEJhbGxYID0gdGhpcy5uZXh0T25Hcm91bmRCYWxsWFxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0T25Hcm91bmRCYWxsWCA9IC0xXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uR3JvdW5kQmFsbFggPSAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0FGYWtlQmFsbCAoeCwgeSwgc2l6ZVJhdGlvKSB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKClcclxuICAgICAgICB0aGlzLmN0eC5hcmMoeCwgeSwgdGhpcy5vcHRpb25zLmJhbGxzLnJhZGl1cyAqIHNpemVSYXRpbywgMCwgMiAqIE1hdGguUEksIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5iYWxscy5jb2xvclxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRyaWdnZXIgSGFuZGxlXHJcbiAgICB0cmlnZ2VySXNWYWxpZCAoKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gdGhpcy50cmlnZ2VyLnN0YXJ0WzBdIC0gdGhpcy50cmlnZ2VyLmVuZFswXVxyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IHRoaXMudHJpZ2dlci5zdGFydFsxXSAtIHRoaXMudHJpZ2dlci5lbmRbMV1cclxuICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGgucG93KGRlbHRhWCwgMikgKyBNYXRoLnBvdyhkZWx0YVksIDIpKVxyXG4gICAgICAgIGNvbnN0IGFuZ2xlUmF0ZSA9IGRlbHRhWSAvIE1hdGguYWJzKGRlbHRhWClcclxuICAgICAgICByZXR1cm4gZGlzdCA+IDUwICYmIGFuZ2xlUmF0ZSA8IC0wLjFcclxuICAgIH1cclxuICAgIG9uRHJhZ1N0YXJ0ZWQgKGUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZUlzRG93biA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyLnN0YXJ0ID0gdGhpcy50cmlnZ2VyLmVuZCA9IFtlLm9mZnNldFgsIGUub2Zmc2V0WV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBvaW50ZXJNb3ZlIChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VJc0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyLmVuZCA9IFtlLm9mZnNldFgsIGUub2Zmc2V0WV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRyYWdFbmRlZCAoZSkge1xyXG4gICAgICAgIHRoaXMubW91c2VJc0Rvd24gPSBmYWxzZVxyXG4gICAgICAgIGlmICghdGhpcy5pc0xvY2tlZCAmJiB0aGlzLnRyaWdnZXJJc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGFYID0gdGhpcy50cmlnZ2VyLnN0YXJ0WzBdIC0gdGhpcy50cmlnZ2VyLmVuZFswXVxyXG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSB0aGlzLnRyaWdnZXIuc3RhcnRbMV0gLSB0aGlzLnRyaWdnZXIuZW5kWzFdXHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbihkZWx0YVkgLyBNYXRoLmFicyhkZWx0YVgpKVxyXG4gICAgICAgICAgICB0aGlzLnNob290KFtNYXRoLmNvcyhhbmdsZSkgKiBNYXRoLnNpZ24oZGVsdGFYKSAqIHRoaXMub3B0aW9ucy5iYWxscy5tb3ZlU3BlZWQsIE1hdGguc2luKGFuZ2xlKSAqIHRoaXMub3B0aW9ucy5iYWxscy5tb3ZlU3BlZWRdKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyaWdnZXIuZW5kID0gdGhpcy50cmlnZ2VyLnN0YXJ0XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFJlbmRlciBNZXRob2RzXHJcbiAgICByZW5kZXIgKGZyYW1lcykge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIGlmIChmcmFtZXMuaW5kZXggJSB0aGlzLm9wdGlvbnMuYmFsbHMuZ2VuZXJhdGVTcGVlZCA9PT0gMCAmJiB0aGlzLmhvd01hbnlTaG91bGRTaG9vdCA+IDApIHRoaXMuc2hvb3RJZk5lZWRlZCgpXHJcbiAgICAgICAgdGhpcy5kcmF3QmFsbHNBbmRCb3hlcygpXHJcbiAgICAgICAgdGhpcy5kcmF3R3JvdW5kKClcclxuICAgICAgICB0aGlzLmRyYXdUcmlnZ2VyKClcclxuICAgIH1cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXHJcbiAgICB9XHJcbiAgICBkcmF3R3JvdW5kICgpIHtcclxuICAgICAgICAvLyBEcmF3aW5nIG9uR3JvdW5kIEJhbGxcclxuICAgICAgICBpZiAodGhpcy5vbkdyb3VuZEJhbGxYICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdBRmFrZUJhbGwodGhpcy5vbkdyb3VuZEJhbGxYLCB0aGlzLmxvd2VzdFksIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5leHRPbkdyb3VuZEJhbGxYICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdBRmFrZUJhbGwodGhpcy5uZXh0T25Hcm91bmRCYWxsWCwgdGhpcy5sb3dlc3RZLCAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEcmF3aW5nIEdyb3VuZFxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5ncm91bmQuY29sb3JcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCB0aGlzLmhlaWdodCAtIHRoaXMub3B0aW9ucy5ncm91bmQuaGVpZ2h0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcclxuICAgIH1cclxuICAgIGRyYXdCYWxsc0FuZEJveGVzICgpIHtcclxuICAgICAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5ib3hlcykgZm9yIChsZXQgYm94IG9mIHJvdykgYm94LnJlbmRlcigpXHJcbiAgICAgICAgZm9yIChsZXQgYmFsbCBvZiB0aGlzLmJhbGxzKSBiYWxsLnJlbmRlcigpXHJcbiAgICB9XHJcbiAgICBkcmF3VHJpZ2dlciAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcklzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YVggPSB0aGlzLnRyaWdnZXIuc3RhcnRbMF0gLSB0aGlzLnRyaWdnZXIuZW5kWzBdXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IHRoaXMudHJpZ2dlci5zdGFydFsxXSAtIHRoaXMudHJpZ2dlci5lbmRbMV1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZ2FtZS50cmlnZ2VyQmFsbHNDb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3QUZha2VCYWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlci5zdGFydFswXSAtIChkZWx0YVggKiBpIC8gdGhpcy5vcHRpb25zLmdhbWUudHJpZ2dlckJhbGxzQ291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlci5zdGFydFsxXSAtIChkZWx0YVkgKiBpIC8gdGhpcy5vcHRpb25zLmdhbWUudHJpZ2dlckJhbGxzQ291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIDEgLyBNYXRoLnNxcnQoaSArIDEpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zcmMvR2FtZS5qcyIsImltcG9ydCBGcmFtZXNGbG93IGZyb20gJy4vY29tcG9uZW50cy9GcmFtZXNGbG93J1xuXG4vLyBkZWZpbmluZyBmcmFtZXNGbG93IGFzIGEgZ2xvYmFsIG9iamVjdFxuaWYgKCEod2luZG93LmZyYW1lc0Zsb3cgaW5zdGFuY2VvZiBGcmFtZXNGbG93KSkgeyAvLyBpZiBpdCBkaWRuJ3QgZGVmaW5lIGJlZm9yZVxuICAgIHdpbmRvdy5mcmFtZXNGbG93ID0gbmV3IEZyYW1lc0Zsb3coKVxufVxuXG4vLyBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IHdpbmRvdy5mcmFtZXNGbG93XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZyYW1lc2Zsb3cvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIEJhbGwge1xyXG4gICAgY29uc3RydWN0b3IgKGdhbWUsIHN0YXJ0WCwgdmVsb2NpdHlWZWN0b3IpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmdhbWUuY3R4XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVZlY3RvciA9IHZlbG9jaXR5VmVjdG9yXHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLmdhbWUub3B0aW9ucy5iYWxscy5yYWRpdXNcclxuICAgICAgICB0aGlzLndlaWdodCA9IDFcclxuICAgICAgICB0aGlzLnggPSBzdGFydFhcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmdhbWUubG93ZXN0WVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlICgpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5VmVjdG9yID0gbnVsbFxyXG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmVCYWxsKHRoaXMpXHJcbiAgICB9XHJcbiAgICByZWZsZWN0IChyZWZsZWN0QXJyKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVZlY3RvclswXSAqPSByZWZsZWN0QXJyWzBdXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVZlY3RvclsxXSAqPSByZWZsZWN0QXJyWzFdXHJcbiAgICB9XHJcbiAgICBjb21wdXRlQ29sbGlzaW9ucyAoKSB7XHJcbiAgICAgICAgLy8gV2FsbHMgQ29sbGlzaW9uc1xyXG4gICAgICAgIGlmICh0aGlzLnggPj0gdGhpcy5nYW1lLmhpZ2hlc3RYKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZ2FtZS5oaWdoZXN0WFxyXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3QoWy0xLCAxXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueCA8PSB0aGlzLmdhbWUubG93ZXN0WCkge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLmdhbWUubG93ZXN0WFxyXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3QoWy0xLCAxXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueSA8PSB0aGlzLmdhbWUuaGlnaGVzdFkpIHtcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5nYW1lLmhpZ2hlc3RZXHJcbiAgICAgICAgICAgIHRoaXMucmVmbGVjdChbMSwgLTFdKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCb3hlcyBDb2xsaXNpb25zXHJcbiAgICAgICAgZm9yIChsZXQgcm93IG9mIHRoaXMuZ2FtZS5ib3hlcykgZm9yIChsZXQgYm94IG9mIHJvdykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3QoYm94LmNoZWNrQ29sbGlzaW9uV2l0aCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wdXRlR3Jhdml0eSAoKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVZlY3RvclsxXSAtPSB0aGlzLmdhbWUub3B0aW9ucy5nYW1lLmdyYXZpdHlcclxuICAgIH1cclxuICAgIGNoZWNrSWZTaG91bGREaWUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnkgPiB0aGlzLmdhbWUubG93ZXN0WSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLm9uR3JvdW5kQmFsbFggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUub25Hcm91bmRCYWxsWCA9IHRoaXMueFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5vbkdyb3VuZEJhbGxYICE9PSAtMSAmJiB0aGlzLmdhbWUubmV4dE9uR3JvdW5kQmFsbFggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUubmV4dE9uR3JvdW5kQmFsbFggPSB0aGlzLnhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuYmFsbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUubmV4dE9uR3JvdW5kQmFsbFggPSAtMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmdvTmV4dFN0ZXAoKVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5pc0xvY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCAzMDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW92ZXMgYW5kIEFuaW1hdGlvblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZXMoKVxyXG4gICAgICAgIHRoaXMuZHJhdygpXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VzICgpIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVDb2xsaXNpb25zKClcclxuICAgICAgICB0aGlzLmNvbXB1dGVHcmF2aXR5KClcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVZlY3RvclswXVxyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5VmVjdG9yWzFdXHJcbiAgICAgICAgdGhpcy5jaGVja0lmU2hvdWxkRGllKClcclxuICAgIH1cclxuICAgIGRyYXcgKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXHJcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZ2FtZS5vcHRpb25zLmJhbGxzLmNvbG9yXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhbGxcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc3JjL0JhbGwuanMiLCJjb25zdCBjb2xvcnMgPSBbXHJcbiAgICAncmVkJyxcclxuICAgICdibHVlJyxcclxuICAgICdtYWdlbnRhJyxcclxuICAgICd5ZWxsb3cnXHJcbl1cclxubGV0IGxhc3RDaG9zZW5Db2xvckluZGV4ID0gLTFcclxuY29uc3QgbmV4dENvbG9yID0gKCkgPT4ge1xyXG4gICAgbGFzdENob3NlbkNvbG9ySW5kZXgrK1xyXG4gICAgaWYgKGxhc3RDaG9zZW5Db2xvckluZGV4ID09PSBjb2xvcnMubGVuZ3RoKSBsYXN0Q2hvc2VuQ29sb3JJbmRleCA9IDBcclxuICAgIHJldHVybiBjb2xvcnNbbGFzdENob3NlbkNvbG9ySW5kZXhdXHJcbn1cclxuXHJcbmNsYXNzIEJveCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgcGxhY2UpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmdhbWUuY3R4XHJcbiAgICAgICAgdGhpcy5zdGVwID0gdGhpcy5nYW1lLnN0ZXBcclxuICAgICAgICB0aGlzLnBsYWNlID0gcGxhY2VcclxuICAgICAgICB0aGlzLndlaWdodCA9ICh0aGlzLnN0ZXAgKyAxKSAqIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIgKyAxKVxyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuZ2FtZS5ib3hTaXplXHJcbiAgICAgICAgdGhpcy5jb2xvciA9IG5leHRDb2xvcigpXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHt4OiB0aGlzLnBsYWNlICogdGhpcy5zaXplLCB5OiAwfVxyXG4gICAgICAgIHRoaXMucG9zaXRpb25PbkRpc3BsYXkgPSB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiAtdGhpcy5zaXplfVxyXG4gICAgICAgIHRoaXMub25TdGVwQ2hhbmdlZCgpXHJcbiAgICB9XHJcbiAgICByZW1vdmUgKCkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBudWxsXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbk9uRGlzcGxheSA9IG51bGxcclxuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlQm94KHRoaXMpXHJcbiAgICB9XHJcbiAgICBjaGVja0NvbGxpc2lvbldpdGggKGJhbGwpIHtcclxuICAgICAgICBjb25zdCBkaXN0WCA9IE1hdGguYWJzKGJhbGwueCAtIHRoaXMucG9zaXRpb25PbkRpc3BsYXkueCAtIHRoaXMuc2l6ZS8yKVxyXG4gICAgICAgIGNvbnN0IGRpc3RZID0gTWF0aC5hYnMoYmFsbC55IC0gdGhpcy5wb3NpdGlvbk9uRGlzcGxheS55IC0gdGhpcy5zaXplLzIpXHJcbiAgICAgICAgLy8gSWYgbm8gY29sbGlzaW9uIGRldGVjdGVkXHJcbiAgICAgICAgaWYgKGRpc3RYID4gKHRoaXMuc2l6ZS8yICsgYmFsbC5yYWRpdXMpKSByZXR1cm4gWzEsIDFdXHJcbiAgICAgICAgaWYgKGRpc3RZID4gKHRoaXMuc2l6ZS8yICsgYmFsbC5yYWRpdXMpKSByZXR1cm4gWzEsIDFdXHJcbiAgICAgICAgLy8gSWYgaGFzIGNvbGxpc2lvbnNcclxuICAgICAgICBsZXQgcmV0ID0gWy0xLCAtMV1cclxuICAgICAgICBpZiAoZGlzdFkgPCB0aGlzLnNpemUvMikge1xyXG4gICAgICAgICAgICBpZiAoYmFsbC52ZWxvY2l0eVZlY3RvclswXSA+PSAwKSBiYWxsLnggPSB0aGlzLnBvc2l0aW9uT25EaXNwbGF5LnggLSBiYWxsLnJhZGl1c1xyXG4gICAgICAgICAgICBlbHNlIGJhbGwueCA9IHRoaXMucG9zaXRpb25PbkRpc3BsYXkueCArIHRoaXMuc2l6ZSArIGJhbGwucmFkaXVzXHJcbiAgICAgICAgICAgIHJldCA9IFstMSwgMV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlzdFggPCB0aGlzLnNpemUvMikge1xyXG4gICAgICAgICAgICBpZiAoYmFsbC52ZWxvY2l0eVZlY3RvclsxXSA+PSAwKSBiYWxsLnkgPSB0aGlzLnBvc2l0aW9uT25EaXNwbGF5LnkgLSBiYWxsLnJhZGl1c1xyXG4gICAgICAgICAgICBlbHNlIGJhbGwueSA9IHRoaXMucG9zaXRpb25PbkRpc3BsYXkueSArIHRoaXMuc2l6ZSArIGJhbGwucmFkaXVzXHJcbiAgICAgICAgICAgIHJldCA9IFsxLCAtMV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkJhbGxDb2xsaXNlZChiYWxsKVxyXG4gICAgICAgIC8vIElmIGl0IGNvbGxpc2VkIHdpdGggYSBjb3JuZXJcclxuICAgICAgICByZXR1cm4gcmV0XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuZXJzXHJcbiAgICBvblN0ZXBDaGFuZ2VkICgpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAoKHRoaXMuZ2FtZS5zdGVwIC0gdGhpcy5zdGVwKSAqIHRoaXMuc2l6ZSkgKyB0aGlzLnNpemVcclxuICAgIH1cclxuICAgIG9uQmFsbENvbGxpc2VkIChiYWxsKSB7XHJcbiAgICAgICAgdGhpcy53ZWlnaHQgPSBNYXRoLm1heCgwLCB0aGlzLndlaWdodCAtIGJhbGwud2VpZ2h0KVxyXG4gICAgICAgIGlmICh0aGlzLndlaWdodCA9PT0gMCkgdGhpcy5yZW1vdmUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vdmVzIGFuZCBBbmltYXRpb25cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VzKClcclxuICAgICAgICB0aGlzLmRyYXcoKVxyXG4gICAgfVxyXG4gICAgY2hhbmdlcyAoKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbk9uRGlzcGxheS55ICs9ICh0aGlzLnBvc2l0aW9uLnkgLSB0aGlzLnBvc2l0aW9uT25EaXNwbGF5LnkpIC8gMTBcclxuICAgIH1cclxuICAgIGRyYXcgKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uT25EaXNwbGF5LngsIHRoaXMucG9zaXRpb25PbkRpc3BsYXkueSwgdGhpcy5zaXplLCB0aGlzLnNpemUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdHguZm9udD1cIjIwcHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ249XCJjZW50ZXJcIjsgXHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndlaWdodCwgdGhpcy5wb3NpdGlvbk9uRGlzcGxheS54ICsgdGhpcy5zaXplLzIsIHRoaXMucG9zaXRpb25PbkRpc3BsYXkueSArIHRoaXMuc2l6ZS8yKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCb3hcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc3JjL0JveC5qcyIsImltcG9ydCAnZnJhbWVzZmxvdydcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9hcHAvc3JjL0dhbWUnXHJcblxyXG5jb25zdCBiYWxseiA9IHdpbmRvdy5iYWxseiA9IG5ldyBHYW1lKCcjcGxheWdyb3VuZCcpXHJcblxyXG5iYWxsei5zdGFydCgpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJpbXBvcnQgUmVuZGVyZXJBcnJheSBmcm9tICcuL1JlbmRlcmVyQXJyYXknXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcidcblxuLy8gQ29tcGF0aWJpbGl0eSBmb3IgYWxsIGJyb3dzZXJzIC0gUGF1bCBJcmlzaCB2ZXJzaW9uXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKVxuICAgICAgICAgIH1cbn0pKClcblxuLy8gRnJhbWVzRmxvd1xuY2xhc3MgRnJhbWVzRmxvdyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDBcbiAgICAgICAgdGhpcy5fZnBzID0gMzBcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgbWluaW11bUFjY2VwdGFibGVGUFM6IDMwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlcnMgPSBuZXcgUmVuZGVyZXJBcnJheVxuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlID0ge1xuICAgICAgICAgICAgbG9nczogbmV3IEFycmF5KDEwMCksXG4gICAgICAgICAgICBsb2dzUG9pbnRlcjogMCxcbiAgICAgICAgICAgIGxhc3RUaW1lU3RhbXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxhc3RGcmFtZUZQUzogMzAsXG4gICAgICAgICAgICByYXRpbzogMSxcbiAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgIGF2ZXJhZ2U6IHtcbiAgICAgICAgICAgICAgICBmcHM6IDMwLFxuICAgICAgICAgICAgICAgIHJhdGlvOiAxLFxuICAgICAgICAgICAgICAgIHN0YXR1czogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdExvb3AoKVxuICAgIH1cbiAgICBnZXQgKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVycy5nZXQoaWQpXG4gICAgfVxuICAgIGdldEFsbCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyc1xuICAgIH1cbiAgICBnZXRBbGxCeUNsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXJzLmZpbHRlcihyZW5kZXJlciA9PiByZW5kZXJlci5jbGFzcyA9PSBjbGFzc05hbWUpXG4gICAgfVxuICAgIHJlbW92ZVJlbmRlcmVyQnlJZCAoaWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlcnMucmVtb3ZlKGlkKVxuICAgIH1cbiAgICBjaGVja1ZhbGlkYXRpb25PZkZyYW1lUmF0ZSAocmF0ZSwgaXNHbG9iYWxDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBlcnJvciA9IG51bGxcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IGlzR2xvYmFsQ2hlY2sgPyAnYW55JyA6ICd0aGlzJ1xuICAgICAgICBpZiAocmF0ZSA8IDApIGVycm9yID0gJ0ZQUyBtdXN0IG5vdCBiZSBhIG5lZ2F0aXZlIG51bWJlciEnXG4gICAgICAgIGVsc2UgaWYgKHJhdGUgPCAzMCAmJiByYXRlID4gMCAmJiAoMzAgLyByYXRlKSAlIDEgIT09IDApIGVycm9yID0gJ2lmIEZQUyBpcyBsZXNzIHRoYW4gMzBmcHMsIGl0IGhhdmUgdG8gYmUgbGlrZSB0aGlzOiAoMzAgLyBGUFMpIHNob3VsZCBiZSBpbnRlZ2VyJ1xuICAgICAgICBlbHNlIGlmIChyYXRlID4gMzAgJiYgcmF0ZSAlIDMwICE9PSAwKSBlcnJvciA9ICdpZiBGUFMgaXMgbW9yZSB0aGFuIDMwZnBzLCBpdCBoYXZlIHRvIGJlIGxpa2UgdGhpczogKEZQUyAlIDMwID09IDApJ1xuICAgICAgICBpZiAoZXJyb3IgIT09IG51bGwpIHRocm93IGBjYW4ndCBzZXQgJHtyYXRlfWZwcyBmb3IgdGhpcyByZW5kZXJlci4gUkVBU09OOiA8JHtlcnJvcn0+YFxuICAgIH1cbiAgICBnZXQgZnBzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zwc1xuICAgIH1cbiAgICBzZXQgZnBzIChuZXdGUFMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uT2ZGcmFtZVJhdGUocmF0ZSwgdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMuX2ZwcyA9IG5ld0ZQU1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheUFsbCAoKSB7XG4gICAgICAgIGZvciAobGV0IHJlbmRlcmVyIG9mIHRoaXMuZ2V0QWxsUmVuZGVyZXJzKCkpIHJlbmRlcmVyLnBsYXkoKVxuICAgIH1cbiAgICBwYXVzZUFsbCAoKSB7XG4gICAgICAgIGZvciAobGV0IHJlbmRlcmVyIG9mIHRoaXMuZ2V0QWxsUmVuZGVyZXJzKCkpIHJlbmRlcmVyLnBhdXNlKClcbiAgICB9XG4gICAgcmVuZGVyIChjbGFzc05hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZnVuYyA9IGNsYXNzTmFtZVxuICAgICAgICAgICAgY2xhc3NOYW1lID0gJydcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzLCB7XG4gICAgICAgICAgICBpZDogdGhpcy5yZW5kZXJlcnMubGVuZ3RoLFxuICAgICAgICAgICAgY2xhc3M6IGNsYXNzTmFtZVxuICAgICAgICB9LCBmdW5jKVxuICAgICAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcmVyKVxuICAgICAgICByZXR1cm4gcmVuZGVyZXJcbiAgICB9XG4gICAgb25MYWcgKG1pbmltdW1GUFMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWluaW11bUZQUyA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayA9IG1pbmltdW1GUFNcbiAgICAgICAgZWxzZSB0aGlzLm9wdGlvbnMubWluaW11bUFjY2VwdGFibGVGUFMgPSBtaW5pbXVtRlBTXG4gICAgICAgIHRoaXMub25MYWdDYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgfVxuICAgIHJlZ2lzdGVyUGVyZm9ybWFuY2VMb2cgKHJlbmRlclRpbWUpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRpbmcgZnBzXG4gICAgICAgIHRoaXMucGVyZm9ybWFuY2UubGFzdEZyYW1lRlBTID0gMTAwMCAvIHJlbmRlclRpbWVcbiAgICAgICAgLy8gQ2FsY3VsYXRpbmcgbGFnc1xuICAgICAgICBpZiAodGhpcy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFMgPCB0aGlzLm9wdGlvbnMubWluaW11bUFjY2VwdGFibGVGUFMpIGlmICh0eXBlb2YgdGhpcy5vbkxhZ0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLm9uTGFnQ2FsbGJhY2sodGhpcy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFMpXG4gICAgICAgIC8vIGxvZ2dpbmdcbiAgICAgICAgdGhpcy5wZXJmb3JtYW5jZS5sb2dzW3RoaXMucGVyZm9ybWFuY2UubG9nc1BvaW50ZXJdID0gdGhpcy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFNcbiAgICAgICAgdGhpcy5wZXJmb3JtYW5jZS5sb2dzUG9pbnRlciA9ICh0aGlzLnBlcmZvcm1hbmNlLmxvZ3NQb2ludGVyICsgMSkgJSAxMDBcbiAgICAgICAgLy8gYW5hbHl6aW5nIGxvZ3NcbiAgICAgICAgdGhpcy5hbmFseXplUGVyZm9ybWFuY2UoKVxuICAgIH1cbiAgICBhbmFseXplUGVyZm9ybWFuY2UgKCkge1xuICAgICAgICBjb25zdCBhbGxEYXRhID0gdGhpcy5wZXJmb3JtYW5jZS5sb2dzLmZpbHRlcihkYXRhID0+IHR5cGVvZiBkYXRhID09ICdudW1iZXInKVxuICAgICAgICAvLyBDYWxjdWxhdGluZyBhdmVyYWdlIG9mIGRhdGFcbiAgICAgICAgbGV0IEZQU1N1bSA9IDBcbiAgICAgICAgZm9yIChsZXQgZGF0YSBvZiBhbGxEYXRhKSBGUFNTdW0gKz0gZGF0YVxuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlLmF2ZXJhZ2UuZnBzID0gRlBTU3VtIC8gYWxsRGF0YS5sZW5ndGhcbiAgICAgICAgLy8gQ2FsY3VsYXRpbmcgcGVyZm9ybWFuY2UgcGVyY2VudGFnZVxuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlLnJhdGlvID0gdGhpcy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFMgLyAzMFxuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlLmF2ZXJhZ2UucmF0aW8gPSB0aGlzLnBlcmZvcm1hbmNlLmF2ZXJhZ2UuZnBzIC8gMzBcbiAgICAgICAgLy8gZGVmaW5pbmcgc3RhdHVzXG4gICAgICAgIHRoaXMucGVyZm9ybWFuY2Uuc3RhdHVzID0gdGhpcy5fZ2V0U3RhdHVzT2ZGUFModGhpcy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFMpXG4gICAgICAgIHRoaXMucGVyZm9ybWFuY2UuYXZlcmFnZS5zdGF0dXMgPSB0aGlzLl9nZXRTdGF0dXNPZkZQUyh0aGlzLnBlcmZvcm1hbmNlLmF2ZXJhZ2UuZnBzKVxuICAgIH1cbiAgICBfZ2V0U3RhdHVzT2ZGUFMgKGZwcykge1xuICAgICAgICBjb25zdCByYXRpbyA9IGZwcyAvIHRoaXMuZnBzXG4gICAgICAgIGxldCBzdGF0dXMgPSAtMyAvLyBXT1JTVFxuICAgICAgICBpZiAocmF0aW8gPiAwLjMpIHN0YXR1cyA9IC0yIC8vIEJBRFxuICAgICAgICBpZiAocmF0aW8gPiAwLjYpIHN0YXR1cyA9IC0xIC8vIE5PVCBCQURcbiAgICAgICAgaWYgKHJhdGlvID4gMC45KSBzdGF0dXMgPSAwIC8vIE9LXG4gICAgICAgIGlmIChyYXRpbyA+IDEuMykgc3RhdHVzID0gMSAvLyBHT09EXG4gICAgICAgIGlmIChyYXRpbyA+IDEuNikgc3RhdHVzID0gMiAvLyBFWENFTExFTlRcbiAgICAgICAgaWYgKHJhdGlvID4gMikgc3RhdHVzID0gMyAvLyBCRVNUXG4gICAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG4gICAgcmVxdWVzdExvb3AgKCkge1xuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKHRoaXMucmVxdWVzdExvb3AuYmluZCh0aGlzKSlcbiAgICAgICAgdGhpcy5mcmFtZXMrK1xuICAgICAgICB0aGlzLnJlbmRlcmVycy5lYWNoKHJlbmRlcmVyID0+IHJlbmRlcmVyLnJlbmRlcigpKVxuICAgICAgICBpZiAodGhpcy5wZXJmb3JtYW5jZS5sYXN0VGltZVN0YW1wICE9PSB1bmRlZmluZWQpIHRoaXMucmVnaXN0ZXJQZXJmb3JtYW5jZUxvZyhEYXRlLm5vdygpIC0gdGhpcy5wZXJmb3JtYW5jZS5sYXN0VGltZVN0YW1wKVxuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlLmxhc3RUaW1lU3RhbXAgPSBEYXRlLm5vdygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGcmFtZXNGbG93XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZyYW1lc2Zsb3cvc3JjL2NvbXBvbmVudHMvRnJhbWVzRmxvdy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IgKGZyYW1lc0Zsb3csIG9wdGlvbnMsIGZ1bmMpIHtcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnMuaWRcbiAgICAgICAgdGhpcy5jbGFzcyA9IG9wdGlvbnMuY2xhc3MgfHwgJydcbiAgICAgICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgICAgICAgIGlzRGVidWdpbmc6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mcmFtZXNGbG93ID0gZnJhbWVzRmxvd1xuICAgICAgICB0aGlzLl9mcHMgPSB1bmRlZmluZWRcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuY1xuICAgICAgICB0aGlzLmZyYW1lcyA9IDBcbiAgICAgICAgdGhpcy5zaG91bGRHb05leHQgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgfVxuICAgIC8vIFJlbmRlciBuZXh0IGZyYW1lXG4gICAgbmV4dCAoKSB7XG4gICAgICAgIHRoaXMuc2hvdWxkR29OZXh0ID0gdHJ1ZVxuICAgIH1cbiAgICByZW1vdmUgKCkge1xuICAgICAgICB0aGlzLmZyYW1lc0Zsb3cucmVtb3ZlUmVuZGVyZXJCeUlkKHRoaXMuaWQpXG4gICAgfVxuICAgIHBhdXNlICgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pc0RlYnVnaW5nID0gdHJ1ZVxuICAgIH1cbiAgICBwbGF5ICgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pc0RlYnVnaW5nID0gZmFsc2VcbiAgICB9XG4gICAgc2V0IGZwcyAobmV3RlBTKSB7XG4gICAgICAgIGlmIChuZXdGUFMgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5fZnBzID0gbmV3RlBTXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lc0Zsb3cuY2hlY2tWYWxpZGF0aW9uT2ZGcmFtZVJhdGUobmV3RlBTKVxuICAgICAgICAgICAgdGhpcy5fZnBzID0gbmV3RlBTXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZnBzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZwcyB8fCB0aGlzLmZyYW1lc0Zsb3cuZnBzXG4gICAgfVxuICAgIHNob3VsZFJlbmRlclRoaXNGcmFtZSAoKSB7XG4gICAgICAgIC8vIGFsbCBjb25kaXRpb25zIHRvIHBhdXNlIG9yIHBsYXkgcmVuZGVyaW5nXG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBbXG4gICAgICAgICAgICAhdGhpcy5wcm9wcy5pc0RlYnVnaW5nLFxuICAgICAgICAgICAgdGhpcy5mcmFtZXNGbG93LmZyYW1lcyAlICgzMCAvIE1hdGgubWluKHRoaXMuZnBzLCAzMCkpID09IDAsXG4gICAgICAgIF1cbiAgICAgICAgbGV0IHJldCA9IHRydWVcbiAgICAgICAgZm9yIChsZXQgY29uZCBvZiBjb25kaXRpb25zKSByZXQgPSByZXQgJiYgY29uZFxuICAgICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIGdldEZyYW1lT2JqZWN0VG9SZXR1cm4gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyZXI6IHRoaXMsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5mcmFtZXMsXG4gICAgICAgICAgICBmcHM6IHRoaXMuZnBzLFxuICAgICAgICAgICAgcGVyZm9ybWFuY2U6IHtcbiAgICAgICAgICAgICAgICBmcHM6IHRoaXMuZnJhbWVzRmxvdy5wZXJmb3JtYW5jZS5sYXN0RnJhbWVGUFMsXG4gICAgICAgICAgICAgICAgcmF0aW86IHRoaXMuZnJhbWVzRmxvdy5wZXJmb3JtYW5jZS5yYXRpbyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuZnJhbWVzRmxvdy5wZXJmb3JtYW5jZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgYXZlcmFnZTogdGhpcy5mcmFtZXNGbG93LnBlcmZvcm1hbmNlLmF2ZXJhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBpZiAodGhpcy5zaG91bGRSZW5kZXJUaGlzRnJhbWUoKSB8fCB0aGlzLnNob3VsZEdvTmV4dCkge1xuICAgICAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IDBcbiAgICAgICAgICAgIGlmICh0aGlzLmZwcyA+IDMwKSBpdGVyYXRpb24gPSAoTWF0aC5tYXgodGhpcy5mcHMsIDMwKSAvIDMwKVxuICAgICAgICAgICAgZWxzZSBpdGVyYXRpb24gPSAzMCAvIHRoaXMuZnBzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZXMrK1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkR29OZXh0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmModGhpcy5nZXRGcmFtZU9iamVjdFRvUmV0dXJuKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlcmVyXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZyYW1lc2Zsb3cvc3JjL2NvbXBvbmVudHMvUmVuZGVyZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgUmVuZGVyZXJBcnJheSB7XHJcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnYXJyYXknKSB0aGlzLmFyciA9IGFyZ3NbMF1cclxuICAgICAgICBlbHNlIHRoaXMuYXJyID0gbmV3IEFycmF5KC4uLmFyZ3MpXHJcbiAgICB9XHJcbiAgICBnZXQgKGkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJbaV1cclxuICAgIH1cclxuICAgIHNldCAoaSwgdmFsKSB7XHJcbiAgICAgICAgdGhpcy5hcnJbaV0gPSB2YWxcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgcHVzaCAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5hcnIucHVzaCh2YWwpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIHJlbW92ZSAoaSkge1xyXG4gICAgICAgIHRoaXMuYXJyW2ldID0gdW5kZWZpbmVkXHJcbiAgICAgICAgdGhpcy5hcnIuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIGZpbHRlciAoY29uZEZ1bmMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlbmRlcmVyQXJyYXkodGhpcy5hcnIuZmlsdGVyKGNvbmRGdW5jKSlcclxuICAgIH1cclxuICAgIGVhY2ggKGNiKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmFycikgY2IoaXRlbSlcclxuICAgIH1cclxuICAgIGdldCBsZW5ndGggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyci5sZW5ndGhcclxuICAgIH1cclxuICAgIHRvQXJyYXkgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyclxyXG4gICAgfVxyXG4gICAgc2V0IGZwcyAobmV3RlBTKSB7XHJcbiAgICAgICAgdGhpcy5lYWNoKHJlbmRlcmVyID0+IHJlbmRlcmVyLmZwcyA9IG5ld0ZQUylcclxuICAgIH1cclxuICAgIHJlbW92ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5lYWNoKHJlbmRlcmVyID0+IHJlbmRlcmVyLnJlbW92ZSgpKVxyXG4gICAgfVxyXG4gICAgbmV4dCAoKSB7XHJcbiAgICAgICAgdGhpcy5lYWNoKHJlbmRlcmVyID0+IHJlbmRlcmVyLm5leHQoKSlcclxuICAgIH1cclxuICAgIHBhdXNlICgpIHtcclxuICAgICAgICB0aGlzLmVhY2gocmVuZGVyZXIgPT4gcmVuZGVyZXIucGF1c2UoKSlcclxuICAgIH1cclxuICAgIHBsYXkgKCkge1xyXG4gICAgICAgIHRoaXMuZWFjaChyZW5kZXJlciA9PiByZW5kZXJlci5wbGF5KCkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlbmRlcmVyQXJyYXlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnJhbWVzZmxvdy9zcmMvY29tcG9uZW50cy9SZW5kZXJlckFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
