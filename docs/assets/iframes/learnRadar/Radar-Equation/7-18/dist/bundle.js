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
/******/ 		"./docs/assets/iframes/learnRadar/Radar-Equation/7-18": 0
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
/******/ 	deferredModules.push([16,"docs/assets/iframes/commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/DaemonActions.js":
/*!*****************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/DaemonActions.js ***!
  \*****************************************************************************************/
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

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/FFT.js":
/*!*******************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/FFT.js ***!
  \*******************************************************************************/
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
    value: function zeroPadding(data) {
      var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
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
      data.real = this.zeroPadding(real);
      data.imag = this.zeroPadding(imag); //console.log(data);
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
    value: function calculateSpeed(max, magnitudes) {
      var zeroPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
      var n = magnitudes.length / zeroPadding;
      var snr = max.mag / (magnitudes.reduce(function (acc, el) {
        return acc + el;
      }, 0) / n);

      if (max.mag > 1500) {
        var freqSpectrum = new Array(2 * 4 * n).fill(0);
        freqSpectrum = freqSpectrum.map(function (val, index) {
          return -1 + index * 2 / (4 * n - 1);
        }); //console.log(max.freq);

        return freqSpectrum[max.freq] * this.sampling_rate * (3e8 / 24e9) * -1; // return this.freqToSpeedRatio * this.freqWidth * max.freq;
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

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.js":
/*!***********************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_RadarEquation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/RadarEquation */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/RadarEquation.js");
/* harmony import */ var _stores_SerialConnectionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/SerialConnectionStore */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConnectionStore.js");
/* harmony import */ var _stores_SerialConsoleStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores/SerialConsoleStore */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConsoleStore.js");
/* harmony import */ var _actions_DaemonActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/DaemonActions */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/DaemonActions.js");








var daemonActions = new _actions_DaemonActions__WEBPACK_IMPORTED_MODULE_5__["default"]();
var serialConsoleStore = new _stores_SerialConsoleStore__WEBPACK_IMPORTED_MODULE_4__["default"](daemonActions);
var serialConnectionStore = new _stores_SerialConnectionStore__WEBPACK_IMPORTED_MODULE_3__["default"](daemonActions, serialConsoleStore);
daemonActions.registerSerialConsole(serialConsoleStore);
daemonActions.registerSerialConnection(serialConnectionStore);
var domContainer = document.querySelector('#root');
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RadarEquation__WEBPACK_IMPORTED_MODULE_2__["default"], {
  serialConnectionStore: serialConnectionStore,
  serialConsoleStore: serialConsoleStore
}), domContainer);

/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.scss":
/*!*************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "docs/assets/iframes/learnRadar/Radar-Equation/7-18/src//../dist/bundle.css";

/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board.js":
/*!************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/select */ "./node_modules/@rmwc/select/index.js");
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _Board_Equation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Board/Equation */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Equation.js");
/* harmony import */ var _Board_Antenne__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Board/Antenne */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Antenne.js");
/* harmony import */ var _Board_Plot_Power_Delay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Board/Plot_Power_Delay */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Plot_Power_Delay.js");
/* harmony import */ var react_rangeslider_lib_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-rangeslider/lib/index */ "./node_modules/react-rangeslider/lib/index.js");
/* harmony import */ var react_rangeslider_lib_index__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_rangeslider_lib_index__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Board_Transmitted_power__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Board/Transmitted_power */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Transmitted_power.js");
/* harmony import */ var _Board_Distance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Board/Distance */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Distance.js");
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











var Board = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props, context) {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, _getPrototypeOf(Board).call(this, props, context));
  }

  _createClass(Board, [{
    key: "render",
    value: function render() {
      var background = {
        container: {
          backgroundImage: "url('../../../images/road.jpg')",
          backgroundSize: "cover"
        }
      }; //Elements of Radar equation\

      var RCS = this.props.store.RCS;
      var frequency = this.props.store.frequency;
      var GTx = this.props.store.GTx;
      var T = 2 * this.props.store.distance / (3 * Math.pow(10, 8));
      var T_plot = (T * 1000000).toFixed(2); //Time delay 

      var time_delay = "T " + T_plot + "μs=(2*D(" + this.props.store.distance + "m))/(C(3*10^8m/s))"; //Received power 

      var rslt = (this.props.store.power * 1000000 * RCS * Math.pow(GTx, 2) * Math.pow(3 / (frequency * 10), 2) / (Math.pow(4 * Math.PI, 3) * Math.pow(this.props.store.distance, 4))).toFixed(3); // Radar Equation

      var radar = "Pr  " + rslt + "µW=(P(" + this.props.store.power + ")w*σ(" + RCS + "m²)*G(" + GTx + ")^2*C(3*10^8 m/s)^2)/((4*π)^3*D(" + this.props.store.distance + "m)^4*F(" + frequency + "GHz)^2)";
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "row"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Board_Equation__WEBPACK_IMPORTED_MODULE_3__["default"]
      /* Radar equation +Time delay */
      , {
        radar: radar,
        rslt: this.rslt,
        time_delay: time_delay
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Board_Plot_Power_Delay__WEBPACK_IMPORTED_MODULE_5__["default"], {
        prx: rslt,
        T_plot: T_plot
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "row"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Board_Antenne__WEBPACK_IMPORTED_MODULE_4__["default"], {
        transmitted_power: this.onSelectLanguage
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Board_Distance__WEBPACK_IMPORTED_MODULE_8__["default"], {
        distance: this.props.store.distance,
        changedistance: this.props.store.changedistance,
        frequency: this.props.store.frequency,
        object: this.props.store.object,
        RCS: this.props.store.RCS
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Board_Transmitted_power__WEBPACK_IMPORTED_MODULE_7__["default"], {
        power: this.props.store.power,
        changepower: this.props.store.changepower
      }));
    }
  }]);

  return Board;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Antenne.js":
/*!********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Antenne.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Antenne; });
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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var Antenne = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Antenne, _React$Component);

  function Antenne(props, context) {
    var _this;

    _classCallCheck(this, Antenne);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Antenne).call(this, props, context));

    _this.handleChange = function () {
      _this.setState({
        value: event.target.value
      });
    };

    _this.handleSubmite = function () {
      _this.props.transmitted_power(_this.state.value);
    };

    _this.state = {
      value: 0
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmite = _this.handleSubmite.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Antenne, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        class: "img_antenne",
        src: "../../../images/antenne.gif",
        alt: "antenne"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null));
    }
  }]);

  return Antenne;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Distance.js":
/*!*********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Distance.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Distance; });
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/select */ "./node_modules/@rmwc/select/index.js");
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _Ruler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ruler */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Ruler.js");
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






var Distance = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Distance, _React$Component);

  function Distance(props) {
    var _this;

    _classCallCheck(this, Distance);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Distance).call(this, props));
    _this.objet = _this.objet.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.range = _this.range.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Distance, [{
    key: "objet",
    value: function objet() {
      if (this.props.RCS == '1') {
        return "myRange_person";
      } else if (this.props.RCS == '100') {
        return "myRange_car";
      } else {
        return "myRange_bus";
      }
    }
  }, {
    key: "range",
    value: function range() {
      if (this.props.RCS == '1') {
        return "10";
      } else if (this.props.RCS == '100' && this.props.frequency == 24) {
        return "40";
      } else if (this.props.RCS == '100' && this.props.frequency == 60) {
        return "30";
      } else if (this.props.RCS == '200' && this.props.frequency == 24) {
        return "40";
      } else if (this.props.RCS == '200' && this.props.frequency == 60) {
        return "30";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var now = 60;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "ob"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "draggable"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "range",
        class: this.objet(),
        min: "0",
        max: this.range(),
        onChange: function onChange(event) {
          return _this2.props.changedistance(event.target.value);
        },
        value: this.props.distance,
        ref: "inp"
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Ruler__WEBPACK_IMPORTED_MODULE_3__["default"], {
        frequency: this.props.frequency,
        object: this.props.object
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        class: "text_distance"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Distance: ", this.props.distance, " metres")));
    }
  }]);

  return Distance;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Equation.js":
/*!*********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Equation.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Equation; });
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/select */ "./node_modules/@rmwc/select/index.js");
/* harmony import */ var _rmwc_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var react_mathjax2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-mathjax2 */ "./node_modules/react-mathjax2/lib/index.js");
/* harmony import */ var react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_mathjax2__WEBPACK_IMPORTED_MODULE_3__);
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




 //'+{this.props.RCS }+'

