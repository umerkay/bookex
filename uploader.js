const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const gridfs = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path');

// Assuming you already have a mongoose connection
// const conn = mongoose.connection;
// gridfs.mongo = mongoose.mongo;
// const gfs = gridfs(conn.db);

// Create a new GridFS storage instance
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set the file extension based on the original mimetype
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + fileExtension);
    }
});

// Create a GridFS storage engine
const upload = multer({ storage });

module.exports = upload;
