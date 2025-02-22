import express from 'express';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const contacts = [];



// home route
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/confirm', (req,res) => {
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


    if (contact.fname && contact.lname && contact.email) {
        contacts.push(contact);
        res.render('confirmation', {contact});
    }
    else {
        res.send('Invalid input')
    }

    // Return the confirmation page
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    console.log(contacts);
    res.render('admin', {contacts});
});