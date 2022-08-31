const { Pool } = require('pg')

const pool = new Pool({
    user: 'mirage',
    host: '192.168.5.121',
    Port: '5432',
    database: 'college',
    schema: 'mirage',
    password: '&6Tw3C0V4q@w'
});


async function findAll(req, res) {
    const queryGetPlaylists = `SELECT * FROM playlist where user_id=1`;
    const resultGetPlaylists = await pool.query(queryGetPlaylists);
    console.log(resultGetPlaylists);
    pool.end();
    return resultGetPlaylists;
}

async function findById(id) {
    const queryForGetPlaylist = `SELECT * FROM playlist where user_id=${id}`;
    const resultForGetPlaylist = await pool.query(queryForGetPlaylist);

    console.log(resultForGetPlaylist);
    pool.end();
    return resultForGetPlaylist;
}

async function create(obj) {
    const queryForCreate = `insert into playlist ("name","user_id","info") values (${obj.name},${obj.user_id},${obj.info})`;
    const resultForCreate = await pool.query(queryForCreate);
    console.log(resultForCreate);
    pool.end();
    return resultForCreate;
}

module.exports = {
    findAll,
    findById,
    create,
}