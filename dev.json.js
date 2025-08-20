const fs = require('fs');

// Path to your JSON file
const filePath = 'guest.json';

 // Read the file synchronously
const data = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON string into a JavaScript object
const guests = JSON.parse(data);

console.log(guests);

  // Example: Accessing the first guest's name
console.log(guests[0]['Name']);

console.log(guests[0]['guest-title']);
