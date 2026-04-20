// API Response Codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

// File related constants
const FILE_CONSTANTS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_MIME_TYPES: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    FILE_UPLOAD_FOLDER: '/uploads',
};

// Upload status
const UPLOAD_STATUS = {
    ACTIVE: 'active',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
};

// Error messages
const ERROR_MESSAGES = {
    FILE_NOT_PROVIDED: 'No file provided',
    FILE_NOT_FOUND: 'File not found',
    INVALID_FILE_TYPE: 'Invalid file type. Only images and documents are allowed.',
    FILE_TOO_LARGE: 'File size exceeds maximum limit of 10MB',
    UPLOAD_FAILED: 'File upload failed',
    DATABASE_ERROR: 'Database operation failed',
    IMAGEKIT_ERROR: 'ImageKit operation failed',
};

// Success messages
const SUCCESS_MESSAGES = {
    FILE_UPLOADED: 'File uploaded successfully',
    FILE_DELETED: 'File deleted successfully',
    FILE_UPDATED: 'File updated successfully',
    FILES_FETCHED: 'Files fetched successfully',
};

module.exports = {
    HTTP_STATUS,
    FILE_CONSTANTS,
    UPLOAD_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
};
