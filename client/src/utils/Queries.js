export const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      id
      username
      email
    }
  }
`