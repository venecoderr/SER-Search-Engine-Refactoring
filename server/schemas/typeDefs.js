const typeDefs = `
type Book {
  _id: ID!
  bookId: ID!
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
  saveBook(book: BookInput!): User
  deleteBook(bookId: ID!): User
}

input BookInput {
  bookId: ID!
  # Define other book input fields as needed
}

`;

module.exports = typeDefs;
