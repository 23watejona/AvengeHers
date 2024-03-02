import express from 'express';
import fs from 'fs';
import {createPageHandler, createPageServe} from './createUser.js'

const app = express();
const port = 3000;

app.use(express.static('src/app/public'));

app.get('/', (req, res) => {
  res.end(fs.readFileSync('src/app/public/index.html'))
})
app.get('/', (req, res) => {
  res.end(fs.readFileSync('src/app/public/index.html'))
})
app.get('/create.html', createPageServe);
app.post('/create.html', createPageHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
