import express from "express";
import path from "path";
import { scrapeListings, scrapeListingDetails } from "./scrape";
import { getPageNumberAndSize, paginate } from "./util/pagination";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/scrape-zillow", async (req, res) => {
  try {
    const hourseGroupInCity = await scrapeListings(req.query.city);
    const promieArr: Promise<any>[] = [];

    for (const ele of hourseGroupInCity) {
      if (ele.title && ele.url) {
        promieArr.push(scrapeListingDetails(ele.url));
      }
    }
    const resault = (await Promise.all(promieArr)).flat(1);

    const { pageSize, pageNumber } = getPageNumberAndSize(req);

    const paginatedData = paginate(resault, pageSize, pageNumber);

    res.send(paginatedData);
  } catch (error) {
    console.error("Error during Zillow scraping:", error);
    res.status(500).send("Error during scraping");
  }
});

app.get("/get-homeinfo", async (req, res) => {
  try {
    const url = "https://www.zillow.com/naperville-il/";
    const data = await scrapeListingDetails(url);
    // console.log("data ~~~~~~~~~~~: ", data);

    res.send("Get Zillow home info successfully!");
  } catch (error) {
    console.error("Error during Zillow scraping:", error);
    res.status(500).send("Error during scraping");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
