import express from 'express';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const contacts = [];



// home route
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/confirm', (req,res) => {
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
        format: req.body.format
    };

    // Add contact to contacts array
    contacts.push(contact);

    // Return the confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin/contacts', (req, res) => {
    let html = '<h1>Orders</h1><ul>';
    for (const contact of contacts) {
        html += `<li>${contact.fname} ${contact.lname} - ${contact.job} - ${contact.company} - ${contact.linkedin} - ${contact.email} - ${contact.meet} - ${contact.other} - ${contact.message} - ${contact.emaillist} - ${contact.format}</li>`;
    }
    html += '</ul>';
    res.send(html);
});