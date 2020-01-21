// Config file to keep in one place all the ENV processes
require("dotenv").config();

module.exports = {
    // Server setup
    server: {
        port: process.env.PORT,
        url: process.env.API_URL
    },
    // DB Setup
    db: {
        uri: process.env.DB_URI
    }
};
