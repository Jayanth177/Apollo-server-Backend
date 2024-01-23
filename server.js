import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const MONGODB = "mongodb+srv://jayanth:Jayanth177@server.kxusppn.mongodb.net/?retryWrites=true&w=majority";

// Create an ApolloServer instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

// Connect to MongoDB
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");

        // Start the Apollo Server after MongoDB connection is established
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
