const config = require('./config');
var mongoose = require('mongoose');

//export this function and imported by server.js
module.exports = function () {

    mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', function () {
        console.log("Mongoose default connection is open.");
    });

    mongoose.connection.on('error', function (err) {
        console.log(`Mongoose default connection has occured ${err} error`);
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}