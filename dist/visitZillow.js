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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAndVisitZillow = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
function searchAndVisitZillow() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, error_1, searchResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch({
                        headless: true,
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://www.google.com", {
                            waitUntil: "domcontentloaded",
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, page
                            .waitForSelector('text="I agree"', { timeout: 5000 })
                            .then(function () { return page.click('text="I agree"'); })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log("Consent button not found or not necessary, proceeding...");
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, page.type("textarea[name=q]", "top home listing websites")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.press("Enter")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 10:
                    _a.sent(); // Wait for the search results page to load
                    return [4 /*yield*/, page.evaluate(function () {
                            var results = [];
                            var items = document.querySelectorAll("h3 a");
                            items.forEach(function (item) {
                                var title = item.textContent;
                                var url = item.getAttribute("href");
                                if (title && url) {
                                    results.push({ title: title, url: url });
                                }
                            });
                            return results;
                        })];
                case 11:
                    searchResults = _a.sent();
                    console.log(searchResults);
                    // Filter for Zillow link
                    // const zillowLink = searchResults.find((result: { title: string }) =>
                    // 	result.title.toLowerCase().includes("zillow")
                    // );
                    // console.log(zillowLink);
                    // if (zillowLink && zillowLink.url) {
                    // 	console.log(`Navigating to Zillow: ${zillowLink.url}`);
                    // 	await page.goto(zillowLink.url, { waitUntil: "networkidle2" });
                    // 	// Optionally, perform actions on the Zillow page here
                    // } else {
                    // 	console.log("Zillow link not found in search results");
                    // }
                    return [4 /*yield*/, browser.close()];
                case 12:
                    // Filter for Zillow link
                    // const zillowLink = searchResults.find((result: { title: string }) =>
                    // 	result.title.toLowerCase().includes("zillow")
                    // );
                    // console.log(zillowLink);
                    // if (zillowLink && zillowLink.url) {
                    // 	console.log(`Navigating to Zillow: ${zillowLink.url}`);
                    // 	await page.goto(zillowLink.url, { waitUntil: "networkidle2" });
                    // 	// Optionally, perform actions on the Zillow page here
                    // } else {
                    // 	console.log("Zillow link not found in search results");
                    // }
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.searchAndVisitZillow = searchAndVisitZillow;
