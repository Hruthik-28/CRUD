const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://hruthik_29:hruthik99808@cluster0.8zlqwnh.mongodb.net/crud"

const databaseConnect = () => {
    mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log(`connected to DB: ${conn.connection.host}`))
    .catch((error) => console.log(error.message));

}

module.exports = databaseConnect;