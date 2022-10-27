"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AldrinApiClient = void 0;
var graphql_request_1 = require("graphql-request");
var _1 = require(".");
var AldrinApiClient = /** @class */ (function () {
    /**
     *
     * @param url API URL, should be changed to proxy for browser usage (CORS disabled)
     */
    function AldrinApiClient(url) {
        if (url === void 0) { url = _1.API_URL; }
        this.gqlClient = new graphql_request_1.GraphQLClient(url);
    }
    return AldrinApiClient;
}());
exports.AldrinApiClient = AldrinApiClient;
