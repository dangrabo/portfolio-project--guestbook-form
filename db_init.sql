DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
    id INT auto_increment,
    fname VARCHAR(255),
    lname VARCHAR(255),
    job VARCHAR(255),
    company VARCHAR(255),
    email VARCHAR(255),
    linkedin VARCHAR(255),
    meet VARCHAR(255),
    other VARCHAR(255),
    message VARCHAR(255),
    emaillist VARCHAR(255),
    format  VARCHAR(255),
    timestamp DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);

INSERT INTO contacts (
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
) VALUES (
    'Daniel',
    'Grabowski',
    'server',
    'JOEY',
    'db.grabo@mail.com',
    'linkedin.com/danielgrabo',
    'Work',
    'I am you',
    'I am you in a message',
    'on',
    'html'
);