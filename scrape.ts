import puppeteer from 'puppeteer';

async function getHTML(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const html = await page.content();
  await browser.close();
  return html;
}

export async function getProductDetails(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const name = await page.$eval('.B_NuCI', el => (el as any).innerText);
  const description = await page.$eval('._1mXcCf', el => (el as any).innerText);
  await browser.close();
  return { name, description };
}

async function getProductImages(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const name = await page.$eval('.B_NuCI', el => (el as any).innerText);
  const description = await page.$eval('._1mXcCf', el => (el as any).innerText);
  await browser.close();
  return { name, description };
}

// getHTML('https://www.flipkart.com/quickchoice-electric-shaver-usb-professional-rechargeable-waterproof-men/p/itm8533e64cc5838?pid=SHVGU7FRH7TGAGCP&lid=LSTSHVGU7FRH7TGAGCP9BL0RK&marketplace=FLIPKART&store=zlw%2F79s%2Fu3j&spotlightTagId=TrendingId_zlw%2F79s%2Fu3j&srno=b_1_10&otracker=browse&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_3_L2_view-all&fm=organic&iid=3059b966-318b-43aa-88ae-43f1a45946bb.SHVGU7FRH7TGAGCP.SEARCH&ppt=browse&ppn=browse&ssid=8ig8due5kw0000001706209108531').then(console.log).catch(console.error);

// getProductDetails('https://www.flipkart.com/quickchoice-electric-shaver-usb-professional-rechargeable-waterproof-men/p/itm8533e64cc5838?pid=SHVGU7FRH7TGAGCP&lid=LSTSHVGU7FRH7TGAGCP9BL0RK&marketplace=FLIPKART&store=zlw%2F79s%2Fu3j&spotlightTagId=TrendingId_zlw%2F79s%2Fu3j&srno=b_1_10&otracker=browse&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_3_L2_view-all&fm=organic&iid=3059b966-318b-43aa-88ae-43f1a45946bb.SHVGU7FRH7TGAGCP.SEARCH&ppt=browse&ppn=browse&ssid=8ig8due5kw0000001706209108531').then(console.log).catch(console.error);