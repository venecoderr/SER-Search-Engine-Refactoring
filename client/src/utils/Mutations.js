import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        user {
          _id
          username
          email
        }
        token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        _id
        username
        email
        savedBooks {
          bookId
          title
        }
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: ID!, $title: String!, $description: String!, $userId: ID!) {
    saveBook(bookId: $bookId, title: $title, description: $description, userId: $userId) {
      _id
      username
      savedBooks {
        _id
        bookId
        title
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
        _id
        bookId
        title
      }
    }
  }
`;