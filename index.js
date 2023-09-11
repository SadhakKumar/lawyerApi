const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = process.env.PORT || 3000;
let lawyersData;

// Enable JSON request parsing
app.use(express.json());

// Read lawyer data from the JSON file
fs.readFile('lawyers.json', 'utf8')
    .then((data) => {
        lawyersData = JSON.parse(data);
    })
    .catch((err) => {
        console.error('Error reading lawyer data from JSON file:', err);
        process.exit(1);
    });

// Define API endpoints

app.get('/', (req, res) => {
    res.send(lawyersData);
})
app.get('/lawyer/name/:name', (req, res) => {
    const name = req.params.name;
    // Implement code to search for a lawyer by name in the lawyersData array
    // Return lawyer details in JSON format
    const foundLawyers = lawyersData.filter((lawyer) => lawyer.name === name);
    res.json({ result: 'Lawyer found by name', lawyers: foundLawyers });
});

app.get('/lawyer/enrollment/:enrollmentNumber', (req, res) => {
    const enrollmentNumber = req.params.enrollmentNumber;
    // Implement code to search for a lawyer by enrollment number in the lawyersData array
    // Return lawyer details in JSON format
    const foundLawyers = lawyersData.filter((lawyer) => lawyer.enrollmentNumber === enrollmentNumber);
    res.json({ result: 'Lawyer found by enrollment number', lawyers: foundLawyers });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});