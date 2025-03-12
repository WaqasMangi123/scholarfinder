const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
    name: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: Date, required: true },
});

const AwardSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const EducationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    highestDegree: { type: String, required: true },
    educationDetails: [
        {
            course: { type: String, required: true },
            university: { type: String, required: true },
            grade: { type: String, required: true },
            year: { type: Number, required: true },
        },
    ],
    certificates: [CertificateSchema],
    awards: [AwardSchema],
});

module.exports = mongoose.model('Education', EducationSchema);
