import puppeteer from 'puppeteer';
import chrome from 'chrome-aws-lambda';

import express from 'express';
const app = express();
app.use(express.json())

const port = process.env.PORT || 4000;


export async function getProductDetails(url) {
  const executablePath = await chrome.executablePath
  const browser = await puppeteer.launch({ 
    ignoreHTTPSErrors: true,
    args: chrome.args,
    defaultViewport: {
      width: 1280,
      height: 720
    },
    executablePath,
    headless: chrome.headless,
   });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const name = await page.$eval('.B_NuCI', el => (el).innerText);
  const description = await page.$eval('._1mXcCf', el => (el).innerText);
  await browser.close();
  return { name, description };
}

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.post('/api', (req, res) => {
  const url = req.body.url;
  getProductDetails(url).then((data) => {
    res.send(data);
  }).catch(console.error);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});