var Equation = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Equation, _React$Component);

  function Equation(props) {
    _classCallCheck(this, Equation);

    return _possibleConstructorReturn(this, _getPrototypeOf(Equation).call(this, props));
  }

  _createClass(Equation, [{
    key: "color",
    value: function color() {
      if (this.props.rslt > 0.1) {
        return "#FFFF00	";
      } else return "#bbb";
    }
  }, {
    key: "render",
    value: function render() {
      var styles = {
        container: {
          background: this.color()
        }
      };
      var radar = this.props.radar;
      var time_delay = this.props.time_delay;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "detect"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", {
        class: "radar_equation"
      }, "Radar Equation")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default.a.Context, {
        input: "ascii"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default.a.Node, {
        inline: true
      }, radar))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", {
        class: "time_delay"
      }, "Time delay")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default.a.Context, {
        input: "ascii"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default.a.Node, {
        inline: true
      }, time_delay))));
    }
  }]);

  return Equation;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Plot_Power_Delay.js":
/*!*****************************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Plot_Power_Delay.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Plot_Power_Delay; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-plotly.js */ "./node_modules/react-plotly.js/react-plotly.js");
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_plotly_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var react_mathjax2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-mathjax2 */ "./node_modules/react-mathjax2/lib/index.js");
/* harmony import */ var react_mathjax2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_mathjax2__WEBPACK_IMPORTED_MODULE_3__);
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






