const { connectDB } = require('../config');


async function findAll(req, res) {
    const pool = connectDB();

    const queryGettingPlaylists = await pool.query('SELECT * FROM playlists')
    const resultGettingPlaylists = queryGettingPlaylists.rows;

    const result = [];
    for (const item of resultGettingPlaylists) {

        const queryForGettingCounts = await pool.query(`SELECT music_id FROM map_music_playlist where playlist_id=${item.id}`);
        const resultForGettingCounts = queryForGettingCounts.rows


        const queryGettingMapOfPlaylist = await pool.query(`SELECT music_id FROM map_music_playlist where playlist_id=${item.id}`);
        const resultGettingMapOfPlaylist = queryGettingMapOfPlaylist.rows


        const queryForGettingMusicsOfMusicMap = await pool.query(`SELECT * FROM musics WHERE id IN (${resultGettingMapOfPlaylist.map(item => item.music_id).join(', ')})`)
        const resultForGettingMusicsOfMusicMap = queryForGettingMusicsOfMusicMap.rows

        const music = resultForGettingMusicsOfMusicMap[0]
        const queryGettingUser = await pool.query(`SELECT * FROM users where id=${item.user_id}`);
        const users = queryGettingUser.rows
        const user = users[0]

        result.push({
            ...item,
            creator: user.username,
            musicCounts: resultForGettingCounts.length,
            image: music.image_path,
        });
    }
    pool.end();
    return result;
}

async function findById(id) {
    const pool = connectDB();

    const queryForGettingPlaylist = await pool.query(`SELECT * FROM playlists WHERE id=${id}`)
    const resultForGettingPlaylist = queryForGettingPlaylist.rows;
    const queryForGettingMapMusicOfPlaylist = await pool.query(`SELECT music_id FROM map_music_playlist WHERE playlist_id=${id}`)
    const resultForGettingMapMusicOfPlaylist = queryForGettingMapMusicOfPlaylist.rows
    const queryForGettingMusicsOfMusicMap = await pool.query(`SELECT * FROM musics WHERE id IN (${resultForGettingMapMusicOfPlaylist.map(item => item.music_id).join(', ')})`)
    const resultForGettingMusicsOfMusicMap = queryForGettingMusicsOfMusicMap.rows
    pool.end();
    const result = {
        ...resultForGettingPlaylist[0],
        songs: resultForGettingMusicsOfMusicMap
    }
    return result;
}

async function create(obj) {
    const pool = connectDB();

    const queryForInsertingPlaylist = await pool.query(`insert into playlists (name, user_id) values ($1,$2)`, [obj.name, obj.user_id])
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
module.exports = {
    findAll,
    findById,
    create,
    findSongs
}