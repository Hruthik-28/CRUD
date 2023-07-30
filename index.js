require('dotenv').config();
const app = require('./app.js');

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
    console.log(`server running at http://localhost:${PORT}`);
})