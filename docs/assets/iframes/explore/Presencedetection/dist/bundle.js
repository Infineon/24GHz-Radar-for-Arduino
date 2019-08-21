/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"./docs/assets/iframes/explore/mohamedversion1": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([5,"docs/assets/iframes/commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/actions/DaemonActions.js":
/*!**********************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/actions/DaemonActions.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeamonActions; });
/* harmony import */ var arduino_create_agent_js_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arduino-create-agent-js-client */ "./node_modules/arduino-create-agent-js-client/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DeamonActions =
/*#__PURE__*/
function () {
  function DeamonActions() {
    var serialConsole = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var serialConnection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, DeamonActions);

    this.daemon = undefined;
    this.serialConsole = undefined;
    this.serialConnection = undefined;
    this.daemon = new arduino_create_agent_js_client__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.registerSerialConsole(serialConsole);
    this.registerSerialConnection(serialConnection);
  }

  _createClass(DeamonActions, [{
    key: "registerSerialConsole",
    value: function registerSerialConsole(serialConsole) {
      this.serialConsole = serialConsole;
      this.subscribeChannelOpenStatus();
      this.subscribeError();
      this.subscribeSerialMonitorMessages(); // Add downloading and uploading
    }
  }, {
    key: "registerSerialConnection",
    value: function registerSerialConnection(serialConnection) {
      this.serialConnection = serialConnection;
      this.subscribeDevices();
      this.subscribeAgentFound();
    }
  }, {
    key: "openPort",
    value: function openPort(port, baudRate) {
      this.daemon.openSerialMonitor(port, baudRate);
    }
  }, {
    key: "writeMessage",
    value: function writeMessage(port, message) {
      this.daemon.writeSerial(port, message);
    }
  }, {
    key: "closePort",
    value: function closePort(port) {
      this.daemon.closeSerialMonitor(port);
    }
  }, {
    key: "subscribeChannelOpenStatus",
    value: function subscribeChannelOpenStatus() {
      var _this = this;

      if (this.serialConsole) {
        this.daemon.channelOpenStatus.subscribe(function (status) {
          if (status !== null) {
            _this.serialConsole.addMessage('ChannelOpenStatus: ' + status + '\r\n');
          }

          return true;
        });
      } else {
        return false;
      }
    }
  }, {
    key: "subscribeAgentFound",
    value: function subscribeAgentFound() {
      var _this2 = this;

      if (this.serialConnection) {
        this.daemon.agentFound.subscribe(function (status) {
          _this2.serialConnection.updateAgentStatus(status);

          return true;
        });
      } else {
        return false;
      }
    }
  }, {
    key: "subscribeError",
    value: function subscribeError() {
      var _this3 = this;

      if (this.serialConsole) {
        this.daemon.error.subscribe(function (err) {
          if (err) {
            _this3.serialConsole.addMessage('Error: ' + err);
          }

          return true;
        });
      } else {
        return false;
      }
    }
  }, {
    key: "subscribeDevices",
    value: function subscribeDevices() {
      var _this4 = this;

      if (this.serialConnection) {
        this.daemon.devicesList.subscribe(function (_ref) {
          var serial = _ref.serial,
              network = _ref.network;
          var devices = serial.concat(network);

          _this4.serialConnection.updateDevices(devices);

          return true;
        });
      } else {
        return false;
      }
    }
  }, {
    key: "subscribeSerialMonitorMessages",
    value: function subscribeSerialMonitorMessages() {
      var _this5 = this;

      if (this.serialConsole) {
        this.daemon.serialMonitorMessages.subscribe(function (message) {
          _this5.serialConsole.addMessage(message);

          return true;
        });
      } else {
        return false;
      }
    }
  }, {
    key: "subscribeUploading",
    value: function subscribeUploading() {
      // TODO: implement meaningfully
      this.daemon.uploading.subscribe(function (upload) {
        console.log(status);
      });
    }
  }, {
    key: "subscribeDownloading",
    value: function subscribeDownloading() {
      // TODO: implement meaningfully
      this.daemon.downloading.subscribe(function (download) {
        console.log(download);
      });
    }
  }]);

  return DeamonActions;
}();



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/actions/FFT.js":
/*!************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/actions/FFT.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FFTNayuki; });
/* 
 * Free FFT and convolution (JavaScript)
 * 
 * Copyright (c) 2014 Project Nayuki
 * http://www.nayuki.io/page/free-small-fft-in-multiple-languages
 *
 * (MIT License)
 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 *
 *  Slightly restructured by Chris Cannam, cannam@all-day-breakfast.com
 *  
 */

/* 
 * Construct an object for calculating thefft_size discrete Fourier transform (DFT) of size n, where n is a power of 2.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FFTNayuki =
/*#__PURE__*/
function () {
  function FFTNayuki() {
    _classCallCheck(this, FFTNayuki);

    // Sense2GoL data
    this.fft_size = 128;
    this.fft_threshold = 100;
    this.cycle_time = 140;
    this.sampling_rate = 1408;
    this.settle_time = 220000;
    this.freqWidth = this.sampling_rate / this.fft_size;
    this.fftOrder = Math.log2(this.fft_size);
    this.freqToSpeedRatio = 0.0225;
    this.n_wave = 1024;
    /* full length of Sinewave[] */

    this.log2_n_wave = 10;
    this.Sinewave = [0, 201, 402, 603, 804, 1005, 1206, 1406, 1607, 1808, 2009, 2209, 2410, 2610, 2811, 3011, 3211, 3411, 3611, 3811, 4011, 4210, 4409, 4608, 4807, 5006, 5205, 5403, 5601, 5799, 5997, 6195, 6392, 6589, 6786, 6982, 7179, 7375, 7571, 7766, 7961, 8156, 8351, 8545, 8739, 8932, 9126, 9319, 9511, 9703, 9895, 10087, 10278, 10469, 10659, 10849, 11038, 11227, 11416, 11604, 11792, 11980, 12166, 12353, 12539, 12724, 12909, 13094, 13278, 13462, 13645, 13827, 14009, 14191, 14372, 14552, 14732, 14911, 15090, 15268, 15446, 15623, 15799, 15975, 16150, 16325, 16499, 16672, 16845, 17017, 17189, 17360, 17530, 17699, 17868, 18036, 18204, 18371, 18537, 18702, 18867, 19031, 19194, 19357, 19519, 19680, 19840, 20000, 20159, 20317, 20474, 20631, 20787, 20942, 21096, 21249, 21402, 21554, 21705, 21855, 22004, 22153, 22301, 22448, 22594, 22739, 22883, 23027, 23169, 23311, 23452, 23592, 23731, 23869, 24006, 24143, 24278, 24413, 24546, 24679, 24811, 24942, 25072, 25201, 25329, 25456, 25582, 25707, 25831, 25954, 26077, 26198, 26318, 26437, 26556, 26673, 26789, 26905, 27019, 27132, 27244, 27355, 27466, 27575, 27683, 27790, 27896, 28001, 28105, 28208, 28309, 28410, 28510, 28608, 28706, 28802, 28897, 28992, 29085, 29177, 29268, 29358, 29446, 29534, 29621, 29706, 29790, 29873, 29955, 30036, 30116, 30195, 30272, 30349, 30424, 30498, 30571, 30643, 30713, 30783, 30851, 30918, 30984, 31049, 31113, 31175, 31236, 31297, 31356, 31413, 31470, 31525, 31580, 31633, 31684, 31735, 31785, 31833, 31880, 31926, 31970, 32014, 32056, 32097, 32137, 32176, 32213, 32249, 32284, 32318, 32350, 32382, 32412, 32441, 32468, 32495, 32520, 32544, 32567, 32588, 32609, 32628, 32646, 32662, 32678, 32692, 32705, 32717, 32727, 32736, 32744, 32751, 32757, 32761, 32764, 32766, 32767, 32766, 32764, 32761, 32757, 32751, 32744, 32736, 32727, 32717, 32705, 32692, 32678, 32662, 32646, 32628, 32609, 32588, 32567, 32544, 32520, 32495, 32468, 32441, 32412, 32382, 32350, 32318, 32284, 32249, 32213, 32176, 32137, 32097, 32056, 32014, 31970, 31926, 31880, 31833, 31785, 31735, 31684, 31633, 31580, 31525, 31470, 31413, 31356, 31297, 31236, 31175, 31113, 31049, 30984, 30918, 30851, 30783, 30713, 30643, 30571, 30498, 30424, 30349, 30272, 30195, 30116, 30036, 29955, 29873, 29790, 29706, 29621, 29534, 29446, 29358, 29268, 29177, 29085, 28992, 28897, 28802, 28706, 28608, 28510, 28410, 28309, 28208, 28105, 28001, 27896, 27790, 27683, 27575, 27466, 27355, 27244, 27132, 27019, 26905, 26789, 26673, 26556, 26437, 26318, 26198, 26077, 25954, 25831, 25707, 25582, 25456, 25329, 25201, 25072, 24942, 24811, 24679, 24546, 24413, 24278, 24143, 24006, 23869, 23731, 23592, 23452, 23311, 23169, 23027, 22883, 22739, 22594, 22448, 22301, 22153, 22004, 21855, 21705, 21554, 21402, 21249, 21096, 20942, 20787, 20631, 20474, 20317, 20159, 20000, 19840, 19680, 19519, 19357, 19194, 19031, 18867, 18702, 18537, 18371, 18204, 18036, 17868, 17699, 17530, 17360, 17189, 17017, 16845, 16672, 16499, 16325, 16150, 15975, 15799, 15623, 15446, 15268, 15090, 14911, 14732, 14552, 14372, 14191, 14009, 13827, 13645, 13462, 13278, 13094, 12909, 12724, 12539, 12353, 12166, 11980, 11792, 11604, 11416, 11227, 11038, 10849, 10659, 10469, 10278, 10087, 9895, 9703, 9511, 9319, 9126, 8932, 8739, 8545, 8351, 8156, 7961, 7766, 7571, 7375, 7179, 6982, 6786, 6589, 6392, 6195, 5997, 5799, 5601, 5403, 5205, 5006, 4807, 4608, 4409, 4210, 4011, 3811, 3611, 3411, 3211, 3011, 2811, 2610, 2410, 2209, 2009, 1808, 1607, 1406, 1206, 1005, 804, 603, 402, 201, 0, -201, -402, -603, -804, -1005, -1206, -1406, -1607, -1808, -2009, -2209, -2410, -2610, -2811, -3011, -3211, -3411, -3611, -3811, -4011, -4210, -4409, -4608, -4807, -5006, -5205, -5403, -5601, -5799, -5997, -6195, -6392, -6589, -6786, -6982, -7179, -7375, -7571, -7766, -7961, -8156, -8351, -8545, -8739, -8932, -9126, -9319, -9511, -9703, -9895, -10087, -10278, -10469, -10659, -10849, -11038, -11227, -11416, -11604, -11792, -11980, -12166, -12353, -12539, -12724, -12909, -13094, -13278, -13462, -13645, -13827, -14009, -14191, -14372, -14552, -14732, -14911, -15090, -15268, -15446, -15623, -15799, -15975, -16150, -16325, -16499, -16672, -16845, -17017, -17189, -17360, -17530, -17699, -17868, -18036, -18204, -18371, -18537, -18702, -18867, -19031, -19194, -19357, -19519, -19680, -19840, -20000, -20159, -20317, -20474, -20631, -20787, -20942, -21096, -21249, -21402, -21554, -21705, -21855, -22004, -22153, -22301, -22448, -22594, -22739, -22883, -23027, -23169, -23311, -23452, -23592, -23731, -23869, -24006, -24143, -24278, -24413, -24546, -24679, -24811, -24942, -25072, -25201, -25329, -25456, -25582, -25707, -25831, -25954, -26077, -26198, -26318, -26437, -26556, -26673, -26789, -26905, -27019, -27132, -27244, -27355, -27466, -27575, -27683, -27790, -27896, -28001, -28105, -28208, -28309, -28410, -28510, -28608, -28706, -28802, -28897, -28992, -29085, -29177, -29268, -29358, -29446, -29534, -29621, -29706, -29790, -29873, -29955, -30036, -30116, -30195, -30272, -30349, -30424, -30498, -30571, -30643, -30713, -30783, -30851, -30918, -30984, -31049, -31113, -31175, -31236, -31297, -31356, -31413, -31470, -31525, -31580, -31633, -31684, -31735, -31785, -31833, -31880, -31926, -31970, -32014, -32056, -32097, -32137, -32176, -32213, -32249, -32284, -32318, -32350, -32382, -32412, -32441, -32468, -32495, -32520, -32544, -32567, -32588, -32609, -32628, -32646, -32662, -32678, -32692, -32705, -32717, -32727, -32736, -32744, -32751, -32757, -32761, -32764, -32766];
    this.cosTable = new Array(this.fft_size / 2);
    this.sinTable = new Array(this.fft_size / 2);

    for (var i = 0; i < this.fft_size / 2; i++) {
      this.cosTable[i] = Math.cos(2 * Math.PI * i / this.fft_size);
      this.sinTable[i] = Math.sin(2 * Math.PI * i / this.fft_size);
    }
  }

  _createClass(FFTNayuki, [{
    key: "removeMean",
    value: function removeMean(data) {
      var sum = data.reduce(function (acc, el) {
        return acc + el;
      }, 0) / data.length; //sum = sum >> Math.log2(this.fftOrder);

      for (var i = 0; i < data.length; i++) {
        data[i] -= sum;
      }
    }
  }, {
    key: "applyWindow",
    value: function applyWindow(data) {
      var frac = 2 * Math.PI / data.length;

      for (var i = 0; i < data.length; i++) {
        // data[i] = data[i] / 2 * Math.round(32767 * (1 - Math.cos(i * frac)));
        data[i] = data[i] * 0.5 * (1 - Math.cos(i * frac));
      }
    }
  }, {
    key: "zeroPadding",
    value: function zeroPadding(data, factor) {
      var result = new Array(data.length * factor);

      for (var i = 0; i < result.length; i++) {
        if (i < data.length) {
          result[i] = data[i];
        } else {
          result[i] = 0;
        }
      }

      return result;
    }
  }, {
    key: "preprocess",
    value: function preprocess(data) {
      var real = data.real;
      var imag = data.imag;
      this.removeMean(real);
      this.removeMean(imag);
      this.applyWindow(real);
      this.applyWindow(imag);
      data.real = this.zeroPadding(real, 4);
      data.imag = this.zeroPadding(imag, 4);
    }
  }, {
    key: "forward2",
    value: function forward2(data) {
      var mr, nn, i, j, l, k, istep, n, scale, shift;
      var qr, qi, tr, ti, wr, wi;
      var fr = data.real;
      var fi = data.imag;
      var m = this.fftOrder;
      var inverse = 0;
      n = 1 << m;
      /* max FFT size = N_WAVE */

      if (n > this.n_wave) {
        return -1;
      }

      mr = 0;
      nn = n - 1;
      scale = 0;
      /* decimation in time - re-order data */

      for (m = 1; m <= nn; ++m) {
        l = n;

        do {
          l >>= 1;
        } while (mr + l > nn);

        mr = (mr & l - 1) + l;
        if (mr <= m) continue;
        tr = fr[m];
        fr[m] = fr[mr];
        fr[mr] = tr;
        ti = fi[m];
        fi[m] = fi[mr];
        fi[mr] = ti;
      }

      l = 1;
      k = this.log2_n_wave - 1;

      while (l < n) {
        if (inverse) {
          /* variable scaling, depending upon data */
          shift = 0;

          for (i = 0; i < n; ++i) {
            j = fr[i];
            if (j < 0) j = -j;
            m = fi[i];
            if (m < 0) m = -m;

            if (j > 16383 || m > 16383) {
              shift = 1;
              break;
            }
          }

          if (shift) ++scale;
        } else {
          /*
            fixed scaling, for proper normalization --
            there will be log2(n) passes, so this results
            in an overall factor of 1/n, distributed to
            maximize arithmetic accuracy.
          */
          shift = 1;
        }
        /*
          it may not be obvious, but the shift will be
          performed on each data point exactly once,
          during this pass.
        */


        istep = l << 1;

        for (m = 0; m < l; ++m) {
          j = m << k;
          /* 0 <= j < N_WAVE/2 */

          wr = this.Sinewave[j + this.n_wave / 4];
          wi = -this.Sinewave[j];
          if (inverse) wi = -wi;

          if (shift) {
            wr >>= 1;
            wi >>= 1;
          }

          for (i = m; i < n; i += istep) {
            j = i + l;
            tr = wr * fr[j] - wi * fi[j];
            ti = wr * fi[j] + wi * fr[j];
            qr = fr[i];
            qi = fi[i];

            if (shift) {
              qr >>= 1;
              qi >>= 1;
            }

            fr[j] = qr - tr;
            fi[j] = qi - ti;
            fr[i] = qr + tr;
            fi[i] = qi + ti;
          }
        }

        --k;
        l = istep;
      }

      return {
        real: fr,
        imag: fi
      };
    }
    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */

  }, {
    key: "forwardDft",
    value: function forwardDft(data) {
      var n = data.real.length;
      var levels = Math.log2(n);
      var real = data.real;
      var imag = data.imag; // Bit-reversed addressing permutation

      for (var i = 0; i < n; i++) {
        var j = reverseBits(i, levels);

        if (j > i) {
          var temp = real[i];
          real[i] = real[j];
          real[j] = temp;
          temp = imag[i];
          imag[i] = imag[j];
          imag[j] = temp;
        }
      } // Cooley-Tukey decimation-in-time radix-2 FFT


      for (var size = 2; size <= n; size *= 2) {
        var halfsize = size / 2;
        var tablestep = n / size;

        for (var _i = 0; _i < n; _i += size) {
          for (var _j = _i, k = 0; _j < _i + halfsize; _j++, k += tablestep) {
            var tpre = real[_j + halfsize] * this.cosTable[k] + imag[_j + halfsize] * this.sinTable[k];
            var tpim = -real[_j + halfsize] * this.sinTable[k] + imag[_j + halfsize] * this.cosTable[k];
            real[_j + halfsize] = real[_j] - tpre;
            imag[_j + halfsize] = imag[_j] - tpim;
            real[_j] += tpre;
            imag[_j] += tpim;
          }
        }
      } // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.


      function reverseBits(x, bits) {
        var y = 0;

        for (var _i2 = 0; _i2 < bits; _i2++) {
          y = y << 1 | x & 1;
          x >>>= 1;
        }

        return y;
      }

      return {
        real: real,
        imag: imag
      };
    }
    /* 
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */

  }, {
    key: "inverseDft",
    value: function inverseDft(data) {
      var tmp = data.imag;
      data.imag = data.real;
      data.real = tmp;
      this.forwardDft(data);
    }
  }, {
    key: "shift",
    value: function shift(data) {
      var breakpoint = Math.floor(data.real.length / 2);
      var result = {
        real: new Array(data.real.length),
        imag: new Array(data.imag.length)
      };

      for (var i = 0; i < data.real.length; i++) {
        if (i < breakpoint) {
          result.real[i] = data.real[breakpoint + i];
          result.imag[i] = data.real[breakpoint + i];
        } else {
          result.real[i] = data.real[i - breakpoint];
          result.imag[i] = data.real[i - breakpoint];
        }
      }

      data.real = result.real;
      data.imag = result.imag;
    }
  }, {
    key: "computeMagnitudes",
    value: function computeMagnitudes(data) {
      var real = data.real;
      var imag = data.imag;
      var mag = 0;
      var max = {
        freq: -1,
        mag: 0
      };
      var magnitudes = []; // for (let i = 0; i < real.length / 2; i++) {

      for (var i = 0; i < real.length; i++) {
        //mag = real[i] * real[i] + imag[i] * imag[i];
        //mag = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        //mag = Math.abs(real[i]);
        mag = Math.abs(real[i]) + Math.abs(imag[i]);
        magnitudes.push(mag);

        if (mag > max.mag) {
          max.freq = i;
          max.mag = mag;
        } // magnitudes[i] = mag >> 8;

      } //this.max.mag >>= 8;


      return {
        magnitudes: magnitudes,
        max: max
      };
    }
  }, {
    key: "calculateSpeed",
    value: function calculateSpeed(max) {
      // if (this.max.mag > this.fft_threshold) {
      if (max.mag) {
        // return this.freqToSpeedRatio * this.freqWidth * max.freq;
        return max.freq;
      } else {
        return 0;
      }
    }
  }, {
    key: "transform",

    /* 
    * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
    * The vector can have any length. This is a wrapper function.
    */
    value: function transform(real, imag) {
      // for (let i = 0; i < 128; i++) {
      //     real[i] = 0.7 * Math.sin((i+1)/128 * 50 * Math.PI);
      //     imag[i] = Math.cos((i+1)/128 * 120 * Math.PI);
      // }
      var n = real.length;
      if (n != imag.length) throw "Mismatched lengths";
      if (n == 0) return;else if ((n & n - 1) == 0) // Is power of 2
        this.transformRadix2(real, imag);else // More complicated algorithm for arbitrary sizes
        this.transformBluestein(real, imag);
    }
    /* 
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */

  }, {
    key: "inverseTransform",
    value: function inverseTransform(real, imag) {
      this.transform(imag, real);
    }
    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */

  }, {
    key: "transformRadix2",
    value: function transformRadix2(real, imag) {
      // Length variables
      var n = real.length;
      if (n != imag.length) throw "Mismatched lengths";
      if (n == 1) // Trivial transform
        return;
      var levels = -1;

      for (var i = 0; i < 32; i++) {
        if (1 << i == n) levels = i; // Equal to log2(n)
      }

      if (levels == -1) throw "Length is not a power of 2"; // Trigonometric tables

      var cosTable = new Array(n / 2);
      var sinTable = new Array(n / 2);

      for (var i = 0; i < n / 2; i++) {
        cosTable[i] = Math.cos(2 * Math.PI * i / n);
        sinTable[i] = Math.sin(2 * Math.PI * i / n);
      } // Bit-reversed addressing permutation


      for (var i = 0; i < n; i++) {
        var j = reverseBits(i, levels);

        if (j > i) {
          var temp = real[i];
          real[i] = real[j];
          real[j] = temp;
          temp = imag[i];
          imag[i] = imag[j];
          imag[j] = temp;
        }
      } // Cooley-Tukey decimation-in-time radix-2 FFT


      for (var size = 2; size <= n; size *= 2) {
        var halfsize = size / 2;
        var tablestep = n / size;

        for (var i = 0; i < n; i += size) {
          for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
            var l = j + halfsize;
            var tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
            var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
            real[l] = real[j] - tpre;
            imag[l] = imag[j] - tpim;
            real[j] += tpre;
            imag[j] += tpim;
          }
        }
      } // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.


      function reverseBits(x, bits) {
        var y = 0;

        for (var i = 0; i < bits; i++) {
          y = y << 1 | x & 1;
          x >>>= 1;
        }

        return y;
      }
    }
    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
     * Uses Bluestein's chirp z-transform algorithm.
     */

  }, {
    key: "transformBluestein",
    value: function transformBluestein(real, imag) {
      // Find a power-of-2 convolution length m such that m >= n * 2 + 1
      var n = real.length;
      if (n != imag.length) throw "Mismatched lengths";
      var m = 1;

      while (m < n * 2 + 1) {
        m *= 2;
      } // Trignometric tables


      var cosTable = new Array(n);
      var sinTable = new Array(n);

      for (var i = 0; i < n; i++) {
        var j = i * i % (n * 2); // This is more accurate than j = i * i

        cosTable[i] = Math.cos(Math.PI * j / n);
        sinTable[i] = Math.sin(Math.PI * j / n);
      } // Temporary vectors and preprocessing


      var areal = this.newArrayOfZeros(m);
      var aimag = this.newArrayOfZeros(m);

      for (var i = 0; i < n; i++) {
        areal[i] = real[i] * cosTable[i] + imag[i] * sinTable[i];
        aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
      }

      var breal = this.newArrayOfZeros(m);
      var bimag = this.newArrayOfZeros(m);
      breal[0] = cosTable[0];
      bimag[0] = sinTable[0];

      for (var i = 1; i < n; i++) {
        breal[i] = breal[m - i] = cosTable[i];
        bimag[i] = bimag[m - i] = sinTable[i];
      } // Convolution


      var creal = new Array(m);
      var cimag = new Array(m);
      this.convolveComplex(areal, aimag, breal, bimag, creal, cimag); // Postprocessing

      for (var i = 0; i < n; i++) {
        real[i] = creal[i] * cosTable[i] + cimag[i] * sinTable[i];
        imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
      }
    }
    /* 
     * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
     */

  }, {
    key: "convolveReal",
    value: function convolveReal(x, y, out) {
      var n = x.length;
      if (n != y.length || n != out.length) throw "Mismatched lengths";
      this.convolveComplex(x, this.newArrayOfZeros(n), y, this.newArrayOfZeros(n), out, this.newArrayOfZeros(n));
    }
    /* 
     * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
     */

  }, {
    key: "convolveComplex",
    value: function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
      var n = xreal.length;
      if (n != ximag.length || n != yreal.length || n != yimag.length || n != outreal.length || n != outimag.length) throw "Mismatched lengths";
      xreal = xreal.slice();
      ximag = ximag.slice();
      yreal = yreal.slice();
      yimag = yimag.slice();
      this.transform(xreal, ximag);
      this.transform(yreal, yimag);

      for (var i = 0; i < n; i++) {
        var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
        ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
        xreal[i] = temp;
      }

      this.inverseTransform(xreal, ximag);

      for (var i = 0; i < n; i++) {
        // Scaling (because this FFT implementation omits it)
        outreal[i] = xreal[i] / n;
        outimag[i] = ximag[i] / n;
      }
    }
  }, {
    key: "newArrayOfZeros",
    value: function newArrayOfZeros(n) {
      var result = [];

      for (var i = 0; i < n; i++) {
        result.push(0);
      }

      return result;
    }
  }, {
    key: "speed",
    get: function get() {
      //this.preprocess();
      this.transform();
      this.findMaxMagnitude();
      return this.calculateSpeed();
    }
  }]);

  return FFTNayuki;
}();



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/app.js":
/*!****************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/app.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Presence_detection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Presence_detection */ "./docs/assets/iframes/explore/mohamedversion1/src/components/Presence_detection.js");
/* harmony import */ var _stores_SerialConnectionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/SerialConnectionStore */ "./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConnectionStore.js");
/* harmony import */ var _stores_SerialConsoleStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores/SerialConsoleStore */ "./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConsoleStore.js");
/* harmony import */ var _actions_DaemonActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/DaemonActions */ "./docs/assets/iframes/explore/mohamedversion1/src/actions/DaemonActions.js");








