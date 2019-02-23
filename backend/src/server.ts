import mongoose = require('mongoose');
import app from './app';

const url = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;

mongoose.connect(url, { useNewUrlParser: true }, () =>
  // tslint:disable-next-line:no-console
  console.log('Connected to mongodb...'));
app.listen(port);

// tslint:disable-next-line:no-console
console.log(`Server listening on port ${port}...`);
