function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _jsxFileName = "D:\\work\\demo\\infte\\infte-components\\packages\\web3ReactModal\\src\\Web3Modal.tsx";
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import detectEthereumProvider from '@metamask/detect-provider';
import { message } from 'antd';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import React from 'react';
import { createContainer } from 'unstated-next';
import config from "./config";
import Storage from "./storage";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
var chainsList = config.chainsList;
var WalletProiderData = {
  MetaMask: detectEthereumProvider
};
var catchMsg = {
  '-32002': '请确认您在MetaMask中的操作'
};
var useWeb3Hook = function useWeb3Hook() {
  // const { t } = useTranslation();

  // Web3
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    web3Provider = _useState2[0],
    setWeb3Provider = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    WalletProider = _useState4[0],
    setWalletProider = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    account = _useState6[0],
    setAccount = _useState6[1];
  var _useState7 = useState(undefined),
    _useState8 = _slicedToArray(_useState7, 2),
    chainId = _useState8[0],
    setChainId = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = useState(undefined),
    _useState12 = _slicedToArray(_useState11, 2),
    networkChainsInfo = _useState12[0],
    setNetworkChainsInfo = _useState12[1];
  var _useState13 = useState(undefined),
    _useState14 = _slicedToArray(_useState13, 2),
    contracts = _useState14[0],
    setContracts = _useState14[1];
  var _Storage$useContainer = Storage.useContainer(),
    walletType = _Storage$useContainer.walletType,
    networkId = _Storage$useContainer.networkId,
    setNetworkId = _Storage$useContainer.setNetworkId;
  var setProviderChainId = function setProviderChainId(chainId) {
    return Number(chainId.toString().indexOf('0x') === 0 ? parseInt(chainId, 16) : chainId);
  };
  var connect = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(chainsId) {
      var wallet_type,
        auto_connect,
        network_id,
        chainsInfo,
        providerInstance,
        _account,
        walletChainId,
        providerChainId,
        chainId_to16,
        _chainsInfo$explorers,
        params,
        web3instance,
        Account,
        _catchMsg$e$message,
        messgae,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            wallet_type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'MetaMask';
            auto_connect = _args.length > 2 ? _args[2] : undefined;
            setLoading(true);
            network_id = Number(chainsId); // 限制支持链
            chainsInfo = chainsList.find(function (item) {
              return item.networkId === Number(network_id);
            });
            if (!chainsInfo) {
              _context.next = 77;
              break;
            }
            _context.prev = 6;
            providerInstance = null; // 钱包实例 provider
            _account = []; // ox账户
            // WalletProider
            _context.next = 11;
            return WalletProiderData === null || WalletProiderData === void 0 ? void 0 : WalletProiderData[wallet_type]();
          case 11:
            providerInstance = _context.sent;
            if (!providerInstance) {
              _context.next = 18;
              break;
            }
            _context.next = 15;
            return providerInstance.request({
              method: 'eth_requestAccounts'
            });
          case 15:
            _account = _context.sent[0];
            _context.next = 20;
            break;
          case 18:
            if (!auto_connect) message.error("Please install ".concat(wallet_type, " !"));
            return _context.abrupt("return");
          case 20:
            _context.next = 22;
            return providerInstance.request({
              method: 'eth_chainId'
            });
          case 22:
            walletChainId = _context.sent;
            providerChainId = setProviderChainId(walletChainId); // Change to current network/更改为当前网络
            if (!(network_id !== providerChainId)) {
              _context.next = 56;
              break;
            }
            chainId_to16 = "0x".concat(network_id.toString(16));
            _context.prev = 26;
            _context.next = 29;
            return providerInstance.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: chainId_to16
              }]
            });
          case 29:
            _context.next = 56;
            break;
          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](26);
            if (!(_context.t0.code === 4902)) {
              _context.next = 46;
              break;
            }
            _context.prev = 34;
            params = {
              chainId: chainId_to16,
              chainName: chainsInfo.name,
              nativeCurrency: chainsInfo.nativeCurrency,
              rpcUrls: chainsInfo.rpc,
              blockExplorerUrls: [(_chainsInfo$explorers = chainsInfo.explorers[0]) === null || _chainsInfo$explorers === void 0 ? void 0 : _chainsInfo$explorers.url]
            };
            _context.next = 38;
            return providerInstance.request({
              method: 'wallet_addEthereumChain',
              params: [params]
            });
          case 38:
            _context.next = 44;
            break;
          case 40:
            _context.prev = 40;
            _context.t1 = _context["catch"](34);
            message.error(_context.t1.message);
            return _context.abrupt("return", _context.t1.message);
          case 44:
            _context.next = 56;
            break;
          case 46:
            if (!(_context.t0.code === 4001)) {
              _context.next = 50;
              break;
            }
            return _context.abrupt("return");
          case 50:
            if (!(_context.t0.code === -32002)) {
              _context.next = 54;
              break;
            }
            return _context.abrupt("return");
          case 54:
            message.error(_context.t0.message);
            return _context.abrupt("return", _context.t0.message);
          case 56:
            web3instance = new ethers.providers.Web3Provider(providerInstance);
            _context.next = 59;
            return web3instance._getAddress(_account);
          case 59:
            Account = _context.sent;
            // ethers.utils.getAddress

            // set
            setWeb3Provider(web3instance);
            setWalletProider(providerInstance);
            setAccount(Account);
            setChainId(providerChainId);
            setContracts(chainsInfo.contracts);
            setNetworkChainsInfo(chainsInfo);
            setLoading(false);
            return _context.abrupt("return", null);
          case 70:
            _context.prev = 70;
            _context.t2 = _context["catch"](6);
            messgae = (_catchMsg$e$message = catchMsg[_context.t2.message]) !== null && _catchMsg$e$message !== void 0 ? _catchMsg$e$message : _context.t2.message;
            message.error(messgae);
            return _context.abrupt("return", messgae);
          case 75:
            _context.next = 77;
            break;
          case 77:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[6, 70], [26, 31], [34, 40]]);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  var disconnect = function disconnect() {
    setWeb3Provider(null);
    setWalletProider(null);
    setWeb3Provider(null);
    setWalletProider(null);
    setAccount('');
    setChainId(undefined);
  };
  useEffect(function () {
    if (networkId && walletType) {
      connect(networkId, walletType, false);
    }
  }, []);

  // 监听登录
  useEffect(function () {
    if (!(WalletProider !== null && WalletProider !== void 0 && WalletProider.on)) return;
    WalletProider.on('accountsChanged', function (_accounts) {
      // 处理新帐户或缺少新帐户（_A）。/ Handle the new _accounts, or lack thereof.
      if (!_accounts.length) return;
      if (account === _accounts[0]) return;
      setAccount(_accounts[0]);
      window.location.reload();
    });

    // chainChanged
    WalletProider.on('chainChanged', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(chainId) {
        var chainIdValue, network;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              chainIdValue = setProviderChainId(chainId);
              network = chainsList.find(function (element) {
                return element.chainId === Number(chainIdValue);
              });
              setNetworkId(network.networkId);
              window.location.reload();
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    // disconnect
    WalletProider === null || WalletProider === void 0 ? void 0 : WalletProider.once('disconnect', disconnect);
  }, [WalletProider, account, disconnect, setNetworkId]);
  return useMemo(function () {
    return {
      web3Provider: web3Provider,
      WalletProider: WalletProider,
      chainId: chainId,
      account: account,
      active: !!account,
      connect: connect,
      disconnect: disconnect,
      networkChainsInfo: networkChainsInfo,
      contracts: contracts,
      loading: loading
    };
  }, [web3Provider, WalletProider, chainId, account, connect, disconnect, networkChainsInfo, contracts]);
};
var Web3Hook = createContainer(useWeb3Hook);
export var useWeb3Provider = function useWeb3Provider() {
  var data = Web3Hook.useContainer();
  return useMemo(function () {
    return data;
  }, [data]);
};
export function Web3Modal(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/_jsxDEV(Storage.Provider, {
    children: /*#__PURE__*/_jsxDEV(Web3Hook.Provider, {
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 264,
    columnNumber: 5
  }, this);
}
export default Web3Modal;