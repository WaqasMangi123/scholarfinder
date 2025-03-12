const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

// MongoDB Schema for Scholarships
const ScholarshipSchema = new mongoose.Schema({
  name: String,
  grant: String,
  deadline: String,
  provider: String,
  location: String,
  link: String,
});
const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://waqas:waqasmangi123@scholorfinder.qeygr.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to scrape scholarships from a specific URL and extract data
async function scrapeScholarshipsFromUrl(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const scholarships = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('.ScholarshipCardContent');

    items.forEach((item) => {
      const name = item.querySelector('.ScholarshipName')?.innerText || 'No name';
      const grant = item.querySelector('.QFValue')?.innerText || 'No grant';
      const deadline = item.querySelector('.QFLabel + .QFValue')?.innerText || 'No deadline';
      const provider = item.querySelector('.ProviderDetails .Name')?.innerText || 'No provider';
      const location = item.querySelector('.Location')?.innerText || 'No location';
      const link = document.location.href;

      results.push({ name, grant, deadline, provider, location, link });
    });

    return results;
  });

  return scholarships;
}

// Main function to scrape from MastersPortal
async function scrapeScholarships() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // URLs for the scholarships
    const urls = [
      'https://www.mastersportal.com/search/scholarships/master/agriculture-forestry?ci=56,11,28,202,30,82,1,24,3,229&page=1',
      'https://www.mastersportal.com/search/scholarships/master/agriculture-forestry?ci=56,11,28,202,30,82,1,24,3,229&page=2',

    ];

    // Scrape scholarships from each URL
    for (const url of urls) {
      const scholarships = await scrapeScholarshipsFromUrl(page, url);
      console.log(`Scraped scholarships from ${url}:`, scholarships);

      // Save each scholarship to the database
      for (const data of scholarships) {
        const scholarship = new Scholarship(data);
        await scholarship.save();
      }
    }

    await browser.close();
    console.log('Scraping complete and data saved to MongoDB');
  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

// Run the scraping function
scrapeScholarships();