var daemonActions = new _actions_DaemonActions__WEBPACK_IMPORTED_MODULE_5__["default"]();
var serialConsoleStore = new _stores_SerialConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"](daemonActions);
var serialConnectionStore = new _stores_SerialConnectionStore__WEBPACK_IMPORTED_MODULE_3__["default"](daemonActions, serialConsoleStore);
daemonActions.registerSerialConsole(serialConsoleStore);
daemonActions.registerSerialConnection(serialConnectionStore);
var domContainer = document.querySelector('#root');
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Presence_detection__WEBPACK_IMPORTED_MODULE_2__["default"], {
  serialConnectionStore: serialConnectionStore,
  serialConsoleStore: serialConsoleStore
}), domContainer);

/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/app.scss":
/*!******************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/app.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "docs/assets/iframes/explore/mohamedversion1/src//../dist/bundle.css";

/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/Board.js":
/*!*****************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/Board.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FFTSpectrum; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-plotly.js */ "./node_modules/react-plotly.js/react-plotly.js");
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_plotly_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rmwc/grid */ "./node_modules/@rmwc/grid/index.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_rmwc_grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _board_Config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./board/Config */ "./docs/assets/iframes/explore/mohamedversion1/src/components/board/Config.js");
/* harmony import */ var _board_Timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board/Timer */ "./docs/assets/iframes/explore/mohamedversion1/src/components/board/Timer.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var FFTSpectrum = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FFTSpectrum, _React$Component);

  function FFTSpectrum(props, context) {
    var _this;

    _classCallCheck(this, FFTSpectrum);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FFTSpectrum).call(this, props, context));
    _this.Motion = _this.Motion.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.presence = _this.presence.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(FFTSpectrum, [{
    key: "color",
    value: function color() {
      if (this.props.store.v_buf_MD_mean > this.props.store.sensibility) {
        return "#96BEB6";
      } else return "#E9E6E7";
    }
  }, {
    key: "Motion",
    value: function Motion() {
      if (this.props.store.v_buf_MD_mean > this.props.store.sensibility) {
        return "Motion Detected";
      } else return "No Motion Detected";
    }
  }, {
    key: "presence",
    value: function presence() {
      if (this.detect() == "#00FF00") {
        return "Presence Detected";
      } else return "No Presence Detected";
    }
  }, {
    key: "detect",
    value: function detect() {
      return this.props.store.color;
    }
  }, {
    key: "render",
    value: function render() {
      var store = this.props.store;
      var styles = {
        container: {
          background: this.color()
        }
      };
      var presence = {
        container: {
          background: this.detect()
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        class: "presencedetection"
      }, "Presence detection"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        class: "presence",
        style: presence.container
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        class: "dot",
        style: styles.container
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        class: "number"
      }, this.props.store.number)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        class: "detection"
      }, " ", this.presence()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        class: "micro"
      }, this.Motion())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_board_Timer__WEBPACK_IMPORTED_MODULE_5__["default"], {
        temps: this.props.store.temps,
        updateTimer: this.props.store.updateTimer
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_board_Config__WEBPACK_IMPORTED_MODULE_4__["default"]
      /*threshold*/
      , {
        threshold: this.props.store.threshold,
        changethreshold: this.props.store.changethreshold
        /*Sensibility */
        ,
        sensibility: this.props.store.sensibility,
        changesensibility: this.props.store.changesensibility
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        class: "sensibility"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Micro motion: "), (this.props.store.sensibility - 3.7).toFixed(2)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        class: "threshold"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Macro motion: "), "+", this.props.store.threshold - 10)));
    }
  }]);

  return FFTSpectrum;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/Presence_detection.js":
