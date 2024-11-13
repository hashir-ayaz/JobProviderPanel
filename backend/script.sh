#!/bin/bash

# Create directories
mkdir -p config controllers middleware models routes utils

# Create main server file
cat <<EOL > server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config();

connectDB(); // Connect to database

app.use(express.json()); // Body parser

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# Create database configuration file
cat <<EOL > config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(\`Error: \${error.message}\`);
        process.exit(1);
    }
};

module.exports = connectDB;
EOL

# Create user controller file
cat <<EOL > controllers/userController.js
const User = require('../models/User');

const registerUser = async (req, res) => {
    // Registration logic
};

const authUser = async (req, res) => {
    // Authentication logic
};

module.exports = { registerUser, authUser };
EOL

# Create middleware files
cat <<EOL > middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    // Authentication logic
};

module.exports = { protect };
EOL

cat <<EOL > middleware/errorMiddleware.js
const notFound = (req, res, next) => {
    const error = new Error(\`Not Found - \${req.originalUrl}\`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
EOL

# Create user model file
cat <<EOL > models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
EOL

# Create user routes file
cat <<EOL > routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
EOL

# Create utility file for token generation
cat <<EOL > utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
EOL

# Create .env file
cat <<EOL > .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EOL

# Create .gitignore file
cat <<EOL > .gitignore
node_modules
.env
EOL

# Initialize package.json
npm init -y

# Install necessary packages
npm install express mongoose dotenv jsonwebtoken

echo "MERN backend project structure created successfully!"
