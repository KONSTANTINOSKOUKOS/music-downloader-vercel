const Spotify = require('spotify-web-api-node');

const api = new Spotify({
    clientId: '05b24fb8ffde41c384ac3d5b54f97cf2',
    clientSecret: '55eb2f966f0d401493f46a1c3c7b7ddd',
    redirectUri: 'https://music-downloader-pi.vercel.app/login'
});

module.exports = api;