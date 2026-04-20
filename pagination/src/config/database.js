const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set in .env file');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.error('Make sure MongoDB is running and MONGODB_URI is set in .env file');
        return null;
    }
};

module.exports = connectDB;

module.exports = connectDB;
