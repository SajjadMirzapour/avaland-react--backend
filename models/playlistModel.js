const { connectDB } = require('../config');

async function findAll(req, res) {
    const pool = connectDB();

    const queryGettingPlaylists = await pool.query('SELECT * FROM playlist')
    const resultGettingPlaylists = queryGettingPlaylists.rows;
    pool.end();
    return resultGettingPlaylists;
}

async function findById(id) {
    const pool = connectDB();

    const queryForGettingPlaylist = await pool.query(`SELECT * FROM playlist WHERE id=${id}`)
    const resultForGettingPlaylist = queryForGettingPlaylist.rows
    pool.end();
    return resultForGettingPlaylist;
}

async function create(obj) {
    const pool = connectDB();

    const queryForInsertingPlaylist = await pool.query(`insert into playlist (name, ujnser_id) values ($1,$2)`, [obj.name, obj.audience_id])
    pool.end();
    return queryForInsertingPlaylist;
}

async function findSongs(playlistId) {
    const pool = connectDB();

    const queryForGettingMap = await pool.query(`SELECT * FROM "map_music_playlist" WHERE playlist_id=${playlistId}`)
    const resultForGettingMap = queryForGettingMap.rows
    let mySong = []
    for (let n = 0; n <= resultForGettingMap.length - 1; n++) {
        const myMusic = `SELECT * FROM musics where id=${resultForGettingMap[n].music_id}`;
        const res3 = await pool.query(myMusic);
        mySong = mySong.concat(res3.rows)
    }
    pool.end();
    return mySong
}

async function delet(obj) {
    const pool = connectDB();
    const queryForDeletPlaylist = await pool.query(`delete from playlist where id=${obj.id}`)
    pool.end();
    return queryForDeletPlaylist;
}

async function update(obj) {
    const pool = connectDB();
    const queryForupdatePlaylist = await pool.query(`update playlist set name=$1 , info=$2  WHERE id=${obj.id}`, [obj.name, obj.info])
    pool.end();
    return queryForupdatePlaylist;
}





module.exports = {
    findAll,
    findById,
    create,
    findSongs,
    delet,
    update
}