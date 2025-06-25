const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
