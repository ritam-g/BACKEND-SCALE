# Project Structure Overview

## 📁 Complete Folder Structure

```
pagination/
├── src/
│   ├── server.js                 # ⭐ Main Express application entry point
│   ├── config/
│   │   ├── database.js          # MongoDB connection configuration
│   │   └── imagekit.js          # ImageKit SDK initialization
│   ├── models/
│   │   └── FileUpload.js        # Mongoose schema for file metadata
│   ├── controllers/
│   │   └── fileController.js    # Business logic for all file operations
│   ├── routes/
│   │   └── fileRoutes.js        # API route definitions
│   ├── middleware/
│   │   └── multer.js            # Multer file upload configuration
│   ├── utils/
│   │   ├── errorHandler.js      # Custom error handling utilities
│   │   └── logger.js            # Logging utility
│   └── constants/
│       └── constants.js         # Application-wide constants
├── logs/                        # Auto-generated log files
├── uploads/                     # Temporary upload storage (if needed)
├── .env                         # Environment variables (DO NOT COMMIT)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore patterns
├── package.json                 # NPM dependencies and scripts
├── README.md                    # Main project documentation
├── SETUP_GUIDE.md              # Installation & setup instructions
├── API_TESTING_GUIDE.md        # API endpoint testing examples
└── PROJECT_STRUCTURE.md        # This file
```

## 📋 File Descriptions

### Core Application Files

#### `src/server.js`
- **Purpose**: Main Express application server
- **Responsibilities**:
  - Initialize Express app
  - Configure middleware (CORS, Helmet, JSON parsing)
  - Connect to MongoDB
  - Mount routes
  - Error handling middleware
  - Server startup on PORT

#### `src/config/database.js`
- **Purpose**: MongoDB database connection
- **Provides**: `connectDB()` function
- **Features**:
  - Connection pooling
  - Error handling
  - Retry logic

#### `src/config/imagekit.js`
- **Purpose**: ImageKit SDK configuration
- **Initializes**: ImageKit instance with API credentials
- **Used for**: File upload to CDN

### Data Models

#### `src/models/FileUpload.js`
- **Database Schema**: Stores file metadata in MongoDB
- **Fields**:
  - `fileName`: File name on ImageKit
  - `originalFileName`: Original uploaded file name
  - `fileSize`: Size in bytes
  - `mimeType`: File MIME type
  - `imageKitFileId`: ImageKit file identifier
  - `imageKitUrl`: CDN URL to file
  - `imageKitThumbnailUrl`: Thumbnail URL (images)
  - `uploadedBy`: User who uploaded
  - `description`: File description
  - `tags`: Array of tags/labels
  - `isPublic`: Public/private flag
  - `metadata`: Image dimensions, video duration
  - `status`: active|deleted|archived
  - `createdAt`, `updatedAt`: Timestamps
- **Indexes**: Optimized queries for common filters
- **Virtuals**: Category computation (image/video/document)

### Business Logic

#### `src/controllers/fileController.js`
- **Functions**:
  - `uploadFile()`: Handle file upload to ImageKit + DB
  - `getAllFiles()`: Retrieve files with pagination
  - `getFileById()`: Get single file details
  - `updateFile()`: Update file metadata
  - `deleteFile()`: Soft delete file
  - `getStatistics()`: File analytics

### API Routes

#### `src/routes/fileRoutes.js`
- **Routes**:
  - `POST /upload` → `uploadFile`
  - `GET /` → `getAllFiles`
  - `GET /:id` → `getFileById`
  - `PUT /:id` → `updateFile`
  - `DELETE /:id` → `deleteFile`
  - `GET /stats/overview` → `getStatistics`

### Middleware

#### `src/middleware/multer.js`
- **Purpose**: Configure file upload handling
- **Features**:
  - Memory storage (for security)
  - File type validation
  - File size limits (10MB)
  - Error handling

### Utilities

#### `src/utils/errorHandler.js`
- **Exports**:
  - `AppError`: Custom error class
  - `asyncHandler`: Express error wrapper

#### `src/utils/logger.js`
- **Methods**:
  - `info()`: Log information
  - `error()`: Log errors
  - `warn()`: Log warnings
  - `debug()`: Log debug info
- **Features**:
  - Console output
  - File logging in `logs/` directory
  - Timestamps for all logs

### Constants

