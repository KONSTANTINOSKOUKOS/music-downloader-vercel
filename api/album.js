import api from "../spotify";

const formatalbum = (res) => {//for /album
    const tracks = [];
    res.tracks.items.forEach(el => {
        tracks.push({//no image bcz all the same
            name: el.name,
            duration: el.duration_ms,
            id: el.id,
            artist: el.artists[0].name,
            preview: el.preview_url
        });
    });
    return {
        name: res.name,
        id: res.id,
        artist: res.artists[0].name,
        tracks: tracks,
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
    const data = await api.getAlbum(req.query.id);
    res.json(formatalbum(data.body));
}