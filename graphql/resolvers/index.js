
import { merge } from 'lodash'
import messagesResolvers from './graphql/resolvers/messages';
import usersResolvers from './graphql/resolvers/users';
import typeDefs from './graphql/typeDefs.js'; 

export default {
  Query: {
    ...messagesResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...messagesResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};

