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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $input: bookInput!) {
    saveBook(userId: $userId, input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: Int!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;