var Plot_Power_Delay = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Plot_Power_Delay, _React$Component);

  function Plot_Power_Delay(props, context) {
    _classCallCheck(this, Plot_Power_Delay);

    return _possibleConstructorReturn(this, _getPrototypeOf(Plot_Power_Delay).call(this, props, context));
  }

  _createClass(Plot_Power_Delay, [{
    key: "color",
    value: function color() {
      if (this.props.prx >= 0.1) {
        this.detect = "Detected";
        return "#00FF00";
      } else {
        this.detect = "Not detected";
        return "#FF0000";
      }
    }
  }, {
    key: "text",
    value: function text() {
      if (this.props.prx >= 0.1) {
        return "Detected";
      } else {
        return "Not detected";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var T_plot = this.props.T_plot;
      var detect = "Not detected";
      var styles = {
        container: {
          background: this.color()
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "message",
        style: styles.container
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, this.text()))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "plote"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_plotly_js__WEBPACK_IMPORTED_MODULE_1___default.a, {
        data: [{
          x: [-1, 1],
          y: [0.1, 0.1],
          type: "line",
          marker: {
            color: "red"
          },
          name: "Threshold"
        }, {
          x: [T_plot],
          y: [this.props.prx],
          width: [0.01],
          type: "bar",
          marker: {
            color: "blue"
          },
          name: "Prx"
        }],
        config: {
          displayModeBar: false
        },
        layout: {
          width: 340,
          height: 290,
          yaxis: {
            range: [0.0001, 0.1],
            title: "Power (µW)",
            fixedrange: true,
            type: 'log'
          },
          xaxis: {
            range: [0, 0.35],
            title: "Delay (μs)",
            fixedrange: true
          }
        }
      })));
    }
  }]);

  return Plot_Power_Delay;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Ruler.js":
