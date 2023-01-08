import api from "../spotify";

const formatalbum = (res) => {//for /album
    const tracks = [];
    res.tracks.items.forEach(el => {
        tracks.push({//no image bcz all the same
            name: el.name,
            duration: el.duration_ms,
            id: el.id,
            artist: el.artists[0].name,
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
    api.setAccessToken(req.query.token);
    const data = await api.getAlbum(req.query.id);
    res.json(formatalbum(data.body));
}