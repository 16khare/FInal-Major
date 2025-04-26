const bcrypt = require('bcrypt');
const db = require('../db'); // Import database connection

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        db.query('SELECT email FROM Users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length > 0) {
                return res.status(409).json({ error: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user
            db.query(
                'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.status(500).json({ error: 'Error creating user' });
                    }

                    res.status(201).json({ message: 'User created successfully' });
                }
            );
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Controller
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
};
