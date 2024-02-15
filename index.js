import puppeteer from 'puppeteer';
import chrome from 'chrome-aws-lambda';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json())

const port = process.env.PORT || 4000;


export async function getProductDetails(url) {
  const executablePath = await chrome.executablePath
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  await page.goto(url, { waitUntil: 'networkidle2' });
  const html = await page.content();
  console.log(html);
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