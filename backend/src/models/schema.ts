import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import Author from '../models/author.model';
import Book from '../models/book.model';

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      }
    }
  }
});

/**
 * MUTATiONS
 */
const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type:  new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const { name, age } = args;
        const newAuthor = new Author({ name, age });
        return newAuthor.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const { name, genre, description, authorId } = args;
        const newBook = new Book({ name, genre, description, authorId });
        return newBook.save();
      }
    },
    removeBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Book.findByIdAndRemove(args.id);
      }
    }
  }
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});

export default schema;