/*!******************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/Presence_detection.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowFFT; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _SerialConnectionMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SerialConnectionMenu */ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu.js");
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Board */ "./docs/assets/iframes/explore/mohamedversion1/src/components/Board.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var ShowFFT = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ShowFFT, _React$Component);

  function ShowFFT() {
    _classCallCheck(this, ShowFFT);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowFFT).apply(this, arguments));
  }

  _createClass(ShowFFT, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SerialConnectionMenu__WEBPACK_IMPORTED_MODULE_2__["default"], {
        store: this.props.serialConnectionStore,
        connection: this.props.serialConsoleStore
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Board__WEBPACK_IMPORTED_MODULE_3__["default"], {
        store: this.props.serialConsoleStore
      }));
    }
  }]);

  return ShowFFT;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu.js":
/*!********************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerialConnectionMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rmwc/grid */ "./node_modules/@rmwc/grid/index.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SerialConnectionMenu_OpenCloseButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SerialConnectionMenu/OpenCloseButton */ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/OpenCloseButton.js");
/* harmony import */ var _SerialConnectionMenu_ChooseDevice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SerialConnectionMenu/ChooseDevice */ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/ChooseDevice.js");
/* harmony import */ var _SerialConnectionMenu_BaudRate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SerialConnectionMenu/BaudRate */ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/BaudRate.js");
/* harmony import */ var _SerialConnectionMenu_AgentFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SerialConnectionMenu/AgentFound */ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/AgentFound.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }









