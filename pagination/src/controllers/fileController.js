const FileUpload = require('../models/FileUpload');
const { getImageKit } = require('../config/imagekit');

// Upload file controller
exports.uploadFile = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file provided',
            });
        }

        const { description, tags, uploadedBy, isPublic } = req.body;

        // Upload to ImageKit
        const imagekit = getImageKit();
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer, // Buffer from multer memory storage
            fileName: req.file.originalname,
            folder: '/uploads',
            isPrivateFile: !isPublic, // Set privacy based on isPublic flag
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            customMetadata: {
                uploadedBy: uploadedBy || 'anonymous',
                description: description || '',
            },
        });

        // Save file info to database
        const fileUpload = new FileUpload({
            fileName: uploadResponse.name,
            originalFileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            imageKitFileId: uploadResponse.fileId,
            imageKitUrl: uploadResponse.url,
            imageKitThumbnailUrl: uploadResponse.thumbnail,
            uploadedBy: uploadedBy || 'anonymous',
            description: description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isPublic: isPublic !== 'false', // Convert string to boolean
            metadata: {
                width: uploadResponse.width,
                height: uploadResponse.height,
            },
        });

        await fileUpload.save();

        return res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: fileUpload,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message,
        });
    }
};

// Get all files
exports.getAllFiles = async (req, res) => {
    try {
        const { uploadedBy, status, limit = 10, skip = 0 } = req.query;

        const filter = { status: status || 'active' };
        if (uploadedBy) filter.uploadedBy = uploadedBy;

        const files = await FileUpload.find(filter)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ createdAt: -1 });

        const total = await FileUpload.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: files,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip),
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        console.error('Get files error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch files',
            error: error.message,
        });
    }
};

// Get file by ID
exports.getFileById = async (req, res) => {
    try {
        const file = await FileUpload.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: file,
        });
    } catch (error) {
        console.error('Get file error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch file',
            error: error.message,
        });
    }
};

// Delete file
exports.deleteFile = async (req, res) => {
    try {
        const file = await FileUpload.findByIdAndUpdate(
            req.params.id,
            { status: 'deleted' },
            { new: true }
        );

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }

        // Also delete from ImageKit
        try {
            const imagekit = getImageKit();
            await imagekit.deleteFile(file.imageKitFileId);
        } catch (imagekitError) {
            console.error('ImageKit delete error:', imagekitError);
            // Continue even if ImageKit delete fails
        }

        return res.status(200).json({
            success: true,
            message: 'File deleted successfully',
            data: file,
        });
    } catch (error) {
        console.error('Delete file error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete file',
            error: error.message,
        });
    }
};

// Update file metadata
exports.updateFile = async (req, res) => {
    try {
        const { description, tags, isPublic } = req.body;

        const updateData = {};
        if (description !== undefined) updateData.description = description;
        if (tags !== undefined) updateData.tags = tags.split(',').map(tag => tag.trim());
        if (isPublic !== undefined) updateData.isPublic = isPublic;

        const file = await FileUpload.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'File updated successfully',
            data: file,
        });
    } catch (error) {
        console.error('Update file error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update file',
            error: error.message,
        });
    }
};

// Get file statistics
exports.getStatistics = async (req, res) => {
    try {
        const { uploadedBy } = req.query;

        const filter = uploadedBy ? { uploadedBy } : {};

        const stats = await FileUpload.aggregate([
            { $match: { ...filter, status: 'active' } },
            {
                $group: {
                    _id: null,
                    totalFiles: { $sum: 1 },
                    totalSize: { $sum: '$fileSize' },
                    avgSize: { $avg: '$fileSize' },
                },
            },
        ]);

        const filesByType = await FileUpload.aggregate([
            { $match: { ...filter, status: 'active' } },
            {
                $group: {
                    _id: '$mimeType',
                    count: { $sum: 1 },
                    totalSize: { $sum: '$fileSize' },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            data: {
                overall: stats[0] || { totalFiles: 0, totalSize: 0, avgSize: 0 },
                byMimeType: filesByType,
            },
        });
    } catch (error) {
        console.error('Statistics error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message,
        });
    }
};
