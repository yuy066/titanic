"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
;
var mapRowToPassenger = function (row) { return ({
    id: parseInt(row.id, 10),
    name: row.name,
    survived: row.survived === "1",
    sex: row.sex,
    age: parseInt(row.age, 10),
    ticket_type: parseInt(row.passenger_class, 10),
    ticket_number: row.ticket,
    ticket_fare: parseFloat(row.fare),
}); };
var mapRowToNote = function (row) { return ({
    id: row.id,
    passenger_id: parseInt(row.passenger_id, 10),
    timestamp: row.timestamp,
    message: row.message,
}); };
exports.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var rows, e_1, passengers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.sql("SELECT * from passengers ORDER BY name;")];
            case 1:
                rows = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, res.status(500).json({ error: e_1 })];
            case 3:
                passengers = rows.map(mapRowToPassenger);
                res.json(passengers);
                return [2 /*return*/];
        }
    });
}); };
exports.getByID = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var idParam, id, rows, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idParam = req.params.id;
                id = parseInt(idParam, 10);
                if (isNaN(id)) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an integer id" })];
                }
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, req.sql("SELECT * from passengers WHERE id = " + id + ";")];
            case 2:
                rows = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.error(e_2);
                return [2 /*return*/, res.sendStatus(500)];
            case 4:
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Passenger not found" })];
                }
                return [2 /*return*/, res.json(mapRowToPassenger(rows[0]))];
        }
    });
}); };
exports.addNote = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body, passengerIDParam, passengerID, e_3, row, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                passengerIDParam = req.params.id;
                passengerID = parseInt(passengerIDParam, 10);
                if (isNaN(passengerID)) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an integer id" })];
                }
                // validate fields
                if (!body.message) {
                    return [2 /*return*/, res.status(400).json({ error: "message field required" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, req.sql("INSERT INTO notes (timestamp, message, passenger_id) values (" + new Date().getTime() + ", \"" + body.message + "\", " + passengerID + ");")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                return [2 /*return*/, res.status(500).json({ error: e_3 })];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, req.sql("SELECT * FROM notes WHERE id = last_insert_rowid();")];
            case 5:
                row = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_4 = _a.sent();
                console.error(e_4);
                return [2 /*return*/, res.status(500).json({ error: e_4 })];
            case 7:
                if (row.length === 0) {
                    return [2 /*return*/, res.status(500).json({ error: "Unable to get last inserted row" })];
                }
                res.status(201).json(mapRowToNote(row[0]));
                return [2 /*return*/];
        }
    });
}); };
exports.getPassengerNotes = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var passengerIDParam, passengerID, rows, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                passengerIDParam = req.params.id;
                passengerID = parseInt(passengerIDParam, 10);
                if (isNaN(passengerID)) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an integer id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, req.sql("SELECT * FROM notes WHERE passenger_id = " + passengerID + ";")];
            case 2:
                rows = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.error(e_5);
                return [2 /*return*/, res.status(500).json({ error: e_5 })];
            case 4:
                res.json(rows.map(mapRowToNote));
                return [2 /*return*/];
        }
    });
}); };
exports.updateNote = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body, noteIDParam, noteID, e_6, rows, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                noteIDParam = req.params.id;
                noteID = parseInt(noteIDParam, 10);
                if (isNaN(noteID)) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an integer id" })];
                }
                // validate fields
                if (!body.message) {
                    return [2 /*return*/, res.status(400).json({ error: "message field required" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, req.sql("UPDATE notes SET timestamp = " + new Date().getTime() + ", message = \"" + body.message + "\" WHERE id = " + noteID + ";")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                console.error(e_6);
                return [2 /*return*/, res.status(500).json({ error: e_6 })];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, req.sql("SELECT * from notes WHERE id = " + noteID + ";")];
            case 5:
                rows = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_7 = _a.sent();
                console.error(e_7);
                return [2 /*return*/, res.status(500).json({ error: e_7 })];
            case 7:
                res.json(mapRowToNote(rows[0]));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteNote = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var noteIDParam, noteID, rows, e_8, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteIDParam = req.params.id;
                noteID = parseInt(noteIDParam, 10);
                if (isNaN(noteID)) {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide an integer id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, req.sql("SELECT id from notes WHERE id = " + noteID + ";")];
            case 2:
                rows = _a.sent();
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Note does not exist" })];
                }
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                console.error(e_8);
                return [2 /*return*/, res.status(500).json({ error: e_8 })];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, req.sql("DELETE from notes WHERE id = " + noteID + ";")];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_9 = _a.sent();
                console.error(e_9);
                return [2 /*return*/, res.status(500).json({ error: e_9 })];
            case 7:
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); };
