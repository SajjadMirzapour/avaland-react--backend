const { connectDB } = require('../config');

async function findAll(req, res) {
    const pool = connectDB();

    const queryGettingPlaylists = await pool.query('SELECT * FROM users')
    const resultGettingPlaylists = queryGettingPlaylists.rows;
    pool.end();
    return resultGettingPlaylists;
}

async function findById(id) {
    const pool = connectDB();
    const queryForGettingPlaylist = await pool.query(`SELECT * FROM users WHERE id=${id}`)
    const resultForGettingPlaylist = queryForGettingPlaylist.rows
    pool.end();
    return resultForGettingPlaylist;
}

async function findByCredintials(credintials) {
    const { username, password } = credintials;
    const pool = connectDB();
    const queryForGettingPlaylist = await pool.query(`SELECT * FROM users WHERE username='${username}'`);
    const resultForGettingUsers = queryForGettingPlaylist.rows
    const user = resultForGettingUsers[0]
    pool.end();
    if (user) {
        if (user.password === password) {
            return user;
        }
        return null;
    }
    return user;
}

async function create(obj) {
    const pool = connectDB();

    const queryForInsertingPlaylist = await pool.query(`insert into users (username, password) values ($1,$2)`, [obj.username, +obj.password])
    pool.end();
    return queryForInsertingPlaylist;
}

module.exports = {
    findAll,
    findById,
    create,
    findByCredintials,

}