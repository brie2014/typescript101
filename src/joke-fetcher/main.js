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
var jokeTypes = ['Any', 'Miscellaneous', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas'];
// Async function to fetch a joke
function getJoke(jokeType) {
    if (jokeType === void 0) { jokeType = 'Any'; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch("https://v2.jokeapi.dev/joke/".concat(jokeType, "?blacklistFlags=nsfw,racist,explicit"), {
                    method: 'GET',
                }).then(function (response) { return response === null || response === void 0 ? void 0 : response.json(); }) // Parse the response in JSON
                    .then(function (response) { return response; } // Cast the response type to our interface
                ).then(function (response) { return response; })];
        });
    });
}
// Function to handle the logic for telling a joke
function tellJoke(joke) {
    if (joke.error) {
        return;
    }
    /*Some jokes are one liners and have joke property*/
    if (joke.joke) {
        console.log(joke.joke);
        return;
    }
    /*Other jokes have a setup and delivery*/
    // Tell the setup
    console.log(joke.setup);
    // Wait 3 seconds and then tell the punchline
    setTimeout(function () {
        console.log(joke.delivery);
    }, 3000);
}
function tellASingleJoke(jokeType) {
    if (jokeType === void 0) { jokeType = 'Any'; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            getJoke(jokeType) // Fetch a joke of the specified type
                .then(function (joke) { return tellJoke(joke); }) // Tell the joke when the response is back
                .catch(function () { return console.error('Unable to get a joke'); }); // If the call fails, catch the error
            return [2 /*return*/];
        });
    });
}
// Helper function that returns a Promise that resolves after "ms" Milliseconds
var wait = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
// Fetch and tell a joke of each type
function tellAllTheJokes() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = jokeTypes;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 4];
                    i = _c;
                    console.log();
                    console.log("".concat(jokeTypes[i], " Joke..."));
                    console.log();
                    return [4 /*yield*/, tellASingleJoke(jokeTypes[i])]; // Tell a joke of the specified type
                case 2:
                    _d.sent(); // Tell a joke of the specified type
                    return [4 /*yield*/, wait(5000)]; // then the created Promise can be awaited
                case 3:
                    _d.sent(); // then the created Promise can be awaited
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
tellAllTheJokes();
