const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Scholarship = require('./models/internationalscrapscholorships'); // Update this to your actual MongoDB model path

// MongoDB connection
mongoose.connect('mongodb+srv://waqas:waqasmangi123@scholorfinder.qeygr.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

async function scrapeScholarships(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const scholarships = await page.evaluate(() => {
    const results = [];
    const rows = document.querySelectorAll('tr[data-key]'); // Target each scholarship row using `data-key` attribute

    rows.forEach(row => {
      const name = row.querySelector('td a')?.innerText || 'No Name';
      const description = row.querySelector('td:nth-child(2)')?.innerText || 'No Description';
      const country = 'Not specified'; // Adjust if a country field exists or set a default
      const educationLevel = 'Not specified'; // Adjust if an education level field exists or set a default
      const link = row.querySelector('a.view-award')?.getAttribute('href') || '#';

      results.push({ name, description, country, educationLevel, link });
    });

    return results;
  });

  await browser.close();
  
  // Save to MongoDB with duplicate check based on link
  for (const scholarship of scholarships) {
    const fullLink = `https://www.internationalscholarships.com${scholarship.link}`; // Concatenate the base URL with the partial link
    const existingScholarship = await Scholarship.findOne({ link: fullLink });
    
    if (!existingScholarship) {
      const newScholarship = new Scholarship({ ...scholarship, link: fullLink });
      await newScholarship.save();
      console.log(`Saved: ${scholarship.name}`);
    } else {
      console.log(`Duplicate found: ${scholarship.name}`);
    }
  }
  
  console.log('Scholarships scraped and saved.');
}

scrapeScholarships('https://www.internationalscholarships.com/scholarships/award/index?AwardSearch[fieldsOfStudy]=6');
