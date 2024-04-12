import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      _id
      username
      email
    }
  }
`