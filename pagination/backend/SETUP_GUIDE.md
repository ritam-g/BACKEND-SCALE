# Setup & Installation Guide

Complete step-by-step guide to set up and run the File Upload Server.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

## Step 1: Get ImageKit Credentials

1. Sign up for free at [ImageKit](https://imagekit.io/)
2. Log in to your dashboard
3. Go to **Settings** → **API Keys**
4. Copy your:
   - Public Key
   - Private Key
   - URL Endpoint (format: `https://ik.imagekit.io/your_imagekit_id`)

## Step 2: Set Up MongoDB

### Option A: Local MongoDB

1. Install MongoDB Community Edition from official website
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify connection: `mongosh` (MongoDB Shell)

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new project
3. Create a cluster (free tier available)
4. Create a database user with password
5. Get connection string (format): 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

## Step 3: Project Setup

### Clone/Download the Project

```bash
# Navigate to your project directory
cd pagination
```

### Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- multer
- imagekitio
- dotenv
- cors
- helmet
- nodemon (dev)

## Step 4: Configure Environment Variables

### Create `.env` File

```bash
# Copy from template
cp .env.example .env
```

### Edit `.env` with Your Credentials

```env
# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/file-upload-db

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/file-upload-db

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Server Configuration
PORT=3000
NODE_ENV=development

# Application Configuration
MAX_FILE_SIZE=10485760
UPLOAD_FOLDER=./uploads
```

## Step 5: Start the Server

### Development Mode (Recommended for first time)

```bash
npm run dev
```

Output should show:
```
MongoDB Connected: localhost
Server is running on http://localhost:3000
Environment: development
```

### Production Mode

```bash
npm start
```

## Step 6: Verify Installation

### Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2023-04-21T10:15:29.123Z"
}
```

### Test File Upload

Create a test file and upload it:

```bash
# Create a test image
curl -X POST http://localhost:3000/api/files/upload \
  -F "file=@test-image.jpg" \
  -F "description=Test upload" \
  -F "uploadedBy=test-user"
```

## Troubleshooting

### MongoDB Connection Error

**Error**: `Error connecting to MongoDB`

**Solutions**:
1. Check if MongoDB is running
   ```bash
   # Windows
   tasklist | find "mongod"
   
   # Mac/Linux
   ps aux | grep mongod
   ```
2. Verify `MONGODB_URI` in `.env` file
3. Check MongoDB port (default: 27017)
4. If using Atlas, check network access and firewall

### ImageKit Configuration Error

**Error**: `ImageKit operation failed`

**Solutions**:
1. Verify all three ImageKit credentials are correct
2. Check for typos in `.env`
3. Ensure credentials have proper permissions
4. Regenerate keys if necessary from ImageKit dashboard

### Port Already in Use

**Error**: `listen EADDRINUSE: address already in use :::3000`

**Solutions**:
1. Change PORT in `.env`:
   ```env
   PORT=3001
   ```
2. Or kill process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solutions**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear cache
npm cache clean --force
npm install
```

### File Upload Fails

**Error**: `File upload failed`

**Check**:
1. File size under 10MB
2. File type is allowed (images, PDFs, documents)
3. ImageKit credentials are correct
4. MongoDB is running
5. Check server logs for detailed error

## Folder Structure Explanation

```
pagination/
├── src/                          # Source code
│   ├── server.js                 # Main application
│   ├── config/
│   │   ├── database.js           # MongoDB setup
│   │   └── imagekit.js           # ImageKit setup
│   ├── models/
│   │   └── FileUpload.js         # Database schema
│   ├── controllers/
│   │   └── fileController.js     # Business logic
│   ├── routes/
│   │   └── fileRoutes.js         # API endpoints
│   ├── middleware/
│   │   └── multer.js             # File upload handling
│   ├── utils/
│   │   └── errorHandler.js       # Error utilities
│   └── constants/
│       └── constants.js          # Application constants
├── .env                          # Environment variables (NEVER commit!)
├── .env.example                  # Template for .env
├── package.json                  # Dependencies
├── README.md                     # Documentation
├── API_TESTING_GUIDE.md         # API testing examples
└── SETUP_GUIDE.md               # This file
```

## Running with PM2 (Production)

For production deployment, use PM2 process manager:

```bash
# Install PM2 globally
npm install -g pm2

# Start server
pm2 start src/server.js --name "file-upload-api"

# Monitor
pm2 monit

# View logs
pm2 logs

# Restart
pm2 restart file-upload-api

# Stop
pm2 stop file-upload-api
```

## Docker Setup (Optional)

If you want to run with Docker:

### Create `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t file-upload-server .

# Run container
docker run -p 3000:3000 \
  --env-file .env \
  file-upload-server
```

## Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Check for outdated packages
npm outdated

# Update packages
npm update

# Clean install
npm ci

# Run in debug mode
node --inspect src/server.js
```

## Next Steps

1. ✅ Complete the setup above
2. 📖 Read [README.md](./README.md) for API documentation
3. 🧪 Test API endpoints using [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)
4. 🔒 Review security considerations
5. 🚀 Deploy to production

## Support

For issues or questions:
1. Check error messages in console
2. Review logs in `.env` section
3. Consult troubleshooting guide above
4. Check official documentation:
   - [Express.js](https://expressjs.com/)
   - [MongoDB](https://docs.mongodb.com/)
   - [Multer](https://github.com/expressjs/multer)
   - [ImageKit](https://docs.imagekit.io/)

---

**Last Updated**: April 2026  
**Version**: 1.0.0