/*!******************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Ruler.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ruler; });
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





var Ruler = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ruler, _React$Component);

  function Ruler() {
    _classCallCheck(this, Ruler);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ruler).apply(this, arguments));
  }

  _createClass(Ruler, [{
    key: "meters",
    value: function meters() {
      if (this.props.frequency == 24) {
        if (this.props.object == "Bus") {
          return [1, 2, 3, 4];
        } else if (this.props.object == "Person") {
          return [1];
        } else if (this.props.object == "Car") {
          return [1, 2, 3, 4];
        }
      } else if (this.props.frequency == 60) {
        if (this.props.object == "Bus") {
          return [1, 2, 3];
        } else if (this.props.object == "Car") {
          return [1, 2, 3];
        } else if (this.props.object == "Person") {
          return [1];
        }
      }
    }
  }, {
    key: "dimention",
    value: function dimention() {
      if (this.props.frequency == 24) {
        if (this.props.object == "Bus") {
          return "Ruler_40";
        } else if (this.props.object == "Car") {
          return "Ruler_40";
        } else if (this.props.object == "Person") {
          return "Ruler_10";
        }
      } else if (this.props.frequency == 60) {
        if (this.props.object == "Bus") {
          return "Ruler_30";
        } else if (this.props.object == "Car") {
          return "Ruler_30";
        } else if (this.props.object == "Person") {
          return "Ruler_10";
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var now = 60;
      var listItems = this.meters().map(function () {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "cm"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          class: "mm"
        }));
      });
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: this.dimention()
      }, listItems, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "cm"
      }));
    }
  }]);

  return Ruler;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Transmitted_power.js":
/*!******************************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board/Transmitted_power.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ptx; });
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






var Ptx = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ptx, _React$Component);

  function Ptx(props) {
    _classCallCheck(this, Ptx);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ptx).call(this, props));
  }

  _createClass(Ptx, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "ptx"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "ptx",
        type: "range",
        min: 0,
        max: 5,
        step: 0.1,
        onChange: function onChange(event) {
          return _this.props.changepower(event.target.value);
        },
        value: this.props.power,
        ref: "inp"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "Transmitted_power"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Transmitted power P= w"))));
    }
  }]);

  return Ptx;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu.js":
/*!***********************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rmwc/grid */ "./node_modules/@rmwc/grid/index.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Menu_Object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu/Object */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Object.js");
/* harmony import */ var _Menu_Frequency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Menu/Frequency */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Frequency.js");
/* harmony import */ var _Menu_Target_Description__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Menu/Target_Description */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Target_Description.js");
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








var Menu = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, props));
    _this.objects = ["Person", "Bus", "Car"];
    _this.Frequences = ["24", "60"];
    _this.Frequences = _this.Frequences.map(function (element) {
      return {
        label: '' + element + ' GHz',
        value: element
      };
    });
    return _this;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      //Elements from Stores
      var ptx = this.props.store.power * 1000000;
      var G = 10;
      var lamda = 3 / (this.props.store.frequency * 10);
      var threshold = 0.1;
      var store = this.props.store;
      var RCS = this.props.store.RCS;
      var r = ptx * G * G * lamda * lamda * RCS / (threshold * Math.pow(Math.PI * 4, 3));
      var range = Math.pow(r, 1 / 4).toFixed(2);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["Grid"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu_Object__WEBPACK_IMPORTED_MODULE_3__["default"], {
        objects: this.objects,
        changeObject: store.changeObject,
        currentObject: store.object
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], {
        span: "4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu_Frequency__WEBPACK_IMPORTED_MODULE_4__["default"], {
        Frequences: this.Frequences,
        changeFrequence: store.changeFrequence,
        currentFrequence: store.frequency
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_rmwc_grid__WEBPACK_IMPORTED_MODULE_2__["GridCell"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu_Target_Description__WEBPACK_IMPORTED_MODULE_5__["default"], {
        RCS: store.RCS,
        range: range,
        object: store.object
      })));
    }
  }]);

  return Menu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Frequency.js":
