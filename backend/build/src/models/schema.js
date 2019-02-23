"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const author_model_1 = __importDefault(require("../models/author.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent) {
                return author_model_1.default.findById(parent.authorId);
            }
        }
    })
});
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            resolve(parent, args) {
                return book_model_1.default.find({ authorId: parent.id });
            }
        }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return book_model_1.default.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return author_model_1.default.findById(args.id);
            }
        },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            resolve(parent, args) {
                return book_model_1.default.find();
            }
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve() {
                return author_model_1.default.find();
            }
        }
    }
});
const Mutations = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            resolve(parent, args) {
                const { name, age } = args;
                const newAuthor = new author_model_1.default({ name, age });
                return newAuthor.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                genre: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                authorId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve(parent, args) {
                const { name, genre, authorId } = args;
                const newBook = new book_model_1.default({ name, genre, authorId });
                return newBook.save();
            }
        }
    }
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
exports.default = schema;
//# sourceMappingURL=schema.js.map