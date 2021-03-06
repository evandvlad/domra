/* global require, module, __dirname */

const path = require("path");

const PATH_TO_SRC_DIR = path.resolve(__dirname, "src");
const PATH_TO_COVERAGE_DIR = path.resolve(__dirname, "coverage");
const PATH_TO_TEST_DIR = path.resolve(__dirname, "test");
const PATH_TO_POLYFILL_FILE = path.resolve(__dirname, "node_modules/babel-polyfill/dist/polyfill.min.js");

const JS_FILE_REGEXP = /\.js$/;

module.exports = function(config) {
    config.set({
        singleRun: true,
        autoWatch: false,
        browsers: ["PhantomJS"],
        files: [
            PATH_TO_POLYFILL_FILE,
            PATH_TO_TEST_DIR + "/specs/**/*.js"
        ],
        frameworks: ["mocha"],
        preprocessors: {
            [PATH_TO_TEST_DIR + "/**/*.js"]: ["webpack"],
            [PATH_TO_SRC_DIR + "/**/*.js"]: ["coverage"]
        },
        reporters: ["mocha", "coverage"],
        webpack: {
            devtool: "eval",
            module: {
                preLoaders: [
                    {
                        test: JS_FILE_REGEXP,
                        exclude: [PATH_TO_SRC_DIR, /node_modules/],
                        loader: "babel"
                    },
                    {
                        test: JS_FILE_REGEXP,
                        include: PATH_TO_SRC_DIR,
                        loader: "isparta"
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: PATH_TO_COVERAGE_DIR,
            subdir: ".",
            type: "lcov"
        }
    });
};