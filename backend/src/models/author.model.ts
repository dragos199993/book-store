import { Document, model, Schema } from 'mongoose';
import { SchemaDef } from '../types';

interface IAuthor {
  name: string;
  age: number;
}

interface IAuthorDoc extends IAuthor, Document { }

const AuthorSchemaDef: SchemaDef<IAuthor> = {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
};

const AuthorSchema = new Schema(AuthorSchemaDef);

export default model<IAuthorDoc>('Author', AuthorSchema);
