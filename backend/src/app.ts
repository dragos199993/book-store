import bodyParser = require('body-parser');
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import path from 'path';
const app: Application = express();
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './models/schema';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.use(express.static(path.resolve('..', 'frontend', 'build')));

app.get('*', (request: Request, response: Response) => {
  response.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
});

export default app;
