// Import necessary dependencies
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const userRouter = require('./routes/user'); // User-related operations
const scholarshipRoutes = require('./routes/scholorshiproutes'); // Scholarship routes
const profileRoutes = require('./routes/profile'); // Profile route
const educationRoutes = require('./routes/education'); // Education route
const experienceRoutes = require('./routes/experience'); // Experience route
const recommendationRoutes = require('./routes/recommendation'); // Recommendation routes
const userDataRoutes = require('./routes/userData'); // User data route
const internationalScrapScholarshipRoutes = require('./routes/internationalscrapscholorship'); // International scrap scholarships route
const bachelorScholarshipRoutes = require('./routes/bachelorscholorship'); // Bachelor scholarship route
const adminRoutes = require('./routes/adminroute'); // Admin route
const allUserDetailRoutes = require('./routes/alluserdetailroute'); // Route to fetch all user details
const userDetailFetchRoutes = require('./routes/userdetailfetch'); // Import the new user data fetch route
const blogRoutes = require('./routes/blog'); // Blog routes

// Middleware imports
const reqAuth = require('./middleware/reqAuth'); // Authentication middleware

// Initialize Express app
const app = express();

// Middleware configurations
app.use(express.json({ limit: '10mb' })); // JSON payload limit increased to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // URL-encoded payload limit increased
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from the frontend app

// MongoDB connection URI from .env file
const mongoURI = process.env.MongooseURL;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));

// Public routes (do not require authentication)
app.use('/api/scholarships', scholarshipRoutes); // Public route for scholarships
app.use('/api/users', userRouter); // User registration and login routes
app.use('/api/admin', adminRoutes); // Admin login route
app.use('/api/all-users', allUserDetailRoutes); // Route to fetch all user details
app.use('/api/userdetailfetch', userDetailFetchRoutes); // New route to fetch user data details

// Protected routes (require authentication)
app.use('/api/profile', reqAuth, profileRoutes); // Profile operations
app.use('/api/education', reqAuth, educationRoutes); // Education operations
app.use('/api/experience', reqAuth, experienceRoutes); // Experience operations
app.use('/api/recommendation', reqAuth, recommendationRoutes); // Recommendation operations
app.use('/api/userData', reqAuth, userDataRoutes); // User data operations

// Public routes for specific scholarship collections
app.use('/api/internationalscrapscholorship', internationalScrapScholarshipRoutes); // International scrap scholarships
app.use('/api/bachelorscholorship', bachelorScholarshipRoutes); // Bachelor scholarships
app.use('/api/blog', blogRoutes); // Public route for blogs

// Fallback route for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
