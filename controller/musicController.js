const Music = require('../models/musicModel');

async function getMusics(req, res) {
    try {
        const id = req.params?.id;
        if (id) await getMusic(req, res, id);
        else {
            let musics = await Music.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(musics));
        }
    } catch (e) {
        console.log(e);
    }
}

async function getMusic(req, res, id) {
    try {
        const music = await Music.findById(id)
        if (!music) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(music))
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleOption(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET', 'DELETE', 'PUT');
        return res.end();

    } catch (e) {
        console.log(e);
    }
}

async function createMusic(req, res) {
    try {
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET', 'DELETE', 'PUT');
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            return res.end();
        }
        else {
            const data = req.body
            console.log('data', data);
            Music.create(data)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'music added Successfully' }));
            return res.end();
        }
    } catch (e) {
        console.log(e);
    }
}

async function likeMusic(req, res) {
    try {
        try {
            const data = req.body
            await Music.like(data)
            res.writeHead(200, { 'content-type': 'application/json' });
            res.write(JSON.stringify({ message: 'Successfully Done!' }));
            return res.end()
        } catch (e) {
            res.writeHead(400, { 'content-type': 'application/json' });
            res.write(JSON.stringify({ message: 'something went wrong!!' }));
            return res.end()
        }
    } catch (e) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.write(JSON.stringify({ message: 'error acurated ' }));
    }
}


async function deleteMusic(req, res) {
    try {
        data = req.body
        Music.delet(data)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'music deleted successfully' }));
        return res.end();
    } catch (e) {
        console.log(e);
    }
}

async function updateMusic(req, res) {
    try {
        data = req.body
        Music.update(data)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'music updated successfully' }));
        return res.end();

    } catch (e) {
        console.log(e);
    }
}

async function favoriteMusics(req, res) {
    try {
        let musics = await Music.findFavorite();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(musics));
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getMusics,
    handleOption,
    createMusic,
    likeMusic,
    updateMusic,
    deleteMusic,
    favoriteMusics
}