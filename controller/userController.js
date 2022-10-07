const User = require('../models/userModel');

async function getUsers(req, res) {
    try {
        const id = req.params?.id;
        if (id) await getUser(req, res, id);
        else {
            let users = await User.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
    } catch (e) {
        console.log(e);
    }
}

async function getUser(req, res, id) {
    try {
        const user = await User.findById(id)
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'user Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

async function signUp(req, res) {
    try {
        data = req.body
        User.create(data)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'user added Successfully' }));
        return res.end();
    } catch (e) {
        console.log(e);
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'Internal Error' }));
        return res.end();
    }
}

async function singIn(req, res) {
    try {
        const user = await User.findByCredintials(req.body);
        if (user) {
            res.setHeader('Set-Cookie', `token=12345`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'user found' }));
            return res.end();
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'user not found' }));
        return res.end();
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUsers,
    singIn,
    signUp,
}