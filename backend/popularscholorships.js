const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

// MongoDB connection string (replace with your MongoDB Atlas connection string)
const mongoURI = "mongodb+srv://waqas:waqasmangi123@scholorfinder.qeygr.mongodb.net/mydatabase?retryWrites=true&w=majority";

// MongoDB Schema for Scholarships
const ScholarshipSchema = new mongoose.Schema({
    title: String,
    country: String,
    level: String,
    courses: String,
    benefits: String,
    deadline: String,
    imageUrl: String,
    link: String,
});

const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

async function scrapeScholarships() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.studyabroad.pk/all-popular-scholarships/');

    // Extract scholarship data
    const scholarships = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.popular-scholorships li'));
        return items.map(item => {
            const title = item.querySelector('h3') ? item.querySelector('h3').textContent : null;
            const country = item.querySelector('.content ul li:nth-child(2)') ? item.querySelector('.content ul li:nth-child(2)').textContent : null;
            const level = item.querySelector('.content ul li:nth-child(3)') ? item.querySelector('.content ul li:nth-child(3)').textContent : null;
            const courses = item.querySelector('.content ul li:nth-child(4)') ? item.querySelector('.content ul li:nth-child(4)').textContent : null;
            const benefits = item.querySelector('.content ul li:nth-child(6)') ? item.querySelector('.content ul li:nth-child(6)').textContent : null;
            const deadline = item.querySelector('.content ul li:nth-child(7)') ? item.querySelector('.content ul li:nth-child(7)').textContent : null;
            const imageUrl = item.querySelector('.image img') ? item.querySelector('.image img').src : null;
            const link = item.querySelector('a') ? item.querySelector('a').href : null;

            return {
                title,
                country,
                level,
                courses,
                benefits,
                deadline,
                imageUrl,
                link
            };
        });
    });

    await browser.close();
    return scholarships;
}

async function saveToDatabase(data) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');

        // Save data using Mongoose
        await Scholarship.insertMany(data);
        console.log('Data successfully saved to database!');

        // Close the connection
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error saving data to database:', error);
    }
}

async function main() {
    const scholarships = await scrapeScholarships();
    await saveToDatabase(scholarships);
}

main();
