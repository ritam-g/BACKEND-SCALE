const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const fileController = require('../controllers/fileController');

// Upload file route
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Get all files
router.get('/', fileController.getAllFiles);
// Pagination
router.get(`/images`,fileController.getProductsPagination)
// Get file by ID
router.get('/:id', fileController.getFileById);

// Update file metadata
router.put('/:id', fileController.updateFile);

// Delete file
router.delete('/:id', fileController.deleteFile);

// Get statistics
router.get('/stats/overview', fileController.getStatistics);
/**LINK - 
 * @description it will accespet the query parameters
 * @method GET
 * @constant it will be pagination part of the api
 */

module.exports = router;
