const { connectDB } = require('../config');


async function findAll(req, res) {

    const pool = connectDB();
    const queryForGettingMusics = await pool.query(`select * from musics`)
    const resultForGettingMusics = queryForGettingMusics.rows
    pool.end();
    return resultForGettingMusics;
}

async function findById(id) {
    const pool = connectDB();
    const queryForGettingMusic = await pool.query(`SELECT * FROM musics where id=${id}`)
    const resultForGettingMusic = queryForGettingMusic.rows;
    pool.end();
    return resultForGettingMusic[0];
}

async function create(obj) {
    const pool = connectDB();
    const queryForInsertingMusic = await pool.query(`insert into musics (singer, name) values ($1,$2)`, [obj.singer, obj.name])
    return queryForInsertingMusic;
}

async function like(data) {
    const pool = connectDB();
    const queryChekForLike = await pool.query(`select * from likes where user_id=${data.user_id}`)
    const resultCheckForLike = queryChekForLike.rows

    if (resultCheckForLike.find(obj => obj.user_id === data.user_id && obj.music_id === data.music_id)) {
        const queryForDeletingLikes = await pool.query(`DELETE FROM likes WHERE user_id=${data.user_id} AND music_id=${data.music_id}`)
        const resultForDeletingLikes = queryForDeletingLikes.rows
        pool.end();
        return resultForDeletingLikes
    }
    else {
        const queryForLike = await pool.query(`insert into likes (user_id, music_id) values ($1,$2)`, [data.user_id, data.music_id])
        const resultForLike = queryForLike.rows
        pool.end();
        return resultForLike;
    }
}

async function findFavorite() {

    const pool = connectDB();

    const queryForGettingMusics = await pool.query(`select * from musics where likes > '3000' order by likes desc`)
    const resultForGettingMusics = queryForGettingMusics.rows
    pool.end();
    return resultForGettingMusics;
}


module.exports = {
    findAll,
    findById,
    create,
    like,
    findFavorite
}