const UserData = require('../models/userdata');
const Scholarship = require('../models/popularscholorships');
const PhdScholarship = require('../models/internationalscrapscholorships');
const BachelorScholarship = require('../models/bachelorscholorship');

const interestKeywords = {
    'Biology/Life Sciences': ['biology', 'life sciences', 'science', 'biological'],
    'Computer & Information Systems': ['computer', 'information systems', 'software', 'technology', 'IT'],
    'Engineering': ['engineering', 'machines', 'electrical', 'mechanical', 'civil', 'systems'],
    'Health Professions': ['health', 'medicine', 'nursing', 'pharmacy', 'medical', 'healthcare'],
    'Mathematics': ['mathematics', 'math', 'statistics', 'calculus', 'algebra'],
    'Chemistry': ['chemistry', 'chemical', 'biochemistry'],
    'Applied Science': ['applied science', 'science', 'technology', 'engineering'],
    'Medicine': ['medicine', 'medical', 'health', 'nursing', 'healthcare'],
    'Physics': ['physics', 'physical science', 'quantum', 'theoretical physics'],
    'Science and Technology': ['science', 'technology', 'STEM', 'innovation'],
    'Social Sciences': ['social science', 'psychology', 'sociology', 'anthropology', 'politics'],
    'Environmental Studies': ['environmental', 'ecology', 'sustainability', 'conservation'],
    'Law and Legal Studies': ['law', 'legal', 'jurisprudence', 'justice', 'policy'],
    'Education and Teaching': ['education', 'teaching', 'pedagogy', 'instruction'],
    'Arts and Humanities': ['arts', 'humanities', 'history', 'philosophy', 'literature'],
    'Business Administration': ['business', 'administration', 'management', 'finance', 'marketing', 'commerce'],
    'All Subjects': ['all subjects', 'all courses', 'general fields', 'open to all fields']
};

const getEducationLevelsForQuery = (currentLevel) => {
    switch (currentLevel.toLowerCase()) {
        case 'intermediate':
            return ['Undergraduate', 'Bachelor', 'All Fields', 'All'];
        case 'undergraduate':
        case 'bachelor':
            return ['Postgraduate', 'Master', 'All Fields', 'All'];
        case 'postgraduate':
        case 'master':
            return ['PhD', 'Doctorate', 'All Fields', 'All'];
        default:
            return ['All', 'All Fields'];
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await UserData.findOne({ userId });

        if (!userData || !userData.education || userData.education.length === 0) {
            return res.status(400).json({ error: 'Incomplete user data. Please ensure education details are provided.' });
        }

        const { degreeLevel } = userData.education[0];
        const userInterests = userData.interests || [];
        const educationLevelsForQuery = getEducationLevelsForQuery(degreeLevel);

        let allScholarships = [];
        let interestMessage = '';

        // Generate keywords for user interests and add "All Subjects" keywords
        let interestKeywordsRegex = [];
        userInterests.forEach(interest => {
            const keywords = interestKeywords[interest] || [];
            interestKeywordsRegex.push(...keywords.map(keyword => new RegExp(keyword, 'i')));
        });
        interestKeywordsRegex.push(...interestKeywords['All Subjects'].map(keyword => new RegExp(keyword, 'i')));

        // Define base query for level
        const levelQuery = { $or: educationLevelsForQuery.map(level => ({ educationLevel: { $regex: level, $options: 'i' } })) };

        // Query scholarships that match either the interest keywords or "All Subjects" keywords
        const phdScholarships = await PhdScholarship.find({
            $and: [
                levelQuery,
                { $or: interestKeywordsRegex.map(regex => ({ description: regex })) }
            ]
        }).sort({ applyBy: 1 });

        const generalScholarships = await Scholarship.find({
            $and: [
                levelQuery,
                { $or: interestKeywordsRegex.map(regex => ({ courses: regex })) }
            ]
        }).sort({ deadline: 1 });

        const bachelorScholarships = await BachelorScholarship.find({
            $and: [
                levelQuery,
                { $or: interestKeywordsRegex.map(regex => ({ subject: regex })) }
            ]
        }).sort({ applyBy: 1 });

        // Combine all results and remove duplicates
        const combinedScholarships = [
            ...phdScholarships,
            ...generalScholarships,
            ...bachelorScholarships
        ];

        // Map and filter duplicates by unique scholarship title and level
        const uniqueScholarships = Array.from(
            new Map(combinedScholarships.map(scholarship => [
                `${scholarship.name || scholarship.title}-${scholarship.educationLevel || scholarship.level}`,
                scholarship
            ])).values()
        );

        // Format results
        allScholarships = uniqueScholarships.map(scholarship => ({
            title: scholarship.name || scholarship.title || "No Title",
            level: scholarship.educationLevel || scholarship.level || "All Levels",
            courses: scholarship.description || scholarship.courses || scholarship.subject || "Courses not specified",
            benefits: scholarship.benefits || scholarship.funding || "Benefits not specified",
            country: scholarship.country || "Country not specified",
            deadline: scholarship.applyBy || scholarship.deadline || "No Deadline",
            link: scholarship.link || "#",
        }));

        if (allScholarships.length === 0) {
            return res.status(200).json({ recommendations: [], message: "No scholarships match your profile at the moment." });
        } else {
            interestMessage = "Here are scholarships available based on your interests and open to all fields.";
        }

        res.json({ recommendations: allScholarships, message: interestMessage });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'An error occurred while generating recommendations.' });
    }
};
