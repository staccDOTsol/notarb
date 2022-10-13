import { GraphQLClient } from 'graphql-request';
export declare class AldrinApiClient {
    protected gqlClient: GraphQLClient;
    /**
     *
     * @param url API URL, should be changed to proxy for browser usage (CORS disabled)
     */
    constructor(url?: string);
}
