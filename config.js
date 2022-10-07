const { Pool } = require('pg');

function connectDB() {
    return new Pool({
        user: 'mirage',
        host: '192.168.5.121',
        Port: '5432',
        database: 'college',
        schema: 'mirage',
        password: '&6Tw3C0V4q@w'
    })
}
module.exports.connectDB = connectDB;


//for local data-base

// function connectDB() {
//     return new Pool({
//         user: 'postgres',
//         host: 'localhost',
//         Port: '5432',
//         database: 'postgres',
//         schema: 'postgres',
//         password: 'mirzapours972',
//     })
// }

module.exports.connectDB = connectDB;