const express = require('express');
const multer = require('multer');
const File = require('../models/File'); // Import File schema

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

// Multer instance
const upload = multer({ storage });


router.post('/uploads', upload.single('file'), async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;
    //console.log('POST request received at /uploads');
    // console.log(req.body); 
    // console.log(req.file); 

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        
        const newFile = new File({
            title,
            description,
            filename: file.filename,
            filepath: file.path,
        });

        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'Error saving file metadata.', error });
    }
});

module.exports = router;
