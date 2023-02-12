import api from "../spotify";

const formattrack = (res) => {//used in other format()'s
    return {
        name: res.name,
        duration: Math.floor(res.duration_ms / 1000),
        id: res.id,
        artist: res.artists[0].name,
        image: res.album.images[0].url,
        preview: res.preview_url
    };
};

const formatplaylist = (res) => {//for /playlist
    const tracks = [];
    res.tracks.items.forEach(el => {
        tracks.push(formattrack(el.track));
    });
    return {
        name: res.name,
        id: res.id,
        tracks: tracks,
        owner: res.owner.display_name,
        image: res.images[0].url
    };
};

export default async function (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    api.setAccessToken(req.query.token);
    const data = await api.getPlaylist(req.query.id);
    res.json(formatplaylist(data.body));
}