const typeDefs = `
type Book {
  _id: ID!
  bookId: ID!
  title: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  savedBooks: [Book!]!
}

type AuthData {
  token: String!
  user: User!
}

type Query {
  getUser(id: ID, username: String): User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): AuthData
  loginUser(usernameOrEmail: String!, password: String!): AuthData
  saveBook(book: ID!): User
  deleteBook(bookId: ID!): User
}

`;

module.exports = typeDefs;
