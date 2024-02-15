import { getProductDetails } from "./scrape";

const express = require('express');
const app = express();
app.use(express.json())

const port = 4000;

app.get('/', (req: any, res: any) => {
  res.send('Hello!');
});

app.post('/api', (req: any, res: any) => {
  const url = req.body.url;
  getProductDetails(url).then((data: any) => {
    res.send(data);
  }).catch(console.error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});