var _localStorage, _localStorage2;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import config from "./config";
import { localStorage } from "./utils";
var NETWORK_ID_NAME = 'NETWORK_ID';
var WALLET_TYPE_NAME = 'WALLET_TYPE';
var defaultStates = {
  NETWORK_ID: (_localStorage = localStorage(NETWORK_ID_NAME)) !== null && _localStorage !== void 0 ? _localStorage : config.BASE_NETWORK_ID,
  WALLET_TYPE: (_localStorage2 = localStorage(WALLET_TYPE_NAME)) !== null && _localStorage2 !== void 0 ? _localStorage2 : config.BASE_WALLET_TYPE
};
function useStorage() {
  var customInitialStates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initStates = Object.assign({}, defaultStates, customInitialStates);
  var _useState = useState(initStates.NETWORK_ID),
    _useState2 = _slicedToArray(_useState, 2),
    networkId = _useState2[0],
    _setNetworkId = _useState2[1];
  var _useState3 = useState(initStates.WALLET_TYPE),
    _useState4 = _slicedToArray(_useState3, 2),
    walletType = _useState4[0],
    _setWalletType = _useState4[1];
  return {
    networkId: networkId,
    walletType: walletType,
    setNetworkId: function setNetworkId(payload) {
      localStorage(NETWORK_ID_NAME, payload);
      _setNetworkId(payload);
    },
    setWalletType: function setWalletType(payload) {
      localStorage(WALLET_TYPE_NAME, payload);
      _setWalletType(payload);
    }
  };
}
var useStorages = createContainer(useStorage);
export var useWeb3Storage = function useWeb3Storage() {
  var data = useStorages.useContainer();
  return useMemo(function () {
    return data;
  }, [data]);
};
export default useStorages;