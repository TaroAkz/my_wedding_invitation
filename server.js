const express = require('express');
const compression = require('compression');
const fs = require('fs');
const path = require('path');

const app = express();
const ip = "127.0.0.1";
const port = 3000;
const filePath = path.join(__dirname, 'guest.json');

// Enable gzip / brotli compression
app.use(compression());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images) with caching
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '30d',       // cache for 30 days
  etag: true,
  lastModified: true,
}));

let guests = [];

try {
  const data = fs.readFileSync(filePath, 'utf8');
  guests = JSON.parse(data);
  console.log("✅ Guests loaded:", guests.length);
} catch (err) {
  console.error("❌ Error reading guest.json:", err);
}

// Default homepage (generic)
app.get('/', (req, res) => {
  res.render('index', { guestTitle: "លោក/លោកស្រី/អ្នកនាង/កញ្ញា" });
});

// Catch-all route for guests
app.get('/:name', (req, res) => {
  const name = req.params.name;

  // Find guest case-insensitive
  const guest = guests.find(
    g => g.Name && g.Name.toLowerCase() === name.toLowerCase()
  );

  if (guest) {
    // Valid guest → render personalized invitation
    res.render('index', { guestTitle: guest["guest-title"] });
  } else {
    // Invalid guest → redirect to default page
    res.redirect('/');
  }
});

app.listen(port, ip, () => {
  console.log(`🚀 Server running at http://${ip}:${port}`);
});












// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// //const ip = "192.168.1.4"; //"192.168.1.16"
// const ip = "127.0.0.1"; //"192.168.1.16"
// const port = 3000;
// const filePath = path.join(__dirname, 'guest.json');

// // Set EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files (CSS, images)
// app.use(express.static(path.join(__dirname, 'public')));

// let guests = [];

// try {
//   // Read the file synchronously
//   const data = fs.readFileSync(filePath, 'utf8');

//   // Parse the JSON string into a JavaScript object
//   guests = JSON.parse(data);

//   console.log("Loaded guests:", guests);
//   console.log("First guest name:", guests[0].Name); // ✅ safer
// } catch (err) {
//   console.error('Error reading or parsing the JSON file:', err);
// }

// // Create routes for each guest
// guests.forEach(guest => {
//   const route = '/' + encodeURIComponent(guest["Name"]);
//   app.get(route, (req, res) => {
//     res.render('index', { guestTitle: guest["guest-title"] });
//   });
// });

// // Default homepage
// app.get('/', (req, res) => {
//   res.render('index', { guestTitle: "លោក/លោកស្រី" });
// });

// app.listen(port, ip, () => {
//   console.log(`Server running at http://${ip}:${port}`);
// });
