import typeDefs from './typeDefs';
import resolvers from './resolvers';

const PORT = 4000;
export async function graphQLServer() {
    const connect = require('connect');
    const { ApolloServer } = require('apollo-server-express');
    const query = require('qs-middleware');
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = connect();
    const path = '/graphql';
    app.use(query());
    server.applyMiddleware({ app, path });

    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
}

export async function graphQLServerExpress() {
    const express = require('express');
    const graphqlMiddleware = require('express-graphql');
    const schema = require('./schema')

    const api = express();
    api.all('/graphqlExpress', graphqlMiddleware({
        schema,
        graphiql: true
    }))
}