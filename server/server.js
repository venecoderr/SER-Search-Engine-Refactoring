const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) // Pass the request object to the context
  });

  await server.start();

  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
  });
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add the middleware to handle authentication
app.use(authMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

startApolloServer();
