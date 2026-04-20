# Professional File Upload Server

A professional Node.js server with industry-standard folder structure for handling file uploads with MongoDB database integration and ImageKit image hosting.

## 📁 Project Structure

```
src/
├── server.js              # Main entry point
├── config/
│   ├── database.js        # MongoDB connection
│   └── imagekit.js        # ImageKit initialization
├── models/
│   └── FileUpload.js      # MongoDB schema for files
├── controllers/
│   └── fileController.js  # Business logic for file operations
├── routes/
│   └── fileRoutes.js      # API routes
├── middleware/
│   └── multer.js          # File upload middleware
└── utils/
    └── errorHandler.js    # Error handling utilities
.env                       # Environment variables
package.json              # Dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your actual credentials:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/file-upload-db

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Server
PORT=3000
NODE_ENV=development
```

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📊 Database Schema

### FileUpload Collection

```javascript
{
  fileName: String,                    // File name in ImageKit
  originalFileName: String,            // Original uploaded file name
  fileSize: Number,                    // File size in bytes
  mimeType: String,                    // File MIME type
  imageKitFileId: String,              // ImageKit file ID
  imageKitUrl: String,                 // ImageKit CDN URL
  imageKitThumbnailUrl: String,        // ImageKit thumbnail URL
  uploadedBy: String,                  // User who uploaded
  description: String,                 // File description
  tags: [String],                      // File tags/labels
  isPublic: Boolean,                   // Public/Private flag
  metadata: {
    width: Number,                     // Image width
    height: Number,                    // Image height
    duration: Number                   // Video duration
  },
  status: String,                      // active|deleted|archived
  createdAt: Date,                     // Creation timestamp
  updatedAt: Date                      // Last update timestamp
}
```

## 🔌 API Endpoints

### Upload File
**POST** `/api/files/upload`

Request (form-data):
- `file` (required): File to upload
- `description` (optional): File description
- `tags` (optional): Comma-separated tags
- `uploadedBy` (optional): User identifier
- `isPublic` (optional): Public/Private flag

Response:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "_id": "...",
    "fileName": "image.jpg",
    "imageKitUrl": "...",
    "createdAt": "2026-04-20T..."
  }
}
```

### Get All Files
**GET** `/api/files?uploadedBy=user1&status=active&limit=10&skip=0`

Query Parameters:
- `uploadedBy` (optional): Filter by uploader
- `status` (optional): active|deleted|archived
- `limit` (optional): Results per page (default: 10)
- `skip` (optional): Pagination offset (default: 0)

### Get File by ID
**GET** `/api/files/:id`

### Update File
**PUT** `/api/files/:id`

Request Body:
```json
{
  "description": "Updated description",
  "tags": "tag1,tag2",
  "isPublic": true
}
```

### Delete File
**DELETE** `/api/files/:id`

### Get Statistics
**GET** `/api/files/stats/overview?uploadedBy=user1`

Response:
```json
{
  "success": true,
  "data": {
    "overall": {
      "totalFiles": 42,
      "totalSize": 1024000,
      "avgSize": 24380
    },
    "byMimeType": [...]
  }
}
```

## 🔒 Features

- ✅ **File Upload**: Upload files via Multer
- ✅ **ImageKit Integration**: Automatic upload to ImageKit CDN
- ✅ **Database Storage**: MongoDB for metadata
- ✅ **File Validation**: Type and size validation
- ✅ **Security**: Helmet, CORS, input sanitization
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Pagination**: Query pagination support
- ✅ **Statistics**: File analytics and metrics
- ✅ **Metadata**: Image dimensions, video duration tracking
- ✅ **Soft Delete**: Non-destructive deletion

## 📋 Supported File Types

- **Images**: JPEG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX
- **Maximum Size**: 10MB

## 🛠️ Technologies

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **Multer**: File upload handling
- **ImageKit**: Image hosting and CDN
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variables

## 📝 Notes

1. Make sure MongoDB is running before starting the server
2. Get ImageKit credentials from [imagekit.io](https://imagekit.io)
3. Files are stored in memory temporarily during upload for security
4. Successful uploads are stored in ImageKit and metadata in MongoDB
5. All timestamps are in UTC

## 🐛 Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running on localhost:27017

**ImageKit Upload Error**: Verify credentials in .env file

**File Upload Error**: Check file size and type restrictions

**CORS Error**: Verify CORS configuration in server.js

---

**Version**: 1.0.0  
**Author**: Your Name  
**License**: ISC
