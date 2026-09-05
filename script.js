"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
if (typeof fetch !== "undefined" &&
    typeof Promise !== "undefined" &&
    typeof addEventListener !== "undefined" &&
    typeof document.body.requestFullscreen !== "undefined" &&
    typeof Blob !== "undefined" &&
    typeof ImageBitmap !== "undefined" &&
    typeof AbortController !== "undefined") {
}
else {
    throw new Error("Unsupported browser. Disabling JavaScript.");
}
var PAGE_ELMS = {
    title: document.getElementById("title"),
    htmlLink: document.getElementById("html_link"),
    imageLink: document.getElementById("image_link"),
    anchor: document.getElementById("anchor"),
    image: document.getElementById("image"),
    progress: document.getElementById("bar"),
    canvas: document.getElementById("canvas"),
};
PAGE_ELMS.htmlLink.remove();
PAGE_ELMS.imageLink.remove();
PAGE_ELMS.image.removeAttribute("src");
PAGE_ELMS.image.remove();
PAGE_ELMS.anchor.removeAttribute("href");
var BASE_URL = location.href.substring(0, location.href.lastIndexOf("/") + 1);
var IMG_CACHES = [];
var CONTROLERS = new Map();
var DRAW_QUEUE = [];
var CTX = PAGE_ELMS.canvas.getContext("2d");
function nextPage() {
    currentPageIndex = PAGE_DATA_LIST[currentPageIndex].nextIndex;
    nav(false);
}
function prevPage() {
    currentPageIndex = PAGE_DATA_LIST[currentPageIndex].prevIndex;
    nav(false);
}
function nav(currentPage) {
    return __awaiter(this, void 0, void 0, function () {
        var currentPageIndexNow, pageData, newUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentPageIndexNow = currentPageIndex;
                    pageData = PAGE_DATA_LIST[currentPageIndexNow];
                    PAGE_ELMS.title.textContent = pageData.title;
                    if (currentPage === false) {
                        newUrl = BASE_URL + pageData.htmlFilename;
                        window.history.pushState({ path: newUrl }, "", newUrl);
                    }
                    PAGE_ELMS.image.alt = pageData.title;
                    if (!(IMG_CACHES[currentPageIndexNow].blob !== undefined)) return [3, 1];
                    drawImage(currentPageIndexNow);
                    return [3, 11];
                case 1: return [4, new Promise(function (r) { return setTimeout(r, 100); })];
                case 2:
                    _a.sent();
                    if (currentPageIndexNow !== currentPageIndex)
                        return [2];
                    loadImage(currentPageIndexNow);
                    _a.label = 3;
                case 3:
                    if (!true) return [3, 7];
                    if (currentPageIndexNow !== currentPageIndex)
                        return [3, 7];
                    if (!(IMG_CACHES[currentPageIndexNow].total === 1)) return [3, 5];
                    return [4, new Promise(function (r) { return setTimeout(r, 0); })];
                case 4:
                    _a.sent();
                    PAGE_ELMS.progress.value = 0;
                    PAGE_ELMS.canvas.className = "hidden";
                    PAGE_ELMS.progress.className = "";
                    return [3, 6];
                case 5:
                    PAGE_ELMS.progress.max = IMG_CACHES[currentPageIndexNow].total;
                    PAGE_ELMS.progress.value =
                        IMG_CACHES[currentPageIndexNow].received;
                    PAGE_ELMS.canvas.className = "hidden";
                    PAGE_ELMS.progress.className = "";
                    return [3, 7];
                case 6: return [3, 3];
                case 7:
                    if (!true) return [3, 11];
                    if (currentPageIndexNow !== currentPageIndex)
                        return [3, 11];
                    PAGE_ELMS.progress.value =
                        IMG_CACHES[currentPageIndexNow].received;
                    if (!(IMG_CACHES[currentPageIndexNow].blob === undefined)) return [3, 9];
                    return [4, new Promise(function (r) { return setTimeout(r, 0); })];
                case 8:
                    _a.sent();
                    return [3, 10];
                case 9:
                    drawImage(currentPageIndexNow);
                    return [3, 11];
                case 10: return [3, 7];
                case 11:
                    if (IMG_CACHES[currentPageIndexNow].blob !== undefined &&
                        currentPageIndexNow === currentPageIndex) {
                        if (IMG_CACHES[pageData.nextIndex].fetched === false) {
                            loadImage(pageData.nextIndex);
                        }
                        else {
                            loadImage(pageData.prevIndex);
                        }
                    }
                    return [2];
            }
        });
    });
}
function drawImage(currentPageIndexNow) {
    return __awaiter(this, void 0, void 0, function () {
        var bitmap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    DRAW_QUEUE.push(currentPageIndexNow);
                    return [4, createImageBitmap(IMG_CACHES[currentPageIndexNow].blob)];
                case 1:
                    bitmap = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!true) return [3, 4];
                    return [4, new Promise(function (r) { return setTimeout(r, 0); })];
                case 3:
                    _a.sent();
                    if (DRAW_QUEUE[0] === currentPageIndexNow) {
                        PAGE_ELMS.canvas.width = bitmap.width;
                        PAGE_ELMS.canvas.height = bitmap.height;
                        CTX.drawImage(bitmap, 0, 0);
                        PAGE_ELMS.progress.className = "hidden";
                        PAGE_ELMS.canvas.className = "";
                        bitmap.close();
                        DRAW_QUEUE.shift();
                        return [3, 4];
                    }
                    return [3, 2];
                case 4: return [2];
            }
        });
    });
}
function loadImage(pageIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var imgCache, controller, imageRes, imageTotal, imageReader, imageChunks, imageReceived, _a, done, value, imageBlob, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    imgCache = IMG_CACHES[pageIndex];
                    if (!(imgCache.fetched === false)) return [3, 11];
                    imgCache.fetched = true;
                    controller = new AbortController();
                    CONTROLERS.forEach(function (abortController, index) {
                        abortController.abort();
                        IMG_CACHES[index].fetched = false;
                        IMG_CACHES[index].received = 0;
                        CONTROLERS.delete(index);
                    });
                    CONTROLERS.set(pageIndex, controller);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    return [4, fetch(PAGE_DATA_LIST[pageIndex].imageFilename, { signal: controller.signal })];
                case 2:
                    imageRes = _b.sent();
                    if (!(imageRes.ok && controller.signal.aborted === false)) return [3, 8];
                    imageTotal = Number(imageRes.headers.get("Content-Length"));
                    imageReader = imageRes.body.getReader();
                    imageChunks = [];
                    imageReceived = 0;
                    imgCache.total = imageTotal;
                    _b.label = 3;
                case 3:
                    if (!true) return [3, 7];
                    if (!(controller.signal.aborted === false)) return [3, 5];
                    return [4, imageReader.read()];
                case 4:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (done) {
                        imgCache.received = imageTotal;
                        return [3, 7];
                    }
                    imageChunks.push(value);
                    imageReceived += value.length;
                    imgCache.received = imageReceived;
                    return [3, 6];
                case 5:
                    imgCache.fetched = false;
                    return [2];
                case 6: return [3, 3];
                case 7:
                    CONTROLERS.delete(pageIndex);
                    imageBlob = new Blob(imageChunks, {
                        type: imageRes.headers.get("Content-Type"),
                    });
                    imgCache.blob = imageBlob;
                    return [3, 9];
                case 8:
                    imgCache.fetched = false;
                    _b.label = 9;
                case 9: return [3, 11];
                case 10:
                    err_1 = _b.sent();
                    if (err_1 instanceof DOMException && err_1.name === "AbortError") {
                        return [2];
                    }
                    throw err_1;
                case 11: return [2];
            }
        });
    });
}
function enterFullscreen() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, document.body.requestFullscreen()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function exitFullscreen() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, document.exitFullscreen()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function toggleFullscreen() {
    if (document.fullscreenElement === null) {
        enterFullscreen();
    }
    else {
        exitFullscreen();
    }
}
function captureKeyDown(event) {
    if (event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === " " ||
        event.key === "n" ||
        event.key === "N" ||
        event.key === "Enter" ||
        event.key === "PageDown" ||
        event.key === "Spacebar") {
        nextPage();
    }
    else if (event.key === "ArrowLeft" ||
        event.key === "ArrowUp" ||
        event.key === "b" ||
        event.key === "B" ||
        event.key === "Backspace" ||
        event.key === "Delete" ||
        event.key === "PageUp") {
        prevPage();
    }
    else if (event.key === "f" ||
        event.key === "F") {
        toggleFullscreen();
    }
}
var clicked = false;
var clickTimer;
function captureClick() {
    if (clicked === false) {
        clicked = true;
        clickTimer = setTimeout(function () {
            clicked = false;
            nextPage();
        }, 300);
    }
    else {
        clearTimeout(clickTimer);
        clicked = false;
        toggleFullscreen();
    }
}
function capturePopState() {
    currentPageIndex = Number(window.location.pathname.split("/").pop().split(".")[0]);
    if (currentPageIndex !== 0) {
        currentPageIndex -= 1;
    }
    nav(true);
}
document.body.addEventListener("keydown", captureKeyDown);
document.body.addEventListener("click", captureClick);
window.addEventListener("popstate", capturePopState);
var currentPageIndex = Number(window.location.pathname.split("/").pop().split(".")[0]);
if (currentPageIndex !== 0) {
    currentPageIndex -= 1;
}
var PAGE_DATA_LIST;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch("page-data-list.json")];
                case 1: return [4, (_a.sent()).json()];
                case 2:
                    PAGE_DATA_LIST = _a.sent();
                    i = 0;
                    PAGE_DATA_LIST.forEach(function () {
                        IMG_CACHES[i] = {
                            fetched: false,
                            received: 0,
                            total: 1,
                            blob: undefined,
                        };
                        i += 1;
                    });
                    nav(true);
                    return [2];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", init, { once: true });
