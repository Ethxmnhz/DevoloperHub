const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/trigger-ide', (req, res) => {
    console.log('IDE triggered');
    res.json({ message: 'IDE started' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
