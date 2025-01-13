const express = require('express');
const path = require('path');
const shortid = require('shortid');
const db = require('./modal/database');
const app = express();
const port = 4500;

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route (GET)
app.get('/', (req, res) => {
    res.render('index', { shortURL: '', baseURL: `${req.protocol}://${req.get('host')}` });
});

// Home route (POST)
app.post('/', (req, res) => {
    const { long_url } = req.body;
    console.log(long_url)

    if (!long_url) {
        console.log('Invalid URL provided')
        return res.status(400).send('Invalid URL provided');
    }

    const short_url_id = shortid.generate();
    console.log(short_url_id);
    // Prepare SQL query to insert or update the short URL record in the database

    const query = `INSERT INTO short_url (long_url, short_id) VALUES (?, ?)
                   ON DUPLICATE KEY UPDATE short_id = ?`;
    const values = [long_url, short_url_id, short_url_id];

    db.query(query, values, (err) => {
        if (err) {
            console.error(`Database error: ${err.message}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log('URL processed successfully');
        res.render('index', { shortURL: short_url_id, 
            baseURL: `${req.protocol}://${req.get('host')}` });
    });
});

// Redirect route for short URLs
app.get('/:shortURL', (req, res) => {
    const { shortURL } = req.params;

    console.log(shortURL);

    db.query('SELECT long_url FROM short_url WHERE short_id = ?', [shortURL], (err, rows) => {
        if (err) {
            console.error(`Error finding short URL: ${err.message}`);
            return res.status(500).render('error', { message: 'Internal Server Error' });
        }

        if (rows.length === 0) {
            return res.status(404).render('error', { message: 'URL Not Found' });
        }

        res.redirect(rows[0].long_url);
    });
});

// Middleware for handling 404 errors
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Middleware for handling 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>500 - Internal Server Error</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server...');
});
