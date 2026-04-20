const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        

        const conn = await mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/file-upload-db`, {
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
