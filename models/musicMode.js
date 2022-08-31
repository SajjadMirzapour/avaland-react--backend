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
    const query = 'select * from music';
    const result = await pool.query(query);
    console.log(result);
    pool.end();
    return result;
}

async function findById(id) {
    
    const queryForGetMusic = `SELECT * FROM music where id=${id}`;
    const resultForGetMusic = await (await pool.query(queryForGetMusic)).rows;

    console.log(resultForGetMusic);
    pool.end();
    return resultForGetMusic;
}

async function like(userId, musicId) {
    const checkForLike = `SELECT * FROM like where audience_id=${userId}`;
    const resultForLike = await (await pool.query(checkForLike)).rows;

    const likeModel = {}
    likeModel.audience_id = userId
    likeModel.music_id = musicId
    // console.log(likeModel);
    if (resultForLike.find(obj => obj.audience_id === likeModel.audience_id && obj.music_id === likeModel.music_id)) {
        console.log('already liked by you');
    }
    else {
    console.log('it will be like');
    const queryForLike = `insert into likes (audience_id, music_id) values (${userId}, ${musicId})`;
    const result = await pool.query(queryForLike);
    console.log(result);
    pool.end();
    return result;
}}


module.exports = {
    findAll,
    findById,
    like
}