#### `src/constants/constants.js`
- **Exports**:
  - `HTTP_STATUS`: Status codes
  - `FILE_CONSTANTS`: File limits and types
  - `UPLOAD_STATUS`: Upload status types
  - `ERROR_MESSAGES`: Common errors
  - `SUCCESS_MESSAGES`: Success responses

### Configuration Files

#### `.env`
Environment variables required:
```env
MONGODB_URI=mongodb://localhost:27017/file-upload-db
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
PORT=3000
NODE_ENV=development
```

#### `.env.example`
Template for `.env` file (safe to commit)

#### `.gitignore`
Patterns for Git to ignore:
- `node_modules/`
- `.env` files
- Log files
- IDE settings
- OS files

#### `package.json`
- **Main**: Entry point (`src/server.js`)
- **Scripts**:
  - `npm start` → Production mode
  - `npm run dev` → Development with nodemon
- **Dependencies**:
  - `express`: Web framework
  - `mongoose`: MongoDB ODM
  - `multer`: File upload middleware
  - `imagekitio`: ImageKit SDK
  - `dotenv`: Environment variables
  - `cors`: CORS middleware
  - `helmet`: Security headers
- **DevDependencies**:
  - `nodemon`: Auto-reload on changes

### Documentation Files

#### `README.md`
- Project overview
- Folder structure
- Setup instructions
- API endpoints documentation
- Database schema
- Feature list
- Technology stack
- Troubleshooting

#### `SETUP_GUIDE.md`
- Prerequisites
- Step-by-step installation
- ImageKit setup
- MongoDB setup (local & Atlas)
- Configuration
- Verification steps
- Troubleshooting
- Docker setup
- PM2 production setup

#### `API_TESTING_GUIDE.md`
- Base URL
- cURL examples
- Postman setup
- JavaScript/Fetch examples
- Node.js/Axios examples
- Query parameters
- Response examples
- Status codes reference

## 🔄 Data Flow

### File Upload Flow
```
1. User uploads file via POST /api/files/upload
   ↓
2. Multer middleware validates file
   ↓
3. File stored in memory (buffer)
   ↓
4. fileController.uploadFile() executes
   ↓
5. Upload to ImageKit CDN
   ↓
6. Save metadata to MongoDB
   ↓
7. Return response with file details
```

### File Retrieval Flow
```
1. User requests GET /api/files
   ↓
2. Query parameters parsed (limit, skip, filters)
   ↓
3. MongoDB finds matching documents
   ↓
4. Sort and paginate results
   ↓
5. Return with pagination info
```

## 🔐 Security Features

1. **Helmet**: Sets secure HTTP headers
2. **CORS**: Configured for cross-origin requests
3. **File Validation**: Type and size checks
4. **Memory Storage**: Files never written to disk
5. **Soft Deletes**: No permanent data loss
6. **Environment Variables**: Secrets in `.env`
7. **Error Handling**: Generic error messages to clients
8. **ImageKit Integration**: Leverage CDN security

## 📊 Database Indexes

Optimized queries with indexes on:
- `imageKitFileId` (unique)
- `uploadedBy` + `status` (compound)
- `uploadedBy` + `createdAt` (compound)
- `mimeType`
- `tags`
- `createdAt` (for sorting)

## 🚀 Scalability Considerations

1. **Pagination**: Handle large datasets
2. **CDN**: ImageKit for global distribution
3. **Database Indexes**: Fast queries
4. **Middleware**: Reusable, modular code
5. **Constants**: Centralized configuration
6. **Logging**: Monitor operations
7. **Error Handling**: Graceful failures

## 🔧 Maintenance

- **Logs**: Check `logs/` directory for issues
- **Updates**: Run `npm update` regularly
- **Security**: Monitor `npm audit` output
- **Scaling**: Consider Redis for caching

## 📝 Best Practices Implemented

✅ **MVC Architecture**: Models, Views, Controllers separation
✅ **Separation of Concerns**: Each file has single responsibility
✅ **Configuration Management**: Environment variables
✅ **Error Handling**: Middleware for error catching
✅ **Logging**: Track operations
✅ **RESTful API**: Standard HTTP methods
✅ **Database Indexes**: Performance optimization
✅ **Constants**: Avoid magic strings
✅ **Middleware**: Reusable components
✅ **Security**: Helmet, CORS, input validation

---

**Created**: April 2026  
**Version**: 1.0.0  
**Industry Standard**: ✅ Enterprise-ready structure
