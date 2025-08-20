const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'guest.json');

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

let guests = [];

try {
  // Read the file synchronously
  const data = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON string into a JavaScript object
  guests = JSON.parse(data);

  console.log("Loaded guests:", guests);
  console.log("First guest name:", guests[0].Name); // ✅ safer
} catch (err) {
  console.error('Error reading or parsing the JSON file:', err);
}

// Create routes for each guest
guests.forEach(guest => {
  const route = '/' + encodeURIComponent(guest["Name"]);
  app.get(route, (req, res) => {
    res.render('index', { guestTitle: guest["guest-title"] });
  });
});

// Default homepage
app.get('/', (req, res) => {
  res.render('index', { guestTitle: "លោក/លោកស្រី" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
