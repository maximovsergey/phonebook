import { GraphQLClient } from "graphql-request";

export function getGraphQlClient() {
    return new GraphQLClient('http://localhost:4000/graphql', {
        headers: {
            authentication: ''
        }
    })
}