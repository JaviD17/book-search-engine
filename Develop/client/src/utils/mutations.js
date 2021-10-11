// LOGIN_USER loginUser
// ADD_USER addUser
// SAVE_BOOK saveBook
// REMOVE_BOOK removeBook

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
