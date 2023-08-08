/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const webview_container_1 = __webpack_require__(3);
const registerWebviews = (context) => {
    console.log("inside regosterWebview");
    /**
     *
     */
    vscode.window.registerWebviewViewProvider(webview_container_1.default.ActivityBarWebview_1.viewType, new webview_container_1.default.ActivityBarWebview_1(context), {
        webviewOptions: { retainContextWhenHidden: true },
    });
};
exports["default"] = registerWebviews;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(4);
const path = __webpack_require__(5);
function html(exPath) {
    return fs.readFileSync(path.join(exPath, "media", "index.html"), {
        encoding: "utf-8",
    });
}
class ActivityBarWebview_1 {
    constructor(context) {
        this.webviewView = null;
        this.onDidReceiveMessageHandler = async ({ action, payload, promiseId }) => {
            console.log("insied message handler");
            switch (action) {
                case "GET_INITIAL_VALUES": {
                    try {
                        console.log("inside getInitalvaiulsue");
                        this.webviewView?.webview.postMessage({
                            promiseId: promiseId,
                            view: ActivityBarWebview_1.viewType,
                        });
                    }
                    catch (e) {
                        console.log("errror", e);
                    }
                    break;
                }
            }
        };
        this.context = context;
    }
    resolveWebviewView(webviewView) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.onDidReceiveMessage(this.onDidReceiveMessageHandler);
        webviewView.webview.html = html(this.context.extensionPath);
    }
}
ActivityBarWebview_1.viewType = "chatbot_poc_activity_bar_1";
const webviewContainer = {
    ActivityBarWebview_1,
};
exports["default"] = webviewContainer;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const register_webviews_1 = __webpack_require__(1);
async function activate(context) {
    console.log("inside activate");
    (0, register_webviews_1.default)(context);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map