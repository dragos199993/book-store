import { gql } from 'apollo-boost';

export const getBooksQuery=gql`
  {
    books{
      name
      id
    }
  }
`

export const getBookDetailQuery=gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      description
      author{
        name
      }
    }
  }
`;

export const getAuthorsQuery=gql`
  {
    authors{
      name
      id
    }
  }
`;

export const addBookMutation=gql`
  mutation($name: String!, $genre: String!, $description: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, description: $description, authorId: $authorId) {
       name
       id
    }
  }
`;

export const removeBookMutation=gql`
  mutation($id: ID!){
    removeBook(id: $id){
      name
    }
  }
`;