var SerialConnectionMenu = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SerialConnectionMenu, _React$Component);

  function SerialConnectionMenu(props) {
    var _this;

    _classCallCheck(this, SerialConnectionMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SerialConnectionMenu).call(this, props));
    _this.onTogglePort = _this.onTogglePort.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.baudRates = [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200];
    _this.baudRates = _this.baudRates.map(function (element) {
      return {
        label: '' + element + ' baud',
        value: element
      };
    });
    return _this;
  }

  _createClass(SerialConnectionMenu, [{
    key: "onTogglePort",
    value: function onTogglePort() {
      this.props.store.togglePort();
      this.props.connection.start(this.props.store.portOpen);
    }
  }, {
    key: "render",
    value: function render() {
      var store = this.props.store;
      var connection = this.props.connection;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["Grid"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "1",
        align: "middle"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SerialConnectionMenu_OpenCloseButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        selectedPort: store.selectedPort,
        onClickHandler: this.onTogglePort,
        portOpen: store.portOpen
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SerialConnectionMenu_BaudRate__WEBPACK_IMPORTED_MODULE_5__["default"], {
        baudRates: this.baudRates,
        updateBaudRate: store.updateBaudRate,
        currentBaudRate: store.baudRate
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SerialConnectionMenu_ChooseDevice__WEBPACK_IMPORTED_MODULE_4__["default"], {
        devices: store.devices,
        selected: store.selectedPort,
        onSelectDeviceHandler: store.selectDevice
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SerialConnectionMenu_AgentFound__WEBPACK_IMPORTED_MODULE_6__["default"], {
        status: store.agentFound
      })));
    }
  }]);

  return SerialConnectionMenu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/AgentFound.js":
