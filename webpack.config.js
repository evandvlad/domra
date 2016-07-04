"use strict";

const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./test/specs/index.js"),

    output: {
        filename: "all-specs.js",
        path: path.resolve(__dirname, "./test")
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
};