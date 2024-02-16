const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(Stealth());

export async function scrapeListings(searchString: any) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.google.com");
	await page.type(
		"textarea[name=q]",
		`site:zillow.com homes in ${searchString}`
	);
	await page.keyboard.press("Enter");
	await page.waitForSelector("h3");
	const searchResults = await page.$$eval(
		"h3",
		(
			results: {
				innerText: string;
				parentElement: { href: string };
			}[]
		) =>
			results.map(
				(res: {
					innerText: string;
					parentElement: { href: string };
				}) => ({
					title: res.innerText,
					url: res.parentElement.href,
				})
			)
	);

	await browser.close();
	return searchResults;
}

export async function scrapeListingDetails(url: string) {
	const browser = await puppeteerExtra.launch({ headless: true });
	const page = await browser.newPage();
	let listings: any = [];

	try {
		// * ~~~~~~~~~~~ Bypass CAPTCHA;
		await page.setUserAgent(
			// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
		);
		// listings = await page.$$eval("div", (div: any) => div.length);

		await page.goto(url);
		await page.waitForSelector("article");

		listings = await page.$$eval(
			"article",
			(articles: HTMLElement[]) => {
				return articles.map((article: HTMLElement) => {
					const price = (
						article.querySelector(
							"[data-test='property-card-price']"
						) as HTMLElement
					)?.innerText;
					const address = (
						article.querySelector(
							"[data-test='property-card-addr']"
						) as HTMLElement
					)?.innerText;

					const details: { [key: string]: string } = {};
					article
						.querySelectorAll(
							"ul[class^='StyledPropertyCardHomeDetailsList'] li"
						)
						.forEach((ele) => {
							const val = ele.querySelector("b")?.innerText;
							const key = ele.querySelector("abbr")?.innerText;
							if (val && key) {
								details[key] = val;
							}
						});

					return { price, address, details };
				});
			}
		);
	} catch (error) {
		return [];
	}
	await browser.close();
	return listings;
}

async function antiCaptcha(url: string) {
	const browserObj = await puppeteer.launch();
	const page = await browserObj.newPage();
	await page.setViewport({ width: 1280, height: 720 });
	await page.goto(url);

	// Capture screenshot
	await page.screenshot({
		path: "screenshot.jpg",
	});
	await browserObj.close();
}