/*!*******************************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/AgentFound.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AgentFound; });
/* harmony import */ var _rmwc_checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/checkbox */ "./node_modules/@rmwc/checkbox/index.js");
/* harmony import */ var _rmwc_checkbox__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_checkbox__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var AgentFound = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AgentFound, _React$Component);

  function AgentFound() {
    _classCallCheck(this, AgentFound);

    return _possibleConstructorReturn(this, _getPrototypeOf(AgentFound).apply(this, arguments));
  }

  _createClass(AgentFound, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_checkbox__WEBPACK_IMPORTED_MODULE_0__["Checkbox"], {
        disabled: true,
        checked: this.props.status || false
      }, "Agent Detected");
    }
  }]);

  return AgentFound;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/BaudRate.js":
/*!*****************************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/BaudRate.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaudRate; });
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/select */ "./node_modules/@rmwc/select/index.js");
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var BaudRate = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaudRate, _React$Component);

  function BaudRate() {
    _classCallCheck(this, BaudRate);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaudRate).apply(this, arguments));
  }

  _createClass(BaudRate, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__["Select"], {
        onChange: function onChange(event) {
          return _this.props.updateBaudRate(event.target.value);
        },
        value: this.props.currentBaudRate,
        label: "Baud Rate",
        options: this.props.baudRates
      });
    }
  }]);

  return BaudRate;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/ChooseDevice.js":
