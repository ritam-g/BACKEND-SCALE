# API Testing Guide

This document provides example requests for testing the File Upload Server API.

## Base URL
```
http://localhost:3000/api
```

## Health Check
```bash
curl http://localhost:3000/api/health
```

## 1. Upload File

### Using cURL
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -F "file=@/path/to/your/file.jpg" \
  -F "description=My uploaded file" \
  -F "tags=sample,test" \
  -F "uploadedBy=john_doe" \
  -F "isPublic=true"
```

### Using Postman
1. Set method to **POST**
2. URL: `http://localhost:3000/api/files/upload`
3. Go to **Body** tab, select **form-data**
4. Add keys:
   - `file` (type: File) - select your file
   - `description` (type: Text) - optional
   - `tags` (type: Text) - optional, comma-separated
   - `uploadedBy` (type: Text) - optional
   - `isPublic` (type: Text) - true/false

### Using JavaScript/Fetch
```javascript
const formData = new FormData();
formData.append('file', fileInputElement.files[0]);
formData.append('description', 'My file');
formData.append('tags', 'tag1,tag2');
formData.append('uploadedBy', 'user123');
formData.append('isPublic', 'true');

fetch('http://localhost:3000/api/files/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Using Node.js/Axios
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('/path/to/file.jpg'));
form.append('description', 'My file');
form.append('tags', 'tag1,tag2');
form.append('uploadedBy', 'user123');

axios.post('http://localhost:3000/api/files/upload', form, {
  headers: form.getHeaders()
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## 2. Get All Files

### Basic Request
```bash
curl http://localhost:3000/api/files
```

### With Query Parameters
```bash
# Paginated results
curl "http://localhost:3000/api/files?limit=5&skip=0"

# Filter by uploader
curl "http://localhost:3000/api/files?uploadedBy=john_doe"

# Specific status
curl "http://localhost:3000/api/files?status=active&limit=10"

# Combined filters
curl "http://localhost:3000/api/files?uploadedBy=john_doe&status=active&limit=10&skip=0"
```

## 3. Get File by ID

```bash
curl http://localhost:3000/api/files/6441a5f1c8e9d2b3a4c5e6f7
```

## 4. Update File

### Using cURL
```bash
curl -X PUT http://localhost:3000/api/files/6441a5f1c8e9d2b3a4c5e6f7 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "tags": "newtag1,newtag2",
    "isPublic": false
  }'
```

### Using Postman
1. Set method to **PUT**
2. URL: `http://localhost:3000/api/files/:id`
3. Go to **Body** tab, select **raw** and set type to **JSON**
4. Enter JSON data

## 5. Delete File

```bash
curl -X DELETE http://localhost:3000/api/files/6441a5f1c8e9d2b3a4c5e6f7
```

## 6. Get Statistics

### Overall Statistics
```bash
curl http://localhost:3000/api/files/stats/overview
```

### Statistics by User
```bash
curl "http://localhost:3000/api/files/stats/overview?uploadedBy=john_doe"
```

## Response Examples

### Successful Upload (201)
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "_id": "6441a5f1c8e9d2b3a4c5e6f7",
    "fileName": "file_1682092529123.jpg",
    "originalFileName": "photo.jpg",
    "fileSize": 2048576,
    "mimeType": "image/jpeg",
    "imageKitFileId": "unique-file-id",
    "imageKitUrl": "https://ik.imagekit.io/...",
    "uploadedBy": "john_doe",
    "description": "My uploaded file",
    "tags": ["sample", "test"],
    "isPublic": true,
    "metadata": {
      "width": 1920,
      "height": 1080
    },
    "status": "active",
    "createdAt": "2023-04-21T10:15:29.123Z",
    "updatedAt": "2023-04-21T10:15:29.123Z"
  }
}
```

### Get All Files (200)
```json
{
  "success": true,
  "data": [
    {
      "_id": "6441a5f1c8e9d2b3a4c5e6f7",
      "fileName": "file_1682092529123.jpg",
      ...
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 10,
    "skip": 0,
    "pages": 5
  }
}
```

### Error Response (400)
```json
{
  "success": false,
  "message": "No file provided"
}
```

### Statistics Response (200)
```json
{
  "success": true,
  "data": {
    "overall": {
      "totalFiles": 42,
      "totalSize": 1073741824,
      "avgSize": 25565243
    },
    "byMimeType": [
      {
        "_id": "image/jpeg",
        "count": 25,
        "totalSize": 524288000
      },
      {
        "_id": "application/pdf",
        "count": 10,
        "totalSize": 209715200
      }
    ]
  }
}
```

## Query Parameters Reference

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| limit | number | Results per page | `?limit=10` |
| skip | number | Pagination offset | `?skip=20` |
| uploadedBy | string | Filter by uploader | `?uploadedBy=john_doe` |
| status | string | Filter by status | `?status=active` |

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

## Notes

- Replace file paths with actual paths when using cURL
- Replace `6441a5f1c8e9d2b3a4c5e6f7` with actual MongoDB ObjectIds
- All timestamps are in UTC format
- File size is in bytes
- Tags should be comma-separated for input, returned as arrays in responses