/*!*********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Frequency.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Frequency; });
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





var Frequency = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Frequency, _React$Component);

  function Frequency() {
    _classCallCheck(this, Frequency);

    return _possibleConstructorReturn(this, _getPrototypeOf(Frequency).apply(this, arguments));
  }

  _createClass(Frequency, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__["Select"], {
        onChange: function onChange(event) {
          return _this.props.changeFrequence(event.target.value);
        },
        value: this.props.currentFrequence,
        label: "Frequence",
        options: this.props.Frequences
      });
    }
  }]);

  return Frequency;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Object.js":
/*!******************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Object.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Object; });
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





var _Object = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Object, _React$Component);

  function Object() {
    _classCallCheck(this, Object);

    return _possibleConstructorReturn(this, _getPrototypeOf(Object).apply(this, arguments));
  }

  _createClass(Object, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_select__WEBPACK_IMPORTED_MODULE_0__["Select"], {
        onChange: function onChange(event) {
          return _this.props.changeObject(event.target.value);
        },
        value: this.props.currentObject,
        label: "Target",
        options: this.props.objects
      });
    }
  }]);

  return Object;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Target_Description.js":
/*!******************************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu/Target_Description.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Target_Description; });
/* harmony import */ var _rmwc_snackbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rmwc/snackbar */ "./node_modules/@rmwc/snackbar/index.js");
/* harmony import */ var _rmwc_snackbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rmwc_snackbar__WEBPACK_IMPORTED_MODULE_0__);
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





var Target_Description = Object(mobx_react__WEBPACK_IMPORTED_MODULE_2__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Target_Description, _React$Component);

  function Target_Description() {
    _classCallCheck(this, Target_Description);

    return _possibleConstructorReturn(this, _getPrototypeOf(Target_Description).apply(this, arguments));
  }

  _createClass(Target_Description, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        class: "detectionrange"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Target:"), " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", {
        class: "objct_name"
      }, this.props.object)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "RCS (\u03C3):")), " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        class: "RCS"
      }, this.props.RCS, "m²"), "               ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Detection range :")), "  ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        class: "Detection_range"
      }, parseInt(this.props.range), " m"));
    }
  }]);

  return Target_Description;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/RadarEquation.js":
/*!********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/RadarEquation.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowSpeed; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Menu.js");
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Board */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/components/Board.js");
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






var ShowSpeed = Object(mobx_react__WEBPACK_IMPORTED_MODULE_1__["observer"])(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ShowSpeed, _React$Component);

  function ShowSpeed() {
    _classCallCheck(this, ShowSpeed);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowSpeed).apply(this, arguments));
  }

  _createClass(ShowSpeed, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_2__["default"], {
        store: this.props.serialConnectionStore
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Board__WEBPACK_IMPORTED_MODULE_3__["default"], {
        store: this.props.serialConnectionStore
      }));
    }
  }]);

  return ShowSpeed;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)) || _class;