/*!*********************************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/ChooseDevice.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChooseDevice; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _rmwc_chip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rmwc/chip */ "./node_modules/@rmwc/chip/index.js");
/* harmony import */ var _rmwc_chip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rmwc_chip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rmwc/select */ "./node_modules/@rmwc/select/index.js");
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_rmwc_select__WEBPACK_IMPORTED_MODULE_3__);
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var ChooseDevice = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChooseDevice, _React$Component);

  function ChooseDevice() {
    _classCallCheck(this, ChooseDevice);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChooseDevice).apply(this, arguments));
  }

  _createClass(ChooseDevice, [{
    key: "render",
    value: function render() {
      var _this = this;

      var devices = this.props.devices;

      if (devices.length < 6) {
        var chips = devices.map(function (device, i) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_chip__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            selected: _this.props.selected === device.Name,
            onClick: function onClick() {
              return _this.props.onSelectDeviceHandler(device.Name);
            },
            key: device.Name
          }, device.Name);
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_chip__WEBPACK_IMPORTED_MODULE_2__["ChipSet"], {
          choice: true
        }, chips));
      } else {
        devices = devices.map(function (device) {
          return device.Name;
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_select__WEBPACK_IMPORTED_MODULE_3__["Select"], {
          onChange: function onChange(event) {
            return _this.props.onSelectDeviceHandler(event.target.value);
          },
          label: "Device",
          options: devices
        });
      }
    }
  }]);

  return ChooseDevice;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/OpenCloseButton.js":
/*!************************************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/SerialConnectionMenu/OpenCloseButton.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpenCloseButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _rmwc_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rmwc/button */ "./node_modules/@rmwc/button/index.js");
/* harmony import */ var _rmwc_button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rmwc_button__WEBPACK_IMPORTED_MODULE_2__);
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var OpenCloseButton = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OpenCloseButton, _React$Component);

  function OpenCloseButton() {
    _classCallCheck(this, OpenCloseButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(OpenCloseButton).apply(this, arguments));
  }

  _createClass(OpenCloseButton, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        raised: true,
        disabled: !this.props.selectedPort,
        onClick: this.props.onClickHandler
      }, this.props.portOpen ? 'Stop' : 'Start');
    }
  }]);

  return OpenCloseButton;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/board/Config.js":
/*!************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/board/Config.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Config; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Config = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Config, _React$Component);

  function Config() {
    _classCallCheck(this, Config);

    return _possibleConstructorReturn(this, _getPrototypeOf(Config).apply(this, arguments));
  }

  _createClass(Config, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "range_sensibility",
        type: "range",
        min: 3.4,
        max: 6.7,
        step: 0.1,
        orient: "vertical",
        onChange: function onChange(event) {
          return _this.props.changesensibility(event.target.value);
        },
        value: this.props.sensibility,
        ref: "inp"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "range_threshold",
        type: "range",
        min: 10,
        max: 100,
        step: 10,
        orient: "vertical",
        onChange: function onChange(event) {
          return _this.props.changethreshold(event.target.value);
        },
        value: this.props.threshold,
        ref: "inp"
      }));
    }
  }]);

  return Config;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/components/board/Timer.js":
/*!***********************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/components/board/Timer.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Timer = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Timer, _React$Component);

  function Timer() {
    _classCallCheck(this, Timer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Timer).apply(this, arguments));
  }

  _createClass(Timer, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "range_timer",
        type: "number",
        min: "1",
        max: "8",
        step: "1",
        onChange: function onChange(event) {
          return _this.props.updateTimer(event.target.value);
        },
        value: this.props.temps
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "timer"
      }, "Timer(sec):"));
    }
  }]);

  return Timer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConnectionStore.js":
/*!*****************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConnectionStore.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerialConnectionStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }


var SerialConnectionStore = (_class =
/*#__PURE__*/
function () {
  function SerialConnectionStore(daemon, serialConsole) {
    _classCallCheck(this, SerialConnectionStore);

    _initializerDefineProperty(this, "devices", _descriptor, this);

    _initializerDefineProperty(this, "selectedPort", _descriptor2, this);

    _initializerDefineProperty(this, "portOpen", _descriptor3, this);

    _initializerDefineProperty(this, "baudRate", _descriptor4, this);

    _initializerDefineProperty(this, "agentFound", _descriptor5, this);

    this.daemon = undefined;
    this.serialConsole = undefined;
    this.self = this;
    this.daemon = daemon;
    this.serialConsole = serialConsole;
    this.selectDevice = this.selectDevice.bind(this);
    this.togglePort = this.togglePort.bind(this);
    this.updateBaudRate = this.updateBaudRate.bind(this);
    this.updateAgentStatus = this.updateAgentStatus.bind(this);
  }

  _createClass(SerialConnectionStore, [{
    key: "updateDevices",
    value: function updateDevices(devices) {
      this.devices = devices;
    }
  }, {
    key: "selectDevice",
    value: function selectDevice(port) {
      if (this.devices.find(function (element) {
        return element.Name === port;
      })) {
        this.serialConsole.addMessage('Selected Port: ' + port + '\r\n');
        this.selectedPort = port;
      } else {
        this.serialConsole.addMessage(this.selectedPort, 'Error selecting port: The selected port was not found in the device list');
      }
    }
  }, {
    key: "togglePort",
    value: function togglePort() {
      if (!this.portOpen) {
        this.serialConsole.addMessage('Opening Port: ' + this.selectedPort + " @ " + this.baudRate + '\r\n');
        this.daemon.openPort(this.selectedPort, this.baudRate);
      } else {
        this.serialConsole.addMessage('Closing Port: ' + this.selectedPort + '\r\n');
        this.daemon.closePort(this.selectedPort);
      }

      this.portOpen = !this.portOpen;
    }
  }, {
    key: "updateBaudRate",
    value: function updateBaudRate(baudRate) {
      this.baudRate = baudRate;
    }
  }, {
    key: "updateAgentStatus",
    value: function updateAgentStatus(status) {
      if (status.toString() === 'true') {
        this.agentFound = true;
      } else {
        this.agentFound = false;
      }
    }
  }]);

  return SerialConnectionStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "devices", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedPort", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "portOpen", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "baudRate", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 38400;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "agentFound", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class);


/***/ }),

/***/ "./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConsoleStore.js":
/*!**************************************************************************************!*\
  !*** ./docs/assets/iframes/explore/mohamedversion1/src/stores/SerialConsoleStore.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerialConsoleStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _actions_FFT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/FFT */ "./docs/assets/iframes/explore/mohamedversion1/src/actions/FFT.js");
var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }



