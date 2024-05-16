const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection successfull!!');
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }
};

module.exports = connectDB;
