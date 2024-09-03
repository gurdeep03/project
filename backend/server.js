import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const filePath = path.join(__dirname, 'db.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const users = JSON.parse(data);

        // Check if the email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Add the new user to the array
        users.push({ name, email, password });

        // Write the updated data back to db.json
        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to db.json:', writeErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'Registration Successful' });
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, 'db.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.json({ success: true }); // or send a token if using JWT
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
