const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUploadRoutes = require('./routes/fileUpload'); 

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth'); 
app.use('/routes/auth', authRoutes); 
app.use('/routes/file-upload', fileUploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