/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConnectionStore.js":
/*!************************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConnectionStore.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerialConnectionStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

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

    _initializerDefineProperty(this, "agentFound", _descriptor4, this);

    _initializerDefineProperty(this, "object", _descriptor5, this);

    _initializerDefineProperty(this, "object_img", _descriptor6, this);

    _initializerDefineProperty(this, "frequency", _descriptor7, this);

    _initializerDefineProperty(this, "RCS", _descriptor8, this);

    _initializerDefineProperty(this, "GTx", _descriptor9, this);

    _initializerDefineProperty(this, "power", _descriptor10, this);

    _initializerDefineProperty(this, "distance", _descriptor11, this);

    this.daemon = undefined;
    this.serialConsole = undefined;
    this.self = this;
    this.daemon = daemon;
    this.serialConsole = serialConsole;
    this.selectDevice = this.selectDevice.bind(this);
    this.changeObject = this.changeObject.bind(this);
    this.changeFrequence = this.changeFrequence.bind(this);
    this.changepower = this.changepower.bind(this);
    this.changedistance = this.changedistance.bind(this);
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
    key: "changeObject",
    value: function changeObject(object) {
      this.object = object;
      console.log(this.object);

      if (this.object == "Person") {
        this.object_img = "../../../images/pedestrian.png";
        this.RCS = '1';
        this.distance = 10;
        console.log(this.RCS);
      }

      if (this.object == "Car") {
        this.object_img = "../../../images/Car.png";
        this.RCS = '100';
        this.distance = 10;
        console.log(this.RCS);
      }

      if (this.object == "Bus") {
        this.object_img = "../../../images/Bus.png";
        this.RCS = '200';
        this.distance = 10;
        console.log(this.RCS);
      }
    }
  }, {
    key: "changeFrequence",
    value: function changeFrequence(frequency) {
      this.frequency = frequency;
      console.log(this.frequency);
    }
  }, {
    key: "changepower",
    value: function changepower(power) {
      this.power = power;
    }
  }, {
    key: "changedistance",
    value: function changedistance(distance) {
      this.distance = distance;
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
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "agentFound", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "object", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'Person';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "object_img", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "../../../images/pedestrian.png";
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "frequency", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 24;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "RCS", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "GTx", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '10';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "power", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "distance", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
})), _class);


/***/ }),

/***/ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConsoleStore.js":
/*!*********************************************************************************************!*\
  !*** ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/stores/SerialConsoleStore.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerialConsoleStore; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _actions_FFT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/FFT */ "./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/actions/FFT.js");
var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }



