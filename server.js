const http = require('http');
const { getMusics, createMusic, likeMusic, favoriteMusics } = require('./controller/musicController');
const { getPlaylists, createPlaylist, playlistSongs } = require('./controller/playlistController');
const { getUsers, addUser, singIn } = require('./controller/userController');
const { fetchQueryStringFromURL, getPostData, cors, getFormData } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();

Router.addRoute('/', getMusics, 'get').middleware([fetchQueryStringFromURL]);


Router.addRoute('/music', getMusics, 'get').middleware([cors, fetchQueryStringFromURL]);
Router.addRoute('/music/create', createMusic, 'post').middleware([getPostData]);
Router.addRoute('/music/like', likeMusic, 'post').middleware([getPostData]);
Router.addRoute('/music/favorite', favoriteMusics, 'get').middleware([cors]);


Router.addRoute('/playlists', getPlaylists, 'get').middleware([cors, fetchQueryStringFromURL]);
Router.addRoute('/playlists/create', createPlaylist, 'post').middleware([cors, getPostData]);
Router.addRoute('/playlists/songs', playlistSongs, 'get').middleware([fetchQueryStringFromURL]);

Router.addRoute('/users', getUsers, 'get').middleware([fetchQueryStringFromURL]);

Router.addRoute('/signIn', singIn, 'post').middleware([cors, getPostData]);
Router.addRoute('/signUp', addUser, 'post').middleware([cors, getPostData]);



const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);

});
