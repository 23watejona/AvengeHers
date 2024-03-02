import express from 'express';
import fs from 'fs';
import {createPageHandler} from './createUser.js'
import {loginPageHandler} from './login.js'

const app = express();
const port = 3000;

app.use(express.static('src/app/public'));

app.get('/', (req, res) => {
  res.end(fs.readFileSync('src/app/public/index.html'))
})
app.post('/create.html', createPageHandler);
app.post('/login.html', loginPageHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
