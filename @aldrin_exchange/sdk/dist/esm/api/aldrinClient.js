import { GraphQLClient } from 'graphql-request';
import { API_URL } from '.';
var AldrinApiClient = /** @class */ (function () {
    /**
     *
     * @param url API URL, should be changed to proxy for browser usage (CORS disabled)
     */
    function AldrinApiClient(url) {
        if (url === void 0) { url = API_URL; }
        this.gqlClient = new GraphQLClient(url);
    }
    return AldrinApiClient;
}());
export { AldrinApiClient };
