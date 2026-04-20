const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: [true, 'File name is required'],
            trim: true,
        },
        originalFileName: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        imageKitFileId: {
            type: String,
            required: true,
        },
        imageKitUrl: {
            type: String,
            required: true,
        },
        imageKitThumbnailUrl: {
            type: String,
        },
        uploadedBy: {
            type: String,
            default: 'anonymous',
        },
        description: {
            type: String,
            trim: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        isPublic: {
            type: Boolean,
            default: true,
        },
        metadata: {
            width: Number,
            height: Number,
            duration: Number, // for videos
        },
        status: {
            type: String,
            enum: ['active', 'deleted', 'archived'],
            default: 'active',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        indexes: [
            { uploadedBy: 1, status: 1 },
            { createdAt: -1 },
            { mimeType: 1 },
            { tags: 1 },
        ],
    }
);

// Index for faster queries
fileUploadSchema.index({ imageKitFileId: 1 }, { unique: true });
fileUploadSchema.index({ uploadedBy: 1, createdAt: -1 });

// Add virtual for file type category
fileUploadSchema.virtual('category').get(function () {
    if (this.mimeType.startsWith('image/')) return 'image';
    if (this.mimeType.startsWith('video/')) return 'video';
    if (this.mimeType === 'application/pdf') return 'pdf';
    return 'document';
});

// Ensure virtuals are included in JSON
fileUploadSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FileUpload', fileUploadSchema);
