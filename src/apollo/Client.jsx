import {ApolloClient,InMemoryCache} from '@apollo/client';


const client = new ApolloClient({
uri:'https://your-real-api.com/graphql',
cache: new InMemoryCache(),

});

export default client;