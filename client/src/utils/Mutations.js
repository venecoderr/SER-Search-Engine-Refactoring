export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        user
        token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      user
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      id
      username
      savedBooks {
        bookId: ID!
        title: String!
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      username
      savedBooks {
        bookId: ID!
        title: String!
      }
    }
  }
`;