var SerialConsoleStore = (_class =
/*#__PURE__*/
function () {
  function SerialConsoleStore(daemon) {
    _classCallCheck(this, SerialConsoleStore);

    this.fftThreshold = 128;
    this.IQdataThreshold = 128;
    this.unprocessedThreshold = 150;
    this.fftLength = 128;
    this.IQplotLength = 1;
    this.speedAverage = 4;
    this.daemon = undefined;
    this.processedIndex = 0;
    this.messages = '';
    this.lineSeparator = '\n';

    _initializerDefineProperty(this, "emptyCount", _descriptor, this);

    _initializerDefineProperty(this, "magnitudes", _descriptor2, this);

    _initializerDefineProperty(this, "speed", _descriptor3, this);

    _initializerDefineProperty(this, "max", _descriptor4, this);

    _initializerDefineProperty(this, "IQdata", _descriptor5, this);

    this.IQdataCache = {
      index: 0,
      processedIQ: 0,
      processedFFT: 0,
      real: new Array(this.fftLength * this.IQplotLength).fill(0),
      imag: new Array(this.fftLength * this.IQplotLength).fill(0)
    };
    this.fftStore = {
      index: 0,
      magnitudes: new Array(this.fftLength),
      max: 0,
      speed: new Array(this.speedAverage)
    };
    this.daemon = daemon;
    this.fft = new _actions_FFT__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.addMessage = this.addMessage.bind(this);
    this.updateLineSeparator = this.updateLineSeparator.bind(this);
    this.processMessages = this.processMessages.bind(this);
    this.updateFftStore = this.updateFftStore.bind(this);
  }

  _createClass(SerialConsoleStore, [{
    key: "addMessage",
    value: function addMessage(message) {
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
  }, {
    key: "clearMessages",
    value: function clearMessages() {
      this.messages = '';
    }
  }, {
    key: "updateLineSeparator",
    value: function updateLineSeparator(lineSeparator) {
      this.lineSeparator = lineSeparator;
      console.log('new separator');
    }
  }, {
    key: "processMessages",
    value: function processMessages() {
      var _this = this;

      var unprocessedMessages = this.messages.substr(this.processedIndex).split(/[\r|\r\n|\n]+/);
      var remainder = unprocessedMessages.splice(-1, 1);
      this.processedIndex = this.messages.length - remainder[0].length;
      unprocessedMessages = unprocessedMessages.filter(function (el) {
        return el.match(/^\d+[ ]+\d+$/);
      }); //console.log('IQdataCache length: ' + this.IQdataCache.index);
      //console.log('unprocessed messages: ' + unprocessedMessages.length);

      if (this.emptyCount && unprocessedMessages.length > 0) {
        this.emptyCount = 0;
      } else {
        this.emptyCount = (this.emptyCount + 1) % 1024;
      }

      unprocessedMessages.map(function (el) {
        var tmp = el.split(/[ ]/);

        if (_this.IQdataCache.index - _this.IQdataCache.processedIQ >= _this.IQdataThreshold) {
          //console.log('IQ refresh');
          _this.updateIQdataStore();
        }

        if (_this.IQdataCache.index - _this.IQdataCache.processedFFT >= _this.fftThreshold) {
          //console.log('FFT and reset');
          _this.updateFftStore();
        }

        if (_this.IQdataCache.index >= _this.fftLength * _this.IQplotLength) {
          _this.IQdataCache.index = 0;
          _this.IQdataCache.processedIQ = 0;
          _this.IQdataCache.processedFFT = 0;
        }

        if (_this.IQdataCache.index < _this.fftLength * _this.IQplotLength) {
          //console.log('adding el');
          _this.IQdataCache.real[_this.IQdataCache.index] = parseInt(tmp[0]);
          _this.IQdataCache.imag[_this.IQdataCache.index] = parseInt(tmp[1]);
          _this.IQdataCache.index++;
        } else {//console.log('shouldnt happen');
        }
      }); //console.log('IQdataCache after length: ' + this.IQdataCache.index);
    }
  }, {
    key: "updateIQdataStore",
    value: function updateIQdataStore() {
      var newDataLength = this.IQdataCache.index - this.IQdataCache.processedIQ;
      var data = {
        real: this.IQdata.real.slice(0),
        imag: this.IQdata.imag.slice(0)
      };

      for (var i = 0; i < data.real.length; i++) {
        if (i < data.real.length - newDataLength) {
          data.real[i] = data.real[i + newDataLength];
          data.imag[i] = data.imag[i + newDataLength];
        } else {
          data.real[i] = this.IQdataCache.real[i - data.real.length + newDataLength];
          data.imag[i] = this.IQdataCache.imag[i - data.imag.length + newDataLength];
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
      var result = this.fft.computeMagnitudes(data);
      this.fftStore.index = (this.fftStore.index + 1) % this.speedAverage;
      this.fftStore.magnitudes = result.magnitudes;
      this.fftStore.max = result.max;
      this.fftStore.speed[this.fftStore.index] = this.fft.calculateSpeed(result.max, result.magnitudes); //console.log(result.magnitudes);
      //console.log(Math.abs(result.max.freq - 256));

      console.log(this.fftStore.speed[this.fftStore.index]);
      this.publishFftResults();
      this.IQdataCache.processedFFT = this.IQdataCache.index;
    }
  }, {
    key: "publishFftResults",
    value: function publishFftResults() {
      this.magnitudes = this.fftStore.magnitudes.slice(0);
      this.max = this.fftStore.max;
      this.speed = this.fftStore.speed.reduce(function (a, b) {
        return a + b;
      }, 0) / this.fftStore.speed.length;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(translateX) {
      Math.round(translateX * 100 / 384 + 49.22);
    }
  }, {
    key: "text",
    get: function get() {
      return this.messages;
    }
  }]);

  return SerialConsoleStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "emptyCount", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "magnitudes", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "speed", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "max", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "IQdata", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      real: new Array(this.fftLength).fill(0),
      imag: new Array(this.fftLength).fill(0)
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "text", [mobx__WEBPACK_IMPORTED_MODULE_0__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, "text"), _class.prototype)), _class);


/***/ }),

/***/ 16:
/*!***********************************************************************************************************************************************!*\
  !*** multi ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.js ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.scss ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.js */"./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.js");
module.exports = __webpack_require__(/*! ./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.scss */"./docs/assets/iframes/learnRadar/Radar-Equation/7-18/src/app.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map