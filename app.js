import express, { urlencoded } from 'express';
import mariadb from 'mariadb';
import validateForm from './services/validation.js';
import dotenv from 'dotenv';

// Database
dotenv.config();
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to our database
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the databse!');
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`);
    }
}


const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


// home route
app.get('/', (req, res) => {
    res.render('home');
});


app.post('/confirm', async (req,res) => {
    // Build timestamp
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // Get form data
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        emaillist: req.body.emaillist,
        format: req.body.format,
        timestamp: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    };
    // Log contact
    // console.log(contact);

    // Validate guest data
    const result = validateForm(contact);
    if(!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    // Post guest data to db
    const conn = await connect();
    const insertQuery = conn.query(`INSERT INTO contacts (
            fname,
            lname,
            job,
            company,
            email,
            linkedin,
            meet,
            other,
            message,
            emaillist,
            format
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [contact.fname, contact.lname, contact.job, contact.company, contact.email, contact.linkedin, contact.meet, contact.other, contact.message, contact.emaillist, contact.format]);

        res.render('confirmation', {contact});

    // if (contact.fname && contact.lname && contact.email) {
    //     contacts.push(contact);
    //     res.render('confirmation', {contact});
    // }
    // else {
    //     res.send('Invalid input')
    // }

    // Return the confirmation page
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', async (req, res) => {
    const conn = await connect();
    const contacts = await conn.query('SELECT * FROM contacts;');
    console.log(contacts);
    res.render('admin', {contacts});
});