const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Scholarship = require('./models/phdscrapscholorship'); // Import the MongoDB model

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
    const rows = document.querySelectorAll('section.list_scholarship tbody tr');

    rows.forEach(row => {
      const name = row.querySelector('.uni-name-row a')?.innerText || 'No Name';
      const country = row.querySelector('td:nth-child(2) small')?.innerText || 'No Country';
      const educationLevel = row.querySelector('.otherp')?.innerText || 'No Level';
      const applyBy = row.querySelector('td:nth-child(4) strong')?.innerText || 'No Deadline';
      const link = row.querySelector('.uni-name-row a')?.getAttribute('href') || '#';

      results.push({ name, country, educationLevel, applyBy, link });
    });

    return results;
  });

  await browser.close();
  
  // Save to MongoDB with duplicate check based on link
  for (const scholarship of scholarships) {
    const existingScholarship = await Scholarship.findOne({ link: scholarship.link });
    
    if (!existingScholarship) {
      const newScholarship = new Scholarship(scholarship);
      await newScholarship.save();
      console.log(`Saved: ${scholarship.name}`);
    } else {
      console.log(`Duplicate found: ${scholarship.name}`);
    }
  }
  
  console.log('Scholarships scraped and saved.');
}

scrapeScholarships('https://www.studyabroad.pk/scholarships/search?studyid=-1&levelid=36&countryid=-1&submit=search');
