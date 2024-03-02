import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(fs.readFileSync('app/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
