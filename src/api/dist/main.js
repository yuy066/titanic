"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var sqlite3_1 = require("sqlite3");
var passengers = require("./controllers/passengers");
var bodyParser = require("body-parser");
var db;
var server = express();
exports.server = server;
// Add database to all requests
server.use(function (req, res, next) {
    req.db = db;
    // Helper method to run simple sql queries
    req.sql = function (query) {
        return new Promise(function (resolve, reject) {
            db.all(query, function (err, rows) {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    };
    next();
});
// Parse all bodies as JSON
server.use(bodyParser.json({
    type: function () { return true; },
    strict: true,
}));
// Return body parser errors as json
server.use(function (error, req, res, next) {
    if (error) {
        if (error instanceof SyntaxError) {
            res.status(400).json({
                error: {
                    message: 'Invalid Json Body',
                    code: 'invalid_json'
                }
            });
            return;
        }
        else {
            res.status(500).json({
                error: {
                    message: 'Server Error',
                    code: 'server_error'
                }
            });
            return;
        }
    }
    next();
});
// Define routes
server.get("/passenger", passengers.getAll);
server.get("/passenger/:id", passengers.getByID);
server.post("/passenger/:id/note", passengers.addNote);
server.get("/passenger/:id/note", passengers.getPassengerNotes);
server.put("/note/:id", passengers.updateNote);
server.delete("/note/:id", passengers.deleteNote);
// Connect to database and then start the server
var dbPath = path.resolve(__dirname, "..", "data", "titanic.db");
db = new sqlite3_1.Database(dbPath, function (err) {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    console.log("Connected to database");
    server.listen(8080, function () { return console.log("API server is running on port 8080"); });
});
