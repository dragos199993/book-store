import { Document, model, Schema } from 'mongoose';
import { SchemaDef } from '../types';

interface IBook {
  name: string;
  genre: string;
  description: string;
  authorId: string;
}

interface IBookDoc extends IBook, Document { }

const BookSchemaDef: SchemaDef<IBook> = {
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  }
};

const BookSchema = new Schema(BookSchemaDef);

export default model<IBookDoc>('Book', BookSchema);
