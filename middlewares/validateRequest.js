module.exports = (req, res, next) => {
    const { username, email, password } = req.body;

    if (req.path === '/signup' && (!username || !email || !password)) {
        return res.status(400).send('All fields are required for signup.');
    }

    if (req.path === '/login' && (!email || !password)) {
        return res.status(400).send('Email and password are required for login.');
    }

    next();
};
