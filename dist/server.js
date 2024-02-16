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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var scrape_1 = require("./scrape");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static("public"));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.get("/scrape-zillow", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, scrape_1.scrapeListings)("Naperville")];
            case 1:
                data = _a.sent();
                console.log(data);
                res.send("Scraping Zillow completed successfully!");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error during Zillow scraping:", error_1);
                res.status(500).send("Error during scraping");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/get-homeinfo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                url = "https://www.zillow.com/naperville-il/white-eagle_att/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Afalse%2C%22mapBounds%22%3A%7B%22west%22%3A-88.26835122045898%2C%22east%22%3A-88.03386177954101%2C%22south%22%3A41.660268190388415%2C%22north%22%3A41.83726309567184%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A39931%2C%22regionType%22%3A6%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22att%22%3A%7B%22value%22%3A%22white%20eagle%22%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A12%7D";
                return [4 /*yield*/, (0, scrape_1.scrapeListingDetails)(url)];
            case 1:
                data = _a.sent();
                console.log("data ~~~~~~~~~~~: ", data);
                res.send("Get Zillow home info successfully!");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error during Zillow scraping:", error_2);
                res.status(500).send("Error during scraping");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