var SerialConsoleStore = (_class =
/*#__PURE__*/
function () {
  //Timer
  //Init data buffers
  //Init DEBUG data buffers
  //
  //velocity
  //
  //Timer//
  function SerialConsoleStore(daemon) {
    _classCallCheck(this, SerialConsoleStore);

    this.OFFSET_Real = 525;
    this.OFFSET_Img = 525;
    this.LEN_MAF = 3;
    this.LEN_DIR = 5;
    this.TH_VEL = 0.3;
    this.LEN_NM = 5;
    this.LEN_MD = 4;
    this.TH_MD = 40;
    this.sampling_freq_hz = 3000;

    _initializerDefineProperty(this, "Timer_vel", _descriptor, this);

    _initializerDefineProperty(this, "presence", _descriptor2, this);

    _initializerDefineProperty(this, "color", _descriptor3, this);

    _initializerDefineProperty(this, "moyenne", _descriptor4, this);

    this.v_buf_MAF = new Array(this.LEN_MAF).fill(0);
    this.v_buf_DIR = new Array(this.LEN_DIR).fill(0);
    this.v_buf_VEL = new Array(this.LEN_DIR).fill(0);
    this.v_buf_VEL_2 = new Array(this.LEN_NM).fill(0);

    _initializerDefineProperty(this, "v_buf_MD", _descriptor5, this);

    _initializerDefineProperty(this, "v_buf_MD_mean", _descriptor6, this);

    _initializerDefineProperty(this, "src", _descriptor7, this);

    this.DEBUG_V = [];
    this.DEBUG_I = [];
    this.DEBUG_Q = [];
    this.DEBUG_presence = [];
    this.DEBUG_v_mean = [];

    _initializerDefineProperty(this, "v", _descriptor8, this);

    _initializerDefineProperty(this, "PAPR", _descriptor9, this);

    this.fftThreshold = 128;
    this.IQdataThreshold = 128;
    this.unprocessedThreshold = 150;
    this.fftLength = 128;
    this.IQplotLength = 4;
    this.speedAverage = 4;
    this.daemon = undefined;
    this.processedIndex = 0;
    this.messages = "";
    this.lineSeparator = "\n";

    _initializerDefineProperty(this, "emptyCount", _descriptor10, this);

    _initializerDefineProperty(this, "speed", _descriptor11, this);

    _initializerDefineProperty(this, "result", _descriptor12, this);

    _initializerDefineProperty(this, "IQdata", _descriptor13, this);

    _initializerDefineProperty(this, "IQ", _descriptor14, this);

    _initializerDefineProperty(this, "IQ_mean_abs", _descriptor15, this);

    _initializerDefineProperty(this, "IQdataCache", _descriptor16, this);

    this.fftStore = {
      index: 0,
      magnitudes: [],
      //new Array(this.fftLength),
      max: 0,
      speed: new Array(this.speedAverage)
    };

    _initializerDefineProperty(this, "temps", _descriptor17, this);

    _initializerDefineProperty(this, "delay", _descriptor18, this);

    _initializerDefineProperty(this, "sensibility", _descriptor19, this);

    _initializerDefineProperty(this, "threshold", _descriptor20, this);

    _initializerDefineProperty(this, "number", _descriptor21, this);

    this.Start_Stop = false;
    this.daemon = daemon;
    this.fft = new _actions_FFT__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.addMessage = this.addMessage.bind(this);
    this.updateLineSeparator = this.updateLineSeparator.bind(this);
    this.processMessages = this.processMessages.bind(this);
    this.updateFftStore = this.updateFftStore.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.changesensibility = this.changesensibility.bind(this);
    this.changethreshold = this.changethreshold.bind(this);
    this.start = this.start.bind(this);
  }

  _createClass(SerialConsoleStore, [{
    key: "start",
    value: function start(_start) {
      this.Start_Stop = _start;
      console.log(_start);
    }
  }, {
    key: "addMessage",
    value: function addMessage(message) {
      if (this.Start_Stop == true) {
        if (this.messages.length > 3000) {
          this.messages = this.messages.substr(message.length);
          this.processedIndex -= message.length;
        }

        this.messages += message;

        if (this.messages.length - this.processedIndex > this.unprocessedThreshold) {
          //console.log('messages length: ' + this.messages.length);
          //console.log('processing messages');
          this.processMessages();
        }
      }
    }
  }, {
    key: "clearMessages",
    value: function clearMessages() {
      this.messages = "";
    }
  }, {
    key: "updateLineSeparator",
    value: function updateLineSeparator(lineSeparator) {
      this.lineSeparator = lineSeparator;
      console.log("new separator");
    }
  }, {
    key: "processMessages",
    value: function processMessages() {
      var _this = this;

      if (this.Start_Stop == true) {
        var unprocessedMessages = this.messages.substr(this.processedIndex).split(/[\r|\r\n|\n]+/);
        var remainder = unprocessedMessages.splice(-1, 1);
        this.processedIndex = this.messages.length - remainder[0].length;
        unprocessedMessages = unprocessedMessages.filter(function (el) {
          return el.match(/^\d+[ ]+\d+$/);
        });

        if (this.emptyCount && unprocessedMessages.length > 0) {
          this.emptyCount = 0;
        } else {
          this.emptyCount = (this.emptyCount + 1) % 1024;
        }

        unprocessedMessages.map(function (el) {
          var tmp = el.split(/[ ]/);

          if (_this.IQdataCache.index >= _this.IQdataThreshold) {
            _this.updateIQdataStore();

            _this.IQdataCache.index = 0;
          }

          if (_this.IQdataCache.index < _this.IQdataThreshold) {
            _this.IQdataCache.real[_this.IQdataCache.index] = parseInt(tmp[0]);
            _this.IQdataCache.imag[_this.IQdataCache.index] = parseInt(tmp[1]);
            _this.IQdataCache.index++;
          } else {
            console.log("shouldnt happen");
          }
        });

        if (this.v_buf_MD_mean > this.threshold) {
          this.presence = "true";
        }

        this.micromotion();
        this.velocity();
        setTimeout(this.detection.bind(this), 1000);
      }

      console.log(this.v_buf_MD_mean);
    }
  }, {
    key: "micromotion",
    value: function micromotion() {
      var data = {
        real: this.IQdataCache.real.slice(0),
        imag: this.IQdataCache.imag.slice(0)
      };
      var IQmean = {
        real: 0,
        imag: 0
      };

      for (var i = 0; i < this.IQ.real.length; i++) {
        this.IQ.real[i] = data.real[i] - this.OFFSET_Real;
        IQmean.real += this.IQ.real[i] / this.IQ.real.length;
        this.IQ.imag[i] = data.imag[i] - this.OFFSET_Img;
        IQmean.imag += this.IQ.imag[i] / this.IQ.real.length;
      }

      this.IQ_mean_abs = Math.abs(IQmean.real) + Math.abs(IQmean.imag);

      if (3 < this.v_buf_MD.length) {
        this.v_buf_MD.shift();
      }

      this.v_buf_MD.push(this.IQ_mean_abs);
      this.v_buf_MD_mean = this.v_buf_MD[0] / this.v_buf_MD.length;

      for (var _i = 1; _i < this.v_buf_MD.length; _i++) {
        this.v_buf_MD_mean += this.v_buf_MD[_i] / this.v_buf_MD.length;
      }
    }
  }, {
    key: "velocity",
    value: function velocity() {
      var data = {
        real: this.IQdataCache.real.slice(0),
        imag: this.IQdataCache.imag.slice(0)
      };
      this.fft.removeMean(data.real);
      this.fft.removeMean(data.imag);
      this.fft.applyWindow(data.real);
      this.fft.applyWindow(data.imag);
      data.real = this.fft.zeroPadding(data.real, 8);
      data.imag = this.fft.zeroPadding(data.imag, 8);
      this.fft.transform(data.real, data.imag);
      this.fft.shift(data);
      var max = 0;
      var amplitudes = [];
      var II = -1;
      var amplitudes_db = [];
      var spectrum_dBm_mean = 0; // ampliudes - max ampl -max_freq

      for (var i = 0; i < data.real.length; i++) {
        var m = Math.sqrt(Math.pow(data.real[i], 2) + Math.pow(data.imag[i], 2));
        amplitudes.push(m);
        amplitudes_db.push(20 * Math.log10(m));
        spectrum_dBm_mean += 20 * Math.log10(m) / data.real.length;

        if (max < m) {
          max = m;
          II = i;
        }
      }

      var ln = [];
      var f = [];
      var NFFT = 128 * 2 * 4;

      for (var _i2 = 0; _i2 < NFFT; _i2++) {
        var x = -1 + 2 * _i2 / (NFFT - 1);
        ln.push(x);
        f.push(3000 / (2 * x));
      }

      this.PAPR = Math.pow(amplitudes_db[II], 2) / Math.pow(spectrum_dBm_mean, 2);
      var freq = f[II];

      if (this.PAPR > 2.5) {
        this.v = 0;
        this.z = "Stationary";
      } else {
        this.v = Math.round(freq / 2 * (3e8 / 24e9), 2);
        if (freq < 0) this.z = "Approching";else this.z = "Departing";
      }
    }
  }, {
    key: "detection",
    value: function detection() {
      if (this.delay != 0) {
        this.number = this.temps - parseInt(this.delay / 20);
      } else {
        this.number = 0;
      }

      if (this.presence == "false") {
        this.color = "#ED1941";
        return;
      } else if (this.presence == "true" && this.v_buf_MD_mean > this.threshold) {
        this.delay = 0;
        this.color = "#00FF00";
        this.startTimer();
        return;
      } else if (this.v_buf_MD_mean > this.sensibility && this.presence == "true") {
        this.delay = 0;
        this.color = "#00FF00";
        this.startTimer();
        return;
      } else if (this.v_buf_MD_mean < this.sensibility && this.presence == "true" && this.delay < this.temps * 20) {
        this.color = "#00FF00";
        this.startTimer();
        return;
      } else if (this.v_buf_MD_mean < this.sensibility && this.presence == "true" && this.delay == this.temps * 20) {
        this.presence = "false";
        this.color = "#ED1941";
        this.delay = 0;
        return;
      }
    }
  }, {
    key: "updateIQdataStore",
    value: function updateIQdataStore() {
      var newDataLength = this.IQdataCache.index - this.IQdataCache.processedIQ;
      var data = {
        real: this.IQdata.real.slice(0),
        imag: this.IQdata.imag.slice(0)
      }; //this.moyenne=[];

      for (var i = 0; i < data.real.length; i++) {
        if (i < data.real.length - newDataLength) {
          data.real[i] = data.real[i + newDataLength];
          data.imag[i] = data.imag[i + newDataLength]; //this.moyenne.push((data.real[i]+ data.imag[i])/2);
        } else {
          data.real[i] = this.IQdataCache.real[i - data.real.length + newDataLength];
          data.imag[i] = this.IQdataCache.imag[i - data.imag.length + newDataLength]; //this.moyenne.push((data.real[i - data.real.length + newDataLength]+ data.imag[i - data.real.length + newDataLength])/2);
        }
      }

      this.IQdataCache.processedIQ = this.IQdataCache.index;
      this.IQdata = data;
    }
  }, {
    key: "updateFftStore",
    value: function updateFftStore() {
      var data = {
        real: this.IQdata.real.slice(0),
        imag: this.IQdata.imag.slice(0)
      };
      this.fft.preprocess(data);
      this.fft.transform(data.real, data.imag);
      this.fft.shift(data);
      /*let result = this.fft.computeMagnitudes(data);
            this.fftStore.index = (this.fftStore.index + 1) % this.speedAverage;
          this.fftStore.magnitudes = result.magnitudes;
          this.fftStore.max = result.max;
          this.fftStore.speed[this.fftStore.index] = this.fft.calculateSpeed(result.max, result.magnitudes);
          //console.log(result.magnitudes);
          //console.log(Math.abs(result.max.freq - 256));
          //console.log(this.fftStore.speed[this.fftStore.index]);
          
          this.publishFftResults();
          this.IQdataCache.processedFFT = this.IQdataCache.index;*/
    }
  }, {
    key: "publishFftResults",
    value: function publishFftResults() {
      this.magnitudes = this.fftStore.magnitudes.slice(0);
      this.max = this.fftStore.max;
      this.speed = this.fftStore.speed.reduce(function (a, b) {
        return a + Math.abs(b);
      }, 0) / this.fftStore.speed.length;
    }
  }, {
    key: "updateTimer",
    value: function updateTimer(temps) {
      this.temps = temps;
    }
  }, {
    key: "changesensibility",
    value: function changesensibility(sensibility) {
      this.sensibility = sensibility;
    }
  }, {
    key: "changethreshold",
    value: function changethreshold(threshold) {
      this.threshold = threshold;
    }
  }, {
    key: "tick",
    value: function tick() {
      this.delay += 1;
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      setInterval(this.tick(), 1000);
    }
  }, {
    key: "text",
    get: function get() {
      return this.messages;
    }
  }]);

  return SerialConsoleStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "Timer_vel", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "presence", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "false";
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "color", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "moyenne", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "v_buf_MD", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "v_buf_MD_mean", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "src", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return './src/components/2.png';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "v", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "PAPR", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "emptyCount", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "speed", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "result", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      max: 0,
      velocity: 0,
      magnitudes: []
    };
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "IQdata", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      real: new Array(this.fftLength).fill(0),
      imag: new Array(this.fftLength).fill(0)
    };
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "IQ", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      real: new Array(this.fftLength).fill(0),
      imag: new Array(this.fftLength).fill(0)
    };
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "IQ_mean_abs", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "IQdataCache", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      index: 0,
      processedIQ: 0,
      processedFFT: 0,
      real: new Array(this.fftLength * this.IQplotLength).fill(0),
      imag: new Array(this.fftLength * this.IQplotLength).fill(0)
    };
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "temps", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "delay", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "sensibility", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.7;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "threshold", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "number", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class.prototype, "text", [mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, "text"), _class.prototype)), _class);


/***/ }),

/***/ 5:
/*!*********************************************************************************************************************************!*\
  !*** multi ./docs/assets/iframes/explore/mohamedversion1/src/app.js ./docs/assets/iframes/explore/mohamedversion1/src/app.scss ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./docs/assets/iframes/explore/mohamedversion1/src/app.js */"./docs/assets/iframes/explore/mohamedversion1/src/app.js");
module.exports = __webpack_require__(/*! ./docs/assets/iframes/explore/mohamedversion1/src/app.scss */"./docs/assets/iframes/explore/mohamedversion1/src/app.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map